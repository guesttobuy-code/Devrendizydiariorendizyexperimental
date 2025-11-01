# 🎨 MAPEAMENTO MODAL EDIÇÃO DE ANÚNCIO - RENDIZY

**Data:** 28 de Outubro de 2025  
**Versão:** v1.0.103.3  
**Objetivo:** Mapear estrutura completa para modal de edição de anúncios

---

## 📸 ANÁLISE DA IMAGEM DE REFERÊNCIA

### **ESTRUTURA VISUAL IDENTIFICADA**

```
┌─────────────────────────────────────────────────────────────────────┐
│  RU021 - Aires3 Novo - Barra da Tijuca RJ           [Ir p/ outro]  │
│  [ATIVO ▼]                                                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────┐         │
│  │                    FOTO PRINCIPAL                      │  📷 ⚙️  │
│  │                                                        │         │
│  │  Apto Alto Padrão Infraestrutura                      │  100%   │
│  │  Barra da Tijuca - Rio de Janeiro                     │         │
│  │  🛏️ 1   👤 4   🚿 2   📐 1                              │         │
│  └───────────────────────────────────────────────────────┘         │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  [🛏️ Conteúdo] [💰 Financeiro] [🌐 Distribuição] [⚙️ Auxiliares] [📅]│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  🏠  Tipo                                                       >   │
│      Tipo de anúncio, categoria, prioridade comercial...           │
│                                                                     │
│  📍  Localização                                                >   │
│      Endereço, arredores...                                         │
│                                                                     │
│  📍  Amenities do endereço                                      >   │
│      Estacionamento, elevadores, serviços em geral...               │
│                                                                     │
│  🛏️  Cômodos                                                     >   │
│      Camas, inventário, fotos, vídeo...                             │
│                                                                     │
│  ⚡  Amenities do anúncio                                        >   │
│      Internet, máquina de lavar, itens de cozinha...                │
│                                                                     │
│  📄  Conteúdo descritivo                                         >   │
│      Nome, título, descrição, como chegar...                        │
│                                                                     │
│  📢  Regras da acomodação                                        >   │
│      Crianças, animais, horário de silêncio...                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ SEÇÕES IDENTIFICADAS

### **1. HEADER/NAVEGAÇÃO**

#### **Componentes:**
- **Breadcrumb/Código:** RU021 - Aires3 Novo - Barra da Tijuca RJ
- **Dropdown Navegação:** "Ir para outro anúncio"
- **Status Badge:** ATIVO (com dropdown para mudar)

#### **Dados Necessários:**
```typescript
{
  id: string;              // RU021
  internalName: string;    // Aires3 Novo
  publicName?: string;     // Nome público diferente?
  address: {
    neighborhood: string;  // Barra da Tijuca
    city: string;         // Rio de Janeiro
  };
  status: 'active' | 'inactive' | 'draft' | 'maintenance';
}
```

---

### **2. HERO SECTION (FOTO + INFO)**

#### **Componentes:**
- **Foto Principal Grande** (com overlay)
- **Botões de Ação:**
  - 📷 Gerenciar fotos
  - ⚙️ Configurações rápidas
- **Overlay Info:**
  - Nome destaque (público)
  - Localização completa
  - **Ícones de Capacidade:**
    - 🛏️ 1 quarto
    - 👤 4 pessoas
    - 🚿 2 banheiros
    - 📐 ? (área? outras info?)
  - **Badge de Completude:** 100%

#### **Dados Necessários:**
```typescript
{
  coverPhoto: string;          // URL da foto principal
  photos: string[];            // Array de fotos
  publicName: string;          // "Apto Alto Padrão Infraestrutura"
  displayLocation: string;     // "Barra da Tijuca - Rio de Janeiro"
  capacity: {
    bedrooms: number;         // 1
    maxGuests: number;        // 4
    bathrooms: number;        // 2
    area?: number;            // m² (?)
  };
  completeness: number;       // 0-100 (%)
}
```

---

### **3. TABS HORIZONTAIS**

#### **Identificadas:**

| Tab | Ícone | Função |
|-----|-------|--------|
| **Conteúdo** | 🛏️ | Informações básicas, fotos, descrição |
| **Financeiro** | 💰 | Preços, políticas de cancelamento, taxas |
| **Distribuição** | 🌐 | Canais (Airbnb, Booking.com), sincronização |
| **Auxiliares** | ⚙️ | Configurações adicionais, integrações |
| **Calendário** | 📅 | Disponibilidade, bloqueios, reservas |

---

### **4. MENU VERTICAL (ACCORDION)**

Cada seção é expansível e leva a um sub-formulário/modal.

---

## 📋 MAPEAMENTO DETALHADO DAS SEÇÕES

### **SEÇÃO 1: TIPO**

#### **UI:**
```
🏠  Tipo                                                       >
    Tipo de anúncio, categoria, prioridade comercial...
