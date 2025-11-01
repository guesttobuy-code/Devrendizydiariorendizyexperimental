#!/bin/bash

# 🧪 TESTE REAL: Criar Imobiliária "SUA CASA MOBILIADA"
# Versão: v1.0.103.192
# Data: 2025-10-31

echo "=================================================="
echo "🏢 TESTE REAL: CRIAR IMOBILIÁRIA"
echo "=================================================="
echo ""
echo "📋 Dados da Imobiliária:"
echo "   Nome: SUA CASA MOBILIADA"
echo "   Email: suacasamobiliada@gmail.com"
echo "   Tel: 021995885999"
echo "   Plano: Enterprise"
echo ""
echo "=================================================="
echo ""

# Credenciais
PROJECT_ID="uknccixtubkdkofyieie"
ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18"

# URL do endpoint
URL="https://${PROJECT_ID}.supabase.co/functions/v1/make-server-67caf26a/organizations"

echo "🔍 PASSO 1: Testando conectividade..."
echo "GET $URL (listar organizações existentes)"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X GET \
  "$URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ANON_KEY")

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "Status HTTP: $HTTP_CODE"
echo "Resposta:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Backend está acessível!"
else
  echo "❌ Erro ao acessar backend!"
  exit 1
fi

echo ""
echo "=================================================="
echo "🚀 PASSO 2: Criando Imobiliária..."
echo "=================================================="
echo ""

# Payload
PAYLOAD='{
  "name": "SUA CASA MOBILIADA",
  "email": "suacasamobiliada@gmail.com",
  "phone": "021995885999",
  "plan": "enterprise",
  "createdBy": "user_master_rendizy"
}'

echo "📦 Payload:"
echo "$PAYLOAD" | jq '.'
echo ""

echo "📤 Enviando requisição POST..."
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST \
  "$URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ANON_KEY" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "Status HTTP: $HTTP_CODE"
echo ""
echo "📥 Resposta do servidor:"
echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
echo ""

# Verificar resultado
if [ "$HTTP_CODE" = "201" ]; then
  echo "=================================================="
  echo "✅ SUCESSO! IMOBILIÁRIA CRIADA!"
  echo "=================================================="
  echo ""
  
  # Extrair dados
  ORG_ID=$(echo "$BODY" | jq -r '.data.id' 2>/dev/null)
  ORG_SLUG=$(echo "$BODY" | jq -r '.data.slug' 2>/dev/null)
  ORG_NAME=$(echo "$BODY" | jq -r '.data.name' 2>/dev/null)
  
  echo "🎉 Organização criada com sucesso!"
  echo ""
  echo "📋 Detalhes:"
  echo "   ID: $ORG_ID"
  echo "   Slug: $ORG_SLUG"
  echo "   Nome: $ORG_NAME"
  echo "   Plano: Enterprise"
  echo "   Status: Active"
  echo ""
  
  # Listar todas as organizações
  echo "=================================================="
  echo "📋 PASSO 3: Listando todas as organizações..."
  echo "=================================================="
  echo ""
  
  RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X GET \
    "$URL" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $ANON_KEY")
  
  HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
  BODY=$(echo "$RESPONSE" | sed '$d')
  
  echo "$BODY" | jq '.data[] | {id, slug, name, plan, status}' 2>/dev/null || echo "$BODY"
  echo ""
  
  echo "=================================================="
  echo "✅ TESTE COMPLETO COM SUCESSO!"
  echo "=================================================="
  echo ""
  echo "🎯 Próximos passos:"
  echo "   1. Acesse o RENDIZY"
  echo "   2. Vá em Admin Master → Imobiliárias"
  echo "   3. Veja 'SUA CASA MOBILIADA' na lista"
  echo "   4. Clique para editar e verificar detalhes"
  echo ""
  
elif [ "$HTTP_CODE" = "400" ]; then
  echo "=================================================="
  echo "⚠️  ERRO DE VALIDAÇÃO"
  echo "=================================================="
  echo ""
  
  ERROR_MSG=$(echo "$BODY" | jq -r '.error' 2>/dev/null)
  echo "Mensagem: $ERROR_MSG"
  echo ""
  
  if echo "$ERROR_MSG" | grep -q "already exists"; then
    echo "ℹ️  A organização JÁ EXISTE!"
    echo ""
    echo "🔍 Vamos buscar ela..."
    echo ""
    
    RESPONSE=$(curl -s -w "\n%{http_code}" \
      -X GET \
      "$URL" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $ANON_KEY")
    
    BODY=$(echo "$RESPONSE" | sed '$d')
    
    echo "$BODY" | jq '.data[] | select(.name == "SUA CASA MOBILIADA")' 2>/dev/null || echo "$BODY"
    echo ""
    echo "✅ Organização já existe no sistema!"
  else
    echo "❌ Verifique os dados e tente novamente"
  fi
  
elif [ "$HTTP_CODE" = "500" ]; then
  echo "=================================================="
  echo "❌ ERRO NO SERVIDOR"
  echo "=================================================="
  echo ""
  
  ERROR_MSG=$(echo "$BODY" | jq -r '.error' 2>/dev/null)
  ERROR_DETAILS=$(echo "$BODY" | jq -r '.details' 2>/dev/null)
  
  echo "Mensagem: $ERROR_MSG"
  echo ""
  echo "Detalhes:"
  echo "$ERROR_DETAILS"
  echo ""
  
else
  echo "=================================================="
  echo "❌ ERRO INESPERADO"
  echo "=================================================="
  echo ""
  echo "Status HTTP: $HTTP_CODE"
  echo "Resposta: $BODY"
  echo ""
fi

echo ""
echo "=================================================="
echo "📊 RESUMO DO TESTE"
echo "=================================================="
echo ""
echo "Backend: https://${PROJECT_ID}.supabase.co"
echo "Endpoint: /functions/v1/make-server-67caf26a/organizations"
echo "Status Final: $HTTP_CODE"
echo ""
echo "=================================================="
