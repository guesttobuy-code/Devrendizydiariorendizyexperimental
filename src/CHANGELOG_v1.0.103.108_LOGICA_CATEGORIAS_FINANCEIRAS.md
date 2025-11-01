# 🧪 COMO TESTAR v1.0.103.108

**Lógica de Categorias com Campos Financeiros**

---

## 📋 FUNCIONALIDADES PARA TESTAR

### **1. Campos Financeiros Condicionais (Passo 1)**

#### **Teste A: Locação Residencial**

```
1. Abra o Wizard de Edição de Propriedades
2. Vá para o Passo 1 (Tipo e Identificação)
3. Clique no botão "Locação residencial"
4. ✅ VERIFICAR: Campos financeiros aparecem:
   - Aluguel Mensal (R$)
   - IPTU Mensal (R$)
   - Condomínio (R$)
   - Taxas Extras (R$)
   - Total Mensal (calculado automaticamente)
5. Digite valores e verifique o cálculo do total
```

**Visual esperado:**
```
┌────────────────────────────────────────┐
│ 💰 Valores - Locação Residencial       │
│ ────────────────────────────────────── │
│ Aluguel Mensal:  R$ 2.000,00          │
│ IPTU Mensal:     R$ 150,00            │
│ Condomínio:      R$ 300,00            │
│ Taxas Extras:    R$ 50,00             │
│ ────────────────────────────────────── │
│ Total Mensal:    R$ 2.500,00          │
└────────────────────────────────────────┘
```

#### **Teste B: Compra e Venda**

```
1. Abra o Wizard de Edição de Propriedades
2. Vá para o Passo 1
3. Clique no botão "Compra e venda"
4. ✅ VERIFICAR: Campos de venda aparecem:
   - Preço de Venda (R$)
   - IPTU Anual (R$)
   - Condomínio Mensal (R$)
5. Digite valores e verifique a exibição
```

**Visual esperado:**
```
┌────────────────────────────────────────┐
│ 🏡 Valores - Compra e Venda            │
│ ────────────────────────────────────── │
│ Preço de Venda:  R$ 850.000,00        │
│ IPTU Anual:      R$ 3.500,00          │
│ Condomínio:      R$ 450,00            │
│ ────────────────────────────────────── │
│ Preço Total:     R$ 850.000           │
└────────────────────────────────────────┘
```

#### **Teste C: Aluguel por Temporada**

```
1. Abra o Wizard
2. Clique em "Aluguel por temporada"
3. ✅ VERIFICAR: Nenhum campo financeiro extra aparece
   (pois o financeiro já está no Passo 7)
```

---

### **2. Obrigatoriedade Dinâmica dos Passos**

#### **Teste A: Aluguel por Temporada → Todos Obrigatórios**

```
1. Abra o Wizard
2. Passo 1: Selecione "Aluguel por temporada"
3. Navegue pelos passos do Conteúdo
4. ✅ VERIFICAR: TODOS os 7 passos mostram badge "Obrigatório" (vermelho):
   - ✅ 1. Tipo e Identificação
   - ✅ 2. Localização
   - ✅ 3. Cômodos e Distribuição
   - ✅ 4. Amenidades do Local
   - ✅ 5. Amenidades da Acomodação
   - ✅ 6. Fotos e Mídia
   - ✅ 7. Descrição
```

**Visual esperado (sidebar):**
```
┌────────────────────────────────────────┐
│ CONTEÚDO                               │
├────────────────────────────────────────┤
│ 1. Tipo e Identificação                │
│    [Obrigatório]                       │ ← Vermelho
│                                        │
│ 2. Localização                         │
│    [Obrigatório]                       │ ← Vermelho
│                                        │
│ 3. Cômodos e Distribuição              │
│    [Obrigatório]                       │ ← Vermelho (mudou!)
│                                        │
│ 4. Amenidades do Local                 │
│    [Obrigatório]                       │ ← Vermelho (mudou!)
│                                        │
│ 5. Amenidades da Acomodação            │
│    [Obrigatório]                       │ ← Vermelho (mudou!)
│                                        │
│ 6. Fotos e Mídia                       │
│    [Obrigatório]                       │ ← Vermelho (mudou!)
│                                        │
│ 7. Descrição                           │
│    [Obrigatório]                       │ ← Vermelho
└────────────────────────────────────────┘
```

#### **Teste B: Locação Residencial → Apenas Obrigatórios Originais**

