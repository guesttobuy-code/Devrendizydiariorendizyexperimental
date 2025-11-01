# 🎯 COMO USAR AMBIENTES - GUIA PRÁTICO

**Versão:** v1.0.103.202  
**Data:** 31/10/2025 22:45  

---

## ⚡ SOLUÇÃO IMEDIATA (30 SEGUNDOS)

### **ATIVAR MODO DESENVOLVIMENTO AGORA:**

**1. Abra Console (F12)**

**2. Cole e execute:**

```javascript
// Ativar modo desenvolvimento
localStorage.setItem('rendizy_dev_mode', 'true');
localStorage.setItem('rendizy_use_mock_data', 'true');
console.log('✅ Modo desenvolvimento ativado!');
console.log('🔄 Recarregando...');
setTimeout(() => location.reload(), 1000);
```

**3. Pronto!**

Agora você tem:
- ✅ Badge amarelo "🧪 DESENVOLVIMENTO"
- ✅ Dados fictícios
- ✅ Zero risco de afetar produção
- ✅ Pode testar à vontade

---

## 🔄 ALTERNAR ENTRE AMBIENTES

### **Desenvolvimento (Testes):**

```javascript
localStorage.setItem('rendizy_dev_mode', 'true');
localStorage.setItem('rendizy_use_mock_data', 'true');
location.reload();
```

### **Produção (Real):**

```javascript
localStorage.removeItem('rendizy_dev_mode');
localStorage.removeItem('rendizy_use_mock_data');
location.reload();
```

### **Ver Ambiente Atual:**

```javascript
console.log('Ambiente:', localStorage.getItem('rendizy_dev_mode') ? 'DEV' : 'PROD');
console.log('Mock Data:', localStorage.getItem('rendizy_use_mock_data'));
```

---

## 🎨 VISUAL DO AMBIENTE

### **Quando em DEV, você verá:**

```
┌─────────────────────────────────────────┐
│ 🧪 DESENVOLVIMENTO                       │  ← Canto superior direito
│ Dados são fictícios                     │     Badge amarelo
└─────────────────────────────────────────┘

Ambiente: development
Mock Data: Sim
URL: localhost:5173
```

### **Quando em PROD, você verá:**

```
(Nada - limpo)
```

---

## 🛠️ CONFIGURAÇÃO PERMANENTE

### **Opção 1: Via `.env.local` (Recomendado)**

**1. Crie arquivo `.env.local` na raiz:**

```bash
# .env.local
VITE_ENVIRONMENT=development
VITE_USE_MOCK_DATA=true
VITE_OFFLINE_MODE=true
```

**2. Reinicie o servidor:**

```bash
npm run dev
```

**3. Agora sempre iniciará em modo DEV!**

---

### **Opção 2: Scripts NPM**

**Adicione ao `package.json`:**

```json
{
  "scripts": {
    "dev": "vite --mode development",
    "dev:mock": "VITE_USE_MOCK_DATA=true vite --mode development",
    "dev:real": "vite --mode production",
    "build:dev": "vite build --mode development",
    "build:staging": "vite build --mode staging",
    "build:prod": "vite build --mode production"
  }
}
```

**Usar:**

```bash
# Desenvolvimento com mock
npm run dev:mock

# Desenvolvimento com dados reais
npm run dev:real

# Build para produção
npm run build:prod
```

---

## 🎯 CASOS DE USO

### **Caso 1: Desenvolvendo nova funcionalidade**

```javascript
// 1. Ativar modo dev
localStorage.setItem('rendizy_dev_mode', 'true');
location.reload();

// 2. Desenvolver e testar
// 3. Tudo funciona com dados fake

// 4. Quando aprovar, voltar ao normal
localStorage.removeItem('rendizy_dev_mode');
location.reload();
```

---

### **Caso 2: Criar tenant de teste**

```javascript
// No console
const testTenant = {
  id: 'test_' + Date.now(),
  name: '🧪 TESTE - ' + prompt('Nome do teste:'),
  isTest: true,
  // ... outros campos
};

// Salvar
localStorage.setItem('rendizy_test_tenant', JSON.stringify(testTenant));
```

---

### **Caso 3: Testar com dados reais sem risco**

```javascript
// Criar cópia de segurança antes
const backup = localStorage.getItem('rendizy_offline_organizations');
localStorage.setItem('rendizy_backup', backup);

// Testar
// ...

// Restaurar se der problema
const backup = localStorage.getItem('rendizy_backup');
localStorage.setItem('rendizy_offline_organizations', backup);
```

---

## 📋 CHECKLIST: O que fazer em cada ambiente

### **DESENVOLVIMENTO ✅**
- ✅ Criar dados falsos
- ✅ Testar funcionalidades novas
- ✅ Quebrar o sistema (sem medo!)
- ✅ Experimentar ideias
- ✅ Debug intensivo

### **STAGING ⚠️**
- ✅ Testar com dados similares a produção
- ✅ Validar integrações
- ✅ Performance testing
- ⚠️ Não usar dados reais de clientes
- ⚠️ Avisar time que está testando

### **PRODUÇÃO 🚀**
- ✅ Apenas código aprovado
- ✅ Dados reais de clientes
- ✅ Monitoramento ativo
- ❌ NUNCA testar aqui
- ❌ NUNCA usar dados falsos

---

## 🔐 PROTEÇÕES AUTOMÁTICAS

Quando em modo DEV, o sistema automaticamente:

```typescript
import { useEnvironment } from './components/EnvironmentBadge';

function MeuComponente() {
  const { 
    isTestMode, 
    shouldPreventRealEmails,
    shouldPreventRealPayments 
  } = useEnvironment();

  const enviarEmail = async (email: string) => {
    if (shouldPreventRealEmails) {
      console.log('🧪 DEV: Email não enviado (mock):', email);
      return { success: true, mock: true };
    }
    
    // Código real de envio
    return await sendRealEmail(email);
  };

  const processarPagamento = async (valor: number) => {
    if (shouldPreventRealPayments) {
      console.log('🧪 DEV: Pagamento simulado:', valor);
      return { success: true, mock: true };
    }
    
    // Código real de pagamento
    return await processRealPayment(valor);
  };
}
```

---

## 🎯 RESUMO EXECUTIVO

| Comando | Resultado | Quando Usar |
|---------|-----------|-------------|
| `localStorage.setItem('rendizy_dev_mode', 'true')` | Modo DEV | Desenvolvendo/Testando |
| `localStorage.removeItem('rendizy_dev_mode')` | Modo PROD | Usar sistema real |
| `npm run dev:mock` | DEV com mock | Sempre que desenvolver |
| `npm run build:prod` | Build produção | Deploy real |

---

## 💡 DICA PRO

**Crie bookmarklet no navegador:**

```javascript
// Bookmark 1: ATIVAR DEV
javascript:(function(){localStorage.setItem('rendizy_dev_mode','true');location.reload();})();

// Bookmark 2: DESATIVAR DEV
javascript:(function(){localStorage.removeItem('rendizy_dev_mode');location.reload();})();
```

**Como usar:**
1. Crie um novo bookmark
2. Cole o código acima na URL
3. Clique no bookmark para alternar

---

## ✅ TESTE AGORA

**Execute:**

```javascript
// 1. Ativar DEV
localStorage.setItem('rendizy_dev_mode', 'true');
location.reload();

// Após recarregar, você deve ver:
// - Badge amarelo no canto
// - Dados fictícios
// - Pode testar sem medo!
```

---

**COLE O CÓDIGO NO CONSOLE (F12) AGORA e comece a testar!** 🚀
