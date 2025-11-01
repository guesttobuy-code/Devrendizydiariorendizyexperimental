#!/bin/bash

# ============================================================================
# TESTE RÁPIDO: WhatsApp Import - Erro 404
# ============================================================================

echo "🧪 TESTANDO IMPORTAÇÃO WHATSAPP - Diagnóstico Erro 404"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PROJECT_ID="uknccixtubkdkofyieie"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"

BASE_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a"

# ============================================================================
# TESTE 1: Health Check
# ============================================================================

echo -e "${BLUE}📋 TESTE 1: Health Check${NC}"
echo ""

HEALTH_URL="${BASE_URL}/health"
echo "URL: ${HEALTH_URL}"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" "${HEALTH_URL}")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status HTTP: ${HTTP_CODE}"
echo "Resposta:"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Backend está ONLINE!${NC}"
    echo ""
else
    echo -e "${RED}❌ Backend está OFFLINE!${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  SOLUÇÃO: Execute deploy do backend:${NC}"
    echo ""
    echo "    bash DEPLOY_BACKEND_NOW.sh"
    echo ""
    echo "Ou manualmente:"
    echo "    supabase login"
    echo "    supabase link --project-ref uknccixtubkdkofyieie"
    echo "    cd supabase/functions"
    echo "    supabase functions deploy make-server-67caf26a --no-verify-jwt"
    echo "    cd ../.."
    echo ""
    exit 1
fi

# ============================================================================
# TESTE 2: WhatsApp Chats Endpoint
# ============================================================================

echo -e "${BLUE}📋 TESTE 2: WhatsApp Chats Endpoint${NC}"
echo ""

CHATS_URL="${BASE_URL}/whatsapp/chats"
echo "URL: ${CHATS_URL}"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" "${CHATS_URL}" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -H "Content-Type: application/json")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status HTTP: ${HTTP_CODE}"
echo "Resposta:"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "404" ]; then
    echo -e "${RED}❌ ERRO 404: Rota não encontrada!${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  CAUSA:${NC} Backend não está deployado ou rota não existe"
    echo ""
    echo -e "${YELLOW}⚠️  SOLUÇÃO:${NC}"
    echo "    1. Deploy do backend:"
    echo "       bash DEPLOY_BACKEND_NOW.sh"
    echo ""
    echo "    2. Aguardar 30 segundos"
    echo ""
    echo "    3. Executar este teste novamente"
    echo ""
    exit 1
    
elif [ "$HTTP_CODE" = "400" ]; then
    echo -e "${YELLOW}⚠️  Erro 400: Configuração inválida${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  CAUSA:${NC} Variáveis de ambiente não configuradas"
    echo ""
    echo -e "${YELLOW}⚠️  SOLUÇÃO:${NC}"
    echo "    cd supabase"
    echo "    supabase secrets set EVOLUTION_API_URL=\"https://evo.boravendermuito.com.br\""
    echo "    supabase secrets set EVOLUTION_INSTANCE_NAME=\"Rendizy\""
    echo "    supabase secrets set EVOLUTION_GLOBAL_API_KEY=\"4de7861e944e291b56fe9781d2b00b36\""
    echo "    supabase secrets set EVOLUTION_INSTANCE_TOKEN=\"0FF3641E80A6-453C-AB4E-28C2F2D01C50\""
    echo "    cd .."
    echo ""
    echo "    Depois REDEPLOY:"
    echo "    cd supabase/functions"
    echo "    supabase functions deploy make-server-67caf26a --no-verify-jwt"
    echo "    cd ../.."
    echo ""
    
elif [ "$HTTP_CODE" = "500" ]; then
    echo -e "${YELLOW}⚠️  Erro 500: Evolution API não acessível${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  CAUSA:${NC} Evolution API offline ou instância não conectada"
    echo ""
    echo -e "${YELLOW}⚠️  SOLUÇÃO:${NC}"
    echo "    1. Verificar se Evolution API está online:"
    echo "       curl https://evo.boravendermuito.com.br/instance/fetchInstances"
    echo ""
    echo "    2. Conectar instância via QR Code (se necessário)"
    echo ""
    echo "    3. Ver logs para mais detalhes:"
    echo "       supabase functions logs make-server-67caf26a"
    echo ""
    
