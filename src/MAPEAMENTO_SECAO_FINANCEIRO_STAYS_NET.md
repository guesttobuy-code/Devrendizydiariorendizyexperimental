# 📊 MAPEAMENTO COMPLETO - SEÇÃO FINANCEIRO STAYS.NET

**Análise Visual das 3 Telas Fornecidas**

---

## 🖼️ TELA 1 - RESPONSÁVEL + TIPO DE CONTRATO + INÍCIO DURAÇÃO

### **SEÇÃO 1: RESPONSÁVEL**

```
┌─────────────────────────────────────────────────┐
│ Responsável                          [Salvar]   │
│ Define o proprietário do anúncio e o responsável│
│ pelo atendimento dele.                          │
│ Sobre proprietários - Saiba mais.              │
│ Sobre gestores de proprietários - Saiba mais.  │
├─────────────────────────────────────────────────┤
│ Proprietário:                                   │
│ [👤] [Celso Henrique Teixeira       ▾] [>]     │
│                                                 │
│ Gestor do proprietário:                        │
│ [👤] [Não selecionado                ▾]        │
└─────────────────────────────────────────────────┘
```

**Campos:**
- **Proprietário** (OBRIGATÓRIO)
  - Tipo: Dropdown/Select
  - Ícone: 👤
  - Valor atual: "Celso Henrique Teixeira"
  - Ação: [>] (seta para mais opções)
  
- **Gestor do proprietário** (OPCIONAL)
  - Tipo: Dropdown/Select
  - Ícone: 👤
  - Valor padrão: "Não selecionado"

**Links de ajuda:**
- "Sobre proprietários - Saiba mais."
- "Sobre gestores de proprietários - Saiba mais."

---

### **SEÇÃO 2: TIPO DE CONTRATO**

```
┌─────────────────────────────────────────────────┐
│ Tipo de contrato                     [Salvar]   │
│ Informe qual é a sua relação contratual com o   │
│ proprietário do anúncio.                        │
├─────────────────────────────────────────────────┤
│ Registrado em                                   │
│ Quando a acomodação foi registrada em seu       │
│ negócio?                                        │
│ Esse campo é informativo e você pode se        │
│ orientar por ele quando for puxar relatórios   │
│ no sistema.                                     │
│                                                 │
│ [📅] 03 fev 2023                               │
│                                                 │
│ Sublocação                                     │
│ Essa informação é importante para filtros da   │
│ rotina de reservas, pois essas acomodações     │
│ costumam ter prioridade na hora de fazer       │
│ propostas de reservas. Saiba mais.             │
│                                                 │
│ [Sim]  [Não]                                   │
│                                                 │
│ Exclusivo                                      │
│ Marque [Sim] caso a acomodação seja           │
│ comercializada apenas pelo seu negócio. Isso   │
│ será útil para encontrar seus anúncios        │
│ exclusivos de forma mais fácil na rotina de   │
│ reservas e estatísticas. Saiba mais.          │
│                                                 │
│ [Sim]  [Não]                                   │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Registrado em**
   - Tipo: Date Picker
   - Ícone: 📅
   - Valor: "03 fev 2023"
   - Descrição: "Quando a acomodação foi registrada em seu negócio? Esse campo é informativo e você pode se orientar por ele quando for puxar relatórios no sistema."

2. **Sublocação**
   - Tipo: Toggle Button (Sim/Não)
   - Valores: ["Sim", "Não"]
   - Descrição: "Essa informação é importante para filtros da rotina de reservas, pois essas acomodações costumam ter prioridade na hora de fazer propostas de reservas."
   - Link: "Saiba mais."

3. **Exclusivo**
   - Tipo: Toggle Button (Sim/Não)
   - Valores: ["Sim", "Não"]
   - Descrição: "Marque [Sim] caso a acomodação seja comercializada apenas pelo seu negócio. Isso será útil para encontrar seus anúncios exclusivos de forma mais fácil na rotina de reservas e estatísticas."
   - Link: "Saiba mais."

---

### **SEÇÃO 3: DURAÇÃO DO CONTRATO (INÍCIO)**

```
┌─────────────────────────────────────────────────┐
│ Duração do contrato                  [Salvar]   │
│ Configure padrões do contrato de parceria com o │
│ proprietário do anúncio.                        │
└─────────────────────────────────────────────────┘
```

---

## 🖼️ TELA 2 - DURAÇÃO DO CONTRATO + COMISSÃO + OUTRAS OPÇÕES

### **SEÇÃO 3: DURAÇÃO DO CONTRATO (CONTINUAÇÃO)**

```
┌─────────────────────────────────────────────────┐
│ Duração do contrato                  [Salvar]   │
│ Configure padrões do contrato de parceria com o │
│ proprietário do anúncio.                        │
├─────────────────────────────────────────────────┤
│ De / até                                        │
│ [📅] De - até                                   │
│                                                 │
│ Deixe bloqueada ou calendário do anúncio após  │
│ o fim do contrato?                             │
│ Ao inserir a data final de um contrato com o   │
│ proprietário, o sistema irá bloquear           │
│ automaticamente as datas do fim do contrato    │
│ em diante. Saiba mais.                         │
│                                                 │
│ [Sim]  [Não]                                   │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **De / até**
   - Tipo: Date Range Picker
   - Ícone: 📅
   - Formato: "De - até"
   - Permite definir período do contrato

