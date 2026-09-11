import { useId, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function JsonFormatter() {
  const errorId = useId();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "JSON inválido");
      setOutput("");
    }
  }

  function handleCopy() {
    if (!output) return;
    navigator.clipboard?.writeText(output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Cole seu JSON aqui, ex: {"nome":"panda","idade":3}'
        aria-label="JSON para formatar"
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        rows={6}
        className="rounded-lg border-panda-ink/15 bg-panda-cream px-4 py-3 font-mono text-sm text-panda-ink focus-visible:border-panda-red/50 focus-visible:ring-0 dark:border-white/15 dark:bg-white/5 dark:text-panda-paper"
      />

      <Button onClick={format}>Formatar</Button>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-panda-red dark:text-panda-red-light font-medium break-all"
        >
          {error}
        </p>
      )}

      {output && (
        <div className="relative">
          <pre className="w-full max-h-96 overflow-auto rounded-lg border border-panda-ink/15 dark:border-white/15 bg-panda-cream dark:bg-white/5 px-4 py-3 text-sm font-mono text-panda-ink dark:text-panda-paper whitespace-pre-wrap break-all">
            {output}
          </pre>
          <Button
            onClick={handleCopy}
            size="sm"
            className="absolute top-2 right-2 rounded-full"
          >
            {copied ? "Copiado! ✓" : "Copiar"}
          </Button>
        </div>
      )}
    </div>
  );
}
