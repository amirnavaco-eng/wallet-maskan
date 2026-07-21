"use client";

import { Typography } from "@mui/material";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import { formatDate, formatToman } from "@/shared/utils/format";

interface NextInstallmentCardProps {
  date: string;
  amount: number;
}

export function NextInstallmentCard({ date, amount }: NextInstallmentCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl3 bg-white p-4 shadow-soft">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500">
        <EventRoundedIcon fontSize="small" />
      </div>
      <div className="flex-1">
        <Typography variant="caption" color="text.secondary">
          قسط بعدی
        </Typography>
        <Typography variant="body2" fontWeight={800}>
          {formatDate(date)}
        </Typography>
      </div>
      <Typography variant="body2" fontWeight={800} color="text.primary">
        {formatToman(amount)}
      </Typography>
    </div>
  );
}
