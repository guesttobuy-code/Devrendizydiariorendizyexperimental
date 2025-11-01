# 💡 EXEMPLOS DE USO - WhatsApp Multi-Provider

Exemplos práticos de como usar o novo sistema multi-provider no RENDIZY.

---

## 📋 ÍNDICE

1. [Enviar Mensagens](#enviar-mensagens)
2. [Conectar WhatsApp](#conectar-whatsapp)
3. [Trocar Providers](#trocar-providers)
4. [Verificar Status](#verificar-status)
5. [Usar em Componentes React](#usar-em-componentes-react)
6. [Fallback Automático](#fallback-automático)
7. [Webhooks](#webhooks)

---

## 📤 ENVIAR MENSAGENS

### Mensagem de Texto Simples

```typescript
import { whatsapp } from './utils/whatsapp';

// Enviar para número brasileiro
await whatsapp.sendTextMessage('5511999999999', 'Olá, cliente!');

// Enviar confirmação de reserva
await whatsapp.sendTextMessage(
  guest.phone,
  `✅ Reserva confirmada!\n\nCheck-in: ${reservation.checkIn}\nCheck-out: ${reservation.checkOut}\n\nImóvel: ${property.name}`
);
```

### Mensagem com Mídia

```typescript
import { whatsapp } from './utils/whatsapp';

// Enviar foto do imóvel
await whatsapp.sendMediaMessage({
  to: '5511999999999',
  mediaUrl: 'https://example.com/photo.jpg',
  caption: 'Sua acomodação está pronta!',
  type: 'image',
});

// Enviar PDF (contrato)
await whatsapp.sendMediaMessage({
  to: guest.phone,
  mediaUrl: contractPdfUrl,
  caption: 'Contrato de Locação - Assine e devolva',
  type: 'document',
});

// Enviar vídeo
await whatsapp.sendMediaMessage({
  to: guest.phone,
  mediaUrl: tourVideoUrl,
  caption: 'Tour virtual do imóvel',
  type: 'video',
});
```

### Mensagens em Lote

```typescript
import { whatsapp } from './utils/whatsapp';

// Enviar para múltiplos hóspedes
const guests = ['5511111111111', '5511222222222', '5511333333333'];

for (const phone of guests) {
  await whatsapp.sendTextMessage(
    phone,
    'Lembrete: Check-out amanhã às 12h!'
  );
  
  // Aguardar 1 segundo entre mensagens (evitar bloqueio)
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

---

## 🔌 CONECTAR WHATSAPP

### Obter QR Code

```typescript
import { whatsapp } from './utils/whatsapp';
import { useState } from 'react';

function WhatsAppConnect() {
  const [qrCode, setQRCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const qr = await whatsapp.getQRCode();
      setQRCode(qr.qrCode); // Base64 image
      
      // QR Code expira em 45-60 segundos
      // Atualizar periodicamente
      const interval = setInterval(async () => {
        const newQR = await whatsapp.getQRCode();
        setQRCode(newQR.qrCode);
      }, 30000); // A cada 30 segundos

      return () => clearInterval(interval);
    } catch (error) {
      console.error('Erro ao obter QR Code:', error);
      alert('Erro ao conectar WhatsApp');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleConnect} disabled={loading}>
        {loading ? 'Conectando...' : 'Conectar WhatsApp'}
      </button>
      {qrCode && <img src={qrCode} alt="Escaneie com WhatsApp" />}
    </div>
  );
}
```

### Verificar se Está Conectado

```typescript
import { whatsapp } from './utils/whatsapp';

// Verificar conexão
const isConnected = await whatsapp.isConnected();

if (isConnected) {
  console.log('✅ WhatsApp conectado!');
  await whatsapp.sendTextMessage('5511999999999', 'Teste');
} else {
  console.log('❌ WhatsApp desconectado');
  // Mostrar QR Code
}
```

### Desconectar

```typescript
import { whatsapp } from './utils/whatsapp';

// Logout do WhatsApp
await whatsapp.disconnect();
console.log('WhatsApp desconectado');
```

---

## 🔄 TROCAR PROVIDERS

### Trocar Manualmente

```typescript
import { switchProvider, getProvider } from './utils/whatsapp';

// Usar WAHA
const waha = switchProvider('waha');
await waha.sendTextMessage('5511999999999', 'Via WAHA');

// Usar Evolution
const evolution = switchProvider('evolution');
await evolution.sendTextMessage('5511999999999', 'Via Evolution');
```

### Comparar Providers

```typescript
import { getProvider } from './utils/whatsapp';

const waha = getProvider('waha');
const evolution = getProvider('evolution');

// Testar ambos
const [wahaHealth, evolutionHealth] = await Promise.all([
  waha.healthCheck(),
  evolution.healthCheck(),
]);

console.log('WAHA:', wahaHealth.healthy ? '✅' : '❌');
console.log('Evolution:', evolutionHealth.healthy ? '✅' : '❌');

// Usar o saudável
const best = wahaHealth.healthy ? waha : evolution;
await best.sendTextMessage('5511999999999', 'Olá!');
```

### Fallback Inteligente

```typescript
import { getProviderWithFallback } from './utils/whatsapp';

// Tenta todos e retorna o primeiro saudável
const whatsapp = await getProviderWithFallback();

// Garantido que é o melhor provider disponível
await whatsapp.sendTextMessage('5511999999999', 'Mensagem importante');
```

---

## 📊 VERIFICAR STATUS

### Status Básico

```typescript
import { whatsapp } from './utils/whatsapp';

const status = await whatsapp.getStatus();

console.log(status);
// 'CONNECTED' | 'CONNECTING' | 'SCAN_QR_CODE' | 'DISCONNECTED' | 'ERROR'

switch (status) {
  case 'CONNECTED':
    console.log('✅ Pronto para enviar mensagens');
    break;
  case 'SCAN_QR_CODE':
    console.log('📱 Escaneie o QR Code');
    break;
  case 'DISCONNECTED':
    console.log('❌ Desconectado');
    break;
}
```

### Status de Todos os Providers

```typescript
import { getProvidersStatus } from './utils/whatsapp';

const status = await getProvidersStatus();

status.forEach(provider => {
  console.log(`${provider.name}:`, {
    enabled: provider.enabled,
    healthy: provider.healthy,
    status: provider.status,
  });
});

// Exibir no componente
function StatusDashboard() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    getProvidersStatus().then(setProviders);
  }, []);

  return (
    <div>
      {providers.map(p => (
        <div key={p.name}>
          <h3>{p.name}</h3>
          <p>Status: {p.healthy ? '✅' : '❌'}</p>
        </div>
      ))}
    </div>
  );
}
```

### Health Check Periódico

```typescript
import { whatsapp } from './utils/whatsapp';

// Verificar saúde a cada 5 minutos
setInterval(async () => {
  const health = await whatsapp.healthCheck();
  
  if (!health.healthy) {
    console.error('⚠️ WhatsApp não está saudável!');
    // Enviar notificação, retentar conexão, etc
  }
}, 5 * 60 * 1000);
```

---

## ⚛️ USAR EM COMPONENTES REACT

### Hook Customizado

```typescript
// hooks/useWhatsApp.ts
import { useState, useEffect } from 'react';
import { whatsapp } from '../utils/whatsapp';

export function useWhatsApp() {
  const [status, setStatus] = useState('DISCONNECTED');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 10000); // A cada 10s
    return () => clearInterval(interval);
  }, []);

  const checkStatus = async () => {
    const s = await whatsapp.getStatus();
    setStatus(s);
  };

  const connect = async () => {
    setLoading(true);
    try {
      await whatsapp.connect();
      await checkStatus();
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (to: string, message: string) => {
    setLoading(true);
    try {
      await whatsapp.sendTextMessage(to, message);
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    loading,
    connect,
    sendMessage,
    isConnected: status === 'CONNECTED',
  };
}
```

### Usar o Hook

```tsx
import { useWhatsApp } from '../hooks/useWhatsApp';
import { Button } from './ui/button';

function ChatComponent() {
  const { status, loading, connect, sendMessage, isConnected } = useWhatsApp();

  const handleSend = async () => {
    await sendMessage('5511999999999', 'Olá, cliente!');
    alert('Mensagem enviada!');
  };

  return (
    <div>
      <p>Status: {status}</p>
      
      {!isConnected && (
        <Button onClick={connect} disabled={loading}>
          Conectar WhatsApp
        </Button>
      )}

      {isConnected && (
        <Button onClick={handleSend} disabled={loading}>
          Enviar Mensagem
        </Button>
      )}
    </div>
  );
}
```

### Context Provider

```tsx
// contexts/WhatsAppContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { whatsapp } from '../utils/whatsapp';

const WhatsAppContext = createContext(null);

export function WhatsAppProvider({ children }) {
  const [status, setStatus] = useState('DISCONNECTED');

  useEffect(() => {
    const checkStatus = async () => {
      const s = await whatsapp.getStatus();
      setStatus(s);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (to, message) => {
    return whatsapp.sendTextMessage(to, message);
  };

  return (
    <WhatsAppContext.Provider value={{ status, sendMessage }}>
      {children}
    </WhatsAppContext.Provider>
  );
}

export const useWhatsAppContext = () => useContext(WhatsAppContext);
```

### Usar Context

```tsx
import { useWhatsAppContext } from '../contexts/WhatsAppContext';

function MyComponent() {
  const { status, sendMessage } = useWhatsAppContext();

  return (
    <div>
      <p>WhatsApp: {status}</p>
      <button onClick={() => sendMessage('5511999999999', 'Oi!')}>
        Enviar
      </button>
    </div>
  );
}
```

---

## 🔄 FALLBACK AUTOMÁTICO

### Tentar Todos os Providers

```typescript
import { getProviderWithFallback } from './utils/whatsapp';

async function sendImportantMessage(to: string, message: string) {
  try {
    // Tenta todos os providers automaticamente
    const whatsapp = await getProviderWithFallback();
    
    await whatsapp.sendTextMessage(to, message);
    console.log('✅ Mensagem enviada via', whatsapp.provider);
  } catch (error) {
    console.error('❌ Falha em todos os providers:', error);
    // Fallback final: email, SMS, etc
  }
}
```

### Retry com Fallback

```typescript
import { getProvider } from './utils/whatsapp';

async function sendWithRetry(to: string, message: string) {
  const providers = ['waha', 'evolution'] as const;
  
  for (const providerName of providers) {
    try {
      const provider = getProvider(providerName);
      await provider.sendTextMessage(to, message);
      console.log(`✅ Enviado via ${providerName}`);
      return; // Sucesso!
    } catch (error) {
      console.error(`❌ Falha em ${providerName}:`, error);
      // Continua para próximo provider
    }
  }
  
  throw new Error('Falha em todos os providers');
}
```

---

## 🪝 WEBHOOKS

### Configurar Webhook (WAHA)

```typescript
import { getProvider } from './utils/whatsapp';

const waha = getProvider('waha');

// Webhook será chamado quando mensagem chegar
// Configure no backend: /supabase/functions/server/routes-chat.ts
```

### Processar Webhook (Backend)

```typescript
// supabase/functions/server/routes-chat.ts
import { Hono } from 'npm:hono';

const app = new Hono();

app.post('/chat/webhook', async (c) => {
  const webhook = await c.req.json();
  
  console.log('📨 Webhook recebido:', webhook);
  
  if (webhook.event === 'message') {
    const { from, body } = webhook.data;
    
    // Processar mensagem
    if (body.toLowerCase().includes('reserva')) {
      // Responder automaticamente
      await whatsapp.sendTextMessage(
        from,
        'Para fazer uma reserva, acesse: https://rendizy.com'
      );
    }
  }
  
  return c.json({ success: true });
});
```

---

## 🎯 CASOS DE USO REAIS

### 1. Confirmação de Reserva

```typescript
import { whatsapp } from './utils/whatsapp';

async function sendReservationConfirmation(reservation) {
  const message = `
✅ *RESERVA CONFIRMADA*

📅 Check-in: ${formatDate(reservation.checkIn)}
📅 Check-out: ${formatDate(reservation.checkOut)}
🏠 Imóvel: ${reservation.property.name}
👤 Hóspede: ${reservation.guest.name}

💰 Valor Total: R$ ${reservation.totalAmount}

Obrigado por escolher ${reservation.property.name}!
  `.trim();

  await whatsapp.sendTextMessage(reservation.guest.phone, message);
  
  // Enviar foto do imóvel
  if (reservation.property.photos.length > 0) {
    await whatsapp.sendMediaMessage({
      to: reservation.guest.phone,
      mediaUrl: reservation.property.photos[0],
      caption: 'Sua acomodação',
      type: 'image',
    });
  }
}
```

### 2. Lembrete de Check-in

```typescript
import { whatsapp } from './utils/whatsapp';

// Executar todo dia às 10h
async function sendCheckInReminders() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const reservations = await getReservationsForDate(tomorrow);
  
  for (const reservation of reservations) {
    const message = `
🔔 *LEMBRETE DE CHECK-IN*

Olá ${reservation.guest.name}!

Seu check-in é amanhã às ${reservation.checkInTime}.

📍 Endereço: ${reservation.property.address}
🔑 Código de acesso: ${reservation.accessCode}

Nos vemos em breve! 😊
    `.trim();

    await whatsapp.sendTextMessage(reservation.guest.phone, message);
    
    // Aguardar 2 segundos entre mensagens
    await new Promise(r => setTimeout(r, 2000));
  }
}
```

### 3. Resposta Automática

```typescript
import { whatsapp } from './utils/whatsapp';

// No webhook
async function handleIncomingMessage(from: string, body: string) {
  const lowerBody = body.toLowerCase();
  
  if (lowerBody.includes('preço') || lowerBody.includes('valor')) {
    await whatsapp.sendTextMessage(
      from,
      'Nossos preços variam conforme a temporada. Acesse nosso site para consultar: https://rendizy.com'
    );
  }
  
  if (lowerBody.includes('disponibilidade')) {
    await whatsapp.sendTextMessage(
      from,
      'Para verificar disponibilidade, por favor acesse: https://rendizy.com/calendario'
    );
  }
  
  if (lowerBody.includes('cancelar')) {
    await whatsapp.sendTextMessage(
      from,
      'Para cancelar sua reserva, entre em contato com nosso suporte: (11) 99999-9999'
    );
  }
}
```

---

## 🔐 SEGURANÇA

### Validar Número Antes de Enviar

```typescript
import { whatsapp } from './utils/whatsapp';

async function sendSafe(phone: string, message: string) {
  // Verificar se número existe no WhatsApp
  const exists = await whatsapp.checkNumber(phone);
  
  if (!exists) {
    console.error('❌ Número não está no WhatsApp:', phone);
    return false;
  }
  
  await whatsapp.sendTextMessage(phone, message);
  return true;
}
```

### Limitar Taxa de Envio

```typescript
import { whatsapp } from './utils/whatsapp';

class RateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  
  async add(fn: () => Promise<any>) {
    this.queue.push(fn);
    if (!this.processing) {
      this.process();
    }
  }
  
  private async process() {
    this.processing = true;
    
    while (this.queue.length > 0) {
      const fn = this.queue.shift()!;
      await fn();
      
      // Aguardar 1 segundo entre mensagens
      await new Promise(r => setTimeout(r, 1000));
    }
    
    this.processing = false;
  }
}

const limiter = new RateLimiter();

// Usar
await limiter.add(() => 
  whatsapp.sendTextMessage('5511111111111', 'Mensagem 1')
);
await limiter.add(() => 
  whatsapp.sendTextMessage('5511222222222', 'Mensagem 2')
);
```

---

## 🎉 CONCLUSÃO

Agora você sabe como:

```
✅ Enviar mensagens (texto e mídia)
✅ Conectar WhatsApp (QR Code)
✅ Trocar providers em runtime
✅ Verificar status e saúde
✅ Usar em componentes React
✅ Implementar fallback automático
✅ Processar webhooks
✅ Casos de uso reais
```

**Próximo passo:** Deploy WAHA na VPS!  
Ver: `DEPLOY_WAHA_VPS_GUIDE.md`
