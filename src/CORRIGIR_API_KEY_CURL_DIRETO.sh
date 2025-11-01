#!/bin/bash

# ============================================================================
# CORREÇÃO DIRETA - Atualizar API Key do WhatsApp via CURL
# v1.0.103.72
# ============================================================================

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║  🚀 CORREÇÃO DIRETA - API KEY DO WHATSAPP                 ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Configurações
PROJECT_ID="uknccixtubkdkofyieie"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5MTU2MTEsImV4cCI6MjA0NDQ5MTYxMX0.cpSIAMN_7SyUKTXLNtc2H0bBJWOPXu8pRmDfNhiPTiE"
SERVER_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a"

# Nova API Key (VÁLIDA)
NOVA_API_KEY="4de7861e944e291b56fe9781d2b00b36"
ORG_ID="org_default"

echo "📋 Configuração:"
echo "  Servidor: $SERVER_URL"
echo "  Organização: $ORG_ID"
echo "  Nova API Key: $NOVA_API_KEY"
echo ""

echo "🔄 Atualizando configuração do WhatsApp..."
echo ""

# JSON payload
JSON_PAYLOAD=$(cat <<EOF
{
  "organization_id": "$ORG_ID",
  "whatsapp": {
    "enabled": true,
    "api_url": "https://evo.boravendermuito.com.br",
    "instance_name": "Rendizy",
    "api_key": "$NOVA_API_KEY",
    "connected": false,
    "connection_status": "disconnected"
  }
}
EOF
)

echo "📤 Payload:"
echo "$JSON_PAYLOAD" | jq '.' 2>/dev/null || echo "$JSON_PAYLOAD"
echo ""

# Fazer request
HTTP_CODE=$(curl -s -w "%{http_code}" -o /tmp/response.json \
  -X PATCH "${SERVER_URL}/chat/channels/config" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ANON_KEY}" \
  -d "$JSON_PAYLOAD")

echo "📡 Status HTTP: $HTTP_CODE"
echo ""

# Verificar resultado
if [ "$HTTP_CODE" == "200" ] || [ "$HTTP_CODE" == "201" ]; then
  echo "✅ SUCESSO! API Key atualizada no backend!"
  echo ""
  echo "📄 Resposta do servidor:"
  cat /tmp/response.json | jq '.' 2>/dev/null || cat /tmp/response.json
  echo ""
  echo "╔════════════════════════════════════════════════════════════╗"
  echo "║                                                            ║"
  echo "║  ✅ CONFIGURAÇÃO ATUALIZADA COM SUCESSO!                  ║"
  echo "║                                                            ║"
  echo "║  Próximos passos:                                          ║"
  echo "║  1. Recarregue a página do RENDIZY (F5)                   ║"
  echo "║  2. O erro 401 deve ter sumido! ✅                        ║"
  echo "║  3. Vá em: Configurações → Integrações → WhatsApp         ║"
  echo "║  4. Clique em 'Testar Conexão' → deve funcionar!          ║"
  echo "║  5. Clique em 'Gerar QR Code'                             ║"
  echo "║  6. Escaneie com WhatsApp                                  ║"
  echo "║  7. ✅ PRONTO!                                            ║"
  echo "║                                                            ║"
  echo "╚════════════════════════════════════════════════════════════╝"
  echo ""
  
  # Verificar se a API Key foi realmente atualizada
  echo "🔍 Verificando se a API Key foi realmente salva..."
  echo ""
  
  SAVED_API_KEY=$(cat /tmp/response.json | jq -r '.data.whatsapp.api_key' 2>/dev/null)
  
  if [ "$SAVED_API_KEY" == "$NOVA_API_KEY" ]; then
    echo "✅ CONFIRMADO! API Key salva corretamente:"
    echo "   $SAVED_API_KEY"
    echo ""
    echo "🎉 TUDO CERTO! Recarregue a página e teste."
  else
    echo "⚠️ API Key na resposta: $SAVED_API_KEY"
    echo "   Esperado: $NOVA_API_KEY"
    echo ""
    echo "   Pode haver um problema. Tente novamente ou use a interface manual."
  fi
  echo ""
  
  exit 0
else
  echo "❌ ERRO ao atualizar configuração"
  echo ""
  echo "Status HTTP: $HTTP_CODE"
  echo "Resposta do servidor:"
  cat /tmp/response.json 2>/dev/null || echo "(sem resposta)"
  echo ""
  echo "╔════════════════════════════════════════════════════════════╗"
  echo "║  ⚠️  ATUALIZAÇÃO AUTOMÁTICA FALHOU                        ║"
  echo "║                                                            ║"
  echo "║  Configure manualmente pela interface:                     ║"
  echo "║                                                            ║"
  echo "║  1. Abra: http://localhost:5173                           ║"
  echo "║  2. Vá em: Configurações → Integrações → WhatsApp         ║"
  echo "║  3. Preencha OS 3 CAMPOS:                                 ║"
  echo "║                                                            ║"
  echo "║     URL da Evolution API:                                 ║"
  echo "║     https://evo.boravendermuito.com.br                    ║"
  echo "║                                                            ║"
  echo "║     Nome da Instância:                                    ║"
  echo "║     Rendizy                                                ║"
  echo "║                                                            ║"
  echo "║     API Key (copie EXATAMENTE):                           ║"
  echo "║     4de7861e944e291b56fe9781d2b00b36                      ║"
  echo "║                                                            ║"
  echo "║  4. Clique em 'Salvar Configurações'                      ║"
  echo "║  5. Clique em 'Testar Conexão'                            ║"
  echo "║  6. Deve funcionar! ✅                                    ║"
  echo "║                                                            ║"
  echo "╚════════════════════════════════════════════════════════════╝"
  echo ""
  
  # Diagnosticar o problema
  echo "🔍 Diagnóstico do problema:"
  echo ""
  
  if [ "$HTTP_CODE" == "000" ]; then
    echo "❌ Backend não respondeu (timeout ou offline)"
    echo "   Verifique se o backend está rodando:"
    echo "   → supabase functions serve"
    echo "   → ou: supabase functions deploy make-server-67caf26a"
  elif [ "$HTTP_CODE" == "404" ]; then
    echo "❌ Endpoint não encontrado"
    echo "   O endpoint /chat/channels/config pode não existir"
    echo "   Verifique se o backend está atualizado"
  elif [ "$HTTP_CODE" == "401" ] || [ "$HTTP_CODE" == "403" ]; then
    echo "❌ Erro de autenticação"
    echo "   A ANON_KEY pode estar incorreta"
  elif [ "$HTTP_CODE" == "500" ]; then
    echo "❌ Erro interno do servidor"
    echo "   Veja os logs do backend para mais detalhes"
  else
    echo "❌ Erro HTTP inesperado: $HTTP_CODE"
  fi
  echo ""
  
  exit 1
fi

# Limpar arquivo temporário
rm -f /tmp/response.json 2>/dev/null

echo ""
