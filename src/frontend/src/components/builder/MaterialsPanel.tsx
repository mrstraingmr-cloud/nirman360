import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BuilderResult, MaterialItem } from "@/types/builder";
import { formatCurrency } from "@/utils/builderCalculations";
import { ChevronDown, ChevronUp, Lock, Package } from "lucide-react";
import { useState } from "react";

interface MaterialsPanelProps {
  result: BuilderResult;
  userTier: "free" | "premium" | "ultraPremium";
}

const CATEGORY_LABELS: Record<MaterialItem["category"], string> = {
  cement: "Cement & Concrete",
  steel: "Steel & Reinforcement",
  brick: "Masonry & Blocks",
  sand: "Sand & Aggregates",
  aggregate: "Aggregates",
  wood: "Wood & Timber",
  glass: "Glass & Glazing",
  paint: "Paint & Coatings",
  tile: "Flooring & Tiles",
  electrical: "Electrical",
  plumbing: "Plumbing",
  finishing: "Finishing Works",
};

const CATEGORY_COLORS: Record<MaterialItem["category"], string> = {
  cement: "bg-amber-100 text-amber-800 border-amber-200",
  steel: "bg-zinc-100 text-zinc-700 border-zinc-200",
  brick: "bg-red-100 text-red-700 border-red-200",
  sand: "bg-yellow-100 text-yellow-700 border-yellow-200",
  aggregate: "bg-stone-100 text-stone-700 border-stone-200",
  wood: "bg-orange-100 text-orange-700 border-orange-200",
  glass: "bg-sky-100 text-sky-700 border-sky-200",
  paint: "bg-purple-100 text-purple-700 border-purple-200",
  tile: "bg-teal-100 text-teal-700 border-teal-200",
  electrical: "bg-yellow-100 text-yellow-800 border-yellow-200",
  plumbing: "bg-blue-100 text-blue-700 border-blue-200",
  finishing: "bg-green-100 text-green-700 border-green-200",
};

function groupByCategory(materials: MaterialItem[]) {
  const map = new Map<MaterialItem["category"], MaterialItem[]>();
  for (const m of materials) {
    const list = map.get(m.category) ?? [];
    list.push(m);
    map.set(m.category, list);
  }
  return map;
}

function categoryTotal(items: MaterialItem[]): number {
  return items.reduce((sum, m) => sum + m.quantity * m.costPerUnit, 0);
}

interface CategorySectionProps {
  category: MaterialItem["category"];
  items: MaterialItem[];
  isBlurred: boolean;
}

