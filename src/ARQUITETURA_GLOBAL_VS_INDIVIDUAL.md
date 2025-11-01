# 🏗️ ARQUITETURA: GLOBAL vs INDIVIDUAL

**Sistema de Herança de Configurações - RENDIZY**

---

## 🎯 CONCEITO FUNDAMENTAL

### **REGRA DE OURO:**

> **SEMPRE que um campo tem opção `[Global]` ou `[Individual]`, significa:**
> 
> - **GLOBAL** = Herda configuração do template/modelo default do sistema
> - **INDIVIDUAL** = Permite customização específica para aquele imóvel/anúncio

---

## 📊 ANÁLISE DAS 3 IMAGENS

### **IMAGEM 1: LISTA DE CONFIGURAÇÕES GLOBAIS/INDIVIDUAIS**

```
┌─────────────────────────────────────────────────┐
│ Descontar valores acima do repasse              │
│ Ative se repasses aceitarão o procedimento     │
│ de ter valores das reservas tira acima do      │
│ valor previsto dos múltiplos das reservas não  │
│ informadas? Saiba mais.                        │
│                                                 │
│ [Global]  [Individual]                         │
│ [Próxim]                                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Pagamentos diretos entre hóspedes e            │
│ proprietários                       [Salvar]    │
│ Define se os bancários desta propriedade       │
│ devem ser exibidos aos hóspedes na ficha da   │
│ reserva. Saiba mais.                           │
│                                                 │
│ Mostrar os dados bancários da propriedade no  │
│ site                                           │
│ [Global]  [Individual]                         │
│ [Próxim]                                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Início da prestação de contas a proprietários  │
│                                       [Salvar]   │
│ A partir de quando a conta deve ser começar a  │
│ partir da data de conclusão da hospedagem.     │
│ Saiba mais.                                    │
│                                                 │
│ [Com conifrdo]  [Com restrição]                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Configure seu repasse de reservas automático   │
│                                       [Salvar]   │
│ Configure se deve ser gerado um repasse quando │
│ há uma reserva confirmada. Saiba mais.         │
│                                                 │
│ [Global]  [Individual]                         │
│ [Próxim]                                       │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Comportamento das taxas durante o repasse      │
│                                       [Salvar]   │
│ Defina como será o comportamento das taxas na │
│ repasse para o proprietário.                   │
│                                                 │
│ Taxa de Limpeza *                              │
│ [Global]  [Individual]                         │
│                                                 │
│ Implantamente instapram                        │
│ [Global]  [Individual]                         │
│ [Próxim]                                       │
└─────────────────────────────────────────────────┘
```

---

### **IMAGEM 2: GERENCIAMENTO DE TAXA (CONFIGURAÇÃO GLOBAL)**

```
┌─────────────────────────────────────────────────┐
│ Gerenciamento de taxa                          │
│ Aplique taxas nos serviços                     │
│ oferecidos.                                    │
│                                                 │
│ ←  Gerenciamento de taxa  Gerenciamento de taxa│
└─────────────────────────────────────────────────┘

SEÇÃO: Configurações gerais

┌─────────────────────────────────────────────────┐
│ Ativo                                          │
│ [Campo pode estar ativo?]                      │
│ [Sim] [dropdown ▾]                            │
│                                                 │
│ Nome                                           │
│ [Tipo da linkeza 1]                           │
│ [Tipo da linkeza 1]                           │
│                                                 │
│ Nome                                           │
│ Nome da taxa que será apresentada aos clientes.│
│ Saiba mais.                                    │
│                                                 │
│ [PT] [EN] [ES]                                │
│ [Tipo da linkeza 1]                           │
│                                                 │
│ Valor por valor                                │
│ [Selecionar ▾]                                │
│                                                 │
│ [Novo modelo ▾] [100 ▾]                       │
│                                                 │
│ À taxa será aplicada no local das despesas?   │
│                                                 │
│ Tem custo aplicado no final das despesas de   │
│ um cliente? Boas como exemplo reservar um     │
│ resultado em aluguel ou hospedagem de repasse?│
│                                                 │
│ [Sim]  [Não]                                  │
│                                                 │
│ A taxa está aplicada no local dos impostos?   │
│                                                 │
│ Essa custo de reservas o pode valor do valor │
│ total de taxa? Vamos como um imposto ou       │
│ créditos de imposto de renda?                 │
│                                                 │
│ [Sim]  [Não]                                  │
│                                                 │
│ Proprietário                                   │
│ Menos 1 BBB's com nome sendo como o problema │
│ de retorno tem pelo valor de repasse ao       │
│ proprietário. As pessoas que serão aplicadas   │
│ em cada dos pagamentos.                       │
│                                                 │
│ [Sim]  [Não]                                  │
└─────────────────────────────────────────────────┘
```

