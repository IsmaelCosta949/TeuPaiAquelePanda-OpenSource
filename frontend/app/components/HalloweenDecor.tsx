const BATS = [
  { top: "6%", scale: 1, duration: 28, delay: 0 },
  { top: "18%", scale: 0.7, duration: 36, delay: -12 },
  { top: "32%", scale: 0.85, duration: 31, delay: -22 },
];

/** Teia de aranha desenhada no canto superior esquerdo; as outras são espelhadas. */
function Cobweb({ className }: { className: string }) {
  const radials = [0, 18, 36, 54, 72, 90];
  const rings = [30, 58, 88, 120, 156];
  const pt = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return [r * Math.cos(a), r * Math.sin(a)] as const;
  };
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className={`cobweb ${className}`}
    >
      {radials.map((deg) => {
        const [x, y] = pt(deg, 160);
        return <line key={deg} x1="0" y1="0" x2={x} y2={y} />;
      })}
      {rings.map((r) => {
        let d = "";
        for (let i = 0; i < radials.length; i++) {
          const [x, y] = pt(radials[i], r);
          if (i === 0) d += `M${x} ${y}`;
          else {
            const [cx, cy] = pt((radials[i] + radials[i - 1]) / 2, r * 0.86);
            d += ` Q${cx} ${cy} ${x} ${y}`;
          }
        }
        return <path key={r} d={d} />;
      })}
      <circle cx="120" cy="108" r="2.2" fill="currentColor" />
      <line x1="120" y1="108" x2="120" y2="100" />
    </svg>
  );
}

/** Morcegos decorativos voando pelo fundo. Só CSS, sem interação. */
export function HalloweenDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <Cobweb className="top-0 left-0 w-32 sm:w-48" />
      <Cobweb className="top-0 right-0 w-32 -scale-x-100 sm:w-48" />
      <Cobweb className="bottom-0 left-0 hidden w-36 -scale-y-100 sm:block" />
      <Cobweb className="right-0 bottom-0 hidden w-36 scale-[-1] sm:block" />
      {BATS.map((bat, i) => (
        <div
          key={i}
          className="halloween-bat text-2xl opacity-60 dark:opacity-70"
          style={
            {
              top: bat.top,
              "--bat-scale": bat.scale,
              "--bat-duration": `${bat.duration}s`,
              "--bat-delay": `${bat.delay}s`,
            } as React.CSSProperties
          }
        >
          <span>🦇</span>
        </div>
      ))}
    </div>
  );
}
