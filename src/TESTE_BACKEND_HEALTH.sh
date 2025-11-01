#!/bin/bash

# ========================================
# TESTE DE SAÚDE DO BACKEND - RENDIZY
# ========================================

echo "🏥 Testando saúde do servidor backend..."
echo ""

# Credenciais
PROJECT_ID="uknccixtubkdkofyieie"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"
BASE_URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a"

echo "📋 Dados:"
echo "   Project ID: $PROJECT_ID"
echo "   Base URL: $BASE_URL"
echo ""

# ========================================
# TESTE 1: Health Check
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 TESTE 1: Health Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

response=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/health" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json")

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

echo "Status: $http_code"
echo "Response:"
echo "$body" | jq . 2>/dev/null || echo "$body"
echo ""

if [ "$http_code" = "200" ]; then
  echo "✅ SERVIDOR ESTÁ ONLINE!"
  echo ""
  echo "Backend está funcionando corretamente."
  echo "Você pode salvar as configurações do WhatsApp."
elif [ "$http_code" = "404" ]; then
  echo "❌ ERRO 404: Endpoint não encontrado"
  echo ""
  echo "Possíveis causas:"
  echo "  1. Edge Function não foi deployada"
  echo "  2. URL do endpoint está incorreta"
  echo ""
  echo "Solução:"
  echo "  1. cd supabase/functions"
  echo "  2. supabase functions deploy make-server-67caf26a"
elif [ "$http_code" = "000" ] || [ -z "$http_code" ]; then
  echo "❌ ERRO: Servidor não acessível"
  echo ""
  echo "Possíveis causas:"
  echo "  1. Edge Function não está rodando"
  echo "  2. Sem conexão com internet"
  echo "  3. Firewall bloqueando"
  echo ""
  echo "Solução:"
  echo "  1. Verificar conexão com internet"
  echo "  2. Deploy: supabase functions deploy make-server-67caf26a"
  echo "  3. Verificar firewall"
else
  echo "⚠️ Status inesperado: $http_code"
  echo ""
  echo "Veja a resposta acima para mais detalhes"
fi

echo ""
echo ""

# ========================================
# TESTE 2: Endpoint de Configuração
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📡 TESTE 2: Endpoint de Configuração"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

response2=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/chat/channels/config?organization_id=test-org" \
  -H "Authorization: Bearer $ANON_KEY" \
  -H "Content-Type: application/json")

http_code2=$(echo "$response2" | tail -n1)
body2=$(echo "$response2" | head -n-1)

echo "Status: $http_code2"
echo "Response:"
echo "$body2" | jq . 2>/dev/null || echo "$body2"
echo ""

if [ "$http_code2" = "200" ]; then
  echo "✅ Endpoint de configuração funcionando!"
elif [ "$http_code2" = "404" ]; then
  echo "❌ ERRO 404: Endpoint de configuração não encontrado"
elif [ "$http_code2" = "000" ] || [ -z "$http_code2" ]; then
  echo "❌ ERRO: Não foi possível conectar"
else
  echo "⚠️ Status: $http_code2"
fi

echo ""
echo ""

# ========================================
# RESUMO
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMO DOS TESTES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Health Check:           $http_code"
echo "Endpoint Config:        $http_code2"
echo ""

if [ "$http_code" = "200" ] && [ "$http_code2" = "200" ]; then
  echo "✅ TUDO FUNCIONANDO!"
  echo ""
  echo "Backend está online e pronto para uso."
  echo "Você pode salvar as configurações do WhatsApp no RENDIZY."
elif [ "$http_code" = "200" ] && [ "$http_code2" != "200" ]; then
  echo "⚠️ Backend online mas endpoint de config com problema"
  echo ""
  echo "Verifique se a rota /chat/channels/config está implementada"
elif [ "$http_code" != "200" ]; then
  echo "❌ BACKEND OFFLINE ou NÃO DEPLOYADO"
  echo ""
  echo "SOLUÇÃO RÁPIDA:"
  echo ""
  echo "1. Deploy da Edge Function:"
  echo "   cd supabase/functions"
  echo "   supabase functions deploy make-server-67caf26a"
  echo ""
  echo "2. Verificar se deployou:"
  echo "   supabase functions list"
  echo ""
  echo "3. Rodar este teste novamente:"
  echo "   bash TESTE_BACKEND_HEALTH.sh"
  echo ""
  echo "OU, se estiver desenvolvendo localmente:"
  echo ""
  echo "1. Rodar função localmente:"
  echo "   cd supabase/functions"
  echo "   supabase functions serve"
  echo ""
  echo "2. Ajustar BASE_URL no código para:"
  echo "   http://localhost:54321/functions/v1/make-server-67caf26a"
else
  echo "⚠️ Status inesperado. Veja detalhes acima."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Testes concluídos!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
