import type { TransactionType } from "@/lib/api/types";

export type SortOption =
  | "date-desc"
  | "date-asc"
  | "amount-desc"
  | "amount-asc";

export type FilterOption = "all" | TransactionType;

export interface TransactionsState {
  sortBy: SortOption;
  filterBy: FilterOption;
}
