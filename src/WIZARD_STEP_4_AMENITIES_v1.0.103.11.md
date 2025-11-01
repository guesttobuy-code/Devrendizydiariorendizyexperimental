# RENDIZY - Wizard Step 4: Amenidades
## v1.0.103.11 - 29/10/2025

---

## 📋 VISÃO GERAL

Step 4 do PropertyEditWizard - **Amenidades e Comodidades** do anúncio com sistema inteligente de herança das amenidades do Location pai.

### Conceito:
- **Amenidades do Location** (Herdadas) = Compartilhadas do condomínio/prédio
- **Amenidades da Unidade** (Específicas) = Exclusivas desta propriedade
- **Total** = Herdadas + Específicas (sem duplicação)

---

## ✨ FUNCIONALIDADES

### 1. ✅ Herança Automática do Location

**Se a propriedade estiver vinculada a um Location:**
- Sistema detecta automaticamente o Location pai
- Carrega as amenidades compartilhadas do Location
- Oferece toggle para herdar ou não herdar
- Exibe preview das amenidades herdadas

**Exemplo:**
```
Location: "Edifício Sunset Beach"
  Amenidades: Piscina, Academia, Portaria 24h, Elevador

Anúncio: "Apartamento 501"
  [ ✓ ] Herdar amenidades do local automaticamente
  
  Resultado:
  → Piscina (do local)
  → Academia (do local)
  → Portaria 24h (do local)
  → Elevador (do local)
```

---

### 2. ✅ Seleção de Amenidades Específicas

**Interface de Seleção:**
- 13 categorias de amenidades
- 252 amenidades catalogadas
- Sistema de busca em tempo real
- Expandir/colapsar categorias
- Selecionar todas / Limpar seleção por categoria

**Categorias:**
1. 🌳 Ao ar livre / Vista (34)
2. 🅿️ Estacionamento (21)
3. 🔒 Segurança (22)
4. 🚿 Banheiro (28)
5. ❄️ Climatização (3)
6. 🍽️ Cozinha e Sala de Jantar (33)
7. 📺 Entretenimento (48)
8. 👨‍👩‍👧‍👦 Família (17)
9. 💻 Internet e Escritório (13)
10. 🧹 Limpeza (4)
11. 🛏️ Quarto e Lavanderia (27)
12. ♿ Acessibilidade (8)
13. 🛎️ Serviços (11)

---

### 3. ✅ Visualização Inteligente

**3 Estatísticas em Destaque:**
```
┌─────────────┬─────────────┬─────────────┐
│   DO LOCAL  │  DA UNIDADE │    TOTAL    │
│      15     │      8      │     23      │
└─────────────┴─────────────┴─────────────┘
```

**Por Categoria:**
- Mostra quantas são da unidade
- Mostra quantas são do local (se herdando)
- Exemplo: "3 da unidade + 2 do local"

**Badge Visual:**
- Amenidades selecionadas = Azul
- Amenidades herdadas = Verde (badge "Do local")
- Amenidades não selecionadas = Cinza

---

### 4. ✅ Resumo Final

Card verde no final mostrando:
```
✓ 15 amenidades herdadas do local
✓ 8 amenidades específicas da unidade
= 23 amenidades totais que aparecerão no anúncio
```

---

## 🎨 INTERFACE

### Layout Completo:

```
┌────────────────────────────────────────────────────────────┐
│ Amenidades e Comodidades                                   │
│ Selecione as amenidades disponíveis nesta propriedade     │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ ╔════════════════════════════════════════════════════════╗│
│ ║ 🏢 AMENIDADES DO LOCAL                    [🛡️ Herdar] ║│
│ ║                                                        ║│
│ ║ Este anúncio está vinculado a um local que possui 15  ║│
│ ║ amenidades compartilhadas                              ║│
│ ║                                                        ║│
│ ║ [ ✓ ] Herdar amenidades do local automaticamente      ║│
│ ║                                                        ║│
│ ║ ✓ Amenidades herdadas (15)                            ║│
│ ║ [Piscina] [Academia] [Portaria 24h] [Elevador]...     ║│
│ ╚════════════════════════════════════════════════════════╝│
│                                                            │
│ ┌────────────┬────────────┬────────────┐                  │
│ │  DO LOCAL  │ DA UNIDADE │   TOTAL    │                  │
│ │     15     │      8     │     23     │                  │
│ └────────────┴────────────┴────────────┘                  │
│                                                            │
│ [🔍 Buscar amenidades...]                                 │
│                                                            │
│ Amenidades Específicas da Unidade       [🏠 8 selecionadas]│
│                                                            │
│ ╔════════════════════════════════════════════════════════╗│
│ ║ 🌳 Ao ar livre / Vista           [8/34] [▼]           ║│
│ ╟────────────────────────────────────────────────────────╢│
│ ║  [✓ Selecionar Todas] [✗ Limpar Seleção]             ║│
│ ║                                                        ║│
│ ║  ☑️ Varanda          ☑️ Terraço                       ║│
│ ║  ☐ Jardim [Do local] ☐ Piscina [Do local]            ║│
│ ║  ☑️ Vista montanha   ☑️ Vista mar                     ║│
│ ╚════════════════════════════════════════════════════════╝│
│                                                            │
│ ╔════════════════════════════════════════════════════════╗│
│ ║ 💻 Internet e Escritório         [3/13] [▼]           ║│
│ ╟────────────────────────────────────────────────────────╢│
│ ║  [✓ Selecionar Todas] [✗ Limpar Seleção]             ║│
│ ║                                                        ║│
│ ║  ☑️ Wi-Fi            ☑️ Wi-Fi rápido (100+ Mbps)      ║│
│ ║  ☑️ Mesa de trabalho ☐ Monitor                        ║│
│ ╚════════════════════════════════════════════════════════╝│
│                                                            │
│ ... (mais 11 categorias)                                   │
│                                                            │
│ ╔════════════════════════════════════════════════════════╗│
│ ║ ✅ RESUMO DAS AMENIDADES                              ║│
│ ║                                                        ║│
│ ║ ✓ 15 amenidades herdadas do local                     ║│
│ ║ ✓ 8 amenidades específicas da unidade                 ║│
│ ║ = 23 amenidades totais que aparecerão no anúncio      ║│
│ ╚════════════════════════════════════════════════════════╝│
│                                                            │
│                          [Anterior] [Próximo]              │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 FLUXOS DE USO

### Fluxo 1: Propriedade COM Location

```
1. Usuário chega no Step 4
2. Sistema detecta locationId do Step 2
3. Carrega amenidades do Location: [Piscina, Academia, Portaria]
4. Toggle "Herdar automaticamente" = ON por padrão
5. Preview mostra: "✓ Amenidades herdadas (3)"
6. Usuário expande categoria "Internet"
7. Seleciona: Wi-Fi, Wi-Fi rápido, Mesa de trabalho
8. Estatísticas atualizam:
   - Do Local: 3
   - Da Unidade: 3
   - Total: 6
9. Resumo final: "3 herdadas + 3 específicas = 6 totais"
```

---

### Fluxo 2: Propriedade SEM Location

```
1. Usuário chega no Step 4
2. Sistema não detecta locationId
3. Mostra alerta: "Esta propriedade não está vinculada a um local"
4. Apenas seleção manual disponível
5. Usuário seleciona amenidades uma por uma
6. Estatísticas:
   - Do Local: 0
   - Da Unidade: 15
   - Total: 15
