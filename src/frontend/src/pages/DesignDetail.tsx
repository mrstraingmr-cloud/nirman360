import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "@tanstack/react-router";
import {
  BookmarkCheck,
  BookmarkPlus,
  Building2,
  ChevronRight,
  Clock,
  Copy,
  FileText,
  Home,
  Lock,
  MapPin,
  Share2,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { toast } from "sonner";
import { DesignTier, MaterialGrade, Region } from "../backend";
import type { CostBreakdown } from "../backend.d.ts";
import {
  ConstructionStages,
  StageProgressStrip,
} from "../components/ConstructionStages";
import { DesignCard } from "../components/DesignCard";
import { DESIGN_PREVIEWS, hasSvgPreview } from "../components/DesignPreview";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PriceDisplay, formatIndianPrice } from "../components/PriceDisplay";
import { TierBadge } from "../components/TierBadge";
import FloorPlanViewer from "../components/builder/FloorPlanViewer";
import { FLOOR_PLANS } from "../data/floorPlans";
import { useAuth } from "../hooks/useAuth";
import {
  useCalculateCost,
  useDesign,
  useDesigns,
  useRemoveSavedDesign,
  useSaveDesign,
} from "../hooks/useDesigns";
import { useProfile } from "../hooks/useDesigns";
import { useUIStore } from "../store/uiStore";
import type { ConstructionStep } from "../types";
import { CATEGORY_LABELS } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
];

const REGION_OPTIONS: { value: Region; label: string }[] = [
  { value: Region.urban, label: "Urban (Metro)" },
  { value: Region.semiUrban, label: "Semi-Urban (Tier 2/3)" },
  { value: Region.rural, label: "Rural / Village" },
];

const GRADE_OPTIONS: { value: MaterialGrade; label: string }[] = [
  { value: MaterialGrade.premium, label: "Premium (High-end finishes)" },
  { value: MaterialGrade.standard, label: "Standard (Mid-range)" },
  { value: MaterialGrade.basic, label: "Basic (Budget-friendly)" },
];

