import { useId, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CopyableValue } from "./CopyableValue";
import { decodeBase64, encodeBase64 } from "~/lib/base64";

export default function Base64Tool() {
  const errorId = useId();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function run(mode: "encode" | "decode") {
    try {
      setOutput(mode === "encode" ? encodeBase64(input) : decodeBase64(input));
      setError(null);
    } catch {
      setOutput("");
      setError(
        mode === "decode"
          ? "Isso não parece um Base64 válido (ou não é texto UTF-8)."
          : "Não foi possível codificar esse texto.",
      );
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Cole aqui o texto ou o Base64"
        aria-label="Texto ou Base64"
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        rows={6}
        className="rounded-lg border-panda-ink/15 bg-panda-cream px-4 py-3 font-mono text-sm text-panda-ink focus-visible:border-panda-red/50 focus-visible:ring-0 dark:border-white/15 dark:bg-white/5 dark:text-panda-paper"
      />

      <div className="flex flex-wrap gap-2">
        <Button onPress={() => run("encode")}>Codificar</Button>
        <Button variant="outline" onPress={() => run("decode")}>
          Decodificar
        </Button>
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-panda-red dark:text-panda-red-light font-medium"
        >
          {error}
        </p>
      )}

      {output && <CopyableValue value={output} />}
    </div>
  );
}
