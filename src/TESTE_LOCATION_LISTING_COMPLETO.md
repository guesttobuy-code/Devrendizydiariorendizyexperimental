# 🧪 TESTE COMPLETO - Location e Listing

## 📋 Visão Geral

Criado em: 28 de Outubro de 2025  
Versão: v1.0.87  
Objetivo: Testar todas as funcionalidades do sistema RENDIZY com dados completos e realistas

## 🎯 O Que Foi Criado

### 1. Arquivo de Seed Completo
**Arquivo**: `/supabase/functions/server/seed-complete-test.ts`

Este arquivo cria um conjunto completo de dados de teste incluindo:

#### 📍 Location (Edifício Copacabana Sunset Tower)
- ✅ Endereço completo com coordenadas GPS
- ✅ 14 amenities compartilhados (piscina, academia, portaria 24h, etc)
- ✅ Informações administrativas (empresa, gerente, contatos)
- ✅ Informações de acesso ao prédio
- ✅ Fotos do prédio (3 fotos + cover photo)
- ✅ Descrição detalhada

#### 🏠 Property (Apartamento 1502 - Vista Mar Premium)
- ✅ Vinculado à Location via `locationId`
- ✅ Capacidade: 6 hóspedes, 3 quartos, 2 banheiros, 145m²
- ✅ Preços com tiers de desconto (semanal, quinzenal, mensal)
- ✅ Restrições configuradas (mín 2 noites, máx 90 noites)
- ✅ 35 amenities da unidade
- ✅ Integração com Airbnb e Booking.com
- ✅ 5 fotos + cover photo
- ✅ Descrições completas (pt/en/es)

#### 🛏️ Rooms (6 Cômodos Completos)
1. **Suíte Master** - King size, 2 pessoas, 2 fotos
2. **Quarto Twin** - 2 camas solteiro, 2 pessoas, 1 foto
3. **Quarto Duplo** - Cama casal, 2 pessoas, 1 foto
4. **Banheiro da Suíte** - Privado, 1 foto
5. **Banheiro Social** - Compartilhado, 1 foto
6. **Sala de Estar** - Com sofá-cama, 1 pessoa, 1 foto

**Total de capacidade**: 6 hóspedes (calculado pelas camas)

#### 📢 Listing (Anúncio Completo)
- ✅ Títulos em 3 idiomas (PT/EN/ES)
- ✅ Descrições completas em 3 idiomas
- ✅ Publicado em 3 plataformas:
  - Airbnb (ativo, sync habilitado)
  - Booking.com (ativo, sync habilitado)
  - Reservas diretas (ativo)
- ✅ Configurações de preço por plataforma
- ✅ Regras da casa completas
- ✅ **Preços derivados ativados**:
  - Taxa por hóspede adicional: R$ 80,00/noite (a partir do 5º)
  - Desconto para crianças: 50% (até 12 anos)
- ✅ **iCal Sync** configurado (2 URLs)
- ✅ SEO otimizado
- ✅ Estatísticas mockadas

#### ⚙️ Configurações Adicionais

**Pricing Settings**:
- Preços derivados habilitados
- Taxa hóspede extra: R$ 80,00/noite
- Taxa de limpeza: R$ 150,00
- Taxa de pet: R$ 50,00

**Accommodation Rules**:
- ✅ **Pets permitidos**: Sim (máx 1, taxa R$ 50,00)
  - Apenas cães de pequeno porte (até 10kg)
  - Não permitido deixar sozinho
- ✅ **Fumantes**: Não (apenas na varanda)
- ✅ **Festas**: Não permitido
- ✅ **Horário de silêncio**: 22h - 8h
- ✅ 5 regras adicionais

## 🚀 Como Executar o Teste

### Opção 1: Via BackendTester (Interface Gráfica)

1. Abra o sistema RENDIZY
2. Vá para **Admin Master** > **Backend Tester**
3. Clique no botão **"Teste Completo - Location + Listing"**
4. Aguarde a confirmação (aparecerá ✅ verde)

### Opção 2: Via API Direta

