// Pessoa fictícia para popular formulários. Nada aqui corresponde a uma
// pessoa real; o e-mail usa example.com (domínio reservado pela RFC 2606).
import { generateCPF } from "./fakeDocsGenerate";
import { formatCPF } from "./format";

const FIRST_NAMES = [
  "Ana", "Beatriz", "Camila", "Daniela", "Eduarda", "Fernanda", "Gabriela",
  "Helena", "Isabela", "Juliana", "Larissa", "Mariana", "Natália", "Patrícia",
  "Rafaela", "Sofia", "Tatiane", "Vitória", "Alexandre", "Bruno", "Carlos",
  "Diego", "Eduardo", "Felipe", "Gustavo", "Henrique", "Igor", "João",
  "Leonardo", "Marcelo", "Nicolas", "Otávio", "Pedro", "Rafael", "Thiago",
  "Vinícius",
];

const LAST_NAMES = [
  "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves",
  "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho",
  "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa", "Rocha",
  "Dias", "Nascimento", "Andrade", "Moreira", "Nunes", "Marques", "Machado",
];

const STREETS = [
  "Rua das Flores", "Avenida Brasil", "Rua Sete de Setembro",
  "Rua XV de Novembro", "Avenida Paulista", "Rua da Paz",
  "Rua São João", "Avenida Getúlio Vargas", "Rua dos Bambus",
  "Rua Tiradentes", "Avenida Central", "Rua das Palmeiras",
];

const DISTRICTS = [
  "Centro", "Jardim América", "Vila Nova", "Bela Vista", "Santa Cruz",
  "São José", "Boa Vista", "Parque Industrial",
];

// ddd e início de CEP aproximados de cada capital — suficiente para parecer
// plausível em validações de formato.
const CITIES = [
  { city: "São Paulo", uf: "SP", ddd: "11", cep: "01" },
  { city: "Rio de Janeiro", uf: "RJ", ddd: "21", cep: "20" },
  { city: "Belo Horizonte", uf: "MG", ddd: "31", cep: "30" },
  { city: "Curitiba", uf: "PR", ddd: "41", cep: "80" },
  { city: "Porto Alegre", uf: "RS", ddd: "51", cep: "90" },
  { city: "Salvador", uf: "BA", ddd: "71", cep: "40" },
  { city: "Recife", uf: "PE", ddd: "81", cep: "50" },
  { city: "Fortaleza", uf: "CE", ddd: "85", cep: "60" },
  { city: "Brasília", uf: "DF", ddd: "61", cep: "70" },
  { city: "Goiânia", uf: "GO", ddd: "62", cep: "74" },
];

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function digits(length: number): string {
  return Array.from({ length }, () => randomInt(0, 9)).join("");
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export type FakePerson = {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  nascimento: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export function generatePerson(): FakePerson {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  const second = pick(LAST_NAMES);
  const place = pick(CITIES);

  const birth = new Date();
  birth.setFullYear(birth.getFullYear() - randomInt(18, 70));
  birth.setMonth(randomInt(0, 11), randomInt(1, 28));

  return {
    nome: `${first} ${last} ${second}`,
    cpf: formatCPF(generateCPF()),
    email: `${slugify(first)}.${slugify(last)}${randomInt(10, 99)}@example.com`,
    telefone: `(${place.ddd}) 9${digits(4)}-${digits(4)}`,
    nascimento: birth.toLocaleDateString("pt-BR"),
    cep: `${place.cep}${digits(3)}-${digits(3)}`,
    logradouro: `${pick(STREETS)}, ${randomInt(1, 2500)}`,
    bairro: pick(DISTRICTS),
    cidade: place.city,
    uf: place.uf,
  };
}
