# 🎯 SOLUÇÃO: AMBIENTES SEPARADOS (DEV → STAGING → PRODUÇÃO)

**Versão:** v1.0.103.202  
**Data:** 31/10/2025 22:30  
**Problema:** Ambiente de teste misturado com produção

---

## 🔍 DIAGNÓSTICO DO PROBLEMA

### **ANTES (Funcionava):**
```
Figma Make (Local)
├─ Dados mock
├─ Backend local/teste
├─ Podia testar à vontade
└─ Zero risco de afetar produção
```

### **AGORA (Problemático):**
```
Figma Make
├─ Conectado ao domínio real (rendizy.com.br)
├─ GitHub → Deploy automático para produção
├─ "Publicar" → Vai para site real
└─ ❌ IMPOSSÍVEL testar sem afetar produção!
```

---

## ✅ SOLUÇÃO: 3 AMBIENTES ISOLADOS

```
┌─────────────────────────────────────────────────┐
│ DESENVOLVIMENTO (Figma Make)                    │
│ URL: localhost ou preview                       │
│ Backend: Mock/Offline                           │
│ Dados: Falsos/Teste                            │
│ Deploy: Manual                                  │
│ Risco: ZERO                                     │
└─────────────────────────────────────────────────┘
                    ↓
                 TESTE OK?
                    ↓
┌─────────────────────────────────────────────────┐
│ STAGING (Pré-Produção)                          │
│ URL: staging.rendizy.com.br                     │
│ Backend: Supabase STAGING                       │
│ Dados: Cópia de produção sanitizada            │
│ Deploy: Automático (branch staging)             │
│ Risco: BAIXO                                    │
└─────────────────────────────────────────────────┘
                    ↓
                APROVADO?
                    ↓
┌─────────────────────────────────────────────────┐
│ PRODUÇÃO (Real)                                 │
│ URL: app.rendizy.com.br                         │
│ Backend: Supabase PRODUÇÃO                      │
│ Dados: Clientes reais                          │
│ Deploy: Manual/Aprovado                         │
│ Risco: CONTROLADO                               │
└─────────────────────────────────────────────────┘
```

---

## 🚀 IMPLEMENTAÇÃO RÁPIDA

### **OPÇÃO 1: Modo Desenvolvimento Local (RECOMENDADO)**

**Crie arquivo `.env.local`:**

```bash
# .env.local - APENAS DESENVOLVIMENTO
VITE_ENVIRONMENT=development
VITE_USE_MOCK_DATA=true
VITE_BACKEND_URL=http://localhost:54321
VITE_DOMAIN=localhost:5173

# Supabase de DEV (diferente de produção)
VITE_SUPABASE_URL=https://SEU_PROJETO_DEV.supabase.co
VITE_SUPABASE_ANON_KEY=sua_key_de_dev
```

**Crie `.env.staging`:**

```bash
# .env.staging - TESTES
VITE_ENVIRONMENT=staging
VITE_USE_MOCK_DATA=false
VITE_BACKEND_URL=https://staging-api.rendizy.com.br
VITE_DOMAIN=staging.rendizy.com.br

# Supabase STAGING
VITE_SUPABASE_URL=https://PROJETO_STAGING.supabase.co
VITE_SUPABASE_ANON_KEY=key_staging
```

**Crie `.env.production`:**

```bash
# .env.production - PRODUÇÃO REAL
VITE_ENVIRONMENT=production
VITE_USE_MOCK_DATA=false
VITE_BACKEND_URL=https://api.rendizy.com.br
VITE_DOMAIN=app.rendizy.com.br

# Supabase PRODUÇÃO
VITE_SUPABASE_URL=https://uknccixtubkdkofyieie.supabase.co
VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
```

---

### **OPÇÃO 2: Tenant de Teste no Sistema**

Adicionar flag `isTestTenant` nas organizações:

```typescript
{
  id: 'test_999',
  name: '🧪 TESTE - Não Deletar',
  slug: 'rendizy_teste_desenvolvimento',
  status: 'active',
  plan: 'enterprise',
  isTestTenant: true,  // ← Nova flag
  settings: {
    allowTestData: true,
    preventRealEmails: true,
    preventRealPayments: true
  }
}
```

---

### **OPÇÃO 3: Branch Strategy no Git**

```
main (produção)
├─ staging (pré-produção)
└─ develop (desenvolvimento)
    └─ feature/* (funcionalidades)
```

**Deploy automático:**
- `main` → app.rendizy.com.br (PRODUÇÃO)
- `staging` → staging.rendizy.com.br (TESTES)
- `develop` → dev.rendizy.com.br (DESENVOLVIMENTO)

