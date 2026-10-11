import { useState } from "react";
import { Input } from "./ui/input";
import { formatCNPJ, formatCPF } from "~/lib/format";
import { onlyDigits, validateCNPJ, validateCPF } from "~/lib/docsValidate";

type Result =
  | { kind: "empty" }
  | { kind: "incomplete"; length: number }
  | { kind: "result"; type: "CPF" | "CNPJ"; valid: boolean; formatted: string };

function check(input: string): Result {
  const digits = onlyDigits(input);
  if (!digits) return { kind: "empty" };
  if (digits.length === 11) {
    return {
      kind: "result",
      type: "CPF",
      valid: validateCPF(digits),
      formatted: formatCPF(digits),
    };
  }
  if (digits.length === 14) {
    return {
      kind: "result",
      type: "CNPJ",
      valid: validateCNPJ(digits),
      formatted: formatCNPJ(digits),
    };
  }
  return { kind: "incomplete", length: digits.length };
}

export default function CpfCnpjValidator() {
  const [input, setInput] = useState("");
  const result = check(input);

  return (
    <div className="space-y-4">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite um CPF (11 dígitos) ou CNPJ (14 dígitos)"
        aria-label="CPF ou CNPJ para validar"
        inputMode="numeric"
        className="h-auto rounded-lg border-panda-ink/15 bg-panda-cream px-4 py-3 font-mono text-sm text-panda-ink focus-visible:border-panda-red/50 focus-visible:ring-0 dark:border-white/15 dark:bg-white/5 dark:text-panda-paper"
      />

      <div role="status" aria-live="polite" className="min-h-6 text-sm">
        {result.kind === "empty" && (
          <p className="text-panda-gray dark:text-white/50">
            A formatação é opcional: pontos, traço e barra são ignorados.
          </p>
        )}
        {result.kind === "incomplete" && (
          <p className="text-panda-gray dark:text-white/50">
            {result.length} dígitos — um CPF tem 11 e um CNPJ tem 14.
          </p>
        )}
        {result.kind === "result" && (
          <p
            className={
              result.valid
                ? "font-semibold text-green-700 dark:text-green-400"
                : "font-semibold text-panda-red dark:text-panda-red-light"
            }
          >
            {result.valid ? "✓" : "✗"} {result.type} {result.formatted} —{" "}
            {result.valid ? "dígitos verificadores válidos" : "inválido"}
          </p>
        )}
      </div>
    </div>
  );
}
