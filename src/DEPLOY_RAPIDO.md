# 🚀 DEPLOY RÁPIDO - 5 MINUTOS

## ⚡ MÉTODO MAIS RÁPIDO (Vercel)

### **1. Subir para GitHub**
```bash
# Se ainda não tem repositório Git
git init
git add .
git commit -m "feat: preparar para deploy"

# Criar repositório no GitHub: https://github.com/new
# Nome sugerido: rendizy

# Subir código
git remote add origin https://github.com/SEU-USUARIO/rendizy.git
git branch -M main
git push -u origin main
```

### **2. Deploy na Vercel**

1. **Acesse:** https://vercel.com/signup
2. **Login** com GitHub
3. **"Add New..."** → **"Project"**
4. **Selecione** repositório `rendizy`
5. **Clique "Deploy"** (sem mexer em nada!)

✅ **PRONTO!** Site online em: `https://rendizy.vercel.app`

---

## 🗄️ CONFIGURAR SUPABASE (Opcional)

Se quiser backend real ao invés de mock:

### **1. Criar projeto Supabase**
1. Acesse: https://supabase.com/dashboard
2. **"New Project"**
3. Preencha:
   - Name: `rendizy`
   - Password: (escolha uma senha forte)
   - Region: **South America (São Paulo)**
4. Aguarde ~2 minutos

### **2. Obter credenciais**
1. No Supabase → **Settings** → **API**
2. Copie:
   - **URL:** `https://xxxxx.supabase.co`
   - **anon key:** `eyJhbGc...`

### **3. Configurar na Vercel**
1. Na Vercel → Seu projeto → **Settings** → **Environment Variables**
2. Adicione:
   ```
   VITE_SUPABASE_URL = https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGc...
   ```
3. **"Redeploy"** no topo da página

✅ **PRONTO!** Backend conectado!

---

## 🔍 TESTAR

Abra: `https://seu-projeto.vercel.app`

Se aparecer o RENDIZY funcionando = **SUCESSO!** 🎉

---

## ❓ PROBLEMAS?

Veja o guia completo: [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)

---

## 📱 COMPARTILHAR

Seu sistema está online! Compartilhe o link:
- `https://seu-projeto.vercel.app`

Para domínio customizado (rendizy.com):
- Veja seção "Domínios" no [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)
