# 🧪 GUIA DE TESTE - Canais de Comunicação v1.0.101

**Data**: 28 de Outubro de 2025  
**Versão**: v1.0.101  
**Objetivo**: Validar implementação da fundação multi-canal  

---

## ✅ Checklist de Testes

### 1. **Configurações → Chat → Canais de Comunicação**

#### 🟢 Teste 1: Acessar Configurações de Canais
- [ ] Menu → Configurações
- [ ] Clicar na aba "Chat"
- [ ] Rolar até "Canais de Comunicação"
- [ ] **Esperado**: Ver 3 cards (WhatsApp, SMS, Automações)

#### 🟢 Teste 2: WhatsApp - Ativar
- [ ] Clicar no switch "WhatsApp (Evolution API)"
- [ ] **Esperado**: 
  - Switch fica ON
  - Formulário de configuração aparece
  - Status mostra "Desconectado"

#### 🟢 Teste 3: WhatsApp - Preencher Dados
- [ ] Preencher URL: `https://api.evolutionapi.com`
- [ ] Preencher Instância: `rendizy-test-123`
- [ ] Preencher API Key: `test-key-12345`
- [ ] **Esperado**: Campos aceitam input normalmente

#### 🟢 Teste 4: WhatsApp - Copiar Webhook
- [ ] Clicar no botão [📋] ao lado da URL do Webhook
- [ ] **Esperado**: 
  - Toast "URL do webhook copiada!"
  - URL copiada para clipboard
  - Formato: `https://XXX.supabase.co/.../whatsapp/webhook`

#### 🟢 Teste 5: WhatsApp - Gerar QR Code (Mock)
- [ ] Clicar em "Gerar QR Code"
- [ ] **Esperado**: 
  - Toast "Integração WhatsApp em desenvolvimento (v1.0.102)"
  - Botão fica disabled durante request
  - Não quebra a interface

#### 🟢 Teste 6: SMS - Verificar Status
- [ ] Verificar card SMS
- [ ] **Esperado**: 
  - Switch desabilitado
  - Badge "Em breve"
  - Mensagem "v1.0.103+"

#### 🟢 Teste 7: Automações - Verificar Status
- [ ] Verificar card Automações
- [ ] **Esperado**: 
  - Switches desabilitados
  - Badge "Em breve"
  - Mensagem "v1.0.104"

### 2. **Chat - Indicadores Visuais**

#### 🟢 Teste 8: Ícones de Canal (Simulação)
- [ ] Abrir ChatInbox
- [ ] Verificar conversas na lista
- [ ] **Esperado**: 
  - Cada conversa mostra ícone do canal
  - WhatsApp: 🟢 (MessageCircle verde)
  - SMS: 📱 (Phone azul)
  - Email: 💜 (Mail roxo)
  - Interno: 💬 (MessageSquare cinza)

#### 🟢 Teste 9: Status de Entrega
- [ ] Abrir uma conversa
- [ ] Enviar mensagem como staff
- [ ] **Esperado**: 
  - Mensagem mostra timestamp
  - Ícone de status (✓ ou ✓✓)
  - Não quebra a funcionalidade existente

### 3. **Backend - APIs**

#### 🟢 Teste 10: GET Config (via DevTools)

Abra DevTools → Network → Envie request:

```bash
GET /make-server-67caf26a/chat/channels/config?organization_id=org-001
```

**Esperado**:
```json
{
  "success": true,
  "data": {
    "organization_id": "org-001",
    "whatsapp": {
      "enabled": false,
      "api_url": "",
      "instance_name": "",
      "api_key": "",
      "connected": false,
      "connection_status": "disconnected"
    },
    "sms": {
      "enabled": false,
      "account_sid": "",
      "auth_token": "",
      "phone_number": "",
      "credits_remaining": 0,
      "credits_used": 0
    },
    "automations": {
      "reservation_confirmation": false,
      "checkin_reminder": false,
      "checkout_review": false,
      "payment_reminder": false
    },
    "auto_reply_templates": {},
    "created_at": "2025-10-28T...",
    "updated_at": "2025-10-28T..."
  }
}
```

#### 🟢 Teste 11: PATCH Config

```bash
PATCH /make-server-67caf26a/chat/channels/config

Body:
{
  "organization_id": "org-001",
  "whatsapp": {
    "enabled": true,
    "api_url": "https://test.api.com",
    "instance_name": "test-instance",
    "api_key": "test-key",
    "connected": false,
    "connection_status": "disconnected"
  }
}
```

**Esperado**: Status 200, config atualizada

#### 🟢 Teste 12: WhatsApp Connect (501)

```bash
POST /make-server-67caf26a/chat/channels/whatsapp/connect

Body:
{
  "organization_id": "org-001",
  "api_url": "https://test.api.com",
  "instance_name": "test",
  "api_key": "key"
}
```

**Esperado**: Status 501, mensagem "v1.0.102"

### 4. **Tipos TypeScript**

#### 🟢 Teste 13: Verificar Tipos

- [ ] Abrir `utils/chatApi.ts`
- [ ] Verificar interface `Message`
- [ ] **Esperado**: Campos `channel`, `direction`, `external_id`, `external_status`, `metadata` presentes

