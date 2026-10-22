export type ToolSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type ToolContent = {
  about: string;
  steps: string[];
  sections: ToolSection[];
  faq: { question: string; answer: string }[];
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
    sections: [
      {
        title: "Quando vale a pena usar um e-mail temporário",
        paragraphs: [
          "Muitos sites pedem um e-mail só para liberar um download, mostrar um preço, participar de um sorteio ou testar um aplicativo por alguns minutos. Entregar o seu endereço principal nesses casos costuma terminar em newsletter que você nunca pediu, listas de marketing vendidas para terceiros e, no pior caso, o seu e-mail aparecendo em vazamentos de dados.",
          "Um endereço descartável resolve isso: você recebe o código de confirmação ou o link de ativação, faz o que precisava e deixa o endereço expirar. Nada fica ligado à sua identidade.",
        ],
        list: [
          "Cadastros rápidos em sites e fóruns que você não pretende usar de novo.",
          "Baixar materiais, cupons ou amostras que exigem e-mail.",
          "Testar o fluxo de cadastro, confirmação e recuperação de senha do sistema que você está desenvolvendo.",
          "Conferir como um e-mail transacional do seu produto chega na caixa de entrada.",
          "Separar inscrições pontuais do seu e-mail pessoal ou de trabalho.",
        ],
      },
      {
        title: "Como o serviço funciona por dentro",
        paragraphs: [
          "Quando alguém envia uma mensagem para o seu endereço, ela passa pelo roteamento de e-mail da Cloudflare e é processada por um pequeno programa que separa remetente, assunto e corpo. A mensagem fica guardada em um armazenamento temporário com prazo de validade de 1 hora, e a página consulta esse armazenamento a cada 10 segundos para mostrar o que chegou.",
          "Mensagens em HTML são limpas antes de aparecer na tela: scripts e elementos perigosos são removidos, e o conteúdo é exibido isolado do restante do site. Depois que o prazo acaba, os dados são apagados automaticamente pela própria infraestrutura, sem cópia de segurança.",
        ],
      },
      {
        title: "Cuidados importantes",
        paragraphs: [
          "Um e-mail temporário é ótimo para o que é descartável, e ruim para o que é importante. Como não há senha, qualquer pessoa que digite o mesmo endereço consegue ver as mensagens que chegarem nele. Por isso, prefira os endereços sorteados, que são mais difíceis de adivinhar, e nunca use o serviço para banco, governo, trabalho ou qualquer conta que você precise recuperar no futuro.",
          "Também não é possível responder nem enviar mensagens: o serviço só recebe. E alguns sites bloqueiam domínios de e-mail temporário; nesse caso, o cadastro simplesmente não vai aceitar o endereço.",
        ],
      },
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
    sections: [
      {
        title: "Como um CPF é formado",
        paragraphs: [
          "O CPF (Cadastro de Pessoas Físicas) é escrito no formato 000.000.000-00. Os oito primeiros dígitos formam o número-base, o nono indica a região fiscal onde o documento foi emitido e os dois últimos são os dígitos verificadores, que servem para detectar erros de digitação.",
          "A região fiscal é um detalhe pouco conhecido, mas útil para entender os números:",
        ],
        list: [
          "1: DF, GO, MS, MT e TO",
          "2: AC, AM, AP, PA, RO e RR",
          "3: CE, MA e PI",
          "4: AL, PB, PE e RN",
          "5: BA e SE",
          "6: MG",
          "7: ES e RJ",
          "8: SP",
          "9: PR e SC",
          "0: RS",
        ],
      },
      {
        title: "O cálculo dos dígitos verificadores, passo a passo",
        paragraphs: [
          "Para o primeiro verificador, multiplique os nove primeiros dígitos pelos pesos 10, 9, 8, 7, 6, 5, 4, 3 e 2, nessa ordem, e some os resultados. Divida a soma por 11 e pegue o resto: se o resto for 0 ou 1, o dígito é 0; caso contrário, é 11 menos o resto.",
          "O segundo verificador repete a conta com os dez primeiros dígitos (agora incluindo o primeiro verificador) e os pesos de 11 a 2. É exatamente esse algoritmo que este gerador usa, e é o mesmo que a maioria dos formulários aplica para aceitar ou recusar um CPF.",
        ],
      },
      {
        title: "Por que usar CPF gerado em testes",
        paragraphs: [
          "Usar o CPF de uma pessoa real em ambiente de desenvolvimento é um risco: ele pode acabar em logs, prints de bug, bancos de homologação e planilhas compartilhadas, o que vai contra a LGPD. Um número gerado passa na validação do formulário sem expor ninguém.",
          "Para testes mais completos, vale gerar também casos inválidos de propósito, como trocar o último dígito ou usar uma sequência repetida, e confirmar que o sistema recusa esses valores. O validador de CPF e CNPJ deste site ajuda a conferir os dois lados.",
        ],
      },
      {
        title: "Casos de borda que todo teste de CPF deveria cobrir",
        paragraphs: [
          "Passar na conta do módulo 11 não basta para um CPF ser aceito. Sequências de um mesmo dígito repetido, como 111.111.111-11, satisfazem a matemática dos verificadores, mas são recusadas pela Receita e por praticamente todo validador sério. Este gerador nunca devolve números assim.",
          "Ao montar a suíte de testes de um formulário, vale combinar um CPF válido gerado aqui com casos de recusa de propósito:",
        ],
        list: [
          "CPF com 10 ou 12 dígitos, para checar o tamanho máximo do campo.",
          "Sequência repetida (000.000.000-00, 111.111.111-11…), que deve ser recusada.",
          "Último dígito alterado, para confirmar que o verificador é de fato conferido.",
          "CPF colado com pontos e traço e CPF colado só com números: os dois devem ser aceitos.",
          "CPF começando com zero, que se perde se o sistema o guardar como número inteiro.",
        ],
      },
    ],
    faq: [
      {
        question: "O CPF gerado pertence a uma pessoa real?",
        answer:
          "Não, ele é aleatório. Como a conta dos dígitos verificadores é pública, um número gerado pode coincidir por acaso com um CPF real, e por isso só deve ser usado em testes.",
      },
      {
        question: "Posso usar esse CPF para me cadastrar em um site de verdade?",
        answer:
          "Não. Ele serve para testar sistemas que você desenvolve ou tem autorização para testar. Usar um número gerado para driblar cadastros pode configurar fraude e viola os termos de quase todo serviço.",
      },
      {
        question: "Como o dígito verificador é calculado?",
        answer:
          "Cada um dos nove primeiros dígitos é multiplicado por um peso decrescente, a soma é dividida por 11 e o resto define o primeiro verificador. O segundo repete a conta incluindo o primeiro.",
      },
      {
        question: "Por que o gerador nunca devolve 111.111.111-11?",
        answer:
          "Porque sequências com todos os dígitos iguais passam no cálculo, mas não são CPFs válidos pelas regras da Receita. O gerador as descarta para que os números criados sejam aceitos por qualquer validador.",
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
    sections: [
      {
        title: "Entendendo as partes do CNPJ",
        paragraphs: [
          "O CNPJ (Cadastro Nacional da Pessoa Jurídica) é escrito como 00.000.000/0000-00. Os oito primeiros dígitos são a raiz e identificam a empresa. Os quatro seguintes, depois da barra, identificam o estabelecimento: 0001 costuma ser a matriz, e 0002, 0003 e assim por diante são filiais. Os dois últimos são os dígitos verificadores.",
          "Isso significa que todas as filiais de uma empresa compartilham a mesma raiz. Em sistemas que agrupam dados por empresa, comparar só os oito primeiros dígitos é uma prática comum.",
        ],
      },
      {
        title: "Como os verificadores são calculados",
        paragraphs: [
          "O cálculo também usa módulo 11, mas com pesos diferentes dos do CPF. Para o primeiro verificador, os doze primeiros dígitos são multiplicados por 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2. A soma é dividida por 11: se o resto for 0 ou 1, o dígito é 0; senão, é 11 menos o resto.",
          "O segundo verificador usa os treze primeiros dígitos e os pesos 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3 e 2. Um erro comum em implementações caseiras é reaproveitar os pesos do CPF, o que faz o sistema recusar CNPJs verdadeiros.",
        ],
      },
      {
        title: "E o CNPJ alfanumérico?",
        paragraphs: [
          "A Receita Federal definiu que novas inscrições passam a receber CNPJs com letras e números nas doze primeiras posições, mantendo os dois verificadores numéricos. Os CNPJs já existentes continuam iguais.",
          "Este gerador e o validador do site trabalham com o formato só de números, que ainda é o da imensa maioria das empresas. Se o seu sistema guarda CNPJ como número inteiro ou usa máscara só de dígitos, vale planejar a mudança para texto.",
        ],
      },
      {
        title: "Casos de borda ao testar campos de CNPJ",
        paragraphs: [
          "O gerador sempre cria CNPJs de matriz (final /0001). Para testar filiais, o ideal é gerar um número aqui e recalcular os verificadores com a nova ordem de estabelecimento, pois trocar só os quatro dígitos da filial invalida o CNPJ. O validador de CPF e CNPJ do site ajuda a conferir o resultado.",
          "Além do cálculo, alguns problemas aparecem com frequência em sistemas reais:",
        ],
        list: [
          "CNPJ que começa com zero e perde o zero à esquerda quando é guardado como número.",
          "Campo com máscara que só aceita 14 dígitos, mas recebe o valor colado com pontos, barra e traço.",
          "Comparação da empresa pela raiz (8 primeiros dígitos) para agrupar matriz e filiais.",
          "Validação que reaproveita os pesos do CPF e recusa CNPJs verdadeiros.",
          "Preparação para o CNPJ alfanumérico: o campo deve guardar texto, não número.",
        ],
      },
    ],
    faq: [
      {
        question: "O CNPJ gerado é de uma empresa real?",
        answer:
          "Não, ele é aleatório e sempre usa a filial 0001. Por coincidência pode bater com um CNPJ existente, por isso use apenas em testes.",
      },
      {
        question: "Posso usar esse CNPJ para abrir conta ou cadastro de empresa?",
        answer:
          "Não. Ele é fictício e só vale para testar formulários e sistemas sob o seu controle. Para operações reais é preciso o CNPJ de uma empresa registrada.",
      },
      {
        question: "Por que o CNPJ gerado sempre termina em /0001?",
        answer:
          "Porque o gerador cria a matriz da empresa. O número da filial entra no cálculo dos verificadores, então mudar esses quatro dígitos exige recalcular os dois últimos.",
      },
      {
        question: "Por que meu CNPJ perde o zero no começo?",
        answer:
          "Isso acontece quando o valor é tratado como número. CNPJ é um identificador, não uma quantidade: guarde sempre como texto para preservar os zeros à esquerda.",
      },
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
    sections: [
      {
        title: "Por que o RG é diferente do CPF",
        paragraphs: [
          "O CPF é emitido por um único órgão, a Receita Federal, com uma regra nacional. O RG tradicional, por outro lado, sempre foi emitido pelas secretarias de segurança de cada estado. Cada uma tem a sua numeração, a sua quantidade de dígitos e, em alguns casos, nenhum dígito verificador. Por isso não existe uma validação de RG que funcione para o Brasil inteiro.",
          "Na prática, muitos sistemas aceitam o RG como texto livre, ou validam apenas o formato de São Paulo, que é o mais difundido. É esse modelo que o gerador segue: oito dígitos mais um verificador, que pode ser um número ou a letra X.",
        ],
      },
      {
        title: "A nova Carteira de Identidade Nacional",
        paragraphs: [
          "Desde 2022 os estados vêm substituindo o RG pela Carteira de Identidade Nacional (CIN), que usa o próprio número do CPF como identificador único. Com isso, a tendência é que o número do RG perca importância em cadastros novos.",
          "Mesmo assim, milhões de pessoas ainda usam o RG antigo, e muitos formulários continuam pedindo esse campo. Testar com um número gerado ajuda a conferir máscaras, tamanho máximo do campo e o tratamento do “X” no final.",
        ],
      },
      {
        title: "Dicas para testar campos de RG",
        paragraphs: [],
        list: [
          "Confirme que o campo aceita a letra X no último dígito; muitos formulários bloqueiam letras e recusam RGs reais.",
          "Teste o número com e sem pontos e traço para ver se o sistema normaliza o valor antes de salvar.",
          "Se o sistema atende vários estados, evite exigir o formato paulista para todo mundo.",
        ],
      },
      {
        title: "Exemplo do cálculo usado por este gerador",
        paragraphs: [
          "O gerador usa 8 dígitos e calcula o último multiplicando cada um por um peso de 2 a 9, da esquerda para a direita. Para a base 12345678, a conta é 1×2 + 2×3 + 3×4 + 4×5 + 5×6 + 6×7 + 7×8 + 8×9 = 240. Dividindo 240 por 11, o resto é 9, então o RG fica 123456789.",
          "Quando o resto da divisão é 10, não cabe em um único dígito e o verificador vira a letra X. Por isso o campo de RG precisa aceitar letra no último caractere. Lembre que essa regra segue o modelo de São Paulo e não é um padrão nacional.",
        ],
      },
    ],
    faq: [
      {
        question: "Esse RG vale para todos os estados?",
        answer:
          "Não. Ele segue o modelo de São Paulo; sistemas que validam o RG de outro estado podem rejeitá-lo.",
      },
      {
        question: "Posso usar esse RG como documento de identificação?",
        answer:
          "Não. É um número fictício, sem qualquer valor legal, criado só para testar máscaras, tamanhos de campo e validações.",
      },
      {
        question: "Por que o último dígito do RG pode ser X?",
        answer:
          "Porque o resto 10 da divisão por 11 não cabe em um dígito. Nesse caso o verificador é escrito como X, e formulários que só aceitam números acabam recusando RGs verdadeiros.",
      },
      {
        question: "Posso validar RG de qualquer estado com esse gerador?",
        answer:
          "Não. Cada estado tem sua numeração, e este gerador segue só o modelo paulista. Para outros estados, trate o RG como texto livre ou use a regra específica do órgão emissor.",
      },
    ],
  },
  "validador-de-cpf-cnpj": {
    about:
      "O validador confere se os dígitos verificadores de um CPF (11 dígitos) ou CNPJ (14 dígitos) batem com a conta oficial. Ele aceita o número com ou sem pontos, traço e barra, e descobre sozinho se é CPF ou CNPJ pela quantidade de dígitos.",
    steps: [
      "Digite ou cole o CPF ou CNPJ, com ou sem formatação.",
      "Veja na hora se os dígitos verificadores estão corretos.",
    ],
    sections: [
      {
        title: "O que a validação confere de verdade",
        paragraphs: [
          "Os dígitos verificadores existem para pegar erros de digitação: um número trocado ou dois dígitos invertidos quase sempre fazem a conta falhar. Quando o validador diz que um documento é válido, ele está dizendo que o número é matematicamente consistente, ou seja, que não houve erro de digitação.",
          "O que ele não diz é se o documento foi emitido, se está ativo ou a quem pertence. Para isso só uma consulta aos sistemas da Receita Federal, que exigem dados adicionais e autorização. Essa é a mesma limitação de qualquer validação feita em formulário.",
        ],
      },
      {
        title: "Quando usar o validador",
        paragraphs: [],
        list: [
          "Conferir rapidamente se você digitou um documento certo antes de enviar um cadastro.",
          "Descobrir se um CPF ou CNPJ de uma planilha ou base de dados está corrompido.",
          "Comparar com o resultado da validação do seu próprio sistema durante um teste ou investigação de bug.",
          "Verificar se um número gerado para teste está realmente com os verificadores corretos.",
        ],
      },
      {
        title: "Erros comuns ao validar CPF e CNPJ em sistemas",
        paragraphs: [
          "Guardar o documento como número inteiro faz zeros à esquerda desaparecerem: o CPF 012.345.678-90 vira 12345678090, com 10 dígitos, e passa a ser recusado. Guarde sempre como texto. Outro erro frequente é não remover a formatação antes da conta, ou removê-la de forma incompleta, deixando espaços ou barras no meio.",
          "Também vale lembrar das sequências repetidas, como 000.000.000-00, que passam na conta mas nunca são emitidas, e de deixar o sistema preparado para o CNPJ alfanumérico, que este validador ainda não cobre.",
        ],
      },
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
    sections: [
      {
        title: "Para que serve uma pessoa fictícia",
        paragraphs: [
          "Preencher um formulário de cadastro manualmente dezenas de vezes durante um teste é cansativo, e usar sempre os mesmos dados (“Teste da Silva”, “123”) esconde bugs. Uma pessoa gerada traz nomes com acentos, endereços de cidades diferentes e telefones com DDDs variados, o que aproxima o teste da vida real.",
          "Os dados também são úteis para montar protótipos e telas de demonstração com aparência realista, sem expor clientes de verdade em apresentações ou capturas de tela.",
        ],
      },
      {
        title: "Dados de teste e a LGPD",
        paragraphs: [
          "A Lei Geral de Proteção de Dados vale também para ambientes de desenvolvimento e homologação. Copiar a base de produção para testar, ou usar os dados de um colega, significa espalhar informação pessoal por lugares com menos proteção e mais gente com acesso.",
          "Gerar dados fictícios é a forma mais simples de evitar esse risco. O e-mail usa o domínio example.com, reservado justamente para exemplos, então nenhuma mensagem enviada por engano durante um teste chega a uma pessoa real.",
        ],
      },
      {
        title: "Ideias de testes com os dados gerados",
        paragraphs: [],
        list: [
          "Nomes longos e com acentos: o campo corta o texto ou quebra o layout?",
          "Endereços de estados diferentes: os combos de UF e cidade carregam corretamente?",
          "Telefones com DDDs variados: a máscara aceita celular com nove dígitos?",
          "Datas de nascimento: o sistema calcula a idade e respeita a idade mínima exigida?",
        ],
      },
      {
        title: "O que cada campo gerado contém",
        paragraphs: [
          "Cada pessoa é montada a partir de listas de nomes, sobrenomes, ruas e bairros brasileiros, combinados de forma aleatória. Os campos seguem estas regras:",
        ],
        list: [
          "Nome: um primeiro nome e dois sobrenomes comuns no Brasil, com acentos.",
          "CPF: com dígitos verificadores válidos e sem sequências repetidas.",
          "E-mail: nome.sobrenome mais dois dígitos, sempre no domínio reservado example.com.",
          "Telefone: celular com DDD e nove dígitos, coerente com a cidade sorteada.",
          "Nascimento: data que torna a pessoa maior de idade (entre 18 e 70 anos).",
          "Endereço: rua, número e bairro sorteados, com cidade, UF e início do CEP de uma entre 11 capitais.",
        ],
      },
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
      {
        question: "Posso usar esses dados em um cadastro de verdade?",
        answer:
          "Não. Eles servem para testes e protótipos. Usar dados fictícios para se passar por outra pessoa ou burlar um serviço não é permitido.",
      },
      {
        question: "As pessoas geradas são sempre maiores de idade?",
        answer:
          "Sim. A data de nascimento é sorteada para resultar em uma idade entre 18 e 70 anos, o que evita barrar o cadastro em sistemas com idade mínima.",
      },
      {
        question: "Por que o e-mail usa example.com?",
        answer:
          "Porque example.com é um domínio reservado para exemplos (RFC 2606) e não recebe mensagens de verdade. Assim, um teste que dispare e-mails por engano não chega a ninguém. Para receber mensagens de teste, use o e-mail temporário do site.",
      },
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
    sections: [
      {
        title: "Como identificar a bandeira pelo número",
        paragraphs: [
          "Os primeiros dígitos de um cartão formam o IIN (Issuer Identification Number), que indica a bandeira e o emissor. É assim que um formulário consegue mostrar o logotipo certo enquanto você digita. Os prefixos usados neste gerador são:",
        ],
        list: [
          "Visa: começa com 4 e tem 16 dígitos.",
          "Mastercard: começa com 51 a 55 e tem 16 dígitos.",
          "American Express: começa com 34 ou 37, tem 15 dígitos e CVV de 4 dígitos.",
          "Elo: usa faixas próprias, como 636368, 504175 e 438935, com 16 dígitos.",
        ],
      },
      {
        title: "O algoritmo de Luhn na prática",
        paragraphs: [
          "Pegue o número 4539 1488 0343 6467. Começando pelo último dígito e indo para a esquerda, mantenha o primeiro, dobre o segundo, mantenha o terceiro, dobre o quarto, e assim por diante. Quando o dobro passar de 9, subtraia 9 (8 × 2 = 16, que vira 7). Some todos os resultados: se o total terminar em zero, o número é válido.",
          "O algoritmo foi criado em 1954 por Hans Peter Luhn, da IBM, e não tem nada de segredo ou segurança. Ele só detecta erros de digitação, como um dígito errado ou dois dígitos vizinhos trocados. Por isso um número que passa no Luhn não é, de jeito nenhum, um cartão que funciona.",
        ],
      },
      {
        title: "O que testar em um formulário de pagamento",
        paragraphs: [],
        list: [
          "A máscara agrupa os dígitos certo para cada bandeira (o Amex usa 4-6-5).",
          "O campo de CVV aceita 4 dígitos quando a bandeira é Amex.",
          "A validade recusa datas passadas e meses inválidos.",
          "O número digitado errado é recusado antes de chegar ao gateway.",
          "Nenhum número de cartão aparece em logs, mesmo os de teste: é um bom hábito para quando os dados forem reais.",
        ],
      },
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
    sections: [
      {
        title: "O que torna uma senha forte",
        paragraphs: [
          "A força de uma senha vem principalmente de dois fatores: o tamanho e a variedade de caracteres possíveis em cada posição. Com só letras minúsculas, cada caractere tem 26 opções. Somando maiúsculas, números e os 18 símbolos deste gerador, passam a ser 80 opções por caractere.",
          "Isso cresce muito rápido. Uma senha de 8 caracteres com os quatro tipos tem cerca de 50 bits de entropia, algo que um computador dedicado pode quebrar por força bruta. Com 16 caracteres, passa de 100 bits, um número de combinações tão grande que tentar todas é inviável.",
        ],
      },
      {
        title: "Aleatoriedade de verdade importa",
        paragraphs: [
          "Senhas que parecem complicadas, como “P@nda2024!”, seguem padrões que qualquer ferramenta de quebra de senha conhece: palavra comum, letra trocada por símbolo, ano no final. Elas caem muito antes do que o tamanho sugere.",
          "Este gerador usa crypto.getRandomValues, a fonte de números aleatórios criptográficos do navegador, que é a mesma usada para gerar chaves de segurança. Não há padrão para adivinhar.",
        ],
      },
      {
        title: "Boas práticas para guardar e usar senhas",
        paragraphs: [],
        list: [
          "Use uma senha diferente para cada serviço. Quando um site vaza, as outras contas continuam seguras.",
          "Guarde as senhas em um gerenciador de senhas, em vez de em papéis, planilhas ou no bloco de notas.",
          "Ative a verificação em duas etapas sempre que o serviço oferecer.",
          "Troque a senha imediatamente se o serviço avisar que houve um vazamento.",
        ],
      },
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
    sections: [
      {
        title: "O que é JSON",
        paragraphs: [
          "JSON (JavaScript Object Notation) é o formato de texto mais usado para trocar dados entre sistemas, principalmente em APIs web. Apesar do nome, ele é independente de linguagem e é lido e escrito por praticamente qualquer uma, de Python a Java.",
          "O formato aceita poucos tipos de valor: textos entre aspas duplas, números, true, false, null, listas entre colchetes e objetos entre chaves, com pares de chave e valor. Essa simplicidade é justamente o que o torna tão popular, mas também o motivo de pequenos deslizes quebrarem o arquivo inteiro.",
        ],
      },
      {
        title: "Exemplo de JSON válido",
        paragraphs: [
          "{\"nome\": \"Panda\", \"idade\": 7, \"ativo\": true, \"tags\": [\"bambu\", \"soneca\"], \"endereco\": null}",
          "Repare que todas as chaves estão entre aspas duplas, que não há vírgula depois do último item e que true e null aparecem sem aspas, pois são valores do próprio formato e não textos.",
        ],
      },
      {
        title: "Quando formatar ajuda",
        paragraphs: [
          "Respostas de API e arquivos de log costumam vir minificados, tudo em uma linha, para economizar espaço. Formatar o texto com indentação torna a estrutura visível: fica fácil ver o que está dentro de cada objeto, encontrar um campo específico e comparar duas respostas.",
          "Também é uma forma rápida de validar um arquivo de configuração antes de subir uma alteração: se o formatador acusar erro, a aplicação também vai acusar.",
        ],
      },
      {
        title: "Os erros de JSON mais comuns, com exemplos",
        paragraphs: [
          "Quase todo erro de JSON vem de hábitos de JavaScript que o formato não aceita. Veja os casos mais frequentes e como corrigir:",
        ],
        list: [
          "Aspas simples: {'nome': 'panda'} é inválido; use {\"nome\": \"panda\"}.",
          "Chave sem aspas: {nome: \"panda\"} é inválido; a chave precisa de aspas duplas.",
          "Vírgula no final: {\"a\": 1,} e [1, 2,] são inválidos.",
          "Comentários: // e /* */ não existem em JSON; remova-os ou guarde a observação em um campo.",
          "Valores especiais: undefined, NaN e Infinity não são aceitos; use null ou um texto.",
          "Texto com quebra de linha: dentro das aspas a quebra precisa ser escrita como \\n.",
        ],
      },
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
      {
        question: "JSON aceita comentários ou vírgula no final?",
        answer:
          "Não. Nenhum dos dois faz parte do formato. Alguns arquivos de configuração usam variações como JSONC ou JSON5, que aceitam essas liberdades, mas o JSON puro não.",
      },
      {
        question: "Qual a diferença entre JSON e um objeto JavaScript?",
        answer:
          "O JSON é um formato de texto mais restrito: exige aspas duplas nas chaves e nos textos e não aceita funções, undefined nem comentários. Um objeto JavaScript é uma estrutura em memória que pode ter tudo isso.",
      },
      {
        question: "O que significa “Unexpected token” na mensagem de erro?",
        answer:
          "Que o analisador encontrou um caractere onde não esperava, geralmente perto da posição indicada na mensagem. A redação exata muda de navegador para navegador, mas o erro costuma estar no caractere citado ou um pouco antes dele.",
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
    sections: [
      {
        title: "As três partes de um JWT",
        paragraphs: [
          "O header diz qual algoritmo foi usado para assinar o token, como HS256 ou RS256, e o tipo do token. O payload carrega as informações, chamadas de claims: quem é o usuário, quais permissões ele tem e até quando o token vale. A assinatura é calculada a partir das duas primeiras partes com uma chave secreta, e é ela que garante que ninguém alterou o conteúdo.",
          "Por isso, decodificar um token é diferente de validá-lo. Qualquer pessoa consegue ler o header e o payload, mas só quem tem a chave consegue gerar uma assinatura que o servidor aceite.",
        ],
      },
      {
        title: "Claims mais comuns",
        paragraphs: [
          "O padrão JWT (RFC 7519) define alguns nomes curtos que aparecem em quase todo token:",
        ],
        list: [
          "sub: o identificador do usuário ou do assunto do token.",
          "iss: quem emitiu o token, por exemplo o servidor de autenticação.",
          "aud: para quem o token foi emitido, como uma API específica.",
          "exp: a data de expiração, em timestamp Unix (segundos).",
          "iat: quando o token foi emitido.",
          "nbf: a partir de quando o token passa a valer.",
        ],
      },
      {
        title: "Usando o decodificador para depurar",
        paragraphs: [
          "Os problemas de autenticação mais comuns aparecem logo no payload: token expirado, audience errada, permissão faltando ou relógio do servidor fora de sincronia com o emissor. Colar o token aqui mostra essas informações na hora.",
          "Um cuidado: tokens de produção dão acesso à conta de alguém enquanto não expiram. Evite colá-los em ferramentas que enviam o conteúdo para servidores. Aqui a decodificação acontece só no seu navegador, mas o hábito de tratar tokens como senhas vale para qualquer lugar.",
        ],
      },
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
    sections: [
      {
        title: "Anatomia de um UUID",
        paragraphs: [
          "Um UUID tem 32 caracteres hexadecimais divididos em cinco grupos, no formato 8-4-4-4-12, por exemplo 3f2b8c1e-9d4a-4e7b-a6c2-1f0e5d9b7a34. O primeiro caractere do terceiro grupo indica a versão (4, no caso) e o primeiro do quarto grupo indica a variante. Os outros 122 bits são aleatórios.",
          "O formato é definido pela RFC 9562, que em 2024 substituiu a antiga RFC 4122 e também padronizou versões mais novas, como a v7.",
        ],
      },
      {
        title: "UUID v4 ou ID sequencial?",
        paragraphs: [
          "IDs sequenciais (1, 2, 3…) são curtos e ordenados, mas revelam informação, como quantos clientes um sistema tem, e permitem adivinhar o próximo registro. Também exigem que um único lugar distribua os números, o que complica sistemas distribuídos e aplicativos que funcionam offline.",
          "O UUID v4 pode ser gerado em qualquer lugar, sem coordenação, e não revela nada. A desvantagem é que ele é aleatório, o que pode deixar índices de banco de dados menos eficientes em tabelas muito grandes. Nesses casos, a versão 7, que começa com a data e hora, é uma alternativa que mantém a ordenação.",
        ],
      },
      {
        title: "Onde UUIDs costumam aparecer",
        paragraphs: [],
        list: [
          "Chaves primárias em bancos de dados.",
          "Identificadores de pedidos, arquivos e recursos em APIs REST.",
          "Chaves de idempotência para evitar que uma requisição seja processada duas vezes.",
          "IDs de correlação para rastrear uma requisição entre vários serviços nos logs.",
        ],
      },
      {
        title: "UUIDs na prática: onde gerar e o risco de repetição",
        paragraphs: [
          "Além do navegador, quase toda linguagem gera UUIDs v4 de forma nativa: crypto.randomUUID() em JavaScript e no Node.js, uuid.uuid4() em Python e gen_random_uuid() no PostgreSQL. A saída é sempre no mesmo formato, então os valores gerados aqui servem como dados de exemplo para testar colunas, APIs e importações.",
          "Sobre colisão: um UUID v4 tem 122 bits aleatórios. Seriam necessários cerca de 2,7 quintilhões de UUIDs (2,7 × 10^18) para chegar a 50% de chance de uma repetição, o que na prática torna o risco desprezível em qualquer sistema comum.",
        ],
      },
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
      {
        question: "UUID e GUID são a mesma coisa?",
        answer:
          "Na prática, sim. GUID é o nome que a Microsoft usa para o mesmo identificador de 128 bits, e os dois seguem o mesmo formato.",
      },
      {
        question: "Dois UUIDs gerados podem ser iguais?",
        answer:
          "Em teoria sim, mas a probabilidade é tão pequena que é ignorada na prática. Com 122 bits aleatórios, só depois de bilhões de bilhões de UUIDs a chance de repetição passa a ser relevante.",
      },
      {
        question: "O UUID v4 é seguro para usar como token de acesso?",
        answer:
          "Não é o ideal. Embora seja aleatório, ele foi pensado para identificar registros, não para autenticar. Para tokens secretos, use um gerador criptográfico próprio com mais bits, como o gerador de senhas do site.",
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
    sections: [
      {
        title: "Como a codificação funciona",
        paragraphs: [
          "O Base64 pega os dados de três em três bytes (24 bits) e os divide em quatro blocos de 6 bits. Cada bloco vira um dos 64 caracteres do alfabeto: A a Z, a a z, 0 a 9, + e /. Quando a quantidade de bytes não é múltipla de três, o final recebe um ou dois sinais de igual (=) como preenchimento.",
          "O resultado é cerca de 33% maior que o original: a cada três bytes de entrada saem quatro caracteres. É o preço pago para que o conteúdo passe por canais que só aceitam texto.",
        ],
      },
      {
        title: "Onde o Base64 é usado",
        paragraphs: [],
        list: [
          "Anexos de e-mail, que são codificados para viajar dentro de uma mensagem de texto.",
          "Imagens embutidas em HTML e CSS com data URIs (data:image/png;base64,…).",
          "Autenticação HTTP Basic, que envia usuário e senha em Base64 no cabeçalho.",
          "Tokens JWT, que usam a variante Base64URL.",
          "Arquivos e binários enviados dentro de JSON em APIs.",
        ],
      },
      {
        title: "Base64 e Base64URL",
        paragraphs: [
          "Os caracteres + e / têm significado especial em URLs, e o = também. Por isso existe a variante Base64URL, que troca + por -, / por _ e geralmente omite o preenchimento. É ela que aparece em JWTs e em parâmetros de links.",
          "Se a decodificação de um texto que veio de uma URL falhar, vale conferir se ele não está em Base64URL: trocar - por + e _ por / costuma resolver.",
        ],
      },
      {
        title: "Exemplo passo a passo",
        paragraphs: [
          "O texto “Panda” vira UGFuZGE= em Base64. O Base64 lê os bytes do texto em grupos de três e converte cada grupo em quatro caracteres do alfabeto (A–Z, a–z, 0–9, + e /). Como “Panda” tem cinco bytes, o último grupo fica incompleto e é completado com o sinal de igual (=).",
          "Textos com acentos são primeiro convertidos para bytes UTF-8, e por isso “Olá” (quatro bytes, pois o á ocupa dois) vira T2zDoQ==. Nas duas contas, a regra é a mesma: três bytes de entrada geram quatro caracteres de saída, o que faz o Base64 ficar cerca de 33% maior que o original.",
        ],
      },
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
      {
        question: "Por que o Base64 termina com =?",
        answer:
          "Porque a conversão trabalha em grupos de três bytes. Quando sobram um ou dois bytes no final, o resultado é completado com um ou dois sinais de igual para manter o tamanho múltiplo de quatro.",
      },
      {
        question: "O Base64 deixa o arquivo maior?",
        answer:
          "Sim, em cerca de 33%. Cada três bytes viram quatro caracteres, então embutir uma imagem grande em Base64 aumenta o tamanho da página.",
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
    sections: [
      {
        title: "Por que sistemas usam timestamp",
        paragraphs: [
          "Guardar datas como texto (“19/10/2026 14:30”) gera ambiguidade: em qual fuso? Dia/mês ou mês/dia? O timestamp Unix resolve isso com um único número que representa o mesmo instante em qualquer lugar do mundo. Comparar, ordenar e calcular a diferença entre duas datas vira uma conta simples de subtração.",
          "Por isso ele aparece em bancos de dados, logs, tokens JWT, APIs e sistemas de arquivos. A conversão para o horário local só acontece na hora de mostrar a data para uma pessoa.",
        ],
      },
      {
        title: "Segundos ou milissegundos: diferenças entre linguagens",
        paragraphs: [
          "O padrão Unix conta em segundos, e é assim que funcionam PHP, Python (time.time()), a maioria dos bancos de dados e os JWTs. Já o JavaScript e o Java contam em milissegundos: Date.now() devolve um número com 13 dígitos em vez de 10.",
          "Misturar os dois é um dos bugs de data mais comuns: um timestamp em segundos interpretado como milissegundos vira uma data em janeiro de 1970, e o contrário vira uma data dezenas de milhares de anos no futuro.",
        ],
      },
      {
        title: "O problema do ano 2038",
        paragraphs: [
          "Sistemas antigos guardam o timestamp em um inteiro de 32 bits com sinal, que tem como valor máximo 2.147.483.647. Esse número corresponde a 19 de janeiro de 2038, às 03:14:07 UTC. Um segundo depois, o contador estoura e volta para uma data em 1901.",
          "Sistemas modernos já usam 64 bits e não têm esse problema, mas equipamentos embarcados, bancos de dados legados e arquivos com campos de 32 bits ainda precisam ser revisados até lá.",
        ],
      },
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
    sections: [
      {
        title: "Diferenças entre os algoritmos",
        paragraphs: [
          "Todos os algoritmos aqui geram um resultado de tamanho fixo, não importa se a entrada tem uma palavra ou um livro inteiro. O que muda é o tamanho e a resistência:",
        ],
        list: [
          "SHA-1: 160 bits (40 caracteres hexadecimais). Considerado quebrado desde 2017, quando pesquisadores criaram dois PDFs diferentes com o mesmo hash.",
          "SHA-256: 256 bits (64 caracteres). O mais usado hoje, em certificados digitais, assinaturas de software e blockchains.",
          "SHA-384: 384 bits (96 caracteres). Uma versão truncada do SHA-512, comum em alguns protocolos de segurança.",
          "SHA-512: 512 bits (128 caracteres). Margem de segurança maior e, em processadores de 64 bits, às vezes até mais rápido que o SHA-256.",
        ],
      },
      {
        title: "Para que serve um hash",
        paragraphs: [
          "O uso mais comum é verificar integridade. Sites de download publicam o SHA-256 dos arquivos: se o hash do arquivo que você baixou for igual ao publicado, ele chegou intacto e não foi alterado. Sistemas de controle de versão, como o Git, usam hashes para identificar cada alteração.",
          "Hashes também servem para comparar dados sem precisar guardá-los, criar chaves de cache, detectar arquivos duplicados e como parte de assinaturas digitais e de códigos de autenticação de mensagens (HMAC).",
        ],
      },
      {
        title: "O efeito avalanche",
        paragraphs: [
          "Uma propriedade importante de um bom hash é que uma mudança mínima na entrada muda completamente a saída. Experimente digitar “panda” e depois “Panda”: os resultados não terão nenhuma semelhança visível. Isso impede que alguém deduza o texto original comparando hashes parecidos.",
        ],
      },
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
    sections: [
      {
        title: "Um pouco de história",
        paragraphs: [
          "O QR Code (Quick Response Code) foi criado em 1994 pela Denso Wave, uma empresa japonesa do grupo Toyota, para rastrear peças nas linhas de montagem de carros. A ideia era um código que pudesse ser lido muito mais rápido que o código de barras e guardasse bem mais informação.",
          "A empresa decidiu não cobrar pelo uso da patente, e o formato se espalhou. Hoje está em cardápios, ingressos, boletos, embalagens e no Pix, onde virou parte do dia a dia de quase todo brasileiro.",
        ],
      },
      {
        title: "Correção de erros: por que um QR Code riscado ainda funciona",
        paragraphs: [
          "Parte dos quadradinhos de um QR Code não guarda o conteúdo, e sim informação redundante para reconstruí-lo. Existem quatro níveis: L recupera cerca de 7% do código danificado, M cerca de 15%, Q cerca de 25% e H cerca de 30%. Este gerador usa o nível M, um bom equilíbrio entre resistência e densidade.",
          "É graças a essa redundância que um código continua legível mesmo com uma mancha, um amassado ou um pequeno logotipo por cima.",
        ],
      },
      {
        title: "Dicas para um QR Code fácil de ler",
        paragraphs: [],
        list: [
          "Prefira URLs curtas: menos conteúdo gera um código com menos quadradinhos, que é lido mais rápido e de mais longe.",
          "Mantenha a margem branca em volta do código; ela ajuda a câmera a encontrar onde ele começa.",
          "Para impressão, use um tamanho de pelo menos 2 cm de lado e teste com mais de um celular antes de imprimir em quantidade.",
          "Garanta bom contraste: código escuro sobre fundo claro funciona melhor.",
          "Confira o link antes de divulgar. Como o QR Code é estático, corrigir depois exige gerar e imprimir um novo.",
        ],
      },
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
    sections: [
      {
        title: "Limites de caracteres que vale conhecer",
        paragraphs: [
          "Muitos lugares cortam o texto quando ele passa de um certo tamanho. Alguns limites de referência:",
        ],
        list: [
          "Título de página para o Google: cerca de 50 a 60 caracteres aparecem inteiros no resultado de busca.",
          "Meta description: em torno de 150 a 160 caracteres antes de ser cortada.",
          "Post no X (antigo Twitter): 280 caracteres em contas gratuitas.",
          "SMS: 160 caracteres sem acentos; com acentos ou emojis, o limite por mensagem cai para 70.",
          "Bio do Instagram: 150 caracteres.",
        ],
      },
      {
        title: "Com ou sem espaços?",
        paragraphs: [
          "Plataformas e editais nem sempre contam da mesma forma. Redes sociais e campos de formulário geralmente contam os espaços. Já trabalhos acadêmicos, traduções e alguns concursos pedem a contagem sem espaços. Por isso a ferramenta mostra os dois números lado a lado.",
          "Na dúvida, leia a regra de quem definiu o limite. Se ela não disser nada, considere a contagem com espaços, que é a mais comum.",
        ],
      },
      {
        title: "Tempo de leitura",
        paragraphs: [
          "A estimativa usa uma média de 200 palavras por minuto, um ritmo confortável para leitura em tela. Pessoas que leem muito chegam a 250 ou 300, e textos técnicos costumam ser lidos mais devagar. Use o número como referência, não como regra, por exemplo para avisar quanto tempo leva um artigo ou para calcular a duração de um discurso.",
        ],
      },
      {
        title: "Exemplo prático: escrevendo uma meta description",
        paragraphs: [
          "Para o resultado do Google, a meta description deve ficar em torno de 150 a 160 caracteres. Cole o seu texto na caixa e confira o número de “Caracteres”: se passar de 160, o final provavelmente será cortado com reticências. Vale colocar a informação mais importante no começo da frase, para que ela apareça mesmo se o corte acontecer.",
          "O mesmo vale para o título da página, que aparece inteiro em torno de 50 a 60 caracteres, e para mensagens de SMS, em que ultrapassar o limite faz a operadora dividir o texto em duas mensagens e cobrar as duas.",
        ],
      },
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
      {
        question: "O que conta como linha?",
        answer:
          "Cada quebra de linha começa uma nova linha. Um texto sem nenhuma quebra tem 1 linha, e uma linha em branco no final também é contada. Com a caixa vazia, o total é 0.",
      },
      {
        question: "Por que o contador do X mostra um número diferente?",
        answer:
          "Porque cada plataforma tem regras próprias. O X, por exemplo, conta todo link como 23 caracteres e trata alguns emojis como dois. Use este contador como referência e confira o limite na própria plataforma.",
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
    sections: [
      {
        title: "A história do texto mais famoso do design",
        paragraphs: [
          "O Lorem Ipsum vem de trechos das seções 1.10.32 e 1.10.33 de “De finibus bonorum et malorum”, um tratado sobre ética escrito por Cícero. O texto original foi cortado e embaralhado, e a palavra “dolorem” virou “lorem”, o que fez o resultado perder o sentido.",
          "Ele já era usado por tipógrafos para montar provas de impressão, mas ficou popular nos anos 1960 com as folhas de letras transferíveis da Letraset e, depois, nos anos 1980, quando passou a vir em programas de editoração eletrônica. Desde então é padrão em design gráfico e web.",
        ],
      },
      {
        title: "Por que não usar “texto texto texto”",
        paragraphs: [
          "Repetir a mesma palavra cria um padrão visual artificial, com espaços e quebras de linha sempre iguais. O Lorem Ipsum tem palavras de tamanhos variados e uma distribuição de letras parecida com a de um texto real em línguas latinas, o que dá uma ideia mais fiel de como o layout vai ficar.",
        ],
      },
      {
        title: "Cuidados ao usar texto de preenchimento",
        paragraphs: [],
        list: [
          "Teste também com textos reais e longos: títulos em português costumam ser maiores que os de exemplo.",
          "Revise antes de publicar. Lorem Ipsum esquecido em produção é um erro clássico e fácil de evitar.",
          "Para validar a experiência com usuários, prefira conteúdo real; texto sem sentido só serve para avaliar forma.",
        ],
      },
      {
        title: "Como o gerador monta o texto",
        paragraphs: [
          "O texto é montado a partir de um vocabulário fixo de palavras do latim clássico, sorteadas a cada clique. Cada frase tem de 6 a 14 palavras e cada parágrafo, de 3 a 6 frases. Por isso o resultado muda sempre que você pede um novo texto, mas mantém o aspecto de um texto corrido de verdade.",
          "Os limites são 10 parágrafos, 30 frases ou 200 palavras por vez, o bastante para preencher uma página de teste. Com a opção “Começar com Lorem ipsum dolor sit amet” marcada, o início fica sempre igual à frase clássica, o que ajuda a identificar rapidamente o que é texto provisório.",
        ],
      },
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
      {
        question: "O texto gerado é sempre o mesmo?",
        answer:
          "Não. Só o começo é fixo quando a frase clássica está ativada. O restante é sorteado a cada geração, então dois cliques seguidos produzem textos diferentes.",
      },
      {
        question: "Existe Lorem Ipsum em português?",
        answer:
          "O texto original é em latim, mas há geradores que imitam o português. Se o seu layout vai ter conteúdo em português, vale testar também com frases reais, pois palavras acentuadas e mais longas mudam as quebras de linha.",
      },
    ],
  },
};

export function getToolContent(slug: string): ToolContent | undefined {
  return TOOL_CONTENT[slug];
}
