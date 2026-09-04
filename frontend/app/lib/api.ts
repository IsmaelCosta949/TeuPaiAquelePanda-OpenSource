import type { Message } from "./mockMail";

const API_BASE = "https://***REMOVED-WORKER-SUBDOMAIN***";

interface EmailArmazenado {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: number;
}

export async function fetchMessages(address: string): Promise<Message[]> {
  const res = await fetch(
    `${API_BASE}/api/emails?address=${encodeURIComponent(address)}`,
  );
  if (!res.ok) return [];

  const emails: EmailArmazenado[] = await res.json();
  return emails.map((e) => ({
    id: e.id,
    from: e.from,
    fromName: e.fromName,
    subject: e.subject,
    preview: e.preview,
    body: e.body,
    receivedAt: e.receivedAt,
    read: false,
  }));
}
