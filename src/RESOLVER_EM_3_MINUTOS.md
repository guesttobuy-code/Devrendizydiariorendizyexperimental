# ⚡ RESOLVER ERRO 401 EM 3 MINUTOS

**Problema:** API Key inválida  
**Solução:** 3 passos simples

---

## 📍 PASSO 1: Acessar Evolution Manager (30 segundos)

```
🌐 Abra no navegador:
https://evo.boravendermuito.com.br/manager
```

**Login:** Use suas credenciais de admin

---

## 🔑 PASSO 2: Criar/Editar API Key (2 minutos)

### 2.1 No menu lateral → Clique em **"Global API Keys"**

### 2.2 Procure pela key: `F7DE5EFFB66B...D8849741`

#### Se NÃO ENCONTRAR:
1. Clique em **"+ Nova Key"** ou **"Create"**
2. Nome: `RENDIZY`
3. **Marque TODAS** as caixas:
   ```
   ☑ Create Instance
   ☑ Delete Instance
   ☑ Manage Instance
   ☑ Send Message
   ☑ Fetch Instance
   ```
4. Clique em **"Criar"** ou **"Create"**
5. **COPIE a key** que aparecer (você NÃO verá novamente!)
6. Vá para PASSO 3

#### Se ENCONTRAR:
1. Clique em **"Editar"** ou **"Edit"**
2. **Marque TODAS** as caixas (veja lista acima)
3. Clique em **"Salvar"** ou **"Save"**
4. Aguarde 10 segundos
5. Vá para PASSO 3

---

## ✅ PASSO 3: Testar no RENDIZY (30 segundos)

### 3.1 Abra o RENDIZY
```
Configurações → Integrações → WhatsApp Business
```

### 3.2 Clique na aba **"Testar"** (primeira aba)

### 3.3 Preencha:
- **URL:** `https://evo.boravendermuito.com.br`
- **API Key:** [Cole a key que você copiou]
- **Instância:** `Rendizy`

### 3.4 Clique em **"Testar Credenciais"**

### 3.5 Aguarde os 3 testes:
```
✅ Teste 1: Conectividade
✅ Teste 2: Autenticação  
✅ Teste 3: Permissões
```

### 3.6 Se todos derem ✅ SUCESSO:
1. Vá na aba **"Configuração"**
2. Clique em **"Salvar Configurações"**
3. Vá na aba **"Status & Conexão"**
4. Clique em **"Gerar QR Code"**
5. **Escaneie o QR Code** com seu WhatsApp
6. ✅ **PRONTO!** WhatsApp conectado!

### 3.7 Se algum teste FALHAR (❌):
- **Teste 1 falhou:** URL incorreta
- **Teste 2 falhou:** API Key ainda inválida → Volte ao PASSO 2
- **Teste 3 falhou:** Sem permissões → Volte ao PASSO 2.2

---

## 🚨 SE AINDA DER ERRO 401

A API Key está incorreta. Existem apenas 2 possibilidades:

### A. Você NÃO tem acesso ao Evolution Manager
→ Peça ao administrador:
```
Oi [NOME],

Preciso de uma Global API Key do Evolution API com permissões para:
- Create Instance
- Delete Instance  
- Manage Instance
- Send Message

Servidor: https://evo.boravendermuito.com.br

Obrigado!
```

### B. Você TEM acesso mas a key continua inválida
→ Confirme:
1. Você está no servidor correto? (`evo.boravendermuito.com.br`)
2. Você marcou TODAS as 5 permissões?
3. Você aguardou 10 segundos após salvar?
4. Você copiou a key COMPLETA (sem espaços)?

---

## 💡 TESTE RÁPIDO NO TERMINAL

Se quiser confirmar que a key está válida ANTES de usar no RENDIZY:

```bash
curl -X GET \
  'https://evo.boravendermuito.com.br/instance/fetchInstances' \
  -H 'apikey: COLE_SUA_KEY_AQUI'
```

**Se retornar JSON com dados:** ✅ Key válida!  
**Se retornar 401 Unauthorized:** ❌ Key inválida - volte ao PASSO 2

---

## ⏱️ TEMPO TOTAL: ~3 MINUTOS

- Passo 1: 30 segundos
- Passo 2: 2 minutos  
- Passo 3: 30 segundos

**Total:** 3 minutos para resolver definitivamente o erro 401!

---

## 🎯 CHECKLIST RÁPIDO

- [ ] Acessei `evo.boravendermuito.com.br/manager`
- [ ] Criei/editei Global API Key
- [ ] Marquei TODAS as 5 permissões
- [ ] Copiei a key completa
- [ ] Testei no RENDIZY aba "Testar"
- [ ] Recebi ✅ em todos os testes
- [ ] Salvei as configurações
- [ ] Gerei o QR Code
- [ ] Conectei o WhatsApp

**Se marcou todos:** ✅ WhatsApp funcionando!  
**Se travou em algum:** ❌ Volte àquele passo

---

**IMPORTANTE:** Não é possível conectar o WhatsApp sem uma API Key válida. Não há "truque" ou "workaround". A API Key DEVE ser válida no servidor Evolution.
