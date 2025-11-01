# 🚀 GUIA RÁPIDO - Criar Location e Listing Completo para Testes

## ⚡ Execução em 3 Passos

### 1️⃣ Abrir BackendTester
```
Menu: Admin Master → Backend Tester
```

### 2️⃣ Clicar no Botão
```
Botão: "Teste Completo - Location + Listing"
```

### 3️⃣ Aguardar Confirmação
```
✅ Resultado verde = Sucesso!
```

---

## 📋 O Que Será Criado

### 🏢 1 Location
- **Nome**: Edifício Copacabana Sunset Tower
- **Código**: COPA-ST
- **Endereço**: Av. Atlântica, 2964 - Copacabana/RJ
- **Amenities**: 14 items (piscina, academia, portaria 24h...)

### 🏠 1 Property (Accommodation)
- **Nome**: Apartamento 1502 - Vista Mar Premium
- **Código**: COPA-ST-1502
- **Capacidade**: 6 hóspedes | 3 quartos | 2 banheiros
- **Área**: 145m²
- **Preço base**: R$ 450,00/noite
- **Amenities**: 35 items

### 🛏️ 6 Rooms (Cômodos)
1. Suíte Master (king size)
2. Quarto Twin (2 solteiro)
3. Quarto Duplo (casal)
4. Banheiro Suíte
5. Banheiro Social
6. Sala de Estar (sofá-cama)

### 📢 1 Listing Completo
- **Plataformas**: Airbnb ✅ | Booking ✅ | Direct ✅
- **Idiomas**: Português, Inglês, Espanhol
- **iCal Sync**: 2 URLs configuradas
- **Preços Derivados**: Taxa R$ 80/noite (5º hóspede+)
- **Regras**: Pets OK (taxa R$ 50) | Não fumante | Sem festas

---

## 🔍 Como Verificar

### Ver Location
```
Menu: Locais e Anúncios → Aba "Locais"
Procurar: "Edifício Copacabana Sunset Tower"
```

### Ver Property
```
Menu: Propriedades ou Calendário
Procurar: "Apartamento 1502 - Vista Mar Premium"
```

### Ver Rooms
```
Abrir Property → Aba "Cômodos"
Deve mostrar: 6 cômodos configurados
```

### Ver Listing
```
Menu: Locais e Anúncios → Aba "Anúncios"
Procurar: Apartamento de Luxo 3 Quartos
Verificar: 3 plataformas ativas
```

---

## 🧪 Testar Funcionalidades

### ✅ Criar Reserva com Hóspede Extra
```
Property: Apartamento 1502
Hóspedes: 5 adultos
Resultado: Sistema calcula +R$ 80/noite (5º hóspede)
```

### ✅ Reserva com Criança
```
Hóspedes: 2 adultos + 1 criança (8 anos)
Resultado: 50% desconto na criança
```

### ✅ Reserva com Pet
```
Hóspedes: 2 adultos + 1 pet
Resultado: +R$ 50 na reserva
```

---

## ❓ Problemas?

### Location não aparece
**Solução**: Recarregue a página (F5)

### Erro ao executar seed
**Solução**: Verifique console do navegador (F12)

### Dados não aparecem
**Solução**: Limpe cache ou use aba anônima

---

## 📚 Documentação Completa

Ver arquivo: `/TESTE_LOCATION_LISTING_COMPLETO.md`

---

## ✅ Checklist Rápido

- [ ] BackendTester aberto
- [ ] Botão "Teste Completo" clicado
- [ ] Resultado ✅ verde apareceu
- [ ] Location aparece em "Locais"
- [ ] Property aparece em "Propriedades"
- [ ] 6 Rooms configurados
- [ ] Listing com 3 plataformas
- [ ] Pronto para testar! 🎉

---

**Tempo total**: ~2 minutos  
**Versão**: v1.0.87  
**Data**: 28/10/2025
