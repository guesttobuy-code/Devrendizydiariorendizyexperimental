#!/bin/bash

################################################################################
# 🧪 TESTE COMPLETO - CREDENCIAIS EVOLUTION API
################################################################################
#
# Versão: v1.0.103.152
# Data: 2025-10-31
# Status: ✅ Pronto para usar
#
################################################################################

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Credenciais
EVOLUTION_API_URL="https://evo.boravendermuito.com.br"
EVOLUTION_INSTANCE_NAME="Rendizy"
EVOLUTION_GLOBAL_API_KEY="4de7861e944e291b56fe9781d2b00b36"
EVOLUTION_INSTANCE_TOKEN="0FF3641E80A6-453C-AB4E-28C2F2D01C50"

echo "================================================================================"
echo "🧪 TESTE COMPLETO - CREDENCIAIS EVOLUTION API"
echo "================================================================================"
echo ""

################################################################################
# TESTE 1: HEALTH CHECK
################################################################################

echo -e "${BLUE}[TESTE 1/5]${NC} Health Check - Servidor Online?"
echo "URL: ${EVOLUTION_API_URL}/"
echo ""

HEALTH_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "${EVOLUTION_API_URL}/")
HTTP_STATUS=$(echo "$HEALTH_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$HEALTH_RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" = "200" ]; then
  echo -e "${GREEN}✅ PASSOU!${NC} Servidor está online"
  echo "Resposta: $BODY"
else
  echo -e "${RED}❌ FALHOU!${NC} Servidor offline ou URL incorreta"
  echo "HTTP Status: $HTTP_STATUS"
  echo "Resposta: $BODY"
fi

echo ""
echo "--------------------------------------------------------------------------------"
echo ""

################################################################################
# TESTE 2: FETCH INSTANCES (GLOBAL API KEY)
################################################################################

echo -e "${BLUE}[TESTE 2/5]${NC} Listar Instâncias - Global API Key válida?"
echo "URL: ${EVOLUTION_API_URL}/instance/fetchInstances"
echo "Header: apikey: ${EVOLUTION_GLOBAL_API_KEY:0:20}..."
echo ""

INSTANCES_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "${EVOLUTION_API_URL}/instance/fetchInstances" \
  -H "apikey: ${EVOLUTION_GLOBAL_API_KEY}")

HTTP_STATUS=$(echo "$INSTANCES_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$INSTANCES_RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" = "200" ]; then
  if echo "$BODY" | grep -q "Rendizy"; then
    echo -e "${GREEN}✅ PASSOU!${NC} Global API Key válida e instância 'Rendizy' encontrada"
    echo "Resposta: $BODY"
  else
    echo -e "${YELLOW}⚠️  ATENÇÃO!${NC} Global API Key válida, mas instância 'Rendizy' não encontrada"
    echo "Resposta: $BODY"
  fi
else
  echo -e "${RED}❌ FALHOU!${NC} Global API Key inválida ou erro no servidor"
  echo "HTTP Status: $HTTP_STATUS"
  echo "Resposta: $BODY"
fi

echo ""
echo "--------------------------------------------------------------------------------"
echo ""

################################################################################
# TESTE 3: CONNECTION STATE (INSTANCE TOKEN)
################################################################################

echo -e "${BLUE}[TESTE 3/5]${NC} Estado da Conexão - Instance Token válido?"
echo "URL: ${EVOLUTION_API_URL}/instance/connectionState/${EVOLUTION_INSTANCE_NAME}"
echo "Header 1: apikey: ${EVOLUTION_GLOBAL_API_KEY:0:20}..."
echo "Header 2: Authorization: Bearer ${EVOLUTION_INSTANCE_TOKEN:0:20}..."
echo ""

CONNECTION_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "${EVOLUTION_API_URL}/instance/connectionState/${EVOLUTION_INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_GLOBAL_API_KEY}" \
  -H "Authorization: Bearer ${EVOLUTION_INSTANCE_TOKEN}")

HTTP_STATUS=$(echo "$CONNECTION_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$CONNECTION_RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" = "200" ]; then
  echo -e "${GREEN}✅ PASSOU!${NC} Instance Token válido"
  echo "Resposta: $BODY"
  
  if echo "$BODY" | grep -q '"state":"open"'; then
    echo -e "${GREEN}🟢 WhatsApp CONECTADO!${NC}"
  elif echo "$BODY" | grep -q '"state":"close"'; then
    echo -e "${YELLOW}🔴 WhatsApp DESCONECTADO (precisa escanear QR Code)${NC}"
  fi
else
  echo -e "${RED}❌ FALHOU!${NC} Instance Token inválido ou instância não existe"
  echo "HTTP Status: $HTTP_STATUS"
  echo "Resposta: $BODY"
fi

echo ""
echo "--------------------------------------------------------------------------------"
echo ""

################################################################################
# TESTE 4: QR CODE (SE DESCONECTADO)
################################################################################

