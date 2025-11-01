#!/bin/bash

# ============================================================
# DEPLOY WAHA - RENDIZY
# VPS Hostinger + Docker + Nginx + SSL
# Domínio: whatsapp.suacasaavenda.com.br
# ============================================================

set -e  # Para em caso de erro

echo "🚀 INICIANDO DEPLOY WAHA PARA RENDIZY..."
echo "==========================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configurações
DOMAIN="whatsapp.suacasaavenda.com.br"
EMAIL="seu-email@exemplo.com"  # ALTERE ISSO!
WAHA_API_KEY="rendizy_waha_2025_super_secret_key_change_this"  # ALTERE ISSO!

echo -e "${BLUE}📋 Configurações:${NC}"
echo "  Domínio: $DOMAIN"
echo "  Email: $EMAIL"
echo "  API Key: ${WAHA_API_KEY:0:20}..."
echo ""

# ============================================================
# 1. Verificar requisitos
# ============================================================
echo -e "${BLUE}1️⃣  Verificando requisitos...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker não encontrado!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker instalado${NC}"

if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  docker-compose não encontrado, instalando...${NC}"
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi
echo -e "${GREEN}✅ Docker Compose instalado${NC}"

if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}⚠️  Nginx não encontrado, instalando...${NC}"
    sudo apt update
    sudo apt install -y nginx
fi
echo -e "${GREEN}✅ Nginx instalado${NC}"

echo ""

# ============================================================
# 2. Criar diretório do projeto
# ============================================================
echo -e "${BLUE}2️⃣  Criando diretório do projeto...${NC}"

WAHA_DIR="/opt/rendizy-waha"
sudo mkdir -p $WAHA_DIR
cd $WAHA_DIR

echo -e "${GREEN}✅ Diretório criado: $WAHA_DIR${NC}"
echo ""

# ============================================================
# 3. Criar docker-compose.yml
# ============================================================
echo -e "${BLUE}3️⃣  Criando docker-compose.yml...${NC}"

sudo tee docker-compose.yml > /dev/null <<EOF
version: '3.8'

services:
  waha:
    image: devlikeapro/waha:latest
    container_name: rendizy-waha
    restart: always
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - WHATSAPP_HOOK_URL=https://seu-rendizy-url.supabase.co/functions/v1/make-server-67caf26a/chat/webhook
      - WHATSAPP_HOOK_EVENTS=message,message.any,state.change,group.join,presence.update
      - WAHA_API_KEY=$WAHA_API_KEY
      - WAHA_LOG_LEVEL=info
      - SESSIONS_START=default
    volumes:
      - waha_sessions:/app/.sessions
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  waha_sessions:
    driver: local
EOF

echo -e "${GREEN}✅ docker-compose.yml criado${NC}"
echo ""

# ============================================================
# 4. Iniciar WAHA
# ============================================================
echo -e "${BLUE}4️⃣  Iniciando container WAHA...${NC}"

sudo docker-compose up -d

# Aguardar container ficar saudável
echo -e "${YELLOW}⏳ Aguardando WAHA iniciar (30s)...${NC}"
sleep 30

if sudo docker ps | grep -q rendizy-waha; then
    echo -e "${GREEN}✅ WAHA rodando!${NC}"
else
    echo -e "${RED}❌ WAHA não iniciou corretamente${NC}"
    sudo docker-compose logs
    exit 1
fi

echo ""

# ============================================================
# 5. Configurar Nginx
# ============================================================
echo -e "${BLUE}5️⃣  Configurando Nginx...${NC}"

sudo tee /etc/nginx/sites-available/waha > /dev/null <<'EOF'
server {
    listen 80;
    server_name whatsapp.suacasaavenda.com.br;

    # Redirecionar HTTP para HTTPS (será configurado pelo Certbot)
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
        
        # Timeout para WhatsApp (pode demorar)
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF

# Criar symlink
sudo ln -sf /etc/nginx/sites-available/waha /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Recarregar Nginx
sudo systemctl reload nginx

echo -e "${GREEN}✅ Nginx configurado${NC}"
echo ""

# ============================================================
# 6. Instalar Certbot e configurar SSL
# ============================================================
echo -e "${BLUE}6️⃣  Configurando SSL com Let's Encrypt...${NC}"

if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}⚠️  Certbot não encontrado, instalando...${NC}"
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

echo -e "${YELLOW}📝 IMPORTANTE: Configure o DNS ANTES de continuar!${NC}"
echo ""
echo "  No painel do Registro.br, crie:"
echo "  Tipo: A"
echo "  Nome: whatsapp"
echo "  Valor: $(curl -s ifconfig.me)"
echo ""
echo -e "${YELLOW}Pressione ENTER após configurar o DNS...${NC}"
read

# Obter certificado SSL
sudo certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email $EMAIL --redirect

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SSL configurado com sucesso!${NC}"
else
    echo -e "${YELLOW}⚠️  SSL não configurado (verifique DNS)${NC}"
    echo "  Você pode tentar novamente depois com:"
    echo "  sudo certbot --nginx -d $DOMAIN"
fi

echo ""

# ============================================================
# 7. Verificar instalação
# ============================================================
echo -e "${BLUE}7️⃣  Verificando instalação...${NC}"

# Testar API local
if curl -f http://localhost:3000/health &> /dev/null; then
    echo -e "${GREEN}✅ WAHA API respondendo localmente${NC}"
else
    echo -e "${RED}❌ WAHA API não está respondendo${NC}"
fi

# Mostrar logs
echo ""
echo -e "${BLUE}📋 Últimos logs do WAHA:${NC}"
sudo docker-compose logs --tail=20

echo ""
echo "============================================="
echo -e "${GREEN}🎉 DEPLOY CONCLUÍDO!${NC}"
echo "============================================="
echo ""
echo -e "${BLUE}📍 URLs de acesso:${NC}"
echo "  • Dashboard: https://$DOMAIN/dashboard"
echo "  • API Docs:  https://$DOMAIN/api/docs"
echo "  • Health:    https://$DOMAIN/health"
echo ""
echo -e "${BLUE}🔑 Credenciais:${NC}"
echo "  • API Key: $WAHA_API_KEY"
echo ""
echo -e "${BLUE}📝 Próximos passos:${NC}"
echo "  1. Acesse o dashboard: https://$DOMAIN/dashboard"
echo "  2. Crie uma nova sessão do WhatsApp"
echo "  3. Escaneie o QR Code com seu WhatsApp"
echo "  4. Configure o RENDIZY com:"
echo "     - URL: https://$DOMAIN"
echo "     - API Key: $WAHA_API_KEY"
echo ""
echo -e "${BLUE}🔧 Comandos úteis:${NC}"
echo "  • Ver logs:      cd $WAHA_DIR && sudo docker-compose logs -f"
echo "  • Reiniciar:     cd $WAHA_DIR && sudo docker-compose restart"
echo "  • Parar:         cd $WAHA_DIR && sudo docker-compose stop"
echo "  • Atualizar:     cd $WAHA_DIR && sudo docker-compose pull && sudo docker-compose up -d"
echo ""
echo -e "${GREEN}✅ Tudo pronto!${NC}"
echo ""