- [ ] Verificar interface `Conversation`
- [ ] **Esperado**: Campos `external_conversation_id`, `last_channel`, `channel_metadata` presentes

- [ ] Verificar `OrganizationChannelConfig`
- [ ] **Esperado**: Interface completa com `whatsapp`, `sms`, `automations`

### 5. **Compatibilidade**

#### 🟢 Teste 14: Chat Existente Não Quebrou
- [ ] Abrir Chat
- [ ] Listar conversas
- [ ] Abrir uma conversa
- [ ] Enviar mensagem
- [ ] Usar templates
- [ ] Usar tags
- [ ] Enviar anexo
- [ ] **Esperado**: Tudo funciona normalmente

#### 🟢 Teste 15: Filtros de Chat
- [ ] Abrir filtro lateral (direita)
- [ ] Aplicar filtros
- [ ] **Esperado**: Funciona normalmente

#### 🟢 Teste 16: Settings Outras Abas
- [ ] Configurações → Propriedades
- [ ] **Esperado**: Funciona normalmente
- [ ] Não há regressão

---

## 🎯 Cenários Avançados

### Cenário A: Fluxo Completo WhatsApp (Simulação)

1. Abrir Configurações → Chat
2. Ativar WhatsApp
3. Preencher credenciais
4. Copiar webhook
5. Tentar gerar QR Code
6. Verificar toast de "v1.0.102"
7. Desativar WhatsApp
8. **Resultado**: Fluxo completo sem erros

### Cenário B: Multi-Organização

1. Configurar WhatsApp para `org-001`
2. Trocar para `org-002`
3. Verificar configuração vazia
4. Configurar diferente para `org-002`
5. Voltar para `org-001`
6. **Esperado**: Cada org tem config isolada

### Cenário C: Persistência

1. Configurar WhatsApp
2. Salvar
3. Recarregar página
4. Abrir Configurações → Chat
5. **Esperado**: Configuração permanece

---

## 🐛 Possíveis Bugs a Verificar

### Bug 1: Switch não persiste
- **Sintoma**: Ativa WhatsApp, recarrega, volta desativado
- **Causa**: PATCH não salvando
- **Fix**: Verificar chamada à API

### Bug 2: Webhook URL incorreta
- **Sintoma**: URL do webhook quebrada
- **Causa**: projectId undefined
- **Fix**: Verificar import de `info.tsx`

### Bug 3: Toast não aparece
- **Sintoma**: Ações não mostram feedback
- **Causa**: Sonner não importado
- **Fix**: Verificar import e versão

### Bug 4: Tipos não reconhecidos
- **Sintoma**: TypeScript reclama de campos novos
- **Causa**: Cache do TS
- **Fix**: Reiniciar TS server

---

## 📊 Resultados Esperados

### ✅ Sucesso Total
- Todos os 16 testes passam
- Nenhum console.error
- Nenhuma regressão
- Interface fluida

### ⚠️ Sucesso Parcial
- 14-15 testes passam
- Alguns console.warns (aceitável)
- Pequenos ajustes necessários

### ❌ Falha
- Menos de 12 testes passam
- Console.errors presentes
- Funcionalidade quebrada
- Regressões graves

---

## 🔍 Como Debugar

### Console Logs Úteis

No ChatInbox.tsx:
```typescript
console.log('Channel config:', config);
console.log('Message channel:', message.channel);
console.log('Delivery status:', message.external_status);
```

No SettingsManager.tsx:
```typescript
console.log('Loading config for org:', organizationId);
console.log('WhatsApp config:', config?.whatsapp);
console.log('Connecting WhatsApp:', whatsappForm);
```

### Network Tab

Verificar requests:
- `/chat/channels/config` - GET e PATCH
- `/chat/channels/whatsapp/connect` - POST (501)
- `/chat/channels/whatsapp/status` - POST

### React DevTools

Verificar state:
- `ChannelsCommunicationSettings` component
- State: `config`, `whatsappForm`, `connectingWhatsApp`

---

## 📝 Checklist Final

Antes de considerar v1.0.101 completa:

- [ ] Todos os testes passam
- [ ] Nenhum console.error
- [ ] Tipos TypeScript corretos
- [ ] UI responsiva
- [ ] Dark mode funciona
- [ ] Documentação completa
- [ ] Changelog criado
- [ ] BUILD_VERSION atualizado
- [ ] Chat existente funciona
- [ ] Sem breaking changes

---

## 🎉 Após Validação

**Se tudo OK:**
1. ✅ v1.0.101 está completa
2. ✅ Fundação multi-canal implementada
3. ✅ Pronto para v1.0.102 (WhatsApp real)

**Próximos passos:**
- Começar v1.0.102
- Implementar Evolution API
- Testar com WhatsApp real
- Documentar setup para clientes

---

**Observações:**
- Esta é uma versão de fundação
- WhatsApp/SMS não funcionam ainda (esperado)
- UI e estrutura estão 100% prontas
- v1.0.102 vai ativar as integrações reais

---

**Versão**: v1.0.101  
**Data**: 28 de Outubro de 2025  
**Status**: Pronto para teste 🚀
