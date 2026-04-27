import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Building2,
  Calculator,
  ChevronRight,
  Copy,
  Home,
  Info,
  MapPin,
  Search,
  Share2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { MaterialGrade, Region } from "../backend";
import { formatIndianPrice } from "../components/PriceDisplay";
import { useCalculateCost } from "../hooks/useDesigns";

const CHART_COLORS = [
  "oklch(0.55 0.15 265)",
  "oklch(0.62 0.18 32)",
  "oklch(0.65 0.15 125)",
  "oklch(0.68 0.12 15)",
  "oklch(0.6 0.14 190)",
  "oklch(0.58 0.12 285)",
  "oklch(0.55 0.12 45)",
];

const BREAKDOWN_LABELS: Record<string, string> = {
  foundation: "Foundation",
  structure: "Structure",
  roofing: "Roofing",
  flooring: "Flooring",
  plumbing: "Plumbing",
  electrical: "Electrical",
  finishing: "Finishing",
};

const BREAKDOWN_ORDER = [
  "foundation",
  "structure",
  "roofing",
  "flooring",
  "electrical",
  "plumbing",
  "finishing",
];

const REGION_INFO: Record<
  string,
  { label: string; labor: string; multiplier: string; icon: string }
> = {
  [Region.urban]: {
    label: "Urban (Metro cities)",
    labor: "₹450–650/sqft",
    multiplier: "1.3×",
    icon: "🏙️",
  },
  [Region.semiUrban]: {
    label: "Semi-Urban (Tier 2 cities)",
    labor: "₹320–420/sqft",
    multiplier: "1.1×",
    icon: "🏘️",
  },
  [Region.rural]: {
    label: "Rural (Village / Town)",
    labor: "₹220–320/sqft",
    multiplier: "1.0×",
    icon: "🏡",
  },
};

const GRADE_INFO: Record<
  string,
  { label: string; desc: string; badge: string; features: string[] }
> = {
  [MaterialGrade.basic]: {
    label: "Basic",
    badge: "Economy",
    desc: "Suitable for no-frills construction",
    features: [
      "AAC/solid clay bricks",
      "OPC 43 grade cement",
      "Standard sanitary ware",
      "Basic tiles (₹30–60/sqft)",
    ],
  },
  [MaterialGrade.standard]: {
    label: "Standard",
    badge: "Mid-Range",
    desc: "Best value for most home buyers",
    features: [
      "Premium AAC blocks",
      "OPC 53 grade cement",
      "Mid-range sanitary ware",
      "Vitrified tiles (₹60–120/sqft)",
    ],
  },
  [MaterialGrade.premium]: {
    label: "Premium",
    badge: "High-End",
    desc: "Luxury finishes & imported materials",
    features: [
      "Aerocon/Siporex blocks",
      "Ultra-tech PPC cement",
      "Designer sanitary ware",
      "Italian marble / hardwood flooring",
    ],
  },
};

const PRESETS = [
  {
    label: "1BHK Starter",
    icon: <Home className="h-4 w-4" />,
    area: "500",
    region: Region.rural,
    grade: MaterialGrade.basic,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    label: "2BHK Standard",
    icon: <Building2 className="h-4 w-4" />,
    area: "850",
    region: Region.semiUrban,
    grade: MaterialGrade.standard,
    color: "bg-accent/10 text-accent border-accent/20",
  },
  {
    label: "3BHK Premium",
    icon: <Sparkles className="h-4 w-4" />,
    area: "1200",
    region: Region.urban,
    grade: MaterialGrade.premium,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    label: "Villa",
    icon: <TrendingUp className="h-4 w-4" />,
    area: "2500",
    region: Region.urban,
    grade: MaterialGrade.premium,
    color: "bg-accent/10 text-accent border-accent/20",
  },
];

