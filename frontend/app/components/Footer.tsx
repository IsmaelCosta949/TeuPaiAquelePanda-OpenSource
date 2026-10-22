import { Link } from "react-router";
import { CATEGORIES, toolPath, toolsByCategory, type ToolCategory } from "../lib/tools";

const linkClass =
  "hover:text-panda-red dark:hover:text-panda-red-light transition-colors";

export function Footer() {
  return (
    <footer className="border-t border-panda-ink/10 dark:border-white/10 py-6">
      <div className="max-w-5xl mx-auto px-4 space-y-6 text-xs text-panda-gray dark:text-white/50">
        <nav
          aria-label="Todas as ferramentas"
          className="grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {(Object.keys(CATEGORIES) as ToolCategory[]).map((category) => (
            <div key={category} className="space-y-2">
              <p className="font-display font-semibold text-panda-ink dark:text-panda-paper">
                {CATEGORIES[category].label}
              </p>
              <ul className="space-y-1.5">
                {toolsByCategory(category).map((tool) => (
                  <li key={tool.slug}>
                    <Link to={toolPath(tool.slug)} className={linkClass}>
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-panda-ink/10 pt-4 text-center sm:text-left dark:border-white/10">
          <p>
            🐼 Teu Pai, Aquele Panda — ferramentas grátis para devs e QAs, sem
            cadastro. E-mails recebidos expiram automaticamente e somem para
            sempre.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/sobre" className={linkClass}>
              Sobre
            </Link>
            <Link to="/suporte" className={linkClass}>
              Suporte
            </Link>
            <Link to="/termos" className={linkClass}>
              Termos
            </Link>
            <Link to="/privacidade" className={linkClass}>
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
