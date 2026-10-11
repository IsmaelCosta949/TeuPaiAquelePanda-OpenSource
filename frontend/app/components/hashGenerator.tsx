import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { LabeledValue } from "./LabeledValue";
import { HASH_ALGORITHMS, digestHex, type HashAlgorithm } from "~/lib/hash";

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<Record<HashAlgorithm, string> | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    Promise.all(HASH_ALGORITHMS.map((alg) => digestHex(alg, text))).then(
      (values) => {
        if (cancelled) return;
        setHashes(
          Object.fromEntries(
            HASH_ALGORITHMS.map((alg, i) => [alg, values[i]]),
          ) as Record<HashAlgorithm, string>,
        );
      },
    );
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite ou cole o texto para gerar o hash"
        aria-label="Texto para gerar o hash"
        rows={5}
        className="rounded-lg border-panda-ink/15 bg-panda-cream px-4 py-3 font-mono text-sm text-panda-ink focus-visible:border-panda-red/50 focus-visible:ring-0 dark:border-white/15 dark:bg-white/5 dark:text-panda-paper"
      />

      {hashes && (
        <div className="space-y-3">
          {HASH_ALGORITHMS.map((alg) => (
            <LabeledValue key={alg} label={alg} value={hashes[alg]} />
          ))}
        </div>
      )}
    </div>
  );
}
