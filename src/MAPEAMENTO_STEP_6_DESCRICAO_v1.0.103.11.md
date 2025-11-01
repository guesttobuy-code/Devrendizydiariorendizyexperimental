# RENDIZY - Mapeamento Step 6: Descrição
## v1.0.103.11 - 29/10/2025

---

## 📋 CAMPOS IDENTIFICADOS (BVM Stays)

### 1. **TÍTULO**
**Campo:** Nome interno
**Tipo:** Text (curto)
**Exemplo:** "Suíte 5 - DIOMEDEZ Pousada Arquiteto Búzios"
**Limite:** ~100 caracteres
**Obrigatório:** ✅ Sim

**Uso:**
- Nome interno do sistema
- Título principal do anúncio
- Lista de propriedades
- Busca interna

---

### 2. **SOBRE TÍTULO DO ANÚNCIO**
**Campo:** Instruções/Dicas
**Tipo:** Texto informativo (não editável)
**Conteúdo:** 
> "Qual será o título do seu anúncio de título de venda? O conteúdo deve ser interessante e de total capacidade comercial, como portarias de imoveis. Leia as dicas para escrever seu título."

**Uso:**
- Orientação ao usuário
- Não é salvo no banco
- Apenas UI/UX

---

### 3. **DESCRIÇÃO RESUMIDA** ⭐
**Campo:** Descrição curta/comercial
**Tipo:** Textarea (limitado)
**Exemplo:** 
> "Se hospede na pousada Recanto das Palmeiras
> Suíte aconchegante para você e sua família
> LAZER VIP: Piscina com vista, área gourmet, churrasqueira, corrente esquenta, salão de jogos e espaço kids
> 💯 4 de acomodações qualificadas e de alta padrão
> NATUREZA: A 350m do Mirante do Pai Vitor. Perto das belas praias da Marina e Centro do Pai Vitor.
> IMPORTANTE: Localizada a 8 km de centro Búzios da Península Odrá-Bardot. Reservas de no mínimo 2 diárias."

**Limite:** ~500-800 caracteres
**Obrigatório:** ✅ Sim

**Uso:** 🎯
- ✅ **Airbnb** (Summary/Description preview)
- ✅ **Booking.com** (Descrição curta)
- ✅ **Decolar** (Resumo do anúncio)
- ✅ **Motor de Reservas RENDIZY** (Primeira seção visível)
- ✅ **Listagem de busca** (Preview)
- ✅ **Cards de propriedade**

**Características:**
- Comercial/vendedor
- Destaca principais atrativos
- Usa emojis e formatação visual
- Informações-chave (localização, diferenciais)

---

### 4. **NOTAS GERAIS** / **DESCRIÇÃO COMPLETA**
**Campo:** Descrição detalhada
**Tipo:** Textarea (longo)
**Exemplo:**
> "O SEU REFÚGIO DE PAZ EM BÚZIOS
> 
> Desfrute o equilíbrio perfeito entre tranquilidade de um sítio privado e a tranquilidade da natureza. Localizada no rua do Centrinho, a 1k, na bairro Armandinho, nosso espaço é um oásis de descanso, longe da agitação, mas sem deixar de algumas das belezas naturais mais preservadas de Búzios.
> 
> Nosso local foi pensado exclusivamente para entregar a mais exuberante e espaçosa experiência...
> 
> Você identifico de uma infraestrutura completa, relaxar deslumbrante e a verdadeira essência da Búzios.
> 
> Nosso local foi pensado exclusivo, por amor ao mar e respeito ao encontro com entreveros espaçosos e espaços..."

**Limite:** ~2000-5000 caracteres
**Obrigatório:** ⚠️ Recomendado

**Uso:**
- ✅ **Página completa do anúncio** (todas as plataformas)
- ✅ **Motor de Reservas RENDIZY** (Seção "Sobre o Imóvel")
- ✅ **Airbnb** (Descrição completa)
- ✅ **Booking.com** (Descrição detalhada)
- ✅ **SEO** (Conteúdo para indexação)

**Características:**
- Texto longo e detalhado
- Storytelling
- Informações completas sobre:
  - O espaço
  - A experiência
  - Diferenciais
  - Localização detalhada
  - Normas da casa (opcional)

---

## 🎯 HIERARQUIA DE EXIBIÇÃO

### **Plataformas (Airbnb, Booking, Decolar):**

```
┌─────────────────────────────────────────┐
│ [FOTO DE CAPA]                          │
│                                         │
│ TÍTULO                                  │
│ "Suíte 5 - DIOMEDEZ Pousada..."       │
│                                         │
│ ★★★★★ 4.8 (124 avaliações)            │
│                                         │
│ DESCRIÇÃO RESUMIDA                      │
│ "Se hospede na pousada Recanto..."     │
│ (500-800 caracteres)                    │
│                                         │
│ [Ver mais] ─────────────────────>      │
│                                         │
│ (Ao clicar "Ver mais")                  │
│                                         │
│ NOTAS GERAIS / DESCRIÇÃO COMPLETA       │
│ "O SEU REFÚGIO DE PAZ EM BÚZIOS..."   │
│ (2000+ caracteres)                      │
└─────────────────────────────────────────┘
```

