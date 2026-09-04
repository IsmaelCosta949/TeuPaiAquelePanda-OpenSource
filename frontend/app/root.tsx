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

const PANDA_FAVICON = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <circle cx="46" cy="46" r="26" fill="#1a1a1d"/>
    <circle cx="154" cy="46" r="26" fill="#1a1a1d"/>
    <circle cx="100" cy="108" r="78" fill="#faf9f6" stroke="#1a1a1d" stroke-width="4"/>
    <ellipse cx="68" cy="104" rx="24" ry="30" transform="rotate(-18 68 104)" fill="#1a1a1d"/>
    <ellipse cx="132" cy="104" rx="24" ry="30" transform="rotate(18 132 104)" fill="#1a1a1d"/>
    <circle cx="68" cy="106" r="9" fill="#faf9f6"/>
    <circle cx="70" cy="108" r="4.5" fill="#1a1a1d"/>
    <circle cx="132" cy="106" r="9" fill="#faf9f6"/>
    <circle cx="134" cy="108" r="4.5" fill="#1a1a1d"/>
    <ellipse cx="100" cy="128" rx="10" ry="7" fill="#1a1a1d"/>
    <path d="M100 143 q-14 14 -28 4" stroke="#1a1a1d" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M100 143 q14 14 28 4" stroke="#1a1a1d" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,
)}`;

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: PANDA_FAVICON },
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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
