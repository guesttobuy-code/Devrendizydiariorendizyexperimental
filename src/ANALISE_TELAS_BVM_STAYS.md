# 🏗️ RENDIZY - Análise Comparativa: Telas BVM/Stays

**Sistema de Referência**: BVM/Stays  
**URL**: `bvm.stays.net`  
**Data de Análise**: 2025-10-28  
**Objetivo**: Aprender e replicar UI/UX para módulo Locais e Anúncios

---

## 📸 TELA 1: Vista "Individual"

### **URL**
```
bvm.stays.net/r/buildings/0?statuses[]=yes&statuses[]=draft&address=barra
```

### **Layout Geral**

```
┌──────────────┬────────────────────────────────────────────────────────┐
│              │  Header: 8 locais encontrados                          │
│   SIDEBAR    │  Badges: [ativo:4] [bloqueado:2] [inativo:2]          │
│   FILTROS    │  [🔼 Importar anúncio Airbnb] [+ Anúncio] (verde)     │
│              │                                                         │
│   (Largura   │  ┌─────────┬───────────────────────────────┬───┐      │
│   ~280px)    │  │  FOTO   │ [badges]                       │ > │      │
│              │  │ GRANDE  │ TÍTULO EM NEGRITO             │   │      │
│              │  │         │ Subtítulo menor               │   │      │
│              │  │         │ [tag] [tag] [tag]             │   │      │
│              │  │         │ 👥 2 🛏️ 8 🛁 3 🏠 1          │   │      │
│              │  │         │ 📍 Endereço completo...       │   │      │
│              │  └─────────┴───────────────────────────────┴───┘      │
│              │                                                         │
│              │  [Mais cards...]                                        │
└──────────────┴────────────────────────────────────────────────────────┘
```

### **Componentes da Sidebar**

```
┌─────────────────────────┐
│ 🏠 Vista local          │ ← Botão azul destacado
├─────────────────────────┤
│ Individual              │ ← Toggle/Switch
├─────────────────────────┤
│ Localização             │
│ ▼ Todos                 │ ← Dropdown
├─────────────────────────┤
│ Filtrar endereço por    │
│ texto                   │
│ [barra_______]          │ ← Input de busca
├─────────────────────────┤
│   [🔄 Amostrar]         │ ← Botão azul
└─────────────────────────┘
```

### **Anatomia de um Card**

```
┌─────────────┬──────────────────────────────────────┬───┐
│             │ [badges sobre a foto]                │   │
│   FOTO      │                                      │   │
│  (250x180)  │  ● AIRBNB NOVO - BARRA DA TIJUCA RJ  │ → │
│             │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   │
│             │  Suíte Master Resort Barra bjs.      │   │
│             │  Praia Barra da Tijuca...            │   │
│             │                                      │   │
│             │  [ativo] [Acomodação[1]] [Condomínio]│   │
│             │                                      │   │
│             │  👥 1  🛏️ 4  🛁 2  🏠 1             │   │
│             │                                      │   │
│             │  📍 R Barra da Tijuca, Rio de        │   │
│             │     Janeiro, RJ, Lucio Costa...      │   │
└─────────────┴──────────────────────────────────────┴───┘
```

### **Sistema de Badges**

| Badge | Cor | Significado | Exemplo |
|-------|-----|-------------|---------|
| `ativo` | Verde | Status ativo | `ativo` |
| `bloqueado` | Amarelo | Status bloqueado | `bloqueado` |
| `inativo` | Vermelho | Status inativo | `inativo` |
| `Acomodação [X]` | Azul | Tipo + quantidade | `Acomodação [2]` |
| `Condomínio` | Cinza | Categoria | `Condomínio` |
| `apto` | Azul claro | Tipo de imóvel | `apto` |
| `suite` | Azul claro | Tipo de imóvel | `suite` |
| `hotel` | Cinza | Tipo de imóvel | `hotel` |

---

## 📸 TELA 2: Vista "⬇️ Por Local"

### **URL**
```
bvm.stays.net/r/buildings/0?statuses[]=yes&statuses[]=draft&address=barra
```

### **Layout Geral**

