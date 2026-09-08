import type { PandaMascotProps } from "../types/pandaMascot";

export function PandaMascot({ className }: PandaMascotProps) {
  return (
    <img
      src="/teupaiaquelepanda_logo_trimmed.png"
      alt="Mascote panda"
      className={`object-contain ${className ?? ""}`}
    />
  );
}
