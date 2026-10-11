import type { ReactNode } from "react";
import { Link } from "react-router";
import { getTool, toolsByCategory } from "../lib/tools";
import { ToolCard } from "./ToolCard";
import { ToolContent } from "./ToolContent";

type ToolPageProps = {
  slug: string;
  /** Aviso exibido acima da ferramenta (ex.: dados fictícios). */
  notice?: string;
  children: ReactNode;
};

export function ToolPage({ slug, notice, children }: ToolPageProps) {
  const tool = getTool(slug);
  const related = toolsByCategory(tool.category).filter((t) => t.slug !== slug);

  return (
    <div className="space-y-8">
      <section className="w-full space-y-6">
        <div className="space-y-2">
          <nav
            aria-label="Você está em"
            className="text-xs text-panda-gray dark:text-white/50"
          >
            <Link
              to="/"
              className="hover:text-panda-red dark:hover:text-panda-red-light"
            >
              Início
            </Link>
            <span aria-hidden="true"> › </span>
            <span aria-current="page">{tool.name}</span>
          </nav>
          <h1 className="font-display text-2xl font-bold text-panda-ink dark:text-panda-paper">
            {tool.name}
          </h1>
          <p className="text-panda-gray dark:text-white/60">{tool.tagline}</p>
          {notice && (
            <p className="text-sm text-panda-gray dark:text-white/60">
              {notice}
            </p>
          )}
        </div>

        <div className="rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal p-5 shadow-[4px_4px_0_0_var(--color-panda-ink)] dark:shadow-none">
          {children}
        </div>
      </section>

      <ToolContent slug={slug} />

      {related.length > 0 && (
        <section aria-labelledby="outras-ferramentas" className="space-y-4">
          <h2
            id="outras-ferramentas"
            className="font-display text-lg font-bold text-panda-ink dark:text-panda-paper"
          >
            Outras ferramentas
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
