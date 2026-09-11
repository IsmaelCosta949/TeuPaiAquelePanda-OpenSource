import { useEffect, useId, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { CHARSETS, generatePassword } from "~/lib/passwordGenerate";

export default function PasswordGenerator() {
  const idPrefix = useId();
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const pool = [
    useLower && CHARSETS.lower,
    useUpper && CHARSETS.upper,
    useDigits && CHARSETS.digits,
    useSymbols && CHARSETS.symbols,
  ]
    .filter((s): s is string => Boolean(s))
    .join("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    setPassword(generatePassword(16, pool));
  }, []);

  function regenerate() {
    if (!pool) return;
    setPassword(generatePassword(length, pool));
  }

  function handleCopy() {
    navigator.clipboard?.writeText(password).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const options: {
    key: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }[] = [
    {
      key: "lower",
      label: "minúsculas",
      checked: useLower,
      onChange: setUseLower,
    },
    {
      key: "upper",
      label: "maiúsculas",
      checked: useUpper,
      onChange: setUseUpper,
    },
    {
      key: "digits",
      label: "números",
      checked: useDigits,
      onChange: setUseDigits,
    },
    {
      key: "symbols",
      label: "símbolos",
      checked: useSymbols,
      onChange: setUseSymbols,
    },
  ];

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        onClick={handleCopy}
        className="h-auto w-full justify-between gap-3 rounded-xl border border-panda-ink/15 bg-panda-cream px-4 py-2.5 text-left font-normal hover:border-panda-red/50 dark:border-white/15 dark:bg-white/5"
      >
        <code className="text-sm sm:text-base font-mono text-panda-ink dark:text-panda-paper break-all">
          {password}
        </code>
        <span className="text-xs font-semibold text-panda-red dark:text-panda-red-light shrink-0">
          {copied ? "Copiado! ✓" : "Copiar"}
        </span>
      </Button>

      <div className="flex items-center gap-3">
        <label
          id={`${idPrefix}-length-label`}
          className="text-xs text-panda-gray dark:text-white/50 shrink-0"
        >
          Tamanho: {length}
        </label>
        <Slider
          min={8}
          max={64}
          value={[length]}
          onValueChange={([value]) => setLength(value)}
          aria-labelledby={`${idPrefix}-length-label`}
          className="**:data-[slot=slider-range]:bg-panda-red **:data-[slot=slider-thumb]:border-panda-red"
        />
      </div>

      <div
        role="group"
        aria-label="Caracteres incluídos na senha"
        className="flex flex-wrap gap-x-4 gap-y-2"
      >
        {options.map((opt) => {
          const id = `${idPrefix}-${opt.key}`;
          return (
            <div key={opt.key} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={opt.checked}
                onCheckedChange={(checked) => opt.onChange(checked === true)}
              />
              <label
                htmlFor={id}
                className="text-xs text-panda-gray dark:text-white/50"
              >
                {opt.label}
              </label>
            </div>
          );
        })}
      </div>

      <Button onClick={regenerate} disabled={!pool}>
        Gerar nova
      </Button>
    </div>
  );
}
