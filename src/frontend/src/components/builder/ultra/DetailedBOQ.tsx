import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BuilderResult } from "@/types/builder";
import { Download, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MatRow {
  material: string;
  qty: number;
  unit: string;
  unitPrice: number;
  total: number;
}
interface LabRow {
  task: string;
  duration: string;
  workers: number;
  dailyRate: number;
  total: number;
}

const MATS: MatRow[] = [
  { material: "Cement", qty: 450, unit: "bags", unitPrice: 380, total: 171000 },
  {
    material: "Steel (TMT)",
    qty: 3200,
    unit: "kg",
    unitPrice: 65,
    total: 208000,
  },
  {
    material: "AAC Blocks",
    qty: 85,
    unit: "m³",
    unitPrice: 3500,
    total: 297500,
  },
  {
    material: "River Sand",
    qty: 45,
    unit: "m³",
    unitPrice: 1800,
    total: 81000,
  },
  {
    material: "Coarse Aggregate",
    qty: 60,
    unit: "m³",
    unitPrice: 1200,
    total: 72000,
  },
  {
    material: "Ceramic Tiles",
    qty: 280,
    unit: "m²",
    unitPrice: 550,
    total: 154000,
  },
  { material: "Paint", qty: 180, unit: "liters", unitPrice: 250, total: 45000 },
  { material: "Glass", qty: 45, unit: "m²", unitPrice: 800, total: 36000 },
];
const TOTAL_MAT = MATS.reduce((s, r) => s + r.total, 0);

const LABS: LabRow[] = [
  {
    task: "Foundation Work",
    duration: "2 weeks",
    workers: 8,
    dailyRate: 600,
    total: 67200,
  },
  {
    task: "Structure (Columns+Beams+Slabs)",
    duration: "4 weeks",
    workers: 12,
    dailyRate: 600,
    total: 201600,
  },
  {
    task: "Masonry (Walls)",
    duration: "3 weeks",
    workers: 8,
    dailyRate: 600,
    total: 100800,
  },
  {
    task: "Plumbing + Electrical",
    duration: "2 weeks",
    workers: 6,
    dailyRate: 600,
    total: 50400,
  },
  {
    task: "Plastering",
    duration: "2 weeks",
    workers: 10,
    dailyRate: 600,
    total: 84000,
  },
  {
    task: "Flooring + Finishing",
    duration: "3 weeks",
    workers: 8,
    dailyRate: 600,
    total: 100800,
  },
];
const TOTAL_LAB = LABS.reduce((s, r) => s + r.total, 0);

const STAGES_CHART = [
  { stage: "Foundation", cost: 238200, color: "#6B4F2A" },
  { stage: "Structure", cost: 401600, color: "#7A7A7A" },
  { stage: "Masonry", cost: 220800, color: "#C2612A" },
  { stage: "Systems", cost: 185400, color: "#D4A800" },
  { stage: "Finishing", cost: 271800, color: "#4A8F5C" },
  { stage: "Interior", cost: 250500, color: "#2F6EB5" },
];

function fmt(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

interface Props {
  result: BuilderResult;
}

export function DetailedBOQ({ result: _result }: Props) {
  const finishing = Math.round(TOTAL_MAT * 0.2);
  const grandTotal = TOTAL_MAT + TOTAL_LAB + finishing;

  function exportCSV() {
    const rows = [
      ["Material", "Qty", "Unit", "Unit Price", "Total"],
      ...MATS.map((r) => [
        r.material,
        String(r.qty),
        r.unit,
        `₹${r.unitPrice}`,
        `₹${r.total}`,
      ]),
      [],
      ["Task", "Duration", "Workers", "Daily Rate", "Total"],
      ...LABS.map((r) => [
        r.task,
        r.duration,
        String(r.workers),
        `₹${r.dailyRate}`,
        `₹${r.total}`,
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nirman360-boq.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      className="flex flex-col gap-0 bg-card rounded-xl border border-border overflow-hidden"
      data-ocid="detailed_boq.panel"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-accent" />
          <h3 className="font-display text-base font-semibold text-foreground">
            Detailed Bill of Quantities
          </h3>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={exportCSV}
          className="text-xs gap-1.5"
          data-ocid="detailed_boq.export_button"
        >
          <Download className="w-3 h-3" /> Export CSV
        </Button>
      </div>

      <Tabs defaultValue="materials" className="px-4 pb-4 pt-4">
        <TabsList className="w-full" data-ocid="detailed_boq.tabs">
          <TabsTrigger
            value="materials"
            className="flex-1 text-xs"
            data-ocid="detailed_boq.materials_tab"
          >
            Materials
          </TabsTrigger>
          <TabsTrigger
            value="labor"
            className="flex-1 text-xs"
            data-ocid="detailed_boq.labor_tab"
          >
            Labour
          </TabsTrigger>
          <TabsTrigger
            value="stages"
            className="flex-1 text-xs"
            data-ocid="detailed_boq.stages_tab"
          >
            Stage-wise
          </TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="mt-3">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="pricing-table w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left">Material</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Unit</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {MATS.map((r) => (
                  <tr key={r.material}>
                    <td className="font-medium">{r.material}</td>
                    <td className="text-right">
                      {r.qty.toLocaleString("en-IN")}
                    </td>
                    <td className="text-right text-muted-foreground">
                      {r.unit}
                    </td>
                    <td className="text-right">{fmt(r.unitPrice)}</td>
                    <td className="text-right font-mono text-accent">
                      {fmt(r.total)}
                    </td>
                  </tr>
                ))}
                <tr className="font-semibold bg-muted/30">
                  <td colSpan={4} className="text-right">
                    Total Materials
                  </td>
                  <td className="text-right font-mono text-accent">
                    {fmt(TOTAL_MAT)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="labor" className="mt-3">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="pricing-table w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left">Task</th>
                  <th className="text-right">Duration</th>
                  <th className="text-right">Workers</th>
                  <th className="text-right">Rate/Day</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {LABS.map((r) => (
                  <tr key={r.task}>
                    <td className="font-medium">{r.task}</td>
                    <td className="text-right text-muted-foreground">
                      {r.duration}
                    </td>
                    <td className="text-right">{r.workers}</td>
                    <td className="text-right">{fmt(r.dailyRate)}/day</td>
                    <td className="text-right font-mono text-accent">
                      {fmt(r.total)}
                    </td>
                  </tr>
                ))}
                <tr className="font-semibold bg-muted/30">
                  <td colSpan={4} className="text-right">
                    Total Labour
                  </td>
                  <td className="text-right font-mono text-accent">
                    {fmt(TOTAL_LAB)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="stages" className="mt-3">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={STAGES_CHART}
                margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
              >
                <XAxis dataKey="stage" tick={{ fontSize: 9 }} />
                <YAxis
                  tickFormatter={(v: number) => `₹${(v / 100000).toFixed(0)}L`}
                  tick={{ fontSize: 9 }}
                />
                <Tooltip
                  formatter={(v: number) => [fmt(v), "Cost"]}
                  labelStyle={{ fontSize: 11 }}
                  contentStyle={{ fontSize: 11 }}
                />
                <Bar dataKey="cost" radius={[3, 3, 0, 0]}>
                  {STAGES_CHART.map((s) => (
                    <Cell key={s.stage} fill={s.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>

      <div
        className="mx-4 mb-4 rounded-lg bg-primary/10 border border-primary/20 p-4"
        data-ocid="detailed_boq.grand_total"
      >
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">
          Project Cost Summary
        </p>
        <div className="flex flex-col gap-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Materials</span>
            <span className="font-mono text-foreground">{fmt(TOTAL_MAT)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Labour</span>
            <span className="font-mono text-foreground">{fmt(TOTAL_LAB)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Finishing &amp; Overheads
            </span>
            <span className="font-mono text-foreground">{fmt(finishing)}</span>
          </div>
          <div className="h-px bg-border my-1" />
          <div className="flex justify-between font-bold text-base">
            <span className="text-foreground">Grand Total</span>
            <span className="font-mono text-accent">{fmt(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
