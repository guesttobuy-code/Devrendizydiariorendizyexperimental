# 🧪 TESTE RÁPIDO: WhatsApp em Integrações

**Versão:** v1.0.103.42  
**Componente:** WhatsApp Integration  
**Tempo estimado:** 5 minutos

---

## 🎯 CHECKLIST DE TESTE

### ✅ PASSO 1: Acessar Integrações
```
1. Abrir o sistema RENDIZY
2. Ir em: Configurações (menu lateral)
3. Clicar na tab: "Integrações"
```

**Resultado esperado:**
- ✅ Tab "Integrações" visível
- ✅ Cards de integrações exibidos em grid

---

### ✅ PASSO 2: Verificar Card WhatsApp
```
Procurar o card "WhatsApp Business" na grid
```

**Resultado esperado:**
- ✅ Card verde com gradiente (green-500 to green-600)
- ✅ Ícone de mensagem (MessageCircle) branco
- ✅ Título: "WhatsApp Business"
- ✅ Badge "NOVO" visível
- ✅ Descrição: "Integração com Evolution API para mensagens"
- ✅ Estatística: "0 conectados | 0 inativos"
- ✅ Botão "Configurar" na parte inferior

---

### ✅ PASSO 3: Abrir Modal WhatsApp
```
Clicar no card "WhatsApp Business"
```

**Resultado esperado:**
- ✅ Modal abre em tela
- ✅ Header com ícone verde e título "WhatsApp Business"
- ✅ Descrição: "Integração com Evolution API para mensagens"
- ✅ 3 tabs visíveis: "Configuração", "Status & Conexão", "Avançado"

---

### ✅ PASSO 4: Tab "Configuração"
```
Verificar conteúdo da primeira tab
```

**Resultado esperado:**
- ✅ Card "Credenciais da Evolution API"
- ✅ Campo "URL da Evolution API" com placeholder
- ✅ Campo "Nome da Instância" com placeholder
- ✅ Campo "API Key" com botão show/hide (olho)
- ✅ Campo "URL do Webhook" (readonly) com botão copiar
- ✅ Botão "Testar Conexão" (outline)
- ✅ Botão "Salvar Configurações" (azul)

---

### ✅ PASSO 5: Tab "Status & Conexão"
```
Clicar na tab "Status & Conexão"
```

**Resultado esperado:**
- ✅ Card "Conectar WhatsApp"
- ✅ Botão "Gerar QR Code" (verde)
- ✅ Alert informativo (se campos não preenchidos)
- ✅ 3 cards de estatísticas:
  - Status (Online/Offline)
  - Mensagens Hoje (0)
  - Taxa de Resposta (0%)

---

### ✅ PASSO 6: Tab "Avançado"
```
Clicar na tab "Avançado"
```

**Resultado esperado:**
- ✅ Card "Configurações Avançadas"
- ✅ Alert com ícone de alerta
- ✅ Mensagem: "Configurações avançadas em breve"
- ✅ Lista de recursos planejados:
  - Respostas automáticas
  - Agendamento de mensagens
  - Templates personalizados
  - Integração com chatbots
  - Relatórios e analytics

---

### ✅ PASSO 7: Teste de Interação
```
1. Voltar para tab "Configuração"
2. Preencher campo "URL da Evolution API": https://api.example.com
3. Preencher campo "Nome da Instância": teste-123
4. Preencher campo "API Key": key123
5. Clicar no ícone de olho no campo API Key
6. Clicar no botão "Copiar" do webhook
```

**Resultado esperado:**
- ✅ Campos preenchidos corretamente
- ✅ API Key alterna entre mostrar/ocultar
- ✅ Toast "URL do webhook copiada!" aparece
- ✅ Botões "Testar Conexão" e "Salvar" ativos

---

### ✅ PASSO 8: Verificar Chat Settings
```
1. Fechar modal WhatsApp
2. Voltar para tab "Chat" nas Configurações
3. Rolar até o final da página
```

**Resultado esperado:**
- ✅ Configuração de WhatsApp NÃO está mais na tab Chat
- ✅ Apenas configurações gerais de chat estão presentes:
  - Resposta Automática
  - Notificações
  - Comportamento
  - Templates e Atalhos
  - Filtros Padrão

---

## 🎨 COMPARAÇÃO VISUAL

### Card na Grid de Integrações

```
┌─────────────────────────────────────────┐
│  [🟢]  WhatsApp Business      [NOVO]    │
│                                          │
│  Integração com Evolution API para      │
│  mensagens                               │
│                                          │
│  🟢 0 conectados  ⚪ 0 inativos         │
│                                          │
│  [        Configurar        ]           │
└─────────────────────────────────────────┘
```

### Comparação com Stays.net

```
Stays.net (Azul/Roxo):     WhatsApp (Verde):
┌──────────────────┐       ┌──────────────────┐
│ [🔵🟣] Stays.net │       │ [🟢] WhatsApp    │
│ PMS              │       │ NOVO             │
└──────────────────┘       └──────────────────┘
```

---

## 🐛 POSSÍVEIS PROBLEMAS

### Problema 1: Card não aparece
**Causa:** Não recarregou após atualização  
**Solução:** Dar refresh na página (F5)

### Problema 2: Modal não abre
**Causa:** Erro no componente  
**Solução:** Verificar console do browser (F12)

### Problema 3: Tabs não funcionam
**Causa:** Shadcn Tabs não carregado  
**Solução:** Verificar imports no componente

---

## 📸 SCREENSHOTS ESPERADOS

### 1. Grid de Integrações
```
- Cards lado a lado: Stays.net | WhatsApp | Booking.com
- WhatsApp com cor verde destacada
- Badge "NOVO" visível
```

### 2. Modal Aberto (Tab Configuração)
```
- Header verde com ícone
- Formulário com 4 campos
- 2 botões na parte inferior
```

### 3. Modal (Tab Status)
```
- Botão grande verde "Gerar QR Code"
- 3 cards de estatísticas lado a lado
```

---

## ✅ CRITÉRIOS DE SUCESSO

Para considerar o teste APROVADO, verifique:

1. ✅ Card WhatsApp visível em Integrações
2. ✅ Card com cor verde e badge "NOVO"
3. ✅ Modal abre ao clicar no card
4. ✅ 3 tabs funcionando corretamente
5. ✅ Todos os campos e botões visíveis
6. ✅ WhatsApp NÃO está mais em Chat Settings
7. ✅ Funcionalidade de copiar webhook funciona
8. ✅ Botão show/hide API Key funciona

---

## 📊 RESULTADO FINAL

```
Total de verificações: 8
Aprovadas: ___/8
Falhas: ___/8

Status: [ ] APROVADO  [ ] REPROVADO
```

---

## 🎯 PRÓXIMO PASSO

Se todos os testes passaram:
✅ **WhatsApp Integration está funcionando perfeitamente!**

Se algum teste falhou:
❌ **Reportar no console/documentação qual teste falhou**

---

## 💡 DICA FINAL

Para testar rapidamente:
1. F5 para recarregar a página
2. Configurações → Integrações
3. Clicar no card verde "WhatsApp Business"
4. Verificar se modal abre com 3 tabs

**Tempo estimado:** 30 segundos para verificação rápida!
