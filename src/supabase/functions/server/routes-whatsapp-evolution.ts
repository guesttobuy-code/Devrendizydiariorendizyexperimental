/**
 * RENDIZY - WhatsApp Evolution API Routes (Proxy Seguro)
 * 
 * ✅ CONFIGURADO COM CREDENCIAIS REAIS v1.0.103.102
 * 
 * Base URL: https://evo.boravendermuito.com.br/
 * Global API Key: 4de7861e944e291b56fe9781d2b00b36
 * Instance: Rendizy
 * Token: 0FF3641E80A6-453C-AB4E-28C2F2D01C50
 * 
 * Headers corretos Evolution API:
 * - apikey: Global API Key
 * - Authorization: Bearer {Instance Token}
 * 
 * @version 1.0.103.102
 * @date 2025-10-30
 */

import { Hono } from 'npm:hono@4.0.2';

// ============================================================================
// CONFIGURATION - CREDENCIAIS REAIS
// ============================================================================

const EVOLUTION_API_URL = Deno.env.get('EVOLUTION_API_URL') || 'https://evo.boravendermuito.com.br';
const EVOLUTION_INSTANCE_NAME = Deno.env.get('EVOLUTION_INSTANCE_NAME') || 'Rendizy';
const EVOLUTION_GLOBAL_API_KEY = Deno.env.get('EVOLUTION_GLOBAL_API_KEY') || '4de7861e944e291b56fe9781d2b00b36';
const EVOLUTION_INSTANCE_TOKEN = Deno.env.get('EVOLUTION_INSTANCE_TOKEN') || '0FF3641E80A6-453C-AB4E-28C2F2D01C50';

/**
 * Headers corretos para Evolution API
 * ✅ CORRIGIDO v1.0.103.104: Evolution usa APENAS Authorization header
 * Não usa dois headers separados (apikey + Authorization)
 */
