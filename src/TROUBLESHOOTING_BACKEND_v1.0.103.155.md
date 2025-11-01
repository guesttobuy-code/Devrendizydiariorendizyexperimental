# 🔧 TROUBLESHOOTING - Backend Offline

## v1.0.103.155 - Sistema de Auto-Recuperação

---

## ❓ PROBLEMA: Backend está offline

### ✅ SOLUÇÃO AUTOMÁTICA (JÁ IMPLEMENTADA)

O sistema agora se recupera automaticamente! Você não precisa fazer nada.

**O que acontece:**
1. Sistema detecta backend offline
2. Ativa modo local automaticamente (após 3 tentativas)
3. Banner amarelo aparece mostrando status
4. Você continua trabalhando normalmente

---

## 🎯 OPÇÃO 1: Usar Modo Local (RECOMENDADO)

**Vantagens:**
- ✅ Funciona imediatamente
- ✅ Sem configuração necessária
- ✅ Dados salvos no navegador
- ✅ Perfeito para desenvolvimento

**Como:**
- Não faça nada! Sistema ativa automaticamente
- Ou clique no banner amarelo se quiser forçar

---

## 🚀 OPÇÃO 2: Iniciar Backend Local

Se você realmente precisa do backend:

### Passo 1: Verificar se Supabase CLI está instalado
```bash
supabase --version
```

Se não estiver instalado:
```bash
npm install -g supabase
```

### Passo 2: Iniciar servidor local
```bash
cd supabase/functions
supabase functions serve
```

### Passo 3: Verificar no banner
Clique no botão "Verificar" no banner amarelo

---

## ☁️ OPÇÃO 3: Deploy para Supabase

Para ambiente de produção:

### Passo 1: Login no Supabase
```bash
supabase login
```

### Passo 2: Link do projeto
```bash
supabase link --project-ref SEU_PROJECT_ID
```

### Passo 3: Deploy
```bash
supabase functions deploy make-server-67caf26a
```

### Passo 4: Verificar
Clique em "Verificar" no banner

---

## 🧪 TESTES RÁPIDOS

### Teste 1: Verificar se backend responde
```bash
curl https://SEU_PROJECT_ID.supabase.co/functions/v1/make-server-67caf26a/health
```

Resposta esperada:
```json
{"status": "ok", "timestamp": "..."}
```

### Teste 2: Verificar credenciais
Abra o console do navegador (F12) e procure por:
```
🚀 Inicializando Sistema de Auto-Recuperação...
🔍 Iniciando monitoramento de backend...
```

---

## 🎨 ESTADOS DO BANNER

### 🟢 "✅ Servidor Online"
- Tudo funcionando
- Usando backend real
- Dados salvos no Supabase

### 🟡 "⚡ Modo Local Ativo"
- Sistema funcionando normalmente
- Usando dados do navegador
- Backend não necessário

### 🔴 "❌ Servidor Offline"
- Transição automática para modo local
- Sistema ainda funcional
- Mostra instruções de recuperação

### 🔵 "🔍 Verificando servidor..."
- Testando conexão
- Aguarde alguns segundos

---

## 🛠️ PROBLEMAS COMUNS

### Problema: Banner não aparece
**Solução:** Limpe o cache e recarregue
```
Ctrl + Shift + R  (ou Cmd + Shift + R no Mac)
```

### Problema: Modo local não ativa
**Solução:** Abra console (F12) e procure por erros

### Problema: Backend iniciado mas banner ainda mostra offline
**Solução:** 
1. Clique em "Verificar" no banner
2. Ou clique em "Forçar Online"

### Problema: Dados não aparecem no modo local
**Solução:** 
1. Abra console (F12)
2. Digite: `localStorage.clear()`
3. Recarregue a página
4. Dados mock serão recriados

---

## 📊 LOGS ÚTEIS

Abra o console do navegador (F12) e procure por:

**Sistema iniciando:**
```
🚀 Inicializando Sistema de Auto-Recuperação...
✅ Sistema de Auto-Recuperação ativo!
```

**Backend offline detectado:**
```
❌ Erro de rede detectado (tentativa 3/3): Failed to fetch
🚨 ATIVANDO MODO DE RECUPERAÇÃO AUTOMÁTICA
✅ Modo Mock ativado automaticamente
```

**Backend volta online:**
```
✅ Backend voltou online!
```

---

## 🚨 FAIXA DE EMERGÊNCIA

Se TUDO falhar, use a faixa VERMELHA no topo:

```
🚨 NAVEGAÇÃO DE EMERGÊNCIA
[🏠 Dashboard] [⭐ Admin Master] [Imóveis] [Calendário]
```

Esses botões SEMPRE funcionam porque são HTML puro!

---

## 💡 DICAS

1. **Para desenvolvimento:** Use modo local (mais rápido)
2. **Para testes:** Inicie backend local
3. **Para produção:** Faça deploy no Supabase
4. **Em dúvida:** Deixe o sistema decidir automaticamente

---

## ✅ CHECKLIST

Antes de pedir ajuda, verifique:

- [ ] Recarreguei a página com Ctrl + Shift + R?
- [ ] Vi o banner amarelo no topo?
- [ ] Cliquei em "Verificar" no banner?
- [ ] Verifiquei os logs no console (F12)?
- [ ] Tentei usar a faixa de emergência vermelha?

---

## 🎯 CONCLUSÃO

**NA MAIORIA DOS CASOS:** Não faça nada! O sistema se recupera sozinho.

**SE PRECISAR DO BACKEND:** Siga as instruções da OPÇÃO 2 acima.

**EM EMERGÊNCIA:** Use a faixa vermelha no topo.

---

**Sistema v1.0.103.155** - Auto-Recuperação Inteligente Ativa
