# 🎯 GUIA DE DEPLOY DO BACKEND - PASSO A PASSO

**Versão:** v1.0.103.184  
**Data:** 31 de Outubro de 2025  
**Objetivo:** Deploy completo do backend RENDIZY no Supabase  
**Tempo estimado:** 5-10 minutos

---

## 📋 O QUE VOCÊ VAI CONSEGUIR DEPOIS DO DEPLOY

✅ **50+ tipos de propriedade reais** (ao invés de 6 mockados)  
✅ **23+ tipos de acomodação reais** (ao invés de 7 mockados)  
✅ **Persistência real** de dados entre sessões  
✅ **Multi-tenant** funcionando com organizações  
✅ **WhatsApp Evolution API** completa  
✅ **Stays.net PMS** integrado  
✅ **Booking.com** Channel Manager  
✅ **Auto-save** em todas as telas  

---

## 🚀 OPÇÃO 1: DEPLOY AUTOMÁTICO (RECOMENDADO)

### Passo 1: Execute o script

```bash
chmod +x DEPLOY_BACKEND_NOW.sh
./DEPLOY_BACKEND_NOW.sh
```

### O que o script faz:

1. ✅ Verifica se Supabase CLI está instalado (instala se necessário)
2. ✅ Faz login no Supabase
3. ✅ Linka o projeto correto (`uknccixtubkdkofyieie`)
4. ✅ Faz deploy da Edge Function `make-server-67caf26a`
5. ✅ Testa o health check
6. ✅ Testa endpoint de configuração

### Se o script executar com sucesso:

Você verá algo como:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ DEPLOY COMPLETO E SUCESSO!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Próximos Passos:

1. Abrir RENDIZY no browser
2. Ir em: Configurações > Integrações > WhatsApp
3. Preencher credenciais
4. Recarregar a página
```

**👉 Pule para a seção "PASSO 2: CONFIGURAR SECRETS" abaixo**

---

## 🔧 OPÇÃO 2: DEPLOY MANUAL (SE O SCRIPT FALHAR)

### Passo 1: Instalar Supabase CLI

#### macOS

```bash
brew install supabase/tap/supabase
```

#### Linux

```bash
brew install supabase/tap/supabase
```

#### Windows

```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

**Verificar instalação:**

```bash
supabase --version
```

Deve retornar algo como: `supabase 1.x.x`

---

### Passo 2: Login no Supabase

```bash
supabase login
```

Isso vai abrir o browser automaticamente para você fazer login.

**Verificar se está logado:**

```bash
supabase projects list
```

Você deve ver o projeto `uknccixtubkdkofyieie` na lista.

---

### Passo 3: Linkar o Projeto

```bash
supabase link --project-ref uknccixtubkdkofyieie
```

**Possível problema:** Pode pedir a senha do database.

Se pedir, você pode encontrar a senha em:
- Dashboard do Supabase: https://app.supabase.com/project/uknccixtubkdkofyieie/settings/database
- Ou use o comando: `supabase link --project-ref uknccixtubkdkofyieie --password SUA_SENHA`

**Verificar se linkou corretamente:**

```bash
cat .supabase/config.toml | grep project_id
```

Deve mostrar: `project_id = "uknccixtubkdkofyieie"`

---

### Passo 4: Deploy da Edge Function

```bash
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

Aguarde o deploy concluir (pode demorar 1-2 minutos).

Você verá uma mensagem como:

```
Deploying make-server-67caf26a (project ref: uknccixtubkdkofyieie)
...
Deployed Function make-server-67caf26a on project uknccixtubkdkofyieie
```

---

### Passo 5: Testar o Deploy

```bash
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

**Resposta esperada:**

```json
{
  "status": "ok",
  "timestamp": "2025-10-31T...",
  "service": "Rendizy Backend API"
}
```

Se retornar isso, **SUCESSO! ✅** Seu backend está online!

---

