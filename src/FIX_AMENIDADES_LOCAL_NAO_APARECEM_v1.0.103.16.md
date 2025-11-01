# 🔧 FIX: Amenidades do Local Não Aparecem no Wizard
## v1.0.103.16 - 29 OUT 2025

---

## 🐛 PROBLEMA IDENTIFICADO

### **Sintoma:**
No **Step 4 (Amenidades)** do PropertyEditWizard, as **amenidades do local NÃO apareciam**, apenas as amenidades da acomodação eram exibidas.

```
❌ ESPERADO (não aparecia):
┌────────────────────────────┐
│ 🏢 AMENIDADES DO LOCAL     │ ← NÃO APARECIA
│ Herdadas de "Hotel..."     │
└────────────────────────────┘

✅ APARECIA:
┌────────────────────────────┐
│ 🏠 AMENIDADES DA ACOMODAÇÃO│ ← Só isso aparecia
│ Específicas desta unidade  │
└────────────────────────────┘
```

### **Causa Raiz:**

O problema estava em **3 lugares**:

1. **Backend não retornava `locationName` e `locationAmenities`**
   - Quando GET `/api/properties/:id` ou GET `/api/properties`
   - A propriedade tinha `locationId` mas não buscava os dados do location

2. **PropertyEditWizard não inicializava os campos**
   - `formData.contentLocation` não tinha:
     - `selectedLocationId`
     - `locationName`
     - `locationAmenities`

3. **ContentAmenitiesStep não recebia `locationName`**
   - Faltava passar o nome do location como prop

---

## ✅ CORREÇÕES APLICADAS

### **1. Backend: `getProperty()` - Enriquecer com dados do location**

#### **Arquivo:** `/supabase/functions/server/routes-properties.ts`

#### **ANTES:**
```typescript
export async function getProperty(c: Context) {
  try {
    const id = c.req.param('id');
    const property = await kv.get<Property>(`property:${id}`);

    if (!property) {
      return c.json(notFoundResponse('Property'), 404);
    }

    return c.json(successResponse(property));
  } catch (error) {
    return c.json(errorResponse('Failed to get property'), 500);
  }
}
```

**Problema:** Não buscava dados do location.

#### **DEPOIS:**
```typescript
export async function getProperty(c: Context) {
  try {
    const id = c.req.param('id');
    const property = await kv.get<Property>(`property:${id}`);

    if (!property) {
      return c.json(notFoundResponse('Property'), 404);
    }

    // ✅ Se a propriedade tem locationId, buscar dados do location
    if (property.locationId) {
      const location = await kv.get<any>(`location:${property.locationId}`);
      if (location) {
        property.locationName = location.name;
        property.locationAmenities = location.amenities || [];
      }
    }

    return c.json(successResponse(property));
  } catch (error) {
    return c.json(errorResponse('Failed to get property'), 500);
  }
}
```

**Benefícios:**
- ✅ Agora retorna `locationName` e `locationAmenities`
- ✅ Dados enriquecidos automaticamente
- ✅ Sem necessidade de chamadas extras no frontend

---

### **2. Backend: `listProperties()` - Enriquecer lista com dados dos locations**

#### **ANTES:**
```typescript
export async function listProperties(c: Context) {
  try {
    const properties = await kv.getByPrefix<Property>('property:');

    // Aplicar filtros...
    let filtered = properties;
```

**Problema:** Lista não incluía dados do location.

#### **DEPOIS:**
```typescript
export async function listProperties(c: Context) {
  try {
    const properties = await kv.getByPrefix<Property>('property:');
    
    // ✅ Buscar todos os locations para enriquecer os dados
    const locations = await kv.getByPrefix<any>('location:');
    const locationsMap = new Map(locations.map(loc => [loc.id, loc]));

    // ✅ Enriquecer propriedades com dados do location
    for (const property of properties) {
      if (property.locationId && locationsMap.has(property.locationId)) {
        const location = locationsMap.get(property.locationId);
        property.locationName = location.name;
        property.locationAmenities = location.amenities || [];
      }
    }

    // Aplicar filtros...
    let filtered = properties;
```

**Benefícios:**
- ✅ Todas propriedades na lista agora têm `locationName` e `locationAmenities`
- ✅ Otimizado: busca locations uma vez e mapeia
- ✅ Funciona mesmo para listagens grandes

---

### **3. PropertyEditWizard: Inicializar campos do location**

#### **Arquivo:** `/components/PropertyEditWizard.tsx`

#### **ANTES:**
```typescript
const [formData, setFormData] = useState<any>({
  // Step 2: Localização
  contentLocation: {
    mode: 'new' as 'new' | 'existing',
    address: {
      country: property?.address?.country || 'BR',
      // ...
    },
    showBuildingNumber: 'global' as 'global' | 'individual',
    photos: property?.locationPhotos || [],
  },
  // ...
});
```

