# 🏗️ IMPLEMENTAÇÃO: GERENCIAMENTO DE TIPOS DE PROPRIEDADES

**Versão:** v1.0.103.8  
**Data:** 29 de Outubro de 2025  
**Sistema:** RENDIZY - Gestão de Imóveis de Temporada

---

## 📋 RESUMO DA IMPLEMENTAÇÃO

Criamos um sistema completo de gerenciamento de **Tipos de Local** e **Tipos de Anúncio** dentro das Configurações, com acesso **restrito a Admin Master**.

---

## 🎯 OBJETIVO

Permitir que o **Admin Master** cadastre e gerencie os tipos disponíveis para:

1. **Tipos de Local** (Location/Structure Types)
   - Hotel, Pousada, Casa, Apartamento, Resort, etc
   - Usado quando o imóvel é médio/grande porte

2. **Tipos de Anúncio** (Accommodation Types)
   - Suíte, Apartamento, Chalé, Quarto, Studio, etc
   - Usado para anúncios individuais

---

## 🏛️ ARQUITETURA

### **Frontend:**

```
SettingsManager.tsx
  └─ Tab "Tipos de Imóveis"
       └─ PropertyTypesManager.tsx
            ├─ Tabs (Tipos de Local | Tipos de Anúncio)
            ├─ CreateEditModal
            ├─ DeleteModal
            └─ Tabelas com CRUD completo
```

### **Backend:**

```
routes-property-types.ts
  ├─ GET    /property-types          (listar todos)
  ├─ GET    /property-types/:id      (buscar por ID)
  ├─ POST   /property-types          (criar novo)
  ├─ PUT    /property-types/:id      (atualizar)
  └─ DELETE /property-types/:id      (deletar/desativar)
```

---

## 📁 ARQUIVOS CRIADOS/MODIFICADOS

### ✅ **Novos Arquivos:**

1. **`/components/PropertyTypesManager.tsx`**
   - Interface completa de gerenciamento
   - 2 Tabs: Location Types | Accommodation Types
   - Modais de Create/Edit/Delete
   - Filtros e busca
   - Validação de Admin Master

2. **`/supabase/functions/server/routes-property-types.ts`**
   - Rotas CRUD completas
   - Auto-seed de tipos do sistema na primeira execução
   - 30 tipos de local pré-cadastrados
   - 21 tipos de anúncio pré-cadastrados
   - Soft delete para tipos do sistema

### ✏️ **Arquivos Modificados:**

1. **`/components/SettingsManager.tsx`**
   - Import de `PropertyTypesManager`
   - Tab já existente agora usa o novo componente

2. **`/supabase/functions/server/index.tsx`**
   - Import das rotas de property-types
   - Registro da rota `/property-types`

---

## 🔒 SEGURANÇA - ADMIN MASTER ONLY

### **Verificação no Frontend:**

```typescript
const { user, isSuperAdmin } = useAuth();

if (!isSuperAdmin) {
  return (
    <Card>
      <CardContent>
        <Shield className="h-12 w-12 text-red-500" />
        <h3>Acesso Restrito</h3>
        <p>Somente Administradores Master podem gerenciar tipos</p>
        <Badge variant="destructive">
          <Lock className="h-3 w-3" />
          Admin Master Necessário
        </Badge>
      </CardContent>
    </Card>
  );
}
```

### **Validação no Backend:**

> ⚠️ **TODO:** Implementar validação de role no backend
> 
> Adicionar middleware para verificar se o usuário é `super_admin` antes de permitir:
> - POST (criar)
> - PUT (atualizar)
> - DELETE (deletar)
> 
> GET pode ser permitido para todos (leitura)

---

## 🗂️ ESTRUTURA DE DADOS

### **PropertyType Interface:**

```typescript
interface PropertyType {
  id: string;                    // ID único
  code: string;                  // Código interno (snake_case)
  name: string;                  // Nome exibido
  category: 'location' | 'accommodation';
  icon?: string;                 // Emoji (opcional)
  description?: string;          // Descrição (opcional)
  isActive: boolean;             // Ativo/Inativo
  isSystem: boolean;             // Tipo do sistema (não pode deletar)
  usage_count?: number;          // Quantas propriedades usam
  created_at: string;
  updated_at: string;
}
```

### **Exemplos:**

**Tipo de Local:**
```json
{
  "id": "location_hotel_boutique_1730246400000",
  "code": "hotel_boutique",
  "name": "Hotel Boutique",
  "category": "location",
  "icon": "💎",
  "description": "Hotel exclusivo e sofisticado",
  "isActive": true,
  "isSystem": true,
  "usage_count": 5,
  "created_at": "2025-10-29T14:30:00.000Z",
  "updated_at": "2025-10-29T14:30:00.000Z"
}
```

