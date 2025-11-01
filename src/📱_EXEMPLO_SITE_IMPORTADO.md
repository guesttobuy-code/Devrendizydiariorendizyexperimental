# 📱 EXEMPLO: Como o Site Importado Funciona

**Versão:** v1.0.103.198  
**Organização:** 9090909 (Sua Casa Mobiliada)

---

## 🎯 FLUXO COMPLETO

### **1. VOCÊ CRIA NO BOLT.NEW**
```
Bolt.new gera código React:

import { useState, useEffect } from 'react';

function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  
  useEffect(() => {
    fetch('https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/properties?organizationId={{ORG_ID}}', {
      headers: {
        'Authorization': 'Bearer {{API_KEY}}'
      }
    })
    .then(res => res.json())
    .then(data => setProperties(data.data));
  }, []);
  
  return (
    <div className="grid grid-cols-3 gap-6">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

---

### **2. RENDIZY SUBSTITUI VARIÁVEIS**

Quando você importa, RENDIZY automaticamente substitui:

**ANTES (código do Bolt):**
```typescript
organizationId={{ORG_ID}}
Authorization: Bearer {{API_KEY}}
siteName={{SITE_NAME}}
primaryColor={{PRIMARY_COLOR}}
```

**DEPOIS (código final):**
```typescript
organizationId=9090909
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
siteName="Sua Casa Mobiliada"
primaryColor="#3B82F6"
```

---

### **3. SITE FUNCIONA AUTOMATICAMENTE**

```
Cliente acessa: https://sua-casa-mobiliada.rendizy.app
              ↓
    Código carrega e faz requests:
              ↓
┌─────────────────────────────────────┐
│ GET /properties?organizationId=9090909
│ ← Retorna SEUS imóveis
└─────────────────────────────────────┘
              ↓
    Exibe na tela com design do Bolt
              ↓
    Cliente clica em imóvel
              ↓
┌─────────────────────────────────────┐
│ GET /calendar?propertyId=123&start=2025-11-01
│ ← Retorna disponibilidade
└─────────────────────────────────────┘
              ↓
    Mostra calendário
              ↓
    Cliente faz reserva
              ↓
┌─────────────────────────────────────┐
│ POST /reservations { ... }
│ ← Cria reserva no RENDIZY
└─────────────────────────────────────┘
              ↓
    Confirmação para cliente
              ↓
    ✅ Reserva aparece no RENDIZY Dashboard!
```

---

## 📊 DADOS EM TEMPO REAL

### **Imóveis:**

**Backend RENDIZY (organizationId: 9090909):**
```json
[
  {
    "id": "prop_001",
    "name": "Apartamento Vista Mar",
    "bedrooms": 2,
    "bathrooms": 1,
    "maxGuests": 4,
    "pricing": {
      "dailyRate": 350,
      "weeklyRate": 2100,
      "monthlyRate": 7000
    },
    "photos": [
      "https://exemplo.com/foto1.jpg",
      "https://exemplo.com/foto2.jpg"
    ],
    "amenities": ["WiFi", "Ar-condicionado", "Piscina"],
    "availability": "available"
  },
  {
    "id": "prop_002",
    "name": "Casa de Praia",
    "bedrooms": 3,
    "bathrooms": 2,
    "maxGuests": 6,
    "pricing": {
      "dailyRate": 500,
      "weeklyRate": 3200
    },
    "photos": ["..."],
    "amenities": ["WiFi", "Churrasqueira", "Varanda"],
    "availability": "available"
  }
]
```

**Site do Cliente (gerado pelo Bolt) exibe:**
```
┌────────────────────────────────────────────────┐
│  🏖️ SUA CASA MOBILIADA                        │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐          │
│  │ [Foto]       │  │ [Foto]       │          │
│  │              │  │              │          │
│  │ Apartamento  │  │ Casa de      │          │
│  │ Vista Mar    │  │ Praia        │          │
│  │              │  │              │          │
│  │ 2 quartos    │  │ 3 quartos    │          │
│  │ 4 hóspedes   │  │ 6 hóspedes   │          │
│  │              │  │              │          │
│  │ R$ 350/dia   │  │ R$ 500/dia   │          │
│  │              │  │              │          │
│  │ [Ver Mais]   │  │ [Ver Mais]   │          │
│  └──────────────┘  └──────────────┘          │
└────────────────────────────────────────────────┘
```

**✨ MÁGICA:** 
- Você adiciona novo imóvel no RENDIZY
- Site atualiza AUTOMATICAMENTE
- SEM precisar fazer deploy
- SEM tocar no código

---

## 🔄 SINCRONIZAÇÃO AUTOMÁTICA

### **Cenário 1: Novo Imóvel**
```
Você no RENDIZY:
1. Propriedades → Criar Nova
2. Nome: "Cobertura Luxo"
3. Preço: R$ 800/dia
4. Fotos, descrição, etc
5. Salvar

