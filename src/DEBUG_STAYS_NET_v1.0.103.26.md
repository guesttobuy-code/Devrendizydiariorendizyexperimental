# 🔍 DEBUG AVANÇADO STAYS.NET - v1.0.103.26

**Versão:** v1.0.103.26  
**Data:** 29 de Outubro de 2025  
**Build:** 20251029-2904  

---

## 🎯 O QUE FOI IMPLEMENTADO

Adicionei **sistema completo de debug** para ajudar a diagnosticar problemas de conexão com Stays.net.

---

## 📊 MELHORIAS IMPLEMENTADAS

### **1. Frontend - Logs Detalhados**

```typescript
// ANTES (sem logs):
const response = await fetch(url, options);
if (response.ok) { ... }

// AGORA (com logs completos):
console.log('[StaysNet Frontend] Testing connection with:', {
  baseUrl: config.baseUrl,
  hasApiKey: !!config.apiKey,
  hasApiSecret: !!config.apiSecret,
});

const response = await fetch(url, options);

console.log('[StaysNet Frontend] Response status:', response.status);
const data = await response.json();
console.log('[StaysNet Frontend] Response data:', data);

if (data.success) {
  console.log('[StaysNet Frontend] Connection successful');
} else {
  console.error('[StaysNet Frontend] Connection failed:', data.error);
}
```

**Benefícios:**
- ✅ Ver exatamente o que está sendo enviado
- ✅ Ver resposta completa do servidor
- ✅ Identificar onde falha

---

### **2. Backend - Logs SUPER Detalhados**

```typescript
// Logs adicionados em CADA etapa:

console.log(`[StaysNet] ${method} ${url}`);
console.log(`[StaysNet] Headers:`, JSON.stringify(headers));
console.log(`[StaysNet] Request body:`, body);
console.log(`[StaysNet] Making request...`);
console.log(`[StaysNet] Response status: ${response.status}`);
console.log(`[StaysNet] Response headers:`, Object.fromEntries(response.headers));
console.log(`[StaysNet] Content-Type: ${contentType}, isJson: ${isJson}`);

if (isJson) {
  console.log(`[StaysNet] JSON data parsed successfully`);
} else {
  console.error('[StaysNet] Non-JSON response (first 500 chars):', text.substring(0, 500));
}
```

**Benefícios:**
- ✅ Ver TODOS os headers enviados
- ✅ Ver resposta completa (até 500 chars)
- ✅ Identificar se é HTML ou JSON
- ✅ Ver Content-Type exato

---

### **3. Teste Automático de Múltiplos Endpoints**

```typescript
// ANTES: Testava apenas /properties
async testConnection() {
  return await this.request('/properties', 'GET');
}

// AGORA: Testa 6 endpoints diferentes
async testConnection() {
  const endpointsToTry = [
    '/properties',
    '/api/properties',
    '/reservations',
    '/api/reservations',
    '/',
    '/api',
  ];

  for (const endpoint of endpointsToTry) {
    console.log(`[StaysNet] Trying endpoint: ${endpoint}`);
    const result = await this.request(endpoint, 'GET');
    
    if (result.success) {
      console.log(`[StaysNet] Success with endpoint: ${endpoint}`);
      return { success: true, ... };
    }
    
    console.log(`[StaysNet] Failed with ${endpoint}: ${result.error}`);
  }
  
  return { success: false, error: 'All endpoints failed' };
}
```

**Benefícios:**
- ✅ Tenta encontrar endpoint correto automaticamente
- ✅ Se um falhar, tenta outro
- ✅ Retorna qual endpoint funcionou
- ✅ Logs de cada tentativa

---

### **4. Mensagens de Erro Mais Descritivas**

