# ⚡ GUIA RÁPIDO: Criar Sites com IA

**Versão:** v1.0.103.198  
**Tempo:** 5-30 minutos  

---

## 🚀 3 FORMAS DE CRIAR SITES

### **FORMA 1: Template Pronto** ⚡ (5 minutos)

```
1️⃣ Sites dos Clientes
2️⃣ Criar Novo Site
3️⃣ Preencher:
   - ID: 9090909
   - Nome: Sua Casa Mobiliada
   - Template: Moderno
   - Email: contato@imobiliaria.com
   - Telefone: (11) 99999-9999
   - ✓ Temporada
4️⃣ Criar Site
5️⃣ ✅ PRONTO! Site no ar
```

**URL:** `https://sua-casa-mobiliada.rendizy.app`

---

### **FORMA 2: Gerar com IA** 🤖 (15-30 minutos)

```
1️⃣ Sites dos Clientes
2️⃣ Documentação IA
3️⃣ Copiar Prompt
4️⃣ Abrir Bolt.new
5️⃣ Colar prompt
6️⃣ Aguardar IA gerar (2-5 min)
7️⃣ Copiar TODO código
8️⃣ Voltar ao RENDIZY
9️⃣ Importar Site
🔟 Colar código
1️⃣1️⃣ ✅ PRONTO! Site customizado
```

**Resultado:** Site ÚNICO e profissional

---

### **FORMA 3: Importar do Figma** 🎨 (1-2 horas)

```
1️⃣ Designer cria no Figma
2️⃣ Figma Make → Converter para React
3️⃣ Copiar código
4️⃣ Sites dos Clientes
5️⃣ Importar Site
6️⃣ Colar código
7️⃣ ✅ PRONTO! Design exclusivo
```

**Resultado:** Identidade visual única

---

## 🎯 RESPOSTA À SUA PERGUNTA

### **"Como importar arquivo de outra IA/Figma?"**

#### **PASSO A PASSO:**

**1. Criar Site no Bolt.new/v0.dev/Figma:**
```bash
# No Bolt.new:
1. Abrir https://bolt.new
2. Colar o prompt (botão "Documentação IA")
3. Aguardar gerar
4. Copiar TUDO (Ctrl+A depois Ctrl+C no editor)
```

**2. Importar no RENDIZY:**
```bash
# No RENDIZY:
1. Sites dos Clientes → "Importar Site"
2. Passo 1: Configurar
   - Organização: 9090909
   - Nome: Sua Casa Mobiliada
   - Email/Telefone
   - Modalidades
3. Passo 2: Colar Código
   - Cole TODO o código
   - Importar Site
4. ✅ Sistema automaticamente:
   - Cria registro no banco
   - Salva código
   - Integra com API RENDIZY
   - Substitui variáveis
   - Gera URL
```

**3. Acessar Site:**
```bash
URL gerada: https://sua-casa-mobiliada.rendizy.app

Dados vêm automaticamente de:
- /properties (seus imóveis)
- /calendar (disponibilidade)
- /reservations (motor de reservas)
```

---

## 🔧 FIX DO SEU PROBLEMA

### **Por que não conseguia criar?**

**Antes:**
```
❌ Campo "ID da Organização" vazio
❌ Sistema não aceitava só número
❌ Validação confusa
```

**Agora (CORRIGIDO):**
```
✅ Aceita ID numérico: 9090909
✅ Aceita ID string: "org_123"
✅ Validação clara
✅ Mensagens específicas
```

### **Teste Agora:**
```
ID da Organização: 9090909        ← Use o ID da imagem
Nome do Site: Sua Casa Mobiliada  ← Da sua screenshot
Template: Moderno
Email: contato@imobiliaria.com
Telefone: (11) 99999-9999
✓ Aluguel de Temporada

↓ Criar Site ↓

✅ FUNCIONANDO!
```

---

## 📋 PROMPT PARA BOLT.NEW

**Copie e cole isso no Bolt.new:**

```
Crie um site COMPLETO de imobiliária de temporada usando React + TypeScript + Tailwind CSS.

O site deve ter:

1. Home com hero, busca e destaques
2. Lista de propriedades com filtros
3. Página de detalhes com galeria e calendário
4. Formulário de reserva
5. Integração com esta API:

API_BASE = "https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a"
API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"
ORGANIZATION_ID = "9090909"

Endpoints:
- GET /properties?organizationId=9090909 (lista imóveis)
- GET /calendar?propertyId={id}&start={date}&end={date} (disponibilidade)
- POST /reservations (criar reserva)

Faça um site MODERNO, RESPONSIVO e PROFISSIONAL.
```

---

## 💡 DICA PRO

### **Iteração com IA:**

```
Primeira versão → Copiar e importar
    ↓
Testar no RENDIZY
    ↓
Ajustes necessários → Voltar ao Bolt
    ↓
"Adicione busca por cidade"
"Melhore o calendário"
"Adicione mapa"
    ↓
Copiar versão melhorada
    ↓
Re-importar (substitui anterior)
    ↓
✅ Site perfeito!
```

---

## 🎁 O QUE O SISTEMA FAZ AUTOMATICAMENTE

Quando você importa um site, o RENDIZY:

1. **✅ Substitui Variáveis:**
   ```typescript
   {{ORG_ID}} → 9090909
   {{SITE_NAME}} → Sua Casa Mobiliada
   {{PRIMARY_COLOR}} → #3B82F6
   {{CONTACT_EMAIL}} → contato@imobiliaria.com
   ```

2. **✅ Integra API:**
   ```typescript
   // Código importado automaticamente usa:
   const properties = await fetch(API_BASE + '/properties?organizationId=' + organizationId);
   ```

3. **✅ Configura Dados:**
   ```typescript
   features: {
     shortTerm: true,  // ← Do seu formulário
     longTerm: false,
     sale: false
   }
   ```

4. **✅ Gera URL:**
   ```
   Subdomínio: sua-casa-mobiliada
   URL: https://sua-casa-mobiliada.rendizy.app
   ```

5. **✅ Ativa Site:**
   ```
   isActive: true
   createdAt: 2025-10-31T20:00:00Z
   ```

---

## 🚨 PROBLEMAS COMUNS

### **1. "Não consigo criar site"**
```
✅ Solução: Use ID numérico
   Correto: 9090909
   Errado: (vazio)
```

### **2. "Código muito grande para colar"**
```
✅ Solução: Salve em arquivo .txt
   1. Copie código do Bolt
   2. Salve como site.txt
   3. Abra no notepad
   4. Ctrl+A → Ctrl+C
   5. Cole no RENDIZY
```

### **3. "Site não aparece"**
```
✅ Solução: Verifique se salvou
   1. Recarregue página
   2. Veja se está na lista
   3. URL deve aparecer
```

### **4. "Como ver meu site?"**
```
✅ Solução: Clique em "Ver Site"
   - Ou copie URL
   - Abra em nova aba
   - URL: https://{nome}.rendizy.app
```

---

## ⚡ SUPER RÁPIDO - 3 PASSOS

```
1️⃣ Documentação IA → Copiar Prompt
       ↓
2️⃣ Bolt.new → Colar → Gerar → Copiar Código
       ↓
3️⃣ Importar Site → Colar Código → Importar
       ↓
    ✅ SITE NO AR!
```

**Tempo total:** 15-30 minutos  
**Custo:** R$ 0,00  
**Resultado:** Site profissional integrado ao RENDIZY  

---

**RENDIZY v1.0.103.198**  
**Crie sites incríveis em minutos!** 🎨🚀
