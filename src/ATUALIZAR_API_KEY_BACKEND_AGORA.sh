#!/bin/bash

# ============================================================================
# SCRIPT PARA ATUALIZAR A API KEY DO WHATSAPP NO BACKEND
# Versão: v1.0.103.70
# ============================================================================

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║  🔧 ATUALIZAR API KEY DO WHATSAPP NO BACKEND              ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Credenciais
PROJECT_ID="uknccixtubkdkofyieie"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5MTU2MTEsImV4cCI6MjA0NDQ5MTYxMX0.cpSIAMN_7SyUKTXLNtc2H0bBJWOPXu8pRmDfNhiPTiE"
SERVER_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a"

# Nova API Key (VÁLIDA)
NOVA_API_KEY="4de7861e944e291b56fe9781d2b00b36"

echo "📋 Configuração:"
echo "  Servidor: $SERVER_URL"
echo "  Nova API Key: $NOVA_API_KEY"
echo ""

echo "🔄 Atualizando configuração do WhatsApp..."
echo ""

# Fazer request para atualizar a config
RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X PUT "${SERVER_URL}/chat/channels/config" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -d '{
    "organization_id": "org_default",
    "whatsapp": {
      "enabled": true,
      "api_url": "https://evo.boravendermuito.com.br",
      "instance_name": "Rendizy",
      "api_key": "'"${NOVA_API_KEY}"'",
      "connected": false,
      "connection_status": "disconnected"
    }
  }')

# Separar body e status code
HTTP_BODY=$(echo "$RESPONSE" | sed -n '1,/HTTP_STATUS:/p' | sed '$d')
HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS:" | cut -d: -f2)

echo "📡 Status HTTP: $HTTP_STATUS"
echo ""

if [ "$HTTP_STATUS" == "200" ] || [ "$HTTP_STATUS" == "201" ]; then
  echo "✅ SUCESSO! API Key atualizada no backend!"
  echo ""
  echo "📄 Resposta:"
  echo "$HTTP_BODY" | python3 -m json.tool 2>/dev/null || echo "$HTTP_BODY"
  echo ""
  echo "╔════════════════════════════════════════════════════════════╗"
  echo "║                                                            ║"
  echo "║  ✅ CONFIGURAÇÃO ATUALIZADA COM SUCESSO!                  ║"
  echo "║                                                            ║"
  echo "║  Próximos passos:                                          ║"
  echo "║  1. Recarregue a página do RENDIZY (F5)                   ║"
  echo "║  2. Vá em: Configurações → Integrações → WhatsApp         ║"
  echo "║  3. Clique em 'Testar Conexão' → deve funcionar!          ║"
  echo "║  4. Clique em 'Gerar QR Code'                             ║"
  echo "║  5. Escaneie com WhatsApp                                  ║"
  echo "║                                                            ║"
  echo "╚════════════════════════════════════════════════════════════╝"
else
  echo "❌ ERRO ao atualizar configuração"
  echo ""
  echo "Status: $HTTP_STATUS"
  echo "Resposta:"
  echo "$HTTP_BODY"
  echo ""
  echo "╔════════════════════════════════════════════════════════════╗"
  echo "║  ⚠️  BACKEND NÃO ACESSÍVEL                                ║"
  echo "║                                                            ║"
  echo "║  O backend precisa estar rodando.                          ║"
  echo "║                                                            ║"
  echo "║  SOLUÇÃO ALTERNATIVA:                                      ║"
  echo "║  Configure manualmente pela interface:                     ║"
  echo "║                                                            ║"
  echo "║  1. Abra: http://localhost:5173                           ║"
  echo "║  2. Vá em: Configurações → Integrações → WhatsApp         ║"
  echo "║  3. Preencha:                                              ║"
  echo "║     URL: https://evo.boravendermuito.com.br               ║"
  echo "║     Instância: Rendizy                                     ║"
  echo "║     API Key: $NOVA_API_KEY                                ║"
  echo "║  4. Clique em 'Salvar Configurações'                      ║"
  echo "║                                                            ║"
  echo "╚════════════════════════════════════════════════════════════╝"
fi

echo ""
