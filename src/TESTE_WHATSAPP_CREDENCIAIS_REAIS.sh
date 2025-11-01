#!/bin/bash

# ============================================================================
# RENDIZY - Teste WhatsApp Evolution API com Credenciais REAIS
# 
# Versão: 1.0.103.86
# Data: 30/10/2025
# ============================================================================

echo "🚀 TESTE WHATSAPP EVOLUTION API - CREDENCIAIS REAIS"
echo "=================================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================================
# CONFIGURAÇÃO
# ============================================================================

echo -e "${BLUE}📋 Configuração:${NC}"
echo ""

# Pedir PROJECT_ID e ANON_KEY ao usuário
read -p "Digite o PROJECT_ID do Supabase: " PROJECT_ID
read -p "Digite o ANON_KEY do Supabase: " ANON_KEY

BASE_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a"

echo ""
echo -e "${GREEN}✅ Configuração salva!${NC}"
echo ""

# ============================================================================
# TESTE 1: HEALTH CHECK
# ============================================================================

echo -e "${BLUE}🔍 TESTE 1: Health Check${NC}"
echo "Endpoint: GET /whatsapp/health"
echo ""

HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" \
  "${BASE_URL}/whatsapp/health" \
  -H "Authorization: Bearer ${ANON_KEY}")

HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n 1)
BODY=$(echo "$HEALTH_RESPONSE" | sed '$d')

echo "HTTP Status: $HTTP_CODE"
echo "Response:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" -eq 200 ]; then
  HEALTHY=$(echo "$BODY" | jq -r '.data.healthy' 2>/dev/null)
  if [ "$HEALTHY" == "true" ]; then
    echo -e "${GREEN}✅ Health check PASSOU!${NC}"
    echo -e "${GREEN}   Configuração está OK!${NC}"
  else
    echo -e "${RED}❌ Health check FALHOU!${NC}"
    echo -e "${YELLOW}   Verifique as variáveis de ambiente no Supabase${NC}"
  fi
else
  echo -e "${RED}❌ Erro HTTP: $HTTP_CODE${NC}"
fi

echo ""
echo "=================================================="
echo ""

# ============================================================================
# TESTE 2: STATUS DA INSTÂNCIA
# ============================================================================

echo -e "${BLUE}🔍 TESTE 2: Status da Instância${NC}"
echo "Endpoint: GET /whatsapp/status"
echo ""

STATUS_RESPONSE=$(curl -s -w "\n%{http_code}" \
  "${BASE_URL}/whatsapp/status" \
  -H "Authorization: Bearer ${ANON_KEY}")

HTTP_CODE=$(echo "$STATUS_RESPONSE" | tail -n 1)
BODY=$(echo "$STATUS_RESPONSE" | sed '$d')

echo "HTTP Status: $HTTP_CODE"
echo "Response:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" -eq 200 ]; then
  STATUS=$(echo "$BODY" | jq -r '.data.status' 2>/dev/null)
  echo -e "Status: ${YELLOW}$STATUS${NC}"
  
  if [ "$STATUS" == "CONNECTED" ]; then
    echo -e "${GREEN}✅ WhatsApp está CONECTADO!${NC}"
  elif [ "$STATUS" == "DISCONNECTED" ]; then
    echo -e "${YELLOW}⚠️  WhatsApp está DESCONECTADO${NC}"
    echo -e "${YELLOW}   Você precisa escanear o QR Code primeiro${NC}"
  else
    echo -e "${YELLOW}ℹ️  Status: $STATUS${NC}"
  fi
else
  echo -e "${RED}❌ Erro HTTP: $HTTP_CODE${NC}"
fi

echo ""
echo "=================================================="
echo ""

# ============================================================================
# TESTE 3: QR CODE (se desconectado)
# ============================================================================

if [ "$STATUS" == "DISCONNECTED" ]; then
  echo -e "${BLUE}🔍 TESTE 3: Obter QR Code${NC}"
  echo "Endpoint: GET /whatsapp/qr-code"
  echo ""
  
  QR_RESPONSE=$(curl -s -w "\n%{http_code}" \
    "${BASE_URL}/whatsapp/qr-code" \
    -H "Authorization: Bearer ${ANON_KEY}")
  
  HTTP_CODE=$(echo "$QR_RESPONSE" | tail -n 1)
  BODY=$(echo "$QR_RESPONSE" | sed '$d')
  
  echo "HTTP Status: $HTTP_CODE"
  
  if [ "$HTTP_CODE" -eq 200 ]; then
    HAS_QR=$(echo "$BODY" | jq -r '.data.qrCode' 2>/dev/null)
    if [ -n "$HAS_QR" ] && [ "$HAS_QR" != "null" ]; then
      echo -e "${GREEN}✅ QR Code obtido com sucesso!${NC}"
      echo -e "${YELLOW}   Escaneie o QR Code no painel de Integrações${NC}"
    else
      echo -e "${RED}❌ QR Code não disponível${NC}"
    fi
  else
    echo -e "${RED}❌ Erro HTTP: $HTTP_CODE${NC}"
    echo "Response: $BODY"
  fi
  
  echo ""
  echo "=================================================="
  echo ""
