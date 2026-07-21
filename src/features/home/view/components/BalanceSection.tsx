"use client";

import { IconButton, Typography } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { formatToman } from "@/shared/utils/format";
import { useCountUp } from "@/shared/hooks/useCountUp";

interface BalanceSectionProps {
  walletBalance: number;
  isHidden: boolean;
  onToggleHidden: () => void;
}

export function BalanceSection({
  walletBalance,
  isHidden,
  onToggleHidden,
}: BalanceSectionProps) {
  const animatedBalance = useCountUp(walletBalance, 1100);

  return (
    <div className="relative overflow-hidden rounded-xl3 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          موجودی کیف پول
        </Typography>
        <IconButton
          size="small"
          onClick={onToggleHidden}
          aria-label={
            isHidden
              ? "نمایش موجودی و تراکنش‌ها"
              : "مخفی کردن موجودی و تراکنش‌ها"
          }
          sx={{ color: "#F76B1C", bgcolor: "#FFF5EC" }}
        >
          {isHidden ? (
            <VisibilityOffRoundedIcon fontSize="small" />
          ) : (
            <VisibilityRoundedIcon fontSize="small" />
          )}
        </IconButton>
      </div>

      <div
        className={`count-in mt-2 text-3xl font-extrabold tracking-tight text-ink-900 transition-all duration-500 ${
          isHidden ? "select-none blur-lg" : "blur-0"
        }`}
      >
        {isHidden ? "••••••••" : formatToman(animatedBalance)}
      </div>
    </div>
  );
}
