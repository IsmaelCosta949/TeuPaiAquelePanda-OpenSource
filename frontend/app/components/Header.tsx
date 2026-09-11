import { NavLink } from "react-router";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { to: "/", label: "Início" },
  { to: "/caixa-de-entrada", label: "Caixa de entrada" },
  { to: "/suporte", label: "Suporte" },
  { to: "/termos", label: "Termos" },
  { to: "/for-devs", label: "For Devs" },
];

export function Header() {
  return (
    <header className="border-b border-panda-ink/10 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="/teupaiaquelepanda_logo_icon.png"
            alt="Panda Mascot"
            className="w-10 h-10 shrink-0 rounded-full object-cover"
          />
          <span className="font-display leading-none">
            <span className="block text-sm sm:text-base font-medium text-panda-ink dark:text-panda-paper">
              Teu Pai,
            </span>
            <span className="block text-lg sm:text-xl font-bold text-panda-red dark:text-panda-red-light -mt-0.5">
              Aquele Panda
            </span>
          </span>
        </NavLink>

        <nav className="flex items-center gap-4 text-sm font-display">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-panda-red dark:text-panda-red-light font-semibold"
                    : "text-panda-gray dark:text-white/50 hover:text-panda-ink dark:hover:text-panda-paper"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
