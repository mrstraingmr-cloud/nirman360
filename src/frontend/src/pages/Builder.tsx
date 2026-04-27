import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Crown,
  HardHat,
  Layers,
  Lock,
  Maximize2,
  Monitor,
  Printer,
  Settings,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UpgradeModal } from "../components/UpgradeModal";
import BuilderForm from "../components/builder/BuilderForm";
import BuildingViewer3D from "../components/builder/BuildingViewer3D";
import ConstructionGuidePanel from "../components/builder/ConstructionGuidePanel";
import CostPanel from "../components/builder/CostPanel";
import FloorPlanViewer from "../components/builder/FloorPlanViewer";
import InteriorTemplates from "../components/builder/InteriorTemplates";
import MaterialsPanel from "../components/builder/MaterialsPanel";
import PdfDownloadButton from "../components/builder/PdfDownloadButton";
import PremiumMaterialsPanel from "../components/builder/PremiumMaterialsPanel";
import { AIAssistant } from "../components/builder/ultra/AIAssistant";
import { AIDesignEngine } from "../components/builder/ultra/AIDesignEngine";
import { ARVRWalkthrough } from "../components/builder/ultra/ARVRWalkthrough";
import { ConstructionAnimation } from "../components/builder/ultra/ConstructionAnimation";
import { CustomEditingPanel } from "../components/builder/ultra/CustomEditingPanel";
import type { EditingState } from "../components/builder/ultra/CustomEditingPanel";
import { DetailedBOQ } from "../components/builder/ultra/DetailedBOQ";
import { ExpertMode } from "../components/builder/ultra/ExpertMode";
import { LocationOptimization } from "../components/builder/ultra/LocationOptimization";
import { RenderingControls } from "../components/builder/ultra/RenderingControls";
import type { RenderSettings } from "../components/builder/ultra/RenderingControls";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useDesigns";
import { useLocalTier } from "../hooks/useLocalTier";
import type {
  BuilderInput,
  BuilderResult,
  BuildingStage,
} from "../types/builder";
import { generateBuildingResult } from "../utils/builderCalculations";

type UserTier = "free" | "premium" | "ultraPremium";
type ResultTab =
  | "cost"
  | "materials"
  | "guide"
  | "plans"
  | "interiors"
  | "animation"
  | "ai_design"
  | "arvr"
  | "rendering"
  | "boq"
  | "location"
  | "expert";

const STAGE_CONFIG: {
  id: BuildingStage;
  label: string;
  emoji: string;
  tier: UserTier;
}[] = [
  { id: "site_prep", label: "Site Prep", emoji: "🏗️", tier: "free" },
  { id: "foundation", label: "Foundation", emoji: "🧱", tier: "free" },
  { id: "structure", label: "Structure", emoji: "🏢", tier: "free" },
  { id: "roofing", label: "Roofing", emoji: "🏠", tier: "premium" },
  {
    id: "electrical_plumbing",
    label: "MEP Systems",
    emoji: "⚡",
    tier: "premium",
  },
  { id: "finishing", label: "Finishing", emoji: "🎨", tier: "premium" },
  { id: "interior", label: "Interior", emoji: "🛋️", tier: "ultraPremium" },
];

const TIER_ORDER: UserTier[] = ["free", "premium", "ultraPremium"];

function tierAllows(userTier: UserTier, requiredTier: UserTier): boolean {
  return TIER_ORDER.indexOf(userTier) >= TIER_ORDER.indexOf(requiredTier);
}

const TIER_LABELS: Record<UserTier, { label: string; color: string }> = {
  free: { label: "Free", color: "bg-muted text-muted-foreground" },
  premium: { label: "Premium", color: "bg-primary/10 text-primary" },
  ultraPremium: { label: "Ultra Premium", color: "bg-accent/10 text-accent" },
};

const FIRST_USED_KEY = "nirman360_first_project_used";

function markFirstProjectUsed() {
  try {
    localStorage.setItem(FIRST_USED_KEY, "true");
  } catch {
    /* noop */
  }
}
function getFirstProjectUsed(): boolean {
  try {
    return localStorage.getItem(FIRST_USED_KEY) === "true";
  } catch {
    return false;
  }
}

