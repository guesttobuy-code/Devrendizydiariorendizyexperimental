#!/bin/bash

# ============================================================================
# RENDIZY - Deploy Backend com CORS Fix
# v1.0.103.209
# ============================================================================

echo "🚀 DEPLOY BACKEND - CORS FIX"
echo "======================================"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se Supabase CLI está instalado
if ! command -v supabase &> /dev/null
then
    echo -e "${RED}❌ Supabase CLI não instalado${NC}"
    echo ""
    echo "Instale com:"
    echo "  npm install -g supabase"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Supabase CLI encontrado${NC}"
echo ""

# Project ID
PROJECT_ID="uknccixtubkdkofyieie"
FUNCTION_NAME="make-server-67caf26a"

echo "📦 Projeto: $PROJECT_ID"
echo "🔧 Função: $FUNCTION_NAME"
echo ""

# Verificar se está logado
echo "🔐 Verificando autenticação..."
if ! supabase projects list &> /dev/null
then
    echo -e "${YELLOW}⚠️  Não autenticado. Fazendo login...${NC}"
    supabase login
fi

echo -e "${GREEN}✅ Autenticado${NC}"
echo ""

# Linkar ao projeto
echo "🔗 Linkando ao projeto..."
supabase link --project-ref $PROJECT_ID 2>/dev/null || echo "Já linkado"
echo ""

# Deploy da função
echo "🚀 Fazendo deploy da função..."
echo ""
supabase functions deploy $FUNCTION_NAME --no-verify-jwt

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ DEPLOY REALIZADO COM SUCESSO!${NC}"
    echo ""
    
    # Aguardar propagação
    echo "⏳ Aguardando propagação (30 segundos)..."
    sleep 30
    
    # Testar endpoint
    echo ""
    echo "🧪 Testando endpoint..."
    echo ""
    
    HEALTH_URL="https://$PROJECT_ID.supabase.co/functions/v1/$FUNCTION_NAME/health"
    
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Backend está respondendo (HTTP $HTTP_CODE)${NC}"
        echo ""
        
        # Verificar CORS
        echo "🔍 Verificando CORS headers..."
        CORS_HEADER=$(curl -s -I -X OPTIONS \
            -H "Origin: https://suacasaavenda.com.br" \
            -H "Access-Control-Request-Method: GET" \
            $HEALTH_URL | grep -i "access-control-allow-origin")
        
        if [ -n "$CORS_HEADER" ]; then
            echo -e "${GREEN}✅ CORS configurado:${NC}"
            echo "   $CORS_HEADER"
        else
            echo -e "${YELLOW}⚠️  CORS header não encontrado (aguarde cache)${NC}"
        fi
    else
        echo -e "${RED}❌ Backend não respondeu (HTTP $HTTP_CODE)${NC}"
    fi
    
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo -e "${GREEN}🎉 DEPLOY CONCLUÍDO!${NC}"
    echo ""
    echo "📋 Próximos passos:"
    echo ""
    echo "1. Aguarde 2-3 minutos (cache do Supabase)"
    echo "2. Recarregue a página: Ctrl+Shift+R"
    echo "3. Clique em '🚀 Ambiente de Produção'"
    echo "4. Verifique console (F12)"
    echo "5. Deve ver: '✅ Backend conectado'"
    echo ""
    echo "🌐 Backend URL:"
    echo "   https://$PROJECT_ID.supabase.co/functions/v1/$FUNCTION_NAME"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    
else
    echo ""
    echo -e "${RED}❌ ERRO NO DEPLOY${NC}"
    echo ""
    echo "Tente deploy manual:"
    echo "1. Acesse: https://supabase.com/dashboard/project/$PROJECT_ID/functions"
    echo "2. Clique em '$FUNCTION_NAME'"
    echo "3. Clique em 'Deploy'"
    echo ""
    exit 1
fi
