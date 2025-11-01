# 📱 Onde Pegar o Nome da Instância WhatsApp

**Versão:** v1.0.103.45  
**Data:** 29 de Outubro de 2025  

---

## 🎯 SUA PERGUNTA

> **"Onde eu pego o nome da instância que me pede?"**

---

## 📍 RESPOSTA RÁPIDA

O **Nome da Instância** é um **identificador único que VOCÊ MESMO cria** quando configura a Evolution API pela primeira vez.

**NÃO** é um nome que você busca ou copia de algum lugar - **VOCÊ INVENTA ELE!**

---

## 🔍 O QUE É O NOME DA INSTÂNCIA?

É como um "apelido" ou "código único" para sua conexão WhatsApp:

```
Exemplos válidos:
✅ rendizy-principal
✅ rendizy-org-123  
✅ sua-casa-rende-mais
✅ whatsapp-rendizy
✅ rendizy-producao
```

**Regras:**
- Apenas letras, números e hífens (-)
- Sem espaços
- Sem caracteres especiais (@, #, %, etc)
- Sem acentos

---

## 📝 ONDE VOCÊ ESCOLHE O NOME DA INSTÂNCIA

### 🎯 Cenário 1: Primeira Vez (Instância ainda não existe)

Você está configurando pela **primeira vez** no RENDIZY:

```
1. Vá em: Configurações > Integrações > WhatsApp Business

2. Na aba "Configuração", você verá 3 campos:

   ┌─────────────────────────────────────────────┐
   │ URL da Evolution API                        │
   │ https://api.evolutionapi.com                │ ← URL do servidor
   └─────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────┐
   │ Nome da Instância                           │
   │ rendizy-org-123                             │ ← VOCÊ ESCOLHE ESTE NOME!
   └─────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────┐
   │ API Key                                     │
   │ ••••••••••••••••••••                        │ ← Chave de autenticação
   └─────────────────────────────────────────────┘

3. No campo "Nome da Instância", DIGITE UM NOME QUALQUER que você queira usar.
   Exemplo: "rendizy-principal"

4. Este nome será usado para identificar sua conexão WhatsApp.
```

**IMPORTANTE:**  
- É só um identificador interno  
- Não precisa ser igual ao nome da sua empresa  
- Pode ser qualquer coisa que faça sentido pra você  

---

### 🎯 Cenário 2: Já Criou Instância Antes (Painel Evolution API)

Se você já criou uma instância **DIRETAMENTE no painel da Evolution API**, você precisa usar o **MESMO NOME** que criou lá:

```
1. Faça login no painel da Evolution API
   URL: https://api.evolutionapi.com (ou o endereço do seu servidor)

2. Vá em "Instâncias" ou "Instances"

3. Você verá uma lista com as instâncias criadas:

   ┌─────────────────────────────────────────────┐
   │ MINHAS INSTÂNCIAS                           │
   ├─────────────────────────────────────────────┤
   │ 📱 rendizy-producao      [Conectada]       │
   │ 📱 teste-whatsapp        [Desconectada]    │
   │ 📱 minha-empresa-zap     [Conectada]       │
   └─────────────────────────────────────────────┘

4. Copie o NOME EXATO de uma das instâncias (Ex: "rendizy-producao")

5. Cole no campo "Nome da Instância" no RENDIZY
```

**ATENÇÃO:**  
- O nome deve ser **EXATAMENTE IGUAL** ao que está no painel Evolution API  
- Caso contrário, a conexão não funcionará  

---

## 🆕 CRIANDO UMA NOVA INSTÂNCIA

### Opção A: Criar Pelo RENDIZY (Recomendado - Quando Backend Estiver Pronto)

Quando o backend estiver implementado, o RENDIZY criará automaticamente a instância pra você:

```
1. Preencha os 3 campos:
   - URL da Evolution API
   - Nome da Instância (VOCÊ INVENTA)
   - API Key

2. Clique em "Salvar Configurações"

3. Vá na aba "Status & Conexão"

4. Clique em "Gerar QR Code"

5. O RENDIZY cria a instância automaticamente na Evolution API
   usando o nome que você digitou
```

---

### Opção B: Criar Manualmente no Painel Evolution API

Se preferir criar manualmente primeiro:

```
1. Acesse o painel Evolution API
   https://api.evolutionapi.com

2. Vá em "Criar Nova Instância" ou "New Instance"

3. Escolha um nome para sua instância
   Exemplo: "rendizy-principal"

4. Clique em "Criar"

5. A Evolution API irá:
   ✅ Criar a instância
   ✅ Gerar um QR Code
   ✅ Aguardar você escanear

6. Copie o nome que você criou

7. Cole no RENDIZY em: Configurações > Integrações > WhatsApp
```

---

## 🔐 RESUMO DOS 3 CAMPOS

| Campo | O que é | Onde pegar |
|-------|---------|------------|
| **URL da Evolution API** | Endereço do servidor | Fornecido pelo provedor Evolution API<br>Ex: https://api.evolutionapi.com |
| **Nome da Instância** | Identificador único | **VOCÊ INVENTA!**<br>Ex: rendizy-principal |
| **API Key** | Chave de autenticação | Fornecida pelo provedor Evolution API<br>Ex: B6D03B6C... |

---

## 💡 EXEMPLO PRÁTICO COMPLETO

Imagine que você contratou a Evolution API e recebeu:

```
Olá! Aqui estão seus dados de acesso:

URL do servidor: https://api.evolutionapi.com
API Key: B6D03B6C-9F19-4884-B025-08D51B3D7F99

Agora você pode criar suas instâncias!
```

**Como configurar no RENDIZY:**

```
Passo 1: Vá em Configurações > Integrações > WhatsApp

Passo 2: Preencha:

┌─────────────────────────────────────────────┐
│ URL da Evolution API                        │
│ https://api.evolutionapi.com                │ ← Cole a URL que recebeu
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Nome da Instância                           │
│ rendizy-principal                           │ ← VOCÊ ESCOLHE! (qualquer nome)
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ API Key                                     │
│ B6D03B6C-9F19-4884-B025-08D51B3D7F99       │ ← Cole a API Key que recebeu
└─────────────────────────────────────────────┘

Passo 3: Clique em "Salvar Configurações"

Passo 4: Vá na aba "Status & Conexão" e clique em "Gerar QR Code"
```

---

## ❓ PERGUNTAS FREQUENTES

### P: Posso ter várias instâncias?
**R:** Sim! Cada organização pode ter sua própria instância com nome único.

Exemplos:
- Organização A: `rendizy-org-001`
- Organização B: `rendizy-org-002`
- Produção: `rendizy-producao`
- Testes: `rendizy-testes`

---

### P: O que acontece se eu errar o nome?
**R:** Se você digitar um nome que não existe na Evolution API:
- ❌ A conexão falhará
- ❌ O QR Code não será gerado
- ✅ Solução: Verifique se o nome está correto ou crie uma nova instância com este nome

---

### P: Posso mudar o nome depois?
**R:** Não. Cada instância tem um nome fixo. Se quiser mudar:
1. Desconecte a instância atual
2. Crie uma nova com o novo nome
3. Gere novo QR Code
4. Escaneie novamente

---

### P: Precisa ter "rendizy" no nome?
**R:** NÃO! Pode ser qualquer nome:
- ✅ `minha-empresa`
- ✅ `whatsapp-atendimento`
- ✅ `chat-principal`
- ✅ `instancia-001`

---

## 🎯 RESUMO FINAL

### Nome da Instância é:
✅ **Um identificador único que VOCÊ escolhe**  
✅ **Como um "apelido" para sua conexão WhatsApp**  
✅ **Criado por você quando configura pela primeira vez**  

### Nome da Instância NÃO é:
❌ Algo que você busca em algum lugar  
❌ Gerado automaticamente pelo sistema  
❌ Igual ao número do WhatsApp  
❌ Fornecido pela Evolution API  

---

## 🚀 PRÓXIMO PASSO

Agora que você entendeu, vá em:

```
Configurações > Integrações > WhatsApp Business
```

E preencha os 3 campos:
1. **URL da Evolution API** ← Fornecida pelo provedor
2. **Nome da Instância** ← **VOCÊ ESCOLHE!** (Ex: "rendizy-principal")
3. **API Key** ← Fornecida pelo provedor

Depois clique em **"Salvar Configurações"**!

---

## 📞 AINDA COM DÚVIDA?

Se ainda estiver confuso, pense assim:

```
É como criar uma conta de e-mail:

Gmail pergunta: "Escolha seu nome de usuário"
Você digita: "meunome"
Seu e-mail fica: meunome@gmail.com

Evolution API pergunta: "Escolha o nome da instância"
Você digita: "rendizy-principal"
Sua instância fica: rendizy-principal
```

**É só isso!** 🎉
