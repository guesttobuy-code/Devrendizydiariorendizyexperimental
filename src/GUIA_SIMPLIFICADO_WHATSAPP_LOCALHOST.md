# 🚀 GUIA SIMPLIFICADO: WhatsApp com Evolution API Local

**Versão:** v1.0.103.47  
**Data:** 29 de Outubro de 2025  
**Tempo:** 5 minutos  
**Custo:** GRÁTIS! 💰

---

## 🎯 SOLUÇÃO MAIS SIMPLES

Você **NÃO precisa pagar** nenhum provedor para testar!

A **Evolution API é GRATUITA e Open Source**. Você pode rodar no seu próprio computador em **5 minutos**!

---

## ✅ PASSO 1: Instalar Docker

Se você ainda não tem Docker instalado:

### Windows/Mac:
1. Baixe: https://www.docker.com/products/docker-desktop
2. Instale e execute

### Linux:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Confirme que está instalado:**
```bash
docker --version
```

---

## 🚀 PASSO 2: Rodar Evolution API (1 Comando!)

Copie e execute este comando no terminal:

```bash
docker run -d \
    --name evolution_api \
    -p 8080:8080 \
    -e AUTHENTICATION_API_KEY=minha-chave-secreta-123 \
    atendai/evolution-api:latest
```

**Pronto!** A Evolution API está rodando! 🎉

---

## ✅ PASSO 3: Confirmar que Está Funcionando

Abra seu navegador em: **http://localhost:8080**

Você deve ver:

```json
{
   "status": 200,
   "message": "Welcome to the Evolution API, it is working!",
   "version": "1.x.x",
   "swagger": "http://localhost:8080/docs",
   "manager": "http://localhost:8080/manager",
   "documentation": "https://doc.evolution-api.com"
}
```

**Se aparecer isso = FUNCIONOU!** ✅

---

## 📱 PASSO 4: Configurar no RENDIZY

Agora vá no RENDIZY:

```
1. Acesse: Configurações > Integrações > WhatsApp Business

2. Preencha:

   ┌─────────────────────────────────────────────┐
   │ URL da Evolution API                        │
   │ http://localhost:8080                       │ 
   └─────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────┐
   │ Nome da Instância                           │
   │ rendizy-teste                               │ ← Você escolhe!
   └─────────────────────────────────────────────┘

   ┌─────────────────────────────────────────────┐
   │ API Key                                     │
   │ minha-chave-secreta-123                     │ ← A mesma do comando!
   └─────────────────────────────────────────────┘

3. Clique em "Salvar Configurações"

4. Clique em "Testar Conexão"
   → Deve aparecer: ✅ Conexão testada com sucesso!

5. Clique em "Gerar QR Code"

6. Escaneie com WhatsApp

7. PRONTO! WhatsApp conectado! 🎉
```

---

## 🎯 RESUMO RÁPIDO

```
1️⃣ Instalar Docker (se não tem)
2️⃣ docker run ... evolution-api
3️⃣ Abrir http://localhost:8080 (confirmar)
4️⃣ Configurar no RENDIZY
5️⃣ Gerar QR Code e conectar
6️⃣ FUNCIONA! ✅
```

**Tempo total:** 5-10 minutos  
**Custo:** R$ 0,00 💰  
**Dificuldade:** ⭐ Muito Fácil

---

## ❓ FAQ

**P: Precisa de servidor/VPS?**  
R: ❌ NÃO! Roda no seu próprio computador.

**P: Funciona no Windows/Mac/Linux?**  
R: ✅ SIM! Funciona em qualquer sistema com Docker.

**P: É grátis mesmo?**  
R: ✅ SIM! Evolution API é 100% gratuita e open source.

**P: Precisa de conhecimentos técnicos?**  
R: ❌ NÃO! É só copiar e colar o comando.

**P: Localhost funciona no RENDIZY?**  
R: ✅ SIM! Funciona perfeitamente para testes locais.

**P: E se eu quiser usar em produção?**  
R: Aí sim você precisa de um servidor com IP público ou usar um provedor. Mas para TESTAR, localhost é perfeito!

---

## 🔧 COMANDOS ÚTEIS

### Ver logs da Evolution API:
```bash
docker logs -f evolution_api
```

### Parar a Evolution API:
```bash
docker stop evolution_api
```

### Iniciar novamente:
```bash
docker start evolution_api
```

### Remover (se quiser recriar):
```bash
docker stop evolution_api
docker rm evolution_api
```

---

## 🌐 ACESSAR O SWAGGER (Documentação Interativa)

A Evolution API tem uma interface web linda!

**Acesse:** http://localhost:8080/docs

Lá você pode testar TODOS os endpoints da API visualmente! 🎨

