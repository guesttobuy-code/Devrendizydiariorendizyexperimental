# ⚡ CORRIGIR ERRO 401 AGORA - 1 MINUTO

**Problema:** Backend ainda usa a API Key antiga (inválida)  
**Solução:** Atualizar para a nova API Key

---

## 🚀 OPÇÃO 1: Script Automático (RÁPIDO)

```bash
bash ATUALIZAR_API_KEY_BACKEND_AGORA.sh
```

Depois:
1. Recarregue a página (F5)
2. O erro 401 deve sumir! ✅

---

## 🖱️ OPÇÃO 2: Interface Manual (SIMPLES)

### Passo 1: Abrir RENDIZY
```
http://localhost:5173
```

### Passo 2: Ir em Configurações
```
Menu → Configurações → Integrações → WhatsApp
```

### Passo 3: Preencher 3 Campos

**URL da Evolution API:**
```
https://evo.boravendermuito.com.br
```

**Nome da Instância:**
```
Rendizy
```

**API Key (COPIE ESTE):**
```
4de7861e944e291b56fe9781d2b00b36
```

### Passo 4: Salvar
```
Clique em [💾 Salvar Configurações]
```

### Passo 5: Testar
```
Clique em [🔄 Testar Conexão]
```

**Deve aparecer:** ✅ "Conexão testada com sucesso!"

---

## 🎯 O QUE ESTÁ ACONTECENDO

O backend tem salva a API Key **antiga**:
```
❌ F7DE5EFFB66B-4E43-B11F-F0D5D8849741 (inválida)
```

Você precisa atualizar para a **nova**:
```
✅ 4de7861e944e291b56fe9781d2b00b36 (válida)
```

---

## ✅ RESULTADO ESPERADO

Após atualizar, não deve mais aparecer:
```
❌ Evolution API Error 401: Unauthorized
❌ API Key inválida
```

Deve aparecer:
```
✅ Conexão testada com sucesso!
✅ WhatsApp pronto para conectar
```

---

## 🆘 SE NÃO FUNCIONAR

Verifique se:
1. Copiou a API Key corretamente (sem espaços)
2. URL não tem `/manager` no final
3. Nome da instância é exatamente: `Rendizy` (com R maiúsculo)

---

**Escolha a opção que preferir e execute AGORA!** 🚀
