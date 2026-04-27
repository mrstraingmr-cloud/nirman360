import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Clock, Lock } from "lucide-react";
import type { ConstructionStep } from "../types";

// ── Stage type → color mapping ────────────────────────────────────────────────

const STAGE_TYPE_CONFIG: Record<
  string,
  { label: string; color: string; iconBg: string }
> = {
  FOUNDATION: {
    label: "Foundation",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    iconBg: "bg-amber-500",
  },
  STRUCTURE: {
    label: "Structure",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    iconBg: "bg-blue-600",
  },
  MEP: {
    label: "MEP",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    iconBg: "bg-purple-600",
  },
  ENCLOSURE: {
    label: "Enclosure",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    iconBg: "bg-emerald-600",
  },
  INTERIOR: {
    label: "Interior",
    color: "bg-rose-100 text-rose-800 border-rose-200",
    iconBg: "bg-rose-600",
  },
};

// ── Stage Progress Strip (compact, used in Overview tab) ──────────────────────

interface StageProgressStripProps {
  stages: ConstructionStep[];
  isPremium: boolean;
  onViewStages: () => void;
}

export function StageProgressStrip({
  stages,
  isPremium,
  onViewStages,
}: StageProgressStripProps) {
  const stageSteps = stages.filter((s) => s.stageName).slice(0, 5);
  if (stageSteps.length === 0) return null;

  return (
    <div
      className="rounded-xl border border-border bg-card overflow-hidden"
      data-ocid="design.overview.stages_strip"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="font-display font-semibold text-sm text-foreground">
          Construction Journey
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-accent text-xs gap-1 h-7 hover:bg-accent/10"
          onClick={onViewStages}
          data-ocid="design.overview.view_stages_button"
        >
          View Details <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex overflow-x-auto">
        {stageSteps.map((stage, i) => {
          const isLocked = !isPremium && i > 0;
          const typeConfig = stage.stageType
            ? STAGE_TYPE_CONFIG[stage.stageType]
            : null;
          return (
            <div
              key={stage.step.toString()}
              className="flex-1 min-w-[120px] flex flex-col items-center text-center p-3 relative group"
            >
              {/* Connector line */}
              {i < stageSteps.length - 1 && (
                <div className="absolute top-[22px] left-[60%] right-0 h-px bg-border z-0" />
              )}
              {/* Stage number circle */}
              <div
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                  isLocked
                    ? "bg-muted text-muted-foreground"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                {isLocked ? <Lock className="h-4 w-4" /> : Number(stage.step)}
              </div>
              <p
                className={`text-xs font-semibold leading-tight mb-1 ${isLocked ? "text-muted-foreground" : "text-foreground"}`}
              >
                {stage.stageName}
              </p>
              {typeConfig && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${typeConfig.color}`}
                >
                  {typeConfig.label}
                </span>
              )}
              <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-0.5">
                <Clock className="h-2.5 w-2.5" />
                {Number(stage.durationDays)}d
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Single Stage Card ─────────────────────────────────────────────────────────

interface StageCardProps {
  stage: ConstructionStep;
  index: number;
  isPremium: boolean;
  onUpgrade: () => void;
}

function StageCard({ stage, index, isPremium, onUpgrade }: StageCardProps) {
  const isLocked = !isPremium && index > 0;
  const typeConfig = stage.stageType
    ? STAGE_TYPE_CONFIG[stage.stageType]
    : null;
  const activities = stage.activities
    ? stage.activities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)
    : [];

  // For free users, only show first sentence of description
  const descriptionFull = stage.description ?? "";
  const firstSentence =
    descriptionFull.split(/\.\s+/)[0] +
    (descriptionFull.includes(".") ? "." : "");
  const descriptionPreview = isLocked ? firstSentence : descriptionFull;

  return (
    <div
      className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      data-ocid={`design.stages.item.${index + 1}`}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/30">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
            isLocked
              ? "bg-muted text-muted-foreground"
              : "bg-accent text-accent-foreground"
          }`}
        >
          {isLocked ? <Lock className="h-4 w-4" /> : Number(stage.step)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-display font-bold text-base leading-tight ${isLocked ? "text-muted-foreground" : "text-foreground"}`}
            >
              {stage.stageName ?? `Stage ${Number(stage.step)}`}
            </h3>
            {typeConfig && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-semibold tracking-wide ${typeConfig.color}`}
              >
                {stage.stageType}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <Clock className="h-3 w-3" />
            {Number(stage.durationDays)} days
          </p>
        </div>
      </div>

      {/* Stage Image */}
      {stage.stageImageUrl ? (
        <div className="relative w-full aspect-[16/7] overflow-hidden">
          <img
            src={stage.stageImageUrl}
            alt={stage.stageName ?? `Stage ${Number(stage.step)}`}
            className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
              isLocked ? "blur-md opacity-50 scale-105" : ""
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="bg-card/90 backdrop-blur-sm rounded-xl px-5 py-4 flex flex-col items-center gap-2 shadow-lg border border-border">
                <Lock className="h-6 w-6 text-accent" />
                <p className="text-sm font-semibold text-foreground">
                  Upgrade to Premium
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  Unlock full stage visualization
                </p>
                <Button
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground mt-1"
                  onClick={onUpgrade}
                  data-ocid={`design.stages.upgrade_button.${index + 1}`}
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Description & Activities */}
      <div className="p-4 space-y-4">
        {/* Description */}
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {descriptionPreview}
          </p>
          {isLocked && descriptionFull.length > firstSentence.length && (
            <div className="relative mt-2">
              <p className="text-sm text-muted-foreground leading-relaxed blur-sm select-none pointer-events-none line-clamp-2 opacity-60">
                {descriptionFull.slice(firstSentence.length).trim()}
              </p>
            </div>
          )}
        </div>

        {/* Key Activities */}
        {activities.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Key Activities
            </p>
            {isLocked ? (
              <div className="space-y-1">
                {/* Show first 2, blur rest */}
                {activities.slice(0, 2).map((act) => (
                  <div
                    key={act}
                    className="flex items-center gap-2 text-xs text-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {act}
                  </div>
                ))}
                {activities.length > 2 && (
                  <div className="blur-sm opacity-40 pointer-events-none select-none">
                    {activities.slice(2, 5).map((act) => (
                      <div
                        key={act}
                        className="flex items-center gap-2 text-xs text-foreground mt-1"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                        {act}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
                {activities.map((act) => (
                  <div
                    key={act}
                    className="flex items-center gap-2 text-xs text-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {act}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Full Construction Stages Section ─────────────────────────────────────────

interface ConstructionStagesProps {
  steps: ConstructionStep[];
  isPremium: boolean;
  onUpgrade: () => void;
  id?: string;
}

export function ConstructionStages({
  steps,
  isPremium,
  onUpgrade,
  id,
}: ConstructionStagesProps) {
  const stages = steps.filter((s) => s.stageName).slice(0, 5);
  const extraSteps = steps.filter((s) => !s.stageName || Number(s.step) > 5);

  if (stages.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground rounded-xl border border-dashed border-border">
        <Clock className="h-12 w-12 mx-auto mb-3 opacity-40" />
        <p className="font-medium mb-1">
          Construction stages available with Premium
        </p>
        <Button
          size="sm"
          onClick={onUpgrade}
          className="mt-2 bg-accent hover:bg-accent/90 text-accent-foreground"
          data-ocid="design.guide.upgrade_button"
        >
          Upgrade Now
        </Button>
      </div>
    );
  }

  // Total duration
  const totalDays = stages.reduce((sum, s) => sum + Number(s.durationDays), 0);

  return (
    <div id={id} className="space-y-6" data-ocid="design.stages.section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-display font-bold text-lg text-foreground">
            Step-by-Step Construction Guide
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {stages.length} stages · ~{totalDays} days total construction time
          </p>
        </div>
        {!isPremium && (
          <Badge
            variant="outline"
            className="border-accent/40 text-accent bg-accent/5 text-xs self-start sm:self-auto"
          >
            <Lock className="h-3 w-3 mr-1" /> Upgrade to unlock all stages
          </Badge>
        )}
      </div>

      {/* Horizontal Progress Indicator */}
      <div
        className="rounded-xl border border-border bg-card p-4"
        data-ocid="design.stages.progress"
      >
        <div className="flex items-start gap-0">
          {stages.map((stage, i) => {
            const isLocked = !isPremium && i > 0;
            return (
              <div
                key={stage.step.toString()}
                className="flex-1 flex flex-col items-center"
              >
                <div className="flex items-center w-full">
                  {/* Connector before */}
                  {i > 0 && (
                    <div
                      className={`flex-1 h-0.5 ${isLocked ? "bg-border" : "bg-accent/40"}`}
                    />
                  )}
                  {/* Node */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border-2 transition-all ${
                      isLocked
                        ? "bg-muted border-border text-muted-foreground"
                        : "bg-accent border-accent text-accent-foreground"
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="h-3 w-3" />
                    ) : (
                      Number(stage.step)
                    )}
                  </div>
                  {/* Connector after */}
                  {i < stages.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 ${!isPremium && i >= 0 ? "bg-border" : "bg-accent/40"}`}
                    />
                  )}
                </div>
                <div className="mt-2 text-center px-1">
                  <p
                    className={`text-[11px] font-semibold leading-tight ${isLocked ? "text-muted-foreground" : "text-foreground"}`}
                  >
                    {stage.stageName}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {Number(stage.durationDays)}d
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Cards */}
      <div className="space-y-5">
        {stages.map((stage, i) => (
          <StageCard
            key={stage.step.toString()}
            stage={stage}
            index={i}
            isPremium={isPremium}
            onUpgrade={onUpgrade}
          />
        ))}
      </div>

      {/* Extra detailed steps (step 6+) */}
      {extraSteps.length > 0 && (
        <div className="pt-2">
          <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
            Detailed Construction Steps
          </h3>
          <ol className="space-y-3">
            {(isPremium ? extraSteps : extraSteps.slice(0, 2)).map(
              (step, i) => (
                <li
                  key={step.step.toString()}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                  data-ocid={`design.guide.item.${i + 1}`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {Number(step.step)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {Number(step.durationDays)} days
                    </p>
                  </div>
                </li>
              ),
            )}
          </ol>
        </div>
      )}
    </div>
  );
}
