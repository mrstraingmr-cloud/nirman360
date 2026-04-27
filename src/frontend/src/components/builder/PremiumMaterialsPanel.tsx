import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BuilderResult } from "@/types/builder";
import { formatCurrency } from "@/utils/builderCalculations";
import { Download, Package } from "lucide-react";
import { useState } from "react";
import { UpgradeModal } from "../UpgradeModal";

type UserTier = "free" | "premium" | "ultraPremium";

interface PremiumMaterialsPanelProps {
  result: BuilderResult;
  userTier: UserTier;
}

interface EnhancedRow {
  material: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalCost: number;
  grade: string;
  brand: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  cement: "Cement & Concrete",
  steel: "Steel & Reinforcement",
  brick: "Masonry & Blocks",
  sand: "Sand",
  aggregate: "Aggregates",
  wood: "Wood & Timber",
  glass: "Glass & Glazing",
  paint: "Paint & Coatings",
  tile: "Flooring & Tiles",
  electrical: "Electrical",
  plumbing: "Plumbing",
  finishing: "Finishing Works",
};

function exportCSV(rows: EnhancedRow[], totalCost: number) {
  const headers = [
    "Material",
    "Category",
    "Quantity",
    "Unit",
    "Unit Price (₹)",
    "Total Cost (₹)",
    "Grade",
    "Brand",
  ];
  const dataRows = rows.map((r) => [
    r.material,
    r.category,
    r.quantity.toLocaleString("en-IN"),
    r.unit,
    r.unitPrice.toLocaleString("en-IN"),
    r.totalCost.toLocaleString("en-IN"),
    r.grade,
    r.brand,
  ]);
  const footer = [
    "TOTAL",
    "",
    "",
    "",
    "",
    totalCost.toLocaleString("en-IN"),
    "",
    "",
  ];
  const allRows = [headers, ...dataRows, footer];
  const csvContent = allRows
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "nirman360-materials.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function PremiumMaterialsPanel({
  result,
  userTier,
}: PremiumMaterialsPanelProps) {
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const isPremium = userTier === "premium" || userTier === "ultraPremium";

  const rows: EnhancedRow[] = result.materials.map((m) => ({
    material: m.name,
    category: CATEGORY_LABELS[m.category] ?? m.category,
    quantity: m.quantity,
    unit: m.unit,
    unitPrice: m.costPerUnit,
    totalCost: m.quantity * m.costPerUnit,
    grade: m.grade,
    brand: m.brand,
  }));

  const totalCost = rows.reduce((sum, r) => sum + r.totalCost, 0);

  const gradeLabel =
    result.input.budgetRange === "low"
      ? "Economy"
      : result.input.budgetRange === "medium"
        ? "Standard"
        : result.input.budgetRange === "high"
          ? "Premium"
          : "Luxury";

  return (
    <div className="flex flex-col h-full" data-ocid="premium_materials.panel">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <h2 className="font-display font-semibold text-foreground text-base">
            Material Schedule
          </h2>
          <Badge
            variant="outline"
            className="text-xs border-primary/30 text-primary ml-1"
          >
            Premium
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs border-accent/30 text-accent"
          >
            {gradeLabel}
          </Badge>
          {isPremium ? (
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs h-7 border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => exportCSV(rows, totalCost)}
              data-ocid="premium_materials.export_button"
            >
              <Download className="h-3 w-3" />
              Export CSV
            </Button>
          ) : null}
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 divide-x divide-border border-b border-border bg-muted/20">
        <div className="px-4 py-2.5 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Items
          </p>
          <p className="font-semibold text-foreground text-sm mt-0.5">
            {rows.length}
          </p>
        </div>
        <div className="px-4 py-2.5 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Total Material
          </p>
          <p
            className="font-semibold text-sm mt-0.5"
            style={{ color: "#f97316" }}
          >
            {isPremium ? formatCurrency(totalCost) : "🔒 Upgrade"}
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

      {/* Table */}
      <div className="flex-1 overflow-auto relative">
        <table
          className="w-full text-xs min-w-[720px]"
          data-ocid="premium_materials.table"
        >
          <thead className="sticky top-0 z-10 bg-muted/60 border-b border-border">
            <tr>
              {[
                "Material",
                "Category",
                "Quantity",
                "Unit",
                "Unit Price",
                "Total Cost",
                "Grade",
                "Brand",
              ].map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={`${row.material}-${i}`}
                className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${!isPremium && i >= 3 ? "blur-sm select-none pointer-events-none" : ""}`}
                data-ocid={`premium_materials.row.${i + 1}`}
              >
                <td className="px-3 py-2.5 font-medium text-foreground whitespace-nowrap">
                  {row.material}
                </td>
                <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap">
                  {row.category}
                </td>
                <td className="px-3 py-2.5 font-mono text-right text-foreground">
                  {row.quantity.toLocaleString("en-IN")}
                </td>
                <td className="px-3 py-2.5 text-muted-foreground">
                  {row.unit}
                </td>
                <td className="px-3 py-2.5 font-mono text-right text-foreground">
                  {formatCurrency(row.unitPrice)}
                </td>
                <td
                  className="px-3 py-2.5 font-mono text-right font-semibold"
                  style={{ color: "#f97316" }}
                >
                  {formatCurrency(row.totalCost)}
                </td>
                <td className="px-3 py-2.5 text-muted-foreground text-xs">
                  {row.grade}
                </td>
                <td className="px-3 py-2.5 text-muted-foreground text-xs">
                  {row.brand}
                </td>
              </tr>
            ))}

            {/* Total row */}
            {isPremium && (
              <tr className="bg-primary/5 border-t-2 border-primary/20 font-bold">
                <td colSpan={5} className="px-3 py-3 text-sm text-foreground">
                  Total Material Cost
                </td>
                <td
                  className="px-3 py-3 font-mono text-sm font-bold"
                  style={{ color: "#f97316" }}
                >
                  {formatCurrency(totalCost)}
                </td>
                <td colSpan={2} />
              </tr>
            )}
          </tbody>
        </table>

        {/* Locked overlay for free tier */}
        {!isPremium && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm gap-3"
            style={{ top: "40px" }}
            data-ocid="premium_materials.locked_state"
          >
            <div className="text-center px-6">
              <Package className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="font-semibold text-foreground text-sm mb-1">
                Full Material Schedule
              </p>
              <p className="text-muted-foreground text-xs mb-4">
                Detailed BOQ with unit prices, grades, and brands. Export to CSV
                included.
              </p>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:opacity-90 gap-1.5"
                onClick={() => setUpgradeOpen(true)}
                data-ocid="premium_materials.upgrade_button"
              >
                <Package className="w-3.5 h-3.5" />
                Unlock with Premium
              </Button>
            </div>
          </div>
        )}
      </div>

      <UpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        targetTier="premium"
        featureName="Material Schedule"
      />
    </div>
  );
}
