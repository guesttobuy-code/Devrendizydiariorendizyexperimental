# CORREÇÃO: Campos Personalizados nas Configurações
## v1.0.103.12 - 29 OUT 2025

---

## 🔴 PROBLEMA IDENTIFICADO

O usuário corretamente identificou uma **falha de arquitetura**:

### ❌ **Implementação Anterior (Errada)**
- Campos personalizados eram criados **dentro do wizard** de cada propriedade
- Cada propriedade tinha seus próprios campos personalizados únicos
- Não havia padronização entre propriedades
- Era necessário recriar campos manualmente em cada anúncio

### ✅ **Implementação Correta (Nova)**
- Campos personalizados são configurados **nas Settings globais**
- Admin define uma vez e aplica para **todas as propriedades**
- Padronização automática
- No wizard, apenas **preenche os valores** dos campos pré-configurados

---

## ✅ SOLUÇÃO IMPLEMENTADA

### 1. **Nova Seção em LocationsListingsSettings**

Adicionei uma seção completa de **"Campos Personalizados de Descrição"**:

```typescript
interface LocationsListingsSettingsConfig {
  // ... outros campos
  
  customDescriptionFields: Array<{
    id: string;
    label: string;
    placeholder: {
      pt: string;
      en: string;
      es: string;
    };
    required: boolean;
    order: number;
  }>;
}
```

**Funcionalidades:**
- ➕ Botão "Adicionar Campo Personalizado"
- ✏️ Nome do campo customizável
- 🌍 Placeholders em 3 idiomas (PT, EN, ES)
- ⚙️ Toggle obrigatório/opcional
- 🗑️ Remover campos
- 📊 Drag & drop para reordenar (visual com GripVertical)

**Exemplos de Campos:**
- Link do GPS
- Senha do Cofre
- Instruções de Vendas
- Vídeo como chegar
- Link da Foto da Porta com cofre
- Instruções de Check-in
- Instruções de Estacionamento
- Casa de praia / campo (informações específicas)

---

### 2. **ContentDescriptionStep Atualizado**

O step agora **recebe** os campos configurados via props:

```typescript
interface ContentDescriptionStepProps {
  value: {
    fixedFields?: { ... };
    customFieldsValues?: { [fieldId: string]: CustomFieldValue }; // Apenas valores!
    autoTranslate?: boolean;
  };
  onChange: (data: any) => void;
  configuredCustomFields?: ConfiguredCustomField[]; // Vem das Settings
}
```

**Mudanças:**
- ❌ Removido: Botão "Adicionar Campo Personalizado"
- ❌ Removido: Input para nome do campo
- ❌ Removido: `customFields` (array com estrutura completa)
- ✅ Adicionado: `customFieldsValues` (apenas valores por ID)
- ✅ Adicionado: `configuredCustomFields` (estrutura vem das Settings)

**Agora o Step 6:**
1. Recebe a lista de campos configurados das Settings
2. Exibe automaticamente todos os campos
3. Permite apenas **preencher os valores** em PT, EN, ES
4. Não permite criar/remover campos (isso é feito nas Settings)

---

### 3. **Fluxo Completo**

#### **Passo 1: Configurar Campos (Admin)**

```
1. Admin vai em "Configurações"
2. Seleciona aba "Locais & Anúncios"
3. Rola até "Campos Personalizados de Descrição"
4. Clica "+ Adicionar Campo Personalizado"
5. Preenche:
   - Nome: "Link do GPS"
   - Placeholder PT: "Cole o link do Google Maps aqui..."
   - Placeholder EN: "Paste Google Maps link here..."
   - Placeholder ES: "Pegue el enlace de Google Maps aquí..."
   - Obrigatório: ☑️
6. Adiciona mais campos:
   - "Senha do Cofre"
   - "Instruções de Check-in"
   - "Vídeo Como Chegar"
7. Clica "Salvar Configurações"
```

#### **Passo 2: Preencher Valores (Ao Criar Propriedade)**

```
1. Usuário cria nova propriedade
2. Avança até Step 6 - Descrição
3. Vê automaticamente:
   ├─ 6 Campos Fixos (padrão)
   └─ 4 Campos Personalizados (das Settings):
      ├─ Link do GPS *
      ├─ Senha do Cofre *
      ├─ Instruções de Check-in *
      └─ Vídeo Como Chegar
4. Preenche apenas os VALORES em PT:
   - Link do GPS: "https://goo.gl/maps/xyz123"
   - Senha do Cofre: "🔐 1234 - Cofre no armário principal"
   - Instruções: "Self check-in pelo cofre..."
5. (Opcional) Ativa "Tradução Automática"
6. Clica "Traduzir" para auto-preencher EN e ES
7. Avança para próximo step
```

#### **Passo 3: Todos os Anúncios Herdam**

```
✅ Campo "Link do GPS" aparece em:
   - Propriedade A (Hotel Vista Mar)
   - Propriedade B (Apartamento Centro)
   - Propriedade C (Casa Praia)
   ... todas as propriedades!

✅ Se admin adicionar novo campo:
   - "Instruções de Segurança"
   → Aparece automaticamente em todas

✅ Se admin remover campo:
   - "Vídeo Como Chegar"
   → Desaparece de todas (dados preservados no backend)
```

---

## 📊 COMPARAÇÃO

### ❌ **ANTES (Errado)**

```
PropertyEditWizard (Step 6)
└─ Campos Fixos (6)
└─ Campos Personalizados
   ├─ [+ Adicionar Campo]    ← Cada propriedade criava os seus
   ├─ Campo: "GPS"
   ├─ Campo: "Senha Cofre"
   └─ Campo: "Check-in"
   
Propriedade A: 8 campos personalizados
Propriedade B: 3 campos personalizados
Propriedade C: 12 campos personalizados
❌ Sem padronização!
```

