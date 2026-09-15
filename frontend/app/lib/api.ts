import type { Message } from "~/types/mail";

interface StoredEmail {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  preview: string;
  body: string;
  isHtml: boolean;
  receivedAt: number;
}

const API_BASE = import.meta.env.VITE_API_BASE;

export async function fetchMessages(address: string): Promise<Message[]> {
  const res = await fetch(
    `${API_BASE}/api/emails?address=${encodeURIComponent(address)}`,
  );
  if (!res.ok) return [];

  const emails: StoredEmail[] = await res.json();
  return emails.map((e) => ({
    id: e.id,
    from: e.from,
    fromName: e.fromName,
    subject: e.subject,
    preview: e.preview,
    body: e.body,
    isHtml: e.isHtml,
    receivedAt: e.receivedAt,
    read: false,
  }));
}