2. **Deixe bloqueada ou calendário do anúncio após o fim do contrato?**
   - Tipo: Toggle Button (Sim/Não)
   - Valores: ["Sim", "Não"]
   - Descrição: "Ao inserir a data final de um contrato com o proprietário, o sistema irá bloquear automaticamente as datas do fim do contrato em diante."
   - Link: "Saiba mais."

---

### **SEÇÃO 4: COMO É SUA COMISSÃO EM RELAÇÃO ÀS RESERVAS?**

```
┌─────────────────────────────────────────────────┐
│ Como é sua comissão em relação às reservas?     │
│                                       [Salvar]   │
│ Define as condições do modelo de comissões.    │
├─────────────────────────────────────────────────┤
│ Modelo de comissão                             │
│ Como a taxa comissão vai reservar sua         │
│ acomodação?                                    │
│                                                 │
│ [Global]  [Individual]                         │
│                                                 │
│ Modelo de negócio                              │
│ Como o seu tipo de sua comissão?              │
│                                                 │
│ [Comissionado sob %              ▾]            │
│                                                 │
│ Comissão padrão                                │
│ [%] [0                                    ]    │
│                                                 │
│ ⚪ Ou uso da fonte da hospedagem               │
│ ⚪ Ou uso total das diárias                    │
│ 🔘 Ou uso das diárias brutas                   │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Modelo de comissão**
   - Tipo: Toggle Button (Global/Individual)
   - Valores: ["Global", "Individual"]
   - Descrição: "Como a taxa comissão vai reservar sua acomodação?"

2. **Modelo de negócio**
   - Tipo: Dropdown/Select
   - Opções detectadas:
     - "Comissionado sob %"
     - (Provavelmente) "Fixo mensal"
   - Descrição: "Como o seu tipo de sua comissão?"

3. **Comissão padrão**
   - Tipo: Number Input
   - Prefixo: % (percentual)
   - Valor padrão: 0

4. **Base de cálculo da comissão** (Radio Group)
   - Tipo: Radio buttons
   - Opções:
     - ⚪ "Ou uso da fonte da hospedagem"
     - ⚪ "Ou uso total das diárias"
     - 🔘 "Ou uso das diárias brutas" (SELECIONADO)

---

### **SEÇÃO 5: DESEJA CONSIDERAR A COMISSÕES DAS CANAIS?**

```
┌─────────────────────────────────────────────────┐
│ Deseja considerar a comissões das canais?      │
│                                       [Salvar]   │
│ Ao operar com integrações, o sistema pode     │
│ considerar os valores das comissões dos canais │
│ no cálculo do repasse.                         │
│                                                 │
│ [Sim]  [Não]                                   │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Considerar comissões dos canais**
   - Tipo: Toggle Button (Sim/Não)
   - Valores: ["Sim", "Não"]
   - Descrição: "Ao operar com integrações, o sistema pode considerar os valores das comissões dos canais no cálculo do repasse."

