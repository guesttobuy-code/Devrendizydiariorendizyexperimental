# 🚨 RESOLVER ERROS AGORA - Guia Rápido

## Status Atual

Você está vendo estes erros:
- ❌ **Failed to fetch** - Backend não acessível
- ❌ **Erro 401** - API Key inválida  
- ❌ **Erro 403** - Instance "Rendizy" já existe

---

## ⚡ Solução Rápida (2 minutos)

### Opção 1: Executar Script de Diagnóstico

```bash
bash diagnosticar-backend.sh
```

Este script irá:
1. ✅ Verificar se backend está online
2. ✅ Verificar API Key atual
3. ✅ Corrigir API Key automaticamente (se necessário)
4. ✅ Verificar Evolution API
5. ✅ Fornecer próximos passos

---

### Opção 2: Correção Manual Passo a Passo

#### 📍 Passo 1: Verificar se Backend está Online

```bash
# Teste rápido
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

**Se responder:**
```json
{"status":"ok",...}
```
✅ **Backend está ONLINE** - vá para Passo 2

**Se falhar:**
❌ **Backend está OFFLINE** - veja [Solução 3](#-solução-3-backend-offline)

---

#### 📍 Passo 2: Corrigir API Key

```bash
# Execute script de correção
bash CORRIGIR_API_KEY_CURL_DIRETO.sh
```

Ou manualmente:

```bash
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

#### 📍 Passo 3: Recarregar Página

1. Pressione **F5**
2. Aguarde **4-6 segundos**
3. Veja notificação de sucesso ✅

---

## 🔧 Solução 3: Backend Offline

Se o backend não está respondendo:

### A) Via Supabase Dashboard

1. **Acesse:**
   ```
   https://supabase.com/dashboard/project/uknccixtubkdkofyieie/functions
   ```

2. **Verifique:**
   - Função `make-server-67caf26a` existe?
   - Está ATIVA (verde)?
   - Tem logs de erro?

3. **Se não existe:**
   - Clique em "New Function"
   - Nome: `make-server-67caf26a`
   - Código: cole conteúdo de `/supabase/functions/server/index.tsx`
   - Deploy

### B) Via CLI Local

```bash
# 1. Instalar Supabase CLI (se necessário)
brew install supabase/tap/supabase

# 2. Navegar para funções
cd supabase/functions

# 3. Iniciar localmente
supabase functions serve make-server-67caf26a

# 4. Ou fazer deploy
supabase functions deploy make-server-67caf26a
```

---

## 🔧 Solução 4: Erro 403 (Instance já existe)

O erro **"This name 'Rendizy' is already in use"** é normal.

### Não faça nada!

A instância já existe no Evolution API. O sistema tentará usar a instância existente automaticamente.

### Se quiser forçar nova instância:

1. Acesse: `https://evo.boravendermuito.com.br/manager`
2. Login com Global API Key: `4de7861e944e291b56fe9781d2b00b36`
3. Encontre instância "Rendizy"
4. Delete ou use nome diferente como "Rendizy-2024"

---

## 📊 Checklist de Verificação

Use este checklist para confirmar que tudo está correto:

### Backend
- [ ] URL responde: `https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health`
- [ ] Retorna: `{"status":"ok"}`
- [ ] Edge Function está deployada no Supabase Dashboard
- [ ] Edge Function está ATIVA (status verde)

### API Key
- [ ] API Key no backend é: `4de7861e944e291b56fe9781d2b00b36`
- [ ] **NÃO** é a antiga: `F7DE5EFFB66B-4E43-B11F-F0D5D8849741`
- [ ] API URL é: `https://evo.boravendermuito.com.br`
- [ ] Instance name é: `Rendizy`

### Evolution API
- [ ] Evolution API responde em: `https://evo.boravendermuito.com.br/instance/connectionState/Rendizy`
- [ ] **NÃO** retorna erro 401
- [ ] Instance existe ou será criada pelo sistema

### Frontend
- [ ] Banner de "Backend Não Acessível" **NÃO** está visível
- [ ] Auto-Fix executou sem erros (veja console)
- [ ] Sem erro 401 nos logs

---

## 🆘 Ainda com Problemas?

### Debug Avançado

1. **Abra Console (F12)**
   - Veja logs do Auto-Fix
   - Procure por "🔍 Auto-Fix:"
   - Verifique mensagens de erro

2. **Teste Evolution API Diretamente**
   ```bash
   curl "https://evo.boravendermuito.com.br/instance/connectionState/Rendizy" \
     -H "apikey: 4de7861e944e291b56fe9781d2b00b36"
   ```

3. **Verifique Logs do Backend**
   - Dashboard Supabase → Functions → make-server-67caf26a → Logs
   - Procure por erros recentes

4. **Leia Documentação Detalhada**
   - [CORRIGIR_BACKEND_OFFLINE.md](./CORRIGIR_BACKEND_OFFLINE.md)
   - [SISTEMA_REESTABELECIDO_v1.0.103.73.md](./SISTEMA_REESTABELECIDO_v1.0.103.73.md)

---

## 📞 Próximos Passos

Após resolver os erros:

1. ✅ Recarregue página (F5)
2. ✅ Aguarde Auto-Fix (4-6 segundos)
3. ✅ Vá em: Configurações → Integrações → WhatsApp
4. ✅ Clique em "Verificar Status"
5. ✅ Se "Conectado", teste envio de mensagem
6. ✅ Se "Desconectado", clique "Gerar QR Code"

---

## 💡 Dica Pro

Use o banner automático no sistema:

1. Se o backend estiver offline, você verá um banner vermelho no topo
2. Clique em "Verificar Novamente" para testar novamente
3. O banner desaparece automaticamente quando backend volta

---

## 🎯 TL;DR (Resumo Ultra Rápido)

```bash
# Executar apenas isto:
bash diagnosticar-backend.sh

# Depois:
# 1. Pressione F5
# 2. Aguarde 6 segundos
# 3. Pronto! ✅
```

---

**Versão:** v1.0.103.73  
**Data:** 30/10/2025  
**Status:** Guia de Correção de Erros

**🚀 Boa sorte!**
