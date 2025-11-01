#!/bin/bash

# ========================================
# TESTE DE CREDENCIAIS WHATSAPP EVOLUTION API
# ========================================

echo "🔐 TESTE DE CREDENCIAIS WHATSAPP (Evolution API)"
echo "================================================"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ========================================
# COLETA DE CREDENCIAIS
# ========================================

echo -e "${BLUE}📋 Digite suas credenciais:${NC}"
echo ""

read -p "URL da Evolution API (ex: https://evo.boravendermuito.com.br): " API_URL
read -p "Nome da Instância (ex: rendizy-admin-master): " INSTANCE_NAME
read -p "API Key: " API_KEY

echo ""

# Limpar URL
API_URL=$(echo "$API_URL" | sed 's:/*$::' | sed 's:/manager::')

echo -e "${BLUE}📡 Testando credenciais...${NC}"
echo ""
echo "URL: $API_URL"
echo "Instance: $INSTANCE_NAME"
echo "API Key: ${API_KEY:0:20}..."
echo ""

# ========================================
# TESTE 1: VERIFICAR SE SERVIDOR ESTÁ ONLINE
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}TESTE 1: Servidor Online${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL")

if [ "$HTTP_CODE" = "000" ]; then
    echo -e "${RED}❌ FALHA: Servidor não acessível${NC}"
    echo ""
    echo "Possíveis causas:"
    echo "  - URL incorreta"
    echo "  - Servidor offline"
    echo "  - Sem conexão com internet"
    echo ""
    exit 1
elif [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "404" ]; then
    echo -e "${GREEN}✅ Servidor está online (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${YELLOW}⚠️  Servidor respondeu com HTTP $HTTP_CODE${NC}"
fi

echo ""

# ========================================
# TESTE 2: VERIFICAR API KEY
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}TESTE 2: Validar API Key${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Tentar listar instâncias
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X GET "$API_URL/instance/fetchInstances" \
  -H "apikey: $API_KEY")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status HTTP: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" = "401" ]; then
    echo -e "${RED}❌ FALHA: API Key INVÁLIDA${NC}"
    echo ""
    echo "A API Key que você forneceu está incorreta ou expirada."
    echo ""
    echo "Resposta do servidor:"
    echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
    echo ""
    echo "Como resolver:"
    echo "  1. Acesse o Manager: $API_URL/manager"
    echo "  2. Vá em Settings > API Configuration"
    echo "  3. Copie a API Key correta"
    echo "  4. Execute este script novamente"
    echo ""
    exit 1
elif [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ API Key VÁLIDA${NC}"
    echo ""
    echo "Instâncias disponíveis:"
    echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
    echo ""
else
    echo -e "${YELLOW}⚠️  Resposta inesperada (HTTP $HTTP_CODE)${NC}"
    echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
    echo ""
fi

# ========================================
# TESTE 3: VERIFICAR SE INSTÂNCIA EXISTE
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}TESTE 3: Verificar Instância${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X GET "$API_URL/instance/connectionState/$INSTANCE_NAME" \
  -H "apikey: $API_KEY")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status HTTP: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" = "404" ]; then
    echo -e "${YELLOW}⚠️  Instância NÃO EXISTE${NC}"
    echo ""
    echo "A instância '$INSTANCE_NAME' não foi encontrada."
    echo ""
    echo "Opções:"
    echo "  A) Usar uma instância existente (veja lista acima)"
    echo "  B) Criar nova instância no RENDIZY (recomendado)"
    echo "  C) Criar manualmente no Manager"
    echo ""
    
    # Listar instâncias disponíveis
    echo "Tentando listar instâncias disponíveis..."
    INSTANCES=$(curl -s \
      -X GET "$API_URL/instance/fetchInstances" \
      -H "apikey: $API_KEY")
    
    echo "$INSTANCES" | jq -r '.[] | "  - " + .instance.instanceName' 2>/dev/null || echo "Não foi possível listar"
    echo ""
    
elif [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Instância EXISTE${NC}"
    echo ""
    echo "Detalhes da instância:"
    echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
    echo ""
    
    # Verificar se está conectada
    STATUS=$(echo "$BODY" | jq -r '.instance.status' 2>/dev/null)
    if [ "$STATUS" = "open" ]; then
        echo -e "${GREEN}✅ WhatsApp já está CONECTADO!${NC}"
        echo ""
        PHONE=$(echo "$BODY" | jq -r '.phoneNumber // "Não disponível"' 2>/dev/null)
        echo "Número: $PHONE"
    else
        echo -e "${YELLOW}⚠️  WhatsApp NÃO conectado (status: $STATUS)${NC}"
        echo ""
        echo "Você precisa gerar um QR Code e escanear com WhatsApp."
    fi
    echo ""
else
    echo -e "${RED}❌ Erro inesperado (HTTP $HTTP_CODE)${NC}"
    echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
    echo ""
fi

# ========================================
# RESUMO FINAL
# ========================================

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 RESUMO DOS TESTES${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar quais testes passaram
TESTS_PASSED=0
TESTS_TOTAL=3

# Teste 1: Servidor online
if [ "$HTTP_CODE" != "000" ]; then
    TESTS_PASSED=$((TESTS_PASSED + 1))
    echo -e "${GREEN}✅ Teste 1: Servidor está acessível${NC}"
else
    echo -e "${RED}❌ Teste 1: Servidor não acessível${NC}"
fi

# Teste 2 e 3: Precisamos guardar os resultados...
# Por simplicidade, vamos dar um resumo geral

echo ""
echo "Próximos passos:"
echo ""

if [ "$HTTP_CODE" = "401" ]; then
    echo "1. ❌ Corrigir API Key (está INVÁLIDA)"
    echo "   → Acesse: $API_URL/manager"
    echo "   → Copie a API Key correta em Settings"
    echo ""
elif [ "$HTTP_CODE" = "404" ]; then
    echo "1. ✅ API Key está correta"
    echo "2. ⚠️  Instância não existe ou nome incorreto"
    echo ""
    echo "Opções:"
    echo "   A) No RENDIZY, use estas credenciais e clique 'Gerar QR Code'"
    echo "      (Criará a instância automaticamente)"
    echo ""
    echo "   B) Ou use uma instância existente (veja lista acima)"
    echo ""
elif [ "$HTTP_CODE" = "200" ]; then
    echo "1. ✅ API Key está correta"
    echo "2. ✅ Instância existe"
    echo ""
    echo "No RENDIZY:"
    echo "   1. Configure estas credenciais em:"
    echo "      Configurações → Integrações → WhatsApp"
    echo ""
    echo "   2. Clique 'Salvar Configurações'"
    echo ""
    echo "   3. Clique 'Gerar QR Code'"
    echo ""
    echo "   4. Escaneie com WhatsApp"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
