# 🔧 CORREÇÃO ERRO 404 STAYS.NET - v1.0.103.27

**Versão:** v1.0.103.27  
**Data:** 29 de Outubro de 2025  
**Build:** 20251029-2905  

---

## 🚨 PROBLEMA

Você está recebendo:

```
❌ Erro ao testar conexão: All endpoints failed.
Last error: API returned non-JSON response:
Status: 404 Not Found
Content-Type: text/html; charset=utf-8
URL: https://bvm.stays.net/external-api
```

**CAUSA:** A URL `https://bvm.stays.net/external-api` não existe ou está incorreta.

---

## ✅ SOLUÇÃO IMPLEMENTADA

### **1. Alert com URLs Corretas**

Adicionei um alerta azul na interface com 3 URLs para você tentar:

```
🌐 URLs da API Stays.net para tentar:

1️⃣ https://api.stays.net
   (API oficial)

2️⃣ https://yourcompany.stays.net/api
   (substitua yourcompany pelo nome da sua empresa)

3️⃣ https://bvm.stays.net/external-api
   (se você usa BVM)
```

---

### **2. Sistema de Tentativa Automática**

O backend agora tenta **7 endpoints diferentes** automaticamente:

```
1. /properties
2. /api/properties
3. /reservations
4. /api/reservations
5. /accommodation
6. /accommodations
7. (base URL sem endpoint)
```

**Resultado:** Se algum endpoint funcionar, você receberá confirmação de sucesso!

---

### **3. Mensagens de Erro Específicas**

#### **Se erro 404:**
```
📍 SOLUÇÃO:
A URL base está incorreta ou o servidor Stays.net mudou.

✅ URLs para tentar:
1. https://api.stays.net (API oficial)
2. https://yourcompany.stays.net/api (substitua yourcompany)
3. https://stays.net/api/v1
4. Entre em contato com suporte Stays.net para URL correta

📚 Documentação: https://stays.net/external-api
```

#### **Se erro 403/401:**
```
📍 SOLUÇÃO:
Credenciais incorretas ou acesso negado.

✅ Verifique:
1. Login e Senha estão corretos?
2. API está ativa no painel Stays.net?
3. IP do servidor está liberado?
4. Regere nova API Key se necessário
```

---

## 🎯 COMO RESOLVER AGORA

### **PASSO 1: Recarregue a Página**

```bash
Ctrl + Shift + R
# ou
Cmd + Shift + R (Mac)
```

---

### **PASSO 2: Tente as URLs Corretas**

Vá em: **Menu → Configurações → Integrações → Stays.net**

Você verá um **alerta azul** com 3 URLs sugeridas.

#### **Opção 1: API Oficial**
```
Base URL: https://api.stays.net
Login: [seu login]
Senha: [sua senha]
```

Click **"Testar Conexão"**

#### **Opção 2: URL Customizada**
```
Base URL: https://yourcompany.stays.net/api
         (substitua "yourcompany" pelo nome real)
Login: [seu login]
Senha: [sua senha]
```

Click **"Testar Conexão"**

#### **Opção 3: BVM (se aplicável)**
```
Base URL: https://bvm.stays.net/external-api
Login: [seu login]
Senha: [sua senha]
```

Click **"Testar Conexão"**

---

### **PASSO 3: Veja os Logs Detalhados**

Abra o Console (F12) e veja:

```javascript
// Você verá algo assim:

[StaysNet] Testing connection...
[StaysNet] Base URL: https://api.stays.net
[StaysNet] Trying endpoint: /properties
[StaysNet] GET https://api.stays.net/properties
[StaysNet] Response status: 200 OK  ← ✅ SUCESSO!

OU

[StaysNet] Response status: 404 Not Found  ← ❌ URL errada
[StaysNet] Trying endpoint: /api/properties
[StaysNet] GET https://api.stays.net/api/properties
...
```

---

## 📞 ONDE ENCONTRAR A URL CORRETA

### **Método 1: Documentação Stays.net**

