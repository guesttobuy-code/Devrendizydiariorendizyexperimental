#!/bin/bash

# ========================================
# TESTE 30 SEGUNDOS - Identificar Problema
# ========================================

echo "🔍 TESTE RÁPIDO - API Key funciona?"
echo ""

API_KEY="4de7861e944e291b56fe9781d2b00b36"
URL="https://evo.boravendermuito.com.br"

# Teste simples GET
response=$(curl -s -o /dev/null -w "%{http_code}" \
  -X GET "$URL/instance/fetchInstances" \
  -H "apikey: $API_KEY")

if [ "$response" = "200" ]; then
  echo "✅ GET funciona (status 200)"
  echo "✅ API Key está correta"
  echo "✅ URL está correta"
  echo ""
  echo "Agora testando POST..."
  echo ""
  
  # Teste POST
  response=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "$URL/instance/create" \
    -H "Content-Type: application/json" \
    -H "apikey: $API_KEY" \
    -d '{"instanceName":"Rendizy","qrcode":true}')
  
  if [ "$response" = "201" ] || [ "$response" = "200" ]; then
    echo "✅ POST funciona (status $response)"
    echo "✅ Problema NÃO é com a API Key!"
    echo ""
    echo "🔍 O erro pode estar em:"
    echo "  1. Frontend enviando dados incorretos"
    echo "  2. Backend com bug diferente"
    echo "  3. Alguma transformação de dados"
    echo ""
    echo "PRÓXIMO PASSO:"
    echo "  Verifique os logs do backend"
    echo "  Procure por: 🔍 DEBUGGING - Requisição COMPLETA"
  elif [ "$response" = "401" ]; then
    echo "❌ POST não funciona (status 401)"
    echo ""
    echo "🎯 DIAGNÓSTICO:"
    echo "  API Key tem permissão de LEITURA"
    echo "  mas NÃO tem permissão de ESCRITA"
    echo ""
    echo "SOLUÇÃO:"
    echo "  1. Acesse: $URL/manager"
    echo "  2. Vá em: Global API Keys"
    echo "  3. Edite a key: $API_KEY"
    echo "  4. Marque permissões:"
    echo "     ☑ Create Instance"
    echo "     ☑ Delete Instance"
    echo "     ☑ Manage Instance"
    echo "  5. Salvar e testar novamente"
  else
    echo "❌ POST falhou (status $response)"
    echo ""
    echo "Execute: bash TESTE_COMPLETO_API_KEY.sh"
    echo "Para diagnóstico detalhado"
  fi
elif [ "$response" = "401" ]; then
  echo "❌ GET não funciona (status 401)"
  echo ""
  echo "🎯 DIAGNÓSTICO:"
  echo "  API Key está INCORRETA ou REVOGADA"
  echo ""
  echo "SOLUÇÃO:"
  echo "  1. Acesse: $URL/manager"
  echo "  2. Vá em: Global API Keys"
  echo "  3. Verifique se a key existe:"
  echo "     ${API_KEY:0:20}..."
  echo "  4. Se não existir: Criar nova key"
  echo "  5. Atualizar no RENDIZY"
elif [ "$response" = "000" ]; then
  echo "❌ Servidor não responde"
  echo ""
  echo "🎯 DIAGNÓSTICO:"
  echo "  URL incorreta OU servidor offline"
  echo ""
  echo "SOLUÇÃO:"
  echo "  1. Verifique se a URL está correta:"
  echo "     $URL"
  echo "  2. Tente acessar no navegador:"
  echo "     $URL/manager"
  echo "  3. Contate seu TI se o servidor estiver offline"
else
  echo "❌ Erro inesperado (status $response)"
  echo ""
  echo "Execute: bash TESTE_COMPLETO_API_KEY.sh"
  echo "Para diagnóstico detalhado"
fi

echo ""
echo "════════════════════════════════════════"
echo "Teste concluído!"
echo "════════════════════════════════════════"
