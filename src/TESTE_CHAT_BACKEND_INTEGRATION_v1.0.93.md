# 🧪 GUIA DE TESTE - Chat Backend Integration v1.0.93

**Data:** 28/10/2025  
**Versão:** 1.0.93  
**Módulo:** Chat/Mensagens  
**Tipo:** Integração com Backend + Funcionalidades Avançadas

---

## 🎯 OBJETIVO DO TESTE

Validar a **integração completa do Chat com backend** e as novas funcionalidades:
- ✅ Conexão com API real
- ✅ Upload de anexos
- ✅ Notas internas
- ✅ Busca avançada
- ✅ Loading states
- ✅ Error handling

---

## 📋 PRÉ-REQUISITOS

### Acesso
- [x] Aplicação rodando (dev ou produção)
- [x] Backend Supabase ativo
- [x] Navegador moderno (Chrome, Firefox, Edge)

### Dados de Teste
- [x] Pelo menos 3 conversas cadastradas
- [x] Mensagens em conversas diferentes
- [x] Arquivos para upload (imagens, PDFs)

---

## 🧪 TESTES FUNCIONAIS

### TESTE 1: Carregamento de Conversas

#### Passos:
1. Acesse o módulo **Chat**
2. Observe o comportamento inicial

#### Resultado Esperado:
- ✅ **Loading spinner** aparece brevemente
- ✅ Lista de conversas carrega da API
- ✅ Primeira conversa selecionada automaticamente
- ✅ Contador "Conversas (X)" correto
- ✅ **Se API falhar:** conversas mock aparecem (fallback)

#### Console:
```javascript
// Deve aparecer:
"Loading conversations from API..."
"Conversations loaded: X items"

// Se erro:
"Error loading conversations: [erro]"
"Falling back to mock data"
```

#### ✅ PASSOU | ❌ FALHOU
**Observações:**
```
_________________________________________________________________
_________________________________________________________________
```

---

### TESTE 2: Carregamento de Mensagens

#### Passos:
1. Clique em **diferentes conversas** na lista
2. Observe as mensagens carregando

#### Resultado Esperado:
- ✅ Mensagens carregam para cada conversa
- ✅ Scroll automático para última mensagem
- ✅ Mensagens do hóspede (esquerda, cinza)
- ✅ Mensagens da equipe (direita, azul)
- ✅ **Notas internas** (centro, amarelo) se houver
- ✅ Horários formatados corretamente

#### Estados:
- Mensagem do hóspede: fundo cinza, alinhada à esquerda
- Mensagem da equipe: fundo azul, alinhada à direita
- Nota interna: fundo amarelo, centralizado, badge "NOTA INTERNA"

#### ✅ PASSOU | ❌ FALHOU
**Observações:**
```
_________________________________________________________________
_________________________________________________________________
```

---

### TESTE 3: Envio de Mensagem Simples

#### Passos:
1. Selecione uma conversa
2. Digite uma mensagem no campo de texto
3. Clique no botão **Enviar** (ícone de avião)

#### Resultado Esperado:
- ✅ Botão mostra **spinner** durante envio
- ✅ Toast verde: **"Mensagem enviada"**
- ✅ Mensagem aparece na lista (direita, azul)
- ✅ Campo de texto **limpa** após envio
- ✅ **Última mensagem** da conversa atualiza
- ✅ Timestamp correto (hora atual)
- ✅ Ícone de ✓ (enviado) ou ✓✓ (lido)

#### Console:
```javascript
"Sending message..."
"Message sent successfully: [message_id]"
```

#### ✅ PASSOU | ❌ FALHOU
**Observações:**
```
_________________________________________________________________
_________________________________________________________________
```

---

### TESTE 4: Envio com Enter

#### Passos:
1. Digite uma mensagem
2. Pressione **Enter** (sem Shift)

#### Resultado Esperado:
- ✅ Mensagem enviada
- ✅ Campo limpa
- ✅ **Shift+Enter** cria quebra de linha (não envia)

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE 5: Upload de Anexo Único