function getEvolutionHeaders() {
  return {
    'Authorization': `Bearer ${EVOLUTION_GLOBAL_API_KEY}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Validar se Evolution está configurado
 */
function validateConfig(): { valid: boolean; error?: string } {
  if (!EVOLUTION_API_URL) {
    return { valid: false, error: 'EVOLUTION_API_URL não configurada' };
  }
  if (!EVOLUTION_GLOBAL_API_KEY) {
    return { valid: false, error: 'EVOLUTION_GLOBAL_API_KEY não configurada' };
  }
  if (!EVOLUTION_INSTANCE_TOKEN) {
    return { valid: false, error: 'EVOLUTION_INSTANCE_TOKEN não configurado' };
  }
  return { valid: true };
}

// ============================================================================
// ROUTES - ✅ CORRIGIDO v1.0.103.99 - Prefixo adicionado a todas as rotas
// ============================================================================

export function whatsappEvolutionRoutes(app: Hono) {

  // ==========================================================================
  // POST /make-server-67caf26a/whatsapp/send-message - Enviar mensagem de texto
  // ==========================================================================
  app.post('/make-server-67caf26a/whatsapp/send-message', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const { number, text } = await c.req.json();

      if (!number || !text) {
        return c.json({ error: 'Número e texto são obrigatórios' }, 400);
      }

      console.log('[WhatsApp] Enviando mensagem:', { number, text });

      const response = await fetch(
        `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'POST',
          headers: getEvolutionHeaders(),
          body: JSON.stringify({
            number,
            text,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[WhatsApp] Erro ao enviar mensagem:', errorText);
        return c.json({ error: 'Erro ao enviar mensagem', details: errorText }, response.status);
      }

      const data = await response.json();
      console.log('[WhatsApp] Mensagem enviada com sucesso');
      return c.json({ success: true, data });
    } catch (error) {
      console.error('[WhatsApp] Erro em send-message:', error);
      return c.json({ error: 'Erro interno ao enviar mensagem' }, 500);
    }
  });

  // ==========================================================================
  // POST /make-server-67caf26a/whatsapp/send-media - Enviar mensagem com mídia
  // ==========================================================================
  app.post('/make-server-67caf26a/whatsapp/send-media', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const { number, mediaUrl, mediaType, caption } = await c.req.json();

      if (!number || !mediaUrl || !mediaType) {
        return c.json({ error: 'Número, URL da mídia e tipo são obrigatórios' }, 400);
      }

      const response = await fetch(
        `${EVOLUTION_API_URL}/message/sendMedia/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'POST',
          headers: getEvolutionHeaders(),
          body: JSON.stringify({
            number,
            mediaUrl,
            mediaType,
            caption,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[WhatsApp] Erro ao enviar mídia:', errorText);
        return c.json({ error: 'Erro ao enviar mídia' }, response.status);
      }

      const data = await response.json();
      return c.json({ success: true, data });
    } catch (error) {
      console.error('[WhatsApp] Erro em send-media:', error);
      return c.json({ error: 'Erro interno ao enviar mídia' }, 500);
    }
  });

  // ==========================================================================
  // GET /make-server-67caf26a/whatsapp/messages - Buscar mensagens (inbox)
  // ==========================================================================
  app.get('/make-server-67caf26a/whatsapp/messages', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const chatId = c.req.query('chatId');
      const limit = c.req.query('limit') || '50';

      const response = await fetch(
        `${EVOLUTION_API_URL}/message/inbox/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'GET',
          headers: getEvolutionHeaders(),
        }
      );

      if (!response.ok) {
        console.error('[WhatsApp] Erro ao buscar mensagens');
        return c.json({ error: 'Erro ao buscar mensagens' }, response.status);
      }

      let data = await response.json();

      // Filtrar por chatId se fornecido
      if (chatId && Array.isArray(data)) {
        data = data.filter((msg: any) => msg.key?.remoteJid === chatId);
      }

      // Limitar quantidade
      if (Array.isArray(data)) {
        data = data.slice(0, parseInt(limit));
      }

      return c.json({ success: true, data });
    } catch (error) {
      console.error('[WhatsApp] Erro em messages:', error);
      return c.json({ error: 'Erro interno ao buscar mensagens' }, 500);
    }
  });

  // ==========================================================================
  // GET /make-server-67caf26a/whatsapp/status - Status da instância
  // ==========================================================================
  app.get('/make-server-67caf26a/whatsapp/status', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ data: { status: 'ERROR', error: configCheck.error } });
      }

      const response = await fetch(
        `${EVOLUTION_API_URL}/instance/status/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'GET',
          headers: getEvolutionHeaders(),
        }
      );

      if (!response.ok) {
        console.error('[WhatsApp] Erro ao buscar status:', response.status);
        return c.json({ data: { status: 'DISCONNECTED' } });
      }

      const data = await response.json();
      console.log('[WhatsApp] Status recebido:', data);
      
      // Mapear status Evolution → Status padrão
      let status = 'DISCONNECTED';
      if (data.instance?.state === 'open') status = 'CONNECTED';
      else if (data.instance?.state === 'connecting') status = 'CONNECTING';
      else if (data.instance?.state === 'close') status = 'DISCONNECTED';

      return c.json({ success: true, data: { status } });
    } catch (error) {
      console.error('[WhatsApp] Erro em status:', error);
      return c.json({ data: { status: 'ERROR' } });
    }
  });

  // ==========================================================================
  // GET /make-server-67caf26a/whatsapp/instance-info - Informações detalhadas da instância
  // ==========================================================================
  app.get('/make-server-67caf26a/whatsapp/instance-info', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const response = await fetch(
        `${EVOLUTION_API_URL}/instance/fetchInstances`,
        {
          method: 'GET',
          headers: getEvolutionHeaders(),
        }
      );

      if (!response.ok) {
        return c.json({ error: 'Erro ao buscar informações' }, response.status);
      }

      const instances = await response.json();
      const instance = Array.isArray(instances)
        ? instances.find((i: any) => i.instance?.instanceName === EVOLUTION_INSTANCE_NAME)
        : null;

      if (!instance) {
        return c.json({ error: 'Instância não encontrada' }, 404);
      }

      return c.json({
        success: true,
        data: {
          status: instance.instance?.state || 'DISCONNECTED',
          phone: instance.instance?.owner || null,
          profileName: instance.instance?.profileName || null,
          profilePictureUrl: instance.instance?.profilePictureUrl || null,
        },
      });
    } catch (error) {
      console.error('[WhatsApp] Erro em instance-info:', error);
      return c.json({ error: 'Erro interno' }, 500);
    }
  });

  // ==========================================================================
  // GET /make-server-67caf26a/whatsapp/qr-code - Obter QR Code para conexão
  // ==========================================================================
  app.get('/make-server-67caf26a/whatsapp/qr-code', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      console.log('[WhatsApp] Solicitando QR Code...');

      const response = await fetch(
        `${EVOLUTION_API_URL}/instance/connect/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'GET',
          headers: getEvolutionHeaders(),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[WhatsApp] Erro ao obter QR Code:', errorText);
        return c.json({ error: 'Erro ao obter QR Code', details: errorText }, response.status);
      }

      const data = await response.json();
      console.log('[WhatsApp] QR Code recebido');

      return c.json({
        success: true,
        data: {
          qrCode: data.base64 || data.code || '',
          expiresAt: new Date(Date.now() + 60000).toISOString(), // 1 minuto
        },
      });
    } catch (error) {
      console.error('[WhatsApp] Erro em qr-code:', error);
      return c.json({ error: 'Erro interno ao obter QR Code' }, 500);
    }
  });

  // ==========================================================================
  // POST /make-server-67caf26a/whatsapp/check-number - Verificar se número existe no WhatsApp
  // ==========================================================================
  app.post('/make-server-67caf26a/whatsapp/check-number', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const { number } = await c.req.json();

      if (!number) {
        return c.json({ error: 'Número é obrigatório' }, 400);
      }

      const response = await fetch(
        `${EVOLUTION_API_URL}/chat/whatsappNumbers/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'POST',
          headers: getEvolutionHeaders(),
          body: JSON.stringify({ numbers: [number] }),
        }
      );

      if (!response.ok) {
        return c.json({ data: { exists: false } });
      }

      const data = await response.json();
      const exists = Array.isArray(data) && data.length > 0 && data[0]?.exists;

      return c.json({ success: true, data: { exists } });
    } catch (error) {
      console.error('[WhatsApp] Erro em check-number:', error);
      return c.json({ data: { exists: false } });
    }
  });

  // ==========================================================================
  // GET /make-server-67caf26a/whatsapp/health - Health check
  // ==========================================================================
  app.get('/make-server-67caf26a/whatsapp/health', async (c) => {
    const configCheck = validateConfig();
    return c.json({
      success: configCheck.valid,
      data: {
        healthy: configCheck.valid,
        version: 'Evolution API v2',
        configured: configCheck.valid,
        baseUrl: EVOLUTION_API_URL,
        instanceName: EVOLUTION_INSTANCE_NAME,
        hasGlobalKey: !!EVOLUTION_GLOBAL_API_KEY,
        hasInstanceToken: !!EVOLUTION_INSTANCE_TOKEN,
        error: configCheck.error,
      },
    });
  });

  // ==========================================================================
  // POST /make-server-67caf26a/whatsapp/disconnect - Desconectar instância
  // ==========================================================================
  app.post('/make-server-67caf26a/whatsapp/disconnect', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const response = await fetch(
        `${EVOLUTION_API_URL}/instance/logout/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'DELETE',
          headers: getEvolutionHeaders(),
        }
      );

      if (!response.ok) {
        return c.json({ error: 'Erro ao desconectar' }, response.status);
      }

      return c.json({ success: true, message: 'Desconectado com sucesso' });
    } catch (error) {
      console.error('[WhatsApp] Erro em disconnect:', error);
      return c.json({ error: 'Erro interno ao desconectar' }, 500);
    }
  });

  // ==========================================================================
  // POST /make-server-67caf26a/whatsapp/reconnect - Reconectar instância
  // ==========================================================================
  app.post('/make-server-67caf26a/whatsapp/reconnect', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const response = await fetch(
        `${EVOLUTION_API_URL}/instance/restart/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'PUT',
          headers: getEvolutionHeaders(),
        }
      );

      if (!response.ok) {
        return c.json({ error: 'Erro ao reconectar' }, response.status);
      }

      return c.json({ success: true, message: 'Reconectado com sucesso' });
    } catch (error) {
      console.error('[WhatsApp] Erro em reconnect:', error);
      return c.json({ error: 'Erro interno ao reconectar' }, 500);
    }
  });

  // ==========================================================================
  // POST /make-server-67caf26a/whatsapp/webhook - Receber eventos da Evolution API
  // ==========================================================================
  app.post('/make-server-67caf26a/whatsapp/webhook', async (c) => {
    try {
      const payload = await c.req.json();
      const { event, instance, data } = payload;

      console.log('[WhatsApp Webhook] 📨 Recebido evento:', event);
      console.log('[WhatsApp Webhook] 📦 Payload:', JSON.stringify(payload, null, 2));

      // Validar instância
      if (instance && instance !== EVOLUTION_INSTANCE_NAME) {
        console.warn('[WhatsApp Webhook] ⚠️ Instância não reconhecida:', instance);
        return c.json({ success: false, error: 'Instância não reconhecida' }, 400);
      }

      // Processar evento
      switch (event) {
        case 'messages.upsert':
          console.log('[WhatsApp Webhook] ✉️ Nova mensagem recebida');
          // TODO: Implementar salvamento de mensagem no KV Store
          // await processNewMessage(data);
          break;

        case 'messages.update':
          console.log('[WhatsApp Webhook] 🔄 Mensagem atualizada');
          // TODO: Implementar atualização de mensagem
          break;

        case 'connection.update':
          console.log('[WhatsApp Webhook] 🔌 Status de conexão atualizado:', data?.state);
          // TODO: Implementar atualização de status
          // await updateConnectionStatus(data);
          break;

        case 'qr.updated':
          console.log('[WhatsApp Webhook] 📱 QR Code atualizado');
          // TODO: Implementar atualização de QR Code
          // await updateQRCode(data);
          break;

        case 'chats.upsert':
          console.log('[WhatsApp Webhook] 💬 Nova conversa criada');
          // TODO: Implementar criação de conversa
          break;

        case 'chats.update':
          console.log('[WhatsApp Webhook] 💬 Conversa atualizada');
          // TODO: Implementar atualização de conversa
          break;

        case 'contacts.upsert':
          console.log('[WhatsApp Webhook] 👤 Novo contato adicionado');
          // TODO: Implementar salvamento de contato
          break;

        case 'contacts.update':
          console.log('[WhatsApp Webhook] 👤 Contato atualizado');
          // TODO: Implementar atualização de contato
          break;

        default:
          console.log('[WhatsApp Webhook] ℹ️ Evento não tratado:', event);
      }

      return c.json({ success: true, message: 'Webhook processado com sucesso' });
    } catch (error) {
      console.error('[WhatsApp Webhook] ❌ Erro ao processar webhook:', error);
      return c.json({ success: false, error: 'Erro ao processar webhook' }, 500);
    }
  });

  // ==========================================================================
  // GET /make-server-67caf26a/whatsapp/chats - Buscar todas as conversas do WhatsApp
  // ==========================================================================
  app.get('/make-server-67caf26a/whatsapp/chats', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        console.error('[WhatsApp] ❌ Configuração inválida:', configCheck.error);
        return c.json({ error: configCheck.error }, 400);
      }

      console.log('[WhatsApp] 📥 Buscando conversas...');
      console.log('[WhatsApp] 🔑 API Key:', EVOLUTION_GLOBAL_API_KEY.substring(0, 10) + '...');
      console.log('[WhatsApp] 📛 Instância:', EVOLUTION_INSTANCE_NAME);

      const headers = getEvolutionHeaders();
      console.log('[WhatsApp] 📋 Headers enviados:', {
        Authorization: headers.Authorization.substring(0, 30) + '...',
        'Content-Type': headers['Content-Type']
      });

      // Lista de endpoints para tentar (em ordem de prioridade)
      const endpoints = [
        `/chat/findChats/${EVOLUTION_INSTANCE_NAME}`,
        `/message/findMessages/${EVOLUTION_INSTANCE_NAME}`,
        `/instance/fetchChats/${EVOLUTION_INSTANCE_NAME}`,
        `/${EVOLUTION_INSTANCE_NAME}/chat/findChats`,
        `/chat/fetch/${EVOLUTION_INSTANCE_NAME}`,
      ];

      let chats = null;
      let lastError = null;

      // Tentar cada endpoint até encontrar um que funcione
      for (const endpoint of endpoints) {
        try {
          const url = `${EVOLUTION_API_URL}${endpoint}`;
          console.log(`[WhatsApp] 🧪 Tentando endpoint: ${url}`);

          const response = await fetch(url, {
            method: 'GET',
            headers: getEvolutionHeaders(),
          });

          console.log(`[WhatsApp] 📡 Status: ${response.status}`);

          // Ler resposta como texto primeiro
          const responseText = await response.text();
          
          // Verificar se é HTML (painel web)
          if (responseText.includes('<!doctype') || responseText.includes('<html')) {
            console.log(`[WhatsApp] ⚠️ Endpoint retornou HTML (painel web), tentando próximo...`);
            continue;
          }

          // Verificar se a resposta é válida
          if (!response.ok) {
            console.log(`[WhatsApp] ⚠️ Status ${response.status}, tentando próximo...`);
            lastError = {
              endpoint,
              status: response.status,
              response: responseText.substring(0, 200)
            };
            continue;
          }

          // Tentar fazer parse do JSON
          try {
            chats = JSON.parse(responseText);
            console.log(`[WhatsApp] ✅ SUCESSO! Endpoint funcional: ${endpoint}`);
            console.log(`[WhatsApp] 💬 Conversas encontradas: ${Array.isArray(chats) ? chats.length : 'não é array'}`);
            
            if (chats && chats.length > 0) {
              console.log('[WhatsApp] 📄 Primeira conversa (exemplo):', JSON.stringify(chats[0], null, 2));
            }
            
            // Endpoint funcionou! Salvar para uso futuro
            break;
          } catch (parseError) {
            console.log(`[WhatsApp] ⚠️ Resposta não é JSON válido, tentando próximo...`);
            continue;
          }
        } catch (error) {
          console.log(`[WhatsApp] ⚠️ Erro ao tentar ${endpoint}:`, error);
          continue;
        }
      }

      // Se não encontrou nenhum endpoint funcional
      if (chats === null) {
        console.error('[WhatsApp] ❌ Nenhum endpoint funcionou!');
        console.error('[WhatsApp] ❌ Último erro:', lastError);
        
        return c.json({ 
          error: 'Nenhum endpoint da Evolution API funcionou', 
          details: {
            message: 'Todos os endpoints retornaram HTML ou erro',
            testedEndpoints: endpoints,
            lastError,
            suggestion: 'Verifique se a instância está conectada e se a Evolution API está configurada corretamente'
          }
        }, 500);
      }

      return c.json({ success: true, data: chats });
    } catch (error) {
      console.error('[WhatsApp] ❌ Erro exception em chats:', error);
      console.error('[WhatsApp] ❌ Stack trace:', error instanceof Error ? error.stack : 'N/A');
      return c.json({ 
        error: 'Erro interno ao buscar conversas', 
        details: {
          message: String(error),
          stack: error instanceof Error ? error.stack : undefined
        }
      }, 500);
    }
  });

  // ==========================================================================
  // GET /make-server-67caf26a/whatsapp/messages/:chatId - Buscar mensagens de uma conversa
  // ==========================================================================
  app.get('/make-server-67caf26a/whatsapp/messages/:chatId', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const chatId = c.req.param('chatId');
      const limit = c.req.query('limit') || '50';

      console.log('[WhatsApp] 📥 Buscando mensagens do chat:', chatId);

      const response = await fetch(
        `${EVOLUTION_API_URL}/chat/findMessages/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'POST',
          headers: getEvolutionHeaders(),
          body: JSON.stringify({
            where: {
              key: {
                remoteJid: chatId
              }
            },
            limit: parseInt(limit)
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[WhatsApp] Erro ao buscar mensagens:', errorText);
        return c.json({ error: 'Erro ao buscar mensagens' }, response.status);
      }

      const messages = await response.json();
      console.log('[WhatsApp] ✉️ Mensagens encontradas:', messages.length || 0);

      return c.json({ success: true, data: messages });
    } catch (error) {
      console.error('[WhatsApp] Erro em messages:', error);
      return c.json({ error: 'Erro interno ao buscar mensagens' }, 500);
    }
  });

  // ==========================================================================
  // POST /make-server-67caf26a/whatsapp/send-list - Enviar lista interativa
  // ==========================================================================
  app.post('/make-server-67caf26a/whatsapp/send-list', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const { number, listMessage } = await c.req.json();

      if (!number || !listMessage) {
        return c.json({ error: 'Número e listMessage são obrigatórios' }, 400);
      }

      console.log('[WhatsApp] 📋 Enviando lista interativa:', { number, title: listMessage.title });

      const response = await fetch(
        `${EVOLUTION_API_URL}/message/sendList/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'POST',
          headers: getEvolutionHeaders(),
          body: JSON.stringify({
            number,
            listMessage,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[WhatsApp] Erro ao enviar lista:', errorText);
        return c.json({ error: 'Erro ao enviar lista', details: errorText }, response.status);
      }

      const data = await response.json();
      console.log('[WhatsApp] ✅ Lista enviada com sucesso');
      return c.json({ success: true, data });
    } catch (error) {
      console.error('[WhatsApp] Erro em send-list:', error);
      return c.json({ error: 'Erro interno ao enviar lista' }, 500);
    }
  });

  // ==========================================================================
  // POST /make-server-67caf26a/whatsapp/send-location - Enviar localização
  // ==========================================================================
  app.post('/make-server-67caf26a/whatsapp/send-location', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const { number, locationMessage } = await c.req.json();

      if (!number || !locationMessage || !locationMessage.latitude || !locationMessage.longitude) {
        return c.json({ error: 'Número, latitude e longitude são obrigatórios' }, 400);
      }

      console.log('[WhatsApp] 📍 Enviando localização:', {
        number,
        name: locationMessage.name,
        lat: locationMessage.latitude,
        lng: locationMessage.longitude
      });

      const response = await fetch(
        `${EVOLUTION_API_URL}/message/sendLocation/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'POST',
          headers: getEvolutionHeaders(),
          body: JSON.stringify({
            number,
            locationMessage,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[WhatsApp] Erro ao enviar localização:', errorText);
        return c.json({ error: 'Erro ao enviar localização', details: errorText }, response.status);
      }

      const data = await response.json();
      console.log('[WhatsApp] ✅ Localização enviada com sucesso');
      return c.json({ success: true, data });
    } catch (error) {
      console.error('[WhatsApp] Erro em send-location:', error);
      return c.json({ error: 'Erro interno ao enviar localização' }, 500);
    }
  });

  // ==========================================================================
  // POST /make-server-67caf26a/whatsapp/send-poll - Enviar enquete
  // ==========================================================================
  app.post('/make-server-67caf26a/whatsapp/send-poll', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const { number, pollMessage } = await c.req.json();

      if (!number || !pollMessage || !pollMessage.name || !pollMessage.values) {
        return c.json({ error: 'Número, pergunta e opções são obrigatórios' }, 400);
      }

      console.log('[WhatsApp] 📊 Enviando enquete:', {
        number,
        question: pollMessage.name,
        optionsCount: pollMessage.values.length
      });

      const response = await fetch(
        `${EVOLUTION_API_URL}/message/sendPoll/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'POST',
          headers: getEvolutionHeaders(),
          body: JSON.stringify({
            number,
            pollMessage,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[WhatsApp] Erro ao enviar enquete:', errorText);
        return c.json({ error: 'Erro ao enviar enquete', details: errorText }, response.status);
      }

      const data = await response.json();
      console.log('[WhatsApp] ✅ Enquete enviada com sucesso');
      return c.json({ success: true, data });
    } catch (error) {
      console.error('[WhatsApp] Erro em send-poll:', error);
      return c.json({ error: 'Erro interno ao enviar enquete' }, 500);
    }
  });

  // ==========================================================================
  // PUT /make-server-67caf26a/whatsapp/mark-as-read - Marcar mensagens como lidas
  // ==========================================================================
  app.put('/make-server-67caf26a/whatsapp/mark-as-read', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const { read_messages } = await c.req.json();

      if (!read_messages || !Array.isArray(read_messages)) {
        return c.json({ error: 'read_messages deve ser um array' }, 400);
      }

      console.log('[WhatsApp] ✅ Marcando mensagens como lidas:', read_messages.length);

      const response = await fetch(
        `${EVOLUTION_API_URL}/chat/markMessageAsRead/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'PUT',
          headers: getEvolutionHeaders(),
          body: JSON.stringify({ read_messages }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[WhatsApp] Erro ao marcar como lido:', errorText);
        return c.json({ error: 'Erro ao marcar como lido', details: errorText }, response.status);
      }

      const data = await response.json();
      console.log('[WhatsApp] ✅ Mensagens marcadas como lidas com sucesso');
      return c.json({ success: true, data });
    } catch (error) {
      console.error('[WhatsApp] Erro em mark-as-read:', error);
      return c.json({ error: 'Erro interno ao marcar como lido' }, 500);
    }
  });

  // ==========================================================================
  // POST /make-server-67caf26a/whatsapp/settings - Configurar instância
  // ==========================================================================
  app.post('/make-server-67caf26a/whatsapp/settings', async (c) => {
    try {
      const configCheck = validateConfig();
      if (!configCheck.valid) {
        return c.json({ error: configCheck.error }, 400);
      }

      const settings = await c.req.json();

      console.log('[WhatsApp] ⚙️ Atualizando configurações:', settings);

      const response = await fetch(
        `${EVOLUTION_API_URL}/settings/set/${EVOLUTION_INSTANCE_NAME}`,
        {
          method: 'POST',
          headers: getEvolutionHeaders(),
          body: JSON.stringify(settings),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[WhatsApp] Erro ao atualizar configurações:', errorText);
        return c.json({ error: 'Erro ao atualizar configurações', details: errorText }, response.status);
      }

      const data = await response.json();
      console.log('[WhatsApp] ✅ Configurações atualizadas com sucesso');
      return c.json({ success: true, data });
    } catch (error) {
      console.error('[WhatsApp] Erro em settings:', error);
      return c.json({ error: 'Erro interno ao atualizar configurações' }, 500);
    }
  });

  return app;
}