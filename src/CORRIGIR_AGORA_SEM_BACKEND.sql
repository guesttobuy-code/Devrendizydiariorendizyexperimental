-- ============================================================
-- CORREÇÃO DIRETA NO BANCO DE DADOS - API KEY DO WHATSAPP
-- ============================================================
-- 
-- Execute este SQL diretamente no Supabase Dashboard
-- para corrigir a API Key sem precisar do backend
--
-- URL: https://supabase.com/dashboard/project/uknccixtubkdkofyieie/editor
-- ============================================================

-- 1. VERIFICAR CONFIGURAÇÃO ATUAL
-- ============================================================

SELECT 
    key,
    value->>'organization_id' as org_id,
    value->'whatsapp'->>'api_key' as api_key_atual,
    value->'whatsapp'->>'api_url' as api_url,
    value->'whatsapp'->>'instance_name' as instance_name,
    value->'whatsapp'->>'enabled' as enabled,
    updated_at
FROM kv_store_67caf26a
WHERE key = 'chat:channels:config:org_default';

-- ============================================================
-- 2. ATUALIZAR API KEY PARA A NOVA
-- ============================================================
-- IMPORTANTE: Execute apenas se a API Key atual for a antiga
-- API Key ANTIGA: F7DE5EFFB66B-4E43-B11F-F0D5D8849741
-- API Key NOVA:   4de7861e944e291b56fe9781d2b00b36
-- ============================================================

UPDATE kv_store_67caf26a
SET 
    value = jsonb_set(
        value::jsonb,
        '{whatsapp,api_key}',
        '"4de7861e944e291b56fe9781d2b00b36"'::jsonb
    ),
    updated_at = NOW()
WHERE key = 'chat:channels:config:org_default';

-- ============================================================
-- 3. VERIFICAR SE A ATUALIZAÇÃO FOI APLICADA
-- ============================================================

SELECT 
    key,
    value->>'organization_id' as org_id,
    value->'whatsapp'->>'api_key' as api_key_nova,
    value->'whatsapp'->>'api_url' as api_url,
    value->'whatsapp'->>'instance_name' as instance_name,
    updated_at as atualizado_em
FROM kv_store_67caf26a
WHERE key = 'chat:channels:config:org_default';

-- ============================================================
-- 4. (OPCIONAL) CRIAR CONFIGURAÇÃO SE NÃO EXISTIR
-- ============================================================
-- Execute APENAS se a query acima não retornar nenhum resultado
-- ============================================================

INSERT INTO kv_store_67caf26a (key, value, created_at, updated_at)
VALUES (
    'chat:channels:config:org_default',
    '{
        "organization_id": "org_default",
        "whatsapp": {
            "enabled": true,
            "api_url": "https://evo.boravendermuito.com.br",
            "instance_name": "Rendizy",
            "api_key": "4de7861e944e291b56fe9781d2b00b36",
            "connected": false,
            "connection_status": "disconnected"
        },
        "created_at": "'|| NOW() ||'",
        "updated_at": "'|| NOW() ||'"
    }'::jsonb,
    NOW(),
    NOW()
)
ON CONFLICT (key) DO UPDATE
SET 
    value = EXCLUDED.value,
    updated_at = NOW();

-- ============================================================
-- 5. VERIFICAÇÃO FINAL
-- ============================================================

SELECT 
    '✅ API Key atualizada com sucesso!' as status,
    value->'whatsapp'->>'api_key' = '4de7861e944e291b56fe9781d2b00b36' as api_key_correta,
    value->'whatsapp'->>'api_url' as url,
    value->'whatsapp'->>'instance_name' as instancia,
    updated_at as data_atualizacao
FROM kv_store_67caf26a
WHERE key = 'chat:channels:config:org_default';

-- ============================================================
-- RESULTADO ESPERADO:
-- ============================================================
-- status: ✅ API Key atualizada com sucesso!
-- api_key_correta: true
-- url: https://evo.boravendermuito.com.br
-- instancia: Rendizy
-- data_atualizacao: (timestamp atual)
-- ============================================================
