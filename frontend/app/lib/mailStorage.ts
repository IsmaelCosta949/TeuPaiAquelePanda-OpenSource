import { isReservedAddress } from "./reservedLocalParts";

type StoredAddress = {
  address: string;
  secondsLeft: number;
};

type StoredReadIds = {
  address: string;
  ids: string[];
};

const STORAGE_ADDRESS_KEY = "panda-mail-address";
const STORAGE_EXPIRES_KEY = "panda-mail-expires-at";
const STORAGE_READ_IDS_KEY = "panda-mail-read-ids";

export function clearStoredAddress() {
  try {
    localStorage.removeItem(STORAGE_ADDRESS_KEY);
    localStorage.removeItem(STORAGE_EXPIRES_KEY);
  } catch {
    console.warn("Failed to clear stored address from localStorage");
  }
}

export function readStoredAddress(): StoredAddress | null {
  try {
    const storedAddress = localStorage.getItem(STORAGE_ADDRESS_KEY);
    const storedExpiresAt = Number(localStorage.getItem(STORAGE_EXPIRES_KEY));
    if (!storedAddress || !storedExpiresAt || storedExpiresAt <= Date.now()) {
      return null;
    }

    if (isReservedAddress(storedAddress)) {
      clearStoredAddress();
      return null;
    }

    return {
      address: storedAddress,
      secondsLeft: Math.ceil((storedExpiresAt - Date.now()) / 1000),
    };
  } catch {
    console.warn("Failed to read stored address from localStorage");
    return null;
  }
}

export function persistAddress(addr: string, expiresAt: number) {
  try {
    localStorage.setItem(STORAGE_ADDRESS_KEY, addr);
    localStorage.setItem(STORAGE_EXPIRES_KEY, String(expiresAt));
  } catch {
    console.warn("Failed to persist address to localStorage");
    return;
  }
}

export function readStoredReadIds(addr: string): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_READ_IDS_KEY);
    if (!raw) return new Set();
    const parsed: StoredReadIds = JSON.parse(raw);
    return parsed.address === addr ? new Set(parsed.ids) : new Set();
  } catch {
    return new Set();
  }
}

export function persistReadIds(addr: string, ids: Set<string>) {
  try {
    localStorage.setItem(
      STORAGE_READ_IDS_KEY,
      JSON.stringify({ address: addr, ids: [...ids] }),
    );
  } catch {
    console.warn("Failed to persist read IDs to localStorage");
  }
}

export function clearStoredReadIds() {
  try {
    localStorage.removeItem(STORAGE_READ_IDS_KEY);
  } catch {
    console.warn("Failed to clear stored read IDs from localStorage");
  }
}
