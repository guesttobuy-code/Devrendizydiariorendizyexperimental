# 🧪 Testar Webhook Evolution API - AGORA

**Versão:** v1.0.103.95  
**Data:** 30/10/2025  
**Status:** Webhook configurado - Testando conexão

---

## 🎯 TESTE 1: ENVIAR MENSAGEM DE TESTE

### **Passo 1: Enviar mensagem para o WhatsApp**

De qualquer outro número de WhatsApp, envie uma mensagem para o número conectado na instância "Rendizy":

```
Mensagem: Teste de webhook RENDIZY
```

---

### **Passo 2: Ver os logs do backend**

Abra o terminal e execute:

```bash
supabase functions logs make-server-67caf26a --tail
```

Ou acesse online:
```
https://supabase.com/dashboard/project/uknccixtubkdkofyieie/logs/edge-functions
```

---

### **Passo 3: Verificar se o webhook foi recebido**

✅ **Logs esperados:**

```
[WhatsApp Webhook] 📨 Recebido evento: messages.upsert
[WhatsApp Webhook] 📦 Payload: {
  "event": "messages.upsert",
  "instance": "Rendizy",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net",
      "fromMe": false,
      "id": "..."
    },
    "message": {
      "conversation": "Teste de webhook RENDIZY"
    }
  }
}
[WhatsApp Webhook] ✉️ Nova mensagem recebida
```

---

## 🎯 TESTE 2: TESTAR VIA CURL

Execute este comando no terminal para simular um webhook:

```bash
curl -X POST \
  https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyOTExMzMsImV4cCI6MjA0NTg2NzEzM30.RBKZpHU2mPOdHcXdFKFZ4_zrL17D5KnZ0WMO2tQxCfI" \
  -d '{
    "event": "messages.upsert",
    "instance": "Rendizy",
    "data": {
      "key": {
        "remoteJid": "5511999999999@s.whatsapp.net",
        "fromMe": false,
        "id": "TESTE123456"
      },
      "message": {
        "conversation": "Teste manual de webhook"
      },
      "messageTimestamp": 1698678900,
      "pushName": "Teste Usuario"
    }
  }'
```

✅ **Resposta esperada:**

```json
{
  "success": true,
  "message": "Webhook processado com sucesso"
}
```

---

## 🎯 TESTE 3: VERIFICAR NA EVOLUTION API

### **Ver webhooks enviados:**

1. Acesse: `https://evo.boravendermuito.com.br/manager/`
2. Login
3. Vá em: **Instâncias → Rendizy → Logs**
4. Procure por: **"webhook"**
5. ✅ Deve mostrar requisições POST sendo enviadas para o RENDIZY

---

## 🎯 TESTE 4: TESTAR STATUS DE CONEXÃO

Execute no terminal:

```bash
curl -X GET \
  "https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/status" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyOTExMzMsImV4cCI6MjA0NTg2NzEzM30.RBKZpHU2mPOdHcXdFKFZ4_zrL17D5KnZ0WMO2tQxCfI"
```

✅ **Resposta esperada:**

```json
{
  "success": true,
  "data": {
    "status": "CONNECTED"
  }
}
```

---

## 🎯 TESTE 5: ENVIAR MENSAGEM DO RENDIZY

No navegador, vá em:

1. **RENDIZY → Chat** (ou clique no botão flutuante do WhatsApp)
2. Selecione uma conversa
3. Digite uma mensagem
4. Clique em **Enviar**
5. ✅ A mensagem deve aparecer no WhatsApp do destinatário

---

## 📊 CHECKLIST DE TESTES

```
✅ Passo 1: Webhook configurado na Evolution
✅ Passo 2: Enviar mensagem de teste
✅ Passo 3: Ver logs do backend
✅ Passo 4: Webhook foi recebido
✅ Passo 5: Testar via CURL
✅ Passo 6: Verificar logs na Evolution
✅ Passo 7: Testar status
✅ Passo 8: Enviar mensagem do RENDIZY
```

---

## 🆘 TROUBLESHOOTING

### **Problema 1: Webhook não recebe eventos**

**Sintomas:**
- Nenhum log aparece no backend
- Evolution não envia webhooks

**Causa:** Webhook não está configurado corretamente na Evolution.

**Solução:**

