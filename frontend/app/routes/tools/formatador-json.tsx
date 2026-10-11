import type { Route } from "./+types/formatador-json";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import JsonFormatter from "~/components/jsonFormatter";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("formatador-json");
}

export default function Page() {
  return (
    <ToolPage
      slug="formatador-json"
    >
      <JsonFormatter />
    </ToolPage>
  );
}
