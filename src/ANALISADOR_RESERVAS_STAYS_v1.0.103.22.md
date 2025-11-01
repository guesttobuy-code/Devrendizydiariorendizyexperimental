# 🔍 ANALISADOR DE RESERVAS STAYS.NET

**Versão:** v1.0.103.22  
**Data:** 29 de Outubro de 2025  
**Funcionalidade:** Buscar reservas reais e comparar campos API ↔ RENDIZY  

---

## 🎯 O QUE FOI IMPLEMENTADO

### Ferramenta de Análise Avançada

Interface completa para buscar reservas reais da API Stays.net e comparar os campos retornados com a estrutura do RENDIZY.

```
┌─────────────────────────────────────────────────┐
│ 🔍 Analisador de Reservas Stays.net            │
├─────────────────────────────────────────────────┤
│ [Ontem] [Hoje] [Buscar]                        │
│ Data: 2025-10-29                               │
│                                                 │
│ ✅ 3 reservas encontradas                      │
│                                                 │
│ [Comparação] [Dados Brutos] [Mapeamento]      │
│                                                 │
│ 📊 Campos Mapeados: 15                         │
│ ⚠️  Não Mapeados: 8                            │
│ 📋 Total de Campos: 23                         │
└─────────────────────────────────────────────────┘
```

---

## 📋 FUNCIONALIDADES

### 1. **Busca Rápida**
```
🕐 [Ontem]  → Busca reservas de ontem automaticamente
⚡ [Hoje]   → Busca reservas de hoje
🔍 [Buscar] → Busca com data customizada
```

### 2. **Lista de Reservas**
```
Mostra todas as reservas encontradas:
- Nome do hóspede
- Propriedade
- Datas (check-in → check-out)
- Status
- Clique para selecionar e analisar
```

### 3. **Análise em 3 Abas**

#### Tab 1: Comparação de Campos
```
Mostra lado a lado:
- Campo Stays.net
- Campo RENDIZY correspondente
- Status do mapeamento (✅ ou ⚠️)
- Tipo do valor
- Valor completo
```

#### Tab 2: Dados Brutos
```
JSON completo da reserva
- Todos os campos retornados pela API
- Formatação legível
- Scroll para navegação
```

#### Tab 3: Sugestão de Mapeamento
```
Código pronto para usar:
- Função mapStaysReservationToRendizy()
- Mapeamento completo de campos
- Função de conversão de status
- Cálculo de noites
- Exemplo de uso com dados reais
```

### 4. **Estatísticas**
```
3 cards mostrando:
✅ Campos Mapeados (verde)
⚠️  Campos Não Mapeados (amarelo)
📊 Total de Campos (azul)
```

### 5. **Exportação**
```
Botão "Exportar JSON":
- Salva análise completa
- Reserva selecionada
- Comparação de campos
- Resposta bruta da API
- Timestamp da análise
```

---

## 🔧 COMO USAR

### **Passo 1: Configurar Stays.net**
```
📍 CAMINHO EXATO:
Menu Lateral → ⚙️ Configurações → Tab "Integrações" → Scroll até Stays.net

1. Preencher Base URL
2. Preencher credenciais (login/senha)
3. Testar conexão
4. Salvar
```

### **Passo 2: Abrir Analisador**
```
📍 AINDA NA MESMA TELA:
No componente Stays.net (já visível após scroll)
→ Clicar na Tab "Análise de Reservas"
```

### **Passo 3: Buscar Reservas**
```
Opção A: Clicar [Hoje]
Opção B: Clicar [Ontem]
Opção C: Escolher data específica + [Buscar]
```

### **Passo 4: Selecionar Reserva**
```
→ Lista de reservas aparece
→ Clicar em uma reserva
→ Análise detalhada é exibida
```

### **Passo 5: Analisar Campos**
```
Tab "Comparação":
→ Ver campos lado a lado
→ Identificar mapeados (verde) e não mapeados (amarelo)
→ Ver valores reais de cada campo

Tab "Dados Brutos":
→ Ver JSON completo
→ Entender estrutura da API

Tab "Mapeamento":
→ Copiar código de exemplo
→ Usar para implementação
```

### **Passo 6: Exportar (Opcional)**
```
Botão [Exportar JSON]:
→ Salva arquivo com análise completa
→ Usar para documentação/referência
```

---

## 📊 MAPEAMENTO DE CAMPOS

### Campos Identificados e Mapeados

