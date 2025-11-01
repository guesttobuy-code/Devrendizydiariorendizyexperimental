# 🎯 VISUAL - ONDE PEGAR A GLOBAL API KEY

**VERSÃO:** v1.0.103.58  
**TEMPO:** 2 minutos  
**DIFICULDADE:** ⭐ Muito Fácil

---

## 🌐 PASSO 1: ABRA O MANAGER

```
URL: https://evo.boravendermuito.com.br/manager
```

**Tela que você verá:**

```
┌────────────────────────────────────────────────────────────┐
│ Evolution API Manager                    🔐 Admin    [☰]  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📊 Dashboard                                              │
│  📱 Instances                                              │
│  ⚙️  Settings  ← CLIQUE AQUI!                             │
│  📖 Documentation                                          │
│  🔌 Integrations                                           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## ⚙️ PASSO 2: CLIQUE EM "SETTINGS"

Após clicar em Settings, você verá:

```
┌────────────────────────────────────────────────────────────┐
│ Evolution API Manager > Settings                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  🔍 Find Settings  ← CLIQUE AQUI!                         │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ 🔐 AUTHENTICATION                                    │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │                                                      │ │
│  │ Api Key                                              │ │
│  │                                                      │ │
│  │ ├─ Global  ← ESTA É A QUE VOCÊ PRECISA!            │ │
│  │ │  ┌────────────────────────────────────────────┐  │ │
│  │ │  │ B4C0D2E5F8A9B1C3D6E8F0A2B4C6D8E0F2A4B6C8 │  │ │
│  │ │  └────────────────────────────────────────────┘  │ │
│  │ │                                                   │ │
│  │ │  [📋 Copy]  ← OU CLIQUE AQUI PARA COPIAR         │ │
│  │                                                      │ │
│  │ ├─ Instance                                          │ │
│  │ │                                                    │ │
│  │ │  └─ Rendizy                                       │ │
│  │ │     ┌────────────────────────────────────────┐   │ │
│  │ │     │ X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8 │   │ │
│  │ │     └────────────────────────────────────────┘   │ │
│  │ │                                                    │ │
│  │ │     ⚠️ NÃO PEGUE ESTA! É A INSTANCE KEY!        │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 📋 PASSO 3: COPIE A GLOBAL API KEY

### Opção A: Seleção Manual
```
1. Clique 3 vezes na chave para selecionar tudo
2. Ctrl+C (Windows) ou Cmd+C (Mac)
3. Cole no chat
```

### Opção B: Botão de Copiar
```
1. Clique no botão [📋 Copy] ao lado da chave
2. Aparecerá "Copied!" ou "Copiado!"
3. Cole no chat
```

---

## ✅ COMO SABER QUE PEGUEI A CERTA?

### ✅ GLOBAL API KEY (CORRETA):
```
Localização: AUTHENTICATION → Api Key → Global
Posição:     PRIMEIRO item da lista
Descrição:   "Global" ou "Global API Key"
Função:      Autentica QUALQUER acesso à Evolution API
```

### ❌ INSTANCE API KEY (ERRADA):
```
Localização: AUTHENTICATION → Api Key → Instance → Rendizy
Posição:     DENTRO da instância "Rendizy"
Descrição:   "Instance" ou nome da instância
Função:      Autentica apenas esta instância específica
```

---

## 🎯 COMPARAÇÃO VISUAL

```
┌─────────────────────────────────────────────────────────┐
│ ESTRUTURA DA ÁRVORE                                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🔐 AUTHENTICATION                                       │
│  │                                                      │
│  ├─ Api Key                                            │
│  │  │                                                   │
│  │  ├─ 🟢 Global                 ← PEGUE ESTA!         │
│  │  │   └─ [CHAVE LONGA]                               │
│  │  │                                                   │
│  │  └─ 🔴 Instance               ← NÃO PEGUE!          │
│  │      │                                               │
│  │      ├─ Rendizy                                     │
│  │      │   └─ [OUTRA CHAVE]                           │
│  │      │                                               │
│  │      ├─ OutraInstancia                              │
│  │      │   └─ [OUTRA CHAVE]                           │
│  │      │                                               │
│  │      └─ MaisUma                                     │
│  │          └─ [OUTRA CHAVE]                           │
│  │                                                      │
│  └─ Other Settings...                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 CARACTERÍSTICAS DA GLOBAL API KEY

### Formato típico:
```
Comprimento: 32-64 caracteres
Caracteres:  A-Z, a-z, 0-9, às vezes - ou _
Exemplo:     B4C0D2E5F8A9B1C3D6E8F0A2B4C6D8E0F2
```

### NÃO é:
```
❌ Muito curta (menos de 20 caracteres)
❌ Contém espaços
❌ Está vazia
❌ É "exemplo" ou "sua-api-key-aqui"
```

---

## ⚠️ ERROS COMUNS

### Erro 1: Copiar a Instance Key
```
❌ ERRADO:
   AUTHENTICATION → Api Key → Instance → Rendizy → [KEY]