## 🔑 PASSO 2: CONFIGURAR SECRETS DA EVOLUTION API

**⚠️ IMPORTANTE:** Mesmo que o backend esteja deployado, você PRECISA configurar as secrets para o WhatsApp funcionar!

### Opção A: Via CLI (Mais Rápido)

```bash
supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br
supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master
supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741
supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555
```

### Opção B: Via Dashboard do Supabase

1. Acesse: https://app.supabase.com/project/uknccixtubkdkofyieie/settings/functions
2. Clique em **"Edge Functions"**
3. Vá em **"Secrets"**
4. Adicione cada uma das 4 variáveis:

```
EVOLUTION_API_URL = https://evo.boravendermuito.com.br
EVOLUTION_INSTANCE_NAME = rendizy-admin-master
EVOLUTION_GLOBAL_API_KEY = F7DE5EFFB66B-4E43-B11F-F0D5D8849741
EVOLUTION_INSTANCE_TOKEN = E9E7BE03F0A4-422C-BB1D-5A1CA7F25555
```

### Verificar se foram configuradas:

```bash
supabase secrets list
```

Deve mostrar as 4 variáveis.

---

## 🔄 PASSO 3: RE-DEPLOY APÓS CONFIGURAR SECRETS

**⚠️ CRÍTICO:** Sempre que você configurar ou alterar secrets, você DEVE fazer re-deploy!

```bash
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

Aguarde novamente (1-2 minutos).

---

## ✅ PASSO 4: VALIDAR TUDO

### Teste 1: Health Check

```bash
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

**Esperado:** `{"status":"ok"}`

### Teste 2: Property Types (50+ tipos)

```bash
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/property-types \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"
```

**Esperado:** Array JSON com 50+ objetos de tipos

### Teste 3: WhatsApp Import Endpoint

```bash
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/import-chats \
  -X POST \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18" \
  -H "Content-Type: application/json" \
  -d '{"organizationId":"admin-master"}'
```

**Esperado:** Não retornar 404 (pode retornar erro se WhatsApp não conectado, mas endpoint deve existir)

### Ou Execute o Script de Teste Automatizado:

```bash
chmod +x 🧪_TESTAR_PROPERTY_TYPES_AGORA.sh
./🧪_TESTAR_PROPERTY_TYPES_AGORA.sh
```

---

## 🌐 PASSO 5: TESTAR NO RENDIZY

### 1. Abrir RENDIZY no Browser

```
http://localhost:5173
```

### 2. Recarregar a Página

Pressione `Ctrl+R` (Windows/Linux) ou `Cmd+R` (Mac)

### 3. Abrir Console do Navegador

Pressione `F12` ou `Ctrl+Shift+I`

### 4. Verificar no Console

Você deve ver algo como:

```
✅ Property types carregados do backend: 53 tipos
```

**Se aparecer isso, PERFEITO! ✅**

Se ainda aparecer:

```
⚠️ Backend indisponível. Usando dados mockados para Tipos de Propriedade.
```

**Então o backend não está acessível. Veja troubleshooting abaixo.**

---

## 🎯 PASSO 6: TESTAR WHATSAPP

1. No RENDIZY, vá em: **Configurações > Integrações > WhatsApp**
2. Clique em **"Importar Contatos"**
3. **NÃO deve dar erro 404** (pode pedir para conectar WhatsApp, mas endpoint deve existir)

---

## 📊 PASSO 7: VER LOGS EM TEMPO REAL

Deixe este comando rodando em um terminal separado:

```bash
supabase functions logs make-server-67caf26a --follow
```

Agora use o RENDIZY e você vai ver todas as requisições aparecendo em tempo real!

Isso é extremamente útil para debug.

---

## 🎉 CONCLUSÃO

Se você chegou até aqui e todos os testes passaram, **PARABÉNS!** 🎉

### O que você tem agora:

