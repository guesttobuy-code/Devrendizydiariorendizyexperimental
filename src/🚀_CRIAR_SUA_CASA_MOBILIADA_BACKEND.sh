#!/bin/bash

# 🚀 CRIAR ORGANIZAÇÃO NO BACKEND
# Cria "Sua Casa Mobiliada" direto no KV store do Supabase

echo "🚀 Criando organização 'Sua Casa Mobiliada' no backend..."
echo ""

# Endpoint
URL="https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/organizations"
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"

# Payload
PAYLOAD='{
  "name": "Sua Casa Mobiliada",
  "email": "contato@suacasamobiliada.com",
  "phone": "(11) 99999-9999",
  "plan": "professional",
  "legalName": "Sua Casa Mobiliada Ltda",
  "taxId": "45.678.901/0001-23"
}'

echo "📍 URL: $URL"
echo ""
echo "📦 Payload:"
echo "$PAYLOAD" | jq .
echo ""

# Fazer requisição
echo "🔄 Enviando requisição..."
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$URL" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

# Separar body e status code
HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_STATUS=$(echo "$RESPONSE" | tail -n 1)

echo "📥 Status HTTP: $HTTP_STATUS"
echo ""

if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "201" ]; then
  echo "✅ SUCESSO!"
  echo ""
  echo "📋 Resposta:"
  echo "$HTTP_BODY" | jq .
  echo ""
  echo "🎉 Organização 'Sua Casa Mobiliada' criada com sucesso!"
  echo ""
  echo "📊 Detalhes:"
  echo "   ID: $(echo "$HTTP_BODY" | jq -r '.data.id')"
  echo "   Nome: $(echo "$HTTP_BODY" | jq -r '.data.name')"
  echo "   Slug: $(echo "$HTTP_BODY" | jq -r '.data.slug')"
  echo "   Email: $(echo "$HTTP_BODY" | jq -r '.data.email')"
  echo "   Plano: $(echo "$HTTP_BODY" | jq -r '.data.plan')"
  echo ""
elif [ "$HTTP_STATUS" = "409" ]; then
  echo "⚠️ ORGANIZAÇÃO JÁ EXISTE"
  echo ""
  echo "📋 Resposta:"
  echo "$HTTP_BODY" | jq .
  echo ""
  echo "💡 A organização já foi criada anteriormente."
  echo ""
else
  echo "❌ ERRO: HTTP $HTTP_STATUS"
  echo ""
  echo "📋 Resposta:"
  echo "$HTTP_BODY"
  echo ""
  echo "💡 Backend pode estar offline ou inacessível."
  echo ""
  echo "🔧 Soluções:"
  echo "   1. Verificar se backend está rodando"
  echo "   2. Usar modo offline (localStorage)"
  echo "   3. Usar dados mock (já adicionado ao código)"
  echo ""
fi
