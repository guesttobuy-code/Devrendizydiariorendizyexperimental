#!/bin/bash

# ============================================================================
# RENDIZY - Teste Rápido de Global API Key
# ============================================================================
# 
# DESCRIÇÃO:
# Testa se a Global API Key da Evolution API está correta
# antes de aplicar no RENDIZY
#
# USO:
# 1. bash TESTE_GLOBAL_API_KEY.sh
# 2. Cole a Global API Key quando solicitado
# 3. Veja o resultado
#
# VERSÃO: v1.0.103.58
# DATA: 29/10/2025
# ============================================================================

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Símbolos
CHECK="${GREEN}✅${NC}"
CROSS="${RED}❌${NC}"
ARROW="${BLUE}→${NC}"
WAIT="${YELLOW}⏳${NC}"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  🧪 TESTE RÁPIDO - GLOBAL API KEY da Evolution API"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Informações conhecidas
API_URL="https://evo.boravendermuito.com.br"
INSTANCE_NAME="Rendizy"

echo "${ARROW} Configuração:"
echo "  URL:       ${API_URL}"
echo "  Instância: ${INSTANCE_NAME}"
echo ""

# Solicitar Global API Key
echo "═══════════════════════════════════════════════════════════════"
echo " 📋 Cole a Global API Key aqui:"
echo "═══════════════════════════════════════════════════════════════"
echo ""
read -p "Global API Key: " GLOBAL_API_KEY
echo ""

# Validar que não está vazia
if [ -z "$GLOBAL_API_KEY" ]; then
  echo "${CROSS} Erro: API Key não pode estar vazia!"
  exit 1
fi

# Remover espaços extras
GLOBAL_API_KEY=$(echo "$GLOBAL_API_KEY" | tr -d ' \t\n\r')

echo "${WAIT} Testando conexão..."
echo ""

# Fazer request para Evolution API
ENDPOINT="${API_URL}/instance/connectionState/${INSTANCE_NAME}"

echo "${ARROW} Testando endpoint:"
echo "  ${ENDPOINT}"
echo ""

# Executar curl
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET \
  "${ENDPOINT}" \
  -H "apikey: ${GLOBAL_API_KEY}")

# Separar body e status code
HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)

echo "═══════════════════════════════════════════════════════════════"
echo " 📊 RESULTADO DO TESTE"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Analisar resultado
if [ "$HTTP_CODE" == "200" ]; then
  echo "${CHECK} Status HTTP: 200 OK"
  echo ""
  
  # Tentar parsear JSON (se jq estiver disponível)
  if command -v jq &> /dev/null; then
    echo "${ARROW} Detalhes da resposta:"
    echo "$HTTP_BODY" | jq '.'
    
    # Verificar status da instância
    INSTANCE_STATUS=$(echo "$HTTP_BODY" | jq -r '.instance.status // empty')
    if [ "$INSTANCE_STATUS" == "open" ]; then
      echo ""
      echo "${CHECK} Instância Status: ${GREEN}OPEN (CONECTADO)${NC}"
    fi
  else
    echo "${ARROW} Resposta JSON (raw):"
    echo "$HTTP_BODY"
  fi
  
  echo ""
  echo "═══════════════════════════════════════════════════════════════"
  echo " ${CHECK} SUCESSO! Global API Key está CORRETA!"
  echo "═══════════════════════════════════════════════════════════════"
  echo ""
  echo "${ARROW} Próximos passos:"
  echo "  1. Cole esta Global API Key no chat"
  echo "  2. Aguarde a aplicação no RENDIZY"
  echo "  3. Teste a integração"
  echo ""
  
  exit 0

elif [ "$HTTP_CODE" == "401" ]; then
  echo "${CROSS} Status HTTP: 401 Unauthorized"
  echo ""
  echo "${CROSS} FALHA! Global API Key está INCORRETA!"
  echo ""
  echo "${ARROW} O que fazer:"
  echo "  1. Volte ao Manager: ${API_URL}/manager"
  echo "  2. Settings → Find Settings"
  echo "  3. AUTHENTICATION → Api Key → Global (não Instance!)"
  echo "  4. Copie a chave GLOBAL corretamente"
  echo "  5. Execute este teste novamente"
  echo ""
  
  exit 1

elif [ "$HTTP_CODE" == "404" ]; then
  echo "${CROSS} Status HTTP: 404 Not Found"
  echo ""
  echo "${CROSS} FALHA! Instância '${INSTANCE_NAME}' não encontrada!"
  echo ""
  echo "${ARROW} Possíveis causas:"
  echo "  1. Nome da instância está errado"
  echo "  2. Instância foi deletada ou renomeada"
  echo "  3. URL da API está incorreta"
  echo ""
  echo "${ARROW} Resposta do servidor:"
  echo "$HTTP_BODY"
  echo ""
  
  exit 1

elif [ "$HTTP_CODE" == "000" ] || [ -z "$HTTP_CODE" ]; then
  echo "${CROSS} Status HTTP: Sem resposta (Network Error)"
  echo ""
  echo "${CROSS} FALHA! Não foi possível conectar à Evolution API!"
  echo ""
  echo "${ARROW} Possíveis causas:"
  echo "  1. URL da API está incorreta"
  echo "  2. Servidor está offline"
  echo "  3. Problema de rede/firewall"
  echo "  4. DNS não está resolvendo"
  echo ""
  echo "${ARROW} Verifique:"
  echo "  - URL: ${API_URL}"
  echo "  - Acesse no navegador: ${API_URL}/manager"
  echo "  - Confirme que o servidor está online"
  echo ""
  
  exit 1

else
  echo "${CROSS} Status HTTP: ${HTTP_CODE}"
  echo ""
  echo "${CROSS} FALHA! Erro inesperado!"
  echo ""
  echo "${ARROW} Resposta do servidor:"
  echo "$HTTP_BODY"
  echo ""
  
  exit 1
fi
