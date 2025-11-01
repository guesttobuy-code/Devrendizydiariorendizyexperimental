# 🚀 ATUALIZAR API KEY DO WHATSAPP - PASSO A PASSO

**Status:** ✅ API KEY VÁLIDA OBTIDA  
**Versão:** v1.0.103.70  
**Tempo Estimado:** 2 minutos

---

## 🎯 OBJETIVO

Substituir a API Key inválida pela nova API Key válida no RENDIZY.

---

## 🔑 CREDENCIAIS ATUALIZADAS

### ✅ Credenciais Corretas (USE ESTAS)

```
URL da Evolution API: https://evo.boravendermuito.com.br
Nome da Instância:    Rendizy
Global API Key:       4de7861e944e291b56fe9781d2b00b36
```

### ❌ Credenciais Antigas (NÃO USE)

```
Global API Key (INVÁLIDA): F7DE5EFFB66B-4E43-B11F-F0D5D8849741
```

---

## 📝 PASSO A PASSO COMPLETO

### PASSO 1: Iniciar o RENDIZY

```bash
# No terminal, na pasta do projeto
npm run dev
```

**Aguarde:** O servidor iniciar em http://localhost:5173

---

### PASSO 2: Acessar Configurações do WhatsApp

1. **Abra o navegador:**
   ```
   http://localhost:5173
   ```

2. **Navegue pelo menu:**
   ```
   ┌─────────────────────────────────────┐
   │ Menu Principal                      │
   │   ↓                                 │
   │ ⚙️  Configurações                    │
   │   ↓                                 │
   │ 🔌 Integrações                      │
   │   ↓                                 │
   │ 💬 WhatsApp                         │
   └─────────────────────────────────────┘
   ```

---

### PASSO 3: Preencher as Credenciais

Na **aba "Configuração"**, preencha os 3 campos:

#### Campo 1: URL da Evolution API
```
https://evo.boravendermuito.com.br
```
💡 **Dica:** NÃO inclua `/manager` no final

#### Campo 2: Nome da Instância
```
Rendizy
```
💡 **Dica:** Com "R" maiúsculo, exatamente como mostrado

#### Campo 3: API Key (COPIE ESTE)
```
4de7861e944e291b56fe9781d2b00b36
```
💡 **Dica:** Copie e cole exatamente como está, sem espaços

---

### PASSO 4: Salvar Configurações

```
┌─────────────────────────────────────┐
│                                     │
│  [💾 Salvar Configurações]         │
│                                     │
└─────────────────────────────────────┘
```

**Resultado Esperado:**
```
✅ Configurações salvas com sucesso!
```

---

### PASSO 5: Testar Conexão

```
┌─────────────────────────────────────┐
│                                     │
│  [🔄 Testar Conexão]               │
│                                     │
└─────────────────────────────────────┘
```

**Resultado Esperado:**
```
✅ Conexão testada com sucesso!
```

**Se der erro 401:**
- ❌ Verifique se copiou a API Key corretamente
- ❌ Não deve ter espaços no início ou fim
- ❌ Use exatamente: `4de7861e944e291b56fe9781d2b00b36`

---

### PASSO 6: Gerar QR Code

Vá para a **aba "Status & Conexão"**:

```
┌─────────────────────────────────────┐
│                                     │
│  [📱 Gerar QR Code]                │
│                                     │
└─────────────────────────────────────┘
```

**Resultado Esperado:**
```
✅ QR Code gerado! Escaneie com o WhatsApp

┌─────────────────────────────────────┐
│                                     │
│        [QR CODE APARECE AQUI]       │
│                                     │
└─────────────────────────────────────┘
```

---

### PASSO 7: Escanear QR Code

1. **Abra o WhatsApp no celular**
2. **No Android:**
   ```
   WhatsApp → Mais opções (⋮) → Aparelhos conectados → Conectar um aparelho
   ```

3. **No iPhone:**
   ```
   WhatsApp → Ajustes → Aparelhos conectados → Conectar um aparelho
   ```

4. **Escaneie o QR Code** mostrado no RENDIZY

---

### PASSO 8: Confirmar Conexão

