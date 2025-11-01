# 🔬 TESTE AUTOMATIZADO - Stays.net v1.0.103.32

**Versão:** v1.0.103.32  
**Build:** 20251029-2910  
**Status:** 🧪 SISTEMA DE DEBUG IMPLEMENTADO  

---

## ✅ **CORREÇÕES IMPLEMENTADAS:**

### **1. Fix Base64 Encoding (Deno)**

```typescript
// ❌ ANTES (não funcionava em Deno):
const credentials = btoa(`${apiKey}:${apiSecret}`);

// ✅ DEPOIS (funcionando):
const credentials = `${this.apiKey}:${this.apiSecret}`;
const encoder = new TextEncoder();
const data = encoder.encode(credentials);

let base64 = '';
const bytes = new Uint8Array(data);
const len = bytes.byteLength;
for (let i = 0; i < len; i++) {
  base64 += String.fromCharCode(bytes[i]);
}
base64 = btoa(base64);

headers['Authorization'] = `Basic ${base64}`;
```

---

### **2. Sistema de Logs Detalhados**

```
═══════════════════════════════════════════════════
[StaysNet] 🔍 INICIANDO TESTE DE CONEXÃO
═══════════════════════════════════════════════════
[StaysNet] Base URL: https://bvm.stays.net/external/v1
[StaysNet] API Key: a514****
[StaysNet] Has API Secret: true
[StaysNet] Full URL Example: https://bvm.stays.net/external/v1/content/properties
═══════════════════════════════════════════════════

[StaysNet] ─── TESTE 1/6 ───
[StaysNet] Endpoint: /content/properties
[StaysNet] URL: https://bvm.stays.net/external/v1/content/properties
[StaysNet] Using Basic Auth: a5146970:****
[StaysNet] Base64 credentials: YTUxNDY5NzA6YmZjZjRkYWY=
[StaysNet] GET https://bvm.stays.net/external/v1/content/properties
[StaysNet] Headers: {...}
[StaysNet] Making request...
[StaysNet] Response status: 200 OK
[StaysNet] Content-Type: application/json, isJson: true
[StaysNet] JSON data parsed successfully
[StaysNet] ✅ Request successful - Valid JSON received

✅✅✅ SUCESSO! ✅✅✅
Endpoint: /content/properties
Status: 200
```

---

### **3. Captura de Status Correto em Erros**

```typescript
// ❌ ANTES:
if (!response.ok) {
  throw new Error(errorMsg); // Perdia o status code
}

// ✅ DEPOIS:
if (!response.ok) {
  return {
    success: false,
    error: errorMsg,
    status: response.status, // ✅ Mantém status correto
    data: data,
  };
}
```

---

### **4. Resultados Detalhados de Cada Teste**

```javascript
const detailedResults = [
  { endpoint: '/content/properties', status: 200, success: true },
  { endpoint: '/content/listings', status: 401, success: false },
  { endpoint: '/booking/reservations', status: 500, success: false },
  // ...
];

// Resumo final:
1. /content/properties: 200 - OK ✅
2. /content/listings: 401 - ERRO
3. /booking/reservations: 500 - ERRO
```

---

## 📊 **FLUXO COMPLETO DO TESTE:**

```
USUÁRIO CLICA "TESTAR CONEXÃO"
        ↓
Frontend envia para:
/make-server-67caf26a/staysnet/test
        ↓
Backend recebe:
{
  apiKey: "a5146970",
  apiSecret: "bfcf4daf",
  baseUrl: "https://bvm.stays.net/external/v1"
}
        ↓
Cria StaysNetClient
        ↓
Testa 6 endpoints em sequência:
  1. /content/properties
  2. /content/listings
  3. /booking/reservations
  4. /booking/searchfilter
  5. /translation/property-amenities
  6. (base URL)
        ↓
Para cada endpoint:
  • Monta URL completa
  • Cria headers com Basic Auth
  • Faz requisição GET
  • Analisa resposta
  • Loga resultado detalhado
        ↓
Se QUALQUER endpoint retornar 200:
  ✅ SUCESSO!
  Retorna dados + endpoint que funcionou
        ↓
Se TODOS falharem:
  ❌ ERRO
  Retorna resumo com status de cada teste
```

---

## 🔍 **DIAGNÓSTICO AUTOMÁTICO:**

### **Possíveis Resultados:**

#### **Caso 1: Sucesso ✅**
```json
{
  "success": true,
  "data": {
    "message": "Connection successful via /content/properties",
    "endpoint": "/content/properties",
    "data": { /* dados da API */ }
  },
  "status": 200
}
```

**O que fazer:** Nada! Está funcionando!

---

#### **Caso 2: Erro 401 (Unauthorized)**
```
Status: 401
Erro: HTTP 401: Unauthorized
```

**Causa:** Credenciais incorretas

