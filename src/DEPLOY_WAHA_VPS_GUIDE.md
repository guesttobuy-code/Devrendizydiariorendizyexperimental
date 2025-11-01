# 🚀 GUIA COMPLETO: Deploy WAHA na VPS Hostinger

## 📋 Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Configurar DNS](#configurar-dns)
3. [Deploy Automático](#deploy-automático)
4. [Configuração Manual (Alternativa)](#configuração-manual)
5. [Testar Instalação](#testar-instalação)
6. [Integrar com RENDIZY](#integrar-com-rendizy)
7. [Comandos Úteis](#comandos-úteis)
8. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Pré-requisitos

### ✅ O que você JÁ TEM:
- [x] VPS Hostinger (srv409486.hstgr.cloud)
- [x] Docker instalado
- [x] Domínio: suacasaavenda.com.br

### 📝 O que você PRECISA:
- [ ] Acesso SSH à VPS
- [ ] Acesso ao painel Registro.br
- [ ] Email válido (para SSL)

---

## 2️⃣ Configurar DNS (IMPORTANTE!)

### No painel do Registro.br:

1. **Acesse:** https://registro.br
2. **Entre** com suas credenciais
3. **Vá em:** DNS → Zona de DNS
4. **Adicione** um novo registro:

```
Tipo: A
Nome: whatsapp
Valor: [IP da sua VPS]
TTL: 3600 (1 hora)
```

### 🔍 Para descobrir o IP da VPS:

```bash
# SSH na VPS e execute:
curl ifconfig.me
```

### ⏱️ Tempo de propagação: 5-30 minutos

Teste se propagou:
```bash
# No seu computador local:
ping whatsapp.suacasaavenda.com.br

# Deve retornar o IP da VPS
```

---

## 3️⃣ Deploy Automático (RECOMENDADO)

### 🎯 Opção 1: Script Completo (15 minutos)

```bash
# 1. SSH na VPS
ssh root@srv409486.hstgr.cloud

# 2. Baixar os arquivos do RENDIZY
# (Copie o deploy-waha-hostinger.sh e docker-compose.yml para a VPS)

# 3. Editar variáveis importantes
nano deploy-waha-hostinger.sh

# ALTERE ESTAS LINHAS:
# EMAIL="seu-email@exemplo.com"  → seu email real
# WAHA_API_KEY="..."             → senha forte (ex: use: openssl rand -base64 32)

# 4. Executar deploy
chmod +x deploy-waha-hostinger.sh
./deploy-waha-hostinger.sh

# 5. Aguardar finalizar (10-15 minutos)
```

### ✅ Se tudo der certo, você verá:

```
============================================
🎉 DEPLOY CONCLUÍDO!
============================================

📍 URLs de acesso:
  • Dashboard: https://whatsapp.suacasaavenda.com.br/dashboard
  • API Docs:  https://whatsapp.suacasaavenda.com.br/api/docs
  • Health:    https://whatsapp.suacasaavenda.com.br/health

🔑 Credenciais:
  • API Key: [sua-api-key]
```

---

## 4️⃣ Configuração Manual (Alternativa)

### Se preferir fazer passo a passo:

#### Passo 1: Criar diretório

```bash
sudo mkdir -p /opt/rendizy-waha
cd /opt/rendizy-waha
```

#### Passo 2: Criar docker-compose.yml

```bash
nano docker-compose.yml
```

Cole o conteúdo do arquivo `docker-compose.yml` fornecido.

**IMPORTANTE:** Altere:
- `WAHA_API_KEY` → senha forte
- `WHATSAPP_HOOK_URL` → URL do seu backend RENDIZY

#### Passo 3: Iniciar container

```bash
docker-compose up -d
docker-compose logs -f
```

Aguarde até ver: `✓ WAHA is ready`

#### Passo 4: Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/waha
```

Cole a configuração do Nginx:

```nginx
server {
    listen 80;
    server_name whatsapp.suacasaavenda.com.br;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ativar:
```bash
sudo ln -s /etc/nginx/sites-available/waha /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Passo 5: Configurar SSL

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d whatsapp.suacasaavenda.com.br
```

---

## 5️⃣ Testar Instalação

### Teste 1: Health Check

```bash
curl https://whatsapp.suacasaavenda.com.br/health
```

Resposta esperada:
```json
{"status":"ok"}
```

### Teste 2: Listar Sessões

```bash
curl -X GET "https://whatsapp.suacasaavenda.com.br/api/sessions" \
  -H "X-Api-Key: SUA_API_KEY"
```

### Teste 3: Dashboard Web

Abra no navegador:
```
https://whatsapp.suacasaavenda.com.br/dashboard
```

---

## 6️⃣ Integrar com RENDIZY

### Opção A: Usar WAHA diretamente (Novo)

O arquivo `utils/wahaApi.ts` já foi criado com todas as funções necessárias.

**Configure no RENDIZY:**

1. Abra `utils/wahaApi.ts`
2. Altere as constantes:

```typescript
const WAHA_BASE_URL = 'https://whatsapp.suacasaavenda.com.br';
const WAHA_API_KEY = 'sua-api-key-aqui';
const DEFAULT_SESSION = 'rendizy-default';
```

3. Use as funções:

```typescript
import * as waha from './utils/wahaApi';

// Obter QR Code
const qrCode = await waha.getQRCode();

// Enviar mensagem
await waha.sendTextMessage('5511999999999', 'Olá do RENDIZY!');

// Verificar status
const status = await waha.getSessionStatus();
```

### Opção B: Atualizar componente WhatsAppIntegration

Atualize o componente `components/WhatsAppIntegration.tsx` para usar `wahaApi.ts` em vez de `evolutionApi.ts`.

---

## 7️⃣ Comandos Úteis

### Ver logs em tempo real:
```bash
cd /opt/rendizy-waha
docker-compose logs -f
```

### Reiniciar WAHA:
```bash
cd /opt/rendizy-waha
docker-compose restart
```

### Parar WAHA:
```bash
cd /opt/rendizy-waha
docker-compose stop
```

### Atualizar WAHA:
```bash
cd /opt/rendizy-waha
docker-compose pull
docker-compose up -d
```

### Ver sessões ativas:
```bash
curl https://whatsapp.suacasaavenda.com.br/api/sessions \
  -H "X-Api-Key: SUA_API_KEY"
```

### Status do container:
```bash
docker ps | grep waha
```

### Espaço em disco:
```bash
df -h
docker system df
```

---

## 8️⃣ Troubleshooting

### ❌ Problema: Container não inicia

**Verificar logs:**
```bash
cd /opt/rendizy-waha
docker-compose logs
```

**Causas comuns:**
- Porta 3000 já em uso
- Falta de memória
- Docker não instalado

**Solução:**
```bash
# Verificar porta
sudo netstat -tulpn | grep 3000

# Verificar memória
free -h

# Reiniciar Docker
sudo systemctl restart docker
```

### ❌ Problema: SSL não funciona

**Causa:** DNS não propagou

**Verificar:**
```bash
nslookup whatsapp.suacasaavenda.com.br
```

**Solução:**
- Aguardar propagação (até 30 min)
- Verificar configuração no Registro.br
- Tentar novamente: `sudo certbot --nginx -d whatsapp.suacasaavenda.com.br`

### ❌ Problema: QR Code não aparece

**Causa:** Sessão não criada

**Solução:**
```bash
curl -X POST "https://whatsapp.suacasaavenda.com.br/api/sessions" \
  -H "X-Api-Key: SUA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "rendizy-default"
  }'
```

### ❌ Problema: Mensagens não chegam

**Causa:** Webhook não configurado

**Verificar:**
```bash
cd /opt/rendizy-waha
cat docker-compose.yml | grep WEBHOOK
```

**Solução:**
- Atualizar `WHATSAPP_HOOK_URL` no docker-compose.yml
- Reiniciar: `docker-compose restart`

---

## 🎯 Próximos Passos

Após deploy bem-sucedido:

1. ✅ Acesse o dashboard
2. ✅ Crie uma sessão
3. ✅ Escaneie o QR Code
4. ✅ Teste enviar mensagem
5. ✅ Integre com RENDIZY

---

## 📞 Suporte

### Documentação oficial WAHA:
- https://waha.devlike.pro/docs/

### API Reference:
- https://waha.devlike.pro/docs/how-to/send-messages/

### GitHub:
- https://github.com/devlikeapro/waha

---

## 🔐 Segurança

### Importante:
- ✅ SEMPRE use HTTPS (SSL configurado)
- ✅ NUNCA exponha a API_KEY
- ✅ Use firewall na VPS
- ✅ Atualize regularmente

### Firewall (UFW):
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

---

## 💰 Custos

```
VPS Hostinger:  [já paga]
WAHA:           $0 (open-source)
Domínio:        [já tem]
SSL:            $0 (Let's Encrypt)
-----------------------------------
TOTAL ADICIONAL: $0/mês ✅
```

---

## 🎉 Conclusão

Com esse setup você tem:
- ✅ WhatsApp funcionando 100%
- ✅ API profissional (WAHA)
- ✅ Custo zero adicional
- ✅ Controle total
- ✅ Escalável

**Tempo total de deploy:** 15-20 minutos

**Dificuldade:** Fácil (script automático)

---

**Criado para:** RENDIZY v1.0.103.76  
**Data:** Outubro 2025  
**VPS:** Hostinger  
**Domínio:** suacasaavenda.com.br
