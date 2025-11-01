# 🔧 Fix: Erro 401 Unauthorized WhatsApp v1.0.103.51

**Data:** 29 de Outubro de 2025  
**Versão:** v1.0.103.51  
**Status:** 🔧 Em Correção

---

## 🎯 ERRO IDENTIFICADO

**Mensagem:**
```json
{
  "status": 401,
  "error": "Unauthorized",
  "response": {
    "message": "Unauthorized"
  }
}
```

**Onde:** Ao tentar gerar QR Code no WhatsApp

**Causa:** API Key não está sendo aceita pela Evolution API

---

## 🔍 ANÁLISE DO PROBLEMA

### Erro 401 significa:

1. ❌ **API Key incorreta** - Key fornecida não existe no servidor
2. ❌ **Formato de header errado** - Evolution API não reconhece o header
3. ❌ **API Key expirada** - Key foi revogada ou modificada
4. ❌ **Servidor configurado diferente** - Autenticação customizada

---

## ✅ CORREÇÕES APLICADAS

### 1. Múltiplos Formatos de Header

**ANTES:**
```typescript
const headers = {
  'Content-Type': 'application/json',
  'apikey': config.apiKey,  // Só um formato
};
```

**AGORA:**
```typescript
const headers = {
  'Content-Type': 'application/json',
  'apikey': config.apiKey,           // ✅ Evolution API v1
  'api-key': config.apiKey,          // ✅ Formato alternativo
  'Authorization': `Bearer ${config.apiKey}`, // ✅ Bearer token
};
```

**Benefício:** Compatível com todas as versões da Evolution API

---

### 2. Logs Detalhados de Autenticação

```typescript
console.log(`📡 Evolution API Request:`);
console.log(`   API Key: ${config.apiKey.substring(0, 15)}...`);
console.log(`   Headers:`, {
  'apikey': `${config.apiKey.substring(0, 15)}...`,
  'api-key': `${config.apiKey.substring(0, 15)}...`,
  'Authorization': `Bearer ${config.apiKey.substring(0, 15)}...`
});

// Se 401
if (response.status === 401) {
  console.error(`❌ ERRO 401: API Key inválida ou formato incorreto`);
  console.error(`   API Key fornecida: ${config.apiKey.substring(0, 20)}...`);
  console.error(`   Confirme com seu TI se a API Key está correta`);
}
```

---

## 🧪 TESTES NECESSÁRIOS

### Teste 1: Verificar API Key com TI

**Perguntar ao TI:**
```
1. A API Key está correta?
   Fornecida: F7DE5EFFB66B-4E43-B11F-F0D5D8849741
   
2. Qual o formato do header de autenticação?
   - apikey (minúsculo)
   - api-key (com hífen)
   - Authorization: Bearer
   - Outro?

3. A API Key tem permissões para criar instâncias?

4. Há alguma restrição de IP ou domínio?
```

---

### Teste 2: Testar API Key via cURL

**No terminal:**
```bash
# Teste 1: Header apikey
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "apikey: F7DE5EFFB66B-4E43-B11F-F0D5D8849741" \
  -H "Content-Type: application/json"

# Teste 2: Header api-key
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "api-key: F7DE5EFFB66B-4E43-B11F-F0D5D8849741" \
  -H "Content-Type: application/json"

# Teste 3: Authorization Bearer
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "Authorization: Bearer F7DE5EFFB66B-4E43-B11F-F0D5D8849741" \
  -H "Content-Type: application/json"
```

**Se retornar 200:** API Key está correta naquele formato  
**Se retornar 401:** API Key incorreta ou formato errado  
**Se retornar 404:** Endpoint não existe (URL errada)

---

### Teste 3: Verificar no Manager da Evolution API

**Acessar:**
```
https://evo.boravendermuito.com.br/manager
```

**Verificar:**
1. Login no Manager
2. Ir em "Configurações" ou "API Keys"
3. Verificar se a key `F7DE5...` está listada
4. Ver qual o formato de autenticação configurado
5. Ver se há data de expiração

---

## 🔍 POSSÍVEIS CAUSAS

### Causa 1: API Key Incorreta

**Verificar:**
- ✅ Key copiada completamente
- ✅ Sem espaços antes/depois
- ✅ Sem quebras de linha
- ✅ Case-sensitive (maiúsculas/minúsculas)

**Teste:**
```javascript
// No console do navegador
const key = "F7DE5EFFB66B-4E43-B11F-F0D5D8849741";
console.log('Tamanho:', key.length);
console.log('Tem espaços:', key.includes(' '));
console.log('Key:', key);
```

---

### Causa 2: Formato de Header Errado

**Evolution API v1:**
```javascript
headers: {
  'apikey': 'SUA_KEY_AQUI'
}
```

**Evolution API v2:**
```javascript
headers: {
  'api-key': 'SUA_KEY_AQUI'
}
```

**Formato Bearer:**
```javascript
headers: {
  'Authorization': 'Bearer SUA_KEY_AQUI'
}
```

**Solução:** Backend agora envia todos os 3 formatos

---

### Causa 3: API Key Expirada/Revogada

**Verificar:**
1. Acessar Manager da Evolution API
2. Ver se a key ainda está ativa
3. Gerar nova key se necessário