#### Passos:
1. Clique no ícone de **📎 (clipe de papel)**
2. Selecione **1 arquivo** (imagem PNG ou JPG)
3. Observe o preview
4. Clique em **Enviar**

#### Resultado Esperado:
- ✅ Dialog de seleção de arquivo abre
- ✅ **Preview do anexo** aparece:
   - Ícone de imagem 🖼️
   - Nome do arquivo truncado
   - Botão ❌ para remover
- ✅ Arquivo enviado com a mensagem
- ✅ Preview **limpa** após envio
- ✅ Anexo aparece na mensagem enviada

#### Validações:
- Tipos aceitos: `.jpg`, `.png`, `.pdf`, `.doc`, `.docx`, `.txt`
- Tamanho máximo: **10MB**

#### ✅ PASSOU | ❌ FALHOU
**Observações:**
```
_________________________________________________________________
_________________________________________________________________
```

---

### TESTE 6: Upload de Múltiplos Anexos

#### Passos:
1. Clique no ícone de **📎**
2. Selecione **3 arquivos diferentes** (CTRL+Click ou CMD+Click)
3. Observe previews
4. Remova **1 arquivo** (clique no ❌)
5. Envie a mensagem

#### Resultado Esperado:
- ✅ **3 previews** aparecem
- ✅ Cada um com ícone correto (🖼️ para imagem, 📄 para doc)
- ✅ Ao remover, preview desaparece
- ✅ **2 anexos** enviados (3 - 1 removido)
- ✅ Mensagem mostra lista de anexos

#### ✅ PASSOU | ❌ FALHOU
**Observações:**
```
_________________________________________________________________
_________________________________________________________________
```

---

### TESTE 7: Validação de Tamanho de Arquivo

#### Passos:
1. Tente anexar um arquivo **> 10MB**

#### Resultado Esperado:
- ✅ Toast vermelho: **"Arquivo [nome] é muito grande (máx 10MB)"**
- ✅ Arquivo **não aparece** na lista de anexos
- ✅ Outros arquivos válidos continuam na lista

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE 8: Nota Interna

#### Passos:
1. Marque o checkbox **"Nota interna (visível apenas para equipe)"**
2. Digite: "Este cliente é VIP, dar atenção especial"
3. Envie

#### Resultado Esperado:
- ✅ Checkbox marca/desmarca corretamente
- ✅ Mensagem enviada como **nota interna**
- ✅ Toast: **"Nota interna adicionada"**
- ✅ Mensagem aparece **centralizada** com:
   - Fundo **amarelo** claro
   - Badge **"NOTA INTERNA"** em amarelo escuro
   - Ícone de nota 📝
   - Nome do autor
   - Timestamp
- ✅ Checkbox **desmarca** após envio

#### Console:
```javascript
"Sending internal note..."
"Internal note created: [note_id]"
```

#### ✅ PASSOU | ❌ FALHOU
**Observações:**
```
_________________________________________________________________
_________________________________________________________________
```

---

### TESTE 9: Busca Simples

#### Passos:
1. No campo de busca, digite: **"João"**
2. Observe os resultados

#### Resultado Esperado:
- ✅ Conversas de hóspedes com "João" no nome aparecem
- ✅ Outras conversas **desaparecem** da lista
- ✅ Contador atualiza: "Conversas (X)"
- ✅ Busca é **case-insensitive** (joão = João = JOÃO)

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE 10: Busca Avançada (Conteúdo de Mensagens)

#### Passos:
1. Digite na busca: **"WiFi"** (palavra que está em alguma mensagem)
2. Observe resultados

#### Resultado Esperado:
- ✅ Conversas que **contêm "WiFi" em alguma mensagem** aparecem
- ✅ Mesmo que o nome do hóspede não tenha "WiFi"
- ✅ Busca em **todas as mensagens** da conversa
- ✅ Resultados instantâneos

