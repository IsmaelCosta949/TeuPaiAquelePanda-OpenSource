// Números de cartão que apenas passam no algoritmo de Luhn — não são cartões
// reais e não funcionam em compras. Servem para testar máscaras e validações
// de formulário.

export type CardBrand = "visa" | "mastercard" | "amex" | "elo";

export const CARD_BRANDS: Record<
  CardBrand,
  { label: string; prefixes: string[]; length: number; cvvLength: number }
> = {
  visa: { label: "Visa", prefixes: ["4"], length: 16, cvvLength: 3 },
  mastercard: {
    label: "Mastercard",
    prefixes: ["51", "52", "53", "54", "55"],
    length: 16,
    cvvLength: 3,
  },
  amex: { label: "Amex", prefixes: ["34", "37"], length: 15, cvvLength: 4 },
  elo: {
    label: "Elo",
    prefixes: ["636368", "504175", "438935"],
    length: 16,
    cvvLength: 3,
  },
};

function randomDigits(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

function luhnSum(digits: string): number {
  let sum = 0;
  // Percorre da direita para a esquerda dobrando de dois em dois.
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum;
}

export function isLuhnValid(number: string): boolean {
  return /^\d+$/.test(number) && luhnSum(number) % 10 === 0;
}

export type FakeCard = {
  number: string;
  expiry: string;
  cvv: string;
};

export function generateCard(brand: CardBrand): FakeCard {
  const spec = CARD_BRANDS[brand];
  const prefix = spec.prefixes[Math.floor(Math.random() * spec.prefixes.length)];
  const body = prefix + randomDigits(spec.length - prefix.length - 1);
  // Com o dígito verificador ainda como 0, a soma tem o peso certo para
  // calcular o que falta até o próximo múltiplo de 10.
  const check = (10 - (luhnSum(body + "0") % 10)) % 10;

  const now = new Date();
  const month = Math.floor(Math.random() * 12) + 1;
  const year = (now.getFullYear() + 1 + Math.floor(Math.random() * 5)) % 100;

  return {
    number: body + check,
    expiry: `${String(month).padStart(2, "0")}/${String(year).padStart(2, "0")}`,
    cvv: randomDigits(spec.cvvLength),
  };
}

export function formatCardNumber(number: string): string {
  return number.length === 15
    ? number.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3")
    : number.replace(/(\d{4})(?=\d)/g, "$1 ");
}
