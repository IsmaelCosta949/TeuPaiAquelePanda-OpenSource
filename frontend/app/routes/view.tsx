import { useEffect } from "react";
import { Link, useParams } from "react-router";
import type { Route } from "./+types/view";
import { EmailBody } from "../components/EmailBody";
import { PandaMascot } from "../components/images/PandaMascot";
import { formatTime } from "../lib/format";
import { useMail } from "../hooks/MailContext";
import { buildPageMeta } from "../lib/seo";
import { buttonVariants } from "../components/ui/button";

export function meta({ params }: Route.MetaArgs) {
  return buildPageMeta({
    title: "E-mail — Teu Pai, Aquele Panda",
    description:
      "Visualização de uma mensagem recebida no seu e-mail temporário.",
    path: `/email/${params.id}`,
    noindex: true,
  });
}

export default function ViewMessage() {
  const { id } = useParams();
  const { ready, getMessage, markRead } = useMail();
  const message = id ? getMessage(id) : undefined;

  useEffect(() => {
    if (message && !message.read) markRead(message.id);
  }, [message?.id]);

  if (!ready) return null;

  if (!message) {
    return (
      <section className="rounded-3xl border border-dashed border-panda-ink/20 dark:border-white/20 px-4 py-12 sm:py-16 flex flex-col items-center gap-4 text-center">
        <PandaMascot className="w-20 aspect-333/344 opacity-70" />
        <p className="text-panda-gray dark:text-white/50 text-sm">
          Esse e-mail não foi encontrado (ou já expirou).
        </p>
        <Link to="/caixa-de-entrada" className={buttonVariants()}>
          Voltar para a caixa de entrada
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <Link
        to="/caixa-de-entrada"
        className="inline-block text-sm text-panda-gray dark:text-white/50 hover:text-panda-red dark:hover:text-panda-red-light transition-colors"
      >
        ← Voltar para a caixa de entrada
      </Link>

      <div className="rounded-3xl border border-panda-ink/10 dark:border-white/10 bg-white dark:bg-panda-charcoal p-4 sm:p-6 space-y-4">
        <div className="min-w-0">
          <h1 className="font-display text-xl font-semibold break-words text-panda-ink dark:text-panda-paper">
            {message.subject}
          </h1>
          <p className="text-xs text-panda-gray dark:text-white/50 mt-1 break-words">
            de {message.fromName} &lt;{message.from}&gt; ·{" "}
            {formatTime(message.receivedAt)}
          </p>
        </div>
        <div className="border-t border-panda-ink/10 dark:border-white/10 pt-4">
          <EmailBody body={message.body} isHtml={message.isHtml} />
        </div>
      </div>
    </section>
  );
}
