# 📱 GUIA: Integração WhatsApp Evolution API

**Versão:** v1.0.103.42  
**Data:** 29 de Outubro de 2025  
**Status:** ⚠️ Parcialmente implementado - Requer backend

---

## 🎯 SUA PERGUNTA

> **"Quero saber se está previsto poder ler o QR Code aqui diretamente em configurações de WhatsApp, no Rendizy?"**

✅ **SIM! Está 100% previsto e já implementado no FRONTEND!**

> **"E quero saber o que ainda precisamos fazer para receber a primeira mensagem de WhatsApp aqui na nossa tela de chat, para testar?"**

⚠️ **Falta implementar 3 rotas no BACKEND** (detalhes abaixo)

---

## 📊 STATUS ATUAL DA IMPLEMENTAÇÃO

### ✅ O QUE JÁ ESTÁ PRONTO (FRONTEND)

#### 1. **Componente WhatsAppIntegration**
```
✅ Tela de configuração em Configurações > Integrações > WhatsApp
✅ Formulário para credenciais (API URL, Instance Name, API Key)
✅ Exibição do QR Code (quando retornado pela API)
✅ Cards de status (conectado/desconectado)
✅ Botões de ação (Testar, Conectar, Desconectar, Salvar)
✅ Visual moderno e consistente
```

#### 2. **Utils/EvolutionAPI Client** (`/utils/evolutionApi.ts`)
```
✅ Cliente completo para Evolution API
✅ Funções:
   - createInstance()
   - getConnectionState()
   - connect()
   - fetchQRCode() 👈 Esta retorna o QR em base64!
   - sendTextMessage()
   - sendMediaMessage()
   - setWebhook()
   - logout()
   - deleteInstance()
```

#### 3. **ChatApi Integration** (`/utils/chatApi.ts`)
```
✅ Tipos definidos (EvolutionAPIConfig, OrganizationChannelConfig)
✅ API do frontend para chamar backend:
   - channelsApi.evolution.connect()
   - channelsApi.evolution.status()
   - channelsApi.evolution.disconnect()
   - channelsApi.evolution.sendMessage()
```

#### 4. **Suporte Multi-Canal no Chat**
```
✅ Mensagens já suportam campo 'channel': 'whatsapp'
✅ Mensagens já suportam metadata (external_id, media_url, etc)
✅ Conversações já suportam channel_metadata
```

---

### ⚠️ O QUE FALTA IMPLEMENTAR (BACKEND)

Faltam **3 rotas** no arquivo `/supabase/functions/server/routes-chat.ts`:

#### **ROTA 1: POST /chat/channels/whatsapp/connect**
```typescript
// Conecta instância WhatsApp e retorna QR Code
chat.post('/channels/whatsapp/connect', async (c) => {
  try {
    const { organization_id, api_url, instance_name, api_key } = await c.req.json();
    
    // 1. Criar cliente Evolution API
    const client = new EvolutionAPIClient({ api_url, instance_name, api_key });
    
    // 2. Criar instância (se não existir)
    await client.createInstance();
    
    // 3. Conectar e obter QR Code
    const qrData = await client.fetchQRCode();
    
    // 4. Salvar config no KV
    const config: OrganizationChannelConfig = {
      organization_id,
      whatsapp: {
        enabled: true,
        api_url,
        instance_name,
        api_key,
        connected: false,
        qr_code: qrData.base64, // 👈 QR CODE AQUI!
        connection_status: 'connecting'
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    await kv.set(`chat:channel:config:${organization_id}`, config);
    
    // 5. Retornar QR Code
    return c.json({
      success: true,
      data: {
        qr_code: qrData.base64, // Frontend exibe este QR!
        instance_name
      }
    });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});
```

