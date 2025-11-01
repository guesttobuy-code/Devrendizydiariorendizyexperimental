# 🧪 GUIA DE TESTE - EDIÇÃO E EXCLUSÃO DE BLOQUEIOS

## 📋 Checklist de Testes

### 1️⃣ CRIAR BLOQUEIO
- [ ] Ir para o módulo **Calendário**
- [ ] Selecionar uma data vazia (arrastar e soltar)
- [ ] No menu de ações rápidas, escolher **"Bloqueio"**
- [ ] Criar um bloqueio **simples** (sem subtipo)
- [ ] ✅ Verificar que aparece no calendário em laranja

### 2️⃣ VISUALIZAR BLOQUEIO
- [ ] Clicar no bloqueio criado no calendário
- [ ] ✅ Modal de detalhes deve abrir
- [ ] ✅ Deve mostrar:
  - Propriedade
  - Datas (início → fim)
  - Número de noites
  - Tipo de bloqueio (se definido)
  - Comentário (se houver)

### 3️⃣ EDITAR BLOQUEIO - MUDAR SUBTIPO
- [ ] No modal de detalhes, clicar em **"Editar"**
- [ ] Selecionar subtipo **"Preditivo"**
- [ ] Adicionar um comentário: "Teste de edição de bloqueio"
- [ ] Clicar em **"Salvar Alterações"**
- [ ] ✅ Toast de sucesso deve aparecer
- [ ] ✅ Modal volta ao modo visualização
- [ ] ✅ Badge "Preditivo" deve aparecer

### 4️⃣ EDITAR BLOQUEIO - MANUTENÇÃO COM HORÁRIOS
- [ ] Clicar em **"Editar"** novamente
- [ ] Selecionar subtipo **"Manutenção"**
- [ ] Campos de horários devem aparecer:
  - [ ] Definir check-in: **16:00**
  - [ ] Definir check-out: **10:00**
  - [ ] Marcar limitação: **Ações**
  - [ ] Marcar limitação: **Espera**
- [ ] Clicar em **"Salvar Alterações"**
- [ ] ✅ Toast de sucesso
- [ ] ✅ Badge "Manutenção" em laranja
- [ ] ✅ Informações de horários devem aparecer

### 5️⃣ CANCELAR EDIÇÃO
- [ ] Clicar em **"Editar"**
- [ ] Fazer alguma alteração
- [ ] Clicar em **"Cancelar"**
- [ ] ✅ Alterações devem ser descartadas
- [ ] ✅ Valores originais restaurados

### 6️⃣ EXCLUIR BLOQUEIO
- [ ] No modal de detalhes, clicar em **"Excluir"** (botão vermelho)
- [ ] ✅ Dialog de confirmação deve aparecer
- [ ] Ler a mensagem de aviso
- [ ] Clicar em **"Excluir Bloqueio"**
- [ ] ✅ Toast de sucesso
- [ ] ✅ Modal deve fechar
- [ ] ✅ Bloqueio deve desaparecer do calendário
- [ ] ✅ Data fica disponível novamente

### 7️⃣ TESTE COMPLETO - FLUXO REAL
- [ ] Criar bloqueio de **manutenção** com:
  - Datas: 15-17 de qualquer mês
  - Check-in: 15:00
  - Check-out: 11:00
  - Limitação: Ações
  - Comentário: "Pintura do apartamento"
- [ ] Salvar e verificar no calendário
- [ ] Clicar no bloqueio e visualizar detalhes
- [ ] Editar para adicionar limitação "Espera"
- [ ] Salvar e verificar
- [ ] Excluir o bloqueio
- [ ] ✅ Tudo deve funcionar perfeitamente

## 🔍 O QUE VERIFICAR

### ✅ Visual
- Badge de subtipo aparece corretamente (cores certas)
- Bloqueio no calendário em laranja com ícone 🔧
- Hover no bloqueio mostra cursor pointer
- Modal responsivo e bem formatado

### ✅ Funcional
- Edição salva corretamente no backend (mock localStorage)
- Exclusão remove do backend
- Calendário atualiza automaticamente
- Toasts aparecem nas ações corretas
- Dialog de confirmação previne exclusão acidental

### ✅ Dados
- Subtipo persiste após edição
- Notas/comentários salvam corretamente
- Horários de manutenção salvam
- Limitações salvam
- Datas originais não mudam

## 🐛 POSSÍVEIS PROBLEMAS

### Se o modal não abrir:
- Verificar console do navegador
- Verificar se bloqueio tem ID válido
- Verificar se propriedade existe

### Se edição não salvar:
- Verificar console para erros
- Verificar se mockBackend está ativo
- Verificar localStorage (`rendizy_data`)

### Se exclusão não funcionar:
- Verificar se ID do bloqueio é válido
- Verificar se função handleBlockDelete foi chamada
- Verificar refresh do calendário

## 📊 RESULTADO ESPERADO

Ao final dos testes, você deve ser capaz de:
- ✅ Criar bloqueios de qualquer tipo
- ✅ Clicar e visualizar detalhes
- ✅ Editar subtipo, comentários e horários
- ✅ Excluir bloqueios com confirmação
- ✅ Ver atualizações em tempo real no calendário

---

**Status da Implementação:** ✅ 100% COMPLETO  
**Versão:** v1.0.50  
**Data:** 28 OUT 2025
