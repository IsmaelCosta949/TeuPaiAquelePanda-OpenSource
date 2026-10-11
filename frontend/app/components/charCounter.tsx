import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { getTextStats } from "~/lib/textStats";

function formatReading(minutes: number): string {
  if (minutes === 0) return "—";
  if (minutes < 1) return "menos de 1 min";
  return `${Math.ceil(minutes)} min`;
}

export default function CharCounter() {
  const [text, setText] = useState("");
  const stats = getTextStats(text);

  const items = [
    { label: "Caracteres", value: stats.characters },
    { label: "Sem espaços", value: stats.charactersNoSpaces },
    { label: "Palavras", value: stats.words },
    { label: "Linhas", value: stats.lines },
    { label: "Leitura", value: formatReading(stats.readingMinutes) },
  ];

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite ou cole seu texto aqui"
        aria-label="Texto para contar"
        rows={8}
        className="rounded-lg border-panda-ink/15 bg-panda-cream px-4 py-3 text-sm text-panda-ink focus-visible:border-panda-red/50 focus-visible:ring-0 dark:border-white/15 dark:bg-white/5 dark:text-panda-paper"
      />

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-panda-ink/15 bg-panda-cream px-3 py-2 dark:border-white/15 dark:bg-white/5"
          >
            <dt className="text-xs text-panda-gray dark:text-white/50">
              {item.label}
            </dt>
            <dd className="font-display text-lg font-bold text-panda-ink dark:text-panda-paper">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
