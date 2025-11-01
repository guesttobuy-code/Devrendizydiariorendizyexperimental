# 🧪 TESTE - Wizard de Cômodos v1.0.103.10

**Data:** 2025-10-29  
**Versão:** 1.0.103.10  
**Feature:** PropertyEditWizard - Step 3: Cômodos e Distribuição

---

## ✅ **O QUE FOI IMPLEMENTADO:**

### **Frontend:**
1. ✅ **ContentRoomsStep.tsx** - Componente completo com:
   - Sidebar com lista de cômodos
   - Resumo visual com ícones (🛏️ 2, 🚿 1, 🏠 1)
   - 12 tipos de cômodos (Suíte, Quarto Duplo, Banheiro, etc.)
   - 8 tipos de camas padrão Airbnb/Booking
   - Sistema de fotos com upload, drag & drop e tags
   - Seleção em lote de fotos
   - Aplicação de tags múltiplas

2. ✅ **Integração com APIs:**
   - Upload real de fotos para Supabase Storage
   - Feedback visual durante upload
   - Toast notifications
   - Tratamento de erros

### **Backend:**
1. ✅ **routes-rooms.ts** - Atualizado com:
   - Suporte aos novos tipos de cama do frontend
   - Conversão automática de object para array
   - Cálculo de capacidade por tipo de cama
   - CRUD completo de cômodos

2. ✅ **routes-photos.ts** - Já existente:
   - Upload para Supabase Storage
   - Bucket privado com signed URLs
   - Organização por propriedade/cômodo

3. ✅ **roomsApi.ts** - Nova API helper:
   - CRUD de cômodos
   - Upload/delete de fotos
   - Operações em batch

---

## 🧪 **COMO TESTAR:**

### **1. Preparação:**
```bash
# Certifique-se de que o sistema está rodando
npm run dev
```

### **2. Acessar o Wizard:**
1. Fazer login no sistema
2. Ir para **Gestão de Imóveis**
3. Clicar em **"Novo Imóvel"** ou **editar** um existente
4. Navegar até **Step 3: Cômodos**

### **3. Testar Criação de Cômodos:**

#### **Teste 1: Adicionar Suíte**
```
1. Clicar em "[+] Adicionar cômodo"
2. Selecionar tipo: "Suíte"
3. Marcar "Compartilhado": Não
4. Adicionar camas:
   - Cama 1p de Casal: 1
   - Cama 2p de Solteiro: 0
5. Verificar resumo no topo: 🛏️ 1
```

#### **Teste 2: Adicionar Quarto Duplo**
```
1. Clicar em "[+] Adicionar cômodo"
2. Selecionar tipo: "Quarto Duplo/Std/Eco"
3. Marcar "Compartilhado": Não
4. Adicionar camas:
   - Cama 2p de Solteiro: 2
5. Verificar resumo no topo: 🛏️ 2
```

#### **Teste 3: Adicionar Banheiro**
```
1. Clicar em "[+] Adicionar cômodo"
2. Selecionar tipo: "Banheiro"
3. Marcar "Compartilhado": Sim
4. Verificar resumo no topo: 🛏️ 2  🚿 1
```

#### **Teste 4: Adicionar Sala Comum**
```
1. Clicar em "[+] Adicionar cômodo"
2. Selecionar tipo: "Sala/Estar Comum"
3. Marcar "Compartilhado": Não
4. Adicionar camas:
   - Sofá-cama (p/ Casal): 1
5. Verificar resumo no topo: 🛏️ 2  🚿 1  🏠 1
```

---

### **4. Testar Upload de Fotos:**

#### **Teste 5: Upload Individual**
```
1. Selecionar um cômodo (ex: Suíte)
2. Clicar em "Selecionar Imagens"
3. Escolher 1 foto
4. Aguardar upload
5. Verificar:
   ✅ Foto aparece no grid
   ✅ Badge "Capa" na primeira foto
   ✅ Toast de sucesso
```

#### **Teste 6: Upload Múltiplo**
```
1. Selecionar um cômodo
2. Clicar em "Selecionar Imagens"
3. Escolher 3 fotos
4. Aguardar upload
5. Verificar:
   ✅ 3 fotos aparecem no grid
   ✅ Badge "Capa" apenas na primeira
   ✅ Toast mostrando "3 foto(s) enviada(s)"
```

---

### **5. Testar Drag & Drop:**

#### **Teste 7: Reordenar Fotos**
```
1. Ter pelo menos 3 fotos
2. Arrastar a 3ª foto para a 1ª posição
3. Verificar:
   ✅ Fotos trocam de posição
   ✅ Badge "Capa" permanece na foto original
   ✅ Ícone GripVertical aparece ao hover
```

#### **Teste 8: Definir Nova Capa**
```
1. Hover na 2ª foto
2. Clicar em "Tornar Capa"
3. Verificar:
   ✅ Badge "Capa" move para essa foto
   ✅ Ring verde aparece na nova capa
```

---

### **6. Testar Tags:**

#### **Teste 9: Seleção em Lote**
```
1. Marcar checkbox de 2 fotos
2. Verificar:
   ✅ Botão "Adicionar Tags (2)" ativo
   ✅ Fotos ficam com ring azul
```

