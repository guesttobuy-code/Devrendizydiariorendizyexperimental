#!/bin/bash

# ========================================================================
# TESTE PARA DESCOBRIR A URL CORRETA DA EVOLUTION API
# ========================================================================

echo "🔍 DESCOBRINDO A URL CORRETA DA EVOLUTION API..."
echo ""

API_KEY="4de7861e944e291b56fe9781d2b00b36"
TOKEN="0FF3641E80A6-453C-AB4E-28C2F2D01C50"
INSTANCE="Rendizy"

# ========================================================================
# TESTE 1: URL SEM /manager (mais comum)
# ========================================================================
echo "========================================================================="
echo "TESTE 1: https://evo.boravendermuito.com.br/ (SEM /manager)"
echo "========================================================================="
echo ""

echo "📡 Testando listar instâncias..."
curl -s -w "\n📊 HTTP Status: %{http_code}\n" \
  -H "apikey: $API_KEY" \
  https://evo.boravendermuito.com.br/instance/fetchInstances \
  | head -20

echo ""
echo "---"
echo ""

# ========================================================================
# TESTE 2: URL COM /api
# ========================================================================
echo "========================================================================="
echo "TESTE 2: https://evo.boravendermuito.com.br/api/ (COM /api)"
echo "========================================================================="
echo ""

echo "📡 Testando listar instâncias..."
curl -s -w "\n📊 HTTP Status: %{http_code}\n" \
  -H "apikey: $API_KEY" \
  https://evo.boravendermuito.com.br/api/instance/fetchInstances \
  | head -20

echo ""
echo "---"
echo ""

# ========================================================================
# TESTE 3: URL COM /manager (atual - retorna HTML)
# ========================================================================
echo "========================================================================="
echo "TESTE 3: https://evo.boravendermuito.com.br/manager/ (ATUAL)"
echo "========================================================================="
echo ""

echo "📡 Testando listar instâncias..."
curl -s -w "\n📊 HTTP Status: %{http_code}\n" \
  -H "apikey: $API_KEY" \
  https://evo.boravendermuito.com.br/manager/instance/fetchInstances \
  | head -20

echo ""
echo "---"
echo ""

# ========================================================================
# TESTE 4: URL COM /v1
# ========================================================================
echo "========================================================================="
echo "TESTE 4: https://evo.boravendermuito.com.br/v1/ (COM /v1)"
echo "========================================================================="
echo ""

echo "📡 Testando listar instâncias..."
curl -s -w "\n📊 HTTP Status: %{http_code}\n" \
  -H "apikey: $API_KEY" \
  https://evo.boravendermuito.com.br/v1/instance/fetchInstances \
  | head -20

echo ""
echo "---"
echo ""

# ========================================================================
# RESUMO
# ========================================================================
echo "========================================================================="
echo "📋 RESUMO"
echo "========================================================================="
echo ""
echo "✅ Se você viu JSON (com { ou [), essa é a URL CORRETA!"
echo "❌ Se você viu HTML (com <!doctype html>), essa URL está ERRADA!"
echo ""
echo "🎯 PRÓXIMO PASSO:"
echo "Identifique qual teste retornou JSON e use essa URL como base."
echo ""
echo "Exemplos:"
echo "  - Se TESTE 1 funcionou: EVOLUTION_API_URL=https://evo.boravendermuito.com.br"
echo "  - Se TESTE 2 funcionou: EVOLUTION_API_URL=https://evo.boravendermuito.com.br/api"
echo "  - Se TESTE 4 funcionou: EVOLUTION_API_URL=https://evo.boravendermuito.com.br/v1"
echo ""
echo "========================================================================="
