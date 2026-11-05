import type { CSSProperties } from "react";

// Valores fixos (sem Math.random) para o pré-render e a hidratação saírem iguais.
const SNOWFLAKES = Array.from({ length: 28 }, (_, i) => ({
  x: `${(i * 37 + 5) % 100}%`,
  size: 3 + ((i * 7) % 6),
  duration: 12 + ((i * 5) % 13),
  delay: -((i * 3.7) % 20),
  drift: (i % 2 ? 1 : -1) * (14 + ((i * 11) % 30)),
  opacity: 0.55 + ((i * 13) % 40) / 100,
}));

const LIGHT_COLORS = ["#ef4444", "#facc15", "#22c55e", "#60a5fa", "#f472b6"];
const BULBS = 22;

/** Fio de luzes no topo, com o cabo fazendo uma curva entre as lâmpadas. */
function LightsSvg() {
  return (
    <svg
      viewBox={`0 0 ${BULBS * 50} 56`}
      preserveAspectRatio="none"
      className="block h-full w-full"
    >
      <path
        d={`M0 4 ${Array.from({ length: BULBS }, (_, i) => `Q${i * 50 + 25} 26 ${(i + 1) * 50} 4`).join(" ")}`}
        fill="none"
        stroke="#1f3b32"
        strokeWidth="2"
        className="dark:stroke-white/30"
      />
      {Array.from({ length: BULBS }, (_, i) => {
        const color = LIGHT_COLORS[i % LIGHT_COLORS.length];
        return (
          <g
            key={i}
            className="xmas-light"
            style={
              {
                "--light-color": color,
                animationDelay: `${-(i % 5) * 0.45}s`,
              } as CSSProperties
            }
          >
            <rect x={i * 50 + 21} y="14" width="8" height="6" rx="1" fill="#1f3b32" />
            <ellipse cx={i * 50 + 25} cy="29" rx="7" ry="10" fill={color} />
          </g>
        );
      })}
    </svg>
  );
}

/** Faixa de luzes no topo da página; ocupa espaço próprio e rola com o conteúdo. */
export function ChristmasLights() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none h-9 w-full overflow-hidden sm:h-11"
    >
      <LightsSvg />
    </div>
  );
}

/** Neve decorativa no fundo. Só CSS, sem interação. */
export function ChristmasDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {SNOWFLAKES.map((flake, i) => (
        <span
          key={i}
          className="xmas-snowflake"
          style={
            {
              "--snow-x": flake.x,
              "--snow-size": `${flake.size}px`,
              "--snow-duration": `${flake.duration}s`,
              "--snow-delay": `${flake.delay}s`,
              "--snow-drift": `${flake.drift}px`,
              "--snow-opacity": flake.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
