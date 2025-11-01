#!/bin/bash

# ========================================================================
# TESTE RÁPIDO - HEADERS CORRETOS v1.0.103.104
# ========================================================================

echo "🔑 TESTANDO HEADERS CORRETOS DA EVOLUTION API"
echo "========================================================================="
echo ""

API_KEY="4de7861e944e291b56fe9781d2b00b36"
INSTANCE="Rendizy"
BASE_URL="https://evo.boravendermuito.com.br"

echo "✅ CORREÇÃO APLICADA:"
echo "   Agora usando APENAS o header Authorization"
echo "   Removido o header 'apikey' que estava causando o erro 401"
echo ""
echo "========================================================================="
echo "TESTE: Listar instâncias"
echo "========================================================================="
echo ""
echo "📡 URL: $BASE_URL/instance/fetchInstances"
echo "🔑 Authorization: Bearer ${API_KEY:0:10}..."
echo ""

RESPONSE=$(curl -s -w "\n---HTTP_CODE:%{http_code}---" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  "$BASE_URL/instance/fetchInstances")

HTTP_CODE=$(echo "$RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed 's/---HTTP_CODE:[0-9]*---//')

echo "📊 HTTP Status: $HTTP_CODE"
echo ""
echo "📦 Resposta (primeiros 500 chars):"
echo "$BODY" | head -c 500
echo ""
echo ""

if [ "$HTTP_CODE" == "200" ]; then
  echo "✅✅✅ SUCESSO! Headers corretos funcionaram!"
  echo ""
  
  # Verificar se a instância Rendizy existe
  if echo "$BODY" | grep -q "Rendizy"; then
    echo "✅ Instância 'Rendizy' ENCONTRADA!"
    echo ""
    
    # Verificar status da instância
    echo "---"
    echo ""
    echo "========================================================================="
    echo "TESTE 2: Status da instância Rendizy"
    echo "========================================================================="
    echo ""
    
    STATUS_RESPONSE=$(curl -s -w "\n---HTTP_CODE:%{http_code}---" \
      -H "Authorization: Bearer $API_KEY" \
      -H "Content-Type: application/json" \
      "$BASE_URL/instance/connectionState/$INSTANCE")
    
    STATUS_CODE=$(echo "$STATUS_RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
    STATUS_BODY=$(echo "$STATUS_RESPONSE" | sed 's/---HTTP_CODE:[0-9]*---//')
    
    echo "📊 HTTP Status: $STATUS_CODE"
    echo ""
    echo "📦 Resposta:"
    echo "$STATUS_BODY"
    echo ""
    
    if [ "$STATUS_CODE" == "200" ]; then
      if echo "$STATUS_BODY" | grep -q '"state":"open"'; then
        echo "✅ Instância está CONECTADA! 🟢"
        echo ""
        echo "🎯 PRÓXIMO PASSO:"
        echo "   Recarregue a página do Chat e aguarde 2 segundos"
        echo "   As conversas devem ser importadas automaticamente!"
      elif echo "$STATUS_BODY" | grep -q '"state":"close"'; then
        echo "⚠️ Instância está DESCONECTADA 🔴"
        echo ""
        echo "🎯 PRÓXIMO PASSO:"
        echo "   Conecte o WhatsApp via QR Code"
        echo "   Vá em Integrações → WhatsApp → Conectar"
      else
        echo "🟡 Status desconhecido"
      fi
    else
      echo "⚠️ Não foi possível verificar o status da instância"
    fi
  else
    echo "⚠️ Instância 'Rendizy' NÃO ENCONTRADA"
    echo ""
    echo "📋 Instâncias disponíveis:"
    echo "$BODY" | grep -o '"instanceName":"[^"]*"' | cut -d: -f2 | tr -d '"'
  fi
  
elif [ "$HTTP_CODE" == "401" ]; then
  echo "❌ ERRO 401: API Key ainda inválida"
  echo ""
  echo "🔍 Verifique:"
  echo "   1. A Global API Key está correta no painel Evolution"
  echo "   2. A API Key não foi revogada ou expirada"
  echo "   3. Você tem permissão para acessar a Evolution API"
  
elif [ "$HTTP_CODE" == "404" ]; then
  echo "❌ ERRO 404: Endpoint não encontrado"
  echo ""
  echo "🔍 Possíveis causas:"
  echo "   1. URL base incorreta"
  echo "   2. Evolution API em versão diferente"
  echo "   3. Endpoint não existe nesta versão"
  
else
  echo "❌ ERRO: Status HTTP inesperado: $HTTP_CODE"
fi

echo ""
echo "========================================================================="
echo ""

if [ "$HTTP_CODE" == "200" ]; then
  echo "🎉 TESTE PASSOU!"
  echo "   Os headers estão corretos agora"
  echo ""
  echo "🚀 AÇÃO IMEDIATA:"
  echo "   1. Recarregue a página do Rendizy (F5)"
  echo "   2. Vá em Chat"
  echo "   3. Aguarde 2 segundos"
  echo "   4. As conversas devem aparecer!"
else
  echo "⚠️ Teste não passou"
  echo "   Me envie os resultados acima para diagnóstico"
fi

echo ""
echo "========================================================================="
