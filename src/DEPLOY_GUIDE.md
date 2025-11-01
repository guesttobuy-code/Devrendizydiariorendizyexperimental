# 🚀 GUIA DE DEPLOY - RENDIZY

**Versão:** 1.0.0  
**Data:** 28 de outubro de 2025  
**Objetivo:** Colocar o RENDIZY em produção acessível pela internet

---

## 🎯 VISÃO GERAL

Este guia mostra como fazer deploy do RENDIZY em produção usando plataformas gratuitas e profissionais.

**Arquitetura em produção:**
```
┌─────────────────────────────────────────────────────┐
│  Frontend (React + Vite)                            │
│  ├─ Vercel/Netlify (HTTPS automático)               │
│  ├─ CDN Global                                      │
│  └─ Domínio customizado (opcional)                  │
└─────────────────────────────────────────────────────┘
                      ↓ API Calls
┌─────────────────────────────────────────────────────┐
│  Backend (Supabase Edge Functions)                  │
│  ├─ Database PostgreSQL                             │
│  ├─ Authentication                                  │
│  ├─ Storage                                         │
│  └─ Edge Functions (API)                            │
└─────────────────────────────────────────────────────┘
```

---

## 🌟 OPÇÃO 1: DEPLOY NA VERCEL (Recomendado)

### **Por que Vercel?**
- ✅ **100% Gratuito** para projetos pessoais
- ✅ Deploy em **menos de 5 minutos**
- ✅ HTTPS automático
- ✅ Deploy automático via Git (push → deploy)
- ✅ Domínio gratuito `.vercel.app`
- ✅ Preview de cada branch/PR
- ✅ Analytics incluído
- ✅ Feita especificamente para React/Next/Vite

### **Passo 1: Preparar o código**

```bash
# 1. Criar repositório Git (se ainda não tiver)
git init
git add .
git commit -m "feat: preparar para deploy em produção"

# 2. Subir para GitHub
# Vá em https://github.com/new e crie um repositório
git remote add origin https://github.com/SEU-USUARIO/rendizy.git
git branch -M main
git push -u origin main
```

### **Passo 2: Deploy na Vercel**

1. **Acesse:** https://vercel.com/signup
2. **Faça login** com GitHub
3. **Clique em:** "Add New..." → "Project"
4. **Selecione** seu repositório `rendizy`
5. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

6. **Adicione variáveis de ambiente:**
   ```
   VITE_SUPABASE_URL = https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY = sua-anon-key-aqui
   VITE_ENV = production
   ```

7. **Clique em "Deploy"**

🎉 **Pronto!** Seu site estará online em: `https://seu-projeto.vercel.app`

### **Passo 3: Configurar domínio customizado (opcional)**

1. Na Vercel, vá em **Settings** → **Domains**
2. Adicione seu domínio: `rendizy.com`
3. Configure DNS do seu provedor:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 🎨 OPÇÃO 2: DEPLOY NA NETLIFY

### **Passo 1: Deploy via CLI**

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build do projeto
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### **Passo 2: Deploy via Interface Web**

1. **Acesse:** https://app.netlify.com/start
2. **Conecte** com GitHub
3. **Selecione** repositório `rendizy`
4. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   
5. **Adicione variáveis de ambiente** (mesmas da Vercel)
6. **Deploy!**

🎉 Site online em: `https://seu-projeto.netlify.app`

---

## ☁️ OPÇÃO 3: CLOUDFLARE PAGES

### **Características:**
- ✅ Gratuito
- ✅ CDN mais rápido do mundo
- ✅ Bandwidth ilimitado

### **Deploy:**

1. **Acesse:** https://pages.cloudflare.com
2. **Conecte GitHub**
3. **Configure:**
   - Build command: `npm run build`
   - Build output: `dist`
   - Environment variables: (adicionar as mesmas)

4. **Deploy!**

---

## 🗄️ CONFIGURAR SUPABASE EM PRODUÇÃO

### **Passo 1: Criar projeto Supabase**

1. **Acesse:** https://supabase.com/dashboard
2. **Crie novo projeto:**
   - Name: `rendizy-production`
   - Database Password: (escolha uma senha forte)
   - Region: `South America (São Paulo)` ← Mais próximo do Brasil

3. **Aguarde** ~2 minutos para provisionar

### **Passo 2: Obter credenciais**

No Supabase Dashboard:
1. Vá em **Settings** → **API**
2. Copie:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGc...`

### **Passo 3: Deploy das Edge Functions**

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Link ao projeto
supabase link --project-ref SEU-PROJECT-REF

# Deploy das functions
supabase functions deploy server
```

### **Passo 4: Configurar Database**

```bash
# Rodar migrations (se tiver)
supabase db push

# Ou executar SQL manualmente no Supabase Dashboard
# Settings → Database → SQL Editor
```

### **Passo 5: Popular dados iniciais**

Você pode:
- Usar o **DatabaseInitializer** do sistema (via interface)
- Ou rodar seed via SQL no Supabase Dashboard

---

## 🔐 VARIÁVEIS DE AMBIENTE

### **Desenvolvimento (.env.local)**
```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=local-dev-key
VITE_ENV=development
```

