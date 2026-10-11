import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LabeledValue } from "./LabeledValue";
import { OptionButtons } from "./OptionButtons";
import {
  CARD_BRANDS,
  formatCardNumber,
  generateCard,
  type CardBrand,
  type FakeCard,
} from "~/lib/fakeCard";

const BRAND_OPTIONS = (Object.keys(CARD_BRANDS) as CardBrand[]).map((value) => ({
  value,
  label: CARD_BRANDS[value].label,
}));

export default function CardGenerator() {
  const [brand, setBrand] = useState<CardBrand>("visa");
  const [card, setCard] = useState<FakeCard | null>(null);

  useEffect(() => {
    setCard(generateCard(brand));
  }, [brand]);

  return (
    <div className="space-y-4">
      <OptionButtons
        label="Bandeira"
        options={BRAND_OPTIONS}
        value={brand}
        onChange={setBrand}
      />

      {card && (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <LabeledValue
              label="Número"
              value={formatCardNumber(card.number)}
            />
          </div>
          <LabeledValue label="Validade" value={card.expiry} />
          <LabeledValue label="CVV" value={card.cvv} />
        </div>
      )}

      <Button onPress={() => setCard(generateCard(brand))}>Gerar outro</Button>
    </div>
  );
}
