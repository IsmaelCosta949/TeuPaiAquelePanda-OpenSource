import type { Message } from "./message";

export type MailContextValue = {
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

export type StoredAddress = {
  address: string;
  secondsLeft: number;
};

export type StoredReadIds = {
  address: string;
  ids: string[];
};
