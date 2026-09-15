import type { Message } from "~/types/mail";
import { ADJECTIVES, DOMAINS, NOUNS } from "./addressWords";

function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateAddress(): string {
  const local = `${randomFrom(ADJECTIVES)}.${randomFrom(NOUNS)}${Math.floor(
    Math.random() * 9000 + 1000,
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
    isHtml: false,
    receivedAt: Date.now(),
    read: false,
  };
}
