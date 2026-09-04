type PandaMascotProps = {
  className?: string;
  mood?: "happy" | "sleepy" | "wink";
};

export function PandaMascot({ className, mood = "happy" }: PandaMascotProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Mascote panda"
    >
      {/* ears */}
      <circle cx="46" cy="46" r="26" fill="#1a1a1d" />
      <circle cx="154" cy="46" r="26" fill="#1a1a1d" />

      {/* head */}
      <circle cx="100" cy="108" r="78" fill="#faf9f6" stroke="#1a1a1d" strokeWidth="4" />

      {/* eye patches */}
      <ellipse cx="68" cy="104" rx="24" ry="30" transform="rotate(-18 68 104)" fill="#1a1a1d" />
      <ellipse cx="132" cy="104" rx="24" ry="30" transform="rotate(18 132 104)" fill="#1a1a1d" />

      {/* eyes */}
      {mood === "sleepy" ? (
        <>
          <path d="M58 106 q10 8 20 0" stroke="#faf9f6" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M122 106 q10 8 20 0" stroke="#faf9f6" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="68" cy="106" r="9" fill="#faf9f6" />
          <circle cx="70" cy="108" r="4.5" fill="#1a1a1d" />
          {mood === "wink" ? (
            <path d="M124 106 q8 8 16 0" stroke="#faf9f6" strokeWidth="4" fill="none" strokeLinecap="round" />
          ) : (
            <>
              <circle cx="132" cy="106" r="9" fill="#faf9f6" />
              <circle cx="134" cy="108" r="4.5" fill="#1a1a1d" />
            </>
          )}
        </>
      )}

      {/* blush */}
      <ellipse cx="54" cy="138" rx="10" ry="6" fill="#ef4b3d" opacity="0.35" />
      <ellipse cx="146" cy="138" rx="10" ry="6" fill="#ef4b3d" opacity="0.35" />

      {/* nose + mouth */}
      <ellipse cx="100" cy="128" rx="10" ry="7" fill="#1a1a1d" />
      <path d="M100 135 v8" stroke="#1a1a1d" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 143 q-14 14 -28 4" stroke="#1a1a1d" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M100 143 q14 14 28 4" stroke="#1a1a1d" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
