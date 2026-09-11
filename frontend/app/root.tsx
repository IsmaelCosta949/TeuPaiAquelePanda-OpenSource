import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ErrorBoundaryLayout } from "./components/errorBoundaryLayout";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "icon", type: "image/png", href: "/teupaiaquelepanda_logo_icon.png" },
  { rel: "apple-touch-icon", href: "/teupaiaquelepanda_logo_icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Fredoka:wght@500;600;700&display=swap",
  },
];

// Dark is the default theme regardless of OS preference; a visitor only
// gets light mode after explicitly toggling it via the Header button
// (ThemeToggle), which remembers the choice in localStorage. Runs before
// paint to avoid a flash of the wrong theme; suppressHydrationWarning on
// <html> silences the expected class mismatch between server and client.
const THEME_SYNC_SCRIPT = `(function(){try{var s=localStorage.getItem("panda-mail-theme");document.documentElement.classList.toggle("dark",s!=="light");}catch(e){document.documentElement.classList.add("dark");}})();`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SYNC_SCRIPT }} />
        <Meta />
        <Links />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=***REMOVED-ADSENSE-CLIENT-ID***"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Ops, o panda tropeçou! 🐼";
  let details = "Algo deu errado por aqui.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Erro";
    details =
      error.status === 404
        ? "Essa página fugiu para o bambuzal."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <ErrorBoundaryLayout error={new Error(`${message}\n${details}`)} />
      {stack && (
        <pre className="mt-4 p-4 bg-gray-100 text-gray-800 rounded">
          {stack}
        </pre>
      )}
    </main>
  );
}
