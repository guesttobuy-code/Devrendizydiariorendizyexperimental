# 🧪 GUIA DE TESTE - Criação de Locations v1.0.88

**Versão:** v1.0.88  
**Data:** 28 de Outubro de 2025  
**Módulo:** Locais e Anúncios

---

## 🎯 O Que Foi Implementado

Adicionada interface completa para criação de **Locations** (Locais/Prédios/Condomínios) no módulo "Locais e Anúncios".

### ✨ Principais Funcionalidades

1. ✅ Botão "Novo Local" contextual (aparece quando tab Locais está ativa)
2. ✅ Modal completo de criação com formulário estruturado
3. ✅ Validação de campos obrigatórios
4. ✅ Função de deleção de locations
5. ✅ Integração com API backend

---

## 🚀 Como Testar

### **Passo 1: Acessar o Módulo**
1. Abra o RENDIZY
2. No menu lateral, clique em **"Locais e Anúncios"**
3. Clique na tab **"Locais"**

### **Passo 2: Criar um Novo Local**
1. Clique no botão **"+ Novo Local"** (topo direito)
2. Preencha o formulário com os dados abaixo:

#### **Exemplo de Dados - Edifício em Copacabana**

**Informações Básicas:**
- Nome do Local: `Edifício Vista Mar`
- Código: `EDF-VIM-001`
- ☑️ Mostrar número do prédio
- Descrição: `Edifício residencial em frente à praia de Copacabana`

**Endereço:**
- Rua/Avenida: `Av. Atlântica`
- Número: `1850`
- Bairro: `Copacabana`
- Cidade: `Rio de Janeiro`
- Estado: `RJ`
- CEP: `22021-001`

**Acesso ao Prédio:**
- Tipo de Acesso: `Portaria`
- Instruções: `Solicitar autorização na portaria principal. Identificar-se como hóspede do apto 501.`
- ☑️ Possui elevador
- ☑️ Possui estacionamento
- Tipo de Estacionamento: `Pago`

3. Clique em **"Criar Local"**
4. Verifique o toast de sucesso
5. Confirme que o local apareceu na tabela

### **Passo 3: Criar Segundo Local (Opcional)**

**Exemplo - Casa em Gramado:**

**Informações Básicas:**
- Nome do Local: `Residencial Gramado Park`
- Código: `RES-GRA-001`
- ☐ Mostrar número do prédio (desmarcar)
- Descrição: `Condomínio residencial com área verde`

**Endereço:**
- Rua/Avenida: `Rua das Hortênsias`
- Número: `320`
- Bairro: `Centro`
- Cidade: `Gramado`
- Estado: `RS`
- CEP: `95670-000`

**Acesso ao Prédio:**
- Tipo de Acesso: `Código`
- Instruções: `Código do portão: 1234*. Após entrar, seguir até o final da rua.`
- ☑️ Possui elevador
- ☐ Possui estacionamento (desmarcar)

### **Passo 4: Testar Deleção**
1. Na tabela de Locais, localize um local criado
2. Clique no ícone de **lixeira** (🗑️)
3. Confirme a deleção no modal de confirmação
4. Verifique o toast de sucesso
5. Confirme que o local foi removido da tabela

---

## ✅ Checklist de Validação

### **Interface**
- [ ] Botão "Novo Local" aparece apenas na tab Locais
- [ ] Botão "Novo Anúncio" aparece apenas na tab Anúncios
- [ ] Modal abre ao clicar em "Novo Local"
- [ ] Formulário está organizado em seções claras

### **Validação de Campos**
- [ ] Campos obrigatórios (*) impedem envio se vazios
- [ ] Estado aceita apenas 2 caracteres
- [ ] Tipo de estacionamento só é habilitado se "Possui estacionamento" marcado

### **Criação**
- [ ] Toast de sucesso aparece após criação
- [ ] Local aparece imediatamente na tabela
- [ ] Modal fecha automaticamente após sucesso

### **Deleção**
- [ ] Modal de confirmação aparece
- [ ] Toast de sucesso após deletar
- [ ] Local é removido da tabela imediatamente

