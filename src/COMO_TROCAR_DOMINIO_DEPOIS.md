# 🔄 Como Trocar o Domínio Depois (suacasaavenda.com.br → rendizy.com.br)

## ⏱️ Tempo total: **3 minutos**

Quando você tiver o domínio `rendizy.com.br`, a troca é **super simples**!

---

## 🎯 Passo a Passo

### 1️⃣ Configurar DNS no novo domínio (2 minutos)

**No painel do Registro.br para `rendizy.com.br`:**

```
Tipo: A
Nome: whatsapp
Valor: [MESMO IP DA VPS]
TTL: 3600
```

**Aguardar propagação:** 5-15 minutos

**Testar:**
```bash
ping whatsapp.rendizy.com.br
# Deve retornar o IP da VPS
```

---

### 2️⃣ Atualizar Nginx (30 segundos)

**SSH na VPS:**

```bash
# 1. Editar configuração do Nginx
sudo nano /etc/nginx/sites-available/waha

# 2. ALTERAR a linha:
# DE:   server_name whatsapp.suacasaavenda.com.br;
# PARA: server_name whatsapp.rendizy.com.br;

# 3. Salvar (Ctrl+O, Enter, Ctrl+X)

# 4. Testar configuração
sudo nginx -t

# 5. Recarregar Nginx
sudo systemctl reload nginx
```

---

### 3️⃣ Renovar SSL (30 segundos)

```bash
# Obter novo certificado SSL para o novo domínio
sudo certbot --nginx -d whatsapp.rendizy.com.br

# Certbot faz tudo automaticamente!
```

**Pronto!** SSL renovado para o novo domínio. ✅

---

### 4️⃣ Atualizar RENDIZY (1 minuto)

**No código do RENDIZY:**

#### Arquivo: `utils/wahaApi.ts`

```typescript
// ANTES:
const WAHA_BASE_URL = 'https://whatsapp.suacasaavenda.com.br';

// DEPOIS:
const WAHA_BASE_URL = 'https://whatsapp.rendizy.com.br';
```

#### Arquivo: `docker-compose.yml` (na VPS)

```bash
# SSH na VPS
cd /opt/rendizy-waha
sudo nano docker-compose.yml

# Alterar WHATSAPP_HOOK_URL de:
# https://seu-rendizy-url.supabase.co/.../webhook
# Para usar o novo domínio se necessário

# Reiniciar container
docker-compose restart
```

---

## ✅ Verificação Final

### Teste 1: Health Check
```bash
curl https://whatsapp.rendizy.com.br/health
```

Resposta esperada:
```json
{"status":"ok"}
```

### Teste 2: Dashboard
Abra no navegador:
```
https://whatsapp.rendizy.com.br/dashboard
```

### Teste 3: API
```bash
curl https://whatsapp.rendizy.com.br/api/sessions \
  -H "X-Api-Key: SUA_API_KEY"
```

---

## 📝 Checklist Completa

- [ ] DNS configurado no novo domínio
- [ ] DNS propagou (teste com `ping`)
- [ ] Nginx atualizado
- [ ] SSL renovado
- [ ] `wahaApi.ts` atualizado
- [ ] `docker-compose.yml` atualizado (se necessário)
- [ ] Container reiniciado
- [ ] Health check passou
- [ ] Dashboard abrindo
- [ ] API respondendo

---

## 🔄 Manter os 2 domínios funcionando?

Se quiser manter **ambos** os domínios (antigo e novo):

```nginx
# /etc/nginx/sites-available/waha
server {
    listen 443 ssl;
    
    # Múltiplos domínios
    server_name whatsapp.suacasaavenda.com.br whatsapp.rendizy.com.br;
    
    # ... resto da config
}
```

Obter SSL para ambos:
```bash
sudo certbot --nginx \
  -d whatsapp.suacasaavenda.com.br \
  -d whatsapp.rendizy.com.br
```

---

## ❌ Remover domínio antigo completamente?

Se quiser **desativar** o domínio antigo:

### 1. Remover do Nginx:
```bash
sudo nano /etc/nginx/sites-available/waha
# Deixar apenas: server_name whatsapp.rendizy.com.br;
sudo systemctl reload nginx
```

### 2. Revogar certificado SSL antigo:
```bash
sudo certbot delete --cert-name whatsapp.suacasaavenda.com.br
```

### 3. Remover DNS no Registro.br:
No painel do Registro.br, delete o registro A para `whatsapp.suacasaavenda.com.br`

---

## 💡 Dica Pro

Use um **script** para trocar rapidamente:

```bash
#!/bin/bash
# trocar-dominio.sh

OLD_DOMAIN="whatsapp.suacasaavenda.com.br"
NEW_DOMAIN="whatsapp.rendizy.com.br"

echo "🔄 Trocando de $OLD_DOMAIN para $NEW_DOMAIN..."

# Atualizar Nginx
sudo sed -i "s/$OLD_DOMAIN/$NEW_DOMAIN/g" /etc/nginx/sites-available/waha
sudo nginx -t && sudo systemctl reload nginx

# Obter novo SSL
sudo certbot --nginx -d $NEW_DOMAIN --non-interactive

# Reiniciar WAHA
cd /opt/rendizy-waha
docker-compose restart

echo "✅ Domínio trocado com sucesso!"
echo "📍 Novo endereço: https://$NEW_DOMAIN"
```

Usar:
```bash
chmod +x trocar-dominio.sh
./trocar-dominio.sh
```

---

## 📞 Problemas?

### Problema: Certificado SSL inválido

**Causa:** Navegador ainda usa certificado antigo

**Solução:**
1. Limpar cache do navegador
2. Fechar e reabrir navegador
3. Ou usar modo anônimo

### Problema: DNS não propaga

**Causa:** Cache de DNS

**Solução:**
```bash
# Limpar cache DNS local (Windows)
ipconfig /flushdns

# Limpar cache DNS local (Mac/Linux)
sudo dscacheutil -flushcache

# Testar com DNS público
nslookup whatsapp.rendizy.com.br 8.8.8.8
```

---

## 🎉 Resumo

**Trocar domínio é MUITO FÁCIL:**

1. Configure novo DNS → 2 min
2. Atualize Nginx → 30 seg
3. Renove SSL → 30 seg
4. Atualize código → 1 min

**TOTAL: 3-5 minutos!** ⚡

E o melhor: **ZERO downtime** se fizer direito! 🚀

---

**Obs:** Mantenha este guia salvo para quando precisar fazer a troca!