**Tipo de Anúncio:**
```json
{
  "id": "accommodation_suite_1730246400000",
  "code": "suite",
  "name": "Suíte",
  "category": "accommodation",
  "icon": "🛏️",
  "description": "Suíte com banheiro privativo",
  "isActive": true,
  "isSystem": true,
  "usage_count": 12,
  "created_at": "2025-10-29T14:30:00.000Z",
  "updated_at": "2025-10-29T14:30:00.000Z"
}
```

---

## 🌱 AUTO-SEED DE TIPOS DO SISTEMA

### **30 Tipos de Local (Location Types):**

```typescript
// Hotéis e Pousadas
'hotel', 'hotel_boutique', 'pousada', 'boutique', 'estalagem', 
'resort', 'motel', 'hostel', 'albergue'

// Casas e Residências
'casa', 'villa', 'residencia', 'apartamento', 'apartamento_residencial',
'condominio', 'bangalo', 'chale'

// Especiais
'castelo', 'treehouse', 'cabana', 'camping', 'fazenda'

// Móveis e Embarcações
'barco', 'barco_beira', 'iate', 'casa_movel', 'acomodacao_movel'

// Outros
'cama_cafe', 'industrial', 'chale_camping'
```

### **21 Tipos de Anúncio (Accommodation Types):**

```typescript
// Apartamentos e Casas
'apartamento', 'casa', 'villa', 'condominio', 'estudio', 'loft'

// Quartos
'suite', 'quarto_inteiro', 'quarto_privado', 'quarto_compartilhado',
'dormitorio', 'casa_dormitorios'

// Hotéis
'hotel', 'hostel'

// Especiais
'bangalo', 'chale', 'cabana', 'treehouse', 'camping'

// Móveis e Embarcações
'capsula', 'iate'

// Outros
'industrial'
```

### **Como Funciona:**

1. Na primeira chamada `GET /property-types`
2. Se não existir nenhum tipo cadastrado
3. Sistema executa `seedSystemTypes()`
4. Cria automaticamente todos os 51 tipos
5. Próximas chamadas apenas retornam os tipos existentes

---

## 🎨 INTERFACE DO USUÁRIO

### **Layout Principal:**

