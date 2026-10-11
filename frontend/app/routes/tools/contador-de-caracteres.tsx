import type { Route } from "./+types/contador-de-caracteres";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import CharCounter from "~/components/charCounter";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("contador-de-caracteres");
}

export default function Page() {
  return (
    <ToolPage
      slug="contador-de-caracteres"
    >
      <CharCounter />
    </ToolPage>
  );
}
