# 🔧 Fix: Network Error - Backend Não Acessível v1.0.103.52

**Data:** 29 de Outubro de 2025  
**Versão:** v1.0.103.52  
**Status:** ✅ Corrigido

---

## 🎯 ERRO IDENTIFICADO

**Mensagem:**
```
Network Error [/chat/channels/config]: TypeError: Failed to fetch
❌ Falha ao salvar: Failed to fetch
```

**Onde:** Ao tentar salvar configurações do WhatsApp

**Causa Raiz:** Servidor Supabase Edge Function não está acessível

---

## 🔍 ANÁLISE DO PROBLEMA

### Erro "Failed to fetch" significa:

1. ❌ **Servidor não está rodando** - Edge Function não deployada
2. ❌ **URL incorreta** - projectId ou endpoint errado
3. ❌ **CORS bloqueado** - Browser bloqueando requisição
4. ❌ **Sem internet** - Conexão offline
5. ❌ **Firewall** - Bloqueio de rede

---

## ✅ CORREÇÕES APLICADAS

### 1. Health Check Automático

**Adicionado em `/utils/chatApi.ts`:**

```typescript
// Verifica se servidor está online antes de fazer requests
async function checkServerHealth() {
  console.log('🏥 Verificando saúde do servidor backend...');
  
  const response = await fetch(`${BASE_URL}/health`, {
    headers: { Authorization: `Bearer ${publicAnonKey}` }
  });
  
  if (response.ok) {
    console.log('✅ Servidor backend está ONLINE');
  } else {
    console.error('❌ Servidor backend está OFFLINE');
    console.error('📋 POSSÍVEIS SOLUÇÕES:');
    console.error('   1. Execute: supabase functions serve');
    console.error('   2. Ou deploy: supabase functions deploy');
  }
}
```

---

### 2. Verificação Antes de Salvar

**No componente WhatsAppIntegration.tsx:**

```typescript
const handleSaveConfig = async () => {
  setSavingConfig(true);
  
  try {
    // 1️⃣ PRIMEIRO: Testa se backend está acessível
    const healthCheck = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-67caf26a/health`,
      { headers: { 'Authorization': `Bearer ${publicAnonKey}` } }
    );
    
    if (!healthCheck.ok) {
      toast.error('❌ Servidor backend não está acessível. Verifique se a Edge Function está deployada.');
      return;
    }
    
    // 2️⃣ DEPOIS: Salva configuração
    const result = await channelsApi.updateConfig(organizationId, configToSave);
    
    if (result.success) {
      toast.success('✅ Configurações salvas com sucesso!');
    }
  } catch (error) {
    toast.error('❌ Erro ao salvar: ' + error.message);
  }
}
```

**Benefício:** Usuário sabe EXATAMENTE qual é o problema

---

### 3. Logs Detalhados de Debug

**Adicionado em fetchAPI():**

```typescript
async function fetchAPI(endpoint, options) {
  console.log('🔵 fetchAPI chamado:');
  console.log('  📍 URL:', fullUrl);
  console.log('  📍 Method:', options.method || 'GET');
  
  try {
    const response = await fetch(fullUrl, ...);
    console.log('  ✅ Response Status:', response.status);
    
    return json;
  } catch (error) {
    console.error('❌ Network Error:', error);
    console.error('  ❌ Full URL:', fullUrl);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('  ❌ ERRO DE FETCH: Servidor não acessível');
      console.error('  ❌ Possíveis causas:');
      console.error('     1. Edge Function não está rodando');
      console.error('     2. URL incorreta');
      console.error('     3. CORS bloqueado');
      console.error('     4. Sem conexão');
    }
  }
}
```

---

## 🧪 DIAGNÓSTICO RÁPIDO

### Teste 1: Verificar URL do Backend

**Abrir Console (F12) e digitar:**

```javascript
// Verificar credenciais
console.log('Project ID:', 'uknccixtubkdkofyieie');
console.log('Base URL:', 'https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a');
```

**Esperado:** URLs devem estar corretas

---

### Teste 2: Testar Health Check Manualmente

**No Console (F12):**

```javascript
fetch('https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18'
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Se retornar:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-29T...",
  "service": "Rendizy Backend API"
}
```
→ ✅ **Servidor está ONLINE**

**Se retornar erro:**
→ ❌ **Servidor está OFFLINE**

---

### Teste 3: Verificar Network no DevTools

**Passos:**
1. Abrir DevTools (F12)
2. Ir na aba **Network**
3. Clicar "Salvar Configurações"
4. Ver se aparece request

**Se não aparecer request:**
→ JavaScript com erro antes de fazer fetch

**Se aparecer request VERMELHO:**
→ Servidor não acessível

**Se aparecer request VERDE:**
→ Servidor acessível, ver resposta

---

## 📋 SOLUÇÕES POR CENÁRIO

### Cenário 1: Edge Function Não Deployada

**Sintoma:** Health check retorna erro 404 ou connection refused

**Solução:**

```bash
# No terminal
cd supabase/functions

# Deploy da função
supabase functions deploy make-server-67caf26a