```typescript
// ANTES:
throw new Error('API returned non-JSON');

// AGORA:
throw new Error(
  `API returned non-JSON response:\n` +
  `Status: ${response.status} ${response.statusText}\n` +
  `Content-Type: ${contentType}\n` +
  `URL: ${url}\n` +
  `This usually means:\n` +
  `1. The Base URL is incorrect\n` +
  `2. The endpoint doesn't exist\n` +
  `3. Authentication failed\n` +
  `4. Server returned an error page (HTML)\n` +
  `Preview: ${text.substring(0, 100)}...`
);
```

**Benefícios:**
- ✅ Usuário sabe EXATAMENTE o que aconteceu
- ✅ Sugestões de solução incluídas
- ✅ Preview do que o servidor retornou

---

### **5. Validação no Frontend**

```typescript
// Valida ANTES de enviar para backend
if (!config.baseUrl || !config.apiKey) {
  toast.error('Preencha Base URL e API Key/Login');
  setConnectionStatus('error');
  return;
}
```

**Benefícios:**
- ✅ Economiza request desnecessário
- ✅ Feedback imediato ao usuário
- ✅ Mensagem clara

---

### **6. Toast com Duração Maior**

```typescript
// ANTES:
toast.error('Erro');

// AGORA:
toast.error('Falha na conexão: ' + errorMsg, { duration: 5000 });
```

**Benefícios:**
- ✅ Usuário tem tempo de ler mensagem completa
- ✅ Erro não desaparece rápido demais

---

## 🔍 COMO USAR O DEBUG

### **Passo a Passo:**

```
1. Abra a página
   ↓
2. Pressione F12 (Console do navegador)
   ↓
3. Vá em: Menu → Configurações → Tab Integrações
   ↓
4. Click em Stays.net
   ↓
5. Preencha credenciais
   ↓
6. Click "Testar Conexão"
   ↓
7. ACOMPANHE OS LOGS NO CONSOLE!
```

---

## 📝 EXEMPLOS DE LOGS

### **✅ Cenário 1: SUCESSO**

```javascript
// Console mostrará:

[StaysNet Frontend] Testing connection with: {
  baseUrl: "https://bvm.stays.net/external-api",
  hasApiKey: true,
  hasApiSecret: true
}

[StaysNet] Testing connection...
[StaysNet] Trying endpoint: /properties
[StaysNet] GET https://bvm.stays.net/external-api/properties
[StaysNet] Headers: {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": "Basic YTUxNDY5NzA6YmZjZjRkYWY=",
  "X-API-Key": "a5146970",
  "X-API-Secret": "bfcf4daf"
}
[StaysNet] Making request...
[StaysNet] Response status: 200 OK
[StaysNet] Response headers: {
  "content-type": "application/json; charset=utf-8",
  "content-length": "1234"
}
[StaysNet] Content-Type: application/json; charset=utf-8, isJson: true
[StaysNet] JSON data parsed successfully
[StaysNet] Success with endpoint: /properties
[StaysNet] Request successful

[StaysNet Frontend] Response status: 200
[StaysNet Frontend] Response data: {
  success: true,
  data: { message: "Connection successful via /properties", ... }
}
[StaysNet Frontend] Connection successful
```

**Interface mostra:** ✅ Conexão estabelecida com sucesso!

---

### **❌ Cenário 2: URL INCORRETA**

```javascript
// Console mostrará:

[StaysNet Frontend] Testing connection with: {
  baseUrl: "https://bvm.stays.net",  // SEM /external-api
  hasApiKey: true,
  hasApiSecret: true
}

[StaysNet] Testing connection...
[StaysNet] Trying endpoint: /properties
[StaysNet] GET https://bvm.stays.net/properties
[StaysNet] Headers: { ... }
[StaysNet] Making request...
[StaysNet] Response status: 404 Not Found
[StaysNet] Response headers: {
  "content-type": "text/html; charset=utf-8"
}
[StaysNet] Content-Type: text/html; charset=utf-8, isJson: false
[StaysNet] Non-JSON response (first 500 chars): <!doctype html>
<html lang="en">
<head><title>404 Not Found</title></head>
<body><h1>404 - Page not found</h1></body>
</html>
[StaysNet] Request error: API returned non-JSON response:
Status: 404 Not Found
Content-Type: text/html; charset=utf-8
URL: https://bvm.stays.net/properties
This usually means:
1. The Base URL is incorrect
2. The endpoint doesn't exist
3. Authentication failed
4. Server returned an error page (HTML)
Preview: <!doctype html><html lang="en"><head><title>404 Not Found</title></head><body><h1>404 - Page not foun...