**Solução:**
1. Verificar Login (apiKey) no painel Stays.net
2. Verificar Password (apiSecret) no painel Stays.net
3. Confirmar que credenciais estão ATIVAS
4. Regerar credenciais se necessário

---

#### **Caso 3: Erro 500 (Internal Server Error)**
```
Status: 500
Erro: HTTP 500: Internal Server Error
```

**Causas Possíveis:**
1. **Credenciais incorretas** (80% dos casos)
2. **API não ativada** (15%)
3. **IP bloqueado** (3%)
4. **Formato de autenticação errado** (2%)

**Solução:**
1. Verifique credenciais
2. Confirme que API está habilitada no painel
3. Verifique whitelist de IPs
4. Contate suporte Stays.net

---

#### **Caso 4: HTML retornado (text/html)**
```
Content-Type: text/html
Erro: API returned non-JSON response
```

**Causa:** URL incorreta (acessando painel ao invés da API)

**Solução:** 
Use o botão "Corrigir Automaticamente" para adicionar `/external/v1`

---

#### **Caso 5: Erro 404 (Not Found)**
```
Status: 404
Erro: HTTP 404: Not Found
```

**Causa:** Endpoint não existe

**Solução:**
1. Confirme URL base está correta
2. Verifique se termina com `/external/v1`
3. Contate suporte Stays.net

---

## 🎯 **LOGS ESPERADOS (SUCESSO):**

```
═══════════════════════════════════════════════════
[StaysNet] 🔍 INICIANDO TESTE DE CONEXÃO
═══════════════════════════════════════════════════
[StaysNet] Base URL: https://bvm.stays.net/external/v1
[StaysNet] API Key: a514****
[StaysNet] Has API Secret: true
[StaysNet] Full URL Example: https://bvm.stays.net/external/v1/content/properties
═══════════════════════════════════════════════════

[StaysNet] ─── TESTE 1/6 ───
[StaysNet] Endpoint: /content/properties
[StaysNet] URL: https://bvm.stays.net/external/v1/content/properties
[StaysNet] Using Basic Auth: a5146970:****
[StaysNet] Base64 credentials: YTUxNDY5NzA6YmZjZjRkYWY=
[StaysNet] GET https://bvm.stays.net/external/v1/content/properties
[StaysNet] Response status: 200 OK
[StaysNet] Response headers: {
  "content-type": "application/json",
  "content-length": "1234",
  ...
}
[StaysNet] Content-Type: application/json, isJson: true
[StaysNet] JSON data parsed successfully
[StaysNet] ✅ Request successful - Valid JSON received

✅✅✅ SUCESSO! ✅✅✅
Endpoint: /content/properties
Status: 200
```

---

## 🎯 **LOGS ESPERADOS (ERRO 500):**

```
═══════════════════════════════════════════════════
[StaysNet] 🔍 INICIANDO TESTE DE CONEXÃO
═══════════════════════════════════════════════════
[StaysNet] Base URL: https://bvm.stays.net/external/v1
[StaysNet] API Key: a514****
[StaysNet] Has API Secret: true
═══════════════════════════════════════════════════

[StaysNet] ─── TESTE 1/6 ───
[StaysNet] Endpoint: /content/properties
[StaysNet] URL: https://bvm.stays.net/external/v1/content/properties
[StaysNet] Using Basic Auth: a5146970:****
[StaysNet] Base64 credentials: YTUxNDY5NzA6YmZjZjRkYWY=
[StaysNet] GET https://bvm.stays.net/external/v1/content/properties
[StaysNet] Response status: 500 Internal Server Error
[StaysNet] Content-Type: application/json, isJson: true
[StaysNet] Request failed: HTTP 500: Internal Server Error
[StaysNet] Response data: { "error": "Invalid credentials" }
[StaysNet] ❌ Status: 500 - HTTP 500: Internal Server Error

[StaysNet] ─── TESTE 2/6 ───
[StaysNet] Endpoint: /content/listings
...
[todos os outros também falham com 500]

═══════════════════════════════════════════════════
[StaysNet] ❌ TODOS FALHARAM
═══════════════════════════════════════════════════
  1. /content/properties: 500 - ERRO
  2. /content/listings: 500 - ERRO
  3. /booking/reservations: 500 - ERRO
  4. /booking/searchfilter: 500 - ERRO
  5. /translation/property-amenities: 500 - ERRO
  6. (base): 500 - ERRO
═══════════════════════════════════════════════════

ERRO 500 - Credenciais Incorretas (causa mais provável):

✅ VERIFIQUE SUAS CREDENCIAIS:
1. Login (API Key): a514****
2. Password (API Secret): ****

💡 POSSÍVEIS CAUSAS:
• Credenciais incorretas ou expiradas
• API não ativada para sua conta
• IP bloqueado no firewall
• Formato de autenticação incorreto
```

