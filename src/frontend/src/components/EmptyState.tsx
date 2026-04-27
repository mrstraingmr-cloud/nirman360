import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-ocid="empty_state"
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-8 text-center",
        className,
      )}
    >
      {icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
