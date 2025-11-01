# 🧪 GUIA DE TESTE - Atalho "/" para Templates no Chat (v1.0.92)

**Data:** 28/10/2025  
**Versão:** 1.0.92  
**Módulo:** Chat - Template Autocomplete

---

## 🎯 O QUE FOI IMPLEMENTADO

Sistema de **autocomplete de templates** usando o atalho de teclado **"/"** no Chat, permitindo inserção rápida de templates com busca em tempo real e navegação por teclado.

---

## 🚀 COMO TESTAR

### PASSO 1: Acessar o Chat

1. Abra o RENDIZY
2. No menu lateral, clique em **"Chat"**
3. Selecione qualquer conversa da lista

---

### PASSO 2: Testar Abertura do Popup

#### Teste 2.1: Abertura Básica
```
✅ No campo de mensagem, digite: /
```
**Resultado Esperado:**
- Popup aparece acima do textarea
- Mostra todos os templates disponíveis (5 templates iniciais)
- Header mostra "Templates disponíveis"
- Footer mostra instruções de navegação

#### Teste 2.2: Abertura com Espaço
```
✅ Digite: Olá! Gostaria de enviar /
```
**Resultado Esperado:**
- Popup abre após o "/"
- Mantém o texto "Olá! Gostaria de enviar " antes

---

### PASSO 3: Testar Busca em Tempo Real

#### Teste 3.1: Buscar por Nome
```
✅ Digite: /conf
```
**Resultado Esperado:**
- Filtra e mostra apenas "Confirmação de Reserva"
- Header mostra "Templates disponíveis (1)"

#### Teste 3.2: Buscar por Categoria
```
✅ Digite: /pre
```
**Resultado Esperado:**
- Filtra templates da categoria "Pré Check-in"
- Mostra 3 templates: Confirmação, Instruções, Lembrete

#### Teste 3.3: Busca sem Resultados
```
✅ Digite: /xyz
```
**Resultado Esperado:**
- Popup mostra lista vazia ou fecha automaticamente

#### Teste 3.4: Limpar Busca
```
✅ Digite: /conf
✅ Apague até ficar só: /
```
**Resultado Esperado:**
- Volta a mostrar todos os templates

---

### PASSO 4: Testar Navegação por Teclado

#### Teste 4.1: Seta para Baixo (↓)
```
✅ Digite: /
✅ Pressione: ↓ (seta para baixo)
```
**Resultado Esperado:**
- Primeiro template fica selecionado (background azul)
- Ícone "↵" aparece à direita

```
✅ Pressione: ↓ novamente
```
**Resultado Esperado:**
- Segundo template fica selecionado
- Primeiro perde seleção

```
✅ Continue pressionando ↓ até o último template
✅ Pressione: ↓ mais uma vez
```
**Resultado Esperado:**
- Volta para o primeiro template (navegação circular)

#### Teste 4.2: Seta para Cima (↑)
```
✅ Digite: /
✅ Pressione: ↑ (seta para cima)
```
**Resultado Esperado:**
- Último template fica selecionado

```
✅ Pressione: ↑ novamente
```
**Resultado Esperado:**
- Penúltimo template fica selecionado

#### Teste 4.3: Navegação com Mouse
```
✅ Digite: /
✅ Passe o mouse sobre um template
```
**Resultado Esperado:**
- Template sob o mouse fica selecionado
- Background muda para cinza claro ao hover

---

### PASSO 5: Testar Inserção de Template

#### Teste 5.1: Inserção com Enter
```
✅ Digite: /conf
✅ Pressione: Enter
```
**Resultado Esperado:**
- Template "Confirmação de Reserva" é inserido no textarea
- "/" e "conf" são removidos
- Popup fecha automaticamente
- Variáveis são substituídas:
  - {guest_name} → Nome do hóspede selecionado
  - {property_name} → Nome do imóvel
  - {checkin_date} → Data formatada (ex: 01/11/2025)
  - {checkout_date} → Data formatada (ex: 04/11/2025)

