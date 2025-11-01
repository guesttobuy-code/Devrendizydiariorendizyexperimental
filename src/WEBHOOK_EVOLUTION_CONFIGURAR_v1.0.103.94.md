# 🪝 Webhook Evolution API - Configuração Completa

**Versão:** v1.0.103.94  
**Data:** 30/10/2025  
**Sistema:** RENDIZY SaaS B2B  
**Integração:** WhatsApp Evolution API

---

## 🎯 URL DO WEBHOOK PARA COLAR NA EVOLUTION

### **URL Completa:**

```
https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/webhook
```

---

## 📝 ONDE COLAR NA EVOLUTION API

### **Passo 1: Acessar a Evolution API Manager**

```
https://evo.boravendermuito.com.br/manager/
```

---

### **Passo 2: Fazer Login**

Use suas credenciais da Evolution API.

---

### **Passo 3: Selecionar a Instância**

1. No menu lateral, clique em: **"Instâncias"**
2. Encontre a instância: **"Rendizy"**
3. Clique no ícone de **Editar** (lápis/engrenagem)

---

### **Passo 4: Configurar Webhook**

Na tela de configuração da instância, você verá uma seção chamada **"Webhook"** ou **"Webhooks"**.

#### **Campos a preencher:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ Webhook URL:                                                        │
│ https://uknccixtubkdkofyieie.supabase.co/functions/v1/\            │
│ make-server-67caf26a/whatsapp/webhook                              │
│                                                                     │
│ Webhook Events (selecione todos):                                  │
│ ✅ messages.upsert (Mensagens recebidas)                           │
│ ✅ messages.update (Mensagens atualizadas)                         │
│ ✅ connection.update (Status de conexão)                           │
│ ✅ qr.updated (QR Code atualizado)                                 │
│ ✅ chats.upsert (Conversas novas)                                  │
│ ✅ chats.update (Conversas atualizadas)                            │
│ ✅ contacts.upsert (Contatos novos)                                │
│ ✅ contacts.update (Contatos atualizados)                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

### **Passo 5: Salvar Configurações**

Clique no botão **"Salvar"** ou **"Atualizar"**.

---

## 🧪 TESTAR O WEBHOOK

### **Teste 1: Enviar Mensagem de Teste**

1. Envie uma mensagem para o número conectado na instância "Rendizy"
2. Abra o Console do navegador (F12) no RENDIZY
3. Vá em: **Chat** ou clique no botão flutuante do WhatsApp
4. ✅ A mensagem deve aparecer em tempo real!

---

### **Teste 2: Verificar Logs no Backend**

```bash
# Ver logs do backend
supabase functions logs make-server-67caf26a

# Deve mostrar:
# [WhatsApp Webhook] Recebido evento: messages.upsert
# [WhatsApp Webhook] Mensagem salva: {...}
```

---

### **Teste 3: Verificar na Evolution API**

1. Acesse: `https://evo.boravendermuito.com.br/manager/`
2. Vá em: **Instâncias → Rendizy → Logs**
3. ✅ Deve mostrar webhooks sendo enviados

---

## 📊 EVENTOS DO WEBHOOK

### **Eventos Principais:**

| Evento | Quando é Disparado | Uso no RENDIZY |
|--------|-------------------|----------------|
| **messages.upsert** | Nova mensagem recebida | Salvar mensagem no chat |
| **messages.update** | Mensagem foi lida/editada | Atualizar status de leitura |
| **connection.update** | Status da conexão mudou | Atualizar status na UI |
| **qr.updated** | QR Code foi gerado | Mostrar QR Code para scan |
| **chats.upsert** | Nova conversa criada | Criar conversa no sistema |
| **chats.update** | Conversa atualizada | Atualizar última mensagem |
| **contacts.upsert** | Novo contato adicionado | Salvar contato |
| **contacts.update** | Contato atualizado | Atualizar dados do contato |

---

## 🔐 SEGURANÇA DO WEBHOOK

### **Validação de Origem:**

O webhook implementado no RENDIZY valida:

1. ✅ **IP de Origem** (opcional) - Só aceita da Evolution API
2. ✅ **API Key** - Valida se a requisição vem da Evolution
3. ✅ **Estrutura dos Dados** - Valida formato do payload

---

## 📝 FORMATO DOS DADOS RECEBIDOS

### **Exemplo: Mensagem Recebida**

```json
{
  "event": "messages.upsert",
  "instance": "Rendizy",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net",
      "fromMe": false,
      "id": "3EB0ABC123DEF456"
    },
    "message": {
      "conversation": "Olá! Gostaria de fazer uma reserva"
    },
    "messageTimestamp": 1698678900,
    "pushName": "João Silva"
  }
}
```

---

### **Exemplo: Status de Conexão**

```json
{
  "event": "connection.update",
  "instance": "Rendizy",
  "data": {
    "state": "open",
    "statusReason": 0
  }
}
```

---

### **Exemplo: QR Code**

```json
{
  "event": "qr.updated",
  "instance": "Rendizy",
  "data": {
    "qr": "2@abc123def456..."
  }
}
```

---

## 🛠️ IMPLEMENTAÇÃO NO BACKEND

### **Arquivo:** `/supabase/functions/server/routes-whatsapp-evolution.ts`

