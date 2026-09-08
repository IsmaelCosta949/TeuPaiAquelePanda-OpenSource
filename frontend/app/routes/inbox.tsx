import { useNavigate } from "react-router";
import type { Route } from "./+types/inbox";
import { PandaMascot } from "../components/PandaMascot";
import { BambooLoader } from "../components/BambooLoader";
import { EmailAddressBar } from "../components/EmailAddressBar";
import { MessageList } from "../components/MessageList";
import { useMail } from "../lib/MailContext";
import { buildPageMeta } from "../lib/seo";

export function meta({}: Route.MetaArgs) {
  return buildPageMeta({
    title: "Caixa de entrada — Teu Pai, Aquele Panda",
    description: "Sua caixa de entrada temporária.",
    path: "/caixa-de-entrada",
    noindex: true,
  });
}

export default function Inbox() {
  const { address, messages, refreshing, handleRefresh } = useMail();
  const navigate = useNavigate();

  if (!address) {
    return (
      <section className="rounded-3xl border border-dashed border-panda-ink/20 dark:border-white/20 py-16 flex flex-col items-center gap-4 text-center">
        <PandaMascot className="w-20 aspect-333/344 opacity-70" />
        <p className="text-panda-gray dark:text-white/50 text-sm max-w-sm">
          Você ainda não tem um endereço ativo.
        </p>
        <button
          onClick={() => navigate("/")}
          className="rounded-full bg-panda-red hover:bg-panda-red-dark text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          Criar um e-mail
        </button>
      </section>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      <EmailAddressBar />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold text-panda-ink dark:text-panda-paper flex items-center gap-2">
            Caixa de entrada
            {unreadCount > 0 && (
              <span className="text-xs bg-panda-red text-white rounded-full px-2 py-0.5">
                {unreadCount} nova{unreadCount > 1 ? "s" : ""}
              </span>
            )}
          </h1>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-xs sm:text-sm rounded-full border border-panda-ink/20 dark:border-white/20 text-panda-gray dark:text-white/60 px-3 py-1.5 hover:bg-panda-cream dark:hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <span className={refreshing ? "inline-block animate-spin" : ""}>
              ↻
            </span>{" "}
            atualizar
          </button>
        </div>

        <div className="relative">
          <MessageList />
          {refreshing && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-panda-paper/85 dark:bg-panda-ink/80 backdrop-blur-sm">
              <BambooLoader label="Buscando novos e-mails..." />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
