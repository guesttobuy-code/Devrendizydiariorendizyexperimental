/**
 * RENDIZY - WhatsApp Routes (Backend)
 * 
 * Adicionar estas rotas ao arquivo: /supabase/functions/server/routes-chat.ts
 * 
 * INSTRUÇÕES:
 * 1. Copiar código abaixo
 * 2. Colar no final do arquivo routes-chat.ts (antes do export default chat)
 * 3. Adicionar imports no topo do arquivo
 * 4. Deploy do backend
 * 5. Testar!
 * 
 * @version 1.0.103.42
 * @date 2025-10-29
 */

// ============================================
// IMPORTS NECESSÁRIOS (Adicionar no topo do arquivo routes-chat.ts)
// ============================================

/*
import { EvolutionAPIClient } from '../../utils/evolutionApi.ts'; // Ajustar caminho conforme necessário
*/

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Extract message text from Evolution API webhook
 */
function extractMessageText(webhookData: any): string {
  const message = webhookData.data.message;
  
  if (!message) return '';
  
  // Text message
  if (message.conversation) {
    return message.conversation;
  }
  
  // Extended text (reply, etc)
  if (message.extendedTextMessage?.text) {
    return message.extendedTextMessage.text;
  }
  
  // Media with caption
  if (message.imageMessage?.caption) {
    return `[Imagem] ${message.imageMessage.caption}`;
  }
  
  if (message.videoMessage?.caption) {
    return `[Vídeo] ${message.videoMessage.caption}`;
  }
  
  if (message.audioMessage) {
    return '[Áudio]';
  }
  
  if (message.documentMessage) {
    return `[Documento] ${message.documentMessage.fileName || ''}`;
  }
  
  return '[Mensagem não suportada]';
}

/**
 * Find conversation by phone number
 */
async function findConversationByPhone(
  organizationId: string,
  phoneNumber: string
): Promise<Conversation | null> {
  const prefix = `chat:conversation:${organizationId}:`;
  const conversations = await kv.getByPrefix<Conversation>(prefix);
  
  // Normalize phone number (remove all non-numeric)
  const normalizedSearch = phoneNumber.replace(/\D/g, '');
  
  return conversations.find(conv => {
    const normalizedPhone = conv.guest_phone?.replace(/\D/g, '') || '';
    return normalizedPhone.includes(normalizedSearch) || 
           normalizedSearch.includes(normalizedPhone);
  }) || null;
}

/**
 * Create new conversation from WhatsApp
 */
async function createWhatsAppConversation(
  organizationId: string,
  data: {
    guest_name: string;
    guest_phone: string;
    whatsapp_contact_id: string;
  }
): Promise<Conversation> {
  const conversationId = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date().toISOString();
  
  const conversation: Conversation = {
    id: conversationId,
    organization_id: organizationId,
    guest_name: data.guest_name,
    guest_email: '', // WhatsApp não tem email
    guest_phone: data.guest_phone,
    channel: 'whatsapp',
    status: 'unread',
    category: 'normal',
    conversation_type: 'guest',
    last_message: 'Nova conversa via WhatsApp',
    last_message_at: now,
    isPinned: false,
    tags: [],
    created_at: now,
    updated_at: now,
    external_conversation_id: data.whatsapp_contact_id,
    last_channel: 'whatsapp',
    channel_metadata: {
      whatsapp_contact_id: data.whatsapp_contact_id,
    },
  };
  
  const key = `chat:conversation:${organizationId}:${conversationId}`;
  await kv.set(key, conversation);
  
  return conversation;
}

// ============================================
// ROTAS WHATSAPP
// ============================================

/**
 * GET /chat/channels/config
 * 
 * Retorna configuração de canais da organização
 */
