"use client";

import { useCallback, useEffect, useState } from "react";
import { homeService, transactionsService } from "@/lib/api/services";
import type { BankCardModel, TransactionModel } from "@/lib/api/types";
import { useToast } from "@/shared/components/toast/ToastProvider";
import type { LoadState } from "../model/types";

export function useHomeViewModel() {
  const { showToast } = useToast();

  const [state, setState] = useState<LoadState>("loading");
  const [card, setCard] = useState<BankCardModel | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);

  // Card front shows CVV2 behind its own toggle (per spec). Flipping the card
  // reveals the account number + Sheba on the back.
  const [isCvvVisible, setIsCvvVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // A single privacy switch next to the balance hides the balance AND the
  // transaction list below it — separate from the CVV toggle on the card.
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  const load = useCallback(async () => {
    setState("loading");
    try {
      const [homeRes, txRes] = await Promise.all([
        homeService.getHomeData(),
        transactionsService.getTransactions(5),
      ]);
      setCard(homeRes.data.card);
      setWalletBalance(homeRes.data.walletBalance);
      setTransactions(txRes.data.items);
      setState("success");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(async () => {
    await load();
  }, [load]);

  const toggleCvv = () => setIsCvvVisible((v) => !v);
  const toggleFlip = () => setIsFlipped((v) => !v);
  const toggleBalanceHidden = () => setIsBalanceHidden((v) => !v);

  const copyToClipboard = useCallback(
    async (value: string, label: string) => {
      try {
        await navigator.clipboard.writeText(value.replace(/\s/g, ""));
        showToast(`${label} کپی شد`, "success");
      } catch {
        showToast("کپی انجام نشد", "error");
      }
    },
    [showToast]
  );

  return {
    state,
    card,
    walletBalance,
    transactions,
    refresh,
    isCvvVisible,
    toggleCvv,
    isFlipped,
    toggleFlip,
    isBalanceHidden,
    toggleBalanceHidden,
    copyToClipboard,
  };
}
