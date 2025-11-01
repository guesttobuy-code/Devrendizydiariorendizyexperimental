# 🧭 WIZARD - ESTRUTURA DE NAVEGAÇÃO

**Versão:** v1.0.103.9  
**Data:** 29 de Outubro de 2025  
**Status:** ✅ Estrutura Criada (Sem Formulários)

---

## 🎯 OBJETIVO

Criar a **estrutura de navegação** do Wizard de Edição de Propriedades com:

- ✅ 3 Blocos (Tabs)
- ✅ 14 Steps (apenas títulos)
- ✅ Navegação completa
- ✅ Indicadores de progresso
- ❌ SEM formulários (apenas placeholders)

---

## 🏗️ ESTRUTURA COMPLETA

```
PropertyEditWizard.tsx
│
├─ Header
│  ├─ Título da propriedade
│  ├─ Barra de progresso geral (0-100%)
│  └─ Contador de steps completados
│
├─ Tabs (3 Blocos)
│  ├─ [📝 Conteúdo] (6 steps)
│  ├─ [💰 Financeiro] (3 steps)
│  └─ [⚙️ Configurações] (5 steps)
│
├─ Layout por Tab
│  ├─ Sidebar Esquerda (Lista de Steps)
│  │  ├─ Indicador de step atual
│  │  ├─ Indicador de steps completos (✓)
│  │  ├─ Badge de validação (Obrigatório/Recomendado/Opcional)
│  │  └─ Clique para navegar
│  │
│  └─ Área Principal
│     ├─ Header do Step Atual
│     │  ├─ Badge: "Passo X de 14"
│     │  ├─ Badge de validação
│     │  ├─ Título do step
│     │  └─ Descrição
│     │
│     └─ Conteúdo (PLACEHOLDER)
│        └─ "Formulário será implementado aqui"
│
└─ Footer
   ├─ [← Anterior] (desabilitado no primeiro step)
   ├─ [Cancelar]
   ├─ [Salvar Rascunho]
   └─ [Próximo →] ou [Concluir] (no último step)
```

---

## 📊 BLOCOS E STEPS

### **BLOCO 1: 📝 CONTEÚDO (6 steps)**

| # | ID | Título | Descrição | Validação |
|---|---|--------|-----------|-----------|
| 1 | `content-type` | Tipo e Identificação | Que tipo de propriedade você está anunciando? | ⚠️ Obrigatório |
| 2 | `content-location` | Localização | Onde fica sua propriedade? | ⚠️ Obrigatório |
| 3 | `content-rooms` | Cômodos e Distribuição | Como é a distribuição de cômodos? | 💡 Recomendado |
| 4 | `content-amenities` | Amenities | Quais comodidades sua propriedade oferece? | 💡 Recomendado |
| 5 | `content-photos` | Fotos e Mídia | Mostre sua propriedade em fotos | 💡 Recomendado |
| 6 | `content-description` | Descrição | Descreva sua propriedade | ⚠️ Obrigatório |

---

### **BLOCO 2: 💰 FINANCEIRO (3 steps)**

| # | ID | Título | Descrição | Validação |
|---|---|--------|-----------|-----------|
| 7 | `financial-pricing` | Precificação Base | Defina seus preços | ⚠️ Obrigatório |
| 8 | `financial-fees` | Taxas e Encargos | Taxas adicionais | ⚪ Opcional |
| 9 | `financial-cancellation` | Política de Cancelamento | Política de cancelamento | 💡 Recomendado |

---

### **BLOCO 3: ⚙️ CONFIGURAÇÕES (5 steps)**

| # | ID | Título | Descrição | Validação |
|---|---|--------|-----------|-----------|
| 10 | `settings-rules` | Regras de Hospedagem | Regras da acomodação | ⚠️ Obrigatório |
| 11 | `settings-booking` | Configurações de Reserva | Como aceitar reservas? | ⚪ Opcional |
| 12 | `settings-tags` | Tags e Grupos | Organize sua propriedade | ⚪ Opcional |
| 13 | `settings-ical` | iCal e Sincronização | Sincronizar calendários | ⚪ Opcional |
| 14 | `settings-otas` | Integrações OTAs | Canais de distribuição | ⚪ Opcional |

---

## 🎨 INTERFACE

### **Tela Principal:**