---

### **SEÇÃO 6: DESCONTAR DAS COMISSÕES DAS CANAIS ANTES DE CALCULAR O REPASSE?**

```
┌─────────────────────────────────────────────────┐
│ Descontar das comissões das canais antes de    │
│ calcular o repasse?                  [Salvar]   │
│ O que deseja fazer após as taxas das comissões │
│ dos canais no cálculo do repasse do           │
│ proprietário?                    Saiba mais.   │
│                                                 │
│ [Sim]  [Não]                                   │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Descontar comissões dos canais**
   - Tipo: Toggle Button (Sim/Não)
   - Valores: ["Sim", "Não"]
   - Descrição: "O que deseja fazer após as taxas das comissões dos canais no cálculo do repasse do proprietário?"
   - Link: "Saiba mais."

---

### **SEÇÃO 7: PERMITIR QUE UM REPASSE SEJA EXCLUSIVO PARA O BALANÇO?**

```
┌─────────────────────────────────────────────────┐
│ Permitir que um repasse seja exclusivo para o  │
│ balanço?                             [Salvar]   │
│ Deseja ativar essa funcionalidade? [?]         │
│ que seja excluído após impresso. Não será      │
│ copiado para exclusão do repasse do           │
│ proprietário do anúncio.                       │
│                                                 │
│ [Sim]  [Não]                                   │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Repasse exclusivo para balanço**
   - Tipo: Toggle Button (Sim/Não)
   - Valores: ["Sim", "Não"]
   - Descrição: "Deseja ativar essa funcionalidade? [?] que seja excluído após impresso. Não será copiado para exclusão do repasse do proprietário do anúncio."
   - Tooltip: [?]

---

### **SEÇÃO 8: COBRAR CONSUMO DE ENERGIA ELÉTRICA**

```
┌─────────────────────────────────────────────────┐
│ Cobrar consumo de energia elétrica   [Salvar]   │
│ Ao habilitar uma unidade de cobrança, um       │
│ Emolgatado novo caso consumo informação        │
│ adicional que será para cada reserva dessa     │
│ acomodação.                                     │
│                                                 │
│ [Global]  [Individual]                         │
│                                                 │
│ [Passar]                                       │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Cobrar consumo de energia elétrica**
   - Tipo: Toggle Button (Global/Individual)
   - Valores: ["Global", "Individual"]
   - Descrição: "Ao habilitar uma unidade de cobrança, um Emolgatado novo caso consumo informação adicional que será para cada reserva dessa acomodação."
   - Botão: [Passar]

---

## 🖼️ TELA 3 - INFORMAÇÕES E COMUNICAÇÕES

### **SEÇÃO 9: INFORMAÇÕES E COMUNICAÇÕES**

```
┌─────────────────────────────────────────────────┐
│ Informações e comunicações           [Salvar]   │
│ Define suas preferências de notificações.      │
└─────────────────────────────────────────────────┘
```

---

### **SUBSEÇÃO: E-MAILS DE RESERVA NO CALENDÁRIO**

```
┌─────────────────────────────────────────────────┐
│ Exibir reservas no calendário da software do   │
│ proprietário, mesmo sem ter precisão de contas │
│ listada?                             [Salvar]   │
│ [não há texto de descrição visível]            │
│                                                 │
│ [Global]  [Individual]                         │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Exibir reservas no calendário do proprietário**
   - Tipo: Toggle Button (Global/Individual)
   - Valores: ["Global", "Individual"]
   - Descrição: Questão sobre exibir reservas mesmo sem contas listadas

---

### **SUBSEÇÃO: E-MAILS DE PRÉ-RESERVA**

