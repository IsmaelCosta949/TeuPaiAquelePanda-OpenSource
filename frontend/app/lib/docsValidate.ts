import { calcCheckDigit } from "./fakeDocsGenerate";

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

// Mesmo algoritmo (módulo 11) usado em fakeDocsGenerate.ts, só que na
// direção inversa. Sequências de um dígito repetido (111.111.111-11) passam
// na conta, mas a Receita não as emite — por isso são rejeitadas.
export function validateCPF(digits: string): boolean {
  if (!/^\d{11}$/.test(digits) || /^(\d)\1{10}$/.test(digits)) return false;
  const n = Array.from(digits, Number);
  const d1 = calcCheckDigit(n.slice(0, 9), [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calcCheckDigit(n.slice(0, 10), [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);
  return d1 === n[9] && d2 === n[10];
}

export function validateCNPJ(digits: string): boolean {
  if (!/^\d{14}$/.test(digits) || /^(\d)\1{13}$/.test(digits)) return false;
  const n = Array.from(digits, Number);
  const d1 = calcCheckDigit(
    n.slice(0, 12),
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );
  const d2 = calcCheckDigit(
    n.slice(0, 13),
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );
  return d1 === n[12] && d2 === n[13];
}
