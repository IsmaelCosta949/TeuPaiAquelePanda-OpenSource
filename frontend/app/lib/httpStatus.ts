export type StatusClass = "1xx" | "2xx" | "3xx" | "4xx" | "5xx";

export const STATUS_CLASSES: Record<
  StatusClass,
  { label: string; description: string }
> = {
  "1xx": { label: "1xx Informativo", description: "Calma, o panda ainda está processando." },
  "2xx": { label: "2xx Sucesso", description: "Deu tudo certo, tem bambu pra todo mundo." },
  "3xx": { label: "3xx Redirecionamento", description: "O panda foi para outro lugar." },
  "4xx": { label: "4xx Erro do cliente", description: "Você pediu errado, o panda não entendeu." },
  "5xx": { label: "5xx Erro do servidor", description: "A culpa é do panda (do servidor)." },
};

export type HttpStatus = {
  code: number;
  name: string;
  /** Explicação curta, em tom de panda. */
  panda: string;
  /** O que o código significa de verdade. */
  meaning: string;
};

export const HTTP_STATUS: HttpStatus[] = [
  { code: 100, name: "Continue", panda: "Pode mandar o resto, estou mastigando.", meaning: "O servidor recebeu os cabeçalhos e o cliente pode continuar enviando o corpo da requisição." },
  { code: 101, name: "Switching Protocols", panda: "Troquei de assunto, agora é WebSocket.", meaning: "O servidor aceitou trocar de protocolo, como na atualização para WebSocket." },
  { code: 102, name: "Processing", panda: "Calma, estou pensando (e comendo).", meaning: "O servidor recebeu a requisição e ainda está processando, sem resposta final (WebDAV)." },
  { code: 103, name: "Early Hints", panda: "Já vou adiantando o bambu.", meaning: "Permite que o navegador comece a carregar recursos enquanto o servidor prepara a resposta final." },
  { code: 200, name: "OK", panda: "Tudo certo, bambu garantido.", meaning: "A requisição deu certo e a resposta traz o que foi pedido." },
  { code: 201, name: "Created", panda: "Nasceu um filhote novo!", meaning: "A requisição deu certo e um novo recurso foi criado, normalmente após um POST." },
  { code: 202, name: "Accepted", panda: "Anotei o pedido, depois eu faço.", meaning: "A requisição foi aceita para processamento, mas ainda não foi concluída." },
  { code: 203, name: "Non-Authoritative Information", panda: "Quem me contou foi um panda intermediário.", meaning: "A resposta deu certo, mas vem de uma cópia ou de um proxy, não direto do servidor de origem." },
  { code: 204, name: "No Content", panda: "Deu certo, mas não tenho nada pra falar.", meaning: "Sucesso sem corpo na resposta. Comum em DELETE e PUT." },
  { code: 205, name: "Reset Content", panda: "Rolei no chão e recomecei do zero.", meaning: "Sucesso: o cliente deve limpar o formulário ou a visualização que enviou a requisição." },
  { code: 206, name: "Partial Content", panda: "Só uma mordida do bambu.", meaning: "Entrega só uma parte do recurso, como pedido no cabeçalho Range." },
  { code: 207, name: "Multi-Status", panda: "Cada panda tem uma resposta diferente.", meaning: "A resposta traz vários status de uma vez, um para cada operação (WebDAV)." },
  { code: 208, name: "Already Reported", panda: "Esse bambu eu já contei antes.", meaning: "Os itens já foram listados em uma parte anterior da resposta (WebDAV)." },
  { code: 226, name: "IM Used", panda: "Comi o bambu já mastigado.", meaning: "O servidor aplicou manipulações de instância (delta encoding) na resposta, conforme o RFC 3229." },
  { code: 300, name: "Multiple Choices", panda: "Dois caminhos, escolhe um.", meaning: "Existem várias representações possíveis do recurso e o cliente precisa escolher uma." },
  { code: 301, name: "Moved Permanently", panda: "Mudei de toca de vez.", meaning: "O recurso agora vive em outra URL, para sempre. Buscadores atualizam o endereço." },
  { code: 302, name: "Found", panda: "Estou na casa do vizinho, só por enquanto.", meaning: "Redirecionamento temporário: continue usando a URL original nas próximas vezes." },
  { code: 303, name: "See Other", panda: "Olha lá, é naquela toca ali.", meaning: "Redireciona para outra URL, que deve ser buscada com GET." },
  { code: 304, name: "Not Modified", panda: "Nada mudou, usa o que você já tem.", meaning: "O recurso não mudou desde a última vez, então o cache pode ser usado." },
  { code: 305, name: "Use Proxy", panda: "Fala com o panda ali do lado.", meaning: "Obsoleto: o recurso só pode ser acessado por meio de um proxy indicado na resposta." },
  { code: 307, name: "Temporary Redirect", panda: "Passeio rápido, já volto (mesmo método).", meaning: "Redirecionamento temporário que mantém o método e o corpo da requisição." },
  { code: 308, name: "Permanent Redirect", panda: "Mudança definitiva, e sem trocar de método.", meaning: "Redirecionamento permanente que mantém o método e o corpo da requisição." },
  { code: 400, name: "Bad Request", panda: "Não entendi nada do que você falou.", meaning: "A requisição está malformada: sintaxe inválida, JSON quebrado, parâmetros faltando." },
  { code: 401, name: "Unauthorized", panda: "Quem é você? Mostra o crachá.", meaning: "Falta autenticação ou ela é inválida. Faça login ou envie um token válido." },
  { code: 402, name: "Payment Required", panda: "Bambu não é de graça.", meaning: "Reservado para pagamentos. Alguns serviços usam quando a cobrança falha." },
  { code: 403, name: "Forbidden", panda: "Eu sei quem você é, mas aqui você não entra.", meaning: "O servidor entendeu a requisição, mas você não tem permissão para acessar o recurso." },
  { code: 404, name: "Not Found", panda: "Procurei por toda a floresta e nada.", meaning: "O recurso não existe nesta URL. Pode ser link quebrado ou endereço digitado errado." },
  { code: 405, name: "Method Not Allowed", panda: "Esse jeito de pedir não vale aqui.", meaning: "O método HTTP (GET, POST…) não é permitido para esse recurso." },
  { code: 406, name: "Not Acceptable", panda: "Não tenho nada do jeito que você quer.", meaning: "O servidor não consegue gerar uma resposta nos formatos aceitos pelo cliente." },
  { code: 407, name: "Proxy Authentication Required", panda: "O porteiro da floresta quer ver o seu crachá.", meaning: "Falta autenticação no proxy intermediário, não no servidor final." },
  { code: 408, name: "Request Timeout", panda: "Você demorou tanto que eu dormi.", meaning: "O servidor esperou a requisição completa por tempo demais e desistiu." },
  { code: 409, name: "Conflict", panda: "Dois pandas querem o mesmo bambu.", meaning: "A requisição conflita com o estado atual do recurso, como edições simultâneas." },
  { code: 410, name: "Gone", panda: "Esse bambu acabou e não volta mais.", meaning: "O recurso existia, foi removido de vez e não há endereço novo." },
  { code: 411, name: "Length Required", panda: "Preciso saber o tamanho do bambu antes.", meaning: "O servidor exige o cabeçalho Content-Length na requisição." },
  { code: 412, name: "Precondition Failed", panda: "Você disse que ia ser assim, e não foi.", meaning: "Uma condição dos cabeçalhos da requisição (como If-Match) não foi satisfeita." },
  { code: 413, name: "Content Too Large", panda: "Isso não cabe na minha boca.", meaning: "O corpo da requisição é maior do que o servidor aceita." },
  { code: 414, name: "URI Too Long", panda: "Esse endereço não acaba nunca.", meaning: "A URL enviada é maior do que o servidor consegue processar." },
  { code: 415, name: "Unsupported Media Type", panda: "Não como esse tipo de comida.", meaning: "O formato do corpo (Content-Type) não é suportado pelo servidor." },
  { code: 416, name: "Range Not Satisfiable", panda: "Esticou demais, o bambu não chega lá.", meaning: "O intervalo pedido no cabeçalho Range está fora do tamanho do recurso." },
  { code: 417, name: "Expectation Failed", panda: "Esperava mais de você.", meaning: "O servidor não consegue atender à expectativa do cabeçalho Expect." },
  { code: 418, name: "I'm a teapot", panda: "Sou um panda, não uma chaleira. Mas aceito chá.", meaning: "Piada do April Fools de 1998 (RFC 2324): o servidor é uma chaleira e se recusa a fazer café." },
  { code: 421, name: "Misdirected Request", panda: "Você bateu na toca errada.", meaning: "A requisição foi enviada a um servidor que não consegue responder por esse domínio." },
  { code: 422, name: "Unprocessable Content", panda: "Entendi, mas o que você mandou não faz sentido.", meaning: "A sintaxe está correta, mas os dados são semanticamente inválidos (validação falhou)." },
  { code: 423, name: "Locked", panda: "Essa toca está trancada.", meaning: "O recurso está bloqueado e não pode ser alterado agora (WebDAV)." },
  { code: 424, name: "Failed Dependency", panda: "Dependia de outro panda, que falhou.", meaning: "A requisição falhou porque dependia de outra requisição que deu erro (WebDAV)." },
  { code: 425, name: "Too Early", panda: "Ainda é cedo, volta mais tarde.", meaning: "O servidor não quer processar uma requisição que pode ser repetida (replay)." },
  { code: 426, name: "Upgrade Required", panda: "Atualiza o protocolo e volta aqui.", meaning: "O servidor só atende se o cliente trocar de protocolo, como migrar para TLS." },
  { code: 428, name: "Precondition Required", panda: "Tem que avisar antes de mexer.", meaning: "O servidor exige uma requisição condicional (como If-Match) para evitar conflitos." },
  { code: 429, name: "Too Many Requests", panda: "Devagar, uma mordida de cada vez!", meaning: "Você excedeu o limite de requisições (rate limit). Espere e tente de novo." },
  { code: 431, name: "Request Header Fields Too Large", panda: "Esses cabeçalhos são grandes demais para minha cabeça.", meaning: "Os cabeçalhos da requisição, ou um deles, ultrapassam o limite do servidor." },
  { code: 451, name: "Unavailable For Legal Reasons", panda: "Não posso mostrar, ordens superiores.", meaning: "O recurso foi bloqueado por motivos legais, como uma decisão judicial." },
  { code: 500, name: "Internal Server Error", panda: "Algo explodiu na floresta.", meaning: "Erro genérico no servidor: algo inesperado aconteceu e ele não soube lidar." },
  { code: 501, name: "Not Implemented", panda: "Ainda não aprendi a fazer isso.", meaning: "O servidor não suporta a funcionalidade necessária para atender a requisição." },
  { code: 502, name: "Bad Gateway", panda: "O panda de trás me mandou bobagem.", meaning: "Um gateway ou proxy recebeu uma resposta inválida do servidor de origem." },
  { code: 503, name: "Service Unavailable", panda: "Estou de folga, volta depois.", meaning: "O servidor está sobrecarregado ou em manutenção e não consegue responder agora." },
  { code: 504, name: "Gateway Timeout", panda: "Esperei o outro panda e ele nunca respondeu.", meaning: "O gateway ou proxy esperou demais pela resposta do servidor de origem." },
  { code: 505, name: "HTTP Version Not Supported", panda: "Essa língua eu não falo.", meaning: "O servidor não suporta a versão do HTTP usada na requisição." },
  { code: 506, name: "Variant Also Negotiates", panda: "Dois pandas gritando, ninguém se entende.", meaning: "Erro de configuração na negociação de conteúdo: a variante escolhida também negocia." },
  { code: 507, name: "Insufficient Storage", panda: "Minha barriga está cheia.", meaning: "O servidor não tem espaço suficiente para concluir a requisição (WebDAV)." },
  { code: 508, name: "Loop Detected", panda: "Estou correndo atrás do próprio rabo.", meaning: "O servidor detectou um loop infinito ao processar a requisição (WebDAV)." },
  { code: 510, name: "Not Extended", panda: "Falta uma extensão para isso.", meaning: "O servidor exige extensões adicionais da requisição para atendê-la." },
  { code: 511, name: "Network Authentication Required", panda: "Entra no wifi antes, por favor.", meaning: "É preciso se autenticar na rede (ex.: portal de wifi público) antes de acessar." },
];

export function statusClass(code: number): StatusClass {
  return `${Math.floor(code / 100)}xx` as StatusClass;
}