```

#### **Dados Mapeados:**

| Campo | Tipo | Já Temos? | Onde Está? |
|-------|------|-----------|------------|
| Tipo de anúncio | `PropertyType` | ✅ SIM | `Property.type` |
| Categoria | `string` | ❌ NÃO | - |
| Prioridade comercial | `number` | ❌ NÃO | - |
| Estrutura física | `string` | ⚠️ PARCIAL | CreateModal tem |

**No Backend:**
```typescript
// JÁ TEMOS:
type: PropertyType = 'apartment' | 'house' | 'studio' | 'loft' | 'condo' | 'villa' | 'other'

// FALTA ADICIONAR:
category?: string;              // 'standard', 'premium', 'luxury'
priority?: number;              // 1-5 (ordem de exibição)
visibility?: 'public' | 'private' | 'hidden';
```

---

### **SEÇÃO 2: LOCALIZAÇÃO**

#### **UI:**
```
📍  Localização                                                >
    Endereço, arredores...
```

#### **Dados Mapeados:**

| Campo | Tipo | Já Temos? | Onde Está? |
|-------|------|-----------|------------|
| Rua | `string` | ✅ SIM | `Property.address.street` |
| Número | `string` | ✅ SIM | `Property.address.number` |
| Complemento | `string` | ✅ SIM | `Property.address.complement` |
| Bairro | `string` | ✅ SIM | `Property.address.neighborhood` |
| Cidade | `string` | ✅ SIM | `Property.address.city` |
| Estado | `string` | ✅ SIM | `Property.address.state` |
| CEP | `string` | ✅ SIM | `Property.address.zipCode` |
| País | `string` | ✅ SIM | `Property.address.country` |
| Coordenadas GPS | `{lat, lng}` | ⚠️ PARCIAL | Location tem |
| Arredores/Pontos | `string[]` | ❌ NÃO | - |

**No Backend:**
```typescript
// JÁ TEMOS: Property.address completo

// FALTA ADICIONAR:
address: {
  // ... campos existentes
  coordinates?: {
    lat: number;
    lng: number;
  };
  nearbyPlaces?: {
    name: string;           // "Praia de Copacabana"
    distance: number;       // metros
    type: 'beach' | 'restaurant' | 'supermarket' | 'transport' | 'attraction';
  }[];
  directions?: string;      // Instruções de como chegar
}
```

---

### **SEÇÃO 3: AMENITIES DO ENDEREÇO**

#### **UI:**
```
📍  Amenities do endereço                                      >
    Estacionamento, elevadores, serviços em geral...
```

#### **Dados Mapeados:**

| Campo | Tipo | Já Temos? | Onde Está? |
|-------|------|-----------|------------|
| Estacionamento | `boolean` | ⚠️ PARCIAL | Location.buildingAccess.hasParking |
| Tipo estacionamento | `enum` | ⚠️ PARCIAL | Location.buildingAccess.parkingType |
| Elevador | `boolean` | ⚠️ PARCIAL | Location.buildingAccess.hasElevator |
| Portaria 24h | `boolean` | ⚠️ PARCIAL | Location.sharedAmenities |
| Amenities prédio | `string[]` | ⚠️ PARCIAL | Location.sharedAmenities |

**Conceito:**
- Estes são amenities do **prédio/condomínio** (Location)
- Diferentes dos amenities da **unidade** (Property)

**No Backend:**
```typescript
// JÁ TEMOS:
Location {
  sharedAmenities: string[];    // ['piscina', 'academia', 'elevador']
  buildingAccess: {
    hasElevator: boolean;
    hasParking: boolean;
    parkingType?: 'gratuito' | 'pago' | 'rotativo';
  }
}

