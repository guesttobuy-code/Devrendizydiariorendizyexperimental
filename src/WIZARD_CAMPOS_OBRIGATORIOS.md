# 🧙 WIZARD DE EDIÇÃO - CAMPOS OBRIGATÓRIOS POR ETAPA

**Data:** 28 de Outubro de 2025  
**Versão:** v1.0.103.7  
**Baseado em:** Imagens fornecidas + MAPEAMENTO_MODAL_EDICAO_ANUNCIO.md

---

## 📊 RESUMO DE VALIDAÇÃO

| Etapa | Título | Obrigatório? | Campos Required | Pode Pular? |
|-------|--------|--------------|-----------------|-------------|
| 1 | Informações Básicas | ✅ SIM | 8 campos | ❌ NÃO |
| 2 | Localização | ✅ SIM | 6 campos | ❌ NÃO |
| 3 | Cômodos e Fotos | ⚠️ RECOMENDADO | 3 campos | ⚠️ Com aviso |
| 4 | Amenities | ⚠️ RECOMENDADO | 10 mínimo | ⚠️ Com aviso |
| 5 | Descrição | ✅ SIM | 3 campos | ❌ NÃO |
| 6 | Regras | ✅ SIM | 4 campos | ❌ NÃO |
| 7 | Financeiro | 🔵 OPCIONAL | 0 campos | ✅ SIM |
| 8 | Canais | 🔵 OPCIONAL | 0 campos | ✅ SIM |

---

## 🏠 ETAPA 1: INFORMAÇÕES BÁSICAS

### **✅ Campos OBRIGATÓRIOS:**

#### **1.1 Identificação**
```typescript
{
  internalName: string;        // ✅ OBRIGATÓRIO - Nome interno/código
  publicName: string;          // ✅ OBRIGATÓRIO - Nome público do anúncio
}
```

**Exemplo:**
- `internalName`: "RU021 - Aires3 Novo"
- `publicName`: "Apto Alto Padrão Infraestrutura Barra da Tijuca"

---

#### **1.2 Tipo de Unidade (IMPORTANTE!)**

Para **anúncios individuais**, combinar Location + Accommodation:

```typescript
{
  // TIPO DE PROPRIEDADE (médio/grande) - Location Type
  structureType: 'hotel' | 'pousada' | 'boutique' | 'casa' | 'apartamento' | ...;
  // ✅ OBRIGATÓRIO
  
  // TIPO DE ANÚNCIO - Accommodation Type  
  accommodationType: 'suite' | 'apartamento' | 'chale' | 'studio' | ...;
  // ✅ OBRIGATÓRIO
}
```

**Opções de `structureType` (baseado na imagem 1 e 3):**
- Acomodação móvel
- Albergue
- Apartamento
- Apartamento/residencial
- Bangalô
- Barco (Boat)
- Barco/Beira (Boat)
- Boutique
- Cabana
- Cama e Café (B&Bs)
- Camping
- Casa
- Casa móvel
- Castelo
- Chalé
- Chalé (Área do Camping)
- Condomínio
- Estalagem
- Fazenda para Viajantes
- **Hotel Boutique** ⭐
- Hotel
- Hostel
- Iate
- Industrial
- Motel/Carro
- Pousada exclusiva
- Residência
- Resort
- Treehouse (casa na árvore)
- Villa/Casa

**Opções de `accommodationType` (baseado na imagem 3):**
- Apartamento
- Bangalô
- Cabana
- Camping
- Cápsula/Trailer/Casa Móvel
- Chalé
- Casa em Dormitórios
- Condomínio
- Dormitório
- Estúdio
- Hotel
- Hostel
- Iate
- Industrial
- Loft
- Quarto inteiro
- Quarto privado
- Quarto compartilhado
- Suíte ⭐
- Treehouse
- Villa/Casa

---

#### **1.3 Capacidade**
```typescript
{
  capacity: {
    guests: number;          // ✅ OBRIGATÓRIO - Número máximo de hóspedes
    bedrooms: number;        // ✅ OBRIGATÓRIO - Número de quartos
    bathrooms: number;       // ✅ OBRIGATÓRIO - Número de banheiros
    beds?: number;           // 🔵 OPCIONAL - Total de camas
  }
}
```

**Validações:**
- `guests` >= 1
- `bedrooms` >= 0 (pode ser studio = 0 quartos)
- `bathrooms` >= 1

---

#### **1.4 Precificação Básica**
```typescript
{
  pricing: {
    basePrice: number;       // ✅ OBRIGATÓRIO - Preço base em centavos
    currency: 'BRL' | 'USD' | 'EUR';  // ✅ OBRIGATÓRIO - Moeda
  }
}
```

