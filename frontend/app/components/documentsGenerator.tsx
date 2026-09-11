import { useEffect, useId, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface DocGeneratorProps {
  generate: () => string;
  format: (doc: string) => string;
}

export default function DocumentGenerator({ ...props }: DocGeneratorProps) {
  const formattedId = useId();
  const [docs, setDocs] = useState<string[]>([]);
  const [formatted, setFormatted] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    setDocs([props.generate()]);
  }, []);

  function regenerate() {
    setDocs([props.generate()]);
  }

  function handleCopy(value: string, index: number) {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopiedIndex(index);
    setTimeout(
      () => setCopiedIndex((current) => (current === index ? null : current)),
      1500,
    );
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {docs.map((doc, i) => {
          const value = formatted ? props.format(doc) : doc;
          return (
            <li key={i}>
              <Button
                variant="ghost"
                onClick={() => handleCopy(value, i)}
                className="h-auto w-full justify-between gap-3 rounded-xl border border-panda-ink/15 bg-panda-cream px-4 py-2.5 text-left font-normal hover:border-panda-red/50 dark:border-white/15 dark:bg-white/5"
              >
                <code className="text-sm sm:text-base font-mono text-panda-ink dark:text-panda-paper">
                  {value}
                </code>
                <span className="text-xs font-semibold text-panda-red dark:text-panda-red-light shrink-0">
                  {copiedIndex === i ? "Copiado! ✓" : "Copiar"}
                </span>
              </Button>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between gap-3">
        <Button onClick={regenerate}>Gerar novos</Button>
        <div className="flex items-center gap-2">
          <Checkbox
            id={formattedId}
            checked={formatted}
            onCheckedChange={(checked) => setFormatted(checked === true)}
          />
          <label
            htmlFor={formattedId}
            className="text-xs text-panda-gray dark:text-white/50"
          >
            Formatado
          </label>
        </div>
      </div>
    </div>
  );
}