// SUGESTÃO:
// Diferenciar amenities de Property vs Location
// Property.amenities = dentro da unidade
// Location.sharedAmenities = do prédio/condomínio
```

---

### **SEÇÃO 4: CÔMODOS**

#### **UI:**
```
🛏️  Cômodos                                                     >
    Camas, inventário, fotos, vídeo...
```

#### **Dados Mapeados:**

| Campo | Tipo | Já Temos? | Onde Está? |
|-------|------|-----------|------------|
| Quartos | `Room[]` | ✅ SIM | `Room` type completo |
| Camas por quarto | `Bed[]` | ✅ SIM | `Room.beds` |
| Tipo de cama | `BedType` | ✅ SIM | `Bed.type` |
| Banheiros | `Room[]` | ✅ SIM | `Room` (tipo banheiro) |
| Fotos por cômodo | `RoomPhoto[]` | ✅ SIM | `Room.photos` |
| Tags de fotos | `RoomPhotoTag` | ✅ SIM | 17 tags definidas |
| Vídeo | `string` | ❌ NÃO | - |

**No Backend:**
```typescript
// JÁ TEMOS SISTEMA COMPLETO DE ROOMS!
Room {
  id: string;
  accommodationId: string;
  type: RoomType;           // 11 tipos de cômodos
  beds: Bed[];
  photos: RoomPhoto[];
  isShared: boolean;
  hasLock: boolean;
}

Bed {
  type: BedType;            // 11 tipos de camas
  quantity: number;
  capacity: number;
}

RoomPhoto {
  url: string;
  tag: RoomPhotoTag;        // 17 tags
  isMain: boolean;
}

// FALTA ADICIONAR:
videoUrl?: string;          // URL do vídeo do imóvel
virtualTourUrl?: string;    // URL do tour virtual 360°
```

---

### **SEÇÃO 5: AMENITIES DO ANÚNCIO**

#### **UI:**
```
⚡  Amenities do anúncio                                        >
    Internet, máquina de lavar, itens de cozinha...
```

#### **Dados Mapeados:**

| Campo | Tipo | Já Temos? | Onde Está? |
|-------|------|-----------|------------|
| Amenities | `string[]` | ✅ SIM | `Property.amenities` |
| Categorias | `AmenityCategory` | ✅ SIM | `amenities-data.ts` |
| Total amenities | 252 items | ✅ SIM | 13 categorias |

**No Backend:**
```typescript
// JÁ TEMOS SISTEMA COMPLETO!
Property {
  amenities: string[];      // Array de IDs
}

// Database completo em amenities-data.ts:
- 252 amenities
- 13 categorias
- Mapeamento Airbnb/Booking.com/VRBO
- Ícones e descrições

Categorias:
1. Acessibilidade (8)
2. Ao ar livre / Vista (34)
3. Banheiro (28)
4. Climatização (3)
5. Cozinha e Sala de Jantar (33)
6. Entretenimento (48)
7. Estacionamento e Instalações (21)
8. Família (17)
9. Internet e Escritório (13)
10. Limpeza e Desinfecção (4)
11. Quarto e Lavanderia (27)
12. Segurança Doméstica (22)
13. Serviços (11)
```

---

### **SEÇÃO 6: CONTEÚDO DESCRITIVO**

#### **UI:**
```
📄  Conteúdo descritivo                                         >
    Nome, título, descrição, como chegar...
