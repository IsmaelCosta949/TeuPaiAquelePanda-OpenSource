import type { Route } from "./+types/validador-de-cpf-cnpj";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import CpfCnpjValidator from "~/components/cpfCnpjValidator";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("validador-de-cpf-cnpj");
}

export default function Page() {
  return (
    <ToolPage
      slug="validador-de-cpf-cnpj"
      notice="A validação confere só os dígitos verificadores, localmente no seu navegador. Ela não consulta a Receita Federal nem confirma que o documento existe."
    >
      <CpfCnpjValidator />
    </ToolPage>
  );
}
