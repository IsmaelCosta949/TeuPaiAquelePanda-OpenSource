// Catálogo central das ferramentas do site. Sem JSX nem ícones de propósito:
// este arquivo é importado por routes.ts e react-router.config.ts, que rodam
// no Node durante o build. Alimenta o menu, o grid da home, as rotas, o
// pré-render, o sitemap e o SEO.
//
// Para adicionar uma ferramenta:
//   1. uma entrada em TOOLS (o slug é também o nome do arquivo da rota);
//   2. app/routes/tools/<slug>.tsx;
//   3. um ícone em components/toolIcons.ts.

export type ToolCategory = "email" | "documentos" | "dev" | "texto";

export const CATEGORIES: Record<
  ToolCategory,
  { label: string; description: string }
> = {
  email: {
    label: "E-mail",
    description: "Caixas de entrada descartáveis, sem cadastro.",
  },
  documentos: {
    label: "Documentos e dados de teste",
    description: "Geradores e validadores para testar formulários e sistemas.",
  },
  dev: {
    label: "Para devs",
    description: "Utilidades rápidas para o dia a dia de desenvolvimento.",
  },
  texto: {
    label: "Texto",
    description: "Ferramentas para trabalhar com textos.",
  },
};

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  category: ToolCategory;
  seoTitle: string;
  seoDescription: string;
};