```
┌─────────────────────────────────────────────────┐
│ Proprietário: e-mail de pré-reserva  [Salvar]   │
│ O proprietário deve ser notificado quando      │
│ houver uma pré-reserva?                        │
│                                                 │
│ [Global]  [Individual]                         │
│ [Passar]                                       │
│                                                 │
│ Agente: e-mail de pré-reserva       [Salvar]   │
│ Seu agente deve ser notificado quando houver   │
│ uma pré-reserva?                               │
│                                                 │
│ [Global]  [Individual]                         │
│ [Passar]                                       │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Proprietário: e-mail de pré-reserva**
   - Tipo: Toggle Button (Global/Individual)
   - Valores: ["Global", "Individual"]
   - Descrição: "O proprietário deve ser notificado quando houver uma pré-reserva?"
   - Botão: [Passar]

2. **Agente: e-mail de pré-reserva**
   - Tipo: Toggle Button (Global/Individual)
   - Valores: ["Global", "Individual"]
   - Descrição: "Seu agente deve ser notificado quando houver uma pré-reserva?"
   - Botão: [Passar]

---

### **SUBSEÇÃO: E-MAILS DE RESERVA CONFIRMADA**

```
┌─────────────────────────────────────────────────┐
│ Proprietário: e-mail de reserva confirmada     │
│                                       [Salvar]   │
│ O proprietário deve ser notificado quando uma  │
│ reserva for finalizada com uma reserva de uma  │
│ reserva confirmada? Saiba mais.                │
│                                                 │
│ [Global]  [Individual]                         │
│ [Passar]                                       │
│                                                 │
│ Agente: e-mail de reserva confirmada [Salvar]   │
│ Seu agente deve ser notificado quando houver   │
│ uma reserva confirmada?                        │
│                                                 │
│ [Global]  [Individual]                         │
│ [Passar]                                       │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Proprietário: e-mail de reserva confirmada**
   - Tipo: Toggle Button (Global/Individual)
   - Valores: ["Global", "Individual"]
   - Descrição: "O proprietário deve ser notificado quando uma reserva for finalizada com uma reserva de uma reserva confirmada?"
   - Link: "Saiba mais."
   - Botão: [Passar]

2. **Agente: e-mail de reserva confirmada**
   - Tipo: Toggle Button (Global/Individual)
   - Valores: ["Global", "Individual"]
   - Descrição: "Seu agente deve ser notificado quando houver uma reserva confirmada?"
   - Botão: [Passar]

---

### **SUBSEÇÃO: E-MAILS DE CANCELAMENTO**

```
┌─────────────────────────────────────────────────┐
│ Hóspedes e proprietários: e-mail de            │
│ cancelamento                         [Salvar]   │
│ Seus hóspedes e proprietários devem ser        │
│ notificados quando houver uma reserva          │
│ cancelada? Saiba mais.                         │
│                                                 │
│ [Global]  [Individual]                         │
│ [Passar]                                       │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Hóspedes e proprietários: e-mail de cancelamento**
   - Tipo: Toggle Button (Global/Individual)
   - Valores: ["Global", "Individual"]
   - Descrição: "Seus hóspedes e proprietários devem ser notificados quando houver uma reserva cancelada?"
   - Link: "Saiba mais."
   - Botão: [Passar]

---

### **SUBSEÇÃO: E-MAILS DE RESERVAS EXCLUÍDAS**

```
┌─────────────────────────────────────────────────┐
│ Hóspedes e proprietários: e-mail de reservas   │
│ excluídas                            [Salvar]   │
│ Seus hóspedes e proprietários devem ser        │
│ notificados quando uma reserva exclusão [sic]  │
│ da sua software? Isso não podia para enviar    │
│ uma confirmação de exclusão. Saiba mais.       │
│                                                 │
│ [Global]  [Individual]                         │
│ [Passar]                                       │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Hóspedes e proprietários: e-mail de reservas excluídas**
   - Tipo: Toggle Button (Global/Individual)
   - Valores: ["Global", "Individual"]
   - Descrição: "Seus hóspedes e proprietários devem ser notificados quando uma reserva exclusão da sua software? Isso não podia para enviar uma confirmação de exclusão."
   - Link: "Saiba mais."
   - Botão: [Passar]

---

### **SUBSEÇÃO: RESERVAR VÍNCULO ANTES DO CHECKOUT**

