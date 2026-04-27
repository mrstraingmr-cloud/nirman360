import { cn } from "@/lib/utils";
import { DesignTier } from "../backend";

interface TierBadgeProps {
  tier: string;
  className?: string;
  size?: "sm" | "md";
}

const tierConfig: Record<string, { label: string; classes: string }> = {
  [DesignTier.free]: {
    label: "Free",
    classes: "bg-secondary text-secondary-foreground",
  },
  [DesignTier.premium]: {
    label: "Premium",
    classes: "bg-primary/10 text-primary border border-primary/20",
  },
  [DesignTier.ultraPremium]: {
    label: "Ultra Premium",
    classes: "bg-accent/10 text-accent border border-accent/20",
  },
};

export function TierBadge({ tier, className, size = "sm" }: TierBadgeProps) {
  const config = tierConfig[tier] ?? {
    label: tier,
    classes: "bg-secondary text-secondary-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        config.classes,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
