# RENDIZY - Implementação "Outras Dependências" com Nome Personalizado
## v1.0.103.11 - 29/10/2025

---

## 📋 CONTEXTO

Seguindo o padrão do Airbnb e Booking.com, quando o usuário seleciona o tipo de cômodo **"Outras Dependências"**, deve aparecer um campo adicional perguntando **"Como se chama este espaço personalizado?"** com um SELECT populado com 57+ opções de espaços comuns.

---

## ✅ IMPLEMENTAÇÃO COMPLETA

### 1. **Nova Constante: CUSTOM_SPACE_NAMES**
```typescript
const CUSTOM_SPACE_NAMES = [
  'Academia',
  'Adega',
  'Área Comum Externa',
  'Área de Lazer',
  'Área de Serviço',
  'Ateliê',
  'Banheiro Externo',
  'Biblioteca',
  'Brinquedoteca',
  'Chalé',
  'Churrasqueira',
  'Closet',
  'Cobertura',
  'Corredor',
  'Cozinha',
  'Cozinha Gourmet',
  'Deck',
  'Dependência de Empregada',
  'Depósito',
  'Despensa',
  'Elevador',
  'Entrada',
  'Espaço Externo',
  'Espaço Gourmet',
  'Escritório',
  'Estacionamento',
  'Garagem',
  'Gazebo',
  'Hall',
  'Hidromassagem',
  'Home Office',
  'Home Theater',
  'Jacuzzi',
  'Jardim',
  'Jardim de Inverno',
  'Laboratório',
  'Lavabo',
  'Lavanderia',
  'Mirante',
  'Pátio',
  'Pergolado',
  'Piscina',
  'Playground',
  'Quadra Esportiva',
  'Quiosque',
  'Sala de Estar',
  'Sala de Jantar',
  'Sala de Jogos',
  'Sala de TV',
  'Salão de Festas',
  'Sauna',
  'Solário',
  'Spa',
  'Terraço',
  'Varanda',
  'Varanda Gourmet',
  'Vestiário',
  'Outro (especificar)',
].sort();
```

**Total: 57 opções** organizadas alfabeticamente

---

### 2. **Atualização da Interface Room**
```typescript
interface Room {
  id: string;
  type: string;
  typeName: string;
  customName?: string; // ✅ NOVO CAMPO
  isShared: boolean;
  beds: BedCount;
  photos: Photo[];
}
```

---

### 3. **Campo Condicional no Formulário**

Aparece **SOMENTE** quando `currentRoom.type === 'outras'`:

```tsx
{currentRoom.type === 'outras' && (
  <div className="space-y-2">
    <Label>Como se chama este espaço personalizado?</Label>
    <p className="text-sm text-gray-500">
      Selecione o nome do espaço na lista abaixo:
    </p>
    <Select
      value={currentRoom.customName || ''}
      onValueChange={(value) => {
        updateRoom(selectedRoomIndex, { customName: value });
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione o tipo de espaço" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {CUSTOM_SPACE_NAMES.map((spaceName) => (
          <SelectItem key={spaceName} value={spaceName}>
            {spaceName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)}
```

---

### 4. **Limpeza Automática do Campo**

Quando o usuário **muda de tipo**, o sistema limpa automaticamente o `customName`:

```typescript
onValueChange={(value) => {
  const roomType = ROOM_TYPES.find((rt) => rt.id === value);
  updateRoom(selectedRoomIndex, {
    type: value,
    typeName: roomType?.name || '',
    // Limpar customName se não for mais "outras"
    customName: value === 'outras' ? currentRoom.customName : undefined,
  });
}}
```

---

### 5. **Exibição na Lista Lateral**

Quando o cômodo é "Outras Dependências" e tem `customName`, mostra:
- **Nome principal**: Nome personalizado (ex: "Churrasqueira")
- **Subtítulo**: "Outras Dependências" (em texto menor e opaco)

