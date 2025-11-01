# 🔑 COMO OBTER CREDENCIAIS CORRETAS DO WHATSAPP (EVOLUTION API)

**Data:** 29 de Outubro de 2025  
**Versão:** v1.0.103.56  

---

## 🎯 PROBLEMA ATUAL

Suas credenciais estão retornando:
- ❌ **401 Unauthorized** → API Key inválida
- ❌ **404 Not Found** → Instância não existe

**Credenciais testadas:**
```
URL:      https://evo.boravendermuito.com.br
Instance: rendizy-admin-master
API Key:  F7DE5EFFB66B-4E43-B11F-F0D5D8849741
```

---

## 📋 PASSO A PASSO PARA OBTER CREDENCIAIS CORRETAS

### OPÇÃO 1: Acessar Manager da Evolution API (Recomendado)

#### 1️⃣ **Abrir o Manager**
```
https://evo.boravendermuito.com.br/manager
```

**Login com suas credenciais de administrador**

---

#### 2️⃣ **Obter a API Key Global**

No Manager, procure por:
- **Settings / Configurações**
- **API Configuration / Configuração da API**
- **Global API Key** ou **API Key Mestra**

A API Key correta deve ter este formato:
```
[LETRAS E NÚMEROS]-[LETRAS E NÚMEROS]-[LETRAS E NÚMEROS]-[LETRAS E NÚMEROS]
Exemplo: A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6
```

📝 **Copie esta API Key**

---

#### 3️⃣ **Verificar Instâncias Existentes**

No Manager:
- Vá em **Instances / Instâncias**
- Veja a lista de instâncias disponíveis
- Procure por nomes como:
  - `rendizy`
  - `rendizy-admin`
  - `rendizy-master`
  - `boravendermuito`
  - ou qualquer outro nome relacionado

📝 **Anote o nome EXATO da instância que você quer usar**

Se não houver nenhuma instância, você pode:
- ✅ Criar uma nova no próprio RENDIZY (nosso sistema criará automaticamente)
- ✅ Criar manualmente no Manager (depois usar no RENDIZY)

---

### OPÇÃO 2: Contatar o Administrador do Servidor

Se você não tem acesso ao Manager, **contate quem gerencia o servidor**:

**Pergunte:**
1. Qual é a **API Key Global** da Evolution API?
2. Qual o **nome da instância** que devo usar?
3. A instância já existe ou preciso criar uma nova?

---

### OPÇÃO 3: Testar com cURL (Técnico)

Se você tem acesso SSH ao servidor ou quer testar:

#### Teste 1: Verificar se servidor está online
```bash
curl https://evo.boravendermuito.com.br
```

**Esperado:** Resposta HTTP 200

---

#### Teste 2: Listar instâncias
```bash
curl -X GET \
  'https://evo.boravendermuito.com.br/instance/fetchInstances' \
  -H 'apikey: SUA_API_KEY_AQUI'
```

**Se retornar 401:** API Key está errada
**Se retornar 200:** API Key está correta, veja a lista de instâncias

---

#### Teste 3: Verificar instância específica
```bash
curl -X GET \
  'https://evo.boravendermuito.com.br/instance/connectionState/NOME_DA_INSTANCIA' \
  -H 'apikey: SUA_API_KEY_AQUI'
```

---

## 🎯 DEPOIS DE OBTER AS CREDENCIAIS CORRETAS

### 1. Atualizar no RENDIZY

1. Abra: `http://localhost:5173`
2. Vá em: `Configurações → Integrações → WhatsApp`
3. Preencha com as **credenciais CORRETAS**:
   ```
   URL:      https://evo.boravendermuito.com.br
   Instance: [NOME_CORRETO_DA_INSTANCIA]
   API Key:  [API_KEY_CORRETA]
   ```
4. Clique: `💾 Salvar Configurações`

---

### 2. Testar Conexão

Depois de salvar:
1. Clique: `🔄 Testar Conexão`
2. Se retornar ✅ sucesso → Pode gerar QR Code
3. Se retornar ❌ erro → Credenciais ainda incorretas

---

### 3. Gerar QR Code (se teste passou)

1. Clique: `📱 Gerar QR Code`
2. Escaneie com WhatsApp
3. ✅ Conectado!

---

## ❓ PERGUNTAS FREQUENTES

### "Não tenho acesso ao Manager"
→ Contate o administrador do servidor Evolution API

### "Não sei quem é o administrador"
→ Pergunte para quem instalou/configurou a Evolution API na sua empresa

### "A API Key que tenho não funciona"
→ Ela pode ter sido alterada ou revogada. Peça uma nova.

### "Não existe nenhuma instância"
→ Sem problema! Ao configurar no RENDIZY e clicar "Gerar QR Code", criamos automaticamente

### "Quero criar uma instância manualmente"
→ No Manager: `Instances > Create New Instance > Escolha um nome único`

---

## 🔍 FORMATO CORRETO DAS CREDENCIAIS

### URL da Evolution API
```
✅ CORRETO:
https://evo.boravendermuito.com.br
https://api.evolutionapi.com.br
https://whatsapp.suaempresa.com.br

❌ INCORRETO:
https://evo.boravendermuito.com.br/manager (não incluir /manager)
https://evo.boravendermuito.com.br/ (não incluir / no final)
http://evo... (usar HTTPS, não HTTP)
```

### Nome da Instância
```
✅ CORRETO:
rendizy
rendizy-producao
empresa-whatsapp-01
minhainstancia

❌ INCORRETO:
rendizy admin (sem espaços)
Rendizy-Admin (sem letras maiúsculas especiais)
rendizy@master (sem caracteres especiais, exceto hífen)
```

### API Key
```
✅ CORRETO:
A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6
F7DE5EFFB66B-4E43-B11F-F0D5D8849741

❌ INCORRETO:
apikeyexemplo (muito curta)
minhakey123 (formato incorreto)
[vazia] (não pode estar vazia)
```

---

## 🚨 IMPORTANTE

**Segurança:**
- ⚠️ **NUNCA compartilhe sua API Key publicamente**
- ⚠️ Ela dá acesso TOTAL à sua Evolution API
- ⚠️ Guarde em local seguro (gerenciador de senhas)

**Validade:**
- API Keys podem expirar
- Podem ser revogadas pelo admin
- Se parar de funcionar, pode precisar renovar

---

## ✅ PRÓXIMOS PASSOS

Depois de obter as credenciais corretas:

1. ✅ Atualizar no RENDIZY
2. ✅ Testar conexão
3. ✅ Gerar QR Code
4. ✅ Escanear com WhatsApp
5. ✅ Começar a receber/enviar mensagens!

---

## 🆘 AINDA COM PROBLEMAS?

Se depois de obter as credenciais corretas ainda der erro:

1. Copie o erro COMPLETO do console (F12)
2. Envie para análise
3. Indicará o próximo passo

---

**v1.0.103.56** - Guia de Credenciais Evolution API  
**Status:** Pronto para uso  
**Ação:** Obter credenciais corretas do Manager ou Admin
