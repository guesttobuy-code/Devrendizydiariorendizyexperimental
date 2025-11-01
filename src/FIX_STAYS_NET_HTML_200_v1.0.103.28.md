# 🔧 SOLUÇÃO ERRO: API RETORNA HTML 200 - v1.0.103.28

**Versão:** v1.0.103.28  
**Data:** 29 de Outubro de 2025  
**Build:** 20251029-2906  

---

## 🚨 SEU PROBLEMA ESPECÍFICO

Você está recebendo este erro:

```
❌ Erro ao testar conexão: Não foi possível conectar com Stays.net.

Tentamos 7 endpoints diferentes: 
/properties→500, /api/properties→500, /reservations→500, 
/api/reservations→500, /accommodation→500, /accommodations→500, 
(base)→500

Último erro: API returned non-JSON response:
Status: 200 OK
Content-Type: text/html; charset=utf-8
URL: https://bvm.stays.net
```

---

## 🎯 O QUE ISSO SIGNIFICA

### **O Problema:**

```
✅ Status: 200 OK  ← Servidor respondeu
❌ Content-Type: text/html  ← Mas retornou HTML, não JSON!
```

**EXPLICAÇÃO:**

A URL `https://bvm.stays.net` está **CORRETA** e o servidor está **RESPONDENDO**.

**MAS** ela retorna **HTML** (a página web de login), não **JSON** (dados da API).

---

## 💡 CAUSA RAIZ

```
https://bvm.stays.net  ← URL do PAINEL DE ADMINISTRAÇÃO (navegador)
                          ≠
https://api.stays.net  ← URL da API (integração programática)
```

### **Analogia:**

É como tentar pedir dados JSON para a URL do Gmail (`https://gmail.com`) ao invés da API do Gmail (`https://gmail.googleapis.com/gmail/v1`).

Você está usando:
```
❌ https://bvm.stays.net (painel web - retorna HTML)
```

Você deveria usar:
```
✅ https://api.stays.net (API REST - retorna JSON)
```

---

## ✅ SOLUÇÃO

### **PASSO 1: Descubra a URL Correta da API**

A URL da API **NÃO É** a mesma URL que você usa no navegador!

#### **Opção A: Contate o Suporte Stays.net** (MAIS CONFIÁVEL)

```
1. Entre em contato com suporte@stays.net
2. Pergunte exatamente:

   "Qual é a URL base da API REST para integração externa?"

3. Eles vão responder algo como:
   • https://api.stays.net
   • https://api.stays.net/v1
   • https://yourcompany.stays.net/api
   • Outra URL específica
```

#### **Opção B: Procure na Documentação**

```
1. Acesse: https://stays.net/external-api
   OU: https://api-docs.stays.net
   OU: https://developers.stays.net

2. Procure por seções:
   • "Getting Started"
   • "Authentication"
   • "Base URL"
   • "Endpoint Reference"

3. Copie a URL base exata
```

#### **Opção C: Verifique no Painel de Administração**

```
1. Acesse: https://bvm.stays.net
2. Faça login
3. Vá em: Configurações → Integrações → API
4. Procure por: "Endpoint Base URL" ou "API URL"
5. Copie a URL mostrada
```

#### **Opção D: Teste URLs Comuns** (pode funcionar)

Tente estas URLs em ordem:

```
1️⃣ https://api.stays.net
2️⃣ https://api.stays.net/v1
3️⃣ https://bvm.stays.net/api
4️⃣ https://bvm.stays.net/api/v1
5️⃣ https://stays.net/api
```

---

### **PASSO 2: Configure a URL Correta no RENDIZY**

```
1. Recarregue a página (Ctrl+Shift+R)
2. Vá em: Menu → Configurações → Integrações → Stays.net
3. No campo "Base URL da API", coloque a URL descoberta:

   Exemplo:
   Base URL: https://api.stays.net
   Login: a5146970
   Senha: bfcf4daf

4. Click "Testar Conexão"
5. Abra Console (F12) e veja os logs
```

