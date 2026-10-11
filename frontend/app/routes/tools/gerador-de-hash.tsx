import type { Route } from "./+types/gerador-de-hash";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import HashGenerator from "~/components/hashGenerator";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("gerador-de-hash");
}

export default function Page() {
  return (
    <ToolPage
      slug="gerador-de-hash"
    >
      <HashGenerator />
    </ToolPage>
  );
}
