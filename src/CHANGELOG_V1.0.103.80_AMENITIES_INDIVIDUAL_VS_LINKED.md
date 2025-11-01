# 🎉 CHANGELOG v1.0.103.80

## AMENIDADES: ANÚNCIO INDIVIDUAL vs ANÚNCIO VINCULADO

**Data:** 30 de Outubro de 2025  
**Versão:** v1.0.103.80  
**Status:** ✅ Backend Implementado / 🔄 Frontend Próximo Passo

---

## 📋 RESUMO

Implementação da **separação completa de amenidades** entre **Location Amenities** (local/prédio) e **Listing Amenities** (acomodação específica), com **lógica diferenciada** para:

1. **Anúncio Individual** (casa, apartamento sem prédio) → AMBAS editáveis
2. **Anúncio Vinculado** (apartamento em prédio) → Location READ-ONLY / Listing EDITÁVEL

---

## 🆕 NOVA ESTRUTURA

### 1️⃣ TIPOS DE PROPRIEDADE

```typescript
Property {
  propertyType: 'individual' | 'location-linked'
  
  // Se individual:
  //   locationAmenities: EDITÁVEL ✏️
  //   listingAmenities: EDITÁVEL ✏️
  
  // Se location-linked:
  //   locationAmenities: READ-ONLY 👁️ (herdadas do Location)
  //   listingAmenities: EDITÁVEL ✏️
}
```

### 2️⃣ SEPARAÇÃO DE AMENIDADES

**ANTES (v1.0.103.79):**
```typescript
Property {
  amenities: string[] // Tudo misturado
}
```

**AGORA (v1.0.103.80):**
```typescript
Property {
  locationAmenities: string[]   // Piscina, Academia, Portaria 24h, etc
  listingAmenities: string[]    // Wi-Fi, Ar condicionado, TV, etc
  amenities: string[]           // DEPRECATED (mantido para compatibilidade)
}
```

---

## 🔧 BACKEND - IMPLEMENTAÇÕES

### 📁 Arquivos Criados/Modificados:

#### 1. **`/utils/amenities-categories.ts`** (NOVO)
```typescript
// Categorias completas de amenidades separadas

LOCATION_AMENITIES: [
  {
    id: 'outdoor-view',
    name: 'Ao ar livre / Vista',
    amenities: [
      { id: 'pool', name: 'Piscina' },
      { id: 'gym', name: 'Academia' },
      { id: 'parking', name: 'Estacionamento' },
      // ... 22 amenities
    ]
  },
  {
    id: 'parking-facilities',
    name: 'Estacionamento e instalações',
    amenities: [
      { id: 'elevator', name: 'Elevador' },
      { id: 'wheelchair-accessible', name: 'Acessível' },
      // ... 9 amenities
    ]
  },
  {
    id: 'services-location',
    name: 'Serviços',
    amenities: [
      { id: 'reception-24h', name: 'Recepção 24h' },
      { id: 'concierge', name: 'Concierge' },
      // ... 15 amenities
    ]
  }
]

LISTING_AMENITIES: [
  {
    id: 'bathroom',
    name: 'Banheiro',
    amenities: [
      { id: 'private-bathroom', name: 'Banheiro privativo' },
      { id: 'bathtub', name: 'Banheira' },
      // ... 8 amenities
    ]
  },
  {
    id: 'climate-control',
    name: 'Climatização',
    amenities: [
      { id: 'air-conditioning', name: 'Ar condicionado' },
      { id: 'heating', name: 'Aquecimento' },
      { id: 'fan', name: 'Ventilador' }
    ]
  },
  {
    id: 'kitchen-dining',
    name: 'Cozinha e sala de jantar',
    amenities: [
      { id: 'kitchen', name: 'Cozinha completa' },
      { id: 'microwave', name: 'Micro-ondas' },
      // ... 14 amenities
    ]
  },
  {
    id: 'entertainment',
    name: 'Entretenimento',
    amenities: [
      { id: 'tv', name: 'TV' },
      { id: 'smart-tv', name: 'Smart TV' },
      { id: 'streaming', name: 'Streaming (Netflix)' },
      // ... 12 amenities
    ]
  },
  {
    id: 'internet-office',
    name: 'Internet e escritório',
    amenities: [
      { id: 'wifi', name: 'Wi-Fi' },
      { id: 'workspace', name: 'Espaço de trabalho' },
      // ... 6 amenities
    ]
  },
  {
    id: 'bedroom-laundry',
    name: 'Quarto e Lavanderia',
    amenities: [
      { id: 'bed-linen', name: 'Roupa de cama' },
      { id: 'washer', name: 'Máquina de lavar' },
      // ... 9 amenities
    ]
  },
  {
    id: 'services-listing',
    name: 'Serviços',
    amenities: [
      { id: 'daily-cleaning', name: 'Limpeza diária' },
      { id: 'private-entrance', name: 'Entrada privativa' },
      // ... 10 amenities
    ]
  },
  {
    id: 'safety-security',
    name: 'Segurança',
    amenities: [
      { id: 'smoke-detector', name: 'Detector de fumaça' },
      { id: 'fire-extinguisher', name: 'Extintor' },
      // ... 5 amenities
    ]
  },
  {
    id: 'family-friendly',
    name: 'Família',
    amenities: [
      { id: 'crib', name: 'Berço' },
      { id: 'high-chair', name: 'Cadeira alta' },
      // ... 6 amenities
    ]
  },
  {
    id: 'pets',
    name: 'Pets',
    amenities: [
      { id: 'pets-allowed', name: 'Pets permitidos' },
      { id: 'pet-bowl', name: 'Tigela para pet' },
      { id: 'pet-bed', name: 'Cama para pet' }
    ]
  }
]
```

