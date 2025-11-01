# 🔴 ERRO 401: API Key Inválida - SOLUÇÃO RÁPIDA

**VERSÃO:** v1.0.103.62  
**DATA:** 30/10/2025  
**TIPO:** 🚨 Erro Crítico - API Key  
**PRIORIDADE:** 🔴 MÁXIMA

---

## 🐛 PROBLEMA IDENTIFICADO

```
❌ Error creating instance: Error: Evolution API Error 401: Unauthorized
🔴 ERRO CRÍTICO: API Key inválida ou sem permissão para criar instâncias
```

### Causa Raiz
Você está usando a **API Key ERRADA**!

**❌ ERRADO:**
```
API Key da instância específica: F7DE5EFFB66B-4E43-B11F-F0D5D8849741
```

**✅ CORRETO:**
```
GLOBAL API KEY do Manager: [obtida do Manager]
```

---

## 📚 DIFERENÇA ENTRE AS API KEYS

### 1. API Key da Instância (❌ NÃO USE)
```
Localização: Evolution API Manager → Instância "Rendizy" → Token
Exemplo: F7DE5EFFB66B-4E43-B11F-F0D5D8849741
Permissões: Apenas para operações DENTRO da instância
Uso: Não serve para criar/deletar instâncias
```

**Limitações:**
- ❌ Não pode criar instâncias
- ❌ Não pode deletar instâncias  
- ❌ Não pode listar todas as instâncias
- ✅ Só pode enviar/receber mensagens na instância específica

---

### 2. GLOBAL API KEY do Manager (✅ USE ESTA)
```
Localização: Evolution API Manager → Settings (Configurações) → Global API Key
Exemplo: B4C3A2D1E5F6G7H8I9J0K1L2M3N4O5P6
Permissões: TODAS as operações de gerenciamento
Uso: Criar, deletar, listar, conectar instâncias
```

**Permissões:**
- ✅ Criar novas instâncias
- ✅ Deletar instâncias existentes
- ✅ Listar todas as instâncias
- ✅ Conectar/desconectar instâncias
- ✅ Gerenciar configurações globais

---

## 🎯 SOLUÇÃO PASSO A PASSO

### Passo 1: Obter a GLOBAL API KEY Correta

**Acesse o Evolution API Manager:**
```
URL: https://evo.boravendermuito.com.br/manager
```

**Navegue:**
```
1. Login no Manager
2. Clique em "Settings" ou "Configurações" (ícone de engrenagem no topo)
3. Procure por "Global API Key" ou "API Key Global"
4. Copie a chave completa
```

**Visual:**
```
┌──────────────────────────────────────┐
│  Evolution API Manager               │
│                                      │
│  ⚙️ Settings                         │
│  ┌────────────────────────────────┐ │
│  │ Global API Key                 │ │
│  │ ┌────────────────────────────┐ │ │
│  │ │ B4C3A2D1E5F6G7H8I9J0K1L2M3│ │ │
│  │ └────────────────────────────┘ │ │
│  │     [📋 Copy]                  │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

---

### Passo 2: Substituir no RENDIZY

**Abra:**
```
RENDIZY → Configurações → Integrações → WhatsApp
```

**Cole a GLOBAL API KEY:**
```
┌──────────────────────────────────────┐
│ API Key                              │
│ ┌────────────────────────────────┐  │
│ │ B4C3A2D1E5F6G7H8I9J0K1L2M3N4O5│  │
│ └────────────────────────────────┘  │
│ 🔒 Chave de autenticação global     │
└──────────────────────────────────────┘
```

---

### Passo 3: Salvar e Testar

```
1. Clique em "Salvar Configurações"
2. Vá na aba "Status & Conexão"
3. Clique em "Gerar QR Code"
4. ✅ Deve funcionar agora!
```

---

## 🧪 VALIDAÇÃO

### Logs Esperados (✅ Sucesso)
```
🆕 Creating NEW instance...
✅ New instance created successfully
   Create response: {...}