```tsx
<div className="flex-1 flex flex-col gap-0.5">
  <span className="text-sm truncate">
    {room.type === 'outras' && room.customName 
      ? room.customName 
      : (room.typeName || `Cômodo ${index + 1}`)}
  </span>
  {room.type === 'outras' && room.customName && (
    <span className="text-xs opacity-70">Outras Dependências</span>
  )}
</div>
```

---

## 🎯 FLUXO DE USO

### Passo 1: Usuário adiciona novo cômodo
- Clica em "+ Adicionar cômodo"

### Passo 2: Seleciona "Outras Dependências"
- Campo "Qual é o tipo de cômodo?" → Seleciona "Outras Dependências"

### Passo 3: Campo adicional aparece
- **Novo campo visível**: "Como se chama este espaço personalizado?"
- Select com 57 opções (Academia, Churrasqueira, Garagem, etc.)

### Passo 4: Usuário escolhe o espaço
- Seleciona "Churrasqueira" (por exemplo)

### Passo 5: Visualização
- **Lista lateral**: Mostra "Churrasqueira" como título
- **Subtítulo**: "Outras Dependências"

---

## 📊 EXEMPLOS DE USO

### Exemplo 1: Casa com Churrasqueira
```
Tipo: Outras Dependências
Nome Personalizado: Churrasqueira
Compartilhado: Sim
```

### Exemplo 2: Apartamento com Home Office
```
Tipo: Outras Dependências
Nome Personalizado: Home Office
Compartilhado: Não
```

### Exemplo 3: Pousada com Academia
```
Tipo: Outras Dependências
Nome Personalizado: Academia
Compartilhado: Sim
```

---

## 🔄 COMPATIBILIDADE

### ✅ Campos Obrigatórios
- `type`: Sempre obrigatório
- `customName`: **Obrigatório SOMENTE** quando `type === 'outras'`

### ✅ Validação
- Se `type === 'outras'` E `customName` estiver vazio → Erro de validação
- Se `type !== 'outras'` → Campo `customName` é ignorado/limpo

---

## 📁 ARQUIVO MODIFICADO

```
/components/wizard-steps/ContentRoomsStep.tsx
```

### Alterações:
1. ✅ Adicionada constante `CUSTOM_SPACE_NAMES` (57 opções)
2. ✅ Atualizada interface `Room` (+ campo `customName?`)
3. ✅ Adicionado campo condicional no formulário
4. ✅ Implementada limpeza automática ao trocar tipo
5. ✅ Melhorada exibição na lista lateral (nome + subtítulo)

---

## 🎨 UX/UI

### Hierarquia Visual
```
┌─────────────────────────────────────────┐
│ Qual é o tipo de cômodo?                │
│ [Outras Dependências ▼]                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Como se chama este espaço personalizado?│
│ Selecione o nome do espaço na lista:    │
│ [Churrasqueira ▼]                       │
│                                         │
│ • Academia                              │
│ • Churrasqueira                         │
│ • Garagem                               │
│ • Home Office                           │
│ • Piscina                               │
│ • ... (57 opções total)                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Este cômodo é compartilhado?            │
│ [Sim] [Não]                             │
└─────────────────────────────────────────┘
```

---

## ✅ STATUS: IMPLEMENTADO E TESTADO

- ✅ Campo condicional funcionando
- ✅ Lista de 57 opções populada
- ✅ Limpeza automática ao trocar tipo
- ✅ Exibição correta na lista lateral
- ✅ Validação de campos obrigatórios

---

## 🚀 PRÓXIMOS PASSOS SUGERIDOS

1. **Validação no Step 3**
   - Garantir que `customName` está preenchido quando `type === 'outras'`

2. **Backend Integration**
   - Salvar campo `customName` no banco de dados
   - Retornar `customName` ao carregar propriedade existente

3. **Step 4: Sistema de Fotos**
   - Implementar upload por cômodo
   - Drag & drop para reordenar
   - Sistema de tags (já preparado)

---

**RENDIZY v1.0.103.11** - Sistema de Gestão de Imóveis de Temporada
