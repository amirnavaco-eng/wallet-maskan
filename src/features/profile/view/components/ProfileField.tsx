"use client";

import { Typography } from "@mui/material";
import { toPersianDigits } from "@/shared/utils/format";

interface ProfileFieldProps {
  label: string;
  value: string;
  isNumeric?: boolean;
}

export function ProfileField({ label, value, isNumeric }: ProfileFieldProps) {
  return (
    <div className="flex items-center justify-between border-b border-surface-border px-1 py-3.5 last:border-b-0">
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={700} dir={isNumeric ? "ltr" : undefined}>
        {isNumeric ? toPersianDigits(value) : value}
      </Typography>
    </div>
  );
}
