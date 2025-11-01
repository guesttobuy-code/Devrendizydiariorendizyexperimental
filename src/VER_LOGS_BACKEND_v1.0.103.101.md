# 🔍 COMO VER OS LOGS DO BACKEND PARA DIAGNOSTICAR O ERRO 500

**v1.0.103.101** | **30/10/2025**

---

## 🎯 OBJETIVO

O erro mudou de **404 → 500**, o que significa:
- ✅ As rotas estão sendo encontradas (não é mais 404)
- ❌ Há um erro ao chamar a Evolution API
- 🔍 Precisamos ver os logs detalhados do backend

---

## 📋 LOGS QUE FORAM ADICIONADOS

Adicionei logs super detalhados na rota `/whatsapp/chats`:

```typescript
console.log('[WhatsApp] 📥 Buscando conversas...');
console.log('[WhatsApp] 🔑 API Key:', EVOLUTION_GLOBAL_API_KEY.substring(0, 10) + '...');
console.log('[WhatsApp] 🎫 Token:', EVOLUTION_INSTANCE_TOKEN.substring(0, 15) + '...');
console.log('[WhatsApp] 📛 Instância:', EVOLUTION_INSTANCE_NAME);
console.log('[WhatsApp] 🌐 URL completa:', `${EVOLUTION_API_URL}/chat/findChats/${EVOLUTION_INSTANCE_NAME}`);
console.log('[WhatsApp] 📋 Headers enviados:', {...});
console.log('[WhatsApp] 📡 Status da resposta:', response.status);
console.log('[WhatsApp] 📄 Content-Type da resposta:', response.headers.get('content-type'));
console.log('[WhatsApp] 📦 Primeiros 500 caracteres da resposta:', responseText.substring(0, 500));
```

---

## 🖥️ COMO VER OS LOGS DO SUPABASE

### **Opção 1: Via Dashboard do Supabase (RECOMENDADO)**

1. **Acesse o Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/uknccixtubkdkofyieie
   ```

2. **Vá em "Edge Functions":**
   - Menu lateral → **Edge Functions**
   - Clique em **make-server-67caf26a**

3. **Abra os Logs:**
   - Clique na aba **Logs**
   - Ou **Invocations**
   - Ou **Metrics**

4. **Veja os logs em tempo real:**
   - Ative "Live" / "Auto-refresh"
   - Abra o Chat no navegador
   - Os logs aparecerão aqui

---

### **Opção 2: Via CLI do Supabase**

```bash
# Instalar Supabase CLI (se não tiver)
npm install -g supabase

# Login
supabase login

# Ver logs em tempo real
supabase functions logs make-server-67caf26a --project-ref uknccixtubkdkofyieie
```

---

### **Opção 3: Via Logs do Navegador (Frontend)**

Os logs do backend NÃO aparecem no console do navegador.  
Mas você pode ver a **resposta do erro** que incluirá detalhes:

```javascript
{
  "error": "Erro ao buscar conversas",
  "details": {
    "status": 500,
    "statusText": "Internal Server Error",
    "response": "<!doctype html>...",  // ← ISTO MOSTRA O QUE A EVOLUTION RETORNOU
    "url": "https://evo.boravendermuito.com.br/manager/chat/findChats/Rendizy"
  }
}
```

---

## 🔍 O QUE PROCURAR NOS LOGS

### **1. URL da Evolution API**
```
[WhatsApp] 🌐 URL completa: https://evo.boravendermuito.com.br/manager/chat/findChats/Rendizy
```

✅ **Deve ser:** `https://evo.boravendermuito.com.br/manager/chat/findChats/Rendizy`  
❌ **Se estiver diferente:** URL está errada

---

### **2. Headers enviados**
```
[WhatsApp] 📋 Headers enviados: {
  apikey: '4de7861e94...',
  Authorization: 'Bearer 0FF3641E80A6-453...',
  'Content-Type': 'application/json'
}
```

✅ **Deve ter:**
- `apikey`: Sua Global API Key
- `Authorization`: Bearer + Instance Token
- `Content-Type`: application/json

---

### **3. Status da resposta**
```
[WhatsApp] 📡 Status da resposta: 404
```