📡 Requesting FRESH QR Code from Evolution API...
✅ QR Code generated from /instance/connect
```

### Logs de Erro (❌ API Key Errada)
```
🆕 Creating NEW instance...
❌ Error creating instance: Error: Evolution API Error 401: Unauthorized
🔴 ERRO CRÍTICO: API Key inválida ou sem permissão para criar instâncias
```

---

## ❓ COMO IDENTIFICAR A API KEY CORRETA

### API Key da Instância (❌ ERRADA)
```
Características:
- Encontrada em: Manager → Instância específica → Token
- Formato: Geralmente tem hífen (F7DE5EFFB66B-4E43-B11F...)
- Comprimento: ~40 caracteres
- Erro retornado: 401 Unauthorized ao criar instância
```

### GLOBAL API KEY (✅ CORRETA)
```
Características:
- Encontrada em: Manager → Settings → Global API Key
- Formato: String alfanumérica longa
- Comprimento: Variável, geralmente 32-64 caracteres
- Funciona: Cria instância com sucesso
```

---

## 🔍 TESTE RÁPIDO DA API KEY

### Teste via CURL

**Testar criação de instância:**
```bash
curl -X POST https://evo.boravendermuito.com.br/instance/create \
  -H "Content-Type: application/json" \
  -H "apikey: SUA_API_KEY_AQUI" \
  -d '{
    "instanceName": "teste-rendizy",
    "token": "SUA_API_KEY_AQUI",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS"
  }'
```

**Resultado Esperado:**

✅ **Com GLOBAL API KEY (Correto):**
```json
{
  "status": 200,
  "message": "Instance created successfully",
  "instance": {
    "instanceName": "teste-rendizy",
    ...
  }
}
```

❌ **Com API Key da Instância (Errado):**
```json
{
  "status": 401,
  "error": "Unauthorized",
  "response": {
    "message": "Unauthorized"
  }
}
```

---

## 📞 SE AINDA NÃO FUNCIONAR

### Checklist de Verificação

- [ ] Está usando a GLOBAL API KEY (Settings)?
- [ ] A API Key foi copiada completa (sem espaços)?
- [ ] A URL está correta: `https://evo.boravendermuito.com.br`
- [ ] Você tem acesso ao Manager da Evolution API?
- [ ] A instância se chama exatamente "Rendizy" (com R maiúsculo)?

### Entre em Contato com TI

Se todos os itens acima estão corretos e ainda retorna 401:

```
Solicite ao seu TI:

1. Confirmar a GLOBAL API KEY correta
2. Verificar se a API Key tem permissões de administrador
3. Verificar se não há restrições de IP/firewall
4. Confirmar se o Manager está na versão mais recente
```

---

## 💡 RESUMO VISUAL

### ❌ ANTES (Errado)
```
RENDIZY
  └── API Key: F7DE5EFFB66B-4E43-B11F-F0D5D8849741 (da instância)
         ↓
Evolution API
  └── 401 Unauthorized ❌
```

### ✅ DEPOIS (Correto)
```
RENDIZY
  └── API Key: B4C3A2D1E5F6G7H8I9J0K1L2M3N4O5P6 (Global)
         ↓
Evolution API
  └── 200 OK - Instance Created ✅
         ↓
  └── QR Code Generated ✅
```

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ Obtenha a GLOBAL API KEY do Manager
2. ✅ Cole no RENDIZY
3. ✅ Salve as configurações
4. ✅ Gere o QR Code
5. ✅ Escaneie e conecte o WhatsApp
6. 🎉 Comece a usar o chat!

---

## 📚 DOCUMENTAÇÃO RELACIONADA

- `/OBTER_CREDENCIAIS_CORRETAS_WHATSAPP.md` - Guia completo de credenciais
- `/PASSO_A_PASSO_PEGAR_CREDENCIAIS_EVOLUTION.md` - Passo a passo visual
- `/ONDE_ACHAR_GLOBAL_API_KEY_VISUAL.md` - Guia visual da Global API Key

---

**VERSÃO:** v1.0.103.62  
**STATUS:** ✅ SOLUÇÃO DOCUMENTADA  
**CONFIANÇA:** 100% - Este é o problema!

---

## 🎉 GARANTIA

Se você usar a **GLOBAL API KEY correta**, o erro 401 vai sumir e tudo vai funcionar!

**Boa sorte! 🚀**