fi

# ============================================================================
# TESTE 4: ENVIAR MENSAGEM (se conectado)
# ============================================================================

if [ "$STATUS" == "CONNECTED" ]; then
  echo -e "${BLUE}🔍 TESTE 4: Enviar Mensagem de Teste${NC}"
  echo "Endpoint: POST /whatsapp/send-message"
  echo ""
  
  read -p "Digite o número de destino (ex: 5511999999999@s.whatsapp.net): " NUMERO
  
  if [ -n "$NUMERO" ]; then
    SEND_RESPONSE=$(curl -s -w "\n%{http_code}" \
      -X POST "${BASE_URL}/whatsapp/send-message" \
      -H "Authorization: Bearer ${ANON_KEY}" \
      -H "Content-Type: application/json" \
      -d "{
        \"number\": \"$NUMERO\",
        \"text\": \"🎉 Teste RENDIZY - WhatsApp funcionando! $(date)\"
      }")
    
    HTTP_CODE=$(echo "$SEND_RESPONSE" | tail -n 1)
    BODY=$(echo "$SEND_RESPONSE" | sed '$d')
    
    echo "HTTP Status: $HTTP_CODE"
    echo "Response:"
    echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
    echo ""
    
    if [ "$HTTP_CODE" -eq 200 ]; then
      echo -e "${GREEN}✅ Mensagem enviada com sucesso!${NC}"
    else
      echo -e "${RED}❌ Erro ao enviar mensagem${NC}"
    fi
  else
    echo -e "${YELLOW}⚠️  Número não fornecido, pulando teste de envio${NC}"
  fi
  
  echo ""
  echo "=================================================="
  echo ""
fi

# ============================================================================
# RESUMO FINAL
# ============================================================================

echo -e "${BLUE}📊 RESUMO DOS TESTES${NC}"
echo ""

if [ "$HTTP_CODE" -eq 200 ] && [ "$HEALTHY" == "true" ]; then
  echo -e "${GREEN}✅ Configuração: OK${NC}"
else
  echo -e "${RED}❌ Configuração: FALHOU${NC}"
  echo ""
  echo -e "${YELLOW}🔧 SOLUÇÃO:${NC}"
  echo "1. Acesse: Supabase Dashboard → Edge Functions → Manage Secrets"
  echo "2. Adicione estas variáveis:"
  echo ""
  echo "   EVOLUTION_API_URL=https://evo.boravendermuito.com.br/manager"
  echo "   EVOLUTION_INSTANCE_NAME=Rendizy"
  echo "   EVOLUTION_GLOBAL_API_KEY=4de7861e944e291b56fe9781d2b00b36"
  echo "   EVOLUTION_INSTANCE_TOKEN=0FF3641E80A6-453C-AB4E-28C2F2D01C50"
  echo ""
fi

if [ "$STATUS" == "CONNECTED" ]; then
  echo -e "${GREEN}✅ Status: CONECTADO${NC}"
  echo ""
  echo -e "${GREEN}🎉 TUDO FUNCIONANDO!${NC}"
  echo ""
  echo "Próximos passos:"
  echo "1. Clique no botão flutuante WhatsApp (canto inferior direito)"
  echo "2. Teste enviar uma mensagem pelo modal"
  echo "3. Aproveite a integração! 🚀"
elif [ "$STATUS" == "DISCONNECTED" ]; then
  echo -e "${YELLOW}⚠️  Status: DESCONECTADO${NC}"
  echo ""
  echo "Próximos passos:"
  echo "1. Acesse: Configurações → Integrações → WhatsApp Business"
  echo "2. Clique em 'Conectar WhatsApp'"
  echo "3. Escaneie o QR Code"
  echo "4. Aguarde status mudar para 'Conectado'"
else
  echo -e "${YELLOW}ℹ️  Status: $STATUS${NC}"
fi

echo ""
echo "=================================================="
echo ""
echo -e "${BLUE}📚 Documentação completa:${NC}"
echo "   CONFIGURAR_WHATSAPP_AGORA_v1.0.103.86.md"
echo ""
echo "=================================================="
