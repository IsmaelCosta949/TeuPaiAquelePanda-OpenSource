// Até ~1e11 o valor só faz sentido como segundos (ano 5138); acima disso,
// milissegundos. Cobre o uso normal sem pedir que a pessoa escolha a unidade.
const MS_THRESHOLD = 1e11;

export function parseTimestamp(input: string): number | null {
  const trimmed = input.trim();
  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) return null;
  const value = Number(trimmed);
  const ms = Math.abs(value) < MS_THRESHOLD ? value * 1000 : value;
  const date = new Date(ms);
  return Number.isNaN(date.getTime()) ? null : Math.round(ms);
}

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

export function formatRelative(ms: number, now = Date.now()): string {
  const diffSeconds = Math.round((ms - now) / 1000);
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
  for (const [unit, size] of RELATIVE_UNITS) {
    if (Math.abs(diffSeconds) >= size || unit === "second") {
      return rtf.format(Math.round(diffSeconds / size), unit);
    }
  }
  return "";
}

// Valor no formato esperado por <input type="datetime-local"> (fuso local).
export function toDateTimeLocal(ms: number): string {
  const date = new Date(ms - new Date(ms).getTimezoneOffset() * 60_000);
  return date.toISOString().slice(0, 19);
}
