#!/bin/bash

# 🔍 Script de Diagnóstico do Backend RENDIZY
# Versão: v1.0.103.73
# Data: 30/10/2025

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║  🔍 DIAGNÓSTICO DO BACKEND RENDIZY                          ║"
echo "║     Verificando conectividade e configurações                ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
PROJECT_ID="uknccixtubkdkofyieie"
BASE_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a"
EVOLUTION_API_URL="https://evo.boravendermuito.com.br"
NEW_API_KEY="4de7861e944e291b56fe9781d2b00b36"
OLD_API_KEY="F7DE5EFFB66B-4E43-B11F-F0D5D8849741"
INSTANCE_NAME="Rendizy"

echo "📋 Configurações:"
echo "   Project ID: ${PROJECT_ID}"
echo "   Base URL: ${BASE_URL}"
echo "   Evolution API: ${EVOLUTION_API_URL}"
echo ""

# ============================================
# TESTE 1: Health Check do Backend
# ============================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📍 TESTE 1: Verificando Backend Health Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

HEALTH_URL="${BASE_URL}/health"
echo "🔗 URL: ${HEALTH_URL}"
echo ""

HTTP_CODE=$(curl -s -o /tmp/health_response.json -w "%{http_code}" "${HEALTH_URL}")

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Backend está ONLINE${NC}"
    echo ""
    echo "📄 Resposta:"
    cat /tmp/health_response.json | jq '.' 2>/dev/null || cat /tmp/health_response.json
    echo ""
    BACKEND_ONLINE=true
else
    echo -e "${RED}❌ Backend está OFFLINE ou inacessível${NC}"
    echo "   HTTP Code: ${HTTP_CODE}"
    echo ""
    echo "📄 Resposta:"
    cat /tmp/health_response.json 2>/dev/null || echo "(sem resposta)"
    echo ""
    echo -e "${YELLOW}📋 Possíveis soluções:${NC}"
    echo "   1. Verifique se Edge Function está deployada:"
    echo "      https://supabase.com/dashboard/project/${PROJECT_ID}/functions"
    echo ""
    echo "   2. Execute localmente:"
    echo "      cd supabase/functions && supabase functions serve"
    echo ""
    echo "   3. Faça deploy:"
    echo "      supabase functions deploy make-server-67caf26a"
    echo ""
    BACKEND_ONLINE=false
fi

# ============================================
# TESTE 2: Verificar Configuração WhatsApp
# ============================================

if [ "$BACKEND_ONLINE" = true ]; then
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📍 TESTE 2: Verificando Configuração WhatsApp"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    CONFIG_URL="${BASE_URL}/chat/channels/config?organization_id=org_default"
    echo "🔗 URL: ${CONFIG_URL}"
    echo ""

    HTTP_CODE=$(curl -s -o /tmp/config_response.json -w "%{http_code}" "${CONFIG_URL}")

    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Configuração encontrada${NC}"
        echo ""
        
        # Extrair API Key atual
        CURRENT_API_KEY=$(cat /tmp/config_response.json | jq -r '.data.whatsapp.api_key' 2>/dev/null)
        
        echo "🔑 API Key atual: ${CURRENT_API_KEY:0:20}..."
        echo ""
        
        if [ "$CURRENT_API_KEY" = "$NEW_API_KEY" ]; then
            echo -e "${GREEN}✅ API Key está CORRETA!${NC}"
            echo "   Usando: ${NEW_API_KEY}"
        elif [ "$CURRENT_API_KEY" = "$OLD_API_KEY" ]; then
            echo -e "${RED}❌ API Key ANTIGA detectada!${NC}"
            echo "   Antiga: ${OLD_API_KEY}"
            echo "   Nova: ${NEW_API_KEY}"
            echo ""
            echo -e "${YELLOW}🔧 Corrigindo automaticamente...${NC}"
            
            # Atualizar API Key
            UPDATE_PAYLOAD=$(cat <<EOF
{
  "organization_id": "org_default",
  "whatsapp": {
    "enabled": true,
    "api_url": "${EVOLUTION_API_URL}",
    "instance_name": "${INSTANCE_NAME}",
    "api_key": "${NEW_API_KEY}",
    "connected": false
  }
}
EOF
)
            
            UPDATE_RESPONSE=$(curl -s -X PATCH "${BASE_URL}/chat/channels/config" \
                -H "Content-Type: application/json" \
                -d "$UPDATE_PAYLOAD")
            
            if echo "$UPDATE_RESPONSE" | jq -e '.success' > /dev/null 2>&1; then
                echo -e "${GREEN}✅ API Key atualizada com sucesso!${NC}"
                echo ""
            else
                echo -e "${RED}❌ Erro ao atualizar API Key${NC}"
                echo "   Resposta: $UPDATE_RESPONSE"
                echo ""
            fi
        else
            echo -e "${YELLOW}⚠️ API Key diferente detectada${NC}"
            echo "   Atual: ${CURRENT_API_KEY}"
            echo "   Esperada: ${NEW_API_KEY}"
        fi
        
        echo ""
        echo "📄 Configuração completa:"
        cat /tmp/config_response.json | jq '.data' 2>/dev/null || cat /tmp/config_response.json
    else
        echo -e "${RED}❌ Erro ao buscar configuração${NC}"
        echo "   HTTP Code: ${HTTP_CODE}"
        echo ""
        echo "📄 Resposta:"
        cat /tmp/config_response.json 2>/dev/null || echo "(sem resposta)"
    fi
    echo ""