```
┌─────────────────────────────────────────────────┐
│ Reservar vínculo antes do checkout   [Salvar]   │
│                                                 │
│ [Global]  [Individual]                         │
└─────────────────────────────────────────────────┘
```

**Campos:**

1. **Reservar vínculo antes do checkout**
   - Tipo: Toggle Button (Global/Individual)
   - Valores: ["Global", "Individual"]
   - Descrição: [não visível na imagem]

---

## 📊 RESUMO ESTATÍSTICO

### **CONTAGEM DE CAMPOS POR TIPO:**

| Tipo de Campo | Quantidade | Exemplos |
|---------------|-----------|----------|
| **Toggle (Sim/Não)** | 6 | Sublocação, Exclusivo, Bloquear calendário, etc |
| **Toggle (Global/Individual)** | 10 | Modelo de comissão, E-mails, Energia elétrica, etc |
| **Dropdown/Select** | 3 | Proprietário, Gestor, Modelo de negócio |
| **Date Picker** | 1 | Registrado em |
| **Date Range Picker** | 1 | De / até (duração contrato) |
| **Number Input** | 1 | Comissão padrão (%) |
| **Radio Group** | 1 | Base de cálculo (3 opções) |
| **TOTAL CAMPOS** | **23** | - |

---

### **CONTAGEM DE SEÇÕES:**

| # | Seção | Campos |
|---|-------|--------|
| 1 | Responsável | 2 |
| 2 | Tipo de contrato | 3 |
| 3 | Duração do contrato | 2 |
| 4 | Comissão em relação às reservas | 4 |
| 5 | Considerar comissões dos canais | 1 |
| 6 | Descontar comissões dos canais | 1 |
| 7 | Repasse exclusivo para balanço | 1 |
| 8 | Cobrar energia elétrica | 1 |
| 9 | Informações e comunicações | 8 |
| **TOTAL** | **9 seções** | **23 campos** |

---

## 🎨 PADRÕES DE UI IDENTIFICADOS

### **1. ESTRUTURA DE SEÇÃO:**

```
┌─────────────────────────────────────────────────┐
│ [TÍTULO DA SEÇÃO]                    [Salvar]   │  ← Header com botão Salvar à direita
│ [Descrição explicativa da seção]               │  ← Subtítulo/descrição
│ [Links "Saiba mais" quando aplicável]          │  ← Links de ajuda
├─────────────────────────────────────────────────┤
│ [Label do campo]                               │  ← Label do campo
│ [Descrição/help text do campo]                 │  ← Texto de ajuda
│                                                 │
│ [CAMPO DE INPUT]                               │  ← Input/controle
└─────────────────────────────────────────────────┘
```

---

### **2. BOTÕES TOGGLE (2 ESTILOS):**

**Estilo A: Sim/Não**
```
┌─────┐ ┌─────┐
│ Sim │ │ Não │
└─────┘ └─────┘
```

**Estilo B: Global/Individual**
```
┌────────┐ ┌────────────┐
│ Global │ │ Individual │
└────────┘ └────────────┘
```

---

### **3. CAMPOS COM ÍCONE:**

```
[📅] 03 fev 2023        ← Date picker
[👤] [Nome        ▾]    ← Dropdown com ícone de pessoa
[%] [0            ]     ← Number input com prefixo %
```

---

### **4. RADIO BUTTONS:**

```
⚪ Opção não selecionada
🔘 Opção selecionada
```

---

### **5. BOTÃO "PASSAR":**

```
┌────────┐
│ Passar │  ← Botão secundário/link
└────────┘
```

Aparece em campos de configuração de e-mails, provavelmente para "pular" ou "ignorar" a configuração.

---

## 🔗 RELACIONAMENTOS ENTRE CAMPOS

### **HIERARQUIA DETECTADA:**

