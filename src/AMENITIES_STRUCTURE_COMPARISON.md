# 🏗️ RENDIZY - Estrutura de Amenities (Comodidades)

**Versão**: v1.0.102.1  
**Data**: 2025-10-28  
**Análise**: Comparação entre Amenities de Location vs Listing/Property

---

## 📊 Resumo Executivo

O RENDIZY possui **3 níveis de amenities** diferentes no banco de dados:

| Nível | Entidade | Campo | Tipo | Escopo |
|-------|----------|-------|------|--------|
| 1️⃣ | **Location** | `sharedAmenities` | `string[]` | Amenities **COMPARTILHADAS** do prédio/condomínio |
| 2️⃣ | **Property** | `amenities` | `string[]` | Amenities **PRIVATIVAS** da acomodação |
| 3️⃣ | **Listing** | `amenities` | `string[]` | Amenities **DO ANÚNCIO** (para publicação) |

---

## 🔍 Detalhamento Completo

### 1️⃣ Location → `sharedAmenities`

**Caminho no código**: `/utils/api.ts` (linha 48)

```typescript
export interface Location {
  id: string;
  name: string;
  code: string;
  address: { /* ... */ };
  
  // ⭐ AMENITIES DO PRÉDIO/CONDOMÍNIO (COMPARTILHADAS)
  sharedAmenities: string[];  // 👈 Exemplo: ['piscina', 'academia', 'elevador']
  
  management?: { /* ... */ };
  buildingAccess?: { /* ... */ };
  photos: string[];
  // ...
}
```

**Conceito:**
- São as **comodidades compartilhadas** do prédio/condomínio
- **Exemplo**: Um edifício tem piscina, academia, salão de festas
- Todas as unidades (Properties) dentro desse Location herdam essas amenities
- **Não são privativas** de uma acomodação específica

**Exemplos práticos:**
```typescript
// Edifício Sunset Boulevard
sharedAmenities: [
  'out_003',  // Piscina
  'out_025',  // Academia  
  'par_001',  // Estacionamento gratuito
  'acc_003',  // Elevador
  'par_016',  // Portaria 24h
  'out_024',  // Sauna
  'par_017',  // Salão de festas
]
```

---

### 2️⃣ Property → `amenities`

**Caminho no código**: `/utils/api.ts` (linha 117)

```typescript
export interface Property {
  id: string;
  name: string;
  code: string;
  
  // 🔗 Vínculo com Location
  locationId?: string;  // Pode estar vinculado a um Location (ou standalone)
  
  address: { /* ... */ };
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  
  // ⭐ AMENITIES DA ACOMODAÇÃO (PRIVATIVAS)
  amenities: string[];  // 👈 Exemplo: ['wifi', 'ar-condicionado', 'cozinha']
  
  pricing: { /* ... */ };
  restrictions: { /* ... */ };
  photos: string[];
  // ...
}
```

**Conceito:**
- São as **comodidades privativas** da unidade/acomodação
- **Exemplo**: Apartamento 101 tem ar-condicionado, cozinha completa, varanda
- São **específicas** daquela acomodação
- Podem ser **diferentes** entre acomodações do mesmo Location

**Exemplos práticos:**
```typescript
// Apartamento 101 - Edifício Sunset Boulevard
{
  locationId: 'location_001',
  name: 'Apartamento 101',
  amenities: [
    'cli_001',  // Ar-condicionado
    'kit_002',  // Cozinha completa
    'out_001',  // Varanda
    'int_001',  // Wi-Fi
    'bat_001',  // Secador de cabelo
    'ent_009',  // Smart TV
    'bed_001',  // Roupa de cama
  ]
}

// Apartamento 201 - Mesmo edifício, amenities diferentes
{
  locationId: 'location_001',
  name: 'Apartamento 201',
  amenities: [
    'cli_001',  // Ar-condicionado
    'kit_001',  // Cozinha (não completa)
    // SEM varanda
    'int_001',  // Wi-Fi
    'bat_001',  // Secador de cabelo
    'ent_001',  // TV (não smart)
    'bed_001',  // Roupa de cama
  ]
}
```

---

### 3️⃣ Listing → `amenities`

**Caminho no código**: `/utils/api.ts` (linha 907)

```typescript
export interface Listing {
  id: string;
  locationId: string;
  propertyId: string;  // 🔗 Vínculo com Property
  propertyName: string;
  title: string;
  description: string;
  propertyType: 'apartment' | 'house' | 'studio' | 'loft';
  status: 'draft' | 'active' | 'inactive' | 'archived';
  publishedPlatforms: Platform[];
  
  // ⭐ AMENITIES DO ANÚNCIO (PARA PUBLICAÇÃO)
  amenities: string[];  // 👈 Lista completa para exibir no anúncio
  
  pricing: { /* ... */ };
  capacity: { /* ... */ };
  photos: { /* ... */ };
  stats: { /* ... */ };
  // ...
}
```

**Conceito:**
- São as **amenities que serão exibidas no anúncio**
- **Combinação** de:
  - ✅ Amenities privativas da Property (`property.amenities`)
  - ✅ Amenities compartilhadas do Location (`location.sharedAmenities`)