chat.get('/channels/config', async (c) => {
  try {
    const organizationId = c.req.query('organization_id');
    
    if (!organizationId) {
      return c.json({ 
        success: false, 
        error: 'organization_id is required' 
      }, 400);
    }
    
    const key = `chat:channel:config:${organizationId}`;
    let config = await kv.get<OrganizationChannelConfig>(key);
    
    if (!config) {
      // Retornar config default vazia
      config = {
        organization_id: organizationId,
        whatsapp: {
          enabled: false,
          api_url: '',
          instance_name: '',
          api_key: '',
          connected: false,
          connection_status: 'disconnected',
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
    
    return c.json({ success: true, data: config });
  } catch (error: any) {
    console.error('❌ Error fetching channel config:', error);
    return c.json({ 
      success: false, 
      error: error?.message || 'Unknown error' 
    }, 500);
  }
});

/**
 * PATCH /chat/channels/config
 * 
 * Atualiza configuração de canais
 */
chat.patch('/channels/config', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id, ...updates } = body;
    
    if (!organization_id) {
      return c.json({ 
        success: false, 
        error: 'organization_id is required' 
      }, 400);
    }
    
    const key = `chat:channel:config:${organization_id}`;
    let config = await kv.get<OrganizationChannelConfig>(key);
    
    if (!config) {
      // Criar config nova
      config = {
        organization_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
    
    // Merge updates
    const updated: OrganizationChannelConfig = {
      ...config,
      ...updates,
      organization_id,
      updated_at: new Date().toISOString(),
    };
    
    await kv.set(key, updated);
    
    return c.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('❌ Error updating channel config:', error);
    return c.json({ 
      success: false, 
      error: error?.message || 'Unknown error' 
    }, 500);
  }
});

/**
 * POST /chat/channels/whatsapp/connect
 * 
 * Conecta instância WhatsApp e gera QR Code
 */
chat.post('/channels/whatsapp/connect', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id, api_url, instance_name, api_key } = body;
    
    if (!organization_id || !api_url || !instance_name || !api_key) {
      return c.json({ 
        success: false, 
        error: 'organization_id, api_url, instance_name, and api_key are required' 
      }, 400);
    }
    
    console.log('🔵 [WhatsApp Connect] Starting connection...');
    console.log('🔵 [WhatsApp Connect] Organization:', organization_id);
    console.log('🔵 [WhatsApp Connect] Instance:', instance_name);
    
    // Criar cliente Evolution API
    const client = new EvolutionAPIClient({
      apiUrl: api_url,
      instanceName: instance_name,
      apiKey: api_key,
    });
    
    // 1. Verificar se instância já existe
    let instanceExists = false;
    try {
      const state = await client.getConnectionState();
      instanceExists = true;
      console.log('✅ [WhatsApp Connect] Instance already exists:', state.instance.status);
      
      // Se já estiver conectado, retornar sucesso
      if (state.instance.status === 'open') {
        const config: OrganizationChannelConfig = {
          organization_id,
          whatsapp: {
            enabled: true,
            api_url,
            instance_name,
            api_key,
            connected: true,
            phone_number: state.phoneNumber,
            connection_status: 'connected',
            last_connected_at: new Date().toISOString(),
          },
          updated_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        };
        
        await kv.set(`chat:channel:config:${organization_id}`, config);
        
        return c.json({
          success: true,
          data: {
            qr_code: null,
            instance_name,
            already_connected: true,
            phone_number: state.phoneNumber,
          }
        });
      }
    } catch (error) {
      console.log('⚠️ [WhatsApp Connect] Instance does not exist, will create...');
    }
    
    // 2. Criar instância (se não existir)
    if (!instanceExists) {
      console.log('🔵 [WhatsApp Connect] Creating instance...');
      await client.createInstance();
      console.log('✅ [WhatsApp Connect] Instance created');
    }
    
    // 3. Conectar e obter QR Code
    console.log('🔵 [WhatsApp Connect] Fetching QR Code...');
    const qrData = await client.fetchQRCode();
    console.log('✅ [WhatsApp Connect] QR Code received');
    
    // 4. Configurar webhook
    const webhookUrl = `https://${Deno.env.get('SUPABASE_URL')}/functions/v1/make-server-67caf26a/chat/channels/whatsapp/webhook`;
    console.log('🔵 [WhatsApp Connect] Setting webhook:', webhookUrl);
    
    try {
      await client.setWebhook(webhookUrl);
      console.log('✅ [WhatsApp Connect] Webhook configured');
    } catch (error) {
      console.warn('⚠️ [WhatsApp Connect] Webhook setup failed (non-critical):', error);
    }
    
    // 5. Salvar config no KV
    const config: OrganizationChannelConfig = {
      organization_id,
      whatsapp: {
        enabled: true,
        api_url,
        instance_name,
        api_key,
        connected: false,
        qr_code: qrData.base64 || qrData.code,
        connection_status: 'connecting',
      },
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };
    
    await kv.set(`chat:channel:config:${organization_id}`, config);
    console.log('✅ [WhatsApp Connect] Config saved to KV');
    
    // 6. Retornar QR Code
    return c.json({
      success: true,
      data: {
        qr_code: qrData.base64 || qrData.code,
        instance_name,
      }
    });
  } catch (error: any) {
    console.error('❌ [WhatsApp Connect] Error:', error);
    return c.json({ 
      success: false, 
      error: error?.message || 'Failed to connect WhatsApp' 
    }, 500);
  }
});

