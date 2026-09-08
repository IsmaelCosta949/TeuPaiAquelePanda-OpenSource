// Local parts that can never be claimed as a custom temp-mail address —
// either because they're a real address we operate (suporte@) or because
// they're common admin/abuse targets worth blocking pre-emptively.
export const RESERVED_LOCAL_PARTS = [
  "suporte",
  "support",
  "admin",
  "administrador",
  "contato",
  "contact",
  "abuse",
  "postmaster",
  "webmaster",
  "hostmaster",
  "root",
  "noreply",
  "no-reply",
  "security",
  "seguranca",
  "privacy",
  "privacidade",
  "legal",
  "termos",
  "info",
];

const RESERVED_SET = new Set(RESERVED_LOCAL_PARTS);

export function extractLocalPart(address: string): string {
  return address.split("@")[0]?.trim().toLowerCase() ?? "";
}

export function isReservedLocalPart(localPart: string): boolean {
  return RESERVED_SET.has(localPart.trim().toLowerCase());
}

export function isReservedAddress(address: string): boolean {
  return isReservedLocalPart(extractLocalPart(address));
}
