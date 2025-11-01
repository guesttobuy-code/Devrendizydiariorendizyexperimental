# 📊 ANÁLISE DE RESERVAS STAYS.NET

**Versão:** v1.0.103.21  
**Data:** 29 de Outubro de 2025  
**Funcionalidade:** ✅ Analisador de Reservas por Data  

---

## 🎯 O QUE É?

Um **analisador inteligente** que:
1. ✅ Busca TODAS as reservas da API Stays.net
2. ✅ **Auto-detecta** qual campo contém a data de criação
3. ✅ **Filtra** reservas por data específica (ex: 28/10/2025)
4. ✅ **Visualiza** detalhes de cada reserva
5. ✅ **Exporta** resultados em JSON

---

## 🚀 COMO USAR

### Passo 1: Configurar Integração

```
1. Dashboard → Configurações (⚙️)
2. Tab "⚡ Integrações"
3. Card "Stays.net PMS" → "Configurar Integração"
4. Preencher:
   - Base URL: https://stays.net/external-api
   - API Key: [sua chave]
5. Testar Conexão → Salvar
```

### Passo 2: Ir para Análise de Reservas

```
1. Na tela de integração Stays.net
2. Clicar na tab "📅 Análise de Reservas"
```

### Passo 3: Buscar Todas as Reservas

```
1. Clicar em "Buscar Todas as Reservas"
2. Aguardar carregamento
3. Ver quantidade de reservas carregadas (ex: "156 reservas carregadas")
```

**O que acontece:**
- Sistema busca endpoint `/reservations`
- Carrega todas as reservas disponíveis
- **Auto-detecta** qual campo contém a data de criação
- Exibe toast informando qual campo foi detectado

### Passo 4: Filtrar por Data

```
1. Selecionar data alvo (ex: 2025-10-28)
2. Verificar campo de data detectado
3. Clicar em "Filtrar Reservas de [data]"
```

**Resultado:**
- Lista de reservas criadas naquela data
- Detalhes de cada reserva
- Contador de resultados

### Passo 5: Analisar Resultados

Cada reserva mostra:
- ✅ **ID** da reserva
- ✅ **Status** (confirmada, cancelada, etc)
- ✅ **Hóspede** (nome)
- ✅ **Propriedade** (nome ou ID)
- ✅ **Período** (check-in → check-out)
- ✅ **Data de criação**
- ✅ **Valor total** (se disponível)
- ✅ **JSON completo** (expandível)

### Passo 6: Exportar (Opcional)

```
1. Clicar em "Exportar JSON"
2. Arquivo baixado: reservas-2025-10-28.json
```

**Conteúdo do arquivo:**
```json
{
  "targetDate": "2025-10-28",
  "dateField": "created_at",
  "totalReservations": 156,
  "filteredCount": 12,
  "reservations": [...]
}
```

---

## 🤖 AUTO-DETECÇÃO DE CAMPOS

### Como Funciona?

O sistema procura automaticamente por campos que contenham datas:

**Campos testados (em ordem):**
1. `createdAt`
2. `created_at`
3. `creation_date`
4. `created`
5. `bookingDate`
6. `booking_date`
7. `date_created`
8. `timestamp`
9. `date`
10. `reservation_date`

### Seleção Manual

Se a auto-detecção falhar, você pode:
1. Ver lista de **campos possíveis** no dropdown
2. Selecionar manualmente o campo correto
3. Filtrar novamente

---

## 📋 CAMPOS MAPEADOS

### Campos de Identificação
```
✓ id              - ID da reserva
✓ status          - Status atual
✓ booking_status  - Status alternativo
```

### Campos de Hóspede
```
✓ guestName       - Nome do hóspede
✓ guest_name      - Nome alternativo
✓ guest.name      - Nome aninhado
```

### Campos de Propriedade
```
✓ propertyId      - ID da propriedade
✓ property_id     - ID alternativo
✓ propertyName    - Nome da propriedade
✓ property_name   - Nome alternativo
✓ property.name   - Nome aninhado
```

### Campos de Data
```
✓ checkIn         - Check-in
✓ check_in        - Check-in alternativo
✓ checkInDate     - Check-in formato data
✓ checkOut        - Check-out
✓ check_out       - Check-out alternativo
✓ checkOutDate    - Check-out formato data
```

### Campos de Valor
```
✓ totalAmount     - Valor total
✓ total_amount    - Valor alternativo
```

**NOTA:** O sistema é **flexível** e captura qualquer campo adicional retornado pela API!

---

## 🔍 EXEMPLO DE USO

### Cenário: "Quais foram as novas reservas de ontem (28/10/2025)?"

**1. Buscar:**
```
[Buscar Todas as Reservas] → 156 reservas carregadas
```

