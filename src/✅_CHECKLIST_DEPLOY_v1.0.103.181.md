# ✅ CHECKLIST DE DEPLOY - v1.0.103.181

**Data:** 31 de Outubro de 2025  
**Objetivo:** Garantir que o deploy do backend seja feito corretamente

---

## 📋 PRÉ-REQUISITOS

Antes de começar, verifique:

- [ ] Node.js instalado (v18 ou superior)
- [ ] Git instalado
- [ ] Acesso ao projeto no GitHub
- [ ] Acesso ao Supabase Dashboard
- [ ] Credenciais da Evolution API em mãos

---

## 🚀 PASSO 1: INSTALAR SUPABASE CLI

### macOS/Linux

```bash
brew install supabase/tap/supabase
```

### Windows

```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

**Verificar instalação:**

```bash
supabase --version
```

- [ ] Supabase CLI instalado

---

## 🔐 PASSO 2: LOGIN NO SUPABASE

```bash
supabase login
```

Vai abrir o browser automaticamente. Faça login com sua conta.

**Verificar login:**

```bash
supabase projects list
```

- [ ] Login feito com sucesso
- [ ] Projeto `uknccixtubkdkofyieie` aparece na lista

---

## 🔗 PASSO 3: LINKAR PROJETO

```bash
supabase link --project-ref uknccixtubkdkofyieie
```

Se pedir senha, você pode encontrar no Dashboard do Supabase:  
`Settings > Database > Connection String > Password`

**Verificar link:**

```bash
cat .supabase/config.toml | grep project_id
```

Deve mostrar: `project_id = "uknccixtubkdkofyieie"`

- [ ] Projeto linkado corretamente

---

## 🚀 PASSO 4: DEPLOY DA EDGE FUNCTION

```bash
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

Aguarde o deploy concluir (pode demorar 1-2 minutos).

**Verificar deploy:**

```bash
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "2025-10-31T...",
  "service": "Rendizy Backend API"
}
```

- [ ] Edge Function deployada
- [ ] Health check retornando 200 OK

---

## 🔑 PASSO 5: CONFIGURAR SECRETS DA EVOLUTION API

### Opção A: Via CLI (RECOMENDADO)

```bash
supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br
supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master
supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741
supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555
```

### Opção B: Via Dashboard

1. Acesse: https://app.supabase.com/project/uknccixtubkdkofyieie/settings/functions
2. Vá em **"Secrets"**
3. Adicione cada uma das 4 variáveis

**Verificar secrets:**

```bash
supabase secrets list
```

Deve mostrar as 4 variáveis.

- [ ] Secrets configuradas

---

## 🔄 PASSO 6: RE-DEPLOY APÓS CONFIGURAR SECRETS

**⚠️ IMPORTANTE:** Sempre que configurar ou alterar secrets, você DEVE re-deploy!

```bash
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

Aguarde novamente (1-2 minutos).

- [ ] Re-deploy após secrets concluído

---

## ✅ PASSO 7: TESTAR ENDPOINTS

### Teste 1: Health Check

```bash
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

**Esperado:** `{"status":"ok"}`

- [ ] Health check OK

### Teste 2: Property Types

```bash
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/property-types \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"
```

**Esperado:** Array com 50+ tipos de propriedade

- [ ] Property types retornando dados

### Teste 3: WhatsApp Import Endpoint

```bash
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/import-chats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18" \
  -H "Content-Type: application/json" \
  -d '{"organizationId":"admin-master"}'
```

**Esperado:** Resposta (não 404) - pode ser erro se WhatsApp não estiver conectado, mas o endpoint deve existir

- [ ] WhatsApp endpoint acessível

### Ou Execute o Script de Teste

```bash
chmod +x 🧪_TESTAR_PROPERTY_TYPES_AGORA.sh
./🧪_TESTAR_PROPERTY_TYPES_AGORA.sh
```

- [ ] Script de teste executado
- [ ] Todos os 3 testes passaram

---

## 🌐 PASSO 8: TESTAR NO RENDIZY

1. Abra o RENDIZY no navegador
2. Recarregue a página (Ctrl+R ou Cmd+R)
3. Abra o console do navegador (F12)

**Verificar no console:**

```
✅ Property types carregados do backend: 53 tipos
```

- [ ] RENDIZY carrega tipos do backend
- [ ] Não aparece warning de "dados mockados"

---

## 🎯 PASSO 9: TESTAR WHATSAPP

1. No RENDIZY, vá em: **Configurações > Integrações > WhatsApp**
2. Clique em **"Importar Contatos"**
3. Verifique que não dá erro 404

**Comportamento esperado:**
- Se WhatsApp não estiver conectado, vai pedir para conectar primeiro
- Mas NÃO deve dar erro 404 "endpoint not found"

- [ ] Importação de contatos não dá 404
- [ ] WhatsApp integration funcionando

---

## 📊 PASSO 10: VERIFICAR LOGS

```bash
supabase functions logs make-server-67caf26a --follow
```

Deixe rodando em um terminal e teste o sistema. Você deve ver os logs das requisições em tempo real.

- [ ] Logs funcionando
- [ ] Requisições aparecendo nos logs

---

## 🎉 CONCLUSÃO

Se todos os itens acima estiverem marcados, o deploy foi bem-sucedido!

### ✅ O que está funcionando agora:

- ✅ Backend deployado e online
- ✅ 50+ tipos de propriedade reais
- ✅ Importação de contatos WhatsApp
- ✅ Auto-save em todas as telas
- ✅ Persistência real de dados
- ✅ Multi-tenant com organizações
- ✅ Integração Stays.net pronta
- ✅ Integração Booking.com pronta
- ✅ Evolution API configurada

---

## 🆘 SE ALGO DEU ERRADO

### Backend não está acessível

```bash
# Ver logs de erro
supabase functions logs make-server-67caf26a

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

# Se não aparecerem, configurar novamente
supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br
supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master
supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741
supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555

# RE-DEPLOY (OBRIGATÓRIO!)
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

### Property types não carregam

```bash
# Testar endpoint diretamente
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/property-types \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"

# Ver logs
supabase functions logs make-server-67caf26a

# Limpar cache do browser
# Chrome: Ctrl+Shift+Delete > "Cached images and files"
```

---

## 📚 DOCUMENTAÇÃO

- **Guia Completo:** `🚀_DEPLOY_BACKEND_AGORA_v1.0.103.181.md`
- **Start Here:** `START_HERE_v1.0.103.181.md`
- **Resumo Executivo:** `📋_RESUMO_EXECUTIVO_v1.0.103.181.txt`
- **Comandos Rápidos:** `⚡_RECARREGUE_AGORA_v1.0.103.181.txt`

---

**✅ CHECKLIST CONCLUÍDO!**

Se todos os itens foram marcados, você está pronto para usar o RENDIZY com backend completo! 🚀

**Versão:** v1.0.103.181  
**Data:** 31 de Outubro de 2025
