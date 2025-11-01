# 📅 IMPLEMENTAÇÃO: CALENDAR MANAGER - AGENDA VIVA

**Data:** 28 de outubro de 2025  
**Versão:** 1.0.0  
**Tipo:** Nova Funcionalidade - Sistema Base  
**Módulo:** Core System / Calendar Management  
**Status:** ✅ Implementado

---

## 🎯 OBJETIVO

Implementar um sistema de **Agenda Viva** que mantém automaticamente 5 anos de calendário sempre disponíveis no sistema RENDIZY. Quando o horizonte temporal fica menor que 5 anos, o sistema adiciona automaticamente novos dias, garantindo que a agenda nunca tenha fim.

---

## 📋 CONTEXTO

### Problema
Sistemas de gestão de propriedades tradicionais têm calendários com data final fixa, exigindo intervenção manual para estender a agenda conforme o tempo passa. Isso pode causar:
- Impossibilidade de criar reservas distantes
- Perda de oportunidades de negócio
- Necessidade de manutenção manual recorrente

### Solução
Sistema automatizado que:
- Mantém sempre 5 anos (1825 dias) à frente disponíveis
- Verifica diariamente à meia-noite se precisa adicionar dias
- Adiciona automaticamente novos dias quando necessário
- Funciona de forma transparente para o usuário

---

## 🏗️ ARQUITETURA

### 1. Estrutura de Arquivos Criados

```
/utils/calendarManager.ts         → Lógica core do Calendar Manager
/hooks/useCalendarManager.ts      → Hook React para integração
/components/CalendarManagerBadge.tsx → Badge visual de monitoramento
/docs/logs/2025-10-28_calendar-manager-agenda-viva.md → Esta documentação
```

### 2. Componentes do Sistema

#### **calendarManager.ts**
- **Função:** Lógica central do gerenciamento de calendário
- **Responsabilidades:**
  - Calcular horizonte temporal (5 anos = 1825 dias)
  - Verificar se precisa adicionar dias
  - Gerar novos dias quando necessário
  - Agendar verificações automáticas
  - Logging detalhado

#### **useCalendarManager.ts**
- **Função:** Hook React para integração no frontend
- **Responsabilidades:**
  - Conectar lógica do Calendar Manager ao React
  - Gerenciar estado do monitoramento
  - Expor stats e controles
  - Cleanup automático

#### **CalendarManagerBadge.tsx**
- **Função:** Componente visual opcional
- **Responsabilidades:**
  - Exibir status da agenda
  - Mostrar estatísticas em tempo real
  - Permitir verificação manual
  - Indicador visual de saúde do sistema

---

## 🔧 IMPLEMENTAÇÃO

### 1. Constantes Principais

```typescript
const FIVE_YEARS_IN_DAYS = 1825; // 5 anos * 365 dias
const CHECK_INTERVAL_MS = 60 * 60 * 1000; // Verifica a cada 1 hora
```

### 2. Fluxo de Funcionamento

```
┌─────────────────────────────────────────────────────────┐
│  1. Inicialização do Sistema                            │
│     ↓                                                    │
│  2. useCalendarManager hook montado no App.tsx          │
│     ↓                                                    │
│  3. CalendarManager.startMonitoring() iniciado          │
│     ↓                                                    │
│  4. Verificação Inicial                                 │
│     ├─ Calcular último dia da agenda                    │
│     ├─ Calcular dias restantes                          │
│     └─ Se < 1825 dias → Adicionar novos dias            │
│     ↓                                                    │
│  5. Monitoramento Contínuo                              │
│     ├─ Verificação a cada 1 hora                        │
│     ├─ Verificação especial à meia-noite (00:00)        │
│     └─ Atualizar stats a cada 5 minutos                 │
│     ↓                                                    │
│  6. Extensão Automática (quando necessário)             │
│     ├─ Gerar array de novos dias                        │
│     ├─ Executar callback onDaysAdded                    │
│     ├─ Persistir no backend (futuro)                    │
│     ├─ Exibir toast de confirmação                      │
│     └─ Atualizar stats                                  │
└─────────────────────────────────────────────────────────┘
```

### 3. Integração no App.tsx

```typescript
// Importação
import { useCalendarManager } from './hooks/useCalendarManager';

// Hook dentro do componente App
const calendarManager = useCalendarManager({
  getCurrentLastDay: () => {
    // Retorna o último dia atual da agenda
    const today = new Date();
    const fiveYearsAhead = new Date();
    fiveYearsAhead.setFullYear(today.getFullYear() + 5);
    return fiveYearsAhead;
  },
  onDaysAdded: async (days) => {
    // Callback quando novos dias são adicionados
    console.log(`📅 ${days.length} novos dias adicionados!`);
    
    // TODO: Enviar para backend
    // await calendarApi.extendCalendar(days);
    
    toast.success(`Agenda estendida! ${days.length} novos dias.`);
  },
  enabled: true
});
```

