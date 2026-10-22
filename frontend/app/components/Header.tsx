import { NavLink } from "react-router";
import { Button } from "react-aria-components";
import { ChevronDownIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { TOOL_ICONS } from "./toolIcons";
import { Menu, MenuItem, MenuSection, MenuTrigger } from "./ui/menu";
import {
  CATEGORIES,
  toolPath,
  toolsByCategory,
  type ToolCategory,
} from "../lib/tools";

const NAV_LINKS_BEFORE_TOOLS = [{ to: "/", label: "Início" }];
const NAV_LINKS_AFTER_TOOLS = [
  { to: "/caixa-de-entrada", label: "Caixa de entrada" },
  { to: "/suporte", label: "Suporte" },
];

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `transition-colors ${
    isActive
      ? "text-panda-red dark:text-panda-red-light font-semibold"
      : "text-panda-gray dark:text-white/50 hover:text-panda-ink dark:hover:text-panda-paper"
  }`;
}

function ToolsMenu() {
  return (
    <MenuTrigger>
      <Button className="flex cursor-pointer items-center gap-1 rounded-md text-panda-gray outline-none transition-colors hover:text-panda-ink focus-visible:ring-3 focus-visible:ring-panda-red/50 dark:text-white/50 dark:hover:text-panda-paper">
        Ferramentas
        <ChevronDownIcon aria-hidden="true" className="size-4" />
      </Button>
      <Menu aria-label="Ferramentas">
        {(Object.keys(CATEGORIES) as ToolCategory[]).map((category) => (
          <MenuSection key={category} title={CATEGORIES[category].label}>
            {toolsByCategory(category).map((tool) => {
              const Icon = TOOL_ICONS[tool.slug];
              return (
                <MenuItem
                  key={tool.slug}
                  id={tool.slug}
                  href={toolPath(tool.slug)}
                  textValue={tool.name}
                >
                  {Icon && <Icon aria-hidden="true" />}
                  {tool.name}
                </MenuItem>
              );
            })}
          </MenuSection>
        ))}
      </Menu>
    </MenuTrigger>
  );
}

export function Header() {
  return (
    <header className="border-b border-panda-ink/10 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="/teupaiaquelepanda_logo_icon.png"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 shrink-0 rounded-full object-cover"
          />
          <span className="font-display leading-none">
            <span className="block text-sm sm:text-base font-medium text-panda-ink dark:text-panda-paper">
              Teu Pai,
            </span>
            <span className="block text-lg sm:text-xl font-bold text-panda-red dark:text-panda-red-light -mt-0.5">
              Aquele Panda
              <span
                aria-hidden="true"
                className="animate-pumpkin-flicker ml-1 inline-block text-base sm:text-lg"
              >
                🎃
              </span>
            </span>
          </span>
        </NavLink>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-display">
          {NAV_LINKS_BEFORE_TOOLS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
          <ToolsMenu />
          {NAV_LINKS_AFTER_TOOLS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClass}
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
