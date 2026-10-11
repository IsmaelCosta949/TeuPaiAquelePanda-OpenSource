import { useNavigate } from "react-router";
import type { Route } from "./+types/inbox";
import { PandaMascot } from "../components/images/PandaMascot";
import { BambooLoader } from "../components/animations/BambooLoader";
import { EmailAddressBar } from "../components/EmailAddressBar";
import { MessageList } from "../components/MessageList";
import { useMail } from "../hooks/MailContext";
import { buildPageMeta } from "../lib/seo";
import { Button } from "../components/ui/button";

export function meta({}: Route.MetaArgs) {
  return buildPageMeta({
    title: "Caixa de entrada — Teu Pai, Aquele Panda",
    description: "Sua caixa de entrada temporária.",
    path: "/caixa-de-entrada",
    noindex: true,
  });
}

export default function Inbox() {
  const { ready, address, messages, refreshing, handleRefresh } = useMail();
  const navigate = useNavigate();

  if (!ready) return null;

  if (!address) {
    return (
      <section className="rounded-3xl border border-dashed border-panda-ink/20 dark:border-white/20 py-16 flex flex-col items-center gap-4 text-center">
        <PandaMascot className="w-20 aspect-333/344 opacity-70" />
        <p className="text-panda-gray dark:text-white/50 text-sm max-w-sm">
          Você ainda não tem um endereço ativo.
        </p>
        <Button onPress={() => navigate("/email-temporario/")}>Criar um e-mail</Button>
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
          <Button
            variant="outline"
            onPress={handleRefresh}
            isDisabled={refreshing}
            className="h-auto rounded-full border-panda-ink/20 bg-transparent px-3 py-1.5 text-xs font-normal text-panda-gray hover:bg-panda-cream dark:border-white/20 dark:text-white/60 dark:hover:bg-white/10 sm:text-sm"
          >
            <span className={refreshing ? "inline-block animate-spin" : ""}>
              ↻
            </span>{" "}
            atualizar
          </Button>
        </div>

        <div className="relative">
          <MessageList />
          {refreshing && (
            <div
              role="status"
              aria-live="polite"
              className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-panda-paper/85 dark:bg-panda-ink/80 backdrop-blur-sm"
            >
              <BambooLoader label="Buscando novos e-mails..." />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
