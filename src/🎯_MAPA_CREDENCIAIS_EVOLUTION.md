# 🎯 MAPA VISUAL - ONDE USAR CADA CREDENCIAL

**Versão:** v1.0.103.152  
**Data:** 2025-10-31

---

## 🔐 **AS 4 CREDENCIAIS**

```
┌─────────────────────────────────────────────────────────────┐
│  1️⃣ EVOLUTION_API_URL                                      │
│     https://evo.boravendermuito.com.br/manager             │
│                                                             │
│  2️⃣ EVOLUTION_INSTANCE_NAME                                │
│     Rendizy                                                 │
│                                                             │
│  3️⃣ EVOLUTION_GLOBAL_API_KEY                               │
│     4de7861e944e291b56fe9781d2b00b36                       │
│                                                             │
│  4️⃣ EVOLUTION_INSTANCE_TOKEN                               │
│     0FF3641E80A6-453C-AB4E-28C2F2D01C50                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌐 **ONDE USAR: BASE URL**

### **API Endpoints (código/backend):**
```bash
https://evo.boravendermuito.com.br/

# Exemplos:
https://evo.boravendermuito.com.br/instance/connect/Rendizy
https://evo.boravendermuito.com.br/message/sendText/Rendizy
https://evo.boravendermuito.com.br/instance/fetchInstances
```

**Regra:** SEM `/manager` nos endpoints da API

---

### **Painel Web (navegador):**
```bash
https://evo.boravendermuito.com.br/manager/

# Abre interface gráfica
```

**Regra:** COM `/manager` para acessar painel visual

---

### **Variável de Ambiente no Supabase:**
```env
EVOLUTION_API_URL=https://evo.boravendermuito.com.br/manager
```

**Regra:** Salve COM `/manager` (o código remove quando necessário)

---

## 📛 **ONDE USAR: INSTANCE NAME**

### **Na URL dos endpoints:**
```bash
https://evo.boravendermuito.com.br/instance/connect/Rendizy
                                                    ^^^^^^^^
                                                    AQUI!

https://evo.boravendermuito.com.br/instance/connectionState/Rendizy
                                                             ^^^^^^^^
https://evo.boravendermuito.com.br/message/sendText/Rendizy
                                                     ^^^^^^^^
```

---

### **No código TypeScript:**
```typescript
const instanceName = 'Rendizy';

const url = `${baseUrl}/instance/connect/${instanceName}`;
const url = `${baseUrl}/message/sendText/${instanceName}`;
```

---

### **Variável de Ambiente:**
```env
EVOLUTION_INSTANCE_NAME=Rendizy
```

**⚠️ IMPORTANTE:** Primeira letra MAIÚSCULA: `Rendizy` (não `rendizy`)

---

## 🔑 **ONDE USAR: GLOBAL API KEY**

### **Header HTTP:**
```http
apikey: 4de7861e944e291b56fe9781d2b00b36
```

**Nome do header:** `apikey` (tudo minúsculo)

---

### **Exemplo cURL:**
```bash
curl -X GET \
  https://evo.boravendermuito.com.br/instance/fetchInstances \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36"
     ^^^^^^
     AQUI!
```

---

### **Exemplo JavaScript/TypeScript:**
```typescript
const headers = {
  'apikey': '4de7861e944e291b56fe9781d2b00b36',
  'Content-Type': 'application/json'
};

fetch(url, { headers });
```

---

### **Variável de Ambiente:**
```env
EVOLUTION_GLOBAL_API_KEY=4de7861e944e291b56fe9781d2b00b36
```

---

## 🎫 **ONDE USAR: INSTANCE TOKEN**

### **Header HTTP:**
```http
Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

**Nome do header:** `Authorization`  
**Formato:** `Bearer {token}` (com espaço)

---

### **Exemplo cURL:**
```bash
curl -X GET \
  https://evo.boravendermuito.com.br/instance/connectionState/Rendizy \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50"
     ^^^^^^^^^^^^^^^
     AQUI!
```

---

### **Exemplo JavaScript/TypeScript:**
```typescript
const headers = {
  'apikey': '4de7861e944e291b56fe9781d2b00b36',
  'Authorization': 'Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50',
  'Content-Type': 'application/json'
};

fetch(url, { headers });
```

---

### **Variável de Ambiente:**
```env
EVOLUTION_INSTANCE_TOKEN=0FF3641E80A6-453C-AB4E-28C2F2D01C50
```

---

## 🎯 **REQUISIÇÃO COMPLETA - EXEMPLO REAL**

### **Gerar QR Code:**

```bash
curl -X GET \
  https://evo.boravendermuito.com.br/instance/connect/Rendizy \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50" \
  -H "Content-Type: application/json"
```

**Mapeamento:**
```
URL Base:    https://evo.boravendermuito.com.br/
Endpoint:    instance/connect/
Instance:    Rendizy
Header 1:    apikey: {GLOBAL_API_KEY}
Header 2:    Authorization: Bearer {INSTANCE_TOKEN}
```

---

### **Enviar Mensagem:**

```bash
curl -X POST \
  https://evo.boravendermuito.com.br/message/sendText/Rendizy \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "5511999999999",
    "text": "Olá do RENDIZY!"
  }'
```

**Mapeamento:**
```
URL Base:    https://evo.boravendermuito.com.br/
Endpoint:    message/sendText/
Instance:    Rendizy
Header 1:    apikey: {GLOBAL_API_KEY}
Header 2:    Authorization: Bearer {INSTANCE_TOKEN}
Body:        JSON com dados da mensagem
```