```bash
# Endpoint
POST https://{projectId}.supabase.co/functions/v1/make-server-67caf26a/dev/seed-complete-test

# Headers
Authorization: Bearer {publicAnonKey}
```

### Opção 3: Via Console do Navegador

```javascript
const { projectId, publicAnonKey } = await import('./utils/supabase/info');

const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-67caf26a/dev/seed-complete-test`,
  {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${publicAnonKey}` }
  }
);

const result = await response.json();
console.log(result);
```

## 📊 Resposta da API

A API retornará um JSON completo com todos os dados criados:

```json
{
  "success": true,
  "message": "Complete test data seeded successfully",
  "structure": "Location → Property → Rooms → Listing + Rules + Pricing Settings",
  "data": {
    "location": {
      "id": "loc_...",
      "name": "Edifício Copacabana Sunset Tower",
      "code": "COPA-ST",
      "address": "Av. Atlântica, 2964 - Rio de Janeiro/RJ",
      "sharedAmenities": 14
    },
    "property": {
      "id": "prop_...",
      "name": "Apartamento 1502 - Vista Mar Premium",
      "code": "COPA-ST-1502",
      "type": "apartment",
      "maxGuests": 6,
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 145,
      "basePrice": 45000,
      "amenities": 35
    },
    "rooms": {
      "count": 6,
      "types": ["suite", "twin", "duplo", "banheiro", "banheiro", "sala"]
    },
    "listing": {
      "id": "listing_...",
      "title": "Apartamento de Luxo 3 Quartos Vista Mar - Copacabana",
      "platforms": ["airbnb", "booking", "direct"],
      "icalUrls": 2,
      "derivedPricing": true
    },
    "additionalSettings": {
      "pricingSettings": "pricing_...",
      "accommodationRules": "rules_...",
      "pets": true,
      "smoking": false
    }
  }
}
```

## ✅ Como Verificar os Dados Criados

### 1. Verificar Location
- Vá para **Locais e Anúncios** > aba **Locais**
- Procure por "Edifício Copacabana Sunset Tower"
- Código: **COPA-ST**

### 2. Verificar Property
- Vá para **Propriedades** ou **Calendário**
- Procure por "Apartamento 1502 - Vista Mar Premium"
- Código: **COPA-ST-1502**

### 3. Verificar Rooms (Cômodos)
- Abra a Property criada
- Vá para a aba **Cômodos**
- Deve mostrar 6 cômodos configurados

### 4. Verificar Listing
- Vá para **Locais e Anúncios** > aba **Anúncios**
- Procure pelo listing do apartamento
- Verifique plataformas ativas (Airbnb, Booking, Direct)

### 5. Verificar Regras e Preços
- Abra o Listing
- Vá para aba **Regras da Acomodação**
- Vá para aba **Preços Derivados**
- Verifique configurações de pets, taxa extra, etc

## 🧪 Funcionalidades Testadas

### ✅ Gap Crítico 1: Sistema de Cômodos
- 6 tipos diferentes de cômodos
- Camas configuradas (5 camas totais)
- Capacidade calculada automaticamente
- Fotos por cômodo com tags

### ✅ Gap Crítico 2: iCal Synchronization
- URLs configuradas para Airbnb e Booking
- Sync de calendário habilitado
- Campos `lastSync` preenchidos

### ✅ Gap Crítico 3: Preços Derivados
- Taxa por hóspede adicional: R$ 80,00/noite
- A partir do 5º hóspede
- Máximo 6 hóspedes
- Desconto para crianças: 50% até 12 anos

### ✅ Gap Crítico 4: Regras de Acomodação
- Pets: Permitido com taxa (R$ 50,00)
- Fumantes: Não permitido
- Festas: Não permitido
- Horário de silêncio: 22h - 8h
- Regras adicionais detalhadas

### ✅ Hierarquia Location → Property
- Property vinculado à Location via `locationId`
- Endereço herdado + complemento
- Amenities compartilhados do prédio
- Informações de acesso ao prédio

### ✅ Multi-Plataforma
- 3 plataformas configuradas
- Preços ajustados por plataforma
- Sync habilitado por plataforma

### ✅ Multilíngue
- Títulos em PT/EN/ES
- Descrições completas em 3 idiomas
- Pronto para mercado internacional

## 🔍 Casos de Teste Sugeridos

### 1. Testar Criação de Reserva
```
Property: Apartamento 1502
Check-in: [data futura]
Check-out: [+3 dias]
Hóspedes: 5 adultos
```
**Esperado**: Sistema deve calcular taxa de hóspede adicional (1 × R$ 80 × 3 noites)

### 2. Testar Reserva com Criança
```
Hóspedes: 2 adultos + 1 criança (8 anos)
```
**Esperado**: Sistema deve aplicar 50% de desconto para a criança

### 3. Testar Reserva com Pet
```
Hóspedes: 2 adultos + 1 pet
```
**Esperado**: Sistema deve adicionar taxa de R$ 50,00 à reserva

### 4. Testar Bloqueio de Datas
```
Período: [qualquer período futuro]
```
**Esperado**: Bloqueio deve aparecer no calendário

### 5. Testar Edição de Preços
```
Data: [data específica]
Novo preço: R$ 600,00
```
**Esperado**: Preço customizado deve sobrescrever preço base

### 6. Testar Sistema de Cômodos
```
Ação: Adicionar novo cômodo
Tipo: Meio-banheiro (lavabo)
```
**Esperado**: Total de banheiros deve ser recalculado

### 7. Testar iCal Sync
```
Plataforma: Airbnb
URL: [URL do iCal]
```
**Esperado**: Sistema deve importar bloqueios/reservas externas

## 📝 Notas Importantes

### Dados Realistas
- Todos os valores estão em **centavos** (ex: 45000 = R$ 450,00)
- Coordenadas GPS reais de Copacabana, RJ
- Fotos via Unsplash (URLs válidas)
- Textos em português profissional

### Compatibilidade
- Compatível com todos os módulos do RENDIZY
- Não conflita com dados existentes
- Pode ser executado múltiplas vezes (cria novos IDs)

### Performance
- Seed leve e rápido (< 1 segundo)
- Todos os dados em memória
- Sem queries pesadas

## 🎯 Resultado Esperado

Após executar o seed, você terá:

1. ✅ **1 Location** completa com todos os campos
2. ✅ **1 Property** completa vinculada à Location
3. ✅ **6 Rooms** configurados com camas e fotos
4. ✅ **1 Listing** publicado em 3 plataformas
5. ✅ **Pricing Settings** com preços derivados
6. ✅ **Accommodation Rules** com regras de pets
7. ✅ **iCal URLs** configuradas para sync

**Total**: 1 conjunto completo e funcional pronto para testar TODAS as funcionalidades do sistema!

## 🐛 Troubleshooting

### Erro: "Failed to seed complete test data"
**Solução**: Verifique os logs do servidor para detalhes do erro

### Location não aparece na lista
**Solução**: Recarregue a página ou limpe o cache do navegador

### Property não vinculada à Location
**Solução**: Verifique se o campo `locationId` está presente na Property

### Rooms não aparecem
**Solução**: Verifique se o `accommodationId` dos rooms está correto

## 📚 Documentação Relacionada

- `/docs/INTEGRACAO_COMPONENTES_v1.0.79-81.md` - Sistema de Cômodos
- `/docs/MARCO_HISTORICO_GAPS_CRITICOS.md` - História dos 4 gaps críticos
- `/docs/implementacoes/IMPLEMENTACAO_LOCATIONS_ACCOMMODATIONS_v1.0.47.md` - Location → Property

## 🎉 Conclusão

Este seed cria o conjunto de dados mais completo possível para testar todas as funcionalidades do RENDIZY v1.0.87, incluindo os 4 gaps críticos implementados recentemente. Use-o para validar integrações, testar fluxos completos e demonstrar o sistema para clientes.

**Versão do Sistema**: v1.0.87  
**Data de Criação**: 28/10/2025  
**Autor**: Sistema RENDIZY  
**Status**: ✅ Pronto para uso