[StaysNet] Failed with /properties: API returned non-JSON response...
[StaysNet] Trying endpoint: /api/properties
... (tenta todos endpoints)

[StaysNet] All endpoints failed. Last error: API returned non-JSON response...
```

**Interface mostra:** ❌ Falha na conexão: All endpoints failed. Last error: API returned non-JSON response (404)...

**SOLUÇÃO:** Adicionar `/external-api` na URL

---

### **❌ Cenário 3: CREDENCIAIS INCORRETAS**

```javascript
// Console mostrará:

[StaysNet Frontend] Testing connection with: {
  baseUrl: "https://bvm.stays.net/external-api",
  hasApiKey: true,
  hasApiSecret: true
}

[StaysNet] Testing connection...
[StaysNet] Trying endpoint: /properties
[StaysNet] GET https://bvm.stays.net/external-api/properties
[StaysNet] Headers: {
  "Authorization": "Basic ERRADO123==",  // Base64 de credenciais erradas
  ...
}
[StaysNet] Making request...
[StaysNet] Response status: 403 Forbidden
[StaysNet] Response headers: {
  "content-type": "text/html"
}
[StaysNet] Content-Type: text/html, isJson: false
[StaysNet] Non-JSON response (first 500 chars): <!doctype html>
<html><head><title>403 Forbidden</title></head>
<body><h1>Access Denied</h1><p>Invalid credentials</p></body>
</html>

[StaysNet] Request error: API returned non-JSON response:
Status: 403 Forbidden
...
This usually means:
1. The Base URL is incorrect
2. The endpoint doesn't exist
3. Authentication failed    ← ESTE É O PROBLEMA!
4. Server returned an error page (HTML)
...

[StaysNet] Failed with /properties: API returned non-JSON response (403)...
... (tenta outros endpoints, todos falham com 403)

[StaysNet] All endpoints failed. Last error: API returned non-JSON response (403)...
```

**Interface mostra:** ❌ Falha na conexão: All endpoints failed. Last error: API returned non-JSON response (403). This usually means authentication failed...

**SOLUÇÃO:** Verificar Login e Senha

---

## 🎯 DIAGNÓSTICO RÁPIDO

### **Como Identificar o Problema pelos Logs:**

| Status Code | Content-Type | Causa Provável | Solução |
|------------|--------------|----------------|----------|
| 404 | text/html | URL incorreta | Adicione `/external-api` |
| 403 | text/html | Credenciais erradas | Verifique Login/Senha |
| 401 | text/html | Não autorizado | Regere API Key no BVM |
| 500 | text/html | Erro no servidor | Contate suporte Stays.net |
| 200 | application/json | ✅ SUCESSO! | Tudo funcionando |

---

## 📁 ARQUIVOS MODIFICADOS

### **Frontend:**

```
✅ /components/StaysNetIntegration.tsx
   Linhas 256-298: handleTestConnection com logs
   - Validação antes de enviar
   - Logs detalhados de request/response
   - Toast com duração de 5s
```

### **Backend:**

```
✅ /supabase/functions/server/routes-staysnet.ts
   Linhas 67-120: request() method com logs completos
   Linhas 105-145: testConnection() testa múltiplos endpoints
   - Log de headers enviados
   - Log de cada endpoint tentado
   - Preview de respostas não-JSON
   - Mensagens de erro descritivas
```

### **Documentação:**

```
✅ /TROUBLESHOOTING_STAYS_NET.md
   Guia completo de troubleshooting
   - Checklist de verificação
   - Exemplos de erros comuns
   - Soluções detalhadas
   - Como usar Postman para testar