---

### **IMAGEM 3: COMPORTAMENTO DETALHADO (CONTINUAÇÃO)**

```
┌─────────────────────────────────────────────────┐
│ SEÇÃO: Comportamento                           │
│                                                 │
│ Visibilidade                                   │
│ Como a taxa será sendo vista seus sob visível.│
│                                                 │
│ [Mostrar em taxas na hospedagem ▾]            │
│ [Mostrar em taxas em múltiplas características]│
│ [Análise e fases de data atual]               │
│                                                 │
│ Sobre valores das corte reserva sem confirmado│
│ manual ou a segunda de taxa                    │
│                                                 │
│ [Sim]  [Não]                                  │
│                                                 │
│ Processo de pagamento                          │
│ ○ Cobrar dentro a percentagem de taxa         │
│   confirmado de se deverá de taxas             │
│ ○ Não cobrar tanto a datas com informações    │
│   diferentes                                    │
│ ○ Examinar e valor integral de hora em        │
│   diferentes de garantia de taxas             │
│                                                 │
│ Processo de reserva                            │
│ Como é realizado o crédito de reserva durante │
│ informação. Aprovada é comando de imposto?    │
│                                                 │
│ ○ Enviar o mais valor diário com informação   │
│   adicional                                    │
│ ○ Enviar as mais valor diários valor          │
│   informação diretrizes                        │
│ ○ Exigir no mais valor diário                 │
│   informações complementares                   │
│                                                 │
│ SEÇÃO: Contabilidade                           │
│                                                 │
│ Categoria                                      │
│ Para curvos será tipo em quais controle,      │
│ razão ser configurar no plano de contas das.  │
│                                                 │
│ [Receitas - Taxa de software ▾] [+]          │
│                                                 │
│ ⚠ Remove esta taxa                            │
│ Atenção esta taxa é criada com 000 perfil e  │
│ a seu valor confirmada e resultar              │
│                                                 │
│ [Remove]                                       │
└─────────────────────────────────────────────────┘
```

---

## 🔍 CAMPOS IDENTIFICADOS NA TELA DE "GERENCIAMENTO DE TAXA"

### **1. CONFIGURAÇÕES GERAIS:**

```typescript
interface TaxConfiguration {
  // Identificação
  id: string;
  isActive: boolean;
  
  // Nome (multilíngue)
  name: {
    pt: string;
    en: string;
    es: string;
  };
  
  // Valor
  valueType: 'percentage' | 'fixed' | 'per_person' | 'per_night';
  value: number;
  currency?: 'BRL' | 'USD' | 'EUR';
  
  // Comportamento Financeiro
  applyToExpenses: boolean;       // "À taxa será aplicada no local das despesas?"
  applyToTaxes: boolean;          // "A taxa está aplicada no local dos impostos?"
  
  // Repasse ao Proprietário
  deductFromOwnerTransfer: boolean; // "Proprietário - será aplicada em cada dos pagamentos"
}
```

---

### **2. COMPORTAMENTO:**

```typescript
interface TaxBehavior {
  // Visibilidade
  visibility: 
    | 'show_in_accommodation_fees'     // Mostrar em taxas na hospedagem
    | 'show_in_multiple_characteristics' // Mostrar em múltiplas características
    | 'analysis_current_date';          // Análise e fases de data atual
  
  // Cobrança
  chargeWithoutManualConfirmation: boolean;
  
  // Processo de Pagamento (Radio)
  paymentProcess: 
    | 'charge_percentage_on_confirmation'    // Cobrar dentro a percentagem de taxa confirmado
    | 'no_charge_on_different_dates'         // Não cobrar tanto a datas com informações diferentes
    | 'examine_full_value_on_guarantee'      // Examinar e valor integral de hora em diferentes de garantia
  
  // Processo de Reserva (Radio)
  reservationProcess:
    | 'send_daily_value_with_additional_info'   // Enviar o mais valor diário com informação adicional
    | 'send_daily_value_with_guidelines'        // Enviar as mais valor diários valor informação diretrizes
    | 'require_daily_value_complementary_info'  // Exigir no mais valor diário informações complementares
}
```