- Usadas para **publicação** em plataformas (Airbnb, Booking, etc.)
- Podem ser **editadas manualmente** antes de publicar

**Lógica de composição:**
```typescript
// Ao criar um Listing, podemos fazer:

const property = await propertiesApi.get(propertyId);
const location = await locationsApi.get(property.locationId);

const listing: Listing = {
  id: 'listing_001',
  propertyId: property.id,
  locationId: location.id,
  
  // ⭐ JUNTAR amenities privativas + compartilhadas
  amenities: [
    ...property.amenities,        // Amenities da unidade
    ...location.sharedAmenities   // Amenities do prédio
  ],
  
  // ... outros campos
};

// RESULTADO FINAL DO ANÚNCIO:
// amenities: [
//   // Da Property (privativas):
//   'cli_001', 'kit_002', 'out_001', 'int_001', 'bat_001', 'ent_009', 'bed_001',
//   
//   // Do Location (compartilhadas):
//   'out_003', 'out_025', 'par_001', 'acc_003', 'par_016', 'out_024', 'par_017'
// ]
```

---

## 🎯 Quando Usar Cada Um?

### Use `location.sharedAmenities` quando:
- ✅ Criar/editar um **Location** (prédio/condomínio)
- ✅ Definir amenities **compartilhadas** entre várias unidades
- ✅ Exemplos: piscina, academia, elevador, portaria, salão de festas

### Use `property.amenities` quando:
- ✅ Criar/editar uma **Property** (acomodação)
- ✅ Definir amenities **privativas** da unidade
- ✅ Exemplos: ar-condicionado, cozinha, varanda, TV

### Use `listing.amenities` quando:
- ✅ Criar um **Listing** (anúncio para publicação)
- ✅ Listar **TODAS** as amenities que o hóspede terá acesso
- ✅ Combinar amenities privativas + compartilhadas
- ✅ Publicar em Airbnb, Booking, VRBO, etc.

---

## 📁 Base de Dados de Amenities

**Arquivo**: `/utils/amenities-data.ts`

### Estatísticas:
- ✅ **252 amenities** cadastradas
- ✅ **13 categorias** organizadas
- ✅ Compatível com **4 canais**: Airbnb, Booking, VRBO, Direct

### Categorias disponíveis:

| Categoria | Nome | Emoji | Qtd | Cor |
|-----------|------|-------|-----|-----|
| `accessibility` | Acessibilidade | ♿ | 8 | Purple |
| `outdoor` | Ao ar livre / Vista | 🌳 | 34 | Green |
| `bathroom` | Banheiro | 🚿 | 28 | Blue |
| `climate` | Climatização | ❄️ | 3 | Cyan |
| `kitchen` | Cozinha e Sala de Jantar | 🍽️ | 33 | Orange |
| `entertainment` | Entretenimento | 📺 | 48 | Pink |
| `parking` | Estacionamento e Instalações | 🅿️ | 21 | Indigo |
| `family` | Família | 👨‍👩‍👧‍👦 | 17 | Rose |
| `internet` | Internet e Escritório | 💻 | 13 | Blue-600 |
| `cleaning` | Limpeza e Desinfecção | 🧹 | 4 | Teal |
| `bedroom` | Quarto e Lavanderia | 🛏️ | 27 | Violet |
| `security` | Segurança Doméstica | 🔒 | 22 | Red |
| `services` | Serviços | 🛎️ | 11 | Amber |

### Estrutura de uma Amenity:

```typescript
export interface Amenity {
  id: string;                    // Exemplo: 'out_003'
  name: string;                  // Exemplo: 'Piscina'
  category: AmenityCategory;     // Exemplo: 'outdoor'
  icon?: string;                 // Emoji (opcional)
  channels: ('airbnb' | 'booking' | 'vrbo' | 'direct')[];
  description?: string;          // Descrição (opcional)
}
```

### Exemplo de Amenity:

```typescript
{
  id: 'out_003',
  name: 'Piscina',
  category: 'outdoor',
  channels: ['airbnb', 'booking', 'vrbo', 'direct'],
}
```

---

## 🔄 Fluxo de Trabalho Completo

### 1. Criar Location (Prédio)

```typescript
const location: Location = {
  id: 'location_001',
  name: 'Edifício Sunset Boulevard',
  code: 'LOC-001',
  
  // Amenities COMPARTILHADAS do prédio
  sharedAmenities: [
    'out_003',  // Piscina
    'out_025',  // Academia
    'par_001',  // Estacionamento gratuito
    'acc_003',  // Elevador
  ],
  
  // ...
};
```

### 2. Criar Property (Apartamento)

```typescript
const property: Property = {
  id: 'property_001',
  name: 'Apartamento 101',
  code: 'APT-101',
  
  // Vincular ao Location
  locationId: 'location_001',
  
  // Amenities PRIVATIVAS da unidade
  amenities: [
    'cli_001',  // Ar-condicionado
    'kit_002',  // Cozinha completa
    'out_001',  // Varanda
    'int_001',  // Wi-Fi
  ],
  
  // ...
};
```

