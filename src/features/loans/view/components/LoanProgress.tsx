"use client";

import { Typography, Chip } from "@mui/material";
import type { LoanStatus } from "@/lib/api/types";
import { RadialGauge } from "@/shared/components/RadialGauge";
import { GirihPattern } from "@/shared/components/GirihPattern";

interface LoanProgressProps {
  usagePercent: number;
  status: LoanStatus;
}

const STATUS_CONFIG: Record<LoanStatus, { label: string; color: "success" | "default" | "warning" }> = {
  active: { label: "فعال", color: "success" },
  pending: { label: "در انتظار", color: "warning" },
  closed: { label: "بسته شده", color: "default" },
};

export function LoanProgress({ usagePercent, status }: LoanProgressProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div
      className="relative overflow-hidden rounded-xl3 p-6 text-center shadow-glow"
      style={{
        background:
          "radial-gradient(120% 120% at 100% 0%, #FFD9A8 0%, transparent 55%), linear-gradient(150deg, #FFF3E8 0%, #FFE3C7 100%)",
      }}
    >
      <GirihPattern id="loan-girih" className="pointer-events-none absolute inset-0" color="#F76B1C" opacity={0.08} size={50} />

      <div className="relative mb-4 flex items-center justify-between">
        <Typography variant="subtitle2" fontWeight={800} color="text.primary">
          میزان استفاده از تسهیلات
        </Typography>
        <Chip label={config.label} color={config.color} size="small" />
      </div>

      <div className="relative flex justify-center py-1">
        <RadialGauge
          percent={usagePercent}
          progressColor={usagePercent >= 90 ? "#E5484D" : "#F76B1C"}
          label="استفاده شده"
        />
      </div>
    </div>
  );
}
