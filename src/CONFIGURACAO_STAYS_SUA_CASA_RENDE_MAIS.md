# 🔑 CONFIGURAÇÃO STAYS.NET - SUA CASA RENDE MAIS

**Versão:** v1.0.103.23  
**Data:** 29 de Outubro de 2025  
**Status:** ✅ CREDENCIAIS RECEBIDAS - PRONTO PARA CONFIGURAR  

---

## 📋 SEUS DADOS DE ACESSO

### Sistema Stays.net
```
URL do Sistema: https://bvm.stays.net
Nome da Conta:  Sua Casa Rende Mais
```

### Credenciais API
```
Login: a5146970
Senha: bfcf4daf
```

### Base URL da API
```
https://bvm.stays.net/api
```

**⚠️ IMPORTANTE:** Essas credenciais são confidenciais. Não compartilhe com terceiros.

---

## 🚀 PASSO A PASSO - CONFIGURAÇÃO NO RENDIZY

### Passo 1: Abrir Configurações

```
1. Abrir RENDIZY
2. Clicar no ícone ⚙️ (Configurações) no canto superior direito
3. Clicar na tab "⚡ Integrações"
```

---

### Passo 2: Localizar Stays.net PMS

```
Na "Loja de Aplicativos", procurar o card:

┌─────────────────────────────────────────┐
│ 🏢 Stays.net PMS          [🆕 NOVO]    │
│ Property Management System avançado     │
│                                         │
│ [Configurar Integração]                 │
└─────────────────────────────────────────┘

Clicar em: [Configurar Integração]
```

---

### Passo 3: Preencher Credenciais

**Tab "Configuração":**

```
┌────────────────────────────────────────┐
│ Base URL                               │
│ ┌────────────────────────────────────┐ │
│ │ https://bvm.stays.net/api          │ │
│ └────────────────────────────────────┘ │
│                                        │
│ API Key / Login                        │
│ ┌────────────────────────────────────┐ │
│ │ a5146970                           │ │
│ └────────────────────────────────────┘ │
│                                        │
│ API Secret / Senha                     │
│ ┌────────────────────────────────────┐ │
│ │ bfcf4daf                  [👁]     │ │
│ └────────────────────────────────────┘ │
└────────────────────────────────────────┘
```

**IMPORTANTE:** 
- A API Stays.net pode usar `login` e `senha` ao invés de "API Key" tradicional
- Se o campo pedir "API Key", use o login: `a5146970`
- Se houver campo separado para senha, use: `bfcf4daf`

---

### Passo 4: Testar Conexão

```
1. Clicar no botão [Testar Conexão]
2. Aguardar mensagem:
   ✅ "Conexão estabelecida com sucesso!"
   
   OU
   
   ❌ "Falha na conexão"
```

**Se der ERRO:** Veja seção "Troubleshooting" abaixo

**Se der SUCESSO:** Continuar para Passo 5

---

### Passo 5: Salvar Configuração

```
1. Clicar no botão [Salvar Configuração]
2. Aguardar mensagem: "Configuração salva com sucesso!"
3. ✅ PRONTO! Integração configurada
```

---

### Passo 6: Testar Endpoints

**Tab "Ambiente de Teste":**

```
1. Clicar na tab "Ambiente de Teste"
2. Na lista da esquerda, clicar em "Listar Propriedades"
3. Clicar no botão 🔄 (Refresh)
4. Ver resposta JSON no painel direito
```

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "properties": [
      {
        "id": "...",
        "name": "Casa...",
        "address": "..."
      }
    ]
  }
}
```

---

### Passo 7: Buscar Reservas de Ontem

**Tab "Análise de Reservas":**

```
1. Clicar na tab "Análise de Reservas"
2. [Buscar Todas as Reservas]
3. Aguardar carregamento
4. Sistema auto-detecta campo de data
5. Selecionar data: 2025-10-28
6. [Filtrar Reservas de 2025-10-28]
7. ✅ Ver lista de reservas de ontem!
```

---

### Passo 8: Ver Estatísticas no Dashboard

```
1. Voltar ao Dashboard Inicial
2. Card aparece automaticamente:

┌──────────────────────────────────────┐
│ 📅 Reservas Stays.net    [🔄]       │
├──────────────────────────────────────┤
│  12      ┃    5     ┃     24        │
│ Ontem    ┃  Hoje    ┃ Esta Semana   │
└──────────────────────────────────────┘

3. ✅ Pronto! Sistema integrado e funcionando!
```

---

## 🔧 TROUBLESHOOTING

### Erro: "Falha na conexão"

**Possíveis causas:**

#### 1. Base URL incorreta

**Teste:**
```
Base URL correta: https://bvm.stays.net/api
```

**Variações para testar:**
- `https://bvm.stays.net/api`
- `https://bvm.stays.net/external-api`
- `https://stays.net/api/bvm`
- `https://api.stays.net/bvm`