7. Resumo final: "15 amenidades específicas da unidade"
```

---

### Fluxo 3: Desabilitar Herança

```
1. Propriedade com Location (15 amenidades)
2. Toggle "Herdar automaticamente" = ON
3. Total: 15 herdadas + 5 específicas = 20
4. Usuário desliga toggle
5. Total: 0 herdadas + 5 específicas = 5
6. Apenas amenidades específicas aparecem no anúncio
```

---

### Fluxo 4: Amenidade Duplicada

```
1. Location tem: [Piscina, Academia]
2. Herança = ON
3. Usuário tenta selecionar "Piscina" manualmente
4. Sistema mostra badge "Do local" ao lado
5. Checkbox marcado mas desabilitado (não pode desmarcar)
6. Evita duplicação: Total correto = 2 (não 3)
```

---

## 💾 ESTRUTURA DE DADOS

### Input (Props):

```typescript
interface ContentAmenitiesStepProps {
  value: {
    locationId?: string;           // ID do Location (se vinculado)
    locationAmenities?: string[];  // Herdadas do Location
    propertyAmenities?: string[];  // Específicas da unidade
    inheritLocationAmenities?: boolean;  // Herdar ou não
  };
  onChange: (data: any) => void;
}
```

### Output (onChange):

```typescript
{
  propertyAmenities: [
    "wifi",
    "wifi-fast",
    "work-desk",
    "balcony",
    "terrace",
    "mountain-view",
    "ocean-view",
    "air-conditioning"
  ],
  inheritLocationAmenities: true
}
```

### Cálculo das Amenidades Totais:

```typescript
const totalAmenities = inheritLocationAmenities
  ? [...new Set([...locationAmenities, ...propertyAmenities])]
  : propertyAmenities;

// Exemplo:
// locationAmenities = ["pool", "gym", "doorman"]
// propertyAmenities = ["wifi", "balcony", "pool"] // pool duplicado
// inheritLocationAmenities = true
// 
// totalAmenities = ["pool", "gym", "doorman", "wifi", "balcony"]
// → 5 únicas (não 6)
```

---

## 🎯 VALIDAÇÃO

### Campos Obrigatórios:
❌ **NENHUM** - Step é "recommended" mas não obrigatório

### Recomendações:
- ✅ Mínimo de 5 amenidades totais
- ✅ Pelo menos 1 amenidade de "Internet"
- ✅ Pelo menos 1 amenidade de "Cozinha"

### Avisos:
- ⚠️ Menos de 3 amenidades: "Considere adicionar mais amenidades para atrair hóspedes"
- ⚠️ Nenhuma amenidade de Internet: "Wi-Fi é essencial para a maioria dos hóspedes"

---

## 🔌 INTEGRAÇÃO COM OUTROS STEPS

### Step 2 (Localização) → Step 4 (Amenidades):

```typescript
// Do Step 2
formData.contentLocation = {
  selectedLocationId: "LOC-001",
  locationAmenities: ["pool", "gym", "doorman", "elevator"],
  ...
}

// Para o Step 4
<ContentAmenitiesStep
  value={{
    locationId: formData.contentLocation.selectedLocationId,
    locationAmenities: formData.contentLocation.locationAmenities,
    ...
  }}
/>
```

### Step 4 (Amenidades) → Salvamento Final:

```typescript
// Ao salvar a propriedade
const property = {
  ...otherFields,
  amenities: formData.contentAmenities.propertyAmenities,
  inheritLocationAmenities: formData.contentAmenities.inheritLocationAmenities,
  locationId: formData.contentLocation.selectedLocationId,
}

// No backend, ao retornar para o frontend:
const totalAmenities = property.inheritLocationAmenities
  ? [...new Set([
      ...location.sharedAmenities,
      ...property.amenities
    ])]
  : property.amenities;
```

---

## 📊 ESTATÍSTICAS E MÉTRICAS

### Por Categoria:

```
🌳 Ao ar livre / Vista:
   - Da Unidade: 5/34 (15%)
   - Do Local: 2/34 (6%)
   - Total: 7/34 (21%)

💻 Internet e Escritório:
   - Da Unidade: 3/13 (23%)
   - Do Local: 0/13 (0%)
   - Total: 3/13 (23%)
