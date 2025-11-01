# 🔍 DIAGNÓSTICO COMPLETO: POR QUE AINDA RETORNA HTML?

**v1.0.103.103** | **30/10/2025**

---

## ❌ PROBLEMA ATUAL

Mesmo após trocar de `/manager/` para `/`, a API ainda retorna HTML:

```
SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
```

---

## 🎯 3 CAUSAS POSSÍVEIS

### **1. Endpoint incorreto** 🔴
A URL base pode estar correta, mas o **caminho do endpoint** está errado.

**Exemplo:**
```
❌ https://evo.boravendermuito.com.br/chat/findChats/Rendizy
✅ https://evo.boravendermuito.com.br/message/findMessages/Rendizy
```

---

### **2. Credenciais inválidas** 🔴
A API Key ou Token estão incorretos, e a Evolution retorna HTML (página de erro/login).

**Sintomas:**
- Status HTTP: 401
- Ou retorna página HTML de login

---

### **3. Instância não existe ou não está conectada** 🔴
A instância "Rendizy" pode:
- Não existir
- Ter nome diferente (case-sensitive)
- Estar desconectada (precisa QR Code)

---

## 🧪 TESTE COMPLETO AGORA

Execute este teste que vai descobrir EXATAMENTE qual é o problema:

```bash
sh TESTE_COMPLETO_EVOLUTION_v1.0.103.103.sh
```

### **O que o teste faz:**

1. ✅ **Verifica se o servidor está online**
2. ✅ **Testa a API Key** (endpoint /instance/fetchInstances)
3. ✅ **Verifica se a instância "Rendizy" existe**
4. ✅ **Testa o Token** (endpoint /instance/connectionState)
5. ✅ **Testa 5 endpoints diferentes** para buscar conversas
6. ✅ **Identifica qual endpoint retorna JSON**
7. ✅ **Mostra um diagnóstico completo**

---

## 📋 RESULTADOS ESPERADOS

### **Cenário 1: API Key inválida**
```
❌ ERRO: Retornou HTML ao invés de JSON
📊 HTTP Status: 401
CAUSA: API Key inválida
```

**Solução:**
1. Acesse Evolution Manager
2. Vá em **Settings → API Key**
3. Copie a **Global API Key** correta
4. Me envie e eu atualizo

---

### **Cenário 2: Instância não encontrada**
```
❌ ERRO 404: Instância 'Rendizy' não encontrada
```

**Solução:**
1. Liste todas as instâncias disponíveis
2. Verifique o nome EXATO (case-sensitive)
3. Se não existir, crie a instância

---

### **Cenário 3: Endpoint incorreto**
```
🧪 Testando: https://evo.boravendermuito.com.br/chat/findChats/Rendizy
   ❌ 404 Not Found

🧪 Testando: https://evo.boravendermuito.com.br/message/findMessages/Rendizy
   ✅ JSON ENCONTRADO!
```

**Solução:**
Me envie qual endpoint funcionou e eu atualizo o código

---

### **Cenário 4: Instância desconectada**
```
✅ Instância encontrada
⚠️ Instância está DESCONECTADA (close)
```

**Solução:**
1. Conecte o WhatsApp via QR Code
2. Use o endpoint: `/instance/connect/Rendizy`

---

## 🚀 TESTE RÁPIDO NO NAVEGADOR

Abra no navegador (substitua XXX pela sua API Key):

```
https://evo.boravendermuito.com.br/instance/fetchInstances?apikey=4de7861e944e291b56fe9781d2b00b36
```

**O que esperar:**

✅ **Se retornar JSON:**
```json
[
  {
    "instance": {
      "instanceName": "Rendizy",
      "state": "open"
    }
  }
]
```
→ Credenciais OK, vá para Teste 3

❌ **Se retornar HTML:**
```html
<!doctype html>
<html>...
```
→ API Key INVÁLIDA

❌ **Se retornar erro 401:**
```json
{
  "error": "Unauthorized"
}
```
→ API Key INVÁLIDA

---

## 📊 ENDPOINTS COMUNS DA EVOLUTION API

Aqui estão os endpoints mais comuns (testados pelo script):

| Endpoint | Descrição |
|----------|-----------|
| `/instance/fetchInstances` | Listar instâncias (teste API Key) |
| `/instance/connectionState/{instance}` | Status da conexão |
| `/instance/connect/{instance}` | Obter QR Code |
| `/chat/findChats/{instance}` | Buscar conversas (método 1) |
| `/chat/fetchAllChats/{instance}` | Buscar conversas (método 2) |
| `/message/findMessages/{instance}` | Buscar mensagens |

---

## 🎯 AÇÃO IMEDIATA

### **Passo 1: Execute o teste**
```bash
sh TESTE_COMPLETO_EVOLUTION_v1.0.103.103.sh
```

### **Passo 2: Me envie os resultados**

Me envie a saída completa, especialmente:

1. ✅ **Status do TESTE 2** (Listar instâncias)
   - Se retornou JSON ou HTML
   - HTTP Status (200, 401, 404)

2. ✅ **Lista de instâncias** (se retornou JSON)
   - Nome exato da instância Rendizy

3. ✅ **Status do TESTE 3** (Status da instância)
   - Se está conectada (open) ou desconectada (close)

4. ✅ **Resultado do TESTE 4** (Endpoints de conversas)
   - Qual endpoint retornou JSON (se algum)

---

## 🔍 DEBUGGING AVANÇADO

Se o teste não resolver, tente acessar diretamente:

```bash
# 1. Listar instâncias (sem autenticação avançada)
curl -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  https://evo.boravendermuito.com.br/instance/fetchInstances

# 2. Se funcionar, testar status da instância
curl -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50" \
  https://evo.boravendermuito.com.br/instance/connectionState/Rendizy

# 3. Testar endpoint de conversas
curl -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Authorization: Bearer 0FF3641E80A6-453C-AB4E-28C2F2D01C50" \
  https://evo.boravendermuito.com.br/chat/findChats/Rendizy
```

---

## 📚 DOCUMENTAÇÃO EVOLUTION API

- **Documentação oficial:** https://doc.evolution-api.com
- **API Reference:** https://doc.evolution-api.com/v2/pt/get-started/introduction
- **Postman Collection:** Pode ter exemplos prontos

---

## ✅ CHECKLIST DE VERIFICAÇÃO

Antes de executar o teste, verifique:

- [ ] URL base: `https://evo.boravendermuito.com.br`
- [ ] Global API Key: `4de7861e944e291b56fe9781d2b00b36`
- [ ] Instance Name: `Rendizy` (case-sensitive)
- [ ] Instance Token: `0FF3641E80A6-453C-AB4E-28C2F2D01C50`
- [ ] Servidor está online
- [ ] Você tem acesso ao painel Evolution Manager

---

## 🎯 PRÓXIMOS PASSOS

**1. Execute o teste:**
```bash
sh TESTE_COMPLETO_EVOLUTION_v1.0.103.103.sh
```

**2. Me envie:**
- Saída completa do teste
- Especialmente os status HTTP de cada teste
- Se algum endpoint retornou JSON

**3. Eu vou:**
- Identificar o problema exato
- Corrigir o código em 2 minutos
- Fazer funcionar de vez!

---

**EXECUTE O TESTE AGORA E ME ENVIE OS RESULTADOS!** 🔍✨
