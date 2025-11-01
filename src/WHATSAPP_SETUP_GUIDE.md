# 🟢 Guia Rápido: Conectar WhatsApp ao RENDIZY

**Versão**: v1.0.102  
**Tempo estimado**: 5-10 minutos  
**Dificuldade**: Fácil  

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter:

1. ✅ WhatsApp instalado no celular
2. ✅ Número de telefone (pode ser seu pessoal ou comercial)
3. ✅ Evolution API configurada (veja abaixo)
4. ✅ Acesso admin ao RENDIZY

---

## 🚀 Passo a Passo

### Passo 1: Configurar Evolution API

Você tem 2 opções:

#### Opção A: Contratar Gerenciado (Recomendado para iniciantes)

1. Acesse um provedor de Evolution API gerenciada
2. Contrate um plano (R$ 30-50/mês)
3. Anote:
   - URL da API (ex: `https://api.seuprovedor.com`)
   - Nome da instância (ex: `rendizy-org-123`)
   - API Key

**Provedores sugeridos:**
- [Em breve - lista de provedores]

#### Opção B: Self-Hosted (Para técnicos)

```bash
# 1. Clone o repositório
git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api

# 2. Configure
cp .env.example .env
nano .env

# 3. Ajuste no .env:
AUTHENTICATION_API_KEY=sua-chave-mestra
SERVER_URL=https://sua-url.com

# 4. Suba com Docker
docker-compose up -d

# 5. Acesse
https://sua-url.com/manager
```

---

### Passo 2: Criar Instância no Evolution API

**Via Dashboard:**

1. Acesse https://sua-api.com/manager
2. Clique "Create Instance"
3. Preencha:
   - Nome: `rendizy-[nome-sua-empresa]` (ex: `rendizy-imobiliaria-xpto`)
   - API Key: Gerar automaticamente
4. Copiar e guardar:
   - Nome da instância
   - API Key gerada

**Via API (alternativa):**

```bash
curl -X POST https://sua-api.com/instance/create \
  -H "apikey: SUA-CHAVE-MESTRA" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "rendizy-imobiliaria-xpto",
    "token": "api-key-gerada",
    "qrcode": true
  }'
```

---

### Passo 3: Configurar no RENDIZY

1. **Login no RENDIZY**
   ```
   https://app.rendizy.com
   ```

2. **Ir para Configurações**
   ```
   Menu → ⚙️ Configurações → Chat
   ```

3. **Rolar até "Canais de Comunicação"**

4. **Ativar WhatsApp**
   - Clicar no switch "WhatsApp (Evolution API)"

5. **Preencher Dados**
   ```
   URL da Evolution API:    https://sua-api.com
   Nome da Instância:       rendizy-imobiliaria-xpto
   API Key:                 sua-api-key-da-instancia
   ```

6. **Copiar URL do Webhook**
   - Clicar no botão 📋 ao lado da "URL do Webhook"
   - Anotar para próximo passo

---

### Passo 4: Configurar Webhook na Evolution API

**Via Dashboard Evolution:**

1. Acesse https://sua-api.com/manager
2. Selecione sua instância
3. Vá em "Webhook"
4. Cole a URL copiada do RENDIZY
5. Selecione eventos:
   - ✅ MESSAGES_UPSERT
   - ✅ MESSAGES_UPDATE  
   - ✅ CONNECTION_UPDATE
   - ✅ SEND_MESSAGE
6. Salvar

**Via API (alternativa):**

```bash
curl -X POST https://sua-api.com/webhook/set/rendizy-imobiliaria-xpto \
  -H "apikey: sua-api-key-da-instancia" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://xxx.supabase.co/.../whatsapp/webhook",
    "webhook_by_events": false,
    "events": [
      "MESSAGES_UPSERT",
      "MESSAGES_UPDATE",
      "SEND_MESSAGE",
      "CONNECTION_UPDATE"
    ]
  }'
```

---

### Passo 5: Gerar QR Code

**No RENDIZY:**

1. Clique em **"Gerar QR Code"**
2. Aguarde 3-5 segundos
3. QR Code aparecerá na tela

**Se der erro:**
- Verifique se URL está correta
- Verifique se API Key está correta
- Verifique se Evolution API está online

---

### Passo 6: Conectar WhatsApp

**No Celular:**

1. Abra o **WhatsApp**
2. Toque no **⋮** (3 pontinhos)
3. **Aparelhos conectados**
4. **Conectar aparelho**
5. **Apontar câmera** para o QR Code no RENDIZY
6. Aguardar sincronização (pode demorar até 1 minuto)

**Quando conectar:**
- ✅ Status no RENDIZY muda para "Conectado"
- ✅ Aparece o número conectado
- ✅ Pronto para usar!

---

## 🧪 Testar Conexão

### Teste 1: Receber Mensagem

1. Pegue seu celular pessoal
2. Envie uma mensagem para o WhatsApp conectado
3. Vá no RENDIZY → Chat
4. **Esperado**: Nova conversa aparece com ícone verde do WhatsApp

### Teste 2: Enviar Mensagem

1. Abra a conversa criada
2. Digite uma mensagem
3. Enviar
4. **Esperado**: Mensagem chega no WhatsApp do celular

### Teste 3: Status de Leitura

1. Envie mensagem
2. Leia no celular
3. **Esperado**: Ícone no RENDIZY muda para ✓✓ azul

---

## ❓ Problemas Comuns

### Problema 1: QR Code não aparece

**Possíveis causas:**
- URL da Evolution API incorreta
- API Key incorreta
- Evolution API offline

**Solução:**
1. Verificar dados preenchidos
2. Testar URL no navegador: `https://sua-api.com/instance/connectionState/sua-instancia`
3. Ver se retorna JSON (não erro 404)

### Problema 2: QR Code expirou

