# 🔍 INSPEÇÃO COMPLETA - STEPS 4 E 5 FINANCEIRO

## 📋 **ESTRUTURA DO WIZARD FINANCEIRO**

**Bloco:** Financeiro  
**Total de Steps:** 5  
**Versão:** v1.0.103.146

---

## 🏗️ **ESTRUTURA COMPLETA - 5 STEPS**

### **Step 1:** Configuração de Relacionamento (financial-contract)
- ✅ Componente: `FinancialContractStep`
- ✅ Titular, remuneração e comunicação

### **Step 2:** Preços Locação e Venda (financial-residential-pricing)
- ✅ Componente: `FinancialResidentialPricingStep`
- ✅ Valores de locação residencial e venda

### **Step 3:** Configuração de Preço Temporada (financial-fees)
- ✅ Componente: `FinancialSeasonalPricingStep`
- ✅ Taxas de limpeza, serviços e encargos

### **Step 4:** Precificação Individual de Temporada (financial-pricing) ⭐
- ✅ Componente: `FinancialIndividualPricingStep`
- ✅ Preços sazonais, descontos, datas especiais
- ✅ **BACKEND: 100% COMPLETO**

### **Step 5:** Preços Derivados (financial-derived-pricing) ⭐
- ✅ Componente: `FinancialDerivedPricingStep`
- ⚠️ **BACKEND: PARCIAL (60%)**

---

# 📊 **STEP 4: PRECIFICAÇÃO INDIVIDUAL DE TEMPORADA**

## ✅ **STATUS: 100% FUNCIONAL**

**Já inspecionado no documento:** `/INSPECAO_COMPLETA_PRECOS_INDIVIDUAL_v1.0.103.145.md`

### **Resumo:**
- ✅ 23 botões/inputs funcionais
- ✅ 8 endpoints backend completos
- ✅ Backend totalmente instalado
- ✅ AGENDA INFINITA ativa
- ✅ Hierarquia de preços funcionando
- ✅ Auto-save implementado

**Ver documento completo para detalhes.**

---

# 📊 **STEP 5: PREÇOS DERIVADOS**

## ⚠️ **STATUS: PARCIAL (60% FUNCIONAL)**

**Componente:** `/components/wizard-steps/FinancialDerivedPricingStep.tsx`  
**Backend:** `/supabase/functions/server/routes-pricing-settings.ts`  
**Linha:** 37-238

---

## 1️⃣ **BOTÃO: ATIVAR VARIAÇÃO POR HÓSPEDES**

### **Localização Frontend:** Linha 198-202

```typescript
<Switch
  checked={data.pricesVaryByGuests}
  onCheckedChange={(checked) => handleFieldChange('pricesVaryByGuests', checked)}
/>
```

### **Backend:** ❌ **NÃO IMPLEMENTADO**

**Problema:**  
O campo `pricesVaryByGuests` **NÃO EXISTE** no type `PricingSettings` do backend.

**Type atual (types.ts linha 1037-1057):**
```typescript
export interface PricingSettings {
  id: string;
  listingId: string;
  basePricePerNight: number;
  maxGuestsIncluded: number;
  extraGuestFeePerNight: number;
  chargeForChildren: boolean;
  cleaningFee: number;
  cleaningFeeIsPassThrough: boolean;
  currency: Currency;
  createdAt: string;
  updatedAt: string;
}
```

**Falta:**
```typescript
pricesVaryByGuests: boolean; // ❌ NÃO EXISTE
```

**Status:** ❌ **BACKEND INCOMPLETO**

---

## 2️⃣ **INPUT: NÚMERO MÁXIMO DE HÓSPEDES INCLUÍDOS**

### **Localização Frontend:** Linha 217-226

```typescript
<Input
  type="number"
  min="1"
  max="20"
  value={data.maxGuestsIncluded}
  onChange={(e) => handleFieldChange('maxGuestsIncluded', parseInt(e.target.value) || 1)}
/>
```

### **Backend:** ✅ **INSTALADO**

**Endpoint:** `PUT /make-server-67caf26a/listings/:listingId/pricing-settings`

