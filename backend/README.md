# Backend — Teu Pai, Aquele Panda

Cloudflare Worker que recebe e-mails de entrada via **Cloudflare Email Routing**, faz o parsing e armazena no **Workers KV** para uma caixa de e-mail temporária de vida curta. Serve essa caixa de entrada ao frontend através de uma pequena API JSON.

## Como funciona

1. O Cloudflare Email Routing encaminha qualquer mensagem enviada ao domínio configurado para o handler `email()` deste Worker.
2. O handler faz o parsing da mensagem MIME bruta com [`postal-mime`](https://www.npmjs.com/package/postal-mime), monta um preview em texto plano e armazena a mensagem processada usando o endereço do destinatário como chave no KV.
3. A lista de mensagens de cada endereço é armazenada com `expirationTtl: 3600` — as mensagens somem automaticamente após **1 hora**.
4. `GET /api/emails?address=<email>` retorna as mensagens daquele endereço em JSON para o frontend exibir.

Local parts reservados (`suporte`, `admin`, `postmaster`, etc.) nunca podem ser lidos de volta pela API — veja `RESERVED_LOCAL_PARTS` em [src/index.ts](src/index.ts). Mantenha essa lista sincronizada com a cópia do frontend em `frontend/app/lib/reservedLocalParts.ts`.

## API

### `GET /api/emails?address=<email>`

Retorna as mensagens armazenadas para um endereço, das mais recentes para as mais antigas.

- `400` se `address` não for informado.
- `403` se `address` for um local part reservado.
- `200` com `[]` se o endereço não tiver mensagens (ou elas já tiverem expirado).

Formato da resposta:

```jsonc
[
	{
		"id": "uuid",
		"from": "remetente@exemplo.com",
		"fromName": "Nome do Remetente",
		"subject": "Assunto da mensagem",
		"preview": "Primeiros 140 caracteres do corpo em texto plano...",
		"body": "Corpo completo em texto ou HTML",
		"isHtml": false,
		"receivedAt": 1234567890123,
	},
]
```

### `GET /`

Health check — retorna um texto simples confirmando que o Worker está no ar.

## Setup

```bash
npm install
```

Crie o namespace do KV usado para armazenar as mensagens e substitua o id em [wrangler.jsonc](wrangler.jsonc):

```bash
npx wrangler kv namespace create EMAILS_TEMP
```

Também é necessário configurar o Email Routing no domínio pelo painel da Cloudflare, com uma regra catch-all (ou por endereço) apontando para este Worker.

## Comandos

| Comando              | Finalidade                             |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Desenvolvimento local (`wrangler dev`) |
| `npm run deploy`     | Deploy para a Cloudflare               |
| `npm test`           | Roda a suíte de testes com Vitest      |
| `npm run cf-typegen` | Regenera `worker-configuration.d.ts`   |

Rode `npm run cf-typegen` sempre que alterar os bindings em `wrangler.jsonc`.

## Stack

- [Cloudflare Workers](https://developers.cloudflare.com/workers/) + [Email Routing](https://developers.cloudflare.com/email-routing/)
- [Workers KV](https://developers.cloudflare.com/kv/) para armazenamento com expiração via TTL
- [postal-mime](https://www.npmjs.com/package/postal-mime) para parsing de MIME
- [Vitest](https://vitest.dev/) com `@cloudflare/vitest-plugin` para testes contra o runtime dos Workers

Veja [AGENTS.md](AGENTS.md) para referências da documentação oficial do Cloudflare Workers, comandos e boas práticas relevantes para este pacote.
