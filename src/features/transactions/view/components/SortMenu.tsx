"use client";

import { useState } from "react";
import { Menu, MenuItem, IconButton, Typography } from "@mui/material";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import type { SortOption } from "../../model/types";

interface SortMenuProps {
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "date-desc", label: "جدیدترین" },
  { value: "date-asc", label: "قدیمی‌ترین" },
  { value: "amount-desc", label: "بیشترین مبلغ" },
  { value: "amount-asc", label: "کمترین مبلغ" },
];

export function SortMenu({ activeSort, onSortChange }: SortMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (sort: SortOption) => {
    onSortChange(sort);
    handleClose();
  };

  const activeLabel =
    SORT_OPTIONS.find((opt) => opt.value === activeSort)?.label || "مرتب‌سازی";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink-600 shadow-sm transition-all hover:shadow-md"
      >
        <SortRoundedIcon fontSize="small" />
        <span>{activeLabel}</span>
      </button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === activeSort}
            onClick={() => handleSelect(option.value)}
          >
            <Typography
              variant="body2"
              fontWeight={option.value === activeSort ? 700 : 500}
            >
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
