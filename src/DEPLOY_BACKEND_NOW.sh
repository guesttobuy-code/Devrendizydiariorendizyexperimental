#!/bin/bash

# ========================================
# DEPLOY BACKEND RENDIZY - AUTOMÁTICO
# ========================================

echo "🚀 Deploy Automático do Backend RENDIZY"
echo "========================================"
echo ""

PROJECT_REF="uknccixtubkdkofyieie"
FUNCTION_NAME="make-server-67caf26a"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ========================================
# VERIFICAR SUPABASE CLI
# ========================================

echo -e "${BLUE}📋 PASSO 1: Verificando Supabase CLI...${NC}"
echo ""

if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI não encontrado!${NC}"
    echo ""
    echo "Instalando Supabase CLI..."
    echo ""
    
    # Detectar sistema operacional
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        echo "Detectado: macOS"
        if ! command -v brew &> /dev/null; then
            echo -e "${RED}❌ Homebrew não encontrado! Instale em: https://brew.sh${NC}"
            exit 1
        fi
        brew install supabase/tap/supabase
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        echo "Detectado: Linux"
        brew install supabase/tap/supabase
    else
        echo -e "${RED}❌ Sistema operacional não suportado automaticamente${NC}"
        echo "Instale manualmente: https://supabase.com/docs/guides/cli"
        exit 1
    fi
    
    if ! command -v supabase &> /dev/null; then
        echo -e "${RED}❌ Falha na instalação do Supabase CLI${NC}"
        exit 1
    fi
fi

SUPABASE_VERSION=$(supabase --version)
echo -e "${GREEN}✅ Supabase CLI instalado: $SUPABASE_VERSION${NC}"
echo ""

# ========================================
# VERIFICAR LOGIN
# ========================================

echo -e "${BLUE}📋 PASSO 2: Verificando login...${NC}"
echo ""

# Tentar listar projetos (vai falhar se não estiver logado)
if ! supabase projects list &> /dev/null; then
    echo -e "${YELLOW}⚠️  Não está logado. Fazendo login...${NC}"
    echo ""
    supabase login
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Falha no login${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Login verificado${NC}"
echo ""

# ========================================
# LINKAR PROJETO
# ========================================

echo -e "${BLUE}📋 PASSO 3: Linkando projeto...${NC}"
echo ""

# Verificar se já está linkado
if [ -f ".supabase/config.toml" ]; then
    CURRENT_PROJECT=$(grep -A 5 "\[api\]" .supabase/config.toml | grep "project_id" | cut -d'"' -f2 || echo "")
    
    if [ "$CURRENT_PROJECT" = "$PROJECT_REF" ]; then
        echo -e "${GREEN}✅ Projeto já está linkado: $PROJECT_REF${NC}"
        echo ""
    else
        echo -e "${YELLOW}⚠️  Projeto diferente linkado. Re-linkando...${NC}"
        supabase link --project-ref $PROJECT_REF
        
        if [ $? -ne 0 ]; then
            echo -e "${RED}❌ Falha ao linkar projeto${NC}"
            echo ""
            echo "Tente manualmente com senha:"
            echo "  supabase link --project-ref $PROJECT_REF --password YOUR_PASSWORD"
            exit 1
        fi
    fi
else
    echo "Linkando projeto pela primeira vez..."
    supabase link --project-ref $PROJECT_REF
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Falha ao linkar projeto${NC}"
        echo ""
        echo "Tente manualmente com senha:"
        echo "  supabase link --project-ref $PROJECT_REF --password YOUR_PASSWORD"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Projeto linkado: $PROJECT_REF${NC}"
echo ""

# ========================================
# DEPLOY EDGE FUNCTION
# ========================================

echo -e "${BLUE}📋 PASSO 4: Deployando Edge Function...${NC}"
echo ""

cd supabase/functions

echo "Fazendo deploy de: $FUNCTION_NAME"
echo ""

supabase functions deploy $FUNCTION_NAME --no-verify-jwt

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Falha no deploy${NC}"
    echo ""
    echo "Ver logs:"
    echo "  supabase functions logs $FUNCTION_NAME"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo ""

cd ../..

# ========================================
# VERIFICAR HEALTH CHECK
# ========================================

echo -e "${BLUE}📋 PASSO 5: Verificando se backend está acessível...${NC}"
echo ""

URL="https://${PROJECT_REF}.supabase.co/functions/v1/${FUNCTION_NAME}/health"

echo "Testando: $URL"
echo ""

# Aguardar 3 segundos para Edge Function inicializar
sleep 3

RESPONSE=$(curl -s -w "\n%{http_code}" "$URL")
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status: $HTTP_CODE"
echo "Response:"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ BACKEND ESTÁ ONLINE E FUNCIONANDO!${NC}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${GREEN}✅ DEPLOY COMPLETO E SUCESSO!${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🎯 Próximos Passos:"
    echo ""
    echo "1. Abrir RENDIZY no browser"
    echo "2. Ir em: Configurações > Integrações > WhatsApp"
    echo "3. Preencher credenciais:"
    echo "   URL: https://evo.boravendermuito.com.br"
    echo "   Instance: rendizy-admin-master"
    echo "   API Key: F7DE5EFFB66B-4E43-B11F-F0D5D8849741"
    echo "4. Clicar em 'Salvar Configurações'"
    echo "5. Clicar em 'Gerar QR Code'"
    echo "6. Escanear com WhatsApp"
    echo ""
    echo "📊 URLs Importantes:"
    echo "   Health Check: $URL"
    echo "   Dashboard: https://app.supabase.com/project/$PROJECT_REF"
    echo "   Logs: supabase functions logs $FUNCTION_NAME --follow"
    echo ""
else
    echo -e "${RED}❌ BACKEND NÃO ESTÁ ACESSÍVEL${NC}"
    echo ""
    echo "Status HTTP: $HTTP_CODE"
    echo ""
    echo "Possíveis causas:"
    echo "  - Deploy ainda está propagando (aguarde 30s e tente novamente)"
    echo "  - Erro no código (ver logs abaixo)"
    echo "  - Problema de permissões"
    echo ""
    echo "Ver logs em tempo real:"
    echo "  supabase functions logs $FUNCTION_NAME --follow"
    echo ""
    
    # Mostrar últimos logs
    echo "Últimos logs:"
    supabase functions logs $FUNCTION_NAME -n 20
    
    exit 1
fi

# ========================================
# TESTAR ROTA DE CHANNELS CONFIG
# ========================================

echo ""
echo -e "${BLUE}📋 PASSO 6 (Opcional): Testando rota de configuração...${NC}"
echo ""

CONFIG_URL="https://${PROJECT_REF}.supabase.co/functions/v1/${FUNCTION_NAME}/chat/channels/config?organization_id=admin-master"

echo "Testando: $CONFIG_URL"
echo ""

ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"

RESPONSE=$(curl -s -w "\n%{http_code}" "$CONFIG_URL" \
  -H "Authorization: Bearer $ANON_KEY")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "Status: $HTTP_CODE"
echo "Response:"
echo "$BODY" | jq . 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Rota de configuração funcionando!${NC}"
else
    echo -e "${YELLOW}⚠️  Rota de configuração retornou $HTTP_CODE${NC}"
    echo "Mas isso pode ser normal. Tente no RENDIZY."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ TUDO PRONTO! TESTE NO RENDIZY!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
