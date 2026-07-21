"use client";

import { IconButton, Typography } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import Rotate90DegreesCcwRoundedIcon from "@mui/icons-material/Rotate90DegreesCcwRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import type { BankCardModel } from "@/lib/api/types";
import {
  formatCardNumber,
  formatSheba,
  toPersianDigits,
} from "@/shared/utils/format";
import { GirihPattern } from "@/shared/components/GirihPattern";

interface BankCardProps {
  card: BankCardModel;
  isCvvVisible: boolean;
  onToggleCvv: () => void;
  isFlipped: boolean;
  onToggleFlip: () => void;
  onCopy: (value: string, label: string) => void;
}

/**
 * A flippable "day / night" bank card — the front is the warm sunset gradient
 * with the everyday card face, the back is a deep midnight gradient revealing
 * the account number and Sheba (IBAN) with copy actions. Tapping the rotate
 * icon (or the card itself) flips it with a real 3D transform.
 */
export function BankCard({
  card,
  isCvvVisible,
  onToggleCvv,
  isFlipped,
  onToggleFlip,
  onCopy,
}: BankCardProps) {
  return (
    <div className="">
      <div
        className="relative h-56 w-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* ---------------------------------------------------------------- */}
        {/* FRONT — sunset / "day"                                          */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="card-shine absolute inset-0 overflow-hidden rounded-xl3 p-5 text-white shadow-glow [backface-visibility:hidden]"
          style={{
            background:
              "radial-gradient(120% 140% at 0% 0%, #FFB366 0%, transparent 55%), linear-gradient(135deg, #FF8A3D 0%, #F76B1C 45%, #BC420B 100%)",
          }}
          role="group"
          aria-label="روی کارت بانکی"
        >
          <GirihPattern
            id="card-girih-front"
            className="pointer-events-none absolute inset-0"
            opacity={0.14}
            size={46}
          />
          <div className="pointer-events-none absolute -left-10 -top-16 h-44 w-44 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 -right-8 h-40 w-40 rounded-full bg-black/10" />

          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <WifiRoundedIcon fontSize="small" className="rotate-90" />
              </div>
              <Typography
                variant="subtitle2"
                fontWeight={800}
                sx={{ letterSpacing: 0.2 }}
              >
                بانک مسکن
              </Typography>
            </div>
            <IconButton
              size="small"
              onClick={onToggleFlip}
              aria-label="چرخش کارت"
              className="press-scale"
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(4px)",
              }}
            >
              <Rotate90DegreesCcwRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </div>

          <div className="relative mt-9 flex items-center gap-2">
            <IconButton
              size="small"
              onClick={() => onCopy(card.cardNumber, "شماره کارت")}
              aria-label="کپی شماره کارت"
              className="press-scale"
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(4px)",
              }}
            >
              <ContentCopyRoundedIcon sx={{ fontSize: 17 }} />
            </IconButton>
            <button
              type="button"
              onClick={onToggleFlip}
              className="press-scale flex-1 text-right text-2xl font-extrabold tracking-[0.12em] [text-shadow:0_2px_10px_rgba(0,0,0,0.15)]"
              dir="ltr"
              aria-label="چرخش کارت برای مشاهده جزئیات بیشتر"
            >
              {formatCardNumber(card.cardNumber)}
            </button>
          </div>

          <div className="relative mt-7 flex items-end justify-between">
            <div>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                دارنده کارت
              </Typography>
              <Typography variant="body2" fontWeight={800}>
                {card.cardHolderName}
              </Typography>
            </div>

            <div className="text-left">
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                تاریخ انقضا
              </Typography>
              <Typography variant="body2" fontWeight={800} dir="ltr">
                {toPersianDigits(`${card.expiryMonth}/${card.expiryYear}`)}
              </Typography>
            </div>

            <div className="text-left">
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                CVV2
              </Typography>
              <div className="flex items-center gap-1">
                <Typography variant="body2" fontWeight={800} dir="ltr">
                  {isCvvVisible ? toPersianDigits(card.cvv2) : "•••"}
                </Typography>
                <IconButton
                  size="small"
                  onClick={onToggleCvv}
                  aria-label={isCvvVisible ? "پنهان کردن CVV2" : "نمایش CVV2"}
                  sx={{ color: "white", p: 0.4 }}
                >
                  {isCvvVisible ? (
                    <VisibilityOffRoundedIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <VisibilityRoundedIcon sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* BACK — midnight / "night", account + Sheba                      */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl3 p-5 text-white shadow-glow [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            background:
              "linear-gradient(150deg, #2B2733 0%, #161318 65%, #0E0C10 100%)",
          }}
          role="group"
          aria-label="پشت کارت بانکی"
        >
          <GirihPattern
            id="card-girih-back"
            className="pointer-events-none absolute inset-0"
            color="#FFD98A"
            opacity={0.16}
            size={40}
          />
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gold-500/10" />

          <div className="relative flex items-center justify-between">
            <Typography
              variant="subtitle2"
              fontWeight={800}
              sx={{ color: "#FFD98A", letterSpacing: 0.2 }}
            >
              اطلاعات انتقال وجه
            </Typography>
            <IconButton
              size="small"
              onClick={onToggleFlip}
              aria-label="بازگشت به روی کارت"
              className="press-scale"
              sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
            >
              <Rotate90DegreesCcwRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </div>

          <div className="relative mt-5 flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-2xl bg-white/8 px-3.5 py-2.5 backdrop-blur-sm">
              <div>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  شماره حساب
                </Typography>
                <Typography variant="body2" fontWeight={700} dir="ltr">
                  {toPersianDigits(card.accountNumber)}
                </Typography>
              </div>
              <IconButton
                size="small"
                onClick={() => onCopy(card.accountNumber, "شماره حساب")}
                aria-label="کپی شماره حساب"
                sx={{ color: "#FFD98A" }}
              >
                <ContentCopyRoundedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-white/8 px-3.5 py-2.5 backdrop-blur-sm">
              <div className="min-w-0">
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  شبا
                </Typography>
                <Typography variant="body2" fontWeight={700} dir="ltr" noWrap>
                  {formatSheba(card.sheba)}
                </Typography>
              </div>
              <IconButton
                size="small"
                onClick={() => onCopy(card.sheba, "شماره شبا")}
                aria-label="کپی شماره شبا"
                sx={{ color: "#FFD98A" }}
              >
                <ContentCopyRoundedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
