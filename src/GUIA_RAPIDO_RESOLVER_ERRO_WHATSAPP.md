# 🚨 GUIA RÁPIDO: Resolver Erro WhatsApp DNS

**Versão:** v1.0.103.46  
**Data:** 29 de Outubro de 2025  

---

## 🎯 PROBLEMA

Você está vendo este erro:
```
❌ dns error: failed to lookup address information: Name or service not known
```

---

## ✅ SOLUÇÃO EM 3 PASSOS

### Passo 1: Entenda o Problema

A URL `https://api.evolutionapi.com` que está no placeholder **NÃO EXISTE**.

É apenas um **exemplo** na documentação.

---

### Passo 2: Obtenha uma URL Real

Você precisa de **UM** destes:

#### Opção A: Provedor Gerenciado (Mais Fácil) ⭐

**Z-API** - Recomendado para começar
- Site: https://www.z-api.io/
- Plano grátis: Sim (trial 7 dias)
- Preço: A partir de R$ 29/mês
- Setup: 5 minutos

**Como configurar:**
1. Acesse https://www.z-api.io/
2. Crie uma conta
3. Você receberá:
   ```
   URL: https://api.z-api.io
   Instance: sua-instancia-aqui
   Token: XXXXX-XXXXX-XXXXX
   ```
4. Use estes dados no RENDIZY

---

#### Opção B: WPPConnect (Gratuito, Self-Hosted)

**WPPConnect** - Para quem tem servidor próprio
- Site: https://wppconnect.io/
- Preço: Grátis (você paga apenas o servidor)
- Requer: VPS/Servidor (DigitalOcean, AWS, etc)
- Setup: 30 minutos

---

#### Opção C: Evolution API Cloud

**Evolution API** - Oficial
- Site: https://evolution-api.com/
- Planos variados
- Hospedagem incluída

---

### Passo 3: Configure no RENDIZY

Depois de obter a URL real:

```
1. Vá em: Configurações > Integrações > WhatsApp Business

2. Aba "Configuração":

   ┌─────────────────────────────────────────────┐
   │ URL da Evolution API                        │
   │ [COLE SUA URL REAL AQUI]                    │ 
   └─────────────────────────────────────────────┘
   Exemplo: https://api.z-api.io

   ┌─────────────────────────────────────────────┐
   │ Nome da Instância                           │
   │ [COLE O NOME QUE O PROVEDOR DEU]            │
   └─────────────────────────────────────────────┘
   Exemplo: rendizy-principal

   ┌─────────────────────────────────────────────┐
   │ API Key                                     │
   │ [COLE O TOKEN/API KEY]                      │
   └─────────────────────────────────────────────┘
   Exemplo: B6D03B6C-9F19-4884...

3. Clique em "Salvar Configurações"

4. Clique em "Testar Conexão"
   → Deve aparecer: ✅ Conexão testada com sucesso!

5. Vá na aba "Status & Conexão"

6. Clique em "Gerar QR Code"

7. Escaneie com WhatsApp

8. PRONTO! ✅
```

---

## 🎁 PARA APENAS TESTAR A INTERFACE

Se você quer **apenas visualizar** como funciona, sem conectar WhatsApp de verdade:

Recomendo usar a **Z-API no trial gratuito de 7 dias**.

É o caminho mais rápido para testar.

---

## ❓ FAQ RÁPIDO

**P: Preciso pagar para testar?**  
R: Não! Z-API tem 7 dias grátis.

**P: Quanto custa depois?**  
R: Z-API: ~R$ 29-99/mês dependendo do plano

**P: Posso usar grátis para sempre?**  
R: Sim, se você instalar WPPConnect no seu próprio servidor (requer conhecimento técnico)

**P: Qual a mais fácil?**  
R: Z-API - 5 minutos de setup, trial grátis

---

## ✅ CHECKLIST FINAL

- [ ] ❌ Parei de usar `https://api.evolutionapi.com`
- [ ] ✅ Escolhi um provedor (Z-API, WPPConnect, etc)
- [ ] ✅ Obtive URL + Credentials reais
- [ ] ✅ Configurei no RENDIZY
- [ ] ✅ Testei conexão com sucesso
- [ ] ✅ Gerei QR Code
- [ ] ✅ WhatsApp conectado!

---

## 🚀 PRÓXIMO PASSO

**AGORA:** Acesse https://www.z-api.io/ e crie uma conta para testar gratuitamente!

---

**Dúvidas?** Me avise! 🎉
