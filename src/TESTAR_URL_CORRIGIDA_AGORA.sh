#!/bin/bash

# ========================================================================
# TESTE RÁPIDO - URL CORRIGIDA v1.0.103.102
# ========================================================================

echo "🎯 TESTANDO URL CORRIGIDA DA EVOLUTION API..."
echo ""

API_KEY="4de7861e944e291b56fe9781d2b00b36"
TOKEN="0FF3641E80A6-453C-AB4E-28C2F2D01C50"
INSTANCE="Rendizy"

# ========================================================================
# TESTE 1: Listar instâncias (sem /manager)
# ========================================================================
echo "========================================================================="
echo "TESTE 1: Listar todas as instâncias"
echo "URL: https://evo.boravendermuito.com.br/instance/fetchInstances"
echo "========================================================================="
echo ""

RESPONSE=$(curl -s -w "\n📊 HTTP Status: %{http_code}\n" \
  -H "apikey: $API_KEY" \
  https://evo.boravendermuito.com.br/instance/fetchInstances)

echo "$RESPONSE" | head -30

if echo "$RESPONSE" | grep -q "<!doctype"; then
  echo ""
  echo "❌ ERRO: Ainda retornando HTML!"
  echo "A URL da API pode estar incorreta."
else
  echo ""
  echo "✅ SUCESSO: Retornou JSON!"
  echo "A URL da API está correta."
fi

echo ""
echo "---"
echo ""

# ========================================================================
# TESTE 2: Status da instância Rendizy
# ========================================================================
echo "========================================================================="
echo "TESTE 2: Status da instância Rendizy"
echo "URL: https://evo.boravendermuito.com.br/instance/status/Rendizy"
echo "========================================================================="
echo ""

RESPONSE=$(curl -s -w "\n📊 HTTP Status: %{http_code}\n" \
  -H "apikey: $API_KEY" \
  -H "Authorization: Bearer $TOKEN" \
  https://evo.boravendermuito.com.br/instance/status/$INSTANCE)

echo "$RESPONSE"

if echo "$RESPONSE" | grep -q "<!doctype"; then
  echo ""
  echo "❌ ERRO: Ainda retornando HTML!"
elif echo "$RESPONSE" | grep -q "404"; then
  echo ""
  echo "⚠️ Instância '$INSTANCE' não encontrada"
  echo "Verifique se o nome da instância está correto."
elif echo "$RESPONSE" | grep -q "401"; then
  echo ""
  echo "❌ Erro 401: Credenciais inválidas"
  echo "Verifique a API Key e o Token."
elif echo "$RESPONSE" | grep -q "instance"; then
  echo ""
  echo "✅ SUCESSO: Instância encontrada!"
  
  # Verificar se está conectada
  if echo "$RESPONSE" | grep -q '"state":"open"'; then
    echo "🟢 Status: CONECTADA"
  elif echo "$RESPONSE" | grep -q '"state":"close"'; then
    echo "🔴 Status: DESCONECTADA"
    echo "Você precisa conectar via QR Code."
  else
    echo "🟡 Status: DESCONHECIDO"
  fi
fi

echo ""
echo "---"
echo ""

# ========================================================================
# TESTE 3: Buscar conversas (o que estava falhando)
# ========================================================================
echo "========================================================================="
echo "TESTE 3: Buscar conversas"
echo "URL: https://evo.boravendermuito.com.br/chat/findChats/Rendizy"
echo "========================================================================="
echo ""

RESPONSE=$(curl -s -w "\n📊 HTTP Status: %{http_code}\n" \
  -H "apikey: $API_KEY" \
  -H "Authorization: Bearer $TOKEN" \
  https://evo.boravendermuito.com.br/chat/findChats/$INSTANCE)

echo "$RESPONSE" | head -30

if echo "$RESPONSE" | grep -q "<!doctype"; then
  echo ""
  echo "❌ ERRO: Ainda retornando HTML!"
  echo "A URL da API está incorreta."
elif echo "$RESPONSE" | grep -q "401"; then
  echo ""
  echo "❌ Erro 401: Credenciais inválidas"
elif echo "$RESPONSE" | grep -q "404"; then
  echo ""
  echo "⚠️ Instância não encontrada ou não conectada"
elif echo "$RESPONSE" | grep -q "id"; then
  echo ""
  echo "✅ SUCESSO: Conversas encontradas!"
  
  # Contar conversas
  COUNT=$(echo "$RESPONSE" | grep -o '"id"' | wc -l)
  echo "💬 Total de conversas: $COUNT"
else
  echo ""
  echo "⚠️ Resposta inesperada"
fi

echo ""
echo "========================================================================="
echo "📋 RESUMO"
echo "========================================================================="
echo ""
echo "Se você viu:"
echo ""
echo "✅ JSON (com { ou [) → URL CORRETA! Tudo funcionando!"
echo "❌ HTML (com <!doctype) → URL ainda errada"
echo "❌ 401 → Credenciais inválidas"
echo "❌ 404 → Instância não encontrada"
echo ""
echo "🎯 PRÓXIMO PASSO:"
echo "1. Se viu JSON → Recarregue a página do Chat e teste"
echo "2. Se viu 401 → Vamos verificar as credenciais"
echo "3. Se viu 404 → Vamos verificar o nome da instância"
echo ""
echo "========================================================================="
