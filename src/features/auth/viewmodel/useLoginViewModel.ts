"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/services";
import { loginSchema, type LoginSchema } from "../model/schema";
import { useToast } from "@/shared/components/toast/ToastProvider";
import { ROUTES } from "@/shared/constants/routes";

export function useLoginViewModel() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { mobileNumber: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      const response = await authService.login({ mobileNumber: values.mobileNumber });
      if (response.success) {
        router.push(`${ROUTES.otp}?mobile=${encodeURIComponent(values.mobileNumber)}`);
      } else {
        showToast(response.message ?? "ارسال کد با خطا مواجه شد", "error");
      }
    } catch {
      showToast("خطا در برقراری ارتباط. دوباره تلاش کنید.", "error");
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    register,
    onSubmit,
    errors,
    isValid,
    isSubmitting,
  };
}
