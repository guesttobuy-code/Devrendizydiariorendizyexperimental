#!/bin/bash

# ========================================
# TESTE DIRETO - Qual header funciona?
# ========================================

echo "🔍 Testando Evolution API - Qual header funciona?"
echo ""

API_KEY="4de7861e944e291b56fe9781d2b00b36"
URL="https://evo.boravendermuito.com.br"
INSTANCE="Rendizy"

echo "Credenciais:"
echo "  URL: $URL"
echo "  API Key: ${API_KEY:0:20}..."
echo "  Instance: $INSTANCE"
echo ""

# ========================================
# TESTE 1: apikey (padrão)
# ========================================
echo "──────────────────────────────────────────"
echo "TESTE 1: Header 'apikey'"
echo "──────────────────────────────────────────"

response=$(curl -s -w "\n%{http_code}" \
  -X POST "$URL/instance/create" \
  -H "Content-Type: application/json" \
  -H "apikey: $API_KEY" \
  -d "{\"instanceName\":\"$INSTANCE\",\"qrcode\":true}")

http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

echo "Status: $http_code"
echo "Response: ${body:0:200}"
echo ""

if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
  echo "✅ FUNCIONA com header 'apikey'"
  echo ""
  echo "SOLUÇÃO: Manter código atual"
  exit 0
fi

# ========================================
# TESTE 2: Authorization Bearer
# ========================================
echo "──────────────────────────────────────────"
echo "TESTE 2: Header 'Authorization: Bearer'"
echo "──────────────────────────────────────────"

response=$(curl -s -w "\n%{http_code}" \
  -X POST "$URL/instance/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_KEY" \
  -d "{\"instanceName\":\"$INSTANCE\",\"qrcode\":true}")

http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

echo "Status: $http_code"
echo "Response: ${body:0:200}"
echo ""

if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
  echo "✅ FUNCIONA com header 'Authorization: Bearer'"
  echo ""
  echo "SOLUÇÃO: Alterar código para usar Authorization: Bearer"
  exit 0
fi

# ========================================
# TESTE 3: x-api-key
# ========================================
echo "──────────────────────────────────────────"
echo "TESTE 3: Header 'x-api-key'"
echo "──────────────────────────────────────────"

response=$(curl -s -w "\n%{http_code}" \
  -X POST "$URL/instance/create" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d "{\"instanceName\":\"$INSTANCE\",\"qrcode\":true}")

http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

echo "Status: $http_code"
echo "Response: ${body:0:200}"
echo ""

if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
  echo "✅ FUNCIONA com header 'x-api-key'"
  echo ""
  echo "SOLUÇÃO: Alterar código para usar x-api-key"
  exit 0
fi

# ========================================
# TESTE 4: api-key
# ========================================
echo "──────────────────────────────────────────"
echo "TESTE 4: Header 'api-key'"
echo "──────────────────────────────────────────"

response=$(curl -s -w "\n%{http_code}" \
  -X POST "$URL/instance/create" \
  -H "Content-Type: application/json" \
  -H "api-key: $API_KEY" \
  -d "{\"instanceName\":\"$INSTANCE\",\"qrcode\":true}")

http_code=$(echo "$response" | tail -n 1)
body=$(echo "$response" | sed '$d')

echo "Status: $http_code"
echo "Response: ${body:0:200}"
echo ""

if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
  echo "✅ FUNCIONA com header 'api-key'"
  echo ""
  echo "SOLUÇÃO: Alterar código para usar api-key"
  exit 0
fi

# ========================================
# Todos falharam
# ========================================
echo "══════════════════════════════════════════"
echo "❌ TODOS OS TESTES FALHARAM"
echo "══════════════════════════════════════════"
echo ""
echo "A API Key NÃO funciona com nenhum formato de header."
echo ""
echo "Possíveis causas:"
echo "  1. API Key incorreta"
echo "  2. API Key sem permissões"
echo "  3. URL incorreta"
echo "  4. Servidor inacessível"
echo ""
echo "PRÓXIMOS PASSOS:"
echo ""
echo "1. Acesse o Evolution API Manager:"
echo "   $URL/manager"
echo ""
echo "2. Faça login com suas credenciais"
echo ""
echo "3. Vá em: Global API Keys"
echo ""
echo "4. Verifique se a API Key existe:"
echo "   ${API_KEY:0:30}..."
echo ""
echo "5. Se NÃO existir:"
echo "   - Crie uma nova Global API Key"
echo "   - Marque TODAS as permissões"
echo "   - Copie a nova key"
echo "   - Atualize no RENDIZY"
echo ""
echo "6. Se existir, verifique as permissões:"
echo "   ☑ Create Instance"
echo "   ☑ Delete Instance"
echo "   ☑ Manage Instance"
echo "   ☑ Send Message"
echo "   ☑ View Instance"
echo ""
echo "7. Salve as alterações"
echo ""
echo "8. Execute este script novamente"
echo ""