// ─── Tier Upgrade Modal ────────────────────────────────────────────────────────

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-ocid="design.upgrade.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Unlock Full Access
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            This content is available to Premium and Ultra Premium members.
            Upgrade to get full floor plans, complete material lists, and
            detailed construction guides.
          </p>
          <div className="grid gap-3">
            {[
              {
                name: "Premium",
                price: "₹999/month",
                perks: [
                  "Full floor plans & PDFs",
                  "Complete material breakdowns",
                  "Advanced cost calculator",
                  "Ad-free experience",
                ],
              },
              {
                name: "Ultra Premium",
                price: "₹4,999/month",
                perks: [
                  "Everything in Premium",
                  "Custom 3D design requests",
                  "Personal architect consultation",
                  "Priority support",
                ],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className="p-4 rounded-lg border border-border bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">
                    {tier.name}
                  </span>
                  <span className="text-sm font-bold text-accent">
                    {tier.price}
                  </span>
                </div>
                <ul className="space-y-1">
                  {tier.perks.map((p) => (
                    <li
                      key={p}
                      className="text-xs text-muted-foreground flex items-center gap-1.5"
                    >
                      <span className="text-primary">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="design.upgrade.cancel_button"
            >
              Maybe Later
            </Button>
            <Button
              asChild
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              data-ocid="design.upgrade.confirm_button"
            >
              <Link to="/pricing" onClick={onClose}>
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Gated Content Overlay ─────────────────────────────────────────────────────

interface GatedOverlayProps {
  onUpgrade: () => void;
  label?: string;
}

function GatedOverlay({
  onUpgrade,
  label = "Upgrade to view full content",
}: GatedOverlayProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm rounded-lg">
        <Lock className="h-8 w-8 text-accent" />
        <p className="text-sm font-medium text-foreground text-center px-4">
          {label}
        </p>
        <Button
          size="sm"
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={onUpgrade}
          data-ocid="design.gated.upgrade_button"
        >
          Upgrade Now
        </Button>
      </div>
      <div className="pointer-events-none select-none blur-sm opacity-40 h-48 overflow-hidden" />
    </div>
  );
}

// ─── Cost Calculator Section ───────────────────────────────────────────────────

interface CalcSectionProps {
  defaultAreaSqft: number;
}

function CostCalculatorSection({ defaultAreaSqft }: CalcSectionProps) {
  const [area, setArea] = useState(defaultAreaSqft.toString());
  const [region, setRegion] = useState<Region>(Region.urban);
  const [grade, setGrade] = useState<MaterialGrade>(MaterialGrade.standard);
  const calcMutation = useCalculateCost();

  function runCalc() {
    const sqft = Number.parseInt(area);
    if (!sqft || sqft < 100) {
      toast.error("Please enter a valid area (min 100 sq.ft)");
      return;
    }
    calcMutation.mutate({
      areaSqft: BigInt(sqft),
      region,
      materialGrade: grade,
    });
  }

  const result = calcMutation.data;
  const breakdownData = result ? buildBreakdownData(result.breakdown) : null;

  return (
    <div className="rounded-xl border border-border bg-card p-5 mt-6">
      <h3 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2">
        <Building2 className="h-4 w-4 text-accent" />
        Inline Cost Calculator
      </h3>
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <div className="flex flex-col gap-1">
          <label
            className="text-xs text-muted-foreground font-medium"
            htmlFor="calc-area"
          >
            Built-up Area (sq.ft)
          </label>
          <input
            id="calc-area"
            type="number"
            min={100}
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="design.calculator.area_input"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="text-xs text-muted-foreground font-medium"
            htmlFor="calc-region"
          >
            Region
          </label>
          <select
            id="calc-region"
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="design.calculator.region_select"
          >
            {REGION_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="text-xs text-muted-foreground font-medium"
            htmlFor="calc-grade"
          >
            Material Grade
          </label>
          <select
            id="calc-grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value as MaterialGrade)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="design.calculator.grade_select"
          >
            {GRADE_OPTIONS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button
        onClick={runCalc}
        disabled={calcMutation.isPending}
        className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
        data-ocid="design.calculator.submit_button"
      >
        {calcMutation.isPending ? "Calculating..." : "Calculate Cost"}
      </Button>

      {result && (
        <div
          className="mt-5 space-y-4"
          data-ocid="design.calculator.success_state"
        >
          <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div>
              <p className="text-xs text-muted-foreground">
                Total Estimated Cost
              </p>
              <p className="text-2xl font-bold text-foreground font-display">
                {formatIndianPrice(result.totalCost)}
              </p>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div>
              <p className="text-xs text-muted-foreground">Cost per sq.ft</p>
              <p className="text-lg font-semibold text-foreground">
                ₹{Number(result.costPerSqft).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium mb-3">
              Cost Breakdown
            </p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breakdownData ?? []}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {(breakdownData ?? []).map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) =>
                      formatIndianPrice(BigInt(Math.round(val)))
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function buildBreakdownData(bd: CostBreakdown) {
  return [
    { name: "Foundation", value: Number(bd.foundation) },
    { name: "Structure", value: Number(bd.structure) },
    { name: "Roofing", value: Number(bd.roofing) },
    { name: "Plumbing", value: Number(bd.plumbing) },
    { name: "Electrical", value: Number(bd.electrical) },
    { name: "Flooring", value: Number(bd.flooring) },
    { name: "Finishing", value: Number(bd.finishing) },
  ].filter((d) => d.value > 0);
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function DesignDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const designId = BigInt(id);
  const { data: design, isLoading } = useDesign(designId);
  const { savedDesignIds, optimisticSave, optimisticRemove } = useUIStore();
  const { isAuthenticated, login } = useAuth();
  const saveMutation = useSaveDesign();
  const removeMutation = useRemoveSavedDesign();
  const { data: profile } = useProfile();
  const isSaved = savedDesignIds.has(designId);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Related designs from same category
  const { data: relatedAll } = useDesigns(
    design ? { category: design.category } : {},
  );
  const related = (relatedAll ?? [])
    .filter((d) => d.id !== designId)
    .slice(0, 3);

  const userTier: string = profile?.tier ?? "free";
  const isPremium = userTier === "premium" || userTier === "ultraPremium";

  const { setSavedDesignIds } = useUIStore();
  useEffect(() => {
    if (profile?.savedDesignIds) {
      setSavedDesignIds(profile.savedDesignIds);
    }
  }, [profile, setSavedDesignIds]);

  function handleSaveToggle() {
    if (!isAuthenticated) {
      login();
      return;
    }
    if (isSaved) {
      optimisticRemove(designId);
      removeMutation.mutate(designId);
    } else {
      optimisticSave(designId);
      saveMutation.mutate(designId);
    }
  }

  function handleShare() {
    void navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  }

  function goToStagesTab() {
    setActiveTab("guide");
    setTimeout(() => {
      document
        .getElementById("construction-stages")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border h-12" />
        <div className="container py-8">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-4">
              <Skeleton className="w-full aspect-video rounded-xl" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="container py-16 text-center">
        <h2 className="font-display text-2xl font-bold mb-4">
          Design not found
        </h2>
        <Button asChild variant="outline">
          <Link to="/browse">Back to Browse</Link>
        </Button>
      </div>
    );
  }

  const categoryLabel = CATEGORY_LABELS[design.category] ?? design.category;
  const freeMaterials = design.materials.slice(0, 3);
  const hasMoreMaterials = !isPremium && design.materials.length > 3;
  // Cast to extended ConstructionStep type which includes optional stage fields
  const constructionSteps = design.constructionSteps as ConstructionStep[];

  return (
    <div className="min-h-screen bg-background" data-ocid="design.page">
      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[21/9] min-h-[280px] max-h-[480px] overflow-hidden bg-muted">
        {hasSvgPreview(design.id) ? (
          <div className="w-full h-full">
            {(() => {
              const SvgComp = DESIGN_PREVIEWS[design.id.toString()];
              return SvgComp ? <SvgComp className="w-full h-full" /> : null;
            })()}
          </div>
        ) : (
          <img
            src={
              design.previewImageUrl ||
              "/assets/generated/house-2bhk.dim_600x400.jpg"
            }
            alt={design.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/generated/house-2bhk.dim_600x400.jpg";
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
          <div className="container">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TierBadge tier={design.tier} size="md" />
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
                    {categoryLabel}
                  </Badge>
                </div>
                <h1 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                  {design.title}
                </h1>
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  {design.bhk && (
                    <span className="text-white/90 text-sm font-medium">
                      {Number(design.bhk)} BHK
                    </span>
                  )}
                  <span className="text-white/90 text-sm flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {Number(design.areaSqft).toLocaleString("en-IN")} sq.ft
                  </span>
                  <PriceDisplay
                    min={design.estimatedCostMin}
                    max={design.estimatedCostMax}
                    className="text-white font-bold text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                  onClick={handleShare}
                  data-ocid="design.share.button"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1.5">Share</span>
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveToggle}
                  className={
                    isSaved
                      ? "bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm border"
                      : "bg-accent hover:bg-accent/90 text-accent-foreground"
                  }
                  data-ocid="design.save_hero.button"
                >
                  {isSaved ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <BookmarkPlus className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline ml-1.5">
                    {isSaved ? "Saved" : "Save"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <nav
            className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-foreground transition-smooth"
              data-ocid="design.breadcrumb.home_link"
            >
              <Home className="h-3 w-3" /> Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/browse"
              className="hover:text-foreground transition-smooth"
              data-ocid="design.breadcrumb.browse_link"
            >
              Browse
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/browse/$category"
              params={{ category: design.category }}
              className="hover:text-foreground transition-smooth"
              data-ocid="design.breadcrumb.category_link"
            >
              {categoryLabel}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {design.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Tabs */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              data-ocid="design.tabs"
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="overview" data-ocid="design.overview.tab">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="floorplan" data-ocid="design.floorplan.tab">
                  Floor Plan
                </TabsTrigger>
                <TabsTrigger value="materials" data-ocid="design.materials.tab">
                  Materials
                </TabsTrigger>
                <TabsTrigger value="guide" data-ocid="design.guide.tab">
                  Guide
                </TabsTrigger>
              </TabsList>

              {/* ── Overview ── */}
              <TabsContent value="overview" className="mt-4 space-y-5">
                <p className="text-muted-foreground leading-relaxed">
                  {design.description}
                </p>

                {/* Construction Journey Strip */}
                {constructionSteps.length > 0 && (
                  <StageProgressStrip
                    stages={constructionSteps}
                    isPremium={isPremium}
                    onViewStages={goToStagesTab}
                  />
                )}

                <Separator />
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                    Key Specifications
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      ...(design.bhk
                        ? [
                            {
                              label: "Bedrooms",
                              value: `${Number(design.bhk)} BHK`,
                            },
                          ]
                        : []),
                      {
                        label: "Built-up Area",
                        value: `${Number(design.areaSqft).toLocaleString("en-IN")} sq.ft`,
                      },
                      { label: "Category", value: categoryLabel },
                      {
                        label: "Tier",
                        value:
                          design.tier === DesignTier.free
                            ? "Free"
                            : design.tier === DesignTier.premium
                              ? "Premium"
                              : "Ultra Premium",
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="p-3 rounded-lg bg-card border border-border"
                      >
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {design.tags.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {design.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    onClick={handleShare}
                    data-ocid="design.overview.share_button"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copy Link
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5"
                    onClick={handleShare}
                    data-ocid="design.overview.share2_button"
                  >
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </Button>
                </div>
              </TabsContent>

              {/* ── Floor Plan ── */}
              <TabsContent value="floorplan" className="mt-4 space-y-4">
                {FLOOR_PLANS[design.id.toString()] ? (
                  <div
                    className="rounded-xl border border-border overflow-hidden"
                    style={{ minHeight: 480 }}
                  >
                    <FloorPlanViewer
                      userTier={userTier as "free" | "premium" | "ultraPremium"}
                      floorPlanData={FLOOR_PLANS[design.id.toString()]}
                    />
                  </div>
                ) : design.floorPlanImageUrl ? (
                  <>
                    {isPremium ? (
                      <>
                        <img
                          src={design.floorPlanImageUrl}
                          alt="Floor plan"
                          className="w-full rounded-xl border border-border shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/assets/generated/house-2bhk.dim_600x400.jpg";
                          }}
                        />
                        {design.bhk && (
                          <div className="p-4 rounded-lg bg-card border border-border">
                            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                              Dimensions
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Total Area
                                </span>
                                <span className="font-medium">
                                  {Number(design.areaSqft).toLocaleString(
                                    "en-IN",
                                  )}{" "}
                                  sq.ft
                                </span>
                              </div>
                              {design.bhk && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Bedrooms
                                  </span>
                                  <span className="font-medium">
                                    {Number(design.bhk)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative rounded-xl overflow-hidden">
                          <img
                            src={design.floorPlanImageUrl}
                            alt="Floor plan (blurred)"
                            className="w-full rounded-xl blur-md opacity-50 pointer-events-none select-none"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <Lock className="h-10 w-10 text-accent" />
                            <p className="text-base font-semibold text-foreground">
                              Upgrade to view full floor plan
                            </p>
                            <Button
                              onClick={() => setUpgradeOpen(true)}
                              className="bg-accent hover:bg-accent/90 text-accent-foreground"
                              data-ocid="design.floorplan.upgrade_button"
                            >
                              Upgrade to Premium
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-16 text-center text-muted-foreground rounded-xl border border-dashed border-border">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-40" />
                    <p className="font-medium mb-1">Floor plan not available</p>
                    <p className="text-sm">
                      Contact us to request a floor plan for this design.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* ── Materials ── */}
              <TabsContent value="materials" className="mt-4">
                {design.materials.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground rounded-xl border border-dashed border-border">
                    <Wrench className="h-12 w-12 mx-auto mb-3 opacity-40" />
                    <p className="font-medium mb-1">
                      Material breakdown available with Premium
                    </p>
                    <Button
                      size="sm"
                      onClick={() => setUpgradeOpen(true)}
                      className="mt-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                      data-ocid="design.materials.upgrade_button"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="overflow-hidden rounded-xl border border-border">
                      <table
                        className="w-full text-sm"
                        data-ocid="design.materials.table"
                      >
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase">
                              Material
                            </th>
                            <th className="text-right px-4 py-3 font-medium text-muted-foreground text-xs uppercase">
                              Qty
                            </th>
                            <th className="text-right px-4 py-3 font-medium text-muted-foreground text-xs uppercase">
                              Unit
                            </th>
                            <th className="text-right px-4 py-3 font-medium text-muted-foreground text-xs uppercase">
                              ₹/Unit
                            </th>
                            <th className="text-right px-4 py-3 font-medium text-muted-foreground text-xs uppercase">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {(isPremium ? design.materials : freeMaterials).map(
                            (mat, i) => (
                              <tr
                                key={`${mat.name}-${i}`}
                                className="bg-card hover:bg-muted/30 transition-smooth"
                                data-ocid={`design.materials.item.${i + 1}`}
                              >
                                <td className="px-4 py-3 font-medium text-foreground">
                                  {mat.name}
                                </td>
                                <td className="px-4 py-3 text-right text-muted-foreground">
                                  {mat.quantity}
                                </td>
                                <td className="px-4 py-3 text-right text-muted-foreground">
                                  {mat.unit}
                                </td>
                                <td className="px-4 py-3 text-right text-muted-foreground">
                                  ₹
                                  {Number(mat.costPerUnit).toLocaleString(
                                    "en-IN",
                                  )}
                                </td>
                                <td className="px-4 py-3 text-right font-semibold text-foreground">
                                  ₹
                                  {(
                                    mat.quantity * Number(mat.costPerUnit)
                                  ).toLocaleString("en-IN")}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                        {isPremium && (
                          <tfoot>
                            <tr className="bg-primary/5 border-t border-border">
                              <td
                                colSpan={4}
                                className="px-4 py-3 font-bold text-foreground"
                              >
                                Total Material Cost
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-foreground">
                                ₹
                                {design.materials
                                  .reduce(
                                    (sum, m) =>
                                      sum + m.quantity * Number(m.costPerUnit),
                                    0,
                                  )
                                  .toLocaleString("en-IN")}
                              </td>
                            </tr>
                          </tfoot>
                        )}
                      </table>
                    </div>

                    {hasMoreMaterials && (
                      <GatedOverlay
                        onUpgrade={() => setUpgradeOpen(true)}
                        label={`${design.materials.length - 3} more items — Upgrade to see full materials list`}
                      />
                    )}
                  </div>
                )}
              </TabsContent>

              {/* ── Construction Guide ── */}
              <TabsContent value="guide" className="mt-4">
                <ConstructionStages
                  steps={constructionSteps}
                  isPremium={isPremium}
                  onUpgrade={() => setUpgradeOpen(true)}
                  id="construction-stages"
                />
              </TabsContent>
            </Tabs>

            {/* ── Inline Cost Calculator ── */}
            <CostCalculatorSection defaultAreaSqft={Number(design.areaSqft)} />
          </div>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Specs card */}
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <TierBadge tier={design.tier} size="sm" />
                <Badge variant="outline" className="text-xs">
                  {categoryLabel}
                </Badge>
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                {design.title}
              </h2>
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                {design.bhk && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-muted-foreground text-xs">
                      Bedrooms
                    </span>
                    <span className="font-semibold text-foreground">
                      {Number(design.bhk)} BHK
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-0.5">
                  <span className="text-muted-foreground text-xs">Area</span>
                  <span className="font-semibold text-foreground">
                    {Number(design.areaSqft).toLocaleString("en-IN")} sq.ft
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-muted-foreground text-xs">
                    Category
                  </span>
                  <span className="font-semibold text-foreground">
                    {categoryLabel}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-muted-foreground text-xs">
                    Materials
                  </span>
                  <span className="font-semibold text-foreground">
                    {design.materials.length} items
                  </span>
                </div>
              </div>
              <Separator className="mb-4" />
              <span className="text-xs text-muted-foreground">
                Estimated Cost
              </span>
              <PriceDisplay
                min={design.estimatedCostMin}
                max={design.estimatedCostMax}
                className="block text-2xl font-bold text-foreground mt-1"
              />
            </div>

            {/* CTA buttons */}
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={handleSaveToggle}
              variant={isSaved ? "outline" : "default"}
              data-ocid="design.save.primary_button"
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-5 w-5" /> Saved to Dashboard
                </>
              ) : (
                <>
                  <BookmarkPlus className="h-5 w-5" /> Save Design
                </>
              )}
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full gap-2"
              data-ocid="design.calculator.link_button"
            >
              <Link to="/calculator">
                <Building2 className="h-5 w-5" /> Open Calculator
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
              data-ocid="design.contact.primary_button"
            >
              <Link to="/contact">Request Custom Version</Link>
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Want changes? Our architects handle custom modifications.
            </p>

            {/* Construction stages quick view in sidebar */}
            {constructionSteps.length > 0 && (
              <div className="p-4 rounded-xl border border-border bg-muted/30">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Construction Phases
                </p>
                <div className="space-y-2">
                  {constructionSteps
                    .filter((s) => s.stageName)
                    .slice(0, 5)
                    .map((stage, i) => {
                      const isLocked = !isPremium && i > 0;
                      return (
                        <div
                          key={stage.step.toString()}
                          className="flex items-center gap-2"
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                              isLocked
                                ? "bg-muted text-muted-foreground"
                                : "bg-accent text-accent-foreground"
                            }`}
                          >
                            {isLocked ? (
                              <Lock className="h-2.5 w-2.5" />
                            ) : (
                              i + 1
                            )}
                          </div>
                          <span
                            className={`text-xs flex-1 ${isLocked ? "text-muted-foreground" : "text-foreground"}`}
                          >
                            {stage.stageName}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {Number(stage.durationDays)}d
                          </span>
                        </div>
                      );
                    })}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3 text-accent hover:bg-accent/10 text-xs gap-1"
                  onClick={goToStagesTab}
                  data-ocid="design.sidebar.view_stages_button"
                >
                  View Full Guide <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            )}

            {/* Share card */}
            <div className="p-4 rounded-xl border border-border bg-muted/30 text-center">
              <p className="text-xs text-muted-foreground mb-2">
                Share this design
              </p>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 w-full"
                onClick={handleShare}
                data-ocid="design.sidebar.share_button"
              >
                <Copy className="h-3.5 w-3.5" /> Copy Link
              </Button>
            </div>

            {/* Upgrade prompt (for free users) */}
            {!isPremium && (
              <div className="p-4 rounded-xl border border-accent/30 bg-accent/5">
                <p className="text-sm font-semibold text-foreground mb-1">
                  Unlock Premium Access
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Get full floor plans, material lists, construction guides, and
                  advanced cost calculator.
                </p>
                <Button
                  size="sm"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => setUpgradeOpen(true)}
                  data-ocid="design.sidebar.upgrade_button"
                >
                  View Pricing Plans
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Designs ─────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-14" data-ocid="design.related.section">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-bold text-foreground">
                More {categoryLabel} Designs
              </h2>
              <Button asChild variant="outline" size="sm">
                <Link
                  to="/browse/$category"
                  params={{ category: design.category }}
                  data-ocid="design.related.browse_link"
                >
                  View All
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rd, i) => (
                <DesignCard
                  key={rd.id.toString()}
                  design={rd}
                  isSaved={savedDesignIds.has(rd.id)}
                  onSave={(rid) => {
                    if (!isAuthenticated) {
                      login();
                      return;
                    }
                    optimisticSave(rid);
                    saveMutation.mutate(rid);
                  }}
                  onRemove={(rid) => {
                    optimisticRemove(rid);
                    removeMutation.mutate(rid);
                  }}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
