# 🚀 DEPLOY BACKEND NO SUPABASE - v1.0.103.181

**Data:** 31 de Outubro de 2025  
**Objetivo:** Deploy do backend no Supabase + Configuração das variáveis de ambiente da Evolution API

## ❌ ERRO ATUAL

```
Erro ao buscar tipos: TypeError: Failed to fetch
⚠️ Backend indisponível. Usando dados mockados para Tipos de Propriedade.
```

## ✅ SOLUÇÃO

O backend completo está implementado, mas **NÃO ESTÁ DEPLOYADO** no Supabase.

---

## 📋 PASSO 1: Deploy Automático (RECOMENDADO)

Execute o script de deploy automático:

```bash
chmod +x DEPLOY_BACKEND_NOW.sh
./DEPLOY_BACKEND_NOW.sh
```

Este script vai:
- ✅ Verificar/Instalar Supabase CLI
- ✅ Fazer login automaticamente
- ✅ Linkar o projeto correto
- ✅ Fazer deploy da Edge Function
- ✅ Testar o health check

---

## 📋 PASSO 2: Deploy Manual (se preferir)

```bash
# 1. Instalar Supabase CLI (se ainda não tiver)
brew install supabase/tap/supabase

# 2. Login
supabase login

# 3. Linkar projeto
supabase link --project-ref uknccixtubkdkofyieie

# 4. Deploy
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..

# 5. Testar
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

---

## 📋 PASSO 3: Configurar Variáveis de Ambiente da Evolution API

### Via Dashboard do Supabase (RECOMENDADO)

1. Acesse: https://app.supabase.com/project/uknccixtubkdkofyieie/settings/functions

2. Na seção **"Edge Functions"** → **"Secrets"**, adicione:

```
EVOLUTION_API_URL=https://evo.boravendermuito.com.br
EVOLUTION_INSTANCE_NAME=rendizy-admin-master
EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741
EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555
```

3. **IMPORTANTE:** Após adicionar as secrets, você precisa **RE-DEPLOY** a função:

```bash
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

### Via CLI do Supabase

```bash
# Configurar as 4 variáveis
supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br
supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master
supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741
supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555

# Verificar se foram configuradas
supabase secrets list

# Re-deploy após configurar (OBRIGATÓRIO)
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

---

## 📋 PASSO 4: Verificar se está funcionando

Execute o script de teste:

```bash
chmod +x 🧪_TESTAR_PROPERTY_TYPES_AGORA.sh
./🧪_TESTAR_PROPERTY_TYPES_AGORA.sh
```

Ou teste manualmente:

```bash
# Testar health check
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health

# Testar property types (deve retornar 50+ tipos)
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/property-types \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"

# Testar importação de contatos do WhatsApp
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/import-chats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18" \
  -H "Content-Type: application/json" \
  -d '{"organizationId":"admin-master"}'
```

---

## 🎯 RESULTADO ESPERADO

Depois do deploy, você deve ver no console do navegador:

```
✅ Property types carregados do backend: 53 tipos
```

E no módulo de WhatsApp, a importação de contatos deve funcionar sem erro 404.

---

## 🔍 TROUBLESHOOTING

### Erro: "Supabase CLI not found"
```bash
# macOS
brew install supabase/tap/supabase

# Linux
brew install supabase/tap/supabase

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Erro: "Not logged in"
```bash
supabase login
# Vai abrir o browser para você fazer login
```

### Erro: "Project not linked"
```bash
supabase link --project-ref uknccixtubkdkofyieie
# Você pode precisar fornecer a senha do database
```

### Erro 404 no endpoint
```bash
# Verificar se a função foi deployada
supabase functions list

# Ver logs em tempo real
supabase functions logs make-server-67caf26a --follow

# Forçar re-deploy
cd supabase/functions
supabase functions delete make-server-67caf26a
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

### Secrets não estão funcionando
```bash
# Verificar se foram configuradas
supabase secrets list

# Se não aparecerem, configure novamente
supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br
supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master
supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741
supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555

# SEMPRE re-deploy após configurar secrets
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- **Supabase CLI:** https://supabase.com/docs/guides/cli
- **Edge Functions:** https://supabase.com/docs/guides/functions
- **Secrets Management:** https://supabase.com/docs/guides/functions/secrets

---

## 🎉 PRÓXIMOS PASSOS

Depois do deploy bem-sucedido:

1. ✅ Recarregar o RENDIZY no browser
2. ✅ Verificar que os tipos de propriedade carregam do backend
3. ✅ Testar a importação de contatos do WhatsApp
4. ✅ Aproveitar os 50+ tipos completos ao invés dos dados mockados

---

## 📊 BENEFÍCIOS DO BACKEND DEPLOYADO

- ✅ **50+ tipos de propriedade** reais (Location + Accommodation)
- ✅ **Importação de contatos WhatsApp** funcionando
- ✅ **Auto-save** em todas as telas
- ✅ **Persistência real** de dados
- ✅ **Multi-tenant** com organizações
- ✅ **Integração completa** com Stays.net e Booking.com
- ✅ **API Evolution** funcionando

---

## ⚡ COMANDO RÁPIDO (COPIAR E COLAR)

```bash
# Deploy completo em 3 comandos
supabase login && \
supabase link --project-ref uknccixtubkdkofyieie && \
cd supabase/functions && \
supabase functions deploy make-server-67caf26a --no-verify-jwt && \
cd ../.. && \
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

Se o health check retornar `{"status":"ok"}`, está tudo pronto! 🚀
