# ⚡ Busca Rápida por Datas - Stays.net v1.0.103.39

**Novidade:** Botões de busca rápida para facilitar consultas frequentes!

---

## 🎯 COMO USAR

### **1. Acesse a Interface**
```
Menu → Configurações → Integrações → Stays.net PMS → Aba "Preview de Reservas"
```

### **2. Escolha o Tipo de Data**
```
📥 Check-in (Arrival)    → Filtra por data de ENTRADA
📤 Check-out (Departure) → Filtra por data de SAÍDA  
📝 Criação (Created)     → Filtra por data de CONTRATAÇÃO
```

### **3. Use os Botões de Busca Rápida**

#### **🔵 Hoje**
Busca reservas da data atual (ex: 29/10/2025)

**Exemplo com Check-in:**
- Mostra quem chega HOJE

**Exemplo com Check-out:**
- Mostra quem sai HOJE

#### **🔵 Amanhã**
Busca reservas de amanhã

**Exemplo com Check-in:**
- Mostra quem chega AMANHÃ

#### **🔵 Este Mês**
Busca reservas do mês atual completo (01 a 31)

**Exemplo com Check-in:**
- Mostra todas as chegadas de OUTUBRO/2025

#### **🔵 Próximo Mês**
Busca reservas do próximo mês completo

**Exemplo com Check-in:**
- Mostra todas as chegadas de NOVEMBRO/2025

---

## 📋 EXEMPLOS PRÁTICOS

### **Exemplo 1: Ver Chegadas de Hoje**

1. **Tipo de Data:** Check-in (Arrival) ✅
2. Clique: **Hoje (29/10/2025)**
3. Resultado: Lista de quem chega hoje

### **Exemplo 2: Ver Saídas de Amanhã**

1. **Tipo de Data:** Check-out (Departure) ✅
2. Clique: **Amanhã**
3. Resultado: Lista de quem sai amanhã (para agendar limpeza)

### **Exemplo 3: Reservas Criadas Este Mês**

1. **Tipo de Data:** Criação (Created) ✅
2. Clique: **Este Mês**
3. Resultado: Todas as reservas contratadas em outubro

### **Exemplo 4: Previsão de Ocupação do Próximo Mês**

1. **Tipo de Data:** Check-in (Arrival) ✅
2. Clique: **Próximo Mês**
3. Resultado: Todas as chegadas de novembro

---

## 🎓 CASOS DE USO

### **📥 Chegadas (Check-in)**

| Botão | Resultado | Uso |
|-------|-----------|-----|
| **Hoje** | Quem chega hoje | Preparar imóveis para chegadas |
| **Amanhã** | Quem chega amanhã | Planejar recepções |
| **Este Mês** | Todas as chegadas de outubro | Relatório de ocupação |
| **Próximo Mês** | Todas as chegadas de novembro | Planejamento mensal |

### **📤 Saídas (Check-out)**

| Botão | Resultado | Uso |
|-------|-----------|-----|
| **Hoje** | Quem sai hoje | Liberar imóveis |
| **Amanhã** | Quem sai amanhã | Agendar limpeza |
| **Este Mês** | Todas as saídas de outubro | Relatório de rotatividade |
| **Próximo Mês** | Todas as saídas de novembro | Planejamento de limpezas |

### **📝 Criação (Created)**

| Botão | Resultado | Uso |
|-------|-----------|-----|
| **Hoje** | Reservas contratadas hoje | Ver vendas do dia |
| **Amanhã** | Reservas de amanhã | - |
| **Este Mês** | Vendas de outubro | Relatório de vendas |
| **Próximo Mês** | - | - |

---

## 💡 DICAS

### **Combinações Úteis**

**1. Preparação Diária:**
- Check-in + **Hoje** = Quem chega
- Check-out + **Hoje** = Quem sai

**2. Planejamento Semanal:**
- Check-in + **Este Mês** = Ver todas as chegadas
- Check-out + **Este Mês** = Agendar limpezas

**3. Relatórios:**
- Criação + **Este Mês** = Vendas do mês
- Check-in + **Próximo Mês** = Previsão de ocupação

---

## 🔍 BUSCA PERSONALIZADA

**Ainda tem o botão "Buscar Reservas (Padrão)" que busca:**
- Últimos 30 dias
- Próximos 365 dias
- Baseado no Tipo de Data selecionado

**Isso dá uma visão ampla de todas as reservas!**

---

## ✅ RESPOSTA À SUA PERGUNTA

### **"Consegue buscar check-ins de 29/10/2025?"**

**SIM! De 3 formas:**

**1. Botão Rápido (se hoje é 29/10):**
- Tipo: Check-in (Arrival)
- Clique: **Hoje**

**2. Botão Padrão com dateType:**
- Isso vai buscar do período padrão
- Depois você filtra manualmente no JSON

**3. Backend Direct (futuro):**
- Enviar parâmetros específicos: `from=2025-10-29&to=2025-10-29`

---

## 📊 VISUALIZAÇÃO DOS RESULTADOS

Após clicar em qualquer botão, você verá:

1. **🔍 Card de Análise Visual** (4 boxes coloridos)
2. **📊 Alert Popup** com estrutura
3. **💾 Console Logs** detalhados
4. **📄 JSON Completo** navegável
5. **⬇️ Botão Exportar** para salvar os dados

---

## 🎯 PRÓXIMO PASSO

**Agora teste:**
1. Selecione **Check-in (Arrival)**
2. Clique em **Hoje**
3. Veja os resultados
4. Me diga qual box ficou **VERDE ✅**

Com essa informação, eu finalizo a integração em ~17 minutos! 🚀