**Validações:**
- `basePrice` > 0
- Valor em centavos (ex: R$ 350,00 = 35000)

---

#### **1.5 Status**
```typescript
{
  status: 'active' | 'inactive' | 'draft';  // ✅ OBRIGATÓRIO
}
```

**Padrão:** `draft` (rascunho) até completar 100%

---

### **🔵 Campos OPCIONAIS:**

```typescript
{
  code?: string;              // Código automático (ex: RU021)
  tags?: string[];            // Tags para organização
  color?: string;             // Cor no calendário
  folder?: string;            // Pasta/categoria
  priority?: number;          // Ordem de exibição (1-5)
}
```

---

## 📍 ETAPA 2: LOCALIZAÇÃO

### **✅ Campos OBRIGATÓRIOS:**

```typescript
{
  address: {
    street: string;          // ✅ OBRIGATÓRIO - Rua
    number: string;          // ✅ OBRIGATÓRIO - Número
    neighborhood: string;    // ✅ OBRIGATÓRIO - Bairro
    city: string;            // ✅ OBRIGATÓRIO - Cidade
    state: string;           // ✅ OBRIGATÓRIO - Estado (UF)
    zipCode: string;         // ✅ OBRIGATÓRIO - CEP
    country: string;         // ✅ OBRIGATÓRIO - País (default: "Brasil")
  }
}
```

**Validações:**
- `zipCode`: Formato brasileiro (00000-000)
- `state`: UF válida (SP, RJ, MG...)

---

### **🔵 Campos OPCIONAIS:**

```typescript
{
  address: {
    complement?: string;     // Complemento (apto, bloco, andar)
    
    coordinates?: {
      lat: number;
      lng: number;
    },
    
    nearbyPlaces?: {
      name: string;          // "Praia de Copacabana"
      distance: number;      // metros
      type: 'beach' | 'restaurant' | 'supermarket' | 'transport' | 'attraction';
    }[],
    
    directions?: string;     // Instruções de como chegar
  }
}
```

---

### **⚠️ Campo RECOMENDADO:**

```typescript
{
  address: {
    coordinates: {           // ⚠️ RECOMENDADO - GPS
      lat: number;
      lng: number;
    }
  }
}
```

**Por que é importante?**
- Mapa no Airbnb/Booking.com
- Cálculo de distância automático
- Geolocalização para busca

---

## 🛏️ ETAPA 3: CÔMODOS E FOTOS

### **⚠️ Campos RECOMENDADOS:**

```typescript
{
  rooms: Room[];             // ⚠️ RECOMENDADO - Pelo menos 1 quarto
  photos: string[];          // ⚠️ RECOMENDADO - Mínimo 5 fotos
  coverPhoto: string;        // ⚠️ RECOMENDADO - Foto de capa
}
```

**Mínimos Recomendados:**
- ✅ **1 quarto** (bedroom) cadastrado com:
  - Tipo de quarto
  - 1+ camas configuradas
  - 2+ fotos do quarto
  
- ✅ **5 fotos totais** da propriedade:
  - 1 foto de capa (exterior/sala)
  - 1 foto de cada quarto
  - 1 foto do banheiro
  - 1 foto da cozinha
  - 1 foto de área comum

**Estrutura de Room:**
```typescript
interface Room {
  id: string;
  type: RoomType;            // 'bedroom', 'bathroom', 'kitchen', 'living_room'...
  beds: Bed[];               // Array de camas
  photos: RoomPhoto[];       // Fotos do cômodo
  isShared: boolean;         // Cômodo compartilhado?
  hasLock: boolean;          // Tem tranca?
}

interface Bed {
  type: BedType;             // 'king', 'queen', 'double', 'single'...
  quantity: number;          // Quantidade desse tipo
  capacity: number;          // Pessoas por cama
}
```

---

### **🔵 Campos OPCIONAIS:**

```typescript
{
  videoUrl?: string;         // URL do vídeo (YouTube, Vimeo)
  virtualTourUrl?: string;   // Tour virtual 360°
}
```

---

## ⚡ ETAPA 4: AMENITIES

### **⚠️ Campos RECOMENDADOS:**

```typescript
{
  amenities: string[];       // ⚠️ RECOMENDADO - Mínimo 10 amenities
}
```

**Mínimo Recomendado: 10 amenities**

**Categorias Essenciais:**
1. **Internet e Escritório** (obrigatório para 90% dos hóspedes)
   - ✅ WiFi
   - 🔵 Mesa de trabalho
   
