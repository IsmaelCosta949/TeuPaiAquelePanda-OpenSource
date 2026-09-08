import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { PandaMascot } from "../components/PandaMascot";
import { DOMAINS } from "../lib/addressWords";
import { useMail } from "../lib/MailContext";
import { isReservedLocalPart } from "../lib/reservedLocalParts";
import { buildAppJsonLd, buildPageMeta } from "../lib/seo";

export function meta({}: Route.MetaArgs) {
  return [
    ...buildPageMeta({
      title: "Teu Pai, Aquele Panda — e-mail temporário",
      description:
        "Gere um e-mail temporário em segundos com a proteção de teu pai, aquele panda. Sem cadastro, sem spam guardado.",
      path: "/",
    }),
    buildAppJsonLd(),
  ];
}

const LOCAL_PART_PATTERN = /^[a-z0-9](?:[a-z0-9.-]{1,28}[a-z0-9])?$/;

export default function Home() {
  const { address, setCustomAddress, randomAddress } = useMail();
  const navigate = useNavigate();
  const [customLocal, setCustomLocal] = useState("");
  const [error, setError] = useState<string | null>(null);

  function goToInbox() {
    navigate("/caixa-de-entrada");
  }

  function handleCreateCustom(e: FormEvent) {
    e.preventDefault();
    const slug = customLocal.trim().toLowerCase();
    if (!LOCAL_PART_PATTERN.test(slug)) {
      setError("Use só letras, números, pontos ou hífens (3 a 30 caracteres).");
      return;
    }
    if (isReservedLocalPart(slug)) {
      setError("Esse endereço é reservado e não pode ser usado. Escolha outro.");
      return;
    }
    const ok = setCustomAddress(`${slug}@${DOMAINS[0]}`);
    if (!ok) {
      setError("Esse endereço é reservado e não pode ser usado. Escolha outro.");
      return;
    }
    setError(null);
    goToInbox();
  }

  function handleRandom() {
    randomAddress();
    goToInbox();
  }

  return (
    <section className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
      <div className="space-y-5">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-panda-ink dark:text-panda-paper leading-tight">
          E-mail temporário com a proteção de teu pai, aquele panda
        </h1>
        <p className="text-panda-gray dark:text-white/60 max-w-md">
          Gere um endereço descartável, use onde quiser e deixe o resto com ele.
          Sem cadastro, sem spam guardado, sem enrolação.
        </p>

        {address ? (
          <div className="rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal p-5 space-y-4 shadow-[4px_4px_0_0_var(--color-panda-ink)] dark:shadow-none">
            <p className="text-sm text-panda-gray dark:text-white/60">
              Você já tem um endereço ativo:
            </p>
            <code className="block text-lg font-semibold text-panda-ink dark:text-panda-paper break-all">
              {address}
            </code>
            <button
              onClick={goToInbox}
              className="rounded-full bg-panda-red hover:bg-panda-red-dark text-white text-sm font-semibold px-4 py-2 transition-colors"
            >
              Ir para a caixa de entrada
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal p-5 space-y-5 shadow-[4px_4px_0_0_var(--color-panda-ink)] dark:shadow-none">
            <form onSubmit={handleCreateCustom} className="space-y-2">
              <label
                htmlFor="custom-local"
                className="text-sm font-medium text-panda-ink dark:text-panda-paper"
              >
                Crie o seu endereço
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  id="custom-local"
                  value={customLocal}
                  onChange={(e) => setCustomLocal(e.target.value)}
                  placeholder="seu-nome"
                  className="min-w-0 flex-1 rounded-full border-2 border-panda-ink/20 dark:border-white/20 bg-transparent px-4 py-2 text-sm text-panda-ink dark:text-panda-paper focus:outline-none focus:border-panda-red"
                />
                <span className="text-sm text-panda-gray dark:text-white/50">
                  @{DOMAINS[0]}
                </span>
              </div>
              {error && <p className="text-xs text-panda-red">{error}</p>}
              <button
                type="submit"
                className="rounded-full bg-panda-red hover:bg-panda-red-dark text-white text-sm font-semibold px-4 py-2 transition-colors"
              >
                Criar meu e-mail
              </button>
            </form>

            <div className="flex items-center gap-3 text-xs text-panda-gray dark:text-white/40">
              <span className="h-px flex-1 bg-panda-ink/10 dark:bg-white/10" />
              ou
              <span className="h-px flex-1 bg-panda-ink/10 dark:bg-white/10" />
            </div>

            <button
              onClick={handleRandom}
              className="w-full rounded-full border-2 border-panda-ink dark:border-white/30 text-panda-ink dark:text-panda-paper text-sm font-semibold px-4 py-2 hover:bg-panda-cream dark:hover:bg-white/10 transition-colors"
            >
              🎲 Sortear um endereço pra mim
            </button>
          </div>
        )}
      </div>

      <div className="hidden md:flex justify-center">
        <div className="relative w-80 aspect-333/344 animate-panda-breathe">
          <PandaMascot className="w-full h-full drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
}
