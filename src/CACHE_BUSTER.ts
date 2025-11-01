/**
 * RENDIZY - Cache Buster
 * 
 * Força reload do app quando versão muda
 * 
 * @version v1.0.103.175
 * @date 2025-10-31
 */

const BUILD_INFO = {
  version: 'v1.0.103.180',
  buildDate: '2025-11-01 01:15:00',
  buildNumber: 180,
  features: [
    '✅ Fallback Tipos de Propriedade ADICIONADO',
    '✅ Sistema resiliente sem backend',
    '✅ Step 1 funcionando offline',
    '✅ Dados mockados para tipos',
    '✅ Zero bloqueios por backend',
  ],
  changes: [
    'FIX: Erro "Failed to fetch" ao buscar tipos de propriedade',
    'Adicionado fallback com dados mockados no ContentTypeStep',
    'Sistema funciona mesmo com backend offline',
    'Console mostra warning quando usa fallback',
    'Wizard Step 1 100% funcional',
  ]
};

export default BUILD_INFO;
