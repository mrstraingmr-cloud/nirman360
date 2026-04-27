import { Badge } from "@/components/ui/badge";
import type { BuilderResult } from "@/types/builder";
import { formatCurrency } from "@/utils/builderCalculations";
import {
  ChevronDown,
  ChevronUp,
  Hammer,
  IndianRupee,
  Lock,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useState } from "react";

interface CostPanelProps {
  result: BuilderResult;
  userTier: "free" | "premium" | "ultraPremium";
}

const CATEGORY_DISPLAY: Record<string, { label: string; emoji: string }> = {
  cement: { label: "Cement", emoji: "🧱" },
  steel: { label: "Steel", emoji: "⚙️" },
  brick: { label: "Masonry", emoji: "🏗️" },
  sand: { label: "Sand", emoji: "🏖️" },
  aggregate: { label: "Aggregates", emoji: "⛏️" },
  wood: { label: "Wood", emoji: "🪵" },
  glass: { label: "Glass", emoji: "🪟" },
  paint: { label: "Paint", emoji: "🎨" },
  tile: { label: "Flooring", emoji: "🔲" },
  electrical: { label: "Electrical", emoji: "⚡" },
  plumbing: { label: "Plumbing", emoji: "🚿" },
  finishing: { label: "Finishing", emoji: "✨" },
};

interface CostCardProps {
  icon: React.ReactNode;
  label: string;
  amount: number;
  percentage: number;
  accentClass: string;
  barClass: string;
}

