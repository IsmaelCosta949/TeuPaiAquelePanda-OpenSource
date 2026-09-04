import { useEffect, useRef, useState } from "react";
import { PandaMascot } from "./PandaMascot";
import { generateAddress, welcomeMessage, type Message } from "../lib/mockMail";
import { fetchMessages } from "../lib/api";

const ADDRESS_LIFETIME_SECONDS = 10 * 60;
const POLL_INTERVAL_MS = 8000;

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TempMailApp() {
  const [address, setAddress] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(ADDRESS_LIFETIME_SECONDS);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function newAddress(withGreeting = true) {
    const addr = generateAddress();
    setAddress(addr);
    setMessages(withGreeting ? [welcomeMessage(addr)] : []);
    setOpenId(null);
    setSecondsLeft(ADDRESS_LIFETIME_SECONDS);
  }

  async function pollMessages(addr: string) {
    const fetched = await fetchMessages(addr).catch(() => []);
    setMessages((prev) => {
      const readIds = new Set(prev.filter((m) => m.read).map((m) => m.id));
      const welcome = prev.find((m) => m.id === "welcome");
      const withReadState = fetched.map((m) => ({
        ...m,
        read: readIds.has(m.id),
      }));
      return welcome ? [welcome, ...withReadState] : withReadState;
    });
  }

  useEffect(() => {
    newAddress();
  }, []);

  useEffect(() => {
    if (!address) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          newAddress();
          return ADDRESS_LIFETIME_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [address]);

  useEffect(() => {
    if (!address) return;
    pollMessages(address);
    const interval = setInterval(() => pollMessages(address), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [address]);

  function handleCopy() {
    if (!address) return;
    navigator.clipboard?.writeText(address).catch(() => {});
    setCopied(true);
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopied(false), 1500);
  }

  function handleNewAddress() {
    if (messages.length > 1) {
      const ok = window.confirm(
        "Trocar de endereço apaga os e-mails atuais. Continuar?",
      );
      if (!ok) return;
    }
    newAddress();
  }

  async function handleRefresh() {
    if (!address) return;
    setRefreshing(true);
    await pollMessages(address);
    setRefreshing(false);
  }

  function toggleOpen(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-panda-ink/10 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PandaMascot className="w-10 h-10 shrink-0" />
            <span className="font-display leading-none">
              <span className="block text-sm sm:text-base font-medium text-panda-ink dark:text-panda-paper">
                Teu Pai,
              </span>
              <span className="block text-lg sm:text-xl font-bold text-panda-red -mt-0.5">
                Aquele Panda
              </span>
            </span>
          </div>
          <p className="hidden sm:block text-sm text-panda-gray dark:text-white/50 font-display">
            e-mail temporário 🐼
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 space-y-10">
        <section className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="space-y-5">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-panda-ink dark:text-panda-paper leading-tight">
              E-mail temporário com a proteção de teu pai, aquele panda
            </h1>
            <p className="text-panda-gray dark:text-white/60 max-w-md">
              Gere um endereço descartável, use onde quiser e deixe o resto
              com ele. Sem cadastro, sem spam guardado, sem enrolação.
            </p>

            <div className="rounded-3xl border-2 border-panda-ink dark:border-white/20 bg-white dark:bg-panda-charcoal p-5 space-y-4 shadow-[4px_4px_0_0_var(--color-panda-ink)] dark:shadow-none">
              <div className="flex items-center justify-between gap-3">
                <code className="text-lg sm:text-xl font-semibold text-panda-ink dark:text-panda-paper break-all">
                  {address ?? "gerando endereço..."}
                </code>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopy}
                  disabled={!address}
                  className="rounded-full bg-panda-red hover:bg-panda-red-dark text-white text-sm font-semibold px-4 py-2 transition-colors disabled:opacity-50"
                >
                  {copied ? "Copiado! ✓" : "Copiar endereço"}
                </button>
                <button
                  onClick={handleNewAddress}
                  className="rounded-full border-2 border-panda-ink dark:border-white/30 text-panda-ink dark:text-panda-paper text-sm font-semibold px-4 py-2 hover:bg-panda-cream dark:hover:bg-white/10 transition-colors"
                >
                  Novo endereço
                </button>
                <span className="ml-auto text-xs font-mono text-panda-gray dark:text-white/40">
                  expira em {formatClock(secondsLeft)}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative w-56 h-56 animate-panda-breathe">
              <PandaMascot className="w-full h-full drop-shadow-lg" />
              <div className="absolute -bottom-2 -right-2 bg-panda-bamboo text-white text-xs font-semibold rounded-full w-9 h-9 flex items-center justify-center border-2 border-white dark:border-panda-ink">
                🎋
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-panda-ink dark:text-panda-paper flex items-center gap-2">
              Caixa de entrada
              {unreadCount > 0 && (
                <span className="text-xs bg-panda-red text-white rounded-full px-2 py-0.5">
                  {unreadCount} nova{unreadCount > 1 ? "s" : ""}
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="text-xs sm:text-sm rounded-full border border-panda-ink/20 dark:border-white/20 text-panda-gray dark:text-white/60 px-3 py-1.5 hover:bg-panda-cream dark:hover:bg-white/10 transition-colors"
              >
                <span className={refreshing ? "inline-block animate-spin" : ""}>
                  ↻
                </span>{" "}
                atualizar
              </button>
            </div>
          </div>

          {messages.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-panda-ink/20 dark:border-white/20 py-16 flex flex-col items-center gap-3 text-center">
              <PandaMascot mood="sleepy" className="w-16 h-16 opacity-70" />
              <p className="text-panda-gray dark:text-white/50 text-sm">
                Nenhum e-mail ainda. O panda tá cochilando esperando sua
                primeira mensagem 💤
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className="rounded-2xl border border-panda-ink/10 dark:border-white/10 bg-white dark:bg-panda-charcoal overflow-hidden"
                >
                  <button
                    onClick={() => toggleOpen(msg.id)}
                    className="w-full text-left px-4 py-3 flex items-center gap-3"
                  >
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        msg.read ? "bg-transparent" : "bg-panda-red"
                      }`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-medium text-panda-ink dark:text-panda-paper truncate">
                          {msg.fromName}
                        </span>
                        <span className="text-xs text-panda-gray dark:text-white/40 shrink-0">
                          {formatTime(msg.receivedAt)}
                        </span>
                      </span>
                      <span className="block text-sm text-panda-gray dark:text-white/60 truncate">
                        {msg.subject}
                      </span>
                    </span>
                  </button>
                  {openId === msg.id && (
                    <div className="animate-panda-pop px-4 pb-4 pt-1 border-t border-panda-ink/10 dark:border-white/10 text-sm text-panda-ink dark:text-white/80 whitespace-pre-line">
                      <p className="text-xs text-panda-gray dark:text-white/40 mb-2">
                        de {msg.fromName} &lt;{msg.from}&gt;
                      </p>
                      {msg.body}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="border-t border-panda-ink/10 dark:border-white/10 py-6">
        <p className="max-w-5xl mx-auto px-4 text-xs text-panda-gray dark:text-white/40 text-center">
          🐼 Teu Pai, Aquele Panda — e-mails recebidos aqui expiram
          automaticamente em 1 hora e depois somem para sempre.
        </p>
      </footer>
    </div>
  );
}
