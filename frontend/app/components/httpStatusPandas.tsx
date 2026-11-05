import { useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import { OptionButtons } from "./OptionButtons";
import { CopyableValue } from "./CopyableValue";
import { Button } from "./ui/button";
import {
  HTTP_STATUS,
  STATUS_CLASSES,
  statusClass,
  type StatusClass,
} from "~/lib/httpStatus";
import { HTTP_STATUS_DETAILS } from "~/lib/httpStatusDetails";
import { PANDA_PHOTOS } from "~/lib/pandaPhotos";

type Filter = "todos" | StatusClass;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "todos", label: "Todos" },
  ...(Object.keys(STATUS_CLASSES) as StatusClass[]).map((c) => ({
    value: c,
    label: c,
  })),
];

// Remove acentos e caixa para a busca achar "nao entendi" em "não entendi".
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

export default function HttpStatusPandas() {
  const [selected, setSelected] = useState(404);
  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");
  const detailRef = useRef<HTMLElement>(null);

  const current = HTTP_STATUS.find((s) => s.code === selected) ?? HTTP_STATUS[0];
  const credit = PANDA_PHOTOS[current.code];

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return HTTP_STATUS.filter(
      (s) =>
        (filter === "todos" || statusClass(s.code) === filter) &&
        (!q ||
          normalize(
            `${s.code} ${s.name} ${s.panda} ${s.meaning} ${HTTP_STATUS_DETAILS[s.code]?.join(" ") ?? ""}`,
          ).includes(q)),
    );
  }, [filter, query]);

  function select(code: number) {
    setSelected(code);
    // No celular o menu fica acima do painel: leva o usuário até a foto.
    if (window.matchMedia("(max-width: 767px)").matches) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-[260px_minmax(0,1fr)] md:items-start">
      <nav
        aria-label="Status HTTP"
        className="min-w-0 space-y-3 md:sticky md:top-4 md:max-h-[calc(100vh-2rem)] md:overflow-y-auto md:pr-1"
      >
        <Input
          aria-label="Buscar status HTTP"
          placeholder="Buscar (404, teapot, timeout…)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10"
        />
        <OptionButtons
          label="Filtrar por classe"
          options={FILTERS}
          value={filter}
          onChange={setFilter}
        />
        <p
          className="text-xs text-panda-gray dark:text-white/50"
          aria-live="polite"
        >
          {visible.length} de {HTTP_STATUS.length} status
        </p>

        {visible.length === 0 ? (
          <p className="text-sm text-panda-gray dark:text-white/60">
            Nenhum panda encontrado para essa busca.
          </p>
        ) : (
          <ul className="max-h-72 space-y-1 overflow-y-auto md:max-h-none md:overflow-visible">
            {visible.map((s) => {
              const active = s.code === selected;
              return (
                <li key={s.code}>
                  <Button
                    variant="ghost"
                    aria-current={active ? "true" : undefined}
                    onPress={() => select(s.code)}
                    className={`h-auto w-full justify-start gap-2.5 whitespace-normal rounded-xl border-2 p-1.5 text-left ${
                      active
                        ? "border-panda-red bg-panda-cream dark:bg-white/10"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={`/pandas/thumb/${s.code}.webp`}
                      alt=""
                      width={240}
                      height={180}
                      loading="lazy"
                      className="size-11 shrink-0 rounded-lg object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-base font-bold leading-tight">
                        {s.code}
                      </span>
                      <span className="block text-xs leading-tight text-panda-gray dark:text-white/60">
                        {s.name}
                      </span>
                    </span>
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      <section
        ref={detailRef}
        aria-live="polite"
        className="min-w-0 scroll-mt-4 space-y-4 rounded-2xl border border-panda-ink/15 bg-panda-cream p-4 dark:border-white/15 dark:bg-white/5"
      >
        <figure className="space-y-1">
          <img
            key={current.code}
            src={`/pandas/${current.code}.webp`}
            alt={`Panda ilustrando o status HTTP ${current.code} ${current.name}`}
            width={640}
            height={480}
            className="aspect-[4/3] w-full rounded-xl border-2 border-panda-ink object-cover dark:border-white/20"
          />
          {credit && (
            <figcaption className="text-xs text-panda-gray dark:text-white/50">
              Foto: {credit.author} ·{" "}
              <a
                href={credit.source}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-panda-red dark:hover:text-panda-red-light"
              >
                {credit.license}
              </a>
            </figcaption>
          )}
        </figure>
        <div className="space-y-2">
          <p className="text-sm text-panda-gray dark:text-white/60">
            {STATUS_CLASSES[statusClass(current.code)].label}
          </p>
          <h2 className="font-display text-3xl font-bold text-panda-ink dark:text-panda-paper">
            {current.code} {current.name}
          </h2>
          <p className="text-lg italic text-panda-ink dark:text-panda-paper">
            “{current.panda}”
          </p>
          <CopyableValue value={`${current.code} ${current.name}`} />
        </div>
        <div className="space-y-3 border-t border-panda-ink/15 pt-4 dark:border-white/15">
          <h3 className="font-display text-lg font-bold text-panda-ink dark:text-panda-paper">
            Descrição
          </h3>
          {(HTTP_STATUS_DETAILS[current.code] ?? [current.meaning]).map(
            (paragraph, i) => (
              <p key={i} className="text-panda-gray dark:text-white/70">
                {paragraph}
              </p>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
