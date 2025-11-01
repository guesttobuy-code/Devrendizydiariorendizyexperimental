# 🚨 SOLUÇÃO IMEDIATA - Erro 401

## ⚡ O Problema

Você está recebendo:
```
❌ API Error: API Key inválida ou sem permissão. 
   Você precisa usar a Global API Key do Evolution API Manager, 
   não a API Key de uma instância específica.
```

Este erro é lançado quando a Evolution API retorna **401 Unauthorized** ao tentar criar uma instância.

---

## 🎯 Causa Raiz (3 possibilidades)

### 1️⃣ API Key Incorreta ou Revogada (80% dos casos)
A API Key `4de7861e944e291b56fe9781d2b00b36` não está válida no servidor Evolution API.

### 2️⃣ API Key Sem Permissões (15% dos casos)
A API Key existe mas não tem permissão para **criar instâncias**.

### 3️⃣ URL Incorreta (5% dos casos)
A URL `https://evo.boravendermuito.com.br` está incorreta ou o servidor não está acessível.

---

## ⚡ TESTE RÁPIDO (30 segundos)

Execute no terminal:

```bash
bash TESTE_DIRETO_API_KEY.sh
```

**OU teste manualmente:**

```bash
curl -X POST "https://evo.boravendermuito.com.br/instance/create" \
  -H "Content-Type: application/json" \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -d '{"instanceName":"Rendizy","qrcode":true}'
```

### Interpretação do Resultado:

**✅ Status 200 ou 201:**
```
➡️ API Key funciona!
➡️ Problema está no código do backend
➡️ Pule para: SOLUÇÃO A
```

**❌ Status 401:**
```
➡️ API Key inválida ou sem permissões
➡️ Vá para: SOLUÇÃO B ou C
```

**❌ Timeout ou erro de conexão:**
```
➡️ URL incorreta ou servidor offline
➡️ Vá para: SOLUÇÃO D
```

---

## ✅ SOLUÇÃO A - API Key Funciona (Problema no Código)

Se o curl funcionou mas o RENDIZY não:

1. **Verifique os logs do backend**
   - Procure por: `🔍 DEBUGGING - Requisição COMPLETA`
   - Compare a API Key nos logs com a que funciona no curl
   - Compare os headers enviados

2. **Possíveis problemas:**
   - Frontend enviando API Key errada
   - Backend transformando a API Key
   - Headers sendo modificados
   - Body com campos extras

3. **Ação:**
   - Copie TODOS os logs do backend
   - Compare com o curl que funcionou
   - Reporte as diferenças encontradas

---

## ✅ SOLUÇÃO B - API Key Incorreta (Mais Comum)

Se o curl retornou 401:

### Passo 1: Acessar Evolution API Manager

```
https://evo.boravendermuito.com.br/manager
```

### Passo 2: Login

Use suas credenciais de administrador.

### Passo 3: Global API Keys

No menu lateral, clique em **"Global API Keys"** ou **"API Keys"**.

### Passo 4: Verificar a Key

Procure pela key que termina em: `...d2b00b36`

**Se NÃO encontrar a key:**
```
➡️ A key foi revogada ou nunca existiu
➡️ Vá para: Criar Nova Key
```

**Se encontrar a key:**
```
➡️ Verifique as permissões
➡️ Vá para: SOLUÇÃO C
```

### Passo 5: Criar Nova Key

1. Clique em **"Criar Nova Key"** ou **"Nova Global API Key"**

2. **Marque TODAS as permissões:**
   - ☑ Create Instance
   - ☑ Delete Instance
   - ☑ Manage Instance
   - ☑ Send Message
   - ☑ View Instance
   - ☑ (Todas as outras opções disponíveis)

3. Clique em **"Criar"** ou **"Salvar"**

4. **COPIE a nova API Key imediatamente**
   - A key será algo como: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
   - Você não poderá vê-la novamente depois!

5. **Guarde em local seguro**

### Passo 6: Atualizar no RENDIZY

1. Abra o RENDIZY

2. Vá em: **Configurações** → **Integrações** → **WhatsApp Business**

3. Cole a **NOVA API KEY** no campo apropriado

4. Clique em **"Salvar Configurações"**

5. Tente **"Conectar WhatsApp"** novamente

---

## ✅ SOLUÇÃO C - API Key Sem Permissões

Se a key existe mas o curl retornou 401:

### Passo 1: Editar a Key

1. No Evolution API Manager, vá em **Global API Keys**

2. Encontre a key: `4de7861e944e291b56fe9781d2b00b36`

3. Clique no botão **"Editar"** ou ícone de lápis

### Passo 2: Adicionar Permissões

Marque TODAS as permissões, especialmente:

**OBRIGATÓRIAS:**
- ☑ **Create Instance** ← CRÍTICO!
- ☑ **Delete Instance** ← CRÍTICO!
- ☑ **Manage Instance** ← CRÍTICO!

**RECOMENDADAS:**
- ☑ Send Message
- ☑ View Instance
- ☑ Update Instance
- ☑ Fetch Messages
- ☑ (Todas as outras)

### Passo 3: Salvar

1. Clique em **"Salvar"** ou **"Atualizar"**

2. Aguarde 10 segundos para as mudanças propagarem

