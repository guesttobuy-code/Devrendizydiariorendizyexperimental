# 🔍 DIAGNÓSTICO ERRO 401 - v1.0.103.65

## 📅 Data: 2025-10-30

## 🐛 PROBLEMA PERSISTENTE

Erro 401 continua aparecendo mesmo após a correção do campo `token`:

```
❌ API Error: API Key inválida ou sem permissão
```

---

## 🔬 ANÁLISE DO PROBLEMA

### O Que Foi Feito Até Agora

**v1.0.103.64:**
- ✅ Removido campo `token` do body
- ✅ Mantido API Key apenas nos headers

**Resultado:** Erro 401 PERSISTE

### Hipóteses

1. **API Key está realmente incorreta**
   - Valor fornecido: `4de7861e944e291b56fe9781d2b00b36`
   - Pode estar desatualizada ou revogada

2. **API Key sem permissões necessárias**
   - Pode ter permissão de leitura (GET)
   - Mas NÃO ter permissão de escrita (POST/DELETE)

3. **Evolution API não aceita o formato do header**
   - Testamos: `apikey`, `api-key`, `Authorization: Bearer`
   - Pode precisar de outro formato específico

4. **URL incorreta**
   - URL fornecida: `https://evo.boravendermuito.com.br`
   - Pode estar errada ou inacessível

5. **Instância com nome incorreto**
   - Nome fornecido: `Rendizy`
   - Pode precisar ser exatamente como está no servidor

---

## 🧪 PASSOS PARA DIAGNÓSTICO

### Passo 1: Teste Manual com curl

Execute o script de teste completo:

```bash
bash TESTE_COMPLETO_API_KEY.sh
```

Este script testa:
1. Listar instâncias (GET) - Testa se a API Key funciona para leitura
2. Testar header alternativo (Authorization Bearer)
3. Verificar estado da instância
4. Criar instância (POST) - Testa se a API Key funciona para escrita

**Resultado esperado:**

Se TESTE 1 PASSA mas TESTE 4 FALHA com 401:
```
➡️ API Key tem permissão de LEITURA mas NÃO de ESCRITA
➡️ Precisa de uma API Key com mais permissões
```

Se TESTE 1 JÁ FALHA com 401:
```
➡️ API Key está incorreta/revogada
➡️ Ou URL está errada
➡️ Ou Evolution API não está acessível
```

---

### Passo 2: Verificar Logs do Backend

Com os novos logs detalhados adicionados em **v1.0.103.65**, você verá:

```
🔍 DEBUGGING - Requisição COMPLETA:
   URL COMPLETA: https://evo.boravendermuito.com.br/instance/create
   Method: POST
   Headers COMPLETOS: {
     "Content-Type": "application/json",
     "apikey": "4de7861e944e291b56fe9781d2b00b36",
     "api-key": "4de7861e944e291b56fe9781d2b00b36",
     "Authorization": "Bearer 4de7861e944e291b56fe9781d2b00b36"
   }
   API Key COMPLETA (ATENÇÃO LOGS): 4de7861e944e291b56fe9781d2b00b36
   Body COMPLETO: {
     "instanceName": "Rendizy",
     "qrcode": true,
     "integration": "WHATSAPP-BAILEYS"
   }
```

**Análise:**
- Se a API Key nos logs estiver diferente do esperado → **Problema no frontend**
- Se a API Key estiver correta mas der 401 → **Problema na Evolution API**

---

### Passo 3: Testar Diretamente na Evolution API

Acesse o Evolution API Manager:

```
https://evo.boravendermuito.com.br/manager
```

1. **Login** com suas credenciais
2. Vá em **Global API Keys**
3. Verifique se a key `4de7861e944e291b56fe9781d2b00b36` existe
4. Verifique as **permissões** dela:
   - ✅ Deve ter: Create Instance
   - ✅ Deve ter: Delete Instance
   - ✅ Deve ter: Manage Instance

5. Se a key não estiver lá ou estiver revogada:
   - **Crie uma nova** Global API Key
   - **Copie** a nova key
   - **Atualize** no RENDIZY

---

## 🎯 SOLUÇÕES POSSÍVEIS

### Solução 1: API Key Incorreta

**Se a API Key está errada/revogada:**

1. Acesse Evolution API Manager
2. Crie uma nova Global API Key
3. Copie a key
4. Cole no RENDIZY

**Atualização no RENDIZY:**
```
Configurações → Integrações → WhatsApp Business
API Key: [NOVA KEY AQUI]
Salvar Configurações
```

---

### Solução 2: API Key Sem Permissões

**Se a API Key tem permissão limitada:**

1. Acesse Evolution API Manager
2. Vá em Global API Keys
3. Edite a key existente
4. Marque TODAS as permissões:
   - ✅ Create Instance
   - ✅ Delete Instance
   - ✅ Manage Instance
   - ✅ Send Message
   - ✅ View Instance
5. Salvar

**Teste novamente no RENDIZY**

---

### Solução 3: Formato do Header Incorreto

**Se a Evolution API não aceita os headers que estamos enviando:**

Precisamos descobrir o formato correto. Teste manualmente:

```bash
# Formato 1: apikey
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36"

# Formato 2: api-key
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "api-key: 4de7861e944e291b56fe9781d2b00b36"

# Formato 3: Authorization Bearer
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "Authorization: Bearer 4de7861e944e291b56fe9781d2b00b36"

# Formato 4: x-api-key (comum em algumas APIs)
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "x-api-key: 4de7861e944e291b56fe9781d2b00b36"
```

