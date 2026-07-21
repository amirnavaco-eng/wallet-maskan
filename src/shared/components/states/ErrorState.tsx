import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Button, Typography } from "@mui/material";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "مشکلی پیش آمد",
  description = "دریافت اطلاعات با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-danger">
        <ErrorOutlineRoundedIcon fontSize="medium" />
      </div>
      <Typography variant="subtitle1" fontWeight={700} color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 260 }}>
        {description}
      </Typography>
      {onRetry && (
        <Button variant="outlined" color="primary" size="small" onClick={onRetry} sx={{ mt: 1 }}>
          تلاش مجدد
        </Button>
      )}
    </div>
  );
}