**TOTAL:**
- **Location Amenities:** ~46 amenidades em 3 categorias
- **Listing Amenities:** ~80+ amenidades em 10 categorias

#### 2. **`/supabase/functions/server/types.ts`** (ATUALIZADO)
```typescript
export interface Property {
  // ... campos existentes ...
  
  // 🆕 TIPO DE ANÚNCIO
  propertyType: 'individual' | 'location-linked';
  
  // 🆕 AMENIDADES SEPARADAS
  locationAmenities: string[];   // Amenidades do local/prédio
  listingAmenities: string[];    // Amenidades da acomodação
  
  // DEPRECATED (compatibilidade)
  amenities: string[];
}
```

#### 3. **`/supabase/functions/server/routes-amenities.ts`** (NOVO)
```typescript
// GET /properties/:id/amenities
// Retorna amenidades + permissões de edição
{
  locationAmenities: string[],
  listingAmenities: string[],
  canEditLocationAmenities: boolean,  // true se 'individual'
  canEditListingAmenities: boolean,   // sempre true
  locationAmenitiesSource: 'property' | 'location',
  propertyType: 'individual' | 'location-linked'
}

// PUT /properties/:id/location-amenities
// Atualiza amenidades do local (apenas se individual)
// ⚠️ BLOQUEIA se propertyType='location-linked'

// PUT /properties/:id/listing-amenities
// Atualiza amenidades da acomodação (sempre permitido)
```

#### 4. **`/supabase/functions/server/index.tsx`** (ATUALIZADO)
```typescript
// Novas rotas adicionadas:
app.get("/make-server-67caf26a/properties/:id/amenities", ...);
app.put("/make-server-67caf26a/properties/:id/location-amenities", ...);
app.put("/make-server-67caf26a/properties/:id/listing-amenities", ...);
```

---

## 📊 EXEMPLOS DE USO

### Exemplo 1: Anúncio Individual (Casa)
```json
{
  "id": "prop_001",
  "name": "Casa de Praia Guarujá",
  "propertyType": "individual",
  "locationId": null,
  
  "locationAmenities": [
    "pool",              // ✏️ EDITÁVEL
    "garden",            // ✏️ EDITÁVEL
    "bbq-area",          // ✏️ EDITÁVEL
    "parking"            // ✏️ EDITÁVEL
  ],
  
  "listingAmenities": [
    "wifi",              // ✏️ EDITÁVEL
    "air-conditioning",  // ✏️ EDITÁVEL
    "smart-tv",          // ✏️ EDITÁVEL
    "kitchen"            // ✏️ EDITÁVEL
  ]
}
```

### Exemplo 2: Anúncio Vinculado (Apartamento)
```json
{
  "id": "prop_002",
  "name": "Apartamento 201",
  "propertyType": "location-linked",
  "locationId": "loc_001",  // Vinculado ao "Edifício Copacabana"
  
  "locationAmenities": [
    // 👁️ READ-ONLY - Herdadas do Location
    // Usuário NÃO pode editar
  ],
  
  "listingAmenities": [
    "wifi",              // ✏️ EDITÁVEL
    "air-conditioning",  // ✏️ EDITÁVEL
    "smart-tv",          // ✏️ EDITÁVEL
    "kitchen"            // ✏️ EDITÁVEL
  ]
}
```

**Location "Edifício Copacabana":**
```json
{
  "id": "loc_001",
  "name": "Edifício Copacabana",
  
  "sharedAmenities": [
    "pool",              // Todos os apartamentos herdam
    "gym",               // Todos os apartamentos herdam
    "reception-24h",     // Todos os apartamentos herdam
    "elevator",          // Todos os apartamentos herdam
    "parking"            // Todos os apartamentos herdam
  ]
}
```

---

## 🎨 UI/UX - WIZARD DE CRIAÇÃO

### Passo 4: Amenidades do Local

**ANÚNCIO INDIVIDUAL:**
```
┌─────────────────────────────────────────┐
│ ✏️ Passo 4: Amenidades do Local         │
│ (EDITÁVEL - Badge Verde)                │
├─────────────────────────────────────────┤
│ 🏞️ Ao ar livre / Vista                  │
│ ☐ Piscina                               │
│ ☐ Academia                              │
│ ☐ Jardim                                │
│ ...                                     │
└─────────────────────────────────────────┘
```

