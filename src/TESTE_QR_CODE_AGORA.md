# 🧪 TESTE QR CODE AGORA - GUIA RÁPIDO

**v1.0.103.59** | 29/10/2025

---

## ⚡ TESTE EM 2 MINUTOS

### 1. Abra o RENDIZY
```
http://localhost:5173 (ou seu URL)
```

### 2. Vá em Integrações
```
Menu → Configurações → Integrações → WhatsApp Business
```

### 3. Aba "Configuração"
```
Se ainda não preencheu:
  URL:       https://evo.boravendermuito.com.br
  Instância: Rendizy
  API Key:   [SUA GLOBAL API KEY]
  
Clique: "Salvar Configurações"
```

### 4. Aba "Status & Conexão"
```
Clique: "Gerar QR Code"
```

### 5. Observe
```
✅ Deve ver:
   - Loading "Conectando..."
   - Logs no console
   - QR Code aparece como IMAGEM (não texto!)
   - Toast verde "QR Code gerado!"
   
✅ No Console deve ver:
   🔵 Iniciando conexão WhatsApp...
   📤 Enviando request para backend...
   📥 Resposta do backend: {...}
   🔍 QR Code recebido: iVBORw...
   ✨ Prefixo data:image adicionado ao QR Code
   ✅ QR Code definido no state
```

---

## 🔍 O QUE VERIFICAR

### ✅ QR Code como IMAGEM
```
Deve ver uma imagem quadrada (256x256px)
com padrão de QR Code preto e branco

❌ NÃO deve ver:
   - String de texto base64
   - Código bruto
   - Área em branco
```

### ✅ Console com LOGS
```
Abra DevTools (F12) → Console

Deve ver múltiplos logs:
🔵 Iniciando...
📤 Enviando...
📥 Resposta...
🔍 QR Code recebido...
✨ Prefixo adicionado...
✅ Definido no state...
```

### ✅ Toast de SUCESSO
```
Canto superior direito:
"✅ QR Code gerado! Escaneie com o WhatsApp"
```

### ✅ Botão de REFRESH
```
Abaixo do QR Code deve ter:
[🔄 Gerar Novo QR Code]
```

---

## 🐛 SE DER ERRO

### Erro: QR Code não aparece

**1. Verifique o Console:**
```javascript
// Deve ter:
📥 Resposta do backend: {success: true, data: {...}}
🔍 QR Code recebido: [algum valor]

// Se tiver "null" ou "undefined":
→ Problema no backend
→ Evolution API não retornou QR Code
```

**Solução:**
```
1. Verifique credenciais (Global API Key)
2. Verifique nome da instância (Rendizy)
3. Veja logs do Supabase Functions
```

---

### Erro 401: Unauthorized

**Significa:**
```
Global API Key está incorreta
```

**Solução:**
```
1. Vá no Manager: https://evo.boravendermuito.com.br/manager
2. Settings → Find Settings → AUTHENTICATION
3. Copie a Global API Key (não a Instance Key!)
4. Cole novamente no RENDIZY
5. Salve e tente gerar QR Code novamente
```

---

### Erro 404: Not Found

**Significa:**
```
Nome da instância está errado
```

**Solução:**
```
1. Verifique no Manager qual é o nome correto
2. Provavelmente é "Rendizy" (com R maiúsculo)
3. NÃO é "rendizy-admin-master"
4. Atualize e tente novamente
```

---

### QR Code aparece como TEXTO

**Significa:**
```
Prefixo data:image não foi adicionado
```

**Debug:**
```javascript
// Verifique no console:
✨ Prefixo data:image adicionado ao QR Code

// Se NÃO aparecer esta linha:
→ Problema no código de normalização
→ Me avise para debug
```

---

## 📸 COMO DEVE FICAR

```
╔════════════════════════════════════════╗
║ WhatsApp Business                      ║
║                                        ║
║ ┌────────────────────────────────────┐ ║
║ │ [Configuração] [Status] [Avançado] │ ║
║ └────────────────────────────────────┘ ║
║                                        ║
║ ┌────────────────────────────────────┐ ║
║ │ ✅ QR Code gerado!                 │ ║
║ │ Escaneie com o WhatsApp            │ ║
║ │                                    │ ║
║ │    ┌──────────────────┐            │ ║
║ │    │ ██ ██   ██ ████ │            │ ║  ← QR Code
║ │    │ ██   ██ ████ ██ │            │ ║    como IMAGEM
║ │    │ ████ ██   ██ ██ │            │ ║
║ │    │ ██ ████ ██   ██ │            │ ║
║ │    └──────────────────┘            │ ║
║ │                                    │ ║
║ │ 📱 Como conectar:                  │ ║
║ │ 1. Abra o WhatsApp                 │ ║
║ │ 2. Menu → Aparelhos conectados     │ ║
║ │ 3. Conectar um aparelho            │ ║
║ │ 4. Aponte a câmera para o QR Code  │ ║
║ │                                    │ ║
║ │ [🔄 Gerar Novo QR Code]            │ ║
║ │                                    │ ║
║ │ 💡 QR Code expira em alguns minutos│ ║
║ └────────────────────────────────────┘ ║
╚════════════════════════════════════════╝
```

---

## ✅ CHECKLIST

- [ ] Abri o RENDIZY
- [ ] Fui em Integrações → WhatsApp
- [ ] Preenchi as credenciais (se necessário)
- [ ] Cliquei "Gerar QR Code"
- [ ] QR Code apareceu como IMAGEM ✅
- [ ] Console tem os logs detalhados ✅
- [ ] Toast verde apareceu ✅
- [ ] Botão de refresh está presente ✅
- [ ] Posso escanear o QR Code ✅

---

## 🎯 PRÓXIMO PASSO

Após ver o QR Code:

```
1. Pegue seu celular
2. Abra o WhatsApp
3. Menu (⋮) → Aparelhos conectados
4. Conectar um aparelho
5. Escaneie o QR Code na tela
6. ✅ WhatsApp conectado!
```

---

## 💬 FEEDBACK

**Funcionou?**
```
✅ SIM: Perfeito! Pode conectar seu WhatsApp
❌ NÃO: Me avise qual erro você viu
```

**Logs para enviar se der erro:**
```
1. Screenshot da tela
2. Console do navegador (F12)
3. Mensagem de erro (se houver)
```

---

**v1.0.103.59** | Fix QR Code WhatsApp  
**Status:** ✅ Pronto para testar  
**Duração:** 2 minutos