```

#### **Dados Mapeados:**

| Campo | Tipo | Já Temos? | Onde Está? |
|-------|------|-----------|------------|
| Nome interno | `string` | ✅ SIM | `Property.name` |
| Nome público | `string` | ⚠️ PARCIAL | `Property.publicName?` |
| Título do anúncio | `string` | ❌ NÃO | - |
| Descrição completa | `string` | ✅ SIM | `Property.description` |
| Descrição curta | `string` | ✅ SIM | `Property.shortDescription` |
| Como chegar | `string` | ⚠️ PARCIAL | Location.buildingAccess.instructions |
| Idiomas | `object` | ❌ NÃO | - |

**No Backend:**
```typescript
// JÁ TEMOS:
Property {
  name: string;                 // Nome interno
  description?: string;         // Descrição longa
  shortDescription?: string;    // Descrição curta
}

// FALTA ADICIONAR:
publicName?: string;            // Nome público (diferente do interno)
title?: string;                 // Título do anúncio
highlights?: string[];          // Destaques (bullets)
houseRules?: string;           // Regras da casa (texto)
checkInInstructions?: string;  // Instruções de check-in
checkOutInstructions?: string; // Instruções de check-out
accessInstructions?: string;   // Como acessar o imóvel

// Multilíngue (futuro):
translations?: {
  [locale: string]: {
    title: string;
    description: string;
    shortDescription: string;
    highlights: string[];
  }
}
```

---

### **SEÇÃO 7: REGRAS DA ACOMODAÇÃO**

#### **UI:**
```
📢  Regras da acomodação                                        >
    Crianças, animais, horário de silêncio...