---

## 📊 **TABELA DE USO**

| Endpoint | Precisa Global Key? | Precisa Instance Token? | Instance na URL? |
|----------|---------------------|-------------------------|------------------|
| `/` (health) | ❌ | ❌ | ❌ |
| `/instance/fetchInstances` | ✅ | ❌ | ❌ |
| `/instance/connect/{instance}` | ✅ | ✅ | ✅ |
| `/instance/connectionState/{instance}` | ✅ | ✅ | ✅ |
| `/message/sendText/{instance}` | ✅ | ✅ | ✅ |
| `/message/sendMedia/{instance}` | ✅ | ✅ | ✅ |
| `/chat/findMessages/{instance}` | ✅ | ✅ | ✅ |
| `/chat/findChats/{instance}` | ✅ | ✅ | ✅ |

**Regra geral:**
- Endpoints globais (sem `{instance}`) → Só precisa Global Key
- Endpoints de instância (com `{instance}`) → Precisa Global Key + Instance Token

---

## 🔄 **FLUXO DE AUTENTICAÇÃO**

```
┌─────────────────────────────────────────────────────────────┐
│  1. Cliente faz requisição                                  │
│     ↓                                                        │
│  2. Adiciona header "apikey" (Global API Key)               │
│     ↓                                                        │
│  3. Adiciona header "Authorization" (Instance Token)        │
│     ↓                                                        │
│  4. Evolution API valida ambos os headers                   │
│     ↓                                                        │
│  5. Se válidos → Processa requisição                        │
│     ↓                                                        │
│  6. Retorna resposta                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚙️ **CÓDIGO BACKEND RENDIZY**

### **Como está implementado:**

```typescript
// supabase/functions/server/routes-whatsapp-evolution.ts

const EVOLUTION_API_URL = Deno.env.get('EVOLUTION_API_URL') || 
  'https://evo.boravendermuito.com.br';

const EVOLUTION_INSTANCE_NAME = Deno.env.get('EVOLUTION_INSTANCE_NAME') || 
  'Rendizy';

const EVOLUTION_GLOBAL_API_KEY = Deno.env.get('EVOLUTION_GLOBAL_API_KEY') || 
  '4de7861e944e291b56fe9781d2b00b36';

const EVOLUTION_INSTANCE_TOKEN = Deno.env.get('EVOLUTION_INSTANCE_TOKEN') || 
  '0FF3641E80A6-453C-AB4E-28C2F2D01C50';

// Função helper para criar headers
function getEvolutionHeaders() {
  return {
    'apikey': EVOLUTION_GLOBAL_API_KEY,
    'Authorization': `Bearer ${EVOLUTION_INSTANCE_TOKEN}`,
    'Content-Type': 'application/json'
  };
}

// Exemplo de uso
const response = await fetch(
  `${EVOLUTION_API_URL}/instance/connect/${EVOLUTION_INSTANCE_NAME}`,
  {
    method: 'GET',
    headers: getEvolutionHeaders()
  }
);
```

---

## 🎨 **INTERFACE RENDIZY**

### **Onde o usuário insere (Configurações → Integrações):**

```
┌─────────────────────────────────────────────────────────┐
│  WhatsApp Business (Evolution API)                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  API URL:                                               │
│  [https://evo.boravendermuito.com.br         ]         │
│                                                         │
│  Instance Name:                                         │
│  [Rendizy                                    ]         │
│                                                         │
│  API Key (Instance Token):                              │
│  [0FF3641E80A6-453C-AB4E-28C2F2D01C50       ]         │
│                                                         │
│  [ Conectar WhatsApp ]                                  │
└─────────────────────────────────────────────────────────┘
```

**Nota:** O Global API Key NÃO aparece na interface (está nas env vars)

---

## 🧪 **VALIDAÇÃO RÁPIDA**

### **Teste 1: Server Online?**
```bash
curl https://evo.boravendermuito.com.br/
```

**Esperado:** `{"status":"OK"}`

**Se falhar:** Servidor offline ou URL errada

---

### **Teste 2: Global Key válida?**
```bash
curl -X GET \
  https://evo.boravendermuito.com.br/instance/fetchInstances \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36"
```

**Esperado:** Lista de instâncias (incluindo "Rendizy")

**Se falhar:** Global API Key inválida

---

### **Teste 3: Instance Token válido?**
```bash
curl -X GET \
  https://evo.boravendermuito.com.br/instance/connectionState/Rendizy \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50"
```

**Esperado:** `{"state":"open"}` ou `{"state":"close"}`

**Se falhar:** Instance Token inválido ou nome da instância errado

---

## 📝 **RESUMO EXECUTIVO**

```
┌──────────────────┬───────────────────────────────────────────┐
│ CREDENCIAL       │ ONDE USAR                                 │
├──────────────────┼───────────────────────────────────────────┤
│ API URL          │ Base de todas URLs + Env Var Supabase     │
│ Instance Name    │ Final das URLs + Env Var                  │
│ Global API Key   │ Header "apikey" + Env Var                 │
│ Instance Token   │ Header "Authorization" + Env Var + UI     │
└──────────────────┴───────────────────────────────────────────┘
```

---

**Arquivo:** `🎯_MAPA_CREDENCIAIS_EVOLUTION.md`  
**Versão:** v1.0.103.152  
**Data:** 2025-10-31

---

# ✅ TUDO QUE VOCÊ PRECISA SABER SOBRE AS CREDENCIAIS!
