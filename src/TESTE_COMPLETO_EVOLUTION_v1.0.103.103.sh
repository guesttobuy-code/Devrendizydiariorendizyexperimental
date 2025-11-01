#!/bin/bash

# ========================================================================
# TESTE COMPLETO EVOLUTION API - DESCOBRIR O PROBLEMA REAL
# v1.0.103.103
# ========================================================================

echo "🔍 TESTE COMPLETO DA EVOLUTION API"
echo "========================================================================="
echo ""

API_KEY="4de7861e944e291b56fe9781d2b00b36"
TOKEN="0FF3641E80A6-453C-AB4E-28C2F2D01C50"
INSTANCE="Rendizy"
BASE_URL="https://evo.boravendermuito.com.br"

# ========================================================================
# TESTE 1: Verificar se a Evolution API está online
# ========================================================================
echo "========================================================================="
echo "TESTE 1: Verificar se a Evolution API está acessível"
echo "========================================================================="
echo ""

echo "🌐 Testando: $BASE_URL"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL)
echo "📊 HTTP Status: $HTTP_CODE"

if [ "$HTTP_CODE" == "200" ]; then
  echo "✅ Servidor está online"
elif [ "$HTTP_CODE" == "000" ]; then
  echo "❌ ERRO: Servidor não responde (DNS ou conexão falhou)"
  echo "   Verifique se a URL está correta e se o servidor está online"
  exit 1
else
  echo "⚠️ Status inesperado: $HTTP_CODE"
fi

echo ""
echo "---"
echo ""

# ========================================================================
# TESTE 2: Listar todas as instâncias (endpoint mais básico)
# ========================================================================
echo "========================================================================="
echo "TESTE 2: Listar instâncias (verificar credenciais)"
echo "========================================================================="
echo ""

echo "📡 URL: $BASE_URL/instance/fetchInstances"
echo "🔑 API Key: ${API_KEY:0:10}..."
echo ""

RESPONSE=$(curl -s -w "\n---HTTP_CODE:%{http_code}---" \
  -H "apikey: $API_KEY" \
  "$BASE_URL/instance/fetchInstances")

