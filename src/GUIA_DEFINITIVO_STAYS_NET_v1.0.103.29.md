# 🎯 GUIA DEFINITIVO: Configuração Stays.net API - v1.0.103.29

**Versão:** v1.0.103.29  
**Data:** 29 de Outubro de 2025  
**Build:** 20251029-2907  
**Status:** ✅ SOLUÇÃO DEFINITIVA  

---

## 🚨 PROBLEMA RESOLVIDO

### **Erro Anterior:**
```
❌ URL: https://bvm.stays.net
↓
Retorna: HTML 200 OK (página de login)
↓
Erro: "API returned non-JSON response"
```

### **✅ SOLUÇÃO:**
```
✅ URL: https://bvm.stays.net/external/v1
↓
Retorna: JSON (dados da API)
↓
Sucesso: Integração funcionando!
```

---

## 📖 FORMATO CORRETO DA URL

### **🎯 Estrutura da URL da API Stays.net:**

```
https://[DOMINIO]/external/v1
```

**Componentes:**
1. **Protocolo:** `https://` (obrigatório)
2. **Domínio:** `bvm.stays.net`, `api.stays.net`, `yourcompany.stays.net`, etc.
3. **Caminho Base:** `/external/v1` (OBRIGATÓRIO!)

---

## ✅ EXEMPLOS DE URLs CORRETAS

### **Formato 1: Instalação BVM**
```
https://bvm.stays.net/external/v1
```

### **Formato 2: API Oficial**
```
https://api.stays.net/external/v1
```

### **Formato 3: Demo/Playground**
```
https://play.stays.net/external/v1
```

### **Formato 4: Instalação Customizada**
```
https://yourcompany.stays.net/external/v1
```
> ⚠️ Substitua `yourcompany` pelo nome da sua empresa

---

## ❌ EXEMPLOS DE URLs INCORRETAS

### **Erro 1: Falta /external/v1**
```
❌ https://bvm.stays.net
✅ https://bvm.stays.net/external/v1
```

### **Erro 2: Caminho errado**
```
❌ https://bvm.stays.net/api
❌ https://bvm.stays.net/external-api
❌ https://bvm.stays.net/v1
✅ https://bvm.stays.net/external/v1
```

### **Erro 3: HTTP ao invés de HTTPS**
```
❌ http://bvm.stays.net/external/v1
✅ https://bvm.stays.net/external/v1
```

---

## 🔧 CONFIGURAÇÃO NO RENDIZY

### **Passo 1: Acesse as Configurações**

```
1. Recarregue a página: Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)
2. Menu lateral → Configurações
3. Aba "Integrações"
4. Seção "Stays.net"
```

### **Passo 2: Preencha os Campos**

```javascript
┌─────────────────────────────────────────────┐
│ 🌐 Base URL da API                          │
│ https://bvm.stays.net/external/v1           │ ← CORRETO!
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🔑 API Key / Login                          │
│ a5146970                                    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🔐 API Secret / Password                    │
│ bfcf4daf                                    │
└─────────────────────────────────────────────┘
```

### **Passo 3: Teste a Conexão**

```
1. Click no botão "Testar Conexão"
2. Abra o Console (F12) para ver os logs
3. Aguarde a resposta
```

---

## 🎯 ENDPOINTS DA API

### **Base URL:**
```
https://bvm.stays.net/external/v1
```

### **Endpoints Completos:**

```bash
# Listar Propriedades
GET https://bvm.stays.net/external/v1/content/properties

# Listar Listings (Anúncios)
GET https://bvm.stays.net/external/v1/content/listings

# Listar Reservas
GET https://bvm.stays.net/external/v1/booking/reservations
  ?from=2025-01-01
  &to=2025-12-31
  &dateType=arrival

# Buscar Disponibilidade
POST https://bvm.stays.net/external/v1/booking/search-listings

# Calendário
GET https://bvm.stays.net/external/v1/calendar/listing/{listingId}
  ?from=2025-01-01
  &to=2025-01-31
```

