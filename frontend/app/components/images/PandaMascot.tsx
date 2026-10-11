export type PandaMascotProps = {
  className?: string;
};

export function PandaMascot({ className }: PandaMascotProps) {
  return (
    <img
      src="/teupaiaquelepanda_logo_trimmed.png"
      alt="Mascote panda"
      width={333}
      height={344}
      className={`object-contain ${className ?? ""}`}
    />
  );
}