```
FINANCEIRO (SEÇÃO PRINCIPAL)
├── 1. RESPONSÁVEL
│   ├── Proprietário (obrigatório)
│   └── Gestor do proprietário (opcional)
│
├── 2. TIPO DE CONTRATO
│   ├── Registrado em (data informativa)
│   ├── Sublocação (Sim/Não)
│   └── Exclusivo (Sim/Não)
│
├── 3. DURAÇÃO DO CONTRATO
│   ├── De / até (date range)
│   └── Bloquear calendário após fim? (Sim/Não)
│
├── 4. COMISSÃO
│   ├── Modelo (Global/Individual)
│   ├── Tipo (Dropdown)
│   ├── Percentual (%)
│   ├── Base de cálculo (Radio)
│   ├── Considerar comissões canais? (Sim/Não)
│   ├── Descontar comissões canais? (Sim/Não)
│   └── Repasse exclusivo? (Sim/Não)
│
├── 5. ENERGIA ELÉTRICA
│   └── Cobrar? (Global/Individual)
│
└── 6. INFORMAÇÕES E COMUNICAÇÕES
    ├── Exibir reservas no calendário (Global/Individual)
    ├── E-mails de pré-reserva
    │   ├── Proprietário (Global/Individual)
    │   └── Agente (Global/Individual)
    ├── E-mails de reserva confirmada
    │   ├── Proprietário (Global/Individual)
    │   └── Agente (Global/Individual)
    ├── E-mail de cancelamento (Global/Individual)
    ├── E-mail de reservas excluídas (Global/Individual)
    └── Reservar vínculo antes checkout (Global/Individual)
```

---

## 🧩 DEPENDÊNCIAS CONDICIONAIS

### **DETECTADAS:**

1. **Duração do contrato → Bloquear calendário**
   - Campo "Bloquear calendário após fim" só faz sentido se houver data final definida

2. **Modelo de comissão → Campos relacionados**
   - Se "Modelo de comissão" = "Comissionado sob %":
     - Campo "Comissão padrão (%)" fica visível
     - Radio group de base de cálculo fica visível
   - Se "Modelo de comissão" = "Fixo mensal":
     - Provavelmente campos diferentes aparecem

3. **Considerar comissões canais → Descontar comissões**
   - Se "Considerar comissões dos canais" = Não:
     - Campo "Descontar comissões dos canais" fica desabilitado

4. **Global vs Individual**
   - Quando "Global" é selecionado:
     - Valor herdado de configuração global
     - Campo [Passar] permite pular configuração
   - Quando "Individual" é selecionado:
     - Permite configuração específica deste anúncio

---

## 📝 OBSERVAÇÕES IMPORTANTES

### **1. CAMPOS "GLOBAL vs INDIVIDUAL":**

Este padrão aparece **10 vezes** e é fundamental:

- **GLOBAL** = Herda configuração geral do sistema/organização
- **INDIVIDUAL** = Permite configuração específica para este anúncio

**Exemplos onde aparece:**
- Modelo de comissão
- Cobrar energia elétrica
- Todas as notificações por e-mail (8 campos)

---

### **2. BOTÃO "PASSAR":**

Aparece junto com campos "Global/Individual" e provavelmente significa:

- Pular/ignorar configuração individual
- Manter valor padrão global
- Não aplicar configuração específica

---

### **3. LINKS "SAIBA MAIS":**

Aparecem em vários campos como tooltips/help:

- Sublocação
- Exclusivo
- Bloquear calendário após fim
- Descontar comissões dos canais
- E-mails de reserva confirmada
- E-mails de cancelamento
- E-mails de reservas excluídas

Provavelmente abrem modais/tooltips com mais informações.

---

### **4. BOTÃO "SALVAR":**

Cada seção tem seu próprio botão "Salvar" no canto superior direito.

Isso indica **salvamento incremental por seção**, não um salvamento geral.

---

### **5. ÍCONES UTILIZADOS:**

| Ícone | Campo |
|-------|-------|
| 📅 | Date picker / Date range |
| 👤 | Dropdown de pessoas (Proprietário, Gestor) |
| % | Input de percentual |
| [?] | Tooltip/help |

---

## 🎯 CAMPOS NÃO PRESENTES NO BACKEND ATUAL

Comparando com `/CHANGELOG_v1.0.103.114_CAMPOS_FINANCEIROS_STAYS_NET.md`:

