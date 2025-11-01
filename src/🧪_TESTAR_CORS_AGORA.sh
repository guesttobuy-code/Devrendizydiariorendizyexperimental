#!/bin/bash

# ============================================================================
# RENDIZY - Teste CORS
# v1.0.103.209
# ============================================================================

echo "🧪 TESTE CORS - RENDIZY"
echo "======================================"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
PROJECT_ID="uknccixtubkdkofyieie"
FUNCTION_NAME="make-server-67caf26a"
BASE_URL="https://$PROJECT_ID.supabase.co/functions/v1/$FUNCTION_NAME"
DOMAIN="https://suacasaavenda.com.br"

echo -e "${BLUE}📋 Configurações:${NC}"
echo "   Backend: $BASE_URL"
echo "   Domínio: $DOMAIN"
echo ""

# ============================================================================
# TESTE 1: Health Check
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}TESTE 1: Health Check${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/health")

echo "URL: $BASE_URL/health"
echo "HTTP Status: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Backend está online (HTTP 200)${NC}"
else
    echo -e "${RED}❌ Backend não respondeu (HTTP $HTTP_CODE)${NC}"
    echo ""
    echo "Possíveis causas:"
    echo "  • Backend não foi deployado"
    echo "  • URL incorreta"
    echo "  • Função não existe"
    echo ""
    exit 1
fi

echo ""

# ============================================================================
# TESTE 2: CORS Headers (OPTIONS Preflight)
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}TESTE 2: CORS Headers (Preflight Request)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Testando CORS do domínio: $DOMAIN"
echo ""

# Fazer requisição OPTIONS
RESPONSE=$(curl -s -I -X OPTIONS \
    -H "Origin: $DOMAIN" \
    -H "Access-Control-Request-Method: GET" \
    -H "Access-Control-Request-Headers: Content-Type, Authorization" \
    "$BASE_URL/organizations")

echo "$RESPONSE"
echo ""

# Verificar header CORS
CORS_ORIGIN=$(echo "$RESPONSE" | grep -i "access-control-allow-origin" | tr -d '\r')
CORS_METHODS=$(echo "$RESPONSE" | grep -i "access-control-allow-methods" | tr -d '\r')
CORS_HEADERS=$(echo "$RESPONSE" | grep -i "access-control-allow-headers" | tr -d '\r')

if [ -n "$CORS_ORIGIN" ]; then
    echo -e "${GREEN}✅ CORS Origin configurado:${NC}"
    echo "   $CORS_ORIGIN"
    echo ""
    
    if [[ "$CORS_ORIGIN" == *"*"* ]]; then
        echo -e "${GREEN}✅ CORS aberto (aceita qualquer origem)${NC}"
    elif [[ "$CORS_ORIGIN" == *"$DOMAIN"* ]]; then
        echo -e "${GREEN}✅ Seu domínio está permitido${NC}"
    else
        echo -e "${YELLOW}⚠️  Domínio diferente: $CORS_ORIGIN${NC}"
    fi
else
    echo -e "${RED}❌ Header CORS NÃO encontrado${NC}"
    echo ""
    echo "Isso significa que:"
    echo "  • CORS não está configurado"
    echo "  • Deploy não foi aplicado"
    echo "  • Cache ainda não atualizou"
    echo ""
    echo "Aguarde 2-3 minutos e tente novamente"
    exit 1
fi

echo ""

if [ -n "$CORS_METHODS" ]; then
    echo -e "${GREEN}✅ Métodos permitidos:${NC}"
    echo "   $CORS_METHODS"
else
    echo -e "${YELLOW}⚠️  Métodos não especificados${NC}"
fi

echo ""

if [ -n "$CORS_HEADERS" ]; then
    echo -e "${GREEN}✅ Headers permitidos:${NC}"
    echo "   $CORS_HEADERS"
else
    echo -e "${YELLOW}⚠️  Headers não especificados${NC}"
fi

echo ""

# ============================================================================
# TESTE 3: Requisição GET Real
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}TESTE 3: Requisição GET Real${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Fazendo requisição GET com Origin..."
echo ""

GET_RESPONSE=$(curl -s -i \
    -H "Origin: $DOMAIN" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMTg3NTgsImV4cCI6MjA0NDU5NDc1OH0.e-Gz6KR-oGqMsqk0KKaGTQ7_NjZVz9-1R4W-wARFNGg" \
    "$BASE_URL/organizations")

# Extrair headers
GET_HEADERS=$(echo "$GET_RESPONSE" | sed -n '1,/^\r$/p')

echo "Response Headers:"
echo "$GET_HEADERS"
echo ""

GET_CORS=$(echo "$GET_HEADERS" | grep -i "access-control-allow-origin" | tr -d '\r')

if [ -n "$GET_CORS" ]; then
    echo -e "${GREEN}✅ CORS header presente na resposta GET${NC}"
    echo "   $GET_CORS"
else
    echo -e "${RED}❌ CORS header AUSENTE na resposta GET${NC}"
fi

echo ""

# ============================================================================
# RESULTADO FINAL
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 RESULTADO FINAL${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

TESTS_PASSED=0
TESTS_TOTAL=3

# Teste 1
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ TESTE 1: Backend Online${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ TESTE 1: Backend Offline${NC}"
fi

# Teste 2
if [ -n "$CORS_ORIGIN" ]; then
    echo -e "${GREEN}✅ TESTE 2: CORS Configurado${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ TESTE 2: CORS Não Configurado${NC}"
fi

# Teste 3
if [ -n "$GET_CORS" ]; then
    echo -e "${GREEN}✅ TESTE 3: CORS em Requisições Reais${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ TESTE 3: CORS Ausente${NC}"
fi

echo ""
echo "Testes Passados: $TESTS_PASSED/$TESTS_TOTAL"
echo ""

if [ $TESTS_PASSED -eq $TESTS_TOTAL ]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}🎉 TODOS OS TESTES PASSARAM!${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Próximos passos:"
    echo "1. Recarregue a página: Ctrl+Shift+R"
    echo "2. Clique em '🚀 Ambiente de Produção'"
    echo "3. Verifique console (F12)"
    echo "4. Deve ver: '✅ Backend conectado'"
    echo ""
else
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${YELLOW}⚠️  ALGUNS TESTES FALHARAM${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
    if [ "$HTTP_CODE" != "200" ]; then
        echo "Problema: Backend não está online"
        echo "Solução: Fazer deploy do backend"
        echo ""
    fi
    
    if [ -z "$CORS_ORIGIN" ]; then
        echo "Problema: CORS não está configurado"
        echo "Solução:"
        echo "  1. Fazer deploy do backend"
        echo "  2. Aguardar 2-3 minutos (cache)"
        echo "  3. Rodar este teste novamente"
        echo ""
    fi
fi

echo ""
echo "🔗 Links Úteis:"
echo "   Dashboard: https://supabase.com/dashboard/project/$PROJECT_ID/functions"
echo "   Backend: $BASE_URL"
echo ""