---

### **Motor de Reservas RENDIZY:**

```
┌─────────────────────────────────────────┐
│ [GALERIA DE FOTOS]                      │
│                                         │
│ TÍTULO                                  │
│ "Suíte 5 - DIOMEDEZ Pousada..."       │
│                                         │
│ 📍 Búzios, RJ • 2 quartos • 4 hóspedes │
│ ★★★★★ 4.8                              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ 📝 SOBRE O IMÓVEL                       │
│                                         │
│ DESCRIÇÃO RESUMIDA                      │
│ "Se hospede na pousada Recanto..."     │
│                                         │
│ [Ler descrição completa ▼]             │
│                                         │
│ (Expandível)                            │
│ NOTAS GERAIS                            │
│ "O SEU REFÚGIO DE PAZ..."              │
│                                         │
├─────────────────────────────────────────┤
│ 🏠 AMENIDADES                           │
│ Wi-Fi • Piscina • Academia...          │
│                                         │
├─────────────────────────────────────────┤
│ 📅 DISPONIBILIDADE                      │
│ [Calendário]                            │
└─────────────────────────────────────────┘
```

---

## 📊 COMPARAÇÃO DE CAMPOS

| Campo | Airbnb | Booking.com | Decolar | Motor RENDIZY |
|-------|--------|-------------|---------|---------------|
| **Título** | ✅ Listing Name | ✅ Property Name | ✅ Título | ✅ Nome do Anúncio |
| **Descrição Resumida** | ✅ Summary (80 chars) | ✅ Short Description | ✅ Resumo | ✅ Preview Card |
| **Notas Gerais** | ✅ Full Description | ✅ Description | ✅ Descrição Completa | ✅ Sobre o Imóvel |

---

## 🔤 LIMITES DE CARACTERES

### **Airbnb:**
- Título: 50 caracteres
- Summary: 500 caracteres
- Description: 5000 caracteres

### **Booking.com:**
- Nome da Propriedade: 60 caracteres
- Descrição Curta: 900 caracteres
- Descrição: Ilimitado (recomendado 2000-5000)

### **Decolar:**
- Título: 100 caracteres
- Resumo: 500 caracteres
- Descrição: 5000 caracteres

### **RENDIZY (Recomendado):**
- Título: 100 caracteres
- Descrição Resumida: 800 caracteres
- Notas Gerais: 5000 caracteres

---

## 📝 ESTRUTURA DE DADOS

### TypeScript Interface:

```typescript
interface PropertyDescription {
  // STEP 6 - DESCRIÇÃO
  title: string;                    // ✅ Obrigatório - 100 chars
  summaryDescription: string;       // ✅ Obrigatório - 800 chars
  fullDescription: string;          // ⚠️ Recomendado - 5000 chars
  
  // Metadados
  lastUpdated?: Date;
  language?: 'pt-BR' | 'en-US' | 'es-ES';
  
  // Contadores
  summaryLength?: number;
  fullLength?: number;
}
```

### Exemplo de Objeto:

```typescript
{
  title: "Suíte 5 - DIOMEDEZ Pousada Arquiteto Búzios",
  summaryDescription: "Se hospede na pousada Recanto das Palmeiras\nSuíte aconchegante para você e sua família\nLAZER VIP: Piscina com vista, área gourmet...",
  fullDescription: "O SEU REFÚGIO DE PAZ EM BÚZIOS\n\nDesfrute o equilíbrio perfeito entre tranquilidade...",
  language: 'pt-BR',
  summaryLength: 456,
  fullLength: 2340
}
```

---

## 🎨 COMPONENTE UI (Planejado)

### ContentDescriptionStep.tsx

