import { Link } from "react-router";
import type { Route } from "./+types/privacidade";
import { buildPageMeta } from "../lib/seo";

export function meta({}: Route.MetaArgs) {
  return buildPageMeta({
    title: "Política de privacidade — Teu Pai, Aquele Panda",
    description:
      "Como o Teu Pai, Aquele Panda trata os seus dados: e-mails temporários, armazenamento local, estatísticas de acesso, cookies e anúncios do Google.",
    path: "/privacidade/",
  });
}

const LAST_UPDATE = "19 de outubro de 2026";
const SUPPORT_EMAIL = "suporte@teupaiaquelepanda.com.br";

const headingClass =
  "font-display font-semibold text-panda-ink dark:text-panda-paper mb-1";
const linkClass = "text-panda-red dark:text-panda-red-light font-medium";

export default function Privacidade() {
  return (
    <section className="max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-bold text-panda-ink dark:text-panda-paper">
          Política de privacidade
        </h1>
        <p className="text-xs text-panda-gray dark:text-white/50">
          Última atualização: {LAST_UPDATE}
        </p>
      </div>

      <div className="space-y-4 text-sm text-panda-gray dark:text-white/60">
        <p>
          Esta página explica quais dados o Teu Pai, Aquele Panda trata, por
          que e por quanto tempo, em linha com a Lei Geral de Proteção de
          Dados (LGPD, Lei nº 13.709/2018).
        </p>

        <div>
          <h2 className={headingClass}>1. Ferramentas que rodam no navegador</h2>
          <p>
            Os geradores, validadores, formatadores e conversores funcionam
            inteiramente no seu dispositivo. O texto, os tokens e os números
            que você digita ou gera neles não são enviados para os nossos
            servidores nem guardados por nós.
          </p>
        </div>

        <div>
          <h2 className={headingClass}>2. E-mail temporário</h2>
          <p>
            Para que o e-mail temporário funcione, as mensagens enviadas para
            o seu endereço são recebidas e guardadas na infraestrutura da
            Cloudflare: remetente, assunto, data e conteúdo da mensagem. Elas
            são apagadas automaticamente 1 hora depois da última mensagem
            recebida no endereço, sem cópia de segurança. O serviço não pede
            nome, senha nem nenhum dado de cadastro. Como não há senha, quem
            souber o endereço pode ler as mensagens, por isso não o use para
            receber informações sensíveis.
          </p>
        </div>

        <div>
          <h2 className={headingClass}>3. Armazenamento local</h2>
          <p>
            Guardamos no armazenamento local do seu navegador (localStorage)
            apenas o necessário para o site funcionar: o endereço de e-mail
            temporário ativo e quando ele expira, quais mensagens você já leu,
            o tema claro ou escuro e se você já viu o aviso de novidades. Esses
            dados ficam só no seu dispositivo e podem ser apagados a qualquer
            momento limpando os dados do site no navegador.
          </p>
        </div>

        <div>
          <h2 className={headingClass}>4. Estatísticas de acesso</h2>
          <p>
            Usamos o Cloudflare Web Analytics para saber quantas pessoas
            visitam cada página. Ele não usa cookies e não cria um perfil
            individual dos visitantes. Como todo site, a nossa hospedagem
            também processa dados técnicos, como endereço IP e tipo de
            navegador, para entregar as páginas e proteger o serviço contra
            abusos.
          </p>
        </div>

        <div>
          <h2 className={headingClass}>5. Anúncios e cookies de terceiros</h2>
          <p className="mb-2">
            O site exibe anúncios do Google AdSense, que mantêm as ferramentas
            gratuitas. Sobre esses anúncios:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Fornecedores terceiros, incluindo o Google, usam cookies para
              exibir anúncios com base nas visitas anteriores do usuário a
              este e a outros sites.
            </li>
            <li>
              Os cookies de publicidade permitem que o Google e os parceiros
              dele exibam anúncios com base nas visitas a este site e a
              outros sites na internet.
            </li>
            <li>
              Você pode desativar a publicidade personalizada nas{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Configurações de anúncios do Google
              </a>{" "}
              ou desativar os cookies de outros fornecedores em{" "}
              <a
                href="https://www.aboutads.info/choices"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                aboutads.info
              </a>
              .
            </li>
            <li>
              Saiba mais em{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                como o Google usa informações de sites parceiros
              </a>
              .
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>6. Compartilhamento de dados</h2>
          <p>
            Não vendemos nem compartilhamos dados pessoais. Os únicos
            terceiros envolvidos são os prestadores que fazem o site
            funcionar (Cloudflare, para hospedagem, e-mail e estatísticas) e o
            Google, para os anúncios, cada um com a sua própria política de
            privacidade.
          </p>
        </div>

        <div>
          <h2 className={headingClass}>7. Seus direitos</h2>
          <p>
            Pela LGPD, você pode pedir informações sobre o tratamento dos seus
            dados, correção ou exclusão. Como quase nada fica guardado do
            nosso lado e o que fica expira em 1 hora, na maioria dos casos
            basta esperar a expiração ou limpar os dados do site no
            navegador. Para qualquer pedido, escreva para{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className={headingClass}>8. Mudanças nesta política</h2>
          <p>
            Esta política pode ser atualizada quando o site mudar. A data no
            topo da página indica a última revisão. Veja também os{" "}
            <Link to="/termos" className={linkClass}>
              termos de uso
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
