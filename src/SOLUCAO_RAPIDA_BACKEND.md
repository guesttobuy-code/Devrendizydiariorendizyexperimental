# ⚡ SOLUÇÃO RÁPIDA - Backend Não Acessível

**v1.0.103.54** | 29/10/2025

---

## ❌ PROBLEMA

```
Failed to fetch
```

**Tradução:** O backend (servidor) não está online.

---

## ✅ SOLUÇÃO (3 PASSOS)

### 1️⃣ EXECUTAR SCRIPT DE DEPLOY

```bash
bash DEPLOY_BACKEND_NOW.sh
```

**O que faz:**
- ✅ Instala Supabase CLI (se necessário)
- ✅ Faz login
- ✅ Linka projeto
- ✅ Faz deploy do backend
- ✅ Testa se funcionou

---

### 2️⃣ SE DER ERRO DE SENHA

**Execute manualmente:**

```bash
# 1. Login
supabase login

# 2. Link com senha
supabase link --project-ref uknccixtubkdkofyieie --password YOUR_DB_PASSWORD

# 3. Deploy
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
```

**Onde pegar a senha:**
- Dashboard Supabase → Settings → Database → Reset Database Password

---

### 3️⃣ VERIFICAR SE FUNCIONOU

```bash
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

**Esperado:**
```json
{
  "status": "ok",
  "service": "Rendizy Backend API"
}
```

---

## 🎯 DEPOIS DO DEPLOY

**1. Abrir RENDIZY**

**2. Ir em: Configurações > Integrações > WhatsApp**

**3. Preencher:**
```
URL:      https://evo.boravendermuito.com.br
Instance: rendizy-admin-master
API Key:  F7DE5EFFB66B-4E43-B11F-F0D5D8849741
```

**4. Clicar: "Salvar Configurações"**

**5. Deve aparecer:**
```
✅ Configurações salvas com sucesso!
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

- **`FIX_BACKEND_NOT_ACCESSIBLE_v1.0.103.54.md`** - Guia detalhado
- **`DEPLOY_BACKEND_NOW.sh`** - Script automático

---

## 🆘 PROBLEMAS?

### ❌ "supabase: command not found"

```bash
# macOS
brew install supabase/tap/supabase

# Verificar
supabase --version
```

---

### ❌ "Failed to link project"

**Motivo:** Senha do banco incorreta

**Solução:**
1. Ir em: https://app.supabase.com/project/uknccixtubkdkofyieie/settings/database
2. Clicar em "Reset Database Password"
3. Copiar nova senha
4. Executar:
```bash
supabase link --project-ref uknccixtubkdkofyieie --password NOVA_SENHA
```

---

### ❌ "Failed to deploy function"

**Ver logs:**
```bash
supabase functions logs make-server-67caf26a --follow
```

**Causas comuns:**
- Erro de sintaxe no código
- Limite do plano free atingido
- Permissões incorretas

---

### ❌ Backend deployou mas ainda dá erro

**Aguardar 30 segundos** (propagação)

**Limpar cache do browser:**
- Chrome: Ctrl+Shift+Delete
- Recarregar: Ctrl+F5

**Testar em aba anônima**

---

## ⚡ COMANDO ÚNICO

**Se você já tem Supabase CLI e está logado:**

```bash
supabase link --project-ref uknccixtubkdkofyieie && \
cd supabase/functions && \
supabase functions deploy make-server-67caf26a --no-verify-jwt && \
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

---

## 📊 CHECKLIST

**Antes de testar no RENDIZY:**

- [ ] Supabase CLI instalado
- [ ] Login feito
- [ ] Projeto linkado
- [ ] Edge Function deployada
- [ ] Health check retorna 200 OK
- [ ] Sem erros no console

**Se tudo ✅ acima, pode testar no RENDIZY!**

---

**v1.0.103.54** - Solução Rápida  
**Execute:** `bash DEPLOY_BACKEND_NOW.sh`