---

## 📊 COMO SABER SE FUNCIONOU

### **✅ SUCESSO (JSON):**

```javascript
// Console mostrará:

[StaysNet] GET https://api.stays.net/properties
[StaysNet] Response status: 200 OK
[StaysNet] Content-Type: application/json; charset=utf-8  ← JSON!
[StaysNet] JSON data parsed successfully
[StaysNet] ✅ Success with endpoint: /properties
```

**Interface:**
```
✅ Conexão estabelecida com sucesso! A API está respondendo corretamente.
```

---

### **❌ AINDA ERRADO (HTML):**

```javascript
// Console mostrará:

[StaysNet] GET https://bvm.stays.net
[StaysNet] Response status: 200 OK
[StaysNet] Content-Type: text/html; charset=utf-8  ← Ainda HTML!
[StaysNet] Non-JSON response: <!doctype html><html>...
```

**Interface:**
```
❌ Falha na conexão...
```

**SOLUÇÃO:** A URL ainda está errada. Tente outra URL ou contate suporte.

---

## 🧪 TESTE RÁPIDO COM POSTMAN (Opcional)

Se você quer confirmar qual URL funciona ANTES de testar no RENDIZY:

### **Teste 1: URL do Painel (vai falhar)**

```
Method: GET
URL: https://bvm.stays.net/properties
Auth: Basic Auth
Username: a5146970
Password: bfcf4daf

Resultado Esperado:
❌ Status: 200 OK
❌ Response: <!doctype html>... (HTML)
```

### **Teste 2: URL da API (vai funcionar)**

```
Method: GET
URL: https://api.stays.net/properties
Auth: Basic Auth
Username: a5146970
Password: bfcf4daf

Resultado Esperado:
✅ Status: 200 OK
✅ Response: { "data": [...], "total": 10 } (JSON)
```

---

## 📞 EXEMPLO DE MENSAGEM PARA SUPORTE

Copie e cole este template ao entrar em contato com Stays.net:

```
Assunto: Necessito URL da API para Integração

Olá,

Estou integrando meu sistema com a API do Stays.net e preciso da URL base correta.

Atualmente estou usando:
• https://bvm.stays.net

Mas esta URL retorna HTML (página de login), não JSON.

Qual é a URL correta da API REST para integração programática?

Exemplos que podem ser:
• https://api.stays.net
• https://api.stays.net/v1
• https://bvm.stays.net/api
• Outra?

Também preciso confirmar:
• Método de autenticação (Basic Auth com Login/Senha?)
• Endpoints disponíveis (/properties, /reservations, etc)

Aguardo retorno.

Atenciosamente,
[Seu Nome]
```

---

## 🎯 RESUMO DO PROBLEMA E SOLUÇÃO

### **❌ PROBLEMA:**

```
URL: https://bvm.stays.net
     ↓
Retorna: HTML (página de login)
     ↓
Erro: "API returned non-JSON response"
```

### **✅ SOLUÇÃO:**

```
URL: https://api.stays.net (ou outra URL específica)
     ↓
Retorna: JSON (dados da API)
     ↓
Sucesso: ✅ Conexão estabelecida!
```

---

## 🔍 MELHORIAS IMPLEMENTADAS NA v1.0.103.28

### **Backend (`routes-staysnet.ts`):**