/**
 * POST /chat/channels/whatsapp/status
 * 
 * Verifica status da conexão WhatsApp
 */
chat.post('/channels/whatsapp/status', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id } = body;
    
    if (!organization_id) {
      return c.json({ 
        success: false, 
        error: 'organization_id is required' 
      }, 400);
    }
    
    const configKey = `chat:channel:config:${organization_id}`;
    const config = await kv.get<OrganizationChannelConfig>(configKey);
    
    if (!config?.whatsapp) {
      return c.json({
        success: true,
        data: {
          connected: false,
          error: 'WhatsApp not configured',
        }
      });
    }
    
    // Verificar status na Evolution API
    const client = new EvolutionAPIClient({
      apiUrl: config.whatsapp.api_url,
      instanceName: config.whatsapp.instance_name,
      apiKey: config.whatsapp.api_key,
    });
    
    const state = await client.getConnectionState();
    const isConnected = state.instance.status === 'open';
    
    // Atualizar config se status mudou
    if (isConnected !== config.whatsapp.connected) {
      config.whatsapp.connected = isConnected;
      config.whatsapp.connection_status = isConnected ? 'connected' : 'disconnected';
      config.whatsapp.phone_number = state.phoneNumber;
      if (isConnected) {
        config.whatsapp.last_connected_at = new Date().toISOString();
      }
      await kv.set(configKey, config);
    }
    
    return c.json({
      success: true,
      data: {
        connected: isConnected,
        phone_number: state.phoneNumber,
        status: state.instance.status,
      }
    });
  } catch (error: any) {
    console.error('❌ Error checking WhatsApp status:', error);
    return c.json({ 
      success: false, 
      error: error?.message || 'Failed to check status' 
    }, 500);
  }
});

/**
 * POST /chat/channels/whatsapp/disconnect
 * 
 * Desconecta instância WhatsApp
 */
chat.post('/channels/whatsapp/disconnect', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id } = body;
    
    if (!organization_id) {
      return c.json({ 
        success: false, 
        error: 'organization_id is required' 
      }, 400);
    }
    
    const configKey = `chat:channel:config:${organization_id}`;
    const config = await kv.get<OrganizationChannelConfig>(configKey);
    
    if (!config?.whatsapp) {
      return c.json({
        success: false,
        error: 'WhatsApp not configured',
      }, 400);
    }
    
    // Desconectar na Evolution API
    const client = new EvolutionAPIClient({
      apiUrl: config.whatsapp.api_url,
      instanceName: config.whatsapp.instance_name,
      apiKey: config.whatsapp.api_key,
    });
    
    await client.logout();
    
    // Atualizar config
    config.whatsapp.connected = false;
    config.whatsapp.connection_status = 'disconnected';
    config.whatsapp.phone_number = undefined;
    config.whatsapp.qr_code = undefined;
    config.updated_at = new Date().toISOString();
    
    await kv.set(configKey, config);
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('❌ Error disconnecting WhatsApp:', error);
    return c.json({ 
      success: false, 
      error: error?.message || 'Failed to disconnect' 
    }, 500);
  }
});

