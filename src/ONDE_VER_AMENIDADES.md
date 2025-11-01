# 📍 ONDE VER AS AMENIDADES DO LOCAL E DA ACOMODAÇÃO

## 🎯 RESPOSTA RÁPIDA

### **1. VISUALIZAR UM ANÚNCIO** 👁️
```
PropertiesManagement → Clicar em qualquer propriedade
→ Modal abre → Tab "Amenidades"

┌────────────────────────────────────────┐
│ 🏢 AMENIDADES DO LOCAL          [12]   │  ← AZUL
│ Herdadas de "Hotel Vista Mar"          │
│ ✓ Piscina  ✓ Academia  ✓ Wi-Fi        │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ 🏠 AMENIDADES DA ACOMODAÇÃO     [8]    │  ← VERDE
│ Específicas desta unidade              │
│ ✓ Ar-cond  ✓ TV  ✓ Cozinha            │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ⭐ Total de Amenidades          [20]   │  ← ROXO
└────────────────────────────────────────┘
```

---

### **2. EDITAR AMENIDADES** ✏️

#### **A) Amenidades do LOCAL:**
```
Configurações → Locais & Anúncios → LocationsManager
→ Editar Location → Tab "Amenidades"
→ Selecionar amenidades do condomínio/hotel
```

#### **B) Amenidades da ACOMODAÇÃO:**
```
PropertiesManagement → Editar Propriedade
→ PropertyEditWizard → Step 4 (Amenidades)
→ Seção Verde (abaixo) → Selecionar amenidades da unidade
```

---

## 📊 MAPA COMPLETO

### **FLUXO DE CRIAÇÃO:**
```
1️⃣ CRIAR LOCATION (opcional)
   └─→ Configurações → Locais
       └─→ Adicionar amenidades compartilhadas
           (piscina, academia, estacionamento, etc.)

2️⃣ CRIAR PROPRIEDADE
   └─→ PropertyEditWizard → Step 4
       ├─→ SEÇÃO AZUL (acima): Ver amenidades do location ← READ-ONLY
       └─→ SEÇÃO VERDE (abaixo): Adicionar amenidades da unidade ← EDITÁVEL

3️⃣ VISUALIZAR PROPRIEDADE
   └─→ PropertyViewModal → Tab "Amenidades"
       ├─→ CARD AZUL: Amenidades do Local
       ├─→ CARD VERDE: Amenidades da Acomodação
       └─→ CARD ROXO: Total
```

---

## 🔵 AMENIDADES DO LOCAL

### **Onde Configurar:**
```
Menu → Configurações → Locais & Anúncios → LocationsManager
```

### **Passo a Passo:**
```
1. Clicar em "Gerenciar Locais"
2. Criar ou editar um Location
3. Ir na tab "Amenidades"
4. Selecionar amenidades compartilhadas:
   ✓ Piscina externa
   ✓ Academia
   ✓ Estacionamento gratuito
   ✓ Wi-Fi gratuito
   ✓ Recepção 24h
   ✓ Café da manhã
   etc.
5. Salvar
```

### **Essas amenidades aparecerão em:**
- ✅ PropertyViewModal (azul, read-only)
- ✅ ContentAmenitiesStep (azul, read-only)
- ✅ **Automaticamente em TODAS as propriedades vinculadas ao location**

---

## 🟢 AMENIDADES DA ACOMODAÇÃO

### **Onde Configurar:**
```
Menu → Gestão de Imóveis → Editar Propriedade → Step 4
```

### **Passo a Passo:**
```
1. Abrir PropertyEditWizard
2. Ir no Step 4 (Amenidades)
3. Rolar até a SEÇÃO VERDE (abaixo)
4. Selecionar amenidades específicas da unidade:
   ☑️ Ar-condicionado
   ☑️ TV a cabo
   ☑️ Cozinha completa
   ☑️ Frigobar
   ☑️ Varanda
   etc.
5. Clicar "Próximo" ou "Salvar"
```

### **Essas amenidades aparecerão em:**
- ✅ PropertyViewModal (verde)
- ✅ **Apenas nesta propriedade específica**

---

## 🎨 IDENTIFICAÇÃO VISUAL

| Tipo | Cor | Ícone | Status |
|------|-----|-------|--------|
| **Do Local** | 🔵 Azul | Building2 🏢 | Read-only |
| **Da Acomodação** | 🟢 Verde | Home 🏠 | Editável |
| **Total** | 🟣 Roxo | Star ⭐ | Informativo |

---

## 🧪 EXEMPLO PRÁTICO

### **Hotel com 3 apartamentos:**

