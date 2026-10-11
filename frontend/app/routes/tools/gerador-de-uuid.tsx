import type { Route } from "./+types/gerador-de-uuid";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import UuidGenerator from "~/components/uuidGenerator";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("gerador-de-uuid");
}

export default function Page() {
  return (
    <ToolPage
      slug="gerador-de-uuid"
    >
      <UuidGenerator />
    </ToolPage>
  );
}
