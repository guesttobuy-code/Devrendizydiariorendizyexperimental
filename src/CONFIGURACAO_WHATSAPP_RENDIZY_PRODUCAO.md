# ✅ Configuração WhatsApp RENDIZY - Produção

**Versão:** v1.0.103.48  
**Data:** 29 de Outubro de 2025  
**Status:** 🎯 Configuração Real com Credenciais Fornecidas

---

## 🎯 SUAS CREDENCIAIS

Você já tem Evolution API rodando em produção! Aqui estão suas credenciais:

```
URL Base da API: https://evo.boravendermuito.com.br
URL do Manager:  https://evo.boravendermuito.com.br/manager
Nome da Instância: rendizy-admin-master
API Key: F7DE5EFFB66B-4E43-B11F-F0D5D8849741
```

---

## ⚠️ IMPORTANTE: Diferença entre URLs

### URL do Manager (Painel Web)
```
❌ NÃO USE NO RENDIZY!
https://evo.boravendermuito.com.br/manager
```
Esta é a URL do **painel administrativo web** da Evolution API.

### URL Base da API (Para usar no RENDIZY)
```
✅ USE ESTA NO RENDIZY!
https://evo.boravendermuito.com.br
```
Esta é a URL base para fazer requests da API.

---

## 🚀 CONFIGURAÇÃO NO RENDIZY

### Passo 1: Acessar Configurações

1. Abra o RENDIZY
2. Vá em: **Configurações > Integrações**
3. Clique no card **WhatsApp Business** (verde)

---

### Passo 2: Aba "Configuração"

Preencha exatamente assim:

```
┌─────────────────────────────────────────────────────────────┐
│ URL da Evolution API                                        │
│ https://evo.boravendermuito.com.br                         │ ← SEM /manager!
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Nome da Instância                                           │
│ rendizy-admin-master                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ API Key                                                     │
│ F7DE5EFFB66B-4E43-B11F-F0D5D8849741                        │
└─────────────────────────────────────────────────────────────┘
```

---

### Passo 3: Salvar e Testar

1. **Clique em "Salvar Configurações"**
   - Deve aparecer: ✅ "Configurações salvas com sucesso!"

2. **Clique em "Testar Conexão"**
   - Aguarde 2-3 segundos
   - Deve aparecer: ✅ "Conexão testada com sucesso!"