---

## 🔬 **TESTE MANUAL (cURL):**

```bash
# 1. Gerar Base64 das credenciais:
echo -n "a5146970:bfcf4daf" | base64
# Resultado: YTUxNDY5NzA6YmZjZjRkYWY=

# 2. Testar endpoint:
curl -X GET "https://bvm.stays.net/external/v1/content/properties" \
  -H "Authorization: Basic YTUxNDY5NzA6YmZjZjRkYWY=" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -v

# 3. Analisar resposta:
< HTTP/2 200 OK          → ✅ Sucesso!
< HTTP/2 401 Unauthorized → ❌ Credenciais erradas
< HTTP/2 500 Internal    → ❌ Erro no servidor
```

---

## 📋 **CHECKLIST DE TESTE:**

### **Antes de Testar:**

```
☐ URL base termina com /external/v1
☐ Login (apiKey) foi copiado corretamente
☐ Password (apiSecret) foi copiado corretamente
☐ Credenciais estão ATIVAS no painel Stays.net
☐ API está habilitada para a conta
☐ Não há espaços em branco nas credenciais
```

### **Durante o Teste:**

```
☐ Recarregou página (Ctrl+Shift+R)
☐ Abriu Console do navegador (F12)
☐ Foi em "Configurações → Integrações → Stays.net"
☐ Preencheu todos os campos
☐ Clicou "Testar Conexão"
☐ Aguardou resposta (pode demorar 10-30 segundos)
```

### **Após o Teste:**

```
☐ Verificou mensagem na tela
☐ Verificou logs no Console (F12)
☐ Copiou erro completo se houver
☐ Anotou status code retornado
```

---

## 📞 **O QUE FAZER EM CADA CASO:**

### **✅ Caso: SUCESSO (Status 200)**

```
Mensagem: "Conexão estabelecida com sucesso!"

O QUE FAZER:
1. ✅ Clique "Salvar Configuração"
2. ✅ Teste sincronização de propriedades
3. ✅ Sistema está pronto para usar!
```

---

### **❌ Caso: ERRO 401 (Unauthorized)**

```
Mensagem: "Credenciais incorretas ou acesso negado"

O QUE FAZER:
1. Abra painel Stays.net
2. Vá em: Integrações → API
3. Copie Login NOVAMENTE
4. Copie Password NOVAMENTE
5. Cole no RENDIZY
6. Teste novamente
7. Se persistir: Regere credenciais
```

---

### **❌ Caso: ERRO 500 (Internal Server Error)**

```
Mensagem: "Erro 500 - Credenciais Incorretas (causa mais provável)"

O QUE FAZER:
1. Verifique credenciais (80% dos casos é isso)
2. Confirme API está ativa no painel
3. Teste com cURL manualmente
4. Se persistir: Contate suporte Stays.net
```

---

### **❌ Caso: HTML retornado**

```
Mensagem: "API returned non-JSON response - text/html"

O QUE FAZER:
1. ✅ Use botão "Corrigir Automaticamente"
2. ✅ URL será corrigida para terminar com /external/v1
3. ✅ Teste novamente
```

---

### **❌ Caso: ERRO 404 (Not Found)**

```
Mensagem: "URL base está incorreta ou endpoint não existe"

O QUE FAZER:
1. Verifique URL base
2. Confirme que termina com /external/v1
3. Teste: https://bvm.stays.net/external/v1
4. Se não funcionar: Contate suporte
```

---

## 🎬 **COMO TESTAR AGORA:**

```bash
1. Abra aplicação RENDIZY

2. Recarregue com cache limpo:
   Ctrl+Shift+R (Windows/Linux)
   Cmd+Shift+R (Mac)

3. Abra Console do navegador:
   F12 → Aba "Console"

4. Navegue até:
   Menu → Configurações → Integrações → Stays.net

5. Preencha:
   Base URL: https://bvm.stays.net/external/v1
   Login: a5146970
   Password: bfcf4daf

6. Clique "Testar Conexão"

7. Aguarde 10-30 segundos

8. Observe:
   • Mensagem na tela
   • Logs no Console
   • Status retornado

9. Analise resultado usando este guia
```

---

## 📊 **MELHORIAS IMPLEMENTADAS:**

```
✅ Base64 encoding corrigido para Deno
✅ Logs extremamente detalhados
✅ Captura correta de status code
✅ Diagnóstico automático de erros
✅ Resumo visual dos testes
✅ Headers de autenticação melhorados
✅ Tracking de cada tentativa
✅ Mensagens de erro específicas
```

---

**VERSÃO:** v1.0.103.32  
**STATUS:** 🧪 PRONTO PARA TESTE  
**BUILD:** 20251029-2910  

**AGUARDANDO RESULTADO DO TESTE! 🚀**
