#!/bin/bash

# ========================================
# TESTE DE DEPLOY COMPLETO - RENDIZY
# ========================================

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

PROJECT_REF="uknccixtubkdkofyieie"
FUNCTION_NAME="make-server-67caf26a"
BASE_URL="https://${PROJECT_REF}.supabase.co/functions/v1/${FUNCTION_NAME}"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"

echo ""
echo -e "${CYAN}╔════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                ║${NC}"
echo -e "${CYAN}║     🚀 TESTE DE DEPLOY COMPLETO - RENDIZY     ║${NC}"
echo -e "${CYAN}║                                                ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════╝${NC}"
echo ""

TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# ========================================
# TESTE 1: HEALTH CHECK
# ========================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📋 TESTE 1: Health Check${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

TOTAL_TESTS=$((TOTAL_TESTS + 1))

URL="${BASE_URL}/health"
echo -e "${CYAN}🔗 URL: ${URL}${NC}"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" "$URL")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo -e "${CYAN}📊 Status HTTP: ${HTTP_CODE}${NC}"
echo -e "${CYAN}📦 Resposta:${NC}"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ TESTE 1 PASSOU: Backend está online!${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ TESTE 1 FALHOU: Backend não está acessível (HTTP $HTTP_CODE)${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

echo ""

# ========================================
# TESTE 2: PROPERTY TYPES
# ========================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📋 TESTE 2: Property Types (50+ tipos esperados)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

TOTAL_TESTS=$((TOTAL_TESTS + 1))

URL="${BASE_URL}/property-types"
echo -e "${CYAN}🔗 URL: ${URL}${NC}"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" "$URL" \
  -H "Authorization: Bearer $ANON_KEY")
  
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo -e "${CYAN}📊 Status HTTP: ${HTTP_CODE}${NC}"

if [ "$HTTP_CODE" = "200" ]; then
    # Contar quantos tipos foram retornados
    COUNT=$(echo "$BODY" | jq '. | length' 2>/dev/null || echo "0")
    
    echo -e "${CYAN}📦 Tipos retornados: ${COUNT}${NC}"
    echo ""
    
    if [ "$COUNT" -ge "50" ]; then
        echo -e "${GREEN}✅ TESTE 2 PASSOU: ${COUNT} tipos carregados (esperado: 50+)${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        
        # Mostrar primeiros 5 tipos como amostra
        echo ""
        echo -e "${CYAN}📝 Amostra dos primeiros 5 tipos:${NC}"
        echo "$BODY" | jq '.[0:5] | .[] | {id, name, type, category}' 2>/dev/null || echo "Erro ao parsear JSON"
    else
        echo -e "${YELLOW}⚠️  TESTE 2 PARCIAL: Apenas ${COUNT} tipos (esperado: 50+)${NC}"
        echo ""
        echo -e "${YELLOW}Possíveis causas:${NC}"
        echo -e "${YELLOW}  - Backend está usando dados mockados${NC}"
        echo -e "${YELLOW}  - Seed não foi executado${NC}"
        echo -e "${YELLOW}  - Erro na primeira chamada${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
else
    echo -e "${CYAN}📦 Resposta:${NC}"
    echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
    echo ""
    echo -e "${RED}❌ TESTE 2 FALHOU: Endpoint não acessível (HTTP $HTTP_CODE)${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

echo ""

# ========================================
# TESTE 3: WHATSAPP IMPORT ENDPOINT
# ========================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📋 TESTE 3: WhatsApp Import Endpoint${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

TOTAL_TESTS=$((TOTAL_TESTS + 1))

URL="${BASE_URL}/whatsapp/import-chats"
echo -e "${CYAN}🔗 URL: ${URL}${NC}"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" "$URL" \
  -X POST \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"organizationId":"admin-master"}')
  
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo -e "${CYAN}📊 Status HTTP: ${HTTP_CODE}${NC}"
echo -e "${CYAN}📦 Resposta:${NC}"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" != "404" ]; then
    echo -e "${GREEN}✅ TESTE 3 PASSOU: Endpoint existe (HTTP $HTTP_CODE)${NC}"
    echo ""
    echo -e "${CYAN}ℹ️  Nota: Pode retornar erro se WhatsApp não estiver conectado,${NC}"
    echo -e "${CYAN}   mas o importante é que o endpoint existe (não é 404).${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
else
    echo -e "${RED}❌ TESTE 3 FALHOU: Endpoint não encontrado (404)${NC}"
    echo ""
    echo -e "${RED}Possíveis causas:${NC}"
    echo -e "${RED}  - Backend não foi deployado corretamente${NC}"
    echo -e "${RED}  - Rota /whatsapp/import-chats não existe${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
fi

echo ""

# ========================================
# TESTE 4: VERIFICAR SECRETS
# ========================================

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📋 TESTE 4: Verificar Secrets Configuradas${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

TOTAL_TESTS=$((TOTAL_TESTS + 1))

echo -e "${CYAN}🔍 Verificando secrets via Supabase CLI...${NC}"
echo ""

if command -v supabase &> /dev/null; then
    SECRETS=$(supabase secrets list 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        echo "$SECRETS"
        echo ""
        
        # Verificar se as 4 secrets necessárias existem
        REQUIRED_SECRETS=(
            "EVOLUTION_API_URL"
            "EVOLUTION_INSTANCE_NAME"
            "EVOLUTION_GLOBAL_API_KEY"
            "EVOLUTION_INSTANCE_TOKEN"
        )
        
        MISSING_SECRETS=()
        
        for SECRET in "${REQUIRED_SECRETS[@]}"; do
            if ! echo "$SECRETS" | grep -q "$SECRET"; then
                MISSING_SECRETS+=("$SECRET")
            fi
        done
        
        if [ ${#MISSING_SECRETS[@]} -eq 0 ]; then
            echo -e "${GREEN}✅ TESTE 4 PASSOU: Todas as 4 secrets estão configuradas!${NC}"
            PASSED_TESTS=$((PASSED_TESTS + 1))
        else
            echo -e "${YELLOW}⚠️  TESTE 4 PARCIAL: Faltam ${#MISSING_SECRETS[@]} secret(s):${NC}"
            for SECRET in "${MISSING_SECRETS[@]}"; do
                echo -e "${YELLOW}   - $SECRET${NC}"
            done
            echo ""
            echo -e "${YELLOW}Para configurar as secrets faltantes:${NC}"
            echo ""
            for SECRET in "${MISSING_SECRETS[@]}"; do
                case "$SECRET" in
                    "EVOLUTION_API_URL")
                        echo "  supabase secrets set EVOLUTION_API_URL=https://evo.boravendermuito.com.br"
                        ;;
                    "EVOLUTION_INSTANCE_NAME")
                        echo "  supabase secrets set EVOLUTION_INSTANCE_NAME=rendizy-admin-master"
                        ;;
                    "EVOLUTION_GLOBAL_API_KEY")
                        echo "  supabase secrets set EVOLUTION_GLOBAL_API_KEY=F7DE5EFFB66B-4E43-B11F-F0D5D8849741"
                        ;;
                    "EVOLUTION_INSTANCE_TOKEN")
                        echo "  supabase secrets set EVOLUTION_INSTANCE_TOKEN=E9E7BE03F0A4-422C-BB1D-5A1CA7F25555"
                        ;;
                esac
            done
            echo ""
            echo -e "${YELLOW}Depois de configurar, RE-DEPLOY:${NC}"
            echo "  cd supabase/functions"
            echo "  supabase functions deploy make-server-67caf26a --no-verify-jwt"
            echo "  cd ../.."
            
            FAILED_TESTS=$((FAILED_TESTS + 1))
        fi
    else
        echo -e "${YELLOW}⚠️  TESTE 4 IGNORADO: Não foi possível listar secrets${NC}"
        echo -e "${YELLOW}   (Pode ser que você não esteja logado no Supabase CLI)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  TESTE 4 IGNORADO: Supabase CLI não encontrado${NC}"
fi

echo ""

# ========================================
# RESUMO FINAL
# ========================================

echo ""
echo -e "${CYAN}╔════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                ║${NC}"
echo -e "${CYAN}║              📊 RESUMO DOS TESTES              ║${NC}"
echo -e "${CYAN}║                                                ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}Total de testes:${NC} $TOTAL_TESTS"
echo -e "${GREEN}Testes passaram:${NC} $PASSED_TESTS"
echo -e "${RED}Testes falharam:${NC} $FAILED_TESTS"
echo ""

PERCENTAGE=$((PASSED_TESTS * 100 / TOTAL_TESTS))

if [ "$PASSED_TESTS" = "$TOTAL_TESTS" ]; then
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ SUCESSO! TODOS OS TESTES PASSARAM! ($PERCENTAGE%)${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${GREEN}🎉 Seu backend está 100% deployado e funcionando!${NC}"
    echo ""
    echo -e "${CYAN}🎯 Próximos passos:${NC}"
    echo ""
    echo "  1. Abra o RENDIZY no navegador"
    echo "  2. Recarregue a página (Ctrl+R ou Cmd+R)"
    echo "  3. Verifique no console do navegador:"
    echo "     ✅ Property types carregados do backend: 53 tipos"
    echo ""
    echo "  4. Teste o WhatsApp:"
    echo "     - Vá em: Configurações > Integrações > WhatsApp"
    echo "     - Clique em 'Importar Contatos'"
    echo "     - Não deve dar erro 404"
    echo ""
    exit 0
elif [ "$PERCENTAGE" -ge "75" ]; then
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}⚠️  PARCIAL! $PASSED_TESTS/$TOTAL_TESTS testes passaram ($PERCENTAGE%)${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}🔍 Revise os testes que falharam acima${NC}"
    echo ""
    exit 1
else
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}❌ FALHOU! Apenas $PASSED_TESTS/$TOTAL_TESTS testes passaram ($PERCENTAGE%)${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${RED}🆘 O backend não está funcionando corretamente${NC}"
    echo ""
    echo -e "${CYAN}Possíveis soluções:${NC}"
    echo ""
    echo "  1. Verificar se o deploy foi feito:"
    echo "     supabase functions list"
    echo ""
    echo "  2. Ver logs de erro:"
    echo "     supabase functions logs make-server-67caf26a"
    echo ""
    echo "  3. Forçar re-deploy:"
    echo "     cd supabase/functions"
    echo "     supabase functions deploy make-server-67caf26a --no-verify-jwt"
    echo "     cd ../.."
    echo ""
    echo "  4. Ver guia completo:"
    echo "     cat 🎯_GUIA_DEPLOY_BACKEND_PASSO_A_PASSO.md"
    echo ""
    exit 1
fi
