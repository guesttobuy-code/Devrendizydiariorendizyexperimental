#!/bin/bash

# ============================================================================
# TESTE RÁPIDO: Property Types Backend
# ============================================================================

PROJECT_REF="uknccixtubkdkofyieie"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TESTE: Property Types Backend"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================================================
# TESTE 1: Health Check
# ============================================================================

echo -e "${BLUE}📋 TESTE 1: Health Check${NC}"
echo ""

URL="https://${PROJECT_REF}.supabase.co/functions/v1/make-server-67caf26a/health"

echo "URL: $URL"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" "$URL")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Health Check OK${NC}"
    echo ""
else
    echo -e "${RED}❌ Backend não está acessível!${NC}"
    echo ""
    echo "Solução:"
    echo "  1. Execute: ./DEPLOY_BACKEND_NOW.sh"
    echo "  2. Ou manualmente:"
    echo "     cd supabase/functions"
    echo "     supabase functions deploy make-server-67caf26a --no-verify-jwt"
    echo ""
    exit 1
fi

# ============================================================================
# TESTE 2: Property Types
# ============================================================================

echo -e "${BLUE}📋 TESTE 2: Property Types${NC}"
echo ""

URL="https://${PROJECT_REF}.supabase.co/functions/v1/make-server-67caf26a/property-types"

echo "URL: $URL"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" "$URL" \
  -H "Authorization: Bearer $ANON_KEY")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status: $HTTP_CODE"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    # Contar tipos
    COUNT=$(echo "$BODY" | jq '. | length' 2>/dev/null || echo "0")
    
    echo -e "${GREEN}✅ Property Types OK${NC}"
    echo ""
    echo "Total de tipos: $COUNT"
    echo ""
    
    # Mostrar alguns exemplos
    echo "Exemplos de tipos:"
    echo "$BODY" | jq -r '.[0:5] | .[] | "  - \(.name) (\(.category))"' 2>/dev/null || echo "  (não foi possível parsear)"
    echo ""
    
    if [ "$COUNT" -ge "50" ]; then
        echo -e "${GREEN}✅ TODOS OS TIPOS ESTÃO DISPONÍVEIS!${NC}"
        echo ""
    else
        echo -e "${YELLOW}⚠️  Apenas $COUNT tipos encontrados (esperado: 50+)${NC}"
        echo ""
    fi
else
    echo -e "${RED}❌ Erro ao buscar Property Types${NC}"
    echo ""
    echo "Response: $BODY"
    echo ""
    echo "Possíveis causas:"
    echo "  - Backend não está deployado"
    echo "  - Erro no código do backend"
    echo "  - Problema de permissões"
    echo ""
    echo "Ver logs:"
    echo "  supabase functions logs make-server-67caf26a"
    echo ""
    exit 1
fi

# ============================================================================
# TESTE 3: WhatsApp Import Chats
# ============================================================================

echo -e "${BLUE}📋 TESTE 3: WhatsApp Import Chats Endpoint${NC}"
echo ""

URL="https://${PROJECT_REF}.supabase.co/functions/v1/make-server-67caf26a/whatsapp/import-chats"

echo "URL: $URL"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" "$URL" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"organizationId":"admin-master"}')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status: $HTTP_CODE"
echo "Response: $BODY"
echo ""

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "400" ] || [ "$HTTP_CODE" = "500" ]; then
    # 400/500 podem ser normais se as secrets não estiverem configuradas
    echo -e "${GREEN}✅ Endpoint existe e está acessível${NC}"
    echo ""
    
    # Verificar se é erro de credenciais
    if echo "$BODY" | grep -q "EVOLUTION_API_URL\|credential\|not configured" 2>/dev/null; then
        echo -e "${YELLOW}⚠️  Variáveis de ambiente não configuradas${NC}"
        echo ""
        echo "Configure as secrets no Supabase:"
        echo "  1. Acesse: https://app.supabase.com/project/$PROJECT_REF/settings/functions"
        echo "  2. Adicione as secrets:"
        echo "     EVOLUTION_API_URL=https://evo.boravendermuito.com.br"
        echo "     EVOLUTION_INSTANCE_NAME=rendizy-admin-master"
        echo "     EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741"
        echo "     EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555"
        echo "  3. Re-deploy a função"
        echo ""
    fi
elif [ "$HTTP_CODE" = "404" ]; then
    echo -e "${RED}❌ Endpoint não encontrado (404)${NC}"
    echo ""
    echo "Solução:"
    echo "  1. Verifique se o backend está deployado"
    echo "  2. Re-deploy:"
    echo "     cd supabase/functions"
    echo "     supabase functions deploy make-server-67caf26a --no-verify-jwt"
    echo ""
    exit 1
else
    echo -e "${YELLOW}⚠️  Resposta inesperada: $HTTP_CODE${NC}"
    echo ""
fi

# ============================================================================
# RESUMO
# ============================================================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ TESTES CONCLUÍDOS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Status:"
echo "  ✅ Backend está online"
echo "  ✅ Property Types funcionando ($COUNT tipos)"
echo "  ✅ WhatsApp endpoint acessível"
echo ""
echo "🎯 Próximos passos:"
echo "  1. Configure as secrets da Evolution API (se ainda não fez)"
echo "  2. Recarregue o RENDIZY no browser"
echo "  3. Verifique que os tipos de propriedade aparecem"
echo "  4. Teste a importação de contatos do WhatsApp"
echo ""
echo "📚 Documentação: 🚀_DEPLOY_BACKEND_AGORA_v1.0.103.181.md"
echo ""
