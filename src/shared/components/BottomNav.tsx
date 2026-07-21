"use client";

import { usePathname, useRouter } from "next/navigation";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { ROUTES } from "@/shared/constants/routes";

const TABS = [
  { label: "خانه", value: ROUTES.home, icon: HomeRoundedIcon },
  { label: "تسهیلات", value: ROUTES.loans, icon: AccountBalanceRoundedIcon },
  { label: "پروفایل", value: ROUTES.profile, icon: PersonRoundedIcon },
];

/**
 * Floating glass navigation bar with a pill indicator that slides beneath the
 * active tab. Now with position:fixed at the bottom of the screen.
 */
export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const activeIndex = Math.max(
    TABS.findIndex((t) => pathname.startsWith(t.value)),
    0,
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4">
      <nav
        className="glass-surface w-full max-w-[440px] overflow-hidden rounded-[26px] border border-white/60 p-1.5 shadow-[0_16px_40px_-16px_rgba(22,19,24,0.25)] backdrop-blur-xl"
        style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
        aria-label="پیمایش اصلی"
      >
        <div className="relative grid grid-cols-3 overflow-hidden">
          {/* sliding active indicator */}
          <div
            className="absolute inset-y-0 w-1/3 rounded-[20px] bg-brand-500 shadow-card transition-transform duration-300"
            style={{
              transform: `translateX(${activeIndex * -100}%)`,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            aria-hidden="true"
          />

          {TABS.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => router.push(tab.value)}
                className={`press-scale relative z-10 flex flex-col items-center gap-0.5 rounded-[20px] py-2.5 transition-colors ${
                  isActive ? "text-white" : "text-ink-500"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  fontSize="small"
                  className={
                    isActive
                      ? "scale-110 transition-transform duration-300"
                      : "transition-transform duration-300"
                  }
                />
                <span className="text-[11px] font-bold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
