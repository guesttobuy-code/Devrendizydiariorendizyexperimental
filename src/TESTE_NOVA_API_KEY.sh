#!/bin/bash

# ============================================================================
# RENDIZY - Teste da Nova Global API Key do WhatsApp
# Versão: v1.0.103.70
# Data: 30/10/2025
# ============================================================================

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║  🧪 TESTE DA NOVA GLOBAL API KEY - WHATSAPP                  ║"
echo "║     Versão v1.0.103.70                                        ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Credenciais
API_URL="https://evo.boravendermuito.com.br"
API_KEY_NOVA="4de7861e944e291b56fe9781d2b00b36"
API_KEY_ANTIGA="F7DE5EFFB66B-4E43-B11F-F0D5D8849741"
INSTANCE_NAME="Rendizy"

echo "📋 CREDENCIAIS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  URL:          $API_URL"
echo "  Instância:    $INSTANCE_NAME"
echo "  API Key Nova: $API_KEY_NOVA"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================================================
# TESTE 1: API Key Antiga (DEVE FALHAR com 401)
# ============================================================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TESTE 1: API Key Antiga (deve retornar 401)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔑 Testando: $API_KEY_ANTIGA"
echo ""

HTTP_CODE_ANTIGA=$(curl -s -o /tmp/response_antiga.json -w "%{http_code}" \
  -X GET "$API_URL/instance/fetchInstances" \
  -H "apikey: $API_KEY_ANTIGA" \
  -H "Content-Type: application/json")

echo "📡 HTTP Status: $HTTP_CODE_ANTIGA"

if [ "$HTTP_CODE_ANTIGA" == "401" ]; then
  echo "✅ CORRETO: API Key antiga retornou 401 (não autorizada)"
  echo ""
  echo "📄 Resposta:"
  cat /tmp/response_antiga.json | python3 -m json.tool 2>/dev/null || cat /tmp/response_antiga.json
elif [ "$HTTP_CODE_ANTIGA" == "200" ]; then
  echo "⚠️  INESPERADO: API Key antiga ainda funciona!"
  echo ""
  echo "📄 Resposta:"
  cat /tmp/response_antiga.json | python3 -m json.tool 2>/dev/null || cat /tmp/response_antiga.json
else
  echo "❌ ERRO: Status HTTP inesperado: $HTTP_CODE_ANTIGA"
  echo ""
  echo "📄 Resposta:"
  cat /tmp/response_antiga.json
fi

echo ""
echo ""

# ============================================================================
# TESTE 2: API Key Nova (DEVE FUNCIONAR com 200)
# ============================================================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TESTE 2: API Key Nova (deve retornar 200)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔑 Testando: $API_KEY_NOVA"
echo ""

HTTP_CODE_NOVA=$(curl -s -o /tmp/response_nova.json -w "%{http_code}" \
  -X GET "$API_URL/instance/fetchInstances" \
  -H "apikey: $API_KEY_NOVA" \
  -H "Content-Type: application/json")

echo "📡 HTTP Status: $HTTP_CODE_NOVA"

if [ "$HTTP_CODE_NOVA" == "200" ]; then
  echo "✅ SUCESSO: API Key nova funciona!"
  echo ""
  echo "📄 Resposta:"
  cat /tmp/response_nova.json | python3 -m json.tool 2>/dev/null || cat /tmp/response_nova.json
  echo ""
  
  # Verificar se a instância "Rendizy" existe
  if grep -q "Rendizy" /tmp/response_nova.json; then
    echo ""
    echo "✅ SUCESSO: Instância 'Rendizy' encontrada!"
  else
    echo ""
    echo "⚠️  AVISO: Instância 'Rendizy' não encontrada na resposta"
    echo "           Você pode precisar criar a instância primeiro"
  fi
elif [ "$HTTP_CODE_NOVA" == "401" ]; then
  echo "❌ ERRO: API Key nova retornou 401 (não autorizada)"
  echo "         Verifique se a API Key está correta"
  echo ""
  echo "📄 Resposta:"
  cat /tmp/response_nova.json | python3 -m json.tool 2>/dev/null || cat /tmp/response_nova.json
else
  echo "❌ ERRO: Status HTTP inesperado: $HTTP_CODE_NOVA"
  echo ""
  echo "📄 Resposta:"
  cat /tmp/response_nova.json
fi

echo ""
echo ""

# ============================================================================
# TESTE 3: Status da Instância "Rendizy"
# ============================================================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TESTE 3: Status da Instância 'Rendizy'"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

HTTP_CODE_STATUS=$(curl -s -o /tmp/response_status.json -w "%{http_code}" \
  -X GET "$API_URL/instance/connectionState/$INSTANCE_NAME" \
  -H "apikey: $API_KEY_NOVA" \
  -H "Content-Type: application/json")

echo "📡 HTTP Status: $HTTP_CODE_STATUS"

