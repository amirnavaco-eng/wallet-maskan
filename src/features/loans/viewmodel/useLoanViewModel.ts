"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { loanService } from "@/lib/api/services";
import type { LoanSummaryResponse } from "@/lib/api/types";
import type { LoadState } from "../model/types";

export function useLoanViewModel() {
  const [state, setState] = useState<LoadState>("loading");
  const [summary, setSummary] = useState<LoanSummaryResponse | null>(null);

  const load = useCallback(async () => {
    setState("loading");
    try {
      const res = await loanService.getLoanSummary();
      setSummary(res.data);
      setState("success");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const usagePercent = useMemo(() => {
    if (!summary || summary.totalAmount === 0) return 0;
    return Math.round((summary.usedAmount / summary.totalAmount) * 100);
  }, [summary]);

  return { state, summary, usagePercent, refresh: load };
}
