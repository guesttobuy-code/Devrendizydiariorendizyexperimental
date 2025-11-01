// 🧪 CRIAR ORGANIZAÇÃO "SUA CASA MOBILIADA" - CONSOLE
// Cole este código no console do navegador (F12)

console.log('🚀 Iniciando criação de organização...');
console.log('');

// Opção 1: Criar no Backend (se online)
async function criarNoBackend() {
  console.log('📡 Tentando criar no backend...');
  
  try {
    const response = await fetch(
      'https://uknccixtubkdkofyieie.supabase.co/functions/v1/make-server-67caf26a/organizations',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbmNjaXh0dWJrZGtvZnlpZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDEyNDksImV4cCI6MjA3NzAxNzI0OX0.WzNvNkRlEUF9db3sBplotWZXHVmMMkScJzlUpDWAi18',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Sua Casa Mobiliada',
          email: 'contato@suacasamobiliada.com',
          phone: '(11) 99999-9999',
          plan: 'professional',
          legalName: 'Sua Casa Mobiliada Ltda',
          taxId: '45.678.901/0001-23'
        })
      }
    );

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ SUCESSO! Organização criada no backend!');
      console.log('');
      console.log('📋 Dados:', data.data);
      console.log('');
      console.log('🔄 Recarregando página...');
      setTimeout(() => location.reload(), 2000);
      return true;
    } else {
      console.error('❌ Erro do backend:', data.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
    return false;
  }
}

// Opção 2: Criar Offline (localStorage)
function criarOffline() {
  console.log('💾 Criando offline (localStorage)...');
  
  const orgOffline = {
    id: `offline_${Date.now()}_abc123`,
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    // Pegar organizações existentes
    const existing = JSON.parse(
      localStorage.getItem('rendizy_offline_organizations') || '[]'
    );

    // Adicionar nova
    existing.push(orgOffline);

    // Salvar
    localStorage.setItem(
      'rendizy_offline_organizations',
      JSON.stringify(existing)
    );

    console.log('✅ SUCESSO! Organização criada offline!');
    console.log('');
    console.log('📋 Dados:', orgOffline);
    console.log('');
    console.log('📊 Total offline:', existing.length);
    console.log('');
    console.log('🔄 Recarregando página...');
    
    setTimeout(() => location.reload(), 2000);
    return true;
  } catch (error) {
    console.error('❌ Erro ao salvar offline:', error);
    return false;
  }
}

// Verificar status
function verificarStatus() {
  console.log('🔍 Verificando status...');
  console.log('');
  
  // Ver localStorage
  const offline = localStorage.getItem('rendizy_offline_organizations');
  console.log('💾 Organizações offline:', offline ? JSON.parse(offline).length : 0);
  
  if (offline) {
    const orgs = JSON.parse(offline);
    console.log('📋 Lista offline:');
    orgs.forEach((org, i) => {
      console.log(`   ${i + 1}. ${org.name} (${org.id})`);
    });
  }
  
  console.log('');
}

// Executar automaticamente
(async function() {
  console.log('═══════════════════════════════════════════');
  console.log('🏢 CRIAR ORGANIZAÇÃO: SUA CASA MOBILIADA');
  console.log('═══════════════════════════════════════════');
  console.log('');
  
  // Verificar status atual
  verificarStatus();
  
  // Tentar backend primeiro
  console.log('📡 Tentando backend...');
  const backendOk = await criarNoBackend();
  
  if (!backendOk) {
    console.log('');
    console.log('⚠️ Backend offline ou inacessível');
    console.log('💾 Criando offline como fallback...');
    console.log('');
    criarOffline();
  }
})();

// Funções auxiliares disponíveis
console.log('');
console.log('💡 Funções disponíveis no console:');
console.log('   criarNoBackend()    - Tenta criar no backend');
console.log('   criarOffline()      - Cria offline (localStorage)');
console.log('   verificarStatus()   - Ver organizações offline');
console.log('');