**Type:** `PricingSettings.maxGuestsIncluded: number`

**Validação Backend (linha 182-188):**
```typescript
if (body.maxGuestsIncluded !== undefined && body.maxGuestsIncluded < 1) {
  return c.json({
    success: false,
    error: 'Max guests included must be at least 1'
  }, 400);
}
```

**Status:** ✅ **FUNCIONAL**

---

## 3️⃣ **BOTÕES: TIPO DE COBRANÇA (FIXO vs PORCENTAGEM)**

### **Localização Frontend:** Linha 237-271

```typescript
<Button
  onClick={() => handleFieldChange('extraGuestFeeType', 'fixed')}
>
  <DollarSign /> Valor Fixo
</Button>
<Button
  onClick={() => handleFieldChange('extraGuestFeeType', 'percentage')}
>
  <Percent /> Porcentagem
</Button>
```

### **Backend:** ❌ **NÃO IMPLEMENTADO**

**Problema:**  
O campo `extraGuestFeeType` **NÃO EXISTE** no backend.

**Backend atual:**
```typescript
extraGuestFeePerNight: number; // Sempre em centavos (valor fixo)
```

**Falta:**
```typescript
extraGuestFeeType: 'percentage' | 'fixed'; // ❌ NÃO EXISTE
extraGuestFeeValue: number; // ❌ NÃO EXISTE
```

**Comportamento atual:**
- Frontend envia `extraGuestFeeType` e `extraGuestFeeValue`
- Backend **IGNORA** esses campos
- Backend usa apenas `extraGuestFeePerNight` (sempre valor fixo)

**Status:** ❌ **BACKEND INCOMPLETO**

---

## 4️⃣ **INPUT: VALOR ADICIONAL POR PESSOA EXTRA**

### **Localização Frontend:** Linha 274-322

#### **Modo Porcentagem:**
```typescript
<Input
  type="number"
  min="0"
  max="100"
  step="0.1"
  value={data.extraGuestFeeValue}
  onChange={(e) => handleFieldChange('extraGuestFeeValue', parseFloat(e.target.value) || 0)}
/>
```

#### **Modo Valor Fixo:**
```typescript
<Input
  type="number"
  min="0"
  step="0.01"
  value={data.extraGuestFeeValue}
  onChange={(e) => handleFieldChange('extraGuestFeeValue', parseFloat(e.target.value) || 0)}
/>
```

### **Backend:** ⚠️ **PARCIALMENTE IMPLEMENTADO**

**Campo disponível:**
```typescript
extraGuestFeePerNight: number; // Apenas valor fixo em centavos
```

**Problema:**
- ✅ Modo "Valor Fixo" → **FUNCIONA** (salva em `extraGuestFeePerNight`)
- ❌ Modo "Porcentagem" → **NÃO FUNCIONA** (backend não tem esse campo)

**Status:** ⚠️ **METADE FUNCIONAL**

---

## 5️⃣ **SWITCH: ATIVAR COBRANÇA PARA CRIANÇAS**

### **Localização Frontend:** Linha 353-357

```typescript
<Switch
  checked={data.chargeForChildren}
  onCheckedChange={(checked) => handleFieldChange('chargeForChildren', checked)}
/>
```

### **Backend:** ✅ **INSTALADO**

**Endpoint:** `PUT /make-server-67caf26a/listings/:listingId/pricing-settings`

**Type:** `PricingSettings.chargeForChildren: boolean`

**Status:** ✅ **FUNCIONAL**

---

## 6️⃣ **TABS: TIPO DE COBRANÇA CRIANÇAS**

### **Localização Frontend:** Linha 367-381

```typescript
<Tabs
  value={data.childrenChargeType}
  onValueChange={(value) => handleFieldChange('childrenChargeType', value as 'per_night' | 'one_time')}
>
  <TabsTrigger value="per_night">Por criança e por noite</TabsTrigger>
  <TabsTrigger value="one_time">Por criança (única)</TabsTrigger>
</Tabs>
```

### **Backend:** ❌ **NÃO IMPLEMENTADO**

**Problema:**  
O campo `childrenChargeType` **NÃO EXISTE** no backend.