✅ CORRETO:
   AUTHENTICATION → Api Key → Global → [KEY]
```

### Erro 2: Copiar com espaços extras
```
❌ ERRADO:
   "  B4C0D2E5F8...  " (com espaços)

✅ CORRETO:
   "B4C0D2E5F8..." (sem espaços)
```

### Erro 3: Copiar incompleta
```
❌ ERRADO:
   "B4C0D2E5F8A9B1C3D6..." (cortada)

✅ CORRETO:
   "B4C0D2E5F8A9B1C3D6E8F0A2B4C6D8E0F2" (completa)
```

---

## 🧪 VALIDAÇÃO RÁPIDA

Após copiar, você pode testar:

```bash
bash TESTE_GLOBAL_API_KEY.sh
```

Se retornar:
- ✅ `200 OK` → Chave correta!
- ❌ `401 Unauthorized` → Chave errada, pegue novamente
- ❌ `404 Not Found` → Pegou a Instance Key ao invés da Global

---

## 📱 NAVEGAÇÃO MOBILE

Se estiver no celular:

```
1. Abra: https://evo.boravendermuito.com.br/manager
2. Toque no menu hambúrguer (☰)
3. Toque em "Settings"
4. Role até "AUTHENTICATION"
5. Toque em "Api Key"
6. Veja "Global" (primeiro item)
7. Toque e segure na chave
8. Selecione "Copiar"
9. Cole no chat
```

---

## 🖥️ NAVEGAÇÃO DESKTOP

Se estiver no computador:

```
1. Abra: https://evo.boravendermuito.com.br/manager
2. Clique em "Settings" no menu lateral
3. Procure "AUTHENTICATION" na página
4. Encontre "Api Key"
5. Veja "Global" (primeiro item)
6. Clique 3x na chave para selecionar
7. Ctrl+C (ou Cmd+C no Mac)
8. Cole no chat
```

---

## 🎯 CHECKLIST FINAL

Antes de colar aqui, confirme:

- [ ] É da seção "Global" (não "Instance")
- [ ] Está completa (32+ caracteres)
- [ ] Não tem espaços no início/fim
- [ ] Não é um exemplo (tipo "sua-api-key-aqui")
- [ ] Foi copiada do Manager da Evolution API
- [ ] (Opcional) Testei com `TESTE_GLOBAL_API_KEY.sh`

---

## 💡 DICA PRO

Se o Manager tiver tema escuro/claro, mude para ver melhor:

```
Settings → Appearance → Dark Mode / Light Mode
```

Às vezes a chave fica mais visível em um tema ou outro!

---

## 🆘 AINDA TEM DÚVIDAS?

### Não achou a seção "AUTHENTICATION"?
```
→ Role a página de Settings para baixo
→ Pode estar em "Security" ou "API"
→ Procure por "Api Key" ou "Global Key"
```

### Não tem botão "Find Settings"?
```
→ Pode ser "Search" ou "Buscar"
→ Ou simplesmente role a página
→ AUTHENTICATION fica no meio/fim da página
```

### A chave está em asteriscos (*****)?
```
→ Procure um ícone de 👁️ (olho) ao lado
→ Clique para revelar a chave
→ Ou clique no botão [📋 Copy] direto
```

---

## 🚀 PRÓXIMO PASSO

Assim que copiar a Global API Key:

```
1. Cole aqui no chat
2. Aguarde 2 minutos
3. ✅ WhatsApp funcionando!
```

---

**TELA EXEMPLO (SIMPLIFICADA):**

```
╔══════════════════════════════════════════════════════╗
║ Evolution API Manager - Settings                    ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║ 🔐 AUTHENTICATION                                    ║
║ ┌────────────────────────────────────────────────┐  ║
║ │ Api Key                                        │  ║
║ │                                                │  ║
║ │ Global                                         │  ║
║ │ ┌────────────────────────────────────────────┐│  ║
║ │ │B4C0D2E5F8A9B1C3D6E8F0A2B4C6D8E0F2A4B6C8D0││  ║ ← COPIE!
║ │ └────────────────────────────────────────────┘│  ║
║ │ [📋 Copy]                                      │  ║
║ │                                                │  ║
║ │ Instance                                       │  ║
║ │  ├─ Rendizy                                    │  ║
║ │  │  [X1Y2Z3...]                                │  ║ ← NÃO!
║ │  └─ OutraInstancia                             │  ║
║ │     [A1B2C3...]                                │  ║
║ └────────────────────────────────────────────────┘  ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

---

**VAMOS LÁ! COPIE E COLE AQUI!** 🚀

---

**VERSÃO:** v1.0.103.58  
**ATUALIZADO:** 29/10/2025  
**PRÓXIMO:** Aplicar no RENDIZY
