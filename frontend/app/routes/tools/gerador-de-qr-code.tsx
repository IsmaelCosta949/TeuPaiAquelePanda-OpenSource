import type { Route } from "./+types/gerador-de-qr-code";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import QrCodeGenerator from "~/components/qrCodeGenerator";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("gerador-de-qr-code");
}

export default function Page() {
  return (
    <ToolPage
      slug="gerador-de-qr-code"
    >
      <QrCodeGenerator />
    </ToolPage>
  );
}