**Resultado Esperado:**
```
┌─────────────────────────────────────────────┐
│                                             │
│  ✅ WhatsApp Conectado                     │
│                                             │
│  Número: +55 21 99441-4512                 │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🎯 TESTE RÁPIDO VIA CURL (OPCIONAL)

Se quiser testar a API Key ANTES de configurar no RENDIZY:

```bash
curl -X GET "https://evo.boravendermuito.com.br/instance/fetchInstances" \
  -H "apikey: 4de7861e944e291b56fe9781d2b00b36" \
  -H "Content-Type: application/json"
```

**Resposta Esperada (200 OK):**
```json
[
  {
    "instance": {
      "instanceName": "Rendizy",
      "instanceId": "unique-id-here",
      "status": "close"
    },
    "connectionStatus": "close"
  }
]
```

**Se retornar 401:**
```json
{
  "error": "Unauthorized"
}
```
→ Verifique se copiou a API Key corretamente

---

## ❓ TROUBLESHOOTING

### Erro: "❌ API Key inválida"

**Solução:**
```
1. Verifique se copiou: 4de7861e944e291b56fe9781d2b00b36
2. Não deve ter espaços no início ou fim
3. Apague e cole novamente
```

### Erro: "❌ URL inválida ou inacessível"

**Solução:**
```
1. Use: https://evo.boravendermuito.com.br
2. NÃO use: https://evo.boravendermuito.com.br/manager
3. Certifique-se que começa com https://
```

### Erro: "❌ Instância não encontrada"

**Solução:**
```
1. Use exatamente: Rendizy (com R maiúsculo)
2. Verifique se a instância existe no Evolution Manager
3. Acesse: https://evo.boravendermuito.com.br/manager
```

### QR Code não aparece

**Solução:**
```
1. Verifique se salvou as configurações primeiro
2. Verifique se testou a conexão com sucesso
3. Tente clicar em "Gerar QR Code" novamente
4. Verifique o console do navegador (F12) para erros
```

---

## 📋 CHECKLIST DE VALIDAÇÃO

Marque cada item conforme concluir:

- [ ] RENDIZY está rodando (npm run dev)
- [ ] Acessei http://localhost:5173
- [ ] Fui em: Configurações → Integrações → WhatsApp
- [ ] Preenchi a URL: https://evo.boravendermuito.com.br
- [ ] Preenchi a Instância: Rendizy
- [ ] Preenchi a API Key: 4de7861e944e291b56fe9781d2b00b36
- [ ] Cliquei em "💾 Salvar Configurações"
- [ ] Vi a mensagem: "✅ Configurações salvas com sucesso!"
- [ ] Cliquei em "🔄 Testar Conexão"
- [ ] Vi a mensagem: "✅ Conexão testada com sucesso!"
- [ ] Fui para aba "Status & Conexão"
- [ ] Cliquei em "📱 Gerar QR Code"
- [ ] Vi o QR Code na tela
- [ ] Escaneei o QR Code com WhatsApp
- [ ] Vi a mensagem: "✅ WhatsApp Conectado"

---

## 🎉 CONCLUSÃO

Se todos os passos acima foram concluídos com sucesso:

```
┌─────────────────────────────────────────────┐
│                                             │
│  ✅ INTEGRAÇÃO WHATSAPP ATIVA!             │
│                                             │
│  Você agora pode:                           │
│  • Receber mensagens de hóspedes            │
│  • Enviar mensagens pelo RENDIZY            │
│  • Ver histórico de conversas               │
│  • Usar templates de mensagem               │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📚 DOCUMENTAÇÃO RELACIONADA

- `CHANGELOG_v1.0.103.70_API_KEY_VALIDA.md` - Detalhes da atualização
- `WhatsAppIntegration.tsx` - Componente principal
- `evolutionApi.ts` - Cliente da API
- `START_HERE_v1.0.103.63.md` - Histórico anterior

---

## 🆘 PRECISA DE AJUDA?

Se encontrar problemas:

1. **Verifique os logs do navegador:**
   ```
   Pressione F12 → Console
   ```

2. **Verifique os logs do backend:**
   ```
   No terminal onde executou npm run dev
   ```

3. **Consulte a documentação:**
   ```
   ERRO_401_API_KEY_INVALIDA_SOLUCAO.md
   DIAGNOSTICO_ERRO_401_v1.0.103.65.md
   ```

---

**Última Atualização:** 30/10/2025  
**Versão do Sistema:** v1.0.103.70  
**Status:** ✅ Pronto para uso
