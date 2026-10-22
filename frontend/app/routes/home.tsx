import { Link } from "react-router";
import type { Route } from "./+types/home";
import { PandaMascot } from "../components/images/PandaMascot";
import { ToolCard } from "../components/ToolCard";
import { useMail } from "../hooks/MailContext";
import { buildPageMeta, buildSiteJsonLd } from "../lib/seo";
import { CATEGORIES, toolsByCategory, type ToolCategory } from "../lib/tools";

export function meta({}: Route.MetaArgs) {
  return [
    ...buildPageMeta({
      title:
        "Teu Pai, Aquele Panda — e-mail temporário e ferramentas",
      description:
        "E-mail temporário sem cadastro e ferramentas rápidas para o dia a dia: gerador de CPF, CNPJ e RG, senha forte, formatador de JSON, decodificador de JWT, UUID, Base64 e mais.",
      path: "/",
    }),
    buildSiteJsonLd(),
  ];
}

export default function Home() {
  const { address } = useMail();

  return (
    <div className="space-y-10">
      <section className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div className="space-y-4">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-panda-ink dark:text-panda-paper leading-tight">
            A caixa de ferramentas do teu pai, aquele panda
          </h1>
          <p className="text-panda-gray dark:text-white/60 max-w-md">
            E-mail temporário, dados de teste, utilidades para devs e mais. Tudo
            grátis, sem cadastro e rodando direto no seu navegador.
          </p>
        </div>

        <div className="hidden md:flex justify-center">
          <div className="relative w-48 aspect-333/344 animate-panda-breathe">
            <PandaMascot className="w-full h-full drop-shadow-lg" />
          </div>
        </div>
      </section>

      {(Object.keys(CATEGORIES) as ToolCategory[]).map((category) => (
        <section
          key={category}
          aria-labelledby={`categoria-${category}`}
          className="space-y-4"
        >
          <div className="space-y-1">
            <h2
              id={`categoria-${category}`}
              className="font-display text-xl font-bold text-panda-ink dark:text-panda-paper"
            >
              {CATEGORIES[category].label}
            </h2>
            <p className="text-sm text-panda-gray dark:text-white/60">
              {CATEGORIES[category].description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolsByCategory(category).map((tool) => {
              const hasActiveInbox =
                tool.slug === "email-temporario" && Boolean(address);
              return (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  to={hasActiveInbox ? "/caixa-de-entrada" : undefined}
                  badge={hasActiveInbox ? "ativo" : undefined}
                />
              );
            })}
          </div>
        </section>
      ))}

      <section
        aria-labelledby="sobre-o-site"
        className="max-w-2xl space-y-4 text-sm text-panda-gray dark:text-white/60"
      >
        <h2
          id="sobre-o-site"
          className="font-display text-xl font-bold text-panda-ink dark:text-panda-paper"
        >
          Feito para quem desenvolve, testa e não quer spam
        </h2>
        <p>
          O Teu Pai, Aquele Panda reúne as ferramentas que a gente mais
          procura no dia a dia de desenvolvimento e QA no Brasil. Precisa
          testar o cadastro do seu sistema? Gere um e-mail temporário para
          receber o código de confirmação e um CPF com dígitos verificadores
          válidos para passar na validação. Está investigando um erro de
          autenticação? Decodifique o JWT e veja se ele já expirou. Recebeu um
          JSON todo em uma linha? Formate e encontre o campo que procura.
        </p>
        <p>
          Cada ferramenta vem com uma explicação do que acontece por trás: como
          o cálculo do CPF e do CNPJ funciona, o que torna uma senha forte, as
          partes de um token JWT, a diferença entre SHA-1 e SHA-256 e mais. A
          ideia é resolver o problema rápido e, de quebra, entender o que você
          está usando.
        </p>
        <p>
          Todas as ferramentas são gratuitas e não pedem cadastro. Com exceção
          do e-mail temporário, elas rodam inteiramente no seu navegador, então
          o que você digita não sai do seu dispositivo. Os dados gerados são
          fictícios e servem apenas para testes. Saiba mais{" "}
          <Link
            to="/sobre"
            className="text-panda-red dark:text-panda-red-light font-medium"
          >
            sobre o projeto
          </Link>{" "}
          ou leia a{" "}
          <Link
            to="/privacidade"
            className="text-panda-red dark:text-panda-red-light font-medium"
          >
            política de privacidade
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
