"use client";

import { Typography } from "@mui/material";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import type { TransactionModel } from "@/lib/api/types";
import { formatDateTime, formatToman } from "@/shared/utils/format";
import { EmptyState } from "@/shared/components/states/EmptyState";
import { RowSkeleton } from "@/shared/components/skeleton/Skeletons";

interface TransactionsListProps {
  transactions: TransactionModel[];
  isLoading: boolean;
  onViewAll: () => void;
}

function TransactionRow({ tx }: { tx: TransactionModel }) {
  const isDeposit = tx.type === "deposit";
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          isDeposit ? "bg-green-50 text-success" : "bg-red-50 text-danger"
        }`}
      >
        {isDeposit ? (
          <ArrowDownwardRoundedIcon fontSize="small" />
        ) : (
          <ArrowUpwardRoundedIcon fontSize="small" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <Typography variant="body2" fontWeight={700} noWrap>
          {tx.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatDateTime(tx.occurredAt)}
        </Typography>
      </div>
      <Typography
        variant="body2"
        fontWeight={800}
        color={isDeposit ? "success.main" : "error.main"}
        sx={{ whiteSpace: "nowrap" }}
      >
        {isDeposit ? "+" : "−"} {formatToman(tx.amount)}
      </Typography>
    </div>
  );
}

export function TransactionsList({
  transactions,
  isLoading,
  onViewAll,
}: TransactionsListProps) {
  return (
    <div className="rounded-xl3 bg-white p-4 shadow-soft">
      <div className="mb-1 flex items-center justify-between">
        <Typography variant="subtitle2" fontWeight={800}>
          تراکنش‌های اخیر
        </Typography>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-brand-500 transition-colors hover:text-brand-600"
        >
          مشاهده همه
        </button>
      </div>

      {isLoading ? (
        <div className="divide-y divide-surface-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <RowSkeleton key={i} />
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <EmptyState
          title="تراکنشی وجود ندارد"
          description="تراکنش‌های اخیر شما اینجا نمایش داده می‌شود."
        />
      ) : (
        <div className="divide-y divide-surface-border">
          {transactions.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </div>
      )}
    </div>
  );
}
