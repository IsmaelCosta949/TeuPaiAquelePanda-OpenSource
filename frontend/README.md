# Frontend — Teu Pai, Aquele Panda

App em React Router v8 do **Teu Pai, Aquele Panda**, um serviço de e-mail descartável em português. Permite que visitantes criem uma caixa de entrada temporária sem cadastro, e ainda traz algumas ferramentas para desenvolvedores.

Renderizado como uma SPA estática pré-renderizada (`ssr: false`) — veja [react-router.config.ts](react-router.config.ts).

## Funcionalidades

- **Página inicial** (`/`) — menu com todas as ferramentas, agrupadas por categoria (também disponível no menu "Ferramentas" do cabeçalho). O catálogo fica em `app/lib/tools.ts`.
- **E-mail temporário** (`/email-temporario`) e **caixa de entrada** (`/caixa-de-entrada`) — gera um endereço aleatório ou permite escolher um local part customizado, e consulta a API do backend em busca de novas mensagens.
- **Visualização de mensagem** (`/email/:id`) — lê uma mensagem, com corpos em HTML sanitizados via [DOMPurify](https://github.com/cure53/DOMPurify) antes de renderizar.
- **Ferramentas, uma página cada** — para QA e devs: geradores de CPF/CNPJ/RG, pessoa fictícia e cartão de teste (Luhn), validador de CPF/CNPJ, gerador de senha, formatador de JSON, decodificador de JWT, UUID, Base64, hash (SHA), conversor de timestamp e gerador de QR Code; e de texto: contador de caracteres e Lorem Ipsum.
- **Suporte** (`/suporte`) e **Termos de Uso** (`/termos`).
- Alternância de tema claro/escuro, metadados de SEO + dados estruturados por rota (`app/lib/seo.ts`), sitemap (gerado a partir do catálogo) e robots.txt para as rotas pré-renderizadas.

## Setup

```bash
npm install
cp .env.example .env
```

Preencha o `.env`:

| Variável                  | Finalidade                                            |
| -------------------------- | ------------------------------------------------------ |
| `VITE_API_BASE`            | URL base da API do [backend](../backend)              |
| `VITE_SITE_URL`            | URL canônica do site, usada nos metadados de SEO       |
| `VITE_ADSENSE_CLIENT_ID`   | Client id do Google AdSense (opcional)                |
| `VITE_CF_ANALYTICS_TOKEN`  | Token do Cloudflare Web Analytics, grátis e sem cookies (opcional) |

## Desenvolvimento

```bash
npm run dev
```

O app roda em `http://localhost:5173`.

## Build de produção

```bash
npm run build
```

```
build/
├── client/   # assets estáticos
└── server/   # entrada de servidor (não usada em runtime já que ssr: false, mantida para o @react-router/serve)
```

## Outros comandos

| Comando             | Finalidade                                |
| -------------------- | ------------------------------------------ |
| `npm run typecheck`  | Gera os tipos das rotas e roda o `tsc`     |
| `npm run start`      | Serve um build de produção localmente      |

## Deploy

### Docker

```bash
docker build -t frontend .
docker run -p 3000:3000 frontend
```

Pode ser implantado em qualquer plataforma com suporte a Docker (Cloudflare, Fly.io, Railway, Render, etc.).

## Stack

- [React Router v8](https://reactrouter.com/) (framework mode, pré-renderizado)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html) (Adobe) estilizado com Tailwind, via `tailwindcss-react-aria-components`
- [DOMPurify](https://github.com/cure53/DOMPurify) para sanitizar corpos de e-mail em HTML
- TypeScript em todo o projeto

## Estrutura do projeto

```
app/
├── components/   # componentes de UI (wrappers do React Aria em components/ui)
├── lib/          # cliente de API, helpers de endereço/formatação, SEO, contexto de e-mail
├── routes/       # componentes de rota (veja app/routes.ts para a árvore de rotas)
└── types/        # tipos TypeScript compartilhados
```