**Se aparecer erro:** Veja seção [Troubleshooting](#troubleshooting) abaixo.

---

### Passo 4: Verificar Status da Conexão

1. Vá na aba **"Status & Conexão"**

2. Você deve ver:
   ```
   📊 Status da Instância
   
   Estado: ● Conectado
   Instância: rendizy-admin-master
   ```

**Se já estiver conectado:**
- ✅ Pronto! Já pode usar!
- ✅ Pule para "Testar Mensagens"

**Se aparecer "Desconectado":**
- → Continue para Passo 5 (Gerar QR Code)

---

### Passo 5: Gerar QR Code (Se Necessário)

**Apenas se ainda não estiver conectado:**

1. Na aba "Status & Conexão"
2. Clique em **"Gerar QR Code"**
3. Aguarde ~5 segundos
4. QR Code aparecerá

**Conectar WhatsApp:**
1. Abra WhatsApp no celular
2. Menu (⋮) > Aparelhos conectados
3. Conectar um aparelho
4. Aponte câmera para o QR Code
5. Aguarde conexão (~10 segundos)
6. ✅ Pronto! Conectado!

---

## 🧪 TESTAR MENSAGENS

### Teste 1: Enviar Mensagem

1. Vá em: **Módulos > Chat**
2. Selecione uma conversa ou crie nova
3. Digite uma mensagem de teste
4. Clique em "Enviar"
5. ✅ Mensagem deve aparecer no WhatsApp do destinatário

---

### Teste 2: Receber Mensagem

1. Peça para alguém enviar mensagem para o número conectado
2. OU envie do seu celular pessoal
3. Aguarde ~2-5 segundos
4. ✅ Mensagem deve aparecer no módulo Chat do RENDIZY

---

## 🔧 CONFIGURAÇÕES AVANÇADAS

### Webhook (Recebimento de Mensagens)

Para receber mensagens no RENDIZY, você precisa configurar o webhook na Evolution API.

**URL do Webhook:**
```
https://SEU-DOMINIO-RENDIZY.com/api/webhook/whatsapp
```

**Como configurar:**

#### Opção 1: Via Manager (Painel Web)

1. Acesse: https://evo.boravendermuito.com.br/manager
2. Faça login
3. Selecione instância: `rendizy-admin-master`
4. Vá em "Webhooks" ou "Configurações"
5. Configure:
   ```
   Webhook URL: https://seu-rendizy.com/api/webhook/whatsapp
   Eventos:
   ✅ messages.upsert (novas mensagens)
   ✅ messages.update (status)
   ✅ connection.update (conexão)
   ```

---

#### Opção 2: Via API (Avançado)

Você pode configurar via API também. Consulte: `EVOLUTION_API_CONFIGURACAO_AVANCADA_RENDIZY.md`

---

## ⚙️ CONFIGURAÇÃO NO SERVIDOR EVOLUTION API

Seu TI já configurou a Evolution API, mas aqui estão informações úteis:

### Dados do Servidor

```
Domínio: evo.boravendermuito.com.br
Manager: https://evo.boravendermuito.com.br/manager
API Base: https://evo.boravendermuito.com.br
```

### Portas Importantes

- **8080**: API principal (já configurado com reverse proxy)
- **Manager**: Painel administrativo web

### Endpoints Disponíveis

```bash
# Teste de saúde
GET https://evo.boravendermuito.com.br

# Status da instância
GET https://evo.boravendermuito.com.br/instance/connectionState/rendizy-admin-master

# Enviar mensagem
POST https://evo.boravendermuito.com.br/message/sendText/rendizy-admin-master
```

Todos os requests precisam do header:
```
apikey: F7DE5EFFB66B-4E43-B11F-F0D5D8849741
```

---

## 🆘 TROUBLESHOOTING

### Erro: "Failed to fetch"

**Possíveis causas:**
1. URL incorreta (você colocou `/manager`?)
2. Servidor Evolution API offline
3. CORS não configurado

**Soluções:**

1. **Verificar URL:**
   ```
   ✅ Correto: https://evo.boravendermuito.com.br
   ❌ Errado:  https://evo.boravendermuito.com.br/manager
   ```

2. **Testar servidor:**
   ```bash
   curl https://evo.boravendermuito.com.br
   ```
   Deve retornar JSON com `"status": 200`

3. **Verificar CORS:**
   Peça para seu TI verificar se CORS está permitindo requisições do RENDIZY.

---

### Erro: "Invalid API Key"

**Causa:** API Key incorreta

**Solução:**
1. Verifique se não tem espaços extras
2. Confirme com seu TI a API Key correta
3. API Key fornecida: `F7DE5EFFB66B-4E43-B11F-F0D5D8849741`

---

### Erro: "Instance not found"

**Causa:** Nome da instância incorreto

**Solução:**
1. Confirme o nome exato: `rendizy-admin-master`
2. Verifique no Manager se a instância existe
3. Confirme com seu TI

---

### QR Code não aparece

**Possível causa:** WhatsApp já conectado

**Solução:**

1. Vá no Manager: https://evo.boravendermuito.com.br/manager
2. Veja se instância já está conectada
3. Se sim, não precisa gerar novo QR Code!
4. Se não, gere pelo RENDIZY ou pelo Manager

---

### Mensagens não chegam no RENDIZY

**Causa:** Webhook não configurado

**Solução:**

1. Configure webhook (veja seção [Webhook](#webhook-recebimento-de-mensagens))
2. URL do webhook: `https://seu-rendizy.com/api/webhook/whatsapp`
3. Habilite eventos essenciais

---

## 📊 ESTRUTURA COMPLETA

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  Evolution API (Servidor do seu TI)              │
│  https://evo.boravendermuito.com.br             │
│                                                  │
│  ┌────────────────────────────────────────┐     │
│  │ Instância: rendizy-admin-master        │     │
│  │ API Key: F7DE5...                      │     │
│  │ Status: Conectado ●                    │     │
│  └────────────────────────────────────────┘     │
│                                                  │
│  Manager (Painel Web):                          │
│  https://evo.boravendermuito.com.br/manager     │
│                                                  │
└──────────────────────────────────────────────────┘
                      ▼
                   HTTPS
                      ▼
┌──────────────────────────────────────────────────┐
│                                                  │
│  RENDIZY                                         │
│  Configurações > Integrações > WhatsApp         │
│                                                  │
│  URL: https://evo.boravendermuito.com.br        │
│  Instance: rendizy-admin-master                 │
│  API Key: F7DE5...                              │
│                                                  │
└──────────────────────────────────────────────────┘
                      ▼
                   Webhook
                      ▼
┌──────────────────────────────────────────────────┐
│                                                  │
│  Backend RENDIZY (Supabase)                      │
│  Recebe mensagens do WhatsApp                    │
│  /api/webhook/whatsapp                          │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST DE CONFIGURAÇÃO

### Configuração Básica
- [ ] URL configurada (sem /manager)
- [ ] Nome da instância: `rendizy-admin-master`
- [ ] API Key: `F7DE5EFFB66B-4E43-B11F-F0D5D8849741`
- [ ] Clicou "Salvar Configurações"
- [ ] Clicou "Testar Conexão"
- [ ] Viu: ✅ "Conexão testada com sucesso!"

### Status
- [ ] Verificou aba "Status & Conexão"
- [ ] Status: Conectado OU Gerou QR Code
- [ ] WhatsApp conectado

### Testes
- [ ] Enviou mensagem de teste
- [ ] Recebeu mensagem de teste

### Webhook (Opcional - para receber mensagens)
- [ ] Configurou webhook no Manager
- [ ] URL: `https://seu-rendizy.com/api/webhook/whatsapp`
- [ ] Eventos habilitados: messages.upsert, messages.update
- [ ] Testou recebimento

---

## 🎯 PRÓXIMOS PASSOS

Após configuração:

1. ✅ Teste envio de mensagens
2. ✅ Configure webhook (se ainda não tiver)
3. ✅ Teste recebimento de mensagens
4. ✅ Configure templates de resposta
5. ✅ Use no dia a dia!

---

## 📞 CONTATO COM TI

Se precisar de suporte sobre o servidor Evolution API:

**Perguntas úteis para seu TI:**

1. "A Evolution API está com CORS configurado para aceitar requisições do RENDIZY?"
2. "O webhook está configurado para: `https://rendizy.com/api/webhook/whatsapp`?"
3. "Posso ver os logs da Evolution API para debug?"
4. "Tem backup automático da instância configurado?"

---

## 📚 DOCUMENTAÇÃO RELACIONADA

### Guias de Uso
- `README_WHATSAPP_COMPLETO.md` - Índice geral
- `WHATSAPP_INDEX_VISUAL.md` - Navegação visual
- `GUIA_RAPIDO_RESOLVER_ERRO_WHATSAPP.md` - Troubleshooting

### Documentação Técnica
- `EVOLUTION_API_CONFIGURACAO_AVANCADA_RENDIZY.md` - Config avançada
- `WHATSAPP_SETUP_DEFINITIVO_v1.0.103.47.md` - Guia completo

---

## 🎉 RESUMO

Você tem:
- ✅ Evolution API rodando em produção
- ✅ Servidor configurado pelo seu TI
- ✅ Domínio próprio: `evo.boravendermuito.com.br`
- ✅ Instância criada: `rendizy-admin-master`
- ✅ API Key: `F7DE5...`

Falta apenas:
- [ ] Configurar no RENDIZY (5 minutos)
- [ ] Testar conexão
- [ ] Configurar webhook (opcional)
- [ ] Usar! 🚀

---

## 🔐 SEGURANÇA

**IMPORTANTE:**

1. ✅ Sua API Key é única e secreta
2. ✅ Nunca compartilhe em repositórios públicos
3. ✅ Use HTTPS sempre (já configurado)
4. ✅ Configure CORS apenas para domínios confiáveis

---

**Versão:** v1.0.103.48  
**Status:** ✅ Guia de Produção  
**Última Atualização:** 29/10/2025

**Pronto para usar!** 🎉📱