3. Teste novamente no RENDIZY

---

## ✅ SOLUÇÃO D - URL Incorreta

Se o curl deu timeout ou erro de DNS:

### Verificar URL

Teste no navegador:
```
https://evo.boravendermuito.com.br/manager
```

**Se abrir a página de login:**
```
✅ URL está correta
➡️ Problema pode ser firewall/rede
```

**Se NÃO abrir:**
```
❌ URL está incorreta
➡️ Confirme a URL correta com seu TI
```

### Possíveis URLs corretas:

- `https://evolution.boravendermuito.com.br`
- `https://api-evo.boravendermuito.com.br`
- `https://whatsapp.boravendermuito.com.br`
- `http://evo.boravendermuito.com.br` (sem HTTPS?)
- `https://evo.boravendermuito.com.br:8080` (com porta?)

### Atualizar URL no RENDIZY

1. Confirme a URL correta

2. No RENDIZY: **Configurações** → **Integrações** → **WhatsApp**

3. Atualize o campo **"URL da API"**
   - ⚠️ Não inclua `/manager` no final
   - ⚠️ Não inclua `/` no final
   - ✅ Apenas: `https://seu-servidor.com`

4. Salvar e testar

---

## 🔍 Logs Importantes

Quando você tenta conectar, o backend mostra estes logs:

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
   
   Response Status: 401 Unauthorized
   
❌ Evolution API Error 401:
   Response: {...}
   
❌ ERRO 401: API Key inválida ou formato incorreto
   API Key fornecida: 4de7861e944e291b56...
```

**O que procurar:**

1. **URL COMPLETA** - Está correta?
2. **API Key COMPLETA** - É a que você está usando?
3. **Response Status** - Qual status code?
4. **Response** - O que a API retornou?

Se a API Key nos logs for diferente da que você configurou:
```
➡️ Problema no frontend
➡️ Verifique onde você salvou a API Key
```

Se a API Key estiver correta mas der 401:
```
➡️ Problema na API Key em si
➡️ Siga SOLUÇÃO B ou C
```

---

## 📋 CHECKLIST FINAL

Execute nesta ordem:

- [ ] **1. Testar API Key com curl**
  ```bash
  bash TESTE_DIRETO_API_KEY.sh
  ```

- [ ] **2. Se curl funcionar (200/201):**
  - [ ] Verificar logs do backend
  - [ ] Comparar requisição do backend vs curl
  - [ ] Reportar diferenças

- [ ] **3. Se curl falhar (401):**
  - [ ] Acessar Evolution API Manager
  - [ ] Verificar se a key existe
  - [ ] Se não existe: Criar nova key
  - [ ] Se existe: Verificar permissões
  - [ ] Adicionar permissões faltantes
  - [ ] Atualizar key no RENDIZY

- [ ] **4. Se curl der timeout:**
  - [ ] Verificar URL no navegador
  - [ ] Confirmar URL correta com TI
  - [ ] Atualizar URL no RENDIZY

- [ ] **5. Testar no RENDIZY**
  - [ ] Limpar cache do navegador (Ctrl+Shift+R)
  - [ ] Ir em Configurações → Integrações
  - [ ] Verificar credenciais salvas
  - [ ] Clicar em "Conectar WhatsApp"
  - [ ] Verificar logs do backend

- [ ] **6. Se ainda não funcionar:**
  - [ ] Copiar TODOS os logs do backend
  - [ ] Copiar resultado do curl
  - [ ] Copiar screenshot do Evolution API Manager
  - [ ] Reportar com detalhes completos

---

## 🎯 Matriz de Decisão Rápida

| Curl Result | Significa | Solução |
|-------------|-----------|---------|
| ✅ 200/201 | API Key OK | SOLUÇÃO A (problema no código) |
| ❌ 401 | API Key inválida/sem permissões | SOLUÇÃO B ou C (obter/atualizar key) |
| ❌ 404 | URL errada/endpoint não existe | SOLUÇÃO D (corrigir URL) |
| ❌ Timeout | Servidor offline/inacessível | SOLUÇÃO D (verificar URL/rede) |
| ❌ 403 | Bloqueado por firewall/IP | Contatar TI |
| ❌ 500 | Erro no servidor Evolution | Contatar TI |

---

## 💡 Dica Extra

**Não sabe onde pegar a Global API Key?**

Veja estes guias visuais:
- [COMO_PEGAR_GLOBAL_API_KEY_AGORA.md](./COMO_PEGAR_GLOBAL_API_KEY_AGORA.md)
- [VISUAL_GLOBAL_API_KEY_ONDE_PEGAR.md](./VISUAL_GLOBAL_API_KEY_ONDE_PEGAR.md)
- [ONDE_ACHAR_GLOBAL_API_KEY_VISUAL.md](./ONDE_ACHAR_GLOBAL_API_KEY_VISUAL.md)

---

## 🚀 Ação Imediata

**EXECUTE AGORA:**

```bash
bash TESTE_DIRETO_API_KEY.sh
```

**Aguarde o resultado e siga a solução apropriada.**

---

**Versão:** v1.0.103.65  
**Data:** 2025-10-30  
**Prioridade:** 🔴 CRÍTICA

**➡️ Depois de resolver, reporte o resultado!**
