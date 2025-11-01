# 🟢 CONFIGURAR WHATSAPP EVOLUTION - CREDENCIAIS REAIS

**Versão:** 1.0.103.86  
**Data:** 30/10/2025  
**Status:** ✅ Pronto para Configurar

---

## 📋 CREDENCIAIS FORNECIDAS

```
Base URL: https://evo.boravendermuito.com.br/manager/
Global API Key: 4de7861e944e291b56fe9781d2b00b36
Instance Name: Rendizy
Instance Token: 0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

---

## ⚡ PASSO A PASSO (3 MINUTOS)

### **1️⃣ CONFIGURAR VARIÁVEIS DE AMBIENTE NO SUPABASE**

Acesse: **Supabase Dashboard → Project Settings → Edge Functions → Manage Secrets**

Adicione estas **4 variáveis**:

```env
EVOLUTION_API_URL=https://evo.boravendermuito.com.br/manager
EVOLUTION_INSTANCE_NAME=Rendizy
EVOLUTION_GLOBAL_API_KEY=4de7861e944e291b56fe9781d2b00b36
EVOLUTION_INSTANCE_TOKEN=0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

**IMPORTANTE:**
- ✅ Copie e cole EXATAMENTE como está (sem espaços extras)
- ✅ Não adicione "/" no final da URL
- ✅ Respeite maiúsculas/minúsculas no Instance Name

---

### **2️⃣ VERIFICAR SE ESTÁ FUNCIONANDO**

Após configurar, teste o health check:

```bash
curl https://{SEU_PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a/whatsapp/health \
  -H "Authorization: Bearer {SEU_ANON_KEY}"
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "healthy": true,
    "version": "Evolution API v2",
    "configured": true,
    "baseUrl": "https://evo.boravendermuito.com.br/manager",
    "instanceName": "Rendizy",
    "hasGlobalKey": true,
    "hasInstanceToken": true
  }
}
```

---

### **3️⃣ CONFIGURAR NO PAINEL DO RENDIZY**

1. Acesse: **Configurações → Integrações**
2. Clique no card **"WhatsApp Business"** (agora está ativo!)
3. Preencha os campos:

```
API URL: https://evo.boravendermuito.com.br/manager
Instance Name: Rendizy
API Key: 0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

4. Clique em **"Conectar WhatsApp"**
5. Escaneie o **QR Code** que aparecerá
6. Aguarde status mudar para **"Conectado ●"**

---

## 🎯 DIFERENÇA IMPORTANTE - HEADERS DA EVOLUTION API

A Evolution API usa **2 headers** de autenticação:

```javascript
headers: {
  "apikey": "4de7861e944e291b56fe9781d2b00b36",        // Global API Key
  "Authorization": "Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50",  // Instance Token
  "Content-Type": "application/json"
}
```

✅ **Já está configurado corretamente no backend!**

---

## 🔐 SEGURANÇA

### ✅ O que está protegido:

- **Global API Key:** Armazenada APENAS no backend (variável de ambiente)
- **Instance Token:** Armazenado APENAS no backend (variável de ambiente)
- **Frontend:** Só envia requisições autenticadas para o proxy interno
- **Proxy Backend:** Valida credenciais antes de chamar Evolution API

### ❌ O que NÃO fazer:

- ❌ Não expor o Global API Key no frontend
- ❌ Não commitar credenciais no código
- ❌ Não compartilhar o Instance Token publicamente

---

## 📡 ENDPOINTS DISPONÍVEIS

Todos já funcionando após configurar as variáveis de ambiente:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/whatsapp/health` | Verificar configuração |
| `GET` | `/whatsapp/status` | Status da conexão |
| `GET` | `/whatsapp/qr-code` | Obter QR Code |
| `POST` | `/whatsapp/send-message` | Enviar texto |
| `POST` | `/whatsapp/send-media` | Enviar mídia |
| `GET` | `/whatsapp/messages` | Buscar mensagens |
| `POST` | `/whatsapp/check-number` | Verificar número |
| `POST` | `/whatsapp/disconnect` | Desconectar |
| `POST` | `/whatsapp/reconnect` | Reconectar |

