import type { Route } from "./+types/base64";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import Base64Tool from "~/components/base64Tool";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("base64");
}

export default function Page() {
  return (
    <ToolPage
      slug="base64"
    >
      <Base64Tool />
    </ToolPage>
  );
}