function CostCard({
  icon,
  label,
  amount,
  percentage,
  accentClass,
  barClass,
}: CostCardProps) {
  return (
    <div
      className={`relative p-4 rounded-lg border ${accentClass} bg-card overflow-hidden`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-muted/40">{icon}</div>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <Badge variant="outline" className="text-xs font-mono">
          {percentage.toFixed(1)}%
        </Badge>
      </div>
      <p className="font-mono font-bold text-xl text-foreground mb-2">
        {formatCurrency(amount)}
      </p>
      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-smooth ${barClass}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function CostPanel({ result, userTier }: CostPanelProps) {
  const [categoryExpanded, setCategoryExpanded] = useState(false);
  const { cost, input, builtUpArea, totalArea } = result;
  const {
    materialCost,
    laborCost,
    finishingCost,
    totalCost,
    costPerSqFt,
    byCategory,
  } = cost;
  const isFree = userTier === "free";
  const isPremiumOrAbove =
    userTier === "premium" || userTier === "ultraPremium";

  const materialPct = totalCost > 0 ? (materialCost / totalCost) * 100 : 0;
  const laborPct = totalCost > 0 ? (laborCost / totalCost) * 100 : 0;
  const finishingPct = totalCost > 0 ? (finishingCost / totalCost) * 100 : 0;

  const budgetLabel =
    input.budgetRange === "low"
      ? "Economy"
      : input.budgetRange === "medium"
        ? "Standard"
        : input.budgetRange === "high"
          ? "Premium"
          : "Luxury";

  // Category entries sorted by cost desc
  const categoryEntries = Object.entries(byCategory)
    .sort(([, a], [, b]) => b - a)
    .map(([cat, val]) => ({
      cat,
      val,
      pct: totalCost > 0 ? (val / totalCost) * 100 : 0,
    }));

  const maxCatCost = categoryEntries.length > 0 ? categoryEntries[0].val : 1;

  return (
    <div className="flex flex-col h-full" data-ocid="cost.panel">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-lg">💰</span>
          <h2 className="font-display font-semibold text-foreground text-base">
            Cost Estimation
          </h2>
        </div>
        <Badge
          variant="outline"
          className="text-xs border-accent/40 text-accent font-medium"
        >
          {budgetLabel} Budget
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* 3 cost cards */}
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          data-ocid="cost.breakdown_cards"
        >
          <CostCard
            icon={<Hammer className="w-4 h-4 text-accent" />}
            label="Material Cost"
            amount={materialCost}
            percentage={materialPct}
            accentClass="border-accent/30"
            barClass="bg-accent"
            data-ocid="cost.material_card"
          />
          <CostCard
            icon={<Wrench className="w-4 h-4 text-primary" />}
            label="Labour Cost"
            amount={laborCost}
            percentage={laborPct}
            accentClass="border-primary/30"
            barClass="bg-primary"
            data-ocid="cost.labor_card"
          />
          <CostCard
            icon={<Sparkles className="w-4 h-4 text-chart-3" />}
            label="Finishing Cost"
            amount={finishingCost}
            percentage={finishingPct}
            accentClass="border-chart-3/30"
            barClass="bg-chart-3"
            data-ocid="cost.finishing_card"
          />
        </div>

        {/* Total cost card */}
        <div
          className="rounded-xl bg-primary p-5 text-primary-foreground"
          data-ocid="cost.total_card"
        >
          <div className="flex items-center gap-2 mb-1">
            <IndianRupee className="w-4 h-4 opacity-70" />
            <span className="text-xs font-medium uppercase tracking-widest opacity-70">
              Total Estimated Cost
            </span>
          </div>
          <p className="font-mono font-extrabold text-2xl sm:text-3xl tracking-tight">
            {formatCurrency(totalCost)}
          </p>
          <div className="mt-3 pt-3 border-t border-primary-foreground/20 grid grid-cols-3 gap-4 text-xs">
            <div>
              <p className="opacity-60 mb-0.5">Per sq.ft</p>
              <p className="font-mono font-semibold">
                {formatCurrency(costPerSqFt)}/sqft
              </p>
            </div>
            <div>
              <p className="opacity-60 mb-0.5">Built-up Area</p>
              <p className="font-mono font-semibold">
                {Math.round(builtUpArea * 10.764)} sqft
              </p>
            </div>
            <div>
              <p className="opacity-60 mb-0.5">Plot Area</p>
              <p className="font-mono font-semibold">
                {Math.round(totalArea * 10.764)} sqft
              </p>
            </div>
          </div>
        </div>

        {/* Category breakdown (premium+) */}
        <div
          className="border border-border rounded-lg overflow-hidden"
          data-ocid="cost.category_section"
        >
          <button
            type="button"
            onClick={() => {
              if (isPremiumOrAbove) setCategoryExpanded((v) => !v);
            }}
            className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-smooth"
            data-ocid="cost.category_toggle"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                Cost by Category
              </span>
              {!isPremiumOrAbove && (
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </div>
            {isPremiumOrAbove ? (
              categoryExpanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )
            ) : (
              <span className="text-xs text-muted-foreground">Premium</span>
            )}
          </button>

          {isPremiumOrAbove && categoryExpanded && (
            <div
              className="px-4 py-3 space-y-2.5 bg-card"
              data-ocid="cost.category_breakdown"
            >
              {categoryEntries.map(({ cat, val, pct }) => {
                const display = CATEGORY_DISPLAY[cat] ?? {
                  label: cat,
                  emoji: "📦",
                };
                const barWidth = maxCatCost > 0 ? (val / maxCatCost) * 100 : 0;
                return (
                  <div key={cat} data-ocid={`cost.category.${cat}`}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-foreground font-medium">
                        {display.emoji} {display.label}
                      </span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-muted-foreground">
                          {pct.toFixed(1)}%
                        </span>
                        <span className="font-semibold cost-value">
                          {formatCurrency(val)}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent/70 rounded-full transition-smooth"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!isPremiumOrAbove && (
            <div
              className="px-4 py-4 bg-card/50 text-center"
              data-ocid="cost.category_locked"
            >
              <p className="text-sm text-muted-foreground">
                Upgrade to{" "}
                <span className="font-semibold text-primary">Premium</span> to
                unlock category-wise breakdown
              </p>
            </div>
          )}
        </div>

        {/* Budget note */}
        <div
          className="rounded-md bg-muted/30 border border-border px-4 py-3 text-xs text-muted-foreground space-y-1"
          data-ocid="cost.budget_note"
        >
          <p>
            📍 Based on{" "}
            <span className="font-medium text-foreground">{budgetLabel}</span>{" "}
            budget in{" "}
            <span className="font-medium text-foreground">
              {input.location || "your location"}
            </span>
          </p>
          <p>
            ⚠️ Estimate may vary ±15–20% based on market conditions &amp;
            material availability.
          </p>
          {isFree && (
            <p className="text-primary font-medium pt-1">
              🔓 Upgrade to Premium for detailed category breakdown and itemized
              report.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
