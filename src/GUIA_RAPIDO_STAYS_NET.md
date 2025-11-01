# 🚀 GUIA RÁPIDO - INTEGRAÇÃO STAYS.NET

**v1.0.103.17** | **29/10/2025** | **Status: ✅ PRONTO**

---

## 🎯 ACESSO RÁPIDO

```
Dashboard → ⚙️ Configurações → ⚡ Integrações
```

---

## 🔧 CONFIGURAÇÃO EM 5 PASSOS

### 1️⃣ Obter API Key
```
1. Acessar: https://bvm.stays.net
2. Login → App Center → API Stays
3. Gerar API Key → Copiar
```

### 2️⃣ Configurar no RENDIZY
```
1. Clicar em "Configurar Integração" (card azul)
2. Base URL: https://stays.net/external-api
3. API Key: [colar chave]
```

### 3️⃣ Testar Conexão
```
1. Clicar em "Testar Conexão"
2. Aguardar: ✅ "Conexão estabelecida com sucesso!"
```

### 4️⃣ Salvar
```
1. Clicar em "Salvar Configuração"
2. Pronto! ✨
```

### 5️⃣ Testar Endpoints
```
1. Tab "Ambiente de Teste"
2. Clicar em um endpoint
3. Clicar no botão 🔄
4. Ver resposta JSON
```

---

## 📊 ENDPOINTS DISPONÍVEIS (12)

### 🏢 PROPRIEDADES
```
✓ GET /properties                - Listar todas
✓ GET /properties/{id}           - Detalhes
✓ GET /properties/{id}/amenities - Amenidades
```

### 📅 RESERVAS
```
✓ GET /reservations     - Listar todas
✓ GET /reservations/{id} - Detalhes
✓ POST /reservations    - Criar nova
```

### 💰 TARIFAS
```
✓ GET /rates           - Listar tarifas
✓ GET /rates/calendar  - Calendário
```

### 📆 DISPONIBILIDADE
```
✓ GET /availability           - Verificar
✓ GET /availability/calendar  - Calendário
```

### 👥 HÓSPEDES
```
✓ GET /guests        - Listar todos
✓ GET /guests/{id}   - Detalhes
```

---

## 🎨 INTERFACE

### Loja de Aplicativos
```
┌──────────────────────────────────────┐
│  Stays.net PMS         [🆕 NOVO]    │
│  ▸ Configurar Integração            │
└──────────────────────────────────────┘
```

### Configuração (3 Tabs)
```
[Configuração] [Mapeamento] [Teste]
     ↓
  Base URL: [________________]
  API Key:  [•••••••••••••••] 👁
  
  [Testar Conexão] [Salvar]
```

### Ambiente de Teste
```
┌─────────────┬─────────────────┐
│ ENDPOINTS   │ JSON RESPONSE   │
├─────────────┼─────────────────┤
│ 🏢 Props    │ {               │
│ 📅 Reservas │   "id": 123,    │
│ 💰 Tarifas  │   "name": "..." │
│ 📆 Disponib │ }               │
│ 👥 Hóspedes │                 │
│             │ [Exportar JSON] │
└─────────────┴─────────────────┘
```

---

## 🔍 FUNCIONALIDADES

### Filtros
```
🔍 Busca: [Digite para filtrar...]

Categorias:
[Todos] [Propriedades] [Reservas] [Tarifas] [Disponibilidade] [Hóspedes]
```

### Status
```
✅ Sucesso  - Badge verde
❌ Erro     - Badge vermelho
🔄 Testando - Loading spinner
```

### Exportação
```
1. Selecionar endpoint testado
2. Clicar em "Exportar JSON"
3. Arquivo baixado: staysnet-{endpoint}-{timestamp}.json
```

---

## 🎯 O QUE FAZER AGORA

### Checklist de Teste:
```
☐ 1. Configurar API Key
☐ 2. Testar conexão
☐ 3. Testar endpoint "Propriedades"
☐ 4. Testar endpoint "Reservas"
☐ 5. Testar endpoint "Tarifas"
☐ 6. Testar endpoint "Disponibilidade"
☐ 7. Testar endpoint "Hóspedes"
☐ 8. Exportar todos os JSONs
☐ 9. Analisar estrutura de dados
☐ 10. Mapear campos para RENDIZY
```

---

## 🆘 SOLUÇÃO DE PROBLEMAS

### ❌ Erro 401 (Não autorizado)
```
Solução:
✓ Verificar API Key
✓ Gerar nova chave no BVM
✓ Atualizar no RENDIZY
```

### ❌ Erro de Conexão
```
Solução:
✓ Verificar Base URL
✓ Verificar internet
✓ Verificar se API Stays está ativa
```

### ⚠️ Resposta Vazia []
```
Normal!
✓ Pode não ter dados cadastrados
✓ Verificar no painel BVM
```

---

## 📚 LINKS ÚTEIS

```
🌐 API Docs:      https://stays.net/external-api/#introduction
🖥️ Painel BVM:    https://bvm.stays.net
📖 Changelog:     /docs/changelogs/CHANGELOG_V1.0.103.17.md
📝 Doc Completa:  /INTEGRACAO_STAYS_NET_v1.0.103.17.md
```

---

## 🎊 PRONTO PARA USAR!

A integração está **100% funcional**. Agora é só:

1. ✅ Configurar
2. ✅ Testar
3. ✅ Analisar
4. ✅ Mapear

**Boa sorte! 🚀**

---

**Versão:** v1.0.103.17  
**Tipo:** Integração PMS  
**Status:** ✅ IMPLEMENTADO