### **Responsividade**
- [ ] Modal é scrollável (conteúdo longo)
- [ ] Layout responsivo em diferentes tamanhos de tela
- [ ] Campos organizados em grid 2 colunas

---

## 🎨 Comportamento Esperado

### **Botões Contextuais**
```
Tab Anúncios ativa → Mostra "Novo Anúncio"
Tab Locais ativa   → Mostra "Novo Local"
```

### **Estados do Formulário**
```
Estacionamento DESMARCADO → Tipo de estacionamento DESABILITADO
Estacionamento MARCADO    → Tipo de estacionamento HABILITADO
```

### **Fluxo de Criação**
```
Clicar "Novo Local" 
→ Preencher formulário 
→ Clicar "Criar Local" 
→ Toast de sucesso 
→ Modal fecha 
→ Tabela atualiza
```

---

## 🐛 Possíveis Problemas e Soluções

### **Problema:** Botão "Novo Local" não aparece
**Solução:** Verifique se está na tab "Locais" (não "Anúncios")

### **Problema:** Erro ao criar location
**Solução:** 
1. Verifique se todos os campos obrigatórios (*) estão preenchidos
2. Confirme que o estado tem apenas 2 caracteres (ex: RJ, SP)
3. Veja o console do navegador para detalhes do erro

### **Problema:** Location não aparece na tabela
**Solução:** 
1. Aguarde 1-2 segundos (recarregamento automático)
2. Se não aparecer, recarregue a página manualmente
3. Verifique se o toast de sucesso apareceu

### **Problema:** Tipo de estacionamento não habilita
**Solução:** 
1. Certifique-se de que marcou o switch "Possui estacionamento"
2. O campo deve habilitar automaticamente ao marcar

---

## 📊 Dados de Teste Adicionais

### **Exemplo 3 - Cobertura em São Paulo**
```
Nome: Torre Paulista Premium
Código: TOR-SP-001
Rua: Av. Paulista
Número: 1578
Bairro: Bela Vista
Cidade: São Paulo
Estado: SP
CEP: 01310-200
Acesso: Portaria
Elevador: Sim
Estacionamento: Sim (Gratuito)
```

### **Exemplo 4 - Casa em Florianópolis**
```
Nome: Casa Lagoa da Conceição
Código: CAS-FLN-001
Rua: Servidão dos Coroas
Número: 45
Bairro: Lagoa da Conceição
Cidade: Florianópolis
Estado: SC
CEP: 88062-100
Acesso: Livre
Elevador: Não
Estacionamento: Sim (Gratuito)
```

---

## 🔍 Verificações Técnicas

### **Console do Navegador**
Abra o console (F12) e verifique:
- [ ] Não há erros em vermelho
- [ ] Requests para `/locations` aparecem
- [ ] Response está com `success: true`

### **Network Tab**
- [ ] POST `/locations` retorna status 200
- [ ] DELETE `/locations/:id` retorna status 200
- [ ] Payload do POST contém todos os campos

### **LocalStorage** (se em modo mock)
- [ ] `rendizy_mock_data` contém os locations criados
- [ ] Estrutura está correta com endereço completo

---

## 🎯 Critérios de Sucesso

A implementação está correta se:

1. ✅ Botão "Novo Local" aparece corretamente
2. ✅ Modal abre sem erros
3. ✅ Formulário valida campos obrigatórios
4. ✅ Criação funciona e mostra toast
5. ✅ Location aparece na tabela
6. ✅ Deleção funciona com confirmação
7. ✅ Interface é responsiva e usável

---

## 📝 Notas

- Primeira versão focada em CRUD básico
- Edição de locations será implementada em versão futura
- Upload de fotos será adicionado posteriormente
- Gestão de shared amenities em desenvolvimento
- Management info (empresa, gerente) será expandida

---

**Versão Testada:** v1.0.88  
**Módulo:** LocationsAndListings.tsx  
**Status:** ✅ Pronto para Testes
