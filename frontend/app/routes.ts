import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("components/SiteLayout.tsx", [
    index("routes/home.tsx"),
    route("caixa-de-entrada", "routes/inbox.tsx"),
    route("email/:id", "routes/view.tsx"),
    route("suporte", "routes/suporte.tsx"),
    route("termos", "routes/terms.tsx"),
  ]),
] satisfies RouteConfig;
