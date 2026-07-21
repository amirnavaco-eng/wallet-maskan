"use client";

import { useEffect, useState } from "react";
import { toPersianDigits } from "@/shared/utils/format";

interface RadialGaugeProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  label?: string;
}

/** Circular progress gauge with an animated sweep-in and centered percentage readout. */
export function RadialGauge({
  percent,
  size = 168,
  strokeWidth = 14,
  trackColor = "#F3E7DC",
  progressColor = "#F76B1C",
  label,
}: RadialGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(percent, 0), 100);

  const [animatedPercent, setAnimatedPercent] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimatedPercent(clamped));
    return () => cancelAnimationFrame(frame);
  }, [clamped]);

  const offset = circumference - (animatedPercent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-extrabold text-ink-900">{toPersianDigits(Math.round(animatedPercent))}٪</span>
        {label && <span className="mt-0.5 text-xs font-medium text-ink-500">{label}</span>}
      </div>
    </div>
  );
}
