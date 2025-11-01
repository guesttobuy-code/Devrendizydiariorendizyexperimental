#!/bin/bash

echo "======================================"
echo "🧪 TESTE RÁPIDO DO BACKEND"
echo "======================================"
echo ""

URL="https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/health"

echo "📍 Testando: $URL"
echo ""

# Fazer requisição com timeout de 5s
RESPONSE=$(curl -s -w "\n%{http_code}" --max-time 5 "$URL" 2>&1)
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ BACKEND ESTÁ ONLINE!"
    echo ""
    echo "Resposta:"
    echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎉 TUDO FUNCIONANDO!"
    echo ""
    echo "Próximos passos:"
    echo "1. Recarregue a página (Ctrl+R)"
    echo "2. O sistema sairá do modo offline"
    echo "3. Dados reais serão carregados"
elif [ "$HTTP_CODE" = "000" ]; then
    echo "❌ BACKEND ESTÁ OFFLINE"
    echo ""
    echo "Erro: Timeout ou conexão recusada"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "💡 SOLUÇÕES:"
    echo ""
    echo "1️⃣  FAZER DEPLOY DO BACKEND:"
    echo "    cd supabase/functions"
    echo "    supabase functions deploy make-server-67caf26a"
    echo ""
    echo "2️⃣  VERIFICAR SE ESTÁ DEPLOYADO:"
    echo "    supabase functions list"
    echo ""
    echo "3️⃣  VER LOGS:"
    echo "    supabase functions logs make-server-67caf26a"
    echo ""
    echo "4️⃣  CONTINUAR EM MODO OFFLINE:"
    echo "    O sistema já funciona offline com dados mock"
    echo "    Não precisa fazer nada!"
else
    echo "⚠️  BACKEND RESPONDEU MAS COM ERRO"
    echo ""
    echo "HTTP Code: $HTTP_CODE"
    echo "Resposta:"
    echo "$BODY"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "💡 POSSÍVEIS CAUSAS:"
    echo ""
    echo "• CORS bloqueando"
    echo "• Credenciais inválidas"
    echo "• Função com erro"
    echo "• Endpoint não existe"
fi

echo ""
echo "======================================"
