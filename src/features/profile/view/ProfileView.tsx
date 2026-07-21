"use client";

import { Typography, Button, Avatar } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useProfileViewModel } from "../viewmodel/useProfileViewModel";
import { ProfileField } from "./components/ProfileField";
import { LogoutDialog } from "./components/LogoutDialog";
import { BlockSkeleton } from "@/shared/components/skeleton/Skeletons";
import { ErrorState } from "@/shared/components/states/ErrorState";
import { toPersianDigits } from "@/shared/utils/format";
import { APP_VERSION } from "../model/types";
import { GirihPattern } from "@/shared/components/GirihPattern";

export function ProfileView() {
  const {
    state,
    profile,
    refresh,
    isLogoutDialogOpen,
    openLogoutDialog,
    closeLogoutDialog,
    confirmLogout,
  } = useProfileViewModel();

  return (
    <div className="animate-in stagger flex flex-col gap-5 px-4 pb-4 pt-6">
      <div className="px-1">
        <Typography variant="subtitle1" fontWeight={800}>
          پروفایل
        </Typography>
        <Typography variant="caption" color="text.secondary">
          اطلاعات حساب کاربری شما
        </Typography>
      </div>

      {state === "error" && <ErrorState onRetry={refresh} />}

      {state === "loading" && (
        <>
          <BlockSkeleton className="h-24" />
          <BlockSkeleton className="h-56" />
        </>
      )}

      {state === "success" && profile && (
        <>
          <div
            className="relative flex flex-col items-center gap-2 overflow-hidden rounded-xl3 p-7 text-white shadow-glow"
            style={{
              background:
                "radial-gradient(120% 140% at 100% 0%, #FFB366 0%, transparent 55%), linear-gradient(140deg, #FF8A3D 0%, #F76B1C 55%, #BC420B 100%)",
            }}
          >
            <GirihPattern id="profile-girih" className="absolute inset-0" opacity={0.14} size={46} />
            <Avatar
              sx={{
                width: 72,
                height: 72,
                bgcolor: "rgba(255,255,255,0.2)",
                border: "2px solid rgba(255,255,255,0.5)",
                fontWeight: 800,
                fontSize: 26,
                position: "relative",
              }}
            >
              {profile.fullName.charAt(0)}
            </Avatar>
            <Typography variant="subtitle1" fontWeight={800} sx={{ position: "relative" }}>
              {profile.fullName}
            </Typography>
            <Typography variant="caption" sx={{ position: "relative", color: "rgba(255,255,255,0.85)" }} dir="ltr">
              {toPersianDigits(profile.mobileNumber)}
            </Typography>
          </div>

          <div className="rounded-xl3 bg-white px-4 shadow-soft">
            <ProfileField label="نام و نام خانوادگی" value={profile.fullName} />
            <ProfileField label="کد ملی" value={profile.nationalId} isNumeric />
            <ProfileField label="شماره موبایل" value={profile.mobileNumber} isNumeric />
            <ProfileField label="شناسه مشتری" value={profile.customerId} />
          </div>

          <Button
            variant="outlined"
            color="error"
            size="large"
            startIcon={<LogoutRoundedIcon />}
            onClick={openLogoutDialog}
            sx={{ py: 1.4 }}
          >
            خروج از حساب
          </Button>

          <Typography variant="caption" color="text.secondary" textAlign="center">
            نسخه اپلیکیشن {toPersianDigits(APP_VERSION)}
          </Typography>

          <LogoutDialog open={isLogoutDialogOpen} onClose={closeLogoutDialog} onConfirm={confirmLogout} />
        </>
      )}
    </div>
  );
}
