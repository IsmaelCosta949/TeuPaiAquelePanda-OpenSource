export type BambooLoaderProps = {
  label?: string;
  className?: string;
};

export function BambooLoader({ label, className }: BambooLoaderProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 60 100"
        className="w-10 h-16 animate-bamboo-grow"
        role="img"
        aria-label="Carregando"
      >
        <rect
          x="22"
          y="62"
          width="16"
          height="38"
          rx="6"
          fill="var(--color-panda-bamboo)"
        />
        <rect
          x="22"
          y="32"
          width="16"
          height="34"
          rx="6"
          fill="var(--color-panda-bamboo-dark)"
        />
        <rect
          x="22"
          y="4"
          width="16"
          height="32"
          rx="6"
          fill="var(--color-panda-bamboo)"
        />
        <rect
          x="20"
          y="60"
          width="20"
          height="4"
          rx="2"
          fill="var(--color-panda-ink)"
          opacity="0.15"
        />
        <rect
          x="20"
          y="30"
          width="20"
          height="4"
          rx="2"
          fill="var(--color-panda-ink)"
          opacity="0.15"
        />
        <path
          className="animate-bamboo-leaf"
          d="M22 18 q-18 -6 -22 8 q16 4 22 -8"
          fill="var(--color-panda-bamboo)"
        />
        <path
          className="animate-bamboo-leaf"
          d="M38 10 q18 -6 22 6 q-16 6 -22 -6"
          fill="var(--color-panda-bamboo)"
        />
      </svg>
      {label && (
        <p className="text-xs text-panda-gray dark:text-white/50">{label}</p>
      )}
    </div>
  );
}