/**
 * POST /chat/channels/whatsapp/webhook
 * 
 * Recebe mensagens da Evolution API via webhook
 * 
 * IMPORTANTE: Configure esta URL na Evolution API:
 * https://{seu-projeto}.supabase.co/functions/v1/make-server-67caf26a/chat/channels/whatsapp/webhook
 */
chat.post('/channels/whatsapp/webhook', async (c) => {
  try {
    const webhookData = await c.req.json();
    
    console.log('📩 [WhatsApp Webhook] Received:', JSON.stringify(webhookData, null, 2));
    
    // 1. Verificar tipo de evento
    const event = webhookData.event;
    
    // Ignorar eventos que não são mensagens recebidas
    if (event !== 'MESSAGES_UPSERT') {
      console.log('ℹ️ [WhatsApp Webhook] Ignoring event:', event);
      return c.json({ success: true, message: 'Event ignored' });
    }
    
    // 2. Verificar se é mensagem recebida (não enviada por nós)
    const isIncoming = !webhookData.data.key.fromMe;
    
    if (!isIncoming) {
      console.log('ℹ️ [WhatsApp Webhook] Ignoring outgoing message');
      return c.json({ success: true, message: 'Outgoing message ignored' });
    }
    
    // 3. Extrair dados da mensagem
    const remoteJid = webhookData.data.key.remoteJid;
    const phoneNumber = remoteJid.split('@')[0];
    const messageText = extractMessageText(webhookData);
    const pushName = webhookData.data.pushName || phoneNumber;
    const messageTimestamp = webhookData.data.messageTimestamp;
    const messageId = webhookData.data.key.id;
    
    console.log('📱 [WhatsApp Webhook] Message from:', pushName, phoneNumber);
    console.log('💬 [WhatsApp Webhook] Content:', messageText);
    
    // 4. Buscar organização pela instância
    // NOTA: Aqui você precisa saber qual organização usa qual instância
    // Por simplicidade, vamos buscar em todas as configs
    const instanceName = webhookData.instance;
    
    const configPrefix = 'chat:channel:config:';
    const allConfigs = await kv.getByPrefix<OrganizationChannelConfig>(configPrefix);
    
    const matchingConfig = allConfigs.find(
      cfg => cfg.whatsapp?.instance_name === instanceName
    );
    
    if (!matchingConfig) {
      console.error('❌ [WhatsApp Webhook] No config found for instance:', instanceName);
      return c.json({
        success: false,
        error: 'Instance not configured in any organization',
      }, 404);
    }
    
    const organizationId = matchingConfig.organization_id;
    console.log('🏢 [WhatsApp Webhook] Organization:', organizationId);
    
    // 5. Buscar ou criar conversação
    let conversation = await findConversationByPhone(organizationId, phoneNumber);
    
    if (!conversation) {
      console.log('➕ [WhatsApp Webhook] Creating new conversation');
      conversation = await createWhatsAppConversation(organizationId, {
        guest_name: pushName,
        guest_phone: phoneNumber,
        whatsapp_contact_id: remoteJid,
      });
    }
    
    console.log('💬 [WhatsApp Webhook] Conversation:', conversation.id);
    
    // 6. Criar mensagem no chat
    const messageDbId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const message: Message = {
      id: messageDbId,
      conversation_id: conversation.id,
      sender_type: 'guest',
      sender_name: pushName,
      content: messageText,
      sent_at: new Date(messageTimestamp * 1000).toISOString(),
      organization_id: organizationId,
      channel: 'whatsapp',
      direction: 'incoming',
      external_id: messageId,
      metadata: {
        whatsapp_message_id: messageId,
      },
    };
    
    const messageKey = `chat:message:${organizationId}:${conversation.id}:${messageDbId}`;
    await kv.set(messageKey, message);
    console.log('✅ [WhatsApp Webhook] Message saved:', messageDbId);
    
    // 7. Atualizar conversação
    conversation.last_message = messageText.substring(0, 100);
    conversation.last_message_at = message.sent_at;
    conversation.status = 'unread';
    conversation.updated_at = new Date().toISOString();
    
    const conversationKey = `chat:conversation:${organizationId}:${conversation.id}`;
    await kv.set(conversationKey, conversation);
    console.log('✅ [WhatsApp Webhook] Conversation updated');
    
    return c.json({ 
      success: true,
      data: {
        conversation_id: conversation.id,
        message_id: messageDbId,
      }
    });
  } catch (error: any) {
    console.error('❌ [WhatsApp Webhook] Error:', error);
    return c.json({ 
      success: false, 
      error: error?.message || 'Webhook processing failed' 
    }, 500);
  }
});

