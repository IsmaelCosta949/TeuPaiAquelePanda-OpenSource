import PostalMime from 'postal-mime';

// Local parts that can never be read back through the public API — either
// because they're a real address we operate (suporte@) or because they're
// common admin/abuse targets. Keep this in sync with the frontend's list at
// frontend/app/lib/reservedLocalParts.ts.
const RESERVED_LOCAL_PARTS = new Set([
	'suporte',
	'support',
	'admin',
	'administrador',
	'contato',
	'contact',
	'abuse',
	'postmaster',
	'webmaster',
	'hostmaster',
	'root',
	'noreply',
	'no-reply',
	'security',
	'seguranca',
	'privacy',
	'privacidade',
	'legal',
	'termos',
	'info',
]);

function isReservedAddress(address: string): boolean {
	const localPart = address.split('@')[0]?.trim().toLowerCase() ?? '';
	return RESERVED_LOCAL_PARTS.has(localPart);
}

interface EmailArmazenado {
	id: string;
	from: string;
	fromName: string;
	subject: string;
	preview: string;
	body: string;
	isHtml: boolean;
	receivedAt: number;
}

export default {
	// 1. RECEBE O EMAIL DA CLOUDFLARE
	async email(message, env, ctx) {
		const paraQuem = message.to;
		const parsed = await PostalMime.parse(message.raw);

		// Only treat it as HTML when there's no plain-text part at all — most
		// mail clients send both, and plain text is safer/simpler to render.
		const isHtml = !parsed.text && !!parsed.html;
		const corpo = parsed.text || parsed.html || '';
		const textoPlano = parsed.text || (parsed.html ? parsed.html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '');

		const novoEmail: EmailArmazenado = {
			id: crypto.randomUUID(),
			from: parsed.from?.address || message.from,
			fromName: parsed.from?.name || parsed.from?.address || message.from,
			subject: parsed.subject || 'Sem assunto',
			preview: textoPlano.slice(0, 140),
			body: corpo,
			isHtml,
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

			if (isReservedAddress(enderecoDeEmail)) {
				return new Response('Endereço reservado', {
					status: 403,
					headers: { 'Access-Control-Allow-Origin': '*' },
				});
			}

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
