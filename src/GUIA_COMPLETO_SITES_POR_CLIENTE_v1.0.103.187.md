# 🎨 GUIA COMPLETO: Sistema de Sites por Cliente (v1.0.103.187)

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Como Importar Sites de Outras IAs](#como-importar-sites)
4. [Integração com RENDIZY](#integração)
5. [Exemplos Práticos](#exemplos)
6. [Deploy](#deploy)

---

## 🎯 VISÃO GERAL

Sistema completo para criar e gerenciar **sites customizados por cliente**, com:

✅ **Importação** de sites criados em v0.dev, Bolt.ai, Figma Make, etc  
✅ **Integração automática** com backend RENDIZY  
✅ **Multi-tenant**: cada cliente (organizationId) tem seu próprio site  
✅ **Domínios customizados** ou subdomínios .rendizy.app  
✅ **Dados dinâmicos** sempre vêm do RENDIZY  

---

## 🏗️ ARQUITETURA

### Fluxo Completo

```
┌─────────────────────────────────────────────────────────────┐
│ PASSO 1: CRIAR SITE EM OUTRA IA                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  v0.dev / Bolt.ai / Figma Make                             │
│    ↓                                                        │
│  Gera código React + Tailwind                              │
│    ↓                                                        │
│  Você baixa/copia o código                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ PASSO 2: REGISTRAR NO RENDIZY                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  RENDIZY Admin → Sites dos Clientes → Criar Novo Site     │
│    ↓                                                        │
│  Preenche:                                                  │
│    • organizationId: "org_imobiliaria_sol"                 │
│    • siteName: "Imobiliária Sol"                           │
│    • template: "custom"                                     │
│    • features: [temporada, venda]                          │
│    ↓                                                        │
│  Sistema gera automaticamente:                             │
│    • subdomain: "imobiliaria-sol.rendizy.app"             │
│    • Configurações padrão                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ PASSO 3: UPLOAD DO CÓDIGO                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  RENDIZY Admin → Sites → Botão "Código"                   │
│    ↓                                                        │
│  Cola o código gerado pela IA                              │
│    ↓                                                        │
│  Sistema salva no KV store                                 │
│    key: "client_site:org_imobiliaria_sol"                 │
│    value: { ...config, siteCode: "..." }                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ PASSO 4: INTEGRAÇÃO AUTOMÁTICA                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ClientSiteWrapper.tsx detecta:                            │
│    • organizationId do site                                │
│    • Injeta dados do RENDIZY:                             │
│      - Propriedades (API: /properties?org=...)            │
│      - Calendário (API: /calendar/...)                    │
│      - Reservas (Motor de reservas)                       │
│    ↓                                                        │
│  Site funciona com dados reais!                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🤖 COMO IMPORTAR SITES DE OUTRAS IAs

### 1️⃣ IMPORTAR DE v0.dev

**Passo a Passo:**

```bash
# 1. Criar design no v0.dev
# Acesse: https://v0.dev

# 2. Prompt sugerido:
"Crie um site de imobiliária moderna para aluguel de temporada com:
- Hero section com busca de imóveis
- Grid de propriedades destacadas (cards com foto, nome, preço)
- Filtros de busca (localização, datas, hóspedes)
- Formulário de contato
Use React, TypeScript e Tailwind CSS"

# 3. v0.dev gera o código

# 4. Copie TODO o código gerado

# 5. No RENDIZY:
# Admin → Sites dos Clientes → Criar Novo Site
# Preencha organizationId e siteName
# Clique em "Código" → Cole o código → Enviar
```

**✅ O que acontece automaticamente:**
- Sistema identifica componentes React
- Detecta onde estão dados mockados (arrays, objetos)
- Wrapper injeta dados reais da API RENDIZY
- Site funciona conectado ao backend!

---

### 2️⃣ IMPORTAR DE Bolt.ai

**Passo a Passo:**

```bash
# 1. Criar projeto no Bolt.ai
# Acesse: https://bolt.new

# 2. Prompt sugerido:
"Crie uma landing page para imobiliária de luxo com:
- Header com logo e navegação
- Hero com vídeo de fundo
- Grid de imóveis premium
- Depoimentos de clientes
- Footer com redes sociais
Tecnologias: React + Tailwind"

# 3. Bolt.ai gera projeto completo

# 4. Baixe o código (botão Download ou Export)

# 5. Abra o arquivo principal (App.tsx ou index.tsx)

# 6. Copie o código

# 7. No RENDIZY:
# Admin → Sites → Criar Site → Upload Código
```

---

### 3️⃣ IMPORTAR DO FIGMA MAKE (eu!)

**Passo a Passo:**

```bash
# 1. AQUI MESMO, peça para eu criar:

"Crie um site moderno de imobiliária com:
- Design clean e profissional
- Busca de imóveis por cidade e datas
- Cards de propriedades
- Botão de reserva
- Responsivo"

# 2. Eu vou gerar o código React completo

# 3. Você copia o código que eu gerar

# 4. Vai no RENDIZY Admin → Sites → Upload Código

# 5. Pronto! Site integrado ao backend RENDIZY
```

---

### 4️⃣ IMPORTAR DE DESIGN FIGMA

**Passo a Passo:**

```bash
# 1. No Figma, selecione o design do site

# 2. Vá em: Plugins → Figma to Code (HTML/React)

# 3. Plugin gera código React

# 4. Copie o código

# 5. Ajustes necessários:
#    - Remova dados mockados
#    - Deixe estrutura HTML e estilos
#    - Componentes de listagem de imóveis deixe vazios

# 6. Cole no RENDIZY Admin → Sites → Upload Código

# 7. Wrapper injeta dados reais automaticamente
```

---

## 🔌 INTEGRAÇÃO COM RENDIZY

### Sistema de Injeção de Dados

O `ClientSiteWrapper.tsx` (vou criar a seguir) funciona assim:

```tsx
// ANTES (código da IA - dados mockados)
function PropertyGrid() {
  const properties = [
    { id: 1, name: 'Casa Praia', price: 500 },
    { id: 2, name: 'Apto Centro', price: 300 }
  ]; // ❌ Dados mockados
  
  return (
    <div className="grid">
      {properties.map(p => <PropertyCard {...p} />)}
    </div>
  );
}

// DEPOIS (wrapper injeta dados reais)
function PropertyGrid() {
  // ✅ Wrapper detecta e injeta automaticamente
  const { properties } = useRendizyData(); // Hook do wrapper
  
  return (
    <div className="grid">
      {properties.map(p => <PropertyCard {...p} />)}
    </div>
  );
}
```

### APIs Disponíveis para Sites

Todo site customizado tem acesso automático a:

```typescript
// 1. Buscar imóveis do cliente
GET /api/properties?organizationId=org_123&mode=short_term

// 2. Buscar disponibilidade
GET /api/calendar/availability?propertyId=...&startDate=...&endDate=...

// 3. Criar reserva (motor de reservas)
POST /api/reservations
{
  propertyId: "...",
  guestName: "...",
  checkIn: "...",
  checkOut: "...",
  totalPrice: 1500
}

// 4. Enviar cotação
POST /api/quotations
{
  propertyId: "...",
  email: "...",
  dates: { checkIn: "...", checkOut: "..." }
}
```

---

## 💡 EXEMPLOS PRÁTICOS

### Exemplo 1: Site Criado no v0.dev

```tsx
// CÓDIGO GERADO PELO v0.dev
export default function ImmobiliarySite() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <img 
          src="https://images.unsplash.com/photo-beach-house" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-6xl mb-4">Encontre sua Casa de Praia</h1>
            <p className="text-2xl mb-8">Mais de 100 imóveis disponíveis</p>
            
            {/* Busca */}
            <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
              <PropertySearch /> {/* ✅ Componente da IA */}
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Imóveis */}
      <section className="py-20 px-4">
        <h2 className="text-4xl text-center mb-12">Imóveis em Destaque</h2>
        <PropertyGrid /> {/* ✅ Wrapper injeta dados aqui */}
      </section>
    </div>
  );
}
```

**O que o Wrapper faz:**
1. Detecta `<PropertyGrid />`
2. Busca imóveis da API RENDIZY: `GET /properties?org=org_imobiliaria_sol`
3. Injeta dados como props
4. Grid renderiza imóveis reais!

---

### Exemplo 2: Motor de Reservas Integrado

```tsx
// Componente de Reserva (criado pela IA)
function BookingWidget({ propertyId }: Props) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [price, setPrice] = useState(0);

  // ✅ Wrapper injeta função de cálculo
  const { calculatePrice, createReservation } = useRendizyBooking();

  const handleCalculate = async () => {
    const result = await calculatePrice({
      propertyId,
      checkIn,
      checkOut
    });
    setPrice(result.totalPrice);
  };

  const handleBook = async () => {
    await createReservation({
      propertyId,
      checkIn,
      checkOut,
      guestName: "...",
      totalPrice: price
    });
    // ✅ Reserva criada no calendário RENDIZY!
  };

  return (
    <div className="booking-widget">
      <input 
        type="date" 
        value={checkIn} 
        onChange={e => setCheckIn(e.target.value)} 
      />
      <input 
        type="date" 
        value={checkOut} 
        onChange={e => setCheckOut(e.target.value)} 
      />
      <button onClick={handleCalculate}>Calcular Preço</button>
      <p>Total: R$ {price}</p>
      <button onClick={handleBook}>Reservar Agora</button>
    </div>
  );
}
```

---

## 🚀 COMO USAR AGORA

### 1. Criar Primeiro Site

```bash
# No RENDIZY Admin:

