# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

"Teu Pai, Aquele Panda" is a Portuguese-language (pt-BR) temporary email service plus a set of dev tools (fake CPF/CNPJ/RG generator, password generator, JSON formatter, JWT decoder). User-facing text, code comments and some identifiers are in Portuguese — keep new UI copy in Portuguese.

Two independent npm packages, no root workspace — run commands from inside each directory:

- `backend/` — Cloudflare Worker (email ingestion + JSON API)
- `frontend/` — React Router v8 app in framework mode, built as a pre-rendered SPA

## Commands

Backend (`cd backend`):

- `npm run dev` — local dev via `wrangler dev`
- `npm test` — Vitest with `@cloudflare/vitest-plugin` (runs inside the Workers runtime); single test: `npx vitest run -t "<test name>"`
- `npm run deploy` — `wrangler deploy`
- `npm run cf-typegen` — regenerate `worker-configuration.d.ts`; run after changing bindings in `wrangler.jsonc`

Frontend (`cd frontend`):

- `npm run dev` — dev server on http://localhost:5173
- `npm run build` — production build into `build/client`
- `npm run typecheck` — `react-router typegen && tsc` (no linter or test suite exists)

Git hook: [.githooks/pre-commit](.githooks/pre-commit) blocks commits that stage `.env`/`.dev.vars`/`.wrangler` files, `*.workers.dev` URLs, AdSense `ca-pub-` ids, or a real 32-hex KV id in `wrangler.jsonc` (the repo is public; the real values live only in the deployment). Enable it once per clone with `git config core.hooksPath .githooks`.

Frontend env (`frontend/.env`, see `.env.example`): `VITE_API_BASE` (backend URL), `VITE_SITE_URL` (canonical URL for SEO), `VITE_ADSENSE_CLIENT_ID` (optional).

## Architecture

Flow: incoming mail → Cloudflare Email Routing → Worker `email()` handler → Workers KV → `GET /api/emails?address=` → frontend polling.

### Backend ([backend/src/index.ts](backend/src/index.ts))

Single file exporting `email` and `fetch` handlers.
- `email()` parses raw MIME with `postal-mime`, builds an `EmailArmazenado` record (plain-text `preview` capped at 140 chars, `isHtml` true only when there is no text part), and does a read-modify-write of a JSON array in KV keyed by the recipient address, re-`put` with `expirationTtl: 3600` (so the TTL resets on each new message).
- `fetch()` serves `GET /api/emails?address=` (400 if missing, 403 for reserved local parts) with `Access-Control-Allow-Origin: *`; any other path returns a plain-text health check.
- KV binding is `EMAILS_TEMP` (typed in `worker-configuration.d.ts`). The namespace `id` in `wrangler.jsonc` is a placeholder in the public repo and must be filled with the real id locally before deploying.
- [backend/test/index.spec.ts](backend/test/index.spec.ts) is still the Wrangler "Hello World" template and does not match current behavior.
- [backend/AGENTS.md](backend/AGENTS.md): Cloudflare Workers APIs/limits change often — consult current docs (https://developers.cloudflare.com/workers/) before Workers/KV work.

### Frontend ([frontend/app/](frontend/app))

- [react-router.config.ts](frontend/react-router.config.ts): `ssr: false`, pre-renders `/`, `/suporte`, `/termos`, `/for-devs`. `/caixa-de-entrada` and `/email/:id` are client-only and served via SPA fallback in [public/_redirects](frontend/public/_redirects). When adding a route, update [app/routes.ts](frontend/app/routes.ts), and if it should be pre-rendered also `react-router.config.ts` and `public/sitemap.xml`. Don't access `window`/`localStorage` at module or render time in pre-rendered routes.
- All routes are nested under the `SiteLayout` layout. Inbox state lives in [app/hooks/MailContext.tsx](frontend/app/hooks/MailContext.tsx) (`MailProvider`/`useMail`): address lifecycle (1h lifetime, auto-regenerates on expiry), polling every 10s that pauses while the tab is hidden, read-state tracking, and a synthetic local `"welcome"` message that is prepended and never comes from the API.
- Persistence is in [app/lib/mailStorage.ts](frontend/app/lib/mailStorage.ts) (localStorage keys `panda-mail-*`, always wrapped in try/catch). The theme is applied pre-hydration by an inline script in `root.tsx` (dark by default).
- [app/lib/api.ts](frontend/app/lib/api.ts) maps the backend response to the `Message` type; keep it in sync with `EmailArmazenado` in the backend.
- HTML email bodies must be sanitized with DOMPurify before rendering (`EmailBody.tsx`).
- Per-route SEO metadata/structured data comes from [app/lib/seo.ts](frontend/app/lib/seo.ts).
- The "what's new" dialog shows once per `UPDATE_DATE` in [app/lib/updateAnnouncement.ts](frontend/app/lib/updateAnnouncement.ts) — bump the date when changing its items.
- UI primitives are shadcn/ui (`radix-nova` style) in `app/components/ui`; Tailwind v4; `~/` path alias maps to `app/`.
- A React Router skill lives in [frontend/.agents/skills/react-router/](frontend/.agents/skills/react-router/SKILL.md); this app is Framework Mode.

### Cross-package invariant

The reserved local-parts list (`suporte`, `admin`, `postmaster`, …) is duplicated in `backend/src/index.ts` (`RESERVED_LOCAL_PARTS`) and `frontend/app/lib/reservedLocalParts.ts`. Change both together.
