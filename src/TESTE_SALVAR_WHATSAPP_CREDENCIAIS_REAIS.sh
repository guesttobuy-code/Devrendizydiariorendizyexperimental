#!/bin/bash

# ========================================
# TESTE DE SALVAMENTO - WhatsApp RENDIZY
# Credenciais Reais
# ========================================

echo "🧪 Testando salvamento de configurações WhatsApp..."
echo ""

# Credenciais Fornecidas
API_KEY="F7DE5EFFB66B-4E43-B11F-F0D5D8849741"
API_URL="https://evo.boravendermuito.com.br"
INSTANCE_NAME="rendizy-admin-master"
ORG_ID="admin-master"

# Supabase
PROJECT_ID="uknccixtubkdkofyieie"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"
BASE_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a"

echo "📋 Suas Credenciais:"
echo "   Evolution API URL: $API_URL"
echo "   Instance Name:     $INSTANCE_NAME"
echo "   API Key:           ${API_KEY:0:20}..."
echo "   Organization ID:   $ORG_ID"
echo ""
echo "📋 Backend RENDIZY:"
echo "   Base URL: $BASE_URL"
echo ""

# ========================================
# PASSO 1: Health Check
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 PASSO 1: Health Check do Backend"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

response_health=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/health" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json")

http_code_health=$(echo "$response_health" | tail -n1)
body_health=$(echo "$response_health" | head -n-1)

echo "Status: $http_code_health"
echo "Response:"
echo "$body_health" | jq . 2>/dev/null || echo "$body_health"
echo ""

if [ "$http_code_health" = "200" ]; then
  echo "✅ Backend está ONLINE!"
  echo "   Pode prosseguir com salvamento..."
  echo ""
elif [ "$http_code_health" = "404" ]; then
  echo "❌ ERRO 404: Backend não encontrado"
  echo ""
  echo "Solução:"
  echo "  1. cd supabase/functions"
  echo "  2. supabase functions deploy make-server-67caf26a"
  echo ""
  exit 1
elif [ "$http_code_health" = "000" ] || [ -z "$http_code_health" ]; then
  echo "❌ ERRO: Backend não acessível"
  echo ""
  echo "Possíveis causas:"
  echo "  - Edge Function não deployada"
  echo "  - Sem conexão com internet"
  echo "  - Firewall bloqueando"
  echo ""
  exit 1
else
  echo "⚠️ Status inesperado: $http_code_health"
  echo ""
  exit 1
fi

# ========================================
# PASSO 2: Salvar Configuração
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 PASSO 2: Salvar Configuração WhatsApp"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Monta JSON
CONFIG_JSON=$(cat <<EOF
{
  "organization_id": "$ORG_ID",
  "whatsapp": {
    "enabled": true,
    "api_url": "$API_URL",
    "instance_name": "$INSTANCE_NAME",
    "api_key": "$API_KEY",
    "connected": false,
    "connection_status": "disconnected"
  }
}
EOF
)

echo "📤 Enviando configuração:"
echo "$CONFIG_JSON" | jq . 2>/dev/null || echo "$CONFIG_JSON"
echo ""

response_save=$(curl -s -w "\n%{http_code}" -X PATCH "$BASE_URL/chat/channels/config" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d "$CONFIG_JSON")

http_code_save=$(echo "$response_save" | tail -n1)
body_save=$(echo "$response_save" | head -n-1)

echo "Status: $http_code_save"
echo "Response:"
echo "$body_save" | jq . 2>/dev/null || echo "$body_save"
echo ""

