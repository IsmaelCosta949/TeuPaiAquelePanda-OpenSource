import type { Route } from "./+types/gerador-de-rg";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import DocumentGenerator from "~/components/documentsGenerator";
import { generateRG } from "~/lib/fakeDocsGenerate";
import { formatRG } from "~/lib/format";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("gerador-de-rg");
}

export default function Page() {
  return (
    <ToolPage
      slug="gerador-de-rg"
      notice="Os números têm dígitos verificadores válidos, mas não pertencem a nenhuma pessoa ou empresa. Use apenas em ambiente de teste, nunca para fraude."
    >
      <DocumentGenerator generate={generateRG} format={formatRG} />
    </ToolPage>
  );
}
