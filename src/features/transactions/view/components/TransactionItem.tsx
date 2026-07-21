"use client";

import { Typography } from "@mui/material";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import type { TransactionModel } from "@/lib/api/types";
import { formatDateTime, formatToman } from "@/shared/utils/format";

interface TransactionItemProps {
  transaction: TransactionModel;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isDeposit = transaction.type === "deposit";

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-soft transition-all hover:shadow-md">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
          isDeposit ? "bg-green-50 text-success" : "bg-red-50 text-danger"
        }`}
      >
        {isDeposit ? (
          <ArrowDownwardRoundedIcon fontSize="medium" />
        ) : (
          <ArrowUpwardRoundedIcon fontSize="medium" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <Typography variant="body1" fontWeight={700} noWrap>
          {transaction.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatDateTime(transaction.occurredAt)}
        </Typography>
        {transaction.counterparty && (
          <Typography variant="caption" color="text.secondary" display="block">
            {transaction.counterparty}
          </Typography>
        )}
      </div>

      <Typography
        variant="body1"
        fontWeight={800}
        color={isDeposit ? "success.main" : "error.main"}
        sx={{ whiteSpace: "nowrap" }}
      >
        {isDeposit ? "+" : "−"} {formatToman(transaction.amount)}
      </Typography>
    </div>
  );
}
