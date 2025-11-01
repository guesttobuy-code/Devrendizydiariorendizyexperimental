# 🚀 COMECE AQUI - DEPLOY DO BACKEND

**Versão:** v1.0.103.184  
**Data:** 31 de Outubro de 2025  
**Tempo estimado:** 5-10 minutos

---

## 🎯 OBJETIVO

Fazer deploy do backend RENDIZY no Supabase para habilitar:

- ✅ **50+ tipos de propriedade reais** (ao invés de 6 mockados)
- ✅ **23+ tipos de acomodação reais** (ao invés de 7 mockados)
- ✅ **WhatsApp Evolution API** completa
- ✅ **Persistência real** de dados
- ✅ **Multi-tenant** com organizações
- ✅ **Integrações** Stays.net e Booking.com

---

## ⚡ MÉTODO RÁPIDO (RECOMENDADO)

### Passo 1: Execute o script de deploy

```bash
chmod +x DEPLOY_BACKEND_NOW.sh
./DEPLOY_BACKEND_NOW.sh
```

**O script vai fazer TUDO automaticamente:**
- Verificar/instalar Supabase CLI
- Fazer login
- Linkar projeto
- Fazer deploy da Edge Function
- Testar health check

### Passo 2: Configure as secrets da Evolution API

```bash
supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br
supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master
supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741
supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555
```

### Passo 3: Re-deploy após configurar secrets

```bash
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

### Passo 4: Teste tudo

```bash
chmod +x 🧪_TESTE_DEPLOY_COMPLETO.sh
./🧪_TESTE_DEPLOY_COMPLETO.sh
```

Se aparecer **"✅ SUCESSO! TODOS OS TESTES PASSARAM!"**, você está pronto! 🎉

---

## 📚 PRECISA DE AJUDA?

- **Guia detalhado passo a passo:** `🎯_GUIA_DEPLOY_BACKEND_PASSO_A_PASSO.md`
- **Documentação oficial:** `START_HERE_v1.0.103.181.md`
- **Checklist completo:** `✅_CHECKLIST_DEPLOY_v1.0.103.181.md`

---

## 🔍 VALIDAR SE FUNCIONOU

Abra o RENDIZY no navegador e veja no console:

```
✅ Property types carregados do backend: 53 tipos
```

Se aparecer isso, **PERFEITO!** ✅

Se ainda aparecer:
```
⚠️ Backend indisponível. Usando dados mockados
```

Execute o teste novamente:
```bash
./🧪_TESTE_DEPLOY_COMPLETO.sh
```

E veja qual teste está falhando.

---

## 🆘 PROBLEMAS COMUNS

### "Supabase CLI not found"

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### "Not logged in"

```bash
supabase login
```

### Endpoint retorna 404

```bash
# Ver logs
supabase functions logs make-server-67caf26a

# Re-deploy
cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

### RENDIZY ainda usa dados mockados

```bash
# Limpe o cache do browser
# Chrome: Ctrl+Shift+Delete > "Cached images and files"

# Teste o endpoint diretamente
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

---

## 📊 COMANDO ÚNICO (SE TIVER PRESSA)

```bash
supabase login && \
supabase link --project-ref uknccixtubkdkofyieie && \
cd supabase/functions && \
supabase functions deploy make-server-67caf26a --no-verify-jwt && \
cd ../.. && \
supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br && \
supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master && \
supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741 && \
supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555 && \
cd supabase/functions && \
supabase functions deploy make-server-67caf26a --no-verify-jwt && \
cd ../.. && \
curl https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health
```

Se o último comando retornar `{"status":"ok"}`, está tudo pronto! 🚀

---

## ✅ PRÓXIMOS PASSOS

Depois do deploy bem-sucedido:

1. ✅ Recarregue o RENDIZY no browser
2. ✅ Verifique que os 50+ tipos estão carregando
3. ✅ Teste o WhatsApp: Configurações > Integrações > WhatsApp
4. ✅ Crie propriedades usando os tipos completos
5. ✅ Configure Stays.net para sincronizar propriedades

---

**🎉 BOA SORTE COM O DEPLOY!**

Se precisar de ajuda, veja o guia completo:
```bash
cat 🎯_GUIA_DEPLOY_BACKEND_PASSO_A_PASSO.md
```

---

**Versão:** v1.0.103.184  
**Status:** Pronto para Deploy
