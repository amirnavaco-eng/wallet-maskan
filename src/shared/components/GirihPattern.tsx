interface GirihPatternProps {
  id: string;
  color?: string;
  opacity?: number;
  size?: number;
  className?: string;
}

/**
 * A tileable eight-pointed-star geometric pattern in the tradition of Persian
 * architectural tilework (girih). Used as a subtle etched texture on the bank
 * card and profile header — a nod to Bank Maskan's identity as the housing
 * bank, rendered as fine gold hairlines rather than a literal illustration.
 */
export function GirihPattern({ id, color = "#FFFFFF", opacity = 0.16, size = 64, className }: GirihPatternProps) {
  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth={1} opacity={opacity}>
            {/* eight-pointed star formed from two overlaid squares */}
            <rect x={size * 0.18} y={size * 0.18} width={size * 0.64} height={size * 0.64} transform={`rotate(0 ${size / 2} ${size / 2})`} />
            <rect
              x={size * 0.18}
              y={size * 0.18}
              width={size * 0.64}
              height={size * 0.64}
              transform={`rotate(45 ${size / 2} ${size / 2})`}
            />
            <circle cx={size / 2} cy={size / 2} r={size * 0.14} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