```
┌─────────────────────────────────────────────────┐
│ 🏢 LOCATION: "Hotel Vista Mar"                  │
│ Amenidades do Location (12):                    │
│ • Piscina externa                               │
│ • Academia                                      │
│ • Estacionamento gratuito                       │
│ • Wi-Fi gratuito                                │
│ • Recepção 24h                                  │
│ • Café da manhã                                 │
│ • Salão de festas                               │
│ • Sauna                                         │
│ • Playground                                    │
│ • Segurança 24h                                 │
│ • Elevador                                      │
│ • Lavanderia                                    │
└─────────────────────────────────────────────────┘
          ↓ Herdadas automaticamente
┌─────────────────────────────────────────────────┐
│ 🏠 Apartamento 101 (Standard)                   │
│ Amenidades da Acomodação (5):                   │
│ • Ar-condicionado                               │
│ • TV a cabo                                     │
│ • Cozinha completa                              │
│ • Frigobar                                      │
│ • Varanda                                       │
│                                                 │
│ TOTAL: 12 (local) + 5 (unidade) = 17           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ 🏠 Apartamento 201 (Luxo)                       │
│ Amenidades da Acomodação (8):                   │
│ • Ar-condicionado                               │
│ • TV smart 55"                                  │
│ • Cozinha gourmet                               │
│ • Frigobar                                      │
│ • Varanda ampla                                 │
│ • Banheira                                      │
│ • Closet                                        │
│ • Vista para o mar                              │
│                                                 │
│ TOTAL: 12 (local) + 8 (unidade) = 20           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ 🏠 Apartamento 301 (Cobertura)                  │
│ Amenidades da Acomodação (12):                  │
│ • Ar-condicionado split (todos cômodos)         │
│ • TV smart 65"                                  │
│ • Cozinha gourmet completa                      │
│ • Adega climatizada                             │
│ • Terraço privativo                             │
│ • Churrasqueira                                 │
│ • Jacuzzi                                       │
│ • Home theater                                  │
│ • Closet                                        │
│ • Lavabo                                        │
│ • Vista panorâmica                              │
│ • Smart home                                    │
│                                                 │
│ TOTAL: 12 (local) + 12 (unidade) = 24          │
└─────────────────────────────────────────────────┘
```

---

## ❓ PERGUNTAS FREQUENTES

### **P: Como adiciono amenidades do local?**
R: Configurações → Locais → Editar Location → Tab "Amenidades"

### **P: Como adiciono amenidades da acomodação?**
R: Editar Propriedade → Step 4 → Seção Verde (abaixo)

### **P: Onde vejo TODAS as amenidades juntas?**
R: PropertyViewModal → Tab "Amenidades" → Mostra as 2 seções + total

### **P: Posso editar amenidades do local no wizard da propriedade?**
R: Não. Elas são read-only (apenas visualização). Edite no LocationsManager.

### **P: E se a propriedade não tiver location vinculada?**
R: A seção azul (amenidades do local) não aparece. Apenas a verde.

### **P: As amenidades do local contam no total?**
R: Sim! Total = Amenidades do Local + Amenidades da Acomodação

---

## 📸 SCREENSHOTS (Descrição)

### **1. PropertyViewModal - Tab Amenidades:**
```
[Tab Informações] [Tab Amenidades*] [Tab Localização] [Tab Pricing]

┌──────────────────────────────────────────────┐
│ 🏢 AMENIDADES DO LOCAL              [12]     │
│ Herdadas de "Hotel Vista Mar"                │
│ ──────────────────────────────────────────── │
│ ✓ Piscina      ✓ Academia     ✓ Parking     │
│ ✓ Wi-Fi        ✓ Recepção     ✓ Café        │
│ ... (mais 6)                                 │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ 🏠 AMENIDADES DA ACOMODAÇÃO         [8]      │
│ Específicas desta unidade                    │
│ ──────────────────────────────────────────── │
│ ✓ Ar-cond      ✓ TV           ✓ Cozinha     │
│ ✓ Frigobar     ✓ Varanda      ... (mais 3)  │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ ⭐ Total de Amenidades              [20]     │
└──────────────────────────────────────────────┘
```

### **2. ContentAmenitiesStep (Wizard):**
```
Step 4 de 6: Amenidades e Comodidades

┌──────────────────────────────────────────────┐
│ 🏢 AMENIDADES DO LOCAL              [12]     │  ← AZUL (READ-ONLY)
│ 👁️ Apenas visualização                       │
│ Herdadas de "Hotel Vista Mar"                │
│ ──────────────────────────────────────────── │
│ ✓ Piscina externa                            │
│ ✓ Academia                                   │
│ ✓ Estacionamento gratuito                    │
│ ... (expansível por categoria)               │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│ 🏠 AMENIDADES DA ACOMODAÇÃO         [8]      │  ← VERDE (EDITÁVEL)
│ ✏️ Específicas desta unidade                 │
│ ──────────────────────────────────────────── │
│ 🔍 [Buscar amenidades...]                    │
│ ──────────────────────────────────────────── │
│ 🍳 Cozinha e sala de jantar     [3/36] ▼    │
│    [✓ Selecionar Todas] [✗ Limpar]          │
│    ☑️ Cozinha completa                       │
│    ☑️ Microondas                             │
│    ☑️ Geladeira                              │
│    ☐ Freezer                                 │
│ ... (13 categorias)                          │
└──────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST RÁPIDO

### **Para VER amenidades:**
- [ ] Abrir propriedade no PropertyViewModal
- [ ] Ir na tab "Amenidades"
- [ ] Ver seção azul (do local) + verde (da acomodação)

### **Para EDITAR amenidades do LOCAL:**
- [ ] Ir em Configurações → Locais
- [ ] Editar o Location
- [ ] Tab "Amenidades"
- [ ] Selecionar amenidades compartilhadas

### **Para EDITAR amenidades da ACOMODAÇÃO:**
- [ ] Editar propriedade
- [ ] Step 4 do wizard
- [ ] Seção verde (abaixo)
- [ ] Selecionar amenidades específicas

---

**Versão:** v1.0.103.14  
**Atualizado:** 29 OUT 2025  
**Status:** ✅ GUIA COMPLETO
