# ⚡ COMECE AGORA: Sites por Cliente

## 🎯 SISTEMA PRONTO! Use em 3 Passos

---

## ✅ PASSO 1: Adicionar Rota no Admin (30 segundos)

Abra `/components/AppRouter.tsx` e adicione:

```tsx
import { ClientSitesManager } from './components/ClientSitesManager';

// Adicione na lista de rotas:
<Route path="/sites-clientes" element={<ClientSitesManager />} />
```

**Pronto!** Agora você tem o painel de sites em `/sites-clientes`

---

## ✅ PASSO 2: Criar Primeiro Site (1 minuto)

1. **Acesse** `/sites-clientes` no RENDIZY Admin

2. **Clique** "Criar Novo Site"

3. **Preencha**:
   ```
   ID da Organização: org_teste_001
   Nome do Site: Imobiliária Teste
   Template: custom
   Email: contato@teste.com
   Modalidades: ☑ Temporada ☑ Venda
   ```

4. **Clique** "Criar Site"

5. **✅ Site criado!**
   - URL: `imobiliaria-teste.rendizy.app`
   - Configurações salvas no KV store

---

## ✅ PASSO 3: Importar Código (2 minutos)

### Opção A: Usar Exemplo Pronto

1. Abra `/EXEMPLO_SITE_PARA_IMPORTAR_v1.0.103.187.tsx`
2. **Copie TODO o código**
3. No painel Sites → Clique botão **"Código"**
4. **Cole o código**
5. Clique **"Enviar Código"**
6. ✅ **Pronto!** Site funcionando!

### Opção B: Criar em v0.dev

1. Vá em https://v0.dev
2. Digite:
   ```
   Crie um site moderno de imobiliária com:
   - Hero section
   - Busca de imóveis
   - Grid de propriedades
   - Motor de reservas
   Use React e Tailwind
   ```
3. **Copie o código** gerado
4. RENDIZY → Sites → **Upload Código**
5. ✅ **Pronto!**

### Opção C: Criar com Bolt.ai

1. Vá em https://bolt.new
2. Crie design de site
3. **Export código**
4. RENDIZY → Sites → **Upload Código**
5. ✅ **Pronto!**

---

## 🎉 COMO TESTAR

### 1. Ver Dados Reais

O site importado automaticamente mostra:
- ✅ Imóveis do `org_teste_001`
- ✅ Preços da precificação sazonal
- ✅ Disponibilidade do calendário
- ✅ Motor de reservas funcionando

### 2. Fazer uma Reserva de Teste

```bash
1. Acesse o site
2. Escolha um imóvel
3. Clique "Reservar"
4. Preencha datas, nome, email
5. Clique "Confirmar Reserva"
6. ✅ Reserva aparece no RENDIZY Admin!
```

### 3. Buscar Imóveis

```bash
1. Use o campo de busca no site
2. Preencha cidade, datas, hóspedes
3. Clique "Buscar"
4. ✅ Resultados vêm da API RENDIZY!
```

---

## 🔌 COMO FUNCIONA A INTEGRAÇÃO

### Código Original (mockado):

```tsx
function PropertyGrid() {
  // ❌ Dados mockados
  const properties = [
    { id: 1, name: 'Casa', price: 500 }
  ];
  
  return <div>...</div>;
}
```

### Código com RENDIZY:

```tsx
function PropertyGrid() {
  // ✅ Dados reais injetados automaticamente!
  const { properties } = useRendizyData();
  
  return <div>...</div>;
}
```

**Você NÃO precisa mudar o código original!**  
O `ClientSiteWrapper` detecta e injeta automaticamente.

---

## 📊 DADOS DISPONÍVEIS

Todo site tem acesso a:

```typescript
const {
  properties,        // Todos os imóveis do cliente
  loading,           // Status de carregamento
  searchProperties,  // Buscar com filtros
  getProperty,       // Buscar por ID
  checkAvailability, // Ver se está disponível
  calculatePrice,    // Calcular preço sazonal
  createReservation, // Criar reserva
  sendQuotation      // Enviar cotação
} = useRendizyData();
```