**ANÚNCIO VINCULADO:**
```
┌─────────────────────────────────────────┐
│ 👁️ Passo 4: Amenidades do Local         │
│ (READ-ONLY - Badge Azul)                │
│ Herdadas de: Edifício Copacabana        │
├─────────────────────────────────────────┤
│ 🏞️ Ao ar livre / Vista                  │
│ ✓ Piscina                  🔒           │
│ ✓ Academia                 🔒           │
│ ✓ Estacionamento           🔒           │
│ ...                                     │
└─────────────────────────────────────────┘
```

### Passo 5: Amenidades da Acomodação

**AMBOS OS TIPOS (sempre editável):**
```
┌─────────────────────────────────────────┐
│ ✏️ Passo 5: Amenidades da Acomodação    │
│ (EDITÁVEL - Badge Verde)                │
├─────────────────────────────────────────┤
│ 🚿 Banheiro                             │
│ ☐ Banheiro privativo                    │
│ ☐ Banheira                              │
│                                         │
│ ❄️ Climatização                         │
│ ☐ Ar condicionado                       │
│ ☐ Aquecimento                           │
│                                         │
│ 📺 Entretenimento                       │
│ ☐ Smart TV                              │
│ ☐ Streaming (Netflix)                   │
│ ...                                     │
└─────────────────────────────────────────┘
```

---

## 🔄 PRÓXIMOS PASSOS (Frontend)

### 1. Atualizar `ContentLocationAmenitiesStep.tsx`:
```typescript
// Detectar se propertyType='individual' ou 'location-linked'
const isIndividual = formData.propertyType === 'individual';

// Fazer GET /properties/:id/amenities
const { 
  canEditLocationAmenities,
  locationAmenities 
} = await fetch(...);

// Renderizar com badge correto
<Badge color={canEditLocationAmenities ? 'green' : 'blue'}>
  {canEditLocationAmenities ? '✏️ Editável' : '👁️ Somente leitura'}
</Badge>

// Desabilitar checkboxes se !canEditLocationAmenities
<Checkbox 
  disabled={!canEditLocationAmenities}
  checked={...}
/>
```

### 2. Atualizar `ContentAmenitiesStep.tsx`:
```typescript
// Sempre editável (ambos os tipos)
// Usar LISTING_AMENITIES do /utils/amenities-categories.ts
```

### 3. Criar `PropertyTypeSelector.tsx` no Passo 1:
```typescript
// Adicionar seleção de tipo no início do wizard
<RadioGroup value={propertyType}>
  <Radio value="individual">
    🏠 Anúncio Individual
    <p>Casa, apartamento sem prédio, etc</p>
  </Radio>
  
  <Radio value="location-linked">
    🏢 Anúncio Vinculado
    <p>Apartamento em prédio, quarto em hotel, etc</p>
  </Radio>
</RadioGroup>
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Backend (✅ COMPLETO)
- [x] Criar `/utils/amenities-categories.ts` com todas as categorias
- [x] Atualizar `Property` interface em `types.ts`
- [x] Criar `/supabase/functions/server/routes-amenities.ts`
- [x] Adicionar rotas no `index.tsx`
- [x] Implementar lógica de permissão (individual vs linked)

### Frontend (🔄 PRÓXIMO)
- [ ] Atualizar `ContentLocationAmenitiesStep.tsx` (Passo 4)
- [ ] Atualizar `ContentAmenitiesStep.tsx` (Passo 5)
- [ ] Criar seletor de tipo no Passo 1
- [ ] Atualizar `PropertyEditWizard.tsx`
- [ ] Testar fluxo completo
- [ ] Migrar dados existentes

---

## 📝 NOTAS IMPORTANTES

1. **Compatibilidade:** Campo `amenities[]` mantido deprecated para não quebrar código existente

2. **Migração:** Propriedades antigas precisarão ser classificadas como `individual` ou `location-linked`

3. **Validação:** Backend bloqueia edição de `locationAmenities` se `propertyType='location-linked'`

4. **UX:** Badges coloridos e ícones de cadeado deixam claro o que é editável

5. **Performance:** Buscar amenidades do Location apenas quando necessário

---

## 🎯 RESULTADO ESPERADO

**ANTES:**
```
❌ Todas as amenidades misturadas
❌ Não diferencia local vs acomodação
❌ Não diferencia individual vs vinculado
```

**DEPOIS:**
```
✅ Amenidades separadas por categoria
✅ Location vs Listing claramente definido
✅ Permissões baseadas no tipo de anúncio
✅ UI intuitiva com badges coloridos
✅ 126+ amenidades organizadas
```

---

**Desenvolvido em:** 30/10/2025  
**Versão Backend:** v1.0.103.80  
**Próxima Versão Frontend:** v1.0.103.81
