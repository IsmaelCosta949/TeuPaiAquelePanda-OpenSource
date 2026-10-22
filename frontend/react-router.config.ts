import type { Config } from "@react-router/dev/config";
import { TOOLS } from "./app/lib/tools";

export default {
  ssr: false,
  async prerender() {
    return [
      "/",
      "/suporte",
      "/termos",
      "/sobre",
      "/privacidade",
      "/sitemap.xml",
      "/ads.txt",
      ...TOOLS.map((tool) => `/${tool.slug}`),
    ];
  },
} satisfies Config;
