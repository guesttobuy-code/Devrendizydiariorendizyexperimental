# 📋 PASSO A PASSO: TESTE MANUAL CRIAÇÃO IMOBILIÁRIA

**Versão:** v1.0.103.192  
**Data:** 2025-10-31  
**Organização:** SUA CASA MOBILIADA

---

## 🎯 TESTE REAL - CRIAÇÃO DE IMOBILIÁRIA

### ⚡ ANTES DE COMEÇAR:

**RECARREGUE A PÁGINA AGORA!** (Ctrl + R ou F5)

As correções de CORS foram aplicadas e precisam de reload!

---

## 📋 PASSO 1: ACESSE O ADMIN MASTER

### 1.1 Abra o RENDIZY
```
URL: https://figma.com/make/...
```

### 1.2 Vá para Admin Master
```
Menu Lateral → 👑 Admin Master → Imobiliárias
```

**O que você deve ver:**
```
┌─────────────────────────────────────────┐
│  🏢 Gestão de Imobiliárias              │
│                                          │
│  📊 Total: X organizações                │
│  🟢 Ativas: X                            │
│                                          │
│  [+ Nova Imobiliária]  [🔍 Buscar]      │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ Organização Master RENDIZY       │  │
│  │ Slug: rendizy                    │  │
│  │ Plano: Enterprise                │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 📋 PASSO 2: ABRA O CONSOLE DO NAVEGADOR

### 2.1 Pressione F12 (ou Ctrl + Shift + I)

### 2.2 Clique na aba "Console"

### 2.3 Limpe o console
```
Clique no ícone de lixeira 🗑️
ou
Ctrl + L
```

**MANTENHA O CONSOLE ABERTO** durante todo o teste!

---

## 📋 PASSO 3: CLIQUE EM "NOVA IMOBILIÁRIA"

### 3.1 Clique no botão verde "+ Nova Imobiliária"

### 3.2 Modal deve abrir
```
┌─────────────────────────────────────────┐
│  🏢 Nova Imobiliária                    │
│                                          │
│  Criar uma nova organização cliente     │
│  no sistema                              │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Nome da Imobiliária *              │ │
│  │ [_________________________]        │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Email *                            │ │
│  │ [_________________________]        │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Telefone                           │ │
│  │ [_________________________]        │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ Plano *                            │ │
│  │ [Free ▼]                           │ │
│  └────────────────────────────────────┘ │
│                                          │
│  [Cancelar]  [Criar Imobiliária]       │
└─────────────────────────────────────────┘
```

---

## 📋 PASSO 4: PREENCHA O FORMULÁRIO

### 4.1 Nome da Imobiliária
```
SUA CASA MOBILIADA
```

### 4.2 Email
```
suacasamobiliada@gmail.com
```

### 4.3 Telefone
```
021995885999
```

### 4.4 Plano
```
Clique no select → Escolha "Enterprise"
```

**Formulário preenchido:**
```
┌─────────────────────────────────────────┐
│  🏢 Nova Imobiliária                    │
│                                          │
│  Nome da Imobiliária *                  │
│  [SUA CASA MOBILIADA____________]       │
│                                          │
│  Email *                                 │
│  [suacasamobiliada@gmail.com____]       │
│                                          │
│  Telefone                                │
│  [021995885999__________________]       │
│                                          │
│  Plano *                                 │
│  [Enterprise ▼]                         │
│                                          │
│  [Cancelar]  [Criar Imobiliária]       │
└─────────────────────────────────────────┘
```

---

## 📋 PASSO 5: OBSERVE O CONSOLE

**ANTES DE CLICAR EM "Criar Imobiliária"**:

### 5.1 Verifique se o console está aberto ✅

### 5.2 Certifique-se de que está vazio 🗑️

---

## 📋 PASSO 6: CLIQUE EM "CRIAR IMOBILIÁRIA"

### 6.1 Clique no botão "Criar Imobiliária"

### 6.2 OBSERVE O CONSOLE - Você deve ver:

#### ✅ LOG 1: Payload Enviado
```javascript
🚀 Enviando requisição para criar organização: 
{
  name: "SUA CASA MOBILIADA",
  email: "suacasamobiliada@gmail.com",
  phone: "021995885999",
  plan: "enterprise",
  createdBy: "user_master_rendizy"
}
```

#### ✅ LOG 2: URL
```javascript
📍 URL: https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/organizations
```

#### ✅ LOG 3: Resposta HTTP
```javascript
📥 Resposta recebida: 201 Created
```

#### ✅ LOG 4: Resultado
```javascript
✅ Resultado: {
  success: true,
  data: {
    id: "org_lz9x8w7v6abc",
    slug: "rendizy_sua_casa_mobiliada",
    name: "SUA CASA MOBILIADA",
    email: "suacasamobiliada@gmail.com",
    phone: "021995885999",
    plan: "enterprise",
    status: "active",
    createdAt: "2025-10-31T...",
    createdBy: "user_master_rendizy",
    settings: {
      maxUsers: -1,
      maxProperties: -1,
      maxReservations: -1,
      features: [...]
    }
  }
}
```

### 6.3 OBSERVE A TELA - Você deve ver:

#### ✅ Toast de Sucesso (canto superior direito)
```
┌─────────────────────────────────────┐
│ ✅ Imobiliária criada com sucesso!  │
│ SUA CASA MOBILIADA                  │
│ (rendizy_sua_casa_mobiliada)        │
└─────────────────────────────────────┘
```

#### ✅ Modal Fecha Automaticamente

#### ✅ Lista Recarrega

#### ✅ Nova Organização Aparece
```
┌─────────────────────────────────────────┐
│  🏢 Gestão de Imobiliárias              │
│                                          │
│  📊 Total: 2 organizações                │
│  🟢 Ativas: 2                            │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ Organização Master RENDIZY       │  │
│  │ Slug: rendizy                    │  │
│  │ Plano: Enterprise                │  │
│  └──────────────────────────────────┘  │
│                                          │
│  ┌──────────────────────────────────┐  │
│  │ 🏢 SUA CASA MOBILIADA            │  │ ← NOVA!
│  │ 📧 suacasamobiliada@gmail.com    │  │
│  │ 📱 021995885999                  │  │
│  │ 🎯 Enterprise • 🟢 Active        │  │
│  │ Slug: rendizy_sua_casa_mobiliada │  │
│  │                                  │  │
│  │ [✏️ Editar] [🗑️ Desativar]      │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 🔍 PASSO 7: VERIFICAÇÕES FINAIS