Cliente no Site (1 segundo depois):
1. Recarrega página
2. ✅ "Cobertura Luxo" JÁ APARECE!
3. Com fotos, preço, calendário
4. Pronto para reservar
```

### **Cenário 2: Atualização de Preço**
```
Você no RENDIZY:
1. Editar "Apartamento Vista Mar"
2. Preço: R$ 350 → R$ 400
3. Salvar

Cliente no Site (instantâneo):
1. ✅ Preço atualizado para R$ 400
2. Calendário com novo preço
3. Reservas futuras com preço novo
```

### **Cenário 3: Reserva Criada**
```
Cliente no Site:
1. Escolhe "Casa de Praia"
2. Seleciona 15/Nov a 20/Nov
3. Preenche dados
4. Confirmar Reserva

Sistema RENDIZY (automático):
1. ✅ Cria reserva no banco
2. ✅ Bloqueia calendário
3. ✅ Envia email confirmação
4. ✅ Notifica WhatsApp
5. ✅ Aparece no Dashboard

Você vê no RENDIZY:
1. Dashboard → Nova reserva!
2. Calendário → Datas bloqueadas
3. Cliente → Dados salvos
4. ✅ Tudo sincronizado
```

---

## 🎨 PERSONALIZAÇÃO DO SITE

### **O que o Bolt Gera:**

**Código Base:**
```typescript
const theme = {
  primaryColor: '{{PRIMARY_COLOR}}',
  secondaryColor: '{{SECONDARY_COLOR}}',
  accentColor: '{{ACCENT_COLOR}}',
  fontFamily: '{{FONT_FAMILY}}'
};

function Header() {
  return (
    <header style={{ backgroundColor: theme.primaryColor }}>
      <img src="{{LOGO_URL}}" alt="{{SITE_NAME}}" />
      <h1>{{SITE_NAME}}</h1>
    </header>
  );
}
```

**RENDIZY Substitui:**
```typescript
const theme = {
  primaryColor: '#3B82F6',      // Azul
  secondaryColor: '#1F2937',    // Cinza escuro
  accentColor: '#10B981',       // Verde
  fontFamily: 'Inter, sans-serif'
};

function Header() {
  return (
    <header style={{ backgroundColor: '#3B82F6' }}>
      <img src="https://cdn.rendizy.app/logos/sua-casa-mobiliada.png" alt="Sua Casa Mobiliada" />
      <h1>Sua Casa Mobiliada</h1>
    </header>
  );
}
```

**Resultado Visual:**
```
┌────────────────────────────────────────────────┐
│ [Logo] SUA CASA MOBILIADA     🔍 Buscar | Login│ ← Azul #3B82F6
├────────────────────────────────────────────────┤
│                                                 │
│     Encontre seu refúgio perfeito              │
│     na cidade maravilhosa                      │
│                                                 │
│  ┌────────────────────────────────────────┐   │
│  │ 🏙️ Cidade  📅 Datas  👥 Hóspedes    │   │
│  └────────────────────────────────────────┘   │
│                                                 │
└────────────────────────────────────────────────┘
```

---

## 🔐 SEGURANÇA

### **API Key Protegida:**

**Código no Site (público):**
```typescript
// Cliente vê isso no navegador:
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

// ⚠️ MAS essa é a chave PÚBLICA (anon_key)
// Só permite:
// - Ver imóveis da organização
// - Ver calendário
// - Criar reservas

// ❌ NÃO permite:
// - Deletar imóveis
// - Ver dados de outras organizações
// - Modificar preços
// - Acessar painel admin
```

**Backend RENDIZY:**
```typescript
// No servidor (privado):
const SERVICE_ROLE_KEY = "super_secreto...";

