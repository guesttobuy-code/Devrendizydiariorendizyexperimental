# 🧪 TESTE AGORA - INTEGRAÇÃO STAYS.NET

**Versão:** v1.0.103.23  
**Data:** 29 de Outubro de 2025  
**Conta:** Sua Casa Rende Mais  

---

## ⚡ TESTE EM 5 MINUTOS

### Passo 1: Abrir RENDIZY
```
→ Acessar seu RENDIZY
→ Fazer login
```

---

### Passo 2: Ir para Configurações
```
→ Clicar no ícone ⚙️ (canto superior direito)
→ Clicar na tab "⚡ Integrações"
```

---

### Passo 3: Configurar Stays.net

**Localizar o card:**
```
┌────────────────────────────────────────┐
│ 🏢 Stays.net PMS      [🆕 NOVO]       │
│                                        │
│ [Configurar Integração]                │
└────────────────────────────────────────┘
```

**Clicar em:** `[Configurar Integração]`

---

### Passo 4: Preencher Dados

**Na tab "Configuração":**

```
┌─────────────────────────────────────────┐
│ Base URL                                │
│ ┌─────────────────────────────────────┐ │
│ │ https://bvm.stays.net/api           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ API Key / Login                         │
│ ┌─────────────────────────────────────┐ │
│ │ a5146970                            │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ API Secret / Senha (Opcional)           │
│ ┌─────────────────────────────────────┐ │
│ │ bfcf4daf                            │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Preencher:**
1. Base URL: `https://bvm.stays.net/api`
2. API Key / Login: `a5146970`
3. API Secret / Senha: `bfcf4daf`

---

### Passo 5: Testar Conexão

```
→ Clicar no botão [Testar Conexão]
→ Aguardar 2-3 segundos
```

**Resultado esperado:**
```
✅ "Conexão estabelecida com sucesso!"
```

**Se der erro:** Continue para "Troubleshooting" abaixo

---

### Passo 6: Salvar

```
→ Clicar no botão [Salvar Configuração]
→ Aguardar mensagem: "Configuração salva com sucesso!"
```

---

### Passo 7: Testar Endpoints

**Ir para tab "Ambiente de Teste":**

```
1. Clicar na tab "Ambiente de Teste"
2. Na lista da esquerda, clicar em "Listar Propriedades"
3. Clicar no botão 🔄 (Refresh)
4. Ver resposta JSON no painel direito
```

**O que você deve ver:**
```json
{
  "success": true,
  "data": {
    ...suas propriedades...
  }
}
```

---

### Passo 8: Buscar Reservas de Ontem

**Ir para tab "Análise de Reservas":**

```
1. Clicar na tab "Análise de Reservas"
2. [Buscar Todas as Reservas]
3. Aguardar carregamento (2-5 segundos)
4. Sistema auto-detecta campo de data
5. Ver mensagem: "Campo detectado: created_at" (ou similar)
6. Data já vem preenchida: 2025-10-28
7. [Filtrar Reservas de 2025-10-28]
```

**Resultado:**
```
┌──────────────────────────────────────┐
│ Reservas de 2025-10-28               │
│ X reserva(s) encontrada(s)           │
├──────────────────────────────────────┤
│ #RES-XXX  [Status]                   │
│ 👤 Nome do Hóspede                    │
│ 🏠 Nome da Propriedade                │
│ ...                                  │
└──────────────────────────────────────┘
```

---

### Passo 9: Ver no Dashboard

```
1. Voltar ao Dashboard Inicial
2. Procurar card no topo:

┌──────────────────────────────────────┐
│ 📅 Reservas Stays.net    [🔄]       │
├──────────────────────────────────────┤
│  X       ┃    X     ┃     X          │
│ Ontem    ┃  Hoje    ┃ Esta Semana   │
└──────────────────────────────────────┘

3. ✅ SUCESSO! Integração funcionando!
```

---

## 🐛 TROUBLESHOOTING

### Problema: "Falha na conexão"

**Teste Base URLs alternativas:**

1. **Teste 1:** `https://bvm.stays.net/api`
2. **Teste 2:** `https://bvm.stays.net/external-api`
3. **Teste 3:** `https://stays.net/api/bvm`
4. **Teste 4:** `https://api.bvm.stays.net`

**Como testar:**
```
→ Alterar Base URL
→ [Testar Conexão]
→ Se funcionar → [Salvar]
```

---

### Problema: "Error 403 Forbidden"

**Causa:** IP não autorizado

**Solução:**
```
1. Acessar https://bvm.stays.net
2. Fazer login com suas credenciais
3. Ir em: App Center → API Stays
4. Procurar "Lista de IPs permitidos" ou "Whitelist"
5. Adicionar: "Todos os IPs" ou IP específico
6. Salvar
7. Voltar ao RENDIZY e testar novamente
```

---

### Problema: "Error 401 Unauthorized"

**Causa:** Credenciais incorretas

**Verificar:**
```
✓ Login: a5146970 (sem espaços)
✓ Senha: bfcf4daf (sem espaços)
✓ Maiúsculas/minúsculas corretas
```

**Resetar senha (se necessário):**
```
1. Acessar https://bvm.stays.net
2. App Center → API Stays
3. Gerar nova senha
4. Atualizar no RENDIZY
5. Testar novamente
```

---

### Problema: "Error 404 Not Found"

**Causa:** Endpoint incorreto

**Soluções:**

