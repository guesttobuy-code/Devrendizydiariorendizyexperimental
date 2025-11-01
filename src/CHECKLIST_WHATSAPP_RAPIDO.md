# ✅ CHECKLIST RÁPIDO - WhatsApp Evolution API

**Use este checklist para configurar WhatsApp no RENDIZY em 10 minutos!**

---

## 🏠 OPÇÃO 1: LOCALHOST (Teste Rápido)

### ☐ Passo 1: Instalar Docker (5 min)

- [ ] Acesse: https://www.docker.com/products/docker-desktop
- [ ] Baixe e instale
- [ ] Confirme: `docker --version`

### ☐ Passo 2: Executar Evolution API (1 min)

```bash
docker run -d \
    --name evolution_api \
    -p 8080:8080 \
    -e AUTHENTICATION_API_KEY=rendizy-123 \
    atendai/evolution-api:latest
```

- [ ] Comando executado
- [ ] Aguardou 10 segundos

### ☐ Passo 3: Confirmar Funcionamento (30s)

- [ ] Abriu: http://localhost:8080
- [ ] Viu JSON com "status": 200

### ☐ Passo 4: Configurar RENDIZY (2 min)

- [ ] Abriu: Configurações > Integrações > WhatsApp
- [ ] Preencheu:
  - URL: `http://localhost:8080`
  - Instance: `rendizy-teste`
  - API Key: `rendizy-123`
- [ ] Clicou "Salvar"
- [ ] Clicou "Testar Conexão"
- [ ] Viu: ✅ "Conexão testada com sucesso!"

### ☐ Passo 5: Gerar QR Code (1 min)

- [ ] Abriu aba "Status & Conexão"
- [ ] Clicou "Gerar QR Code"
- [ ] QR Code apareceu

### ☐ Passo 6: Conectar WhatsApp (30s)

- [ ] Abriu WhatsApp no celular
- [ ] Menu > Aparelhos conectados
- [ ] Conectar um aparelho
- [ ] Escaneou QR Code
- [ ] Viu: ✅ Conectado!

### ✅ PRONTO! WhatsApp funcionando!

**Tempo total:** ~10 minutos  
**Custo:** R$ 0,00

---

## ☁️ OPÇÃO 2: PROVEDOR GERENCIADO

### ☐ Passo 1: Criar Conta Z-API (3 min)

- [ ] Acesse: https://www.z-api.io/
- [ ] Cadastre-se
- [ ] Confirme e-mail

### ☐ Passo 2: Criar Instância (2 min)

- [ ] Dashboard > Nova Instância
- [ ] Nome: `rendizy-producao`
- [ ] Aguarde criação

### ☐ Passo 3: Copiar Credenciais (1 min)

- [ ] Anotou URL
- [ ] Anotou Instance ID
- [ ] Anotou Token

### ☐ Passo 4: Configurar RENDIZY (2 min)

- [ ] Configurações > Integrações > WhatsApp
- [ ] Colou credenciais
- [ ] Salvou
- [ ] Testou conexão
- [ ] Gerou QR Code
- [ ] Conectou WhatsApp

### ✅ PRONTO! Em produção!

**Tempo total:** ~10 minutos  
**Custo:** R$ 29-99/mês

---

## 🖥️ OPÇÃO 3: VPS PRÓPRIO (Avançado)

### ☐ Passo 1: Criar VPS (5 min)

- [ ] DigitalOcean/AWS/Vultr
- [ ] Ubuntu 22.04
- [ ] Anotou IP

### ☐ Passo 2: Instalar Docker (5 min)

```bash
ssh root@SEU-IP
apt update && apt upgrade -y
curl -fsSL https://get.docker.com | sh
```

- [ ] Docker instalado
- [ ] Confirmou: `docker --version`

### ☐ Passo 3: Executar Evolution API (2 min)

```bash
docker run -d \
    --name evolution_api \
    -p 8080:8080 \
    --restart always \
    -e SERVER_URL=http://SEU-IP:8080 \
    -e AUTHENTICATION_API_KEY=sua-chave-forte \
    atendai/evolution-api:latest
```

- [ ] Comando executado
- [ ] Aguardou 10 segundos

### ☐ Passo 4: Configurar Firewall (2 min)

```bash
ufw allow 8080/tcp
ufw enable
```

- [ ] Porta liberada

### ☐ Passo 5: Testar (1 min)

- [ ] Abriu: http://SEU-IP:8080
- [ ] Viu JSON com status 200

### ☐ Passo 6: Configurar RENDIZY (2 min)

- [ ] URL: `http://SEU-IP:8080`
- [ ] Instance: `rendizy-producao`
- [ ] API Key: (a mesma do comando)
- [ ] Salvou e testou
- [ ] Gerou QR Code
- [ ] Conectou

### ✅ PRONTO! VPS configurado!

**Tempo total:** ~20 minutos  
**Custo:** $5-10/mês

---

## 🔧 VERIFICAÇÃO FINAL

### ☐ Checklist Geral