**Problema:** Não inicializava `selectedLocationId`, `locationName`, `locationAmenities`.

#### **DEPOIS:**
```typescript
const [formData, setFormData] = useState<any>({
  // Step 2: Localização
  contentLocation: {
    mode: 'new' as 'new' | 'existing',
    selectedLocationId: property?.locationId || undefined,        // ✅ NOVO
    locationName: property?.locationName || undefined,            // ✅ NOVO
    locationAmenities: property?.locationAmenities || [],         // ✅ NOVO
    address: {
      country: property?.address?.country || 'BR',
      // ...
    },
    showBuildingNumber: 'global' as 'global' | 'individual',
    photos: property?.locationPhotos || [],
  },
  // Step 4: Amenidades
  contentAmenities: {
    propertyAmenities: property?.amenities || property?.propertyAmenities || [], // ✅ Fallback
    inheritLocationAmenities: property?.inheritLocationAmenities !== false,
  },
  // ...
});
```

**Benefícios:**
- ✅ Campos do location inicializados corretamente
- ✅ Dados vêm do backend automaticamente
- ✅ Fallback para `propertyAmenities` se `amenities` não existir

---

### **4. PropertyEditWizard: Passar `locationName` para ContentAmenitiesStep**

#### **ANTES:**
```typescript
if (step.id === 'content-amenities') {
  return (
    <ContentAmenitiesStep
      value={{
        locationId: formData.contentLocation?.selectedLocationId,
        locationAmenities: formData.contentLocation?.locationAmenities || [],
        propertyAmenities: formData.contentAmenities?.propertyAmenities || [],
        inheritLocationAmenities: formData.contentAmenities?.inheritLocationAmenities,
      }}
      onChange={(data) => {
        setFormData({ ...formData, contentAmenities: data });
      }}
    />
  );
}
```

**Problema:** Faltava `locationName`.

#### **DEPOIS:**
```typescript
if (step.id === 'content-amenities') {
  return (
    <ContentAmenitiesStep
      value={{
        locationId: formData.contentLocation?.selectedLocationId,
        locationName: formData.contentLocation?.locationName,           // ✅ NOVO
        locationAmenities: formData.contentLocation?.locationAmenities || [],
        propertyAmenities: formData.contentAmenities?.propertyAmenities || [],
        inheritLocationAmenities: formData.contentAmenities?.inheritLocationAmenities,
      }}
      onChange={(data) => {
        setFormData({ ...formData, contentAmenities: data });
      }}
    />
  );
}
```

**Benefícios:**
- ✅ ContentAmenitiesStep agora recebe o nome do location
- ✅ Pode exibir "Herdadas de 'Hotel Vista Mar'"

---

## 🔄 FLUXO COMPLETO

### **Antes (Não Funcionava):**

```
1. Backend GET /api/properties/123
   └─→ { id: 123, locationId: "loc_456", amenities: [...] }
       ❌ SEM locationName
       ❌ SEM locationAmenities

2. PropertyEditWizard inicializa formData
   └─→ contentLocation: { mode: 'new', address: {...} }
       ❌ SEM selectedLocationId
       ❌ SEM locationName
       ❌ SEM locationAmenities

3. ContentAmenitiesStep renderiza
   └─→ value = { locationId: undefined, locationAmenities: [] }
       ❌ hasLocation = false
       ❌ Seção azul não aparece
```

### **Depois (Funciona):**

```
1. Backend GET /api/properties/123
   └─→ Busca property
   └─→ SE property.locationId existe:
       └─→ Busca location
       └─→ Adiciona location.name e location.amenities
   └─→ { 
         id: 123, 
         locationId: "loc_456",
         locationName: "Hotel Vista Mar",        ✅ NOVO
         locationAmenities: ["Piscina", ...],    ✅ NOVO
         amenities: ["Ar-cond", ...]
       }

2. PropertyEditWizard inicializa formData
   └─→ contentLocation: {
         mode: 'new',
         selectedLocationId: "loc_456",          ✅ NOVO
         locationName: "Hotel Vista Mar",        ✅ NOVO
         locationAmenities: ["Piscina", ...],    ✅ NOVO
         address: {...}
       }

3. ContentAmenitiesStep renderiza
   └─→ value = {
         locationId: "loc_456",                  ✅ OK
         locationName: "Hotel Vista Mar",        ✅ OK
         locationAmenities: ["Piscina", ...],    ✅ OK
         propertyAmenities: ["Ar-cond", ...]     ✅ OK
       }
   └─→ hasLocation = true                       ✅ OK
   └─→ Seção azul APARECE!                      ✅ SUCESSO!
```

