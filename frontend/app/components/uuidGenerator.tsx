import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { CopyableValue } from "./CopyableValue";

function generate(count: number): string[] {
  return Array.from({ length: count }, () => crypto.randomUUID());
}

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  // crypto.randomUUID() fora do efeito geraria valores diferentes no
  // pré-render e na hidratação.
  useEffect(() => {
    setUuids(generate(1));
  }, []);

  function regenerate() {
    setUuids(generate(count));
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {uuids.map((uuid, i) => (
          <li key={`${i}-${uuid}`}>
            <CopyableValue value={uuid} />
          </li>
        ))}
      </ul>

      <Slider
        label="Quantidade"
        minValue={1}
        maxValue={20}
        value={count}
        onChange={setCount}
      />

      <Button onPress={regenerate}>Gerar novos</Button>
    </div>
  );
}