### **Produção (Vercel/Netlify)**
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ENV=production
```

**IMPORTANTE:** 
- ❌ **NUNCA** commite `.env.local` no Git
- ✅ Configure as variáveis direto na plataforma (Vercel/Netlify)

---

## 📦 BUILD LOCAL (Testar antes)

```bash
# Instalar dependências
npm install

# Build de produção
npm run build

# Testar build localmente
npm run preview

# Acesse: http://localhost:4173
```

Se funcionar aqui, funcionará em produção! ✅

---

## 🔍 CHECKLIST PRÉ-DEPLOY

- [ ] Código commitado no Git
- [ ] Repositório no GitHub
- [ ] Build local funcionando (`npm run build`)
- [ ] Preview local OK (`npm run preview`)
- [ ] Variáveis de ambiente preparadas
- [ ] Projeto Supabase criado
- [ ] Edge Functions deployadas (se usar)
- [ ] Database configurada
- [ ] Sem dados sensíveis no código

---

## 🚀 FLUXO DE TRABALHO PÓS-DEPLOY

### **Deploy automático:**
```bash
# 1. Faça mudanças no código
git add .
git commit -m "feat: nova funcionalidade"

# 2. Push para GitHub
git push origin main

# 3. Vercel/Netlify detecta e deploya automaticamente!
# 4. Em ~1 minuto seu site está atualizado
```

### **Branches e Preview:**
```bash
# Criar branch de feature
git checkout -b feature/nova-funcionalidade

# Fazer mudanças e push
git push origin feature/nova-funcionalidade

# Vercel cria preview automático:
# https://seu-projeto-git-feature-nova-fun-seu-usuario.vercel.app
```

---

## 🌍 DOMÍNIOS CUSTOMIZADOS

### **Onde comprar domínio:**
- **Registro.br** (R$ 40/ano para .com.br) ← Brasileiro
- **Namecheap** (~$10/ano para .com)
- **GoDaddy**
- **Cloudflare Registrar** (preço de custo)

### **Configurar DNS:**

**Para Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Para Netlify:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: seu-site.netlify.app
```

---

## 📊 MONITORAMENTO

### **Vercel Analytics** (Gratuito)
- Pageviews
- Top pages
- Referrers
- Devices

### **Sentry** (Monitoramento de erros)
```bash
npm install @sentry/react
```

### **Google Analytics**
Adicione no `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## 🔒 SEGURANÇA

### **1. HTTPS**
- ✅ Automático na Vercel/Netlify
- ✅ Certificado SSL grátis (Let's Encrypt)

### **2. Headers de Segurança**
Já configurados em `vercel.json` e `netlify.toml`

### **3. Variáveis de Ambiente**
- ✅ Nunca exponha keys no código
- ✅ Use `VITE_` prefix para variáveis públicas
- ✅ Keys do Supabase são públicas (anon key)

### **4. Row Level Security (RLS)**
Configure no Supabase:
```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
-- etc...
```

---

## 💰 CUSTOS

### **Plano Gratuito (Suficiente para começar):**

**Vercel:**
- ✅ 100 GB bandwidth/mês
- ✅ Domínio `.vercel.app` grátis
- ✅ Builds ilimitados
- ✅ Preview deployments
- ⚠️ Limite: 100 GB/mês

**Supabase:**
- ✅ 500 MB database
- ✅ 1 GB storage
- ✅ 50,000 usuários ativos/mês
- ✅ Edge Functions: 500K invocações/mês
- ⚠️ Projeto pausa após 7 dias de inatividade (free tier)

### **Plano Pago (Se precisar escalar):**

**Vercel Pro:** $20/mês
- 1 TB bandwidth
- Mais edge functions
- Analytics avançado

**Supabase Pro:** $25/mês
- 8 GB database
- 100 GB storage
- Sem pausar projeto
- Backups diários

---

## 🐛 TROUBLESHOOTING

### **Erro: "Build failed"**
```bash
# Limpar cache
rm -rf node_modules dist
npm install
npm run build
```

### **Erro: "Environment variables not found"**
- Configure na plataforma (Vercel/Netlify dashboard)
- Use prefix `VITE_` para variáveis públicas

### **Erro: "API 404"**
- Verifique se Edge Functions estão deployadas
- Check CORS no Supabase

### **Erro: "Database connection"**
- Verifique URL do Supabase
- Check se projeto não está pausado (free tier)

---

## 📚 RECURSOS ÚTEIS

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vitejs.dev/guide/build.html

---

## ✅ RESULTADO ESPERADO

Após seguir este guia, você terá:

- ✅ RENDIZY online e acessível globalmente
- ✅ HTTPS automático
- ✅ URL: `https://seu-projeto.vercel.app`
- ✅ Deploy automático a cada push
- ✅ Preview de branches
- ✅ Backend Supabase em produção
- ✅ 99.9% uptime
- ✅ CDN global (latência baixa)

**Tempo estimado:** 15-30 minutos (primeira vez)

---

## 🎉 PRÓXIMOS PASSOS

Depois do deploy:

1. **Compartilhe o link** com clientes/usuários
2. **Configure domínio customizado**
3. **Adicione analytics**
4. **Configure backups**
5. **Monitore performance**
6. **Colete feedback**

---

**Documentado por:** RENDIZY Development Team  
**Metodologia:** DIARIO_RENDIZY  
**Versão:** 1.0.0