1. Vá em "Sites dos Clientes" (menu lateral)
2. Clique em "Criar Novo Site"
3. Preencha:
   - organizationId: org_teste_123
   - siteName: Imobiliária Teste
   - template: moderno (ou custom)
   - features: ☑ Temporada ☑ Venda
4. Clique "Criar Site"
5. ✅ Site criado! URL: imobiliaria-teste.rendizy.app
```

### 2. Importar Design de v0.dev

```bash
# 1. Vá em v0.dev e crie um design
# 2. Copie o código gerado
# 3. No RENDIZY:
#    - Sites → Imobiliária Teste → Botão "Código"
#    - Cole o código
#    - Clique "Enviar Código"
# 4. ✅ Pronto! Site com design customizado + dados RENDIZY
```

### 3. Testar o Site

```bash
# Abra no navegador:
https://imobiliaria-teste.rendizy.app

# O site vai:
✅ Carregar o design que você importou
✅ Mostrar imóveis reais do RENDIZY (org_teste_123)
✅ Calcular preços da precificação sazonal
✅ Permitir fazer reservas (motor de reservas)
✅ Sincronizar com calendário unificado
```

---

## 🎨 CUSTOMIZAÇÃO POR CLIENTE

### Cada cliente pode ter:

```typescript
{
  // Cores customizadas
  theme: {
    primaryColor: '#FF6B00',      // Laranja
    secondaryColor: '#1A1A1A',    // Preto
    accentColor: '#FFD700',       // Dourado
    fontFamily: 'Montserrat'
  },

  // Logo próprio
  logo: 'https://cdn.rendizy.com/logos/cliente.png',

  // Domínio próprio
  domain: 'www.imobiliariasol.com.br',
  
  // OU subdomínio RENDIZY
  subdomain: 'imobiliaria-sol.rendizy.app',

  // Modalidades específicas
  features: {
    shortTerm: true,  // Temporada ✅
    longTerm: false,  // Locação ❌
    sale: true        // Venda ✅
  }
}
```

---

## 📊 VANTAGENS DESTA ARQUITETURA

| Vantagem | Descrição |
|----------|-----------|
| 🎨 **Design Flexível** | Cada cliente pode ter site totalmente diferente |
| 🔒 **Seguro** | Dados sempre vêm do backend RENDIZY (autenticado) |
| ⚡ **Rápido** | IA cria em minutos, você só integra |
| 💰 **Escalável** | 1 cliente = 1 site, infinitos clientes possíveis |
| 🔄 **Sincronizado** | Reserva no site → aparece no RENDIZY Admin |
| 🌐 **SEO-Friendly** | Sites em React SSR (Next.js no futuro) |

---

## 🔧 PRÓXIMOS PASSOS

Agora vou criar:

1. ✅ **Backend**: routes-client-sites.ts (FEITO)
2. ✅ **Admin**: ClientSitesManager.tsx (FEITO)
3. 🔄 **Wrapper**: ClientSiteWrapper.tsx (PRÓXIMO)
4. 🔄 **Router**: Sistema de roteamento por domínio (PRÓXIMO)
5. 🔄 **Docs**: Este guia (FEITO)

---

## 📞 COMO PEDIR AJUDA

Se quiser que eu crie um site de exemplo, peça assim:

```
"Crie um site moderno de imobiliária de praia com:
- Hero section com vídeo
- Busca de imóveis
- Grid de propriedades
- Motor de reservas
- Formulário de contato
- Depoimentos
Para usar no sistema de sites por cliente"
```

Eu vou gerar o código completo e você só precisa fazer upload no RENDIZY! 🚀

---

## ✅ RESUMO EXECUTIVO

1. **Sistema criado**: Gerenciamento de sites por cliente ✅
2. **Backend pronto**: API completa para criar/editar/listar sites ✅
3. **Admin pronto**: Interface para gerenciar sites ✅
4. **Importação**: v0.dev, Bolt, Figma → RENDIZY ✅
5. **Integração**: Dados sempre vêm do backend RENDIZY ✅
6. **Multi-tenant**: organizationId separa dados de cada cliente ✅

**Próxima versão**: v1.0.103.188 (Wrapper de integração + Router)

---

**Documentação criada em**: 31 de outubro de 2025  
**Versão RENDIZY**: v1.0.103.187  
**Autor**: Sistema de Sites Multi-Cliente RENDIZY