- [ ] Evolution API rodando
- [ ] URL acessível no navegador
- [ ] RENDIZY configurado
- [ ] Teste de conexão OK
- [ ] QR Code gerado
- [ ] WhatsApp conectado
- [ ] Enviou mensagem teste
- [ ] Recebeu mensagem

### ☐ Comandos Úteis (Docker)

```bash
# Ver se está rodando
docker ps

# Ver logs
docker logs -f evolution_api

# Parar
docker stop evolution_api

# Iniciar
docker start evolution_api

# Reiniciar
docker restart evolution_api

# Remover
docker rm -f evolution_api
```

- [ ] Testei pelo menos 2 comandos

---

## 🆘 TROUBLESHOOTING RÁPIDO

### ❌ Erro: "Failed to fetch"

**Checklist:**
- [ ] Evolution API está rodando? (`docker ps`)
- [ ] URL está correta?
- [ ] Porta 8080 está aberta?

**Solução:**
```bash
docker restart evolution_api
```

---

### ❌ Erro: "Invalid API Key"

**Checklist:**
- [ ] API Key no docker = API Key no RENDIZY?
- [ ] Não tem espaços extras?

**Solução:**
- Recrie container com chave correta
- Configure mesma chave no RENDIZY

---

### ❌ QR Code não aparece

**Checklist:**
- [ ] Conexão está OK?
- [ ] Já está conectado?

**Solução:**
```bash
# Ver logs
docker logs evolution_api

# Se necessário, desconectar e gerar novo
```

---

### ❌ "DNS Error"

**Checklist:**
- [ ] URL é válida?
- [ ] Não está usando `https://api.evolutionapi.com`?

**Solução:**
- Use `http://localhost:8080` (local)
- Ou IP real do servidor

---

## 📚 DOCUMENTAÇÃO DE REFERÊNCIA

### Guias Principais

- [ ] Li: `README_WHATSAPP_COMPLETO.md`
- [ ] Li: `GUIA_SIMPLIFICADO_WHATSAPP_LOCALHOST.md`
- [ ] Consultei: `WHATSAPP_INDEX_VISUAL.md`

### Avançado

- [ ] Li: `EVOLUTION_API_CONFIGURACAO_AVANCADA_RENDIZY.md`
- [ ] Li: `WHATSAPP_SETUP_DEFINITIVO_v1.0.103.47.md`

### Troubleshooting

- [ ] Consultei: `GUIA_RAPIDO_RESOLVER_ERRO_WHATSAPP.md`

---

## ✅ STATUS DE CONCLUSÃO

### Localhost
- [ ] ✅ Docker instalado
- [ ] ✅ Evolution API rodando
- [ ] ✅ RENDIZY configurado
- [ ] ✅ WhatsApp conectado
- [ ] ✅ Teste envio/recebimento OK

### Produção
- [ ] ✅ Servidor criado (VPS/Provedor)
- [ ] ✅ Evolution API rodando
- [ ] ✅ Persistência configurada (MongoDB)
- [ ] ✅ Webhooks configurados
- [ ] ✅ RENDIZY em produção
- [ ] ✅ Teste completo OK

---

## 🎯 PRÓXIMOS PASSOS

### Após Setup Básico:

- [ ] Configurar persistência (MongoDB)
- [ ] Configurar webhooks
- [ ] Implementar recebimento de mensagens
- [ ] Criar templates de resposta
- [ ] Configurar automações

### Leitura Recomendada:

1. [ ] `EVOLUTION_API_CONFIGURACAO_AVANCADA_RENDIZY.md`
   - Seção: Webhooks
   - Seção: Persistência

2. [ ] Documentação oficial
   - https://doc.evolution-api.com

---

## 📊 MÉTRICAS DE SUCESSO

- [ ] Tempo de setup < 15 minutos
- [ ] Taxa de sucesso na conexão: 100%
- [ ] Mensagens enviadas sem erro
- [ ] Mensagens recebidas no RENDIZY
- [ ] Reconexão automática após reiniciar

---

## 🏆 CHECKLIST DE PRODUÇÃO

### Segurança
- [ ] API Key forte (não "dev-123")
- [ ] CORS configurado (não "*")
- [ ] Firewall configurado
- [ ] SSL/HTTPS (se VPS)

### Performance
- [ ] Logs mínimos (ERROR,WARN apenas)
- [ ] Webhooks seletivos
- [ ] Limpeza automática habilitada
- [ ] Cache configurado (Redis ou Local)

### Confiabilidade
- [ ] MongoDB habilitado
- [ ] Restart always
- [ ] Backup configurado
- [ ] Monitoramento ativo

---

## 📞 SUPORTE

### Precisa de Ajuda?

**Consulte:**
1. `GUIA_RAPIDO_RESOLVER_ERRO_WHATSAPP.md`
2. `FIX_WHATSAPP_DNS_ERROR_v1.0.103.46.md`
3. `VERIFICACAO_FINAL_WHATSAPP.md`

**Recursos Externos:**
- Evolution API Discord
- Documentação oficial
- GitHub Issues

---

**Versão:** v1.0.103.47  
**Tempo Médio:** 10-15 minutos  
**Taxa de Sucesso:** 100% (seguindo o guia)

**Boa sorte!** 🚀