**Se precisar de nova key:**
```
1. Acesse Manager
2. Vá em API Keys
3. Gere nova key
4. Copie e cole no RENDIZY
5. Salve configurações
6. Teste novamente
```

---

### Causa 4: Servidor com Configuração Customizada

**Perguntar ao TI:**
```
O servidor Evolution API tem:
- Autenticação customizada?
- Proxy reverso modificando headers?
- WAF bloqueando requests?
- Restrição de origem (CORS)?
```

---

## 📋 CHECKLIST DE DEBUG

### Passo 1: Verificar Dados Salvos
- [ ] Abrir Console (F12)
- [ ] Digitar: `localStorage.getItem('rendizy_whatsapp_config')`
- [ ] Verificar se API Key está correta

### Passo 2: Ver Logs do Backend
- [ ] Console mostra: "📡 Evolution API Request"
- [ ] Console mostra: "API Key: F7DE5..."
- [ ] Console mostra: "Headers:" com 3 formatos
- [ ] Console mostra: "Response Status: 401"
- [ ] Console mostra: "❌ ERRO 401: API Key inválida"

### Passo 3: Testar via cURL
- [ ] Executar 3 testes (apikey, api-key, Bearer)
- [ ] Ver qual formato retorna 200
- [ ] Se todos retornam 401: Key incorreta

### Passo 4: Confirmar com TI
- [ ] API Key está correta?
- [ ] Formato do header?
- [ ] Permissões da key?
- [ ] Restrições de acesso?

---

## 🎯 SOLUÇÕES POR CENÁRIO

### Cenário 1: API Key Errada

**Solução:**
1. Pedir nova API Key ao TI
2. Copiar completamente (sem espaços)
3. Colar no RENDIZY
4. Salvar
5. Testar

---

### Cenário 2: Formato de Header Errado

**Solução:**
1. Backend já envia 3 formatos ✅
2. Se ainda der erro, perguntar ao TI qual formato usar
3. Modificar código para usar apenas aquele formato

---

### Cenário 3: Permissões Insuficientes

**Solução:**
1. TI precisa dar permissão à API Key para:
   - Criar instâncias
   - Gerar QR Codes
   - Gerenciar conexões

---

### Cenário 4: Restrição de IP/Domínio

**Solução:**
1. TI precisa adicionar domínio do RENDIZY na whitelist
2. Ou remover restrição de IP temporariamente para teste

---

## 🔧 MODIFICAÇÃO DE EMERGÊNCIA

Se os 3 formatos não funcionarem, podemos adicionar um campo no RENDIZY para o usuário escolher o formato:

```typescript
// Adicionar no formulário
<Select>
  <option value="apikey">apikey (Evolution v1)</option>
  <option value="api-key">api-key (Alternativo)</option>
  <option value="bearer">Authorization Bearer</option>
</Select>

// No backend
const headers: Record<string, string> = {
  'Content-Type': 'application/json',
};

if (authFormat === 'apikey') {
  headers['apikey'] = config.apiKey;
} else if (authFormat === 'api-key') {
  headers['api-key'] = config.apiKey;
} else if (authFormat === 'bearer') {
  headers['Authorization'] = `Bearer ${config.apiKey}`;
}
```

---

## 📞 FALAR COM O TI

**Envie esta mensagem ao TI:**

```
Olá! Estou configurando a integração WhatsApp no RENDIZY usando
a Evolution API em https://evo.boravendermuito.com.br

Estou recebendo erro 401 Unauthorized ao tentar gerar QR Code.

Dados que estou usando:
- URL: https://evo.boravendermuito.com.br
- Instância: rendizy-admin-master
- API Key: F7DE5EFFB66B-4E43-B11F-F0D5D8849741

Perguntas:
1. A API Key está correta e ativa?
2. Qual o formato correto do header de autenticação?
   (apikey, api-key ou Authorization Bearer?)
3. A API Key tem permissão para criar instâncias?
4. Há alguma restrição de IP ou domínio?
5. Posso testar a API Key via cURL?

Agradeço a ajuda!
```

---

## ✅ RESULTADO ESPERADO APÓS CORREÇÃO

**Quando API Key estiver correta:**

1. ✅ Backend envia request com headers corretos
2. ✅ Evolution API aceita autentica��ão
3. ✅ Instância é criada ou verificada
4. ✅ QR Code é gerado
5. ✅ QR Code aparece na tela
6. ✅ Escanear com WhatsApp
7. ✅ Conectado!

---

## 📊 PRÓXIMOS PASSOS

### Imediato (Fazer Agora):

1. ✅ Ver logs do backend (Console F12)
2. ✅ Copiar mensagem de erro completa
3. ✅ Testar API Key via cURL
4. ✅ Falar com TI usando mensagem acima

### Se API Key Estiver Correta:

1. ✅ Verificar formato de header com TI
2. ✅ Ajustar código se necessário
3. ✅ Testar novamente

### Se API Key Estiver Incorreta:

1. ✅ Pedir nova API Key ao TI
2. ✅ Configurar no RENDIZY
3. ✅ Testar

---

**Versão:** v1.0.103.51  
**Status:** 🔧 Correção Aplicada  
**Última Atualização:** 29/10/2025

**Teste os comandos cURL e fale com seu TI!** 🔍
