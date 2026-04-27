import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  BuilderResult,
  BuildingStage,
  StageDetail,
} from "@/types/builder";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Lock,
  Users,
} from "lucide-react";
import { useState } from "react";

interface ConstructionGuidePanelProps {
  result: BuilderResult;
  userTier: "free" | "premium" | "ultraPremium";
  activeStage: BuildingStage | null;
  onStageSelect: (stage: BuildingStage) => void;
}

/** Returns whether the stage is accessible for the given tier */
function isStageAccessible(
  stageTier: "free" | "premium" | "ultraPremium",
  userTier: "free" | "premium" | "ultraPremium",
): boolean {
  if (userTier === "ultraPremium") return true;
  if (userTier === "premium") return stageTier !== "ultraPremium";
  return stageTier === "free";
}

const STAGE_DOTS: Record<string, string> = {
  site_prep: "#8B6914",
  foundation: "#6B4F2A",
  structure: "#7A7A7A",
  roofing: "#C2612A",
  electrical_plumbing: "#D4A800",
  finishing: "#4A8F5C",
  interior: "#2F6EB5",
};

const UPGRADE_LABEL: Record<"free" | "premium" | "ultraPremium", string> = {
  free: "Free",
  premium: "Premium",
  ultraPremium: "Ultra Premium",
};

interface StageCardProps {
  stage: StageDetail;
  index: number;
  isLast: boolean;
  isActive: boolean;
  accessible: boolean;
  onSelect: () => void;
  onUpgradeClick: (requiredTier: "premium" | "ultraPremium") => void;
}

