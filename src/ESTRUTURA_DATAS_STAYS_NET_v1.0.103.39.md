# 📅 Estrutura de Datas da API Stays.net

**Versão:** v1.0.103.39  
**Data:** 29/10/2025  
**Status:** ✅ DOCUMENTADO

---

## 🎯 ENTENDENDO AS DATAS

### **Campos de Data no JSON da API Stays.net**

```json
{
  "_id": "68fa80e64c3d2e06839336e0",
  "id": "OG02J",
  "creationDate": "2025-10-23",      // ← Data que o cliente CONTRATOU
  "checkinDate": "2026-09-03",       // ← Data de ENTRADA (check-in)
  "checkInTime": "14:00",            // ← Horário de entrada
  "checkOutDate": "2026-09-06",      // ← Data de SAÍDA (check-out)
  "checkOutTime": "12:00"            // ← Horário de saída
}
```

### **Significado de Cada Campo**

| Campo | Descrição | Exemplo | Uso |
|-------|-----------|---------|-----|
| **creationDate** | Data que o hóspede **contratou/reservou** | 2025-10-23 | Quando a reserva foi feita no sistema |
| **checkinDate** | Data de **entrada** do hóspede | 2026-09-03 | Quando o hóspede chega no imóvel |
| **checkInTime** | Horário de entrada | 14:00 | Hora do check-in |
| **checkOutDate** | Data de **saída** do hóspede | 2026-09-06 | Quando o hóspede sai do imóvel |
| **checkOutTime** | Horário de saída | 12:00 | Hora do check-out |

---

## 🔍 PARÂMETROS DE BUSCA DA API

### **Como a API Filtra Reservas**

A API Stays.net usa 3 parâmetros para buscar reservas:

```typescript
{
  from: "2025-10-29",              // Data INICIAL do período
  to: "2025-10-29",                // Data FINAL do período
  dateType: "arrival"              // TIPO de data a filtrar
}
```

### **Tipos de Data (dateType)**

| Valor | Campo Filtrado | Descrição |
|-------|----------------|-----------|
| **arrival** | `checkinDate` | Busca reservas por data de **entrada/chegada** |
| **departure** | `checkOutDate` | Busca reservas por data de **saída** |
| **created** | `creationDate` | Busca reservas por data de **criação/contratação** |

---

## 📋 EXEMPLOS PRÁTICOS

### **Exemplo 1: Buscar Reservas com Check-in em 29/10/2025**

**Objetivo:** Encontrar todas as reservas onde o hóspede **entra** no dia 29/10/2025.

**Parâmetros:**
```json
{
  "from": "2025-10-29",
  "to": "2025-10-29",
  "dateType": "arrival"
}
```

**URL da API:**
```
GET /booking/reservations?from=2025-10-29&to=2025-10-29&dateType=arrival
```

**No RENDIZY:**
1. Aba "Preview de Reservas"
2. **Tipo de Data:** "Check-in (Arrival)" ✅
3. **Data Início:** 29/10/2025
4. **Data Fim:** 29/10/2025
5. Clicar "Buscar Reservas"

---

### **Exemplo 2: Buscar Reservas Criadas em Outubro/2025**

**Objetivo:** Encontrar todas as reservas que foram **contratadas** em outubro de 2025.

**Parâmetros:**
```json
{
  "from": "2025-10-01",
  "to": "2025-10-31",
  "dateType": "created"
}
```

**URL da API:**
```
GET /booking/reservations?from=2025-10-01&to=2025-10-31&dateType=created
```

**No RENDIZY:**
1. Aba "Preview de Reservas"
2. **Tipo de Data:** "Criação (Created)" ✅
3. **Data Início:** 01/10/2025
4. **Data Fim:** 31/10/2025
5. Clicar "Buscar Reservas"

---

### **Exemplo 3: Buscar Reservas com Check-out em Novembro/2025**

**Objetivo:** Encontrar todas as reservas onde o hóspede **sai** em novembro de 2025.

**Parâmetros:**
```json
{
  "from": "2025-11-01",
  "to": "2025-11-30",
  "dateType": "departure"
}
```

**URL da API:**
```
GET /booking/reservations?from=2025-11-01&to=2025-11-30&dateType=departure
```

**No RENDIZY:**
1. Aba "Preview de Reservas"
2. **Tipo de Data:** "Check-out (Departure)" ✅
3. **Data Início:** 01/11/2025
4. **Data Fim:** 30/11/2025
5. Clicar "Buscar Reservas"

