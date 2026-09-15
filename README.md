# Teu Pai, Aquele Panda

Um serviço de e-mail temporário: gere uma caixa de entrada temporária, receba e-mails por uma hora, sem cadastro. Também traz um conjunto de ferramentas para desenvolvedores (gerador de CPF/CNPJ/RG fictícios, gerador de senhas, formatador de JSON, decodificador de JWT).

## Arquitetura

```
E-mail recebido ─▶ Cloudflare Email Routing ─▶ Worker (backend) ─▶ Workers KV (TTL de 1h)
                                                      │
                                                      ▼
                                           GET /api/emails?address=
                                                      │
                                                      ▼
                                          frontend (SPA em React Router)
```

- **[backend/](backend)** — Cloudflare Worker. Recebe e-mails via Cloudflare Email Routing, faz o parsing com `postal-mime` e armazena no Workers KV com expiração de 1 hora. Expõe `GET /api/emails?address=` para o frontend consultar.

- **[frontend/](frontend)** — App em React Router v8 (SPA pré-renderizada) com Tailwind + shadcn/ui. Permite criar um endereço, visualizar e-mails recebidos e usar as ferramentas para devs.

Cada pacote tem seu próprio README com instruções de setup, variáveis de ambiente e deploy.

## Começando rápido

```bash
# backend
cd backend
npm install
npx wrangler kv namespace create EMAILS_TEMP   # depois atualize o id no wrangler.jsonc
npm run dev

# frontend (em outro terminal)
cd frontend
npm install
cp .env.example .env   # defina VITE_API_BASE com a URL do backend
npm run dev
```

Veja [backend/README.md](backend/README.md) e [frontend/README.md](frontend/README.md) para mais detalhes.
