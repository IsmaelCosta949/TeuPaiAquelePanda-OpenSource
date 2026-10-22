import { Link } from "react-router";
import type { Route } from "./+types/sobre";
import { buildPageMeta } from "../lib/seo";
import { TOOLS } from "../lib/tools";

export function meta({}: Route.MetaArgs) {
  return buildPageMeta({
    title: "Sobre — Teu Pai, Aquele Panda",
    description:
      "Quem faz o Teu Pai, Aquele Panda, por que o projeto existe e como funcionam o e-mail temporário e as ferramentas para devs e QAs.",
    path: "/sobre/",
  });
}

const headingClass =
  "font-display font-semibold text-panda-ink dark:text-panda-paper mb-1";
const linkClass = "text-panda-red dark:text-panda-red-light font-medium";

export default function Sobre() {
  return (
    <section className="max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-panda-ink dark:text-panda-paper">
        Sobre o Teu Pai, Aquele Panda
      </h1>

      <div className="space-y-5 text-sm text-panda-gray dark:text-white/60">
        <p>
          O Teu Pai, Aquele Panda nasceu de uma necessidade bem comum de quem
          desenvolve e testa software no Brasil: precisar de um e-mail
          descartável para testar um cadastro, de um CPF válido para passar
          numa máscara de formulário ou de um jeito rápido de ler um token
          JWT, sem cair em sites lotados de pop-ups ou que pedem login para
          tudo.
        </p>
        <p>
          A ideia é simples: reunir, em um só lugar, ferramentas pequenas e
          confiáveis, explicadas em português e que respeitam a sua
          privacidade. O panda é o pai protetor que segura o spam e os
          formulários chatos por você.
        </p>

        <div>
          <h2 className={headingClass}>O que você encontra aqui</h2>
          <p>
            Hoje são {TOOLS.length} ferramentas gratuitas, organizadas em
            quatro grupos: e-mail temporário; geradores e validadores de dados
            de teste (CPF, CNPJ, RG, pessoa fictícia e cartão de teste);
            utilidades para desenvolvimento (senha, JSON, JWT, UUID, Base64,
            timestamp, hash e QR Code); e ferramentas de texto. Cada página
            explica o que a ferramenta faz, como usar e os conceitos por trás
            dela, como o cálculo dos dígitos verificadores ou o formato de um
            token.
          </p>
        </div>

        <div>
          <h2 className={headingClass}>Privacidade em primeiro lugar</h2>
          <p>
            Com exceção do e-mail temporário, todas as ferramentas rodam
            inteiramente no seu navegador: o que você digita não é enviado
            para nenhum servidor. As mensagens recebidas pelo e-mail
            temporário ficam guardadas por no máximo 1 hora e depois são
            apagadas automaticamente. Os detalhes estão na{" "}
            <Link to="/privacidade" className={linkClass}>
              política de privacidade
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className={headingClass}>Uso responsável</h2>
          <p>
            Os documentos e cartões gerados aqui são fictícios e servem para
            testar sistemas, nunca para fraudar cadastros ou se passar por
            outra pessoa. O e-mail temporário é para o que é descartável, não
            para contas importantes. As regras completas estão nos{" "}
            <Link to="/termos" className={linkClass}>
              termos de uso
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className={headingClass}>Código aberto e mantido por gente</h2>
          <p>
            O projeto é mantido de forma independente e tem o código aberto.
            Ele se sustenta com anúncios exibidos nas páginas, o que permite
            manter todas as ferramentas gratuitas e sem cadastro. Encontrou um
            erro, tem uma sugestão de ferramenta ou alguma informação está
            desatualizada? Fale com a gente pela{" "}
            <Link to="/suporte" className={linkClass}>
              página de suporte
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
