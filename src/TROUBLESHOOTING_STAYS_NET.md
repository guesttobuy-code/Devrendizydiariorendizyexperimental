# 🔧 TROUBLESHOOTING - STAYS.NET CONNECTION

**Versão:** v1.0.103.26  
**Data:** 29 de Outubro de 2025  

---

## 🚨 PROBLEMA: "Falha na conexão"

Se você está vendo a mensagem **"Falha na conexão. Verifique suas credenciais e tente novamente"**, siga este guia:

---

## ✅ CHECKLIST DE VERIFICAÇÃO

### **1. URL Base CORRETA**

```
❌ ERRADO:
- http://bvm.stays.net/external-api (sem HTTPS)
- https://bvm.stays.net (sem /external-api)
- https://bvm.stays.net/external-api/properties (com endpoint)
- https://stays.net/external-api (sem bvm)

✅ CORRETO:
- https://bvm.stays.net/external-api
```

**IMPORTANTE:**
- Deve começar com `https://` (HTTPS obrigatório)
- Deve incluir `/external-api` no final
- NÃO deve incluir endpoints como `/properties` ou `/reservations`
- Use `bvm.stays.net` não apenas `stays.net`

---

### **2. Credenciais (Login e Senha)**

```
Login (API Key):
- Formato: 8 caracteres alfanuméricos
- Exemplo: a5146970
- Campo: "API Key / Login"

Senha (API Secret):
- Formato: 8 caracteres alfanuméricos  
- Exemplo: bfcf4daf
- Campo: "API Secret / Senha"
```

**IMPORTANTE:**
- Ambos são obrigatórios para Stays.net
- São diferentes da sua senha do painel BVM
- Devem ser obtidos em: App Center → API Stays

---

### **3. Como Obter as Credenciais**

```
Passo a passo:

1. Acesse: https://bvm.stays.net
2. Faça login com suas credenciais do BVM
3. Menu: App Center → API Stays
4. Clique em "Gerar Nova API Key" ou veja a existente
5. Copie o Login (8 caracteres)
6. Copie a Senha (8 caracteres)
7. Cole no RENDIZY
```

---

## 🔍 COMO DEBUGAR

### **1. Abra o Console do Navegador**

```
1. Pressione F12 (ou Ctrl+Shift+I)
2. Vá na aba "Console"
3. Click em "Testar Conexão"
4. Veja os logs detalhados
```

### **2. Logs que Você Verá**

```javascript
// Frontend
[StaysNet Frontend] Testing connection with: {
  baseUrl: "https://bvm.stays.net/external-api",
  hasApiKey: true,
  hasApiSecret: true
}

// Backend (no servidor)
[StaysNet] Testing connection...
[StaysNet] GET https://bvm.stays.net/external-api/properties
[StaysNet] Response status: 200 OK
```

### **3. Erros Comuns e Soluções**

#### **Erro: "API returned non-JSON response"**

```
Causa: URL incorreta ou servidor retornou HTML
Solução:
- Verifique se URL termina em /external-api
- Não inclua endpoints como /properties
- Use HTTPS
```

#### **Erro: "HTTP 403 Forbidden"**

```
Causa: Credenciais incorretas
Solução:
- Verifique Login e Senha
- Regere API Key no BVM se necessário
- Confirme que copiou corretamente
```

#### **Erro: "HTTP 401 Unauthorized"**

```
Causa: Autenticação falhou
Solução:
- Login ou Senha incorretos
- Verifique se a API Key está ativa no BVM
```

#### **Erro: "HTTP 404 Not Found"**

```
Causa: Endpoint não existe
Solução:
- Verifique a URL base
- Deve ser /external-api não /api
```

#### **Erro: "Failed to fetch" ou "Network error"**

```
Causa: Problema de rede ou CORS
Solução:
- Verifique conexão com internet
- IP do servidor pode estar bloqueado
- Contate suporte do Stays.net para liberar IP
```

---

## 📊 TESTE PASSO A PASSO

### **Configuração Mínima para Teste:**

```
Base URL: https://bvm.stays.net/external-api
Login: a5146970  (exemplo - use o seu)
Senha: bfcf4daf  (exemplo - use o seu)
```

### **Fluxo de Teste:**

```
1. Preencha os 3 campos
   ↓
2. Click "Testar Conexão"
   ↓
3. Aguarde 5-10 segundos
   ↓
4. Se sucesso: ✅ mensagem verde
   ↓
5. Se erro: ❌ veja Console (F12)
   ↓
6. Copie erro e veja soluções acima
```