2. **Climatização** (importante para conforto)
   - ✅ Ar condicionado OU Ventilador
   
3. **Cozinha** (se for propriedade inteira)
   - ✅ Geladeira
   - ✅ Fogão/Cooktop
   - ✅ Micro-ondas
   - 🔵 Utensílios de cozinha
   
4. **Banheiro**
   - ✅ Chuveiro quente
   - ✅ Toalhas
   - ✅ Shampoo/Sabonete
   
5. **Quarto e Lavanderia**
   - ✅ Roupa de cama
   - ✅ Cabides
   - 🔵 Máquina de lavar

**Sistema de Amenities:**
- 252 amenities disponíveis
- 13 categorias
- Mapeamento Airbnb/Booking.com/VRBO

---

### **🔵 Amenities Diferenciadores (Opcionais mas valorizam):**

- Estacionamento gratuito
- Piscina
- Academia
- Vista para o mar/cidade
- Varanda/Terraço
- Churrasqueira
- Smart TV
- Netflix/Streaming

---

## 📄 ETAPA 5: DESCRIÇÃO

### **✅ Campos OBRIGATÓRIOS:**

```typescript
{
  title: string;             // ✅ OBRIGATÓRIO - Título chamativo (max 50 chars)
  description: string;       // ✅ OBRIGATÓRIO - Descrição completa (min 100 chars)
  shortDescription: string;  // ✅ OBRIGATÓRIO - Resumo (max 200 chars)
}
```

**Validações:**
- `title`: 20-50 caracteres
- `description`: 100-5000 caracteres
- `shortDescription`: 50-200 caracteres

**Exemplo:**
```
title: "Apto Moderno com Vista Mar - Barra da Tijuca"

shortDescription: 
"Apartamento de alto padrão com 2 quartos, varanda com vista 
para o mar, piscina e academia no condomínio. A 5min da praia."

description:
"Bem-vindo ao nosso apartamento de alto padrão na Barra da Tijuca!

🏠 O ESPAÇO
Apartamento totalmente mobiliado com 2 quartos, 2 banheiros,
sala ampla com varanda e vista panorâmica para o mar.

✨ DESTAQUES
- Vista deslumbrante do mar
- Ar condicionado em todos os cômodos
- WiFi de alta velocidade
- Smart TV em todos os quartos
- Cozinha completa equipada

🏊 ÁREAS COMUNS DO CONDOMÍNIO
- Piscina adulto e infantil
- Academia completa
- Salão de festas
- Churrasqueira
- Portaria 24h

📍 LOCALIZAÇÃO
- 5 minutos da Praia da Barra
- Shopping Barra World a 10min
- Próximo a restaurantes e supermercados"
```

---

### **🔵 Campos OPCIONAIS:**

```typescript
{
  highlights?: string[];           // Bullets de destaque
  checkInInstructions?: string;    // Como fazer check-in
  checkOutInstructions?: string;   // Como fazer check-out
  accessInstructions?: string;     // Como acessar o imóvel
  neighborhoodGuide?: string;      // Guia do bairro
}
```

**Exemplo de Highlights:**
```typescript
highlights: [
  "Vista panorâmica para o mar",
  "Ar condicionado em todos os ambientes",
  "WiFi de alta velocidade (500mb)",
  "Smart TV com Netflix em todos os quartos",
  "Vaga de garagem coberta",
  "Condomínio com piscina e academia",
  "A 300m da praia",
  "Check-in self-service 24h"
]
```

---

## 📢 ETAPA 6: REGRAS DA ACOMODAÇÃO

### **✅ Campos OBRIGATÓRIOS:**

```typescript
{
  rules: {
    checkInTime: {
      start: string;         // ✅ OBRIGATÓRIO - Ex: "14:00"
      end: string;           // ✅ OBRIGATÓRIO - Ex: "22:00"
      flexible: boolean;     // ✅ OBRIGATÓRIO
    },
    
    checkOutTime: {
      time: string;          // ✅ OBRIGATÓRIO - Ex: "11:00"
      flexible: boolean;     // ✅ OBRIGATÓRIO
    },
    
    allowChildren: boolean;  // ✅ OBRIGATÓRIO
    allowPets: boolean;      // ✅ OBRIGATÓRIO
  }
}
```

**Validações:**
- Horários em formato HH:MM (24h)
- `checkInTime.start` < `checkInTime.end`
- `checkOutTime` geralmente antes do `checkInTime.start`

---

### **⚠️ Campos CONDICIONAIS:**

