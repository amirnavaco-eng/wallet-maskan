"use client";

import { Dialog, Typography, Button } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutDialog({ open, onClose, onConfirm }: LogoutDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "24px",
          mx: 2,
          width: "100%",
          maxWidth: "400px",
          overflow: "hidden",
          boxShadow: "0 24px 48px -12px rgba(22,19,24,0.18)",
        },
      }}
    >
      <div className="relative bg-gradient-to-br from-red-50 to-orange-50 p-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-ink-600 transition-all hover:bg-white hover:shadow-md"
          aria-label="بستن"
        >
          <CloseRoundedIcon fontSize="small" />
        </button>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
            <LogoutRoundedIcon sx={{ fontSize: 40, color: "white" }} />
          </div>
        </div>

        {/* Title */}
        <Typography
          variant="h6"
          fontWeight={800}
          align="center"
          sx={{ color: "text.primary", mb: 1.5 }}
        >
          خروج از حساب کاربری
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ lineHeight: 1.7, px: 2 }}
        >
          آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
          <br />
          برای ورود مجدد نیاز به احراز هویت دارید.
        </Typography>
      </div>

      {/* Actions */}
      <div className="flex gap-3 bg-white p-6">
        <Button
          onClick={onClose}
          variant="outlined"
          fullWidth
          size="large"
          sx={{
            py: 1.5,
            fontWeight: 700,
            borderRadius: "14px",
            borderColor: "divider",
            color: "text.primary",
            "&:hover": {
              borderColor: "text.secondary",
              bgcolor: "action.hover",
            },
          }}
        >
          انصراف
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          fullWidth
          size="large"
          sx={{
            py: 1.5,
            fontWeight: 700,
            borderRadius: "14px",
            bgcolor: "error.main",
            boxShadow: "0 4px 12px -2px rgba(239, 68, 68, 0.3)",
            "&:hover": {
              bgcolor: "error.dark",
              boxShadow: "0 6px 16px -2px rgba(239, 68, 68, 0.4)",
            },
          }}
        >
          خروج از حساب
        </Button>
      </div>
    </Dialog>
  );
}