### **CAMPOS FALTANDO:**

```typescript
// ===================================================================
// NOVOS CAMPOS NECESSÁRIOS (NÃO MAPEADOS AINDA)
// ===================================================================

ownership?: {
  // Responsável
  ownerId: string;           // Proprietário (obrigatório)
  managerId?: string;        // Gestor do proprietário (opcional)
};

contractInfo?: {
  // Tipo de contrato
  registeredDate: string;    // Data de registro (informativo)
  isSublet: boolean;         // Sublocação
  isExclusive: boolean;      // Exclusivo
  
  // Duração do contrato
  startDate?: string;        // Data início
  endDate?: string;          // Data fim
  blockCalendarAfterEnd?: boolean; // Bloquear calendário após fim
};

commission?: {
  // Comissão
  model: 'global' | 'individual';        // Modelo
  type: 'percentage' | 'fixed_monthly';  // Tipo de negócio
  percentage?: number;                   // Percentual (%)
  calculationBase: 'accommodation_source' | 'total_daily' | 'gross_daily'; // Base de cálculo
  considerChannelFees: boolean;          // Considerar comissões canais
  deductChannelFees: boolean;            // Descontar comissões canais
  allowExclusiveTransfer: boolean;       // Repasse exclusivo para balanço
};

utilities?: {
  // Energia elétrica
  chargeElectricity: 'global' | 'individual';
};

notifications?: {
  // Informações e comunicações
  showReservationsInOwnerCalendar: 'global' | 'individual';
  
  // E-mails
  ownerPreReservationEmail: 'global' | 'individual';
  agentPreReservationEmail: 'global' | 'individual';
  ownerConfirmedReservationEmail: 'global' | 'individual';
  agentConfirmedReservationEmail: 'global' | 'individual';
  cancellationEmail: 'global' | 'individual';
  deletedReservationEmail: 'global' | 'individual';
  
  // Outras
  reserveLinkBeforeCheckout: 'global' | 'individual';
};
```

---

## 🔄 COMPARAÇÃO: BACKEND ATUAL vs STAYS.NET

### **JÁ MAPEADOS NO BACKEND (v1.0.103.114):**

| Campo Backend | Campo Stays.net | Status |
|---------------|-----------------|--------|
| `contractType` | Tipo de contrato (implícito) | ✅ Parcial |
| `contractDuration` + `contractDurationUnit` | De / até | ✅ Parcial |
| - | Proprietário | ❌ FALTA |
| - | Gestor | ❌ FALTA |
| - | Registrado em | ❌ FALTA |
| - | Sublocação | ❌ FALTA |
| - | Exclusivo | ❌ FALTA |
| - | Modelo de comissão | ❌ FALTA |
| - | Tipo de negócio | ❌ FALTA |
| - | Comissão padrão (%) | ❌ FALTA |
| - | Base de cálculo | ❌ FALTA |
| - | Considerar comissões canais | ❌ FALTA |
| - | Descontar comissões canais | ❌ FALTA |
| - | Repasse exclusivo | ❌ FALTA |
| - | Cobrar energia | ❌ FALTA |
| - | 8 campos de notificações | ❌ FALTA |

---

## ✅ CONCLUSÃO DO MAPEAMENTO

### **ESTATÍSTICAS FINAIS:**

- **Total de seções:** 9
- **Total de campos:** 23
- **Campos já mapeados:** ~2 (10%)
- **Campos faltando:** ~21 (90%)

### **COMPLEXIDADE:**

- **Baixa:** 8 campos (toggles simples)
- **Média:** 10 campos (toggles com lógica global/individual)
- **Alta:** 5 campos (dropdowns, date ranges, radio groups)

---

## 🚀 PRÓXIMO PASSO

Aguardando suas instruções para:

1. ✅ Analisar mais telas (se houver)
2. 🔄 Criar interface frontend baseada neste mapeamento
3. 🔧 Atualizar backend com campos faltantes

---

**MAPEAMENTO COMPLETO v1.0**  
**Data:** 2025-10-30  
**Status:** ✅ PRONTO PARA IMPLEMENTAÇÃO
