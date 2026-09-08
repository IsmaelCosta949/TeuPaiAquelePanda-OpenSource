import type { Route } from "./+types/terms";
import { buildPageMeta } from "../lib/seo";

export function meta({}: Route.MetaArgs) {
  return buildPageMeta({
    title: "Termos de uso — Teu Pai, Aquele Panda",
    description:
      "Termos de uso do Teu Pai, Aquele Panda: como funciona o e-mail temporário, expiração automática e uso aceitável.",
    path: "/termos/",
  });
}

export default function Terms() {
  return (
    <section className="max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-panda-ink dark:text-panda-paper">
        Termos de uso
      </h1>

      <div className="space-y-4 text-sm text-panda-gray dark:text-white/60">
        <p>
          Ao usar o Teu Pai, Aquele Panda, você concorda com os termos
          abaixo. Se não concordar, é só não usar — sem ressentimentos.
        </p>

        <div>
          <h2 className="font-display font-semibold text-panda-ink dark:text-panda-paper mb-1">
            1. O que é o serviço
          </h2>
          <p>
            Geramos endereços de e-mail temporários e descartáveis para você
            usar em cadastros, testes ou qualquer lugar que não mereça seu
            e-mail de verdade.
          </p>
        </div>

        <div>
          <h2 className="font-display font-semibold text-panda-ink dark:text-panda-paper mb-1">
            2. Expiração automática
          </h2>
          <p>
            Endereços e mensagens expiram automaticamente após um curto
            período de tempo e são apagados. Não guardamos histórico depois
            disso — nem a gente consegue recuperar.
          </p>
        </div>

        <div>
          <h2 className="font-display font-semibold text-panda-ink dark:text-panda-paper mb-1">
            3. Uso aceitável
          </h2>
          <p>
            Proibido usar o serviço para atividades ilegais, fraude, abuso,
            spam ou qualquer coisa que prejudique terceiros. Endereços usados
            para essas finalidades podem ser bloqueados sem aviso prévio.
          </p>
        </div>

        <div>
          <h2 className="font-display font-semibold text-panda-ink dark:text-panda-paper mb-1">
            4. Sem garantias
          </h2>
          <p>
            O serviço é oferecido "como está", sem garantia de entrega,
            disponibilidade contínua ou retenção de mensagens. Não use este
            serviço para nada crítico ou sensível.
          </p>
        </div>

        <div>
          <h2 className="font-display font-semibold text-panda-ink dark:text-panda-paper mb-1">
            5. Mudanças nestes termos
          </h2>
          <p>
            Podemos atualizar estes termos a qualquer momento. O uso
            continuado do serviço depois de uma mudança significa que você
            aceitou os novos termos.
          </p>
        </div>

        <div>
          <h2 className="font-display font-semibold text-panda-ink dark:text-panda-paper mb-1">
            6. Contato
          </h2>
          <p>
            Dúvidas sobre estes termos? Manda um e-mail pra gente na{" "}
            <a href="/suporte" className="text-panda-red font-medium">
              página de suporte
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
