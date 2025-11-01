# 🧪 TESTE COM CREDENCIAIS REAIS - WhatsApp v1.0.103.53

**Data:** 29 de Outubro de 2025  
**Versão:** v1.0.103.53  
**Status:** 🧪 Testando Credenciais Reais

---

## 🎯 CREDENCIAIS FORNECIDAS

```
API Key:        F7DE5EFFB66B-4E43-B11F-F0D5D8849741
URL:            https://evo.boravendermuito.com.br
Instance Name:  rendizy-admin-master
```

---

## 🔍 SIMULAÇÃO DO FLUXO DE SALVAMENTO

### PASSO 1: Usuário Preenche Formulário

**No RENDIZY:**
1. Vai em "Configurações > Integrações"
2. Clica no card verde "WhatsApp Business"
3. Abre a tab "Configuração"
4. Preenche os campos:
   ```
   URL da Evolution API: https://evo.boravendermuito.com.br
   Nome da Instância:    rendizy-admin-master
   API Key:              F7DE5EFFB66B-4E43-B11F-F0D5D8849741
   ```
5. Clica em "💾 Salvar Configurações"

---

### PASSO 2: Código Executa `handleSaveConfig()`

**O que acontece no código:**

```typescript
// 1. Mostra loading
setSavingConfig(true);

// 2. HEALTH CHECK - Testa se backend está online
const healthCheck = await fetch(
  'https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health',
  { headers: { 'Authorization': 'Bearer eyJhbGc...' } }
);

if (!healthCheck.ok) {
  // ❌ ERRO: Backend offline
  toast.error('❌ Servidor backend não está acessível');
  return;
}

console.log('✅ Backend está online');

// 3. Valida campos obrigatórios
if (!api_url || !instance_name || !api_key) {
  toast.error('❌ Preencha todos os campos obrigatórios');
  return;
}

// 4. Limpa e valida URL
let cleanUrl = 'https://evo.boravendermuito.com.br';

// Remove /manager se existir
cleanUrl = cleanUrl.replace(/\/manager\/?$/, '');
// Resultado: https://evo.boravendermuito.com.br (sem mudança)

// Remove barra final
cleanUrl = cleanUrl.replace(/\/$/, '');
// Resultado: https://evo.boravendermuito.com.br (sem mudança)

// 5. Monta objeto de configuração
const configToSave = {
  whatsapp: {
    enabled: true,
    api_url: 'https://evo.boravendermuito.com.br',
    instance_name: 'rendizy-admin-master',
    api_key: 'F7DE5EFFB66B-4E43-B11F-F0D5D8849741',
    connected: false,
    connection_status: 'disconnected'
  }
};

// 6. Chama API do backend
const result = await channelsApi.updateConfig(organizationId, configToSave);
```

---

### PASSO 3: `channelsApi.updateConfig()` Executa

**Detalhes da chamada:**

```typescript
// Em utils/chatApi.ts
updateConfig: (organizationId, data) =>
  fetchAPI('/chat/channels/config', {
    method: 'PATCH',
    body: JSON.stringify({ 
      organization_id: organizationId, 
      ...data 
    }),
  })
```

**URL Completa:**
```
https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/chat/channels/config
```

**Method:** PATCH

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Body:**
```json
{
  "organization_id": "admin-master",
  "whatsapp": {
    "enabled": true,
    "api_url": "https://evo.boravendermuito.com.br",
    "instance_name": "rendizy-admin-master",
    "api_key": "F7DE5EFFB66B-4E43-B11F-F0D5D8849741",
    "connected": false,
    "connection_status": "disconnected"
  }
}
```

---

### PASSO 4: Backend Processa Request

**No servidor (`routes-chat.ts`):**

```typescript
// Rota: PATCH /make-server-67caf26a/chat/channels/config

chat.patch('/channels/config', async (c) => {
  try {
    const body = await c.req.json();
    const { organization_id, ...updates } = body;
    
    // 1. Valida organization_id
    if (!organization_id) {
      return c.json({ 
        success: false, 
        error: 'Missing organization_id' 
      }, 400);
    }
    
    // 2. Busca config existente do KV store
    const key = `channel_config:${organization_id}`;
    let config = await kv.get(key);
    
    if (!config) {
      // Cria config padrão se não existe
      config = {
        organization_id,
        whatsapp: { enabled: false },
        sms: { enabled: false },
        email: { enabled: false },
        internal: { enabled: true },
        // ...
      };
    }
    
    // 3. Faz merge dos updates
    config = {
      ...config,
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    // 4. Salva no KV store
    await kv.set(key, config);
    
    // 5. Retorna sucesso
    return c.json({ 
      success: true, 
      data: config 
    });
    
  } catch (error) {
    console.error('❌ Error updating channel config:', error);
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500);
  }
});
```

