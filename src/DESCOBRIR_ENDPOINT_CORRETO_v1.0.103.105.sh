#!/bin/bash

# ========================================================================
# DESCOBRIR ENDPOINT CORRETO DA EVOLUTION API v1.0.103.105
# ========================================================================

echo "🔍 DESCOBRINDO ENDPOINT CORRETO PARA CONVERSAS"
echo "========================================================================="
echo ""

API_KEY="4de7861e944e291b56fe9781d2b00b36"
INSTANCE="Rendizy"
BASE_URL="https://evo.boravendermuito.com.br"

echo "✅ Header correto confirmado:"
echo "   Authorization: Bearer $API_KEY"
echo ""
echo "🔍 Agora vamos testar TODOS os endpoints possíveis..."
echo ""
echo "========================================================================="

# Lista de endpoints possíveis para buscar conversas
ENDPOINTS=(
  # Endpoints de chat
  "chat/findChats/$INSTANCE"
  "chat/fetchAllChats/$INSTANCE"
  "$INSTANCE/chat/findChats"
  "chat/find/$INSTANCE"
  
  # Endpoints de mensagens
  "message/findChats/$INSTANCE"
  "message/fetchAllMessages/$INSTANCE"
  "$INSTANCE/message/findChats"
  
  # Endpoints de instance
  "instance/fetchChats/$INSTANCE"
  "$INSTANCE/fetchChats"
  
  # Endpoints v1/v2
  "v1/chat/findChats/$INSTANCE"
  "v2/chat/findChats/$INSTANCE"
  
  # Endpoints sem instância
  "chat/findChats"
  "message/findMessages"
)

SUCCESS_COUNT=0
SUCCESS_ENDPOINTS=()

for ENDPOINT in "${ENDPOINTS[@]}"; do
  echo "---"
  echo "🧪 Testando: $BASE_URL/$ENDPOINT"
  
  RESPONSE=$(curl -s -w "\n---HTTP_CODE:%{http_code}---" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    "$BASE_URL/$ENDPOINT")
  
  HTTP_CODE=$(echo "$RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
  BODY=$(echo "$RESPONSE" | sed 's/---HTTP_CODE:[0-9]*---//')
  
  echo "   📊 Status: $HTTP_CODE"
  
  # Verificar se retornou HTML (painel web)
  if echo "$BODY" | grep -qi "<!doctype\|<html\|Evolution Manager"; then
    echo "   ❌ HTML (painel web)"
    
  # Verificar se retornou erro 401
  elif echo "$BODY" | grep -q "401\|Unauthorized"; then
    echo "   ❌ 401 Unauthorized"
    
  # Verificar se retornou erro 404
  elif echo "$BODY" | grep -q "404\|Not Found"; then
    echo "   ❌ 404 Not Found"
    
  # Verificar se retornou JSON válido
  elif echo "$BODY" | python3 -c "import sys, json; json.load(sys.stdin)" 2>/dev/null; then
    echo "   ✅✅✅ JSON VÁLIDO ENCONTRADO! ✅✅✅"
    echo ""
    echo "   🎯 ENDPOINT CORRETO: $BASE_URL/$ENDPOINT"
    echo ""
    echo "   📦 Primeiros 300 chars da resposta:"
    echo "$BODY" | head -c 300
    echo ""
    echo ""
    
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    SUCCESS_ENDPOINTS+=("$ENDPOINT")
    
  else
    echo "   ⚠️ Resposta desconhecida"
    echo "   Primeiros 100 chars: $(echo "$BODY" | head -c 100)"
  fi
  
  sleep 0.5  # Pequeno delay para não sobrecarregar a API
done

echo ""
echo "========================================================================="
echo "📋 RESUMO DOS TESTES"
echo "========================================================================="
echo ""
echo "Total de endpoints testados: ${#ENDPOINTS[@]}"
echo "Endpoints que retornaram JSON: $SUCCESS_COUNT"
echo ""

if [ $SUCCESS_COUNT -gt 0 ]; then
  echo "✅✅✅ ENDPOINTS QUE FUNCIONAM: ✅✅✅"
  echo ""
  for EP in "${SUCCESS_ENDPOINTS[@]}"; do
    echo "   🎯 $BASE_URL/$EP"
  done
  echo ""
  echo "========================================================================="
  echo "🚀 AÇÃO IMEDIATA"
  echo "========================================================================="
  echo ""
  echo "ME ENVIE QUAL ENDPOINT FUNCIONOU E EU ATUALIZO O CÓDIGO EM 30 SEGUNDOS!"
  echo ""
else
  echo "❌ Nenhum endpoint retornou JSON"
  echo ""
  echo "🔍 POSSÍVEIS CAUSAS:"
  echo ""
  echo "1. A Evolution API pode usar autenticação diferente para endpoints de chat"
  echo "2. A instância pode estar desconectada (precisa QR Code)"
  echo "3. A versão da Evolution API pode ser diferente"
  echo ""
  echo "🎯 PRÓXIMOS PASSOS:"
  echo ""
  echo "1. Verifique se a instância está conectada:"
  echo "   curl -H \"Authorization: Bearer $API_KEY\" $BASE_URL/instance/connectionState/$INSTANCE"
  echo ""
  echo "2. Verifique a documentação da Evolution API"
  echo "   Acesse: $BASE_URL/api-docs (se disponível)"
  echo ""
  echo "3. Teste endpoints POST com body:"
  
  echo ""
  echo "   # Exemplo: POST com filtros"
  echo "   curl -X POST -H \"Authorization: Bearer $API_KEY\" \\"
  echo "     -H \"Content-Type: application/json\" \\"
  echo "     -d '{\"where\":{\"owner\":\"$INSTANCE\"}}' \\"
  echo "     $BASE_URL/message/findMessages/$INSTANCE"
fi

echo ""
echo "========================================================================="
echo ""