#### **ROTA 2: POST /chat/channels/whatsapp/webhook**
```typescript
// Recebe mensagens da Evolution API
chat.post('/channels/whatsapp/webhook', async (c) => {
  try {
    const webhookData = await c.req.json();
    
    // 1. Verificar se é mensagem recebida
    if (webhookData.event !== 'MESSAGES_UPSERT') {
      return c.json({ success: true, message: 'Event ignored' });
    }
    
    // 2. Extrair dados da mensagem
    const isIncoming = !webhookData.data.key.fromMe;
    if (!isIncoming) {
      return c.json({ success: true, message: 'Outgoing message ignored' });
    }
    
    const phoneNumber = webhookData.data.key.remoteJid.split('@')[0];
    const messageText = extractMessageText(webhookData);
    const pushName = webhookData.data.pushName;
    
    // 3. Buscar ou criar conversação
    let conversation = await findConversationByPhone(phoneNumber);
    
    if (!conversation) {
      conversation = await createConversation({
        guest_name: pushName || phoneNumber,
        guest_phone: phoneNumber,
        channel: 'whatsapp',
        channel_metadata: {
          whatsapp_contact_id: webhookData.data.key.remoteJid
        }
      });
    }
    
    // 4. Criar mensagem no chat
    const message: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: conversation.id,
      sender_type: 'guest',
      sender_name: pushName || phoneNumber,
      content: messageText,
      sent_at: new Date(webhookData.data.messageTimestamp * 1000).toISOString(),
      organization_id: conversation.organization_id,
      channel: 'whatsapp',
      direction: 'incoming',
      external_id: webhookData.data.key.id,
      metadata: {
        whatsapp_message_id: webhookData.data.key.id
      }
    };
    
    await kv.set(
      `chat:message:${conversation.organization_id}:${conversation.id}:${message.id}`,
      message
    );
    
    // 5. Atualizar conversação
    conversation.last_message = messageText;
    conversation.last_message_at = message.sent_at;
    conversation.status = 'unread';
    await kv.set(
      `chat:conversation:${conversation.organization_id}:${conversation.id}`,
      conversation
    );
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});
```

#### **ROTA 3: GET /chat/channels/config**
```typescript
// Retorna configuração de canais
chat.get('/channels/config', async (c) => {
  try {
    const organization_id = c.req.query('organization_id');
    
    if (!organization_id) {
      return c.json({ success: false, error: 'organization_id required' }, 400);
    }
    
    const config = await kv.get<OrganizationChannelConfig>(
      `chat:channel:config:${organization_id}`
    );
    
    if (!config) {
      // Retornar config vazia
      return c.json({
        success: true,
        data: {
          organization_id,
          whatsapp: {
            enabled: false,
            api_url: '',
            instance_name: '',
            api_key: '',
            connected: false,
            connection_status: 'disconnected'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      });
    }
    
    return c.json({ success: true, data: config });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});
```

---

## 🎯 COMO FUNCIONA O FLUXO COMPLETO

### **PASSO 1: Configurar Credenciais** ✅ (JÁ FUNCIONA)

```
Usuário vai em: Configurações > Integrações > WhatsApp
Preenche:
  - API URL: https://api.evolutionapi.com
  - Instance Name: rendizy-org-123
  - API Key: xxxxxxxxxxxxxxx
Clica em "Salvar Configurações"
```

**Status:** ✅ Frontend pronto

---

### **PASSO 2: Gerar QR Code** ⚠️ (REQUER BACKEND)

```
Usuário vai na tab "Status & Conexão"
Clica em "Gerar QR Code"

Frontend chama:
  POST /chat/channels/whatsapp/connect

Backend:
  1. Cria instância na Evolution API ❌ FALTA
  2. Gera QR Code (base64) ❌ FALTA
  3. Salva config no KV ❌ FALTA
  4. Retorna QR Code para frontend ❌ FALTA

Frontend:
  1. Recebe QR Code (base64)
  2. Exibe na tela ✅ JÁ FUNCIONA
```

**Imagem do QR exibida assim:**
```jsx
<img 
  src={qrCode} // "data:image/png;base64,iVBORw0K..." 
  alt="WhatsApp QR Code" 
  className="w-64 h-64 object-contain"
/>
```

**Status:** ⚠️ Frontend pronto, backend falta

---

### **PASSO 3: Escanear QR com WhatsApp** ✅ (MANUAL)