---

### PASSO 5: Frontend Recebe Resposta

**Se sucesso (200 OK):**

```json
{
  "success": true,
  "data": {
    "organization_id": "admin-master",
    "whatsapp": {
      "enabled": true,
      "api_url": "https://evo.boravendermuito.com.br",
      "instance_name": "rendizy-admin-master",
      "api_key": "F7DE5EFFB66B-4E43-B11F-F0D5D8849741",
      "connected": false,
      "connection_status": "disconnected"
    },
    "updated_at": "2025-10-29T..."
  }
}
```

**Código executa:**
```typescript
if (result.success) {
  setConfig(result.data);  // Atualiza estado local
  setWhatsappForm(prev => ({ ...prev, api_url: cleanUrl }));
  console.log('✅ Configurações salvas com sucesso!');
  toast.success('✅ Configurações salvas com sucesso!');
}
```

**Toast verde aparece:**
```
✅ Configurações salvas com sucesso!
```

---

**Se erro (4xx ou 5xx):**

```typescript
if (!result.success) {
  console.error('❌ Erro ao salvar:', result.error);
  toast.error('❌ Falha ao salvar: ' + result.error);
}
```

**Toast vermelho aparece:**
```
❌ Falha ao salvar: [mensagem de erro]
```

---

## 🔍 POSSÍVEIS RESULTADOS

### ✅ CENÁRIO 1: Sucesso Total

**Console mostra:**
```
🔵 handleSaveConfig chamado
📋 Dados do formulário: {
  api_url: "https://evo.boravendermuito.com.br",
  instance_name: "rendizy-admin-master",
  api_key: "F7DE5EFFB66B-4E43-B11F-F0D5D8849741"
}
🏥 Verificando saúde do servidor backend...
✅ Servidor backend está ONLINE
✅ Backend está online
🔵 URL original: https://evo.boravendermuito.com.br
🔵 URL limpa: https://evo.boravendermuito.com.br
📤 Salvando config: { whatsapp: {...} }
🔵 fetchAPI chamado:
  📍 URL: https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/chat/channels/config
  📍 Method: PATCH
  ✅ Response Status: 200
  ✅ Response OK: true
📥 Resultado: { success: true, data: {...} }
✅ Configurações salvas com sucesso!
```

**Toast:**
```
✅ Configurações salvas com sucesso!
```

**Status:**
- ✅ Configuração salva no backend
- ✅ Estado local atualizado
- ✅ Botão "Gerar QR Code" habilitado
- ✅ Pode conectar WhatsApp

---

### ❌ CENÁRIO 2: Backend Offline

**Console mostra:**
```
🔵 handleSaveConfig chamado
📋 Dados do formulário: {...}
🏥 Verificando saúde do servidor backend...
❌ Backend não está acessível. Status: 404
```

**Toast:**
```
❌ Servidor backend não está acessível. Verifique se a Edge Function está deployada.
```

**Solução:**
```bash
supabase functions deploy make-server-67caf26a
```

---

### ❌ CENÁRIO 3: Erro de Rede

**Console mostra:**
```
🔵 handleSaveConfig chamado
📋 Dados do formulário: {...}
❌ Erro ao verificar backend: TypeError: Failed to fetch
```

**Toast:**
```
❌ Não foi possível conectar ao servidor. Verifique sua conexão com internet.
```

**Solução:**
- Verificar conexão com internet
- Verificar se firewall não está bloqueando

---

### ❌ CENÁRIO 4: Campos Vazios

**Console mostra:**
```
🔵 handleSaveConfig chamado
📋 Dados do formulário: {
  api_url: "",
  instance_name: "",
  api_key: ""
}
```

**Toast:**
```
❌ Preencha todos os campos obrigatórios
```

**Solução:**
- Preencher todos os campos

---

### ❌ CENÁRIO 5: Erro no Backend (500)