```

#### **Dados Mapeados:**

| Campo | Tipo | Já Temos? | Onde Está? |
|-------|------|-----------|------------|
| Crianças permitidas | `boolean` | ❌ NÃO | - |
| Idade mínima crianças | `number` | ❌ NÃO | - |
| Animais permitidos | `boolean` | ❌ NÃO | - |
| Tipos de animais | `string[]` | ❌ NÃO | - |
| Taxa pet | `number` | ❌ NÃO | - |
| Fumantes | `boolean` | ❌ NÃO | - |
| Eventos | `boolean` | ❌ NÃO | - |
| Horário silêncio | `{start, end}` | ❌ NÃO | - |
| Horário check-in | `string` | ⚠️ PARCIAL | Reservation tem |
| Horário check-out | `string` | ⚠️ PARCIAL | Reservation tem |
| Regras personalizadas | `string[]` | ❌ NÃO | - |

**No Backend:**
```typescript
// PRECISAMOS CRIAR:
PropertyRules {
  id: string;
  propertyId: string;
  
  // Hóspedes
  allowChildren: boolean;
  minChildAge?: number;           // Idade mínima
  maxGuests: number;              // Já existe em Property
  
  // Animais
  allowPets: boolean;
  allowedPetTypes?: ('dog' | 'cat' | 'bird' | 'other')[];
  maxPets?: number;
  petFee?: number;                // Taxa por pet (centavos)
  petDeposit?: number;            // Depósito (centavos)
  
  // Fumantes
  allowSmoking: boolean;
  smokingAreas?: string[];        // ['varanda', 'área externa']
  
  // Eventos
  allowEvents: boolean;
  allowParties: boolean;
  maxEventGuests?: number;
  
  // Horários
  quietHours?: {
    start: string;                // "22:00"
    end: string;                  // "08:00"
  };
  checkInTime: {
    start: string;                // "14:00"
    end: string;                  // "22:00"
    flexible: boolean;
  };
  checkOutTime: {
    time: string;                 // "11:00"
    flexible: boolean;
  };
  
  // Regras customizadas
  customRules?: {
    text: string;
    required: boolean;            // Regra obrigatória?
  }[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}
```

---

## 💰 TAB FINANCEIRO (SUGERIDA)

Não visível na imagem, mas essencial:

### **Seções:**

#### **1. Preços Base**
```typescript
// JÁ TEMOS:
Property.pricing {
  basePrice: number;              // Preço base (centavos)
  currency: Currency;
  weeklyDiscount: number;         // %
  biweeklyDiscount: number;       // %
  monthlyDiscount: number;        // %
}
```

#### **2. Taxas Adicionais**
```typescript
// FALTA ADICIONAR:
fees: {
  cleaningFee?: number;           // Taxa de limpeza (centavos)
  serviceFee?: number;            // Taxa de serviço (%)
  extraGuestFee?: {               // Taxa por hóspede extra
    threshold: number;            // A partir de X hóspedes
    amount: number;               // Valor por hóspede (centavos)
  };
  petFee?: number;                // Taxa por pet
  
  // Taxas municipais
  cityTax?: {
    type: 'fixed' | 'percentage';
    value: number;
    appliesTo: 'total' | 'nights';
  };
  touristTax?: {
    perNight: number;             // Por noite (centavos)
    maxNights?: number;           // Máximo de noites aplicável
  };
}
```

#### **3. Políticas de Cancelamento**
```typescript
// FALTA ADICIONAR:
cancellationPolicy: {
  type: 'flexible' | 'moderate' | 'strict' | 'super_strict' | 'custom';
  
  // Custom policy
  rules?: {
    daysBeforeCheckIn: number;    // Dias antes do check-in
    refundPercentage: number;     // % de reembolso
  }[];
  
  description?: string;
}
```

#### **4. Depósitos**
```typescript
// FALTA ADICIONAR:
deposit: {
  required: boolean;
  amount: number;                 // Valor (centavos)
  type: 'fixed' | 'percentage';   // Fixo ou % do total
  refundable: boolean;
  refundDays?: number;            // Dias para devolver
  holdMethod?: 'credit_card' | 'pix' | 'transfer';
}
```

---

## 🌐 TAB DISTRIBUIÇÃO (SUGERIDA)

### **Seções:**

#### **1. Canais de Distribuição**
```typescript
// JÁ TEMOS PARCIAL:
Property.platforms {
  airbnb?: {
    enabled: boolean;
    listingId: string;
    syncEnabled: boolean;
  };
  booking?: {
    enabled: boolean;
    listingId: string;
    syncEnabled: boolean;
  };
  direct: boolean;
}

// FALTA ADICIONAR:
platforms: {
  // ... canais existentes
  expedia?: { /* ... */ };
  vrbo?: { /* ... */ };
  decolar?: { /* ... */ };
  
  // Configurações globais
  syncCalendar: boolean;          // Sincronizar calendário
  syncPrices: boolean;            // Sincronizar preços
  syncAvailability: boolean;      // Sincronizar disponibilidade
  masterCalendar?: 'rendizy' | 'airbnb' | 'booking';
}
```

#### **2. iCal URLs**
```typescript
// Sistema já existe em ICalManager!
iCalFeeds: {
  import: {
    airbnb?: string;              // URL iCal do Airbnb
    booking?: string;             // URL iCal do Booking
    vrbo?: string;                // URL iCal do VRBO
  };
  export: string;                 // URL iCal gerado pelo Rendizy
}
```

---

## ⚙️ TAB AUXILIARES (SUGERIDA)

### **Seções:**

#### **1. Configurações de Exibição**
```typescript
// JÁ TEMOS PARCIAL:
Property {
  tags: string[];                 // Tags
  color?: string;                 // Cor no calendário
  folder?: string;                // Pasta/categoria
}

// FALTA ADICIONAR:
display: {
  featured: boolean;              // Destaque na listagem
  priority: number;               // Ordem (1-5)
  showAddress: boolean;           // Mostrar endereço completo
  showMap: boolean;               // Mostrar mapa
  instantBooking: boolean;        // Reserva instantânea
}
```

#### **2. Notificações**
```typescript
// FALTA ADICIONAR:
notifications: {
  newReservation: boolean;
  cancellation: boolean;
  checkInReminder: boolean;
  checkOutReminder: boolean;
  reviewReceived: boolean;
  priceAlert: boolean;
  channels: ('email' | 'whatsapp' | 'sms')[];
}
```

#### **3. Automações**
```typescript
// FALTA ADICIONAR:
automations: {
  autoConfirm: boolean;           // Auto-confirmar reservas
  autoPrice: boolean;             // Ajuste automático de preços
  minimumGap: number;             // Dias entre reservas
  preparationTime: number;        // Tempo de preparo (já existe em restrictions)
}
```

---

## 📊 CÁLCULO DE COMPLETUDE

Badge "100%" na foto:

```typescript
function calculateCompleteness(property: Property): number {
  const checks = [
    // Básico (40%)
    property.name,                          // 5%
    property.code,                          // 5%
    property.type,                          // 5%
    property.address?.street,               // 5%
    property.address?.city,                 // 5%
    property.maxGuests > 0,                 // 5%
    property.bedrooms > 0,                  // 5%
    property.pricing?.basePrice > 0,        // 5%
    
    // Descrição (20%)
    property.description,                   // 10%
    property.shortDescription,              // 10%
    
    // Fotos (20%)
    property.photos?.length >= 5,           // 10%
    property.coverPhoto,                    // 10%
    
    // Amenities (10%)
    property.amenities?.length >= 10,       // 10%
    
    // Regras (10%)
    // property.rules?.checkInTime,         // 5%
    // property.rules?.checkOutTime,        // 5%
  ];
  
  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}
```

---

## 🏗️ ESTRUTURA PROPOSTA PARA MODAL

### **Opção A: Tabs Horizontais + Accordion**

```
┌─────────────────────────────────────────────────────────────┐
│  Header com Breadcrumb e Status                             │
├─────────────────────────────────────────────────────────────┤
│  Hero Section (Foto + Info + Completude)                    │
├─────────────────────────────────────────────────────────────┤
│  [Conteúdo] [Financeiro] [Distribuição] [Auxiliares]       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ▼ Tipo                                                     │
│  ▶ Localização                                              │
│  ▶ Amenities do Endereço                                    │
│  ▶ Cômodos                                                  │
│  ▶ Amenities do Anúncio                                     │
│  ▶ Conteúdo Descritivo                                      │
│  ▶ Regras da Acomodação                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Pros:**
- ✅ Organização clara por contexto
- ✅ Navegação rápida
- ✅ Menos scroll
- ✅ Similar à imagem

**Contras:**
- ⚠️ Muitos níveis de hierarquia
- ⚠️ Pode confundir usuário

---

### **Opção B: Wizard Multi-Step (RECOMENDADO)**

```
┌─────────────────────────────────────────────────────────────┐
│  Editar Anúncio - RU021                            [X]      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━           │
│  ●━━━○━━○━━○━━○                              5/7 (71%)     │
│  Básico  Localização  Cômodos  Amenities  Regras           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Conteúdo do Step Atual]                                  │
│                                                             │
│  - Formulário específico da seção                          │
│  - Preview em tempo real                                   │
│  - Validações inline                                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [◀ Anterior]           [Salvar Rascunho]  [Próximo ▶]    │
└─────────────────────────────────────────────────────────────┘
```

**Steps Sugeridos:**

1. **Informações Básicas** (10 campos)
   - Nome, código, tipo, status
   - Capacidade (hóspedes, quartos, banheiros)
   - Preço base, moeda
   
2. **Localização** (8 campos)
   - Endereço completo
   - Coordenadas GPS (mapa)
   - Arredores, como chegar

3. **Cômodos e Fotos** (gerenciador visual)
   - Grid de cômodos
   - Upload de fotos por cômodo
   - Vídeo e tour virtual

4. **Amenities** (seletor multi-categoria)
   - 13 categorias
   - Busca e filtros
   - Seleção múltipla

5. **Conteúdo Descritivo** (4 campos)
   - Títulos e descrições
   - Destaques
   - Instruções de acesso

6. **Regras e Políticas** (10 campos)
   - Check-in/out
   - Crianças, pets, fumantes
   - Horário silêncio
   - Regras personalizadas

7. **Financeiro** (8 campos)
   - Taxas adicionais
   - Descontos
   - Depósito
   - Política de cancelamento

8. **Distribuição** (opcional)
   - Canais ativos
   - Sincronização
   - iCal feeds

**Pros:**
- ✅ Progressão clara
- ✅ Menos sobrecarga cognitiva
- ✅ Validação por etapa
- ✅ Salvar rascunho a qualquer momento
- ✅ Barra de progresso motivadora
- ✅ Facilita preenchimento completo

**Contras:**
- ⚠️ Mais passos para completar
- ⚠️ Necessário navegação entre steps

---

### **Opção C: Single-Page com Sticky Navigation**

```
┌─────────────────────────────────────────────────────────────┐
│  ← Voltar    Editar: RU021 - Aires3 Novo      [Salvar]     │
│  ┌─────────────────────┐                                    │
│  │ • Básico            │  [Conteúdo Principal]              │
│  │ • Localização       │                                    │
│  │ • Cômodos           │  Scroll vertical com todas         │
│  │ • Amenities         │  as seções expandidas              │
│  │ • Descrição         │                                    │
│  │ • Regras            │  Navegação via sidebar             │
│  │ • Financeiro        │  ou scroll                         │
│  │ • Distribuição      │                                    │
│  └─────────────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
```

**Pros:**
- ✅ Visão geral completa
- ✅ Edição rápida de qualquer campo
- ✅ Navegação via anchor links
- ✅ Bom para usuários avançados

**Contras:**
- ⚠️ Muito scroll
- ⚠️ Pode ser overwhelming
- ⚠️ Performance com muitos campos

---

## 🎯 RECOMENDAÇÃO FINAL

### **WIZARD MULTI-STEP (Opção B)**

**Motivos:**

1. **Progressão Clara:** Usuário sabe exatamente onde está e quanto falta
2. **Validação por Etapa:** Evita erros e garante dados completos
3. **Menos Overhead:** Foco em um contexto por vez
4. **Completude:** Incentiva preenchimento 100%
5. **Mobile Friendly:** Funciona bem em telas menores
6. **Similar ao Criação:** Mantém consistência com CreateIndividualPropertyModal

### **Estrutura dos Steps:**

```typescript
const EDIT_STEPS = [
  {
    id: 'basic',
    title: 'Informações Básicas',
    icon: Home,
    fields: ['name', 'code', 'type', 'capacity', 'pricing'],
    validation: 'required'
  },
  {
    id: 'location',
    title: 'Localização',
    icon: MapPin,
    fields: ['address', 'coordinates', 'nearby'],
    validation: 'required'
  },
  {
    id: 'rooms',
    title: 'Cômodos e Fotos',
    icon: BedDouble,
    component: RoomsManager,
    validation: 'optional'
  },
  {
    id: 'amenities',
    title: 'Amenities',
    icon: Sparkles,
    component: AmenitiesSelector,
    validation: 'recommended'
  },
  {
    id: 'content',
    title: 'Descrição',
    icon: FileText,
    fields: ['description', 'highlights', 'instructions'],
    validation: 'required'
  },
  {
    id: 'rules',
    title: 'Regras',
    icon: AlertCircle,
    fields: ['checkIn', 'pets', 'smoking', 'customRules'],
    validation: 'required'
  },
  {
    id: 'financial',
    title: 'Financeiro',
    icon: DollarSign,
    fields: ['fees', 'deposit', 'cancellation'],
    validation: 'optional'
  },
  {
    id: 'distribution',
    title: 'Canais',
    icon: Share2,
    fields: ['platforms', 'ical', 'sync'],
    validation: 'optional'
  }
];
```

---

## 📦 TIPOS TYPESCRIPT NECESSÁRIOS

```typescript
// ============================================================================
// PROPERTY RULES (NOVO)
// ============================================================================

export interface PropertyRules {
  id: string;
  propertyId: string;
  
  // Hóspedes
  allowChildren: boolean;
  minChildAge?: number;
  maxGuests: number;
  
  // Animais
  allowPets: boolean;
  allowedPetTypes?: ('dog' | 'cat' | 'bird' | 'other')[];
  maxPets?: number;
  petFee?: number;
  petDeposit?: number;
  
  // Outros
  allowSmoking: boolean;
  smokingAreas?: string[];
  allowEvents: boolean;
  allowParties: boolean;
  
  // Horários
  quietHours?: { start: string; end: string; };
  checkInTime: { start: string; end: string; flexible: boolean; };
  checkOutTime: { time: string; flexible: boolean; };
  
  // Custom
  customRules?: { text: string; required: boolean; }[];
  
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// PROPERTY FEES (NOVO)
// ============================================================================

export interface PropertyFees {
  id: string;
  propertyId: string;
  
  cleaningFee?: number;
  serviceFee?: number;
  extraGuestFee?: {
    threshold: number;
    amount: number;
  };
  petFee?: number;
  
  cityTax?: {
    type: 'fixed' | 'percentage';
    value: number;
  };
  touristTax?: {
    perNight: number;
    maxNights?: number;
  };
  
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// CANCELLATION POLICY (NOVO)
// ============================================================================

export interface CancellationPolicy {
  id: string;
  propertyId: string;
  
  type: 'flexible' | 'moderate' | 'strict' | 'super_strict' | 'custom';
  
  customRules?: {
    daysBeforeCheckIn: number;
    refundPercentage: number;
  }[];
  
  description?: string;
  
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// PROPERTY DEPOSIT (NOVO)
// ============================================================================

export interface PropertyDeposit {
  id: string;
  propertyId: string;
  
  required: boolean;
  amount: number;
  type: 'fixed' | 'percentage';
  refundable: boolean;
  refundDays?: number;
  holdMethod?: 'credit_card' | 'pix' | 'transfer';
  
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// ATUALIZAR PROPERTY (ADICIONAR)
// ============================================================================

export interface Property {
  // ... campos existentes
  
  // ADICIONAR:
  publicName?: string;
  title?: string;
  highlights?: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  
  category?: 'standard' | 'premium' | 'luxury';
  priority?: number;
  visibility?: 'public' | 'private' | 'hidden';
  
  checkInInstructions?: string;
  checkOutInstructions?: string;
  accessInstructions?: string;
  
  // Relacionamentos (IDs)
  rulesId?: string;
  feesId?: string;
  cancellationPolicyId?: string;
  depositId?: string;
}
```

---

## 🚀 PRÓXIMOS PASSOS

### **Fase 1: Backend (Tipos e Rotas)**

1. ✅ Adicionar novos tipos ao `types.ts`
2. ✅ Criar rotas em `routes-rules.ts`
3. ✅ Criar rotas em `routes-fees.ts`
4. ✅ Atualizar `routes-properties.ts` para incluir relacionamentos

### **Fase 2: Frontend (Componente)**

1. ✅ Criar `EditPropertyModal.tsx`
2. ✅ Implementar wizard multi-step
3. ✅ Criar formulários por step
4. ✅ Integrar com backend
5. ✅ Adicionar validações
6. ✅ Implementar barra de progresso

### **Fase 3: Integrações**

1. ✅ Integrar com PropertiesManagement.tsx
2. ✅ Adicionar botão "Editar" nos cards
3. ✅ Carregar dados existentes
4. ✅ Sincronizar com calendário

---

## 📝 CONCLUSÃO

Mapeamento completo da estrutura de edição de anúncios baseado na imagem fornecida e cruzado com os dados já existentes no backend do RENDIZY.

**Principais Descobertas:**

✅ **JÁ TEMOS:**
- Sistema completo de Properties
- Sistema completo de Rooms e Beds
- Sistema completo de Amenities (252 items)
- Sistema completo de Locations
- Endereço completo
- Pricing e descontos
- Plataformas e sincronização

❌ **FALTA IMPLEMENTAR:**
- PropertyRules (regras da acomodação)
- PropertyFees (taxas adicionais)
- CancellationPolicy (política de cancelamento)
- PropertyDeposit (depósito)
- Campos adicionais em Property (publicName, title, etc.)
- Completeness calculation

**Recomendação:**
Implementar modal de edição no formato **Wizard Multi-Step** com 8 steps, mantendo consistência com o modal de criação existente.

---

**RENDIZY v1.0.103.3**  
**"Mapeamento Completo Modal Edição"**  
**28 de Outubro de 2025**