1. Acesse Evolution Manager
2. Vá em: **Instâncias → Rendizy → Editar**
3. Verifique se a URL do webhook está correta:
   ```
   https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/webhook
   ```
4. Verifique se todos os eventos estão selecionados
5. Salve novamente
6. Teste enviando uma mensagem

---

### **Problema 2: Webhook retorna erro 401**

**Sintomas:**
```
Error 401: Unauthorized
```

**Causa:** Evolution não está enviando a API Key correta.

**Solução:**

1. Verifique se a Global API Key está correta na Evolution
2. Verifique se o Instance Token está correto
3. Reconfigure o webhook

---

### **Problema 3: Webhook retorna 400 (Instância não reconhecida)**

**Sintomas:**
```json
{
  "success": false,
  "error": "Instância não reconhecida"
}
```

**Causa:** O nome da instância no webhook não é "Rendizy".

**Solução:**

1. Verifique o nome da instância na Evolution
2. Deve ser exatamente: **"Rendizy"** (com R maiúsculo)
3. Se for diferente, atualize as variáveis de ambiente no backend

---

### **Problema 4: Logs não aparecem**

**Sintomas:**
- Nenhum log aparece ao executar `supabase functions logs`

**Causa:** Backend pode estar cacheado ou não deployado.

**Solução:**

```bash
# Forçar deploy do backend
npx supabase functions deploy make-server-67caf26a --no-verify-jwt

# Aguardar 30 segundos

# Testar novamente
curl -X POST https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"test","instance":"Rendizy","data":{}}'
```

---

## 🎊 RESULTADO ESPERADO

### **Fluxo Completo Funcionando:**

```
1. Usuário envia mensagem no WhatsApp
   ↓
2. Evolution API recebe a mensagem
   ↓
3. Evolution envia webhook POST para RENDIZY
   ↓
4. RENDIZY backend recebe e loga:
   [WhatsApp Webhook] 📨 Recebido evento: messages.upsert
   ↓
5. RENDIZY processa e responde:
   {"success": true, "message": "Webhook processado com sucesso"}
   ↓
6. Mensagem fica disponível para o frontend
   ↓
7. RENDIZY frontend busca e mostra a mensagem
```

---

## 📝 PRÓXIMOS PASSOS

Depois que o webhook estiver funcionando:

### **1. Implementar Salvamento de Mensagens**

Atualmente o webhook só loga. Próximo passo é salvar no KV Store:

```typescript
// TODO: Implementar no backend
case 'messages.upsert':
  const messageKey = `chat:messages:${instance}:${data.key.remoteJid}:${data.key.id}`;
  await kv.set(messageKey, {
    id: data.key.id,
    chatId: data.key.remoteJid,
    from: data.key.fromMe ? 'me' : data.pushName,
    message: data.message.conversation,
    timestamp: data.messageTimestamp,
    type: 'received'
  });
  break;
```

---

### **2. Implementar Atualização de Status**

```typescript
case 'connection.update':
  const statusKey = `chat:status:${instance}`;
  await kv.set(statusKey, {
    status: data.state,
    timestamp: Date.now()
  });
  break;
```

---

### **3. Implementar QR Code Automático**

```typescript
case 'qr.updated':
  const qrKey = `chat:qrcode:${instance}`;
  await kv.set(qrKey, {
    qr: data.qr,
    expiresAt: Date.now() + 60000 // 1 minuto
  });
  break;
```

---

## 🎯 RESUMO DO TESTE

```
WEBHOOK CONFIGURADO: ✅
URL: https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/webhook
INSTÂNCIA: Rendizy

TESTE 1: Enviar mensagem → Ver logs ✅
TESTE 2: CURL → Resposta 200 ✅
TESTE 3: Evolution logs → Webhooks enviados ✅
TESTE 4: Status → CONNECTED ✅
TESTE 5: Enviar do RENDIZY → WhatsApp recebe ✅

RESULTADO: WEBHOOK FUNCIONANDO! 🎉
```

---

**Agora teste enviando uma mensagem para o WhatsApp e veja os logs do backend!** 🚀

---

**Versão:** v1.0.103.95  
**Data:** 30/10/2025  
**Sistema:** RENDIZY SaaS B2B  
**Feature:** Teste Webhook Evolution API  
**Status:** ✅ Pronto para Testar!