**Falta:**
```typescript
childrenChargeType: 'per_night' | 'one_time'; // ❌ NÃO EXISTE
```

**Status:** ❌ **BACKEND INCOMPLETO**

---

## 7️⃣ **BOTÃO: ADICIONAR FAIXA ETÁRIA**

### **Localização Frontend:** Linha 388-397

```typescript
<Button
  type="button"
  size="sm"
  variant="outline"
  onClick={addAgeBracket}
>
  <Plus className="h-3 w-3 mr-1" />
  Adicionar Faixa
</Button>
```

### **Função:**
```typescript
const addAgeBracket = () => {
  const newBracket: AgeBracket = {
    id: `bracket_${Date.now()}`,
    minAge: 0,
    maxAge: 12,
    fee: 0,
  };
  handleFieldChange('ageBrackets', [...data.ageBrackets, newBracket]);
};
```

### **Backend:** ❌ **NÃO IMPLEMENTADO**

**Problema:**  
O campo `ageBrackets` **NÃO EXISTE** no backend.

**Type necessário:**
```typescript
interface AgeBracket {
  id: string;
  minAge: number;
  maxAge: number;
  fee: number;
}

// No PricingSettings:
ageBrackets: AgeBracket[]; // ❌ NÃO EXISTE
```

**Status:** ❌ **BACKEND INCOMPLETO**

---

## 8️⃣ **BOTÃO: REMOVER FAIXA ETÁRIA**

### **Localização Frontend:** Linha 422-431

```typescript
<Button
  type="button"
  size="sm"
  variant="ghost"
  onClick={() => removeAgeBracket(bracket.id)}
>
  <Trash2 className="h-3 w-3" />
</Button>
```

### **Função:**
```typescript
const removeAgeBracket = (id: string) => {
  const filtered = data.ageBrackets.filter((bracket) => bracket.id !== id);
  handleFieldChange('ageBrackets', filtered);
};
```

### **Backend:** ❌ **NÃO IMPLEMENTADO**

**Problema:** Depende de `ageBrackets` que não existe no backend.

**Status:** ❌ **BACKEND INCOMPLETO**

---

## 9️⃣ **INPUTS: IDADE MÍNIMA DA FAIXA**

### **Localização Frontend:** Linha 438-451

```typescript
<Input
  type="number"
  min="0"
  max="17"
  value={bracket.minAge}
  onChange={(e) => updateAgeBracket(bracket.id, 'minAge', parseInt(e.target.value) || 0)}
/>
```

### **Backend:** ❌ **NÃO IMPLEMENTADO**

**Status:** ❌ **BACKEND INCOMPLETO**

---

## 🔟 **INPUTS: IDADE MÁXIMA DA FAIXA**

### **Localização Frontend:** Linha 455-470

```typescript
<Input
  type="number"
  min="0"
  max="17"
  value={bracket.maxAge}
  onChange={(e) => updateAgeBracket(bracket.id, 'maxAge', parseInt(e.target.value) || 0)}
/>
```

### **Backend:** ❌ **NÃO IMPLEMENTADO**

**Status:** ❌ **BACKEND INCOMPLETO**

---

## 1️⃣1️⃣ **INPUTS: VALOR DA FAIXA ETÁRIA**

### **Localização Frontend:** Linha 474-492

```typescript
<Input
  type="number"
  min="0"
  step="0.01"
  value={bracket.fee}
  onChange={(e) => updateAgeBracket(bracket.id, 'fee', parseFloat(e.target.value) || 0)}
/>
```

### **Backend:** ❌ **NÃO IMPLEMENTADO**

**Status:** ❌ **BACKEND INCOMPLETO**

---

## 1️⃣2️⃣ **PREVIEW DE CÁLCULO**

### **Localização Frontend:** Linha 511-571

```typescript
<Card>
  <CardHeader>
    <Calculator /> Preview de Cálculo
  </CardHeader>
  <CardContent>
    <div>Preço Base: R$ {preview.basePrice.toFixed(2)}</div>
    <div>Hóspedes Extras: +R$ {...}</div>
    <div>Crianças: +R$ {...}</div>
    <div>Total: R$ {preview.total.toFixed(2)}</div>
  </CardContent>
</Card>
```