**2. Auto-detecção:**
```
✅ Campo de data detectado: "created_at"
```

**3. Filtrar:**
```
Data Alvo: 2025-10-28
[Filtrar Reservas de 2025-10-28]
```

**4. Resultado:**
```
┌─────────────────────────────────────────────┐
│ Reservas de 2025-10-28                      │
│ 12 reserva(s) encontrada(s)                 │
├─────────────────────────────────────────────┤
│                                             │
│ #RES-2891          [Confirmada]             │
│ 👤 João Silva                                │
│ 🏠 Casa de Praia - Búzios                    │
│ 📅 2025-11-10 → 2025-11-17                   │
│ 🕐 2025-10-28T14:30:00Z                      │
│ 💰 R$ 4.500,00                               │
│                                             │
│ #RES-2892          [Pendente]               │
│ 👤 Maria Santos                              │
│ 🏠 Apartamento Centro - RJ                   │
│ 📅 2025-12-01 → 2025-12-05                   │
│ 🕐 2025-10-28T16:45:00Z                      │
│ 💰 R$ 2.100,00                               │
│                                             │
│ ... (10 mais)                               │
│                                             │
│ [Exportar JSON]                             │
└─────────────────────────────────────────────┘
```

**5. Exportar:**
```
✅ Arquivo baixado: reservas-2025-10-28.json
```

---

## 🎨 RECURSOS VISUAIS

### Cards de Reservas

Cada reserva é exibida em um **card colorido** com:
- Border azul à esquerda (destaque)
- Badges de ID e Status
- Ícones para cada tipo de informação
- Detalhes expandíveis (JSON completo)

### Filtros Inteligentes

- **Dropdown de campos:** Lista apenas campos que contêm datas
- **Input de data:** Calendário nativo do navegador
- **Validação:** Só permite filtrar após carregar dados

### Análise de Estrutura

Se **nenhuma reserva** for encontrada, o sistema mostra:
- Lista de **campos possíveis** de data
- **JSON completo** da primeira reserva
- Dicas para identificar o campo correto

---

## 🐛 TROUBLESHOOTING

### Problema: "Nenhuma reserva encontrada"

**Possíveis causas:**
1. ❌ Campo de data incorreto
2. ❌ Data no formato errado
3. ❌ Não há reservas nessa data

**Solução:**
```
1. Verificar seção "Análise da Estrutura"
2. Ver campos de data disponíveis
3. Selecionar manualmente o campo correto
4. Tentar novamente
```

### Problema: "Campo de data não detectado"

**Solução:**
```
1. Ver JSON da primeira reserva
2. Identificar visualmente o campo de data
3. Selecionar no dropdown
4. Filtrar novamente
```

### Problema: "Erro ao buscar reservas"

**Possíveis causas:**
1. ❌ API Key inválida
2. ❌ Base URL incorreta
3. ❌ API fora do ar

**Solução:**
```
1. Voltar para tab "Configuração"
2. Testar conexão novamente
3. Verificar credenciais
4. Salvar e tentar novamente
```

---

## 🔧 FILTROS AVANÇADOS (FUTURO)

### Funcionalidades Planejadas:

#### Filtro por Período
```
Data Início: 2025-10-01
Data Fim:    2025-10-31
→ Todas as reservas de outubro
```

#### Filtro por Status
```
☐ Confirmada
☐ Pendente
☐ Cancelada
☐ Todas
```

#### Filtro por Propriedade
```
Propriedade: [Selecionar] ▼
→ Apenas reservas de uma propriedade
```

#### Filtro por Hóspede
```
Hóspede: [Buscar por nome]
→ Todas as reservas de um hóspede
```

#### Filtro por Valor
```
Valor Mínimo: R$ 1.000
Valor Máximo: R$ 5.000
```

---

## 💡 CASOS DE USO

### 1. Análise Diária
**Objetivo:** Ver novas reservas de hoje/ontem
```
→ Identificar picos de reserva
→ Monitorar performance de vendas
→ Acompanhar conversão
```

### 2. Relatórios Mensais
**Objetivo:** Quantas reservas foram criadas em outubro
```
→ Loop de 01/10 a 31/10
→ Contar reservas por dia
→ Gerar gráfico de tendência
```

### 3. Auditoria de Dados
**Objetivo:** Verificar integridade dos dados
```
→ Comparar com planilha externa
→ Validar sincronização
→ Identificar duplicatas
```

### 4. Mapeamento de Campos
**Objetivo:** Entender estrutura da API
```
→ Exportar JSON de exemplo
→ Documentar campos
→ Planejar integração completa
```

---

## 📊 ESTATÍSTICAS

### Performance

