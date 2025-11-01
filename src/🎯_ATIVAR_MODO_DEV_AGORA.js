// 🎯 ATIVAR MODO DESENVOLVIMENTO
// Cole este código no console (F12) e pressione ENTER

console.log('');
console.log('═══════════════════════════════════════════');
console.log('🎯 ATIVANDO MODO DESENVOLVIMENTO');
console.log('═══════════════════════════════════════════');
console.log('');

// Ativar modo dev
localStorage.setItem('rendizy_dev_mode', 'true');
localStorage.setItem('rendizy_use_mock_data', 'true');
localStorage.setItem('rendizy_offline_mode', 'true');

console.log('✅ Configurações aplicadas:');
console.log('   ✓ Modo desenvolvimento: ATIVO');
console.log('   ✓ Dados mock: ATIVO');
console.log('   ✓ Modo offline: ATIVO');
console.log('');

console.log('🎨 Você verá:');
console.log('   • Badge amarelo no canto superior direito');
console.log('   • "🧪 DESENVOLVIMENTO - Dados são fictícios"');
console.log('   • Pode testar sem medo de afetar produção');
console.log('');

console.log('💾 Armazenamento local:');
console.log('   • Todas as alterações ficam no navegador');
console.log('   • Não afeta backend de produção');
console.log('   • Pode criar/editar/deletar à vontade');
console.log('');

console.log('═══════════════════════════════════════════');
console.log('🔄 RECARREGANDO PÁGINA EM 2 SEGUNDOS...');
console.log('═══════════════════════════════════════════');
console.log('');

setTimeout(() => {
  console.log('🚀 Recarregando...');
  location.reload();
}, 2000);

// Mensagem final
console.log('💡 Para DESATIVAR modo dev, execute:');
console.log('   localStorage.removeItem("rendizy_dev_mode");');
console.log('   location.reload();');
console.log('');
