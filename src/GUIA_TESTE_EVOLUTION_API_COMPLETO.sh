#!/bin/bash

################################################################################
# 🧪 GUIA DE TESTE COMPLETO - EVOLUTION API RENDIZY
# 
# Este script testa TODOS os endpoints da Evolution API implementados no RENDIZY
# 
# Versão: v1.0.103.142
# Data: 2025-10-30
################################################################################

# 🎨 Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ⚙️ CONFIGURAÇÕES
# Substitua pelos seus dados reais
PROJECT_ID="seu-projeto"
ANON_KEY="sua-anon-key"
BASE_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a"
TEST_NUMBER="5531999999999"  # Seu número de teste (com código do país)

################################################################################
# FUNÇÕES AUXILIARES
################################################################################

print_header() {
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_test() {
    echo -e "${YELLOW}$1${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
    echo ""
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    echo ""
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
    echo ""
}

pause() {
    echo ""
    read -p "Pressione ENTER para continuar..."
    echo ""
}

################################################################################
# INÍCIO DOS TESTES
################################################################################

clear
print_header "🧪 TESTE COMPLETO - EVOLUTION API RENDIZY"

print_info "Base URL: ${BASE_URL}"
print_info "Número de teste: ${TEST_NUMBER}"
echo ""

# Verificar se configurações foram definidas
if [ "$PROJECT_ID" == "seu-projeto" ] || [ "$ANON_KEY" == "sua-anon-key" ]; then
    print_error "CONFIGURAÇÕES NÃO DEFINIDAS!"
    echo "Edite este script e configure:"
    echo "  - PROJECT_ID (seu projeto Supabase)"
    echo "  - ANON_KEY (sua chave anon do Supabase)"
    echo "  - TEST_NUMBER (número de WhatsApp para teste)"
    exit 1
fi

pause

################################################################################
# TESTE 1: HEALTH CHECK
################################################################################

print_header "TESTE 1: HEALTH CHECK"
print_test "Verificando se a integração está configurada..."

RESPONSE=$(curl -s -X GET "${BASE_URL}/whatsapp/health" \
  -H "Authorization: Bearer ${ANON_KEY}")

echo "Resposta:"
echo "$RESPONSE" | jq '.'

if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
    print_success "Health check passou!"
else
    print_error "Health check falhou!"
fi

pause

################################################################################
# TESTE 2: STATUS DA CONEXÃO
################################################################################

print_header "TESTE 2: STATUS DA CONEXÃO"
print_test "Verificando se a instância está conectada..."

RESPONSE=$(curl -s -X GET "${BASE_URL}/whatsapp/status" \
  -H "Authorization: Bearer ${ANON_KEY}")

echo "Resposta:"
echo "$RESPONSE" | jq '.'

STATUS=$(echo "$RESPONSE" | jq -r '.data.status')

if [ "$STATUS" == "CONNECTED" ]; then
    print_success "Instância CONECTADA!"
elif [ "$STATUS" == "CONNECTING" ]; then
    print_info "Instância CONECTANDO... Aguarde alguns segundos."
elif [ "$STATUS" == "DISCONNECTED" ]; then
    print_error "Instância DESCONECTADA!"
    print_info "Execute o teste 3 para gerar um QR Code e conectar."
else
    print_error "Status desconhecido: $STATUS"
fi

pause

################################################################################
# TESTE 3: OBTER QR CODE
################################################################################

print_header "TESTE 3: OBTER QR CODE"
print_test "Gerando QR Code para conexão..."
print_info "Se a instância já está conectada, este teste pode falhar."

RESPONSE=$(curl -s -X GET "${BASE_URL}/whatsapp/qr-code" \
  -H "Authorization: Bearer ${ANON_KEY}")

echo "Resposta:"
echo "$RESPONSE" | jq '.'

QR_CODE=$(echo "$RESPONSE" | jq -r '.data.qrCode')

if [ "$QR_CODE" != "null" ] && [ "$QR_CODE" != "" ]; then
    print_success "QR Code gerado!"
    print_info "Copie o QR Code (base64) e use um conversor online para visualizar:"
    print_info "https://www.base64-image.de/"
    echo ""
    echo "QR Code (primeiros 100 caracteres):"
    echo "${QR_CODE:0:100}..."
else
    print_info "QR Code não disponível (instância já pode estar conectada)"
fi

pause

################################################################################
# TESTE 4: INFORMAÇÕES DA INSTÂNCIA
################################################################################

print_header "TESTE 4: INFORMAÇÕES DA INSTÂNCIA"
print_test "Buscando informações detalhadas da instância..."

RESPONSE=$(curl -s -X GET "${BASE_URL}/whatsapp/instance-info" \
  -H "Authorization: Bearer ${ANON_KEY}")

echo "Resposta:"
echo "$RESPONSE" | jq '.'

PHONE=$(echo "$RESPONSE" | jq -r '.data.phone')
NAME=$(echo "$RESPONSE" | jq -r '.data.profileName')

if [ "$PHONE" != "null" ] && [ "$PHONE" != "" ]; then
    print_success "Instância encontrada!"
    print_info "Telefone: $PHONE"
    print_info "Nome: $NAME"
else
    print_error "Não foi possível obter informações da instância"
fi

pause

################################################################################
# TESTE 5: VERIFICAR NÚMERO
################################################################################

print_header "TESTE 5: VERIFICAR NÚMERO"
print_test "Verificando se o número $TEST_NUMBER existe no WhatsApp..."

RESPONSE=$(curl -s -X POST "${BASE_URL}/whatsapp/check-number" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"number\": \"${TEST_NUMBER}\"}")

echo "Resposta:"
echo "$RESPONSE" | jq '.'

EXISTS=$(echo "$RESPONSE" | jq -r '.data.exists')

if [ "$EXISTS" == "true" ]; then
    print_success "Número EXISTE no WhatsApp!"
else
    print_error "Número NÃO EXISTE no WhatsApp!"
    print_info "Verifique se o número está correto (com código do país)"
fi

pause

################################################################################
# TESTE 6: ENVIAR MENSAGEM DE TEXTO
################################################################################

print_header "TESTE 6: ENVIAR MENSAGEM DE TEXTO"
print_test "Enviando mensagem de texto para $TEST_NUMBER..."

RESPONSE=$(curl -s -X POST "${BASE_URL}/whatsapp/send-message" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"number\": \"${TEST_NUMBER}\",
    \"text\": \"✅ TESTE EVOLUTION API - RENDIZY\\n\\nSe você recebeu esta mensagem, o teste foi um sucesso!\\n\\nData/Hora: $(date '+%d/%m/%Y %H:%M:%S')\"
  }")

echo "Resposta:"
echo "$RESPONSE" | jq '.'

if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
    print_success "Mensagem enviada com sucesso!"
    print_info "Verifique seu WhatsApp!"
else
    print_error "Falha ao enviar mensagem"
fi

pause

################################################################################
# TESTE 7: ENVIAR MÍDIA (IMAGEM)
################################################################################

print_header "TESTE 7: ENVIAR MÍDIA (IMAGEM)"
print_test "Enviando imagem para $TEST_NUMBER..."

# URL de imagem de teste pública
IMAGE_URL="https://picsum.photos/800/600"

RESPONSE=$(curl -s -X POST "${BASE_URL}/whatsapp/send-media" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -H "Content-Type: application/json" \
  -d "{
    \"number\": \"${TEST_NUMBER}\",
    \"mediaUrl\": \"${IMAGE_URL}\",
    \"mediaType\": \"image\",
    \"caption\": \"📷 Imagem de teste - Rendizy Evolution API\"
  }")

echo "Resposta:"
echo "$RESPONSE" | jq '.'

if echo "$RESPONSE" | jq -e '.success == true' > /dev/null 2>&1; then
    print_success "Imagem enviada com sucesso!"
    print_info "Verifique seu WhatsApp!"
else
    print_error "Falha ao enviar imagem"
fi

pause

################################################################################
# TESTE 8: BUSCAR CONVERSAS (CHATS)
################################################################################

print_header "TESTE 8: BUSCAR CONVERSAS (CHATS)"
print_test "Listando todas as conversas do WhatsApp..."

RESPONSE=$(curl -s -X GET "${BASE_URL}/whatsapp/chats" \
  -H "Authorization: Bearer ${ANON_KEY}")

echo "Resposta (primeiras 500 caracteres):"
echo "$RESPONSE" | head -c 500
echo "..."
echo ""

CHAT_COUNT=$(echo "$RESPONSE" | jq -r '.data | length')

if [ "$CHAT_COUNT" != "null" ] && [ "$CHAT_COUNT" != "0" ]; then
    print_success "Conversas encontradas: $CHAT_COUNT"
else
    print_info "Nenhuma conversa encontrada ou erro ao buscar"
fi

pause

################################################################################
# TESTE 9: BUSCAR MENSAGENS DE UM CHAT
################################################################################

print_header "TESTE 9: BUSCAR MENSAGENS DE UM CHAT"
print_test "Buscando mensagens do chat: ${TEST_NUMBER}@s.whatsapp.net"

CHAT_ID="${TEST_NUMBER}@s.whatsapp.net"

RESPONSE=$(curl -s -X GET "${BASE_URL}/whatsapp/messages/${CHAT_ID}?limit=10" \
  -H "Authorization: Bearer ${ANON_KEY}")

echo "Resposta (primeiras 500 caracteres):"
echo "$RESPONSE" | head -c 500
echo "..."
echo ""

MESSAGE_COUNT=$(echo "$RESPONSE" | jq -r '.data | length')

if [ "$MESSAGE_COUNT" != "null" ] && [ "$MESSAGE_COUNT" != "0" ]; then
    print_success "Mensagens encontradas: $MESSAGE_COUNT"
else
    print_info "Nenhuma mensagem encontrada ou erro ao buscar"
fi

pause

################################################################################
# RESUMO FINAL
################################################################################

clear
print_header "📊 RESUMO DOS TESTES"

echo -e "${GREEN}✅ TESTES CONCLUÍDOS${NC}"
echo ""
echo "Testes executados:"
echo "  1. ✅ Health Check"
echo "  2. ✅ Status da Conexão"
echo "  3. ✅ Obter QR Code"
echo "  4. ✅ Informações da Instância"
echo "  5. ✅ Verificar Número"
echo "  6. ✅ Enviar Mensagem de Texto"
echo "  7. ✅ Enviar Mídia (Imagem)"
echo "  8. ✅ Buscar Conversas"
echo "  9. ✅ Buscar Mensagens de um Chat"
echo ""

print_info "Próximos passos:"
echo "  1. Verifique seu WhatsApp para confirmar o recebimento das mensagens"
echo "  2. Implemente os 5 endpoints prioritários (sendList, sendLocation, sendPoll, markAsRead, settings)"
echo "  3. Configure o webhook para receber mensagens automaticamente"
echo ""

print_success "Documentação completa em: /EVOLUTION_API_DOCUMENTACAO_COMPLETA_FINAL_v1.0.103.142.md"

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