### 7.1 Clique em "Editar" na nova organização

Deve abrir modal com todos os dados:
```
┌─────────────────────────────────────────┐
│  🏢 Editar Imobiliária                  │
│                                          │
│  Nome: SUA CASA MOBILIADA               │
│  Email: suacasamobiliada@gmail.com      │
│  Telefone: 021995885999                 │
│  Plano: Enterprise                      │
│  Status: Active                         │
│                                          │
│  Slug: rendizy_sua_casa_mobiliada       │
│  ID: org_lz9x8w7v6abc                   │
│                                          │
│  Criado em: 31/10/2025 às 15:30         │
│  Criado por: user_master_rendizy        │
│                                          │
│  📊 Limites do Plano:                   │
│  • Usuários: Ilimitado                  │
│  • Imóveis: Ilimitado                   │
│  • Reservas: Ilimitado                  │
│                                          │
│  🎁 Features:                           │
│  ✅ Calendário Avançado                 │
│  ✅ Relatórios Avançados                │
│  ✅ Integrações Completas               │
│  ✅ Acesso API                          │
│  ✅ Branding Customizado                │
│  ✅ Suporte Prioritário                 │
│  ✅ Sites Personalizados                │
│  ✅ White Label                         │
│                                          │
│  [Fechar]  [Salvar Alterações]         │
└─────────────────────────────────────────┘
```

### 7.2 Verifique o KV Store (opcional)

Se quiser ver os dados no backend:
```bash
# Execute:
./🧪_TESTE_REAL_CRIAR_SUA_CASA_MOBILIADA.sh
```

---

## ❌ POSSÍVEIS ERROS E SOLUÇÕES

### ERRO 1: "Failed to fetch"

**Causa:** CORS bloqueando

**Solução:**
1. Recarregue a página (Ctrl + R)
2. Limpe o cache (Ctrl + Shift + Delete)
3. Tente novamente