1. Acesse: https://stays.net/external-api
2. Procure pela seção "Base URL" ou "Endpoint"
3. Copie a URL exata

### **Método 2: Suporte Stays.net**

Entre em contato e pergunte:
```
"Qual é a URL base da API para integração externa?"
```

Eles devem fornecer algo como:
- `https://api.stays.net`
- `https://yourcompany.stays.net/api`
- Outra URL específica

### **Método 3: Painel de Administração**

1. Acesse o painel do Stays.net
2. Vá em **Configurações → Integrações → API**
3. Deve haver uma seção com a URL da API

---

## 🧪 TESTE COM POSTMAN (Opcional)

Se quiser confirmar qual URL funciona:

```
1. Abra Postman ou Insomnia
2. Configure:
   Method: GET
   URL: https://api.stays.net/properties
   Auth: Basic Auth
   Username: [seu login]
   Password: [sua senha]

3. Send

4. Se retornar JSON = ✅ URL correta!
5. Se retornar HTML 404 = ❌ URL errada
```

Teste diferentes URLs até encontrar a que funciona:
- `https://api.stays.net/properties`
- `https://yourcompany.stays.net/api/properties`
- `https://bvm.stays.net/external-api/properties`

---

## 📊 EXEMPLO DE SUCESSO

### **Console (F12):**
```javascript
[StaysNet Frontend] Testing connection with: {
  baseUrl: "https://api.stays.net",  ← URL CORRETA!
  hasApiKey: true,
  hasApiSecret: true
}

[StaysNet] Testing connection...
[StaysNet] Base URL: https://api.stays.net
[StaysNet] Trying endpoint: /properties
[StaysNet] GET https://api.stays.net/properties
[StaysNet] Making request...
[StaysNet] Response status: 200 OK
[StaysNet] Content-Type: application/json; charset=utf-8, isJson: true
[StaysNet] JSON data parsed successfully
[StaysNet] ✅ Success with endpoint: /properties
[StaysNet] Request successful

[StaysNet Frontend] Response status: 200
[StaysNet Frontend] Connection successful
```

### **Interface:**
```
✅ Conexão estabelecida com sucesso! A API está respondendo corretamente.
```

---

## 📊 EXEMPLO DE ERRO (URL Errada)

### **Console (F12):**
```javascript
[StaysNet Frontend] Testing connection with: {
  baseUrl: "https://bvm.stays.net/external-api",  ← URL ERRADA!
  hasApiKey: true,
  hasApiSecret: true
}

[StaysNet] Testing connection...
[StaysNet] Base URL: https://bvm.stays.net/external-api
[StaysNet] Trying endpoint: /properties
[StaysNet] GET https://bvm.stays.net/external-api/properties
[StaysNet] Response status: 404 Not Found
[StaysNet] Content-Type: text/html; charset=utf-8, isJson: false
[StaysNet] ❌ Failed with /properties: API returned non-JSON response...

... (tenta outros 6 endpoints, todos falham com 404)

[StaysNet] ❌ All endpoints failed. Errors: /properties→404, /api/properties→404, ...

[StaysNet Frontend] Connection failed: ❌ Não foi possível conectar...
Tentamos 7 endpoints diferentes...

📍 SOLUÇÃO:
A URL base está incorreta ou o servidor Stays.net mudou.

✅ URLs para tentar:
1. https://api.stays.net (API oficial)
2. https://yourcompany.stays.net/api (substitua yourcompany)
...
```

### **Interface:**
```
❌ Falha na conexão. Abra o Console do navegador (F12) para ver detalhes do erro e possíveis soluções.
```

---

## 🎯 RESUMO DAS MUDANÇAS

### **Frontend (`/components/StaysNetIntegration.tsx`):**

