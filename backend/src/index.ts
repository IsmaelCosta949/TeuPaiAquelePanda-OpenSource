import PostalMime from 'postal-mime';

interface EmailArmazenado {
	id: string;
	from: string;
	fromName: string;
	subject: string;
	preview: string;
	body: string;
	receivedAt: number;
}

export default {
	// 1. RECEBE O EMAIL DA CLOUDFLARE
	async email(message, env, ctx) {
		const paraQuem = message.to;
		const parsed = await PostalMime.parse(message.raw);

		const corpo = parsed.text || parsed.html || '';

		const novoEmail: EmailArmazenado = {
			id: crypto.randomUUID(),
			from: parsed.from?.address || message.from,
			fromName: parsed.from?.name || parsed.from?.address || message.from,
			subject: parsed.subject || 'Sem assunto',
			preview: corpo.slice(0, 140),
			body: corpo,
			receivedAt: Date.now(),
		};

		// Puxa a lista antiga, adiciona o novo e salva de novo
		// O expirationTtl de 3600 faz o email sumir em 1 hora!
		const listaAtual = (await env.EMAILS_TEMP.get<EmailArmazenado[]>(paraQuem, { type: 'json' })) || [];
		listaAtual.unshift(novoEmail);

		await env.EMAILS_TEMP.put(paraQuem, JSON.stringify(listaAtual), { expirationTtl: 3600 });
	},

	// 2. ENTREGA OS EMAILS PARA O SEU FRONTEND (API)
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname === '/api/emails') {
			const enderecoDeEmail = url.searchParams.get('address');
			if (!enderecoDeEmail) return new Response('Forneça um email', { status: 400 });

			const emails = (await env.EMAILS_TEMP.get<EmailArmazenado[]>(enderecoDeEmail, { type: 'json' })) || [];

			return new Response(JSON.stringify(emails), {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*', // Permite seu localhost ler os dados
				},
			});
		}

		return new Response('API do Teu Pai Aquele Panda online! 🐼');
	},
} satisfies ExportedHandler<Env>;
