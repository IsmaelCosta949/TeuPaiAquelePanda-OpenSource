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
            A caixa de ferramentas de teu pai, aquele panda
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
    </div>
  );
}