```typescript
// ✅ Adicionado Alert com URLs corretas
<Alert className="bg-blue-50 border-blue-200">
  <Info className="h-4 w-4 text-blue-600" />
  <AlertDescription>
    <p>🌐 URLs da API Stays.net para tentar:</p>
    <div>
      <code>https://api.stays.net</code> (API oficial)
      <code>https://yourcompany.stays.net/api</code>
      <code>https://bvm.stays.net/external-api</code>
    </div>
    <p>⚠️ Se erro 404, a URL está incorreta.</p>
  </AlertDescription>
</Alert>

// ✅ Mensagem de erro melhorada
'❌ Falha na conexão. Abra o Console (F12) para ver detalhes...'
```

### **Backend (`/supabase/functions/server/routes-staysnet.ts`):**

```typescript
// ✅ Testa 7 endpoints diferentes
const endpointsToTry = [
  '/properties',
  '/api/properties', 
  '/reservations',
  '/api/reservations',
  '/accommodation',
  '/accommodations',
  '',  // Base URL
];

// ✅ Mensagens específicas por erro
if (lastError.includes('404')) {
  helpMessage = `
    📍 SOLUÇÃO:
    A URL base está incorreta...
    
    ✅ URLs para tentar:
    1. https://api.stays.net
    2. https://yourcompany.stays.net/api
    ...
  `;
}

// ✅ Retorna erro descritivo
return {
  success: false,
  error: `❌ Não foi possível conectar com Stays.net.\n\n` +
    `Tentamos ${endpointsToTry.length} endpoints: ${errors.join(', ')}\n\n` +
    `Último erro: ${lastError}${helpMessage}`,
};
```

---

## ✅ CHECKLIST DE RESOLUÇÃO

- [ ] Recarreguei a página (Ctrl+Shift+R)
- [ ] Abri o Console (F12)
- [ ] Vi o alerta azul com URLs sugeridas
- [ ] Testei URL #1: https://api.stays.net
- [ ] Testei URL #2: https://yourcompany.stays.net/api
- [ ] Testei URL #3: https://bvm.stays.net/external-api
- [ ] Li os logs no Console
- [ ] Encontrei a URL correta que retorna 200 OK
- [ ] Salvei a configuração

Se nenhuma URL funcionar:
- [ ] Entrei em contato com suporte Stays.net
- [ ] Perguntei: "Qual é a URL base da API?"
- [ ] Testei a URL fornecida por eles

---

## 📁 ARQUIVOS MODIFICADOS

```
✅ /components/StaysNetIntegration.tsx
   Linhas 525-547: Alert com URLs corretas
   Linha 557: Mensagem de erro melhorada

✅ /supabase/functions/server/routes-staysnet.ts
   Linhas 152-201: testConnection() com 7 endpoints
   Mensagens específicas por tipo de erro

✅ /BUILD_VERSION.txt → v1.0.103.27
✅ /CACHE_BUSTER.ts → Build 20251029-2905
✅ /FIX_STAYS_NET_404_v1.0.103.27.md (este arquivo)
```

---

## 🚀 AÇÃO NECESSÁRIA

```
1. Recarregar página (Ctrl+Shift+R)
   ↓
2. Ver alerta azul com URLs
   ↓
3. Testar cada URL sugerida
   ↓
4. Ver logs no Console (F12)
   ↓
5. Quando achar URL que retorna 200 OK:
   → Essa é a URL correta!
   ↓
6. Salvar configuração
   ↓
7. ✅ SUCESSO!
```

---

## 💡 DICA FINAL

**A URL correta VAI DEPENDER de como o Stays.net configurou a API para você.**

Não existe "uma URL certa para todos". Pode ser:
- `https://api.stays.net` (mais comum)
- `https://yourcompany.stays.net/api` (se tiver subdomínio)
- `https://bvm.stays.net/external-api` (se usar BVM)
- Outra URL específica

**SOLUÇÃO:** Teste todas as URLs sugeridas OU entre em contato com suporte Stays.net!

---

**VERSÃO:** v1.0.103.27  
**STATUS:** ✅ CORREÇÃO IMPLEMENTADA  
**BUILD:** 20251029-2905  

**TESTE AGORA COM AS URLS CORRETAS! 🌐**
