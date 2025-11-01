#!/bin/bash

# ============================================================================
# TESTE RÁPIDO - Importação de Conversas do WhatsApp
# Versão: v1.0.103.98
# ============================================================================

echo "🔍 TESTANDO IMPORTAÇÃO DE CONVERSAS DO WHATSAPP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# URL do backend
BACKEND_URL="https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3OTE1MzMsImV4cCI6MjA0NTM2NzUzM30.u66Rq7wFAOVYnMiPqDDjSCkYiCsJyO8Y7r5VNUK9zNI"

echo "📡 URL: $BACKEND_URL/whatsapp/chats"
echo ""

# Teste 1: Health Check
echo "1️⃣ TESTANDO HEALTH CHECK..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  "$BACKEND_URL/whatsapp/health")

HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
BODY=$(echo "$HEALTH_RESPONSE" | sed '$d')

echo "Status HTTP: $HTTP_CODE"
echo "Resposta:"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" != "200" ]; then
  echo "❌ Health check falhou!"
  echo "Verifique se o backend está rodando"
  exit 1
fi

echo "✅ Health check OK!"
echo ""

# Teste 2: Status da Instância
echo "2️⃣ TESTANDO STATUS DA INSTÂNCIA..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
STATUS_RESPONSE=$(curl -s -w "\n%{http_code}" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  "$BACKEND_URL/whatsapp/status")

HTTP_CODE=$(echo "$STATUS_RESPONSE" | tail -n1)
BODY=$(echo "$STATUS_RESPONSE" | sed '$d')

echo "Status HTTP: $HTTP_CODE"
echo "Resposta:"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

# Teste 3: Buscar Conversas
echo "3️⃣ TESTANDO BUSCA DE CONVERSAS..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
CHATS_RESPONSE=$(curl -s -w "\n%{http_code}" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  "$BACKEND_URL/whatsapp/chats")

HTTP_CODE=$(echo "$CHATS_RESPONSE" | tail -n1)
BODY=$(echo "$CHATS_RESPONSE" | sed '$d')

echo "Status HTTP: $HTTP_CODE"
echo "Resposta:"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  # Contar conversas
  COUNT=$(echo "$BODY" | jq '.data | length' 2>/dev/null)
  
  if [ "$COUNT" = "null" ] || [ -z "$COUNT" ]; then
    echo "⚠️ Resposta recebida mas sem conversas ou formato inesperado"
    echo "Verifique se o WhatsApp está conectado e possui conversas"
  elif [ "$COUNT" = "0" ]; then
    echo "ℹ️ Backend respondeu OK mas não há conversas"
    echo "Possíveis causas:"
    echo "  - WhatsApp não está conectado (escaneie o QR Code)"
    echo "  - Não há conversas no WhatsApp"
  else
    echo "✅ $COUNT conversas encontradas!"
    echo ""
    echo "Primeira conversa:"
    echo "$BODY" | jq '.data[0]' 2>/dev/null
  fi
else
  echo "❌ Erro ao buscar conversas!"
  echo "Status HTTP: $HTTP_CODE"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TESTE CONCLUÍDO!"
echo ""
echo "PRÓXIMOS PASSOS:"
echo "1. Se health check OK mas sem conversas:"
echo "   → Abra o navegador e vá em Chat"
echo "   → Pressione F12 e veja os logs no console"
echo ""
echo "2. Se houver conversas aqui mas não aparecem no Chat:"
echo "   → Problema está no frontend"
echo "   → Verifique os logs do navegador (F12 → Console)"
echo ""
echo "3. Se nenhuma conversa foi encontrada:"
echo "   → Verifique se o QR Code foi escaneado"
echo "   → Envie uma mensagem de teste para o WhatsApp"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
