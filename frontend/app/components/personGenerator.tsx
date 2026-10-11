import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LabeledValue } from "./LabeledValue";
import { generatePerson, type FakePerson } from "~/lib/fakePerson";

const FIELDS: { key: keyof FakePerson; label: string }[] = [
  { key: "nome", label: "Nome" },
  { key: "cpf", label: "CPF" },
  { key: "email", label: "E-mail" },
  { key: "telefone", label: "Telefone" },
  { key: "nascimento", label: "Data de nascimento" },
  { key: "logradouro", label: "Endereço" },
  { key: "bairro", label: "Bairro" },
  { key: "cidade", label: "Cidade" },
  { key: "uf", label: "UF" },
  { key: "cep", label: "CEP" },
];

export default function PersonGenerator() {
  const [person, setPerson] = useState<FakePerson | null>(null);

  useEffect(() => {
    setPerson(generatePerson());
  }, []);

  return (
    <div className="space-y-4">
      {person && (
        <div className="grid gap-3 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <LabeledValue
              key={field.key}
              label={field.label}
              value={person[field.key]}
            />
          ))}
        </div>
      )}
      <Button onPress={() => setPerson(generatePerson())}>Gerar outra</Button>
    </div>
  );
}