#### **Teste 10: Aplicar Tags**
```
1. Selecionar 2 fotos
2. Clicar "Adicionar Tags (2)"
3. No modal, selecionar:
   - ✅ Banheiro
   - ✅ Área de estar
4. Clicar "Aplicar Tags (2)"
5. Verificar:
   ✅ Tags aparecem nas fotos
   ✅ Máximo 2 tags visíveis
   ✅ Se mais de 2, aparece "+N"
```

#### **Teste 11: Remover Tag**
```
1. Clicar no "×" de uma tag
2. Verificar:
   ✅ Tag é removida da foto
```

---

### **7. Testar Deleção:**

#### **Teste 12: Deletar Foto**
```
1. Hover em uma foto
2. Clicar no botão de lixeira
3. Verificar:
   ✅ Foto é removida do grid
   ✅ Toast de confirmação
   ✅ Se era a capa, primeira foto vira capa
```

#### **Teste 13: Deletar Cômodo**
```
1. Clicar no botão de lixeira na sidebar
2. Verificar:
   ✅ Cômodo é removido
   ✅ Resumo é atualizado
   ✅ Se era o selecionado, seleciona outro
```

---

### **8. Testar Navegação:**

#### **Teste 14: Navegar Entre Cômodos**
```
1. Criar 3 cômodos
2. Clicar em cada um na sidebar
3. Verificar:
   ✅ Formulário carrega dados corretos
   ✅ Fotos corretas aparecem
   ✅ Highlight visual no selecionado
```

#### **Teste 15: Voltar ao Step Anterior**
```
1. Estar no Step 3 (Cômodos)
2. Clicar "Voltar"
3. Verificar:
   ✅ Vai para Step 2 (Localização)
   ✅ Dados dos cômodos são mantidos
```

---

## 🐛 **POSSÍVEIS PROBLEMAS E SOLUÇÕES:**

### **Problema 1: Upload Não Funciona**
```
Causa: propertyId não está sendo passado
Solução: Verificar se property.id existe no PropertyEditWizard
Verificação: console.log(propertyId) no ContentRoomsStep
```

### **Problema 2: Fotos Não Aparecem**
```
Causa: Signed URL expirado ou bucket não existe
Solução: 
1. Verificar logs do servidor
2. Verificar se bucket 'make-67caf26a-property-photos' existe
3. Recriar bucket se necessário
```

### **Problema 3: Drag & Drop Não Funciona**
```
Causa: Navegador não suporta HTML5 Drag API
Solução: Testar em navegador moderno (Chrome, Firefox)
Fallback: Usar botões de "Mover para cima/baixo"
```

### **Problema 4: Tags Não Salvam**
```
Causa: Estado não está sendo persistido
Solução: Verificar se onChange está sendo chamado
Verificação: console.log(formData.contentRooms)
```

---

## 📊 **CHECKLIST DE VALIDAÇÃO:**

### **Funcionalidades Básicas:**
- [ ] Adicionar cômodo
- [ ] Editar tipo de cômodo
- [ ] Marcar compartilhado
- [ ] Adicionar/remover camas
- [ ] Deletar cômodo

### **Sistema de Fotos:**
- [ ] Upload individual
- [ ] Upload múltiplo
- [ ] Arrastar para reordenar
- [ ] Definir foto de capa
- [ ] Deletar foto

### **Sistema de Tags:**
- [ ] Selecionar fotos em lote
- [ ] Abrir modal de tags
- [ ] Buscar tags
- [ ] Aplicar tags
- [ ] Remover tags

### **Visual e UX:**
- [ ] Resumo atualiza automaticamente
- [ ] Ícones corretos por tipo
- [ ] Feedback visual ao arrastar
- [ ] Toast notifications
- [ ] Loading states

### **Persistência:**
- [ ] Dados mantidos ao navegar steps
- [ ] Fotos mantidas ao trocar cômodo
- [ ] Tags mantidas após aplicar

---

## 🎯 **PRÓXIMOS PASSOS APÓS TESTE:**

### **Se tudo OK:**
1. ✅ Marcar Step 3 como completo
2. ✅ Partir para Step 4: Amenities
3. ✅ Documentar qualquer ajuste necessário

### **Se houver problemas:**
1. 🐛 Documentar o erro
2. 🐛 Enviar logs do console
3. 🐛 Descrever passos para reproduzir

---

## 📝 **LOGS IMPORTANTES:**

### **Frontend:**
```javascript
// ContentRoomsStep.tsx
console.log('propertyId:', propertyId);
console.log('uploadingPhotos:', uploadingPhotos);
console.log('currentRoom:', currentRoom);
console.log('formData.contentRooms:', formData.contentRooms);
```

### **Backend:**
```typescript
// routes-rooms.ts
console.log('Creating room:', roomId);
console.log('Beds array:', bedsArray);
console.log('Calculated capacity:', capacity);

// routes-photos.ts
console.log('📸 Starting photo upload...');
console.log('✅ Upload successful:', data);
```

---

## 🚀 **COMANDOS ÚTEIS:**

```bash
# Ver logs do servidor
supabase functions logs make-server-67caf26a

# Verificar buckets
supabase storage list

# Ver conteúdo de um bucket
supabase storage list make-67caf26a-property-photos

# Limpar cache do navegador
Ctrl + Shift + R (hard refresh)
```

---

## 📞 **SUPORTE:**

Se encontrar qualquer problema, forneça:
1. 📸 Screenshot do erro
2. 📋 Console logs (F12)
3. 🔍 Passo a passo para reproduzir
4. 🌐 Navegador e versão

---

**🎉 Boa sorte nos testes!**
