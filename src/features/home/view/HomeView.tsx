"use client";

import { Typography, IconButton } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { useRouter } from "next/navigation";
import { useHomeViewModel } from "../viewmodel/useHomeViewModel";
import { BankCard } from "./components/BankCard";
import { BalanceSection } from "./components/BalanceSection";
import { TransactionsList } from "./components/TransactionsList";
import {
  CardSkeleton,
  BlockSkeleton,
} from "@/shared/components/skeleton/Skeletons";
import { ErrorState } from "@/shared/components/states/ErrorState";
import { PullToRefresh } from "@/shared/components/PullToRefresh";
import { ROUTES } from "@/shared/constants/routes";

export function HomeView() {
  const router = useRouter();
  const {
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
  } = useHomeViewModel();

  return (
    <PullToRefresh onRefresh={refresh}>
      <div className="animate-in stagger flex flex-col gap-5 px-4 pb-4 pt-6">
        <div className="flex items-center justify-between px-1">
          <div>
            <Typography variant="caption" color="text.secondary">
              خوش آمدید
            </Typography>
            <Typography variant="subtitle1" fontWeight={800}>
              {card ? card.cardHolderName : "کیف پول بانک مسکن"}
            </Typography>
          </div>
          <IconButton
            sx={{ bgcolor: "white", boxShadow: 1 }}
            aria-label="اعلان‌ها"
          >
            <NotificationsNoneRoundedIcon fontSize="small" />
          </IconButton>
        </div>

        {state === "error" && <ErrorState onRetry={refresh} />}

        {state === "loading" && (
          <>
            <CardSkeleton />
            <BlockSkeleton className="h-24" />
            <BlockSkeleton className="h-56" />
          </>
        )}

        {state === "success" && card && walletBalance !== null && (
          <>
            <BankCard
              card={card}
              isCvvVisible={isCvvVisible}
              onToggleCvv={toggleCvv}
              isFlipped={isFlipped}
              onToggleFlip={toggleFlip}
              onCopy={copyToClipboard}
            />

            <BalanceSection
              walletBalance={walletBalance}
              isHidden={isBalanceHidden}
              onToggleHidden={toggleBalanceHidden}
            />

            <div
              className={`transition-all duration-500 ${
                isBalanceHidden
                  ? "pointer-events-none select-none blur-lg"
                  : "blur-0"
              }`}
            >
              <TransactionsList
                transactions={transactions}
                isLoading={false}
                onViewAll={() => router.push(ROUTES.transactions)}
              />
            </div>
          </>
        )}
      </div>
    </PullToRefresh>
  );
}