function StageCard({
  stage,
  index,
  isLast,
  isActive,
  accessible,
  onSelect,
  onUpgradeClick,
}: StageCardProps) {
  const dotColor = STAGE_DOTS[stage.stage] ?? "#888";
  const daysWeeks = Math.ceil(stage.durationDays / 7);
  const isPremiumRequired =
    stage.tier === "premium" || stage.tier === "ultraPremium";

  return (
    <div className="flex gap-3" data-ocid={`guide.stage.${index}`}>
      {/* Timeline column */}
      <div className="flex flex-col items-center flex-shrink-0 w-8 pt-1">
        <button
          type="button"
          onClick={
            accessible
              ? onSelect
              : () => onUpgradeClick(stage.tier as "premium" | "ultraPremium")
          }
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 transition-smooth
            ${isActive ? "ring-2 ring-offset-2 ring-accent scale-110" : "hover:scale-105"}
            ${!accessible ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          style={{ backgroundColor: accessible ? dotColor : "#aaa" }}
          aria-label={`Stage ${index}: ${stage.title}`}
          data-ocid={`guide.stage_dot.${index}`}
        >
          {accessible ? index : <Lock className="w-3 h-3" />}
        </button>
        {!isLast && (
          <div
            className="flex-1 w-0.5 mt-1 min-h-[20px]"
            style={{ backgroundColor: accessible ? `${dotColor}40` : "#ddd" }}
          />
        )}
      </div>

      {/* Content column */}
      <div className="flex-1 pb-4">
        <button
          type="button"
          className={`w-full text-left rounded-lg border transition-smooth p-3
            ${isActive ? "border-accent bg-accent/5 shadow-sm" : "border-border bg-card hover:border-muted-foreground/40"}
            ${!accessible ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={
            accessible
              ? onSelect
              : () => onUpgradeClick(stage.tier as "premium" | "ultraPremium")
          }
          data-ocid={`guide.stage_card.${index}`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-foreground truncate">
                  {stage.title}
                </span>
                {isActive && (
                  <Badge className="bg-accent text-accent-foreground text-xs px-1.5 py-0 h-4">
                    Active
                  </Badge>
                )}
                {!accessible && isPremiumRequired && (
                  <Badge
                    variant="outline"
                    className="text-xs border-muted-foreground/30 text-muted-foreground gap-1 h-4 px-1.5 py-0"
                  >
                    <Lock className="w-2.5 h-2.5" />
                    {UPGRADE_LABEL[stage.tier]}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {stage.durationDays} days (~{daysWeeks}w)
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {stage.manpower} workers
                </span>
              </div>
            </div>
            {accessible &&
              (isActive ? (
                <ChevronUp className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              ))}
          </div>
        </button>

        {/* Expanded content */}
        {isActive && accessible && (
          <div
            className="mt-2 px-3 py-3 rounded-lg bg-muted/20 border border-border space-y-3 text-sm"
            data-ocid={`guide.stage_detail.${index}`}
          >
            <p className="text-muted-foreground leading-relaxed">
              {stage.description}
            </p>

            {/* Activities */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground mb-2">
                Key Activities
              </p>
              <ul className="space-y-1.5">
                {stage.activities.map((act) => (
                  <li
                    key={act}
                    className="flex items-start gap-2 text-muted-foreground text-xs"
                  >
                    <span
                      className="mt-0.5 w-3.5 h-3.5 flex-shrink-0 rounded border border-muted-foreground/30 bg-background flex items-center justify-center"
                      aria-hidden
                    >
                      <span className="w-1.5 h-1.5 rounded-sm bg-accent/60" />
                    </span>
                    {act}
                  </li>
                ))}
              </ul>
            </div>

            {/* Manpower + duration detail */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-2 p-2 bg-card rounded-md border border-border">
                <Users className="w-3.5 h-3.5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Manpower</p>
                  <p className="text-xs font-semibold text-foreground">
                    {stage.manpower} workers
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-card rounded-md border border-border">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-xs font-semibold text-foreground">
                    {stage.durationDays}d (~{daysWeeks}w)
                  </p>
                </div>
              </div>
            </div>

            {/* Materials */}
            {stage.materials.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground mb-1.5">
                  Materials
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {stage.materials.map((m) => (
                    <span
                      key={m.name}
                      className="text-xs px-2 py-0.5 bg-muted/50 border border-border rounded-full text-muted-foreground"
                    >
                      {m.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Locked inline message */}
        {!accessible && isActive && (
          <div
            className="mt-2 px-3 py-2.5 rounded-lg bg-muted/10 border border-dashed border-muted-foreground/30 text-xs text-muted-foreground flex items-center gap-2"
            data-ocid={`guide.stage_locked.${index}`}
          >
            <Lock className="w-3.5 h-3.5 flex-shrink-0" />
            Upgrade to{" "}
            <span className="font-semibold text-primary">
              {stage.tier === "ultraPremium" ? "Ultra Premium" : "Premium"}
            </span>{" "}
            to unlock this stage
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConstructionGuidePanel({
  result,
  userTier,
  activeStage,
  onStageSelect,
}: ConstructionGuidePanelProps) {
  const { stages } = result;
  const [upgradeMessage, setUpgradeMessage] = useState<string | null>(null);

  const totalDays = stages.reduce((s, st) => s + st.durationDays, 0);
  const totalMonths = (totalDays / 30).toFixed(1);
  const avgManpower = Math.round(
    stages.reduce((s, st) => s + st.manpower, 0) / stages.length,
  );

  function handleUpgradeClick(requiredTier: "premium" | "ultraPremium") {
    const label = requiredTier === "ultraPremium" ? "Ultra Premium" : "Premium";
    setUpgradeMessage(`Upgrade to ${label} to unlock this stage`);
    setTimeout(() => setUpgradeMessage(null), 4000);
  }

  return (
    <div className="flex flex-col h-full" data-ocid="guide.panel">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-lg">🪜</span>
          <h2 className="font-display font-semibold text-foreground text-base">
            Construction Guide
          </h2>
        </div>
        <Badge
          variant="outline"
          className="text-xs font-medium border-muted-foreground/30 text-muted-foreground"
        >
          {stages.length} Stages
        </Badge>
      </div>

      {/* Upgrade toast */}
      {upgradeMessage && (
        <div
          className="mx-4 mt-3 px-3 py-2 rounded-md bg-primary/10 border border-primary/30 text-xs text-primary font-medium flex items-center gap-2"
          data-ocid="guide.upgrade_toast"
        >
          <Lock className="w-3.5 h-3.5" />
          {upgradeMessage}
        </div>
      )}

      {/* Stage list */}
      <div
        className="flex-1 overflow-y-auto px-4 pt-4 pb-2"
        data-ocid="guide.stage_list"
      >
        {stages.map((stage, i) => {
          const accessible = isStageAccessible(stage.tier, userTier);
          return (
            <StageCard
              key={stage.stage}
              stage={stage}
              index={i + 1}
              isLast={i === stages.length - 1}
              isActive={activeStage === stage.stage}
              accessible={accessible}
              onSelect={() => onStageSelect(stage.stage)}
              onUpgradeClick={handleUpgradeClick}
            />
          );
        })}
      </div>

      {/* Timeline summary */}
      <div
        className="border-t border-border bg-muted/20 px-4 py-3"
        data-ocid="guide.timeline_summary"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Total Duration</p>
              <p className="text-sm font-semibold text-foreground">
                {totalDays} days{" "}
                <span className="text-muted-foreground font-normal text-xs">
                  (~{totalMonths} mo)
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Avg. Team Size</p>
              <p className="text-sm font-semibold text-foreground">
                {avgManpower}{" "}
                <span className="text-muted-foreground font-normal text-xs">
                  workers
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra Premium CTA */}
      {userTier === "ultraPremium" && (
        <div className="px-4 pb-4 pt-2" data-ocid="guide.consultation_cta">
          <Button
            className="w-full bg-accent text-accent-foreground hover:opacity-90 gap-2 font-medium"
            data-ocid="guide.schedule_consultation_button"
          >
            <Calendar className="w-4 h-4" />
            Schedule a Consultation
          </Button>
        </div>
      )}

      {/* Free/Premium upgrade prompt */}
      {userTier !== "ultraPremium" && (
        <div
          className="px-4 pb-4 pt-2 text-center"
          data-ocid="guide.tier_upgrade_prompt"
        >
          <p className="text-xs text-muted-foreground mb-2">
            {userTier === "free"
              ? "Unlock 4 more stages with Premium or Ultra Premium"
              : "Unlock the Interior stage with Ultra Premium"}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-primary/40 text-primary hover:bg-primary/10 gap-1.5"
            data-ocid="guide.upgrade_prompt_button"
          >
            <Lock className="w-3.5 h-3.5" />
            {userTier === "free"
              ? "Upgrade to Premium"
              : "Upgrade to Ultra Premium"}
          </Button>
        </div>
      )}
    </div>
  );
}