**Qual funciona?** Use esse formato no backend.

---

### Solução 4: URL Incorreta

**Se a URL está errada:**

Verifique se o servidor está acessível:

```bash
curl -I https://evo.boravendermuito.com.br
```

**Resultado esperado:**
```
HTTP/2 200
```

Se der timeout ou erro de DNS:
```
➡️ URL está incorreta ou servidor está offline
```

**Possíveis URLs corretas:**
- `https://evo.boravendermuito.com.br`
- `https://evolution.boravendermuito.com.br`
- `https://api.boravendermuito.com.br`
- `http://evo.boravendermuito.com.br` (sem HTTPS?)

---

### Solução 5: Nome da Instância Incorreto

**Se o nome está errado:**

Liste as instâncias existentes:

```bash
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36"
```

**Resultado esperado:**
```json
[
  {
    "instance": {
      "instanceName": "Rendizy"
    }
  }
]
```

**Se o nome for diferente** (ex: `rendizy`, `RENDIZY`, `rendizy-admin`):
```
➡️ Use EXATAMENTE o nome que aparece na lista
```

---

## 🔧 ALTERAÇÕES EM v1.0.103.65

### Arquivo: `/supabase/functions/server/routes-chat.ts`

**Adicionado:** Logs detalhados ANTES de enviar a requisição

```typescript
// Log COMPLETO antes de enviar
console.log(`🔍 DEBUGGING - Requisição COMPLETA:`);
console.log(`   URL COMPLETA: ${url}`);
console.log(`   Method: ${method}`);
console.log(`   Headers COMPLETOS:`, JSON.stringify(headers, null, 2));
console.log(`   API Key COMPLETA (ATENÇÃO LOGS):`, config.apiKey);
if (body && method !== 'GET') {
  console.log(`   Body COMPLETO:`, JSON.stringify(body, null, 2));
}
```

**Por que isso ajuda:**
- Vemos EXATAMENTE o que está sendo enviado
- Podemos comparar com requests que funcionam
- Identificamos se o problema é no backend ou na Evolution API

⚠️ **ATENÇÃO:** Esses logs mostram a API Key COMPLETA. Não compartilhe logs publicamente!

---

## 📋 CHECKLIST DE DIAGNÓSTICO

Execute nesta ordem:

- [ ] **1. Executar script de teste**
  ```bash
  bash TESTE_COMPLETO_API_KEY.sh
  ```

- [ ] **2. Analisar resultado dos testes**
  - Se TESTE 1 falhar → API Key incorreta ou URL errada
  - Se TESTE 1 passar mas TESTE 4 falhar → API Key sem permissões

- [ ] **3. Acessar Evolution API Manager**
  ```
  https://evo.boravendermuito.com.br/manager
  ```

- [ ] **4. Verificar Global API Keys**
  - Key existe?
  - Key está ativa?
  - Key tem permissões necessárias?

- [ ] **5. Testar no RENDIZY com logs detalhados**
  - Reiniciar backend
  - Tentar conectar WhatsApp
  - Ler logs do terminal
  - Copiar mensagem de erro COMPLETA

- [ ] **6. Comparar logs com curl**
  - Request do curl funcionou?
  - Request do backend falhou?
  - Qual a diferença?

---

## 🎯 AÇÃO IMEDIATA

**Execute AGORA:**

```bash
# 1. Teste rápido - A API Key funciona?
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36"
```

**Resultado:**

✅ **Status 200 + lista de instâncias:**
```
➡️ API Key funciona para GET
➡️ Problema pode ser nas permissões para POST
➡️ OU formato do header diferente entre GET e POST
```

❌ **Status 401:**
```
➡️ API Key está incorreta, revogada ou sem permissão
➡️ OU URL está errada
➡️ Verifique no Evolution API Manager
```

❌ **Timeout ou erro de conexão:**
```
➡️ URL está incorreta
➡️ OU servidor está offline
➡️ OU firewall bloqueando
```

---

## 📊 MATRIZ DE DECISÃO

| TESTE 1 (GET) | TESTE 4 (POST) | DIAGNÓSTICO | SOLUÇÃO |
|---------------|----------------|-------------|---------|
| ✅ 200 | ✅ 201 | Tudo OK! | Nenhuma |
| ✅ 200 | ❌ 401 | Permissões insuficientes | Adicionar permissões na key |
| ❌ 401 | - | API Key incorreta | Obter nova API Key |
| ❌ Timeout | - | URL incorreta/servidor offline | Verificar URL |
| ❌ 404 | - | Endpoint não existe | Verificar URL/versão API |

---

## 📚 ARQUIVOS CRIADOS

1. **[TESTE_COMPLETO_API_KEY.sh](./TESTE_COMPLETO_API_KEY.sh)** - Script de teste completo
2. **[DIAGNOSTICO_ERRO_401_v1.0.103.65.md](./DIAGNOSTICO_ERRO_401_v1.0.103.65.md)** - Este documento

---

## 🚀 PRÓXIMOS PASSOS

Após executar o diagnóstico:

1. **Se identificar o problema:**
   - Aplicar a solução apropriada
   - Testar novamente
   - Documentar a solução

2. **Se não identificar o problema:**
   - Copiar TODOS os logs
   - Copiar resultado do script de teste
   - Reportar com detalhes completos

---

**Versão:** v1.0.103.65  
**Data:** 2025-10-30  
**Status:** 🔍 **DIAGNÓSTICO DETALHADO ATIVADO**

---

**Execute o script de teste e reporte os resultados!**
