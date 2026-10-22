import { getToolContent } from "../lib/toolContent";

// Bloco de texto de cada ferramenta: explicação, passo a passo e FAQ. Fica no
// HTML pré-renderizado (o FAQ usa <details>, que não depende de JavaScript),
// então o Google lê o conteúdo mesmo sem executar a página.
export function ToolContent({ slug }: { slug: string }) {
  const content = getToolContent(slug);
  if (!content) return null;

  return (
    <div className="min-w-0 space-y-8 break-words">
      <section aria-labelledby="sobre" className="space-y-2">
        <h2
          id="sobre"
          className="font-display text-lg font-bold text-panda-ink dark:text-panda-paper"
        >
          Sobre a ferramenta
        </h2>
        <p className="text-sm text-panda-gray dark:text-white/60 max-w-2xl">
          {content.about}
        </p>
      </section>

      <section aria-labelledby="como-usar" className="space-y-2">
        <h2
          id="como-usar"
          className="font-display text-lg font-bold text-panda-ink dark:text-panda-paper"
        >
          Como usar
        </h2>
        <ol className="list-decimal list-inside space-y-1 text-sm text-panda-gray dark:text-white/60">
          {content.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {content.sections.map((section, index) => (
        <section
          key={section.title}
          aria-labelledby={`secao-${index}`}
          className="space-y-2"
        >
          <h2
            id={`secao-${index}`}
            className="font-display text-lg font-bold text-panda-ink dark:text-panda-paper"
          >
            {section.title}
          </h2>
          <div className="space-y-2 text-sm text-panda-gray dark:text-white/60 max-w-2xl">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list && (
              <ul className="list-disc list-inside space-y-1">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section aria-labelledby="perguntas-frequentes" className="space-y-3">
        <h2
          id="perguntas-frequentes"
          className="font-display text-lg font-bold text-panda-ink dark:text-panda-paper"
        >
          Perguntas frequentes
        </h2>
        <div className="space-y-2">
          {content.faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-panda-ink/15 bg-white px-4 py-3 dark:border-white/15 dark:bg-panda-charcoal"
            >
              <summary className="cursor-pointer list-none break-words text-sm font-medium text-panda-ink outline-none focus-visible:ring-3 focus-visible:ring-panda-red/50 rounded-md dark:text-panda-paper [&::-webkit-details-marker]:hidden">
                <span className="mr-2 inline-block transition-transform group-open:rotate-90" aria-hidden="true">
                  ›
                </span>
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-panda-gray dark:text-white/60">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