#### **Identificação**
```
Stays.net              →  RENDIZY
────────────────────────────────────────
id                     →  id
code                   →  confirmationCode
reservation_code       →  confirmationCode
```

#### **Datas**
```
Stays.net              →  RENDIZY
────────────────────────────────────────
checkin                →  checkIn
check_in               →  checkIn
arrival                →  checkIn
checkout               →  checkOut
check_out              →  checkOut
departure              →  checkOut
created_at             →  createdAt
booking_date           →  createdAt
```

#### **Hóspede**
```
Stays.net              →  RENDIZY
────────────────────────────────────────
guest_name             →  guestName
customer_name          →  guestName
guest_email            →  guestEmail
guest_phone            →  guestPhone
guest_document         →  guestDocument
```

#### **Propriedade**
```
Stays.net              →  RENDIZY
────────────────────────────────────────
property_id            →  propertyId
unit_id                →  propertyId
property_name          →  propertyName
unit_name              →  propertyName
```

#### **Valores**
```
Stays.net              →  RENDIZY
────────────────────────────────────────
total                  →  pricing.total
total_amount           →  pricing.total
price                  →  pricing.total
accommodation_total    →  pricing.accommodationTotal
cleaning_fee           →  pricing.cleaningFee
tax                    →  pricing.tax
```

#### **Status e Origem**
```
Stays.net              →  RENDIZY
────────────────────────────────────────
status                 →  status
reservation_status     →  status
source                 →  source
channel                →  platform
platform               →  platform
```

#### **Outros**
```
Stays.net              →  RENDIZY
────────────────────────────────────────
nights                 →  nights
adults                 →  guests.adults
children               →  guests.children
notes                  →  notes
special_requests       →  specialRequests
```

---

## 💡 COMO INTERPRETAR A ANÁLISE

### Indicadores Visuais

#### ✅ Verde - Campo Mapeado
```
Significa:
- Campo da API Stays.net TEM correspondente no RENDIZY
- Pode ser importado automaticamente
- Estrutura de dados compatível
```

#### ⚠️ Amarelo - Campo Não Mapeado
```
Significa:
- Campo da API Stays.net NÃO tem correspondente no RENDIZY
- Pode precisar criar campo novo
- Ou decidir se campo é relevante
```

### Tipos de Valores

```
string   → Texto simples
number   → Número (inteiro ou decimal)
boolean  → true/false
object   → Objeto aninhado (JSON)
array    → Lista/Array de valores
null     → Sem valor
```

---

## 🎯 CASOS DE USO

### Caso 1: Planejar Integração
```
Objetivo: Entender que dados virão da API

Passos:
1. Buscar reserva real
2. Ver aba "Comparação"
3. Identificar campos importantes
4. Planejar estrutura de importação
5. Ver aba "Mapeamento" para código base
```

### Caso 2: Validar Dados
```
Objetivo: Confirmar que API retorna dados esperados

Passos:
1. Buscar reserva de hoje
2. Ver aba "Dados Brutos"
3. Verificar se campos essenciais estão presentes:
   - guest_name ✓
   - checkin ✓
   - checkout ✓
   - total ✓
4. Se faltando, ajustar expectativas
```

### Caso 3: Debugar Importação
```
Objetivo: Entender por que importação falhou

Passos:
1. Buscar mesma reserva que falhou
2. Ver estrutura real dos dados
3. Comparar com código de importação
4. Identificar divergência
5. Corrigir mapeamento
```

### Caso 4: Descobrir Campos Novos
```
Objetivo: Ver se API tem campos úteis não usados

Passos:
1. Ver seção "Não Mapeados"
2. Analisar se campos são relevantes
3. Decidir se vale adicionar ao RENDIZY
4. Implementar se necessário
```

---

## 🔍 EXEMPLOS DE ANÁLISE

### Exemplo 1: Reserva Completa

```json
// Stays.net retornou:
{
  "id": "12345",
  "code": "ABC123",
  "guest_name": "João Silva",
  "guest_email": "joao@email.com",
  "guest_phone": "+5548999999999",
  "property_id": "prop_001",
  "property_name": "Casa da Praia",
  "checkin": "2025-10-29",
  "checkout": "2025-11-02",
  "nights": 4,
  "adults": 2,
  "children": 1,
  "total": 2000.00,
  "cleaning_fee": 150.00,
  "tax": 200.00,
  "status": "confirmed",
  "source": "airbnb"
}

// RENDIZY pode mapear para:
{
  "id": "12345",
  "confirmationCode": "ABC123",
  "guestName": "João Silva",
  "guestEmail": "joao@email.com",
  "guestPhone": "+5548999999999",
  "propertyId": "prop_001",
  "propertyName": "Casa da Praia",
  "checkIn": "2025-10-29",
  "checkOut": "2025-11-02",
  "nights": 4,
  "guests": {
    "adults": 2,
    "children": 1
  },
  "pricing": {
    "total": 2000.00,
    "cleaningFee": 150.00,
    "tax": 200.00
  },
  "status": "confirmed",
  "platform": "airbnb",
  "source": "stays"
}

✅ 100% mapeável!
```

