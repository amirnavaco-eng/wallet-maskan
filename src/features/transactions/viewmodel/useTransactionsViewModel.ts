"use client";

import { useState, useMemo } from "react";
import type { TransactionModel } from "@/lib/api/types";
import type { SortOption, FilterOption } from "../model/types";

interface UseTransactionsViewModelProps {
  transactions: TransactionModel[];
}

export function useTransactionsViewModel({
  transactions,
}: UseTransactionsViewModelProps) {
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const filteredAndSortedTransactions = useMemo(() => {
    // اول فیلتر
    let result = transactions;
    if (filterBy !== "all") {
      result = result.filter((tx) => tx.type === filterBy);
    }

    // بعد سورت
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return (
            new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
          );
        case "date-asc":
          return (
            new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime()
          );
        case "amount-desc":
          return b.amount - a.amount;
        case "amount-asc":
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

    return result;
  }, [transactions, sortBy, filterBy]);

  return {
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    filteredAndSortedTransactions,
    totalCount: transactions.length,
    filteredCount: filteredAndSortedTransactions.length,
  };
}
