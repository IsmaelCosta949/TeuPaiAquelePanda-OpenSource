// Geração de CPF/CNPJ ficticios com dígitos verificadores matematicamente
// válidos (mesmo algoritmo da Receita Federal), para uso em testes de forms,
// QA e ambientes de dev — não correspondem a documentos reais.

function randomDigit(): number {
  return Math.floor(Math.random() * 10);
}

function calcCheckDigit(digits: number[], weights: number[]): number {
  const sum = digits.reduce((acc, d, i) => acc + d * weights[i], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function generateCPF(): string {
  let base: number[];
  do {
    base = Array.from({ length: 9 }, randomDigit);
  } while (base.every((d) => d === base[0]));

  const d1 = calcCheckDigit(base, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calcCheckDigit([...base, d1], [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]);

  return [...base, d1, d2].join("");
}

export function generateCNPJ(): string {
  const base = Array.from({ length: 8 }, randomDigit);
  const branch = [0, 0, 0, 1];

  const d1 = calcCheckDigit(
    [...base, ...branch],
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );
  const d2 = calcCheckDigit(
    [...base, ...branch, d1],
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );

  return [...base, ...branch, d1, d2].join("");
}

// RG não tem dígito verificador padronizado nacionalmente (cada estado emite
// o seu) — usamos o modelo do IFP-SP, referência mais comum em validações
// desse tipo, com 8 dígitos + 1 dígito/"X" verificador (mod 11).
export function generateRG(): string {
  const base = Array.from({ length: 8 }, randomDigit);
  const sum = base.reduce((acc, d, i) => acc + d * (2 + i), 0);
  const remainder = sum % 11;
  const check = remainder === 10 ? "X" : String(remainder);

  return base.join("") + check;
}