---

### Exemplo 2: Campo Não Mapeado

```json
// API retornou campo não esperado:
{
  "guest_preferences": {
    "early_checkin": true,
    "late_checkout": false,
    "breakfast": "vegetariano"
  }
}

// Na análise aparece:
⚠️ Campo Não Mapeado
Stays.net: guest_preferences
RENDIZY: ❓ Não mapeado
Tipo: object

// Decisão:
Opção A: Criar campo "guestPreferences" no RENDIZY
Opção B: Ignorar (não é crítico)
Opção C: Armazenar em "notes" ou "metadata"
```

---

## 📥 FORMATO DO EXPORT

### Arquivo JSON Exportado

```json
{
  "timestamp": "2025-10-29T14:30:00.000Z",
  "searchDate": "2025-10-29",
  "totalReservations": 3,
  "selectedReservation": {
    // JSON completo da reserva
  },
  "fieldComparison": [
    {
      "staysField": "guest_name",
      "rendizuField": "guestName",
      "value": "João Silva",
      "valueType": "string",
      "hasMapping": true
    },
    // ... outros campos
  ],
  "rawResponse": {
    // Resposta bruta completa da API
  }
}
```

---

## 🔄 FLUXO DE TRABALHO RECOMENDADO

### 1. Análise Inicial (Primeira Vez)
```
1. Configurar Stays.net
2. Buscar reserva de hoje
3. Abrir aba "Comparação"
4. Revisar todos os campos
5. Anotar campos importantes não mapeados
6. Exportar análise para documentação
```

### 2. Implementação
```
1. Abrir aba "Mapeamento"
2. Copiar função de mapeamento
3. Adaptar para código do projeto
4. Adicionar campos não mapeados se necessário
5. Testar importação
```

### 3. Validação
```
1. Buscar nova reserva
2. Comparar dados importados vs dados brutos
3. Verificar se tudo foi mapeado corretamente
4. Ajustar se necessário
```

### 4. Manutenção
```
1. Periodicamente verificar se API mudou
2. Buscar reserva recente
3. Ver se há campos novos
4. Atualizar mapeamento se necessário
```

---

## 🛠️ AJUSTES E MELHORIAS

### O que foi Otimizado

**Busca Inteligente:**
```
✅ Tenta múltiplos campos de data
✅ Filtra automaticamente por ontem/hoje
✅ Fallback para primeiras 10 reservas se não achar
```

**Interface Clara:**
```
✅ Cores indicativas (verde = mapeado, amarelo = não)
✅ Badges com estatísticas
✅ Tabs organizadas por tipo de info
```

**Exportação Completa:**
```
✅ Timestamp da análise
✅ Reserva selecionada
✅ Comparação detalhada
✅ Resposta bruta
```

---

## 💡 DICAS PRO

### Dica 1: Use "Ontem" Primeiro
```
Por quê?
- Dados mais estáveis (check-in já aconteceu)
- Menos chance de reserva ser alterada
- Melhor para análise estrutural
```

### Dica 2: Exporte Sempre
```
Por quê?
- Documentação do que API retorna
- Referência para desenvolvedores
- Histórico de mudanças na API
```

### Dica 3: Analise Vários Exemplos
```
Por quê?
- Campos opcionais podem não aparecer sempre
- Ver variações de dados
- Garantir mapeamento robusto
```

### Dica 4: Foque nos Críticos
```
Campos essenciais:
✅ ID da reserva
✅ Hóspede (nome, email, telefone)
✅ Propriedade
✅ Datas (check-in, check-out)
✅ Valor total
✅ Status

Campos opcionais:
⚠️ Preferências do hóspede
⚠️ Notas internas
⚠️ Campos customizados
```

---

## 🧪 TESTES RECOMENDADOS

### Teste 1: Reserva de Hoje
```
1. Clicar [Hoje]
2. Verificar se encontra reservas
3. Selecionar uma
4. Ver campos mapeados
5. ✅ Sucesso se mostrar dados
```