```
┌────────────────────────────────────────────────┐
│ Descrição do Anúncio                           │
│ Conte aos hóspedes sobre sua propriedade       │
├────────────────────────────────────────────────┤
│                                                │
│ TÍTULO *                                       │
│ [_________________________________] 0/100      │
│                                                │
│ ℹ️ Este é o nome principal do seu anúncio     │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│ DESCRIÇÃO RESUMIDA * 🎯                        │
│ ┌──────────────────────────────────────────┐  │
│ │ Se hospede na pousada...                 │  │
│ │                                          │  │
│ │ [Editor de texto]                        │  │
│ │                                          │  │
│ └──────────────────────────────────────────┘  │
│ 0/800 caracteres                               │
│                                                │
│ ✨ DICA: Esta descrição aparece em:           │
│ • Airbnb (preview)                             │
│ • Booking.com (resumo)                         │
│ • Decolar (card)                               │
│ • Motor de Reservas (primeira impressão)       │
│                                                │
│ 💡 Use:                                        │
│ • Principais atrativos                         │
│ • Localização resumida                         │
│ • Diferenciais únicos                          │
│ • Emojis para destaque visual                  │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│ DESCRIÇÃO COMPLETA (Recomendado)               │
│ ┌──────────────────────────────────────────┐  │
│ │ O SEU REFÚGIO DE PAZ EM BÚZIOS           │  │
│ │                                          │  │
│ │ [Editor de texto com formatação]         │  │
│ │                                          │  │
│ │ [Toolbar: B I U • Lista • Emoji]        │  │
│ │                                          │  │
│ │                                          │  │
│ │                                          │  │
│ └──────────────────────────────────────────┘  │
│ 0/5000 caracteres                              │
│                                                │
│ 📝 ESTRUTURA SUGERIDA:                        │
│ 1. Introdução acolhedora                       │
│ 2. Sobre o espaço                              │
│ 3. Localização e arredores                     │
│ 4. Experiência do hóspede                      │
│ 5. Informações importantes                     │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│ 📊 PREVIEW EM PLATAFORMAS                     │
│ [Airbnb] [Booking.com] [Motor RENDIZY]        │
│                                                │
│ ┌──────────────────────────────────────────┐  │
│ │ Como ficará no Airbnb:                   │  │
│ │ ───────────────────────────────────────  │  │
│ │ [Foto] Suíte 5 - DIOMEDEZ...            │  │
│ │        Se hospede na pousada...          │  │
│ │        [Ler mais]                        │  │
│ └──────────────────────────────────────────┘  │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 🚀 FUNCIONALIDADES PLANEJADAS

### 1. **Editor de Texto Rico**
- [ ] Formatação básica (negrito, itálico, sublinhado)
- [ ] Listas (ordenadas e não-ordenadas)
- [ ] Emoji picker
- [ ] Contador de caracteres em tempo real
- [ ] Limite visual (alerta ao se aproximar do limite)

### 2. **Dicas Inteligentes**
- [ ] Sugestões baseadas em tipo de propriedade
- [ ] Templates pré-prontos
- [ ] Exemplos de descrições bem-sucedidas
- [ ] Checklist de informações importantes

### 3. **Preview Multi-Plataforma**
- [ ] Airbnb preview
- [ ] Booking.com preview
- [ ] Motor RENDIZY preview
- [ ] Toggle entre plataformas

### 4. **Validação**
- [ ] Alerta se descrição resumida muito curta (< 200 chars)
- [ ] Alerta se descrição completa vazia
- [ ] Verificação de palavras-chave importantes
- [ ] Score de qualidade da descrição

### 5. **Tradução (Futuro)**
- [ ] Auto-tradução PT → EN → ES
- [ ] Edição manual de traduções
- [ ] Preview em cada idioma

---

## 🎯 BOAS PRÁTICAS (Sugestões ao Usuário)

### **Descrição Resumida:**

✅ **FAÇA:**
- Use frases curtas e impactantes
- Destaque os 3 principais diferenciais
- Inclua localização resumida
- Use emojis estratégicos (máx 3-4)
- Mencione capacidade e tipo de acomodação

❌ **EVITE:**
- Texto genérico ("ótima localização")
- Informações técnicas demais
- Regras da casa (vai em outro campo)
- Mais de 800 caracteres

### **Descrição Completa:**

✅ **FAÇA:**
- Conte uma história
- Descreva a experiência do hóspede
- Detalhe os espaços
- Mencione pontos turísticos próximos
- Inclua informações de acesso
- Use parágrafos curtos

❌ **EVITE:**
- Copiar texto de outros anúncios
- Informações contraditórias
- Promessas não cumpridas
- Texto em CAPSLOCK

---

## 📋 CAMPOS ADICIONAIS (Aguardando Mapeamento)

Campos mencionados pelo usuário que ainda serão mapeados:
- [ ] Campo X (a definir)
- [ ] Campo Y (a definir)
- [ ] Campo Z (a definir)

---

## ✅ STATUS

- [x] Mapeamento de campos identificados
- [x] Definição de limites de caracteres
- [x] Estrutura de dados TypeScript
- [x] Comparação com plataformas
- [x] UI/UX planejamento
- [x] **CONCLUÍDO:** Mapeamento completo de campos (fixos + personalizados)
- [x] **CONCLUÍDO:** Desenvolvimento do componente ContentDescriptionStep.tsx
- [x] **CONCLUÍDO:** Sistema multi-idioma (PT, EN, ES)
- [x] **CONCLUÍDO:** Sistema de campos personalizados
- [x] **CONCLUÍDO:** Validação de emojis (proibidos em campos fixos)
- [x] **CONCLUÍDO:** Integração no PropertyEditWizard

---

## ��� REFERÊNCIAS

1. **BVM Stays** - Screenshots fornecidos
2. **Airbnb Host Guidelines** - Descrições efetivas
3. **Booking.com Partner Hub** - Melhores práticas
4. **Decolar Extranet** - Formatação de anúncios

---

**RENDIZY v1.0.103.11** - Sistema de Gestão de Imóveis de Temporada

**NOTA:** Desenvolvimento do Step 6 será iniciado após mapeamento completo de TODOS os campos de descrição conforme solicitado pelo usuário.