HTTP_CODE=$(echo "$RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed 's/---HTTP_CODE:[0-9]*---//')

echo "📊 HTTP Status: $HTTP_CODE"
echo ""
echo "📦 Resposta (primeiros 500 chars):"
echo "$BODY" | head -c 500
echo ""
echo ""

if echo "$BODY" | grep -q "<!doctype\|<html"; then
  echo "❌ ERRO: Retornou HTML ao invés de JSON"
  echo "   CAUSA: API Key inválida OU endpoint incorreto"
  echo ""
  echo "   AÇÕES:"
  echo "   1. Verifique se a API Key está correta"
  echo "   2. Verifique se você tem acesso à Evolution API"
  echo "   3. Tente acessar $BASE_URL no navegador para ver a interface"
elif echo "$BODY" | grep -q "Unauthorized\|401"; then
  echo "❌ ERRO 401: API Key inválida ou expirada"
  echo "   Verifique a Global API Key no painel da Evolution"
elif echo "$BODY" | grep -q "\[.*\]\|{"; then
  echo "✅ SUCESSO: Retornou JSON!"
  echo "   A API Key está VÁLIDA"
  
  # Verificar se a instância Rendizy existe
  if echo "$BODY" | grep -q "Rendizy"; then
    echo "✅ Instância 'Rendizy' ENCONTRADA!"
  else
    echo "⚠️ Instância 'Rendizy' NÃO ENCONTRADA"
    echo ""
    echo "📋 Instâncias disponíveis:"
    echo "$BODY" | grep -o '"instanceName":"[^"]*"' | cut -d: -f2 | tr -d '"'
  fi
else
  echo "⚠️ Resposta inesperada"
fi

echo ""
echo "---"
echo ""

# ========================================================================
# TESTE 3: Status da instância Rendizy
# ========================================================================
echo "========================================================================="
echo "TESTE 3: Status da instância '$INSTANCE'"
echo "========================================================================="
echo ""

echo "📡 URL: $BASE_URL/instance/connectionState/$INSTANCE"
echo "🔑 API Key: ${API_KEY:0:10}..."
echo "🎫 Token: ${TOKEN:0:15}..."
echo ""

RESPONSE=$(curl -s -w "\n---HTTP_CODE:%{http_code}---" \
  -H "apikey: $API_KEY" \
  -H "Authorization: Bearer $TOKEN" \
  "$BASE_URL/instance/connectionState/$INSTANCE")

HTTP_CODE=$(echo "$RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed 's/---HTTP_CODE:[0-9]*---//')

echo "📊 HTTP Status: $HTTP_CODE"
echo ""
echo "📦 Resposta:"
echo "$BODY"
echo ""

if echo "$BODY" | grep -q "<!doctype\|<html"; then
  echo "❌ ERRO: Retornou HTML"
  echo "   CAUSA: Token inválido OU instância não existe"
elif echo "$BODY" | grep -q "401"; then
  echo "❌ ERRO 401: Token inválido ou expirado"
elif echo "$BODY" | grep -q "404"; then
  echo "❌ ERRO 404: Instância '$INSTANCE' não encontrada"
  echo "   Verifique o nome exato da instância (case-sensitive)"
elif echo "$BODY" | grep -q "open"; then
  echo "✅ Instância está CONECTADA (open)"
elif echo "$BODY" | grep -q "close"; then
  echo "⚠️ Instância está DESCONECTADA (close)"
  echo "   Você precisa conectar via QR Code"
else
  echo "⚠️ Status desconhecido"
fi

echo ""
echo "---"
echo ""

# ========================================================================
# TESTE 4: Testar diferentes endpoints para buscar conversas
# ========================================================================
echo "========================================================================="
echo "TESTE 4: Testar endpoints de conversas"
echo "========================================================================="
echo ""

ENDPOINTS=(
  "chat/findChats/$INSTANCE"
  "chat/fetchAllChats/$INSTANCE"
  "message/findChats/$INSTANCE"
  "instance/fetchChats/$INSTANCE"
  "$INSTANCE/chat/findChats"
)

for ENDPOINT in "${ENDPOINTS[@]}"; do
  echo "---"
  echo "🧪 Testando: $BASE_URL/$ENDPOINT"
  
  RESPONSE=$(curl -s -w "\n---HTTP_CODE:%{http_code}---" \
    -H "apikey: $API_KEY" \
    -H "Authorization: Bearer $TOKEN" \
    "$BASE_URL/$ENDPOINT")
  
  HTTP_CODE=$(echo "$RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
  BODY=$(echo "$RESPONSE" | sed 's/---HTTP_CODE:[0-9]*---//')
  
  echo "   📊 Status: $HTTP_CODE"
  
  if echo "$BODY" | grep -q "<!doctype\|<html"; then
    echo "   ❌ HTML"
  elif echo "$BODY" | grep -q "401"; then
    echo "   ❌ 401 Unauthorized"
  elif echo "$BODY" | grep -q "404"; then
    echo "   ❌ 404 Not Found"
  elif echo "$BODY" | grep -q "\[.*\]\|{"; then
    echo "   ✅ JSON ENCONTRADO!"
    echo ""
    echo "   🎯 ENDPOINT CORRETO: $BASE_URL/$ENDPOINT"
    echo ""
    echo "   📦 Primeiros 300 chars da resposta:"
    echo "$BODY" | head -c 300
    echo ""
    echo ""
    echo "   ✅✅✅ USE ESTE ENDPOINT NO CÓDIGO! ✅✅✅"
    break
  else
    echo "   ⚠️ Desconhecido"
  fi
done

echo ""
echo "---"
echo ""

# ========================================================================
# TESTE 5: Verificar documentação da Evolution API
# ========================================================================
echo "========================================================================="
echo "TESTE 5: Endpoints comuns da Evolution API"
echo "========================================================================="
echo ""

echo "📚 Documentação oficial: https://doc.evolution-api.com"
echo ""
echo "Endpoints comuns para conversas:"
echo "  - GET /chat/findChats/{instance}"
echo "  - GET /message/findMessages/{instance}"
echo "  - POST /message/findMessages/{instance} (com filtros)"
echo ""
echo "Se nenhum endpoint funcionou, verifique:"
echo "  1. A documentação da sua versão da Evolution API"
echo "  2. Se a Evolution API está configurada corretamente"
echo "  3. Se o WhatsApp está conectado (via QR Code)"
echo ""

echo "========================================================================="
echo "📋 RESUMO DO DIAGNÓSTICO"
echo "========================================================================="
echo ""

# Análise final
if [ "$HTTP_CODE" == "401" ]; then
  echo "🔴 PROBLEMA PRINCIPAL: Credenciais inválidas"
  echo ""
  echo "✅ SOLUÇÃO:"
  echo "   1. Acesse o painel Evolution Manager"
  echo "   2. Vá em Settings → API Key"
  echo "   3. Copie a Global API Key correta"
  echo "   4. Verifique o Instance Token da instância 'Rendizy'"
  echo "   5. Atualize as credenciais no código"
elif [ "$HTTP_CODE" == "404" ]; then
  echo "🔴 PROBLEMA PRINCIPAL: Endpoint ou instância não encontrada"
  echo ""
  echo "✅ SOLUÇÃO:"
  echo "   1. Verifique se a instância 'Rendizy' existe"
  echo "   2. Verifique se o nome está correto (case-sensitive)"
  echo "   3. Tente criar a instância se não existir"
elif echo "$BODY" | grep -q "<!doctype\|<html"; then
  echo "🔴 PROBLEMA PRINCIPAL: Retornando HTML ao invés de JSON"
  echo ""
  echo "✅ SOLUÇÃO:"
  echo "   1. A URL base pode estar incorreta"
  echo "   2. O endpoint pode estar errado"
  echo "   3. Verifique a documentação da Evolution API"
  echo "   4. Tente acessar $BASE_URL/api-docs para ver os endpoints disponíveis"
else
  echo "🟢 Verifique os resultados acima"
fi

echo ""
echo "========================================================================="
echo ""
echo "📧 Me envie os resultados deste teste completo!"
echo ""
