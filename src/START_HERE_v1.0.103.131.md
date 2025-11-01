# 🚀 START HERE - RENDIZY v1.0.103.131

**Bem-vindo ao RENDIZY!** Sistema completo de gestão de imóveis de temporada.

---

## ⚡ **INÍCIO RÁPIDO - 3 PASSOS**

### **1️⃣ Verificar Backend**

```bash
# O backend já está configurado!
# Acesse: https://seu-projeto.supabase.co/functions/v1/make-server-67caf26a/health

# Deve retornar:
{
  "status": "ok",
  "message": "RENDIZY Backend is running!"
}
```

### **2️⃣ Iniciar Frontend**

```bash
npm install
npm run dev
```

### **3️⃣ Acessar Sistema**

```
http://localhost:5173
```

---

## 📋 **MÓDULOS DISPONÍVEIS**

### **1. PAINEL INICIAL**
- Dashboard com métricas
- Resumo de ocupação
- Gráficos de desempenho

**Acesso:** Menu lateral → "Painel Inicial"

---

### **2. CALENDÁRIO**
- Visualização mensal/semanal
- Criar/editar reservas
- Bloqueios e manutenção
- Preços dinâmicos

**Acesso:** Menu lateral → "Calendário"

---

### **3. RESERVAS**
- Listar todas as reservas
- Filtros avançados
- Criar nova reserva
- Editar/cancelar

**Acesso:** Menu lateral → "Reservas"

---

### **4. IMÓVEIS (Propriedades)**
- Cadastro completo (14 steps)
- Upload de fotos
- Configurações financeiras
- Regras de hospedagem

**Acesso:** Menu lateral → "Imóveis"

**✨ NOVO: Wizard completo com:**
- 📘 7 steps de Conteúdo
- 💰 5 steps Financeiros
- ⚙️ 2 steps de Configurações

---

### **5. LOCAIS E ANÚNCIOS**
- Gestão de locais
- Gestão de anúncios/listings
- Amenidades por local
- Multi-unidade

**Acesso:** Menu lateral → "Locais e Anúncios"

---

### **6. HÓSPEDES**
- Cadastro de hóspedes
- Histórico de estadias
- Documentos
- Notas e tags

**Acesso:** Menu lateral → "Hóspedes"

---

### **7. CHAT (WhatsApp)**
- Inbox unificado
- Multi-provider
- Templates
- Importação de conversas

**Acesso:** Botão flutuante (canto inferior direito)

---

### **8. FINANCEIRO**
- Receitas/despesas
- Relatórios
- Comissões
- Repasses

**Acesso:** Menu lateral → "Financeiro"

---

### **9. CRM & TAREFAS**
- Gestão de leads
- Follow-ups
- Tarefas
- Pipeline

**Acesso:** Menu lateral → "CRM & Tarefas"

---

### **10. BI & ANALYTICS**
- Relatórios customizados
- Exportação
- Dashboards
- Métricas avançadas

**Acesso:** Menu lateral → "BI & Analytics"

---

### **11. INTEGRAÇÕES**
- Booking.com
- Stays.net
- WhatsApp
- iCal Sync

**Acesso:** Menu lateral → "Integrações"

---

### **12. CONFIGURAÇÕES**
- Preferências
- Tipos de propriedade
- Amenidades globais
- Usuários e permissões

**Acesso:** Menu lateral → "Configurações"

---

## 🎯 **FLUXO DE TRABALHO RECOMENDADO**

### **SETUP INICIAL:**

```
1. Configurações
   └─ Definir tipos de propriedade
   └─ Configurar amenidades globais
   └─ Adicionar usuários

2. Locais e Anúncios
   └─ Criar locais (buildings/condos)
   └─ Criar anúncios (unidades)

3. Imóveis
   └─ Cadastrar propriedades completas
   └─ Upload de fotos
   └─ Configurar preços

4. Hóspedes
   └─ Importar/criar hóspedes

5. Integrações
   └─ Conectar Booking.com
   └─ Configurar WhatsApp
   └─ Sincronizar iCal
```

### **USO DIÁRIO:**

```
1. Painel Inicial
   └─ Ver métricas do dia

2. Calendário
   └─ Verificar ocupação
   └─ Criar/editar reservas

3. Chat
   └─ Responder mensagens
   └─ Usar templates

4. Reservas
   └─ Confirmar check-ins/outs
   └─ Processar pagamentos
```

---

## 🆕 **WIZARD DE PROPRIEDADES**

### **Como usar:**

1. Acesse **"Imóveis"**
2. Clique em **"+ Nova Propriedade"**
3. Siga os **14 passos**:

```
📘 BLOCO 1: CONTEÚDO (7 passos)
   1. Tipo e Identificação
   2. Localização
   3. Cômodos e Distribuição
   4. Amenidades do Local (read-only)
   5. Amenidades da Acomodação
   6. Fotos e Mídia
   7. Descrição (multilíngue)

💰 BLOCO 2: FINANCEIRO (5 passos)
   1. Configuração de Relacionamento
   2. Preços Locação e Venda
   3. Configuração de preço temporada
   4. Precificação Individual
   5. Preços Derivados (hóspedes extras)

⚙️ BLOCO 3: CONFIGURAÇÕES (2 passos)
   1. Regras de Hospedagem
   2. [Outros em desenvolvimento]
```

### **✨ Funcionalidades do Wizard:**

- ✅ **Auto-save automático** (a cada 2s)
- ✅ **Navegação livre** entre passos
- ✅ **Validação por campo**
- ✅ **Progresso visual**
- ✅ **Draft recovery**
- ✅ **Multi-idioma** (PT/EN/ES)
- ✅ **Upload de múltiplas fotos**
- ✅ **Drag & drop**

---

## 🎨 **DICAS DE USO**

### **Atalhos de Teclado:**
```
Ctrl/Cmd + K       → Busca global
Esc                → Fechar modal
Tab                → Navegar campos
Enter              → Salvar/Confirmar
```

### **Dark Mode:**
- Toggle no menu lateral
- Persiste automaticamente

### **Multi-idioma:**
- Selector no topo da tela
- PT 🇧🇷 / EN 🇺🇸 / ES 🇪🇸

### **Auto-save:**
- Indicador visual no topo
- ⏳ Salvando...
- ✅ Salvo
- ❌ Erro ao salvar

---

## 📚 **DOCUMENTAÇÃO DETALHADA**

### **Arquivos Importantes:**

```
📖 SISTEMA_REESTABELECIDO_v1.0.103.131.md
   └─ Estado completo do sistema

📖 MAPA_DO_SISTEMA.md
   └─ Visão geral da arquitetura

📖 GUIA_RAPIDO_MODULOS_V3.md
   └─ Guia de cada módulo

📖 WIZARD_NOVA_ESTRUTURA_3_BLOCOS.md
   └─ Documentação do wizard

📖 ARQUITETURA_GLOBAL_VS_INDIVIDUAL.md
   └─ Sistema de herança de configs

📖 MAPEAMENTO_SECAO_FINANCEIRO_STAYS_NET.md
   └─ Mapeamento financeiro completo

📖 NOMENCLATURA_RENDIZY_vs_STAYS_v1.0.103.117.md
   └─ Glossário de termos
```

---

## 🐛 **TROUBLESHOOTING**

### **Backend não responde:**
```bash
# Verificar health
curl https://seu-projeto.supabase.co/functions/v1/make-server-67caf26a/health

# Verificar logs
deno task dev
```

### **Frontend com erro:**
```bash
# Limpar cache
rm -rf node_modules
npm install

# Limpar build
rm -rf dist
npm run build
```

### **Auto-save não funciona:**
- Verificar console do navegador
- Verificar conexão com backend
- Verificar permissões

### **Fotos não carregam:**
- Verificar tamanho (max 10MB)
- Verificar formato (JPG, PNG, WebP)
- Verificar CORS

---

## 🔐 **VARIÁVEIS DE AMBIENTE**

### **Já Configuradas:**
```bash
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_DB_URL
```

### **WhatsApp (Opcional):**
```bash
EVOLUTION_API_URL
EVOLUTION_INSTANCE_NAME
EVOLUTION_GLOBAL_API_KEY
EVOLUTION_INSTANCE_TOKEN
```

---

## 📞 **SUPORTE**

### **Documentação:**
- `/docs` - Documentação técnica
- `/guidelines` - Padrões de código

### **Logs:**
- `/docs/logs` - Histórico de implementações

### **Changelogs:**
- `/docs/changelogs` - Histórico de versões

---

## 🎉 **VOCÊ ESTÁ PRONTO!**

O sistema está **100% funcional** para:

```
✅ Cadastrar propriedades
✅ Criar reservas
✅ Gerenciar calendário
✅ Chat com hóspedes
✅ Sincronizar com OTAs
✅ Gerar relatórios
✅ Configurar preços
✅ Upload de fotos
```

---

## 🚀 **PRÓXIMOS PASSOS SUGERIDOS**

1. **Explorar o Wizard de Propriedades**
   - Criar sua primeira propriedade completa
   - Testar todos os 14 passos

2. **Configurar Integrações**
   - Conectar Booking.com
   - Ativar WhatsApp

3. **Criar Reservas de Teste**
   - Testar fluxo completo
   - Verificar cálculos

4. **Personalizar Configurações**
   - Tipos de propriedade
   - Amenidades globais
   - Regras padrão

---

**🎯 Dúvidas? Consulte:**
- `SISTEMA_REESTABELECIDO_v1.0.103.131.md`
- `MAPA_DO_SISTEMA.md`

**✨ Sistema Rendizy v1.0.103.131**  
**Pronto para uso!** 🚀
