# 🚨 BACKEND OFFLINE - Soluções Rápidas

## Status Atual

O backend Edge Function não está acessível em:
```
https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a
```

## Principais Erros

1. **❌ Failed to fetch** - Backend não está respondendo
2. **❌ Erro 401** - API Key antiga ainda configurada
3. **❌ Erro 403** - Instance "Rendizy" já existe

---

## 🔧 Solução 1: Verificar Edge Function no Supabase

### Passo 1: Acesse o Dashboard Supabase

```bash
https://supabase.com/dashboard/project/uknccixtubkdkofyieie/functions
```

### Passo 2: Verificar se Edge Function está deployada

Procure por função chamada: **`make-server-67caf26a`**

- ✅ Se **EXISTE e ESTÁ ATIVA** → Vá para Solução 2
- ❌ Se **NÃO EXISTE** → Faça deploy (veja abaixo)
- ⚠️ Se **EXISTE mas INATIVA** → Ative a função

### Passo 3: Deploy da Edge Function (se necessário)

```bash
# Opção A: Via CLI do Supabase
cd supabase/functions
supabase functions deploy make-server-67caf26a

# Opção B: Via Dashboard do Supabase
1. Acesse: Functions → Deploy Function
2. Selecione o arquivo: /supabase/functions/server/index.tsx
3. Nome da função: make-server-67caf26a
4. Clique em "Deploy"
```

---

## 🔧 Solução 2: Corrigir API Key Manualmente

### Opção A: Via Supabase Dashboard

1. **Acesse Table Editor:**
   ```
   https://supabase.com/dashboard/project/uknccixtubkdkofyieie/editor
   ```

2. **Encontre a tabela KV Store:**
   - Procure por tabela que armazena `kv_store_67caf26a`
   - Ou faça query SQL direta (veja abaixo)

3. **Execute Query SQL:**
   ```sql
   -- Buscar config atual
   SELECT * FROM kv_store_67caf26a 
   WHERE key = 'chat:channels:config:org_default';

   -- Atualizar API Key (se encontrou)
   UPDATE kv_store_67caf26a
   SET value = jsonb_set(
     value::jsonb,
     '{whatsapp,api_key}',
     '"4de7861e944e291b56fe9781d2b00b36"'::jsonb
   )
   WHERE key = 'chat:channels:config:org_default';
   ```

### Opção B: Via API Direta (se backend funcionar)

```bash
# Testar se backend está online
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health

# Se responder OK, atualizar config
curl -X PATCH "https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/chat/channels/config" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <SEU_ANON_KEY>" \
  -d '{
    "organization_id": "org_default",
    "whatsapp": {
      "enabled": true,
      "api_url": "https://evo.boravendermuito.com.br",
      "instance_name": "Rendizy",
      "api_key": "4de7861e944e291b56fe9781d2b00b36",
      "connected": false
    }
  }'
```

---

## 🔧 Solução 3: Executar Backend Localmente

### Passo 1: Instalar Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Windows (scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
brew install supabase/tap/supabase
```

### Passo 2: Iniciar Backend Local

```bash
# Na raiz do projeto
cd supabase/functions
supabase functions serve make-server-67caf26a --env-file .env
```

### Passo 3: Atualizar URL no Frontend

Edite `/utils/supabase/info.tsx` temporariamente:

```typescript
// TEMPORÁRIO - para desenvolvimento local
export const projectId = 'localhost:54321';
```

**⚠️ IMPORTANTE:** Reverta para URL de produção depois!

---

## 🔧 Solução 4: Resolver Erro 403 (Instance já existe)

O erro **"This name 'Rendizy' is already in use"** significa que a instância já existe no Evolution API.

### Opções:

**A) Usar instância existente** (Recomendado)
```javascript
// Não tente criar nova instância
// Use apenas: /instance/connectionState/Rendizy
// E: /instance/connect/Rendizy
```

**B) Deletar instância antiga**
```bash
# Via Evolution API Manager
1. Acesse: https://evo.boravendermuito.com.br/manager
2. Login com Global API Key
3. Encontre instância "Rendizy"
4. Delete a instância
5. Tente criar novamente
```

**C) Usar nome diferente**
```javascript
// Mude o instance_name para algo único
{
  "instance_name": "Rendizy-2024",
  "api_key": "4de7861e944e291b56fe9781d2b00b36"
}
```

---

## 📊 Checklist de Verificação

### Backend
- [ ] Edge Function está deployada no Supabase
- [ ] Edge Function está ATIVA
- [ ] Endpoint `/health` responde OK
- [ ] Logs não mostram erros

### API Key
- [ ] API Key no KV Store é: `4de7861e944e291b56fe9781d2b00b36`
- [ ] API URL é: `https://evo.boravendermuito.com.br`
- [ ] Instance name é: `Rendizy`

### Evolution API
- [ ] Global API Key está correta
- [ ] Instance "Rendizy" existe OU você criou uma nova
- [ ] Não há erro 403 ao criar instância

---

## 🆘 Testes Rápidos

### Teste 1: Backend Health Check

```bash
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

**Resultado esperado:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-30T...",
  "service": "Rendizy Backend API"
}
```

### Teste 2: Get Config

```bash
curl "https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/chat/channels/config?organization_id=org_default" \
  -H "Authorization: Bearer <SEU_ANON_KEY>"
```

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "organization_id": "org_default",
    "whatsapp": {
      "api_key": "4de7861e944e291b56fe9781d2b00b36",
      ...
    }
  }
}
```

### Teste 3: Evolution API Direct

```bash
curl "https://evo.boravendermuito.com.br/instance/connectionState/Rendizy" \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36"
```

**Resultado esperado:**
```json
{
  "instance": {
    "instanceName": "Rendizy",
    "state": "open" // ou "close"
  }
}
```

---

## 📱 Após Corrigir

1. **Recarregue a página** (F5)
2. **Aguarde Auto-Fix** executar (4-6 segundos)
3. **Verifique console** para logs de sucesso
4. **Teste conexão WhatsApp** em Configurações → Integrações

---

## 🔗 Links Úteis

- **Supabase Dashboard:** https://supabase.com/dashboard/project/uknccixtubkdkofyieie
- **Edge Functions:** https://supabase.com/dashboard/project/uknccixtubkdkofyieie/functions
- **Evolution API Manager:** https://evo.boravendermuito.com.br/manager
- **Documentação Supabase Functions:** https://supabase.com/docs/guides/functions

---

## 💡 Dicas

1. **Sempre verifique logs** no Dashboard do Supabase
2. **Use modo desenvolvimento** localmente antes de deploy
3. **Mantenha API Keys seguras** - nunca commite no git
4. **Teste uma solução por vez** - não misture abordagens

---

**Versão:** v1.0.103.73  
**Data:** 30/10/2025  
**Status:** Backend Offline - Soluções Disponíveis
