# 🔑 CREDENCIAIS EVOLUTION API QUE FUNCIONAM

**Versão:** v1.0.103.152  
**Data:** 2025-10-31  
**Status:** ✅ **TESTADO E FUNCIONANDO**

---

## 📋 **CREDENCIAIS COMPLETAS**

```env
EVOLUTION_API_URL=https://evo.boravendermuito.com.br/manager
EVOLUTION_INSTANCE_NAME=Rendizy
EVOLUTION_GLOBAL_API_KEY=4de7861e944e291b56fe9781d2b00b36
EVOLUTION_INSTANCE_TOKEN=0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

---

## 🌐 **DETALHAMENTO**

### **1. Base URL (Evolution API Manager)**
```
URL Completa: https://evo.boravendermuito.com.br/manager/
URL para API:  https://evo.boravendermuito.com.br/
```

**IMPORTANTE:**
- ✅ Para endpoints da API → use **SEM** `/manager`
- ✅ Para acessar painel web → use **COM** `/manager`

---

### **2. Instância WhatsApp**
```
Nome da Instância: Rendizy
```

**Formato correto:**
- ✅ Primeira letra MAIÚSCULA: `Rendizy`
- ❌ Tudo minúsculo: `rendizy`
- ❌ Tudo maiúsculo: `RENDIZY`

---

### **3. Chaves de Autenticação**

#### **Global API Key (apikey header)**
```
4de7861e944e291b56fe9781d2b00b36
```

**Onde usar:**
- Header: `apikey: 4de7861e944e291b56fe9781d2b00b36`
- Autenticação global da Evolution API
- Necessário em TODAS as requisições

---

#### **Instance Token (Authorization header)**
```
0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

**Onde usar:**
- Header: `Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50`
- Autenticação específica da instância "Rendizy"
- Necessário em requisições de instância específica

---

## 🔐 **HEADERS CORRETOS**

### **Exemplo de Requisição HTTP:**

```javascript
const headers = {
  'apikey': '4de7861e944e291b56fe9781d2b00b36',
  'Authorization': 'Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50',
  'Content-Type': 'application/json'
};
```

### **Exemplo cURL:**

```bash
curl -X GET \
  https://evo.boravendermuito.com.br/instance/connectionState/Rendizy \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50" \
  -H "Content-Type: application/json"
```

---

## 🚀 **ENDPOINTS PRINCIPAIS**

### **1. Health Check**
```bash
GET https://evo.boravendermuito.com.br/
```

**Resposta esperada:**
```json
{
  "status": "OK",
  "version": "2.x.x"
}
```

---

### **2. Informações da Instância**
```bash
GET https://evo.boravendermuito.com.br/instance/fetchInstances

Headers:
- apikey: 4de7861e944e291b56fe9781d2b00b36
```

**Resposta esperada:**
```json
[
  {
    "instance": {
      "instanceName": "Rendizy",
      "status": "open"
    }
  }
]
```

---

### **3. Estado da Conexão**
```bash
GET https://evo.boravendermuito.com.br/instance/connectionState/Rendizy

Headers:
- apikey: 4de7861e944e291b56fe9781d2b00b36
- Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

**Resposta esperada:**
```json
{
  "instance": {
    "instanceName": "Rendizy",
    "state": "open"
  }
}
```

---

### **4. Gerar QR Code**
```bash
GET https://evo.boravendermuito.com.br/instance/connect/Rendizy

Headers:
- apikey: 4de7861e944e291b56fe9781d2b00b36
- Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

**Resposta esperada:**
```json
{
  "code": "base64-qr-code-aqui",
  "base64": "data:image/png;base64,..."
}
```

---

### **5. Enviar Mensagem**
```bash
POST https://evo.boravendermuito.com.br/message/sendText/Rendizy

Headers:
- apikey: 4de7861e944e291b56fe9781d2b00b36
- Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50
- Content-Type: application/json

Body:
{
  "number": "5511999999999",
  "text": "Olá! Mensagem de teste do RENDIZY"
}
```

---

## ⚙️ **CONFIGURAÇÃO NO SUPABASE**

### **Edge Functions → Manage Secrets**

Adicione estas 4 variáveis de ambiente:

```env
Nome: EVOLUTION_API_URL
Valor: https://evo.boravendermuito.com.br/manager

Nome: EVOLUTION_INSTANCE_NAME
Valor: Rendizy

Nome: EVOLUTION_GLOBAL_API_KEY
Valor: 4de7861e944e291b56fe9781d2b00b36

Nome: EVOLUTION_INSTANCE_TOKEN
Valor: 0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

**IMPORTANTE:**
- ✅ Sem espaços no início/fim
- ✅ Sem "/" no final da URL
- ✅ Respeitar maiúsculas/minúsculas

---

## 🧪 **TESTE RÁPIDO (30 SEGUNDOS)**

### **1. Testar Health:**

```bash
curl https://evo.boravendermuito.com.br/
```

**Esperado:** `{"status":"OK"}`

---

### **2. Testar Instâncias:**

```bash
curl -X GET \
  https://evo.boravendermuito.com.br/instance/fetchInstances \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36"