```
┌──────────────────────────────────────────────────────────────┐
│ Editar Propriedade                                      [X]  │
│ RU021 - Aires3 Novo                                          │
│                                                              │
│ Progresso Geral: 43%                    6 de 14 passos      │
│ ████████████░░░░░░░░░░░░░░░                                 │
├──────────────────────────────────────────────────────────────┤
│ [📝 Conteúdo 67%] [💰 Financeiro 33%] [⚙️ Configurações 0%] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌──────────────────┐  ┌──────────────────────────────────┐ │
│ │ PASSOS           │  │ Passo 1 de 14  [Obrigatório]     │ │
│ │ 6 passos         │  │                                  │ │
│ │ ──────────────── │  │ Tipo e Identificação             │ │
│ │                  │  │ Que tipo de propriedade...       │ │
│ │ [✓] 1. Tipo e Id │  │ ──────────────────────────────── │ │
│ │ [✓] 2. Localiz.. │  │                                  │ │
│ │ [●] 3. Cômodos.. │  │  ┌────────────────────────────┐  │ │
│ │ [ ] 4. Amenitie │  │  │       [Ícone do Step]      │  │ │
│ │ [ ] 5. Fotos... │  │  │                            │  │ │
│ │ [ ] 6. Descriç. │  │  │   Tipo e Identificação     │  │ │
│ │                  │  │  │                            │  │ │
│ │                  │  │  │ Que tipo de propriedade... │  │ │
│ │                  │  │  │                            │  │ │
│ │                  │  │  │ ℹ️ Formulário será         │  │ │
│ │                  │  │  │   implementado aqui        │  │ │
│ │                  │  │  └────────────────────────────┘  │ │
│ │                  │  │                                  │ │
│ └──────────────────┘  └──────────────────────────────────┘ │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ [← Anterior]              [Cancelar] [Salvar] [Próximo →]  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔄 NAVEGAÇÃO

### **Estados dos Steps:**

```typescript
// Step não iniciado
[ ] 4. Amenities
    Quais comodidades...
    [Opcional]

// Step ativo (atual)
[●] 3. Cômodos
    Como é a distribuição...
    [Recomendado]
    ← Fundo azul/destaque

// Step completo
[✓] 1. Tipo e Identificação
    Que tipo de propriedade...
    [Obrigatório]
    ← Ícone de check verde
```

### **Navegação Entre Steps:**

1. **Botão "Próximo"**
   - Marca step atual como completo
   - Avança para próximo step
   - Se último step do bloco: vai para próximo bloco

2. **Botão "Anterior"**
   - Volta para step anterior
   - Se primeiro step do bloco: volta para bloco anterior

3. **Clique na Sidebar**
   - Navega direto para qualquer step
   - Permite pular steps
   - Não valida obrigatoriedade

4. **Clique nas Tabs**
   - Troca de bloco
   - Reseta para primeiro step do bloco
   - Mantém progresso dos blocos

---

## 📈 INDICADORES DE PROGRESSO

### **1. Progresso Geral (Header)**

```typescript
const getProgress = () => {
  return (completedSteps.size / getTotalSteps()) * 100;
};

// Exemplo: 6 de 14 steps = 43%
```

### **2. Progresso por Bloco (Tabs)**

```typescript
const getBlockProgress = (blockId: string) => {
  const block = WIZARD_STRUCTURE.find((b) => b.id === blockId)!;
  const completedInBlock = block.steps.filter((step) =>
    completedSteps.has(step.id)
  ).length;
  return (completedInBlock / block.steps.length) * 100;
};

// Tabs mostram:
// [📝 Conteúdo 67%] [💰 Financeiro 33%] [⚙️ Configurações 0%]
```

### **3. Indicador Visual (Ícones)**

- ✅ Check verde = Step completo
- 🔵 Ícone azul = Step atual
- ⚪ Ícone cinza = Step não iniciado

---

## 🎨 BADGES DE VALIDAÇÃO

### **3 Tipos:**

```typescript
const getValidationBadge = (validation: string) => {
  switch (validation) {
    case 'required':
      return <Badge variant="destructive">Obrigatório</Badge>;
    case 'recommended':
      return <Badge className="bg-amber-500">Recomendado</Badge>;
    case 'optional':
      return <Badge variant="outline">Opcional</Badge>;
  }
};
```

### **Distribuição:**

- ⚠️ **Obrigatório:** 5 steps (content-type, content-location, content-description, financial-pricing, settings-rules)
- 💡 **Recomendado:** 4 steps (content-rooms, content-amenities, content-photos, financial-cancellation)
- ⚪ **Opcional:** 5 steps (financial-fees, settings-booking, settings-tags, settings-ical, settings-otas)

---

## 💾 STATE MANAGEMENT

### **Estados Principais:**

```typescript
const [currentBlock, setCurrentBlock] = useState<string>('content');
const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
```

### **Helpers:**

```typescript
// Bloco atual
const getCurrentBlock = () => {
  return WIZARD_STRUCTURE.find((block) => block.id === currentBlock)!;
};

// Step atual
const getCurrentStep = () => {
  const block = getCurrentBlock();
  return block.steps[currentStepIndex];
};

// Total de steps
const getTotalSteps = () => {
  return WIZARD_STRUCTURE.reduce((acc, block) => acc + block.steps.length, 0);
};

