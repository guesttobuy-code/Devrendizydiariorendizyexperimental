# 📸 GUIA VISUAL - Credenciais WhatsApp Evolution API

**Versão:** v1.0.103.70  
**Data:** 30/10/2025  
**Base:** Screenshots fornecidos pelo usuário

---

## 🖼️ SCREENSHOT 1: Nova Instância

Você forneceu um screenshot mostrando a tela de criação de instância no Evolution API Manager:

```
┌─────────────────────────────────────────────────┐
│ New instance                                    │
├─────────────────────────────────────────────────┤
│                                                 │
│ Name *                                          │
│ ┌─────────────────────────────────────────┐    │
│ │ Rendizy                                 │    │
│ └─────────────────────────────────────────┘    │
│                                                 │
│ Channel                                         │
│ ┌─────────────────────────────────────────┐    │
│ │ Baileys                              ▼  │    │
│ └─────────────────────────────────────────┘    │
│                                                 │
│ Token *                                         │
│ ┌─────────────────────────────────────────┐    │
│ │ 0FF3641E80A6-453C-AB4E-28C2F2D01C50    │    │
│ └─────────────────────────────────────────┘    │
│                                                 │
│ Number                                          │
│ ┌─────────────────────────────────────────┐    │
│ │ 552199441-4512                          │    │
│ └─────────────────────────────────────────┘    │
│                                                 │
│                           [Save]                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 📋 Informações Extraídas

| Campo | Valor | Descrição |
|-------|-------|-----------|
| **Name** | `Rendizy` | Nome da instância (use este no RENDIZY) |
| **Channel** | `Baileys` | Tipo de canal (WhatsApp) |
| **Token** | `0FF3641E80A6-...` | Token da instância (gerado automaticamente) |
| **Number** | `552199441-4512` | Número do WhatsApp |

### ⚠️ IMPORTANTE: Token vs API Key

**NÃO CONFUNDA:**

```
❌ Token da Instância: 0FF3641E80A6-453C-AB4E-28C2F2D01C50
   → Gerado automaticamente para a instância
   → NÃO é usado no RENDIZY
   
✅ Global API Key: 4de7861e944e291b56fe9781d2b00b36
   → Usada para autenticar requests
   → É ESTA que você usa no RENDIZY
```

---

## 🖼️ SCREENSHOT 2: Configuração de Webhook

Você forneceu um screenshot mostrando a tela de configuração de webhook:

```
┌─────────────────────────────────────────────────┐
│ Webhook                                         │
├─────────────────────────────────────────────────┤
│                                                 │
│ Enabled                                   [ON]  │
│ Enable or disable the webhook                   │
│                                                 │
│ URL                                             │
│ ┌─────────────────────────────────────────┐    │
│ │                                         │    │
│ └─────────────────────────────────────────┘    │
│                                                 │
│ Webhook by Events                         [ON]  │
│ Create a route for each event by adding...      │
│                                                 │
│ Webhook Base64                            [OFF] │
│ Send media base64 data in webhook               │
│                                                 │
│ Mark All                          Unmark All    │
│                                                 │
│ Events                                          │
│ ┌─────────────────────────────────────────┐    │
│ │ [✓] APPLICATION_STARTUP                 │    │
│ │ [✓] CALL                                │    │
│ │ [✓] CHATS_DELETE                        │    │
│ │ [✓] CHATS_SET                           │    │
│ │ [✓] CHATS_UPDATE                        │    │
│ │ [✓] CHATS_UPSERT                        │    │
│ │     ...                                 │    │
│ └─────────────────────────────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 📋 Configuração de Webhook no RENDIZY

Para configurar o webhook automaticamente, use esta URL no RENDIZY:

```
https://{projectId}.supabase.co/functions/v1/make-server-67caf26a/chat/channels/whatsapp/webhook
```

O RENDIZY já gera esta URL automaticamente! Você só precisa:
1. ✅ Salvar as configurações no RENDIZY
2. ✅ O backend configura o webhook automaticamente

---

## 🔑 COMO OBTER A GLOBAL API KEY

### Passo 1: Acessar o Evolution Manager

```
URL: https://evo.boravendermuito.com.br/manager
```

### Passo 2: Fazer Login

Use suas credenciais de administrador do Evolution API

### Passo 3: Menu Lateral → Global API Keys

```
┌─────────────────────────────────┐
│ Manager                         │
├─────────────────────────────────┤
│ 🏠 Dashboard                    │
│ 📱 Instances                    │
│ 🔑 Global API Keys       ← AQUI│
│ 👥 Users                        │
│ ⚙️  Settings                    │
└─────────────────────────────────┘
```

### Passo 4: Localizar ou Criar API Key

Você verá uma lista de API Keys. Procure por:

