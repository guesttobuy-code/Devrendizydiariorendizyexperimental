# ⚡ TESTE AGORA - Correção Erro 401 v1.0.103.64

## 🎯 O QUE FOI CORRIGIDO

O backend estava enviando a API Key **duplicada** (headers + body), causando erro 401.

**Correção aplicada:** Removido campo `token` do body, mantendo apenas nos headers.

---

## 🚀 TESTE RÁPIDO (2 minutos)

### 1️⃣ Reiniciar o Backend

**Se estiver usando Deno Deploy local:**
```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente
bash DEPLOY_BACKEND_NOW.sh
```

**Se estiver usando npm dev:**
```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente
npm run dev
```

---

### 2️⃣ Configurar WhatsApp

1. Abra: `http://localhost:5173`
2. Vá para: **Configurações** → **Integrações** → **WhatsApp Business**

**Cole as credenciais:**

```
URL: https://evo.boravendermuito.com.br
Instância: Rendizy
API Key: 4de7861e944e291b56fe9781d2b00b36
```

---

### 3️⃣ Salvar e Testar

1. **💾 Salvar Configurações**
   - Aguarde: `✅ Configurações salvas com sucesso!`

2. **🔄 Testar Conexão**
   - Aguarde: `✅ Conexão testada com sucesso!`

**Se ainda der erro 401 aqui, veja seção de troubleshooting abaixo.**

---

### 4️⃣ Gerar QR Code

1. Vá para aba: **⚡ Status & Conexão**
2. Clique em: **📱 Gerar QR Code**
3. Aguarde alguns segundos...

**Resultado esperado:**
```
🔄 Deletando instância existente...
✅ QR Code gerado! Escaneie com o WhatsApp
[QR Code aparece na tela]
```

---

### 5️⃣ Conectar WhatsApp

1. Abra WhatsApp no celular
2. **Configurações** → **Dispositivos conectados**
3. **Conectar dispositivo**
4. Escaneie o QR Code da tela

**Status esperado:**
```
✅ Conectado
Número: +55 XX XXXXX-XXXX
```

---

## ✅ CHECKLIST RÁPIDO

- [ ] Backend reiniciado
- [ ] RENDIZY aberto
- [ ] Credenciais coladas
- [ ] Salvar: `✅ sucesso`
- [ ] Testar: `✅ sucesso`
- [ ] QR Code: `✅ apareceu`
- [ ] WhatsApp: `✅ conectado`

---

## 🐛 TROUBLESHOOTING

### ❌ Ainda recebe erro 401 ao testar conexão

**Possíveis causas:**

1. **Backend não foi reiniciado**
   ```bash
   # Pare o servidor (Ctrl+C)
   # Inicie novamente
   npm run dev
   ```

2. **API Key incorreta**
   ```
   Verifique se é EXATAMENTE:
   4de7861e944e291b56fe9781d2b00b36
   ```

3. **Evolution API offline**
   ```bash
   # Teste manualmente
   curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
     -H "apikey: 4de7861e944e291b56fe9781d2b00b36"
   ```

4. **Credenciais antigas em cache**
   ```
   1. Limpe o cache do navegador (Ctrl+Shift+Delete)
   2. Recarregue a página (Ctrl+R)
   3. Tente novamente
   ```

---

### ❌ Erro 401 ao gerar QR Code

**Se testar conexão funciona mas gerar QR Code dá erro 401:**

1. **Verifique os logs do backend:**
   ```
   Abra o terminal onde o backend está rodando
   Procure por mensagens de erro
   ```

2. **Global API Key sem permissões:**
   ```
   A API Key precisa ter permissão para CRIAR instâncias
   Verifique no Evolution API Manager
   ```

---

### ❌ Erro 404 - Instância não encontrada

**Causa:** Nome da instância incorreto

**Solução:**
```
Use EXATAMENTE: Rendizy
(com R maiúsculo)
```

---

### ❌ QR Code não aparece

**Causa 1:** Instância não foi criada

**Verificar logs do backend:**
```
Procure por:
✅ New instance created successfully
✅ QR Code extracted successfully

Se não aparecer, a criação falhou
```

**Causa 2:** Resposta sem QR Code

**Verificar console do navegador (F12):**
```
Procure por:
📥 Resposta do backend: { ... }

Se success: false, veja o erro
```

---

## 📊 LOGS ESPERADOS

### Terminal Backend (Sucesso)

```
🔗 Connecting WhatsApp for org: org_default
📡 API URL: https://evo.boravendermuito.com.br
📱 Instance: Rendizy

📡 Evolution API Request:
   Method: GET
   URL: .../instance/connectionState/Rendizy
   API Key: 4de7861e944e29...
   Response Status: 200 OK

✅ Instance already exists

🗑️  DELETING existing instance...
   Method: DELETE
   Response Status: 200 OK

✅ Instance deleted successfully

🆕 Creating NEW instance...
   Method: POST
   URL: .../instance/create
   Body: {
     "instanceName": "Rendizy",
     "qrcode": true,
     "integration": "WHATSAPP-BAILEYS"
   }
   Response Status: 201 Created

✅ New instance created successfully
✅ QR Code extracted successfully
```

### Console Navegador (F12) - Sucesso

```
🔵 Iniciando conexão WhatsApp...
📤 Enviando request para backend...
📥 Resposta do backend: {
  success: true,
  data: { qr_code: "data:image/png;base64,..." }
}
✅ QR Code definido no state
```

---

## 🧪 TESTE ALTERNATIVO: CURL

Se quiser testar manualmente:

### Testar Global API Key

```bash
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36"
```

**Resposta esperada:**
```json
[
  {
    "instance": {
      "instanceName": "Rendizy",
      ...
    }
  }
]
```

### Criar Instância Manualmente

```bash
curl -X POST "https://evo.boravendermuito.com.br/instance/create" \
  -H "Content-Type: application/json" \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -d '{
    "instanceName": "Rendizy",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS"
  }'
```

**Resposta esperada:**
```json
{
  "instance": { ... },
  "qrcode": "data:image/png;base64,..."
}
```

---

## 📚 MAIS INFORMAÇÕES

- **[CHANGELOG_v1.0.103.64_FIX_ERRO_401_TOKEN.md](./CHANGELOG_v1.0.103.64_FIX_ERRO_401_TOKEN.md)** - Detalhes da correção
- **[TESTE_AGORA_WHATSAPP_v1.0.103.63.md](./TESTE_AGORA_WHATSAPP_v1.0.103.63.md)** - Guia completo
- **[COPIAR_COLAR_AGORA.md](./COPIAR_COLAR_AGORA.md)** - Guia rápido

---

## 🎯 RESUMO

| O Que | Status |
|-------|--------|
| **Correção aplicada** | ✅ Sim |
| **Backend atualizado** | ✅ Sim |
| **Pronto para testar** | ✅ Sim |
| **Tempo estimado** | ⏱️ 2 minutos |

---

**Versão:** v1.0.103.64  
**Data:** 2025-10-30  
**Status:** ✅ **PRONTO PARA TESTAR AGORA!**

---

**⚡ Reinicie o backend e teste seguindo os passos acima!**