**Solução:**
1. Consultar documentação Stays.net
2. Ou testar cada variação
3. A que retornar sucesso é a correta

---

#### 2. Credenciais no formato errado

**Teste 1:** Basic Auth
```
Authorization: Basic YTUxNDY5NzA6YmZjZjRkYWY=
```

**Teste 2:** Bearer Token
```
Authorization: Bearer a5146970:bfcf4daf
```

**Teste 3:** Campos separados
```
Username: a5146970
Password: bfcf4daf
```

**Solução:**
- O sistema tentará automaticamente diferentes formatos
- Se persistir erro, verificar documentação Stays.net

---

#### 3. IP não autorizado

**Sintoma:**
```
Error: 403 Forbidden
Ou: "IP not whitelisted"
```

**Solução:**
1. Acessar painel Stays.net: https://bvm.stays.net
2. Ir em: App Center → API Stays
3. Verificar se há lista de IPs permitidos
4. Adicionar: "Todos os IPs" ou IP específico do RENDIZY

---

#### 4. API desabilitada

**Sintoma:**
```
Error: 404 Not Found
Ou: "API not enabled"
```

**Solução:**
1. Acessar painel Stays.net
2. App Center → API Stays
3. Verificar se API está ativada
4. Ativar se necessário

---

## 📊 ESTRUTURA DA API STAYS.NET

### Autenticação Provável

**Método 1: HTTP Basic Auth**
```http
GET /api/properties HTTP/1.1
Host: bvm.stays.net
Authorization: Basic YTUxNDY5NzA6YmZjZjRkYWY=
```

**Método 2: API Key no Header**
```http
GET /api/properties HTTP/1.1
Host: bvm.stays.net
X-API-Key: a5146970
X-API-Secret: bfcf4daf
```

**Método 3: Query Params**
```http
GET /api/properties?login=a5146970&password=bfcf4daf HTTP/1.1
Host: bvm.stays.net
```

---

### Endpoints Esperados

```
✓ GET  /api/properties           - Listar propriedades
✓ GET  /api/properties/{id}      - Detalhes de propriedade
✓ GET  /api/reservations         - Listar reservas
✓ GET  /api/reservations/{id}    - Detalhes de reserva
✓ GET  /api/rates                - Listar tarifas
✓ GET  /api/availability         - Verificar disponibilidade
✓ GET  /api/guests               - Listar hóspedes
```

---

## 🧪 TESTE MANUAL (CURL)

### Teste 1: Basic Auth

```bash
curl -X GET "https://bvm.stays.net/api/properties" \
  -H "Authorization: Basic YTUxNDY5NzA6YmZjZjRkYWY=" \
  -H "Content-Type: application/json"
```

### Teste 2: API Key Header

```bash
curl -X GET "https://bvm.stays.net/api/properties" \
  -H "X-API-Key: a5146970" \
  -H "X-API-Secret: bfcf4daf" \
  -H "Content-Type: application/json"
```

### Teste 3: Query Params

```bash
curl -X GET "https://bvm.stays.net/api/properties?login=a5146970&password=bfcf4daf" \
  -H "Content-Type: application/json"
```

**Resultado esperado:**
- Status: 200 OK
- Body: JSON com lista de propriedades

**Se retornar erro:**
- Anotar mensagem de erro exata
- Me enviar para análise

---

## 📝 CHECKLIST DE CONFIGURAÇÃO

### Pré-Configuração:
- [x] Credenciais recebidas (Login + Senha)
- [x] Base URL identificada (bvm.stays.net)
- [ ] API testada manualmente (opcional)

### Configuração no RENDIZY:
- [ ] Abrir Configurações → Integrações
- [ ] Localizar card Stays.net PMS
- [ ] Preencher Base URL: `https://bvm.stays.net/api`
- [ ] Preencher API Key/Login: `a5146970`
- [ ] Preencher Senha: `bfcf4daf`
- [ ] Clicar em [Testar Conexão]
- [ ] Aguardar mensagem de sucesso
- [ ] Clicar em [Salvar Configuração]
- [ ] Confirmar salvamento

### Testes:
- [ ] Tab "Ambiente de Teste" → Testar endpoints
- [ ] Ver resposta JSON de propriedades
- [ ] Ver resposta JSON de reservas
- [ ] Tab "Análise de Reservas" → Buscar todas
- [ ] Filtrar por data de ontem (28/10)
- [ ] Ver lista de reservas filtrada
- [ ] Voltar ao Dashboard
- [ ] Confirmar card de estatísticas aparece
- [ ] Clicar em [Atualizar] para dados frescos
- [ ] ✅ Tudo funcionando!