```
┌─────────────────────────────────────────────────┐
│ Global API Keys                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ Name: Production Key                            │
│ Key:  4de7861e944e291b56fe9781d2b00b36         │
│                                                 │
│ Permissions:                                    │
│ ☑ Read Instances                                │
│ ☑ Create Instance                               │
│ ☑ Modify Instance                               │
│ ☑ Delete Instance                               │
│ ☑ Send Messages                                 │
│                                                 │
│ [Edit] [Delete]                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

### ⚠️ IMPORTANTE: Permissões Necessárias

A Global API Key precisa ter TODAS estas permissões marcadas:

```
✅ Read Instances    - Para listar instâncias
✅ Create Instance   - Para criar/reconectar instância
✅ Modify Instance   - Para atualizar configurações
✅ Delete Instance   - Para deletar/recriar instância
✅ Send Messages     - Para enviar mensagens
```

---

## 📱 MAPEAMENTO COMPLETO: Evolution → RENDIZY

### O Que Você Vê no Evolution Manager

```
┌────────────────────────────────────────────┐
│ EVOLUTION API MANAGER                      │
├────────────────────────────────────────────┤
│ Instance Name:    Rendizy                  │
│ Instance Token:   0FF3641E80A6-453C-...    │
│ Phone Number:     552199441-4512           │
│ Global API Key:   4de7861e944e291b56...    │
│ Manager URL:      /manager                 │
│ Base URL:         https://evo.boravend...  │
└────────────────────────────────────────────┘
```

### O Que Você Configura no RENDIZY

```
┌────────────────────────────────────────────┐
│ RENDIZY - WHATSAPP INTEGRATION             │
├────────────────────────────────────────────┤
│ URL da Evolution API:                      │
│ https://evo.boravendermuito.com.br         │
│ (SEM /manager no final)                    │
├────────────────────────────────────────────┤
│ Nome da Instância:                         │
│ Rendizy                                    │
│ (Igual ao Instance Name do Manager)        │
├────────────────────────────────────────────┤
│ API Key:                                   │
│ 4de7861e944e291b56fe9781d2b00b36           │
│ (A Global API Key, NÃO o Instance Token)   │
└────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST VISUAL

Use este checklist enquanto configura:

### No Evolution Manager
- [ ] Acessei https://evo.boravendermuito.com.br/manager
- [ ] Fiz login com credenciais de admin
- [ ] Fui em "Global API Keys"
- [ ] Encontrei a API Key: `4de7861e944e291b56fe9781d2b00b36`
- [ ] Verifiquei que tem TODAS as permissões
- [ ] Fui em "Instances"
- [ ] Verifiquei que a instância "Rendizy" existe

### No RENDIZY
- [ ] Acessei http://localhost:5173
- [ ] Fui em: Configurações → Integrações → WhatsApp
- [ ] Preenchi URL: `https://evo.boravendermuito.com.br` (SEM /manager)
- [ ] Preenchi Instância: `Rendizy` (com R maiúsculo)
- [ ] Preenchi API Key: `4de7861e944e291b56fe9781d2b00b36`
- [ ] Cliquei em "Salvar Configurações"
- [ ] Vi mensagem: "✅ Configurações salvas com sucesso!"
- [ ] Cliquei em "Testar Conexão"
- [ ] Vi mensagem: "✅ Conexão testada com sucesso!"

---

## 🎯 COMPARAÇÃO: CERTO vs ERRADO

### ❌ ERRADO

```
URL:       https://evo.boravendermuito.com.br/manager  ← /manager
Instância: rendizy                                      ← minúsculo
API Key:   0FF3641E80A6-453C-AB4E-28C2F2D01C50         ← Token
```

### ✅ CERTO

```
URL:       https://evo.boravendermuito.com.br          ← SEM /manager
Instância: Rendizy                                      ← R maiúsculo
API Key:   4de7861e944e291b56fe9781d2b00b36           ← Global API Key
```

---

## 🔍 DIAGNÓSTICO VISUAL

### Se Aparecer Erro 401

```
┌────────────────────────────────────────────┐
│ ❌ API Key inválida                        │
└────────────────────────────────────────────┘
```

**Verifique:**
1. Está usando a **Global API Key**, não o Token da Instância?
2. Copiou a API Key corretamente, sem espaços?
3. A API Key tem TODAS as permissões no Manager?

### Se Aparecer Erro 404

```
┌────────────────────────────────────────────┐
│ ❌ Instância não encontrada                │
└────────────────────────────────────────────┘
```

**Verifique:**
1. Nome está exatamente como no Manager? (`Rendizy` com R maiúsculo)
2. A instância existe no Evolution Manager?
3. A URL está correta (sem /manager)?

---

## 📞 RESUMO FINAL

### Informações das Imagens Fornecidas

```
╔═══════════════════════════════════════════════════╗
║ SCREENSHOT 1: Nova Instância                      ║
╠═══════════════════════════════════════════════════╣
║ Nome:        Rendizy                              ║
║ Channel:     Baileys                              ║
║ Token:       0FF3641E80A6-453C-AB4E-28C2F2D01C50 ║
║ Número:      552199441-4512                       ║
╚═══════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════╗
║ SCREENSHOT 2: Configuração Webhook                ║
╠═══════════════════════════════════════════════════╣
║ Enabled:     ✓ ON                                 ║
║ Events:      Todos marcados                       ║
║ Base64:      OFF                                  ║
║ By Events:   ON                                   ║
╚═══════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════╗
║ CREDENCIAL PRINCIPAL (Global API Key)             ║
╠═══════════════════════════════════════════════════╣
║ 4de7861e944e291b56fe9781d2b00b36                  ║
╚═══════════════════════════════════════════════════╝
```

---

**Desenvolvido por:** RENDIZY Team  
**Baseado em:** Screenshots reais do Evolution API Manager  
**Versão:** v1.0.103.70  
**Status:** ✅ Pronto para uso
