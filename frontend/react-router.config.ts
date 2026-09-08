import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  // Static, content-only pages get real per-route HTML (title, description,
  // OG tags) baked in at build time — needed because SPA mode otherwise
  // serves one generic shell for every URL, which non-JS crawlers (link
  // previews, some search bots) can't see past.
  // /caixa-de-entrada and /email/:id are user/session-specific and stay
  // client-only (they're marked noindex in their own meta()).
  async prerender() {
    return ["/", "/suporte", "/termos"];
  },
} satisfies Config;