### **Backend:** ⚠️ **CÁLCULO PARCIAL**

**Endpoint existente:** `POST /make-server-67caf26a/calculate-reservation`

**Cálculo atual (linha 74-125):**
```typescript
export async function calculateReservationTotal(
  listingId: string,
  nights: number,
  guests: number,
  hasPets: boolean = false
): Promise<ReservationCalculation> {
  // 1. Buscar configurações
  const pricingSettings = await kv.get<PricingSettings>(`pricing:${listingId}`);
  const basePrice = pricingSettings.basePricePerNight;
  
  // 2. Calcular hóspedes extras
  const extraGuests = Math.max(0, guests - pricingSettings.maxGuestsIncluded);
  const extraGuestsTotal = extraGuests * pricingSettings.extraGuestFeePerNight * nights;
  
  // 3. Taxa de limpeza
  const cleaningFee = pricingSettings.cleaningFee;
  
  // 5. Total final
  const grandTotal = baseTotal + extraGuestsTotal + cleaningFee + petFee;
  
  return {
    baseTotal,
    extraGuestsTotal,
    cleaningFee,
    grandTotal,
    commissionBase
  };
}
```

**Problemas:**
- ✅ Calcula hóspedes extras (valor fixo)
- ❌ Não calcula porcentagem
- ❌ Não calcula faixas etárias de crianças
- ❌ Não diferencia `per_night` vs `one_time`

**Status:** ⚠️ **CÁLCULO PARCIAL**

---

## 📊 **RESUMO DA INSPEÇÃO - STEP 5**

### **Total de Elementos:** 12

| # | Elemento | Função | Backend | Status |
|---|----------|--------|---------|--------|
| 1 | Switch Variação Hóspedes | Ativar cobrança extra | ❌ | ❌ NÃO IMPLEMENTADO |
| 2 | Input Máx Hóspedes | Hóspedes incluídos | ✅ | ✅ FUNCIONAL |
| 3 | Botão Valor Fixo | Tipo de cobrança fixo | ⚠️ | ⚠️ METADE FUNCIONAL |
| 4 | Botão Porcentagem | Tipo de cobrança % | ❌ | ❌ NÃO IMPLEMENTADO |
| 5 | Input Valor Extra | Valor/% por hóspede | ⚠️ | ⚠️ SÓ VALOR FIXO |
| 6 | Switch Crianças | Ativar cobrança | ✅ | ✅ FUNCIONAL |
| 7 | Tab Por Noite | Tipo cobrança crianças | ❌ | ❌ NÃO IMPLEMENTADO |
| 8 | Tab Única | Tipo cobrança crianças | ❌ | ❌ NÃO IMPLEMENTADO |
| 9 | Botão Add Faixa | Adicionar idade | ❌ | ❌ NÃO IMPLEMENTADO |
| 10 | Botão Remover Faixa | Remover idade | ❌ | ❌ NÃO IMPLEMENTADO |
| 11 | Inputs Faixas | Min/Máx/Valor | ❌ | ❌ NÃO IMPLEMENTADO |
| 12 | Preview Cálculo | Simulação | ⚠️ | ⚠️ PARCIAL |

---

## ❌ **CAMPOS FALTANDO NO BACKEND**

### **1. No Type `PricingSettings` (types.ts):**

```typescript
// ❌ ADICIONAR:
pricesVaryByGuests: boolean;
extraGuestFeeType: 'percentage' | 'fixed';
extraGuestFeeValue: number; // Pode ser % ou valor fixo

childrenChargeType: 'per_night' | 'one_time';
ageBrackets: AgeBracket[];
```

### **2. Novo Type `AgeBracket`:**

```typescript
// ❌ CRIAR:
export interface AgeBracket {
  id: string;
  minAge: number;
  maxAge: number;
  fee: number; // em centavos
}
```

### **3. Update DTO:**