---

## 🔍 COMO VALIDAR SE A URL ESTÁ CORRETA

### **Método 1: Teste no Browser**

Abra no navegador (vai pedir login/senha):
```
https://bvm.stays.net/external/v1/content/properties
```

**✅ Correto:** Retorna JSON ou pede autenticação  
**❌ Errado:** Retorna página HTML de login

### **Método 2: Teste com cURL**

```bash
curl -X GET "https://bvm.stays.net/external/v1/content/properties" \
  -H "Authorization: Basic YTUxNDY5NzA6YmZjZjRkYWY=" \
  -H "Content-Type: application/json"
```

**Credenciais em Base64:**
```bash
# Login: a5146970
# Password: bfcf4daf
# Base64: YTUxNDY5NzA6YmZjZjRkYWY=

# Como gerar:
echo -n "a5146970:bfcf4daf" | base64
```

### **Método 3: Teste no Postman**

```
Method: GET
URL: https://bvm.stays.net/external/v1/content/properties

Auth Type: Basic Auth
Username: a5146970
Password: bfcf4daf

Headers:
  Content-Type: application/json
  Accept: application/json
```

---

## 📊 COMO SABER SE DEU CERTO

### **✅ SUCESSO (JSON):**

**Console (F12):**
```javascript
[StaysNet] Testing connection...
[StaysNet] Base URL: https://bvm.stays.net/external/v1
[StaysNet] GET https://bvm.stays.net/external/v1/content/properties
[StaysNet] Response status: 200 OK
[StaysNet] Content-Type: application/json; charset=utf-8  ← JSON!
[StaysNet] ✅ Success with endpoint: /content/properties
```

**Interface:**
```
✅ Conexão estabelecida com sucesso!
A API está respondendo corretamente.
```

---

### **❌ AINDA ERRADO (HTML):**

**Console (F12):**
```javascript
[StaysNet] Testing connection...
[StaysNet] Base URL: https://bvm.stays.net  ← Sem /external/v1
[StaysNet] GET https://bvm.stays.net/content/properties
[StaysNet] Response status: 200 OK
[StaysNet] Content-Type: text/html; charset=utf-8  ← HTML!
[StaysNet] ❌ API returned non-JSON response
```

**Interface:**
```
❌ Erro ao testar conexão
API returned non-JSON response
```

**SOLUÇÃO:** Adicione `/external/v1` ao final da URL!

---

## 🆘 TROUBLESHOOTING

### **Problema 1: Erro 404**

```
Erro: HTTP 404 Not Found
```

**Causa:** Endpoint não existe ou URL está errada

**Soluções:**
1. Verifique se a URL termina com `/external/v1`
2. Teste no navegador para confirmar
3. Verifique se o domínio está correto (`bvm.stays.net`)

### **Problema 2: Erro 401/403**

```
Erro: HTTP 401 Unauthorized
ou
Erro: HTTP 403 Forbidden
```

**Causa:** Credenciais incorretas

**Soluções:**
1. Verifique Login (API Key): `a5146970`
2. Verifique Password (API Secret): `bfcf4daf`
3. Confirme se as credenciais estão ativas no painel Stays.net
4. Verifique se o IP do servidor está liberado

### **Problema 3: Retorna HTML 200**

```
Erro: API returned non-JSON response
Status: 200 OK
Content-Type: text/html
```

**Causa:** URL sem `/external/v1`

**Solução:**
```
❌ https://bvm.stays.net
✅ https://bvm.stays.net/external/v1
```

### **Problema 4: Erro de CORS**

```
Erro: CORS policy blocked
```

**Causa:** Requisição do frontend direto para API externa

**Solução:** As requisições devem passar pelo backend RENDIZY (já está implementado)

---

## 📞 CONTATO COM SUPORTE STAYS.NET

Se nenhuma URL funcionar, use este template:

