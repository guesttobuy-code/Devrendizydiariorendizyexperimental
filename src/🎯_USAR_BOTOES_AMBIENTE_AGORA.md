# 🎯 COMO USAR OS BOTÕES DE AMBIENTE

## SUPER FÁCIL - 2 CLIQUES!

### 🧪 Para Usar Dados de Teste (Mock)
```
1. Olhe para o TOPO da tela (faixa amarela)
2. Clique no botão azul: "🧪 Ambiente de Testes"
3. A página vai recarregar
4. PRONTO! Agora está usando dados fictícios
```

### 🚀 Para Usar Dados Reais (Produção)
```
1. Olhe para o TOPO da tela (faixa amarela)
2. Clique no botão verde: "🚀 Ambiente de Produção"
3. A página vai recarregar
4. CUIDADO! Agora está usando dados reais
```

## 🔍 COMO SABER QUAL ESTÁ ATIVO?

Olhe o **badge** ao lado de "Botões de Emergência":

- **🧪 TESTES** (azul) = Dados fictícios ✅
- **🚀 PRODUÇÃO** (verde) = Dados reais ⚠️

## 📍 ONDE ESTÃO OS BOTÕES?

```
┌────────────────────────────────────────────────┐
│  ⚠️ Botões de Emergência  [🧪 TESTES]         │ ← AQUI!
│                                                 │
│  [🧪 Ambiente de Testes]  [🚀 Produção]       │ ← BOTÕES
└────────────────────────────────────────────────┘
```

**TOPO DA TELA** - Faixa amarela/âmbar

## 💡 DICAS

### Botão Ativo
O botão do ambiente **ativo** fica com:
- ✨ **Fundo colorido** (azul ou verde)
- 💍 **Anel branco** ao redor
- 📍 **Mais destacado**

### Botão Inativo
O botão do ambiente **inativo** fica com:
- ⚪ **Fundo branco**
- 🔘 **Sem destaque**

### Expandir para Ver Mais
Clique em **"Expandir"** para ver:
- Explicação completa de cada modo
- Diferenças entre ambientes
- Avisos e dicas

## ⚡ ATALHOS

### Via Console (Avançado)
```javascript
// Ativar Testes
localStorage.setItem('rendizy_dev_mode', 'true');
location.reload();

// Ativar Produção
localStorage.removeItem('rendizy_dev_mode');
location.reload();
```

## 🎉 BENEFÍCIOS

✅ **Sem necessidade de código**
✅ **Visual e intuitivo**
✅ **Sempre visível**
✅ **Seguro**
✅ **Rápido**

---

**É ISSO!** Agora você pode alternar entre ambientes com 2 cliques 🚀
