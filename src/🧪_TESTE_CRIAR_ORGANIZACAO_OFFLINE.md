# 🧪 TESTE: Criar Organização Offline

**Versão:** v1.0.103.199  
**Data:** 31/10/2025  

---

## 🔍 DEBUG DO PROBLEMA

### **1. Abrir Console do Navegador**

```
F12 ou Ctrl+Shift+I
Ir para aba "Console"
```

### **2. Verificar LocalStorage**

```javascript
// Ver se tem dados salvos
console.log('Organizações offline:', localStorage.getItem('rendizy_offline_organizations'));

// Quantidade
console.log('Quantidade:', JSON.parse(localStorage.getItem('rendizy_offline_organizations') || '[]').length);
```

### **3. Criar Organização Manualmente**

```javascript
// Criar organização de teste direto no localStorage
const testOrg = {
  id: `offline_${Date.now()}_abc123`,
  name: "Sua Casa Mobiliada TESTE",
  slug: "rendizy_sua-casa-mobiliada-teste",
  status: "active",
  plan: "professional",
  email: "teste@suacasamobiliada.com",
  phone: "(11) 99999-9999",
  legalName: "Sua Casa Mobiliada TESTE",
  taxId: "",
  settings: {
    language: "pt",
    timezone: "America/Sao_Paulo",
    currency: "BRL",
    dateFormat: "DD/MM/YYYY",
    maxUsers: 15,
    maxProperties: 100
  },
  limits: {
    users: 15,
    properties: 100,
    reservations: 5000,
    storage: 999999
  },
  usage: {
    users: 0,
    properties: 0,
    reservations: 0,
    storage: 0
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

// Salvar
const existing = JSON.parse(localStorage.getItem('rendizy_offline_organizations') || '[]');
existing.push(testOrg);
localStorage.setItem('rendizy_offline_organizations', JSON.stringify(existing));

console.log('✅ Organização criada offline:', testOrg.name);
console.log('📊 Total de organizações offline:', existing.length);

// Recarregar página
location.reload();
```

---

## 🎯 CRIAR NO BACKEND DIRETO

### **Via CURL (Terminal):**

```bash
curl -X POST \
  "https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/organizations" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sua Casa Mobiliada",
    "email": "contato@suacasamobiliada.com",
    "phone": "(11) 99999-9999",
    "plan": "professional"
  }'
```

### **Via Console do Navegador:**

```javascript
// Criar organização direto no backend
fetch('https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/organizations', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Sua Casa Mobiliada',
    email: 'contato@suacasamobiliada.com',
    phone: '(11) 99999-9999',
    plan: 'professional'
  })
})
.then(res => res.json())
.then(data => {
  console.log('✅ Resposta do backend:', data);
  if (data.success) {
    console.log('🎉 Organização criada com sucesso!');
    console.log('📋 Dados:', data.data);
    location.reload();
  } else {
    console.error('❌ Erro:', data.error);
  }
})
.catch(err => {
  console.error('❌ Erro de conexão:', err);
  console.log('💡 Backend está offline - usando modo offline');
});
```

---

## 🔧 CRIAR DIRETO NO KV STORE

Como o backend está offline, vou criar a organização **direto no código**:

### **Adicionar Organização Mock:**

Abra o arquivo `/components/TenantManagement.tsx` e encontre `mockOrganizations`.

Adicione esta organização:

```typescript
{
  id: '9090909',
  name: 'Sua Casa Mobiliada',
  slug: 'rendizy_sua-casa-mobiliada',
  status: 'active',
  plan: 'professional',
  email: 'contato@suacasamobiliada.com',
  phone: '(11) 99999-9999',
  legalName: 'Sua Casa Mobiliada Ltda',
  taxId: '12.345.678/0001-90',
  settings: {
    language: 'pt',
    timezone: 'America/Sao_Paulo',
    currency: 'BRL',
    dateFormat: 'DD/MM/YYYY',
    maxUsers: 15,
    maxProperties: 100
  },
  limits: {
    users: 15,
    properties: 100,
    reservations: 5000,
    storage: 999999
  },
  usage: {
    users: 0,
    properties: 0,
    reservations: 0,
    storage: 0
  },
  createdAt: new Date('2025-10-31'),
  updatedAt: new Date()
}
```

---

## 🎯 O QUE VOCÊ DEVE ESPERAR

### **Ao Criar Offline (Modal):**

1. **Modal abre** com banner amarelo "Modo Offline"
2. **Preenche** formulário
3. **Clica** "Criar Offline"
4. **Vê toast** de sucesso: "✅ Organização criada localmente!"
5. **Vê segundo toast**: "💾 Salva no navegador"
6. **Lista atualiza** mostrando a organização com badge 💾

### **Se Não Aparecer:**

**Debug no Console (F12):**

```javascript
// 1. Ver erros
console.log('Erros:', window.lastError);

// 2. Ver localStorage
console.log('LocalStorage:', localStorage.getItem('rendizy_offline_organizations'));

// 3. Forçar reload
location.reload();

// 4. Limpar e testar de novo
localStorage.removeItem('rendizy_offline_organizations');
```

---

## 💡 SOLUÇÃO RÁPIDA

**Se criação offline não está funcionando:**

### **Opção 1: Criar Mock Direto**

Vou adicionar sua organização aos dados mock do sistema.

### **Opção 2: Console do Navegador**

Use o script acima para criar manualmente no localStorage.

### **Opção 3: Aguardar Fix**

Vou corrigir o bug de criação offline agora.

---

**Qual você quer que eu faça primeiro?**

1. ✅ Adicionar "Sua Casa Mobiliada" aos dados mock
2. 🔧 Corrigir bug de criação offline
3. 🧪 Criar script de teste no console