// ─── Presentation Mode component ────────────────────────────────────────────
interface PresentationSlide {
  label: string;
  content: React.ReactNode;
}

function PresentationMode({
  onExit,
  slides,
}: {
  onExit: () => void;
  slides: PresentationSlide[];
}) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slides.length]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onExit();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onExit]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "#0a0f1e" }}
      data-ocid="builder.presentation.modal"
    >
      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Crown className="h-5 w-5 text-orange-400" />
          <span className="text-white font-semibold text-sm">
            Nirman360 — Presentation Mode
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Slide dots */}
          <div className="flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setCurrent(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === current ? "#f97316" : "#ffffff30",
                }}
                aria-label={`Go to slide ${i + 1}`}
                data-ocid={`builder.presentation.slide.${i + 1}`}
              />
            ))}
          </div>
          <Button
            size="sm"
            onClick={onExit}
            style={{ background: "#f97316", color: "#fff" }}
            data-ocid="builder.presentation.exit_button"
          >
            Exit Presentation
          </Button>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-8 mt-16">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
          {slides[current].label}
        </p>
        <div className="w-full rounded-2xl border border-white/10 overflow-hidden">
          {slides[current].content}
        </div>
        <p className="text-white/30 text-xs mt-4">
          Slide {current + 1} of {slides.length} · Auto-advances every 5s ·
          Press Esc to exit
        </p>
      </div>
    </div>
  );
}