```
┌──────────────┬────────────────────────────────────────────────────────┐
│              │  Tabs: [⬇️ Por Local] [Individual]                    │
│              │                                                         │
│   SIDEBAR    │  ┌─────────┬───────────────────────────────┬───┐      │
│   FILTROS    │  │  FOTO   │ [ativo-1] [apto] [condominio] │ > │      │
│              │  │ GRANDE  │ Apartamento Barra da Tijuca    │   │      │
│   Checkboxes:│  │         │ Fabiana Fernandes volta...     │   │      │
│   ☑ ativo    │  │         │ 👥 2 🛏️ 4 🛁 3 🏠 2          │   │      │
│   ☑ rascunho │  │         │ 📍 Barra da Tijuca, RJ...     │   │      │
│              │  └─────────┴───────────────────────────────┴───┘      │
│   Dropdown:  │                                                         │
│   Localização│  ┌─────────┬───────────────────────────────┬───┐      │
│   ▼ Todos    │  │  FOTO   │ [ativo-3] [hotel]             │ > │      │
│              │  │ GRANDE  │ HOTEL FAZENDA JUREA           │   │      │
│   Busca:     │  │         │ Maria Teresa (dona)...        │   │      │
│   [barra]    │  │         │ 📍 Iguaba, Barra do Pirai...  │   │      │
│              │  └─────────┴───────────────────────────────┴───┘      │
│   [Amostrar] │                                                         │
│              │  → Suite 01 - Fazenda Jurea Iguabas                    │
│              │  → Suite 02 - Fazenda Jurea Iguabas                    │
│              │  → Suite 03 - Fazenda Jurea Iguabas                    │
│              │  → Suite 04 - Fazenda Jurea Iguabas                    │
└──────────────┴────────────────────────────────────────────────────────┘
```

### **Diferenças Visuais da Tela 1**

| Aspecto | Tela 1 (Individual) | Tela 2 (Por Local) |
|---------|---------------------|-------------------|
| **Tabs** | Não tem | ✅ `[⬇️ Por Local] [Individual]` |
| **Hierarquia** | Todos os cards no mesmo nível | LOCATION → PROPERTIES (hierárquico) |
| **Badges** | Status + Tipo + Categoria | Status com número `ativo-3` |
| **Cards filhos** | Não tem | ✅ Suites indentadas abaixo do hotel |
| **Contador** | Não visível no badge | ✅ `ativo-3` = 3 acomodações ativas |

### **Estrutura Hierárquica Identificada**

```
LOCATION: Apartamento Barra da Tijuca - RJ FABIANA
├─ Badge: [ativo-1] = 1 acomodação ativa
├─ Badge: [apto] = tipo de imóvel
├─ Badge: [condominio] = categoria
└─ Capacidade: 👥 2 🛏️ 4 🛁 3 🏠 2 (total agregado?)

LOCATION: HOTEL FAZENDA JUREA - ENDEREÇO DA SEDE
├─ Badge: [ativo-3] = 3 acomodações ativas
├─ Badge: [hotel] = tipo de imóvel
└─ PROPERTIES (filhas):
    ├─ Suite 01 - Fazenda Jurea Iguabas
    │   ├─ Badge: [ativo-1] [suite] [acomodação]
    │   └─ Capacidade: 👥 1 🛏️ 2 🛁 1 🏠 1
    ├─ Suite 02 - Fazenda Jurea Iguabas
    ├─ Suite 03 - Fazenda Jurea Iguabas
    └─ Suite 04 - Fazenda Jurea Iguabas
```

---

## 🎨 DESIGN PATTERNS IDENTIFICADOS

### **1. Sistema de Cores**

```css
/* Status badges */
.badge-ativo      { background: #10b981; color: white; } /* green-500 */
.badge-bloqueado  { background: #f59e0b; color: white; } /* amber-500 */
.badge-inativo    { background: #ef4444; color: white; } /* red-500 */
.badge-rascunho   { background: #6b7280; color: white; } /* gray-500 */

/* Tipo badges */
.badge-apto       { background: #3b82f6; color: white; } /* blue-500 */
.badge-suite      { background: #3b82f6; color: white; } /* blue-500 */

/* Categoria badges */
.badge-condominio { background: #6b7280; color: white; } /* gray-500 */
.badge-hotel      { background: #6b7280; color: white; } /* gray-500 */
.badge-acomodacao { background: #6b7280; color: white; } /* gray-500 */
```

### **2. Tipografia**

