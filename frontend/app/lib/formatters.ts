export function formatRG(digits: string): string {
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\w)/, "$1.$2.$3-$4");
}

export function formatCPF(digits: string): string {
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCNPJ(digits: string): string {
  return digits.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5",
  );
}
