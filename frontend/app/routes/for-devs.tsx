import type { Route } from "./+types/for-devs";
import { buildPageMeta } from "../lib/seo";
import { generateCPF, generateCNPJ, generateRG } from "../lib/fakeDocsGenerate";
import DocumentGenerator from "~/components/documentsGenerator";
import PasswordGenerator from "~/components/passwordGenerator";
import JsonFormatter from "~/components/jsonFormatter";
import JwtDecoder from "~/components/jwtDecoder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { formatCNPJ, formatCPF, formatRG } from "~/lib/formatters";

export function meta({}: Route.MetaArgs) {
  return buildPageMeta({
    title:
      "Ferramentas para devs: CPF, CNPJ, RG, senha, JSON e JWT — Teu Pai, Aquele Panda",
    description:
      "Gere CPF, CNPJ e RG fictícios com dígitos verificadores válidos, crie senhas fortes, formate JSON e decodifique tokens JWT — tudo em um só lugar para testar formulários e sistemas em desenvolvimento.",
    path: "/for-devs/",
  });
}

const TOOLS = [
  {
    value: "cpf",
    label: "CPF",
    description: "Número de pessoa física com dígitos verificadores válidos.",
    content: <DocumentGenerator generate={generateCPF} format={formatCPF} />,
  },
  {
    value: "cnpj",
    label: "CNPJ",
    description: "Número de empresa com dígitos verificadores válidos.",
    content: <DocumentGenerator generate={generateCNPJ} format={formatCNPJ} />,
  },
  {
    value: "rg",
    label: "RG",
    description: "Documento de identidade no modelo padrão (IFP-SP).",
    content: <DocumentGenerator generate={generateRG} format={formatRG} />,
  },
  {
    value: "senha",
    label: "Senha forte",
    description: "Senha aleatória com letras, números e símbolos.",
    content: <PasswordGenerator />,
  },
  {
    value: "json",
    label: "Formatador de JSON",
    description: "Cole um JSON e receba de volta formatado e legível.",
    content: <JsonFormatter />,
  },
  {
    value: "jwt",
    label: "Decodificador de JWT",
    description: "Cole um token e veja o header e o payload decodificados.",
    content: <JwtDecoder />,
  },
];

export default function ForDevs() {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-bold text-panda-ink dark:text-panda-paper">
          Kit de ferramentas para devs 🧰
        </h1>
        <p className="text-panda-gray dark:text-white/60">
          Dados fictícios e utilidades rápidas para testar formulários e
          sistemas em desenvolvimento. CPF, CNPJ e RG têm dígitos verificadores
          válidos, mas não pertencem a nenhuma pessoa ou empresa — não use para
          fraude ou qualquer coisa fora de ambiente de teste.
        </p>
      </div>

      <div className="rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal px-5 shadow-[4px_4px_0_0_var(--color-panda-ink)] dark:shadow-none">
        <Accordion type="multiple" defaultValue={["cpf"]}>
          {TOOLS.map((tool) => (
            <AccordionItem
              key={tool.value}
              value={tool.value}
              className="border-panda-ink/10 dark:border-white/10"
            >
              <AccordionTrigger className="hover:no-underline">
                <span className="flex flex-col items-start gap-0.5">
                  <span className="font-display text-base font-bold text-panda-ink dark:text-panda-paper">
                    {tool.label}
                  </span>
                  <span className="text-xs font-normal text-panda-gray dark:text-white/50">
                    {tool.description}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>{tool.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
