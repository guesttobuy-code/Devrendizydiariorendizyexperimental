# 🚀 GUIA RÁPIDO - WhatsApp Multi-Provider

**TL;DR:** Agora você tem 2 providers WhatsApp e pode trocar entre eles facilmente!

---

## ⚡ USO RÁPIDO (3 exemplos)

### 1. Usar Provider Padrão (Automático)

```typescript
import { whatsapp } from './utils/whatsapp';

// Factory escolhe automaticamente WAHA (Evolution está desabilitado)
const qr = await whatsapp.getQRCode();
await whatsapp.sendTextMessage('5511999999999', 'Olá!');
```

### 2. Escolher Provider Específico

```typescript
import { getProvider } from './utils/whatsapp';

// Forçar usar WAHA
const waha = getProvider('waha');
await waha.sendTextMessage('5511999999999', 'Via WAHA');

// Forçar usar Evolution (se habilitado)
const evolution = getProvider('evolution');
await evolution.sendTextMessage('5511999999999', 'Via Evolution');
```

### 3. Trocar em Runtime

```typescript
import { switchProvider } from './utils/whatsapp';

// Trocar para WAHA
switchProvider('waha');

// Trocar para Evolution
switchProvider('evolution');
```

---

## 📋 ONDE ESTÁ CADA COISA

```
utils/whatsapp/
├── index.ts                    → import daqui!
├── types.ts                    → Tipos
├── factory.ts                  → Factory
├── evolution/                  → Evolution (desabilitado)
│   ├── api.ts
│   └── config.ts
└── waha/                       → WAHA (habilitado)
    ├── api.ts
    └── config.ts

components/
├── WhatsAppIntegration.tsx           → Usa Evolution (antigo)
├── WAHAIntegration.tsx               → Usa WAHA (novo)
└── WhatsAppProviderSelector.tsx      → Escolher qual usar
```

---

## 🎯 O QUE MUDOU?

### ANTES (Código Antigo)

```typescript
import { EvolutionAPIClient } from './utils/evolutionApi';

const client = new EvolutionAPIClient({
  apiUrl: 'https://evo.conectese.app',
  instanceName: 'rendizy',
  apiKey: 'xxx',
});

await client.sendTextMessage({
  number: '5511999999999@s.whatsapp.net',
  text: 'Olá',
});
```

### AGORA (Novo Sistema)

```typescript
import { whatsapp } from './utils/whatsapp';

// Factory escolhe automaticamente o melhor provider
await whatsapp.sendTextMessage('5511999999999', 'Olá');
```

**Mais simples, mais flexível!** 🎉

---

## 🔧 CONFIGURAR PROVIDERS

### Evolution (Desabilitado)

```typescript
// utils/whatsapp/evolution/config.ts
export const EVOLUTION_CONFIG = {
  provider: 'evolution',
  enabled: false,  // ← Desabilitado (erro 401)
  baseUrl: 'https://evo.conectese.app',
  apiKey: '',
  instanceName: 'rendizy',
};
```

**Para habilitar:**
1. Conseguir API Key válida
2. Alterar `enabled: true`
3. Preencher `apiKey`

### WAHA (Habilitado)

```typescript
// utils/whatsapp/waha/config.ts
export const WAHA_CONFIG = {
  provider: 'waha',
  enabled: true,  // ← Habilitado!
  baseUrl: 'https://whatsapp.suacasaavenda.com.br',
  apiKey: 'rendizy_waha_2025_super_secret_key_change_this',
  sessionName: 'rendizy-default',
};
```

**Para usar:**
1. Deploy WAHA na VPS (ver `DEPLOY_WAHA_VPS_GUIDE.md`)
2. Alterar `baseUrl` se necessário
3. Alterar `apiKey` (senha forte!)

---

## 📊 COMPARAÇÃO RÁPIDA

| Feature | Evolution | WAHA |
|---------|-----------|------|
| **Status** | ❌ Desabilitado | ✅ Habilitado |
| **Custo** | $0 | $0 (usa VPS) |
| **Problema** | Erro 401 | Nenhum |
| **Deploy** | Externo | VPS própria |
| **Controle** | Baixo | Alto |
| **Estabilidade** | ❌ Instável | ✅ Estável |

---

## 🎨 USAR NO COMPONENTE

### Componente React Simples

```tsx
import { whatsapp } from './utils/whatsapp';
import { useState } from 'react';
import { Button } from './components/ui/button';

export function WhatsAppTest() {
  const [qrCode, setQRCode] = useState('');

  const handleConnect = async () => {
    const qr = await whatsapp.getQRCode();
    setQRCode(qr.qrCode);
  };

  const handleSend = async () => {
    await whatsapp.sendTextMessage('5511999999999', 'Olá do RENDIZY!');
  };

  return (
    <div>
      <Button onClick={handleConnect}>Conectar WhatsApp</Button>
      <Button onClick={handleSend}>Enviar Mensagem</Button>
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </div>
  );
}
```

### Usar Componente de Seleção

```tsx
import { WhatsAppProviderSelector } from './components/WhatsAppProviderSelector';

export function Settings() {
  return (
    <div>
      <h1>Configurações WhatsApp</h1>
      <WhatsAppProviderSelector />
    </div>
  );
}
```

---

## 🔍 VERIFICAR STATUS

```typescript
import { getProvidersStatus } from './utils/whatsapp';

const status = await getProvidersStatus();

console.log(status);
// [
//   {
//     name: 'evolution',
//     enabled: false,
//     healthy: false,
//     status: 'DISCONNECTED'
//   },
//   {
//     name: 'waha',
//     enabled: true,
//     healthy: true,
//     status: 'CONNECTED'
//   }
// ]
```

---

## 🆘 PROBLEMAS COMUNS

### "Cannot find module './utils/whatsapp'"

**Solução:** Certifique-se que os arquivos foram criados em:
```
utils/whatsapp/index.ts  ← Entry point principal
```

### "Provider 'evolution' está desabilitado"

**Esperado!** Evolution está desabilitado por erro 401.

**Solução:** Use WAHA:
```typescript
import { getProvider } from './utils/whatsapp';
const waha = getProvider('waha');
```

### "WAHA API Error: 401"

**Causa:** API Key incorreta

**Solução:** Edite `utils/whatsapp/waha/config.ts`:
```typescript
apiKey: 'SUA_API_KEY_AQUI'
```

---

## 📚 DOCS COMPLETAS

- **Arquitetura:** `WHATSAPP_MULTI_PROVIDER_ARCHITECTURE.md`
- **Deploy WAHA:** `DEPLOY_WAHA_VPS_GUIDE.md`
- **Trocar Domínio:** `COMO_TROCAR_DOMINIO_DEPOIS.md`

---

## 🎉 CONCLUSÃO

Agora você tem:

```
✅ 2 providers WhatsApp (Evolution + WAHA)
✅ Trocar entre eles facilmente
✅ Evolution desabilitado (mas não deletado)
✅ WAHA pronto para usar
✅ Código desacoplado e profissional
✅ Zero vendor lock-in
```

**Próximo passo:** Deploy WAHA na VPS! 🚀

Ver: `DEPLOY_WAHA_VPS_GUIDE.md`

---

**Tempo para começar a usar:** 30 segundos  
**Complexidade:** Baixa  
**Benefício:** Alto