### ✅ **DEPOIS (Correto)**

```
Settings → Locais & Anúncios
└─ Campos Personalizados de Descrição
   ├─ [+ Adicionar Campo]    ← Admin configura uma vez
   ├─ Campo: "Link do GPS"
   ├─ Campo: "Senha do Cofre"  
   ├─ Campo: "Instruções Check-in"
   └─ Campo: "Vídeo Como Chegar"

PropertyEditWizard (Step 6)
└─ Campos Fixos (6)
└─ Campos Personalizados (4) ← Herdados das Settings
   ├─ Link do GPS: [preencher valor]
   ├─ Senha do Cofre: [preencher valor]
   ├─ Instruções Check-in: [preencher valor]
   └─ Vídeo Como Chegar: [preencher valor]

Propriedade A: 4 campos (mesmo template)
Propriedade B: 4 campos (mesmo template)
Propriedade C: 4 campos (mesmo template)
✅ Padronizado!
```

---

## 🎯 BENEFÍCIOS

### 1. **Padronização**
- Todos os anúncios têm os mesmos campos
- Facilita preenchimento em lote
- Evita esquecimento de informações importantes

### 2. **Escalabilidade**
- Adicionar 1 campo → Aparece em 100 propriedades
- Sem necessidade de editar propriedade por propriedade

### 3. **Manutenção**
- Alterar label de campo → Atualiza em todas
- Remover campo obsoleto → Remove de todas

### 4. **UX Melhorada**
- Usuário não precisa pensar "que campos criar?"
- Admin já definiu o padrão
- Apenas preenche valores

### 5. **Controle Centralizado**
- Admin Master controla estrutura
- Usuários finais apenas preenchem
- Hierarquia clara de permissões

---

## 📁 ARQUIVOS MODIFICADOS

### Criados:
- `/CORRECAO_CAMPOS_PERSONALIZADOS_v1.0.103.12.md` - Este documento

### Modificados:
1. `/components/LocationsListingsSettings.tsx`
   - ✅ Nova interface `customDescriptionFields`
   - ✅ Seção "Campos Personalizados de Descrição"
   - ✅ Botão adicionar/remover campos
   - ✅ Inputs para nome e placeholders (PT, EN, ES)
   - ✅ Toggle obrigatório/opcional
   - ✅ Visual com ícones e badges

2. `/components/wizard-steps/ContentDescriptionStep.tsx` (reescrito)
   - ✅ Nova prop `configuredCustomFields`
   - ✅ Removido botão adicionar campo
   - ✅ Removido input de nome do campo
   - ✅ Mudança: `customFields[]` → `customFieldsValues{}`
   - ✅ Alert quando não há campos configurados
   - ✅ Link para Settings

3. `/components/PropertyEditWizard.tsx`
   - ✅ Atualizado `formData.contentDescription`
   - ✅ Adicionado TODO para buscar `configuredCustomFields`
   - ✅ Pass prop para ContentDescriptionStep

---

## 🔜 PRÓXIMOS PASSOS

### Fase 1: Backend (Urgente)
```typescript
// 1. Salvar configuração de campos personalizados
POST /api/settings/custom-description-fields
{
  customDescriptionFields: [
    {
      id: "custom_1730228400000",
      label: "Link do GPS",
      placeholder: { pt: "...", en: "...", es: "..." },
      required: true,
      order: 0
    }
  ]
}

// 2. Buscar configuração ao abrir wizard
GET /api/settings/custom-description-fields
→ Retorna array de campos configurados

// 3. Salvar valores da propriedade
POST /api/properties/{id}
{
  descriptionFields: { ... },
  customDescriptionFieldsValues: {
    "custom_1730228400000": {
      pt: "https://goo.gl/maps/xyz",
      en: "https://goo.gl/maps/xyz",
      es: "https://goo.gl/maps/xyz"
    }
  }
}
```

### Fase 2: Integração no PropertyEditWizard
```typescript
// Buscar campos configurados ao montar o wizard
useEffect(() => {
  const fetchConfiguredFields = async () => {
    const response = await api.get('/settings/custom-description-fields');
    setConfiguredCustomFields(response.data);
  };
  fetchConfiguredFields();
}, []);
```

### Fase 3: Testes
- [ ] Adicionar campo nas Settings
- [ ] Verificar aparição no Step 6
- [ ] Preencher valores em propriedade
- [ ] Salvar propriedade
- [ ] Editar propriedade existente
- [ ] Verificar valores salvos
- [ ] Remover campo nas Settings
- [ ] Verificar desaparecimento no Step 6

---

## ✅ RESUMO

### O Que Mudou:
| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Onde criar** | No wizard de cada propriedade | Nas Settings (1 vez) |
| **Padronização** | ❌ Cada propriedade diferente | ✅ Todas iguais |
| **Escalabilidade** | ❌ Editar 100 propriedades | ✅ Adicionar 1 campo → 100 propriedades |
| **UX** | 🤔 Usuário pensa "que campos?" | ✅ Admin já definiu |
| **Manutenção** | ❌ Mudar 1 por 1 | ✅ Mudar 1 vez |

### Próxima Ação:
✅ **Implementar backend** para salvar/buscar `customDescriptionFields` das Settings

---

**Correção aplicada com sucesso! 🎉**

**Versão:** 1.0.103.12  
**Data:** 29 OUT 2025  
**Autor:** Manus AI  
**Status:** ✅ ARQUITETURA CORRIGIDA