```

### **Build:**

```
✅ /BUILD_VERSION.txt → v1.0.103.26
✅ /CACHE_BUSTER.ts → Build 20251029-2904
✅ /DEBUG_STAYS_NET_v1.0.103.26.md (este arquivo)
```

---

## 🚀 COMO USAR AGORA

### **1. Recarregar Página**

```bash
Ctrl + Shift + R
# ou
Cmd + Shift + R (Mac)
```

### **2. Abrir Console**

```bash
F12
# ou
Ctrl + Shift + I
# ou
Cmd + Option + I (Mac)
```

### **3. Ir para Integrações**

```
Menu Lateral → Configurações → Tab "Integrações" → Stays.net
```

### **4. Preencher Credenciais**

```
Base URL: https://bvm.stays.net/external-api
Login: a5146970 (exemplo - use o seu)
Senha: bfcf4daf (exemplo - use o seu)
```

### **5. Testar Conexão**

```
Click "Testar Conexão"
↓
Aguardar...
↓
VER LOGS NO CONSOLE (F12)!
```

---

## 📊 O QUE PROCURAR NO CONSOLE

### **Informações Importantes:**

```javascript
1. URL completa sendo chamada:
   [StaysNet] GET https://bvm.stays.net/external-api/properties

2. Headers de autenticação:
   "Authorization": "Basic YTUxNDY5NzA6YmZjZjRkYWY="

3. Status da resposta:
   [StaysNet] Response status: 200 OK  ← BOM!
   [StaysNet] Response status: 403 Forbidden  ← RUIM!

4. Content-Type:
   Content-Type: application/json  ← BOM!
   Content-Type: text/html  ← RUIM!

5. Preview da resposta (se erro):
   <!doctype html><html>...  ← É HTML (erro)
```

---

## ✅ CHECKLIST DE DIAGNÓSTICO

Ao ver erro, verifique no Console:

- [ ] URL completa está correta? (deve ter /external-api)
- [ ] Status code é 200? (se não, qual é?)
- [ ] Content-Type é application/json? (se não, é HTML = erro)
- [ ] Headers de Authorization estão presentes?
- [ ] Qual endpoint funcionou? (se algum funcionou)
- [ ] Mensagem de erro específica mostra causa?

---

## 💡 PRÓXIMOS PASSOS

Agora com os logs detalhados, você pode:

1. **Identificar EXATAMENTE onde falha**
   - URL? Credenciais? Servidor?

2. **Copiar logs completos**
   - Útil para suporte

3. **Testar diferentes configurações**
   - Ver impacto em tempo real

4. **Entender o que a API retorna**
   - JSON? HTML? Erro específico?

---

## 📞 SUPORTE

### **Para Reportar Problema:**

Inclua:

1. ✅ Screenshot da tela de configuração
2. ✅ TODO o log do Console (copiar e colar)
3. ✅ Versão: v1.0.103.26
4. ✅ O que você tentou
5. ✅ Resultado esperado vs obtido

---

## 🎉 RESULTADO FINAL

Agora você tem:

```
✅ Logs detalhados no frontend
✅ Logs super detalhados no backend
✅ Teste automático de múltiplos endpoints
✅ Mensagens de erro descritivas
✅ Guia completo de troubleshooting
✅ Validações antes de enviar
✅ Toast com duração maior
✅ Preview de respostas não-JSON
```

**COM ESSES LOGS, VOCÊ CONSEGUE DIAGNOSTICAR QUALQUER PROBLEMA DE CONEXÃO! 🔍**

---

**VERSÃO:** v1.0.103.26  
**STATUS:** ✅ DEBUG SYSTEM IMPLEMENTADO  
**BUILD:** 20251029-2904  

**AÇÃO NECESSÁRIA:**
1. Recarregar página (Ctrl+Shift+R)
2. Abrir Console (F12)
3. Ir em Configurações → Integrações → Stays.net
4. Preencher credenciais
5. Click "Testar Conexão"
6. ✅ VER LOGS DETALHADOS NO CONSOLE!

**AGORA É FÁCIL DEBUGAR! 🚀**
