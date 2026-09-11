import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const THEME_KEY = "panda-mail-theme";

export function ThemeToggle() {
  // Server and first client render can't know the real theme (it's read
  // from the DOM, set by the blocking script in root.tsx) — mounted stays
  // false until then so both renders agree on a neutral placeholder,
  // avoiding a hydration mismatch on the icon.
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // storage unavailable — theme just won't persist across visits
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="rounded-full text-panda-gray dark:text-white/50"
    >
      {mounted ? (
        dark ? (
          <Sun aria-hidden="true" className="w-4 h-4" />
        ) : (
          <Moon aria-hidden="true" className="w-4 h-4" />
        )
      ) : (
        <span aria-hidden="true" className="block w-4 h-4" />
      )}
    </Button>
  );
}
