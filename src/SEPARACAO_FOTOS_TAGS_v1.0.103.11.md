# RENDIZY - Separação: Tags vs Fotos de Capa
## v1.0.103.11 - 29/10/2025

---

## 📋 CONTEXTO

Seguindo o padrão do Airbnb/Booking, separamos completamente:
- **Step 3 (Cômodos)**: Tags de categorização POR CÔMODO (sem capa)
- **Step 5 (Fotos e Mídia)**: Galeria completa DA PROPRIEDADE com foto de capa

---

## ✅ SEPARAÇÃO IMPLEMENTADA

### 🏠 Step 3: Cômodos e Distribuição
**Arquivo**: `/components/wizard-steps/ContentRoomsStep.tsx`

#### O que PERMANECEU:
✅ Upload de fotos por cômodo
✅ Tags de categorização (Academia, Banheiro, Piscina, etc.)
✅ Seleção em lote para aplicar tags
✅ Drag & drop para reordenar fotos do cômodo

#### O que foi REMOVIDO:
❌ Badge de "Capa" nas fotos
❌ Botão "Definir como Capa"
❌ Flag `isCover` na interface Photo
❌ Função `setCoverPhoto()`
❌ Ring verde para destacar foto de capa
❌ Lógica de auto-definir primeira foto como capa

---

### 📸 Step 5: Fotos e Mídia
**Arquivo**: `/components/wizard-steps/ContentPhotosStep.tsx` ✨ **NOVO**

#### Funcionalidades COMPLETAS:
✅ Upload de fotos da propriedade (não por cômodo)
✅ Grid em sequência (2-4 colunas responsivo)
✅ **Definir foto de capa** (badge amarelo com ⭐)
✅ Botão "Definir Capa" em cada foto
✅ Tags de categorização (mesmas do Step 3)
✅ Seleção em lote + aplicar tags múltiplas
✅ Drag & drop para reordenar sequência
✅ Numeração automática (1, 2, 3, 4...)
✅ Auto-definir primeira foto como capa
✅ Ao deletar capa, primeira foto vira nova capa
✅ Área de upload com drag & drop visual

---

## 🎨 INTERFACE STEP 5 (FOTOS E MÍDIA)

### Área de Upload
```
┌─────────────────────────────────────────────┐
│           📷                                 │
│                                             │
│  Arraste suas imagens aqui ou clique       │
│  Formatos aceitos: JPG, PNG, WEBP          │
│                                             │
│         [📤 Selecionar Imagens]            │
└─────────────────────────────────────────────┘
```

### Toolbar de Seleção
```
┌─────────────────────────────────────────────┐
│ 3 foto(s) selecionada(s)                   │
│ [Selecionar Todas] [Limpar Seleção]        │
│                    [🏷️ Adicionar Tags (3)] │
└─────────────────────────────────────────────┘
```

### Grid de Fotos
```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ ☑️    ⭐CAPA│ │ ☐     2  │ │ ☐     3  │ │ ☐     4  │
│          │ │          │ │          │ │          │
│  FOTO 1  │ │  FOTO 2  │ │  FOTO 3  │ │  FOTO 4  │
│          │ │          │ │          │ │          │
│ Piscina  │ │[Def Capa]│ │[Def Capa]│ │[Def Capa]│
│ Vista    │ │  [🗑️]   │ │  [🗑️]   │ │  [🗑️]   │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

---

## 🔄 FLUXO DE USO

### Cenário 1: Upload inicial
1. Usuário vai para **Step 5 (Fotos e Mídia)**
2. Clica em "Selecionar Imagens" ou arrasta fotos
3. **Primeira foto é automaticamente definida como CAPA** ⭐
4. Fotos aparecem em grid sequencial (1, 2, 3, 4...)

### Cenário 2: Definir outra foto como capa
1. Usuário passa mouse sobre foto #3
2. Clica em "⭐ Definir Capa"
3. Badge amarelo com estrela aparece na foto #3
4. Foto #1 perde o badge de capa

### Cenário 3: Adicionar tags em lote
1. Usuário seleciona fotos 2, 3 e 4 (checkbox)
2. Clica em "🏷️ Adicionar Tags (3)"
3. Modal abre com 40+ categorias
4. Seleciona "Piscina", "Vista", "Área Externa"
5. Clica "Aplicar Tags"
6. Tags aparecem embaixo das 3 fotos

### Cenário 4: Reordenar fotos
1. Usuário arrasta foto #4 para primeira posição
2. Foto #4 vira #1, #1 vira #2, etc.
3. Numeração atualiza automaticamente

### Cenário 5: Deletar foto de capa
1. Usuário deleta foto que é capa (com ⭐)
2. **Primeira foto restante vira nova capa automaticamente**

---

## 📊 COMPARAÇÃO: ANTES vs DEPOIS

### ANTES (Versão antiga)
```
Step 3: Cômodos
├── Upload por cômodo
├── Tags + Capa (misturado)
└── Badge verde "Capa" por cômodo ❌

