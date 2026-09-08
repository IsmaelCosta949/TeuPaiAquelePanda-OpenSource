import type { Route } from "./+types/suporte";
import { buildPageMeta } from "../lib/seo";

export function meta({}: Route.MetaArgs) {
  return buildPageMeta({
    title: "Suporte — Teu Pai, Aquele Panda",
    description:
      "Precisa de ajuda com seu e-mail temporário? Fale com a gente pelo suporte do Teu Pai, Aquele Panda.",
    path: "/suporte/",
  });
}

const SUPPORT_EMAIL = "suporte@teupaiaquelepanda.com.br";

export default function Suporte() {
  return (
    <section className="max-w-2xl space-y-5">
      <h1 className="font-display text-2xl font-bold text-panda-ink dark:text-panda-paper">
        Precisa de ajuda?
      </h1>
      <p className="text-panda-gray dark:text-white/60">
        Se o panda aprontou alguma (endereço não funcionando, e-mail que não
        chegou, ou qualquer outro perrengue), manda uma mensagem pra gente.
      </p>
      <div className="rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal p-5 space-y-3">
        <p className="text-sm text-panda-gray dark:text-white/60">
          Escreva para:
        </p>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-block text-lg font-semibold text-panda-red break-all"
        >
          {SUPPORT_EMAIL}
        </a>
        <p className="text-xs text-panda-gray dark:text-white/40">
          Conta o que aconteceu com o máximo de detalhes possível (endereço
          usado, hora aproximada, o que esperava receber). Respondemos assim
          que o panda acordar da soneca 🐼
        </p>
      </div>
    </section>
  );
}
