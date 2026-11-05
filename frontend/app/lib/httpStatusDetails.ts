// Descrição detalhada de cada status, em parágrafos. A chave é o código HTTP.
export const HTTP_STATUS_DETAILS: Record<number, string[]> = {
  100: [
    "O código de status informativo 100 Continue indica que até agora está tudo certo e que o cliente deve continuar com a requisição ou ignorar a resposta caso ela já tenha terminado.",
    "Para que o servidor confira os cabeçalhos antes de receber o corpo, o cliente precisa enviar o cabeçalho Expect: 100-continue na requisição inicial e esperar o 100 Continue antes de mandar o corpo. Isso evita transferir um arquivo grande que o servidor acabaria recusando (por falta de autenticação, por exemplo).",
  ],
  101: [
    "O código 101 Switching Protocols indica que o servidor aceitou trocar o protocolo da conexão, conforme o cliente pediu no cabeçalho Upgrade da requisição.",
    "O servidor responde com o cabeçalho Upgrade informando o protocolo para o qual a conexão passou a funcionar. O uso mais comum é a abertura de uma conexão WebSocket, que começa como uma requisição HTTP comum e depois muda de protocolo.",
  ],
  102: [
    "O código 102 Processing é uma resposta informativa da extensão WebDAV. Ele avisa ao cliente que o servidor recebeu a requisição completa e ainda a está processando, mas não há resposta final disponível.",
    "Ele evita que o cliente desista por tempo esgotado em operações demoradas, que envolvem muitas subrequisições. Hoje ele é raro e foi removido da especificação principal do WebDAV, e novas aplicações devem preferir o 202 Accepted.",
  ],
  103: [
    "O código 103 Early Hints é uma resposta informativa enviada antes da resposta final. Ela permite que o servidor adiante ao navegador uma lista de recursos que provavelmente serão necessários, por meio de cabeçalhos Link.",
    "Assim, enquanto o servidor ainda monta a página (consultando banco de dados, por exemplo), o navegador já pode começar a baixar folhas de estilo, scripts e fontes, ou abrir conexões com outros domínios. O resultado é um carregamento mais rápido.",
  ],
  200: [
    "O código 200 OK indica que a requisição deu certo. O significado exato do sucesso depende do método HTTP usado.",
    "Em um GET, o recurso foi encontrado e vem no corpo da resposta. Em um HEAD, os cabeçalhos do recurso vêm na resposta, sem corpo. Em um POST ou PUT, a resposta traz o resultado da ação realizada. Em um TRACE, o corpo contém a requisição recebida pelo servidor.",
    "É a resposta mais comum da web. Para criar um recurso, porém, o ideal é usar o 201 Created, e para sucesso sem conteúdo, o 204.",
  ],
  201: [
    "O código 201 Created indica que a requisição deu certo e que, como resultado, um ou mais recursos novos foram criados.",
    "Ele costuma ser a resposta a um POST (ou a alguns PUT). A resposta normalmente inclui o cabeçalho Location com a URL do novo recurso, e o corpo pode trazer uma representação dele. Usá-lo em vez do 200 deixa claro para o cliente que algo foi de fato criado.",
  ],
  202: [
    "O código 202 Accepted indica que a requisição foi recebida e aceita para processamento, mas ainda não foi concluída. Ela pode, inclusive, acabar sendo rejeitada depois.",
    "É usado quando o trabalho acontece de forma assíncrona, como o processamento de um vídeo ou o envio de um relatório por e-mail. O servidor não tem como enviar depois o resultado pela mesma conexão, então é comum a resposta trazer um link para consultar o andamento ou um identificador da tarefa.",
  ],
  203: [
    "O código 203 Non-Authoritative Information indica que a requisição deu certo, mas o conteúdo foi modificado por um proxy intermediário em relação ao que o servidor de origem enviou.",
    "Isso pode acontecer, por exemplo, quando um proxy adiciona metadados, comprime ou transforma a resposta. Na prática ele é pouco usado, e quem recebe deve tratá-lo como um 200 OK, ciente de que o conteúdo pode não ser idêntico ao original.",
  ],
  204: [
    "O código 204 No Content indica que a requisição deu certo, mas o servidor não tem nenhum conteúdo para enviar no corpo da resposta.",
    "É muito usado em DELETE e em PUT/PATCH quando o cliente não precisa receber o recurso de volta. Os cabeçalhos podem ser úteis: se o recurso foi alterado, o navegador pode atualizar o cache com eles. Em formulários, o 204 faz o navegador permanecer na mesma página.",
  ],
  205: [
    "O código 205 Reset Content indica que a requisição deu certo e que o cliente deve redefinir a visualização do documento que originou a requisição, sem navegar para outro lugar.",
    "O exemplo clássico é um formulário: depois de enviar os dados, os campos são limpos para uma nova entrada. Como a resposta não pode ter corpo, o 205 é bem raro e muitas aplicações fazem isso por conta própria no código do cliente.",
  ],
  206: [
    "O código 206 Partial Content indica que a requisição deu certo e que o corpo traz apenas o intervalo de bytes pedido pelo cliente no cabeçalho Range.",
    "É a base de recursos como retomar um download interrompido, pular para um trecho de um vídeo sem baixar o arquivo inteiro e dividir um arquivo grande em partes baixadas em paralelo. A resposta inclui o cabeçalho Content-Range, que informa qual trecho está sendo enviado e o tamanho total do recurso.",
  ],
  207: [
    "O código 207 Multi-Status, da extensão WebDAV, indica que o corpo da resposta (em XML) contém vários status independentes, um para cada operação que a requisição englobava.",
    "Ele é usado, por exemplo, quando uma única requisição tenta mexer em vários arquivos e alguns deram certo e outros não. É preciso ler o corpo para descobrir o resultado de cada item.",
  ],
  208: [
    "O código 208 Already Reported, da extensão WebDAV, aparece dentro de uma resposta 207 Multi-Status. Ele indica que os membros de uma coleção já foram listados em uma parte anterior da mesma resposta e não serão repetidos.",
    "Isso evita listar o mesmo recurso várias vezes e previne laços infinitos quando uma coleção contém a si mesma por meio de links diretos.",
  ],
  226: [
    "O código 226 IM Used indica que o servidor atendeu a uma requisição GET e que a resposta é o resultado de uma ou mais manipulações de instância (instance manipulations) aplicadas ao recurso atual, como descrito no RFC 3229.",
    "O uso típico é o delta encoding: em vez de reenviar o recurso inteiro, o servidor manda só as diferenças em relação à versão que o cliente já tem. É um código muito raro na web atual.",
  ],
  300: [
    "O código 300 Multiple Choices indica que a requisição tem mais de uma resposta possível, por exemplo o mesmo documento em vários formatos ou idiomas, e que o cliente (ou o usuário) precisa escolher uma delas.",
    "Não existe um padrão sobre como a escolha é apresentada. Se o servidor tiver uma opção preferida, ele pode indicá-la no cabeçalho Location. Na prática, esse código quase não é usado e a negociação de conteúdo costuma ser feita por cabeçalhos como Accept e Accept-Language.",
  ],
  301: [
    "O código 301 Moved Permanently indica que o recurso pedido foi movido de forma definitiva para a URL informada no cabeçalho Location. O navegador redireciona para ela automaticamente.",
    "Os buscadores transferem o ranking da URL antiga para a nova, o que torna o 301 a escolha certa para migrações de domínio e mudanças de estrutura de URLs. Atenção: clientes podem trocar o método POST por GET no redirecionamento. Se for importante manter o método, prefira o 308.",
    "Como navegadores guardam essa resposta em cache por bastante tempo, um 301 configurado errado é difícil de desfazer.",
  ],
  302: [
    "O código 302 Found indica que o recurso está temporariamente em outra URL, informada no cabeçalho Location. Como o redirecionamento pode mudar, o cliente deve continuar usando a URL original nas próximas requisições.",
    "Por razões históricas, muitos clientes trocam o método POST por GET ao seguir o redirecionamento. Quando for necessário manter o método original, use o 307; para forçar um GET depois de um POST, o 303 é o mais correto. Para buscadores, o 302 sinaliza que a URL antiga continua sendo a principal.",
  ],
  303: [
    "O código 303 See Other indica que o servidor está redirecionando o cliente para outra URL, que deve ser buscada com uma requisição GET, independentemente do método usado na requisição original.",
    "É a resposta típica para o padrão Post/Redirect/Get: depois de processar um formulário enviado por POST, o servidor redireciona o navegador para uma página de confirmação. Assim, atualizar a página não reenvia o formulário. O novo endereço não é equivalente ao recurso original, só uma resposta a ele.",
  ],
  304: [
    "O código 304 Not Modified indica que não é preciso reenviar o recurso, porque o cliente pode usar a cópia que já tem em cache. A resposta não possui corpo.",
    "Ele é a resposta a uma requisição condicional (cabeçalhos If-None-Match ou If-Modified-Since) quando o recurso não mudou desde a última versão que o cliente recebeu. Economiza banda e acelera o carregamento, e é a base da validação de cache com ETag e Last-Modified.",
  ],
  305: [
    "O código 305 Use Proxy indicava que o recurso pedido só podia ser acessado por meio de um proxy, cujo endereço vinha no cabeçalho Location.",
    "Ele está obsoleto e não deve ser usado: foi descontinuado por questões de segurança, já que um servidor poderia redirecionar o cliente para um proxy malicioso, e os navegadores atuais não o respeitam.",
  ],
  307: [
    "O código 307 Temporary Redirect indica que o recurso está temporariamente em outra URL, informada no cabeçalho Location, e que o cliente deve repetir a mesma requisição, com o mesmo método e o mesmo corpo, no novo endereço.",
    "É a diferença em relação ao 302, em que muitos clientes trocam POST por GET. Como o redirecionamento é temporário, continue usando a URL original nas próximas vezes. A versão permanente equivalente é o 308.",
  ],
  308: [
    "O código 308 Permanent Redirect indica que o recurso foi movido de forma definitiva para a URL do cabeçalho Location, e que o cliente deve repetir a requisição com o mesmo método e o mesmo corpo.",
    "Ele é o equivalente permanente do 307 e a alternativa ao 301 quando é importante não transformar um POST em GET. Os buscadores o tratam como o 301, transferindo o ranking para o novo endereço.",
  ],
  400: [
    "O código 400 Bad Request indica que o servidor não consegue (ou não quer) processar a requisição por algo que parece ser um erro do cliente: sintaxe inválida, cabeçalhos malformados, roteamento enganoso ou um corpo que não pode ser interpretado.",
    "Em APIs, aparece com frequência quando o JSON enviado está quebrado ou quando faltam parâmetros obrigatórios. Para erros de validação em dados bem formados, muitos serviços preferem o 422. O ideal é que a resposta traga no corpo uma mensagem explicando o que está errado.",
  ],
  401: [
    "O código 401 Unauthorized indica que a requisição não foi autenticada: faltam credenciais válidas para acessar o recurso. Apesar do nome (“não autorizado”), ele trata de autenticação, não de permissão.",
    "O servidor deve enviar o cabeçalho WWW-Authenticate informando como se autenticar. A solução costuma ser fazer login, enviar um token válido ou renovar um token expirado. Se o usuário está autenticado mas não pode acessar o recurso, o código correto é o 403.",
  ],
  402: [
    "O código 402 Payment Required foi reservado para uso futuro em sistemas de pagamento digital. Nunca chegou a ter um padrão definido.",
    "Na prática, alguns serviços o usam de forma própria para indicar que uma cobrança falhou, que a cota gratuita acabou ou que é preciso assinar um plano para acessar o recurso. O significado depende da documentação de cada API.",
  ],
  403: [
    "O código 403 Forbidden indica que o servidor entendeu a requisição, mas se recusa a atendê-la. Diferente do 401, repetir a requisição com as mesmas credenciais não resolve: a identidade do cliente é conhecida, mas ele não tem permissão para acessar o recurso.",
    "É comum em páginas restritas a certos perfis, em arquivos com permissão de leitura negada, em bloqueios por IP ou região e em regras de firewall. Alguns servidores respondem 404 no lugar do 403 para não revelar que o recurso existe.",
  ],
  404: [
    "O código 404 Not Found indica que o servidor não encontrou o recurso pedido. Na web, isso significa que a URL não é reconhecida: pode ser um link quebrado, uma página removida ou um endereço digitado errado.",
    "Em APIs, o 404 também pode indicar que a rota existe mas o registro procurado não existe (por exemplo, um usuário com um ID inexistente). Por motivos de segurança, alguns servidores o usam no lugar do 403 para esconder a existência de um recurso.",
    "É o código de erro mais famoso da internet. Para um recurso que existiu e foi removido de vez, o 410 é mais preciso, e uma boa página 404 ajuda o visitante a encontrar o que procurava.",
  ],
  405: [
    "O código 405 Method Not Allowed indica que o servidor conhece o recurso, mas o método HTTP usado (GET, POST, PUT, DELETE…) não é aceito para ele.",
    "A resposta deve incluir o cabeçalho Allow com a lista de métodos permitidos. É comum ao tentar fazer um POST em uma rota que só aceita GET, ou apagar um recurso protegido contra remoção.",
  ],
  406: [
    "O código 406 Not Acceptable indica que o servidor não consegue produzir uma resposta compatível com os valores enviados nos cabeçalhos de negociação de conteúdo da requisição, como Accept, Accept-Language ou Accept-Encoding.",
    "Por exemplo, o cliente pede só XML e o servidor só sabe responder JSON. Na prática, muitos servidores preferem ignorar a negociação e responder em um formato padrão, e esse código é pouco visto hoje.",
  ],
  407: [
    "O código 407 Proxy Authentication Required é parecido com o 401, mas indica que a autenticação necessária é a de um proxy que está entre o cliente e o servidor.",
    "O proxy deve enviar o cabeçalho Proxy-Authenticate informando como se autenticar, e o cliente responde com o cabeçalho Proxy-Authorization. É comum em redes corporativas que exigem login para acessar a internet.",
  ],
  408: [
    "O código 408 Request Timeout indica que o servidor desistiu de esperar: a requisição completa não chegou dentro do tempo que ele estava disposto a aguardar.",
    "É enviado, em geral, em conexões ociosas, e costuma vir com o cabeçalho Connection: close. Se o cliente ainda quiser a resposta, pode repetir a requisição em uma nova conexão. Aparece mais em conexões lentas ou instáveis e em servidores com tempos limites curtos.",
  ],
  409: [
    "O código 409 Conflict indica que a requisição não pôde ser concluída porque conflita com o estado atual do recurso no servidor.",
    "Os exemplos mais comuns são editar um recurso que foi alterado por outra pessoa no meio tempo (conflito de versão), criar um registro com um valor que precisa ser único e já existe (como um e-mail repetido) e fazer upload de um arquivo mais antigo do que o que já está lá. A resposta deve explicar o conflito para que o cliente consiga resolvê-lo.",
  ],
  410: [
    "O código 410 Gone indica que o recurso existia nesse endereço, mas foi removido de forma permanente e intencional, e que não há um novo endereço.",
    "Diferente do 404, que não diz se a ausência é temporária ou definitiva, o 410 deixa claro que o recurso não volta. Para buscadores, ele acelera a remoção da página do índice. Na prática, muitos sites usam o 404 mesmo nesses casos.",
  ],
  411: [
    "O código 411 Length Required indica que o servidor se recusa a processar a requisição porque ela não tem o cabeçalho Content-Length, que ele exige.",
    "Isso é mais comum em requisições com corpo (como POST e PUT) enviadas em streaming, sem tamanho definido. Para resolver, o cliente deve incluir o cabeçalho com o tamanho do corpo em bytes.",
  ],
  412: [
    "O código 412 Precondition Failed indica que uma condição presente nos cabeçalhos da requisição, como If-Match, If-Unmodified-Since ou If-None-Match, foi avaliada pelo servidor e deu falso.",
    "É usado para evitar a perda de alterações: o cliente só pode alterar o recurso se ele ainda estiver na versão que viu antes (identificada por um ETag). Se outra pessoa mexeu primeiro, o servidor recusa a alteração com esse código.",
  ],
  413: [
    "O código 413 Content Too Large (antes chamado Payload Too Large) indica que o corpo da requisição é maior do que o limite que o servidor aceita ou está disposto a processar.",
    "É o erro clássico de enviar um arquivo grande demais em um upload. O servidor pode fechar a conexão ou enviar o cabeçalho Retry-After se o limite for temporário. Em muitos casos, o limite é configurado no servidor web ou no proxy, e não na aplicação.",
  ],
  414: [
    "O código 414 URI Too Long indica que a URL pedida é maior do que o servidor está disposto a interpretar.",
    "Costuma acontecer quando dados demais são enviados na query string (por exemplo, um formulário que usa GET em vez de POST), quando um redirecionamento entra em laço e vai aumentando a URL, ou em tentativas de ataque. A solução é enviar os dados no corpo da requisição.",
  ],
  415: [
    "O código 415 Unsupported Media Type indica que o servidor se recusa a atender a requisição porque o formato do corpo (informado em Content-Type ou Content-Encoding) não é aceito para esse recurso.",
    "Um caso comum é enviar dados como texto simples para uma API que só aceita application/json, ou um arquivo de um tipo que o servidor não processa. Vale conferir o cabeçalho Content-Type da requisição e a documentação da API.",
  ],
  416: [
    "O código 416 Range Not Satisfiable indica que o intervalo pedido no cabeçalho Range não pode ser atendido, geralmente porque está fora do tamanho do recurso.",
    "A resposta traz o cabeçalho Content-Range com o tamanho real do recurso, para o cliente ajustar o pedido. Aparece, por exemplo, ao tentar retomar um download de um arquivo que foi substituído por uma versão menor.",
  ],
  417: [
    "O código 417 Expectation Failed indica que o servidor não consegue cumprir a expectativa informada no cabeçalho Expect da requisição.",
    "O caso mais conhecido é o Expect: 100-continue, que alguns servidores ou proxies não suportam. Quando isso acontece, o cliente pode repetir a requisição sem o cabeçalho Expect. Também pode ser retornado por um proxy que sabe que o servidor de destino não suporta a expectativa.",
  ],
  418: [
    "O código 418 I'm a teapot é uma piada. Ele surgiu no RFC 2324, o Hyper Text Coffee Pot Control Protocol, publicado como brincadeira de 1º de abril de 1998. Segundo a especificação, um bule de chá que recebe um pedido para fazer café deve responder com esse código.",
    "O código nunca foi pensado para ser usado de verdade, mas ganhou vida própria: em 2017, tentaram removê-lo de bibliotecas e a comunidade se mobilizou para que ele fosse mantido. Hoje alguns servidores o usam de brincadeira, ou para recusar requisições de bots indesejados.",
  ],
  421: [
    "O código 421 Misdirected Request indica que a requisição foi enviada a um servidor que não é capaz de produzir uma resposta para a combinação de esquema e domínio (host) pedida.",
    "Pode ocorrer em HTTP/2 quando o navegador reutiliza uma conexão para um domínio diferente (conexão coalescida) e o servidor não atende àquele domínio. Em geral, o cliente pode tentar de novo em uma conexão nova.",
  ],
  422: [
    "O código 422 Unprocessable Content (antes Unprocessable Entity) indica que o servidor entendeu o tipo de conteúdo e que a sintaxe da requisição está correta, mas não conseguiu processar as instruções por erros de significado, como dados inválidos.",
    "É muito usado em APIs para falhas de validação: o JSON está bem formado, mas o e-mail é inválido, um campo obrigatório está vazio ou uma data está no passado. Ele diferencia esses casos do 400, que é reservado para requisições malformadas.",
  ],
  423: [
    "O código 423 Locked, da extensão WebDAV, indica que o recurso de origem ou de destino da operação está bloqueado e não pode ser acessado ou alterado agora.",
    "Em sistemas de edição colaborativa de arquivos, isso acontece quando outra pessoa fez check-out do arquivo e o mantém travado até terminar.",
  ],
  424: [
    "O código 424 Failed Dependency, da extensão WebDAV, indica que o método não pôde ser executado no recurso porque a ação pedida dependia de outra ação, e essa outra ação falhou.",
    "Por exemplo, em uma requisição PROPPATCH que altera várias propriedades de uma vez, se uma delas falha, as demais respondem com 424 e nenhuma é aplicada. Costuma vir dentro de uma resposta 207 Multi-Status.",
  ],
  425: [
    "O código 425 Too Early indica que o servidor não quer processar uma requisição que talvez possa ser repetida por um atacante.",
    "Ele está ligado ao envio de dados em 0-RTT do TLS 1.3 (early data): como esses dados podem ser reenviados por terceiros (replay), o servidor prefere recusar e pedir que o cliente repita a requisição depois que o handshake terminar.",
  ],
  426: [
    "O código 426 Upgrade Required indica que o servidor se recusa a atender a requisição no protocolo atual, mas poderá atendê-la se o cliente mudar para outro protocolo.",
    "O servidor deve enviar o cabeçalho Upgrade com os protocolos aceitos (por exemplo, TLS/1.3) e o cabeçalho Connection: Upgrade. É a forma de exigir que o cliente migre para uma versão mais nova ou mais segura.",
  ],
  428: [
    "O código 428 Precondition Required indica que o servidor exige que a requisição seja condicional, ou seja, que contenha cabeçalhos como If-Match.",
    "Serve para evitar o problema da “atualização perdida”: quando um cliente lê um recurso, o altera e envia de volta sem saber que outra pessoa o modificou nesse meio tempo, sobrescrevendo as alterações dela. Com a precondição, o servidor só aceita a alteração se o recurso ainda estiver igual ao que o cliente viu.",
  ],
  429: [
    "O código 429 Too Many Requests indica que o cliente enviou requisições demais em um determinado intervalo de tempo. É a resposta do limitador de taxa (rate limiting).",
    "A resposta pode incluir o cabeçalho Retry-After informando quanto tempo esperar antes de tentar de novo. É muito comum em APIs públicas e serve para proteger o servidor contra sobrecarga, abuso e ataques de força bruta. A solução é diminuir a frequência das requisições, usar cache ou tentar de novo com espera crescente (backoff).",
  ],
  431: [
    "O código 431 Request Header Fields Too Large indica que o servidor não quer processar a requisição porque os cabeçalhos, ou um deles em particular, são grandes demais.",
    "Uma causa muito comum é o acúmulo de cookies em um mesmo domínio, que infla o cabeçalho Cookie. Limpar os cookies do site costuma resolver. O cliente pode repetir a requisição depois de reduzir o tamanho dos cabeçalhos.",
  ],
  451: [
    "O código 451 Unavailable For Legal Reasons indica que o servidor não pode fornecer o recurso por uma exigência legal, como uma decisão judicial, uma lei de censura ou uma notificação de direitos autorais.",
    "O número faz referência ao livro Fahrenheit 451, de Ray Bradbury, sobre uma sociedade que queima livros. A resposta deve explicar, no corpo, qual a restrição e, se possível, quem a impôs.",
  ],
  500: [
    "O código 500 Internal Server Error indica que o servidor encontrou uma situação inesperada que o impediu de atender a requisição. É uma resposta genérica, usada quando nenhum outro código de erro do servidor se encaixa.",
    "Costuma ser causado por um bug no código da aplicação, uma exceção não tratada, uma falha na conexão com o banco de dados ou um erro de configuração. Para o visitante, normalmente não há o que fazer além de tentar de novo mais tarde. Para quem desenvolve, o próximo passo é olhar os logs do servidor.",
  ],
  501: [
    "O código 501 Not Implemented indica que o servidor não suporta a funcionalidade necessária para atender a requisição, como quando ele não reconhece o método HTTP usado.",
    "É diferente do 405: no 405 o servidor conhece o método, mas não o permite para aquele recurso, e no 501 ele nem sabe lidar com o método. Também pode indicar que o recurso ainda não foi desenvolvido.",
  ],
  502: [
    "O código 502 Bad Gateway indica que um servidor que estava agindo como gateway ou proxy recebeu uma resposta inválida de outro servidor, o de origem, ao qual encaminhou a requisição.",
    "É comum em arquiteturas com balanceadores de carga e proxies reversos (como Nginx e Cloudflare), quando a aplicação por trás caiu, reiniciou ou respondeu algo ilegível. Em geral o problema não está no cliente e tentar de novo depois de alguns instantes pode funcionar.",
  ],
  503: [
    "O código 503 Service Unavailable indica que o servidor não está pronto para atender a requisição agora, geralmente por estar em manutenção ou sobrecarregado.",
    "A situação é temporária. O servidor pode enviar o cabeçalho Retry-After informando quando tentar de novo. Para buscadores, um 503 durante uma manutenção programada é o jeito certo de avisar que a página vai voltar, sem prejudicar o ranking.",
  ],
  504: [
    "O código 504 Gateway Timeout indica que um servidor que agia como gateway ou proxy não recebeu a resposta do servidor de origem a tempo.",
    "Diferente do 502, em que a resposta chegou inválida, aqui ela não chegou dentro do limite de tempo. As causas típicas são uma aplicação lenta demais (uma consulta pesada no banco de dados, por exemplo), um servidor travado ou um problema de rede entre o proxy e a origem.",
  ],
  505: [
    "O código 505 HTTP Version Not Supported indica que o servidor não suporta a versão do protocolo HTTP usada na requisição ou se recusa a usá-la.",
    "O servidor deve informar, na resposta, quais versões ele aceita. Hoje é um erro raro, porque as versões em uso (HTTP/1.1, HTTP/2 e HTTP/3) são amplamente suportadas.",
  ],
  506: [
    "O código 506 Variant Also Negotiates indica um erro de configuração no servidor: a variante escolhida durante a negociação de conteúdo transparente está configurada para também negociar, e isso cria uma referência circular.",
    "É descrito no RFC 2295 e é praticamente inexistente na web de hoje. Aparece quando o servidor está mal configurado e não consegue decidir qual versão do recurso entregar.",
  ],
  507: [
    "O código 507 Insufficient Storage, da extensão WebDAV, indica que o servidor não consegue guardar a representação necessária para concluir a requisição, por falta de espaço de armazenamento.",
    "É comum em serviços de arquivos quando o disco ou a cota do usuário está cheia. Se o problema for a cota, liberar espaço ou ampliar o limite resolve. Se for o disco do servidor, é preciso que a equipe responsável aja.",
  ],
  508: [
    "O código 508 Loop Detected, da extensão WebDAV, indica que o servidor encerrou a operação porque encontrou um laço infinito ao processar a requisição.",
    "Acontece, por exemplo, quando uma coleção contém ela mesma por meio de links e o servidor tenta percorrê-la com profundidade infinita. Em uma resposta 207 Multi-Status, essa condição aparece como um status 508 em um dos itens.",
  ],
  510: [
    "O código 510 Not Extended indica que o servidor precisa de extensões adicionais na requisição, conforme o RFC 2774 (HTTP Extension Framework), para poder atendê-la.",
    "A resposta deve descrever quais extensões são necessárias para que o cliente possa tentar de novo. É um código raríssimo, e o framework de extensões praticamente não foi adotado.",
  ],
  511: [
    "O código 511 Network Authentication Required indica que o cliente precisa se autenticar para ganhar acesso à rede, e não ao servidor que ele tentou acessar.",
    "É enviado por proxies interceptadores, como os dos portais cativos de Wi-Fi em aeroportos, hotéis e cafés, que mostram uma página de login antes de liberar a internet. A resposta traz um link para essa página de autenticação.",
  ],
};
