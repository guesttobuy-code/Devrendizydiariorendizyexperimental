# 🎯 COMPARAÇÃO VISUAL: URLs Stays.net

## ❌ URL ERRADA vs ✅ URL CORRETA

### **Erro Comum: Usar URL do Painel de Administração**

```diff
- ❌ https://bvm.stays.net
+ ✅ https://bvm.stays.net/external/v1
```

---

## 📊 DIFERENÇA VISUAL

### **❌ URL ERRADA (Painel de Administração)**

```
┌────────────────────────────────────────────────┐
│ URL: https://bvm.stays.net                     │
├────────────────────────────────────────────────┤
│                                                │
│ → Retorna: HTML (Página de Login)             │
│ → Content-Type: text/html; charset=utf-8      │
│ → Status: 200 OK                               │
│                                                │
│ <!doctype html>                                │
│ <html lang="pt">                               │
│   <head>                                       │
│     <meta charset="utf-8">                     │
│     <title>Stays.net - Login</title>           │
│   </head>                                      │
│   ...                                          │
│                                                │
│ ❌ ERRO: API returned non-JSON response        │
│                                                │
└────────────────────────────────────────────────┘
```

### **✅ URL CORRETA (API REST)**

```
┌────────────────────────────────────────────────┐
│ URL: https://bvm.stays.net/external/v1         │
├────────────────────────────────────────────────┤
│                                                │
│ → Retorna: JSON (Dados da API)                │
│ → Content-Type: application/json               │
│ → Status: 200 OK                               │
│                                                │
│ {                                              │
│   "data": [                                    │
│     {                                          │
│       "_id": "5f8963b5e1b59ec59f091a81",       │
│       "id": "JQ07G",                           │
│       "internalName": "Property 001",          │
│       ...                                      │
│     }                                          │
│   ]                                            │
│ }                                              │
│                                                │
│ ✅ SUCESSO: JSON válido recebido               │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 🔍 ANATOMIA DA URL CORRETA

```
https://bvm.stays.net/external/v1/content/properties
└───┬──┘ └──────┬──────┘ └────┬─────┘ └───────┬────────┘
    │           │              │                │
    │           │              │                └─► Endpoint específico
    │           │              │
    │           │              └─────────────────► Caminho base da API
    │           │                                   (OBRIGATÓRIO!)
    │           │
    │           └─────────────────────────────────► Domínio da instalação
    │
    └──────────────────────────────────────────────► Protocolo seguro
```

---

## 📝 EXEMPLOS REAIS

### **Instalação BVM (Sua Casa Rende Mais)**

```bash
# ❌ ERRADO
https://bvm.stays.net
https://bvm.stays.net/api
https://bvm.stays.net/external-api

# ✅ CORRETO
https://bvm.stays.net/external/v1
```

### **API Oficial Stays.net**

```bash
# ❌ ERRADO
https://api.stays.net
https://api.stays.net/v1

# ✅ CORRETO
https://api.stays.net/external/v1
```

### **Ambiente de Testes (Playground)**

```bash
# ❌ ERRADO
https://play.stays.net
https://play.stays.net/api

# ✅ CORRETO
https://play.stays.net/external/v1
```

### **Instalação Customizada**

```bash
# ❌ ERRADO
https://yourcompany.stays.net
https://yourcompany.stays.net/api

# ✅ CORRETO
https://yourcompany.stays.net/external/v1
```

---

## 🎯 TESTE RÁPIDO

### **Como saber se a URL está correta:**

```bash
# Cole esta URL no navegador:
https://bvm.stays.net/external/v1/content/properties

# Se pedir LOGIN/SENHA:
✅ CORRETO - É a API!

# Se mostrar página de login HTML:
❌ ERRADO - Falta /external/v1
```

---

## 📊 TABELA COMPARATIVA

| Aspecto | URL do Painel | URL da API |
|---------|---------------|------------|
| **URL** | `https://bvm.stays.net` | `https://bvm.stays.net/external/v1` |
| **Propósito** | Acesso via navegador | Integração programática |
| **Retorna** | HTML (página web) | JSON (dados) |
| **Content-Type** | `text/html` | `application/json` |
| **Uso** | Usuários humanos | Sistemas/APIs |
| **Login** | Formulário HTML | HTTP Basic Auth |

