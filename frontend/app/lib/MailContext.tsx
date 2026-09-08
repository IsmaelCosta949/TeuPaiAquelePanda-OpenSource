import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { generateAddress, welcomeMessage } from "./mockMail";
import { fetchMessages } from "./api";
import { isReservedAddress } from "./reservedLocalParts";
import type { Message } from "../types/message";
import type {
  MailContextValue,
  StoredAddress,
  StoredReadIds,
} from "../types/mailContext";

const ADDRESS_LIFETIME_SECONDS = 60 * 60;
const POLL_INTERVAL_MS = 10_000;
const MIN_REFRESH_MS = 2000;

const STORAGE_ADDRESS_KEY = "panda-mail-address";
const STORAGE_EXPIRES_KEY = "panda-mail-expires-at";

function clearStoredAddress() {
  try {
    localStorage.removeItem(STORAGE_ADDRESS_KEY);
    localStorage.removeItem(STORAGE_EXPIRES_KEY);
  } catch {
    // ignore
  }
}

function readStoredAddress(): StoredAddress | null {
  try {
    const storedAddress = localStorage.getItem(STORAGE_ADDRESS_KEY);
    const storedExpiresAt = Number(localStorage.getItem(STORAGE_EXPIRES_KEY));
    if (!storedAddress || !storedExpiresAt || storedExpiresAt <= Date.now()) {
      return null;
    }
    // Guards against someone hand-editing localStorage to claim a reserved
    // address (e.g. suporte@...) without going through validation.
    if (isReservedAddress(storedAddress)) {
      clearStoredAddress();
      return null;
    }
    return {
      address: storedAddress,
      secondsLeft: Math.ceil((storedExpiresAt - Date.now()) / 1000),
    };
  } catch {
    return null;
  }
}

function persistAddress(addr: string, expiresAt: number) {
  try {
    localStorage.setItem(STORAGE_ADDRESS_KEY, addr);
    localStorage.setItem(STORAGE_EXPIRES_KEY, String(expiresAt));
  } catch {
    // storage disabled/unavailable — address just won't survive a reload
  }
}

const STORAGE_READ_IDS_KEY = "panda-mail-read-ids";

function readStoredReadIds(addr: string): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_READ_IDS_KEY);
    if (!raw) return new Set();
    const parsed: StoredReadIds = JSON.parse(raw);
    return parsed.address === addr ? new Set(parsed.ids) : new Set();
  } catch {
    return new Set();
  }
}

function persistReadIds(addr: string, ids: Set<string>) {
  try {
    localStorage.setItem(
      STORAGE_READ_IDS_KEY,
      JSON.stringify({ address: addr, ids: [...ids] }),
    );
  } catch {
    // ignore storage failures
  }
}

function clearStoredReadIds() {
  try {
    localStorage.removeItem(STORAGE_READ_IDS_KEY);
  } catch {
    // ignore
  }
}

const MailContext = createContext<MailContextValue | null>(null);

export function MailProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(
    () => readStoredAddress()?.address ?? null,
  );
  const [messages, setMessages] = useState<Message[]>(() => {
    const restored = readStoredAddress();
    if (!restored) return [];
    const readIds = readStoredReadIds(restored.address);
    const welcome = welcomeMessage(restored.address);
    return [{ ...welcome, read: readIds.has(welcome.id) }];
  });
  const [secondsLeft, setSecondsLeft] = useState(
    () => readStoredAddress()?.secondsLeft ?? ADDRESS_LIFETIME_SECONDS,
  );
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiresAtRef = useRef<number | null>(
    (() => {
      const restored = readStoredAddress();
      return restored ? Date.now() + restored.secondsLeft * 1000 : null;
    })(),
  );

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

  // Countdown for address expiry: always running, resynced from the real
  // expiry timestamp (not a naive decrement) so it can't drift.
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

  // New-mail polling: every POLL_INTERVAL_MS while the tab is visible,
  // paused entirely while hidden, and re-synced immediately on return.
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
