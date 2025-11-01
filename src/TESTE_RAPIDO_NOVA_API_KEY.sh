#!/bin/bash

# ============================================
# 🧪 TESTE RÁPIDO - NOVA API KEY
# ============================================
# Versão: v1.0.103.57
# Data: 29/10/2025
# ============================================

echo "╔═══════════════════════════════════════════════════════╗"
echo "║  🧪 TESTE RÁPIDO - EVOLUTION API                     ║"
echo "║  Verificar se a Global API Key está correta          ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# ============================================
# CONFIGURE AQUI
# ============================================

echo "📝 Cole a Global API Key que você pegou no Manager:"
read -p "API Key: " NOVA_API_KEY

# Credenciais que já temos
API_URL="https://evo.boravendermuito.com.br"
INSTANCE_NAME="Rendizy"  # Nome correto descoberto

echo ""
echo "✅ Configurações:"
echo "   URL:      $API_URL"
echo "   Instance: $INSTANCE_NAME"
echo "   API Key:  ${NOVA_API_KEY:0:20}..."
echo ""

# ============================================
# TESTE 1: Verificar saúde da API
# ============================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TESTE 1: Verificar saúde da Evolution API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X GET "$API_URL/instance/fetchInstances" \
  -H "apikey: $NOVA_API_KEY" \
  -H "Content-Type: application/json")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status HTTP: $HTTP_CODE"

if [ "$HTTP_CODE" == "200" ]; then
  echo "✅ SUCCESS! API Key está CORRETA!"
  echo ""
  echo "📋 Instâncias encontradas:"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
elif [ "$HTTP_CODE" == "401" ]; then
  echo "❌ ERRO 401: API Key ainda está INCORRETA"
  echo "   A API Key que você colou não funciona."
  echo "   Por favor, verifique novamente no Manager."
  echo ""
  echo "Response:"
  echo "$BODY"
  exit 1
else
  echo "⚠️  Status inesperado: $HTTP_CODE"
  echo "Response:"
  echo "$BODY"
  exit 1
fi

echo ""

# ============================================
# TESTE 2: Verificar status da instância
# ============================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TESTE 2: Verificar status da instância '$INSTANCE_NAME'"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X GET "$API_URL/instance/connectionState/$INSTANCE_NAME" \
  -H "apikey: $NOVA_API_KEY" \
  -H "Content-Type: application/json")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status HTTP: $HTTP_CODE"

if [ "$HTTP_CODE" == "200" ]; then
  echo "✅ SUCCESS! Instância '$INSTANCE_NAME' encontrada!"
  echo ""
  echo "📋 Status da conexão:"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
elif [ "$HTTP_CODE" == "404" ]; then
  echo "❌ ERRO 404: Instância '$INSTANCE_NAME' NÃO EXISTE"
  echo "   O nome pode estar diferente no Manager."
  echo "   Tire um print da tela de Instances e me mande!"
  echo ""
  echo "Response:"
  echo "$BODY"
  exit 1
else
  echo "⚠️  Status inesperado: $HTTP_CODE"
  echo "Response:"
  echo "$BODY"
fi

echo ""

# ============================================
# RESULTADO FINAL
# ============================================

echo "╔═══════════════════════════════════════════════════════╗"
echo "║  ✅ TESTES CONCLUÍDOS COM SUCESSO!                   ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "🎉 ÓTIMAS NOTÍCIAS!"
echo ""
echo "✅ Global API Key está CORRETA"
echo "✅ Instância '$INSTANCE_NAME' está acessível"
echo "✅ Evolution API está respondendo normalmente"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 CREDENCIAIS CORRETAS PARA USAR NO RENDIZY:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "URL da Evolution API:"
echo "$API_URL"
echo ""
echo "Nome da Instância:"
echo "$INSTANCE_NAME"
echo ""
echo "Global API Key:"
echo "$NOVA_API_KEY"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 PRÓXIMO PASSO:"
echo "   Me passe a API Key e eu atualizo o RENDIZY agora!"
echo ""