#### Teste com:
- [x] Nome do hóspede
- [x] Código de reserva
- [x] Nome do imóvel
- [x] Email
- [x] Telefone
- [x] **Conteúdo de mensagem**

#### ✅ PASSOU | ❌ FALHOU
**Observações:**
```
_________________________________________________________________
_________________________________________________________________
```

---

### TESTE 11: Pin/Unpin com Backend

#### Passos:
1. Clique no ícone de **📌 (pin)** em uma conversa
2. Observe a mudança
3. Clique novamente para **desafixar**
4. Tente fixar **6ª conversa** (já tendo 5 fixadas)

#### Resultado Esperado:
- ✅ Conversa move para seção **"Fixadas"**
- ✅ Ícone de pin fica **azul** e preenchido
- ✅ Chamada à API: `conversationsApi.togglePin()`
- ✅ Toast: **"Conversa fixada"**
- ✅ Ao desafixar: volta para seção original
- ✅ Toast: **"Conversa desafixada"**
- ✅ **Limite de 5:**
   - Toast vermelho: **"Máximo de 5 conversas fixadas"**
   - Conversa **não fixa**

#### Console:
```javascript
"Toggling pin for conversation: [conv_id]"
"Pin status updated successfully"
```

#### ✅ PASSOU | ❌ FALHOU
**Observações:**
```
_________________________________________________________________
_________________________________________________________________
```

---

### TESTE 12: Loading States

#### Passos:
1. **Recarregue** a página (F5)
2. Observe o loading inicial
3. Envie uma mensagem e observe o botão

#### Resultado Esperado:

**Ao carregar página:**
- ✅ Spinner animado aparece na lista de conversas
- ✅ "Carregando..." ou spinner visível
- ✅ Após carregar, spinner desaparece

**Ao enviar mensagem:**
- ✅ Botão de envio mostra **spinner girando**
- ✅ Botão fica **desabilitado**
- ✅ Após envio, volta ao ícone de avião
- ✅ Botão re-habilita

**Ao anexar arquivo:**
- ✅ Botão de anexo desabilita durante upload (se implementado)

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE 13: Empty States

#### Passos:
1. Busque por algo que **não existe**: "XYZABC123"
2. Observe o estado vazio

#### Resultado Esperado:
- ✅ Ícone de mensagem 💬 grande e transparente
- ✅ Texto: **"Nenhuma conversa encontrada"**
- ✅ Nenhuma conversa aparece na lista

#### Passos 2:
1. Selecione uma conversa **sem mensagens**
2. Observe a área de mensagens

#### Resultado Esperado:
- ✅ Ícone de mensagem 💬
- ✅ Texto: **"Nenhuma mensagem ainda"**

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE 14: Validações de Envio

#### Passos:
1. Tente enviar com campo de mensagem **vazio** e **sem anexos**
2. Observe o botão

#### Resultado Esperado:
- ✅ Botão de envio **desabilitado** (opaco)
- ✅ Nada acontece ao clicar
- ✅ Digite algo → botão **habilita**
- ✅ Anexe arquivo (sem texto) → botão **habilita**

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE 15: Compatibilidade com Templates

#### Passos:
1. Digite **"/"** no campo de mensagem
2. Popup de templates abre
3. Selecione um template
4. Adicione uma nota interna
5. Anexe um arquivo
6. Envie

#### Resultado Esperado:
- ✅ Popup de templates funciona normalmente
- ✅ Template inserido no campo
- ✅ Checkbox de nota interna independente
- ✅ Anexo adicionado normalmente
- ✅ Tudo enviado junto corretamente

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE 16: Error Handling

#### Passos:
1. **Desconecte** a internet ou desligue o backend
2. Tente enviar uma mensagem
3. Observe o comportamento

#### Resultado Esperado:
- ✅ Toast vermelho: **"Erro ao enviar mensagem"**
- ✅ Mensagem **não aparece** na lista
- ✅ Campo de texto **não limpa** (mensagem preservada)
- ✅ Console mostra erro detalhado
- ✅ **Reconectar internet** e tentar novamente funciona

