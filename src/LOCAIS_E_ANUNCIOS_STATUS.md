# 📍 Locais e Anúncios - Status Atual v1.0.102

**Versão**: v1.0.102  
**Última Atualização**: v1.0.77  
**Arquivo**: `/components/LocationsAndListings.tsx`  
**Linhas**: ~1400 linhas  
**Status**: ✅ Funcional

---

## 🎯 Visão Geral

O módulo **Locais e Anúncios** gerencia:

1. **Locations** (Locais/Prédios/Condomínios)
2. **Listings** (Anúncios de acomodações)
3. **Publicação** em plataformas (Airbnb, Booking.com, VRBO, etc)
4. **Configurações** de precificação, regras, iCal

---

## 📋 Estrutura do Módulo

### Visualização Principal

```
┌──────────────────────────────────────────────────────────────┐
│  📍 Locais e Anúncios                      [+ Local] [+ Anúncio]│
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [Anúncios] [Locais]  ← Tabs                                │
│                                                               │
│  🔍 Pesquisar...    [Filtros: Todos ▼]                       │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Card de Anúncio #1                                     │ │
│  │ ─────────────────────────────────────────────────────  │ │
│  │ 🏠 Apartamento Luxo Centro                             │ │
│  │ COD-APT-001                     ✅ Ativo               │ │
│  │                                                         │ │
│  │ 👥 4 hóspedes | 🛏️ 2 quartos | 🛁 1 banheiro          │ │
│  │ 💰 R$ 250/noite                                        │ │
│  │                                                         │ │
│  │ Plataformas:                                           │ │
│  │ [🏠 Airbnb ✓] [🏢 Booking ✗] [🌐 VRBO ✗]            │ │
│  │                                                         │ │
│  │                    [👁️ Ver] [✏️ Editar] [🗑️ Excluir] │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Card de Anúncio #2                                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔧 Funcionalidades Implementadas

### ✅ Aba "Anúncios" (Listings)

#### 1. Listagem de Anúncios
```typescript
✅ Grid de cards responsivo
✅ Pesquisa por título/nome
✅ Filtro por status (Todos, Ativos, Inativos, Rascunho)
✅ Loading states
✅ Empty states (quando não há anúncios)
```

#### 2. Card de Anúncio - Informações
```typescript
✅ Título do anúncio
✅ Código único (auto-gerado)
✅ Status visual (badge colorido)
✅ Capacidade:
   - Número de hóspedes
   - Quartos
   - Camas
   - Banheiros
✅ Preço base por noite
✅ Plataformas conectadas (ícones com status)
✅ Ações: Ver, Editar, Excluir
```

#### 3. Criar Novo Anúncio
```
📝 Modal Completo com Tabs:

┌──────────────────────────────────────────────────────┐
│  Criar Novo Anúncio                              [X] │
├──────────────────────────────────────────────────────┤
│                                                       │
│  [Básico] [Detalhes] [Comodidades] [Fotos] [Preços] │
│                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                       │
│  TAB 1: BÁSICO                                       │
│  ────────────────────────────────────────────────    │
│  Título do Anúncio                                   │
│  ┌───────────────────────────────────────────────┐  │
│  │ Apartamento Luxo Centro                       │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
│  Tipo de Propriedade                                 │
│  ┌───────────────────────────────────────────────┐  │
│  │ Apartamento ▼                                 │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
│  Descrição                                           │
│  ┌───────────────────────────────────────────────┐  │
│  │ Apartamento moderno e confortável...          │  │
│  │                                                │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
│  TAB 2: CAPACIDADE                                   │
│  ────────────────────────────────────────────────    │
│  Hóspedes  Quartos  Camas  Banheiros                │
│  ┌──────┐  ┌──────┐ ┌────┐ ┌─────────┐             │
│  │  4   │  │  2   │ │ 2  │ │   1     │             │
│  └──────┘  └──────┘ └────┘ └─────────┘             │
│                                                       │
│  TAB 3: COMODIDADES                                  │
│  ────────────────────────────────────────────────    │
│  [✓] Wi-Fi           [✓] Ar Condicionado            │
│  [✓] TV              [ ] Máquina de Lavar           │
│  [✓] Cozinha         [✓] Estacionamento             │
│  [ ] Piscina         [ ] Academia                   │
│                                                       │
│  TAB 4: PREÇOS                                       │
│  ────────────────────────────────────────────────    │
│  Preço Base por Noite                                │
│  ┌───────────────────────────────────────────────┐  │
│  │ R$ 250                                        │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
│  Taxa de Limpeza                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │ R$ 50                                         │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
│                      [Cancelar] [Criar Anúncio]     │
└──────────────────────────────────────────────────────┘
```

**Campos Implementados:**
```typescript
✅ Tab 1 - Básico:
   - Título
   - Tipo de propriedade
   - Descrição