---

### **3. CONTABILIDADE:**

```typescript
interface TaxAccounting {
  // Categoria contábil
  accountingCategory: string; // Ex: "Receitas - Taxa de software"
  accountingCategoryId: string;
}
```

---

## 🔗 COMO FUNCIONA A HERANÇA GLOBAL → INDIVIDUAL

### **ARQUITETURA:**

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  NÍVEL 1: CATÁLOGO GLOBAL (TEMPLATES)          │
│  /configuracoes/gerenciamento-taxas             │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ Taxa de Limpeza (ID: tax_001)             │ │
│  │ - Valor: R$ 150,00 (fixo)                 │ │
│  │ - Aplica a despesas: Sim                  │ │
│  │ - Aplica a impostos: Não                  │ │
│  │ - Desconta do repasse: Não                │ │
│  │ - Visibilidade: Hospedagem                │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ Taxa de Pet (ID: tax_002)                 │ │
│  │ - Valor: R$ 50,00 por noite               │ │
│  │ - Aplica a despesas: Sim                  │ │
│  │ - Aplica a impostos: Não                  │ │
│  │ - Desconta do repasse: Sim                │ │
│  │ - Visibilidade: Múltiplas                 │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
                        │
                        │ HERANÇA
                        ▼
┌─────────────────────────────────────────────────┐
│                                                 │
│  NÍVEL 2: IMÓVEL INDIVIDUAL                     │
│  /imoveis/edit/:id → Seção Financeiro           │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ Comportamento das taxas durante o repasse │ │
│  │                                           │ │
│  │ Taxa de Limpeza:                         │ │
│  │ ○ [Global] ← HERDA tax_001               │ │
│  │ ● [Individual] ← CUSTOMIZA               │ │
│  │   └─→ R$ 200,00 (este imóvel é maior)   │ │
│  │                                           │ │
│  │ Taxa de Pet:                             │ │
│  │ ● [Global] ← HERDA tax_002               │ │
│  │ ○ [Individual]                           │ │
│  │                                           │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📋 LISTA DE CAMPOS QUE USAM GLOBAL/INDIVIDUAL

### **DA IMAGEM 1 (Seção Financeiro do Imóvel):**

| Campo | Tipo | Herdado De |
|-------|------|------------|
| **Descontar valores acima do repasse** | Global/Individual | Config. Repasse |
| **Pagamentos diretos entre hóspedes e proprietários** | Global/Individual | Config. Pagamento |
| **Início da prestação de contas** | Com confirmação / Com restrição | Config. Contabilidade |
| **Repasse de reservas automático** | Global/Individual | Config. Repasse |
| **Comportamento - Taxa de Limpeza** | Global/Individual | **tax_001** (Catálogo) |
| **Comportamento - Implantamente instapram** | Global/Individual | **tax_xxx** (Catálogo) |

---

### **DA SEÇÃO ANTERIOR (Mapeamento Financeiro):**

| Campo | Tipo | Herdado De |
|-------|------|------------|
| **Modelo de comissão** | Global/Individual | Config. Comissão |
| **Cobrar energia elétrica** | Global/Individual | Config. Utilities |
| **Exibir reservas no calendário** | Global/Individual | Config. Notificações |
| **E-mail pré-reserva (Proprietário)** | Global/Individual | Config. E-mails |
| **E-mail pré-reserva (Agente)** | Global/Individual | Config. E-mails |
| **E-mail reserva confirmada (Proprietário)** | Global/Individual | Config. E-mails |
| **E-mail reserva confirmada (Agente)** | Global/Individual | Config. E-mails |
| **E-mail cancelamento** | Global/Individual | Config. E-mails |
| **E-mail reservas excluídas** | Global/Individual | Config. E-mails |
| **Reservar vínculo antes checkout** | Global/Individual | Config. Checkout |

---

## 🗂️ ESTRUTURA DE DADOS PROPOSTA

### **TABELA: tax_configurations (Catálogo Global)**

