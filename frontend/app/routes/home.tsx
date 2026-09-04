import type { Route } from "./+types/home";
import { TempMailApp } from "../components/TempMailApp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Teu Pai, Aquele Panda — e-mail temporário" },
    {
      name: "description",
      content:
        "Gere um e-mail temporário em segundos com a proteção de teu pai, aquele panda. Sem cadastro, sem spam guardado.",
    },
  ];
}

export default function Home() {
  return <TempMailApp />;
}