✅ Tab 2 - Capacidade:
   - Número de hóspedes
   - Quartos
   - Camas
   - Banheiros

✅ Tab 3 - Comodidades:
   - Seletor visual de amenities
   - Categorias (Básico, Conforto, Segurança, etc)

✅ Tab 4 - Preços:
   - Preço base
   - Taxa de limpeza
   - Taxa por hóspede extra
```

#### 4. Ver Detalhes do Anúncio
```
👁️ Modal de Visualização Completa:

┌──────────────────────────────────────────────────────┐
│  Detalhes do Anúncio                             [X] │
├──────────────────────────────────────────────────────┤
│                                                       │
│  🏠 Apartamento Luxo Centro                          │
│  COD-APT-001                                         │
│  ✅ Ativo                                            │
│                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                       │
│  📊 CAPACIDADE                                       │
│  ─────────────────────────────────────────────────   │
│  👥 4 hóspedes                                       │
│  🛏️ 2 quartos                                       │
│  🛏️ 2 camas                                         │
│  🛁 1 banheiro                                       │
│                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                       │
│  💰 PRECIFICAÇÃO                                     │
│  ─────────────────────────────────────────────────   │
│  Diária base: R$ 250,00                              │
│  Taxa de limpeza: R$ 50,00                           │
│  Hóspede extra: R$ 30,00                             │
│                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                       │
│  🌐 PLATAFORMAS                                      │
│  ─────────────────────────────────────────────────   │
│  [🏠] Airbnb        ✅ Publicado                    │
│  [🏢] Booking.com   ❌ Não publicado                │
│  [🌐] VRBO          ❌ Não publicado                │
│  [💳] Direto        ✅ Ativo                        │
│                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                       │
│  ✨ COMODIDADES                                      │
│  ─────────────────────────────────────────────────   │
│  [✓] Wi-Fi              [✓] Ar Condicionado         │
│  [✓] TV                 [✓] Cozinha                 │
│  [✓] Estacionamento     [✓] Elevador                │
│                                                       │
│                                        [Fechar]      │
└──────────────────────────────────────────────────────┘
```

---

### ✅ Aba "Locais" (Locations)

#### 1. Listagem de Locais
```
┌──────────────────────────────────────────────────────┐
│  Tabela de Locais                                    │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Código    Nome              Endereço      Ações     │
│  ────────  ────────────────  ───────────── ─────────│
│  LOC-001   Edifício Central  Rua A, 100    [Editar] │
│  LOC-002   Condomínio Vista  Av. B, 200    [Editar] │
│                                                       │
└──────────────────────────────────────────────────────┘
```

#### 2. Criar Novo Local
```
📝 Modal de Criação de Local:

┌──────────────────────────────────────────────────────┐
│  Criar Novo Local                                [X] │
├──────────────────────────────────────────────────────┤
│                                                       │
│  INFORMAÇÕES BÁSICAS                                 │
│  ────────────────────────────────────────────────    │
│                                                       │
│  Nome do Local                                       │
│  ┌───────────────────────────────────────────────┐  │
│  │ Edifício Central                              │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
│  Tipo de Local                                       │
│  ┌───────────────────────────────────────────────┐  │
│  │ Prédio ▼                                      │  │
│  └───────────────────────────────────────────────┘  │
│  Opções: Prédio, Condomínio, Casa, Outro             │
│                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                       │
│  ENDEREÇO COMPLETO                                   │
│  ────────────────────────────────────────────────    │
│                                                       │
│  CEP                            País                 │
│  ┌─────────────┐              ┌──────────────────┐  │
│  │ 01310-100   │              │ Brasil ▼         │  │
│  └─────────────┘              └──────────────────┘  │
│                                                       │
│  Logradouro                                          │
│  ┌───────────────────────────────────────────────┐  │
│  │ Avenida Paulista                              │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
│  Número         Complemento                          │
│  ┌──────────┐   ┌─────────────────────────────┐     │
│  │ 1000     │   │ Torre A, Apto 501           │     │
│  └──────────┘   └─────────────────────────────┘     │
│                                                       │
│  Bairro                                              │
│  ┌───────────────────────────────────────────────┐  │
│  │ Bela Vista                                    │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
│  Cidade                         Estado               │
│  ┌─────────────────────┐       ┌──────────────┐     │
│  │ São Paulo           │       │ SP ▼         │     │
│  └─────────────────────┘       └──────────────┘     │
│                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                       │
│  ACESSO AO PRÉDIO                                    │
│  ────────────────────────────────────────────────    │
│                                                       │
│  Tipo de Acesso                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │ Portaria ▼                                    │  │
│  └───────────────────────────────────────────────┘  │
│  Opções: Portaria, Código, Livre, Outro              │
│                                                       │
│  Instruções de Acesso                                │
│  ┌───────────────────────────────────────────────┐  │
│  │ Apresentar documento na portaria...           │  │
│  │                                                │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
│  [✓] Possui elevador                                 │
│  [✓] Possui estacionamento                           │
│                                                       │
│  Tipo de Estacionamento                              │
│  ┌───────────────────────────────────────────────┐  │
│  │ Vaga própria ▼                                │  │
│  └───────────────────────────────────────────────┘  │
│  Opções: Vaga própria, Rotativo, Público             │
│                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                       │
│  COMODIDADES COMPARTILHADAS                          │
│  ────────────────────────────────────────────────    │
│                                                       │
│  [✓] Piscina                                         │
│  [✓] Academia                                        │
│  [ ] Salão de festas                                 │
│  [✓] Churrasqueira                                   │
│  [ ] Quadra esportiva                                │
│  [ ] Playground                                      │
│  [✓] Portaria 24h                                    │
│  [ ] Lavanderia                                      │
│                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                       │
│  OBSERVAÇÕES                                         │
│  ────────────────────────────────────────────────    │
│                                                       │
│  ┌───────────────────────────────────────────────┐  │
│  │ Informações adicionais sobre o local...       │  │
│  │                                                │  │
│  └───────────────────────────────────────────────┘  │
│                                                       │
│                      [Cancelar] [Criar Local]       │
└──────────────────────────────────────────────────────┘
```

**Campos Implementados no Modal de Local:**
```typescript
✅ Informações Básicas:
   - Nome do local
   - Tipo (Prédio, Condomínio, Casa, Outro)

✅ Endereço Completo:
   - CEP
   - País (select)
   - Logradouro (rua/avenida)
   - Número
   - Complemento
   - Bairro
   - Cidade
   - Estado (select)

✅ Acesso ao Prédio:
   - Tipo de acesso (Portaria, Código, Livre, Outro)
   - Instruções de acesso (textarea)
   - Possui elevador (switch)
   - Possui estacionamento (switch)
   - Tipo de estacionamento (select - habilitado se tem estacionamento)

✅ Comodidades Compartilhadas:
   - Piscina
   - Academia
   - Salão de festas
   - Churrasqueira
   - Quadra esportiva
   - Playground
   - Portaria 24h
   - Lavanderia

✅ Observações:
   - Campo de texto livre para informações adicionais
```

---

## 🎨 Estados Visuais

### Status de Anúncios

```typescript
✅ Ativo (Verde)
   - Publicado e disponível para reservas
   - bg-green-500/10 text-green-600

⏸️ Inativo (Cinza)
   - Criado mas não publicado
   - bg-gray-500/10 text-gray-600

📝 Rascunho (Amarelo)
   - Em edição, dados incompletos
   - bg-yellow-500/10 text-yellow-600

🗄️ Arquivado (Vermelho)
   - Removido das plataformas
   - bg-red-500/10 text-red-400
```

### Plataformas

```typescript
🏠 Airbnb (Home icon)
🏢 Booking.com (Building2 icon)
🌐 VRBO (Globe icon)
💳 Direto (CreditCard icon)
```

---

## 🔄 Fluxo de Criação

### 1. Criar Local (Location)
```
Usuário → [+ Novo Local] 
  → Modal se abre
  → Preenche dados básicos
  → Preenche endereço
  → Configura acesso
  → Seleciona comodidades
  → [Criar Local]
  → Sistema gera código automaticamente (LOC-XXX)
  → Toast de sucesso
  → Lista atualiza
```

### 2. Criar Anúncio (Listing)
```
Usuário → [+ Novo Anúncio]
  → Modal se abre com tabs
  → Tab 1: Preenche dados básicos
  → Tab 2: Define capacidade
  → Tab 3: Seleciona comodidades
  → Tab 4: Define preços
  → [Criar Anúncio]
  → Sistema gera código automaticamente (LST-XXX)
  → Status inicial: "draft"
  → Toast de sucesso
  → Lista atualiza
```

### 3. Publicar Anúncio
```
Usuário → Ver detalhes do anúncio
  → Escolhe plataforma (Airbnb, Booking, etc)
  → [Publicar]
  → Integração com plataforma (futuro)
  → Status muda para "active"