---

## 🔄 O QUE O SISTEMA FAZ NO TESTE

```
1. Frontend valida campos preenchidos
2. Envia credenciais para backend
3. Backend tenta múltiplos endpoints:
   - /properties
   - /api/properties
   - /reservations
   - /api/reservations
   - /
   - /api
4. Se algum retornar JSON = Sucesso ✅
5. Se todos falharem = Erro ❌
6. Retorna resultado para frontend
```

---

## 🎯 EXEMPLO DE SUCESSO

### **No Console (F12):**

```
[StaysNet Frontend] Testing connection with: {
  baseUrl: "https://bvm.stays.net/external-api",
  hasApiKey: true,
  hasApiSecret: true
}

[StaysNet] Testing connection...
[StaysNet] Trying endpoint: /properties
[StaysNet] GET https://bvm.stays.net/external-api/properties
[StaysNet] Response status: 200 OK
[StaysNet] Content-Type: application/json, isJson: true
[StaysNet] JSON data parsed successfully
[StaysNet] Success with endpoint: /properties
[StaysNet] Request successful

[StaysNet Frontend] Response status: 200
[StaysNet Frontend] Response data: { success: true, ... }
[StaysNet Frontend] Connection successful
```

### **Na Interface:**

```
✅ Conexão estabelecida com sucesso!
```

---

## 🎯 EXEMPLO DE ERRO

### **No Console (F12):**

```
[StaysNet Frontend] Testing connection with: {
  baseUrl: "https://bvm.stays.net/external-api",
  hasApiKey: true,
  hasApiSecret: true
}

[StaysNet] Testing connection...
[StaysNet] Trying endpoint: /properties
[StaysNet] GET https://bvm.stays.net/external-api/properties
[StaysNet] Response status: 403 Forbidden
[StaysNet] Content-Type: text/html, isJson: false
[StaysNet] Non-JSON response: <!doctype html><html>...403 Forbidden...
[StaysNet] Failed with /properties: API returned non-JSON response...

[StaysNet] Trying endpoint: /api/properties
... (tenta todos endpoints)

[StaysNet] All endpoints failed. Last error: ...
[StaysNet Frontend] Connection failed: All endpoints failed...
```

### **Na Interface:**

```
❌ Falha na conexão: All endpoints failed. Last error: API returned non-JSON response (403)...
```

---

## 💡 DICAS AVANÇADAS

### **1. Verificar IP do Servidor**

```
O Stays.net pode ter restrição de IP.
Peça ao suporte do Stays.net para liberar o IP do servidor Supabase.
```

### **2. Testar Direto no Postman**

```
Method: GET
URL: https://bvm.stays.net/external-api/properties
Auth: Basic Auth
Username: a5146970 (seu login)
Password: bfcf4daf (sua senha)

Se funcionar no Postman mas não no RENDIZY:
- Pode ser restrição de IP
- Contate suporte do Stays.net
```

### **3. Verificar Documentação Oficial**

```
URL: https://stays.net/external-api/#introduction
Confirme:
- Endpoint base correto
- Método de autenticação
- Endpoints disponíveis
```

---

## 📞 SUPORTE

### **Se Nada Funcionar:**

```
1. Copie TODO o log do Console (F12)
2. Screenshot da tela de configuração
3. Teste no Postman e copie resultado
4. Entre em contato com:
   - Suporte RENDIZY (para problemas no sistema)
   - Suporte Stays.net (para problemas de credenciais/acesso)
```

---

## ✅ CHECKLIST FINAL

Antes de pedir ajuda, confirme:

- [ ] URL: https://bvm.stays.net/external-api (exatamente assim)
- [ ] Login: 8 caracteres alfanuméricos copiados do BVM
- [ ] Senha: 8 caracteres alfanuméricos copiados do BVM
- [ ] Console (F12) aberto vendo logs
- [ ] Screenshot dos erros no console
- [ ] Testou no Postman (opcional)
- [ ] Confirmou que API está ativa no BVM

---

**VERSÃO:** v1.0.103.26  
**STATUS:** 🔧 TROUBLESHOOTING GUIDE  
**ÚLTIMA ATUALIZAÇÃO:** 29/10/2025  

**IMPORTANTE:** Este guia é baseado na experiência de testes. Se você encontrar novos erros, documente e reporte!
