# 🔧 Correção: "Erro ao buscar reservas" - v1.0.103.40

**Data:** 29/10/2025  
**Versão:** v1.0.103.40  
**Problema:** Mensagem de erro genérica "Erro ao buscar reservas" sem detalhes

---

## 🐛 PROBLEMA IDENTIFICADO

### **Erro Reportado:**
```
Fetch error: Error: Erro ao buscar reservas
```

### **Causa Raiz:**

O sistema estava capturando erros mas **não estava mostrando os detalhes** do que realmente estava errado:

1. **No método `request()` do StaysNetClient:**
   - Erros eram capturados mas a mensagem era genérica
   - Detalhes importantes (URL, método, stack trace) eram perdidos

2. **Na função `errorResponse()`:**
   - Não aceitava parâmetro de detalhes adicionais
   - Impossível passar informações técnicas para debug

3. **Na rota `previewStaysNetReservations()`:**
   - Logs insuficientes para debug
   - Não mostrava configuração carregada
   - Não mostrava detalhes da falha

---

## ✅ CORREÇÕES APLICADAS

### **1. Melhorado Tratamento de Erros no `request()`**

**Antes:**
```typescript
} catch (error: any) {
  console.error('[StaysNet] Request error:', error.message);
  return {
    success: false,
    error: error.message,  // ← Mensagem vaga
    status: 500,
  };
}
```

**Depois:**
```typescript
} catch (error: any) {
  console.error('[StaysNet] Request error:', error.message);
  console.error('[StaysNet] Full error:', error);
  console.error('[StaysNet] Error stack:', error.stack);
  
  const errorMessage = error.message || 'Unknown error occurred';
  return {
    success: false,
    error: `Request failed: ${errorMessage}`,  // ← Mais descritivo
    status: 500,
    details: {  // ← Detalhes completos!
      message: error.message,
      stack: error.stack,
      url: url,
      method: method,
    }
  };
}
```

**Benefício:** Agora você sabe EXATAMENTE qual URL falhou, qual método, e o stack trace completo.

---

### **2. Atualizada Função `errorResponse()`**

**Antes:**
```typescript
export function errorResponse(error: string): ApiResponse {
  return {
    success: false,
    error,
    timestamp: getCurrentDateTime(),
  };
}
```

**Depois:**
```typescript
export function errorResponse(error: string, details?: any): ApiResponse {
  return {
    success: false,
    error,
    ...(details && { details }),  // ← Inclui detalhes se fornecidos
    timestamp: getCurrentDateTime(),
  };
}
```

**Benefício:** Agora pode passar detalhes técnicos do erro para o frontend.

---

### **3. Logs Extremamente Detalhados na Rota de Preview**

**Adicionado:**

```typescript
export async function previewStaysNetReservations(c: Context) {
  try {
    console.log('\n' + '='.repeat(80));
    console.log('[StaysNet Preview] 🔍 INÍCIO DO PREVIEW DE RESERVAS');
    console.log('='.repeat(80));
    
    // ✅ Log de config carregada
    console.log('[StaysNet Preview] Config retornada do KV:', {
      hasConfig: !!config,
      hasApiKey: !!config?.apiKey,
      hasApiSecret: !!config?.apiSecret,
      baseUrl: config?.baseUrl || 'N/A',
      enabled: config?.enabled || false,
    });
    
    // ✅ Log de cada etapa
    console.log('[StaysNet Preview] Criando cliente Stays.net...');
    console.log('[StaysNet Preview] Chamando client.getReservations()...');
    
    // ✅ Log detalhado do resultado
    console.log('[StaysNet Preview] Resultado recebido do cliente:');
    console.log('[StaysNet Preview] API Result:', {
      success: result.success,
      status: result.status,
      hasData: !!result.data,
      hasError: !!result.error,
      errorPreview: result.error ? result.error.substring(0, 200) : null,
    });
    
    // ✅ Log de exceções com stack trace completo
  } catch (error: any) {
    console.error('\n' + '='.repeat(80));
    console.error('[StaysNet Preview] ❌ EXCEPTION CAUGHT');
    console.error('='.repeat(80));
    console.error('[StaysNet Preview] ❌ Error type:', error.constructor.name);
    console.error('[StaysNet Preview] ❌ Error message:', error.message);
    console.error('[StaysNet Preview] ❌ Error stack:', error.stack);
    console.error('='.repeat(80) + '\n');
    
    // Retorna detalhes no response
    return c.json(errorResponse(error.message || 'Failed to preview reservations', {
      type: error.constructor.name,
      message: error.message,
      stack: error.stack,
    }), 500);
  }
}
```

