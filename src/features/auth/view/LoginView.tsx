"use client";

import { Button, TextField, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useLoginViewModel } from "../viewmodel/useLoginViewModel";
import { GirihPattern } from "@/shared/components/GirihPattern";

export function LoginView() {
  const { register, onSubmit, errors, isValid, isSubmitting } = useLoginViewModel();

  return (
    <div className="flex min-h-dvh flex-col">
      {/* Hero banner — sunset gradient with etched girih texture, the app's signature motif */}
      <div
        className="relative flex h-[42vh] min-h-[280px] flex-col items-center justify-center overflow-hidden px-6"
        style={{
          background:
            "radial-gradient(120% 120% at 20% 0%, #FFB366 0%, transparent 55%), linear-gradient(160deg, #FF8A3D 0%, #F76B1C 50%, #BC420B 100%)",
        }}
      >
        <GirihPattern id="login-girih" className="absolute inset-0" opacity={0.12} size={54} />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-black/10" />
        <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/10" />

        <div className="animate-in relative flex flex-col items-center">
          <div className="glow-pulse mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/95 text-brand-600">
            <HomeRoundedIcon sx={{ fontSize: 40 }} />
          </div>
          <Typography variant="h5" fontWeight={800} color="white" textAlign="center">
            بانک مسکن
          </Typography>
          <Typography variant="body2" textAlign="center" sx={{ mt: 1, color: "rgba(255,255,255,0.9)" }}>
            کیف پول دیجیتال، همراه همیشگی خانه شما
          </Typography>
        </div>
      </div>

      {/* Floating form panel overlapping the hero */}
      <div className="animate-in relative -mt-8 flex-1 rounded-t-[32px] bg-white px-6 pb-10 pt-8 shadow-[0_-16px_40px_-24px_rgba(22,19,24,0.25)]">
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
              شماره موبایل
            </Typography>
            <TextField
              {...register("mobileNumber")}
              fullWidth
              placeholder="۰۹۱۲۱۲۳۴۵۶۷"
              inputMode="numeric"
              autoFocus
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber?.message}
              slotProps={{ htmlInput: { maxLength: 11 } }}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={!isValid || isSubmitting}
            sx={{ mt: 2, py: 1.6, fontSize: "1rem" }}
          >
            {isSubmitting ? "در حال ارسال کد..." : "ادامه"}
          </Button>

          <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
            با ادامه، شرایط و قوانین بانک مسکن را می‌پذیرید.
          </Typography>
        </form>
      </div>
    </div>
  );
}