| Status | Significado |
|--------|-------------|
| **200** | ✅ Sucesso! |
| **401** | ❌ Credenciais inválidas (API Key ou Token errado) |
| **404** | ❌ Instância não encontrada ou rota errada |
| **500** | ❌ Erro interno da Evolution API |

---

### **4. Resposta da Evolution API**
```
[WhatsApp] 📦 Primeiros 500 caracteres da resposta: <!doctype html><html>...
```

❌ **Se começar com `<!doctype html>`:**  
A Evolution API está retornando HTML (página de erro) ao invés de JSON

✅ **Se começar com `{` ou `[`:**  
É JSON válido

---

## 🎯 POSSÍVEIS PROBLEMAS E SOLUÇÕES

### **Problema 1: Resposta é HTML**
```
📦 Primeiros 500 caracteres da resposta: <!doctype html>
```

**Causa:**  
- Instância não existe
- URL da API errada
- Evolution API offline

**Solução:**
1. Verifique se a instância "Rendizy" existe no Evolution Manager
2. Teste a URL diretamente no navegador:
   ```
   https://evo.boravendermuito.com.br/manager/
   ```
3. Verifique se o Evolution API está online

---

### **Problema 2: Status 401**
```
📡 Status da resposta: 401
```

**Causa:**  
- Global API Key inválida
- Instance Token inválido

**Solução:**
1. Verifique a Global API Key no Evolution Manager
2. Verifique o Instance Token
3. Rode o teste:
   ```bash
   sh TESTE_CREDENCIAIS_WHATSAPP.sh
   ```

---

### **Problema 3: Status 404**
```
📡 Status da resposta: 404
📦 Resposta: {"message": "Instance not found"}
```

**Causa:**  
- Instância "Rendizy" não existe
- Nome da instância está errado

**Solução:**
1. Liste todas as instâncias:
   ```bash
   curl -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
     https://evo.boravendermuito.com.br/manager/instance/fetchInstances
   ```
2. Veja o nome correto da instância
3. Atualize `EVOLUTION_INSTANCE_NAME` se necessário

---

## 🧪 TESTE COMPLETO AGORA

### **1. Abra o Dashboard do Supabase**
```
https://supabase.com/dashboard/project/uknccixtubkdkofyieie/functions/make-server-67caf26a/logs
```

### **2. Ative os logs em tempo real**
Clique em "Live" ou "Auto-refresh"

### **3. Abra o Chat no navegador**
```
1. F12 → Console
2. Vá em Chat
3. Aguarde 2 segundos
```

### **4. Veja os logs no Supabase**
Os logs aparecerão em tempo real mostrando:
- URL completa
- Headers
- Status HTTP
- Resposta da Evolution API (primeiros 500 chars)

### **5. Copie e cole aqui**
Me envie os logs completos para eu diagnosticar

---

## 📱 TESTE DIRETO DA EVOLUTION API

Teste se a Evolution API está respondendo:

```bash
# Teste 1: Listar instâncias
curl -v \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  https://evo.boravendermuito.com.br/manager/instance/fetchInstances

# Teste 2: Status da instância Rendizy
curl -v \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50" \
  https://evo.boravendermuito.com.br/manager/instance/status/Rendizy

# Teste 3: Buscar conversas (o que está falhando)
curl -v \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50" \
  https://evo.boravendermuito.com.br/manager/chat/findChats/Rendizy
```

---

## 📊 CHECKLIST DE DIAGNÓSTICO

- [ ] Abri o Dashboard do Supabase
- [ ] Fui em Edge Functions → make-server-67caf26a → Logs
- [ ] Ativei "Live" para ver logs em tempo real
- [ ] Abri o Chat no navegador
- [ ] Vi os logs aparecerem no Supabase
- [ ] Copiei a **URL completa** que está sendo chamada
- [ ] Copiei o **Status HTTP** da resposta
- [ ] Copiei os **primeiros 500 caracteres da resposta**
- [ ] Testei a Evolution API diretamente com curl

---

## 🎯 PRÓXIMOS PASSOS

**Após ver os logs, me envie:**

1. **URL completa** que está sendo chamada
2. **Status HTTP** da resposta
3. **Primeiros 500 caracteres** da resposta
4. **Resultado dos testes curl** (se fez)

Com essas informações, vou identificar exatamente o problema!

---

**Os logs agora mostram TUDO que está acontecendo. Vamos encontrar o problema!** 🔍✨
