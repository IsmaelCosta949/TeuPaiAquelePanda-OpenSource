import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";
import { OptionButtons } from "./OptionButtons";
import {
  LOREM_LIMITS,
  generateLorem,
  type LoremUnit,
} from "~/lib/lorem";

const UNIT_OPTIONS: { value: LoremUnit; label: string }[] = [
  { value: "paragraphs", label: "Parágrafos" },
  { value: "sentences", label: "Frases" },
  { value: "words", label: "Palavras" },
];

export default function LoremGenerator() {
  const [unit, setUnit] = useState<LoremUnit>("paragraphs");
  const [count, setCount] = useState(3);
  const [classicStart, setClassicStart] = useState(true);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const max = LOREM_LIMITS[unit];
  const safeCount = Math.min(count, max);

  useEffect(() => {
    setText(generateLorem(unit, safeCount, classicStart));
  }, [unit, safeCount, classicStart]);

  useEffect(
    () => () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    },
    [],
  );

  function handleCopy() {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    copyTimeout.current = setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-4">
      <OptionButtons
        label="Unidade"
        options={UNIT_OPTIONS}
        value={unit}
        onChange={setUnit}
      />

      <Slider
        label="Quantidade"
        minValue={1}
        maxValue={max}
        value={safeCount}
        onChange={setCount}
      />

      <Checkbox
        isSelected={classicStart}
        onChange={setClassicStart}
        className="text-xs text-panda-gray dark:text-white/50"
      >
        Começar com “Lorem ipsum dolor sit amet”
      </Checkbox>

      <Textarea
        readOnly
        value={text}
        aria-label="Texto gerado"
        rows={10}
        className="rounded-lg border-panda-ink/15 bg-panda-cream px-4 py-3 text-sm text-panda-ink focus-visible:border-panda-red/50 focus-visible:ring-0 dark:border-white/15 dark:bg-white/5 dark:text-panda-paper"
      />

      <div className="flex flex-wrap gap-2">
        <Button onPress={handleCopy}>{copied ? "Copiado! ✓" : "Copiar"}</Button>
        <Button
          variant="outline"
          onPress={() => setText(generateLorem(unit, safeCount, classicStart))}
        >
          Gerar de novo
        </Button>
      </div>
    </div>
  );
}
