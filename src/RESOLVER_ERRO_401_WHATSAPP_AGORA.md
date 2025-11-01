# 🚨 RESOLVER ERRO 401 WHATSAPP - AGORA

**Versão:** v1.0.103.56  
**Data:** 29 de Outubro de 2025  
**Tempo:** 5 minutos  

---

## 🎯 O PROBLEMA

```
❌ Evolution API Error 401: Unauthorized
❌ API Key inválida ou formato incorreto
```

**Significado:** As credenciais do WhatsApp estão **incorretas ou desatualizadas**.

---

## ✅ SOLUÇÃO RÁPIDA (2 OPÇÕES)

### OPÇÃO A: Testar Credenciais Automaticamente (Recomendado)

```bash
chmod +x TESTE_CREDENCIAIS_WHATSAPP.sh
./TESTE_CREDENCIAIS_WHATSAPP.sh
```

O script vai:
1. ✅ Testar se o servidor está online
2. ✅ Validar sua API Key
3. ✅ Verificar se a instância existe
4. ✅ Mostrar o que fazer

**Tempo:** 2 minutos

---

### OPÇÃO B: Obter Credenciais Manualmente

#### 1️⃣ **Acessar o Manager**

Abra no navegador:
```
https://evo.boravendermuito.com.br/manager
```

Faça login com usuário e senha de administrador.

---

#### 2️⃣ **Obter API Key Correta**

No Manager:
1. Clique em **"Settings"** ou **"Configurações"**
2. Procure por **"API Key"** ou **"Global API Key"**
3. **Copie a API Key completa**

Exemplo do formato correto:
```
A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6
```

---

#### 3️⃣ **Verificar Nome da Instância**

No Manager:
1. Clique em **"Instances"** ou **"Instâncias"**
2. Veja a lista de instâncias disponíveis
3. **Copie o nome EXATO** da instância que quer usar

Ou crie uma nova:
- Clique em **"Create New Instance"**
- Digite um nome único (ex: `rendizy-producao`)
- Clique em **"Create"**

---

#### 4️⃣ **Atualizar no RENDIZY**

1. Abra: `http://localhost:5173`
2. Vá em: `Configurações → Integrações → WhatsApp`
3. Preencha com as **credenciais CORRETAS**:
   ```
   URL:      https://evo.boravendermuito.com.br
   Instance: [NOME_EXATO_DA_INSTANCIA]
   API Key:  [API_KEY_COPIADA]
   ```
4. Clique: `💾 Salvar Configurações`
5. Clique: `🔄 Testar Conexão`

**Resultado esperado:**
```
✅ Conexão testada com sucesso!
```

---

#### 5️⃣ **Gerar QR Code**

Se o teste passou:
1. Clique: `📱 Gerar QR Code`
2. Aguarde QR Code aparecer
3. Abra WhatsApp no celular
4. Vá em **Aparelhos Conectados**
5. Clique **Conectar um Aparelho**
6. Escaneie o QR Code na tela
7. ✅ **CONECTADO!**

---

## 🔍 DIAGNÓSTICO RÁPIDO

### Erro persiste após atualizar credenciais?

#### **Teste 1: API Key**
```bash
curl -X GET \
  'https://evo.boravendermuito.com.br/instance/fetchInstances' \
  -H 'apikey: SUA_API_KEY_AQUI'
```

**Se retornar 401:** API Key ainda está errada
**Se retornar 200:** API Key está correta ✅

---

#### **Teste 2: Instância**
```bash
curl -X GET \
  'https://evo.boravendermuito.com.br/instance/connectionState/NOME_INSTANCIA' \
  -H 'apikey: SUA_API_KEY_AQUI'
```

**Se retornar 404:** Instância não existe (crie uma nova)
**Se retornar 200:** Instância existe ✅

---

## ❓ PERGUNTAS FREQUENTES

### "Não consigo acessar o Manager"
→ Você precisa da senha de administrador da Evolution API.  
→ Entre em contato com quem instalou/configurou o servidor.

---

### "Não sei qual API Key usar"
→ Há uma **API Key Global** no Manager (Settings).  
→ Esta é a que você deve usar no RENDIZY.

---

### "Criei uma instância mas ainda dá 404"
→ Aguarde 10 segundos e tente novamente.  
→ Certifique-se de copiar o nome EXATO (case-sensitive).

---

### "Tudo passou mas não gera QR Code"
→ Verifique os logs no console (F12).  
→ Copie o erro completo e analise.

---

## 🆘 AINDA COM PROBLEMAS?

Se após seguir todos os passos ainda houver erro:

### 1. Copiar Logs Completos
```
1. Abrir RENDIZY
2. Pressionar F12 (Console)
3. Tentar gerar QR Code
4. Copiar TODO o erro vermelho
```

### 2. Verificar Informações
- URL da Evolution API: `_______________`
- Nome da Instância: `_______________`
- API Key (primeiros 20 caracteres): `_______________`
- Erro específico: `_______________`

### 3. Próximo Passo
Com essas informações, podemos identificar o problema exato.

---

## ✅ CHECKLIST DE VERIFICAÇÃO

Antes de pedir ajuda, confirme:

- [ ] Acesso ao Manager (`/manager`) funciona
- [ ] API Key copiada COMPLETA (sem espaços no início/fim)
- [ ] Nome da instância está EXATO (case-sensitive)
- [ ] URL não tem `/manager` no final
- [ ] URL não tem `/` no final
- [ ] Backend do RENDIZY está online (testado com `TESTE_BACKEND_HEALTH.sh`)
- [ ] Console do navegador (F12) aberto para ver erros

---

## 🎯 RESUMO

**O problema É simples:**
```
Credenciais incorretas/desatualizadas
```

**A solução É simples:**
```
1. Acessar Manager
2. Copiar API Key correta
3. Copiar nome da instância
4. Atualizar no RENDIZY
5. Testar
6. Gerar QR Code
```

**Tempo total:** 5 minutos

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- `OBTER_CREDENCIAIS_CORRETAS_WHATSAPP.md` - Guia completo
- `TESTE_CREDENCIAIS_WHATSAPP.sh` - Script de teste automatizado
- `GUIA_INTEGRACAO_WHATSAPP_EVOLUTION_v1.0.103.42.md` - Integração completa

---

**v1.0.103.56** - Resolver Erro 401 WhatsApp  
**Status:** Pronto para uso  
**Ação:** Obter credenciais corretas e atualizar no RENDIZY  

🚀 **VOCÊ ESTÁ A 5 MINUTOS DO WHATSAPP FUNCIONANDO!**
