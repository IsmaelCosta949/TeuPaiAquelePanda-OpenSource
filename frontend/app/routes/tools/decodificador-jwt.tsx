import type { Route } from "./+types/decodificador-jwt";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import JwtDecoder from "~/components/jwtDecoder";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("decodificador-jwt");
}

export default function Page() {
  return (
    <ToolPage
      slug="decodificador-jwt"
    >
      <JwtDecoder />
    </ToolPage>
  );
}