if [ "$http_code_save" = "200" ]; then
  echo "✅ CONFIGURAÇÃO SALVA COM SUCESSO!"
  echo ""
  echo "📊 O que foi salvo:"
  echo "   ✅ Evolution API URL: $API_URL"
  echo "   ✅ Instance Name:     $INSTANCE_NAME"
  echo "   ✅ API Key:           ${API_KEY:0:20}..."
  echo "   ✅ Status:            disconnected (normal antes de gerar QR Code)"
  echo ""
  echo "🎯 Próximos Passos:"
  echo ""
  echo "1. Abrir RENDIZY"
  echo "   → Configurações > Integrações > WhatsApp"
  echo ""
  echo "2. Verificar se os campos estão preenchidos"
  echo "   → Devem estar com os valores salvos"
  echo ""
  echo "3. Clicar em '📱 Gerar QR Code'"
  echo "   → Backend vai criar instância na Evolution API"
  echo "   → QR Code vai aparecer na tela"
  echo ""
  echo "4. Escanear QR Code com WhatsApp"
  echo "   → Abrir WhatsApp no celular"
  echo "   → Dispositivos Conectados > Conectar Dispositivo"
  echo "   → Escanear o QR Code"
  echo ""
  echo "5. Verificar Status"
  echo "   → Tab 'Status & Conexão'"
  echo "   → Clicar em '🔄 Verificar Status'"
  echo "   → Deve mostrar: ✅ Conectado"
  echo ""
  
elif [ "$http_code_save" = "400" ]; then
  echo "❌ ERRO 400: Requisição inválida"
  echo ""
  echo "Resposta do servidor:"
  echo "$body_save" | jq . 2>/dev/null || echo "$body_save"
  echo ""
  
elif [ "$http_code_save" = "401" ]; then
  echo "❌ ERRO 401: Não autorizado"
  echo ""
  echo "Possíveis causas:"
  echo "  - Token de autenticação inválido"
  echo "  - Credenciais do Supabase incorretas"
  echo ""
  
elif [ "$http_code_save" = "500" ]; then
  echo "❌ ERRO 500: Erro interno do servidor"
  echo ""
  echo "Resposta do servidor:"
  echo "$body_save" | jq . 2>/dev/null || echo "$body_save"
  echo ""
  echo "Solução:"
  echo "  - Ver logs do backend:"
  echo "    supabase functions logs make-server-67caf26a"
  echo ""
  
elif [ "$http_code_save" = "000" ] || [ -z "$http_code_save" ]; then
  echo "❌ ERRO: Não foi possível conectar ao servidor"
  echo ""
  echo "Possíveis causas:"
  echo "  - Sem conexão com internet"
  echo "  - Firewall bloqueando"
  echo "  - Backend offline"
  echo ""
  
else
  echo "⚠️ Status inesperado: $http_code_save"
  echo ""
  echo "Resposta:"
  echo "$body_save" | jq . 2>/dev/null || echo "$body_save"
  echo ""
fi

# ========================================
# PASSO 3: Verificar se Config Foi Salva
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 PASSO 3: Verificar Config Salva"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

response_get=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/chat/channels/config?organization_id=$ORG_ID" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json")

http_code_get=$(echo "$response_get" | tail -n1)
body_get=$(echo "$response_get" | head -n-1)

echo "Status: $http_code_get"
echo "Response:"
echo "$body_get" | jq . 2>/dev/null || echo "$body_get"
echo ""

if [ "$http_code_get" = "200" ]; then
  echo "✅ Configuração recuperada com sucesso!"
  echo ""
  
  # Verifica se WhatsApp está habilitado
  whatsapp_enabled=$(echo "$body_get" | jq -r '.data.whatsapp.enabled' 2>/dev/null)
  whatsapp_url=$(echo "$body_get" | jq -r '.data.whatsapp.api_url' 2>/dev/null)
  whatsapp_instance=$(echo "$body_get" | jq -r '.data.whatsapp.instance_name' 2>/dev/null)
  
  if [ "$whatsapp_enabled" = "true" ]; then
    echo "✅ WhatsApp está HABILITADO"
    echo "   URL:      $whatsapp_url"
    echo "   Instance: $whatsapp_instance"
    echo ""
    echo "🎉 CONFIGURAÇÃO CONFIRMADA!"
    echo ""
    echo "Agora você pode:"
    echo "  1. Gerar QR Code no RENDIZY"
    echo "  2. Conectar seu WhatsApp"
    echo ""
  else
    echo "⚠️ WhatsApp não está habilitado"
    echo ""
  fi
else
  echo "❌ Erro ao recuperar configuração"
  echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Teste concluído!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