```typescript
// ❌ ATUALIZAR UpdatePricingSettingsDTO:
export interface UpdatePricingSettingsDTO {
  // Existentes:
  basePricePerNight?: number;
  maxGuestsIncluded?: number;
  extraGuestFeePerNight?: number;
  chargeForChildren?: boolean;
  cleaningFee?: number;
  cleaningFeeIsPassThrough?: boolean;
  currency?: Currency;
  
  // ❌ ADICIONAR:
  pricesVaryByGuests?: boolean;
  extraGuestFeeType?: 'percentage' | 'fixed';
  extraGuestFeeValue?: number;
  childrenChargeType?: 'per_night' | 'one_time';
  ageBrackets?: AgeBracket[];
}
```

---

## 🔧 **ENDPOINTS BACKEND NECESSÁRIOS**

### **Endpoint Existente (INCOMPLETO):**

```
PUT /make-server-67caf26a/listings/:listingId/pricing-settings
```

**Precisa aceitar:**
```json
{
  "pricesVaryByGuests": true,
  "maxGuestsIncluded": 2,
  "extraGuestFeeType": "percentage",
  "extraGuestFeeValue": 20,
  "chargeForChildren": true,
  "childrenChargeType": "per_night",
  "ageBrackets": [
    {
      "id": "bracket_1",
      "minAge": 0,
      "maxAge": 2,
      "fee": 0
    },
    {
      "id": "bracket_2",
      "minAge": 3,
      "maxAge": 12,
      "fee": 5000
    }
  ]
}
```

### **Endpoint de Cálculo (INCOMPLETO):**

```
POST /make-server-67caf26a/calculate-reservation
```

**Precisa calcular:**
```json
{
  "listingId": "listing123",
  "nights": 3,
  "guests": 4,
  "children": [
    { "age": 1 },
    { "age": 8 }
  ]
}
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": {
    "baseTotal": 60000,
    "extraGuestsTotal": 12000,
    "childrenTotal": 15000,
    "cleaningFee": 10000,
    "grandTotal": 97000,
    "breakdown": {
      "base": "3 noites × R$ 200.00",
      "extraGuests": "2 hóspedes × 20% × 3 noites",
      "children": "1 criança (0-2): grátis, 1 criança (3-12): R$ 50/noite × 3 noites"
    }
  }
}
```

---

## 🎯 **FUNCIONALIDADES IMPLEMENTADAS vs FALTANDO**

### ✅ **O QUE JÁ FUNCIONA (40%):**

1. ✅ Switch para ativar cobrança de crianças (`chargeForChildren`)
2. ✅ Input para número máximo de hóspedes incluídos
3. ✅ Taxa fixa por hóspede extra (apenas valor fixo)
4. ✅ Taxa de limpeza
5. ✅ Cálculo básico de reserva (sem porcentagem e sem faixas)

### ❌ **O QUE NÃO FUNCIONA (60%):**

1. ❌ Toggle "Preços variam por hóspedes" (`pricesVaryByGuests`)
2. ❌ Tipo de cobrança: Porcentagem vs Valor Fixo
3. ❌ Cálculo de porcentagem sobre preço base
4. ❌ Tipo de cobrança crianças: Por noite vs Taxa única
5. ❌ Sistema de faixas etárias (`ageBrackets`)
6. ❌ Adicionar/Remover faixas etárias
7. ❌ Configurar idade mín/máx por faixa
8. ❌ Configurar valor por faixa
9. ❌ Cálculo com faixas etárias
10. ❌ Preview completo de cálculo

---

## 💯 **SCORE DE COMPLETUDE**

```
┌─────────────────────────────────────────────┐
│  STEP 5: PREÇOS DERIVADOS                  │
├─────────────────────────────────────────────┤
│                                              │
│  Frontend: 100% COMPLETO                    │
│  Backend: 40% IMPLEMENTADO                  │
│                                              │
│  ✅ Funcional: 5/12 elementos (42%)         │
│  ⚠️ Parcial: 2/12 elementos (17%)           │
│  ❌ Faltando: 5/12 elementos (42%)          │
│                                              │
│  Status: ⚠️ FUNCIONAL PARCIAL               │
│                                              │
└─────────────────────────────────────────────┘
```

---

## 📝 **LISTA DE TAREFAS PARA COMPLETAR BACKEND**