/**
 * POST /chat/channels/whatsapp/send
 * 
 * Envia mensagem via WhatsApp
 */
chat.post('/channels/whatsapp/send', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id, conversation_id, content, metadata } = body;
    
    if (!organization_id || !conversation_id || !content) {
      return c.json({ 
        success: false, 
        error: 'organization_id, conversation_id, and content are required' 
      }, 400);
    }
    
    // 1. Buscar config da organização
    const configKey = `chat:channel:config:${organization_id}`;
    const config = await kv.get<OrganizationChannelConfig>(configKey);
    
    if (!config?.whatsapp?.connected) {
      return c.json({
        success: false,
        error: 'WhatsApp not connected',
      }, 400);
    }
    
    // 2. Buscar conversação
    const conversationKey = `chat:conversation:${organization_id}:${conversation_id}`;
    const conversation = await kv.get<Conversation>(conversationKey);
    
    if (!conversation) {
      return c.json({
        success: false,
        error: 'Conversation not found',
      }, 404);
    }
    
    if (!conversation.guest_phone) {
      return c.json({
        success: false,
        error: 'Conversation has no phone number',
      }, 400);
    }
    
    // 3. Enviar mensagem via Evolution API
    const client = new EvolutionAPIClient({
      apiUrl: config.whatsapp.api_url,
      instanceName: config.whatsapp.instance_name,
      apiKey: config.whatsapp.api_key,
    });
    
    const result = await client.sendTextMessage(
      conversation.guest_phone,
      content
    );
    
    // 4. Salvar mensagem no chat
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const message: Message = {
      id: messageId,
      conversation_id,
      sender_type: 'staff',
      sender_name: 'Você', // TODO: Get from user session
      content,
      sent_at: new Date().toISOString(),
      organization_id,
      channel: 'whatsapp',
      direction: 'outgoing',
      external_id: result.key.id,
      external_status: 'pending',
      metadata: {
        whatsapp_message_id: result.key.id,
        ...metadata,
      },
    };
    
    const messageKey = `chat:message:${organization_id}:${conversation_id}:${messageId}`;
    await kv.set(messageKey, message);
    
    // 5. Atualizar conversação
    conversation.last_message = content.substring(0, 100);
    conversation.last_message_at = message.sent_at;
    conversation.updated_at = new Date().toISOString();
    
    await kv.set(conversationKey, conversation);
    
    return c.json({ success: true, data: message });
  } catch (error: any) {
    console.error('❌ Error sending WhatsApp message:', error);
    return c.json({ 
      success: false, 
      error: error?.message || 'Failed to send message' 
    }, 500);
  }
});

// ============================================
// EXPORT
// ============================================

// export default chat; // JÁ EXISTE NO ARQUIVO ORIGINAL
