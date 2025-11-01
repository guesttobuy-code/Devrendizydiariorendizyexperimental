#!/bin/bash

# ========================================================================
# TESTAR ENDPOINTS POST DA EVOLUTION API v1.0.103.105
# ========================================================================

echo "📬 TESTANDO ENDPOINTS POST (com body)"
echo "========================================================================="
echo ""

API_KEY="4de7861e944e291b56fe9781d2b00b36"
INSTANCE="Rendizy"
BASE_URL="https://evo.boravendermuito.com.br"

echo "Alguns endpoints podem exigir POST ao invés de GET"
echo "Vamos testar os mais comuns..."
echo ""
echo "========================================================================="

# Teste 1: POST /message/findMessages/{instance}
echo ""
echo "TESTE 1: POST /message/findMessages/$INSTANCE"
echo "---"

RESPONSE=$(curl -s -w "\n---HTTP_CODE:%{http_code}---" \
  -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"limit": 50}' \
  "$BASE_URL/message/findMessages/$INSTANCE")

HTTP_CODE=$(echo "$RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed 's/---HTTP_CODE:[0-9]*---//')

echo "📊 Status: $HTTP_CODE"

if echo "$BODY" | grep -qi "<!doctype\|<html"; then
  echo "❌ HTML"
elif echo "$BODY" | python3 -c "import sys, json; json.load(sys.stdin)" 2>/dev/null; then
  echo "✅✅✅ JSON ENCONTRADO!"
  echo ""
  echo "🎯 ENDPOINT CORRETO (POST):"
  echo "   $BASE_URL/message/findMessages/$INSTANCE"
  echo ""
  echo "📦 Body usado:"
  echo '   {"limit": 50}'
  echo ""
  echo "📄 Resposta (primeiros 300 chars):"
  echo "$BODY" | head -c 300
else
  echo "⚠️ Resposta: $(echo "$BODY" | head -c 100)"
fi

echo ""
echo "========================================================================="

# Teste 2: POST /chat/findMessages/{instance}
echo ""
echo "TESTE 2: POST /chat/findMessages/$INSTANCE"
echo "---"

RESPONSE=$(curl -s -w "\n---HTTP_CODE:%{http_code}---" \
  -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}' \
  "$BASE_URL/chat/findMessages/$INSTANCE")

HTTP_CODE=$(echo "$RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed 's/---HTTP_CODE:[0-9]*---//')

echo "📊 Status: $HTTP_CODE"

if echo "$BODY" | grep -qi "<!doctype\|<html"; then
  echo "❌ HTML"
elif echo "$BODY" | python3 -c "import sys, json; json.load(sys.stdin)" 2>/dev/null; then
  echo "✅✅✅ JSON ENCONTRADO!"
  echo ""
  echo "🎯 ENDPOINT CORRETO (POST):"
  echo "   $BASE_URL/chat/findMessages/$INSTANCE"
  echo ""
  echo "📄 Resposta (primeiros 300 chars):"
  echo "$BODY" | head -c 300
else
  echo "⚠️ Resposta: $(echo "$BODY" | head -c 100)"
fi

echo ""
echo "========================================================================="

# Teste 3: POST /instance/fetchMessages
echo ""
echo "TESTE 3: POST /instance/fetchMessages"
echo "---"

RESPONSE=$(curl -s -w "\n---HTTP_CODE:%{http_code}---" \
  -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"instance\": \"$INSTANCE\"}" \
  "$BASE_URL/instance/fetchMessages")

HTTP_CODE=$(echo "$RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed 's/---HTTP_CODE:[0-9]*---//')

echo "📊 Status: $HTTP_CODE"

if echo "$BODY" | grep -qi "<!doctype\|<html"; then
  echo "❌ HTML"
elif echo "$BODY" | python3 -c "import sys, json; json.load(sys.stdin)" 2>/dev/null; then
  echo "✅✅✅ JSON ENCONTRADO!"
  echo ""
  echo "🎯 ENDPOINT CORRETO (POST):"
  echo "   $BASE_URL/instance/fetchMessages"
  echo ""
  echo "📦 Body usado:"
  echo "   {\"instance\": \"$INSTANCE\"}"
  echo ""
  echo "📄 Resposta (primeiros 300 chars):"
  echo "$BODY" | head -c 300
else
  echo "⚠️ Resposta: $(echo "$BODY" | head -c 100)"
fi

echo ""
echo "========================================================================="
echo ""
echo "Se nenhum endpoint funcionou, verifique:"
echo ""
echo "1. Status da instância:"
echo "   curl -H \"Authorization: Bearer $API_KEY\" \\"
echo "     $BASE_URL/instance/connectionState/$INSTANCE"
echo ""
echo "2. Documentação da API (se disponível):"
echo "   $BASE_URL/api-docs"
echo "   $BASE_URL/swagger"
echo ""
echo "3. Pode ser necessário conectar via QR Code primeiro"
echo ""