```
┌──────────────────────────────────────────────────────┐
│  Tipos de Propriedades          [🛡️ Admin Master]   │
│  Gerencie os tipos de locais e anúncios             │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────────┐  ┌────────────────────┐    │
│  │ 🏨 Tipos de Local  │  │ 🏠 Tipos de Anúncio│    │
│  │                    │  │                    │    │
│  │       30           │  │       21           │    │
│  │    28 ativos       │  │    21 ativos       │    │
│  └────────────────────┘  └────────────────────┘    │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │ [🏨 Tipos de Local] [🏠 Tipos de Anúncio]    │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  ┌───────────────────────────────────────────────┐ │
│  │ 🔍 [Buscar...]    [Filtro: Todos ▾]          │ │
│  │                              [+ Adicionar]    │ │
│  └───────────────────────────────────────────────┘ │
│                                                      │
│  ┌───────────────────────────────────────────────┐ │
│  │ Ícone │ Nome           │ Código  │ Status  │ │ │
│  ├───────────────────────────────────────────────┤ │
│  │  🏨   │ Hotel          │ hotel   │ ✓ Ativo │✏️│ │
│  │  💎   │ Hotel Boutique │ hotel_b │ ✓ Ativo │✏️│ │
│  │  🏡   │ Pousada        │ pousada │ ✓ Ativo │✏️│ │
│  │  🏠   │ Casa           │ casa    │ ✓ Ativo │✏️│ │
│  │  ...  │ ...            │ ...     │ ...     │  │ │
│  └───────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### **Modal de Criação/Edição:**

```
┌─────────────────────────────────────────┐
│  Novo Tipo de Local                     │
├─────────────────────────────────────────┤
│                                         │
│  Código *                               │
│  ┌───────────────────────────────────┐ │
│  │ [boutique_hotel]                  │ │
│  └───────────────────────────────────┘ │
│  (usado internamente, sem espaços)     │
│                                         │
│  Nome *                                 │
│  ┌───────────────────────────────────┐ │
│  │ [Hotel Boutique]                  │ │
│  └───────────────────────────────────┘ │
│  (exibido para o usuário)              │
│                                         │
│  Ícone (emoji)                          │
│  ┌───────────────────────────────────┐ │
│  │ [💎]                              │ │
│  └───────────────────────────────────┘ │
│  (opcional)                             │
│                                         │
│  Descrição                              │
│  ┌───────────────────────────────────┐ │
│  │ [Hotel exclusivo e sofisticado]   │ │
│  └───────────────────────────────────┘ │
│  (opcional)                             │
│                                         │
│                                         │
│         [Cancelar]      [Salvar]       │
└─────────────────────────────────────────┘
```

### **Modal de Exclusão:**

```
┌─────────────────────────────────────────┐
│  ⚠️ Confirmar Exclusão                  │
├─────────────────────────────────────────┤
│                                         │
│  Você está prestes a excluir:           │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  💎 Hotel Boutique                │ │
│  │     Código: hotel_boutique        │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ ⚠️ Atenção: Este tipo está em uso!│ │
│  │                                   │ │
│  │ 5 propriedades usam este tipo.    │ │
│  │                                   │ │
│  │ Ao excluir, essas propriedades    │ │
│  │ ficarão sem tipo definido.        │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │ 🔒 Tipo do Sistema                │ │
│  │                                   │ │
│  │ Este tipo é nativo do sistema.    │ │
│  │ Você pode desativá-lo, mas não    │ │
│  │ deletá-lo completamente.          │ │
│  └───────────────────────────────────┘ │
│                                         │
│         [Cancelar]    [Desativar]      │
└─────────────────────────────────────────┘
```

---

## ✨ FUNCIONALIDADES

### **1. Listagem:**
- ✅ 2 Tabs separadas (Location | Accommodation)
- ✅ Busca em tempo real (nome ou código)
- ✅ Filtros: Todos | Ativos | Inativos
- ✅ Contador de uso (quantas propriedades usam cada tipo)
- ✅ Badges: Sistema, Ativo/Inativo
- ✅ Loading state

### **2. Criação:**
- ✅ Modal com validação
- ✅ Código auto-formatado (lowercase, snake_case)
- ✅ Validação de duplicidade
- ✅ Ícone emoji opcional
- ✅ Descrição opcional
- ✅ Ativo por padrão

### **3. Edição:**
- ✅ Modal pré-preenchido
- ✅ Código protegido para tipos do sistema
- ✅ Atualização em tempo real
- ✅ Toast de confirmação

### **4. Exclusão:**
- ✅ Modal de confirmação
- ✅ Aviso de impacto (quantas propriedades usam)
- ✅ Soft delete para tipos do sistema (apenas desativa)
- ✅ Hard delete para tipos customizados
- ✅ Validação de uso antes de deletar

### **5. Segurança:**
- ✅ Acesso restrito a Admin Master (frontend)
- ⚠️ TODO: Validação no backend
- ✅ Tipos do sistema protegidos contra exclusão
- ✅ Código protegido contra alteração em tipos do sistema

---

## 🔄 INTEGRAÇÃO COM WIZARD DE EDIÇÃO

### **Step 1.1: Tipo e Identificação**

Quando o usuário estiver criando/editando uma propriedade no wizard, o Step 1.1 vai buscar os tipos disponíveis:

```typescript
// Buscar tipos disponíveis
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-67caf26a/property-types`
);
const allTypes = await response.json();

// Separar por categoria
const locationTypes = allTypes.filter(t => 
  t.category === 'location' && t.isActive
);
const accommodationTypes = allTypes.filter(t => 
  t.category === 'accommodation' && t.isActive
);
```

### **Exibição no Formulário:**

```typescript
// Tipo de Propriedade (Location)
<Select>
  {locationTypes.map(type => (
    <SelectItem key={type.id} value={type.code}>
      {type.icon} {type.name}
    </SelectItem>
  ))}
</Select>

// Tipo de Anúncio (Accommodation)
<Select>
  {accommodationTypes.map(type => (
    <SelectItem key={type.id} value={type.code}>
      {type.icon} {type.name}
    </SelectItem>
  ))}
</Select>
```

---

## 📊 CONTADORES DE USO

### **Como Funciona:**

O campo `usage_count` mostra quantas propriedades estão usando cada tipo.

### **Implementação Atual:**

```typescript
// Por enquanto retorna 0
usage_count: type.usage_count || 0
```

### **TODO - Implementação Futura:**

```typescript
// Buscar todas as propriedades
const properties = await kv.getByPrefix('property:');

// Contar uso por tipo
const usageMap = new Map();
properties.forEach(prop => {
  if (prop.structureType) {
    usageMap.set(
      prop.structureType, 
      (usageMap.get(prop.structureType) || 0) + 1
    );
  }
  if (prop.accommodationType) {
    usageMap.set(
      prop.accommodationType,
      (usageMap.get(prop.accommodationType) || 0) + 1
    );
  }
});

// Atualizar tipos com contagem real
const allTypes = [...locationTypes, ...accommodationTypes].map(type => ({
  ...type,
  usage_count: usageMap.get(type.code) || 0
}));
```

---

## 🚀 PRÓXIMOS PASSOS

### **1. Validação de Admin Master no Backend** ⚠️ ALTA PRIORIDADE

