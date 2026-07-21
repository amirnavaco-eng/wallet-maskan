"use client";

import { Typography } from "@mui/material";
import { formatToman } from "@/shared/utils/format";

interface LoanAmountCardsProps {
  totalAmount: number;
  usedAmount: number;
  remainingAmount: number;
}

function AmountCard({
  label,
  amount,
  variant,
}: {
  label: string;
  amount: number;
  variant: "total" | "used" | "remaining";
}) {
  const styles = {
    total: "bg-white text-ink-900",
    used: "bg-white text-ink-900",
    remaining: "bg-brand-500 text-white",
  }[variant];

  return (
    <div className={`flex-1 rounded-xl2 p-4 shadow-soft ${styles}`}>
      <Typography
        variant="caption"
        sx={{ opacity: variant === "remaining" ? 0.85 : undefined }}
        color={variant === "remaining" ? "inherit" : "text.secondary"}
      >
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={800} sx={{ mt: 0.5 }} noWrap>
        {formatToman(amount)}
      </Typography>
    </div>
  );
}

export function LoanAmountCards({ totalAmount, usedAmount, remainingAmount }: LoanAmountCardsProps) {
  return (
    <div className="flex gap-3">
      <AmountCard label="مبلغ کل" amount={totalAmount} variant="total" />
      <AmountCard label="استفاده شده" amount={usedAmount} variant="used" />
      <AmountCard label="باقی‌مانده" amount={remainingAmount} variant="remaining" />
    </div>
  );
}
