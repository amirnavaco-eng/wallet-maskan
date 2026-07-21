"use client";

import { Typography, IconButton } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useRouter } from "next/navigation";
import type { TransactionModel } from "@/lib/api/types";
import { useTransactionsViewModel } from "../viewmodel/useTransactionsViewModel";
import { FilterChips } from "./components/FilterChips";
import { SortMenu } from "./components/SortMenu";
import { TransactionItem } from "./components/TransactionItem";
import { EmptyState } from "@/shared/components/states/EmptyState";

interface TransactionsViewProps {
  transactions: TransactionModel[];
}

export function TransactionsView({ transactions }: TransactionsViewProps) {
  const router = useRouter();
  const {
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    filteredAndSortedTransactions,
    totalCount,
    filteredCount,
  } = useTransactionsViewModel({ transactions });

  return (
    <div className="animate-in flex min-h-screen flex-col gap-5 px-4 pb-4 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <IconButton
          onClick={() => router.back()}
          sx={{ bgcolor: "white", boxShadow: 1 }}
          aria-label="بازگشت"
        >
          <ArrowForwardRoundedIcon />
        </IconButton>
        <div className="flex-1">
          <Typography variant="h6" fontWeight={800}>
            تراکنش‌ها
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {filteredCount} از {totalCount} تراکنش
          </Typography>
        </div>
        <SortMenu activeSort={sortBy} onSortChange={setSortBy} />
      </div>

      {/* Filters */}
      <FilterChips activeFilter={filterBy} onFilterChange={setFilterBy} />

      {/* Transactions List */}
      <div className="flex flex-col gap-3">
        {filteredAndSortedTransactions.length === 0 ? (
          <EmptyState
            title="تراکنشی یافت نشد"
            description={
              filterBy === "all"
                ? "هنوز تراکنشی ثبت نشده است."
                : "تراکنشی با این فیلتر یافت نشد."
            }
          />
        ) : (
          filteredAndSortedTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
}
