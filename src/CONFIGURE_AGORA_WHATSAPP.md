# 🚀 CONFIGURE WHATSAPP AGORA - 5 Minutos

**Suas Credenciais:** Fornecidas pelo TI  
**Tempo:** 5 minutos  
**Status:** Pronto para configurar!

---

## ✅ PASSO 1: Abrir Configurações (30s)

1. Abra o RENDIZY
2. Clique em **"Configurações"** (menu lateral)
3. Clique em **"Integrações"**
4. Clique no card verde **"WhatsApp Business"**

✅ Você está na tela de configuração do WhatsApp!

---

## ✅ PASSO 2: Preencher Dados (2 min)

Na aba **"Configuração"**, preencha:

### URL da Evolution API

```
https://evo.boravendermuito.com.br
```

⚠️ **IMPORTANTE:** 
- ✅ **USE:** `https://evo.boravendermuito.com.br`
- ❌ **NÃO USE:** `https://evo.boravendermuito.com.br/manager`

O `/manager` é apenas o painel web. A API não precisa dele!

---

### Nome da Instância

```
rendizy-admin-master
```

---

### API Key

```
F7DE5EFFB66B-4E43-B11F-F0D5D8849741
```

---

## ✅ PASSO 3: Salvar (10s)

1. Clique no botão **"Salvar Configurações"**
2. Aguarde aparecer: ✅ **"Configurações salvas com sucesso!"**

---

## ✅ PASSO 4: Testar Conexão (30s)

1. Clique no botão **"Testar Conexão"**
2. Aguarde 2-3 segundos
3. Deve aparecer: ✅ **"Conexão testada com sucesso!"**

### ⚠️ Se aparecer erro:

#### Erro: "URL inválida"
→ Você colocou `/manager` no final? Remova!

#### Erro: "Failed to fetch"
→ Confirme com seu TI se o servidor está online

#### Erro: "Invalid API Key"
→ Verifique se não tem espaços extras

**Veja mais em:** `CONFIGURACAO_WHATSAPP_RENDIZY_PRODUCAO.md`

---

## ✅ PASSO 5: Verificar Status (1 min)

1. Vá na aba **"Status & Conexão"**
2. Veja o status da instância

### Possibilidades:

#### Cenário A: ● Conectado
```
✅ Pronto! WhatsApp já está conectado!
✅ Pode começar a usar!
✅ Pule para "Testar Mensagens"
```

#### Cenário B: ○ Desconectado
```
→ Precisa gerar QR Code (Passo 6)
```

---

## ✅ PASSO 6: Gerar QR Code (Apenas se Desconectado)

**Se o status for "Desconectado":**

1. Na aba "Status & Conexão"
2. Clique em **"Gerar QR Code"**
3. Aguarde ~5 segundos
4. QR Code aparecerá na tela

---

### Conectar WhatsApp:

1. Pegue seu celular
2. Abra WhatsApp
3. Toque em Menu (⋮) > **"Aparelhos conectados"**
4. Toque em **"Conectar um aparelho"**
5. Aponte a câmera para o QR Code na tela
6. Aguarde conexão (~10 segundos)
7. ✅ **Pronto! WhatsApp conectado!**

---

## 🧪 TESTAR MENSAGENS

### Teste 1: Enviar (30s)

1. Vá em: **Módulos > Chat**
2. Selecione uma conversa
3. Digite: "Teste WhatsApp RENDIZY"
4. Clique "Enviar"
5. ✅ Mensagem deve aparecer no WhatsApp do destinatário!

---

### Teste 2: Receber (30s)

1. Do seu celular pessoal
2. Envie mensagem para o número WhatsApp conectado
3. Aguarde ~2-5 segundos
4. ✅ Mensagem deve aparecer no Chat do RENDIZY!

---

## ✅ CHECKLIST RÁPIDO

- [ ] Abri Configurações > Integrações > WhatsApp
- [ ] Colei URL: `https://evo.boravendermuito.com.br` (sem /manager!)
- [ ] Colei Instance: `rendizy-admin-master`
- [ ] Colei API Key: `F7DE5...`
- [ ] Cliquei "Salvar"
- [ ] Cliquei "Testar Conexão"
- [ ] Viu: ✅ "Conexão testada com sucesso!"
- [ ] Verifiquei aba "Status & Conexão"
- [ ] Conectado OU Gerei QR Code
- [ ] Testei enviar mensagem
- [ ] Testei receber mensagem

---

## 🎯 RESUMO VISUAL

```
┌─────────────────────────────────────────┐
│  RENDIZY                                │
│  Configurações > Integrações > WhatsApp │
└─────────────────────────────────────────┘
              │
              ▼ Preencher:
┌─────────────────────────────────────────┐
│ URL: https://evo.boravendermuito.com.br │ ← SEM /manager!
│ Instance: rendizy-admin-master          │
│ API Key: F7DE5...                       │
└─────────────────────────────────────────┘
              │
              ▼ Salvar
              │
              ▼ Testar Conexão
              │
         ┌────┴────┐
         │         │
       SUCESSO   ERRO
         │         │
         ▼         └──> Ver troubleshooting
   ┌─────────┐
   │ Status? │
   └────┬────┘
        │
    ┌───┴───┐
    │       │
CONECTADO  DESCONECTADO
    │       │
    ✅      └──> Gerar QR Code
                      │
                      ▼ Escanear com WhatsApp
                      │
                      ✅ CONECTADO!
```

---

## 🆘 PROBLEMAS?

### URL de Exemplo Detectada
```
❌ https://api.evolutionapi.com
✅ https://evo.boravendermuito.com.br
```

### Tem /manager no final?
```
❌ https://evo.boravendermuito.com.br/manager
✅ https://evo.boravendermuito.com.br
```

### API Key com espaços?
```
❌ F7DE5... [espaços extras]
✅ F7DE5EFFB66B-4E43-B11F-F0D5D8849741
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

**Para mais detalhes:**
- `CONFIGURACAO_WHATSAPP_RENDIZY_PRODUCAO.md` - Guia completo
- `README_WHATSAPP_COMPLETO.md` - Índice geral
- `GUIA_RAPIDO_RESOLVER_ERRO_WHATSAPP.md` - Troubleshooting

---

## 🎉 PRONTO!

Após seguir estes passos, você terá:

- ✅ WhatsApp conectado ao RENDIZY
- ✅ Enviando mensagens
- ✅ Recebendo mensagens
- ✅ Pronto para usar! 🚀

**Tempo total:** ~5 minutos  
**Dificuldade:** ⭐ Muito fácil  
**Custo adicional:** R$ 0,00 (servidor já configurado!)

---

**Versão:** v1.0.103.48  
**Status:** ✅ Guia Rápido  
**Última Atualização:** 29/10/2025

**Boa sorte!** 📱🎉