```css
/* Título do card */
.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827; /* gray-900 */
  line-height: 1.4;
}

/* Subtítulo/descrição */
.card-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: #6b7280; /* gray-500 */
  line-height: 1.5;
  margin-top: 4px;
}

/* Capacidade (ícones + números) */
.card-capacity {
  font-size: 14px;
  font-weight: 500;
  color: #374151; /* gray-700 */
  display: flex;
  gap: 16px;
}

/* Endereço */
.card-address {
  font-size: 13px;
  font-weight: 400;
  color: #6b7280; /* gray-500 */
  line-height: 1.4;
}

/* Badge texto */
.badge-text {
  font-size: 12px;
  font-weight: 500;
  text-transform: lowercase;
}
```

### **3. Espaçamento**

```css
/* Card */
.card {
  padding: 16px;
  gap: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb; /* gray-200 */
  background: white;
}

/* Foto */
.card-photo {
  width: 250px;
  height: 180px;
  border-radius: 6px;
  object-fit: cover;
}

/* Área de conteúdo */
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Entre elementos internos */
.card-badges { gap: 6px; }
.card-capacity { gap: 16px; }
.card-tags { gap: 8px; }

/* Entre cards */
.cards-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

### **4. Layout Responsivo**

```css
/* Sidebar */
.sidebar {
  width: 280px;
  padding: 24px;
  background: #f9fafb; /* gray-50 */
  border-right: 1px solid #e5e7eb;
}

/* Área principal */
.main-content {
  flex: 1;
  padding: 24px 32px;
  overflow-y: auto;
}

/* Card layout */
.card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

/* Foto (esquerda) */
.card-photo-container {
  position: relative;
  flex-shrink: 0;
}

/* Conteúdo (centro) */
.card-content {
  flex: 1;
  min-width: 0; /* Permite truncar textos longos */
}

