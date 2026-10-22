import { Link } from "react-router";
import { toolPath, type Tool } from "../lib/tools";
import { TOOL_ICONS } from "./toolIcons";

type ToolCardProps = {
  tool: Tool;
  /** Sobrescreve o destino padrão (ex.: caixa de entrada já ativa). */
  to?: string;
  badge?: string;
};

export function ToolCard({ tool, to, badge }: ToolCardProps) {
  const Icon = TOOL_ICONS[tool.slug];

  return (
    <Link
      to={to ?? toolPath(tool.slug)}
      className="group flex h-full gap-4 rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal p-4 sm:p-5 shadow-[4px_4px_0_0_var(--color-panda-ink)] dark:shadow-none transition-transform outline-none hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-panda-red/50 dark:hover:border-panda-red-light/60"
    >
      {Icon && (
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-panda-cream text-panda-red dark:bg-white/5 dark:text-panda-red-light">
          <Icon aria-hidden="true" className="size-5" />
        </span>
      )}
      <span className="min-w-0 space-y-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-display text-base font-bold break-words text-panda-ink dark:text-panda-paper group-hover:text-panda-red dark:group-hover:text-panda-red-light">
            {tool.name}
          </span>
          {badge && (
            <span className="rounded-full bg-panda-red px-2 py-0.5 text-[0.65rem] font-semibold text-white">
              {badge}
            </span>
          )}
        </span>
        <span className="block text-sm break-words text-panda-gray dark:text-white/60">
          {tool.tagline}
        </span>
      </span>
    </Link>
  );
}
