"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profileService } from "@/lib/api/services";
import type { ProfileResponse } from "@/lib/api/types";
import { ROUTES } from "@/shared/constants/routes";
import type { LoadState } from "../model/types";

export function useProfileViewModel() {
  const router = useRouter();
  const [state, setState] = useState<LoadState>("loading");
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const load = useCallback(async () => {
    setState("loading");
    try {
      const res = await profileService.getProfile();
      setProfile(res.data);
      setState("success");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openLogoutDialog = () => setIsLogoutDialogOpen(true);
  const closeLogoutDialog = () => setIsLogoutDialogOpen(false);

  const confirmLogout = useCallback(() => {
    // TODO(backend): call a real /auth/logout endpoint and clear refresh token server-side.
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("bm_token");
    }
    setIsLogoutDialogOpen(false);
    router.push(ROUTES.login);
  }, [router]);

  return {
    state,
    profile,
    refresh: load,
    isLogoutDialogOpen,
    openLogoutDialog,
    closeLogoutDialog,
    confirmLogout,
  };
}