/* Seta (direita) */
.card-arrow {
  flex-shrink: 0;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 🔧 COMPONENTES IDENTIFICADOS

### **1. Sidebar de Filtros**

```tsx
interface FilterSidebarProps {
  // Tabs (só na Tela 2)
  activeTab?: 'por-local' | 'individual';
  onTabChange?: (tab: string) => void;
  
  // Filtros por status
  statusFilters: {
    ativo: boolean;
    bloqueado: boolean;
    inativo: boolean;
    rascunho: boolean;
  };
  onStatusChange: (status: string, checked: boolean) => void;
  
  // Filtro por localização
  selectedLocation: string;
  locations: { id: string; name: string; }[];
  onLocationChange: (locationId: string) => void;
  
  // Busca por texto
  searchText: string;
  onSearchChange: (text: string) => void;
  
  // Ação de aplicar filtros
  onApplyFilters: () => void;
}
```

**Estrutura HTML/React:**

```tsx
<div className="w-[280px] bg-gray-50 border-r border-gray-200 p-6">
  {/* Tabs (opcional) */}
  {showTabs && (
    <div className="flex gap-2 mb-6">
      <button className={activeTab === 'por-local' ? 'active' : ''}>
        ⬇️ Por Local
      </button>
      <button className={activeTab === 'individual' ? 'active' : ''}>
        Individual
      </button>
    </div>
  )}
  
  {/* Filtros de Status */}
  <div className="space-y-3 mb-6">
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={filters.ativo} />
      <span className="text-sm">ativo</span>
    </label>
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={filters.rascunho} />
      <span className="text-sm">rascunho</span>
    </label>
  </div>
  
  {/* Dropdown Localização */}
  <div className="mb-6">
    <label className="text-sm text-gray-600 mb-2">Localização</label>
    <select className="w-full">
      <option>Todos</option>
      {locations.map(loc => (
        <option key={loc.id}>{loc.name}</option>
      ))}
    </select>
  </div>
  
  {/* Busca por texto */}
  <div className="mb-6">
    <label className="text-sm text-gray-600 mb-2">
      Filtrar endereço por texto
    </label>
    <input 
      type="text" 
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full"
    />
  </div>
  
  {/* Botão Aplicar */}
  <button 
    onClick={onApplyFilters}
    className="w-full bg-blue-500 text-white py-2 rounded"
  >
    🔄 Amostrar
  </button>
</div>
```

---

### **2. Card de Location/Property**

```tsx
interface LocationCardProps {
  id: string;
  name: string;
  description: string;
  type: 'apartment' | 'house' | 'hotel' | 'suite';
  category: 'condominio' | 'hotel' | 'acomodacao';
  status: 'active' | 'blocked' | 'inactive' | 'draft';
  photo: string;
  capacity: {
    guests: number;
    bedrooms: number;
    bathrooms: number;
    accommodations?: number; // Só para Location
  };
  address: string;
  tags?: string[];
  activeAccommodations?: number; // Para "ativo-3"
  onClick: () => void;
}
```

**Estrutura HTML/React:**

```tsx
<div 
  className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
  onClick={onClick}
>
  {/* Foto com badges sobrepostos */}
  <div className="relative w-[250px] h-[180px] flex-shrink-0">
    <img 
      src={photo} 
      alt={name}
      className="w-full h-full object-cover rounded-md"
    />
    
    {/* Badges sobre a foto */}
    <div className="absolute top-2 left-2 flex gap-2">
      <Badge variant={status}>
        {status}
        {activeAccommodations && `-${activeAccommodations}`}
      </Badge>
      <Badge variant="type">{type}</Badge>
      <Badge variant="category">{category}</Badge>
    </div>
  </div>
  
  {/* Conteúdo */}
  <div className="flex-1 flex flex-col gap-3">
    {/* Título */}
    <h3 className="text-lg font-bold text-gray-900">
      {name}
    </h3>
    
    {/* Descrição */}
    <p className="text-sm text-gray-500 line-clamp-2">
      {description}
    </p>
    
    {/* Tags (opcional) */}
    {tags && tags.length > 0 && (
      <div className="flex gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 text-xs rounded">
            {tag}
          </span>
        ))}
      </div>
    )}
    
    {/* Capacidade */}
    <div className="flex gap-4 text-sm text-gray-700">
      <span>👥 {capacity.guests}</span>
      <span>🛏️ {capacity.bedrooms}</span>
      <span>🛁 {capacity.bathrooms}</span>
      {capacity.accommodations && (
        <span>🏠 {capacity.accommodations}</span>
      )}
    </div>
    
    {/* Endereço */}
    <p className="text-xs text-gray-500 flex items-start gap-1">
      <span>📍</span>
      <span className="line-clamp-2">{address}</span>
    </p>
  </div>
  
  {/* Seta de navegação */}
  <div className="flex items-center justify-center w-10">
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </div>
</div>
```

---

### **3. Badge Component**

```tsx
interface BadgeProps {
  variant: 'active' | 'blocked' | 'inactive' | 'draft' | 'type' | 'category';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  const variants = {
    active: 'bg-green-500 text-white',
    blocked: 'bg-amber-500 text-white',
    inactive: 'bg-red-500 text-white',
    draft: 'bg-gray-500 text-white',
    type: 'bg-blue-500 text-white',
    category: 'bg-gray-500 text-white',
  };
  
  return (
    <span className={`
      px-2 py-1 
      text-xs font-medium 
      rounded 
      lowercase
      ${variants[variant]}
    `}>
      {children}
    </span>
  );
};
```

---

## 🎯 FLUXO DE INTERAÇÃO

### **Tela 1 (Individual)**

```
1. Usuário ajusta filtros na sidebar
   ↓
2. Digita "barra" no campo de busca
   ↓
3. Clica em "🔄 Amostrar"
   ↓
4. Sistema filtra e exibe 8 locais
   ↓
5. Usuário clica em um card
   ↓
6. Abre modal/página de detalhes
```

### **Tela 2 (Por Local)**

```
1. Usuário clica na tab "⬇️ Por Local"
   ↓
2. Sistema agrupa Properties por Location
   ↓
3. Cards de Location mostram badge "ativo-X"
   ↓
4. Abaixo de cada Location, lista suas Properties
   ↓
5. Usuário pode clicar:
   - No card do Location (ver detalhes)
   - No card de uma Property (ver detalhes)
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### **Phase 1: Estrutura Base**

- [ ] Criar `LocationsListingsSidebar.tsx`
  - [ ] Tabs (Por Local / Individual)
  - [ ] Checkboxes de status
  - [ ] Dropdown de localização
  - [ ] Input de busca por endereço
  - [ ] Botão "Amostrar"

- [ ] Criar `LocationCard.tsx`
  - [ ] Layout horizontal (foto + conteúdo + seta)
  - [ ] Badges sobrepostos na foto
  - [ ] Título, descrição, capacidade, endereço
  - [ ] Hover effect

- [ ] Criar `PropertyCard.tsx`
  - [ ] Similar ao LocationCard
  - [ ] Badges diferentes (sem contador)
  - [ ] Possibilidade de indentação

### **Phase 2: Lógica de Filtragem**

- [ ] Implementar filtros por status
- [ ] Implementar busca por texto
- [ ] Implementar filtro por localização
- [ ] Sincronizar filtros com URL (query params)

### **Phase 3: Visualizações**

- [ ] Vista "Individual"
  - [ ] Listar todos os Locations + Properties
  - [ ] Sem hierarquia visual

- [ ] Vista "Por Local"
  - [ ] Agrupar Properties por Location
  - [ ] Exibir contador "ativo-X"
  - [ ] Indentar Properties filhas

### **Phase 4: Interações**

- [ ] Click em card → abrir detalhes
- [ ] Import do Airbnb (botão header)
- [ ] Criar novo anúncio (botão verde)
- [ ] Expandir/colapsar Properties de um Location

### **Phase 5: Refinamento**

- [ ] Animações suaves
- [ ] Loading states
- [ ] Empty states
- [ ] Responsividade
- [ ] Dark mode (se aplicável)

---

## 🚀 CÓDIGO EXEMPLO: Estrutura Completa

```tsx
// LocationsAndListings.tsx (refatorado)

import { useState } from 'react';
import { LocationsListingsSidebar } from './LocationsListingsSidebar';
import { LocationCard } from './LocationCard';
import { PropertyCard } from './PropertyCard';

type ViewMode = 'por-local' | 'individual';

export const LocationsAndListings = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('por-local');
  const [filters, setFilters] = useState({
    status: { ativo: true, bloqueado: false, inativo: false, rascunho: true },
    location: 'all',
    searchText: '',
  });
  
  const [locations, setLocations] = useState([]);
  const [properties, setProperties] = useState([]);
  
  // Função para aplicar filtros
  const handleApplyFilters = () => {
    // Lógica de filtragem
  };
  
  // Função para renderizar vista "Por Local"
  const renderByLocation = () => {
    return locations.map(location => (
      <div key={location.id}>
        {/* Card do Location */}
        <LocationCard
          {...location}
          activeAccommodations={location.properties.filter(p => p.status === 'active').length}
        />
        
        {/* Cards das Properties filhas */}
        <div className="ml-12 mt-2 space-y-2">
          {location.properties.map(property => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    ));
  };
  
  // Função para renderizar vista "Individual"
  const renderIndividual = () => {
    const allItems = [...locations, ...properties];
    return allItems.map(item => (
      <LocationCard key={item.id} {...item} />
    ));
  };
  
  return (
    <div className="flex h-screen">
      {/* Sidebar de filtros */}
      <LocationsListingsSidebar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={handleApplyFilters}
      />
      
      {/* Área principal */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                {locations.length + properties.length} locais encontrados
              </h2>
              <div className="flex gap-2 mt-2">
                <Badge variant="active">ativo: {activeCount}</Badge>
                <Badge variant="blocked">bloqueado: {blockedCount}</Badge>
                <Badge variant="inactive">inativo: {inactiveCount}</Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="btn btn-secondary">
                🔼 Importar anúncio Airbnb
              </button>
              <button className="btn btn-primary">
                + Anúncio
              </button>
            </div>
          </div>
        </div>
        
        {/* Lista de cards */}
        <div className="space-y-4">
          {viewMode === 'por-local' 
            ? renderByLocation()
            : renderIndividual()
          }
        </div>
      </div>
    </div>
  );
};
```

---

## 🎨 CSS/Tailwind Classes Usadas

### **Layout**

```css
/* Container principal */
.flex h-screen

/* Sidebar */
.w-[280px] bg-gray-50 border-r border-gray-200 p-6

/* Área principal */
.flex-1 overflow-y-auto p-8

/* Card */
.flex gap-4 p-4 bg-white border border-gray-200 rounded-lg

/* Foto do card */
.relative w-[250px] h-[180px] flex-shrink-0

/* Conteúdo do card */
.flex-1 flex flex-col gap-3
```

### **Tipografia**

```css
/* Título do card */
.text-lg font-bold text-gray-900

/* Subtítulo */
.text-sm text-gray-500 line-clamp-2

/* Capacidade */
.flex gap-4 text-sm text-gray-700

/* Endereço */
.text-xs text-gray-500
```

### **Badges**

```css
/* Badge base */
.px-2 py-1 text-xs font-medium rounded lowercase

/* Variantes */
.bg-green-500 text-white    /* ativo */
.bg-amber-500 text-white    /* bloqueado */
.bg-red-500 text-white      /* inativo */
.bg-gray-500 text-white     /* rascunho / categoria */
.bg-blue-500 text-white     /* tipo */
```

### **Interações**

```css
/* Hover no card */
.hover:border-blue-300 transition-colors

/* Cursor pointer */
.cursor-pointer
```

---

## 📊 DADOS DE EXEMPLO

### **Location (Hotel)**

```json
{
  "id": "loc_001",
  "name": "HOTEL FAZENDA JUREA - ENDEREÇO DA SEDE",
  "description": "Maria Teresa (dona) responsável Estrada. Local de eventos de Estrada Barra",
  "type": "hotel",
  "category": "hotel",
  "status": "active",
  "photo": "https://...",
  "address": "Iguaba, Barra do Pirai, Estrada Jurea S/N, Brasil",
  "capacity": {
    "guests": 10,
    "bedrooms": 8,
    "bathrooms": 4,
    "accommodations": 4
  },
  "properties": [
    {
      "id": "prop_001",
      "name": "Suite 01 - Fazenda Jurea Iguabas",
      "description": "Suite 01 Fazenda Jurea com Conforto e Estética",
      "type": "suite",
      "category": "acomodacao",
      "status": "active",
      "capacity": {
        "guests": 1,
        "bedrooms": 2,
        "bathrooms": 1,
        "accommodations": 1
      }
    },
    // ... mais suites
  ]
}
```

### **Property Standalone (Apartamento)**

```json
{
  "id": "prop_100",
  "name": "Apartamento Barra da Tijuca - RJ FABIANA",
  "description": "Fabiana Fernandes volta para trabalhar e estudar. Local de ensaios de Estrada Barra",
  "type": "apartment",
  "category": "condominio",
  "status": "active",
  "photo": "https://...",
  "address": "Barra da Tijuca, Rio de Janeiro, RJ, JORNALISTA HENRIQUE CORDEIRO 310 a, Bloco 01 ap 1303, Brasil",
  "capacity": {
    "guests": 2,
    "bedrooms": 4,
    "bathrooms": 3,
    "accommodations": 2
  },
  "locationId": null  // Standalone, não vinculado a Location
}
```

---

## ✅ RESUMO EXECUTIVO

### **O que aprendi das telas BVM/Stays:**

1. ✅ **Duas visualizações distintas**:
   - "Individual": Lista plana de todos os itens
   - "Por Local": Hierarquia Location → Properties

2. ✅ **Sidebar de filtros completa**:
   - Tabs para alternar visualização
   - Checkboxes para status
   - Dropdown de localização
   - Busca por texto
   - Botão "Amostrar" para aplicar

3. ✅ **Cards padronizados**:
   - Foto grande à esquerda (250x180px)
   - Badges sobrepostos na foto
   - Conteúdo estruturado (título, descrição, capacidade, endereço)
   - Seta de navegação à direita

4. ✅ **Sistema de badges inteligente**:
   - Status com cor (verde/amarelo/vermelho/cinza)
   - Contador de acomodações ("ativo-3")
   - Tipo de imóvel (apto, suite, hotel)
   - Categoria (condomínio, hotel, acomodação)

5. ✅ **Header informativo**:
   - Contador total de itens
   - Badges agregados de status
   - Botões de ação (Importar Airbnb, Criar Anúncio)

6. ✅ **Hierarquia visual clara**:
   - Location como "pai" em destaque
   - Properties "filhas" indentadas abaixo
   - Badge com contador mostra quantas properties existem

---

## 🎯 PRÓXIMOS PASSOS

1. **Decidir**: Qual implementação fazer?
   - A) Recriar fiel ao BVM/Stays
   - B) Adaptar para estrutura RENDIZY (Location + Listing)
   - C) Híbrido (melhor dos dois mundos)

2. **Criar componentes**:
   - `LocationsListingsSidebar.tsx`
   - `LocationCard.tsx`
   - `PropertyCard.tsx` (ou `ListingCard.tsx`)
   - `Badge.tsx`

3. **Implementar lógica**:
   - Filtros sincronizados
   - Alternância entre vistas
   - Integração com backend

4. **Testar**:
   - Validar com dados reais
   - Verificar responsividade
   - Performance com muitos itens

---

**Aguardando decisão do desenvolvedor para iniciar implementação! 🚀**
