"use client";

import type { FilterOption } from "../../model/types";

interface FilterChipsProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

const FILTERS: { value: FilterOption; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "deposit", label: "واریز" },
  { value: "withdrawal", label: "برداشت" },
];

export function FilterChips({
  activeFilter,
  onFilterChange,
}: FilterChipsProps) {
  return (
    <div className="flex gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onFilterChange(filter.value)}
          className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
            activeFilter === filter.value
              ? "bg-brand-500 text-white shadow-md"
              : "bg-white text-ink-600 hover:bg-surface-light"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