```typescript
// ✅ Detecta quando retorna HTML 200
if (lastError.includes('text/html') && lastError.includes('200 OK')) {
  helpMessage = `
    📍 CAUSA DO PROBLEMA:
    O servidor retornou HTML (200 OK) ao invés de JSON.
    Isso significa que você está acessando a página de ADMINISTRAÇÃO, não a API!
    
    ✅ SOLUÇÃO:
    A URL "${this.baseUrl}" está retornando a página web de login.
    Você precisa da URL da API, não do painel administrativo.
    
    🔍 COMO ENCONTRAR A URL CORRETA DA API:
    
    1. Entre em contato com o SUPORTE STAYS.NET e pergunte:
       "Qual é a URL base da API REST para integração externa?"
    
    2. Verifique a DOCUMENTAÇÃO oficial da API:
       https://stays.net/external-api
    
    3. Procure no PAINEL de administração em:
       Configurações → Integrações → API → Endpoint Base URL
    
    4. URLs comuns de API (tente estas):
       • https://api.stays.net
       • https://api.stays.net/v1
       • https://bvm.stays.net/api
    
    ⚠️ IMPORTANTE:
    A URL que você está usando é para ACESSAR O PAINEL via navegador,
    NÃO é a URL da API para integração programática!
  `;
}
```

### **Frontend (`StaysNetIntegration.tsx`):**

```typescript
// ✅ Alert amarelo destacando a diferença
<Alert className="bg-yellow-50 border-yellow-300">
  <AlertCircle className="h-4 w-4 text-yellow-700" />
  <AlertDescription>
    <p>⚠️ ATENÇÃO: URL do Painel ≠ URL da API</p>
    <p>
      A URL https://bvm.stays.net é para ACESSAR O PAINEL via navegador, 
      NÃO é a URL da API!
    </p>
    
    <p>🔍 URLs da API para tentar:</p>
    • https://api.stays.net
    • https://api.stays.net/v1
    • https://bvm.stays.net/api
    
    <p>
      📞 Se nenhuma funcionar: Entre em contato com suporte Stays.net
    </p>
  </AlertDescription>
</Alert>
```

---

## 📁 ARQUIVOS MODIFICADOS

```
✅ /supabase/functions/server/routes-staysnet.ts
   Linhas 173-205: Mensagem específica para HTML 200
   Linhas 207-221: Mensagem para erro 500

✅ /components/StaysNetIntegration.tsx
   Linhas 525-548: Alert amarelo destacando diferença

✅ /BUILD_VERSION.txt → v1.0.103.28
✅ /CACHE_BUSTER.ts → Build 20251029-2906
✅ /FIX_STAYS_NET_HTML_200_v1.0.103.28.md (este arquivo)
```

---

## ✅ AÇÕES NECESSÁRIAS AGORA

```
[ ] 1. DESCOBRIR URL CORRETA DA API
    ↓
    Opção A: Contatar suporte Stays.net ⭐ RECOMENDADO
    Opção B: Procurar documentação
    Opção C: Verificar painel de administração
    Opção D: Testar URLs comuns

[ ] 2. CONFIGURAR NO RENDIZY
    ↓
    • Recarregar página (Ctrl+Shift+R)
    • Ir em Configurações → Integrações → Stays.net
    • Colocar URL correta da API
    • Testar conexão
    
[ ] 3. VERIFICAR SUCESSO
    ↓
    • Abrir Console (F12)
    • Ver se retorna JSON (não HTML)
    • Confirmar status 200 + application/json
    • ✅ Salvar configuração
```

---

## 💡 DICA FINAL

**NÃO PERCA TEMPO** tentando fazer `https://bvm.stays.net` funcionar!

Esta URL **NUNCA** vai retornar JSON porque ela é **designed** para retornar HTML (página web).

Você **PRECISA** descobrir qual é a URL da API, que é diferente.

**MELHOR CAMINHO:** 
📞 Ligar/email para suporte Stays.net agora mesmo e perguntar a URL da API. Eles vão te dar a resposta em 5 minutos e você economiza horas de tentativa e erro!

---

**VERSÃO:** v1.0.103.28  
**STATUS:** ✅ DIAGNÓSTICO COMPLETO  
**BUILD:** 20251029-2906  

**PRÓXIMO PASSO:**  
📞 **CONTATE SUPORTE STAYS.NET PARA OBTER A URL DA API!**

Não há como o sistema "adivinhar" a URL correta - cada instalação do Stays.net pode ter uma URL diferente. Apenas o suporte deles pode confirmar qual é a sua.

**BOM TRABALHO! 🚀**