---

### **Exemplo 4: Reservas Ativas Hoje**

**Objetivo:** Encontrar reservas onde o hóspede **está hospedado agora** (29/10/2025).

**Lógica:** Hóspedes que entraram ANTES ou NO dia 29/10 E saem DEPOIS do dia 29/10.

**Estratégia:** Fazer 2 buscas e cruzar os dados:

**Busca 1 - Check-ins até hoje:**
```json
{
  "from": "2025-01-01",
  "to": "2025-10-29",
  "dateType": "arrival"
}
```

**Busca 2 - Check-outs após hoje:**
```json
{
  "from": "2025-10-30",
  "to": "2025-12-31",
  "dateType": "departure"
}
```

**Resultado:** Reservas que aparecem nas DUAS buscas = hóspedes ativos hoje.

---

## 🎓 CASOS DE USO REAIS

### **Caso 1: Preparação para Chegadas de Hoje**

**Cenário:** É 29/10/2025 e você quer saber quem chega hoje para preparar os imóveis.

**Solução:**
```
dateType: arrival
from: 2025-10-29
to: 2025-10-29
```

**Resultado:** Lista de todos os hóspedes que fazem check-in hoje.

---

### **Caso 2: Relatório de Reservas do Mês**

**Cenário:** Você precisa de um relatório de todas as reservas **criadas** em outubro.

**Solução:**
```
dateType: created
from: 2025-10-01
to: 2025-10-31
```

**Resultado:** Todas as reservas contratadas em outubro, independente da data de entrada.

---

### **Caso 3: Planejamento de Limpeza**

**Cenário:** Você quer saber quais imóveis precisam de limpeza na próxima semana (saídas).

**Solução:**
```
dateType: departure
from: 2025-11-01
to: 2025-11-07
```

**Resultado:** Lista de check-outs da próxima semana para agendar limpeza.

---

### **Caso 4: Previsão de Ocupação**

**Cenário:** Você quer saber a ocupação de dezembro/2025.

**Solução:**
```
dateType: arrival
from: 2025-12-01
to: 2025-12-31
```

**Resultado:** Todas as reservas com check-in em dezembro.

---

## 🔄 RELACIONAMENTO ENTRE DATAS

### **Exemplo de Reserva Completa**

```json
{
  "id": "OG02J",
  "guestName": "Masferrer Larissa",
  
  // Data de CONTRATAÇÃO (quando reservou)
  "creationDate": "2025-10-23",
  
  // Data de ENTRADA (quando chega)
  "checkinDate": "2026-09-03",
  "checkInTime": "14:00",
  
  // Data de SAÍDA (quando sai)
  "checkOutDate": "2026-09-06",
  "checkOutTime": "12:00",
  
  // Dados calculados
  "numberOfNights": 3,              // 06 - 03 = 3 noites
  "totalValue": 1266.88,
  "channel": "API booking.com"
}
```

### **Timeline da Reserva**

```
2025-10-23          2026-09-03          2026-09-06
    │                   │                   │
    │                   │                   │
    ▼                   ▼                   ▼
CONTRATOU           ENTRA               SAI
(created)          (arrival)         (departure)
    │                   │                   │
    │◄────── 315 dias──►│                   │
    │                   │◄──── 3 noites ───►│
```

---

## 📊 MAPEAMENTO COMPLETO DE CAMPOS

### **Campos da Planilha → Campos do JSON**

| Planilha | JSON | Tipo | Exemplo |
|----------|------|------|---------|
| Data de criação | `creationDate` | string | "2025-10-23" |
| Chegada | `checkinDate` | string | "2026-09-03" |
| Data de checkout | `checkOutDate` | string | "2026-09-06" |
| - | `checkInTime` | string | "14:00" |
| - | `checkOutTime` | string | "12:00" |
| Reserva | `id` | string | "OG02J" |
| ID interno do hóspede | `_id` | string | "68fa80e6..." |
| Nome do hóspede | `guestName` | string | "Masferrer Larissa" |
| Primeiro nome | `firstName` | string | "Masferrer" |
| Sobrenome | `lastName` | string | "Larissa" |
| E-mail | `email` | string | "mlaris...@guest.booking.com" |
| Número de telefone | `phone` | string | "+55 11 97449 2586" |
| Total de hóspedes | `numberOfGuests` | number | 1 |
| Número de noites | `numberOfNights` | number | 3 |
| Total da reserva | `totalValue` | number | 1266.88 |
| Moeda | `currency` | string | "BRL" |
| Canal | `channel` | string | "API booking.com" |
| Código externo OTA | `otaReservationCode` | string | "6170484539" |
| ID do anúncio | `listingId` | string | "XB03H" |
| Nome interno do anúncio | `listingName` | string | "Quarto 02 - Barra..." |
| Status da reserva | `status` | string | "reserva" |

