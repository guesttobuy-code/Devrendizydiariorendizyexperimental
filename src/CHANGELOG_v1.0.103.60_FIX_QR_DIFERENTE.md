# 📋 CHANGELOG v1.0.103.60 - FIX QR CODE DIFERENTE

**VERSÃO:** v1.0.103.60  
**DATA:** 29/10/2025  
**TIPO:** 🐛 Bug Fix Critical  
**PRIORIDADE:** 🔴 ALTA

---

## 🎯 OBJETIVO

Corrigir problema onde QR Code gerado pelo RENDIZY era DIFERENTE do QR Code que a Evolution API mostrava, impedindo a conexão do WhatsApp.

---

## 🐛 PROBLEMA

**Sintoma:**
- QR Code APARECE na tela ✅
- Mas é DIFERENTE do QR Code da Evolution API ❌
- Escanear não conecta o WhatsApp ❌

**Causa:**
- Instância já estava conectada (status: "open")
- Evolution API retornava QR Code antigo/cacheado
- Precisava fazer logout antes de gerar novo QR Code

---

## ✅ CORREÇÃO

### 1. Verificar Estado da Instância

```javascript
// Detectar se instância já está conectada
if (instanceInfo.instance?.state === 'open' || 
    instanceInfo.instance?.status === 'open') {
  needsLogout = true;
}
```

### 2. Fazer Logout Antes de Gerar QR Code

```javascript
if (needsLogout) {
  await evolutionRequest(client, `/instance/logout/${instance_name}`, 'DELETE');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Aguardar processamento
}
```

### 3. Logs Detalhados

```javascript
console.log('   Full response:', JSON.stringify(qrCodeData, null, 2));
```

---

## 📊 FLUXO

### Antes:
```
Instância conectada → GET /instance/connect → QR Code antigo ❌
```

### Depois:
```
Instância conectada → Logout → GET /instance/connect → QR Code novo ✅
```

---

## 📁 ARQUIVOS

- `/supabase/functions/server/routes-chat.ts` (~60 linhas)

---

## 🧪 TESTE

1. Gere QR Code no RENDIZY
2. Compare com Evolution API Manager
3. ✅ Devem ser IDÊNTICOS
4. Escaneie o QR Code
5. ✅ Deve conectar com sucesso

---

## 📈 RESULTADO

- ✅ QR Code correto (igual ao Evolution API)
- ✅ Conexão funciona ao escanear
- ✅ Funciona em todos os cenários
- ✅ Logs detalhados para debug

---

**VERSÃO:** v1.0.103.60  
**PRÓXIMO:** Detecção automática de conexão
