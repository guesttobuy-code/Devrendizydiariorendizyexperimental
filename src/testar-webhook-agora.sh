#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║  🧪 TESTE DE WEBHOOK EVOLUTION API - RENDIZY                     ║"
echo "║  Versão: v1.0.103.95                                             ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

WEBHOOK_URL="https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/whatsapp/webhook"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyOTExMzMsImV4cCI6MjA0NTg2NzEzM30.RBKZpHU2mPOdHcXdFKFZ4_zrL17D5KnZ0WMO2tQxCfI"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 TESTE 1: WEBHOOK DE MENSAGEM"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}📤 Enviando webhook de teste...${NC}"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{
    "event": "messages.upsert",
    "instance": "Rendizy",
    "data": {
      "key": {
        "remoteJid": "5511999999999@s.whatsapp.net",
        "fromMe": false,
        "id": "TESTE_'$(date +%s)'"
      },
      "message": {
        "conversation": "🧪 Teste automático de webhook - '$(date '+%Y-%m-%d %H:%M:%S')'"
      },
      "messageTimestamp": '$(date +%s)',
      "pushName": "Teste Automatico"
    }
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo -e "${BLUE}📥 Resposta HTTP: $HTTP_CODE${NC}"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✅ SUCESSO! Webhook recebido e processado${NC}"
  echo ""
  echo -e "${GREEN}Resposta:${NC}"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}❌ ERRO! HTTP $HTTP_CODE${NC}"
  echo ""
  echo -e "${RED}Resposta:${NC}"
  echo "$BODY"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 TESTE 2: WEBHOOK DE CONEXÃO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}📤 Enviando webhook de status...${NC}"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{
    "event": "connection.update",
    "instance": "Rendizy",
    "data": {
      "state": "open",
      "statusReason": 0
    }
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo -e "${BLUE}📥 Resposta HTTP: $HTTP_CODE${NC}"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✅ SUCESSO! Webhook de conexão processado${NC}"
  echo ""
  echo -e "${GREEN}Resposta:${NC}"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}❌ ERRO! HTTP $HTTP_CODE${NC}"
  echo ""
  echo -e "${RED}Resposta:${NC}"
  echo "$BODY"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 TESTE 3: WEBHOOK DE QR CODE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BLUE}📤 Enviando webhook de QR Code...${NC}"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ANON_KEY" \
  -d '{
    "event": "qr.updated",
    "instance": "Rendizy",
    "data": {
      "qr": "2@TESTE_QR_CODE_'$(date +%s)'"
    }
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo -e "${BLUE}📥 Resposta HTTP: $HTTP_CODE${NC}"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  echo -e "${GREEN}✅ SUCESSO! Webhook de QR Code processado${NC}"
  echo ""
  echo -e "${GREEN}Resposta:${NC}"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
else
  echo -e "${RED}❌ ERRO! HTTP $HTTP_CODE${NC}"
  echo ""
  echo -e "${RED}Resposta:${NC}"
  echo "$BODY"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMO DOS TESTES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}🔍 Para ver os logs do backend em tempo real, execute:${NC}"
echo ""
echo -e "${BLUE}supabase functions logs make-server-67caf26a --tail${NC}"
echo ""
echo -e "${YELLOW}🌐 Ou acesse online:${NC}"
echo ""
echo -e "${BLUE}https://supabase.com/dashboard/project/uknccixtubkdkofyieie/logs/edge-functions${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 PRÓXIMO PASSO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}1. Envie uma mensagem REAL para o WhatsApp conectado${NC}"
echo -e "${GREEN}2. Veja os logs aparecerem em tempo real${NC}"
echo -e "${GREEN}3. Verifique se o evento 'messages.upsert' foi recebido${NC}"
echo ""
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║  ✅ TESTES CONCLUÍDOS!                                           ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