// ─── Main Builder Component ─────────────────────────────────────────────────
export default function Builder() {
  const { isAuthenticated } = useAuth();
  const { data: profile } = useProfile();
  const { localTier } = useLocalTier();

  // Resolve tier: local tier (from UpgradeModal) OR authenticated profile tier
  const profileTier =
    isAuthenticated && profile?.tier ? (profile.tier as UserTier) : "free";
  // Pick whichever grants more access
  const userTier: UserTier =
    TIER_ORDER.indexOf(localTier) >= TIER_ORDER.indexOf(profileTier)
      ? localTier
      : profileTier;

  const [builderResult, setBuilderResult] = useState<BuilderResult | null>(
    null,
  );
  const [builderInput, setBuilderInput] = useState<BuilderInput | null>(null);
  const [activeStage, setActiveStage] = useState<BuildingStage | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState<ResultTab>("cost");
  const [firstProjectUsed] = useState<boolean>(getFirstProjectUsed);
  const [selectedInterior, setSelectedInterior] = useState<string | null>(null);

  // Ultra Premium state
  const [renderSettings, setRenderSettings] = useState<RenderSettings>({
    dayNight: "day",
    material: "concrete",
    intensity: 80,
    shadows: true,
  });
  const [editingState, setEditingState] = useState<EditingState | null>(null);
  const [animationStage, setAnimationStage] = useState(0);
  const [showCustomPanel, setShowCustomPanel] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);

  async function handleGenerate(input: BuilderInput) {
    setBuilderInput(input);
    setIsGenerating(true);
    setHasGenerated(false);
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    const result = generateBuildingResult(input);
    setBuilderResult(result);
    setHasGenerated(true);
    setActiveStage(null);
    setIsGenerating(false);
    markFirstProjectUsed();
  }

  function handleExportHDRender() {
    window.print();
  }

  function handlePresentationMode() {
    void document.documentElement.requestFullscreen?.().catch(() => {
      /* fullscreen not available — proceed anyway */
    });
    setPresentationMode(true);
  }

  const tierInfo = TIER_LABELS[userTier];
  const isPremiumPlus = tierAllows(userTier, "premium");
  const isUltraPremium = userTier === "ultraPremium";

  const RESULT_TABS: { id: ResultTab; label: string; tier: UserTier }[] = [
    { id: "cost", label: "💰 Cost", tier: "free" },
    { id: "materials", label: "🧱 Materials", tier: "free" },
    { id: "guide", label: "📋 Guide", tier: "free" },
    { id: "plans", label: "📐 2D Plans", tier: "premium" },
    { id: "interiors", label: "🛋️ Interiors", tier: "premium" },
    // Ultra Premium tabs
    { id: "animation", label: "🎬 Animation", tier: "ultraPremium" },
    { id: "ai_design", label: "✨ AI Design", tier: "ultraPremium" },
    { id: "arvr", label: "🥽 AR/VR", tier: "ultraPremium" },
    { id: "rendering", label: "🎨 Rendering", tier: "ultraPremium" },
    { id: "boq", label: "📊 BOQ", tier: "ultraPremium" },
    { id: "location", label: "📍 Location", tier: "ultraPremium" },
    { id: "expert", label: "🛡️ Expert", tier: "ultraPremium" },
  ];

  // Presentation slides (built from current state)
  const presentationSlides: PresentationSlide[] = [
    {
      label: "3D Building View",
      content: (
        <div style={{ background: "#111827", minHeight: "50vh" }}>
          <BuildingViewer3D
            result={builderResult}
            activeStage={activeStage}
            userTier={userTier}
            isGenerating={false}
            onStageChange={setActiveStage}
          />
        </div>
      ),
    },
    {
      label: "Floor Plans",
      content: (
        <div style={{ background: "#1a1f3e" }}>
          <FloorPlanViewer userTier={userTier} />
        </div>
      ),
    },
    {
      label: "Material & Cost Summary",
      content: (
        <div style={{ background: "#1a1f3e" }}>
          {builderResult ? (
            <CostPanel result={builderResult} userTier={userTier} />
          ) : (
            <div className="p-8 text-center text-white/40 text-sm">
              Generate a design first to see cost summary
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Construction Guide",
      content: (
        <div style={{ background: "#1a1f3e" }}>
          {builderResult ? (
            <ConstructionGuidePanel
              result={builderResult}
              userTier={userTier}
              activeStage={activeStage}
              onStageSelect={setActiveStage}
            />
          ) : (
            <div className="p-8 text-center text-white/40 text-sm">
              Generate a design first to see construction guide
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0a0f1e" }}
      data-ocid="builder.page"
    >
      {/* ── Presentation Mode overlay ────────────────────────────────────── */}
      {presentationMode && (
        <PresentationMode
          onExit={() => {
            setPresentationMode(false);
            if (document.fullscreenElement) {
              void document.exitFullscreen().catch(() => {
                /* noop */
              });
            }
          }}
          slides={presentationSlides}
        />
      )}

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden border-b border-white/10"
        style={{
          background:
            "linear-gradient(135deg, #0a0f1e 0%, #0d1635 60%, #1a2040 100%)",
        }}
      >
        {/* Orange glow accent */}
        <div
          className="pointer-events-none absolute -top-24 right-0 w-[420px] h-[420px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="container py-8 md:py-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left */}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-white/40 mb-3">
                <span>Nirman360</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/70">Design Builder</span>
              </div>
              <h1
                className="text-3xl md:text-4xl font-display font-bold text-white leading-tight mb-2"
                data-ocid="builder.hero.title"
              >
                3D Building Design System
              </h1>
              <p className="text-white/60 text-sm md:text-base mb-4">
                AI-powered architectural visualization for your dream building
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: "🏗️", label: "Step-by-Step 3D" },
                  { icon: "💰", label: "Live Cost Estimation" },
                  { icon: "🧱", label: "Material Specs" },
                  ...(isPremiumPlus
                    ? [
                        { icon: "📐", label: "2D Floor Plans" },
                        { icon: "🛋️", label: "Interior Templates" },
                      ]
                    : []),
                  ...(isUltraPremium
                    ? [
                        { icon: "🎬", label: "3D Animation" },
                        { icon: "🥽", label: "AR/VR Walkthrough" },
                        { icon: "🤖", label: "AI Design Engine" },
                      ]
                    : []),
                ].map(({ icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/80"
                  >
                    {icon} {label}
                  </span>
                ))}
                {isPremiumPlus && !isUltraPremium && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-orange-500/40 bg-orange-500/10 text-orange-400"
                    data-ocid="builder.premium_unlocked.badge"
                  >
                    <Sparkles className="h-3 w-3" />
                    Premium Features Unlocked
                  </span>
                )}
                {isUltraPremium && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-amber-400/40 bg-amber-400/10 text-amber-300"
                    data-ocid="builder.ultra_unlocked.badge"
                  >
                    <Crown className="h-3 w-3" />
                    Ultra Premium Unlocked
                  </span>
                )}
              </div>
            </div>

            {/* Right — Tier badge + export controls + PDF download */}
            <div
              className="flex items-center gap-3 shrink-0 flex-wrap justify-end"
              data-ocid="builder.tier.badge"
            >
              {/* Ultra Premium Export Controls */}
              {isUltraPremium && hasGenerated && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleExportHDRender}
                    className="gap-1.5 text-xs border-white/20 text-white/70 hover:text-white"
                    data-ocid="builder.export_hd.button"
                    aria-label="Export HD Render via print"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Export HD
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePresentationMode}
                    className="gap-1.5 text-xs border-amber-400/30 text-amber-300 hover:text-amber-200"
                    data-ocid="builder.presentation_mode.button"
                    aria-label="Enter Presentation Mode"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    Present
                  </Button>
                </div>
              )}

              {/* PDF download — shown when a result has been generated */}
              {hasGenerated && builderResult && (
                <PdfDownloadButton
                  result={builderResult}
                  input={builderResult.input}
                  userTier={userTier}
                />
              )}
              <div className="text-right">
                <p className="text-white/40 text-xs mb-1">Your Plan</p>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-white/10 ${tierInfo.color}`}
                >
                  <Crown className="h-3.5 w-3.5" />
                  {tierInfo.label}
                </span>
              </div>
              {userTier !== "ultraPremium" && (
                <Link to="/pricing" data-ocid="builder.upgrade.link">
                  <Button
                    size="sm"
                    className="gap-1.5 text-xs font-semibold"
                    style={{ background: "#f97316", color: "#fff" }}
                    aria-label="Upgrade your plan"
                  >
                    Upgrade
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Free tier banners ──────────────────────────────────────────── */}
      {userTier === "free" && !firstProjectUsed && (
        <div
          className="container pt-4"
          data-ocid="builder.free_first_project.banner"
        >
          <div className="flex items-center gap-3 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
            <span className="text-orange-400 text-lg">🎁</span>
            <div>
              <p className="text-white font-semibold text-sm">
                You're using your first free design!
              </p>
              <p className="text-white/60 text-xs">
                Your first complete building design is on us — no signup or
                payment required.
              </p>
            </div>
          </div>
        </div>
      )}

      {userTier === "free" && firstProjectUsed && (
        <div
          className="container pt-4"
          data-ocid="builder.upgrade_prompt.banner"
        >
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-orange-400 shrink-0" />
              <p className="text-white/80 text-sm">
                Free design used. Upgrade to access more designs, 2D floor
                plans, and PDF exports.
              </p>
            </div>
            <Link to="/pricing" data-ocid="builder.banner_upgrade.link">
              <Button
                size="sm"
                className="shrink-0 gap-1.5 text-xs font-semibold"
                style={{ background: "#f97316", color: "#fff" }}
              >
                Upgrade <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* ── Main Layout ─────────────────────────────────────────────────── */}
      <div className="flex-1 container py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[30%_45%_25%] gap-5">
          {/* ─ Left: BuilderForm / CustomEditing panel ─────────────────── */}
          <div
            className="lg:sticky lg:top-20 lg:self-start flex flex-col gap-4"
            data-ocid="builder.form.panel"
          >
            {/* Ultra Premium custom editing toggle */}
            {isUltraPremium && builderResult && (
              <button
                type="button"
                onClick={() => setShowCustomPanel((v) => !v)}
                data-ocid="builder.custom_editing.toggle"
                className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl border transition-all duration-200 text-sm font-semibold"
                style={
                  showCustomPanel
                    ? {
                        background: "#f9731615",
                        borderColor: "#f97316aa",
                        color: "#f97316",
                      }
                    : {
                        background: "#1a1f3e",
                        borderColor: "#ffffff20",
                        color: "#ffffff80",
                      }
                }
              >
                <Settings className="h-4 w-4" />
                {showCustomPanel ? "Hide Custom Editing" : "⚙ Custom Editing"}
                <Monitor className="h-3.5 w-3.5 ml-auto opacity-60" />
              </button>
            )}

            {/* Custom editing panel (Ultra Premium only) */}
            {isUltraPremium && showCustomPanel && builderResult && (
              <div
                className="rounded-xl border border-white/10 overflow-hidden"
                style={{ background: "#1a1f3e" }}
                data-ocid="builder.custom_editing.panel"
              >
                <CustomEditingPanel
                  onUpdate={(edits) => setEditingState(edits)}
                />
              </div>
            )}

            {/* Show editing state summary when applied */}
            {editingState && isUltraPremium && (
              <div
                className="rounded-xl border border-orange-500/20 bg-orange-500/5 px-4 py-2.5 flex items-center gap-2"
                data-ocid="builder.editing_applied.badge"
              >
                <Sparkles className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                <p className="text-orange-300 text-xs">
                  Custom edits applied —{" "}
                  <span className="font-medium">
                    {editingState.flooring} · {editingState.exteriorFinish}
                  </span>
                </p>
              </div>
            )}

            {/* BuilderForm — always visible */}
            <div
              className="rounded-xl border border-white/10 overflow-hidden"
              style={{ background: "#1a1f3e" }}
            >
              <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                <HardHat className="h-4 w-4 text-orange-400" />
                <h2 className="text-sm font-semibold text-white">
                  Building Parameters
                </h2>
              </div>
              <div className="max-h-[calc(100vh-13rem)] overflow-y-auto">
                <BuilderForm
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
              </div>
            </div>
          </div>

          {/* ─ Center: 3D Viewer ──────────────────────────────────────── */}
          <div className="flex flex-col gap-4" data-ocid="builder.viewer.panel">
            {/* Viewer card */}
            <div
              className="rounded-xl border border-white/10 overflow-hidden"
              style={{ background: "#111827", minHeight: "60vh" }}
            >
              <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                <Layers className="h-4 w-4 text-orange-400" />
                <h2 className="text-sm font-semibold text-white">
                  3D Visualisation
                </h2>
                {hasGenerated && (
                  <Badge
                    variant="outline"
                    className="ml-auto text-xs border-orange-500/30 text-orange-400"
                  >
                    Live
                  </Badge>
                )}
              </div>
              <div style={{ minHeight: "55vh" }}>
                <BuildingViewer3D
                  result={builderResult}
                  activeStage={activeStage}
                  userTier={userTier}
                  isGenerating={isGenerating}
                  onStageChange={setActiveStage}
                />
              </div>
            </div>

            {/* Stage navigation */}
            <div
              className="rounded-xl border border-white/10 p-3"
              style={{ background: "#1a1f3e" }}
            >
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                role="tablist"
                aria-label="Construction stages"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeStage === null}
                  data-ocid="builder.stage.all.tab"
                  onClick={() => setActiveStage(null)}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  style={
                    activeStage === null
                      ? { background: "#f97316", color: "#fff" }
                      : { background: "#ffffff10", color: "#ffffff80" }
                  }
                >
                  All Stages
                </button>

                {STAGE_CONFIG.map((s) => {
                  const locked = !tierAllows(userTier, s.tier);
                  const isActive = activeStage === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`${s.label}${locked ? " — locked" : ""}`}
                      data-ocid={`builder.stage.${s.id}.tab`}
                      onClick={() => !locked && setActiveStage(s.id)}
                      disabled={locked}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:cursor-not-allowed"
                      style={
                        isActive
                          ? { background: "#f97316", color: "#fff" }
                          : locked
                            ? { background: "#ffffff08", color: "#ffffff30" }
                            : { background: "#ffffff10", color: "#ffffff80" }
                      }
                    >
                      <span>{s.emoji}</span>
                      <span>{s.label}</span>
                      {locked && <Lock className="h-3 w-3 opacity-50" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─ Right: Results Panel ───────────────────────────────────── */}
          <div
            className="flex flex-col gap-4"
            data-ocid="builder.results.panel"
          >
            {/* Tab bar */}
            <div
              className="rounded-xl border border-white/10 overflow-hidden"
              style={{ background: "#1a1f3e" }}
            >
              <div
                className="flex border-b border-white/10 overflow-x-auto"
                role="tablist"
                aria-label="Result panels"
              >
                {RESULT_TABS.map((tab) => {
                  const tabLocked = !tierAllows(userTier, tab.tier);
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      data-ocid={`builder.results.${tab.id}.tab`}
                      onClick={() =>
                        tabLocked
                          ? setUpgradeModalOpen(true)
                          : setActiveTab(tab.id)
                      }
                      className="shrink-0 flex items-center gap-1 py-2.5 px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                      style={
                        activeTab === tab.id
                          ? {
                              borderBottom: "2px solid #f97316",
                              color: "#f97316",
                              background: "#f9731608",
                            }
                          : {
                              borderBottom: "2px solid transparent",
                              color: tabLocked ? "#ffffff25" : "#ffffff50",
                            }
                      }
                    >
                      {tab.label}
                      {tabLocked && (
                        <Lock className="h-2.5 w-2.5 opacity-50 ml-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Panel content */}
              <div
                role="tabpanel"
                aria-label={`${activeTab} panel`}
                className="transition-all duration-200"
                style={{ minHeight: "40vh" }}
              >
                {/* Ultra Premium locked overlay for non-ultra users on ultra tabs */}
                {!isUltraPremium &&
                  [
                    "animation",
                    "ai_design",
                    "arvr",
                    "rendering",
                    "boq",
                    "location",
                    "expert",
                  ].includes(activeTab) && (
                    <UltraLockedState
                      onUpgradeClick={() => setUpgradeModalOpen(true)}
                    />
                  )}

                {/* Free / Premium tabs */}
                {![
                  "animation",
                  "ai_design",
                  "arvr",
                  "rendering",
                  "boq",
                  "location",
                  "expert",
                ].includes(activeTab) && (
                  <>
                    {!hasGenerated ? (
                      <EmptyResultState />
                    ) : (
                      <>
                        {activeTab === "cost" && builderResult && (
                          <CostPanel
                            result={builderResult}
                            userTier={userTier}
                          />
                        )}
                        {activeTab === "materials" &&
                          builderResult &&
                          (isPremiumPlus ? (
                            <PremiumMaterialsPanel
                              result={builderResult}
                              userTier={userTier}
                            />
                          ) : (
                            <MaterialsPanel
                              result={builderResult}
                              userTier={userTier}
                            />
                          ))}
                        {activeTab === "guide" && builderResult && (
                          <ConstructionGuidePanel
                            result={builderResult}
                            userTier={userTier}
                            activeStage={activeStage}
                            onStageSelect={setActiveStage}
                          />
                        )}
                        {activeTab === "plans" && (
                          <FloorPlanViewer userTier={userTier} />
                        )}
                        {activeTab === "interiors" && (
                          <InteriorTemplates
                            userTier={userTier}
                            onSelect={(template) =>
                              setSelectedInterior(template)
                            }
                          />
                        )}
                      </>
                    )}
                    {/* Plans and Interiors are available even before generation */}
                    {!hasGenerated && activeTab === "plans" && (
                      <FloorPlanViewer userTier={userTier} />
                    )}
                    {!hasGenerated && activeTab === "interiors" && (
                      <InteriorTemplates
                        userTier={userTier}
                        onSelect={(template) => setSelectedInterior(template)}
                      />
                    )}
                  </>
                )}

                {/* Ultra Premium tabs — only rendered when userTier is ultraPremium */}
                {isUltraPremium && (
                  <>
                    {activeTab === "animation" && (
                      <div className="p-3">
                        <ConstructionAnimation
                          activeStageIndex={animationStage}
                          onStageChange={setAnimationStage}
                          autoPlay={false}
                        />
                      </div>
                    )}
                    {activeTab === "ai_design" && (
                      <div className="p-3">
                        <AIDesignEngine
                          onDesignSelect={(id) =>
                            console.log("AI design selected:", id)
                          }
                          currentInput={builderInput ?? undefined}
                        />
                      </div>
                    )}
                    {activeTab === "arvr" && (
                      <div className="p-3">
                        <ARVRWalkthrough userTier={userTier} />
                      </div>
                    )}
                    {activeTab === "rendering" && (
                      <div className="p-3">
                        <RenderingControls
                          onChange={setRenderSettings}
                          currentSettings={renderSettings}
                        />
                      </div>
                    )}
                    {activeTab === "boq" && builderResult && (
                      <div className="p-3">
                        <DetailedBOQ result={builderResult} />
                      </div>
                    )}
                    {activeTab === "boq" && !builderResult && (
                      <div className="p-8 text-center">
                        <p className="text-white/40 text-sm">
                          Generate a design first to view the Detailed BOQ.
                        </p>
                      </div>
                    )}
                    {activeTab === "location" && (
                      <div className="p-3">
                        <LocationOptimization
                          currentInput={builderInput ?? undefined}
                        />
                      </div>
                    )}
                    {activeTab === "expert" && (
                      <div className="p-3">
                        <ExpertMode
                          result={builderResult ?? undefined}
                          input={builderInput ?? undefined}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Selected interior indicator */}
            {selectedInterior && (
              <div
                className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 flex items-center gap-2"
                data-ocid="builder.selected_interior.panel"
              >
                <Sparkles className="h-4 w-4 text-orange-400 shrink-0" />
                <p className="text-white/80 text-xs">
                  Interior template applied:{" "}
                  <span className="font-semibold text-orange-400 capitalize">
                    {selectedInterior.replace(/-/g, " ")}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer Note ─────────────────────────────────────────────── */}
        <div className="mt-8 pb-8 text-center">
          <p className="text-white/30 text-xs mb-2">
            Estimates are indicative and may vary based on local material costs,
            contractor rates, and site conditions.
          </p>
          <Link
            to="/contact"
            data-ocid="builder.contact.link"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
          >
            Need a custom design? Contact our architects
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ── AI Assistant floating widget (Ultra Premium only) ───────────── */}
      {isUltraPremium && (
        <AIAssistant
          result={builderResult ?? undefined}
          input={builderInput ?? undefined}
        />
      )}

      {/* ── Upgrade Modal ────────────────────────────────────────────────── */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        targetTier="ultraPremium"
        featureName="Ultra Premium Features"
      />
    </div>
  );
}

function UltraLockedState({ onUpgradeClick }: { onUpgradeClick: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-10 px-6 text-center gap-3"
      data-ocid="builder.ultra_locked.empty_state"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: "#f9731615", border: "1px solid #f9731640" }}
      >
        <Crown className="h-6 w-6 text-orange-400" />
      </div>
      <div>
        <p className="text-white text-sm font-semibold mb-1">
          Ultra Premium Feature
        </p>
        <p className="text-white/50 text-xs max-w-[180px] leading-relaxed">
          Upgrade to Ultra Premium to unlock 3D Animation, AI Design Engine,
          AR/VR Walkthrough, and more.
        </p>
      </div>
      <button
        type="button"
        onClick={onUpgradeClick}
        data-ocid="builder.ultra_locked.open_modal_button"
        className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
        style={{ background: "#f97316", color: "#fff" }}
      >
        Upgrade to Ultra Premium
      </button>
    </div>
  );
}

function EmptyResultState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
      data-ocid="builder.results.empty_state"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-2xl"
        style={{ background: "#f9731615" }}
        aria-hidden
      >
        <Building2 className="h-7 w-7 text-orange-400" />
      </div>
      <h3 className="text-sm font-semibold text-white mb-2">
        Your Design Awaits
      </h3>
      <p className="text-xs text-white/40 leading-relaxed max-w-[200px]">
        Complete the form on the left and click{" "}
        <span className="text-orange-400 font-medium">
          'Generate My 3D Design'
        </span>{" "}
        to see your complete building analysis.
      </p>
    </div>
  );
}