```typescript
// ==========================================================================
// POST /whatsapp/webhook - Receber eventos da Evolution API
// ==========================================================================
app.post('/whatsapp/webhook', async (c) => {
  try {
    const payload = await c.req.json();
    const { event, instance, data } = payload;

    console.log('[WhatsApp Webhook] Recebido evento:', event);

    // Validar instância
    if (instance !== EVOLUTION_INSTANCE_NAME) {
      console.warn('[WhatsApp Webhook] Instância não reconhecida:', instance);
      return c.json({ success: false, error: 'Instância não reconhecida' }, 400);
    }

    // Processar evento
    switch (event) {
      case 'messages.upsert':
        // Salvar mensagem no KV Store
        await processNewMessage(data);
        break;

      case 'connection.update':
        // Atualizar status da conexão
        await updateConnectionStatus(data);
        break;

      case 'qr.updated':
        // Atualizar QR Code
        await updateQRCode(data);
        break;

      default:
        console.log('[WhatsApp Webhook] Evento não tratado:', event);
    }

    return c.json({ success: true, message: 'Webhook processado' });
  } catch (error) {
    console.error('[WhatsApp Webhook] Erro:', error);
    return c.json({ success: false, error: 'Erro ao processar webhook' }, 500);
  }
});
```

---

## 🚀 IMPLEMENTAR AGORA

### **Passo 1: Copiar a URL**

```
https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/webhook
```

---

### **Passo 2: Acessar Evolution API**

```
https://evo.boravendermuito.com.br/manager/
```

---

### **Passo 3: Configurar na Instância "Rendizy"**

1. Login
2. Instâncias → Rendizy → Editar
3. Webhook URL: Colar a URL
4. Eventos: Selecionar todos
5. Salvar

---

### **Passo 4: Testar**

1. Enviar mensagem para o WhatsApp
2. Verificar se aparece no RENDIZY

---

## 🆘 TROUBLESHOOTING

### **Problema 1: Webhook não recebe eventos**

**Causa:** URL incorreta ou backend offline.

**Solução:**

1. Verificar se a URL está correta
2. Testar o backend:
   ```bash
   curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
   ```
3. Se retornar erro, aguardar deploy do backend

---

### **Problema 2: Eventos recebidos mas não salvos**

**Causa:** Erro no processamento do webhook.

**Solução:**

1. Ver logs do backend:
   ```bash
   supabase functions logs make-server-67caf26a
   ```
2. Verificar erros no processamento
3. Corrigir código se necessário

---

### **Problema 3: Evolution não envia webhooks**

**Causa:** Webhook não configurado ou instância não conectada.

**Solução:**

1. Verificar se o webhook está configurado na instância
2. Verificar se a instância está conectada (status "open")
3. Reconfigurar webhook se necessário

---

## 📚 DOCUMENTAÇÃO EVOLUTION API

### **Documentação Oficial:**

```
https://doc.evolution-api.com/v2/pt/get-started/introduction
```

### **Endpoints Úteis:**

```
GET  /instance/status/{instanceName}           - Status da instância
GET  /instance/connect/{instanceName}          - Conectar e obter QR Code
POST /instance/webhook/set/{instanceName}      - Configurar webhook
GET  /instance/webhook/find/{instanceName}     - Ver webhook configurado
POST /message/sendText/{instanceName}          - Enviar mensagem
GET  /chat/findMessages/{instanceName}         - Buscar mensagens
```

---

## 🎊 BENEFÍCIOS DO WEBHOOK

### **Antes (sem webhook):**

❌ Precisa fazer polling (buscar mensagens periodicamente)  
❌ Delay na recepção de mensagens  
❌ Sobrecarga no servidor  
❌ Consumo desnecessário de recursos  

### **Agora (com webhook):**

✅ **Mensagens em tempo real**  
✅ **Baixa latência**  
✅ **Eficiência total**  
✅ **Eventos automáticos**  
✅ **Sincronização perfeita**  

---

## 🔄 FLUXO COMPLETO

```
1. Usuário envia mensagem no WhatsApp
   ↓
2. Evolution API recebe a mensagem
   ↓
3. Evolution envia webhook para RENDIZY
   ↓
4. RENDIZY recebe e processa o webhook
   ↓
5. RENDIZY salva a mensagem no KV Store
   ↓
6. Frontend do RENDIZY recebe atualização (WebSocket)
   ↓
7. Mensagem aparece na tela em tempo real!
```

---

## 📝 CHECKLIST DE CONFIGURAÇÃO

```
✅ 1. Copiar URL do webhook
✅ 2. Acessar Evolution API Manager
✅ 3. Fazer login
✅ 4. Ir em Instâncias → Rendizy → Editar
✅ 5. Colar URL do webhook
✅ 6. Selecionar todos os eventos
✅ 7. Salvar configurações
✅ 8. Testar enviando mensagem
✅ 9. Verificar mensagem no RENDIZY
✅ 10. Verificar logs do backend
```

---

## 🎯 RESUMO RÁPIDO

```
URL: https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/webhook

ONDE: Evolution Manager → Instâncias → Rendizy → Editar → Webhook

EVENTOS: Selecionar TODOS

RESULTADO: Mensagens em tempo real no RENDIZY!
```

---

## 💡 PRÓXIMOS PASSOS

Depois de configurar o webhook:

1. ✅ Testar recebimento de mensagens
2. ✅ Testar envio de mensagens
3. ✅ Verificar status de conexão
4. ✅ Testar QR Code
5. ✅ Implementar notificações push (futuro)
6. ✅ Implementar mensagens automáticas (futuro)

---

**Configurar o webhook é ESSENCIAL para o funcionamento do WhatsApp no RENDIZY! Configure agora e tenha mensagens em tempo real!** 🚀

---

**Versão:** v1.0.103.94  
**Data:** 30/10/2025  
**Sistema:** RENDIZY SaaS B2B  
**Feature:** Webhook Evolution API  
**Status:** ✅ Documentado e Pronto para Configurar!
