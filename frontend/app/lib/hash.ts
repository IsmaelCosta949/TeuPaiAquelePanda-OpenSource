export const HASH_ALGORITHMS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
export type HashAlgorithm = (typeof HASH_ALGORITHMS)[number];

export async function digestHex(
  algorithm: HashAlgorithm,
  text: string,
): Promise<string> {
  const buffer = await crypto.subtle.digest(
    algorithm,
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(buffer), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}