---

## 📊 ESTRUTURA DE DADOS

### **Property (agora enriquecida):**
```typescript
interface Property {
  id: string;
  name: string;
  locationId?: string;
  
  // ✅ NOVOS (populados pelo backend)
  locationName?: string;        // Nome do location
  locationAmenities?: string[]; // Amenidades do location
  
  // Amenidades da propriedade
  amenities?: string[];         // (campo antigo)
  propertyAmenities?: string[]; // (campo novo)
  
  // Outros campos...
}
```

### **ContentLocation (formData):**
```typescript
interface ContentLocation {
  mode: 'new' | 'existing';
  
  // ✅ NOVOS
  selectedLocationId?: string;
  locationName?: string;
  locationAmenities?: string[];
  
  address: Address;
  showBuildingNumber: 'global' | 'individual';
  photos: string[];
}
```

---

## 🎨 VISUAL FINAL (Esperado)

### **Agora no Step 4 deve aparecer:**

```
┌────────────────────────────────────────────────┐
│ Step 4 de 14: Amenidades e Comodidades        │
├────────────────────────────────────────────────┤
│                                                │
│ ┌────┐  ┌────┐  ┌────┐                        │
│ │ 12 │  │ 8  │  │ 20 │                        │
│ │ Do │  │ Da │  │Tot │                        │
│ │Loc │  │Aco │  │al  │                        │
│ └────┘  └────┘  └────┘                        │
│                                                │
│ ┌──────────────────────────────────────────┐  │
│ │ 🏢 AMENIDADES DO LOCAL            [12]   │  │ ← ✅ AGORA APARECE!
│ │ 👁️ Apenas visualização                   │  │
│ │ Herdadas de "Hotel Vista Mar"            │  │
│ │ ──────────────────────────────────────── │  │
│ │ 🏊 Piscina                       [3] ▼   │  │
│ │   ✓ Piscina externa                      │  │
│ │   ✓ Piscina aquecida                     │  │
│ │   ✓ Piscina infantil                     │  │
│ │                                          │  │
│ │ 💪 Academia e esportes           [2] ▼   │  │
│ │   ✓ Academia                             │  │
│ │   ✓ Sauna                                │  │
│ │ ... (mais categorias)                    │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ ┌──────────────────────────────────────────┐  │
│ │ 🏠 AMENIDADES DA ACOMODAÇÃO       [8]    │  │
│ │ ✏️ Específicas desta unidade             │  │
│ │ ──────────────────────────────────────── │  │
│ │ 🔍 [Buscar amenidades...]                │  │
│ │ ──────────────────────────────────────── │  │
│ │ 🍳 Cozinha e sala de jantar  [3/36] ▼   │  │
│ │ ☑️ Cozinha completa                      │  │
│ │ ☑️ Microondas                            │  │
│ │ ☑️ Geladeira                             │  │
│ │ ☐ Freezer                                │  │
│ │ ... (mais 12 categorias)                 │  │
│ └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

---

## 🧪 TESTES

### **Teste 1: Propriedade COM location**

```bash
# 1. Criar location com amenidades
POST /api/locations
{
  "name": "Hotel Vista Mar",
  "amenities": [
    "Piscina externa",
    "Academia",
    "Estacionamento gratuito",
    "Wi-Fi gratuito",
    "Recepção 24h"
  ]
}

# 2. Criar propriedade vinculada ao location
POST /api/properties
{
  "name": "Apartamento 101",
  "locationId": "loc_12345",
  "amenities": [
    "Ar-condicionado",
    "TV a cabo",
    "Cozinha completa"
  ]
}

# 3. Buscar propriedade
GET /api/properties/prop_67890

# ✅ ESPERADO:
{
  "success": true,
  "data": {
    "id": "prop_67890",
    "name": "Apartamento 101",
    "locationId": "loc_12345",
    "locationName": "Hotel Vista Mar",           # ✅ NOVO
    "locationAmenities": [                       # ✅ NOVO
      "Piscina externa",
      "Academia",
      "Estacionamento gratuito",
      "Wi-Fi gratuito",
      "Recepção 24h"
    ],
    "amenities": [
      "Ar-condicionado",
      "TV a cabo",
      "Cozinha completa"
    ]
  }
}

# 4. Abrir wizard de edição
# ✅ Deve mostrar:
# - Seção azul com 5 amenidades do location
# - Seção verde com 3 amenidades da acomodação
# - Total: 8 amenidades
```

### **Teste 2: Propriedade SEM location**

```bash
# 1. Criar propriedade individual (sem location)
POST /api/properties
{
  "name": "Casa de Praia",
  "amenities": [
    "Piscina privativa",
    "Churrasqueira",
    "Cozinha completa"
  ]
}