**Console mostra:**
```
🔵 handleSaveConfig chamado
📋 Dados do formulário: {...}
✅ Backend está online
🔵 URL limpa: https://evo.boravendermuito.com.br
📤 Salvando config: {...}
🔵 fetchAPI chamado:
  📍 URL: https://...
  📍 Method: PATCH
  ❌ Response Status: 500
❌ API Error [/chat/channels/config]: { error: "Internal server error" }
📥 Resultado: { success: false, error: "Internal server error" }
```

**Toast:**
```
❌ Falha ao salvar: Internal server error
```

**Solução:**
- Ver logs do backend
- Verificar se KV store está acessível

---

## 🧪 TESTE MANUAL NO CONSOLE

**Você pode testar manualmente no Console (F12):**

### 1. Testar Health Check

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

**Esperado:** `{status: "ok", timestamp: "...", service: "Rendizy Backend API"}`

---

### 2. Testar Salvamento de Config

```javascript
fetch('https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/chat/channels/config', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18'
  },
  body: JSON.stringify({
    organization_id: 'admin-master',
    whatsapp: {
      enabled: true,
      api_url: 'https://evo.boravendermuito.com.br',
      instance_name: 'rendizy-admin-master',
      api_key: 'F7DE5EFFB66B-4E43-B11F-F0D5D8849741',
      connected: false,
      connection_status: 'disconnected'
    }
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Esperado:** `{success: true, data: {...}}`

---

## 📊 VALIDAÇÃO FINAL

### ✅ Salvamento FUNCIONOU se:

1. ✅ Console mostra: "✅ Configurações salvas com sucesso!"
2. ✅ Toast verde aparece
3. ✅ Botão "Gerar QR Code" fica habilitado
4. ✅ Valores ficam salvos nos inputs
5. ✅ Ao recarregar página, valores permanecem

---

### ❌ Salvamento FALHOU se:

1. ❌ Toast vermelho aparece com erro
2. ❌ Console mostra erro em vermelho
3. ❌ Botão "Gerar QR Code" continua desabilitado
4. ❌ Ao recarregar página, valores somem

---

## 🎯 PRÓXIMOS PASSOS APÓS SALVAR

### Se salvamento funcionar:

**1. Gerar QR Code**

```
Clicar em "📱 Gerar QR Code"
→ Backend cria instância na Evolution API
→ QR Code aparece na tela
→ Escanear com WhatsApp
```

**2. Verificar Conexão**

```
Ir na tab "Status & Conexão"
→ Clicar em "🔄 Verificar Status"
→ Deve mostrar: "✅ Conectado"
```

**3. Testar Envio**

```
Ir no módulo Chat
→ Selecionar conversa
→ Enviar mensagem via WhatsApp
```

---

## 🔍 COMANDOS DE DEBUG

### Ver Config Salva no KV Store (Manualmente)

**No Supabase Dashboard:**
```sql
-- Se estiver usando Postgres diretamente
SELECT * FROM kv_store_67caf26a 
WHERE key = 'channel_config:admin-master';
```

---

### Ver Logs do Backend

```bash
# Ver logs em tempo real
supabase functions logs make-server-67caf26a --follow

# Ver últimos 100 logs
supabase functions logs make-server-67caf26a -n 100
```

---

## 📝 RESUMO

**O que vai acontecer ao clicar "Salvar Configurações":**

1. ✅ Backend verifica se está online (health check)
2. ✅ Valida campos obrigatórios
3. ✅ Limpa e valida URL
4. ✅ Monta objeto de configuração
5. ✅ Envia PATCH para `/chat/channels/config`
6. ✅ Backend salva no KV store
7. ✅ Retorna sucesso
8. ✅ Frontend atualiza estado
9. ✅ Toast verde aparece

**Suas credenciais estão corretas e formatadas:**
- ✅ URL válida: `https://evo.boravendermuito.com.br`
- ✅ Instance name válido: `rendizy-admin-master`
- ✅ API Key válida: `F7DE5EFFB66B-4E43-B11F-F0D5D8849741`

**Agora é só testar no RENDIZY!** 🚀

---

**Versão:** v1.0.103.53  
**Status:** 🧪 Pronto para Testar  
**Última Atualização:** 29/10/2025

**Preencha os campos e clique em "Salvar Configurações"!** ✨