**1. Verificar documentação:**
```
https://bvm.stays.net → App Center → API Stays → Documentação
```

**2. Testar endpoints manualmente:**
```bash
# No terminal ou Postman:
curl -X GET "https://bvm.stays.net/api/properties" \
  -H "Authorization: Basic YTUxNDY5NzA6YmZjZjRkYWY="
```

**3. Possíveis endpoints corretos:**
```
/api/v1/properties
/v1/properties
/properties
/external-api/properties
```

---

### Problema: "Nenhuma reserva encontrada"

**Possíveis causas:**

**1. Não há reservas nessa data**
```
→ Testar com data diferente
→ Testar com "hoje" (29/10/2025)
```

**2. Campo de data incorreto**
```
→ Ver seção "Análise da Estrutura"
→ Selecionar campo manualmente
→ Tentar novamente
```

**3. Formato de data diferente**
```
→ API pode usar formato diferente
→ Exportar JSON de exemplo
→ Me enviar para análise
```

---

## 📤 SE NADA FUNCIONAR

**Me envie:**

### 1. Print da Tela de Configuração
```
→ Mostrando Base URL preenchida
→ Mostrando mensagem de erro (se houver)
```

### 2. Resposta do Teste de Conexão
```
→ Tab "Ambiente de Teste"
→ Clicar em "Listar Propriedades"
→ Print da resposta JSON completa (ou erro)
```

### 3. Informações do Painel Stays.net
```
→ Acessar https://bvm.stays.net
→ App Center → API Stays
→ Ver:
   - Base URL indicada na documentação
   - Formato de autenticação requerido
   - Exemplos de código (se houver)
→ Print dessas informações
```

**Com isso eu consigo:**
- Identificar o formato correto da API
- Ajustar código de integração
- Corrigir mapeamento de campos
- Garantir funcionamento 100%

---

## ✅ CHECKLIST COMPLETO

### Antes de começar:
- [ ] RENDIZY acessível
- [ ] Login feito
- [ ] Credenciais Stays.net em mãos

### Configuração:
- [ ] Abrir Configurações → Integrações
- [ ] Localizar Stays.net PMS
- [ ] [Configurar Integração]
- [ ] Preencher Base URL: `https://bvm.stays.net/api`
- [ ] Preencher Login: `a5146970`
- [ ] Preencher Senha: `bfcf4daf`
- [ ] [Testar Conexão]
- [ ] Aguardar sucesso ✅
- [ ] [Salvar Configuração]

### Testes:
- [ ] Tab "Ambiente de Teste"
- [ ] Testar "Listar Propriedades"
- [ ] Ver resposta JSON
- [ ] Testar "Listar Reservas"
- [ ] Ver resposta JSON
- [ ] Tab "Análise de Reservas"
- [ ] [Buscar Todas as Reservas]
- [ ] Ver campo detectado
- [ ] Filtrar por data (28/10)
- [ ] Ver lista de reservas

### Validação Final:
- [ ] Voltar ao Dashboard
- [ ] Ver card "Reservas Stays.net"
- [ ] Ver números (Ontem, Hoje, Semana)
- [ ] [Atualizar] para dados frescos
- [ ] ✅ Tudo funcionando!

---

## 🎯 RESULTADO FINAL ESPERADO

### Dashboard Inicial:
```
┌──────────────────────────────────────────────┐
│ 📅 Reservas Stays.net         [🔄]          │
│ Última atualização: 29/10/2025 16:00        │
├──────────────────────────────────────────────┤
│                                              │
│   12        ┃      5       ┃      24         │
│  Ontem      ┃     Hoje     ┃  Esta Semana   │
│  28/10      ┃    29/10     ┃      ↗         │
│                                              │
└──────────────────────────────────────────────┘

✅ Resposta imediata à pergunta:
   "Quantas reservas tivemos ontem?"
   → 12 reservas!
```

---

## 🚀 APÓS CONFIGURAÇÃO

### Uso Diário:

**Manhã:**
```
1. Abrir RENDIZY
2. Dashboard já mostra estatísticas
3. Ver "Ontem" para reservas de ontem
4. Ver "Hoje" para reservas de hoje
5. [Atualizar] se quiser dados frescos
```

**Quando precisar de detalhes:**
```
1. Configurações → Integrações → Stays.net
2. Tab "Análise de Reservas"
3. [Buscar Todas] → Filtrar por data
4. Ver lista completa com nomes
5. [Exportar JSON] se quiser salvar
```

---

## 💡 PRÓXIMOS PASSOS

### Após configuração funcionar:

**1. Sincronização Automática (Futuro)**
```
→ Sistema busca novas reservas a cada 5 minutos
→ Notificação push quando chegar nova reserva
→ Dashboard sempre atualizado
```

**2. Importação de Dados (Futuro)**
```
→ Importar propriedades do Stays.net
→ Importar reservas existentes
→ Sincronização bidirecional
```

**3. Webhooks (Futuro)**
```
→ Stays.net notifica RENDIZY em tempo real
→ Nova reserva → atualização instantânea
→ Cancelamento → notificação imediata
```

---

**Criado em:** 29 de Outubro de 2025  
**Tempo estimado:** 5 minutos  
**Dificuldade:** Fácil  
**Status:** ✅ PRONTO PARA TESTE  

**BOA SORTE! 🚀**

Se funcionar → Me conte quantas reservas teve ontem! 📊  
Se não funcionar → Me envie os detalhes! 🔧
