#!/bin/bash

# ============================================================================
# TESTE RÁPIDO - WhatsApp Evolution API
# ============================================================================

echo "🚀 TESTANDO WHATSAPP EVOLUTION API"
echo "===================================="
echo ""

# IMPORTANTE: Substitua estas variáveis com seus dados reais
PROJECT_ID="tmtnhgqpcwvgydexwvpz"  # ← SUBSTITUA pelo seu Project ID
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtdG5oZ3FwY3d2Z3lkZXh3dnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMTQxNjMsImV4cCI6MjA0NTc5MDE2M30.PJg_bQ23zT0cD0IZDC2Xw7rPFUfCFCdkn8aRJg-gDkc"  # ← SUBSTITUA pela sua Anon Key

BASE_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a"

echo "📍 Base URL: $BASE_URL"
echo ""

# ============================================================================
# TESTE 1: HEALTH CHECK
# ============================================================================

echo "🔍 TESTE 1: Health Check"
echo "------------------------"
echo ""

curl -s "${BASE_URL}/whatsapp/health" \
  -H "Authorization: Bearer ${ANON_KEY}" | jq '.'

echo ""
echo "===================================="
echo ""

# ============================================================================
# TESTE 2: STATUS DA INSTÂNCIA
# ============================================================================

echo "🔍 TESTE 2: Status da Instância"
echo "--------------------------------"
echo ""

curl -s "${BASE_URL}/whatsapp/status" \
  -H "Authorization: Bearer ${ANON_KEY}" | jq '.'

echo ""
echo "===================================="
echo ""

echo "✅ TESTES CONCLUÍDOS!"
echo ""
echo "Se você viu:"
echo "  • 'healthy': true  ← Configuração OK!"
echo "  • 'status': 'CONNECTED' ou 'DISCONNECTED' ← API funcionando!"
echo ""
echo "📱 PRÓXIMO PASSO:"
echo "1. Acesse: Configurações → Integrações → WhatsApp Business"
echo "2. Preencha o formulário"
echo "3. Conecte o QR Code"
echo ""