---

## 🎨 PERSONALIZAR PARA CLIENTE

```bash
# Editar site existente:
RENDIZY → Sites → Botão "⚙️" do site

# Pode mudar:
- Cores (primary, secondary, accent)
- Logo
- Domínio customizado
- Modalidades (temporada, venda, locação)
- Textos (slogan, descrição, contatos)
```

---

## 🚀 CRIAR PARA CLIENTE REAL

### Exemplo: Cliente "Imobiliária Sol"

```bash
1. Criar site:
   - organizationId: org_12345_imobiliaria_sol
   - siteName: Imobiliária Sol
   - template: custom
   - features: Temporada + Venda
   
2. Importar design (v0.dev, Bolt, ou Figma)

3. Configurar domínio:
   - Subdomínio: imobiliaria-sol.rendizy.app
   - OU customizado: www.imobiliariasol.com.br
   
4. Personalizar:
   - Logo do cliente
   - Cores da marca
   - Contatos reais
   
5. ✅ Deploy!
   - Site no ar
   - Dados do RENDIZY
   - Motor de reservas funcionando
```

---

## 💡 DICAS PRO

### 1. Use Templates da IA

```
Peça para v0.dev criar 3 versões:
- Versão moderna (cores vibrantes)
- Versão clássica (tons neutros)
- Versão luxo (design premium)

Depois escolha a melhor para cada cliente!
```

### 2. Aproveite Componentes

```
Peça para IA criar componentes separados:
- Hero section
- Busca avançada
- Grid de imóveis
- Formulário contato
- Depoimentos
- FAQ

Monte diferentes combinações!
```

### 3. Peça Melhorias Específicas

```
"Adicione animações ao scroll"
"Faça design responsivo mobile-first"
"Adicione modo escuro"
"Implemente lazy loading nas imagens"
```

---

## ❓ FAQ RÁPIDO

**Q: Preciso saber programar?**  
**A:** Não! Use v0.dev ou Bolt para criar, depois só importe.

**Q: Cada cliente tem banco separado?**  
**A:** Não! Todos usam o mesmo backend RENDIZY. Os dados são separados por `organizationId`.

**Q: Posso usar domínio próprio do cliente?**  
**A:** Sim! Configure DNS do cliente para apontar para RENDIZY.

**Q: Sites são seguros?**  
**A:** Sim! Dados sempre passam pelo backend autenticado do RENDIZY.

**Q: Consigo ver as reservas feitas no site?**  
**A:** Sim! Aparecem no RENDIZY Admin automaticamente.

**Q: Quanto custa hospedar?**  
**A:** R$ 0! Sites rodam na mesma infraestrutura do RENDIZY.

---

## 🎯 CHECKLIST DE SUCESSO

- [ ] Adicionei rota `/sites-clientes`
- [ ] Criei site de teste (org_teste_001)
- [ ] Importei código de exemplo
- [ ] Testei busca de imóveis
- [ ] Testei criação de reserva
- [ ] Site mostra dados reais
- [ ] Entendi como funciona o wrapper
- [ ] Li o guia completo
- [ ] Pronto para criar site de cliente real!

---

## 📞 PRÓXIMO PASSO

**Quer criar um site específico?**

Peça assim:

```
"Crie um site [estilo] de imobiliária com:
- [recursos que você quer]
- [design que você quer]
- [funcionalidades específicas]
Para usar no sistema de sites por cliente"
```

Eu vou gerar o código completo pronto para importar! 🚀

---

## ✅ RESUMO 3 PASSOS

1. **Adicionar rota** → 30 segundos
2. **Criar site** → 1 minuto
3. **Importar código** → 2 minutos

**Total: ~3 minutos para ter site funcionando!** ⚡

---

**Sistema pronto para produção! 🎉**