// ✅ Essa SIM tem poderes totais
// ✅ Nunca é exposta ao cliente
// ✅ Só você tem acesso
```

---

## 📱 RESPONSIVIDADE AUTOMÁTICA

**Desktop (Bolt gera):**
```
┌─────────────────────────────────────────────────────┐
│  [Logo] Menu                        Busca  |  Login │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐│
│  │ Casa 1  │  │ Casa 2  │  │ Casa 3  │  │ Casa 4  ││
│  │ R$ 350  │  │ R$ 500  │  │ R$ 400  │  │ R$ 600  ││
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘│
│                                                       │
└─────────────────────────────────────────────────────┘
```

**Mobile (Bolt adapta automaticamente):**
```
┌──────────────┐
│ ☰  [Logo]  🔍│
├──────────────┤
│              │
│  ┌────────┐ │
│  │ Casa 1 │ │
│  │ R$ 350 │ │
│  └────────┘ │
│              │
│  ┌────────┐ │
│  │ Casa 2 │ │
│  │ R$ 500 │ │
│  └────────┘ │
│              │
└──────────────┘
```

---

## 🎁 BONUS: FUNCIONALIDADES AVANÇADAS

### **1. Busca Inteligente**
```typescript
// Bolt gera código que filtra localmente:
const filteredProperties = properties.filter(p => 
  p.city.includes(searchCity) &&
  p.maxGuests >= searchGuests &&
  isAvailable(p, checkIn, checkOut)
);
```

### **2. Calendário Interativo**
```typescript
// Bolt integra com API de calendário:
const availability = await fetch(
  `/calendar?propertyId=${id}&start=${start}&end=${end}`
);

// Mostra calendário colorido:
// 🟢 Disponível
// 🔴 Ocupado
// 🟡 Bloqueado
```

### **3. Cálculo Automático de Preço**
```typescript
// Bolt calcula total baseado nas diárias:
const nights = calculateNights(checkIn, checkOut);
const total = nights * property.pricing.dailyRate;
const fees = total * 0.1; // Taxa de serviço
const finalPrice = total + fees;
```

### **4. Favoritos com LocalStorage**
```typescript
// Bolt salva favoritos localmente:
const addToFavorites = (propertyId) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites.push(propertyId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
```

---

## 🚀 DEPLOY

### **Opção 1: RENDIZY Host (Automático)**
```
✅ Site já está no ar!
✅ URL: https://sua-casa-mobiliada.rendizy.app
✅ SSL automático
✅ CDN global
✅ Backup automático
✅ Custo: R$ 0,00
```

### **Opção 2: Domínio Próprio**
```
1. Cliente compra: www.suacasamobiliada.com

2. Configura DNS:
   CNAME → sua-casa-mobiliada.rendizy.app

3. RENDIZY configura SSL (Let's Encrypt)

4. ✅ Site rodando em domínio próprio!
```

---

## 💡 CASOS DE USO

### **Caso 1: Cliente Tem 1 Imóvel**
```
Backend: 1 imóvel
Site: Mostra 1 card
Resultado: Site simples e limpo
```

### **Caso 2: Cliente Tem 50 Imóveis**
```
Backend: 50 imóveis
Site: Paginação + filtros
Resultado: Experiência profissional
```

### **Caso 3: Cliente Tem 0 Imóveis (ainda)**
```
Backend: 0 imóveis
Site: Mensagem "Em breve novidades!"
Resultado: Site preparado para crescer
```

---

## ✅ CHECKLIST - SITE FUNCIONANDO

```
✅ Site criado no RENDIZY
✅ Código importado do Bolt
✅ Variáveis substituídas
✅ URL gerada
✅ API integrada
✅ Imóveis aparecendo
✅ Calendário funcionando
✅ Reservas sendo criadas
✅ WhatsApp conectado
✅ Email de confirmação
✅ Mobile responsivo
✅ SEO configurado
✅ Analytics rodando
✅ ✨ SITE 100% OPERACIONAL!
```

---

**RENDIZY v1.0.103.198**  
**Sites profissionais integrados ao seu sistema!** 📱✨
