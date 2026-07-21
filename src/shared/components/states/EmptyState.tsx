import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { Typography } from "@mui/material";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted text-ink-300">
        {icon ?? <InboxOutlinedIcon fontSize="medium" />}
      </div>
      <Typography variant="subtitle1" fontWeight={700} color="text.primary">
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 260 }}>
          {description}
        </Typography>
      )}
    </div>
  );
}