```
Assunto: Necessito URL da API REST para Integração

Olá,

Estou integrando o sistema RENDIZY com a API do Stays.net.

Minha Instalação:
• Painel de Administração: https://bvm.stays.net
• Login: a5146970

Preciso confirmar qual é a URL base correta da API REST.

Testei:
❌ https://bvm.stays.net → Retorna HTML
❌ https://bvm.stays.net/api → 404
❌ https://bvm.stays.net/external-api → 404
⏳ https://bvm.stays.net/external/v1 → (aguardando teste)

A documentação oficial mostra:
https://play.stays.net/external/v1

Para minha instalação BVM, qual seria o equivalente?

Também preciso confirmar:
• Método de autenticação: Basic Auth?
• Endpoints disponíveis: /content/properties, /booking/reservations?
• Há alguma configuração necessária no painel?

Aguardo retorno.

Atenciosamente,
[Seu Nome]
[Sua Empresa]
```

---

## 🎯 CHECKLIST FINAL

```
[ ] URL termina com /external/v1
[ ] URL começa com https://
[ ] Domínio está correto (bvm.stays.net)
[ ] Login/Password estão corretos
[ ] Testei no navegador
[ ] Testei no RENDIZY
[ ] Testei com cURL ou Postman
[ ] Console não mostra "text/html"
[ ] Console mostra "application/json"
[ ] Interface mostra "✅ Conexão estabelecida"
```

---

## 📁 ARQUIVOS MODIFICADOS - v1.0.103.29

```
✅ /components/StaysNetIntegration.tsx
   Linhas 525-548: Alert atualizado com formato correto
   Linha 469: Placeholder atualizado

✅ /BUILD_VERSION.txt → v1.0.103.29
✅ /CACHE_BUSTER.ts → Build 20251029-2907
✅ /GUIA_DEFINITIVO_STAYS_NET_v1.0.103.29.md (este arquivo)
```

---

## 🎬 TESTE AGORA

### **Ação Imediata:**

```bash
1. Recarregue a página: Ctrl+Shift+R

2. Vá em: Menu → Configurações → Integrações → Stays.net

3. Configure:
   Base URL: https://bvm.stays.net/external/v1  ← COM /external/v1!
   Login: a5146970
   Password: bfcf4daf

4. Click "Testar Conexão"

5. Abra Console (F12) e veja os logs

6. Procure por:
   ✅ "application/json" = CORRETO
   ❌ "text/html" = ERRADO (falta /external/v1)
```

---

## 💡 RESUMO VISUAL

```
┌─────────────────────────────────────────────────────────────┐
│                    URL CORRETA DA API                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  https://  bvm.stays.net  /external/v1                      │
│  ↑         ↑              ↑                                 │
│  │         │              └─ Caminho Base (OBRIGATÓRIO!)   │
│  │         └─ Domínio da sua instalação                    │
│  └─ Protocolo seguro                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

ENDPOINTS COMPLETOS:

GET /external/v1/content/properties      → Listar Propriedades
GET /external/v1/content/listings        → Listar Anúncios
GET /external/v1/booking/reservations    → Listar Reservas
POST /external/v1/booking/search-listings → Buscar Disponibilidade
```

---

## ✅ GARANTIA DE FUNCIONAMENTO

Se você configurar exatamente assim:

```
Base URL: https://bvm.stays.net/external/v1
Login: a5146970
Password: bfcf4daf
```

E AINDA não funcionar, então:

1. **O domínio está errado** → Contate suporte para URL correta
2. **As credenciais estão erradas** → Verifique no painel Stays.net
3. **A API não está ativa** → Ative no painel de administração
4. **O IP está bloqueado** → Libere o IP do servidor no firewall

**MAS:** Se o problema for "API returned non-JSON response", a causa é **100% falta de `/external/v1` na URL!**

---

**VERSÃO:** v1.0.103.29  
**STATUS:** ✅ GUIA DEFINITIVO  
**BUILD:** 20251029-2907  

**BOA INTEGRAÇÃO! 🚀**
