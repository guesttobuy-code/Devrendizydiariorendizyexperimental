#!/bin/bash

# ========================================
# TESTE COMPLETO - Evolution API Key
# ========================================

API_URL="https://evo.boravendermuito.com.br"
API_KEY="4de7861e944e291b56fe9781d2b00b36"
INSTANCE_NAME="Rendizy"

echo "============================================"
echo "🧪 TESTE COMPLETO - Evolution API"
echo "============================================"
echo ""
echo "URL: $API_URL"
echo "API Key: ${API_KEY:0:20}..."
echo "Instância: $INSTANCE_NAME"
echo ""

# ========================================
# TESTE 1: Listar instâncias (GET simples)
# ========================================
echo "--------------------------------------------"
echo "TESTE 1: Listar instâncias existentes"
echo "--------------------------------------------"
echo ""
echo "📡 Request:"
echo "  GET $API_URL/instance/fetchInstances"
echo "  Header: apikey: $API_KEY"
echo ""

response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "$API_URL/instance/fetchInstances" \
  -H "apikey: $API_KEY")

http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS:/d')

echo "📥 Response:"
echo "  Status: $http_status"
echo "  Body: $body"
echo ""

if [ "$http_status" = "200" ]; then
  echo "✅ TESTE 1: PASSOU"
else
  echo "❌ TESTE 1: FALHOU"
  if [ "$http_status" = "401" ]; then
    echo ""
    echo "🔴 ERRO 401: API Key inválida ou sem permissão"
    echo ""
    echo "Possíveis causas:"
    echo "  1. API Key incorreta"
    echo "  2. API Key sem permissão para listar instâncias"
    echo "  3. Evolution API não reconhece o header 'apikey'"
    echo ""
    echo "PARE AQUI - Não adianta continuar"
    exit 1
  fi
fi

echo ""

# ========================================
# TESTE 2: Testar com header alternativo
# ========================================
echo "--------------------------------------------"
echo "TESTE 2: Testar com header 'Authorization'"
echo "--------------------------------------------"
echo ""
echo "📡 Request:"
echo "  GET $API_URL/instance/fetchInstances"
echo "  Header: Authorization: Bearer $API_KEY"
echo ""

response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "$API_URL/instance/fetchInstances" \
  -H "Authorization: Bearer $API_KEY")

http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS:/d')

echo "📥 Response:"
echo "  Status: $http_status"
echo "  Body: $body"
echo ""

if [ "$http_status" = "200" ]; then
  echo "✅ TESTE 2: PASSOU (Authorization funciona!)"
else
  echo "⚠️  TESTE 2: FALHOU (Authorization não funciona)"
fi

echo ""

# ========================================
# TESTE 3: Verificar estado da instância
# ========================================
echo "--------------------------------------------"
echo "TESTE 3: Verificar estado da instância"
echo "--------------------------------------------"
echo ""
echo "📡 Request:"
echo "  GET $API_URL/instance/connectionState/$INSTANCE_NAME"
echo "  Header: apikey: $API_KEY"
echo ""

response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "$API_URL/instance/connectionState/$INSTANCE_NAME" \
  -H "apikey: $API_KEY")

http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS:/d')

echo "📥 Response:"
echo "  Status: $http_status"
echo "  Body: $body"
echo ""

if [ "$http_status" = "200" ]; then
  echo "✅ TESTE 3: PASSOU (instância existe)"
elif [ "$http_status" = "404" ]; then
  echo "⚠️  TESTE 3: Instância não existe (normal)"
else
  echo "❌ TESTE 3: FALHOU"
fi

echo ""

# ========================================
# TESTE 4: Criar instância
# ========================================
echo "--------------------------------------------"
echo "TESTE 4: Criar instância"
echo "--------------------------------------------"
echo ""
echo "📡 Request:"
echo "  POST $API_URL/instance/create"
echo "  Header: apikey: $API_KEY"
echo "  Body: {"
echo "    \"instanceName\": \"$INSTANCE_NAME\","
echo "    \"qrcode\": true,"
echo "    \"integration\": \"WHATSAPP-BAILEYS\""
echo "  }"
echo ""

response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X POST "$API_URL/instance/create" \
  -H "Content-Type: application/json" \
  -H "apikey: $API_KEY" \
  -d "{
    \"instanceName\": \"$INSTANCE_NAME\",
    \"qrcode\": true,
    \"integration\": \"WHATSAPP-BAILEYS\"
  }")

http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
body=$(echo "$response" | sed '/HTTP_STATUS:/d')

echo "📥 Response:"
echo "  Status: $http_status"
echo "  Body (primeiros 500 caracteres):"
echo "${body:0:500}"
echo ""

if [ "$http_status" = "201" ] || [ "$http_status" = "200" ]; then
  echo "✅ TESTE 4: PASSOU (instância criada!)"
  
  # Verificar se há QR Code na resposta
  if echo "$body" | grep -q "qrcode"; then
    echo "✅ QR Code presente na resposta!"
  else
    echo "⚠️  QR Code NÃO encontrado na resposta"
  fi
elif [ "$http_status" = "401" ]; then
  echo "❌ TESTE 4: FALHOU - ERRO 401"
  echo ""
  echo "🔴 DIAGNÓSTICO CRÍTICO:"
  echo ""
  echo "A API Key funciona para GET mas NÃO para POST."
  echo "Isso significa que a API Key tem permissão de LEITURA,"
  echo "mas NÃO tem permissão para CRIAR instâncias."
  echo ""
  echo "SOLUÇÃO:"
  echo "  1. Acesse o Evolution API Manager"
  echo "  2. Vá em Global API Keys"
  echo "  3. Verifique as permissões da key"
  echo "  4. Certifique-se que tem permissão para:"
  echo "     - Criar instâncias"
  echo "     - Deletar instâncias"
  echo "     - Modificar instâncias"
  echo ""
  exit 1
else
  echo "❌ TESTE 4: FALHOU"
fi

echo ""

# ========================================
# RESUMO
# ========================================
echo "============================================"
echo "📊 RESUMO DOS TESTES"
echo "============================================"
echo ""
echo "✅ = Passou"
echo "❌ = Falhou"
echo "⚠️  = Aviso"
echo ""
echo "Se algum teste falhou com 401, a API Key pode estar:"
echo "  1. Incorreta"
echo "  2. Sem permissões necessárias"
echo "  3. Revogada/expirada"
echo ""
echo "Ação: Verifique as credenciais no Evolution API Manager"
echo ""