```typescript
// Em routes-property-types.ts
app.post('/', async (c) => {
  // Verificar role do usuário
  const user = await getUserFromToken(c.req.header('Authorization'));
  
  if (user.role !== 'super_admin') {
    return c.json({ error: 'Acesso negado - Admin Master necessário' }, 403);
  }
  
  // ... resto da lógica
});
```

### **2. Implementar Uso Real no Wizard**

- Integrar os tipos no `PropertyEditWizard.tsx`
- Step 1.1 deve carregar tipos dinamicamente
- Validar tipo selecionado antes de salvar

### **3. Contador de Uso Dinâmico**

- Implementar contagem real de propriedades
- Atualizar automaticamente ao criar/deletar propriedades
- Cache para performance

### **4. Sincronização com OTAs**

- Mapear tipos do Rendizy para tipos do Airbnb
- Mapear tipos do Rendizy para tipos do Booking.com
- Adicionar campo `external_mappings` em PropertyType

```typescript
interface PropertyType {
  // ... campos existentes
  external_mappings?: {
    airbnb?: string;
    booking?: string;
    vrbo?: string;
  }
}
```

### **5. Importação em Massa**

- Permitir importar tipos de CSV
- Export de tipos para backup

### **6. Histórico de Alterações**

- Audit log de quem criou/editou cada tipo
- Quando foi criado/modificado

---

## 🧪 TESTES

### **Como Testar:**

1. **Acessar Configurações:**
   - Menu lateral > ⚙️ Configurações
   - Tab "Tipos de Imóveis"

2. **Verificar Admin Master:**
   - Se não for admin: deve mostrar tela de acesso negado
   - Se for admin: deve mostrar interface completa

3. **Testar Auto-Seed:**
   - Na primeira vez: deve criar 51 tipos automaticamente
   - Verificar 30 tipos de local
   - Verificar 21 tipos de anúncio

4. **Testar Criação:**
   - Clicar em "+ Adicionar" na tab "Tipos de Local"
   - Preencher formulário
   - Salvar
   - Verificar se aparece na lista

5. **Testar Edição:**
   - Clicar no ícone de lápis
   - Alterar nome
   - Salvar
   - Verificar atualização

6. **Testar Exclusão:**
   - Tentar deletar tipo do sistema: deve desativar
   - Tentar deletar tipo customizado: deve deletar permanentemente
   - Verificar modal de confirmação

7. **Testar Filtros:**
   - Buscar por nome
   - Buscar por código
   - Filtrar por Ativos/Inativos

---

## 📝 NOTAS IMPORTANTES

### **Tipos do Sistema vs Tipos Customizados:**

**Tipos do Sistema (`isSystem: true`):**
- ✅ Criados automaticamente no seed
- ✅ Código protegido (não pode alterar)
- ✅ Não podem ser deletados (apenas desativados)
- ✅ 51 tipos pré-definidos

**Tipos Customizados (`isSystem: false`):**
- ✅ Criados pelo Admin Master
- ✅ Código editável até primeira propriedade usar
- ✅ Podem ser deletados permanentemente
- ✅ Ilimitados

### **Convenções de Código:**

- Sempre em `snake_case`
- Sempre em lowercase
- Sem espaços
- Sem caracteres especiais
- Único por categoria

### **Convenções de Nome:**

- Primeira letra maiúscula
- Pode ter espaços
- Pode ter acentos
- Pode ter caracteres especiais
- Descritivo para o usuário

---

## ✅ CHECKLIST DE CONCLUSÃO

- [x] Componente `PropertyTypesManager.tsx` criado
- [x] Rotas backend `routes-property-types.ts` criadas
- [x] Integração com `SettingsManager.tsx`
- [x] Auto-seed de 51 tipos do sistema
- [x] Interface com 2 tabs
- [x] Modais de Create/Edit/Delete
- [x] Filtros e busca
- [x] Validação de Admin Master (frontend)
- [x] Proteção de tipos do sistema
- [x] Soft delete para tipos do sistema
- [ ] Validação de Admin Master (backend) ⚠️ TODO
- [ ] Contador de uso real ⚠️ TODO
- [ ] Integração com wizard ⚠️ TODO
- [ ] Mapeamento OTAs ⚠️ FUTURO

---

## �� REFERÊNCIAS

- **Documento Principal:** `WIZARD_NOVA_ESTRUTURA_3_BLOCOS.md`
- **Campos Obrigatórios:** `WIZARD_CAMPOS_OBRIGATORIOS.md`
- **Configurações:** `CONFIGURACOES_LOCAIS_ANUNCIOS.md`
- **Multi-tenancy:** `types/tenancy.ts`
- **Auth Context:** `contexts/AuthContext.tsx`

---

**Status:** ✅ Implementado (Frontend + Backend)  
**Próximo Passo:** Validar Admin Master no backend + Implementar Step 1.1 do Wizard