```typescript
{
  rules: {
    // Se allowChildren = false:
    minChildAge?: number;    // ⚠️ RECOMENDADO - Idade mínima permitida
    
    // Se allowPets = true:
    allowedPetTypes?: ('dog' | 'cat' | 'bird' | 'other')[];  // ⚠️ OBRIGATÓRIO
    maxPets?: number;        // ⚠️ RECOMENDADO
    petFee?: number;         // ⚠️ RECOMENDADO - Taxa por pet (centavos)
  }
}
```

---

### **🔵 Campos OPCIONAIS:**

```typescript
{
  rules: {
    allowSmoking?: boolean;
    smokingAreas?: string[];       // ['varanda', 'área externa']
    
    allowEvents?: boolean;
    allowParties?: boolean;
    maxEventGuests?: number;
    
    quietHours?: {
      start: string;               // "22:00"
      end: string;                 // "08:00"
    },
    
    customRules?: {
      text: string;
      required: boolean;
    }[]
  }
}
```

**Exemplos de Custom Rules:**
```typescript
customRules: [
  {
    text: "Não é permitido fazer barulho após as 22h",
    required: true
  },
  {
    text: "Favor manter a propriedade limpa e organizada",
    required: true
  },
  {
    text: "Proibido fumar dentro do apartamento",
    required: true
  }
]
```

---

## 💰 ETAPA 7: FINANCEIRO (OPCIONAL)

### **🔵 Todos os Campos São OPCIONAIS:**

```typescript
{
  fees?: {
    cleaningFee?: number;          // Taxa de limpeza (centavos)
    serviceFee?: number;           // Taxa de serviço (%)
    
    extraGuestFee?: {
      threshold: number;           // A partir de X hóspedes
      amount: number;              // Valor por hóspede (centavos)
    },
    
    petFee?: number;               // Taxa por pet (se pets permitidos)
    
    cityTax?: {
      type: 'fixed' | 'percentage';
      value: number;
      appliesTo: 'total' | 'nights';
    },
    
    touristTax?: {
      perNight: number;            // Por noite (centavos)
      maxNights?: number;          // Máximo de noites aplicável
    }
  },
  
  deposit?: {
    required: boolean;
    amount: number;
    type: 'fixed' | 'percentage';
    refundable: boolean;
    refundDays?: number;
    holdMethod?: 'credit_card' | 'pix' | 'transfer';
  },
  
  cancellationPolicy?: {
    type: 'flexible' | 'moderate' | 'strict' | 'super_strict' | 'custom';
    rules?: {
      daysBeforeCheckIn: number;
      refundPercentage: number;
    }[];
    description?: string;
  },
  
  discounts?: {
    weekly?: number;               // % desconto semanal (já existe)
    biweekly?: number;             // % desconto quinzenal
    monthly?: number;              // % desconto mensal (já existe)
    earlyBird?: {
      daysInAdvance: number;
      percentage: number;
    },
    lastMinute?: {
      daysBefore: number;
      percentage: number;
    }
  }
}
```

**Se não preencher:** Usa valores padrão do sistema ou deixa vazio.

---

## 🌐 ETAPA 8: CANAIS DE DISTRIBUIÇÃO (OPCIONAL)

### **🔵 Todos os Campos São OPCIONAIS:**

```typescript
{
  platforms?: {
    airbnb?: {
      enabled: boolean;
      listingId?: string;
      syncEnabled?: boolean;
    },
    
    booking?: {
      enabled: boolean;
      listingId?: string;
      syncEnabled?: boolean;
    },
    
    expedia?: {
      enabled: boolean;
      listingId?: string;
      syncEnabled?: boolean;
    },
    
    vrbo?: {
      enabled: boolean;
      listingId?: string;
      syncEnabled?: boolean;
    },
    
    direct?: boolean;              // Reservas diretas
    
    syncCalendar?: boolean;        // Sincronizar calendário
    syncPrices?: boolean;          // Sincronizar preços
    syncAvailability?: boolean;    // Sincronizar disponibilidade
    
    masterCalendar?: 'rendizy' | 'airbnb' | 'booking';  // Calendário mestre
  },
  
  iCalFeeds?: {
    import?: {
      airbnb?: string;             // URL iCal Airbnb
      booking?: string;            // URL iCal Booking
      vrbo?: string;               // URL iCal VRBO
    },
    export?: string;               // URL iCal gerado pelo Rendizy
  }
}
```

**Se não preencher:** Propriedade fica apenas para reservas diretas via Rendizy.

---

## 📊 CÁLCULO DE COMPLETUDE (%)