```typescript
interface TaxConfigurationGlobal {
  id: string;                    // tax_001, tax_002, etc
  tenantId: string;              // Multi-tenant
  organizationId?: string;
  
  // Identificação
  code: string;                  // cleaning_fee, pet_fee, etc
  isActive: boolean;
  
  // Nome multilíngue
  name: {
    pt: string;
    en: string;
    es: string;
  };
  
  // Tipo e valor
  valueType: 'percentage' | 'fixed' | 'per_person' | 'per_night' | 'per_booking';
  defaultValue: number;
  currency: 'BRL' | 'USD' | 'EUR';
  
  // Comportamento financeiro
  applyToExpenses: boolean;
  applyToTaxes: boolean;
  deductFromOwnerTransfer: boolean;
  
  // Visibilidade
  visibility: 'accommodation_fees' | 'multiple_characteristics' | 'current_date_analysis';
  chargeWithoutManualConfirmation: boolean;
  
  // Processo de pagamento
  paymentProcess: 'charge_on_confirmation' | 'no_charge_different_dates' | 'full_value_on_guarantee';
  
  // Processo de reserva
  reservationProcess: 'daily_with_additional' | 'daily_with_guidelines' | 'daily_complementary';
  
  // Contabilidade
  accountingCategory: string;
  accountingCategoryId: string;
  
  // Metadata
  isSystem: boolean;             // Taxa do sistema (não pode deletar)
  usageCount: number;            // Quantos imóveis usam
  createdAt: string;
  updatedAt: string;
}
```

---

### **ESTRUTURA NO IMÓVEL (Individual Override)**

```typescript
interface PropertyFinancialConfig {
  propertyId: string;
  
  // Taxas: Global ou Individual
  taxes: {
    [taxId: string]: {
      mode: 'global' | 'individual';
      
      // Se mode = 'individual', pode customizar:
      customValue?: number;
      customValueType?: 'percentage' | 'fixed' | 'per_person' | 'per_night';
      customApplyToExpenses?: boolean;
      customDeductFromOwner?: boolean;
      // ... outros overrides
    };
  };
  
  // Exemplo:
  // taxes: {
  //   'tax_001': {  // Taxa de Limpeza
  //     mode: 'individual',
  //     customValue: 200.00  // Override: este imóvel cobra R$ 200
  //   },
  //   'tax_002': {  // Taxa de Pet
  //     mode: 'global'  // Usa o padrão do catálogo
  //   }
  // }
  
  // Outros campos Global/Individual
  commission: {
    mode: 'global' | 'individual';
    customModel?: 'percentage' | 'fixed_monthly';
    customPercentage?: number;
    // ...
  };
  
  electricity: {
    mode: 'global' | 'individual';
    customCharge?: boolean;
    customRate?: number;
    // ...
  };
  
  notifications: {
    ownerPreReservation: 'global' | 'individual';
    agentPreReservation: 'global' | 'individual';
    ownerConfirmed: 'global' | 'individual';
    agentConfirmed: 'global' | 'individual';
    cancellation: 'global' | 'individual';
    deleted: 'global' | 'individual';
    // ...
  };
}
```

---

## 🔄 FLUXO DE TRABALHO

### **CENÁRIO 1: CRIAR NOVA TAXA GLOBAL**

```
1. Admin acessa: /configuracoes/gerenciamento-taxas
2. Clica em "Nova Taxa"
3. Preenche:
   - Nome: "Taxa de Limpeza Premium"
   - Valor: R$ 250,00 (fixo)
   - Aplica a despesas: Sim
   - Desconta do repasse: Não
4. Salva
5. ✅ Agora disponível para TODOS os imóveis como opção [Global]
```

---

### **CENÁRIO 2: USAR TAXA GLOBAL EM IMÓVEL**

```
1. Usuário edita Imóvel #123
2. Vai na seção "Financeiro"
3. Campo "Taxa de Limpeza":
   - ○ Global (R$ 250,00) ← SELECIONA ESTE
   - ○ Individual
4. Salva
5. ✅ Imóvel #123 agora usa taxa global de limpeza
```

---

### **CENÁRIO 3: CUSTOMIZAR TAXA PARA IMÓVEL ESPECÍFICO**

```
1. Usuário edita Imóvel #456 (cobertura duplex)
2. Vai na seção "Financeiro"
3. Campo "Taxa de Limpeza":
   - ○ Global (R$ 250,00)
   - ● Individual ← SELECIONA ESTE
4. Aparece campo customizado:
   - Valor: [R$ 400,00] ← Imóvel maior, cobra mais
5. Salva
6. ✅ Imóvel #456 usa taxa customizada de R$ 400
```

---

## 🧩 CORRELAÇÃO: TAXAS ↔ OUTROS MÓDULOS

### **TAXAS AFETAM:**