### 3. Criar Listing (Anúncio)

```typescript
const listing: Listing = {
  id: 'listing_001',
  propertyId: 'property_001',
  locationId: 'location_001',
  title: 'Apartamento Moderno com Piscina',
  
  // Amenities COMPLETAS do anúncio
  // (privativas da Property + compartilhadas do Location)
  amenities: [
    // Da Property:
    'cli_001',  // Ar-condicionado
    'kit_002',  // Cozinha completa
    'out_001',  // Varanda
    'int_001',  // Wi-Fi
    
    // Do Location:
    'out_003',  // Piscina
    'out_025',  // Academia
    'par_001',  // Estacionamento gratuito
    'acc_003',  // Elevador
  ],
  
  // ...
};
```

### 4. Exibir no Anúncio

O hóspede verá **TODAS** as amenities:

```
✅ Ar-condicionado (privativo)
✅ Cozinha completa (privativo)
✅ Varanda (privativo)
✅ Wi-Fi (privativo)
✅ Piscina (compartilhado)
✅ Academia (compartilhado)
✅ Estacionamento gratuito (compartilhado)
✅ Elevador (compartilhado)
```

---

## 🎨 Componente de Seleção de Amenities

**Arquivo**: `/components/AmenitiesSelector.tsx`

```typescript
import { AMENITIES, AMENITY_CATEGORIES } from '../utils/amenities-data';

// Uso para Location (compartilhadas)
<AmenitiesSelector
  selectedAmenities={location.sharedAmenities}
  onChange={(amenities) => setLocation({ ...location, sharedAmenities: amenities })}
  label="Amenities Compartilhadas do Prédio"
/>

// Uso para Property (privativas)
<AmenitiesSelector
  selectedAmenities={property.amenities}
  onChange={(amenities) => setProperty({ ...property, amenities })}
  label="Amenities Privativas da Unidade"
/>

// Uso para Listing (completas)
<AmenitiesSelector
  selectedAmenities={listing.amenities}
  onChange={(amenities) => setListing({ ...listing, amenities })}
  label="Amenities do Anúncio"
/>
```

---

## 🗄️ No Banco de Dados (KV Store)

### Locations
```
Key: location:location_001
Value: {
  id: 'location_001',
  name: 'Edifício Sunset Boulevard',
  sharedAmenities: ['out_003', 'out_025', 'par_001', 'acc_003'],
  // ...
}
```

### Properties
```
Key: property:property_001
Value: {
  id: 'property_001',
  name: 'Apartamento 101',
  locationId: 'location_001',
  amenities: ['cli_001', 'kit_002', 'out_001', 'int_001'],
  // ...
}
```

### Listings
```
Key: listing:listing_001
Value: {
  id: 'listing_001',
  propertyId: 'property_001',
  locationId: 'location_001',
  amenities: ['cli_001', 'kit_002', 'out_001', 'int_001', 'out_003', 'out_025', 'par_001', 'acc_003'],
  // ...
}
```

---

## 🚀 Próximos Passos (Frontend)

Quando você for refazer o frontend de **Locais e Anúncios**, considere:

### 1. Modal de Location
- ✅ Campo: "Amenities Compartilhadas"
- ✅ Usar `AmenitiesSelector` com categorias filtradas para prédio
- ✅ Exemplos: Piscina, Academia, Elevador, Portaria, Salão de Festas

### 2. Modal de Property
- ✅ Campo: "Amenities Privativas"
- ✅ Usar `AmenitiesSelector` com todas as categorias
- ✅ Exemplos: Ar-condicionado, Cozinha, Varanda, TV

### 3. Modal de Listing
- ✅ Campo: "Amenities do Anúncio"
- ✅ **PRÉ-PREENCHER** com `property.amenities` + `location.sharedAmenities`
- ✅ Permitir edição manual antes de publicar
- ✅ Exibir com badge indicando origem (privativo vs compartilhado)

### 4. Exibição Visual
```
🏠 Apartamento 101
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Amenities Privativas (4)
  ✅ Ar-condicionado
  ✅ Cozinha completa
  ✅ Varanda
  ✅ Wi-Fi

🏢 Amenities do Edifício (4)
  ✅ Piscina
  ✅ Academia
  ✅ Estacionamento gratuito
  ✅ Elevador

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 8 amenities
```

---

## ✅ Checklist de Validação

- [x] **Location.sharedAmenities** → Comodidades compartilhadas do prédio
- [x] **Property.amenities** → Comodidades privativas da unidade
- [x] **Listing.amenities** → Todas as comodidades do anúncio
- [x] **252 amenities** catalogadas em `/utils/amenities-data.ts`
- [x] **13 categorias** organizadas
- [x] Compatível com **Airbnb, Booking, VRBO, Direct**
- [x] Componente `AmenitiesSelector.tsx` disponível

---

**Resumo**: Sim, existem **3 tipos de amenities** no sistema, cada uma com seu propósito específico! 🎯
