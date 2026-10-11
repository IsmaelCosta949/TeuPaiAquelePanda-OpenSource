import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useHref,
  useNavigate,
} from "react-router";

import { I18nProvider, RouterProvider } from "react-aria-components";

import type { Route } from "./+types/root";
import "./app.css";
import { ErrorBoundaryLayout } from "./components/errorBoundaryLayout";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "icon", type: "image/png", href: "/teupaiaquelepanda_logo_icon.png" },
  { rel: "apple-touch-icon", href: "/teupaiaquelepanda_logo_icon.png" },
];

const THEME_SYNC_SCRIPT = `(function(){try{var s=localStorage.getItem("panda-mail-theme");document.documentElement.classList.toggle("dark",s!=="light");}catch(e){document.documentElement.classList.add("dark");}})();`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="theme-color"
          content="#faf9f6"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1a1a1d"
          media="(prefers-color-scheme: dark)"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_SYNC_SCRIPT }} />
        <Meta />
        <Links />
        {import.meta.env.VITE_ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          ></script>
        )}
        {import.meta.env.VITE_CF_ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token: import.meta.env.VITE_CF_ANALYTICS_TOKEN,
            })}
          ></script>
        )}
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
  const navigate = useNavigate();

  return (
    <I18nProvider locale="pt-BR">
      <RouterProvider navigate={navigate} useHref={useHref}>
        <Outlet />
      </RouterProvider>
    </I18nProvider>
  );
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
