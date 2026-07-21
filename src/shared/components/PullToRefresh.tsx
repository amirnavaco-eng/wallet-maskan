"use client";

import * as React from "react";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { CircularProgress } from "@mui/material";

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
}

const PULL_THRESHOLD = 72;

/** Simple pull-to-refresh: tracks touch drag distance from the top of the scroll container. */
export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const startY = React.useRef<number | null>(null);
  const [pullDistance, setPullDistance] = React.useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop <= 0 && !isRefreshing) {
      startY.current = e.touches[0]?.clientY ?? null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null || isRefreshing) return;
    const currentY = e.touches[0]?.clientY ?? 0;
    const distance = currentY - startY.current;
    if (distance > 0) {
      setPullDistance(Math.min(distance * 0.5, 100));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      setPullDistance(56);
      await onRefresh();
      setIsRefreshing(false);
    }
    setPullDistance(0);
    startY.current = null;
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      <div
        className="flex items-center justify-center overflow-hidden text-brand-500 transition-[height]"
        style={{ height: pullDistance }}
      >
        {(pullDistance > 10 || isRefreshing) && (
          <CircularProgress
            size={22}
            thickness={5}
            variant={isRefreshing ? "indeterminate" : "determinate"}
            value={Math.min((pullDistance / PULL_THRESHOLD) * 100, 100)}
          />
        )}
      </div>
      {children}
    </div>
  );
}

export function RefreshIcon() {
  return <RefreshRoundedIcon fontSize="small" />;
}