**Se persistir:**
```
Veja o console:
- Access-Control-Allow-Origin: *
- Se não aparecer, o backend precisa ser redeployado
```

---

### ERRO 2: "Name, email, and createdBy are required"

**Causa:** Campos vazios

**Solução:**
1. Preencha TODOS os campos obrigatórios (*)
2. Nome ✅
3. Email ✅
4. Plano ✅

---

### ERRO 3: "Slug already exists"

**Causa:** Organização já existe

**Solução:**
1. Essa é uma mensagem informativa!
2. A organização já foi criada antes
3. Você pode:
   - Editar a existente
   - Criar com outro nome
   - Deletar e recriar

---

### ERRO 4: Modal não abre

**Causa:** JavaScript não carregado

**Solução:**
1. Recarregue a página
2. Verifique erros no console
3. Aguarde carregar completamente

---

### ERRO 5: Botão não responde

**Causa:** Loading ou validação

**Solução:**
1. Aguarde 2-3 segundos
2. Verifique campos obrigatórios
3. Veja o console para erros

---

## 📊 DADOS DE TESTE

Para seus testes, use:

### Organização 1: SUA CASA MOBILIADA
```
Nome: SUA CASA MOBILIADA
Email: suacasamobiliada@gmail.com
Telefone: 021995885999
Plano: Enterprise
```

### Organização 2: TESTE IMOBILIÁRIA
```
Nome: TESTE IMOBILIÁRIA
Email: teste@imobiliaria.com
Telefone: 11999999999
Plano: Professional
```

### Organização 3: DEMO COMPANY
```
Nome: DEMO COMPANY
Email: demo@company.com
Telefone: 21988888888
Plano: Basic
```

---

## 🎯 O QUE ESPERAR:

### ✅ Comportamento Correto:

1. **Modal abre** instantaneamente
2. **Formulário** preenchível
3. **Console mostra** 4 logs:
   - 🚀 Enviando requisição
   - 📍 URL
   - 📥 Resposta 201
   - ✅ Resultado
4. **Toast verde** aparece
5. **Modal fecha** automaticamente
6. **Lista recarrega**
7. **Nova org aparece**

### ❌ Comportamento Incorreto:

1. Modal não abre
2. Botão não responde
3. Console mostra erro 500
4. Toast vermelho
5. Modal não fecha
6. Lista não recarrega

---

## 🧪 TESTE AUTOMATIZADO

Se quiser testar via script:

```bash
chmod +x 🧪_TESTE_REAL_CRIAR_SUA_CASA_MOBILIADA.sh
./🧪_TESTE_REAL_CRIAR_SUA_CASA_MOBILIADA.sh
```

**Saída esperada:**
```
==================================================
✅ SUCESSO! IMOBILIÁRIA CRIADA!
==================================================

🎉 Organização criada com sucesso!

📋 Detalhes:
   ID: org_lz9x8w7v6abc
   Slug: rendizy_sua_casa_mobiliada
   Nome: SUA CASA MOBILIADA
   Plano: Enterprise
   Status: Active
```

---

## 📋 CHECKLIST FINAL

Marque cada item após verificar:

- [ ] Recarreguei a página
- [ ] Abri o console (F12)
- [ ] Acessei Admin Master → Imobiliárias
- [ ] Cliquei em "Nova Imobiliária"
- [ ] Preenchi todos os campos
- [ ] Vi os logs no console (4 logs)
- [ ] Vi o toast de sucesso
- [ ] Modal fechou automaticamente
- [ ] Nova org apareceu na lista
- [ ] Consegui editar a org criada

---

## 🎉 TESTE CONCLUÍDO!

Se você marcou todos os itens acima:

**🎊 PARABÉNS! O SISTEMA ESTÁ FUNCIONANDO PERFEITAMENTE! 🎊**

Agora você pode:
1. Criar quantas organizações quiser
2. Editar organizações existentes
3. Gerenciar usuários por organização
4. Configurar sites personalizados
5. Testar multi-tenancy completo

---

**Versão:** v1.0.103.192  
**Correção:** CORS + Logs Completos  
**Status:** ✅ PRONTO PARA PRODUÇÃO