```typescript
function calculateCompleteness(property: Property): number {
  const weights = {
    // ETAPA 1: Básico (20%)
    hasInternalName: 3,
    hasPublicName: 3,
    hasStructureType: 2,
    hasAccommodationType: 2,
    hasGuests: 2,
    hasBedrooms: 2,
    hasBathrooms: 2,
    hasBasePrice: 4,
    
    // ETAPA 2: Localização (15%)
    hasStreet: 2,
    hasNumber: 1,
    hasNeighborhood: 2,
    hasCity: 3,
    hasState: 2,
    hasZipCode: 2,
    hasCountry: 1,
    hasCoordinates: 2,
    
    // ETAPA 3: Cômodos e Fotos (20%)
    hasRooms: 5,
    hasMinPhotos: 10,     // Mínimo 5 fotos
    hasCoverPhoto: 5,
    
    // ETAPA 4: Amenities (10%)
    hasMinAmenities: 10,  // Mínimo 10 amenities
    
    // ETAPA 5: Descrição (15%)
    hasTitle: 5,
    hasDescription: 5,
    hasShortDescription: 5,
    
    // ETAPA 6: Regras (10%)
    hasCheckInTime: 3,
    hasCheckOutTime: 3,
    hasChildrenPolicy: 2,
    hasPetsPolicy: 2,
    
    // ETAPA 7: Financeiro (5%)
    hasCleaningFee: 2,
    hasCancellationPolicy: 3,
    
    // ETAPA 8: Canais (5%)
    hasActivePlatform: 5
  };
  
  // Calcular pontos obtidos
  let points = 0;
  
  // ... verificar cada campo ...
  
  return Math.round((points / 100) * 100);
}
```

**Meta Mínima para Publicar:** 80%

**Campos que BLOQUEIAM publicação se vazios:**
- Nome interno
- Nome público
- Tipo de propriedade
- Tipo de anúncio
- Capacidade (hóspedes, quartos, banheiros)
- Preço base
- Endereço completo (cidade, estado)
- Check-in/out
- Políticas de crianças e pets

---

## 🎯 RECOMENDAÇÕES DE UX

### **Validação em Tempo Real:**

```typescript
// Ao sair de um campo obrigatório vazio:
<Input
  required
  onBlur={(e) => {
    if (!e.target.value) {
      setError('Este campo é obrigatório');
    }
  }}
/>
```

### **Indicadores Visuais:**

```typescript
// Campo obrigatório
<Label>
  Nome Interno
  <span className="text-red-500 ml-1">*</span>
</Label>

// Campo recomendado
<Label>
  Coordenadas GPS
  <Badge variant="outline" className="ml-2 text-xs">Recomendado</Badge>
</Label>

// Campo opcional
<Label className="text-gray-600">
  Tags
  <span className="text-xs ml-1">(opcional)</span>
</Label>
```

### **Navegação entre Steps:**

```typescript
// Não permitir avançar se campos obrigatórios vazios
const canProceed = () => {
  if (currentStep === 0) {
    return (
      formData.internalName &&
      formData.publicName &&
      formData.structureType &&
      formData.accommodationType &&
      formData.capacity?.guests > 0 &&
      formData.pricing?.basePrice > 0
    );
  }
  // ... outros steps
};

<Button onClick={handleNext} disabled={!canProceed()}>
  Próximo
</Button>
```

### **Mensagens de Erro Claras:**

```typescript
const errors = {
  required: 'Este campo é obrigatório',
  minLength: (min: number) => `Mínimo de ${min} caracteres`,
  minValue: (min: number) => `Valor mínimo: ${min}`,
  invalid: 'Valor inválido',
  recommended: 'Campo recomendado para melhor experiência do hóspede'
};
```

---

## ✅ CONCLUSÃO

### **Campos Obrigatórios TOTAIS: 25**

**Etapa 1 (8):** Nome interno, Nome público, Tipo propriedade, Tipo anúncio, Hóspedes, Quartos, Banheiros, Preço base

**Etapa 2 (6):** Rua, Número, Bairro, Cidade, Estado, CEP

**Etapa 3 (0):** Nenhum obrigatório, mas recomendado 1 quarto + 5 fotos

**Etapa 4 (0):** Nenhum obrigatório, mas recomendado 10 amenities

**Etapa 5 (3):** Título, Descrição, Descrição curta

**Etapa 6 (4):** Check-in, Check-out, Política crianças, Política pets

**Etapa 7 (0):** Todos opcionais

**Etapa 8 (0):** Todos opcionais

---

**Meta de Completude para Publicar:** ≥ 80%