```
┌─────────────────────────────────────────────────┐
│ TAXA CONFIGURADA (Catálogo)                    │
│ Ex: Taxa de Limpeza = R$ 150                   │
└─────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  IMÓVEL     │ │  RESERVA    │ │  REPASSE    │
│             │ │             │ │             │
│ Herda taxa  │ │ Aplica taxa │ │ Desconta?   │
│ ou          │ │ ao total    │ │ Sim/Não     │
│ customiza   │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘
```

---

### **EXEMPLO PRÁTICO:**

**Taxa de Limpeza Configurada:**
- Valor: R$ 150,00
- Aplica a despesas: **Sim**
- Desconta do repasse: **Não**

**Imóvel A (usa Global):**
- Taxa de limpeza: R$ 150,00

**Imóvel B (usa Individual):**
- Taxa de limpeza: R$ 200,00 (customizado)

**Reserva no Imóvel A:**
```
Diárias (3 noites): R$ 450,00
Taxa de limpeza:    R$ 150,00
Subtotal:           R$ 600,00
Impostos (5%):      R$ 30,00
TOTAL:              R$ 630,00

Repasse ao proprietário:
Receita:            R$ 600,00
- Comissão (10%):   R$ 60,00
- Taxa limpeza:     R$ 0,00 (não desconta)
= Repasse:          R$ 540,00
```

**Reserva no Imóvel B:**
```
Diárias (3 noites): R$ 450,00
Taxa de limpeza:    R$ 200,00 ← CUSTOMIZADA
Subtotal:           R$ 650,00
Impostos (5%):      R$ 32,50
TOTAL:              R$ 682,50

Repasse ao proprietário:
Receita:            R$ 650,00
- Comissão (10%):   R$ 65,00
- Taxa limpeza:     R$ 0,00 (não desconta)
= Repasse:          R$ 585,00
```

---

## 📊 CAMPOS QUE PRECISAM DE CATÁLOGO GLOBAL

### **IDENTIFICADOS ATÉ AGORA:**

| Campo | Catálogo/Config | Permite Individual? |
|-------|----------------|---------------------|
| **Taxa de Limpeza** | ✅ `/configuracoes/taxas` | ✅ Sim |
| **Taxa de Pet** | ✅ `/configuracoes/taxas` | ✅ Sim |
| **Taxa de Hóspede Extra** | ✅ `/configuracoes/taxas` | ✅ Sim |
| **Taxa de Check-in Antecipado** | ✅ `/configuracoes/taxas` | ✅ Sim |
| **Taxa de Check-out Tardio** | ✅ `/configuracoes/taxas` | ✅ Sim |
| **Modelo de Comissão** | ✅ `/configuracoes/comissoes` | ✅ Sim |
| **Política de Cancelamento** | ✅ `/configuracoes/cancelamento` | ✅ Sim |
| **Regras de Energia** | ✅ `/configuracoes/utilities` | ✅ Sim |
| **Templates de E-mail** | ✅ `/configuracoes/emails` | ✅ Sim |
| **Tipo de Propriedade** | ✅ Já existe! | ❌ Não (apenas seleção) |
| **Tipo de Anúncio** | ✅ Já existe! | ❌ Não (apenas seleção) |
| **Amenidades** | ✅ Já existe! | ❌ Não (apenas seleção) |

---

## 🎯 TELAS QUE PRECISAM SER CRIADAS

### **MÓDULO: CONFIGURAÇÕES GLOBAIS**

```
/configuracoes
├── /tipos-propriedades          ✅ JÁ EXISTE
├── /tipos-anuncios              ✅ JÁ EXISTE
├── /amenidades                  ✅ JÁ EXISTE
│
├── /taxas                       ❌ FALTA CRIAR
│   ├── Lista de taxas
│   ├── Criar/Editar taxa
│   └── Comportamento padrão
│
├── /comissoes                   ❌ FALTA CRIAR
│   ├── Modelos de comissão
│   ├── Percentuais padrão
│   └── Regras de cálculo
│
├── /cancelamento                ❌ FALTA CRIAR
│   ├── Políticas disponíveis
│   ├── Prazos e penalidades
│   └── Regras de reembolso
│
├── /utilities                   ❌ FALTA CRIAR
│   ├── Energia elétrica
│   ├── Água
│   └── Gás
│
├── /emails                      ❌ FALTA CRIAR
│   ├── Templates
│   ├── Destinatários
│   └── Triggers
│
└── /repasses                    ❌ FALTA CRIAR
    ├── Regras de cálculo
    ├── Prazos
    └── Descontos
```

