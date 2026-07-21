"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/services";
import { useCountdown } from "@/shared/hooks/useCountdown";
import { useToast } from "@/shared/components/toast/ToastProvider";
import { ROUTES } from "@/shared/constants/routes";
import type { VerifyStep } from "../model/types";

const OTP_LENGTH = 6;
const OTP_DURATION_SECONDS = 120;

export function useOtpViewModel(mobileNumber: string) {
  const router = useRouter();
  const { showToast } = useToast();
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [status, setStatus] = useState<VerifyStep>("idle");
  const { secondsLeft, isRunning, restart } =
    useCountdown(OTP_DURATION_SECONDS);

  const codeString = code.join("");
  const isComplete = codeString.length === OTP_LENGTH && !code.includes("");

  const setDigit = (index: number, digit: string) => {
    setCode((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (status === "invalid") setStatus("idle");
  };

  const clearCode = () => setCode(Array(OTP_LENGTH).fill(""));

  const verify = async () => {
    if (!isComplete) return;
    setStatus("verifying");
    try {
      const response = await authService.verifyOtp({
        mobileNumber,
        otpCode: codeString,
      });
      if (response.success) {
        setStatus("success");
        if (typeof window !== "undefined") {
          window.localStorage.setItem("bm_token", response.data.accessToken);
        }
        setTimeout(() => router.push(ROUTES.home), 600);
      } else {
        setStatus("invalid");
        showToast(response.message ?? "کد تایید نامعتبر است", "error");
      }
    } catch {
      setStatus("error");
      showToast("خطا در برقراری ارتباط. دوباره تلاش کنید.", "error");
    }
  };

  // Auto-submit when all digits are entered
  useEffect(() => {
    if (isComplete && status === "idle") {
      verify();
    }
  }, [isComplete, status]);

  const resend = async () => {
    if (isRunning) return;
    clearCode();
    setStatus("idle");
    restart();
    try {
      await authService.login({ mobileNumber });
      showToast("کد تایید مجدداً ارسال شد", "success");
    } catch {
      showToast("ارسال مجدد کد با خطا مواجه شد", "error");
    }
  };

  const changeMobileNumber = () => router.push(ROUTES.login);

  return {
    code,
    setDigit,
    clearCode,
    codeString,
    isComplete,
    status,
    verify,
    resend,
    secondsLeft,
    isRunning,
    changeMobileNumber,
    otpLength: OTP_LENGTH,
  };
}