```

---

## 📊 Dados Salvos no Backend

### Location (KV Store)
```typescript
Key: location:{id}
Value: {
  id: string,
  code: string,               // LOC-001
  name: string,               // "Edifício Central"
  type: string,               // "building", "condo", "house"
  address: {
    street: string,
    number: string,
    complement?: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  },
  access: {
    type: string,             // "portaria", "código", "livre"
    instructions?: string,
    hasElevator: boolean,
    hasParking: boolean,
    parkingType?: string      // "própria", "rotativo", "público"
  },
  sharedAmenities: string[],  // ["piscina", "academia", ...]
  notes?: string,
  created_at: string,
  updated_at: string
}
```

### Listing (KV Store)
```typescript
Key: listing:{id}
Value: {
  id: string,
  code: string,               // LST-001
  title: string,
  description: string,
  propertyId: string,
  propertyName: string,
  propertyType: string,       // "apartment", "house", "studio"
  status: 'active' | 'inactive' | 'draft' | 'archived',
  capacity: {
    guests: number,
    bedrooms: number,
    beds: number,
    bathrooms: number
  },
  pricing: {
    basePrice: number,
    currency: string,
    cleaningFee: number,
    extraGuestFee: number
  },
  amenities: string[],
  photos: string[],
  platforms: {
    airbnb: { enabled: boolean, url?: string },
    booking: { enabled: boolean, url?: string },
    vrbo: { enabled: boolean, url?: string },
    direct: { enabled: boolean }
  },
  created_at: string,
  updated_at: string
}
```

---

## 🚀 Próximas Melhorias Sugeridas

### 1. Filtros Laterais (como no Calendário)
```
Usar PropertyFilterSidebar pattern:
- Sheet lateral direita (w-[400px])
- Filtros por tipo de propriedade
- Filtros por capacidade
- Filtros por preço
- Filtros por plataformas publicadas
```

### 2. Integração com Propriedades
```
- Vincular Listing → Property (acomodação)
- Mostrar acomodações vinculadas
- Sincronização de dados
```

### 3. Upload de Fotos
```
- PhotoManager component já existe
- Integrar no modal de criação/edição
- Ordenar fotos (drag & drop)
- Preview de galeria
```

### 4. Publicação em Plataformas
```
- Integração real com APIs
- Airbnb API
- Booking.com XML
- VRBO API
- Status de sincronização
```

### 5. Estatísticas
```
- Total de anúncios
- Anúncios por plataforma
- Taxa de ocupação
- Receita por anúncio
```

### 6. Bulk Actions
```
- Publicar múltiplos anúncios
- Alterar status em lote
- Exportar dados
```

---

## 📝 Códigos Auto-Gerados

### Locations
```typescript
LOC-001  →  Primeiro local
LOC-002  →  Segundo local
LOC-XXX  →  Incrementa sequencialmente

Baseado em:
- Código existentes no sistema
- Função: generateLocationCode(name, existingCodes)
```

### Listings
```typescript
LST-001  →  Primeiro anúncio
LST-002  →  Segundo anúncio
LST-XXX  →  Incrementa sequencialmente

Baseado em:
- Códigos existentes no sistema
- Função: generateListingCode(title, existingCodes)
```

---

## 🎯 O Que Funciona AGORA

✅ **Criar Locais** com dados completos  
✅ **Criar Anúncios** com tabs organizadas  
✅ **Listar** locais e anúncios  
✅ **Pesquisar** por texto  
✅ **Filtrar** por status  
✅ **Ver detalhes** completos  
✅ **Códigos automáticos** únicos  
✅ **Dark mode** suportado  
✅ **Responsivo** (mobile, tablet, desktop)  
✅ **Loading states**  
✅ **Empty states**  
✅ **Toasts de feedback**  

---

## ❓ O Que Você Quer Fazer?

**Opções:**

1. 🎨 **Melhorar UI/UX** (cores, layout, cards, etc)
2. 🔍 **Adicionar filtros laterais** (seguindo padrão do Calendário)
3. 📸 **Integrar upload de fotos** (usar PhotoManager)
4. 🔗 **Vincular com Propriedades** (Property → Listing)
5. 📊 **Adicionar estatísticas** (dashboard de anúncios)
6. ⚙️ **Configurações avançadas** (regras, precificação)
7. 🌐 **Publicação em plataformas** (integração real)
8. 📋 **Bulk actions** (ações em múltiplos anúncios)
9. 🐛 **Corrigir algo específico**
10. ✨ **Outra funcionalidade**

---

**Me diga o que você quer fazer e vou implementar!** 🚀
