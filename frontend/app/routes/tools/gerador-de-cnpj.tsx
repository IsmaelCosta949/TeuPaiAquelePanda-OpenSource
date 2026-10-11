import type { Route } from "./+types/gerador-de-cnpj";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import DocumentGenerator from "~/components/documentsGenerator";
import { generateCNPJ } from "~/lib/fakeDocsGenerate";
import { formatCNPJ } from "~/lib/format";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("gerador-de-cnpj");
}

export default function Page() {
  return (
    <ToolPage
      slug="gerador-de-cnpj"
      notice="Os números têm dígitos verificadores válidos, mas não pertencem a nenhuma pessoa ou empresa. Use apenas em ambiente de teste, nunca para fraude."
    >
      <DocumentGenerator generate={generateCNPJ} format={formatCNPJ} />
    </ToolPage>
  );
}