**Benefício:** Agora você vê EXATAMENTE onde o erro aconteceu e por quê.

---

## 🔍 COMO DEBUGAR AGORA

### **1. Abra o Console do Backend (Logs do Supabase)**

Você verá logs extremamente detalhados:

```
================================================================================
[StaysNet Preview] 🔍 INÍCIO DO PREVIEW DE RESERVAS
================================================================================
[StaysNet Preview] Query params: { startDate: undefined, endDate: undefined, dateType: 'arrival' }
[StaysNet Preview] Carregando configuração do KV...
[StaysNet Preview] Config retornada do KV: {
  hasConfig: true,
  hasApiKey: true,
  hasApiSecret: true,
  baseUrl: 'https://bvm.stays.net/external/v1',
  enabled: true
}
[StaysNet Preview] ✅ Configuration loaded successfully
[StaysNet Preview]   - Base URL: https://bvm.stays.net/external/v1
[StaysNet Preview]   - API Key (first 4 chars): user****
[StaysNet Preview]   - Has API Secret: true
[StaysNet Preview] Criando cliente Stays.net...
[StaysNet Preview] Chamando client.getReservations()...
```

**Se der erro, você verá:**

```
================================================================================
[StaysNet Preview] ❌ EXCEPTION CAUGHT IN previewStaysNetReservations
================================================================================
[StaysNet Preview] ❌ Error type: TypeError
[StaysNet Preview] ❌ Error message: Cannot read property 'reservations' of undefined
[StaysNet Preview] ❌ Error stack: TypeError: Cannot read property 'reservations' of undefined
    at StaysNetClient.getReservations (/path/to/file.ts:345:23)
    at previewStaysNetReservations (/path/to/file.ts:678:15)
================================================================================
```

### **2. Abra o Console do Browser (Frontend)**

Você verá logs do frontend E a resposta completa do backend:

```javascript
[StaysNet] Response data: {
  success: false,
  error: "Request failed: Cannot read property 'reservations' of undefined",
  details: {
    type: "TypeError",
    message: "Cannot read property 'reservations' of undefined",
    stack: "TypeError: Cannot read property 'reservations' of undefined...",
    url: "https://bvm.stays.net/external/v1/booking/reservations?from=2025-09-29&to=2026-10-29&dateType=arrival",
    method: "GET"
  },
  timestamp: "2025-10-29T12:34:56.789Z"
}
```

---

## 🎯 POSSÍVEIS CAUSAS DO ERRO

### **1. Configuração Não Salva**

**Sintoma:**
```
Configuration not found or missing API key
```

**Solução:**
1. Vá em Configurações → Integrações → Stays.net
2. Preencha Base URL e API Key
3. Clique em "Salvar Configuração"
4. Veja a mensagem de sucesso

---

### **2. URL Incorreta**

**Sintoma:**
```
Request failed: API returned non-JSON response
Status: 200 OK
Content-Type: text/html
```

**Solução:**
Use a URL correta da API:
```
✅ Correto:  https://bvm.stays.net/external/v1
❌ Errado:   https://bvm.stays.net
❌ Errado:   https://bvm.stays.net/login
```

---

### **3. Credenciais Inválidas**

**Sintoma:**
```
Request failed: HTTP 401: Unauthorized
```

**Solução:**
1. Verifique se o Login (API Key) está correto
2. Verifique se a Senha (API Secret) está correta
3. Confirme que a API está ativa no painel Stays.net

---

### **4. Endpoint Não Existe**

