"use client";

import { Button, Typography, CircularProgress } from "@mui/material";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import { useOtpViewModel } from "../viewmodel/useOtpViewModel";
import { OtpInput } from "./components/OtpInput";
import { toPersianDigits } from "@/shared/utils/format";
import { SuccessBurst } from "@/shared/components/SuccessBurst";

interface OtpViewProps {
  mobileNumber: string;
}

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return toPersianDigits(`${m}:${s.toString().padStart(2, "0")}`);
}

export function OtpView({ mobileNumber }: OtpViewProps) {
  const {
    code,
    setDigit,
    isComplete,
    status,
    verify,
    resend,
    secondsLeft,
    isRunning,
    changeMobileNumber,
    otpLength,
  } = useOtpViewModel(mobileNumber);

  const isVerifying = status === "verifying";
  const isSuccess = status === "success";
  const isInvalid = status === "invalid";

  return (
    <div className="animate-in flex min-h-dvh flex-col justify-between px-6 pb-10 pt-16">
      <div>
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
          {isSuccess ? (
            <SuccessBurst size={64} />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <SmsRoundedIcon fontSize="large" />
            </div>
          )}
        </div>

        <Typography variant="h6" fontWeight={800} textAlign="center">
          کد تایید را وارد کنید
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mt: 1 }}>
          کد ۶ رقمی ارسال شده به شماره {toPersianDigits(mobileNumber)} را وارد کنید
        </Typography>
      </div>

      <div className="mt-10 flex flex-col items-center gap-6">
        <OtpInput
          code={code}
          onChangeDigit={setDigit}
          length={otpLength}
          hasError={isInvalid}
          disabled={isVerifying || isSuccess}
        />

        {isInvalid && (
          <Typography variant="body2" color="error" fontWeight={600}>
            کد وارد شده صحیح نیست
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary">
          {isRunning ? (
            <>زمان باقی‌مانده: {formatCountdown(secondsLeft)}</>
          ) : (
            <button
              type="button"
              onClick={resend}
              className="font-bold text-brand-500 disabled:text-ink-300"
            >
              ارسال مجدد کد
            </button>
          )}
        </Typography>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <Button
          variant="contained"
          size="large"
          fullWidth
          disabled={!isComplete || isVerifying || isSuccess}
          onClick={verify}
          sx={{ py: 1.6, fontSize: "1rem" }}
        >
          {isVerifying ? (
            <CircularProgress size={22} thickness={5} sx={{ color: "white" }} />
          ) : isSuccess ? (
            "تایید شد"
          ) : (
            "تایید کد"
          )}
        </Button>
        <Button variant="text" color="inherit" onClick={changeMobileNumber} disabled={isVerifying}>
          تغییر شماره موبایل
        </Button>
      </div>
    </div>
  );
}