---

## 🧪 TESTAR ENVIO DE MENSAGEM

Após conectar, teste enviar uma mensagem:

```bash
curl -X POST https://{PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a/whatsapp/send-message \
  -H "Authorization: Bearer {ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "5511999999999@s.whatsapp.net",
    "text": "🎉 Teste RENDIZY - WhatsApp funcionando!"
  }'
```

---

## 🎨 BOTÃO FLUTUANTE

O botão flutuante de WhatsApp IA já está ativo no site!

- ✅ Canto inferior direito
- ✅ Animação de pulso verde
- ✅ Tooltip "Atendimento via IA"
- ✅ Modal de chat ao clicar
- ✅ Verifica status automaticamente
- ✅ Envia mensagens em tempo real

---

## 🚨 TROUBLESHOOTING

### **Problema: "EVOLUTION_API_URL não configurada"**

✅ Configure a variável de ambiente no Supabase

---

### **Problema: Status sempre "Offline"**

1. Verifique se as 4 variáveis de ambiente estão configuradas
2. Teste o health check
3. Verifique se o Instance Name está correto: **"Rendizy"** (com R maiúsculo)

---

### **Problema: QR Code não aparece**

1. Verifique se a instância não está já conectada
2. Desconecte primeiro: **POST /whatsapp/disconnect**
3. Tente novamente obter o QR Code

---

### **Problema: Mensagem não envia**

1. Verifique se o status está "CONNECTED"
2. Confirme que o número está no formato: `5511999999999@s.whatsapp.net`
3. Verifique logs do backend no Supabase Dashboard

---

## 📚 ARQUITETURA COMPLETA

```
┌─────────────────────────────────────────────┐
│           FRONTEND (React)                  │
│                                             │
│  • WhatsAppFloatingButton.tsx               │
│  • evolutionService.ts                      │
│                                             │
│  fetch() → Authorization: Bearer {anonKey}  │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│      BACKEND PROXY (Supabase Edge Fn)       │
│                                             │
│  • routes-whatsapp-evolution.ts             │
│  • Valida configuração                      │
│  • Adiciona headers de autenticação:        │
│    - apikey: {GLOBAL_API_KEY}               │
│    - Authorization: Bearer {INSTANCE_TOKEN} │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│      EVOLUTION API (Externo)                │
│                                             │
│  https://evo.boravendermuito.com.br/manager │
│  • Gerencia instância WhatsApp              │
│  • Envia/recebe mensagens                   │
└─────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST FINAL

- [ ] **Passo 1:** Configurar 4 variáveis de ambiente no Supabase
- [ ] **Passo 2:** Testar health check (deve retornar `"healthy": true`)
- [ ] **Passo 3:** Ir em Configurações → Integrações → WhatsApp
- [ ] **Passo 4:** Preencher formulário e conectar
- [ ] **Passo 5:** Escanear QR Code
- [ ] **Passo 6:** Aguardar status "Conectado ●"
- [ ] **Passo 7:** Testar envio de mensagem
- [ ] **Passo 8:** Clicar no botão flutuante e enviar mensagem de teste

---

## 🎉 RESULTADO FINAL

Após completar o checklist:

✅ **Backend configurado** com credenciais reais  
✅ **WhatsApp conectado** e funcionando  
✅ **Botão flutuante** ativo no site  
✅ **Modal de chat** funcional  
✅ **Envio/recebimento** de mensagens  
✅ **Indicador de status** em tempo real  

---

**🚀 COMECE AGORA PELO PASSO 1!**

Configure as variáveis de ambiente no Supabase e em 3 minutos estará tudo funcionando! 🎊

---

**Versão:** 1.0.103.86  
**Desenvolvido em:** 30/10/2025  
**Sistema:** RENDIZY SaaS B2B