echo -e "${BLUE}[TESTE 4/5]${NC} Gerar QR Code - Funciona?"
echo "URL: ${EVOLUTION_API_URL}/instance/connect/${EVOLUTION_INSTANCE_NAME}"
echo ""

QR_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "${EVOLUTION_API_URL}/instance/connect/${EVOLUTION_INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_GLOBAL_API_KEY}" \
  -H "Authorization: Bearer ${EVOLUTION_INSTANCE_TOKEN}")

HTTP_STATUS=$(echo "$QR_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$QR_RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" = "200" ]; then
  if echo "$BODY" | grep -q "base64"; then
    echo -e "${GREEN}✅ PASSOU!${NC} QR Code gerado com sucesso"
    echo "QR Code disponível (base64)"
  elif echo "$BODY" | grep -q "open"; then
    echo -e "${YELLOW}⚠️  INFO${NC} WhatsApp já está conectado (não precisa QR Code)"
  else
    echo -e "${GREEN}✅ PASSOU!${NC} Endpoint respondeu corretamente"
    echo "Resposta: ${BODY:0:200}..."
  fi
else
  echo -e "${RED}❌ FALHOU!${NC} Erro ao gerar QR Code"
  echo "HTTP Status: $HTTP_STATUS"
  echo "Resposta: $BODY"
fi

echo ""
echo "--------------------------------------------------------------------------------"
echo ""

################################################################################
# TESTE 5: PROFILE INFO
################################################################################

echo -e "${BLUE}[TESTE 5/5]${NC} Informações do Perfil - Credenciais completas?"
echo "URL: ${EVOLUTION_API_URL}/instance/settings/${EVOLUTION_INSTANCE_NAME}"
echo ""

PROFILE_RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X GET "${EVOLUTION_API_URL}/instance/settings/${EVOLUTION_INSTANCE_NAME}" \
  -H "apikey: ${EVOLUTION_GLOBAL_API_KEY}" \
  -H "Authorization: Bearer ${EVOLUTION_INSTANCE_TOKEN}")

HTTP_STATUS=$(echo "$PROFILE_RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$PROFILE_RESPONSE" | sed '/HTTP_STATUS/d')

if [ "$HTTP_STATUS" = "200" ]; then
  echo -e "${GREEN}✅ PASSOU!${NC} Informações do perfil obtidas"
  echo "Resposta: ${BODY:0:300}..."
else
  echo -e "${YELLOW}⚠️  INFO${NC} Endpoint pode não estar disponível (não é crítico)"
  echo "HTTP Status: $HTTP_STATUS"
fi

echo ""
echo "================================================================================"
echo "📊 RESUMO DOS TESTES"
echo "================================================================================"
echo ""

# Contadores
TESTS_PASSED=0
TESTS_FAILED=0

# Análise simples (você pode melhorar isso)
echo "Resultados:"
echo ""
echo "1. Health Check ................ $(if [ "$HTTP_STATUS" = "200" ]; then echo -e "${GREEN}✅ PASSOU${NC}"; TESTS_PASSED=$((TESTS_PASSED+1)); else echo -e "${RED}❌ FALHOU${NC}"; TESTS_FAILED=$((TESTS_FAILED+1)); fi)"
echo "2. Fetch Instances ............. (verifique saída acima)"
echo "3. Connection State ............ (verifique saída acima)"
echo "4. QR Code Generation .......... (verifique saída acima)"
echo "5. Profile Info ................ (verifique saída acima)"
echo ""

echo "================================================================================"
echo "🎯 CREDENCIAIS TESTADAS"
echo "================================================================================"
echo ""
echo "API URL:          ${EVOLUTION_API_URL}"
echo "Instance Name:    ${EVOLUTION_INSTANCE_NAME}"
echo "Global API Key:   ${EVOLUTION_GLOBAL_API_KEY:0:20}...${EVOLUTION_GLOBAL_API_KEY: -8}"
echo "Instance Token:   ${EVOLUTION_INSTANCE_TOKEN:0:20}...${EVOLUTION_INSTANCE_TOKEN: -8}"
echo ""

echo "================================================================================"
echo "📝 PRÓXIMOS PASSOS"
echo "================================================================================"
echo ""

if [ "$HTTP_STATUS" = "200" ]; then
  echo -e "${GREEN}✅ Credenciais estão funcionando!${NC}"
  echo ""
  echo "Se WhatsApp está DESCONECTADO:"
  echo "1. Acesse o painel RENDIZY → Configurações → Integrações"
  echo "2. Configure WhatsApp com as credenciais acima"
  echo "3. Clique em 'Conectar WhatsApp'"
  echo "4. Escaneie o QR Code"
  echo ""
else
  echo -e "${RED}❌ Há problemas com as credenciais${NC}"
  echo ""
  echo "Verifique:"
  echo "1. Servidor Evolution está online?"
  echo "2. URL está correta? (sem /manager nos endpoints)"
  echo "3. Global API Key está correta?"
  echo "4. Instance Token está correto?"
  echo "5. Nome da instância é 'Rendizy' (primeira letra maiúscula)?"
  echo ""
fi

echo "================================================================================"
echo ""
