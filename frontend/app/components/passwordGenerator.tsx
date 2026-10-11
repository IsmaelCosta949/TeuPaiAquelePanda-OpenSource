import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { CopyableValue } from "./CopyableValue";
import { CHARSETS, generatePassword } from "~/lib/passwordGenerate";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

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
      <CopyableValue value={password} />

      <Slider
        label="Tamanho"
        minValue={8}
        maxValue={64}
        value={length}
        onChange={setLength}
      />

      <div
        role="group"
        aria-label="Caracteres incluídos na senha"
        className="flex flex-wrap gap-x-4 gap-y-2"
      >
        {options.map((opt) => {
          return (
            <Checkbox
              key={opt.key}
              isSelected={opt.checked}
              onChange={opt.onChange}
              className="text-xs text-panda-gray dark:text-white/50"
            >
              {opt.label}
            </Checkbox>
          );
        })}
      </div>

      <Button onPress={regenerate} isDisabled={!pool}>
        Gerar nova
      </Button>
    </div>
  );
}
