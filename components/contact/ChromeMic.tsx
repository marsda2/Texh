import { useId } from "react";

/**
 * Chrome studio microphone. The lime glow follows `--lvl` (0–1), which the
 * recorder updates on the wrapper while you speak.
 */
export function ChromeMic({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const chrome = `chrome-${id}`;
  const chromeDark = `chromeDark-${id}`;
  const mesh = `mesh-${id}`;
  const capsule = `capsule-${id}`;

  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* Floor glow, brighter when you talk */}
      <div
        className="absolute bottom-[2%] left-1/2 h-[16%] w-[70%] -translate-x-1/2 rounded-[50%] bg-lime blur-[18px] transition-opacity duration-150"
        style={{ opacity: "calc(0.28 + var(--lvl, 0) * 0.7)" }}
      />
      <svg viewBox="0 0 200 240" className="relative h-full w-full overflow-visible">
        <defs>
          <linearGradient id={chrome} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#5d5d5a" />
            <stop offset="0.18" stopColor="#f4f4f1" />
            <stop offset="0.38" stopColor="#8b8b87" />
            <stop offset="0.55" stopColor="#2a2a28" />
            <stop offset="0.72" stopColor="#d9d9d4" />
            <stop offset="0.9" stopColor="#c8ff00" stopOpacity="0.9" />
            <stop offset="1" stopColor="#4c5a10" />
          </linearGradient>
          <linearGradient id={chromeDark} x1="0" x2="1">
            <stop offset="0" stopColor="#2b2b29" />
            <stop offset="0.3" stopColor="#d6d6d1" />
            <stop offset="0.6" stopColor="#3a3a37" />
            <stop offset="1" stopColor="#9fbf1e" />
          </linearGradient>
          <pattern id={mesh} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.15" fill="#0d0d0c" opacity="0.75" />
          </pattern>
          <clipPath id={capsule}>
            <rect x="62" y="8" width="76" height="112" rx="38" />
          </clipPath>
        </defs>

        {/* Yoke */}
        <path
          d="M46 74 v18 a54 54 0 0 0 108 0 v-18"
          fill="none"
          stroke={`url(#${chromeDark})`}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <rect x="40" y="70" width="12" height="16" rx="3" fill={`url(#${chromeDark})`} />
        <rect x="148" y="70" width="12" height="16" rx="3" fill={`url(#${chromeDark})`} />

        {/* Capsule with grille */}
        <rect x="62" y="8" width="76" height="112" rx="38" fill={`url(#${chrome})`} />
        <g clipPath={`url(#${capsule})`}>
          <rect x="62" y="8" width="76" height="112" fill={`url(#${mesh})`} />
          {/* Lime inner glow when speaking */}
          <rect
            x="62"
            y="8"
            width="76"
            height="112"
            fill="#c8ff00"
            className="transition-opacity duration-100"
            style={{ opacity: "calc(var(--lvl, 0) * 0.35)" }}
          />
          <ellipse cx="80" cy="34" rx="7" ry="20" fill="#fff" opacity="0.55" />
        </g>
        <rect x="58" y="74" width="84" height="9" rx="4.5" fill={`url(#${chromeDark})`} />

        {/* Stem + base */}
        <rect x="94" y="146" width="12" height="54" rx="4" fill={`url(#${chromeDark})`} />
        <ellipse cx="100" cy="214" rx="54" ry="13" fill="#0c0c0b" />
        <ellipse cx="100" cy="208" rx="52" ry="12" fill={`url(#${chrome})`} />
        <ellipse cx="100" cy="205" rx="34" ry="6" fill="#151514" opacity="0.6" />
      </svg>
    </div>
  );
}
