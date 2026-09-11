import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="border-t border-panda-ink/10 dark:border-white/10 py-6">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-panda-gray dark:text-white/50 text-center sm:text-left">
        <p>
          🐼 Teu Pai, Aquele Panda — e-mails recebidos aqui expiram
          automaticamente e depois somem para sempre.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/suporte"
            className="hover:text-panda-red dark:hover:text-panda-red-light transition-colors"
          >
            Suporte
          </Link>
          <Link
            to="/termos"
            className="hover:text-panda-red dark:hover:text-panda-red-light transition-colors"
          >
            Termos
          </Link>
        </div>
      </div>
    </footer>
  );
}