export default function CalculatorPage() {
  const [areaSqft, setAreaSqft] = useState("1000");
  const [region, setRegion] = useState<Region>(Region.urban);
  const [grade, setGrade] = useState<MaterialGrade>(MaterialGrade.standard);
  const calculateMutation = useCalculateCost();
  const navigate = useNavigate();

  const handleCalculate = () => {
    const area = Number.parseInt(areaSqft, 10);
    if (!area || area < 100 || area > 50000) return;
    calculateMutation.mutate({
      areaSqft: BigInt(area),
      region,
      materialGrade: grade,
    });
  };

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setAreaSqft(preset.area);
    setRegion(preset.region);
    setGrade(preset.grade);
  };

  const result = calculateMutation.data;

  const chartData = result
    ? BREAKDOWN_ORDER.filter((k) => k in result.breakdown).map((key, i) => ({
        name: BREAKDOWN_LABELS[key] ?? key,
        value: Number(
          (result.breakdown as unknown as Record<string, bigint>)[key] ?? 0,
        ),
        color: CHART_COLORS[i % CHART_COLORS.length],
      }))
    : [];

  const handleShare = () => {
    if (!result) return;
    const regionLabel = REGION_INFO[region]?.label ?? region;
    const gradeLabel = GRADE_INFO[grade]?.label ?? grade;
    const breakdownLines = BREAKDOWN_ORDER.filter(
      (k) => k in result.breakdown,
    ).map(
      (k) =>
        `  ${BREAKDOWN_LABELS[k] ?? k}: ${formatIndianPrice((result.breakdown as unknown as Record<string, bigint>)[k] ?? 0n)}`,
    );
    const lines = [
      "\uD83D\uDCD0 Nirman360 Construction Estimate",
      `Area: ${areaSqft} sq.ft | ${regionLabel} | ${gradeLabel} grade`,
      `Total Cost: ${formatIndianPrice(result.totalCost)}`,
      `Cost/sq.ft: \u20B9${Number(result.costPerSqft).toLocaleString("en-IN")}`,
      "",
      "Breakdown:",
      ...breakdownLines,
      "",
      "Estimate by nirman360.com",
    ].join("\n");
    void navigator.clipboard.writeText(lines);
    toast.success("Estimate copied to clipboard!", { duration: 3000 });
  };

  const handleFindDesigns = () => {
    void navigate({
      to: "/browse",
      search: {
        budget: result ? String(result.totalCost) : undefined,
      } as Record<string, string>,
    });
  };

  const areaNum = Number.parseInt(areaSqft, 10);
  const areaValid = areaNum >= 100 && areaNum <= 50000;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-card border-b border-border">
          <div className="container py-10 md:py-14">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Construction Cost Calculator
                </h1>
                <p className="mt-1 text-muted-foreground text-base md:text-lg max-w-xl">
                  Get accurate estimates for your dream project —
                  region-adjusted, grade-specific, and broken down category by
                  category.
                </p>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Quick Presets
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPreset(p)}
                    data-ocid={`calculator.preset.${p.label.toLowerCase().replace(/\s+/g, "_")}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-smooth hover:scale-105 ${p.color}`}
                  >
                    {p.icon}
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: Form */}
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col gap-5">
                <h2 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Project Details
                </h2>

                {/* Area */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="area-input">Built-up Area (sq.ft)</Label>
                  <Input
                    id="area-input"
                    type="number"
                    min="100"
                    max="50000"
                    value={areaSqft}
                    onChange={(e) => setAreaSqft(e.target.value)}
                    placeholder="e.g. 1200"
                    data-ocid="calculator.area.input"
                    className="text-base"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3" /> Min 100 · Max 50,000 sq.ft
                    </p>
                    {!areaValid && areaSqft !== "" && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> Out of range
                      </p>
                    )}
                  </div>
                </div>

                {/* Region */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    <Label>Region</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          data-ocid="calculator.region.info_tooltip"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Info className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs p-3">
                        <p className="font-semibold mb-1">
                          Why do costs vary by region?
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Urban metro cities have higher labor demand, transport
                          costs, and premium material availability. Rural areas
                          benefit from lower labor rates and reduced logistics
                          overheads.
                        </p>
                        <div className="mt-2 space-y-1">
                          {Object.entries(REGION_INFO).map(([, info]) => (
                            <div
                              key={info.label}
                              className="flex justify-between text-xs gap-2"
                            >
                              <span>
                                {info.icon} {info.label.split("(")[0]}
                              </span>
                              <span className="font-medium">
                                {info.multiplier} base
                              </span>
                            </div>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={region}
                    onValueChange={(v) => setRegion(v as Region)}
                  >
                    <SelectTrigger data-ocid="calculator.region.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(REGION_INFO).map(([val, info]) => (
                        <SelectItem key={val} value={val}>
                          <div className="flex flex-col">
                            <span>
                              {info.icon} {info.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Est. labor: {info.labor}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {region && (
                    <p className="text-xs text-muted-foreground">
                      {REGION_INFO[region]?.icon} Estimated labor cost:{" "}
                      <span className="font-medium text-foreground">
                        {REGION_INFO[region]?.labor}
                      </span>{" "}
                      · Cost multiplier:{" "}
                      <span className="font-medium text-foreground">
                        {REGION_INFO[region]?.multiplier}
                      </span>
                    </p>
                  )}
                </div>

                {/* Material Grade */}
                <div className="flex flex-col gap-2">
                  <Label>Material Grade</Label>
                  <Select
                    value={grade}
                    onValueChange={(v) => setGrade(v as MaterialGrade)}
                  >
                    <SelectTrigger data-ocid="calculator.grade.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(GRADE_INFO).map(([val, info]) => (
                        <SelectItem key={val} value={val}>
                          <div className="flex items-center gap-2">
                            <span>{info.label}</span>
                            <Badge variant="secondary" className="text-xs">
                              {info.badge}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  size="lg"
                  onClick={handleCalculate}
                  disabled={calculateMutation.isPending || !areaValid}
                  data-ocid="calculator.calculate.submit_button"
                  className="w-full gap-2 mt-1 bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth"
                >
                  {calculateMutation.isPending ? (
                    <>Calculating...</>
                  ) : (
                    <>
                      <Calculator className="h-4 w-4" />
                      Calculate Cost
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                {calculateMutation.isError && (
                  <div
                    className="text-sm text-destructive bg-destructive/10 rounded-lg p-3 flex items-center gap-2"
                    data-ocid="calculator.error_state"
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    Failed to calculate. Please try again.
                  </div>
                )}
              </div>

              {/* Material Grade Guide */}
              <div className="p-5 rounded-2xl border border-border bg-muted/30">
                <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Material Grade Guide
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(GRADE_INFO).map(([val, info]) => (
                    <button
                      key={val}
                      type="button"
                      className={`p-3 rounded-xl border transition-smooth cursor-pointer text-left w-full ${grade === val ? "border-accent bg-accent/5" : "border-border bg-card hover:border-primary/40"}`}
                      onClick={() => setGrade(val as MaterialGrade)}
                    >
                      <Badge
                        variant={grade === val ? "default" : "secondary"}
                        className="text-xs mb-2"
                      >
                        {info.badge}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {info.desc}
                      </p>
                      <ul className="mt-2 space-y-0.5">
                        {info.features.slice(0, 2).map((f) => (
                          <li
                            key={f}
                            className="text-[10px] text-muted-foreground leading-tight"
                          >
                            • {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className="flex flex-col gap-4">
              {result ? (
                <>
                  {/* Cost Summary */}
                  <div
                    className="p-6 rounded-2xl border border-border bg-card shadow-sm"
                    data-ocid="calculator.result.card"
                  >
                    <h2 className="font-semibold text-foreground mb-4">
                      Estimated Project Cost
                    </h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
                        <div className="text-xs text-muted-foreground mb-1">
                          Total Estimate
                        </div>
                        <div className="text-2xl font-bold text-primary leading-tight">
                          {formatIndianPrice(result.totalCost)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {Number(result.totalCost).toLocaleString("en-IN")} ₹
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-accent/5 border border-accent/15">
                        <div className="text-xs text-muted-foreground mb-1">
                          Cost per sq.ft
                        </div>
                        <div className="text-2xl font-bold text-accent leading-tight">
                          ₹{Number(result.costPerSqft).toLocaleString("en-IN")}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          per sq.ft
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="flex-1 gap-2"
                        data-ocid="calculator.share.button"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        Share Estimate
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleFindDesigns}
                        className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                        data-ocid="calculator.find_designs.button"
                      >
                        <Search className="h-3.5 w-3.5" />
                        Find Matching Designs
                      </Button>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="p-5 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold text-foreground mb-4 text-sm">
                      Cost Breakdown — Bar Chart
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={chartData}
                        margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="oklch(0.9 0.01 270)"
                        />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis
                          tickFormatter={(v: number) =>
                            `₹${(v / 100000).toFixed(0)}L`
                          }
                          tick={{ fontSize: 10 }}
                          width={40}
                        />
                        <ReTooltip
                          formatter={(value: number) => [
                            formatIndianPrice(BigInt(Math.round(value))),
                            "Cost",
                          ]}
                          contentStyle={{ fontSize: 12 }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell
                              key={`bar-${entry.name}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie Chart */}
                  <div className="p-5 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold text-foreground mb-4 text-sm">
                      Cost Distribution — Pie Chart
                    </h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell
                              key={`pie-${entry.name}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <ReTooltip
                          formatter={(value: number) => [
                            formatIndianPrice(BigInt(Math.round(value))),
                            "Cost",
                          ]}
                          contentStyle={{ fontSize: 12 }}
                        />
                        <Legend
                          iconType="circle"
                          iconSize={8}
                          wrapperStyle={{ fontSize: 11 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Breakdown Table */}
                  <div className="p-5 rounded-2xl border border-border bg-card">
                    <h3 className="font-semibold text-foreground mb-3 text-sm">
                      Detailed Category Breakdown
                    </h3>
                    <div className="space-y-0">
                      {BREAKDOWN_ORDER.filter((k) => k in result.breakdown).map(
                        (key, i) => {
                          const val =
                            (
                              result.breakdown as unknown as Record<
                                string,
                                bigint
                              >
                            )[key] ?? 0n;
                          const pct =
                            result.totalCost > 0n
                              ? Math.round(
                                  (Number(val) / Number(result.totalCost)) *
                                    100,
                                )
                              : 0;
                          return (
                            <div
                              key={key}
                              className={`flex items-center gap-3 py-2.5 ${i < BREAKDOWN_ORDER.length - 1 ? "border-b border-border" : ""}`}
                              data-ocid={`calculator.breakdown.item.${i + 1}`}
                            >
                              <div
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{
                                  background:
                                    CHART_COLORS[i % CHART_COLORS.length],
                                }}
                              />
                              <span className="text-sm text-muted-foreground flex-1">
                                {BREAKDOWN_LABELS[key] ?? key}
                              </span>
                              <div className="flex items-center gap-3">
                                <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{
                                      width: `${pct}%`,
                                      background:
                                        CHART_COLORS[i % CHART_COLORS.length],
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground w-8 text-right">
                                  {pct}%
                                </span>
                                <span className="text-sm font-semibold text-foreground w-20 text-right">
                                  {formatIndianPrice(val)}
                                </span>
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div
                    className="p-4 rounded-xl border border-border bg-muted/40 flex gap-2.5"
                    data-ocid="calculator.disclaimer"
                  >
                    <AlertCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">
                        Disclaimer:
                      </span>{" "}
                      Estimates are indicative. Actual costs may vary based on
                      site conditions, contractor rates, and material
                      availability. Consult a licensed civil engineer before
                      making financial decisions.
                    </p>
                  </div>
                </>
              ) : (
                <div
                  className="flex flex-col items-center justify-center gap-5 py-24 rounded-2xl border border-dashed border-border bg-card/50"
                  data-ocid="calculator.empty_state"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                    <Calculator className="h-10 w-10 text-muted-foreground/40" />
                  </div>
                  <div className="text-center max-w-xs">
                    <p className="font-semibold text-foreground text-base">
                      Your estimate will appear here
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fill in the project details and click{" "}
                      <strong>Calculate Cost</strong> to see a full breakdown
                      with charts.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-muted-foreground/50" />
                    <span className="text-xs text-muted-foreground">
                      Shareable results • Regional accuracy • 7 cost categories
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