### **1. Atualizar Types (types.ts):**

```typescript
// Adicionar ao PricingSettings:
pricesVaryByGuests: boolean;
extraGuestFeeType: 'percentage' | 'fixed';
extraGuestFeeValue: number;
childrenChargeType: 'per_night' | 'one_time';
ageBrackets: AgeBracket[];

// Criar novo interface:
export interface AgeBracket {
  id: string;
  minAge: number;
  maxAge: number;
  fee: number;
}
```

### **2. Atualizar Default Settings (routes-pricing-settings.ts linha 38):**

```typescript
function createDefaultPricingSettings(listingId: string, basePrice: number = 10000): PricingSettings {
  return {
    // ... existentes ...
    
    // ✅ ADICIONAR:
    pricesVaryByGuests: false,
    extraGuestFeeType: 'fixed',
    extraGuestFeeValue: 5000,
    childrenChargeType: 'per_night',
    ageBrackets: [],
  };
}
```

### **3. Atualizar Validações (routes-pricing-settings.ts linha 173):**

```typescript
// Validar extraGuestFeeValue
if (body.extraGuestFeeValue !== undefined) {
  if (body.extraGuestFeeType === 'percentage' && (body.extraGuestFeeValue < 0 || body.extraGuestFeeValue > 100)) {
    return c.json({ error: 'Percentage must be between 0 and 100' }, 400);
  }
  if (body.extraGuestFeeType === 'fixed' && body.extraGuestFeeValue < 0) {
    return c.json({ error: 'Fixed fee cannot be negative' }, 400);
  }
}

// Validar ageBrackets
if (body.ageBrackets !== undefined) {
  for (const bracket of body.ageBrackets) {
    if (bracket.minAge < 0 || bracket.maxAge > 17) {
      return c.json({ error: 'Age must be between 0 and 17' }, 400);
    }
    if (bracket.minAge > bracket.maxAge) {
      return c.json({ error: 'Min age cannot be greater than max age' }, 400);
    }
    if (bracket.fee < 0) {
      return c.json({ error: 'Fee cannot be negative' }, 400);
    }
  }
}
```

### **4. Atualizar Cálculo de Reserva (linha 74-125):**

```typescript
export async function calculateReservationTotal(
  listingId: string,
  nights: number,
  guests: number,
  children: { age: number }[] = [],
  hasPets: boolean = false
): Promise<ReservationCalculation> {
  // 1. Buscar configurações
  const pricingSettings = await kv.get<PricingSettings>(`pricing:${listingId}`);
  const basePrice = pricingSettings.basePricePerNight;
  const baseTotal = basePrice * nights;
  
  // 2. Hóspedes extras
  let extraGuestsTotal = 0;
  if (pricingSettings.pricesVaryByGuests) {
    const extraGuests = Math.max(0, guests - pricingSettings.maxGuestsIncluded);
    
    if (pricingSettings.extraGuestFeeType === 'percentage') {
      extraGuestsTotal = baseTotal * (pricingSettings.extraGuestFeeValue / 100) * extraGuests;
    } else {
      extraGuestsTotal = pricingSettings.extraGuestFeeValue * extraGuests * nights;
    }
  }
  
  // 3. Crianças
  let childrenTotal = 0;
  if (pricingSettings.chargeForChildren && children.length > 0) {
    for (const child of children) {
      // Encontrar faixa etária
      const bracket = pricingSettings.ageBrackets.find(
        b => child.age >= b.minAge && child.age <= b.maxAge
      );
      
      if (bracket && bracket.fee > 0) {
        if (pricingSettings.childrenChargeType === 'per_night') {
          childrenTotal += bracket.fee * nights;
        } else {
          childrenTotal += bracket.fee;
        }
      }
    }
  }
  
  // 4. Taxa de limpeza
  const cleaningFee = pricingSettings.cleaningFee;
  
  // 5. Total
  const grandTotal = baseTotal + extraGuestsTotal + childrenTotal + cleaningFee + petFee;
  
  return {
    baseTotal,
    extraGuestsTotal,
    childrenTotal, // ✅ NOVO CAMPO
    cleaningFee,
    grandTotal,
    commissionBase
  };
}
```

