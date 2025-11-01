#!/bin/bash

# ========================================
# TESTE DE API KEY - EVOLUTION API
# RENDIZY WhatsApp Integration
# ========================================

echo "🔍 Testando API Key da Evolution API..."
echo ""

# Suas credenciais
API_URL="https://evo.boravendermuito.com.br"
API_KEY="F7DE5EFFB66B-4E43-B11F-F0D5D8849741"
INSTANCE="rendizy-admin-master"

echo "📋 Dados:"
echo "   URL: $API_URL"
echo "   Instance: $INSTANCE"
echo "   API Key: ${API_KEY:0:20}..."
echo ""

# ========================================
# TESTE 1: Header "apikey" (Evolution v1)
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 TESTE 1: Header 'apikey' (Evolution v1)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

response1=$(curl -s -w "\n%{http_code}" -X GET "$API_URL/instance/fetchInstances" \
  -H "apikey: $API_KEY" \
  -H "Content-Type: application/json")

http_code1=$(echo "$response1" | tail -n1)
body1=$(echo "$response1" | head -n-1)

echo "Status: $http_code1"
echo "Response:"
echo "$body1" | jq . 2>/dev/null || echo "$body1"
echo ""

if [ "$http_code1" = "200" ]; then
  echo "✅ SUCESSO! Use header 'apikey'"
elif [ "$http_code1" = "401" ]; then
  echo "❌ ERRO 401: API Key inválida ou formato errado"
else
  echo "⚠️ Status inesperado: $http_code1"
fi

echo ""
echo ""

# ========================================
# TESTE 2: Header "api-key" (Alternativo)
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 TESTE 2: Header 'api-key' (Alternativo)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

response2=$(curl -s -w "\n%{http_code}" -X GET "$API_URL/instance/fetchInstances" \
  -H "api-key: $API_KEY" \
  -H "Content-Type: application/json")

http_code2=$(echo "$response2" | tail -n1)
body2=$(echo "$response2" | head -n-1)

echo "Status: $http_code2"
echo "Response:"
echo "$body2" | jq . 2>/dev/null || echo "$body2"
echo ""

if [ "$http_code2" = "200" ]; then
  echo "✅ SUCESSO! Use header 'api-key'"
elif [ "$http_code2" = "401" ]; then
  echo "❌ ERRO 401: API Key inválida ou formato errado"
else
  echo "⚠️ Status inesperado: $http_code2"
fi

echo ""
echo ""

# ========================================
# TESTE 3: Authorization Bearer
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 TESTE 3: Authorization Bearer"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

response3=$(curl -s -w "\n%{http_code}" -X GET "$API_URL/instance/fetchInstances" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json")

http_code3=$(echo "$response3" | tail -n1)
body3=$(echo "$response3" | head -n-1)

echo "Status: $http_code3"
echo "Response:"
echo "$body3" | jq . 2>/dev/null || echo "$body3"
echo ""

if [ "$http_code3" = "200" ]; then
  echo "✅ SUCESSO! Use header 'Authorization: Bearer'"
elif [ "$http_code3" = "401" ]; then
  echo "❌ ERRO 401: API Key inválida ou formato errado"
else
  echo "⚠️ Status inesperado: $http_code3"
fi

echo ""
echo ""

# ========================================
# TESTE 4: Status da Instância Específica
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 TESTE 4: Status da Instância '$INSTANCE'"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

response4=$(curl -s -w "\n%{http_code}" -X GET "$API_URL/instance/connectionState/$INSTANCE" \
  -H "apikey: $API_KEY" \
  -H "Content-Type: application/json")

http_code4=$(echo "$response4" | tail -n1)
body4=$(echo "$response4" | head -n-1)

echo "Status: $http_code4"
echo "Response:"
echo "$body4" | jq . 2>/dev/null || echo "$body4"
echo ""

if [ "$http_code4" = "200" ]; then
  echo "✅ Instância existe e está acessível"
elif [ "$http_code4" = "401" ]; then
  echo "❌ ERRO 401: API Key inválida"
elif [ "$http_code4" = "404" ]; then
  echo "⚠️ Instância não encontrada (normal se ainda não foi criada)"
else
  echo "⚠️ Status inesperado: $http_code4"
fi

echo ""
echo ""

# ========================================
# RESUMO
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMO DOS TESTES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Teste 1 (apikey):        $http_code1"
echo "Teste 2 (api-key):       $http_code2"
echo "Teste 3 (Bearer):        $http_code3"
echo "Teste 4 (Instância):     $http_code4"
echo ""

if [ "$http_code1" = "200" ] || [ "$http_code2" = "200" ] || [ "$http_code3" = "200" ]; then
  echo "✅ API Key está CORRETA!"
  echo ""
  if [ "$http_code1" = "200" ]; then
    echo "   👉 Use formato: apikey"
  elif [ "$http_code2" = "200" ]; then
    echo "   👉 Use formato: api-key"
  elif [ "$http_code3" = "200" ]; then
    echo "   👉 Use formato: Authorization Bearer"
  fi
else
  echo "❌ API Key está INCORRETA ou há problema de autenticação"
  echo ""
  echo "Possíveis causas:"
  echo "  - API Key digitada errada"
  echo "  - API Key expirada ou revogada"
  echo "  - Servidor com autenticação customizada"
  echo "  - Restrição de IP/domínio"
  echo ""
  echo "👉 Fale com seu TI para:"
  echo "   1. Confirmar se a API Key está correta"
  echo "   2. Verificar se está ativa"
  echo "   3. Gerar nova API Key se necessário"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Testes concluídos!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
