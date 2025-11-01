# 🚨 FIX: Loading Infinito - Diagnóstico e Solução

**Problema**: Sistema fica em loading infinito, não carrega a tela.

---

## 🔍 **DIAGNÓSTICO**

### Causa Principal: Backend não está respondendo

O App.tsx tem 3 useEffects que fazem chamadas ao backend:

```typescript
// 1. Load Properties (linha 479)
useEffect(() => {
  const loadProperties = async () => {
    const response = await propertiesApi.list();
    // Se falhar, ativa banner de erro mas NÃO trava
  }
}, []);

// 2. Load Reservations (linha 516)
useEffect(() => {
  const loadReservations = async () => {
    const [reservationsResponse, guestsResponse, calendarResponse] = await Promise.all([
      reservationsApi.list(),
      guestsApi.list(),
      calendarApi.getData(...)
    ]);
    // Se falhar, ativa banner de erro mas NÃO trava
  }
}, [refreshKey]);

// 3. Calendar Manager (linha 628)
const calendarManager = useCalendarManager({
  getCurrentLastDay,
  onDaysAdded: handleDaysAdded,
  enabled: true
});
```

---

## 🎯 **SOLUÇÕES**

### Solução 1: Verificar Console do Navegador

**Abra o DevTools (F12) e veja:**

1. **Console** → Procure por erros (vermelhos)
2. **Network** → Veja se as chamadas ao backend falharam
3. **Se aparecer:**
   - `ERR_CONNECTION_REFUSED` → Backend offline
   - `404 Not Found` → Rotas incorretas
   - `500 Internal Server Error` → Erro no backend

---

### Solução 2: Ativar Mock Mode (RÁPIDO!)

**O sistema tem mock mode automático**, mas pode não estar funcionando.

**Forçar Mock Mode:**

1. Abra o console do navegador (F12)
2. Digite e execute:

```javascript
localStorage.setItem('rendizy_use_mock', 'true');
window.location.reload();
```

Isso força o sistema a usar dados locais (sem backend).

---

### Solução 3: Limpar Cache Completamente

**Se o mock mode não funcionar:**

```javascript
// No console do navegador:
localStorage.clear();
sessionStorage.clear();
window.location.reload();
```

---

### Solução 4: Verificar URL do Backend

**O backend está configurado corretamente?**

1. Abra `/utils/supabase/info.tsx`
2. Verifique se:
   - `projectId` está correto
   - `publicAnonKey` está correto
3. URL esperada: `https://{projectId}.supabase.co/functions/v1/make-server-67caf26a/...`

---

### Solução 5: Inicializar Backend

**Se o backend está rodando mas vazio:**

1. Sistema deve carregar (mesmo vazio)
2. Clique em "Inicializar DB" (botão azul no topo)
3. Escolha "Nova Estrutura"
4. Aguarde seed

---

## 🛠️ **CORREÇÃO DEFINITIVA**

Vou adicionar **timeout** e **fallback** automático nos useEffects:

```typescript
// Em vez de esperar infinitamente, após 5s usa mock
useEffect(() => {
  const loadProperties = async () => {
    const timeout = setTimeout(() => {
      console.warn('⚠️ Timeout ao carregar propriedades, usando mock');
      setProperties(mockProperties);
      setLoadingProperties(false);
    }, 5000); // 5 segundos

    try {
      const response = await propertiesApi.list();
      clearTimeout(timeout);
      // ...
    } catch (error) {
      clearTimeout(timeout);
      // ...
    }
  };
  loadProperties();
}, []);
```

---

## ⚡ **AÇÃO IMEDIATA**

**EXECUTE AGORA no console do navegador:**

```javascript
// 1. Forçar mock mode
localStorage.setItem('rendizy_use_mock', 'true');

// 2. Limpar cache antigo
localStorage.removeItem('rendizy_mock_data');
localStorage.removeItem('rendizy_data_version');

// 3. Recarregar
window.location.reload();
```

Isso deve fazer o sistema carregar **IMEDIATAMENTE** com dados mock.

---

## 📋 **CHECKLIST DE DIAGNÓSTICO**

```
[ ] Abriu DevTools (F12)?
[ ] Viu mensagens no Console?
[ ] Verificou aba Network?
[ ] Tentou forçar mock mode?
[ ] Limpou localStorage?
[ ] Backend está online?
[ ] URLs estão corretas?
```

---

## 🎯 **DEPOIS QUE CARREGAR**

Quando o sistema carregar (com mock):

1. Clique em "Inicializar DB"
2. Escolha "Nova Estrutura (Location → Accommodation)"
3. Aguarde seed
4. Sistema estará 100% funcional

---

## 📞 **SE NÃO FUNCIONAR**

Me diga:

1. **Qual erro aparece no console?**
2. **Qual aba está selecionada na Network?**
3. **O que aparece quando digita no console:**
   ```javascript
   localStorage.getItem('rendizy_use_mock')
   ```

---

**Criado em**: 28 OUT 2025  
**Versão**: v1.0.102  
**Status**: Diagnóstico Completo