```
Usuário:
  1. Abre WhatsApp no celular
  2. Menu (⋮) > Aparelhos conectados
  3. Conectar um aparelho
  4. Escaneia o QR Code na tela do Rendizy
```

**Status:** ✅ Processo manual do usuário

---

### **PASSO 4: Receber Mensagem** ⚠️ (REQUER BACKEND)

```
Quando alguém manda mensagem no WhatsApp:

Evolution API:
  1. Recebe mensagem
  2. Envia para webhook do Rendizy ❌ FALTA ROTA

Backend Rendizy:
  POST /chat/channels/whatsapp/webhook
  1. Recebe webhook ❌ FALTA
  2. Busca/cria conversação ❌ FALTA
  3. Cria mensagem no KV ❌ FALTA
  4. Atualiza status da conversa ❌ FALTA

Frontend:
  1. Chat recarrega (via polling ou websocket)
  2. Exibe nova mensagem ✅ JÁ FUNCIONA
```

**Status:** ⚠️ Backend falta, frontend pronto

---

## 📝 CHECKLIST DE IMPLEMENTAÇÃO

### ✅ Frontend (100% Completo)
- [x] WhatsAppIntegration.tsx criado
- [x] EvolutionAPI client (utils/evolutionApi.ts)
- [x] chatApi integration (utils/chatApi.ts)
- [x] Tipos multi-canal (Message, Conversation)
- [x] UI para exibir QR Code
- [x] UI para gerenciar conexão
- [x] Cards de status e estatísticas

### ⚠️ Backend (0% Implementado)
- [ ] GET /chat/channels/config ❌
- [ ] POST /chat/channels/whatsapp/connect ❌
- [ ] POST /chat/channels/whatsapp/webhook ❌
- [ ] PATCH /chat/channels/config ❌
- [ ] POST /chat/channels/whatsapp/disconnect ❌

---

## 🚀 PRÓXIMOS PASSOS PARA RECEBER PRIMEIRA MENSAGEM

### **Opção A: Implementação Backend Completa** (Recomendado)

1. **Copiar código das rotas acima** para `/supabase/functions/server/routes-chat.ts`
2. **Importar EvolutionAPIClient** no backend
3. **Testar fluxo:**
   - Configurar credenciais
   - Gerar QR Code
   - Escanear com WhatsApp
   - Enviar mensagem teste
   - Ver mensagem aparecer no chat

**Tempo estimado:** 2-3 horas

---

### **Opção B: Mock Rápido para Testar UI** (Desenvolvimento)

Se quiser testar APENAS a UI do QR Code sem implementar backend:

1. **Editar WhatsAppIntegration.tsx:**
```typescript
const handleConnectWhatsApp = async () => {
  // MOCK - Remover depois
  const mockQRCode = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...";
  setQrCode(mockQRCode);
  toast.success('QR Code mockado gerado!');
  return;
  
  // Código real comentado...
};
```

2. **Ver QR Code aparecer na tela**
3. **Depois implementar backend real**

**Tempo estimado:** 5 minutos

---

## 📸 COMO VAI FICAR

### Tela Atual (Screenshot da imagem):
```
Você está vendo a tela da Evolution API com:
✅ Ícone verde "Configurações"
✅ Menu com "Estatísticas, Aplicativos, Integrações, etc"
```