elif [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Endpoint WhatsApp Chats está FUNCIONANDO!${NC}"
    echo ""
    
    # Verificar se retornou conversas
    CHATS_COUNT=$(echo "$BODY" | jq '.data | length' 2>/dev/null || echo "0")
    
    if [ "$CHATS_COUNT" -gt "0" ]; then
        echo -e "${GREEN}✅ ${CHATS_COUNT} conversas encontradas!${NC}"
        echo ""
        echo "Primeira conversa (exemplo):"
        echo "$BODY" | jq '.data[0]' 2>/dev/null || echo "Erro ao parsear JSON"
        echo ""
    else
        echo -e "${YELLOW}⚠️  Nenhuma conversa encontrada${NC}"
        echo ""
        echo "Possíveis causas:"
        echo "  - WhatsApp não está conectado"
        echo "  - Instância não tem conversas ativas"
        echo "  - API retornou formato diferente"
        echo ""
    fi
    
else
    echo -e "${RED}❌ Status inesperado: ${HTTP_CODE}${NC}"
    echo ""
fi

# ============================================================================
# TESTE 3: Evolution API Direta
# ============================================================================

echo ""
echo -e "${BLUE}📋 TESTE 3: Evolution API Direta${NC}"
echo ""

EVOLUTION_URL="https://evo.boravendermuito.com.br/instance/fetchInstances"
EVOLUTION_API_KEY="4de7861e944e291b56fe9781d2b00b36"

echo "URL: ${EVOLUTION_URL}"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" "${EVOLUTION_URL}" \
  -H "Authorization: Bearer ${EVOLUTION_API_KEY}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status HTTP: ${HTTP_CODE}"
echo "Resposta:"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Evolution API está ONLINE!${NC}"
    echo ""
    
    # Procurar instância Rendizy
    INSTANCE_STATUS=$(echo "$BODY" | jq -r '.[] | select(.instance.instanceName == "Rendizy") | .instance.status' 2>/dev/null)
    
    if [ -n "$INSTANCE_STATUS" ]; then
        if [ "$INSTANCE_STATUS" = "open" ]; then
            echo -e "${GREEN}✅ Instância 'Rendizy' está CONECTADA!${NC}"
            echo ""
        else
            echo -e "${YELLOW}⚠️  Instância 'Rendizy' está ${INSTANCE_STATUS}${NC}"
            echo ""
            echo "Conecte o WhatsApp via QR Code"
            echo ""
        fi
    else
        echo -e "${YELLOW}⚠️  Instância 'Rendizy' não encontrada${NC}"
        echo ""
        echo "Instâncias disponíveis:"
        echo "$BODY" | jq -r '.[].instance.instanceName' 2>/dev/null || echo "Nenhuma"
        echo ""
    fi
    
else
    echo -e "${RED}❌ Evolution API não está acessível!${NC}"
    echo ""
    echo "Verifique:"
    echo "  1. URL está correta: https://evo.boravendermuito.com.br"
    echo "  2. API Key está correta"
    echo "  3. Servidor está online"
    echo ""
fi

# ============================================================================
# RESUMO FINAL
# ============================================================================

echo ""
echo "═══════════════════════════════════════════════════════════"
echo -e "${BLUE}📊 RESUMO DOS TESTES${NC}"
echo "═══════════════════════════════════════════════════════════"
echo ""

if [ "$HTTP_CODE" = "200" ] && [ "$INSTANCE_STATUS" = "open" ]; then
    echo -e "${GREEN}✅ TUDO OK! Sistema pronto para importar conversas${NC}"
    echo ""
    echo "🎯 Próximo passo:"
    echo "   1. Abrir RENDIZY no navegador"
    echo "   2. Ir em Chat (menu lateral)"
    echo "   3. Clicar em 'Importar Conversas WhatsApp'"
    echo ""
else
    echo -e "${YELLOW}⚠️  Alguns problemas foram detectados${NC}"
    echo ""
    echo "Leia as soluções acima e:"
    echo "  1. Corrija os problemas"
    echo "  2. Execute este teste novamente"
    echo ""
fi

echo "📚 Documentação: FIX_404_WHATSAPP_IMPORT_v1.0.103.176.md"
echo ""
