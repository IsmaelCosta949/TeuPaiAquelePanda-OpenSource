import type { Route } from "./+types/gerador-de-cpf";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import DocumentGenerator from "~/components/documentsGenerator";
import { generateCPF } from "~/lib/fakeDocsGenerate";
import { formatCPF } from "~/lib/format";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("gerador-de-cpf");
}

export default function Page() {
  return (
    <ToolPage
      slug="gerador-de-cpf"
      notice="Os números têm dígitos verificadores válidos, mas não pertencem a nenhuma pessoa ou empresa. Use apenas em ambiente de teste, nunca para fraude."
    >
      <DocumentGenerator generate={generateCPF} format={formatCPF} />
    </ToolPage>
  );
}
