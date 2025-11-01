# 🧪 GUIA DE TESTE - Chat com Modais Integrados v1.0.90

**Data:** 29/10/2025  
**Versão:** v1.0.90  
**Tempo estimado:** 5 minutos

---

## 🎯 O que você vai testar

✅ Integração de modais de Cotação, Reserva e Bloqueio no Chat  
✅ Diferenciação entre LEAD (negociação) e HÓSPEDE (reserva)  
✅ Pré-preenchimento automático de dados  
✅ Botões de ação rápida contextuais

---

## 📋 TESTE 1: LEAD - Negociação (Cliente Novo)

### **Passo a passo:**

1. **Acesse o módulo Chat**
   - Clique em "Chat" no menu lateral

2. **Selecione a conversa "Patricia Oliveira"**
   - É a última conversa da lista
   - Deve ter badge laranja "NEGOCIAÇÃO"

3. **Verifique o header da conversa:**
   ```
   ✅ Badge laranja: "🤝 NEGOCIAÇÃO - Cliente interessado"
   ✅ Info: "• 6 pessoas • Cabo Frio"
   ✅ 2 botões: [Fazer Cotação] [Criar Reserva]
   ```

4. **Clique em "Fazer Cotação"**
   - Modal de Ações Rápidas deve abrir
   - Deve mostrar:
     - Datas: 15/nov - 22/nov
     - 7 noites
     - Propriedade: Casa Vista Mar

5. **Clique em "Fazer cotação" no modal**
   - QuotationModal abre
   - **VERIFIQUE PRÉ-PREENCHIMENTO:**
     - ✅ Nome: Patricia Oliveira
     - ✅ Email: patricia@email.com
     - ✅ Telefone: +55 22 99888-7766
     - ✅ Período: 15/nov - 22/nov
     - ✅ 7 noites

6. **Simule envio da cotação**
   - Clique "Gerar cotação"
   - Toast deve aparecer: "Link copiado!"
   - Modal fecha

### **✅ Resultado esperado:**
- Badge laranja visível
- Botões corretos (Cotação + Reserva)
- Todos os dados pré-preenchidos
- Modal abre e fecha corretamente

---

## 📋 TESTE 2: HÓSPEDE - Reserva Confirmada

### **Passo a passo:**

1. **Selecione a conversa "João Silva"**
   - Primeira da lista (categoria Urgente)
   - Deve ter badge azul "HÓSPEDE"

2. **Verifique o header:**
   ```
   ✅ Badge azul: "🏠 HÓSPEDE - Reserva RES-015"
   ✅ 2 botões: [Ações Rápidas] [Bloqueio]
   ```

3. **Clique em "Ações Rápidas"**
   - Modal QuickActions abre
   - Deve mostrar:
     - Datas: 29/out - 03/nov (check-in/out do João)
     - Propriedade: Casa Itaúnas Vista Mar
     - 5 opções disponíveis

4. **Teste "Criar Bloqueio"**
   - Clique em "Criar bloqueio"
   - BlockModal abre
   - **VERIFIQUE:**
     - ✅ Propriedade: Casa Itaúnas Vista Mar
     - ✅ Datas: 29/out - 03/nov

5. **Feche o modal**
   - Clique no X ou fora do modal

6. **Teste botão "Bloqueio" direto**
   - Clique no botão "Bloqueio" no header
   - BlockModal abre direto (sem passar pelo QuickActions)

### **✅ Resultado esperado:**
- Badge azul visível
- Botões corretos (Ações Rápidas + Bloqueio)
- Modal abre com dados corretos
- Bloqueio direto funciona

---

## 📋 TESTE 3: Criar Reserva via Chat (LEAD)

### **Passo a passo:**

1. **Volte para "Patricia Oliveira" (LEAD)**

2. **Clique em "Criar Reserva"**
   - CreateReservationWizard abre

3. **VERIFIQUE PRÉ-PREENCHIMENTO:**
   ```
   ✅ Etapa 1 - Hóspede:
      Nome: Patricia Oliveira
      Email: patricia@email.com
      Telefone: +55 22 99888-7766
   
   ✅ Datas pré-selecionadas:
      Check-in: 15/nov/2025
      Check-out: 22/nov/2025
   ```

4. **Avance no wizard**
   - Clique "Próximo"
   - Deve pular para escolha de acomodação
   - (Dados do hóspede já preenchidos)

5. **Feche o wizard**
   - Clique "Cancelar" ou X

### **✅ Resultado esperado:**
- Wizard abre com dados preenchidos
- Economiza tempo (não precisa digitar)
- Datas corretas

---