### Tela no Rendizy (Após implementação):
```
┌────────────────────────────────────────────────────┐
│  Configurações > Integrações > WhatsApp Business   │
├────────────────────────────────────────────────────┤
│                                                    │
│  Tab: [Configuração] [Status & Conexão] [Avançado]│
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ Conectar WhatsApp                             │ │
│  │                                               │ │
│  │  [   Gerar QR Code   ]                       │ │
│  │                                               │ │
│  │  ┌────────────────────────────────┐          │ │
│  │  │                                 │          │ │
│  │  │     ███████  ███  ██  ██       │          │ │
│  │  │     ██       █ █  ██  ██       │          │ │
│  │  │     ███████  ███  ██  ██       │          │ │
│  │  │          QR CODE HERE           │          │ │
│  │  │                                 │          │ │
│  │  └────────────────────────────────┘          │ │
│  │                                               │ │
│  │  ✅ QR Code gerado! Escaneie com WhatsApp   │ │
│  │                                               │ │
│  │  📱 Como conectar:                           │ │
│  │  1. Abra WhatsApp no celular                 │ │
│  │  2. Menu > Aparelhos conectados              │ │
│  │  3. Conectar um aparelho                     │ │
│  │  4. Aponte câmera para QR Code               │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│  │ Status  │  │Mensagens│  │  Taxa   │          │
│  │ Online  │  │   0     │  │   0%    │          │
│  └─────────┘  └─────────┘  └─────────┘          │
└────────────────────────────────────────────────────┘
```

---

## 💡 RESPOSTA DIRETA

### ❓ "Está previsto ler QR Code aqui?"

✅ **SIM!** O componente `WhatsAppIntegration.tsx` já tem:
- Botão "Gerar QR Code"
- Area para exibir QR Code (base64 ou URL)
- Instruções de como escanear
- Visual moderno com card branco e sombra

**Código que exibe o QR:**
```tsx
// Linha 560+ do WhatsAppIntegration.tsx
{qrCode && (
  <div className="bg-white p-4 inline-block rounded-lg shadow-lg">
    {qrCode.startsWith('data:image') ? (
      <img 
        src={qrCode}  // 👈 AQUI!
        alt="WhatsApp QR Code" 
        className="w-64 h-64 object-contain"
      />
    ) : (
      <code>{qrCode}</code>
    )}
  </div>
)}
```

---

### ❓ "O que falta para receber primeira mensagem?"

⚠️ **Implementar 3 rotas no backend:**

1. **POST /chat/channels/whatsapp/connect**
   - Gera QR Code e retorna para frontend
   
2. **POST /chat/channels/whatsapp/webhook**
   - Recebe mensagens da Evolution API
   - Cria conversas no KV Store
   - Salva mensagens
   
3. **GET /chat/channels/config**
   - Retorna configuração salva

**Após isso:**
1. Usuario configura credenciais ✅
2. Gera QR Code ✅
3. Escaneia com WhatsApp ✅
4. Envia mensagem teste no WhatsApp
5. **Mensagem aparece no chat do Rendizy!** 🎉

---

## 🎯 RESUMO EXECUTIVO

| Item | Status | Ação |
|------|--------|------|
| **UI do QR Code** | ✅ Pronto | Nenhuma |
| **Cliente Evolution API** | ✅ Pronto | Nenhuma |
| **Tipos e Interfaces** | ✅ Pronto | Nenhuma |
| **Backend - Gerar QR** | ❌ Falta | Implementar rota |
| **Backend - Webhook** | ❌ Falta | Implementar rota |
| **Backend - Config** | ❌ Falta | Implementar rota |

**Tempo estimado para completar:** 2-3 horas de desenvolvimento backend

---

## 📞 TESTE RÁPIDO (5 MIN)

Se quiser ver o QR Code AGORA sem esperar backend:

1. **Editar `/components/WhatsAppIntegration.tsx`:**
```typescript
// Linha ~130
const handleConnectWhatsApp = async () => {
  // MOCK TEMPORÁRIO - Apagar depois!
  setQrCode('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...');
  toast.success('QR Code mockado!');
  return;
  // ... resto do código
};
```

2. **Ir em:** Configurações > Integrações > WhatsApp > Status & Conexão

3. **Clicar:** "Gerar QR Code"

4. **Ver QR Code aparecer!** 🎉

---

## ✅ CONCLUSÃO

**Sim, está 100% previsto e já implementado!** O QR Code já pode ser exibido no Rendizy, falta apenas implementar o backend que:
1. Chama Evolution API
2. Retorna QR Code
3. Recebe webhooks
4. Salva mensagens

**Estimativa:** Com 2-3 horas de trabalho no backend, você estará recebendo mensagens de WhatsApp direto no chat do Rendizy! 📱✅