#### Teste 5.2: Inserção com Clique
```
✅ Digite: /
✅ Clique em qualquer template
```
**Resultado Esperado:**
- Template é inserido
- Popup fecha
- Variáveis substituídas

#### Teste 5.3: Inserção no Meio do Texto
```
✅ Digite: Olá! Segue /conf sobre sua reserva.
✅ Navegue até depois do "/" (cursor entre / e c)
✅ Pressione Enter no template
```
**Resultado Esperado:**
- Template é inserido no lugar correto
- Texto antes ("Olá! Segue ") é mantido
- Texto depois ("sobre sua reserva.") é mantido
- "/" é removido

---

### PASSO 6: Testar Fechamento do Popup

#### Teste 6.1: Fechar com Esc
```
✅ Digite: /
✅ Pressione: Esc
```
**Resultado Esperado:**
- Popup fecha imediatamente
- "/" permanece no texto
- Foco continua no textarea

#### Teste 6.2: Fechar com Espaço
```
✅ Digite: /
✅ Pressione: Espaço
```
**Resultado Esperado:**
- Popup fecha
- "/ " permanece no texto

#### Teste 6.3: Fechar Apagando "/"
```
✅ Digite: /conf
✅ Apague tudo (backspace até ficar vazio)
```
**Resultado Esperado:**
- Popup fecha quando não há mais "/"

---

### PASSO 7: Testar Compatibilidade

#### Teste 7.1: Botão Templates Continua Funcionando
```
✅ Clique no botão "Templates" (acima do textarea)
✅ Selecione um template do dropdown
```
**Resultado Esperado:**
- Dropdown abre normalmente
- Template é inserido ao clicar
- Funcionalidade original preservada

#### Teste 7.2: Envio de Mensagem com Enter
```
✅ Digite uma mensagem SEM "/"
✅ Pressione: Enter
```
**Resultado Esperado:**
- Mensagem é enviada normalmente
- Popup NÃO interfere

#### Teste 7.3: Quebra de Linha com Shift+Enter
```
✅ Digite: Primeira linha
✅ Pressione: Shift+Enter
✅ Digite: Segunda linha
```
**Resultado Esperado:**
- Quebra de linha é adicionada
- Mensagem NÃO é enviada

---

### PASSO 8: Testar Dark Mode

#### Teste 8.1: Alternar Dark Mode
```
✅ No canto superior direito, clique no ícone de Sol/Lua
✅ Ative o Dark Mode
✅ Digite: /
```
**Resultado Esperado:**
- Popup aparece com fundo escuro (dark:bg-gray-800)
- Texto em cores claras
- Border e separadores ajustados ao tema
- Seleção com background azul escuro

---

### PASSO 9: Testar Todos os Templates Iniciais

#### Templates para Testar:

1. **Confirmação de Reserva** (`/conf`)
   - Categoria: Pré Check-in
   - Variáveis: guest_name, checkin_date, checkout_date, property_name

2. **Instruções Check-in** (`/instr`)
   - Categoria: Pré Check-in
   - Variáveis: guest_name, property_address, access_code, wifi_name, wifi_password

3. **Lembrete 24h** (`/lembre`)
   - Categoria: Pré Check-in
   - Variáveis: guest_name, checkin_time, property_name

4. **Agradecimento** (`/agra`)
   - Categoria: Pós Check-out
   - Variáveis: guest_name, property_name

5. **Pedido de Avaliação** (`/aval`)
   - Categoria: Pós Check-out
   - Variáveis: guest_name, property_name

---

## ✅ CHECKLIST DE VALIDAÇÃO

### Funcionalidade Core
- [ ] Popup abre ao digitar "/"
- [ ] Busca filtra templates em tempo real
- [ ] Navegação por ↑↓ funciona
- [ ] Enter insere template selecionado
- [ ] Esc fecha popup
- [ ] Clique insere template