### **5. Atualizar Type ReservationCalculation:**

```typescript
export interface ReservationCalculation {
  baseTotal: number;
  extraGuestsTotal: number;
  childrenTotal: number; // ✅ ADICIONAR
  cleaningFee: number;
  grandTotal: number;
  commissionBase: number;
}
```

---

## 🚀 **PRÓXIMOS PASSOS**

### **Imediato (Backend):**

1. ✅ Atualizar `types.ts` com novos campos
2. ✅ Atualizar `createDefaultPricingSettings()`
3. ✅ Adicionar validações para novos campos
4. ✅ Atualizar função `calculateReservationTotal()`
5. ✅ Atualizar type `ReservationCalculation`
6. ✅ Testar endpoint PUT de atualização
7. ✅ Testar endpoint POST de cálculo

### **Testes:**

1. ✅ Testar criação de faixas etárias
2. ✅ Testar cálculo com porcentagem
3. ✅ Testar cálculo com valor fixo
4. ✅ Testar cálculo per_night vs one_time
5. ✅ Testar cálculo com múltiplas crianças
6. ✅ Testar preview frontend

---

## 📋 **CONEXÃO FRONTEND ↔ BACKEND**

### **Campos Mapeados:**

| Frontend | Backend | Status |
|----------|---------|--------|
| `pricesVaryByGuests` | `pricesVaryByGuests` | ❌ Falta criar |
| `maxGuestsIncluded` | `maxGuestsIncluded` | ✅ Funcionando |
| `extraGuestFeeType` | `extraGuestFeeType` | ❌ Falta criar |
| `extraGuestFeeValue` | `extraGuestFeeValue` | ❌ Falta criar |
| `chargeForChildren` | `chargeForChildren` | ✅ Funcionando |
| `childrenChargeType` | `childrenChargeType` | ❌ Falta criar |
| `ageBrackets` | `ageBrackets` | ❌ Falta criar |

---

## 💡 **EXEMPLO DE USO COMPLETO**

### **Frontend envia:**
```json
{
  "pricesVaryByGuests": true,
  "maxGuestsIncluded": 2,
  "extraGuestFeeType": "percentage",
  "extraGuestFeeValue": 20,
  "chargeForChildren": true,
  "childrenChargeType": "per_night",
  "ageBrackets": [
    {
      "id": "bracket_1",
      "minAge": 0,
      "maxAge": 2,
      "fee": 0
    },
    {
      "id": "bracket_2",
      "minAge": 3,
      "maxAge": 12,
      "fee": 5000
    },
    {
      "id": "bracket_3",
      "minAge": 13,
      "maxAge": 17,
      "fee": 10000
    }
  ]
}
```

### **Backend salva:**
```typescript
await kv.set(`pricing:${listingId}`, {
  ...existingSettings,
  pricesVaryByGuests: true,
  maxGuestsIncluded: 2,
  extraGuestFeeType: 'percentage',
  extraGuestFeeValue: 20,
  chargeForChildren: true,
  childrenChargeType: 'per_night',
  ageBrackets: [...],
  updatedAt: new Date().toISOString()
});
```

### **Cálculo de reserva:**
```
Cenário:
- Preço base: R$ 200/noite
- 3 noites
- 4 adultos
- 2 crianças (1 ano e 8 anos)

Cálculo:
1. Base: R$ 200 × 3 = R$ 600
2. Extras: 2 hóspedes × 20% × R$ 600 = R$ 240
3. Criança 1 (0-2 anos): R$ 0 × 3 = R$ 0
4. Criança 2 (3-12 anos): R$ 50 × 3 = R$ 150
5. Limpeza: R$ 100

Total: R$ 1.090
```

---

**Arquivo:** `INSPECAO_STEPS_4_5_FINANCEIRO_v1.0.103.146.md`  
**Versão:** v1.0.103.146  
**Data:** 2025-10-31  
**Status Step 4:** ✅ **100% COMPLETO**  
**Status Step 5:** ⚠️ **40% COMPLETO** (backend parcial)
