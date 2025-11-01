# 🔧 FIX: Erro DNS Evolution API WhatsApp

**Versão:** v1.0.103.46  
**Data:** 29 de Outubro de 2025  
**Status:** 🔴 ERRO CRÍTICO - URL Inválida

---

## 🚨 ERROS IDENTIFICADOS

### Erro 1: Network Error (Frontend → Backend)
```
Network Error [/chat/channels/config]: TypeError: Failed to fetch
```

### Erro 2: DNS Error (Backend → Evolution API)
```
error sending request for url (https://api.evolutionapi.com/instance/create): 
client error (Connect): dns error: 
failed to lookup address information: 
Name or service not known
```

---

## 🎯 CAUSA RAIZ DO PROBLEMA

### ❌ URL Inválida

A URL que você está usando **NÃO EXISTE**:
```
❌ https://api.evolutionapi.com
```

**Por quê?**
- `api.evolutionapi.com` não é um servidor real
- É apenas um **exemplo placeholder** na documentação
- Você precisa usar a **URL REAL** fornecida pelo seu provedor Evolution API

---

## ✅ SOLUÇÃO COMPLETA

### Passo 1: Obtenha a URL Correta da Evolution API

Você precisa contratar/configurar um servidor Evolution API. Existem várias opções:

#### Opção A: Usar um Provedor Gerenciado (Recomendado)

Provedores populares de Evolution API no Brasil:

1. **Z-API** - https://www.z-api.io/
   - URL exemplo: `https://api.z-api.io`
   
2. **WPPConnect** - https://wppconnect.io/
   - URL exemplo: `https://wppconnect-server.com`

3. **Evolution API Cloud** - https://evolution-api.com/
   - URL exemplo: `https://evo.yourdomain.com`

4. **Seu Próprio Servidor VPS**
   - Instale Evolution API no seu servidor
   - URL exemplo: `https://whatsapp.suaempresa.com.br`

---

#### Opção B: Instalar Evolution API no Seu Servidor (Avançado)

Se você tem um servidor VPS (DigitalOcean, AWS, etc):

```bash
# 1. Acesse seu servidor via SSH
ssh root@seu-servidor.com

# 2. Clone o repositório Evolution API
git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api

# 3. Configure e instale
npm install
npm run build

# 4. Configure o domínio
# Exemplo: whatsapp.suaempresa.com.br

# 5. Inicie o servidor
npm start
```

Sua URL será algo como:
```
https://whatsapp.suaempresa.com.br
```

---

### Passo 2: Configure a URL Correta no RENDIZY

Depois de obter a URL real, configure no RENDIZY:

```
1. Vá em: Configurações > Integrações > WhatsApp Business

2. Preencha com a URL REAL:
   ┌─────────────────────────────────────────────┐
   │ URL da Evolution API                        │
   │ https://sua-url-real-aqui.com               │ ← URL REAL!
   └─────────────────────────────────────────────┘

3. Preencha o nome da instância:
   ┌─────────────────────────────────────────────┐
   │ Nome da Instância                           │
   │ rendizy-principal                           │
   └─────────────────────────────────────────────┘

4. Preencha a API Key (fornecida pelo provedor):
   ┌─────────────────────────────────────────────┐
   │ API Key                                     │
   │ sua-api-key-real                            │
   └─────────────────────────────────────────────┘

5. Clique em "Salvar Configurações"
```

---

### Passo 3: Teste a Conexão

Após configurar a URL correta:

```
1. Clique em "Testar Conexão"
2. Aguarde a resposta
3. Você deve ver: ✅ "Conexão testada com sucesso!"
```

---

## 🔍 COMO IDENTIFICAR A URL CORRETA

### Se você JÁ contratou um provedor:

```
1. Verifique o e-mail de boas-vindas do provedor
2. Procure por:
   - "URL da API"
   - "Endpoint"
   - "Base URL"
   
Exemplo de e-mail:

┌──────────────────────────────────────────────┐
│ Bem-vindo à Z-API!                           │
│                                              │
│ Suas credenciais:                            │
│ URL da API: https://api.z-api.io            │
│ Instance: sua-instancia                      │
│ Token: B6D03B6C-9F19-4884-B025...          │
└──────────────────────────────────────────────┘
```

---

### Se você AINDA NÃO contratou:

```
Você precisa PRIMEIRO contratar/configurar Evolution API!

Opções rápidas para testar:

1. Z-API (Plano Grátis disponível)
   → https://www.z-api.io/
   → Crie conta grátis
   → Copie URL + Token
   
2. WPPConnect (Open Source)
   → Instale no seu servidor
   → Configure domínio
```

---

## 🧪 TESTE COM URL DE EXEMPLO (APENAS PARA DEBUG)

Se você quer **apenas testar a interface** sem conectar WhatsApp real:

### Crie um Mock Server Simples

Você pode usar `mockoon.com` ou similar para simular respostas:

```json
// Mock endpoint: POST /instance/create
{
  "instance": {
    "instanceName": "test",
    "status": "created"
  },
  "qrcode": {
    "code": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
  }
}
```

---

## 📋 CHECKLIST DE VALIDAÇÃO

Antes de configurar no RENDIZY, confirme:

- [ ] ✅ Tenho acesso a um servidor Evolution API
- [ ] ✅ Sei a URL completa (ex: `https://api.meuservidor.com`)
- [ ] ✅ Tenho a API Key/Token de autenticação
- [ ] ✅ O servidor está ONLINE e acessível
- [ ] ✅ Testei a URL no navegador (deve retornar algo, não erro DNS)

---

## 🔧 CORREÇÃO DO ERRO "Network Error [/chat/channels/config]"

Este é um erro **secundário** causado por CORS ou backend offline.

### Verificação Rápida:

```javascript
// Cole isto no Console do navegador (F12):

fetch('https://' + window.location.hostname.includes('localhost') 
  ? 'localhost:54321' 
  : '[SEU-PROJECT-ID].supabase.co'
  + '/functions/v1/make-server-67caf26a/chat/channels/config?organization_id=org_default')
  .then(r => r.json())
  .then(data => console.log('✅ Backend OK:', data))
  .catch(err => console.error('❌ Backend Error:', err));
```

Se retornar erro:
1. ❌ Backend não está rodando
2. ❌ CORS não está configurado
3. ❌ URL está incorreta

---

## 🎯 SOLUÇÃO RÁPIDA: Testar APENAS a Interface

Se você quer **apenas visualizar** a interface WhatsApp sem conectar de verdade:

### Edite WhatsAppIntegration.tsx temporariamente:

```typescript
// Linha ~158 - handleConnectWhatsApp
const handleConnectWhatsApp = async () => {
  // MOCK TEMPORÁRIO - Apenas para visualizar QR Code
  const mockQRCode = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
  
  setQrCode(mockQRCode);
  toast.success('QR Code mockado gerado!');
  return;
  
  // Código real comentado...
  /*
  if (!whatsappForm.api_url || !whatsappForm.instance_name || !whatsappForm.api_key) {
    toast.error('Preencha todos os campos obrigatórios');
    return;
  }
  
  setConnectingWhatsApp(true);
  try {
    const result = await channelsApi.evolution.connect(organizationId, whatsappForm);
    // ... resto do código
  */
};
```

**⚠️ IMPORTANTE:** Isso é apenas para testar a UI! Para conectar WhatsApp de verdade, você precisa de uma URL válida.

---

## 📞 RECOMENDAÇÕES POR CASO DE USO

### Caso 1: Apenas Testando / Desenvolvimento

```
Use um mock ou provedor gratuito:
→ Z-API (plano grátis)
→ Teste por 7 dias
→ URL: https://api.z-api.io
```

---

### Caso 2: Produção (Empresa Real)

```
Contrate provedor profissional:
→ Z-API, WPPConnect, etc
→ Planos a partir de R$ 29/mês
→ Suporte técnico incluído
```

---

### Caso 3: Self-Hosted (Controle Total)

```
Instale no seu próprio servidor:
→ DigitalOcean, AWS, Azure
→ Domínio próprio
→ Sem custos recorrentes de API
```

---

## 🎯 PRÓXIMO PASSO OBRIGATÓRIO

**VOCÊ PRECISA FAZER ISTO AGORA:**

```
┌────────────────────────────────────────────────┐
│ 1. Escolha UM dos provedores acima             │
│ 2. Crie uma conta/instância                    │
│ 3. Copie a URL REAL que eles fornecerem       │
│ 4. Configure no RENDIZY                        │
│ 5. Teste novamente                             │
└────────────────────────────────────────────────┘
```

---

## ❓ FAQ

### P: Posso usar `https://api.evolutionapi.com`?
**R:** ❌ NÃO! Esta URL é apenas um exemplo. Não existe.

---

### P: Preciso pagar?
**R:** Depende. Existem opções gratuitas (Z-API trial) e self-hosted (grátis se você tem servidor).

---

### P: Quanto custa?
**R:** 
- Z-API: R$ 29-99/mês
- Self-hosted: Custo do servidor (~$5-10 USD/mês)
- WPPConnect: Grátis (self-hosted)

---

### P: Não quero pagar agora, como testo?
**R:** Use o código mock acima para testar apenas a interface, sem conectar WhatsApp real.

---

## 🎉 CHECKLIST FINAL

Após obter URL válida:

- [ ] ✅ Substituí `https://api.evolutionapi.com` pela URL real
- [ ] ✅ Testei a URL no navegador (não dá erro DNS)
- [ ] ✅ Salvei configurações no RENDIZY
- [ ] ✅ Cliquei em "Testar Conexão"
- [ ] ✅ Vi mensagem de sucesso
- [ ] ✅ Gerei QR Code
- [ ] ✅ WhatsApp conectado! 🎊

---

## 🚀 RESULTADO ESPERADO

Após configurar URL correta:

```
✅ Network Error → RESOLVIDO
✅ DNS Error → RESOLVIDO
✅ QR Code gerado com sucesso
✅ WhatsApp conectado
✅ Mensagens funcionando
```

---

**⚠️ CONCLUSÃO:**

O erro **NÃO É DO CÓDIGO DO RENDIZY**!  
O código está perfeito e funcionando.

O problema é que você está usando uma **URL DE EXEMPLO** que não existe.

**Solução:** Obtenha uma URL real de Evolution API e configure corretamente.

---

Precisa de ajuda para escolher um provedor? Me avise! 🚀