**Causa:**
- QR Code expira após 2 minutos

**Solução:**
1. Clicar em "Gerar Novo QR Code"
2. Escanear rapidamente

### Problema 3: Não recebe mensagens

**Possíveis causas:**
- Webhook não configurado
- URL do webhook incorreta

**Solução:**
1. Verificar webhook na Evolution API
2. Testar enviando POST manual:
```bash
curl -X POST https://xxx.supabase.co/.../whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{"event":"test"}'
```
3. Deve retornar 200 OK

### Problema 4: Não consegue enviar mensagens

**Possíveis causas:**
- WhatsApp desconectou
- Número bloqueado pelo WhatsApp

**Solução:**
1. Verificar status da conexão
2. Desconectar e reconectar
3. Se persiste, usar outro número

### Problema 5: WhatsApp desconecta sozinho

**Causa:**
- Instabilidade da Evolution API
- Celular ficou offline muito tempo

**Solução:**
1. Reconectar (gerar novo QR Code)
2. Considerar Evolution gerenciada (mais estável)

---

## 💡 Dicas e Boas Práticas

### ✅ DO (Faça)

1. **Teste antes de usar com clientes**
   - Envie mensagens de teste
   - Confirme que tudo funciona

2. **Use número comercial**
   - Prefira número da empresa
   - Evite número pessoal

3. **Configure respostas automáticas**
   - Use templates do RENDIZY
   - Configure horário de atendimento

4. **Monitore conexão**
   - Verifique status diariamente
   - Configure alertas

5. **Faça backup das configurações**
   - Anote URL, instância, API Key
   - Guarde em local seguro

### ❌ DON'T (Não faça)

1. **Não envie spam**
   - WhatsApp pode banir seu número
   - Respeite seus clientes

2. **Não use para marketing em massa**
   - Evolution API não é para isso
   - Use ferramentas específicas

3. **Não compartilhe API Key**
   - É como senha do banco
   - Cada pessoa deve ter sua própria

4. **Não desconecte sem motivo**
   - Cada desconexão/reconexão é arriscada
   - Mantenha estável

5. **Não ignore atualizações**
   - Evolution API evolui
   - RENDIZY também
   - Mantenha tudo atualizado

---

## 🔐 Segurança

### Proteja suas Credenciais

```
✅ API Key: Nunca compartilhe
✅ URL: Pode ser pública mas prefira privada
✅ Webhook: Só RENDIZY deve ter acesso
```

### Boas Práticas

1. **Use HTTPS sempre**
2. **Rotacione API Keys periodicamente**
3. **Monitor logs de acesso**
4. **Configure 2FA no Evolution (se disponível)**
5. **Backup regular das configurações**

---

## 📊 Monitoramento

### O que Monitorar

1. **Status da Conexão**
   - Verificar diariamente
   - Configurar alertas automáticos (futuro)

2. **Volume de Mensagens**
   - Quantas enviadas/dia
   - Quantas recebidas/dia

3. **Taxa de Erro**
   - Mensagens que falharam
   - Motivo das falhas

4. **Tempo de Resposta**
   - Quanto tempo para responder hóspede
   - Meta: < 15 minutos

### Dashboard (Futuro)

```
Mensagens enviadas hoje:     142
Mensagens recebidas hoje:    87
Taxa de resposta:           95%
Tempo médio de resposta:    8 min
Conversas ativas:           23
```

---

## 💰 Custos

### Resumo de Custos

```
Evolution API (gerenciada):  R$ 40/mês
ou
Evolution API (self-hosted): R$ 35/mês (VPS)

WhatsApp:                   GRÁTIS
Mensagens:                  ILIMITADAS

RENDIZY Plano Pro:          R$ 49/mês
(WhatsApp incluído)

TOTAL:                      R$ 75-89/mês
```

### ROI Esperado

```
Economia de tempo:          10h/mês
Valor da hora:              R$ 50
Economia total:             R$ 500/mês

Conversão aumenta:          30%
Novas reservas:             +2/mês
Valor médio:                R$ 500
Receita adicional:          R$ 1.000/mês

ROI MENSAL:                 +R$ 1.500
Custo:                      -R$ 89
LUCRO LÍQUIDO:              +R$ 1.411/mês
```

---

## 📞 Suporte

### Precisa de Ajuda?

**RENDIZY:**
- Email: suporte@rendizy.com
- Chat: app.rendizy.com (ícone de chat)
- WhatsApp: +55 11 99999-9999

**Evolution API:**
- Docs: https://doc.evolution-api.com
- GitHub: https://github.com/EvolutionAPI/evolution-api
- Community: Discord/Telegram

---

## 🎯 Próximos Passos

Depois de conectar:

1. ✅ **Configure Templates**
   - Chat → Templates
   - Crie mensagens padrão
   - Use variáveis: {{guestName}}, {{propertyName}}

2. ✅ **Configure Automações** (v1.0.104)
   - Confirmação de Reserva automática
   - Lembrete de Check-in
   - Solicitação de Avaliação

3. ✅ **Treine Equipe**
   - Como usar o Chat
   - Boas práticas WhatsApp
   - Templates disponíveis

4. ✅ **Monitore Resultados**
   - Tempo de resposta
   - Satisfação dos hóspedes
   - Conversões

---

## 🎉 Parabéns!

Você configurou WhatsApp no RENDIZY! 🎊

Agora você pode:
- ✅ Receber mensagens de hóspedes
- ✅ Responder pelo WhatsApp
- ✅ Tudo integrado com Reservas
- ✅ Histórico completo salvo

**Dica final:** Comece devagar, teste bastante, depois escale! 🚀

---

**Versão**: v1.0.102  
**Última atualização**: 28 de Outubro de 2025  
**Status**: ✅ Pronto para uso