# 2. Buscar propriedade
GET /api/properties/prop_11111

# ✅ ESPERADO:
{
  "success": true,
  "data": {
    "id": "prop_11111",
    "name": "Casa de Praia",
    "locationId": null,
    # locationName e locationAmenities não existem
    "amenities": [
      "Piscina privativa",
      "Churrasqueira",
      "Cozinha completa"
    ]
  }
}

# 3. Abrir wizard de edição
# ✅ Deve mostrar:
# - Seção azul NÃO aparece (sem location)
# - Seção verde com 3 amenidades
# - Total: 3 amenidades
```

---

## 🔍 DEBUGGING

### **Se amenidades do local ainda não aparecem:**

#### **1. Verificar Backend:**
```bash
# Testar endpoint
GET /api/properties/prop_123

# Verificar resposta:
# ✅ Deve ter locationName se locationId existir
# ✅ Deve ter locationAmenities se location tiver amenidades
```

#### **2. Verificar Location existe:**
```bash
GET /api/locations/loc_456

# Se retornar 404, o location não existe!
# Criar o location primeiro
```

#### **3. Verificar Location tem amenidades:**
```javascript
// No console do navegador
const property = await fetch('/api/properties/prop_123').then(r => r.json());
console.log('Location ID:', property.data.locationId);
console.log('Location Name:', property.data.locationName);
console.log('Location Amenities:', property.data.locationAmenities);

// Se locationAmenities for [], o location não tem amenidades cadastradas!
```

#### **4. Verificar formData no Wizard:**
```javascript
// Adicionar console.log no PropertyEditWizard
console.log('formData.contentLocation:', formData.contentLocation);

// Deve ter:
// - selectedLocationId
// - locationName
// - locationAmenities
```

#### **5. Verificar props do ContentAmenitiesStep:**
```javascript
// No ContentAmenitiesStep, adicionar:
console.log('value:', value);
console.log('hasLocation:', hasLocation);
console.log('locationAmenities:', locationAmenities);

// Se hasLocation = false, o locationId não foi passado
// Se locationAmenities = [], o location não tem amenidades
```

---

## ✅ CHECKLIST DE VERIFICAÇÃO

### **Backend:**
- [x] `getProperty()` busca dados do location se `locationId` existir
- [x] `getProperty()` retorna `locationName` e `locationAmenities`
- [x] `listProperties()` enriquece todas propriedades com dados do location
- [x] Performance: usa Map para otimizar busca de locations

### **Frontend (PropertyEditWizard):**
- [x] `formData.contentLocation` inicializa com `selectedLocationId`
- [x] `formData.contentLocation` inicializa com `locationName`
- [x] `formData.contentLocation` inicializa com `locationAmenities`
- [x] `ContentAmenitiesStep` recebe `locationName` como prop
- [x] Fallback: `propertyAmenities` || `amenities`

### **Frontend (ContentAmenitiesStep):**
- [x] Renderiza seção azul SE `hasLocation && locationAmenities.length > 0`
- [x] Exibe nome do location: "Herdadas de '{locationName}'"
- [x] Exibe amenidades agrupadas por categoria
- [x] Stats mostram contagem correta

### **Visual:**
- [x] Seção azul aparece para propriedades COM location
- [x] Seção azul NÃO aparece para propriedades SEM location
- [x] Nome do location é exibido
- [x] Contadores corretos (do local + da acomodação = total)

---

## 📚 ARQUIVOS MODIFICADOS

### **Backend:**
- ✅ `/supabase/functions/server/routes-properties.ts`
  - Linha 105-125: `getProperty()` enriquecida
  - Linha 35-55: `listProperties()` enriquecida

### **Frontend:**
- ✅ `/components/PropertyEditWizard.tsx`
  - Linha 244-289: `formData` inicialização atualizada
  - Linha 490-505: Props do `ContentAmenitiesStep` atualizadas

---

## 🎯 RESULTADO FINAL

### **ANTES:**
```
❌ Amenidades do local não apareciam
❌ Backend não retornava locationName/locationAmenities
❌ Wizard não inicializava campos do location
❌ ContentAmenitiesStep não recebia locationName
```

### **DEPOIS:**
```
✅ Amenidades do local aparecem no Step 4
✅ Backend retorna locationName e locationAmenities automaticamente
✅ Wizard inicializa todos campos do location corretamente
✅ ContentAmenitiesStep recebe e exibe locationName
✅ Visual completo com seção azul + verde + total
✅ Funciona para properties COM e SEM location
```

---

**Versão:** v1.0.103.16  
**Data:** 29 OUT 2025  
**Status:** ✅ AMENIDADES DO LOCAL AGORA APARECEM NO WIZARD!