---

## 🎯 RESULTADO ESPERADO

### Após Configuração Completa:

**1. Dashboard Inicial:**
```
┌──────────────────────────────────────────────┐
│ 📅 Reservas Stays.net         [🔄]          │
│ Última atualização: 29/10/2025 15:30        │
├──────────────────────────────────────────────┤
│   12        ┃      5       ┃      24         │
│  Ontem      ┃     Hoje     ┃  Esta Semana   │
│  28/10      ┃    29/10     ┃      ↗         │
└──────────────────────────────────────────────┘
```

**2. Análise de Reservas:**
```
✅ 156 reservas carregadas
✅ Campo detectado: "created_at"
✅ Filtradas: 12 reservas de 28/10/2025
✅ Exportação JSON disponível
```

**3. Ambiente de Teste:**
```
✅ GET /properties         - 200 OK
✅ GET /reservations       - 200 OK
✅ GET /rates              - 200 OK
✅ GET /availability       - 200 OK
✅ GET /guests             - 200 OK
```

---

## 🔐 SEGURANÇA

### Armazenamento das Credenciais

**Como são salvas:**
- ✅ Armazenadas no KV Store (Supabase)
- ✅ Criptografadas em repouso
- ✅ Acessíveis apenas via backend
- ✅ Nunca expostas no frontend
- ✅ Transmitidas via HTTPS

**Boas práticas:**
- ❌ Não compartilhar credenciais
- ❌ Não fazer commit no Git
- ❌ Não expor em logs
- ✅ Rotacionar periodicamente
- ✅ Monitorar uso da API

---

## 📊 PRÓXIMOS PASSOS

### Após Configuração:

#### 1. Sincronização Inicial
```
→ Importar todas as propriedades
→ Importar todas as reservas
→ Mapear campos automaticamente
```

#### 2. Sincronização Contínua
```
→ Buscar novas reservas a cada X minutos
→ Atualizar status de reservas existentes
→ Sincronizar alterações de tarifas
```

#### 3. Webhooks (Futuro)
```
→ Receber notificações em tempo real
→ Nova reserva → notificação push
→ Cancelamento → atualização automática
```

---

## 💡 DICAS

### 1. Primeiro Teste
```
Antes de configurar no RENDIZY:
→ Acessar https://bvm.stays.net
→ Fazer login manual
→ Navegar no sistema
→ Verificar se vê suas propriedades/reservas
→ Confirmar que tudo está funcionando
```

### 2. Teste de Conectividade
```
Abrir navegador → DevTools (F12) → Console
Executar:

fetch('https://bvm.stays.net/api/properties', {
  headers: {
    'Authorization': 'Basic YTUxNDY5NzA6YmZjZjRkYWY='
  }
})
.then(r => r.json())
.then(console.log)
```

### 3. Documentação Stays.net
```
Procurar no painel:
→ App Center → API Stays
→ Documentação / Docs
→ Exemplos de código
→ Endpoints disponíveis
```

---

## 🆘 SUPORTE

### Se algo não funcionar:

**Me envie:**
1. Print da mensagem de erro
2. Tab "Ambiente de Teste" → Resposta JSON completa
3. Qual endpoint deu erro
4. O que você tentou fazer

**Eu vou:**
1. Analisar a estrutura real da API
2. Ajustar o código de integração
3. Corrigir mapeamento de campos
4. Garantir que funcione 100%

---

## 📞 CONTATO COM STAYS.NET

**Caso precise de suporte da Stays.net:**

```
URL: https://bvm.stays.net
Suporte: Procurar seção "Ajuda" ou "Suporte" no painel
Dúvida: "Como acessar a API? Qual a base URL e formato de autenticação?"
```

---

## ✅ RESUMO RÁPIDO

### Configure em 3 minutos:

```
1. RENDIZY → Configurações → Integrações
2. Stays.net PMS → [Configurar]
3. Preencher:
   - Base URL: https://bvm.stays.net/api
   - Login: a5146970
   - Senha: bfcf4daf
4. [Testar] → [Salvar]
5. ✅ Pronto!
```

### Use diariamente:

```
1. Abrir Dashboard
2. Ver card "Reservas Stays.net"
3. Ler número em "Ontem"
4. ✅ Saber quantas reservas teve!
```

---

**Criado em:** 29 de Outubro de 2025  
**Conta:** Sua Casa Rende Mais  
**Sistema:** Stays.net BVM  
**Status:** ✅ CREDENCIAIS RECEBIDAS - PRONTO PARA CONFIGURAR  
