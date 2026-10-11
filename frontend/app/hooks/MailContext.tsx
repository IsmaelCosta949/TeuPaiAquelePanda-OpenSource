import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { generateAddress, welcomeMessage } from "../lib/mockMail";
import { fetchMessages } from "../lib/api";
import { isReservedAddress } from "../lib/reservedLocalParts";
import {
  clearStoredAddress,
  clearStoredReadIds,
  persistAddress,
  persistReadIds,
  readStoredAddress,
  readStoredReadIds,
} from "../lib/mailStorage";
import type { Message } from "../types/mail";

const ADDRESS_LIFETIME_SECONDS = 60 * 60;
const POLL_INTERVAL_MS = 10_000;
const MIN_REFRESH_MS = 2000;

type MailContextValue = {
  /** false até o endereço salvo ser lido do localStorage (só no cliente). */
  ready: boolean;
  address: string | null;
  messages: Message[];
  secondsLeft: number;
  copied: boolean;
  refreshing: boolean;
  randomAddress: () => void;
  setCustomAddress: (fullAddress: string) => boolean;
  clearAddress: () => void;
  handleCopy: () => void;
  handleRefresh: () => Promise<void>;
  markRead: (id: string) => void;
  getMessage: (id: string) => Message | undefined;
};

const MailContext = createContext<MailContextValue | null>(null);

export function MailProvider({ children }: { children: ReactNode }) {
  // O estado começa vazio (igual ao HTML pré-renderizado, que não tem acesso ao
  // localStorage) e o endereço salvo é restaurado num efeito, depois da
  // hidratação. Ler o localStorage direto no useState causava mismatch de
  // hidratação para quem já tinha um endereço ativo.
  const [ready, setReady] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(ADDRESS_LIFETIME_SECONDS);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiresAtRef = useRef<number | null>(null);

  useEffect(() => {
    const restored = readStoredAddress();
    if (restored) {
      const readIds = readStoredReadIds(restored.address);
      const welcome = welcomeMessage(restored.address);
      expiresAtRef.current = Date.now() + restored.secondsLeft * 1000;
      setAddress(restored.address);
      setMessages([{ ...welcome, read: readIds.has(welcome.id) }]);
      setSecondsLeft(restored.secondsLeft);
    }
    setReady(true);
  }, []);

  function activate(addr: string, withGreeting = true) {
    const expiresAt = Date.now() + ADDRESS_LIFETIME_SECONDS * 1000;
    expiresAtRef.current = expiresAt;
    persistAddress(addr, expiresAt);
    persistReadIds(addr, new Set());
    setAddress(addr);
    setMessages(withGreeting ? [welcomeMessage(addr)] : []);
    setSecondsLeft(ADDRESS_LIFETIME_SECONDS);
  }

  function randomAddress() {
    activate(generateAddress());
  }

  function setCustomAddress(fullAddress: string): boolean {
    if (isReservedAddress(fullAddress)) return false;
    activate(fullAddress);
    return true;
  }

  function clearAddress() {
    clearPollTimeout();
    clearStoredAddress();
    clearStoredReadIds();
    expiresAtRef.current = null;
    setAddress(null);
    setMessages([]);
    setSecondsLeft(ADDRESS_LIFETIME_SECONDS);
  }

  async function pollMessages(addr: string) {
    const fetched = await fetchMessages(addr).catch(() => []);
    setMessages((prev) => {
      const readIds = new Set(prev.filter((m) => m.read).map((m) => m.id));
      for (const id of readStoredReadIds(addr)) readIds.add(id);
      const welcome = prev.find((m) => m.id === "welcome");
      const withReadState = fetched.map((m) => ({
        ...m,
        read: readIds.has(m.id),
      }));
      return welcome ? [welcome, ...withReadState] : withReadState;
    });
  }

  function clearPollTimeout() {
    if (pollTimeout.current) {
      clearTimeout(pollTimeout.current);
      pollTimeout.current = null;
    }
  }

  function scheduleNextPoll(addr: string) {
    clearPollTimeout();
    if (document.hidden) return;
    pollTimeout.current = setTimeout(() => {
      pollMessages(addr).then(() => scheduleNextPoll(addr));
    }, POLL_INTERVAL_MS);
  }

  useEffect(() => {
    if (!address) return;

    function syncFromExpiry() {
      const remaining = expiresAtRef.current
        ? Math.max(0, Math.ceil((expiresAtRef.current - Date.now()) / 1000))
        : 0;
      if (remaining <= 0) {
        randomAddress();
      } else {
        setSecondsLeft(remaining);
      }
    }

    const interval = setInterval(syncFromExpiry, 1000);
    return () => clearInterval(interval);
  }, [address]);

  useEffect(() => {
    if (!address) return;
    const addr = address;

    pollMessages(addr).then(() => scheduleNextPoll(addr));

    function handleVisibilityChange() {
      if (document.hidden) {
        clearPollTimeout();
      } else {
        pollMessages(addr).then(() => scheduleNextPoll(addr));
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearPollTimeout();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [address]);

  function handleCopy() {
    if (!address) return;
    navigator.clipboard?.writeText(address).catch(() => {});
    setCopied(true);
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopied(false), 1500);
  }

  async function handleRefresh() {
    if (!address) return;
    setRefreshing(true);
    clearPollTimeout();
    const startedAt = Date.now();
    await pollMessages(address);
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_REFRESH_MS) {
      await new Promise((resolve) =>
        setTimeout(resolve, MIN_REFRESH_MS - elapsed),
      );
    }
    scheduleNextPoll(address);
    setRefreshing(false);
  }

  function markRead(id: string) {
    setMessages((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, read: true } : m));
      if (address) {
        persistReadIds(
          address,
          new Set(next.filter((m) => m.read).map((m) => m.id)),
        );
      }
      return next;
    });
  }

  function getMessage(id: string) {
    return messages.find((m) => m.id === id);
  }

  return (
    <MailContext.Provider
      value={{
        ready,
        address,
        messages,
        secondsLeft,
        copied,
        refreshing,
        randomAddress,
        setCustomAddress,
        clearAddress,
        handleCopy,
        handleRefresh,
        markRead,
        getMessage,
      }}
    >
      {children}
    </MailContext.Provider>
  );
}

export function useMail() {
  const ctx = useContext(MailContext);
  if (!ctx) {
    throw new Error("useMail deve ser usado dentro de um MailProvider");
  }
  return ctx;
}
