// Texto de apoio de cada ferramenta (explicação, passo a passo e perguntas
// frequentes). Alimenta o bloco visível em cada página e o JSON-LD de FAQ, então
// o que está aqui precisa continuar verdadeiro em relação ao código da ferramenta.
// Chave = slug em lib/tools.ts.

export type ToolContent = {
  about: string;
  steps: string[];
  faq: { question: string; answer: string }[];
};

const FICTIONAL_DOC_FAQ = {
  question: "Posso usar esse número para me cadastrar em sites?",
  answer:
    "Não. Os números servem apenas para testar formulários e sistemas em ambiente de desenvolvimento ou QA. Usá-los para burlar cadastros ou cometer fraude não é permitido.",
};

export const TOOL_CONTENT: Record<string, ToolContent> = {
  "email-temporario": {
    about:
      "Um e-mail temporário (ou descartável) é um endereço que você usa para se cadastrar em sites sem expor o seu e-mail de verdade. Aqui você cria o endereço em segundos, recebe as mensagens na própria página e tudo é apagado automaticamente depois de 1 hora.",
    steps: [
      "Escolha um nome para o endereço ou clique em sortear um.",
      "Use o endereço no cadastro ou formulário que você precisar.",
      "Abra a caixa de entrada para ler as mensagens que chegarem.",
    ],
    faq: [
      {
        question: "Quanto tempo o e-mail temporário dura?",
        answer:
          "O endereço e as mensagens duram 1 hora. Depois disso tudo é apagado automaticamente e não dá para recuperar.",
      },
      {
        question: "Preciso criar uma conta?",
        answer: "Não. Não há cadastro, senha nem dados pessoais.",
      },
      {
        question: "Dá para enviar e-mails por aqui?",
        answer: "Não. O serviço só recebe mensagens.",
      },
      {
        question: "Posso usar para contas importantes, como banco?",
        answer:
          "Não é recomendado. O endereço expira e não tem senha, então quem souber o endereço pode ler as mensagens que chegarem nele. Use só para cadastros e testes descartáveis.",
      },
    ],
  },
  "gerador-de-cpf": {
    about:
      "O CPF tem 11 dígitos, e os dois últimos são verificadores, calculados a partir dos nove primeiros (módulo 11). Este gerador cria números com dígitos verificadores válidos, úteis para testar formulários e validações. Eles não correspondem a pessoas reais.",
    steps: [
      "Clique em “Gerar novos” para criar um CPF.",
      "Marque ou desmarque “Formatado” para incluir ou não pontos e traço.",
      "Clique no número para copiá-lo.",
    ],
    faq: [
      {
        question: "O CPF gerado pertence a uma pessoa real?",
        answer:
          "Não, ele é aleatório. Como a conta dos dígitos verificadores é pública, um número gerado pode coincidir por acaso com um CPF real, e por isso só deve ser usado em testes.",
      },
      FICTIONAL_DOC_FAQ,
      {
        question: "Como o dígito verificador é calculado?",
        answer:
          "Cada um dos nove primeiros dígitos é multiplicado por um peso decrescente, a soma é dividida por 11 e o resto define o primeiro verificador. O segundo repete a conta incluindo o primeiro.",
      },
    ],
  },
  "gerador-de-cnpj": {
    about:
      "O CNPJ tem 14 dígitos: oito da raiz, quatro da filial (0001 para a matriz) e dois verificadores. Este gerador cria CNPJs com verificadores válidos para testar cadastros de empresas. Eles não pertencem a empresas reais.",
    steps: [
      "Clique em “Gerar novos” para criar um CNPJ.",
      "Marque ou desmarque “Formatado” para incluir ou não pontos, barra e traço.",
      "Clique no número para copiá-lo.",
    ],
    faq: [
      {
        question: "O CNPJ gerado é de uma empresa real?",
        answer:
          "Não, ele é aleatório e sempre usa a filial 0001. Por coincidência pode bater com um CNPJ existente, por isso use apenas em testes.",
      },
      FICTIONAL_DOC_FAQ,
    ],
  },
  "gerador-de-rg": {
    about:
      "O RG não tem um dígito verificador padronizado no país, porque cada estado emite o seu. Este gerador usa o modelo do IFP-SP, o mais comum em validações: 8 dígitos mais um dígito verificador (ou “X”).",
    steps: [
      "Clique em “Gerar novos” para criar um RG.",
      "Marque ou desmarque “Formatado” para incluir ou não pontos e traço.",
      "Clique no número para copiá-lo.",
    ],
    faq: [
      {
        question: "Esse RG vale para todos os estados?",
        answer:
          "Não. Ele segue o modelo de São Paulo; sistemas que validam o RG de outro estado podem rejeitá-lo.",
      },
      FICTIONAL_DOC_FAQ,
    ],
  },
  "validador-de-cpf-cnpj": {
    about:
      "O validador confere se os dígitos verificadores de um CPF (11 dígitos) ou CNPJ (14 dígitos) batem com a conta oficial. Ele aceita o número com ou sem pontos, traço e barra, e descobre sozinho se é CPF ou CNPJ pela quantidade de dígitos.",
    steps: [
      "Digite ou cole o CPF ou CNPJ, com ou sem formatação.",
      "Veja na hora se os dígitos verificadores estão corretos.",
    ],
    faq: [
      {
        question: "Um CPF válido aqui significa que ele existe?",
        answer:
          "Não. A ferramenta só confere os dígitos verificadores. Ela não consulta a Receita Federal e não diz se o documento foi emitido ou a quem pertence.",
      },
      {
        question: "Por que 111.111.111-11 aparece como inválido?",
        answer:
          "Sequências de um mesmo dígito passam na conta matemática, mas não são emitidas pela Receita, então são rejeitadas.",
      },
      {
        question: "Os números que eu digito são enviados para algum servidor?",
        answer: "Não. A validação acontece inteira no seu navegador.",
      },
    ],
  },
  "gerador-de-pessoa": {
    about:
      "Gera uma pessoa fictícia completa — nome, CPF, e-mail, telefone, data de nascimento e endereço — para popular formulários, bancos de teste e protótipos. Os dados são aleatórios e o e-mail usa o domínio reservado example.com.",
    steps: [
      "Clique em “Gerar outra” para criar uma nova pessoa.",
      "Clique em qualquer campo para copiar só aquele valor.",
    ],
    faq: [
      {
        question: "Os dados são de pessoas reais?",
        answer:
          "Não. Nome, endereço e telefone são combinações aleatórias. O CPF tem dígitos verificadores válidos, mas não pertence a ninguém.",
      },
      {
        question: "O endereço existe?",
        answer:
          "Não necessariamente. A cidade, a UF, o DDD e o início do CEP são coerentes entre si, mas a rua e o número são sorteados.",
      },
      FICTIONAL_DOC_FAQ,
    ],
  },
  "gerador-de-cartao-de-credito": {
    about:
      "Gera números de cartão (Visa, Mastercard, Amex e Elo) que passam no algoritmo de Luhn, a conta que formulários e gateways usam para detectar erros de digitação. São úteis para testar máscaras e validações de pagamento, mas não são cartões reais.",
    steps: [
      "Escolha a bandeira.",
      "Clique em “Gerar outro” para criar novos dados.",
      "Clique em número, validade ou CVV para copiar.",
    ],
    faq: [
      {
        question: "Esses cartões funcionam em compras?",
        answer:
          "Não. Eles só passam na verificação de Luhn. Não têm conta, limite nem autorização por trás.",
      },
      {
        question: "Posso testar um gateway de pagamento com eles?",
        answer:
          "Para a validação do formulário sim, mas para simular uma cobrança use os cartões de teste oficiais do próprio gateway, que são os únicos que o sandbox aceita.",
      },
      {
        question: "O que é o algoritmo de Luhn?",
        answer:
          "É uma soma de verificação: a partir da direita, dobra-se um dígito sim, outro não, soma-se tudo e o total precisa ser múltiplo de 10. Detecta a maioria dos erros de digitação.",
      },
    ],
  },
  "gerador-de-senha": {
    about:
      "Cria senhas aleatórias com o tamanho e os tipos de caracteres que você escolher. A geração usa o gerador criptográfico do navegador (crypto.getRandomValues) e acontece inteira no seu dispositivo: a senha não é enviada nem guardada.",
    steps: [
      "Ajuste o tamanho no controle deslizante.",
      "Marque os tipos de caracteres: minúsculas, maiúsculas, números e símbolos.",
      "Clique em “Gerar nova” e depois na senha para copiá-la.",
    ],
    faq: [
      {
        question: "Qual o tamanho ideal para uma senha?",
        answer:
          "Quanto maior, melhor. Para contas importantes, 16 caracteres ou mais, misturando os quatro tipos, e sempre uma senha diferente para cada serviço.",
      },
      {
        question: "A senha é guardada em algum lugar?",
        answer:
          "Não. Ela só existe nesta página até você gerar outra ou fechar a aba.",
      },
      {
        question: "Por que alguns sites rejeitam os símbolos?",
        answer:
          "Alguns serviços aceitam só um conjunto limitado de símbolos. Nesse caso desmarque “símbolos” e aumente o tamanho para compensar.",
      },
    ],
  },
  "formatador-json": {
    about:
      "Cole um JSON e receba de volta o texto indentado e legível, ou a mensagem de erro que mostra por que ele é inválido. O processamento é local: o conteúdo não sai do seu navegador.",
    steps: [
      "Cole o JSON na caixa de texto.",
      "Clique em “Formatar”.",
      "Copie o resultado ou leia a mensagem de erro, se houver.",
    ],
    faq: [
      {
        question: "Por que meu JSON dá erro?",
        answer:
          "Os motivos mais comuns são aspas simples no lugar de aspas duplas, vírgula sobrando depois do último item, chaves sem aspas e comentários, que o JSON não permite.",
      },
      {
        question: "Meus dados são enviados para algum servidor?",
        answer: "Não. O JSON é validado e formatado no seu navegador.",
      },
    ],
  },
  "decodificador-jwt": {
    about:
      "Um JWT (JSON Web Token) tem três partes separadas por ponto: header, payload e assinatura. As duas primeiras são apenas JSON codificado em Base64URL. Cole o token para ver o conteúdo e a data de expiração.",
    steps: [
      "Cole o token JWT completo na caixa de texto.",
      "Clique em “Decodificar”.",
      "Confira o header, o payload e se o token já expirou.",
    ],
    faq: [
      {
        question: "Esta ferramenta verifica a assinatura do token?",
        answer:
          "Não. Ela só decodifica o conteúdo. Para validar a assinatura é preciso a chave do emissor, no seu backend.",
      },
      {
        question: "O payload de um JWT é secreto?",
        answer:
          "Não. Ele é só codificado, não criptografado, e qualquer pessoa com o token consegue lê-lo. Por isso não se coloca informação sensível no payload.",
      },
      {
        question: "O token é enviado para algum servidor?",
        answer: "Não. A decodificação acontece no seu navegador.",
      },
    ],
  },
  "gerador-de-uuid": {
    about:
      "Um UUID v4 é um identificador de 128 bits gerado de forma aleatória, muito usado como chave primária e identificador de recursos. Aqui eles são criados no navegador com crypto.randomUUID().",
    steps: [
      "Escolha quantos UUIDs quer gerar.",
      "Clique em “Gerar novos”.",
      "Clique em um UUID para copiá-lo.",
    ],
    faq: [
      {
        question: "Dois UUIDs v4 podem ser iguais?",
        answer:
          "Em teoria sim, na prática a chance é tão pequena que pode ser ignorada: são 122 bits aleatórios.",
      },
      {
        question: "Qual a diferença entre UUID e GUID?",
        answer:
          "É o mesmo formato. GUID é o nome usado no ecossistema Microsoft.",
      },
    ],
  },
  base64: {
    about:
      "Base64 representa dados binários usando apenas letras, números e alguns símbolos, o que facilita enviar conteúdo por e-mail, URLs e APIs. Esta ferramenta codifica e decodifica texto em UTF-8, então acentos e emojis funcionam.",
    steps: [
      "Cole o texto ou o Base64 na caixa.",
      "Clique em “Codificar” ou “Decodificar”.",
      "Clique no resultado para copiá-lo.",
    ],
    faq: [
      {
        question: "Base64 é criptografia?",
        answer:
          "Não. É só uma codificação reversível por qualquer pessoa. Não use para esconder informação.",
      },
      {
        question: "Por que a decodificação dá erro?",
        answer:
          "O texto pode ter caracteres fora do alfabeto Base64 ou não representar um texto UTF-8 válido, como acontece com arquivos binários.",
      },
    ],
  },
  "conversor-de-timestamp": {
    about:
      "O timestamp Unix é o número de segundos desde 1º de janeiro de 1970 (UTC). Cole um valor para ver a data correspondente, ou escolha uma data para obter o timestamp. A ferramenta reconhece sozinha se o número está em segundos ou milissegundos.",
    steps: [
      "Cole o timestamp ou clique em “Agora”.",
      "Ou escolha uma data e hora no seletor.",
      "Copie o formato que precisar: segundos, milissegundos, ISO 8601, UTC ou horário local.",
    ],
    faq: [
      {
        question: "Como a ferramenta sabe se é segundos ou milissegundos?",
        answer:
          "Números abaixo de 100 bilhões são tratados como segundos (isso cobre datas até o ano 5138) e os maiores como milissegundos.",
      },
      {
        question: "Por que o Unix começa em 1970?",
        answer:
          "É uma convenção dos primeiros sistemas Unix, que escolheram essa data como ponto zero.",
      },
      {
        question: "Qual fuso horário é usado?",
        answer:
          "O timestamp em si é sempre UTC. O horário local e o seletor de data usam o fuso do seu navegador.",
      },
    ],
  },
  "gerador-de-hash": {
    about:
      "Um hash é uma “impressão digital” de tamanho fixo calculada a partir de um texto: o mesmo texto sempre gera o mesmo hash, e uma pequena mudança altera tudo. Aqui são calculados SHA-1, SHA-256, SHA-384 e SHA-512 pela Web Crypto API, direto no navegador.",
    steps: [
      "Digite ou cole o texto.",
      "Os quatro hashes são atualizados na hora.",
      "Clique em um hash para copiá-lo.",
    ],
    faq: [
      {
        question: "É possível reverter um hash para o texto original?",
        answer:
          "Não, a função é de mão única. Textos curtos ou comuns podem ser descobertos por tentativa e erro, mas o hash em si não pode ser “desfeito”.",
      },
      {
        question: "Posso usar SHA-256 para guardar senhas?",
        answer:
          "Não diretamente. Para senhas use algoritmos feitos para isso, como bcrypt, scrypt ou Argon2, que são lentos de propósito e usam salt.",
      },
      {
        question: "Por que não há MD5?",
        answer:
          "O navegador não oferece MD5 na Web Crypto API, e ele já não é considerado seguro. O SHA-1 também está obsoleto para segurança e é útil só para compatibilidade.",
      },
    ],
  },
  "gerador-de-qr-code": {
    about:
      "Crie um QR Code a partir de uma URL ou de qualquer texto e baixe a imagem em PNG. O código é gerado no seu navegador e o conteúdo não passa por nenhum servidor.",
    steps: [
      "Digite a URL ou o texto.",
      "Ajuste o tamanho da imagem.",
      "Clique em “Baixar PNG”.",
    ],
    faq: [
      {
        question: "O QR Code expira?",
        answer:
          "Não. Ele é estático: o conteúdo está dentro da própria imagem, então vale enquanto o destino (a URL, por exemplo) existir.",
      },
      {
        question: "Quanto texto cabe em um QR Code?",
        answer:
          "Depende do conteúdo, mas na casa de alguns milhares de caracteres. Quanto mais texto, mais denso e difícil de ler o código fica, então prefira URLs curtas.",
      },
    ],
  },
  "contador-de-caracteres": {
    about:
      "Conta caracteres (com e sem espaços), palavras e linhas de um texto e estima o tempo de leitura em cerca de 200 palavras por minuto. Útil para limites de posts, meta descriptions, SMS e redações.",
    steps: [
      "Digite ou cole o texto.",
      "Os números são atualizados enquanto você digita.",
    ],
    faq: [
      {
        question: "Emojis contam como um caractere?",
        answer:
          "Sim, aqui cada emoji conta como um caractere. Algumas plataformas contam de forma diferente, por exemplo contando bytes.",
      },
      {
        question: "Como as palavras são contadas?",
        answer:
          "Qualquer sequência de caracteres separada por espaço, tabulação ou quebra de linha conta como uma palavra.",
      },
    ],
  },
  "gerador-de-lorem-ipsum": {
    about:
      "Lorem Ipsum é um texto de preenchimento usado para mostrar como um layout fica com conteúdo antes de o texto final existir. Gere parágrafos, frases ou palavras e, se quiser, comece pela frase clássica “Lorem ipsum dolor sit amet”.",
    steps: [
      "Escolha entre parágrafos, frases ou palavras.",
      "Ajuste a quantidade.",
      "Clique em “Copiar”.",
    ],
    faq: [
      {
        question: "De onde vem o Lorem Ipsum?",
        answer:
          "É derivado de uma obra de Cícero, “De finibus bonorum et malorum”, de 45 a.C., com palavras embaralhadas para não ter sentido.",
      },
      {
        question: "Por que usar texto sem sentido em vez de texto real?",
        answer:
          "Para que quem avalia o layout olhe a forma e não se distraia lendo o conteúdo.",
      },
    ],
  },
};

export function getToolContent(slug: string): ToolContent | undefined {
  return TOOL_CONTENT[slug];
}