// Número do step atual (1-14)
const getCurrentStepNumber = () => {
  let stepNumber = 0;
  for (const block of WIZARD_STRUCTURE) {
    if (block.id === currentBlock) {
      stepNumber += currentStepIndex + 1;
      break;
    }
    stepNumber += block.steps.length;
  }
  return stepNumber;
};
```

---

## 🎭 PLACEHOLDER ATUAL

### **Conteúdo de Cada Step:**

```tsx
const renderStepContent = () => {
  const step = getCurrentStep();

  return (
    <Card className="border-2 border-dashed border-muted">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="p-4 bg-muted rounded-full">
          <step.icon className="h-8 w-8" />
        </div>
        <div className="text-center space-y-2">
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Info className="h-4 w-4" />
          <span>Formulário será implementado aqui</span>
        </div>
      </CardContent>
    </Card>
  );
};
```

---

## 🚀 PRÓXIMOS PASSOS

### **Implementação dos Formulários:**

Agora que a navegação está pronta, podemos implementar **um formulário por vez**:

1. **Step 1: Tipo e Identificação** ⚠️ OBRIGATÓRIO
   - Tipo de Propriedade (select com tipos do sistema)
   - Tipo de Anúncio (select com tipos do sistema)
   - Nome Interno
   - Nome Público
   - Capacidade (hóspedes, quartos, banheiros)

2. **Step 2: Localização** ⚠️ OBRIGATÓRIO
   - CEP com busca automática
   - Endereço completo
   - Mapa interativo
   - Coordenadas GPS

3. **Step 3: Cômodos** 💡 RECOMENDADO
   - Lista de quartos
   - Camas por quarto
   - Banheiros
   - Outros cômodos

... e assim por diante

---

## 📝 CONVENÇÕES

### **IDs dos Steps:**

```
{bloco}-{nome}

Exemplos:
- content-type
- content-location
- financial-pricing
- settings-rules
```

### **Estrutura de Dados:**

```typescript
interface WizardStep {
  id: string;                    // Único
  title: string;                 // Curto
  description: string;           // Pergunta ao usuário
  icon: any;                     // Ícone lucide-react
  validation: 'required' | 'recommended' | 'optional';
}

interface WizardBlock {
  id: string;                    // Único
  title: string;                 // Nome da tab
  icon: any;                     // Ícone da tab
  color: string;                 // Cor tema
  steps: WizardStep[];           // Array de steps
}
```

---

## 🧪 COMO TESTAR

### **1. Abrir o Wizard:**

```typescript
// Em PropertiesManagement.tsx
<PropertyEditWizard
  open={editModalOpen}
  onClose={() => setEditModalOpen(false)}
  property={selectedProperty}
  onSave={handleSaveProperty}
/>
```

### **2. Testar Navegação:**

- ✅ Clicar em "Próximo" 14 vezes
- ✅ Clicar em "Anterior" para voltar
- ✅ Clicar nas tabs para trocar de bloco
- ✅ Clicar nos steps da sidebar
- ✅ Verificar badges de validação
- ✅ Verificar barra de progresso

### **3. Verificar Estados:**

- ✅ Step 1 não deve ter botão "Anterior" habilitado
- ✅ Step 14 deve mostrar "Concluir" em vez de "Próximo"
- ✅ Steps completados devem ter check verde
- ✅ Progresso deve aumentar ao completar steps

---

## ✅ CHECKLIST

### **Estrutura:**
- [x] 3 Blocos (Conteúdo, Financeiro, Configurações)
- [x] 14 Steps distribuídos corretamente
- [x] IDs únicos para cada step
- [x] Títulos e descrições em português
- [x] Ícones para cada step

### **Navegação:**
- [x] Botão "Próximo"
- [x] Botão "Anterior"
- [x] Navegação por tabs
- [x] Navegação por sidebar
- [x] Estado de step atual
- [x] Estado de steps completos

### **Indicadores:**
- [x] Barra de progresso geral
- [x] Progresso por bloco (tabs)
- [x] Badges de validação
- [x] Contador de steps
- [x] Ícones de status (check, ativo, pendente)

### **Placeholders:**
- [x] Conteúdo placeholder para todos os 14 steps
- [x] Mensagem "Formulário será implementado aqui"
- [x] Layout consistente

### **Pendente:**
- [ ] Implementar formulário do Step 1
- [ ] Implementar formulário do Step 2
- [ ] ... (todos os demais)
- [ ] Validações reais
- [ ] Salvamento de dados
- [ ] Integração com backend

---

## 🎯 CONCLUSÃO

✅ **Estrutura de navegação 100% completa!**

### **O que temos:**
- ✅ 14 steps organizados em 3 blocos
- ✅ Navegação completa e fluida
- ✅ Indicadores visuais de progresso
- ✅ Badges de validação
- ✅ Placeholders prontos para receber formulários

### **Próximo passo:**
- 🎯 Implementar formulário do **Step 1: Tipo e Identificação**
- 🎯 Integrar com API de tipos de propriedades
- 🎯 Validações de campos obrigatórios

---

**Versão:** v1.0.103.9  
**Status:** ✅ Estrutura Pronta  
**Data:** 29 de Outubro de 2025
