import type { Route } from "./+types/gerador-de-lorem-ipsum";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import LoremGenerator from "~/components/loremGenerator";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("gerador-de-lorem-ipsum");
}

export default function Page() {
  return (
    <ToolPage
      slug="gerador-de-lorem-ipsum"
    >
      <LoremGenerator />
    </ToolPage>
  );
}