```
1. Abra o Wizard
2. Passo 1: Selecione "Locação residencial"
3. Navegue pelos passos
4. ✅ VERIFICAR: Badges originais mantidos:
   - ✅ 1. Tipo → Obrigatório (vermelho)
   - ✅ 2. Localização → Obrigatório (vermelho)
   - ⚠️ 3. Cômodos → Recomendado (amarelo)
   - ⚪ 4. Amenidades Local → Opcional (cinza)
   - ⚠️ 5. Amenidades Acomodação → Recomendado (amarelo)
   - ⚠️ 6. Fotos → Recomendado (amarelo)
   - ✅ 7. Descrição → Obrigatório (vermelho)
```

#### **Teste C: Compra e Venda → Apenas Obrigatórios Originais**

```
1. Abra o Wizard
2. Passo 1: Selecione "Compra e venda"
3. ✅ VERIFICAR: Mesmos badges da locação residencial
   (somente os 3 obrigatórios originais)
```

---

## 🎨 CORES DOS BADGES

| Badge | Cor | Visual |
|-------|-----|--------|
| Obrigatório | Vermelho | `bg-red-500` |
| Recomendado | Amarelo | `bg-amber-500` |
| Opcional | Cinza | `border-gray-300` |

---

## 🔄 TESTE DE MUDANÇA DE CATEGORIA

### **Teste: Trocar Categoria no Meio do Wizard**

```
1. Abra o Wizard
2. Passo 1: Selecione "Aluguel por temporada"
3. ✅ VERIFICAR: Todos os 7 passos ficam obrigatórios
4. Volte para o Passo 1
5. Mude para "Locação residencial"
6. ✅ VERIFICAR: Badges voltam ao padrão original
   - Campos financeiros de locação aparecem
7. Mude para "Compra e venda"
8. ✅ VERIFICAR:
   - Campos de venda aparecem
   - Campos de locação desaparecem
   - Badges continuam no padrão
```

---

## 📊 CHECKLIST COMPLETO

### **Campos Financeiros:**
- [ ] Locação residencial mostra 4 campos + total
- [ ] Compra e venda mostra 3 campos + preço total
- [ ] Aluguel por temporada não mostra campos extras
- [ ] Total é calculado automaticamente
- [ ] Campos aceitam números decimais
- [ ] Placeholder "R$ 0,00" aparece corretamente

### **Obrigatoriedade:**
- [ ] Aluguel por temporada: 7 passos obrigatórios
- [ ] Locação residencial: 3 passos obrigatórios
- [ ] Compra e venda: 3 passos obrigatórios
- [ ] Badges mudam dinamicamente ao trocar categoria
- [ ] Badges corretos aparecem na sidebar
- [ ] Badge correto aparece no header do passo atual

### **Visual:**
- [ ] Campos de locação têm borda roxa e fundo roxo claro
- [ ] Campos de venda têm borda verde e fundo verde claro
- [ ] Ícones corretos (💰 locação, 🏡 venda)
- [ ] Grid 2 colunas funciona corretamente
- [ ] Responsivo em telas menores

---

## 🐛 BUGS CONHECIDOS A VERIFICAR

1. **Total não atualiza ao digitar?**
   - Verificar se `parseFloat` está funcionando
   - Verificar se estado está atualizando

2. **Badges não mudam ao trocar categoria?**
   - Verificar se `formData.contentType.categoria` está sendo atualizado
   - Verificar se `getStepValidation()` está sendo chamada

3. **Campos não aparecem/desaparecem?**
   - Verificar condição `data.categoria === 'residential_rental'`
   - Verificar renderização condicional

---

## ✅ RESULTADO ESPERADO

### **Cenário Sucesso:**
```
✅ Campos financeiros aparecem conforme categoria
✅ Total é calculado corretamente
✅ Badges mudam dinamicamente
✅ Obrigatoriedade funciona corretamente
✅ Visual está bonito e responsivo
```

### **Logs Esperados (Console):**
```
Nenhum erro deve aparecer
Warnings do React devem estar resolvidos
```

---

## 📝 NOTAS IMPORTANTES

1. **Categorias são excludentes:** Selecionar uma desmarca as outras
2. **Campos financeiros são opcionais:** Não bloqueiam navegação
3. **Obrigatoriedade é visual:** Não impede navegação (ainda)
4. **Total é dinâmico:** Atualiza conforme campos são preenchidos

---

## 🚀 PRÓXIMOS PASSOS (Se tudo funcionar)

1. Adicionar validação nos passos obrigatórios
2. Bloquear "Próximo" se campos obrigatórios vazios
3. Salvar dados financeiros no backend
4. Exibir dados financeiros na visualização da propriedade

---

**VERSÃO:** v1.0.103.108  
**STATUS:** Pronto para teste  
**TEMPO ESTIMADO:** 5-10 minutos de teste