**Tempo médio:**
- Buscar 100 reservas: ~2 segundos
- Filtrar 100 reservas: ~0.1 segundo
- Exportar JSON: instantâneo

**Limitações:**
- Sem paginação (busca todas de uma vez)
- Sem cache (refaz request a cada busca)
- Sem filtro no backend (filtra no frontend)

**Melhorias futuras:**
- ✅ Paginação (buscar em lotes)
- ✅ Cache local (evitar requests repetidas)
- ✅ Filtro no backend (query params na API)

---

## 🎯 RESULTADO ESPERADO

### Para o Usuário:

**Antes:**
```
❌ "Preciso saber quais reservas chegaram ontem"
❌ "Tenho que acessar outro sistema"
❌ "Não sei quais campos usar"
```

**Depois:**
```
✅ "Em 3 cliques, vejo todas as reservas de ontem"
✅ "Tudo no RENDIZY, sem trocar de aba"
✅ "Sistema detecta campos automaticamente"
```

### Para o Desenvolvedor:

**Benefícios:**
```
✅ Identificar estrutura da API real
✅ Testar campos de data
✅ Validar mapeamento
✅ Preparar sincronização bidirecional
```

---

## 📝 PRÓXIMOS PASSOS

### Fase 1: Análise Manual (ATUAL)
- ✅ Buscar reservas manualmente
- ✅ Filtrar por data
- ✅ Exportar JSON
- ✅ Auto-detectar campos

### Fase 2: Sincronização Automática
- [ ] Buscar reservas a cada X minutos
- [ ] Armazenar no KV Store
- [ ] Notificar novas reservas
- [ ] Dashboard de sincronização

### Fase 3: Integração Completa
- [ ] Importar reserva Stays.net → RENDIZY
- [ ] Mapear campos automaticamente
- [ ] Sincronização bidirecional
- [ ] Webhook de eventos

### Fase 4: Relatórios
- [ ] Gráfico de reservas por dia
- [ ] Análise de tendências
- [ ] Comparativo mensal
- [ ] Exportar relatórios

---

## 🔗 ARQUIVOS RELACIONADOS

```
/components/StaysNetReservationAnalyzer.tsx  ← Componente principal
/components/StaysNetIntegration.tsx          ← Integração (contém analyzer)
/supabase/functions/server/routes-staysnet.ts ← Backend API
/INTEGRACAO_STAYS_NET_v1.0.103.17.md         ← Documentação geral
```

---

## ✅ CHECKLIST DE USO

### Primeira Vez:
- [ ] Configurar credenciais Stays.net
- [ ] Testar conexão
- [ ] Salvar configuração
- [ ] Ir para "Análise de Reservas"
- [ ] Buscar todas as reservas
- [ ] Observar campo detectado
- [ ] Filtrar por data de ontem
- [ ] Verificar resultados
- [ ] Exportar JSON
- [ ] Analisar estrutura

### Uso Diário:
- [ ] Abrir "Análise de Reservas"
- [ ] Buscar reservas
- [ ] Selecionar data de hoje/ontem
- [ ] Filtrar
- [ ] Ver novas reservas
- [ ] (Opcional) Exportar

---

## 🎓 FAQ

### P: Consigo filtrar por intervalo de datas?
**R:** Não na versão atual. Apenas data específica. Intervalo está no roadmap.

### P: Os dados são salvos?
**R:** Não. Cada busca faz um novo request. Cache será implementado.

### P: Funciona offline?
**R:** Não. Requer conexão com API Stays.net.

### P: Quantas reservas suporta?
**R:** Sem limite técnico, mas performance pode cair com 1000+ reservas.

### P: Posso buscar reservas antigas?
**R:** Sim! Qualquer data que a API retornar.

### P: E se a API mudar campos?
**R:** A auto-detecção se adapta. Seleção manual sempre funciona.

---

## 💬 EXEMPLO DE CONVERSA

**Usuário:** "Quais foram as novas reservas de ontem (28/10/2025)?"

**Sistema (antes):** ❌ "Você precisa acessar o Stays.net diretamente"

**Sistema (agora):** ✅ 
```
1. [Buscar Todas as Reservas]
   → 156 reservas carregadas
   → Campo detectado: "created_at"

2. Data: 2025-10-28
   [Filtrar]
   
3. Resultado: 12 reservas encontradas em 28/10/2025
   
   #RES-2891 - João Silva - Casa de Praia
   #RES-2892 - Maria Santos - Apt Centro
   ... (10 mais)
   
   [Exportar JSON]
```

---

**Criado em:** 29 de Outubro de 2025  
**Versão:** v1.0.103.21  
**Status:** ✅ IMPLEMENTADO  
**Autor:** Equipe RENDIZY  
