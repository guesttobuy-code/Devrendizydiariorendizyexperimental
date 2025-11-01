# 🚨 ERRO 401? LEIA ISTO PRIMEIRO!

## ❌ O Problema

Você está vendo este erro:
```
❌ Evolution API Error 401: Unauthorized
❌ Headers enviados: { apikey: "F7DE5EFFB66B-4E43-B11F-F0D5D8849741" }
```

## ✅ A Solução (1 minuto)

O backend está usando a API Key **ANTIGA** (inválida).

Você precisa atualizar para a **NOVA**:
```
4de7861e944e291b56fe9781d2b00b36
```

---

## 🚀 COMO CORRIGIR

### Opção 1: Automático (Recomendado)

```bash
bash ATUALIZAR_API_KEY_BACKEND_AGORA.sh
```

Depois recarregue a página (F5)

### Opção 2: Manual (pela Interface)

1. Abra: http://localhost:5173
2. Vá em: **Configurações → Integrações → WhatsApp**
3. Preencha:
   ```
   URL:       https://evo.boravendermuito.com.br
   Instância: Rendizy
   API Key:   4de7861e944e291b56fe9781d2b00b36
   ```
4. Clique: **Salvar Configurações**
5. Clique: **Testar Conexão** → ✅ Deve funcionar!

---

## ✅ Como Saber se Funcionou

Após atualizar:
- ✅ Não deve mais aparecer erro 401
- ✅ "Testar Conexão" deve retornar sucesso
- ✅ Pode gerar QR Code sem erros

---

## 📖 Mais Detalhes

Se precisar de mais informações:
- `CORRIGIR_ERRO_401_AGORA.md` - Instruções completas
- `ATUALIZAR_API_KEY_AGORA.md` - Guia passo a passo
- `START_HERE_v1.0.103.70.md` - Documentação principal

---

**Escolha uma opção e execute AGORA!** ⚡
