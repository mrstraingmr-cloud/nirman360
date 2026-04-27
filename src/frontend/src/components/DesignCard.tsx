import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { BookmarkCheck, BookmarkPlus, Gift, Lock, MapPin } from "lucide-react";
import type { DesignSummary } from "../backend.d.ts";
import { useFreeTierStatus } from "../hooks/useTierAccess";
import { CATEGORY_LABELS } from "../types";
import { DESIGN_PREVIEWS, hasSvgPreview } from "./DesignPreview";
import { PriceDisplay } from "./PriceDisplay";
import { TierBadge } from "./TierBadge";

interface DesignCardProps {
  design: DesignSummary;
  isSaved?: boolean;
  onSave?: (id: bigint) => void;
  onRemove?: (id: bigint) => void;
  index?: number;
}

export function DesignCard({
  design,
  isSaved = false,
  onSave,
  onRemove,
  index = 0,
}: DesignCardProps) {
  const categoryLabel = CATEGORY_LABELS[design.category] ?? design.category;
  const { hasUsedFreeProject } = useFreeTierStatus();

  // A free user who hasn't used their project yet can try any design
  const isFreeAvailable = !hasUsedFreeProject;
  // Premium gate: only show lock when free trial is exhausted AND design requires premium+
  const isPremiumGated =
    design.tier === "premium" || design.tier === "ultraPremium";
  const showLock = isPremiumGated && !isFreeAvailable;
  const showTryFree = isPremiumGated && isFreeAvailable;

  return (
    <div
      data-ocid={`design.item.${index + 1}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-smooth hover:shadow-xl hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        {hasSvgPreview(design.id) ? (
          <div className="h-full w-full">
            {(() => {
              const SvgComp = DESIGN_PREVIEWS[design.id.toString()];
              return SvgComp ? (
                <SvgComp
                  className={cn(
                    "h-full w-full transition-smooth group-hover:scale-105",
                    showLock && "opacity-75",
                  )}
                />
              ) : null;
            })()}
          </div>
        ) : (
          <img
            src={
              design.previewImageUrl ||
              "/assets/generated/house-2bhk.dim_600x400.jpg"
            }
            alt={design.title}
            className={cn(
              "h-full w-full object-cover transition-smooth group-hover:scale-105",
              showLock && "opacity-75",
            )}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/generated/house-2bhk.dim_600x400.jpg";
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Top left: tier badge OR "Try Free" label */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {showTryFree ? (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm"
              style={{
                background: "oklch(0.62 0.18 32 / 0.92)",
                color: "oklch(0.99 0 0)",
              }}
            >
              <Gift className="h-3 w-3" />
              Try Free
            </span>
          ) : (
            <TierBadge tier={design.tier} />
          )}
        </div>

        {/* Save button */}
        <button
          type="button"
          data-ocid={`design.save_button.${index + 1}`}
          onClick={(e) => {
            e.preventDefault();
            if (isSaved) {
              onRemove?.(design.id);
            } else {
              onSave?.(design.id);
            }
          }}
          aria-label={isSaved ? "Remove from saved" : "Save design"}
          className={cn(
            "absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full transition-smooth",
            isSaved
              ? "bg-accent text-accent-foreground shadow-md"
              : "bg-card/80 text-foreground hover:bg-accent hover:text-accent-foreground backdrop-blur-sm",
          )}
        >
          {isSaved ? (
            <BookmarkCheck className="h-4 w-4" />
          ) : (
            <BookmarkPlus className="h-4 w-4" />
          )}
        </button>

        {/* Premium gate overlay */}
        {showLock && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]"
            style={{ background: "oklch(0.15 0.04 265 / 0.55)" }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: "oklch(0.28 0.09 265 / 0.9)" }}
            >
              <Lock
                className="h-5 w-5"
                style={{ color: "oklch(0.75 0.2 32)" }}
              />
            </div>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "oklch(0.28 0.09 265 / 0.9)",
                color: "oklch(0.9 0.02 265)",
              }}
            >
              Premium Required
            </span>
          </div>
        )}

        {/* Category pill */}
        <div className="absolute bottom-3 left-3">
          <Badge
            variant="secondary"
            className="text-xs bg-card/90 backdrop-blur-sm"
          >
            {categoryLabel}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">
            {design.title}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {design.bhk && (
            <span className="flex items-center gap-1">
              <span className="font-medium text-foreground">
                {Number(design.bhk)}BHK
              </span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {Number(design.areaSqft).toLocaleString("en-IN")} sq.ft
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mt-auto pt-1">
          {design.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
          <PriceDisplay
            min={design.estimatedCostMin}
            max={design.estimatedCostMax}
            className="text-sm font-semibold text-foreground"
          />
          {showLock ? (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-primary text-primary"
            >
              <Link to="/pricing" data-ocid={`design.upgrade.${index + 1}`}>
                Upgrade
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm" variant="default">
              <Link
                to="/design/$id"
                params={{ id: design.id.toString() }}
                data-ocid={`design.link.${index + 1}`}
              >
                {showTryFree ? "Try Free" : "View Details"}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