---

## 🛠️ CONFIGURAÇÃO NO RENDIZY

### **Campo "Base URL":**

```
❌ NÃO digite:
   https://bvm.stays.net

✅ Digite:
   https://bvm.stays.net/external/v1
```

### **Teste Completo:**

```javascript
// 1. URL Correta
Base URL: https://bvm.stays.net/external/v1

// 2. Credenciais
Login: a5146970
Password: bfcf4daf

// 3. Teste
Click "Testar Conexão"

// 4. Console (F12)
✅ Ver: "application/json"
✅ Ver: "✅ Success with endpoint"

// 5. Interface
✅ Ver: "Conexão estabelecida com sucesso!"
```

---

## 💡 REGRA SIMPLES

```
┌────────────────────────────────────────────┐
│                                            │
│  🎯 REGRA DE OURO:                         │
│                                            │
│  Se a URL NÃO terminar com /external/v1   │
│  ela vai retornar HTML, não JSON!         │
│                                            │
│  SEMPRE adicione /external/v1 no final!   │
│                                            │
└────────────────────────────────────────────┘
```

---

## 🔧 TROUBLESHOOTING VISUAL

### **Sintoma 1: "API returned non-JSON response"**

```
Erro no Console:
  [StaysNet] Content-Type: text/html  ← HTML!
  
Causa:
  URL sem /external/v1
  
Solução:
  ❌ https://bvm.stays.net
  ✅ https://bvm.stays.net/external/v1
```

### **Sintoma 2: "HTTP 404 Not Found"**

```
Erro no Console:
  [StaysNet] Response status: 404 Not Found
  
Causa:
  Caminho errado
  
Solução:
  ❌ https://bvm.stays.net/api
  ❌ https://bvm.stays.net/external-api
  ✅ https://bvm.stays.net/external/v1
```

### **Sintoma 3: "HTTP 401 Unauthorized"**

```
Erro no Console:
  [StaysNet] Response status: 401 Unauthorized
  
Causa:
  Credenciais incorretas ou URL errada
  
Solução:
  1. Verificar Login/Password
  2. Verificar se URL termina com /external/v1
  3. Verificar se credenciais estão ativas
```

---

## 📞 QUANDO CONTATAR SUPORTE

Contate suporte Stays.net apenas se:

```
✅ URL termina com /external/v1
✅ Credenciais estão corretas
✅ Ainda retorna HTML ou 404
```

Porque aí o problema pode ser:
- Domínio errado
- API não ativada
- IP bloqueado
- Instalação diferente

---

## 🎬 CHECKLIST VISUAL

```
Antes de Testar:

[ ] ✅ URL termina com /external/v1
[ ] ✅ URL começa com https://
[ ] ✅ Domínio correto (bvm.stays.net)
[ ] ✅ Login preenchido (a5146970)
[ ] ✅ Password preenchido (bfcf4daf)

Após Testar:

[ ] ✅ Console não mostra "text/html"
[ ] ✅ Console mostra "application/json"
[ ] ✅ Interface mostra sucesso
[ ] ✅ Não há erro 404 ou 401
```

---

## 🚀 EXEMPLO FINAL

```
┌─────────────────────────────────────────────┐
│ CONFIGURAÇÃO CORRETA COMPLETA               │
├─────────────────────────────────────────────┤
│                                             │
│ Base URL:                                   │
│ https://bvm.stays.net/external/v1           │
│ └─────────────────────────────┘             │
│          COM /external/v1 !                 │
│                                             │
│ Login (API Key):                            │
│ a5146970                                    │
│                                             │
│ Password (API Secret):                      │
│ bfcf4daf                                    │
│                                             │
│ ✅ Resultado:                                │
│ Conexão estabelecida com sucesso!          │
│                                             │
└─────────────────────────────────────────────┘
```

---

**Documentação criada em:** 29 de Outubro de 2025  
**Versão do Sistema:** v1.0.103.29  
**Status:** ✅ DEFINITIVO  
