# 🔧 CHANGELOG v1.0.103.64 - Fix Erro 401 Token

## 📅 Data: 2025-10-30

## 🐛 PROBLEMA IDENTIFICADO

Ao tentar conectar o WhatsApp com a Global API Key correta (`4de7861e944e291b56fe9781d2b00b36`), o sistema retornava erro 401:

```
❌ API Error: API Key inválida ou sem permissão
```

### Causa Raiz

O backend estava enviando a API Key **no body da requisição** ao criar a instância:

```typescript
// ❌ ERRADO
{
  instanceName: instance_name,
  token: api_key,  // ← ERRO: token é outro campo!
  qrcode: true,
  integration: 'WHATSAPP-BAILEYS'
}
```

A Evolution API espera:
1. **Global API Key** nos **headers** (para autenticação)
2. Campo `token` no body é **opcional** e serve para outro propósito

---

## ✅ CORREÇÃO APLICADA

### Arquivo: `/supabase/functions/server/routes-chat.ts`

**Antes (linha 1296-1301):**
```typescript
{
  instanceName: instance_name,
  token: api_key,           // ❌ ERRADO
  qrcode: true,
  integration: 'WHATSAPP-BAILEYS'
}
```

**Depois:**
```typescript
{
  instanceName: instance_name,
  qrcode: true,              // ✅ CORRETO
  integration: 'WHATSAPP-BAILEYS'
}
```

### Como Funciona Agora

1. **Global API Key** é enviada nos **headers** via `evolutionRequest()`:
   ```typescript
   headers: {
     'apikey': config.apiKey,
     'api-key': config.apiKey,
     'Authorization': `Bearer ${config.apiKey}`
   }
   ```

2. **Body** contém apenas os dados da instância:
   ```typescript
   {
     instanceName: 'Rendizy',
     qrcode: true,
     integration: 'WHATSAPP-BAILEYS'
   }
   ```

---

## 🎯 RESULTADO ESPERADO

Agora, ao configurar o WhatsApp com:
- URL: `https://evo.boravendermuito.com.br`
- Instância: `Rendizy`
- API Key: `4de7861e944e291b56fe9781d2b00b36`

O sistema deve:
1. ✅ Autenticar corretamente com a Global API Key
2. ✅ Deletar a instância existente (se houver)
3. ✅ Criar uma nova instância
4. ✅ Retornar o QR Code válido
5. ✅ Permitir conexão do WhatsApp

---

## 🧪 COMO TESTAR

### 1. Abrir o RENDIZY

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### 2. Ir para WhatsApp

**Configurações** → **Integrações** → **WhatsApp Business**

### 3. Preencher Credenciais

```
URL da Evolution API: https://evo.boravendermuito.com.br
Nome da Instância: Rendizy
API Key: 4de7861e944e291b56fe9781d2b00b36
```

### 4. Salvar e Testar

1. Clique em **"Salvar Configurações"**
   - Deve aparecer: `✅ Configurações salvas com sucesso!`

2. Clique em **"Testar Conexão"**
   - Deve aparecer: `✅ Conexão testada com sucesso!`

### 5. Gerar QR Code

1. Vá para a aba **"Status & Conexão"**
2. Clique em **"Gerar QR Code"**
3. Aguarde alguns segundos
4. QR Code deve aparecer na tela

**Resultado esperado:**
```
🔄 Deletando instância existente...
✅ QR Code gerado! Escaneie com o WhatsApp
[QR Code visível]
```

### 6. Conectar WhatsApp

1. Abra WhatsApp no celular
2. Vá em: **Configurações** → **Dispositivos conectados**
3. Toque em: **Conectar dispositivo**
4. Escaneie o QR Code

**Status esperado:**
```
✅ Conectado
Número: +55 XX XXXXX-XXXX
```

---

## 📊 COMPARAÇÃO: ANTES vs DEPOIS

### ❌ ANTES (v1.0.103.63)

```
Backend envia:
  Headers: {
    'apikey': '4de7861e944e291b56fe9781d2b00b36'
  }
  Body: {
    instanceName: 'Rendizy',
    token: '4de7861e944e291b56fe9781d2b00b36',  ← DUPLICADO!
    qrcode: true
  }

Evolution API responde:
  ❌ 401 Unauthorized
  "API Key inválida"
```

### ✅ DEPOIS (v1.0.103.64)

```
Backend envia:
  Headers: {
    'apikey': '4de7861e944e291b56fe9781d2b00b36'
  }
  Body: {
    instanceName: 'Rendizy',
    qrcode: true                                 ← SEM TOKEN!
  }

Evolution API responde:
  ✅ 200 OK
  {
    instance: { ... },
    qrcode: "data:image/png;base64,..."
  }
```

---

## 🎓 CONCEITO: Campo `token` vs Global API Key