```

### Totais:

```
╔════════════════════════════════════════╗
║  TOTAL DE AMENIDADES                   ║
╟────────────────────────────────────────╢
║  Herdadas do Local:         15         ║
║  Específicas da Unidade:     8         ║
║  ─────────────────────────────────     ║
║  TOTAL:                     23         ║
╚════════════════════════════════════════╝
```

---

## 🎨 ESTADOS VISUAIS

### Estado Normal (Amenidade não selecionada):
```css
border: 1px solid #e5e7eb;
background: white;
hover: background #f3f4f6;
```

### Estado Selecionado (Específica da Unidade):
```css
border: 1px solid #3b82f6;
background: #eff6ff;
checkbox: checked + blue
```

### Estado Herdado (Do Location):
```css
border: 1px solid rgba(primary, 0.3);
background: rgba(primary, 0.05);
badge: "Do local" + Building2 icon
```

### Estado Selecionado + Herdado (Duplicado):
```css
border: 1px solid #3b82f6;
background: #eff6ff;
badge: "Do local" (mostra que já está incluído)
checkbox: disabled (não pode desselecionar)
```

---

## 🚀 EXPORTAÇÃO PARA PLATAFORMAS

### Airbnb:
```json
{
  "amenities": [
    "pool",        // Do local
    "gym",         // Do local
    "wifi",        // Da unidade
    "balcony",     // Da unidade
    "ocean-view"   // Da unidade
  ]
}
```

### Booking.com:
```json
{
  "facilities": {
    "property": ["wifi", "balcony", "ocean-view"],
    "shared": ["pool", "gym"]
  }
}
```

**Nota:** Algumas plataformas separam amenidades compartilhadas vs. privativas.

---

## ✅ TESTES RECOMENDADOS

### Teste 1: Herança Básica
1. ✅ Criar Location com 5 amenidades
2. ✅ Criar Anúncio vinculado ao Location
3. ✅ Verificar toggle "Herdar" = ON por padrão
4. ✅ Verificar preview mostra 5 herdadas
5. ✅ Verificar estatística "Do Local" = 5

### Teste 2: Desabilitar Herança
1. ✅ Toggle = ON, Total = 10
2. ✅ Desligar toggle
3. ✅ Verificar Total = 5 (apenas específicas)
4. ✅ Ligar toggle novamente
5. ✅ Verificar Total = 10 (restaurado)

### Teste 3: Duplicação
1. ✅ Location tem "Piscina"
2. ✅ Selecionar "Piscina" manualmente
3. ✅ Verificar badge "Do local"
4. ✅ Verificar Total = 1 (não duplica)

### Teste 4: Busca
1. ✅ Buscar "wifi"
2. ✅ Verificar filtra apenas Wi-Fi
3. ✅ Buscar "vista"
4. ✅ Verificar filtra "Vista mar", "Vista montanha", etc.
5. ✅ Limpar busca

### Teste 5: Selecionar Todas
1. ✅ Expandir categoria "Internet"
2. ✅ Clicar "Selecionar Todas"
3. ✅ Verificar 13 selecionadas
4. ✅ Clicar "Limpar Seleção"
5. ✅ Verificar 0 selecionadas

---

## 📁 ARQUIVOS

### Criados:
1. `/components/wizard-steps/ContentAmenitiesStep.tsx` - Step completo

### Modificados:
1. `/components/PropertyEditWizard.tsx` - Integração do Step 4

---

## 🎯 PRÓXIMOS PASSOS

### Fase 1: ✅ CONCLUÍDO
- ✅ Criar ContentAmenitiesStep.tsx
- ✅ Integrar no PropertyEditWizard
- ✅ Sistema de herança do Location
- ✅ 13 categorias com 252 amenidades
- ✅ Estatísticas em tempo real

### Fase 2: 🔜 Step 5 - Fotos
- [ ] Integrar ContentPhotosStep no wizard
- [ ] Sistema de upload de fotos
- [ ] Galeria com drag & drop
- [ ] Seleção de foto de capa

### Fase 3: 🔜 Step 6 - Descrição
- [ ] Criar ContentDescriptionStep
- [ ] Editor de texto rico
- [ ] Sugestões automáticas
- [ ] Preview final

---

## 🏆 DIFERENCIAIS

### ✨ Inovações:

1. **Herança Inteligente**
   - Primeiro sistema a herdar amenidades do Location
   - Evita duplicação automática
   - Toggle simples para ativar/desativar

2. **Visualização Separada**
   - Mostra claramente "Do Local" vs "Da Unidade"
   - Estatísticas por categoria
   - 3 métricas em destaque

3. **UX Otimizada**
   - Busca em tempo real
   - Selecionar todas / Limpar por categoria
   - Expandir/colapsar categorias
   - Preview em tempo real

4. **Evita Erros**
   - Não permite duplicação
   - Mostra badge quando amenidade já está incluída
   - Resumo final claro

---

**RENDIZY v1.0.103.11** - Sistema de Gestão de Imóveis de Temporada
