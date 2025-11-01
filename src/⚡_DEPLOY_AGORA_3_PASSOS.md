# ⚡ DEPLOY AGORA - 3 PASSOS SIMPLES

**Tempo:** 5 minutos  
**Versão:** v1.0.103.184

---

## 🚀 PASSO 1: DEPLOY AUTOMÁTICO

```bash
chmod +x DEPLOY_BACKEND_NOW.sh
./DEPLOY_BACKEND_NOW.sh
```

**Aguarde até aparecer:** `✅ DEPLOY COMPLETO E SUCESSO!`

---

## 🔑 PASSO 2: CONFIGURAR SECRETS

```bash
supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br
supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master
supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741
supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555

cd supabase/functions
supabase functions deploy make-server-67caf26a --no-verify-jwt
cd ../..
```

---

## ✅ PASSO 3: TESTAR

```bash
chmod +x 🧪_TESTE_DEPLOY_COMPLETO.sh
./🧪_TESTE_DEPLOY_COMPLETO.sh
```

**Se aparecer:** `✅ SUCESSO! TODOS OS TESTES PASSARAM!`

**→ Recarregue o RENDIZY no browser e pronto! 🎉**

---

## 🆘 DEU ERRO?

Veja o guia completo:
```bash
cat 🎯_GUIA_DEPLOY_BACKEND_PASSO_A_PASSO.md
```

Ou o guia rápido:
```bash
cat 🚀_COMECE_AQUI_DEPLOY.md
```

---

## 💨 COMANDO ÚNICO (COPIAR E COLAR)

```bash
chmod +x DEPLOY_BACKEND_NOW.sh && \
./DEPLOY_BACKEND_NOW.sh && \
supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br && \
supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master && \
supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741 && \
supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555 && \
cd supabase/functions && \
supabase functions deploy make-server-67caf26a --no-verify-jwt && \
cd ../.. && \
chmod +x 🧪_TESTE_DEPLOY_COMPLETO.sh && \
./🧪_TESTE_DEPLOY_COMPLETO.sh
```

**Se tudo correr bem, você terá o backend deployado em menos de 5 minutos!** 🚀