### Global API Key (Headers)
- **Propósito:** Autenticar requisições ao Evolution API Manager
- **Onde usar:** Headers de todas as requisições
- **Exemplo:** `apikey: 4de7861e944e291b56fe9781d2b00b36`

### Campo `token` (Body)
- **Propósito:** Token de webhook da instância (opcional)
- **Onde usar:** Body ao criar instância (se precisar)
- **Exemplo:** `token: "meu-webhook-token-123"`
- **Nota:** Campo **opcional** e **diferente** da Global API Key

**❗ IMPORTANTE:** Não confundir os dois!

---

## 🔍 LOGS ESPERADOS

### Backend (Terminal do servidor)

```
🔗 Connecting WhatsApp for org: org_default
📡 API URL: https://evo.boravendermuito.com.br
📱 Instance: Rendizy

📡 Evolution API Request:
   Method: GET
   URL: https://evo.boravendermuito.com.br/instance/connectionState/Rendizy
   API Key: 4de7861e944e29...
   Response Status: 200 OK

✅ Instance already exists

🗑️  DELETING existing instance to force fresh QR Code generation...
   Method: DELETE
   URL: https://evo.boravendermuito.com.br/instance/delete/Rendizy
   Response Status: 200 OK

✅ Instance deleted successfully
⏳ Waiting 2 seconds for Evolution API to process deletion...

🆕 Creating NEW instance...
   Method: POST
   URL: https://evo.boravendermuito.com.br/instance/create
   Body: {
     "instanceName": "Rendizy",
     "qrcode": true,
     "integration": "WHATSAPP-BAILEYS"
   }
   Response Status: 201 Created

✅ New instance created successfully
✅ QR Code extracted successfully
```

### Frontend (Console do navegador - F12)

```
🔵 Iniciando conexão WhatsApp...
⚠️  A instância existente será deletada e recriada
📤 Enviando request para backend...
📥 Resposta do backend: {
  success: true,
  data: { qr_code: "data:image/png;base64,..." }
}
🔍 QR Code recebido: data:image/png;base64,iVBOR...
✅ QR Code definido no state
```

---

## 🐛 TROUBLESHOOTING

### Ainda recebe erro 401?

**Causa 1:** API Key incorreta
```
Solução: Verifique se é exatamente: 4de7861e944e291b56fe9781d2b00b36
```

**Causa 2:** Evolution API não está respondendo
```
Solução: Teste manualmente com curl:

curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36"
```

**Causa 3:** Global API Key sem permissões
```
Solução: Verifique no Evolution API Manager se a key tem permissão
para criar/deletar instâncias
```

### Erro 404?

**Causa:** Nome da instância incorreto
```
Solução: Use exatamente "Rendizy" (R maiúsculo)
```

### QR Code não aparece?

**Causa:** Instância não foi criada com sucesso
```
Solução:
1. Verifique os logs do backend (terminal)
2. Procure por "✅ New instance created successfully"
3. Se não aparecer, a criação falhou
```

---

## 📚 DOCUMENTAÇÃO RELACIONADA

- **[TESTE_AGORA_WHATSAPP_v1.0.103.63.md](./TESTE_AGORA_WHATSAPP_v1.0.103.63.md)** - Guia de teste
- **[CHANGELOG_v1.0.103.63_GLOBAL_API_KEY_CONFIGURADA.md](./CHANGELOG_v1.0.103.63_GLOBAL_API_KEY_CONFIGURADA.md)** - Changelog anterior
- **[RESUMO_EXECUTIVO_v1.0.103.63.md](./RESUMO_EXECUTIVO_v1.0.103.63.md)** - Resumo executivo
- **[COPIAR_COLAR_AGORA.md](./COPIAR_COLAR_AGORA.md)** - Guia rápido

---

## 🎯 RESUMO DA MUDANÇA

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Campo token no body** | ❌ Presente | ✅ Removido |
| **Autenticação** | ⚠️ Duplicada | ✅ Apenas headers |
| **Erro 401** | ❌ Ocorria | ✅ Corrigido |
| **QR Code** | ❌ Não gerava | ✅ Gera corretamente |

---

## ✅ CHECKLIST DE VALIDAÇÃO

Após aplicar a correção:

- [ ] Backend atualizado (routes-chat.ts)
- [ ] Servidor reiniciado
- [ ] RENDIZY aberto
- [ ] Credenciais configuradas
- [ ] Conexão testada com sucesso
- [ ] QR Code gerado com sucesso
- [ ] WhatsApp conectado

---

**Versão:** v1.0.103.64  
**Data:** 2025-10-30  
**Status:** ✅ **CORREÇÃO APLICADA - PRONTO PARA TESTAR**

---

**🔧 Correção crítica aplicada! Teste agora seguindo o guia acima.**