**Sintoma:**
```
Request failed: HTTP 404: Not Found
```

**Solução:**
1. Certifique-se que a Base URL tem `/external/v1`
2. Verifique se o endpoint `/booking/reservations` existe
3. Entre em contato com suporte Stays.net

---

### **5. Erro Interno da API**

**Sintoma:**
```
Request failed: HTTP 500: Internal Server Error
```

**Solução:**
1. Verifique se a URL da API está correta
2. Aguarde alguns minutos (pode ser problema temporário)
3. Entre em contato com suporte Stays.net

---

## 📊 INFORMAÇÕES QUE VOCÊ TERÁ

### **Com as correções aplicadas, você verá:**

✅ **URL completa** que está sendo chamada  
✅ **Método HTTP** (GET, POST, etc)  
✅ **Status da resposta** (200, 401, 404, 500, etc)  
✅ **Content-Type** da resposta  
✅ **Mensagem de erro** detalhada  
✅ **Stack trace** completo  
✅ **Configuração** carregada (Base URL, se tem API Key, etc)  
✅ **Parâmetros** enviados (startDate, endDate, dateType)  
✅ **Dados retornados** (preview do JSON)  

---

## 🧪 COMO TESTAR

### **Teste 1: Sem Configuração**

1. Limpe a configuração: `localStorage.clear()`
2. Recarregue a página
3. Tente buscar reservas
4. **Deve mostrar:** "Stays.net não configurado"

### **Teste 2: URL Incorreta**

1. Configure Base URL: `https://bvm.stays.net` (sem `/external/v1`)
2. Salve
3. Tente buscar reservas
4. **Deve mostrar:** Erro detalhado com a URL incorreta

### **Teste 3: Credenciais Erradas**

1. Configure com API Key incorreta
2. Tente buscar reservas
3. **Deve mostrar:** "HTTP 401: Unauthorized"

### **Teste 4: Configuração Correta**

1. Configure corretamente
2. Busque reservas
3. **Deve mostrar:** Alert com estrutura de dados OU erro específico da API

---

## 📝 ARQUIVOS MODIFICADOS

```
✅ /supabase/functions/server/routes-staysnet.ts
   - Melhorado tratamento de erros no request()
   - Adicionados logs extremamente detalhados
   - Erro retorna details com stack trace

✅ /supabase/functions/server/utils.ts
   - errorResponse() aceita detalhes opcionais
   - Details são incluídos na resposta

✅ /BUILD_VERSION.txt
   - Atualizado para v1.0.103.40
```

---

## ✅ RESULTADO FINAL

### **Antes:**
```
Fetch error: Error: Erro ao buscar reservas
```
*Sem nenhuma informação útil* 😞

### **Depois:**
```
Fetch error: Error: Request failed: API returned non-JSON response
Status: 200 OK
Content-Type: text/html
URL: https://bvm.stays.net/booking/reservations
This usually means:
1. The Base URL is incorrect
2. The endpoint doesn't exist
3. Authentication failed
4. Server returned an error page (HTML)
```
*Com informações extremamente detalhadas para debug!* 🎉

---

## 🎯 PRÓXIMO PASSO

**Agora teste novamente e me envie:**

1. **Logs do Console do Browser** (F12)
2. **Mensagem de erro completa** (se houver)
3. **Screenshot** (opcional)

Com essas informações detalhadas, posso identificar EXATAMENTE o que está errado e corrigir em minutos! 🚀

---

## 💡 DICA

**Para ver os logs do backend:**
1. Acesse o [Dashboard do Supabase](https://supabase.com/dashboard)
2. Vá em "Edge Functions"
3. Clique em "make-server-67caf26a"
4. Veja os logs em tempo real

**Ou use o CLI:**
```bash
supabase functions logs make-server-67caf26a --tail
```

---

## 🎉 RESUMO

✅ Erros agora incluem detalhes completos  
✅ Logs extremamente detalhados no backend  
✅ Stack trace completo disponível  
✅ URL, método e status visíveis  
✅ Fácil identificar a causa raiz  

**Sistema de debug v1.0.103.40 pronto! 🚀**