✅ Backend deployado e online no Supabase  
✅ 50+ tipos de propriedade reais (Location)  
✅ 23+ tipos de acomodação reais (Accommodation)  
✅ WhatsApp Evolution API configurada  
✅ Persistência real de dados  
✅ Multi-tenant funcionando  
✅ Auto-save em todas as telas  
✅ Integrações Stays.net e Booking.com prontas  

### Próximos passos:

1. ✅ Use o wizard para criar propriedades com tipos reais
2. ✅ Configure WhatsApp para importar contatos
3. ✅ Configure Stays.net para sincronizar propriedades
4. ✅ Teste o sistema de reservas completo

---

## 🆘 TROUBLESHOOTING

### Problema: "Supabase CLI not found"

**Solução:**

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

---

### Problema: "Not logged in"

**Solução:**

```bash
supabase login
```

Vai abrir o browser automaticamente.

---

### Problema: "Project not linked"

**Solução:**

```bash
supabase link --project-ref uknccixtubkdkofyieie
```

Se pedir senha, tente:

```bash
supabase link --project-ref uknccixtubkdkofyieie --password SUA_SENHA
```

---

### Problema: Endpoint retorna 404

**Solução:**

```bash
# Ver logs de erro
supabase functions logs make-server-67caf26a

# Ver lista de funções deployadas
supabase functions list

# Forçar re-deploy
cd supabase/functions
supabase functions delete make-server-67caf26a
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

---

### Problema: Secrets não funcionam

**Solução:**

```bash
# Verificar se foram configuradas
supabase secrets list

# Se não aparecerem, configurar novamente
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

### Problema: RENDIZY ainda usa dados mockados

**Possíveis causas:**

1. **Cache do browser:** Limpe o cache (Ctrl+Shift+Delete)
2. **Backend offline:** Teste o health check
3. **CORS:** Veja os logs da Edge Function

**Solução:**

```bash
# Teste o health check
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health

# Teste property types
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/property-types \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"

# Se ambos funcionarem, é cache do browser
# Limpe o cache e recarregue a página
```

---

### Problema: Deploy demora muito

**Solução:**

- O deploy pode demorar 1-3 minutos
- Aguarde pacientemente
- Se demorar mais de 5 minutos, cancele (Ctrl+C) e tente novamente

---

### Problema: "Database password required"

**Solução:**

Você pode encontrar a senha em 2 lugares:

1. **Dashboard do Supabase:**  
   https://app.supabase.com/project/uknccixtubkdkofyieie/settings/database  
   Procure por "Connection String" e copie a senha

2. **Arquivo local `.env` (se tiver)**

Depois use:

```bash
supabase link --project-ref uknccixtubkdkofyieie --password SUA_SENHA_AQUI
```

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- **Supabase CLI:** https://supabase.com/docs/guides/cli
- **Edge Functions:** https://supabase.com/docs/guides/functions
- **Secrets Management:** https://supabase.com/docs/guides/functions/secrets

---

## 🎯 COMANDOS RÁPIDOS (COPIAR E COLAR)

### Deploy Completo em 1 Comando:

```bash
supabase login && \
supabase link --project-ref uknccixtubkdkofyieie && \
cd supabase/functions && \
supabase functions deploy make-server-67caf26a --no-verify-jwt && \
cd ../.. && \
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

### Configurar Secrets e Re-deploy:

```bash
supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br && \
supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master && \
supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741 && \
supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555 && \
cd supabase/functions && \
supabase functions deploy make-server-67caf26a --no-verify-jwt && \
cd ../..
```

### Ver Logs em Tempo Real:

```bash
supabase functions logs make-server-67caf26a --follow
```

---

**✅ FIM DO GUIA**

Se você seguiu todos os passos, seu backend está 100% deployado e funcionando! 🚀

**Versão:** v1.0.103.184  
**Data:** 31 de Outubro de 2025  
**Status:** Deploy Completo do Backend RENDIZY
