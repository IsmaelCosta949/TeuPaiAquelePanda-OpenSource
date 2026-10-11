import type { Route } from "./+types/gerador-de-pessoa";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import PersonGenerator from "~/components/personGenerator";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("gerador-de-pessoa");
}

export default function Page() {
  return (
    <ToolPage
      slug="gerador-de-pessoa"
      notice="Todos os dados são fictícios e aleatórios; o CPF tem dígitos verificadores válidos, mas não pertence a ninguém. Use apenas em ambiente de teste."
    >
      <PersonGenerator />
    </ToolPage>
  );
}
