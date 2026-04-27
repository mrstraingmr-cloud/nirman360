import { Button } from "@/components/ui/button";
import type { BuilderInput, BuilderResult } from "@/types/builder";
import { formatCurrency } from "@/utils/builderCalculations";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { UpgradeModal } from "../UpgradeModal";

type UserTier = "free" | "premium" | "ultraPremium";

interface PdfDownloadButtonProps {
  result: BuilderResult;
  input: BuilderInput;
  userTier: UserTier;
}

function buildHtmlReport(result: BuilderResult, input: BuilderInput): string {
  const {
    cost,
    materials,
    stages,
    builtUpArea,
    totalArea,
    foundationType,
    recommendedStyle,
  } = result;
  const builtSqFt = Math.round(builtUpArea * 10.764);
  const plotSqFt = Math.round(totalArea * 10.764);

  const matRows = materials
    .map(
      (m) => `<tr>
        <td>${m.name}</td>
        <td>${m.category}</td>
        <td>${m.quantity.toLocaleString("en-IN")} ${m.unit}</td>
        <td>${formatCurrency(m.costPerUnit)}/${m.unit}</td>
        <td>${formatCurrency(m.quantity * m.costPerUnit)}</td>
        <td>${m.grade}</td>
        <td>${m.brand}</td>
      </tr>`,
    )
    .join("");

  const stageRows = stages
    .map(
      (s) => `<tr>
        <td>${s.title}</td>
        <td>${s.durationDays} days</td>
        <td>${s.manpower} workers</td>
        <td>${s.activities.join(", ")}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Nirman360 — Building Design Report</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; background: #fff; }
    .page { max-width: 900px; margin: 0 auto; padding: 40px 32px; }
    .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
    .brand h1 { font-size: 26px; font-weight: 800; color: #1e3a5f; letter-spacing: -0.5px; margin: 0; }
    .brand .dot { display: inline-block; width: 8px; height: 8px; background: #f97316; border-radius: 50%; margin-left: 2px; vertical-align: middle; }
    .subtitle { color: #64748b; font-size: 13px; margin-bottom: 32px; }
    .section { margin-bottom: 28px; }
    .section-title { font-size: 15px; font-weight: 700; color: #1e3a5f; border-left: 4px solid #f97316; padding-left: 10px; margin-bottom: 12px; }
    .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
    .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; }
    .summary-card .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 4px; }
    .summary-card .value { font-size: 18px; font-weight: 700; color: #1e3a5f; font-family: monospace; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 16px; }
    th { background: #1e3a5f; color: #fff; padding: 8px 10px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
    td { padding: 7px 10px; border-bottom: 1px solid #f1f5f9; color: #374151; vertical-align: top; }
    tr:nth-child(even) td { background: #f8fafc; }
    .total-row td { font-weight: 700; background: #fff7ed !important; color: #c2410c; border-top: 2px solid #f97316; }
    .cost-highlight { font-size: 28px; font-weight: 800; color: #f97316; font-family: monospace; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 11px; text-align: center; }
    .tag { display: inline-block; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 4px; padding: 2px 8px; font-size: 11px; font-weight: 600; margin-right: 6px; margin-bottom: 6px; }
    @media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="page">
    <!-- Brand -->
    <div class="brand">
      <h1>Nirman360<span class="dot"></span></h1>
    </div>
    <p class="subtitle">Building Design Report — Generated ${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

    <!-- Project Summary -->
    <div class="section">
      <div class="section-title">Project Summary</div>
      <div class="summary-grid">
        <div class="summary-card">
          <div class="label">Total Estimated Cost</div>
          <div class="value cost-highlight">${formatCurrency(cost.totalCost)}</div>
        </div>
        <div class="summary-card">
          <div class="label">Cost Per Sq.Ft</div>
          <div class="value">${formatCurrency(cost.costPerSqFt)}</div>
        </div>
        <div class="summary-card">
          <div class="label">Built-up Area</div>
          <div class="value">${builtSqFt.toLocaleString("en-IN")} sqft</div>
        </div>
        <div class="summary-card">
          <div class="label">Plot Area</div>
          <div class="value">${plotSqFt.toLocaleString("en-IN")} sqft</div>
        </div>
        <div class="summary-card">
          <div class="label">Floors</div>
          <div class="value">${input.floors}</div>
        </div>
        <div class="summary-card">
          <div class="label">Foundation</div>
          <div class="value" style="font-size:14px;text-transform:capitalize">${foundationType}</div>
        </div>
      </div>
      <p style="font-size:13px;color:#64748b;margin:0">
        <strong>Location:</strong> ${input.location || "—"} &nbsp;|&nbsp;
        <strong>Style:</strong> ${recommendedStyle} &nbsp;|&nbsp;
        <strong>Budget:</strong> ${input.budgetRange.charAt(0).toUpperCase() + input.budgetRange.slice(1)}
      </p>
    </div>

    <!-- Cost Breakdown -->
    <div class="section">
      <div class="section-title">Cost Breakdown</div>
      <table>
        <thead>
          <tr><th>Component</th><th>Amount</th><th>% of Total</th></tr>
        </thead>
        <tbody>
          <tr><td>Material Cost</td><td>${formatCurrency(cost.materialCost)}</td><td>${((cost.materialCost / cost.totalCost) * 100).toFixed(1)}%</td></tr>
          <tr><td>Labour Cost</td><td>${formatCurrency(cost.laborCost)}</td><td>${((cost.laborCost / cost.totalCost) * 100).toFixed(1)}%</td></tr>
          <tr><td>Finishing Cost</td><td>${formatCurrency(cost.finishingCost)}</td><td>${((cost.finishingCost / cost.totalCost) * 100).toFixed(1)}%</td></tr>
          <tr class="total-row"><td><strong>TOTAL</strong></td><td><strong>${formatCurrency(cost.totalCost)}</strong></td><td>100%</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Materials -->
    <div class="section">
      <div class="section-title">Material Schedule (BOQ)</div>
      <table>
        <thead>
          <tr><th>Material</th><th>Category</th><th>Quantity</th><th>Unit Price</th><th>Total Cost</th><th>Grade</th><th>Brand</th></tr>
        </thead>
        <tbody>
          ${matRows}
          <tr class="total-row">
            <td colspan="4"><strong>TOTAL MATERIAL COST</strong></td>
            <td><strong>${formatCurrency(materials.reduce((s, m) => s + m.quantity * m.costPerUnit, 0))}</strong></td>
            <td colspan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Construction Stages -->
    <div class="section">
      <div class="section-title">Construction Guide</div>
      <table>
        <thead>
          <tr><th>Stage</th><th>Duration</th><th>Manpower</th><th>Key Activities</th></tr>
        </thead>
        <tbody>${stageRows}</tbody>
      </table>
    </div>

    <!-- Floor Plan Note -->
    <div class="section">
      <div class="section-title">Floor Plan Reference</div>
      <p style="font-size:12px;color:#64748b;margin-bottom:10px">Plot: 30×50 ft | Modern Minimal Flat Roof</p>
      <div style="margin-bottom:6px">
        <span class="tag">🏠 Ground Floor</span>
        <span class="tag">Living Room 14×16 ft</span>
        <span class="tag">Dining 10×12 ft</span>
        <span class="tag">Kitchen 8×10 ft</span>
        <span class="tag">Bedroom 1 12×14 ft</span>
        <span class="tag">Car Parking</span>
        <span class="tag">Garden</span>
      </div>
      <div>
        <span class="tag">🏢 First Floor</span>
        <span class="tag">Bedroom 2 14×16 ft</span>
        <span class="tag">Bedroom 3 12×14 ft</span>
        <span class="tag">Family Lounge</span>
        <span class="tag">Glass Balcony</span>
        <span class="tag">Open Terrace</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>Built with <strong>Nirman360</strong> · Professional Architectural Platform · <a href="https://caffeine.ai" style="color:#1d4ed8">caffeine.ai</a></p>
      <p>⚠️ Estimates are indicative and may vary ±15–20% based on market conditions, contractor rates, and site conditions. Consult a licensed architect before construction.</p>
    </div>
  </div>
</body>
</html>`;
}

export default function PdfDownloadButton({
  result,
  input,
  userTier,
}: PdfDownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const isPremium = userTier === "premium" || userTier === "ultraPremium";

  async function handleDownload() {
    if (!isPremium) {
      setUpgradeOpen(true);
      return;
    }
    setLoading(true);
    await new Promise<void>((r) => setTimeout(r, 600));
    const html = buildHtmlReport(result, input);
    const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    // Clean up after a delay
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    setLoading(false);
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="gap-1.5 text-xs font-semibold border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        onClick={handleDownload}
        disabled={loading}
        aria-label="Download building plans as printable PDF report"
        data-ocid="builder.pdf_download.button"
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Download className="h-3.5 w-3.5" />
        )}
        {loading ? "Generating…" : "Download Plans (PDF)"}
      </Button>

      <UpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        targetTier="premium"
        featureName="Download Plans (PDF)"
      />
    </>
  );
}
