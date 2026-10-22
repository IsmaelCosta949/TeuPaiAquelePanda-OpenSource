import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";
import { TOOLS } from "./lib/tools";

export default [
  layout("components/SiteLayout.tsx", [
    index("routes/home.tsx"),
    ...TOOLS.map((tool) => route(tool.slug, `routes/tools/${tool.slug}.tsx`)),
    route("caixa-de-entrada", "routes/inbox.tsx"),
    route("email/:id", "routes/view.tsx"),
    route("suporte", "routes/suporte.tsx"),
    route("termos", "routes/terms.tsx"),
    route("sobre", "routes/sobre.tsx"),
    route("privacidade", "routes/privacidade.tsx"),
  ]),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("ads.txt", "routes/ads.ts"),
] satisfies RouteConfig;