---

## 🔍 DETALHAMENTO: TELA "GERENCIAMENTO DE TAXA"

### **ESTRUTURA DA INTERFACE:**

```
┌─────────────────────────────────────────────────┐
│ ← Voltar   Gerenciamento de taxa               │
│                                                 │
│ ┌─────────────────────────────────────────┐   │
│ │ CONFIGURAÇÕES GERAIS                    │   │
│ │                                         │   │
│ │ Ativo:                                  │   │
│ │ [● Sim  ○ Não]                         │   │
│ │                                         │   │
│ │ Código:                                 │   │
│ │ [cleaning_fee________]                 │   │
│ │                                         │   │
│ │ Nome (multilíngue):                    │   │
│ │ [PT] Taxa de Limpeza                   │   │
│ │ [EN] Cleaning Fee                      │   │
│ │ [ES] Tarifa de Limpieza                │   │
│ │                                         │   │
│ │ Tipo de valor:                         │   │
│ │ [Fixo ▾]                               │   │
│ │  - Fixo                                │   │
│ │  - Percentual                          │   │
│ │  - Por pessoa                          │   │
│ │  - Por noite                           │   │
│ │  - Por reserva                         │   │
│ │                                         │   │
│ │ Valor padrão:                          │   │
│ │ [R$] [150.00_____]                     │   │
│ │                                         │   │
│ │ ☑ Aplicar a despesas                   │   │
│ │ ☐ Aplicar a impostos                   │   │
│ │ ☐ Descontar do repasse ao proprietário │   │
│ │                                         │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ ┌─────────────────────────────────────────┐   │
│ │ COMPORTAMENTO                           │   │
│ │                                         │   │
│ │ Visibilidade:                          │   │
│ │ [Hospedagem ▾]                         │   │
│ │  - Taxas de hospedagem                 │   │
│ │  - Múltiplas características           │   │
│ │  - Análise de data atual               │   │
│ │                                         │   │
│ │ Cobrar sem confirmação manual:         │   │
│ │ [● Sim  ○ Não]                         │   │
│ │                                         │   │
│ │ Processo de pagamento:                 │   │
│ │ ● Cobrar % na confirmação              │   │
│ │ ○ Não cobrar em datas diferentes       │   │
│ │ ○ Valor integral na garantia           │   │
│ │                                         │   │
│ │ Processo de reserva:                   │   │
│ │ ● Valor diário + informação adicional  │   │
│ │ ○ Valor diário + diretrizes            │   │
│ │ ○ Valor diário + info complementar     │   │
│ │                                         │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ ┌─────────────────────────────────────────┐   │
│ │ CONTABILIDADE                           │   │
│ │                                         │   │
│ │ Categoria contábil:                    │   │
│ │ [Receitas - Taxas ▾]                   │   │
│ │                                         │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ [Cancelar]                    [Salvar Taxa]   │
└─────────────────────────────────────────────────┘
```

---

## ✅ CONCLUSÃO DO APRENDIZADO

### **ENTENDI QUE:**

1. ✅ **Sistema de herança** Global → Individual é FUNDAMENTAL
2. ✅ **Taxas** são configuradas em um **catálogo separado** (`/configuracoes/taxas`)
3. ✅ Cada taxa tem **comportamento detalhado** (despesas, impostos, repasse)
4. ✅ **Imóveis individuais** podem **herdar** (Global) ou **customizar** (Individual)
5. ✅ **10+ campos** na seção Financeiro usam esse padrão
6. ✅ Preciso criar **5 novas telas de configuração** (Taxas, Comissões, Cancelamento, Utilities, E-mails)

---

### **PRÓXIMOS PASSOS (QUANDO VOCÊ APROVAR):**

1. ⏳ Continuar analisando outras telas do Financeiro
2. ⏳ Mapear TODAS as configurações globais necessárias
3. ⏳ Criar estrutura de dados completa
4. ⏳ Implementar backend para catálogos
5. ⏳ Implementar frontend para configurações globais
6. ⏳ Implementar frontend para seleção Global/Individual no wizard

---

**AGUARDANDO MAIS TELAS PARA CONTINUAR O APRENDIZADO!** 📚

Pode enviar mais prints? Quero entender TUDO antes de implementar! 🎯
