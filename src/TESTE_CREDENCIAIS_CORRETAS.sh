#!/bin/bash

# ============================================================================
# TESTE RÁPIDO - WhatsApp com Global API Key Correta
# ============================================================================
# Versão: v1.0.103.63
# Data: 2025-10-30
# ============================================================================

echo ""
echo "🔵 ============================================================================"
echo "🔵 TESTE RÁPIDO - WhatsApp Evolution API"
echo "🔵 ============================================================================"
echo ""

# Credenciais corretas
API_URL="https://evo.boravendermuito.com.br"
INSTANCE_NAME="Rendizy"
GLOBAL_API_KEY="4de7861e944e291b56fe9781d2b00b36"

echo "📋 Credenciais Configuradas:"
echo "   URL: $API_URL"
echo "   Instância: $INSTANCE_NAME"
echo "   API Key: ${GLOBAL_API_KEY:0:20}..."
echo ""

# ============================================================================
# TESTE 1: Verificar Status da Instância
# ============================================================================
echo "🔵 TESTE 1: Verificar Status da Instância"
echo "   Endpoint: GET /instance/connectionState/$INSTANCE_NAME"
echo ""

response=$(curl -s -w "\n%{http_code}" \
  -X GET "$API_URL/instance/connectionState/$INSTANCE_NAME" \
  -H "Content-Type: application/json" \
  -H "apikey: $GLOBAL_API_KEY")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

echo "   Status HTTP: $http_code"
echo "   Resposta:"
echo "$body" | jq '.' 2>/dev/null || echo "$body"
echo ""

if [ "$http_code" = "200" ]; then
    echo "   ✅ Teste 1 PASSOU - Conexão OK"
    
    # Verificar se está conectado
    is_connected=$(echo "$body" | jq -r '.instance.state // "unknown"' 2>/dev/null)
    echo "   📊 Estado da Conexão: $is_connected"
    
    if [ "$is_connected" = "open" ]; then
        echo "   ✅ WhatsApp CONECTADO!"
    else
        echo "   ⚠️  WhatsApp NÃO CONECTADO (estado: $is_connected)"
    fi
elif [ "$http_code" = "401" ]; then
    echo "   ❌ Teste 1 FALHOU - Erro 401: API Key Inválida"
    echo "   ⚠️  Verifique se a Global API Key está correta"
elif [ "$http_code" = "404" ]; then
    echo "   ❌ Teste 1 FALHOU - Erro 404: Instância Não Encontrada"
    echo "   ⚠️  A instância '$INSTANCE_NAME' não existe no Evolution API"
    echo "   💡 Você precisa criar a instância primeiro (via 'Gerar QR Code' no RENDIZY)"
else
    echo "   ❌ Teste 1 FALHOU - Erro $http_code"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================================================
# TESTE 2: Listar Instâncias (Global API)
# ============================================================================
echo "🔵 TESTE 2: Listar Todas as Instâncias"
echo "   Endpoint: GET /instance/fetchInstances"
echo ""

response=$(curl -s -w "\n%{http_code}" \
  -X GET "$API_URL/instance/fetchInstances" \
  -H "Content-Type: application/json" \
  -H "apikey: $GLOBAL_API_KEY")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

echo "   Status HTTP: $http_code"
echo "   Resposta:"
echo "$body" | jq '.' 2>/dev/null || echo "$body"
echo ""

if [ "$http_code" = "200" ]; then
    echo "   ✅ Teste 2 PASSOU - Listagem OK"
    
    # Contar instâncias
    count=$(echo "$body" | jq 'length' 2>/dev/null || echo "0")
    echo "   📊 Total de Instâncias: $count"
    
    # Verificar se 'Rendizy' existe
    has_rendizy=$(echo "$body" | jq -r '.[] | select(.instance.instanceName == "Rendizy") | .instance.instanceName' 2>/dev/null)
    
    if [ -n "$has_rendizy" ]; then
        echo "   ✅ Instância 'Rendizy' ENCONTRADA!"
        
        # Mostrar detalhes da instância
        echo "   📋 Detalhes da Instância:"
        echo "$body" | jq '.[] | select(.instance.instanceName == "Rendizy")' 2>/dev/null
    else
        echo "   ⚠️  Instância 'Rendizy' NÃO ENCONTRADA"
        echo "   💡 Você precisa criar a instância (via 'Gerar QR Code' no RENDIZY)"
    fi
elif [ "$http_code" = "401" ]; then
    echo "   ❌ Teste 2 FALHOU - Erro 401: API Key Inválida"
    echo "   ⚠️  A Global API Key está incorreta"
else
    echo "   ❌ Teste 2 FALHOU - Erro $http_code"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================================================
# RESUMO FINAL
# ============================================================================
echo "📊 RESUMO DOS TESTES"
echo ""

if [ "$http_code" = "200" ]; then
    echo "✅ GLOBAL API KEY VÁLIDA!"
    echo "✅ Conexão com Evolution API OK!"
    echo ""
    echo "🎯 PRÓXIMOS PASSOS:"
    echo ""
    echo "1. Abra o RENDIZY: http://localhost:5173"
    echo "2. Vá para: Configurações → Integrações → WhatsApp"
    echo "3. Preencha:"
    echo "   - URL: $API_URL"
    echo "   - Instância: $INSTANCE_NAME"
    echo "   - API Key: $GLOBAL_API_KEY"
    echo "4. Clique em 'Salvar Configurações'"
    echo "5. Clique em 'Testar Conexão'"
    echo ""
    
    if [ -n "$has_rendizy" ] && [ "$is_connected" = "open" ]; then
        echo "✅ WhatsApp JÁ ESTÁ CONECTADO! 🎉"
        echo "   Você pode começar a usar o chat agora!"
    elif [ -n "$has_rendizy" ]; then
        echo "⚠️  Instância existe mas WhatsApp NÃO está conectado"
        echo "   Clique em 'Gerar QR Code' e escaneie com o WhatsApp"
    else
        echo "⚠️  Instância 'Rendizy' não existe ainda"
        echo "   Clique em 'Gerar QR Code' para criar e conectar"
    fi
else
    echo "❌ ERRO NA CONEXÃO!"
    echo ""
    echo "🔍 VERIFICAÇÕES:"
    echo ""
    echo "1. Global API Key está correta?"
    echo "   Esperado: 4de7861e944e291b56fe9781d2b00b36"
    echo "   Configurada: $GLOBAL_API_KEY"
    echo ""
    echo "2. URL da Evolution API está correta?"
    echo "   Esperado: https://evo.boravendermuito.com.br"
    echo "   Configurada: $API_URL"
    echo ""
    echo "3. A Evolution API está online?"
    echo "   Tente acessar: $API_URL/manager"
    echo ""
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 DOCUMENTAÇÃO:"
echo "   - CHANGELOG_v1.0.103.63_GLOBAL_API_KEY_CONFIGURADA.md"
echo "   - TESTE_AGORA_WHATSAPP_v1.0.103.63.md"
echo "   - COMO_PEGAR_GLOBAL_API_KEY_AGORA.md"
echo ""
echo "🔵 ============================================================================"
echo ""