---

## 🎯 OPÇÕES DISPONÍVEIS

### Opção 1: Localhost (Esta!) ⭐ RECOMENDADO PARA TESTE
- **Prós:** Grátis, rápido, fácil
- **Contras:** Só funciona no seu computador
- **Ideal para:** Desenvolvimento e testes

### Opção 2: VPS Próprio
- **Prós:** Grátis (só paga servidor), controle total
- **Contras:** Requer conhecimento técnico
- **Ideal para:** Uso em produção, empresas

### Opção 3: Provedor Gerenciado (Z-API, etc)
- **Prós:** Manutenção incluída, suporte
- **Contras:** Custo mensal (~R$ 29-99/mês)
- **Ideal para:** Quem não quer gerenciar infraestrutura

---

## 🚀 PARA USAR EM PRODUÇÃO (Depois)

Se você testar e gostar, pode migrar para produção:

### Opção A: Seu Próprio Servidor (VPS)

1. **Contrate um VPS** (DigitalOcean, AWS, Vultr, etc)
   - Custo: ~$5-10/mês

2. **Configure domínio:**
   ```
   whatsapp.suaempresa.com.br → IP do servidor
   ```

3. **Instale Evolution API no servidor:**
   ```bash
   ssh root@seu-servidor.com
   # Mesmos comandos, mas no servidor
   ```

4. **Configure SSL/HTTPS** (Let's Encrypt - gratuito)

5. **Use no RENDIZY:**
   ```
   URL: https://whatsapp.suaempresa.com.br
   ```

---

### Opção B: Docker Compose (Recomendado para Produção)

A Evolution API recomenda usar docker-compose para produção:

```yaml
version: '3.8'

services:
  evolution_api:
    image: atendai/evolution-api:latest
    container_name: evolution_api
    ports:
      - "8080:8080"
    environment:
      - SERVER_URL=https://whatsapp.suaempresa.com.br
      - AUTHENTICATION_API_KEY=sua-chave-forte-aqui
      - DATABASE_ENABLED=true
      - DATABASE_CONNECTION_URI=mongodb://mongo:27017/evolution
      - CACHE_REDIS_ENABLED=true
      - CACHE_REDIS_URI=redis://redis:6379
    depends_on:
      - mongo
      - redis
    restart: always

  mongo:
    image: mongo:latest
    container_name: evolution_mongo
    volumes:
      - mongo_data:/data/db
    restart: always

  redis:
    image: redis:latest
    container_name: evolution_redis
    restart: always

volumes:
  mongo_data:
```

---

## 📚 DOCUMENTAÇÃO OFICIAL

- **Site:** https://evolution-api.com
- **Docs:** https://doc.evolution-api.com
- **GitHub:** https://github.com/EvolutionAPI/evolution-api
- **Comunidade:** https://evolution-api.com (Discord)

---

## 🎉 CONCLUSÃO

**VOCÊ NÃO PRECISA PAGAR NADA PARA TESTAR!**

Apenas:
1. ✅ Instale Docker
2. ✅ Execute 1 comando
3. ✅ Configure no RENDIZY com `http://localhost:8080`
4. ✅ Pronto para testar! 🚀

**Simples assim!**

---

## 🆘 PROBLEMAS COMUNS

### Erro: "port 8080 already in use"

Outro serviço está usando a porta 8080. Use outra porta:

```bash
docker run -d \
    --name evolution_api \
    -p 8081:8080 \  # Mudou para 8081
    -e AUTHENTICATION_API_KEY=minha-chave-secreta-123 \
    atendai/evolution-api:latest
```

Configure no RENDIZY: `http://localhost:8081`

---

### Erro: "Cannot connect to Docker daemon"

Docker não está rodando. Inicie o Docker Desktop (Windows/Mac) ou serviço (Linux):

```bash
# Linux
sudo systemctl start docker
```

---

### Erro no RENDIZY: "Failed to fetch"

Verifique:
1. Evolution API está rodando? (`docker ps`)
2. URL está correta? (`http://localhost:8080`)
3. API Key está correta? (a mesma do comando docker)

---

## ✅ TESTE AGORA!

**Leva menos de 5 minutos!**

```bash
# 1. Execute este comando:
docker run -d \
    --name evolution_api \
    -p 8080:8080 \
    -e AUTHENTICATION_API_KEY=minha-chave-secreta-123 \
    atendai/evolution-api:latest

# 2. Aguarde 10 segundos para iniciar

# 3. Abra: http://localhost:8080

# 4. Configure no RENDIZY!
```

**Boa sorte!** 🎉

---

**Dúvidas?** A Evolution API tem documentação completa e comunidade ativa no Discord!
