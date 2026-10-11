import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LabeledValue } from "./LabeledValue";
import {
  formatRelative,
  parseTimestamp,
  toDateTimeLocal,
} from "~/lib/timestamp";

export default function TimestampConverter() {
  const [text, setText] = useState("");
  const ms = parseTimestamp(text);

  // Date.now() só no cliente: no pré-render geraria um valor que não bate na
  // hidratação.
  useEffect(() => {
    setText(String(Math.floor(Date.now() / 1000)));
  }, []);

  function handleDateChange(value: string) {
    const parsed = new Date(value).getTime();
    if (!Number.isNaN(parsed)) setText(String(Math.floor(parsed / 1000)));
  }

  const inputClass =
    "h-auto rounded-lg border-panda-ink/15 bg-panda-cream px-4 py-3 font-mono text-sm text-panda-ink focus-visible:border-panda-red/50 focus-visible:ring-0 dark:border-white/15 dark:bg-white/5 dark:text-panda-paper";

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-1">
          <label
            htmlFor="timestamp-input"
            className="text-xs text-panda-gray dark:text-white/50"
          >
            Timestamp (segundos ou milissegundos)
          </label>
          <Input
            id="timestamp-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            inputMode="numeric"
            aria-invalid={text.trim() !== "" && ms === null}
            className={inputClass}
          />
        </div>
        <Button
          variant="outline"
          onPress={() => setText(String(Math.floor(Date.now() / 1000)))}
        >
          Agora
        </Button>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="timestamp-date"
          className="text-xs text-panda-gray dark:text-white/50"
        >
          Ou escolha uma data e hora (fuso do navegador)
        </label>
        <Input
          id="timestamp-date"
          type="datetime-local"
          step={1}
          value={ms === null ? "" : toDateTimeLocal(ms)}
          onChange={(e) => handleDateChange(e.target.value)}
          className={inputClass}
        />
      </div>

      <div role="status" aria-live="polite">
        {text.trim() !== "" && ms === null && (
          <p className="text-xs font-medium text-panda-red dark:text-panda-red-light">
            Isso não parece um timestamp válido — use só números.
          </p>
        )}
      </div>

      {ms !== null && (
        <div className="grid gap-3 sm:grid-cols-2">
          <LabeledValue label="Segundos" value={String(Math.floor(ms / 1000))} />
          <LabeledValue label="Milissegundos" value={String(ms)} />
          <LabeledValue label="ISO 8601 (UTC)" value={new Date(ms).toISOString()} />
          <LabeledValue label="UTC" value={new Date(ms).toUTCString()} />
          <LabeledValue
            label="Horário local"
            value={new Date(ms).toLocaleString("pt-BR", { timeZoneName: "short" })}
          />
          <LabeledValue label="Relativo" value={formatRelative(ms)} />
        </div>
      )}
    </div>
  );
}
