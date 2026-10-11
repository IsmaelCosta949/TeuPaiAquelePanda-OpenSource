import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

type CopyableValueProps = {
  value: string;
  className?: string;
};

export function CopyableValue({ value, className }: CopyableValueProps) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );

  function handleCopy() {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Button
      variant="ghost"
      onPress={handleCopy}
      className="h-auto w-full justify-between gap-3 rounded-xl border border-panda-ink/15 bg-panda-cream px-4 py-2.5 text-left font-normal hover:border-panda-red/50 dark:border-white/15 dark:bg-white/5"
    >
      <code
        className={
          className ??
          "text-sm sm:text-base font-mono text-panda-ink dark:text-panda-paper break-all"
        }
      >
        {value}
      </code>
      <span className="text-xs font-semibold text-panda-red dark:text-panda-red-light shrink-0">
        {copied ? "Copiado! ✓" : "Copiar"}
      </span>
    </Button>
  );
}
