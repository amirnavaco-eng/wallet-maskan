"use client";

import { Typography } from "@mui/material";
import { useLoanViewModel } from "../viewmodel/useLoanViewModel";
import { LoanAmountCards } from "./components/LoanAmountCards";
import { LoanProgress } from "./components/LoanProgress";
import { NextInstallmentCard } from "./components/NextInstallmentCard";
import { BlockSkeleton } from "@/shared/components/skeleton/Skeletons";
import { ErrorState } from "@/shared/components/states/ErrorState";
import { PullToRefresh } from "@/shared/components/PullToRefresh";

export function LoansView() {
  const { state, summary, usagePercent, refresh } = useLoanViewModel();

  return (
    <PullToRefresh onRefresh={refresh}>
      <div className="animate-in stagger flex flex-col gap-5 px-4 pb-4 pt-6">
        <div className="px-1">
          <Typography variant="subtitle1" fontWeight={800}>
            مدیریت تسهیلات
          </Typography>
          <Typography variant="caption" color="text.secondary">
            وضعیت تسهیلات و اقساط خود را مشاهده کنید
          </Typography>
        </div>

        {state === "error" && <ErrorState onRetry={refresh} />}

        {state === "loading" && (
          <>
            <div className="flex gap-3">
              <BlockSkeleton className="h-20" />
              <BlockSkeleton className="h-20" />
              <BlockSkeleton className="h-20" />
            </div>
            <BlockSkeleton className="h-28" />
            <BlockSkeleton className="h-20" />
          </>
        )}

        {state === "success" && summary && (
          <>
            <LoanProgress usagePercent={usagePercent} status={summary.status} />
            <LoanAmountCards
              totalAmount={summary.totalAmount}
              usedAmount={summary.usedAmount}
              remainingAmount={summary.remainingAmount}
            />
            <NextInstallmentCard date={summary.nextInstallmentDate} amount={summary.nextInstallmentAmount} />
          </>
        )}
      </div>
    </PullToRefresh>
  );
}