fi

# ============================================
# TESTE 3: Verificar Evolution API
# ============================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📍 TESTE 3: Verificando Evolution API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

EVOLUTION_URL="${EVOLUTION_API_URL}/instance/connectionState/${INSTANCE_NAME}"
echo "🔗 URL: ${EVOLUTION_URL}"
echo "🔑 API Key: ${NEW_API_KEY:0:20}..."
echo ""

HTTP_CODE=$(curl -s -o /tmp/evolution_response.json -w "%{http_code}" \
    -H "apikey: ${NEW_API_KEY}" \
    "${EVOLUTION_URL}")

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Evolution API está acessível${NC}"
    echo ""
    echo "📄 Status da Instância:"
    cat /tmp/evolution_response.json | jq '.' 2>/dev/null || cat /tmp/evolution_response.json
elif [ "$HTTP_CODE" = "401" ]; then
    echo -e "${RED}❌ Erro 401: API Key inválida${NC}"
    echo ""
    echo "📄 Resposta:"
    cat /tmp/evolution_response.json 2>/dev/null || echo "(sem resposta)"
    echo ""
    echo -e "${YELLOW}📋 Verifique:${NC}"
    echo "   1. API Key está correta: ${NEW_API_KEY}"
    echo "   2. Acesse Evolution Manager: ${EVOLUTION_API_URL}/manager"
    echo "   3. Confirme que tem permissão para usar Global API Key"
elif [ "$HTTP_CODE" = "404" ]; then
    echo -e "${YELLOW}⚠️ Instância '${INSTANCE_NAME}' não encontrada${NC}"
    echo ""
    echo "📄 Resposta:"
    cat /tmp/evolution_response.json 2>/dev/null || echo "(sem resposta)"
    echo ""
    echo -e "${YELLOW}📋 Próximos passos:${NC}"
    echo "   1. Crie a instância via Rendizy (Configurações → Integrações → WhatsApp)"
    echo "   2. Ou crie via Evolution Manager: ${EVOLUTION_API_URL}/manager"
else
    echo -e "${RED}❌ Erro ao acessar Evolution API${NC}"
    echo "   HTTP Code: ${HTTP_CODE}"
    echo ""
    echo "📄 Resposta:"
    cat /tmp/evolution_response.json 2>/dev/null || echo "(sem resposta)"
fi

echo ""

# ============================================
# RESUMO FINAL
# ============================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMO DO DIAGNÓSTICO"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ "$BACKEND_ONLINE" = true ]; then
    echo -e "🟢 Backend: ${GREEN}ONLINE${NC}"
else
    echo -e "🔴 Backend: ${RED}OFFLINE${NC}"
fi

if [ -f /tmp/config_response.json ]; then
    CURRENT_API_KEY=$(cat /tmp/config_response.json | jq -r '.data.whatsapp.api_key' 2>/dev/null)
    if [ "$CURRENT_API_KEY" = "$NEW_API_KEY" ]; then
        echo -e "🟢 API Key: ${GREEN}CORRETA${NC}"
    else
        echo -e "🔴 API Key: ${RED}INCORRETA${NC}"
    fi
else
    echo -e "⚪ API Key: ${YELLOW}NÃO VERIFICADA${NC}"
fi

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "🟢 Evolution API: ${GREEN}ACESSÍVEL${NC}"
elif [ "$HTTP_CODE" = "401" ]; then
    echo -e "🔴 Evolution API: ${RED}ERRO 401${NC}"
elif [ "$HTTP_CODE" = "404" ]; then
    echo -e "🟡 Evolution API: ${YELLOW}INSTÂNCIA NÃO ENCONTRADA${NC}"
else
    echo -e "🔴 Evolution API: ${RED}ERRO${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 PRÓXIMOS PASSOS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ "$BACKEND_ONLINE" = false ]; then
    echo "1. ${YELLOW}PRIORIDADE ALTA:${NC} Ative o backend"
    echo "   Leia: CORRIGIR_BACKEND_OFFLINE.md"
    echo ""
fi

if [ "$CURRENT_API_KEY" != "$NEW_API_KEY" ] && [ -n "$CURRENT_API_KEY" ]; then
    echo "2. ${YELLOW}PRIORIDADE MÉDIA:${NC} Atualize a API Key"
    echo "   Execute: bash CORRIGIR_API_KEY_CURL_DIRETO.sh"
    echo ""
fi

echo "3. Recarregue a página do Rendizy (F5)"
echo "4. Aguarde Auto-Fix executar (4-6 segundos)"
echo "5. Teste conexão WhatsApp em: Configurações → Integrações"
echo ""

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  Diagnóstico concluído!                                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Cleanup
rm -f /tmp/health_response.json /tmp/config_response.json /tmp/evolution_response.json