#### Console:
```javascript
"Error sending message: [erro]"
"Network error" ou "Failed to fetch"
```

#### ✅ PASSOU | ❌ FALHOU
**Observações:**
```
_________________________________________________________________
_________________________________________________________________
```

---

## 🎨 TESTES VISUAIS

### TESTE V1: Design de Mensagens

#### Verificar:
- [ ] **Mensagem do hóspede:**
  - Alinhada à esquerda
  - Fundo cinza claro (light) ou cinza escuro (dark)
  - Nome do remetente visível
  - Timestamp visível

- [ ] **Mensagem da equipe:**
  - Alinhada à direita
  - Fundo azul (#2563eb)
  - Texto branco
  - Ícones ✓ ou ✓✓ brancos

- [ ] **Nota interna:**
  - Centralizada
  - Fundo amarelo claro
  - Borda amarela
  - Badge "NOTA INTERNA" amarelo escuro
  - Ícone 📝

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE V2: Preview de Anexos

#### Verificar:
- [ ] Imagens: ícone 🖼️
- [ ] Documentos: ícone 📄
- [ ] Nome do arquivo truncado (max 200px)
- [ ] Botão ❌ visível e funcional
- [ ] Layout responsivo (wrap em telas pequenas)

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE V3: Loading Spinners

#### Verificar:
- [ ] Spinner na lista de conversas (ao carregar)
- [ ] Spinner no botão de envio (ao enviar)
- [ ] Animação suave (rotate)
- [ ] Cor cinza apropriada
- [ ] Tamanho correto (h-4 w-4 ou h-8 w-8)

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE V4: Dark Mode

#### Passos:
1. Ative o **dark mode**
2. Navegue pelo chat
3. Envie mensagens, anexos, notas internas

#### Verificar:
- [ ] Conversas legíveis
- [ ] Mensagens com contraste adequado
- [ ] Notas internas em amarelo escuro
- [ ] Anexos visíveis
- [ ] Checkboxes e inputs funcionam
- [ ] Sem elementos "invisíveis"

#### ✅ PASSOU | ❌ FALHOU

---

## 📊 TESTES DE PERFORMANCE

### TESTE P1: Muitas Conversas

#### Cenário:
- 50+ conversas cadastradas

#### Verificar:
- [ ] Carregamento rápido (< 2 segundos)
- [ ] Scroll suave na lista
- [ ] Busca instantânea
- [ ] Sem lag ao selecionar conversas

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE P2: Muitas Mensagens

#### Cenário:
- Conversa com 100+ mensagens

#### Verificar:
- [ ] Carregamento rápido
- [ ] Scroll suave
- [ ] Auto-scroll para última mensagem
- [ ] Sem travamentos

#### ✅ PASSOU | ❌ FALHOU

---

## 🔍 TESTES DE INTEGRAÇÃO

### TESTE I1: Persistência de Dados

#### Passos:
1. Envie uma mensagem
2. **Recarregue** a página (F5)
3. Verifique a conversa

#### Resultado Esperado:
- ✅ Mensagem **persiste** (não some)
- ✅ Última mensagem atualizada
- ✅ Timestamp correto

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE I2: Sincronização de Estado

#### Passos:
1. Fixe uma conversa
2. Envie uma mensagem
3. Verifique que conversa continua fixada

#### Resultado Esperado:
- ✅ Pin status mantido
- ✅ Mensagem adicionada
- ✅ Ordem mantida

#### ✅ PASSOU | ❌ FALHOU

---

## ⚠️ CASOS EXTREMOS

### TESTE E1: Mensagem Muito Longa

#### Passos:
1. Cole um texto com **5000 caracteres**
2. Envie

#### Resultado Esperado:
- ✅ Mensagem enviada
- ✅ Text-wrap funcionando
- ✅ Scroll na mensagem se necessário
- ✅ Não quebra layout

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE E2: Caracteres Especiais

#### Passos:
1. Envie: "Olá! 🎉 #VIP @João €100 <tag>"
2. Observe

#### Resultado Esperado:
- ✅ Emojis aparecem: 🎉
- ✅ Símbolos preservados: €, @, #
- ✅ HTML escapado: `<tag>` não renderiza como HTML
- ✅ Quebras de linha preservadas

#### ✅ PASSOU | ❌ FALHOU

---

### TESTE E3: Nome de Arquivo Longo

#### Passos:
1. Anexe arquivo: "relatorio_final_completo_versao_3_revisado_aprovado_2025.pdf"
2. Observe preview

#### Resultado Esperado:
- ✅ Nome **truncado** com "..."
- ✅ Tooltip mostra nome completo (se hover)
- ✅ Não quebra layout

#### ✅ PASSOU | ❌ FALHOU

---

## 📱 TESTES RESPONSIVOS

### Mobile (< 768px)
- [ ] Lista de conversas responsiva
- [ ] Mensagens legíveis
- [ ] Botões acessíveis
- [ ] Upload funciona

### Tablet (768px - 1024px)
- [ ] Layout adaptado
- [ ] Sidebar colapsável funciona

### Desktop (> 1024px)
- [ ] Layout completo visível
- [ ] Todas funcionalidades acessíveis

#### ✅ PASSOU | ❌ FALHOU

---

## 🎯 CHECKLIST FINAL

### Funcionalidades Básicas
- [ ] Carregar conversas da API
- [ ] Carregar mensagens da API
- [ ] Enviar mensagem
- [ ] Loading states funcionam
- [ ] Error handling funciona

### Anexos
- [ ] Selecionar arquivo
- [ ] Preview de anexo
- [ ] Remover anexo
- [ ] Validação de tamanho
- [ ] Enviar com mensagem

### Notas Internas
- [ ] Checkbox funciona
- [ ] Design diferenciado
- [ ] Badge visível
- [ ] Toast correto

### Busca
- [ ] Busca por nome
- [ ] Busca por código
- [ ] Busca em mensagens
- [ ] Resultados instantâneos

### Pin/Unpin
- [ ] Fixar conversa
- [ ] Desafixar conversa
- [ ] Limite de 5 validado
- [ ] Integração com API

### Compatibilidade
- [ ] Templates funcionam
- [ ] Tags funcionam
- [ ] Drag & Drop funciona
- [ ] Dark mode OK

---

## 📝 RELATÓRIO DE BUGS

### Bug #1
**Descrição:**
```
_________________________________________________________________
```
**Severidade:** 🔴 Crítico | 🟡 Médio | 🟢 Baixo

**Passos para Reproduzir:**
```
1. 
2. 
3. 
```

**Resultado Esperado:**
```
_________________________________________________________________
```

**Resultado Obtido:**
```
_________________________________________________________________
```

---

### Bug #2
_(Adicionar conforme necessário)_

---

## ✅ APROVAÇÃO

### Testado por:
**Nome:** ____________________________  
**Data:** ____/____/________  
**Ambiente:** [ ] Dev [ ] Staging [ ] Produção

### Resultado Geral:
- [ ] ✅ **APROVADO** - Todas as funcionalidades funcionam
- [ ] ⚠️ **APROVADO COM RESSALVAS** - Bugs menores identificados
- [ ] ❌ **REPROVADO** - Bugs críticos impedem uso

### Notas Finais:
```
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
```

---

## 🚀 PRÓXIMOS TESTES (v1.0.94+)

- [ ] Upload real para Supabase Storage
- [ ] Integração com Email (SendGrid)
- [ ] Integração com WhatsApp Business API
- [ ] Sistema de automação
- [ ] Analytics de mensagens

---

**Documento gerado para RENDIZY v1.0.93**  
**Teste responsável, relate bugs, melhore o produto!** 💪