### Busca e Filtragem
- [ ] Busca por nome funciona
- [ ] Busca por categoria funciona
- [ ] Case-insensitive funciona
- [ ] Contador de resultados correto
- [ ] Lista vazia quando sem resultados

### Navegação
- [ ] Seta ↓ navega para próximo
- [ ] Seta ↑ navega para anterior
- [ ] Navegação circular funciona
- [ ] Mouse hover seleciona
- [ ] Indicador visual correto

### Inserção
- [ ] Template é inserido corretamente
- [ ] "/" e termo de busca são removidos
- [ ] Variáveis são substituídas
- [ ] Texto antes/depois preservado
- [ ] Cursor reposicionado corretamente

### Interface
- [ ] Popup posicionado corretamente
- [ ] Visual consistente com design system
- [ ] Dark mode funciona
- [ ] Scrollbar aparece quando necessário
- [ ] Instruções claras no footer

### Compatibilidade
- [ ] Botão "Templates" funciona
- [ ] Botão "Gerenciar" funciona
- [ ] Enter envia mensagem (sem popup)
- [ ] Shift+Enter faz quebra de linha
- [ ] Não quebra funcionalidades existentes

---

## 🐛 PROBLEMAS COMUNS E SOLUÇÕES

### Problema 1: Popup não abre
**Causa:** "/" digitado sem espaço antes  
**Solução:** Digite espaço antes do "/" ou use no início

### Problema 2: Template não filtra
**Causa:** Digitou espaço após "/"  
**Solução:** Apague o espaço, popup reabre

### Problema 3: Variáveis não substituídas
**Causa:** Conversa sem dados completos  
**Solução:** Selecione conversa com reservation_code válido

### Problema 4: Popup não fecha
**Causa:** Bug raro de estado  
**Solução:** Pressione Esc ou apague o "/"

---

## 📊 EXEMPLOS DE USO REAL

### Exemplo 1: Resposta Rápida
```
Situação: Hóspede pergunta sobre check-in

1. Selecione a conversa
2. Digite: /inst
3. Pressione Enter
4. Edite se necessário
5. Envie com Enter
```

### Exemplo 2: Múltiplos Templates
```
Situação: Enviar confirmação + instruções

1. Digite: /conf
2. Enter para inserir
3. Adicione quebra de linha
4. Digite: /inst  
5. Enter para inserir
6. Envie tudo junto
```

### Exemplo 3: Template Customizado
```
Situação: Template + texto personalizado

1. Digite: Olá! /
2. Digite: conf
3. Enter para inserir template
4. Continue: " e qualquer dúvida, estou à disposição!"
5. Envie
```

---

## 🎯 RESULTADOS ESPERADOS

Após os testes, você deve ter:

✅ **Popup funcional** abrindo com "/"  
✅ **Busca instantânea** filtrando templates  
✅ **Navegação fluida** por teclado e mouse  
✅ **Inserção correta** com variáveis substituídas  
✅ **UX consistente** com design system  
✅ **Compatibilidade total** com recursos existentes  

---

## 📝 REPORT DE BUGS

Se encontrar algum problema:

1. Abra o console do navegador (F12)
2. Anote mensagens de erro
3. Descreva passo a passo para reproduzir
4. Tire screenshot se possível
5. Reporte com detalhes

---

## 🚀 PRÓXIMOS PASSOS

Após validação:

1. ✅ Testar em diferentes navegadores
2. ✅ Testar em diferentes conversas
3. ✅ Testar com templates customizados
4. ✅ Validar performance com muitos templates
5. ✅ Coletar feedback de usuários

---

**Versão:** 1.0.92  
**Testado em:** [DATA]  
**Testado por:** [NOME]  
**Status:** [ ] Aprovado [ ] Com Pendências

---

**🎉 Bom teste! Este recurso vai acelerar muito o atendimento no Chat!**