if [ "$HTTP_CODE_STATUS" == "200" ]; then
  echo "✅ SUCESSO: Conseguiu verificar status da instância!"
  echo ""
  echo "📄 Resposta:"
  cat /tmp/response_status.json | python3 -m json.tool 2>/dev/null || cat /tmp/response_status.json
  echo ""
  
  # Verificar status de conexão
  if grep -q '"status":"open"' /tmp/response_status.json; then
    echo ""
    echo "✅ WhatsApp está CONECTADO!"
  elif grep -q '"status":"close"' /tmp/response_status.json; then
    echo ""
    echo "⚠️  WhatsApp está DESCONECTADO"
    echo "    Execute 'Gerar QR Code' no RENDIZY para conectar"
  elif grep -q '"status":"connecting"' /tmp/response_status.json; then
    echo ""
    echo "🔄 WhatsApp está CONECTANDO..."
  fi
elif [ "$HTTP_CODE_STATUS" == "404" ]; then
  echo "⚠️  Instância 'Rendizy' não encontrada"
  echo "    Você precisa criar a instância no Evolution Manager primeiro"
  echo ""
  echo "📄 Resposta:"
  cat /tmp/response_status.json | python3 -m json.tool 2>/dev/null || cat /tmp/response_status.json
elif [ "$HTTP_CODE_STATUS" == "401" ]; then
  echo "❌ ERRO: API Key inválida"
  echo ""
  echo "📄 Resposta:"
  cat /tmp/response_status.json | python3 -m json.tool 2>/dev/null || cat /tmp/response_status.json
else
  echo "❌ ERRO: Status HTTP inesperado: $HTTP_CODE_STATUS"
  echo ""
  echo "📄 Resposta:"
  cat /tmp/response_status.json
fi

echo ""
echo ""

# ============================================================================
# RESUMO FINAL
# ============================================================================

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                    📊 RESUMO DOS TESTES                       ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

echo "┌─────────────────────────────────────────────────────────────┐"
echo "│ Teste 1: API Key Antiga                                     │"
if [ "$HTTP_CODE_ANTIGA" == "401" ]; then
  echo "│ Status:  ✅ PASSOU (401 esperado)                          │"
else
  echo "│ Status:  ⚠️  INESPERADO (esperava 401)                     │"
fi
echo "├─────────────────────────────────────────────────────────────┤"
echo "│ Teste 2: API Key Nova                                       │"
if [ "$HTTP_CODE_NOVA" == "200" ]; then
  echo "│ Status:  ✅ PASSOU (200 OK)                                │"
else
  echo "│ Status:  ❌ FALHOU (esperava 200)                          │"
fi
echo "├─────────────────────────────────────────────────────────────┤"
echo "│ Teste 3: Status da Instância                                │"
if [ "$HTTP_CODE_STATUS" == "200" ]; then
  echo "│ Status:  ✅ PASSOU (instância encontrada)                  │"
elif [ "$HTTP_CODE_STATUS" == "404" ]; then
  echo "│ Status:  ⚠️  Instância não existe                          │"
else
  echo "│ Status:  ❌ FALHOU (erro ao verificar)                     │"
fi
echo "└─────────────────────────────────────────────────────────────┘"
echo ""

# Conclusão final
if [ "$HTTP_CODE_NOVA" == "200" ]; then
  echo "┌─────────────────────────────────────────────────────────────┐"
  echo "│                                                             │"
  echo "│  ✅ SUCESSO! A NOVA API KEY FUNCIONA!                      │"
  echo "│                                                             │"
  echo "│  Próximos passos:                                           │"
  echo "│  1. Configure no RENDIZY                                    │"
  echo "│  2. Salve as configurações                                  │"
  echo "│  3. Gere o QR Code                                          │"
  echo "│  4. Escaneie com WhatsApp                                   │"
  echo "│                                                             │"
  echo "└─────────────────────────────────────────────────────────────┘"
else
  echo "┌─────────────────────────────────────────────────────────────┐"
  echo "│                                                             │"
  echo "│  ❌ PROBLEMA DETECTADO                                      │"
  echo "│                                                             │"
  echo "│  A nova API Key não está funcionando como esperado.         │"
  echo "│                                                             │"
  echo "│  Ações recomendadas:                                        │"
  echo "│  1. Verifique se copiou a API Key corretamente             │"
  echo "│  2. Confirme no Evolution Manager                           │"
  echo "│  3. Teste manualmente com curl                              │"
  echo "│                                                             │"
  echo "└─────────────────────────────────────────────────────────────┘"
fi

echo ""
echo "📚 DOCUMENTAÇÃO:"
echo "   • ATUALIZAR_API_KEY_AGORA.md"
echo "   • CHANGELOG_v1.0.103.70_API_KEY_VALIDA.md"
echo ""

# Cleanup
rm -f /tmp/response_antiga.json /tmp/response_nova.json /tmp/response_status.json

echo "✅ Teste concluído!"
echo ""