function CategorySection({ category, items, isBlurred }: CategorySectionProps) {
  const [expanded, setExpanded] = useState(true);
  const total = categoryTotal(items);
  const colorClass =
    CATEGORY_COLORS[category] ?? "bg-muted/30 text-foreground border-border";
  const label = CATEGORY_LABELS[category] ?? category;

  return (
    <div className="mb-2">
      {/* Category header row */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 bg-muted/40 border border-border rounded-t-md hover:bg-muted/60 transition-smooth"
        data-ocid={`materials.category_${category}.toggle`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colorClass}`}
          >
            {label}
          </span>
          <span className="text-xs text-muted-foreground">
            {items.length} items
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="cost-value text-sm">{formatCurrency(total)}</span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Table rows */}
      {expanded && (
        <div className="overflow-x-auto border border-t-0 border-border rounded-b-md">
          <table className="w-full text-sm min-w-[640px]">
            <tbody>
              {items.map((m, i) => {
                const lineCost = m.quantity * m.costPerUnit;
                return (
                  <tr
                    key={`${m.name}-${i}`}
                    className={`${i % 2 === 0 ? "bg-card" : "bg-muted/20"} ${isBlurred ? "relative" : ""}`}
                    data-ocid={`materials.row.${i + 1}`}
                  >
                    <td
                      className={`px-3 py-2.5 font-medium text-foreground ${isBlurred ? "blur-sm select-none" : ""}`}
                    >
                      {m.name}
                    </td>
                    <td
                      className={`px-3 py-2.5 text-muted-foreground ${isBlurred ? "blur-sm select-none" : ""}`}
                    >
                      <span className="font-mono">
                        {m.quantity.toLocaleString("en-IN")} {m.unit}
                      </span>
                    </td>
                    <td
                      className={`px-3 py-2.5 text-muted-foreground text-xs ${isBlurred ? "blur-sm select-none" : ""}`}
                    >
                      {m.grade}
                    </td>
                    <td
                      className={`px-3 py-2.5 text-muted-foreground text-xs ${isBlurred ? "blur-sm select-none" : ""}`}
                    >
                      {m.brand}
                    </td>
                    <td
                      className={`px-3 py-2.5 text-right text-muted-foreground ${isBlurred ? "blur-sm select-none" : ""}`}
                    >
                      {formatCurrency(m.costPerUnit)}/{m.unit}
                    </td>
                    <td
                      className={`px-3 py-2.5 text-right font-semibold cost-value ${isBlurred ? "blur-sm select-none" : ""}`}
                    >
                      {formatCurrency(lineCost)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function MaterialsPanel({
  result,
  userTier,
}: MaterialsPanelProps) {
  const { materials } = result;
  const isFree = userTier === "free";

  const FREE_VISIBLE = 3;
  const visibleMaterials = isFree
    ? materials.slice(0, FREE_VISIBLE)
    : materials;
  const lockedMaterials = isFree ? materials.slice(FREE_VISIBLE) : [];
  const groupedVisible = groupByCategory(visibleMaterials);

  const totalCost = materials.reduce(
    (s, m) => s + m.quantity * m.costPerUnit,
    0,
  );
  const gradeLabel =
    result.input.budgetRange === "low"
      ? "Economy"
      : result.input.budgetRange === "medium"
        ? "Standard"
        : result.input.budgetRange === "high"
          ? "Premium"
          : "Luxury";

  return (
    <div className="flex flex-col h-full" data-ocid="materials.panel">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧱</span>
          <h2 className="font-display font-semibold text-foreground text-base">
            Material Specification
          </h2>
        </div>
        <Badge
          variant="outline"
          className="text-xs font-medium border-primary/40 text-primary"
        >
          {gradeLabel}
        </Badge>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-muted/20">
        <div className="px-4 py-2.5 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Total Items
          </p>
          <p className="font-semibold text-foreground text-sm mt-0.5">
            {materials.length}
          </p>
        </div>
        <div className="px-4 py-2.5 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Material Cost
          </p>
          <p className="font-semibold cost-value text-sm mt-0.5">
            {isFree ? "🔒 Upgrade" : formatCurrency(totalCost)}
          </p>
        </div>
        <div className="px-4 py-2.5 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Grade
          </p>
          <p className="font-semibold text-foreground text-sm mt-0.5">
            {gradeLabel}
          </p>
        </div>
      </div>

      {/* Table header */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs min-w-[640px]">
          <thead className="sticky top-0 z-10 bg-muted/60 border-b border-border">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wide">
                Material
              </th>
              <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wide">
                Quantity
              </th>
              <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wide">
                Grade
              </th>
              <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wide">
                Brand
              </th>
              <th className="px-3 py-2 text-right font-semibold text-muted-foreground uppercase tracking-wide">
                Cost/Unit
              </th>
              <th className="px-3 py-2 text-right font-semibold text-muted-foreground uppercase tracking-wide">
                Total
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Material rows */}
      <div
        className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5"
        data-ocid="materials.list"
      >
        {Array.from(groupedVisible.entries()).map(([cat, items]) => (
          <CategorySection
            key={cat}
            category={cat}
            items={items}
            isBlurred={false}
          />
        ))}

        {/* Locked/blurred section for free tier */}
        {isFree && lockedMaterials.length > 0 && (
          <div className="relative mt-3" data-ocid="materials.locked_section">
            {/* Blurred preview rows */}
            <div className="overflow-x-auto border border-dashed border-border rounded-md opacity-60">
              <table className="w-full text-sm min-w-[640px]">
                <tbody>
                  {lockedMaterials.map((m, i) => (
                    <tr
                      key={`locked-${m.name}`}
                      className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}
                    >
                      <td className="px-3 py-2.5 blur-sm select-none font-medium">
                        {m.name}
                      </td>
                      <td className="px-3 py-2.5 blur-sm select-none font-mono">
                        {m.quantity.toLocaleString("en-IN")} {m.unit}
                      </td>
                      <td className="px-3 py-2.5 blur-sm select-none text-xs">
                        {m.grade}
                      </td>
                      <td className="px-3 py-2.5 blur-sm select-none text-xs">
                        {m.brand}
                      </td>
                      <td className="px-3 py-2.5 blur-sm select-none text-right">
                        {formatCurrency(m.costPerUnit)}/{m.unit}
                      </td>
                      <td className="px-3 py-2.5 blur-sm select-none text-right font-semibold">
                        {formatCurrency(m.quantity * m.costPerUnit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Overlay CTA */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-md gap-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="w-5 h-5" />
                <span className="font-medium text-sm">
                  {lockedMaterials.length} more materials hidden
                </span>
              </div>
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:opacity-90 gap-1.5"
                data-ocid="materials.upgrade_button"
              >
                <Package className="w-3.5 h-3.5" />
                Unlock with Premium
              </Button>
            </div>
          </div>
        )}

        {/* Cost summary footer (non-free) */}
        {!isFree && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Total Material Cost
            </span>
            <span className="font-mono font-bold text-base cost-value">
              {formatCurrency(totalCost)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
