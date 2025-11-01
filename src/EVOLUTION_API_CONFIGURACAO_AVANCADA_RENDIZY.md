# 🔧 Evolution API - Configuração Avançada para RENDIZY

**Versão:** v1.0.103.47  
**Data:** 29 de Outubro de 2025  
**Público:** Técnico/Avançado

---

## 📋 ÍNDICE

1. [Configuração Básica (Localhost)](#configuração-básica-localhost)
2. [Configuração Intermediária (VPS)](#configuração-intermediária-vps)
3. [Configuração Avançada (Produção)](#configuração-avançada-produção)
4. [Webhooks para RENDIZY](#webhooks-para-rendizy)
5. [Persistência de Dados](#persistência-de-dados)
6. [Otimizações](#otimizações)

---

## 🏠 CONFIGURAÇÃO BÁSICA (Localhost)

### Setup Mínimo para Desenvolvimento

```bash
docker run -d \
    --name evolution_api \
    -p 8080:8080 \
    -e AUTHENTICATION_API_KEY=rendizy-dev-123 \
    -e LOG_LEVEL=ERROR,WARN,INFO \
    -e LOG_COLOR=true \
    atendai/evolution-api:latest
```

### Variáveis Essenciais

| Variável | Valor | Explicação |
|----------|-------|------------|
| `AUTHENTICATION_API_KEY` | `rendizy-dev-123` | Chave para autenticar requests |
| `LOG_LEVEL` | `ERROR,WARN,INFO` | Logs que aparecem no console |
| `LOG_COLOR` | `true` | Colorir logs (facilita debug) |

**Uso no RENDIZY:**
```typescript
// components/WhatsAppIntegration.tsx
const config = {
  url: 'http://localhost:8080',
  instanceName: 'rendizy-dev',
  apiKey: 'rendizy-dev-123' // ← Mesma do docker
}
```

---

## 🖥️ CONFIGURAÇÃO INTERMEDIÁRIA (VPS)

### Setup para VPS sem Banco de Dados

```bash
docker run -d \
    --name evolution_api \
    -p 8080:8080 \
    --restart always \
    -e SERVER_URL=http://SEU-IP:8080 \
    -e AUTHENTICATION_API_KEY=sua-chave-forte-aqui \
    -e LOG_LEVEL=ERROR,WARN,INFO \
    -e LOG_COLOR=false \
    -e CORS_ORIGIN=* \
    -e CORS_METHODS=POST,GET,PUT,DELETE \
    -e CORS_CREDENTIALS=true \
    -e WEBHOOK_GLOBAL_URL=https://seu-rendizy.com/api/webhook/whatsapp \
    -e WEBHOOK_GLOBAL_ENABLED=true \
    -e WEBHOOK_EVENTS_MESSAGES_UPSERT=true \
    -e WEBHOOK_EVENTS_CONNECTION_UPDATE=true \
    atendai/evolution-api:latest
```

### Variáveis Importantes

#### 1. Servidor
```bash
SERVER_URL=http://SEU-IP:8080
# URL pública da sua Evolution API
# Usada para gerar links internos
```

#### 2. CORS (Importante!)
```bash
CORS_ORIGIN=*
# Permite requisições de qualquer origem
# EM PRODUÇÃO: Use domínio específico
# CORS_ORIGIN=https://seu-rendizy.com

CORS_METHODS=POST,GET,PUT,DELETE
# Métodos HTTP permitidos

CORS_CREDENTIALS=true
# Permite cookies/credenciais
```

#### 3. Webhooks
```bash
WEBHOOK_GLOBAL_URL=https://seu-rendizy.com/api/webhook/whatsapp
# URL que receberá eventos do WhatsApp

WEBHOOK_GLOBAL_ENABLED=true
# Habilita webhooks globalmente
```

---

## 🚀 CONFIGURAÇÃO AVANÇADA (Produção)

### Docker Compose Completo

Crie arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  evolution_api:
    image: atendai/evolution-api:latest
    container_name: rendizy_evolution_api
    ports:
      - "8080:8080"
    environment:
      # ========================================
      # SERVIDOR
      # ========================================
      - SERVER_URL=https://whatsapp.seu-rendizy.com
      
      # ========================================
      # AUTENTICAÇÃO
      # ========================================
      - AUTHENTICATION_TYPE=apikey
      - AUTHENTICATION_API_KEY=${EVOLUTION_API_KEY}
      
      # ========================================
      # WEBSOCKET (Recomendado para tempo real)
      # ========================================
      - WEBSOCKET_ENABLED=true
      - WEBSOCKET_GLOBAL_EVENTS=true
      
      # ========================================
      # LOGS
      # ========================================
      - LOG_LEVEL=ERROR,WARN,INFO
      - LOG_COLOR=false
      - LOG_BAILEYS=error
      
      # ========================================
      # STORAGE TEMPORÁRIO (Cache em memória)
      # ========================================
      - STORE_MESSAGES=true
      - STORE_MESSAGE_UP=true
      - STORE_CONTACTS=true
      - STORE_CHATS=true
      
      # ========================================
      # LIMPEZA AUTOMÁTICA (7 dias)
      # ========================================
      - CLEAN_STORE_CLEANING_INTERVAL=604800
      - CLEAN_STORE_MESSAGES=true
      - CLEAN_STORE_MESSAGE_UP=true
      - CLEAN_STORE_CONTACTS=false
      - CLEAN_STORE_CHATS=false
      
      # ========================================
      # BANCO DE DADOS (Persistência)
      # ========================================
      - DATABASE_ENABLED=true
      - DATABASE_CONNECTION_URI=mongodb://mongo:27017/evolution
      - DATABASE_CONNECTION_DB_PREFIX_NAME=rendizy
      - DATABASE_SAVE_DATA_INSTANCE=true
      - DATABASE_SAVE_DATA_NEW_MESSAGE=true
      - DATABASE_SAVE_MESSAGE_UPDATE=true
      - DATABASE_SAVE_DATA_CONTACTS=true
      - DATABASE_SAVE_DATA_CHATS=true
      
      # ========================================
      # REDIS (Cache distribuído - Opcional)
      # ========================================
      - CACHE_REDIS_ENABLED=true
      - CACHE_REDIS_URI=redis://redis:6379
      - CACHE_REDIS_PREFIX_KEY=rendizy_evolution
      - CACHE_REDIS_TTL=604800
      - CACHE_REDIS_SAVE_INSTANCES=true
      
      # ========================================
      # CORS
      # ========================================
      - CORS_ORIGIN=https://seu-rendizy.com,https://app.seu-rendizy.com
      - CORS_METHODS=POST,GET,PUT,DELETE
      - CORS_CREDENTIALS=true
      
      # ========================================
      # WEBHOOKS GLOBAIS
      # ========================================
      - WEBHOOK_GLOBAL_URL=https://seu-rendizy.com/api/webhook/whatsapp
      - WEBHOOK_GLOBAL_ENABLED=true
      - WEBHOOK_GLOBAL_WEBHOOK_BY_EVENTS=true
      
      # ========================================
      # EVENTOS DE WEBHOOK (Apenas os necessários)
      # ========================================
      - WEBHOOK_EVENTS_APPLICATION_STARTUP=false
      - WEBHOOK_EVENTS_QRCODE_UPDATED=true
      - WEBHOOK_EVENTS_MESSAGES_SET=false
      - WEBHOOK_EVENTS_MESSAGES_UPSERT=true    # ← IMPORTANTE! Novas mensagens
      - WEBHOOK_EVENTS_MESSAGES_UPDATE=true    # ← IMPORTANTE! Atualização de status
      - WEBHOOK_EVENTS_MESSAGES_DELETE=false
      - WEBHOOK_EVENTS_SEND_MESSAGE=true       # ← IMPORTANTE! Confirmação de envio
      - WEBHOOK_EVENTS_CONTACTS_SET=false
      - WEBHOOK_EVENTS_CONTACTS_UPSERT=true
      - WEBHOOK_EVENTS_CONTACTS_UPDATE=false
      - WEBHOOK_EVENTS_PRESENCE_UPDATE=false   # Digitando/Gravando (opcional)
      - WEBHOOK_EVENTS_CHATS_SET=false
      - WEBHOOK_EVENTS_CHATS_UPSERT=true
      - WEBHOOK_EVENTS_CHATS_UPDATE=false
      - WEBHOOK_EVENTS_CHATS_DELETE=false
      - WEBHOOK_EVENTS_GROUPS_UPSERT=false
      - WEBHOOK_EVENTS_GROUPS_UPDATE=false
      - WEBHOOK_EVENTS_GROUP_PARTICIPANTS_UPDATE=false
      - WEBHOOK_EVENTS_CONNECTION_UPDATE=true  # ← IMPORTANTE! Status da conexão
      - WEBHOOK_EVENTS_LABELS_EDIT=false
      - WEBHOOK_EVENTS_LABELS_ASSOCIATION=false
      - WEBHOOK_EVENTS_CALL=true               # Chamadas recebidas
      - WEBHOOK_EVENTS_ERRORS=true             # ← IMPORTANTE! Erros
      
      # ========================================
      # QR CODE
      # ========================================
      - QRCODE_LIMIT=60
      - QRCODE_COLOR=#22C55E
      
      # ========================================
      # INSTÂNCIAS
      # ========================================
      - DEL_INSTANCE=false                     # Não deletar instâncias desconectadas
      - DEL_TEMP_INSTANCES=false
      
      # ========================================
      # SESSÃO WHATSAPP
      # ========================================
      - CONFIG_SESSION_PHONE_CLIENT=RENDIZY
      - CONFIG_SESSION_PHONE_NAME=Chrome
      
    depends_on:
      - mongo
      - redis
    restart: always
    networks:
      - rendizy_network

  # ========================================
  # MONGODB (Persistência)
  # ========================================
  mongo:
    image: mongo:latest
    container_name: rendizy_mongo
    volumes:
      - mongo_data:/data/db
    restart: always
    networks:
      - rendizy_network

  # ========================================
  # REDIS (Cache)
  # ========================================
  redis:
    image: redis:alpine
    container_name: rendizy_redis
    restart: always
    networks:
      - rendizy_network

volumes:
  mongo_data:

networks:
  rendizy_network:
    driver: bridge
```

### Arquivo .env

Crie `.env` ao lado do `docker-compose.yml`:

```bash
# Evolution API Key (MUDE PARA SENHA FORTE!)
EVOLUTION_API_KEY=sua-chave-muito-forte-e-segura-aqui-123
```

### Executar

```bash
# Iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f evolution_api

# Parar
docker-compose down

# Parar e limpar volumes (CUIDADO!)
docker-compose down -v
```

---

## 📨 WEBHOOKS PARA RENDIZY

### Estrutura dos Eventos

A Evolution API envia webhooks para o RENDIZY quando eventos acontecem:

#### 1. Nova Mensagem Recebida

```json
{
  "event": "messages.upsert",
  "instance": "rendizy-producao",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net",
      "fromMe": false,
      "id": "3EB0XXXXXX"
    },
    "message": {
      "conversation": "Olá, gostaria de fazer uma reserva"
    },
    "messageTimestamp": 1698595200,
    "pushName": "João Silva",
    "status": "RECEIVED"
  }
}
```

#### 2. Status de Conexão

```json
{
  "event": "connection.update",
  "instance": "rendizy-producao",
  "data": {
    "state": "open",
    "statusReason": 200
  }
}
```

#### 3. Confirmação de Envio

```json
{
  "event": "send.message",
  "instance": "rendizy-producao",
  "data": {
    "key": {
      "remoteJid": "5511999999999@s.whatsapp.net",
      "fromMe": true,
      "id": "3EB0YYYYYY"
    },
    "status": "SENT"
  }
}
```

### Implementar Webhook no RENDIZY

**Backend (Supabase Edge Function):**

```typescript
// supabase/functions/server/routes-whatsapp-webhook.ts

import { Hono } from 'npm:hono';
import * as kv from './kv_store.tsx';

const webhookRoutes = new Hono();

// POST /make-server-67caf26a/webhook/whatsapp
webhookRoutes.post('/webhook/whatsapp', async (c) => {
  try {
    const payload = await c.req.json();
    
    console.log('📨 Webhook recebido:', payload.event);
    
    // ========================================
    // NOVA MENSAGEM RECEBIDA
    // ========================================
    if (payload.event === 'messages.upsert') {
      const message = payload.data;
      
      // Ignorar mensagens enviadas por nós
      if (message.key.fromMe) {
        return c.json({ success: true, ignored: 'fromMe' });
      }
      
      // Extrair dados da mensagem
      const phoneNumber = message.key.remoteJid.replace('@s.whatsapp.net', '');
      const text = message.message?.conversation || 
                   message.message?.extendedTextMessage?.text || '';
      
      // Salvar no KV Store
      const messageKey = `whatsapp:message:${message.key.id}`;
      await kv.set(messageKey, {
        id: message.key.id,
        from: phoneNumber,
        text: text,
        timestamp: message.messageTimestamp * 1000,
        pushName: message.pushName,
        instance: payload.instance,
        status: 'received',
        read: false,
        createdAt: new Date().toISOString()
      });
      
      // Adicionar à lista de mensagens do contato
      const contactKey = `whatsapp:contact:${phoneNumber}:messages`;
      const existingMessages = await kv.get(contactKey) || [];
      existingMessages.push(message.key.id);
      await kv.set(contactKey, existingMessages);
      
      // Atualizar último contato
      await kv.set(`whatsapp:contact:${phoneNumber}:last_message`, {
        text: text,
        timestamp: new Date().toISOString(),
        unread: true
      });
      
      console.log('✅ Mensagem salva:', messageKey);
    }
    
    // ========================================
    // ATUALIZAÇÃO DE STATUS DE MENSAGEM
    // ========================================
    if (payload.event === 'messages.update') {
      const update = payload.data;
      
      for (const msg of update) {
        const messageKey = `whatsapp:message:${msg.key.id}`;
        const existingMessage = await kv.get(messageKey);
        
        if (existingMessage) {
          existingMessage.status = msg.update.status; // SENT, DELIVERED, READ
          await kv.set(messageKey, existingMessage);
          console.log('📝 Status atualizado:', msg.key.id, '→', msg.update.status);
        }
      }
    }
    
    // ========================================
    // STATUS DE CONEXÃO
    // ========================================
    if (payload.event === 'connection.update') {
      const status = payload.data;
      
      await kv.set(`whatsapp:instance:${payload.instance}:status`, {
        state: status.state,
        timestamp: new Date().toISOString()
      });
      
      console.log('🔌 Conexão atualizada:', status.state);
    }
    
    // ========================================
    // CHAMADA RECEBIDA
    // ========================================
    if (payload.event === 'call') {
      const call = payload.data;
      
      await kv.set(`whatsapp:call:${call.id}`, {
        from: call.from,
        timestamp: new Date().toISOString(),
        status: 'received'
      });
      
      console.log('📞 Chamada recebida de:', call.from);
    }
    
    return c.json({ success: true, event: payload.event });
    
  } catch (error) {
    console.error('❌ Erro processando webhook:', error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default webhookRoutes;
```

**Registrar rota no servidor:**

```typescript
// supabase/functions/server/index.tsx

import webhookRoutes from './routes-whatsapp-webhook.ts';

// ... código existente ...

app.route('/make-server-67caf26a', webhookRoutes);
```

---

## 💾 PERSISTÊNCIA DE DADOS

### Sem Banco de Dados (Básico)

- ✅ Funciona para testes
- ✅ Zero configuração
- ❌ Perde tudo ao reiniciar
- ❌ Precisa reconectar WhatsApp

**Recomendado para:** Desenvolvimento apenas

---

### Com MongoDB (Recomendado)

- ✅ Dados persistentes
- ✅ Não precisa reconectar
- ✅ Histórico de mensagens
- ✅ Múltiplas instâncias

**Configuração:**

```bash
DATABASE_ENABLED=true
DATABASE_CONNECTION_URI=mongodb://mongo:27017/evolution
DATABASE_SAVE_DATA_INSTANCE=true
DATABASE_SAVE_DATA_NEW_MESSAGE=true
DATABASE_SAVE_MESSAGE_UPDATE=true
DATABASE_SAVE_DATA_CONTACTS=true
DATABASE_SAVE_DATA_CHATS=true
```

**Recomendado para:** Produção

---

### Com Redis (Opcional)

- ✅ Cache ultra-rápido
- ✅ Sessões distribuídas
- ✅ Múltiplos servidores

**Configuração:**

```bash
CACHE_REDIS_ENABLED=true
CACHE_REDIS_URI=redis://redis:6379
CACHE_REDIS_SAVE_INSTANCES=true
```

**Recomendado para:** Alta escala

---

## ⚡ OTIMIZAÇÕES

### 1. Logs Mínimos (Produção)

```bash
LOG_LEVEL=ERROR,WARN
LOG_COLOR=false
LOG_BAILEYS=error
```

**Por quê?**
- Menos I/O
- Melhor performance
- Logs menores

---

### 2. Limpeza Automática

```bash
# Limpar mensagens antigas a cada 7 dias
CLEAN_STORE_CLEANING_INTERVAL=604800
CLEAN_STORE_MESSAGES=true
CLEAN_STORE_MESSAGE_UP=true
```

**Por quê?**
- Libera memória
- Evita crescimento infinito
- Mantém BD enxuto

---

### 3. Webhooks Seletivos

**❌ NÃO habilite TODOS os eventos:**

```bash
# Ruim - Muito tráfego
WEBHOOK_EVENTS_PRESENCE_UPDATE=true  # Digitando...
WEBHOOK_EVENTS_MESSAGES_SET=true     # Histórico completo
```

**✅ Habilite APENAS o necessário:**

```bash
# Bom - Apenas essencial
WEBHOOK_EVENTS_MESSAGES_UPSERT=true    # Novas mensagens
WEBHOOK_EVENTS_MESSAGES_UPDATE=true    # Status
WEBHOOK_EVENTS_CONNECTION_UPDATE=true  # Conexão
WEBHOOK_EVENTS_SEND_MESSAGE=true       # Confirmação
```

**Por quê?**
- Menos requisições HTTP
- Menor carga no servidor
- Logs mais limpos

---

### 4. Cache Local

```bash
# Se não usar Redis
CACHE_LOCAL_ENABLED=true
CACHE_LOCAL_TTL=604800
```

**Por quê?**
- Alternativa ao Redis
- Zero dependências
- Bom para 1 servidor

---

### 5. CORS Específico

```bash
# ❌ Desenvolvimento
CORS_ORIGIN=*

# ✅ Produção
CORS_ORIGIN=https://app.seu-rendizy.com
```

**Por quê?**
- Mais seguro
- Evita requests não autorizados

---

## 🎯 CONFIGURAÇÕES POR AMBIENTE

### Desenvolvimento (Localhost)

```bash
# Minimal
docker run -d \
  -p 8080:8080 \
  -e AUTHENTICATION_API_KEY=dev-123 \
  atendai/evolution-api:latest
```

---

### Staging (Testes)

```bash
# Com persistência básica
docker run -d \
  -p 8080:8080 \
  -e AUTHENTICATION_API_KEY=staging-key \
  -e DATABASE_ENABLED=true \
  -e DATABASE_CONNECTION_URI=mongodb://mongo:27017/staging \
  -e WEBHOOK_GLOBAL_URL=https://staging.rendizy.com/webhook \
  -e WEBHOOK_GLOBAL_ENABLED=true \
  atendai/evolution-api:latest
```

---

### Produção (Docker Compose)

Use o `docker-compose.yml` completo [acima](#docker-compose-completo)

---

## 🆘 TROUBLESHOOTING

### Problema: Mensagens não chegam no RENDIZY

**Checklist:**

1. ✅ Webhook está configurado?
   ```bash
   docker logs evolution_api | grep WEBHOOK
   ```

2. ✅ URL do webhook está acessível?
   ```bash
   curl -X POST https://seu-rendizy.com/api/webhook/whatsapp
   ```

3. ✅ Eventos estão habilitados?
   ```bash
   WEBHOOK_EVENTS_MESSAGES_UPSERT=true
   ```

4. ✅ Firewall não está bloqueando?

---

### Problema: Perde sessão ao reiniciar

**Causa:** Sem persistência

**Solução:** Habilite MongoDB

```bash
DATABASE_ENABLED=true
DATABASE_CONNECTION_URI=mongodb://mongo:27017/evolution
DATABASE_SAVE_DATA_INSTANCE=true
```

---

### Problema: Alto uso de memória

**Causa:** Muitas mensagens em cache

**Solução:** Habilite limpeza automática

```bash
CLEAN_STORE_CLEANING_INTERVAL=86400  # 1 dia
CLEAN_STORE_MESSAGES=true
```

---

## 📊 MONITORAMENTO

### Ver Status da API

```bash
curl http://localhost:8080
```

### Ver Logs em Tempo Real

```bash
docker logs -f evolution_api
```

### Ver Instâncias Conectadas

```bash
curl -X GET \
  http://localhost:8080/instance/fetchInstances \
  -H 'apikey: sua-api-key'
```

---

## 🎓 RESUMO EXECUTIVO

### Para Desenvolvimento:
```bash
docker run -d \
  -p 8080:8080 \
  -e AUTHENTICATION_API_KEY=dev-123 \
  atendai/evolution-api:latest
```

### Para Produção:
- Use **docker-compose.yml** completo
- Habilite **MongoDB** (persistência)
- Configure **Webhooks** específicos
- Use **CORS** restrito
- Habilite **limpeza automática**
- Configure **logs mínimos**

---

## 📚 REFERÊNCIAS

- **Docs Oficiais:** https://doc.evolution-api.com
- **GitHub:** https://github.com/EvolutionAPI/evolution-api
- **Variáveis:** https://doc.evolution-api.com/pt/install/env

---

**Versão:** v1.0.103.47  
**Status:** ✅ Guia Técnico Completo  
**Última Atualização:** 29/10/2025