---

## ✅ RESPOSTA À SUA PERGUNTA

### **"Consegue pesquisar por checkinDate dia 29/10/2025?"**

**SIM! ✅** De duas formas:

### **Opção 1: Data Exata (apenas dia 29)**

```
dateType: arrival
from: 2025-10-29
to: 2025-10-29
```

**Resultado:** Apenas reservas com check-in no dia 29/10/2025.

### **Opção 2: Período Incluindo o Dia 29**

```
dateType: arrival
from: 2025-10-29
to: 2025-10-31
```

**Resultado:** Reservas com check-in entre 29 e 31 de outubro.

---

## 🎯 COMO FAZER NO RENDIZY

### **Passo a Passo para Buscar Check-ins de 29/10/2025**

1. Menu → **Configurações**
2. Seção **Integrações**
3. Card **Stays.net PMS**
4. Aba **"Preview de Reservas"**
5. Configurar:
   - **Tipo de Data:** "Check-in (Arrival)" ✅
   - **Data Início:** 29/10/2025
   - **Data Fim:** 29/10/2025
6. Clicar **"Buscar Reservas"**

### **Resultado Esperado**

Você verá:
- ✅ Card visual com análise da estrutura
- ✅ Alert popup com informações
- ✅ JSON completo com todas as reservas
- ✅ Console com logs detalhados

---

## 🔍 ESTRUTURA DO JSON RETORNADO

### **Baseado no que você mostrou:**

```json
[
  {
    "_id": "68fa80e64c3d2e06839336e0",
    "id": "OG02J",
    "creationDate": "2025-10-23",
    "checkinDate": "2026-09-03",
    "checkInTime": "14:00",
    "checkOutDate": "2026-09-06",
    "checkOutTime": "12:00",
    ...mais campos...
  }
]
```

**OU**

```json
{
  "reservations": [
    {
      "_id": "68fa80e64c3d2e06839336e0",
      "id": "OG02J",
      ...
    }
  ],
  "total": 1,
  "page": 1
}
```

**O sistema de debug v1.0.103.38 vai identificar automaticamente qual estrutura está sendo usada!**

---

## 📝 PRÓXIMOS PASSOS

### **Agora que entendo a estrutura:**

1. ✅ **Teste o sistema de debug** para confirmar qual estrutura a API retorna
2. ✅ **Me envie** qual box ficou verde (array direto? .reservations? outro?)
3. ✅ **Eu ajusto** o código de extração (2 min)
4. ✅ **Implemento** o mapeamento completo de todos os campos (10 min)
5. ✅ **Testo** a sincronização (5 min)

**Total: ~17 minutos para conclusão completa!** 🚀

---

## 💡 DICA PRO

### **Salvando Buscas Frequentes**

Você pode criar "atalhos" para buscas frequentes:

**Chegadas de Hoje:**
- `dateType: arrival`
- `from: hoje`
- `to: hoje`

**Saídas de Amanhã:**
- `dateType: departure`
- `from: amanhã`
- `to: amanhã`

**Reservas do Mês:**
- `dateType: created`
- `from: primeiro dia do mês`
- `to: último dia do mês`

---

## 🎉 RESUMO

**Campos de Data:**
- ✅ `creationDate` - Quando reservou
- ✅ `checkinDate` - Quando entra
- ✅ `checkOutDate` - Quando sai

**Tipos de Busca:**
- ✅ `arrival` - Filtra por entrada
- ✅ `departure` - Filtra por saída
- ✅ `created` - Filtra por criação

**Pergunta:**
- ✅ **SIM**, consegue buscar por checkinDate = 29/10/2025!

**Como:**
- ✅ `from=2025-10-29&to=2025-10-29&dateType=arrival`

**Agora é só testar e me dizer qual estrutura a API retorna!** 🚀