Step 5: ❌ NÃO EXISTIA
```

### DEPOIS (v1.0.103.11)
```
Step 3: Cômodos e Distribuição
├── Upload por cômodo
├── APENAS Tags (Academia, Piscina, etc.)
└── SEM funcionalidade de capa ✅

Step 5: Fotos e Mídia ✨ NOVO
├── Upload global da propriedade
├── Grid em sequência
├── Badge amarelo ⭐ CAPA
├── Botão "Definir Capa"
├── Tags de categorização
└── Drag & drop para reordenar ✅
```

---

## 🎯 INTERFACE PHOTO

### Step 3 (Cômodos) - Interface Photo
```typescript
interface Photo {
  id: string;
  url: string;
  tags: string[];      // ✅ Tags apenas
  order: number;
  // ❌ isCover: REMOVIDO
}
```

### Step 5 (Fotos e Mídia) - Interface Photo
```typescript
interface Photo {
  id: string;
  url: string;
  path?: string;
  tags: string[];      // ✅ Tags
  isCover: boolean;    // ✅ Capa aqui sim!
  order: number;
}
```

---

## 🎨 BADGES E INDICADORES VISUAIS

### Step 3 (Cômodos)
```tsx
// APENAS Tags
<Badge variant="secondary">
  Piscina
  <span className="ml-1">×</span>
</Badge>
```

### Step 5 (Fotos e Mídia)
```tsx
// Badge de CAPA (amarelo com estrela)
{photo.isCover && (
  <Badge className="bg-yellow-500 hover:bg-yellow-600">
    <Star className="h-3 w-3 mr-1 fill-white" />
    CAPA
  </Badge>
)}

// Badge de Tags (cinza)
<Badge variant="secondary">
  Piscina
  <span className="ml-1">×</span>
</Badge>
```

---

## 🔧 ALTERAÇÕES TÉCNICAS

### Arquivo: ContentRoomsStep.tsx

**Removido:**
1. ❌ Flag `isCover` da interface Photo
2. ❌ Função `setCoverPhoto(photoId: string)`
3. ❌ Badge verde "Capa"
4. ❌ Botão "Tornar Capa"
5. ❌ Ring verde `ring-2 ring-green-500`
6. ❌ Lógica de auto-definir primeira como capa
7. ❌ Lógica de re-atribuir capa ao deletar

**Mantido:**
1. ✅ Upload de fotos por cômodo
2. ✅ Sistema de tags (PHOTO_TAGS)
3. ✅ Modal de tags com seleção múltipla
4. ✅ Drag & drop para reordenar
5. ✅ Seleção em lote
6. ✅ Checkbox de seleção
7. ✅ Botão deletar foto

---

### Arquivo: ContentPhotosStep.tsx ✨ NOVO

**Criado do zero com:**
1. ✅ Upload global da propriedade
2. ✅ Interface Photo com `isCover`
3. ✅ Função `setCoverPhoto(photoId: string)`
4. ✅ Badge amarelo com estrela ⭐
5. ✅ Botão "Definir Capa"
6. ✅ Ring amarelo `ring-2 ring-yellow-500`
7. ✅ Auto-definir primeira como capa
8. ✅ Re-atribuir capa ao deletar
9. ✅ Grid responsivo (2-4 colunas)
10. ✅ Numeração automática
11. ✅ Área de upload visual
12. ✅ Toolbar de seleção
13. ✅ Modal de tags reutilizado
14. ✅ Drag & drop para sequenciar

---

## 📁 ESTRUTURA DE ARQUIVOS

```
/components/wizard-steps/
├── ContentTypeStep.tsx           # Step 1: Tipo
├── ContentLocationStep.tsx       # Step 2: Localização
├── ContentRoomsStep.tsx          # Step 3: Cômodos (APENAS TAGS)
├── ContentPhotosStep.tsx         # Step 5: Fotos (COM CAPA) ✨ NOVO
└── ...outros steps...
```

---

## 🚀 PRÓXIMOS PASSOS

1. **Integrar Step 5 no PropertyEditWizard**
   - Adicionar rota no wizard
   - Configurar navegação entre steps
   - Adicionar ao breadcrumb

2. **Backend Integration**
   - Endpoint para upload de fotos da propriedade
   - Salvar flag `isCover` no banco
   - Retornar fotos ordenadas por `order`

3. **Validação**
   - Garantir que existe pelo menos 1 foto
   - Garantir que existe 1 foto de capa

4. **Step 6: Descrições**
   - Título da propriedade
   - Descrição completa
   - Regras da casa

---

## ✅ STATUS: IMPLEMENTADO E SEPARADO

- ✅ Step 3: Fotos por cômodo com tags apenas
- ✅ Step 5: Galeria da propriedade com capa
- ✅ Interfaces separadas corretamente
- ✅ Badges e indicadores visuais distintos
- ✅ Lógica de capa completa no Step 5
- ✅ Documentação completa

---

**RENDIZY v1.0.103.11** - Sistema de Gestão de Imóveis de Temporada