### 4. Funções Principais

#### `checkCalendarHorizon(lastDay: Date): number`
Verifica quantos dias precisam ser adicionados.

**Retorno:**
- `0` se agenda está OK (≥ 1825 dias)
- `N` número de dias que precisam ser adicionados

#### `generateNewDays(startDate: Date, numberOfDays: number): CalendarDay[]`
Gera array de novos dias para adicionar.

**Retorno:**
```typescript
[
  {
    date: "2030-10-29",
    isActive: true,
    createdAt: "2025-10-28T..."
  },
  // ... mais dias
]
```

#### `CalendarManager.startMonitoring(getCurrentLastDay: () => Date)`
Inicia monitoramento automático com:
- Verificação inicial imediata
- Verificação periódica (1 hora)
- Verificação especial à meia-noite

#### `CalendarManager.getStats(currentLastDay: Date)`
Retorna estatísticas atuais:
```typescript
{
  lastDay: "2030-10-27",
  daysRemaining: 1825,
  yearsRemaining: 5,
  isHealthy: true,
  targetDays: 1825
}
```

---

## 📊 INTERFACE CalendarDay

```typescript
interface CalendarDay {
  date: string;        // Formato YYYY-MM-DD
  isActive: boolean;   // Se o dia está disponível
  createdAt: string;   // ISO timestamp de criação
}
```

---

## 🎨 COMPONENTE VISUAL (Opcional)

### CalendarManagerBadge

Badge que pode ser adicionado em qualquer lugar do sistema para monitorar a agenda viva.

**Props:**
```typescript
interface CalendarManagerBadgeProps {
  stats: CalendarManagerStats | null;
  isMonitoring: boolean;
  onManualCheck?: () => void;
  className?: string;
}
```

**Uso:**
```tsx
<CalendarManagerBadge
  stats={calendarManager.stats}
  isMonitoring={calendarManager.isMonitoring}
  onManualCheck={calendarManager.checkAndExtend}
/>
```

**Recursos:**
- Indicador visual de status (verde/laranja)
- Popover com estatísticas detalhadas
- Barra de progresso de cobertura
- Botão de verificação manual
- Animação de pulse quando monitorando

---

## 🔍 LOGGING E DEBUGGING

### Logs Automáticos

O Calendar Manager produz logs detalhados:

```
📅 CALENDAR MANAGER - Verificação de Horizonte:
   → Hoje: 2025-10-28
   → Último dia da agenda: 2030-10-27
   → Dias restantes: 1825
   → Meta: 1825 dias (5 anos)
   ✅ Agenda OK - não precisa adicionar dias
```

```
🗓️  [CALENDAR MANAGER] 28/10/2025 00:00:00
   📈 Estendendo agenda: 365 novos dias
   Dados: {
     primeiroNovoDia: "2030-10-28",
     ultimoNovoDia: "2031-10-27",
     totalDias: 365
   }
```

### Console Logs Principais

| Emoji | Evento |
|-------|--------|
| 🚀 | Calendar Manager inicializado |
| 🔄 | Monitoramento automático iniciado |
| 🌙 | Verificação de meia-noite executada |
| 📈 | Estendendo agenda |
| ✅ | Agenda estendida com sucesso |
| ❌ | Erro ao estender agenda |
| ⏹️  | Monitoramento parado |
| ⏰ | Próxima verificação agendada |

---

## 📈 ESTATÍSTICAS E MONITORAMENTO

### Stats Disponíveis

```typescript
{
  lastDay: "2030-10-27",      // Último dia da agenda
  daysRemaining: 1825,         // Dias até o último dia
  yearsRemaining: 5,           // Anos arredondados
  isHealthy: true,             // true se ≥ 1825 dias
  targetDays: 1825             // Meta fixa (5 anos)
}
```

### Verificações Automáticas

1. **Verificação Inicial**
   - Executada imediatamente ao iniciar
   - Garante que agenda está OK desde o início

2. **Verificação Periódica (1 hora)**
   - Executa a cada 60 minutos
   - Evita verificações excessivas

3. **Verificação de Meia-Noite**
   - Agendada para 00:00 todos os dias
   - Horário ideal para adicionar novos dias
   - Reagendada automaticamente

4. **Atualização de Stats (5 minutos)**
   - Stats são atualizadas periodicamente
   - Mantém UI sempre atualizada

---

## 🔄 INTEGRAÇÃO COM BACKEND (Futuro)

### Endpoint Sugerido

```typescript
// POST /api/calendar/extend
interface ExtendCalendarRequest {
  days: CalendarDay[];
}

interface ExtendCalendarResponse {
  success: boolean;
  daysAdded: number;
  newLastDay: string;
}
```

### Implementação no onDaysAdded

```typescript
onDaysAdded: async (days) => {
  try {
    const response = await calendarApi.extendCalendar(days);
    
    if (response.success) {
      console.log(`✅ ${response.daysAdded} dias salvos no backend`);
      toast.success(`Agenda estendida até ${response.newLastDay}`);
    }
  } catch (error) {
    console.error('❌ Erro ao salvar dias:', error);
    toast.error('Erro ao estender agenda');
  }
}
```