---

## 🛠️ CONFIGURAÇÃO NO FIGMA MAKE

### **package.json - Scripts separados:**

```json
{
  "scripts": {
    "dev": "vite --mode development",
    "dev:staging": "vite --mode staging",
    "build": "vite build --mode production",
    "build:staging": "vite build --mode staging",
    "preview": "vite preview",
    "deploy:staging": "npm run build:staging && netlify deploy --dir=dist",
    "deploy:prod": "npm run build && netlify deploy --prod --dir=dist"
  }
}
```

---

## 📋 USAR NO DIA A DIA

### **Durante Desenvolvimento:**

```bash
# Rodar local com dados mock
npm run dev

# Testar com backend de staging
npm run dev:staging

# Build para staging
npm run build:staging
npm run deploy:staging
```

### **Para Produção:**

```bash
# Build produção
npm run build

# Deploy produção (requer aprovação)
npm run deploy:prod
```

---

## 🎯 CONFIGURAÇÃO NETLIFY

### **netlify.toml - Multi-ambiente:**

```toml
# Produção (branch main)
[context.production]
  command = "npm run build"
  publish = "dist"
  
  [context.production.environment]
    VITE_ENVIRONMENT = "production"
    VITE_USE_MOCK_DATA = "false"

# Staging (branch staging)
[context.staging]
  command = "npm run build:staging"
  publish = "dist"
  
  [context.staging.environment]
    VITE_ENVIRONMENT = "staging"
    VITE_USE_MOCK_DATA = "false"

# Preview (PRs)
[context.deploy-preview]
  command = "npm run dev"
  
  [context.deploy-preview.environment]
    VITE_ENVIRONMENT = "development"
    VITE_USE_MOCK_DATA = "true"
```

---

## 🔐 SEGURANÇA: Dados de Produção

**NUNCA faça em desenvolvimento:**
```javascript
// ❌ ERRADO - Pode afetar clientes reais
const cliente = await criarCliente({
  email: 'teste@teste.com'  // Cliente real receberá email!
});
```

**SEMPRE use guard:**
```javascript
// ✅ CORRETO - Protegido
const isDev = import.meta.env.VITE_ENVIRONMENT === 'development';

if (isDev) {
  console.log('🧪 Modo desenvolvimento - usando mock');
  return mockData;
}

// Código de produção
const cliente = await criarCliente(...);
```

---

## 🎨 UI: Indicador de Ambiente

Adicionar badge visual:

```
┌────────────────────────────────────────┐
│ 🧪 DESENVOLVIMENTO                      │  ← Amarelo
│ Dados são fictícios                    │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ 🚧 STAGING                              │  ← Laranja
│ Pré-produção - não use dados reais    │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ 🚀 PRODUÇÃO                             │  ← Verde
│ Ambiente real - cuidado!              │
└────────────────────────────────────────┘
```

---

## 📊 RESUMO DA SOLUÇÃO

| Ambiente | URL | Backend | Dados | Deploy |
|----------|-----|---------|-------|--------|
| **DEV** | localhost:5173 | Mock | Falsos | Manual |
| **STAGING** | staging.rendizy.com.br | Supabase Staging | Cópia | Auto (branch staging) |
| **PROD** | app.rendizy.com.br | Supabase Prod | Reais | Manual/Aprovado |

---

## 💡 PRÓXIMOS PASSOS

**Para voltar a ter ambiente de testes:**

1. ✅ Criar `.env.local` com mock ativado
2. ✅ Rodar `npm run dev` (local, sem afetar produção)
3. ✅ Criar tenant de teste no sistema
4. ✅ (Opcional) Criar projeto Supabase de staging
5. ✅ (Opcional) Configurar branch `staging` no Git

---

## 🎯 SOLUÇÃO IMEDIATA (5 MINUTOS)

**Para testar AGORA sem afetar produção:**

1. Cole no console (F12):

```javascript
// Ativar modo desenvolvimento
localStorage.setItem('rendizy_dev_mode', 'true');
localStorage.setItem('rendizy_use_mock_data', 'true');
location.reload();
```

2. Agora você pode testar sem medo!
3. Para voltar ao normal:

```javascript
localStorage.removeItem('rendizy_dev_mode');
localStorage.removeItem('rendizy_use_mock_data');
location.reload();
```

---

**Qual solução você prefere que eu implemente primeiro?**

1. **Modo Dev Local** (5 min) - Rápido, isola tudo
2. **Tenant de Teste** (10 min) - Sistema marca dados de teste
3. **Branch Strategy** (20 min) - Profissional, deploy separado
4. **Todas** (30 min) - Solução completa
