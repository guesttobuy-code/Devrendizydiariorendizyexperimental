# 🧪 TESTE RÁPIDO - Códigos Automáticos v1.0.89

**Versão:** v1.0.89  
**Data:** 28 de Outubro de 2025  
**Recurso:** Geração Automática de Códigos

---

## ✅ Como Testar

### **Teste 1: Criar Location com Código Automático**

1. Vá para **"Locais e Anúncios"** → Tab **"Locais"**
2. Clique em **"+ Novo Local"**
3. Preencha **apenas o nome**:
   ```
   Nome do Local: Edifício Vista Mar
   ```
4. Note o texto: "💡 O código será gerado automaticamente (ex: EDI001)"
5. Preencha o restante do formulário (endereço, etc.)
6. Clique em **"Criar Local"**
7. **Verifique o toast:** Deve mostrar "Local criado com sucesso! Código: EDI001"
8. **Verifique a tabela:** Código "EDI001" deve aparecer na coluna Código

### **Teste 2: Código Sequencial**

1. Crie outro local com nome similar:
   ```
   Nome do Local: Edifício Copacabana Palace
   ```
2. **Esperado:** Código deve ser "EDI002" (incremento sequencial)
3. Toast deve mostrar: "Código: EDI002"

### **Teste 3: Prefixo Diferente**

1. Crie um local com nome diferente:
   ```
   Nome do Local: Casa na Praia
   ```
2. **Esperado:** Código deve ser "CAS001" (novo prefixo)
3. Toast deve mostrar: "Código: CAS001"

### **Teste 4: Criar Listing com Código Automático**

1. Vá para Tab **"Anúncios"**
2. Clique em **"+ Novo Anúncio"**
3. Preencha **apenas o título**:
   ```
   Título: Apartamento 501 - Copacabana
   ```
4. Note o texto: "💡 O código será gerado automaticamente (ex: APA001)"
5. Preencha o restante (tipo, hóspedes, quartos, preço)
6. Clique em **"Criar Anúncio"**
7. **Verifique o toast:** Deve mostrar "Anúncio criado com sucesso! Código: APA001"

---

## 🎯 Exemplos Práticos

### **Locations - Códigos Esperados**

| Nome do Local                    | Código Esperado |
|----------------------------------|-----------------|
| Edifício Vista Mar               | EDI001          |
| Edifício Copacabana Palace       | EDI002          |
| Casa na Praia                    | CAS001          |
| Residencial Gramado              | RES001          |
| Torre Paulista Premium           | TOR001          |
| Condomínio Lago Azul             | CON001          |

### **Listings - Códigos Esperados**

| Título do Anúncio                | Código Esperado |
|----------------------------------|-----------------|
| Apartamento 501 - Copacabana     | APA001          |
| Casa na Praia - Guarujá          | CAS001          |
| Cobertura Duplex Ipanema         | COB001          |
| Studio Moderno Centro            | STU001          |
| Apartamento Aconchegante         | APA002          |

---

## ✅ Checklist de Validação

- [ ] Campo "Código" não aparece no formulário de Location
- [ ] Texto explicativo aparece abaixo do campo "Nome"
- [ ] Código é gerado automaticamente ao criar
- [ ] Toast mostra o código gerado
- [ ] Código aparece na tabela/lista
- [ ] Códigos com mesmo prefixo incrementam (001, 002, 003)
- [ ] Códigos com prefixos diferentes começam em 001
- [ ] Todos os códigos têm exatamente 6 caracteres
- [ ] Formato: 3 letras MAIÚSCULAS + 3 números

---

## 🔍 Como Verificar Códigos Gerados

### **Via Interface**
1. **Tabela de Locais:** Coluna "Código" mostra o badge com código
2. **Toast de Sucesso:** Mensagem mostra "Código: XXX000"

### **Via Console do Navegador** (F12)
```javascript
// Ver todos os locations com códigos
console.log(locations.map(l => ({ name: l.name, code: l.code })));

// Ver todos os listings com códigos
console.log(listings.map(l => ({ title: l.title, code: l.code })));
```

---

## 🐛 Solução de Problemas

### **Problema: Código não aparece no toast**
- Verifique o console (F12) para erros
- Confirme que o sistema está na versão v1.0.89

### **Problema: Código vem vazio ou undefined**
- Recarregue a página
- Limpe o cache do navegador
- Verifique se a função `generateLocationCode()` existe em `/utils/codeGenerator.ts`

### **Problema: Todos os códigos são iguais**
- Pode ser problema na extração de códigos existentes
- Tente deletar todos os locais/anúncios e criar novos

---

## 🎉 Resultado Esperado

Ao criar um local chamado **"Edifício Vista Mar"**, você deve ver:

1. **Durante criação:** Texto "💡 O código será gerado automaticamente (ex: EDI001)"
2. **Após criação:** Toast verde "✅ Local criado com sucesso! Código: EDI001"
3. **Na tabela:** Badge com "EDI001" na coluna Código

**Nenhum campo manual de código deve estar visível!**

---

**Status:** ✅ Pronto para testes  
**Duração estimada:** 5 minutos  
**Complexidade:** Simples