export const TOOLS: Tool[] = [
  {
    slug: "email-temporario",
    name: "E-mail temporário",
    tagline: "Um endereço descartável por 1 hora, sem cadastro.",
    category: "email",
    seoTitle: "E-mail temporário — Teu Pai, Aquele Panda",
    seoDescription:
      "Gere um e-mail temporário em segundos com a proteção do teu pai, aquele panda. Sem cadastro, sem spam guardado.",
  },
  {
    slug: "gerador-de-cpf",
    name: "Gerador de CPF",
    tagline: "CPF fictício com dígitos verificadores válidos.",
    category: "documentos",
    seoTitle: "Gerador de CPF para testes — Teu Pai, Aquele Panda",
    seoDescription:
      "Gere CPFs fictícios com dígitos verificadores válidos para testar formulários e sistemas em desenvolvimento.",
  },
  {
    slug: "gerador-de-cnpj",
    name: "Gerador de CNPJ",
    tagline: "CNPJ fictício com dígitos verificadores válidos.",
    category: "documentos",
    seoTitle: "Gerador de CNPJ para testes — Teu Pai, Aquele Panda",
    seoDescription:
      "Gere CNPJs fictícios com dígitos verificadores válidos para testar formulários e sistemas em desenvolvimento.",
  },
  {
    slug: "gerador-de-rg",
    name: "Gerador de RG",
    tagline: "RG fictício no modelo padrão (IFP-SP).",
    category: "documentos",
    seoTitle: "Gerador de RG para testes — Teu Pai, Aquele Panda",
    seoDescription:
      "Gere RGs fictícios no modelo padrão para testar formulários e sistemas em desenvolvimento.",
  },
  {
    slug: "validador-de-cpf-cnpj",
    name: "Validador de CPF e CNPJ",
    tagline: "Confira se os dígitos verificadores estão corretos.",
    category: "documentos",
    seoTitle: "Validador de CPF e CNPJ online — Teu Pai, Aquele Panda",
    seoDescription:
      "Valide CPF e CNPJ online: confira se os dígitos verificadores estão corretos, direto no navegador e sem enviar nada para servidor nenhum.",
  },
  {
    slug: "gerador-de-pessoa",
    name: "Gerador de pessoa",
    tagline: "Nome, CPF, e-mail, telefone e endereço fictícios.",
    category: "documentos",
    seoTitle: "Gerador de pessoa fictícia — Teu Pai, Aquele Panda",
    seoDescription:
      "Gere uma pessoa fictícia completa — nome, CPF, e-mail, telefone, data de nascimento e endereço — para popular formulários e bancos de teste.",
  },
  {
    slug: "gerador-de-cartao-de-credito",
    name: "Gerador de cartão de teste",
    tagline: "Números que passam no algoritmo de Luhn.",
    category: "documentos",
    seoTitle: "Gerador de cartão de teste — Teu Pai, Aquele Panda",
    seoDescription:
      "Gere números de cartão de crédito fictícios (Visa, Mastercard, Amex e Elo) que passam na validação de Luhn, para testar máscaras e formulários de pagamento.",
  },
  {
    slug: "gerador-de-senha",
    name: "Gerador de senha",
    tagline: "Senha forte e aleatória com o tamanho que você escolher.",
    category: "dev",
    seoTitle: "Gerador de senha forte — Teu Pai, Aquele Panda",
    seoDescription:
      "Crie senhas fortes e aleatórias com letras, números e símbolos, direto no navegador e sem enviar nada para servidor nenhum.",
  },
  {
    slug: "formatador-json",
    name: "Formatador de JSON",
    tagline: "Cole um JSON e receba de volta formatado e legível.",
    category: "dev",
    seoTitle: "Formatador de JSON online — Teu Pai, Aquele Panda",
    seoDescription:
      "Formate e valide JSON online: cole o texto e receba o resultado indentado e legível, tudo no seu navegador.",
  },
  {
    slug: "decodificador-jwt",
    name: "Decodificador de JWT",
    tagline: "Veja o header e o payload de um token JWT.",
    category: "dev",
    seoTitle: "Decodificador de JWT online — Teu Pai, Aquele Panda",
    seoDescription:
      "Decodifique tokens JWT e veja o header, o payload e a data de expiração, tudo no navegador.",
  },
  {
    slug: "gerador-de-uuid",
    name: "Gerador de UUID",
    tagline: "UUIDs v4 aleatórios, um ou vários de uma vez.",
    category: "dev",
    seoTitle: "Gerador de UUID v4 online — Teu Pai, Aquele Panda",
    seoDescription:
      "Gere UUIDs v4 aleatórios, um ou vários de uma vez, e copie com um clique.",
  },
  {
    slug: "base64",
    name: "Base64",
    tagline: "Codifique e decodifique texto em Base64.",
    category: "dev",
    seoTitle: "Codificar e decodificar Base64 online — Teu Pai, Aquele Panda",
    seoDescription:
      "Codifique e decodifique texto em Base64 com suporte a acentos e emojis (UTF-8), direto no navegador.",
  },
  {
    slug: "conversor-de-timestamp",
    name: "Conversor de timestamp",
    tagline: "Converta Unix timestamp em data e vice-versa.",
    category: "dev",
    seoTitle: "Conversor de timestamp Unix online — Teu Pai, Aquele Panda",
    seoDescription:
      "Converta timestamp Unix (segundos ou milissegundos) em data e hora, e datas em timestamp, com ISO 8601, UTC e horário local.",
  },
  {
    slug: "gerador-de-hash",
    name: "Gerador de hash",
    tagline: "SHA-1, SHA-256, SHA-384 e SHA-512 de um texto.",
    category: "dev",
    seoTitle: "Gerador de hash SHA-256 online — Teu Pai, Aquele Panda",
    seoDescription:
      "Gere hashes SHA-1, SHA-256, SHA-384 e SHA-512 de qualquer texto, direto no navegador e sem enviar nada para servidor nenhum.",
  },
  {
    slug: "gerador-de-qr-code",
    name: "Gerador de QR Code",
    tagline: "Crie um QR Code a partir de uma URL ou texto.",
    category: "dev",
    seoTitle: "Gerador de QR Code grátis — Teu Pai, Aquele Panda",
    seoDescription:
      "Crie QR Codes a partir de qualquer URL ou texto e baixe a imagem em PNG, tudo no navegador.",
  },
  {
    slug: "contador-de-caracteres",
    name: "Contador de caracteres",
    tagline: "Caracteres, palavras, linhas e tempo de leitura.",
    category: "texto",
    seoTitle: "Contador de caracteres e palavras — Teu Pai, Aquele Panda",
    seoDescription:
      "Conte caracteres, palavras e linhas de um texto e veja o tempo estimado de leitura.",
  },
  {
    slug: "gerador-de-lorem-ipsum",
    name: "Gerador de Lorem Ipsum",
    tagline: "Texto de preenchimento em parágrafos, frases ou palavras.",
    category: "texto",
    seoTitle: "Gerador de Lorem Ipsum — Teu Pai, Aquele Panda",
    seoDescription:
      "Gere texto Lorem Ipsum em parágrafos, frases ou palavras para preencher layouts e protótipos.",
  },
];

export const toolPath = (slug: string) => `/${slug}/`;

export function getTool(slug: string): Tool {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Ferramenta desconhecida: ${slug}`);
  return tool;
}

export function toolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}
