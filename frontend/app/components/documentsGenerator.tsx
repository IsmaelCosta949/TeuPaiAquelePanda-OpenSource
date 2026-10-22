import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { CopyableValue } from "./CopyableValue";

interface DocGeneratorProps {
  generate: () => string;
  format: (doc: string) => string;
}

export default function DocumentGenerator({ ...props }: DocGeneratorProps) {
  const [docs, setDocs] = useState<string[]>([]);
  const [formatted, setFormatted] = useState(true);

  useEffect(() => {
    setDocs([props.generate()]);
  }, []);

  function regenerate() {
    setDocs([props.generate()]);
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {docs.map((doc, i) => {
          const value = formatted ? props.format(doc) : doc;
          return (
            <li key={i}>
              <CopyableValue value={value} />
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <Button onPress={regenerate}>Gerar novos</Button>
        <Checkbox
          isSelected={formatted}
          onChange={setFormatted}
          className="text-xs text-panda-gray dark:text-white/50"
        >
          Formatado
        </Checkbox>
      </div>
    </div>
  );
}