# Verificar se deployou
supabase functions list
```

**Esperado:**
```
make-server-67caf26a  deployed  2025-10-29 ...
```

---

### Cenário 2: Edge Function Rodando Localmente

**Sintoma:** Você está desenvolvendo localmente

**Solução:**

```bash
# No terminal
cd supabase/functions

# Rodar função localmente
supabase functions serve

# Verificar logs
# Deve aparecer: "Server running on http://localhost:54321"
```

**Depois ajustar URL no código:**

```typescript
// Em utils/chatApi.ts
const BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:54321/functions/v1/make-server-67caf26a'
  : `https://${projectId}.supabase.co/functions/v1/make-server-67caf26a`;
```

---

### Cenário 3: CORS Bloqueado

**Sintoma:** Console mostra "CORS policy" error

**Solução:**

Verificar em `/supabase/functions/server/index.tsx`:

```typescript
app.use("/*", cors({
  origin: "*",  // ✅ Permite todas origens
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
}));
```

**Se CORS estiver correto mas ainda dá erro:**
→ Browser cache. Fazer hard refresh: `Ctrl+Shift+R`

---

### Cenário 4: Sem Conexão Internet

**Sintoma:** Erro "Failed to fetch" em TODAS as requisições

**Solução:**

1. Verificar se está conectado à internet
2. Tentar acessar: https://google.com
3. Verificar firewall ou VPN

---

### Cenário 5: Project ID Incorreto

**Sintoma:** Health check retorna 404

**Solução:**

Verificar em `/utils/supabase/info.tsx`:

```typescript
export const projectId = "uknccixtubkdkofyieie"  // ✅ Correto
```

**Se estiver errado:**
1. Ir em: https://supabase.com/dashboard
2. Ver seu projeto
3. Copiar Project ID correto
4. Atualizar arquivo

---

## 🔧 COMANDOS ÚTEIS

### Verificar Status da Edge Function

```bash
# Ver funções deployadas
supabase functions list

# Ver logs da função
supabase functions logs make-server-67caf26a

# Deploy forçado
supabase functions deploy make-server-67caf26a --force
```

---

### Testar Health Check via cURL

```bash
curl -X GET \
  "https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Esperado:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-29T...",
  "service": "Rendizy Backend API"
}
```

---

### Rodar Localmente

```bash
# Iniciar Supabase localmente
supabase start

# Rodar função
supabase functions serve make-server-67caf26a

# Testar
curl http://localhost:54321/functions/v1/make-server-67caf26a/health
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

### Backend
- [ ] Edge Function está deployada
- [ ] Health check retorna 200 OK
- [ ] Logs não mostram erros
- [ ] CORS está configurado

### Frontend
- [ ] projectId está correto
- [ ] publicAnonKey está correto
- [ ] BASE_URL está correto
- [ ] Health check funciona no console

### Rede
- [ ] Conexão com internet está OK
- [ ] Firewall não está bloqueando
- [ ] VPN não está interferindo
- [ ] Browser não está bloqueando (CORS)

---

## 📊 MENSAGENS DE ERRO E SOLUÇÕES

| Erro | Causa | Solução |
|------|-------|---------|
| `Failed to fetch` | Servidor offline | Deploy Edge Function |
| `CORS policy` | CORS bloqueado | Configurar CORS no backend |
| `404 Not Found` | URL errada | Verificar projectId |
| `401 Unauthorized` | Token inválido | Verificar publicAnonKey |
| `500 Internal Error` | Erro no backend | Ver logs da função |
| `Network Error` | Sem internet | Verificar conexão |

---

## 🎯 SOLUÇÃO MAIS PROVÁVEL

**Na maioria dos casos, o erro "Failed to fetch" acontece porque:**

### ✅ A Edge Function não foi deployada ainda!

**Solução:**

```bash
# 1. Deploy da função
supabase functions deploy make-server-67caf26a

# 2. Verificar se deployou
supabase functions list

# 3. Testar health check
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

**Depois:**
1. Recarregar página do RENDIZY
2. Tentar salvar configuração novamente
3. Deve funcionar! ✅

---

## 📝 RESULTADO ESPERADO

Após correção:

**Console mostra:**
```
🏥 Verificando saúde do servidor backend...
   URL: https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a
✅ Servidor backend está ONLINE

🔵 handleSaveConfig chamado
📋 Dados do formulário: {...}
🔵 fetchAPI chamado:
  📍 URL: https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/chat/channels/config
  📍 Method: PATCH
  ✅ Response Status: 200
  ✅ Response OK: true
✅ Configurações salvas com sucesso!
```

**Toast:**
```
✅ Configurações salvas com sucesso!
```

---

## 🚀 DEPLOY RÁPIDO

**Se você ainda não deployou a Edge Function:**

```bash
# 1. Login no Supabase
supabase login

# 2. Link ao projeto
supabase link --project-ref uknccixtubkdkofyieie

# 3. Deploy
cd supabase/functions
supabase functions deploy make-server-67caf26a

# 4. Confirmar
supabase functions list
```

---

**Versão:** v1.0.103.52  
**Status:** ✅ Correções Aplicadas  
**Última Atualização:** 29/10/2025

**Teste o health check e faça deploy da Edge Function!** 🚀
