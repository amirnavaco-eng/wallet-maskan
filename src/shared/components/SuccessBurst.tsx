import type { CSSProperties } from "react";

const PARTICLE_COLORS = ["#F76B1C", "#FFB300", "#1FA97A", "#FF8A3D"];

function generateParticles(count: number) {
  return Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const distance = 46 + (i % 3) * 10;
    return {
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      delay: (i % 4) * 0.03,
    };
  });
}

const particles = generateParticles(10);

/** Draws a circular checkmark badge with a radiating burst of dots around it. */
export function SuccessBurst({ size = 72 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {particles.map((p, i) => (
        <span
          key={i}
          className="burst-particle"
          style={
            {
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        />
      ))}
      <svg
        className="success-check-circle relative"
        width={size}
        height={size}
        viewBox="0 0 52 52"
        aria-hidden="true"
      >
        <circle cx="26" cy="26" r="25" fill="#1FA97A" />
        <path
          className="success-check-path"
          fill="none"
          stroke="white"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 27l7 7 15-15"
        />
      </svg>
    </div>
  );
}