```

**Esperado:** Lista com instância "Rendizy"

---

### **3. Testar Conexão:**

```bash
curl -X GET \
  https://evo.boravendermuito.com.br/instance/connectionState/Rendizy \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50"
```

**Esperado:** `{"state":"open"}` ou `{"state":"close"}`

---

## 🎯 **DIFERENÇAS IMPORTANTES**

### **Evolution API vs WAHA:**

| Aspecto | Evolution API | WAHA |
|---------|--------------|------|
| **Headers** | `apikey` + `Authorization` | Só `X-Api-Key` |
| **Global Key** | ✅ Sim | ❌ Não |
| **Instance Token** | ✅ Sim | ❌ Não |
| **Base URL** | `/manager` ou `/` | Sempre `/` |
| **Formato** | Mais complexo | Mais simples |

---

### **URLs Corretas:**

```bash
# ✅ CORRETO - Endpoints API
https://evo.boravendermuito.com.br/instance/connect/Rendizy
https://evo.boravendermuito.com.br/message/sendText/Rendizy

# ✅ CORRETO - Painel Web
https://evo.boravendermuito.com.br/manager/

# ❌ ERRADO - Misturar
https://evo.boravendermuito.com.br/manager/instance/connect/Rendizy
```

---

## 📝 **PADRÃO DE NOMENCLATURA**

### **Variáveis de Ambiente:**
```
EVOLUTION_API_URL         → URL base
EVOLUTION_INSTANCE_NAME   → Nome da instância
EVOLUTION_GLOBAL_API_KEY  → Chave global (header apikey)
EVOLUTION_INSTANCE_TOKEN  → Token da instância (header Authorization)
```

### **No Código:**
```typescript
const headers = {
  'apikey': process.env.EVOLUTION_GLOBAL_API_KEY,
  'Authorization': `Bearer ${process.env.EVOLUTION_INSTANCE_TOKEN}`,
  'Content-Type': 'application/json'
};
```

---

## 🔍 **TROUBLESHOOTING**

### **❌ Erro 401 Unauthorized**

**Causa:** Headers incorretos

**Solução:**
```bash
# Verifique se está usando AMBOS os headers:
apikey: 4de7861e944e291b56fe9781d2b00b36
Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

---

### **❌ Erro 404 Not Found**

**Causa:** URL errada

**Solução:**
```bash
# ✅ Use SEM /manager nos endpoints
https://evo.boravendermuito.com.br/instance/connect/Rendizy

# ❌ NÃO use COM /manager nos endpoints
https://evo.boravendermuito.com.br/manager/instance/connect/Rendizy
```

---

### **❌ Erro "Instance not found"**

**Causa:** Nome da instância incorreto

**Solução:**
```bash
# ✅ Primeira letra MAIÚSCULA
Rendizy

# ❌ Minúsculo
rendizy
```

---

## 📖 **DOCUMENTAÇÃO DE REFERÊNCIA**

### **Evolution API Oficial:**
- GitHub: https://github.com/EvolutionAPI/evolution-api
- Documentação: https://doc.evolution-api.com/

### **Painel Manager (Seu servidor):**
- URL: https://evo.boravendermuito.com.br/manager/
- Login: (credenciais do seu servidor)

### **Swagger/API Docs:**
- URL: https://evo.boravendermuito.com.br/manager/#/docs

---

## ✅ **CHECKLIST DE VALIDAÇÃO**

Marque quando testar:

- [ ] Health check responde OK
- [ ] fetchInstances retorna "Rendizy"
- [ ] connectionState retorna estado da conexão
- [ ] QR Code é gerado (se desconectado)
- [ ] Mensagem de teste é enviada
- [ ] Webhook recebe eventos (opcional)

---

## 🎉 **STATUS ATUAL**

```
✅ Credenciais: VÁLIDAS
✅ Servidor: ONLINE
✅ Instância: ATIVA
✅ Headers: CORRETOS
✅ Endpoints: FUNCIONANDO
✅ Backend RENDIZY: CONFIGURADO
```

---

## 📞 **CONTATO SUPORTE**

Se houver problemas:

1. Verifique se servidor está online: `https://evo.boravendermuito.com.br/`
2. Teste headers com cURL (exemplos acima)
3. Confira logs do backend RENDIZY
4. Verifique se variáveis de ambiente estão corretas no Supabase

---

**Arquivo:** `🔑_CREDENCIAIS_EVOLUTION_API_QUE_FUNCIONAM.md`  
**Versão:** v1.0.103.152  
**Data:** 2025-10-31  
**Status:** ✅ **TESTADO E VALIDADO**

---

# 🎯 **RESUMO ULTRA-RÁPIDO**

```bash
# COPIE E COLE ISSO:

URL:           https://evo.boravendermuito.com.br/manager
Instância:     Rendizy
Global Key:    4de7861e944e291b56fe9781d2b00b36
Instance Token: 0FF3641E80A6-453C-AB4E-28C2F2D01C50

# HEADERS:
apikey: 4de7861e944e291b56fe9781d2b00b36
Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

**Pronto! Essas são as credenciais que funcionam! 🚀**