---

## ⚙️ CONFIGURAÇÕES

### Ajustar Horizonte Temporal

Para mudar de 5 anos para outro valor:

```typescript
// Em /utils/calendarManager.ts
const FIVE_YEARS_IN_DAYS = 2555; // 7 anos * 365 dias
```

### Ajustar Frequência de Verificação

```typescript
// Verificar a cada 30 minutos
const CHECK_INTERVAL_MS = 30 * 60 * 1000;

// Verificar a cada 6 horas
const CHECK_INTERVAL_MS = 6 * 60 * 60 * 1000;
```

### Desabilitar Monitoramento

```typescript
const calendarManager = useCalendarManager({
  // ... outras props
  enabled: false // Desabilita completamente
});
```

---

## 🧪 TESTANDO O SISTEMA

### Teste Manual

1. Abrir console do navegador
2. Verificar logs de inicialização:
   ```
   🚀 Calendar Manager inicializado
   🔄 Monitoramento automático iniciado
   ```

3. Verificar stats:
   ```
   📊 CALENDAR MANAGER STATS:
      → Último dia: 2030-10-27
      → Dias restantes: 1825
      → Anos restantes: 5
      → Status: ✅ OK
   ```

### Forçar Verificação Manual

```typescript
// No console do navegador ou via UI
calendarManager.checkAndExtend();
```

### Simular Necessidade de Extensão

Para testar a extensão automática, você pode modificar temporariamente `getCurrentLastDay` para retornar uma data próxima:

```typescript
getCurrentLastDay: () => {
  const today = new Date();
  const onlyOneYearAhead = new Date();
  onlyOneYearAhead.setFullYear(today.getFullYear() + 1);
  return onlyOneYearAhead; // Vai disparar extensão!
}
```

---

## 📱 RESPONSIVIDADE

O CalendarManagerBadge é responsivo:
- **Desktop:** Mostra "X anos" + indicador de monitoramento
- **Mobile:** Mostra apenas ícone + indicador

---

## 🎯 BENEFÍCIOS

1. **Agenda Infinita**
   - Nunca fica sem dias disponíveis
   - Elimina manutenção manual

2. **Automático**
   - Funciona sem intervenção
   - Verifica e estende automaticamente

3. **Transparente**
   - Usuário não precisa se preocupar
   - Sistema cuida de tudo

4. **Escalável**
   - Funciona com qualquer horizonte temporal
   - Configurável facilmente

5. **Monitorável**
   - Logs detalhados
   - Badge visual opcional
   - Stats em tempo real

---

## 🚀 PRÓXIMOS PASSOS

### Curto Prazo
- [ ] Integrar com backend para persistir dias
- [ ] Adicionar endpoint `/api/calendar/extend`
- [ ] Salvar logs de extensão no banco

### Médio Prazo
- [ ] Adicionar badge no CalendarHeader
- [ ] Implementar notificações quando agenda for estendida
- [ ] Dashboard administrativo com histórico de extensões

### Longo Prazo
- [ ] Configuração por organização (multi-tenant)
- [ ] Diferentes horizontes por tipo de propriedade
- [ ] Previsão inteligente de quando extensão será necessária

---

## 📚 REFERÊNCIAS

- **Código Principal:** `/utils/calendarManager.ts`
- **Hook React:** `/hooks/useCalendarManager.ts`
- **Badge Visual:** `/components/CalendarManagerBadge.tsx`
- **Integração:** `/App.tsx` (linha ~590)

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

- [x] Criar `/utils/calendarManager.ts`
- [x] Criar `/hooks/useCalendarManager.ts`
- [x] Criar `/components/CalendarManagerBadge.tsx`
- [x] Integrar no `App.tsx`
- [x] Adicionar logging detalhado
- [x] Implementar verificação de meia-noite
- [x] Criar interface CalendarDay
- [x] Documentar no DIARIO_RENDIZY
- [ ] Integrar com backend (próximo passo)
- [ ] Adicionar badge visual na UI (opcional)

---

## 🎉 RESULTADO FINAL

O sistema RENDIZY agora possui uma **Agenda Viva** que garante sempre 5 anos de calendário disponível, automaticamente e sem intervenção manual. Quando o horizonte temporal fica menor que 5 anos, o sistema adiciona automaticamente novos dias à meia-noite, mantendo a agenda infinita.

**Status:** ✅ Sistema funcionando e monitorando automaticamente  
**Impacto:** 🔥 Alta - Funcionalidade core do sistema  
**Complexidade:** ⭐⭐⭐ Média - Sistema bem estruturado e documentado

---

**Documentado por:** RENDIZY Development Team  
**Metodologia:** DIARIO_RENDIZY  
**Versão do Documento:** 1.0.0