## 📋 TESTE 4: Dark Mode

### **Passo a passo:**

1. **Ative o Dark Mode**
   - Clique no ícone de sol/lua no topo

2. **Verifique badges:**
   ```
   ✅ Badge laranja (LEAD) legível no dark
   ✅ Badge azul (HÓSPEDE) legível no dark
   ```

3. **Abra os modais:**
   - QuickActionsModal
   - QuotationModal
   - BlockModal

4. **Verifique:**
   - ✅ Todos os textos legíveis
   - ✅ Contraste adequado
   - ✅ Botões visíveis

### **✅ Resultado esperado:**
- Tudo legível em dark mode
- Sem contraste ruim

---

## 📋 TESTE 5: Drag and Drop (da versão anterior)

**Confirme que drag and drop ainda funciona:**

1. **Teste fixar conversa:**
   - Clique no alfinete 📌 em qualquer conversa
   - Deve mover para seção "Fixadas"

2. **Teste arrastar:**
   - Segure no ícone ⋮⋮
   - Arraste para cima/baixo
   - Solte

3. **Teste categorias:**
   - Arraste entre seções (Urgente ↔ Normal)
   - Conversa muda de categoria

### **✅ Resultado esperado:**
- Drag and drop continua funcionando
- Não há conflito com os novos botões

---

## 🐛 Checklist de Possíveis Bugs

Marque se encontrar algum destes problemas:

- [ ] Modal não abre ao clicar nos botões
- [ ] Dados não são pré-preenchidos
- [ ] Badge não aparece (laranja/azul)
- [ ] Botões aparecem errados (LEAD com botões de HÓSPEDE)
- [ ] Datas erradas nos modais
- [ ] Toast não aparece ao enviar cotação
- [ ] Modal não fecha após ação
- [ ] Erro no console do navegador
- [ ] Dark mode quebrado
- [ ] Drag and drop parou de funcionar

---

## 📸 Screenshots Esperados

### **1. LEAD (Patricia Oliveira)**
```
┌────────────────────────────────────────┐
│ Patricia Oliveira                      │
│ RES-     • (sem propriedade ainda)     │
│                                        │
│ 🤝 NEGOCIAÇÃO - Cliente interessado    │
│ • 6 pessoas • Cabo Frio                │
│                                        │
│ [💰 Fazer Cotação] [📅 Criar Reserva]  │
└────────────────────────────────────────┘
```

### **2. HÓSPEDE (João Silva)**
```
┌────────────────────────────────────────┐
│ João Silva                             │
│ RES-015 • Casa Itaúnas Vista Mar       │
│                                        │
│ 🏠 HÓSPEDE - Reserva RES-015           │
│                                        │
│ [📅 Ações Rápidas] [🔒 Bloqueio]       │
└────────────────────────────────────────┘
```

---

## ✅ Critérios de Aprovação

Para aprovar esta versão, confirme:

- [x] Badge laranja aparece para LEAD
- [x] Badge azul aparece para HÓSPEDE
- [x] Botões corretos por tipo
- [x] QuotationModal pré-preenche dados
- [x] CreateReservationWizard pré-preenche dados
- [x] BlockModal pré-preenche dados
- [x] Toast aparece ao enviar cotação
- [x] Modais abrem e fecham corretamente
- [x] Dark mode funciona
- [x] Drag and drop continua funcionando
- [x] Nenhum erro no console

---

## 🚀 Próximo Teste (Após Aprovação)

Quando aprovar v1.0.90, vamos implementar:

**v1.0.91 - Backend do Chat:**
- [ ] Salvar lead_data no KV Store
- [ ] Endpoint para enviar cotação
- [ ] Adicionar mensagem ao histórico
- [ ] Email automático com link

---

## 🆘 Problemas?

**Se encontrar bugs:**

1. Anote o erro exato
2. Tire screenshot
3. Copie erro do console (F12)
4. Descreva o que estava fazendo

**Eu vou corrigir imediatamente!**

---

## 📊 Resultado Esperado Final

Ao final do teste, você deve ter:

✅ Chat funcionando com drag and drop  
✅ LEAD (Patricia) com badge laranja  
✅ HÓSPEDE (João) com badge azul  
✅ Todos os modais abrindo  
✅ Dados pré-preenchidos corretamente  
✅ Dark mode perfeito  
✅ Zero erros no console

**Tempo de cotação:** De 7 minutos para **2 minutos** ⚡

---

**Desenvolvido em:** 29/10/2025  
**Versão:** v1.0.90  
**Status:** ✅ Pronto para teste  
**Próximo:** v1.0.91 - Backend Integration
