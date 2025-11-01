// 🔍 DEBUG: Por que organizações não aparecem?
// Cole este código no console do navegador (F12)

console.log('═══════════════════════════════════════════');
console.log('🔍 DEBUG: ORGANIZAÇÕES');
console.log('═══════════════════════════════════════════');
console.log('');

// 1. Verificar localStorage
console.log('📊 1. Verificando localStorage...');
const offlineData = localStorage.getItem('rendizy_offline_organizations');
console.log('   Dados offline:', offlineData ? JSON.parse(offlineData).length + ' organizações' : 'Nenhuma');
if (offlineData) {
  const orgs = JSON.parse(offlineData);
  orgs.forEach((org, i) => {
    console.log(`   ${i + 1}. ${org.name} (${org.id})`);
  });
}
console.log('');

// 2. Verificar modo offline
console.log('📊 2. Verificando modo offline...');
const offlineMode = localStorage.getItem('rendizy_offline_mode');
console.log('   Modo offline:', offlineMode ? 'ATIVO' : 'INATIVO');
console.log('   Motivo:', localStorage.getItem('rendizy_offline_reason'));
console.log('');

// 3. Verificar erros no console
console.log('📊 3. Verificando erros...');
console.log('   Verifique a aba Console acima para erros em vermelho');
console.log('');

// 4. Forçar reload com dados mock
console.log('📊 4. FORÇANDO carregamento de dados mock...');
console.log('');

// Criar organizações de teste no localStorage
const testOrgs = [
  {
    id: "9090909",
    name: "Sua Casa Mobiliada",
    slug: "rendizy_sua-casa-mobiliada",
    status: "active",
    plan: "professional",
    email: "contato@suacasamobiliada.com",
    phone: "(11) 99999-9999",
    legalName: "Sua Casa Mobiliada Ltda",
    taxId: "45.678.901/0001-23",
    settings: {
      language: "pt",
      timezone: "America/Sao_Paulo",
      currency: "BRL",
      dateFormat: "DD/MM/YYYY",
      maxUsers: 15,
      maxProperties: 100
    },
    limits: {
      users: 15,
      properties: 100,
      reservations: 5000,
      storage: 999999
    },
    usage: {
      users: 0,
      properties: 0,
      reservations: 0,
      storage: 0
    },
    createdAt: new Date('2025-10-31').toISOString(),
    updatedAt: new Date().toISOString(),
    billingCycle: "monthly",
    nextBillingDate: new Date('2025-11-30').toISOString()
  },
  {
    id: "1",
    name: "GuestToBuy Imóveis",
    slug: "rendizy_guesttobuy",
    status: "active",
    plan: "professional",
    email: "contato@guesttobuy.com",
    phone: "(11) 98765-4321",
    legalName: "GuestToBuy Imóveis Ltda",
    taxId: "12.345.678/0001-90",
    settings: {
      language: "pt",
      timezone: "America/Sao_Paulo",
      currency: "BRL",
      dateFormat: "DD/MM/YYYY",
      maxUsers: 10,
      maxProperties: 50
    },
    limits: {
      users: 10,
      properties: 50,
      reservations: 1000,
      storage: 5000
    },
    usage: {
      users: 7,
      properties: 32,
      reservations: 245,
      storage: 2340
    },
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date().toISOString(),
    billingCycle: "monthly",
    nextBillingDate: new Date('2025-11-15').toISOString()
  }
];

// Salvar no localStorage
localStorage.setItem('rendizy_offline_organizations', JSON.stringify(testOrgs));

console.log('✅ Salvei 2 organizações no localStorage:');
testOrgs.forEach((org, i) => {
  console.log(`   ${i + 1}. ${org.name} (ID: ${org.id})`);
});
console.log('');

// 5. Ativar modo offline
console.log('📊 5. Ativando modo offline...');
localStorage.setItem('rendizy_offline_mode', 'true');
localStorage.setItem('rendizy_offline_reason', 'Debug manual - forçar dados offline');
console.log('   ✅ Modo offline ativado');
console.log('');

// 6. Recarregar página
console.log('═══════════════════════════════════════════');
console.log('🔄 RECARREGANDO PÁGINA EM 3 SEGUNDOS...');
console.log('═══════════════════════════════════════════');
console.log('');
console.log('Após recarregar:');
console.log('1. Ir para Admin Master → Imobiliárias');
console.log('2. Você DEVE ver 2 organizações:');
console.log('   - Sua Casa Mobiliada');
console.log('   - GuestToBuy Imóveis');
console.log('');

setTimeout(() => {
  console.log('🔄 Recarregando...');
  location.reload();
}, 3000);
