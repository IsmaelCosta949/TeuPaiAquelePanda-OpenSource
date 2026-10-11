import type { Route } from "./+types/gerador-de-senha";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import PasswordGenerator from "~/components/passwordGenerator";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("gerador-de-senha");
}

export default function Page() {
  return (
    <ToolPage
      slug="gerador-de-senha"
    >
      <PasswordGenerator />
    </ToolPage>
  );
}