### Teste 2: Reserva de Ontem
```
1. Clicar [Ontem]
2. Verificar se encontra reservas
3. Comparar campos com reserva de hoje
4. ✅ Sucesso se estrutura for igual
```

### Teste 3: Data Específica
```
1. Escolher data com reserva conhecida
2. [Buscar]
3. Verificar se encontra
4. ✅ Sucesso se filtro funcionar
```

### Teste 4: Exportação
```
1. Selecionar reserva
2. [Exportar JSON]
3. Abrir arquivo baixado
4. Verificar estrutura
5. ✅ Sucesso se JSON válido
```

---

## 📊 ESTATÍSTICAS ESPERADAS

### Boa Cobertura de Mapeamento
```
✅ Campos Mapeados: 15-20
⚠️  Não Mapeados: 5-10
📊 Total: 20-30

Percentual: 60-75% mapeado
Status: Bom! Campos principais cobertos
```

### Cobertura Insuficiente
```
✅ Campos Mapeados: 5-10
⚠️  Não Mapeados: 15-20
📊 Total: 20-30

Percentual: 25-40% mapeado
Status: Atenção! Revisar estrutura
```

---

## 🐛 TROUBLESHOOTING

### Problema: "Nenhuma reserva encontrada"

**Causa:** Não há reservas na data buscada

**Solução:**
```
1. Tentar outra data
2. Usar [Buscar] sem filtro de data
3. Verificar se há reservas no sistema Stays.net
4. Conferir configuração da API
```

---

### Problema: "Erro ao buscar reservas"

**Causa:** Credenciais incorretas ou API offline

**Solução:**
```
1. Configurações → Stays.net
2. Testar conexão
3. Verificar URL e credenciais
4. Ver console do navegador (F12)
```

---

### Problema: "Campo de data não detectado"

**Causa:** API usa campo diferente do esperado

**Solução:**
```
1. Ver aba "Dados Brutos"
2. Procurar campo que tem data
3. Anotar nome do campo
4. Reportar para ajustar detecção automática
```

---

## 📝 PRÓXIMOS PASSOS

### Após Análise Completa

**1. Implementar Importação**
```
→ Usar código da aba "Mapeamento"
→ Criar rota no backend
→ Testar com reserva real
```

**2. Decidir sobre Campos Não Mapeados**
```
→ Revisar cada campo amarelo
→ Decidir se é relevante
→ Criar campos no RENDIZY se necessário
```

**3. Documentar Mapeamento**
```
→ Salvar análise exportada
→ Criar documentação interna
→ Compartilhar com equipe
```

**4. Automatizar Sincronização**
```
→ Configurar webhook (se disponível)
→ Ou criar job periódico
→ Importar novas reservas automaticamente
```

---

## ✅ CHECKLIST DE USO

### Primeira Análise
- [ ] Configurar Stays.net nas integrações
- [ ] Abrir analisador
- [ ] Buscar reserva de hoje
- [ ] Ver aba "Comparação"
- [ ] Ver aba "Dados Brutos"
- [ ] Ver aba "Mapeamento"
- [ ] Exportar análise
- [ ] Documentar campos importantes

### Implementação
- [ ] Copiar código de mapeamento
- [ ] Adaptar para backend
- [ ] Testar importação
- [ ] Validar dados importados
- [ ] Ajustar campos faltantes

### Validação
- [ ] Importar nova reserva
- [ ] Comparar com dados brutos
- [ ] Verificar 100% dos campos
- [ ] Corrigir erros se houver
- [ ] ✅ Aprovar para produção

---

## 🎯 CONCLUSÃO

### O Analisador Permite:
```
✅ Ver estrutura real da API Stays.net
✅ Comparar com estrutura do RENDIZY
✅ Identificar campos mapeados e não mapeados
✅ Exportar análise completa
✅ Código pronto para implementação
✅ Tomar decisões informadas sobre integração
```

### Benefícios:
```
✅ Reduz tempo de implementação
✅ Evita erros de mapeamento
✅ Documenta automaticamente
✅ Facilita manutenção futura
✅ Permite análise visual clara
```

---

**Versão:** v1.0.103.22  
**Status:** ✅ IMPLEMENTADO E FUNCIONAL  
**Build:** 20251029-2900  
**Funcionalidade:** Analisador Avançado de Reservas Stays.net  

**PRONTO PARA USO! 🔍**

Acesse: **Configurações → Integrações → Stays.net → Tab "Análise de Reservas"**
