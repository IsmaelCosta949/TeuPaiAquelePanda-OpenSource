import type { Route } from "./+types/gerador-de-cartao-de-credito";
import { buildToolMeta } from "~/lib/seo";
import { ToolPage } from "~/components/ToolPage";
import CardGenerator from "~/components/cardGenerator";

export function meta({}: Route.MetaArgs) {
  return buildToolMeta("gerador-de-cartao-de-credito");
}

export default function Page() {
  return (
    <ToolPage
      slug="gerador-de-cartao-de-credito"
      notice="Os números só passam no algoritmo de Luhn: não são cartões reais e não funcionam em compras. Para testar um gateway de pagamento, use também os cartões de teste oficiais dele."
    >
      <CardGenerator />
    </ToolPage>
  );
}
