export type Message = {
  id: string;
  from: string;
  fromName: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: number;
  read: boolean;
};

const DOMAINS = ["teupaiaquelepanda.com.br"];

const ADJECTIVES = [
  "fofo",
  "preguicoso",
  "danado",
  "sortudo",
  "veloz",
  "zen",
  "travesso",
  "esperto",
];

const NOUNS = [
  "panda",
  "bambu",
  "urso",
  "pata",
  "trovao",
  "nuvem",
  "capitao",
  "chefe",
];

function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateAddress(): string {
  const local = `${randomFrom(ADJECTIVES)}.${randomFrom(NOUNS)}${Math.floor(
    Math.random() * 900 + 100,
  )}`;
  const domain = randomFrom(DOMAINS);
  return `${local}@${domain}`;
}

export function welcomeMessage(address: string): Message {
  return {
    id: "welcome",
    from: "papai@teupai.com",
    fromName: "Teu Pai, Aquele Panda 🐼",
    subject: "Bem-vindo(a), seu endereço já tá de pé!",
    preview: `Seu endereço ${address} já está pronto para receber e-mails.`,
    body: `E aí!\n\nSou eu, teu pai, aquele panda. Seu endereço ${address} está ativo e vai autodestruir quando o tempo acabar — igual bambu que some rapidinho.\n\nUse pra cadastros, testes e qualquer lugar que você não quer dar seu e-mail de verdade. Nada fica salvo, nada é rastreado.\n\nQualquer e-mail que chegar aqui aparece na caixa de entrada em tempo real.\n\nCom carinho (e uma preguicinha),\nTeu Pai`,
    receivedAt: Date.now(),
    read: false,
  };
}

