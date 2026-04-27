import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  Crown,
  Diamond,
  HelpCircle,
  Lock,
  Star,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { UpgradeModal } from "../components/UpgradeModal";
import { useFreeTierStatus } from "../hooks/useTierAccess";

// ─── Types ────────────────────────────────────────────────────────────────────
type TierTarget = "premium" | "ultraPremium";
type CellVal = boolean | string;

// ─── Data ─────────────────────────────────────────────────────────────────────
const FREE_FEATURES = [
  "Basic 3D model view",
  "Construction stage overview (3 stages)",
  "Approximate cost estimate",
  "Browse design catalog",
  "Community access",
];

const PREMIUM_FEATURES = [
  "Full 2D floor plan viewer",
  "Complete 3D building model",
  "Step-by-step construction guide (5 stages)",
  "Material estimation calculator",
  "Standard interior templates",
  "Floor switching & 3D rotation",
  "PDF plan download",
  "Priority email support",
];

const ULTRA_FEATURES = [
  "Everything in Premium +",
  "Animated 3D construction sequence (8 stages)",
  "AI custom design engine (3 options)",
  "AR/VR immersive walkthrough",
  "Day/night ultra-realistic rendering",
  "Detailed BOQ cost breakdown",
  "Live custom editing (walls, floors, materials)",
  "Location optimization (vastu, soil, weather)",
  "Expert structural mode",
  "HD render export (2048px PNG)",
  "Client presentation mode",
  "AI design assistant chat",
];

const COMPARISON_ROWS: {
  feature: string;
  free: CellVal;
  premium: CellVal;
  ultra: CellVal;
}[] = [
  { feature: "2D Floor Plan", free: false, premium: true, ultra: true },
  {
    feature: "3D Model",
    free: "Basic",
    premium: "Full",
    ultra: "Ultra-Realistic",
  },
  {
    feature: "Construction Stages",
    free: "3 stages",
    premium: "5 stages",
    ultra: "8 stages (animated)",
  },
  {
    feature: "Material List",
    free: false,
    premium: "Approx",
    ultra: "Exact BOQ",
  },
  {
    feature: "Cost Estimate",
    free: "Basic",
    premium: "Detailed",
    ultra: "Stage-wise BOQ",
  },
  {
    feature: "Construction Animation",
    free: false,
    premium: false,
    ultra: true,
  },
  { feature: "AI Design Engine", free: false, premium: false, ultra: true },
  { feature: "AR/VR Walkthrough", free: false, premium: false, ultra: true },
  { feature: "Custom Editing", free: false, premium: false, ultra: true },
  {
    feature: "Location Optimization",
    free: false,
    premium: false,
    ultra: true,
  },
  { feature: "Expert Mode", free: false, premium: false, ultra: true },
  { feature: "PDF Download", free: false, premium: true, ultra: true },
  { feature: "HD Export", free: false, premium: false, ultra: true },
  { feature: "AI Assistant", free: false, premium: false, ultra: true },
  {
    feature: "Support",
    free: "Community",
    premium: "Priority Email",
    ultra: "Dedicated",
  },
];

const FAQS = [
  {
    q: "What's included in the free design?",
    a: "Your first design is completely free — no signup and no payment required. You get a basic 3D model view, a 3-stage construction overview, and an approximate cost estimate. Browse all designs and start building right away.",
  },
  {
    q: "How long is each plan valid?",
    a: "Plans are per project with no expiry. Once you purchase Premium or Ultra Premium for a project, you have permanent access to that project's features — including all downloads and renders.",
  },
  {
    q: "Can I upgrade mid-project?",
    a: "Yes! Upgrade anytime and your existing project instantly unlocks all features at the new tier. No data is lost and no restart is required.",
  },
  {
    q: "What happens after my first free design?",
    a: "Your data is always saved. After your first free design, you'll be prompted to upgrade to continue exploring. All your inputs and configurations remain intact.",
  },
  {
    q: "How do I download my floor plans?",
    a: "PDF download is available on Premium and above. Once upgraded, a Download PDF button appears in the Builder panel for your project.",
  },
  {
    q: "Is AR/VR supported on all devices?",
    a: "AR/VR walkthrough works on mobile devices with a gyroscope and on desktop with VR headsets. Smartphone AR mode uses your device camera for real-world overlay.",
  },
  {
    q: "Can I export to CAD?",
    a: "Ultra Premium exports HD PNG renders (2048px) and a professional client presentation mode. Full CAD (.dwg) export is planned for a future update.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function CellValue({
  value,
  tier,
}: { value: CellVal; tier: "free" | "premium" | "ultra" }) {
  if (value === true) {
    const color =
      tier === "ultra"
        ? "text-amber-500"
        : tier === "premium"
          ? "text-primary"
          : "text-muted-foreground";
    return <Check className={`h-5 w-5 mx-auto ${color}`} />;
  }
  if (value === false) {
    return <X className="h-4 w-4 mx-auto text-muted-foreground/40" />;
  }
  const textColor =
    tier === "ultra"
      ? "text-amber-600 font-semibold"
      : tier === "premium"
        ? "text-primary font-medium"
        : "text-muted-foreground";
  return <span className={`text-xs ${textColor}`}>{value}</span>;
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="border border-border rounded-xl overflow-hidden bg-card"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-smooth"
        data-ocid={`pricing.faq.item.${index + 1}`}
        aria-expanded={open}
      >
        <span className="font-medium text-foreground text-sm">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-5 pb-5 bg-card"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const { hasUsedFreeProject } = useFreeTierStatus();
  const [upgradeModal, setUpgradeModal] = useState<TierTarget | null>(null);

  function scrollToPlans() {
    document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 265) 0%, oklch(0.18 0.06 265) 60%, oklch(0.15 0.04 265) 100%)",
        }}
        data-ocid="pricing.hero.section"
      >
        {/* Blueprint grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.8 0.05 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.8 0.05 265) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Accent circles */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-10"
          style={{ background: "oklch(0.62 0.18 32)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-8"
          style={{ background: "oklch(0.55 0.15 265)" }}
        />

        <div className="container relative max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-white/80 text-xs font-semibold mb-6 bg-white/10"
          >
            <Zap
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.72 0.18 32)" }}
            />
            No account required · Start immediately
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
          >
            Design Your Dream Home —{" "}
            <span className="relative inline-block">
              <span style={{ color: "oklch(0.78 0.18 32)" }}>
                First Design Free
              </span>
              <span
                className="absolute -bottom-1.5 left-0 right-0 h-1 rounded-full"
                style={{ background: "oklch(0.72 0.18 32)" }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-white/70 text-lg max-w-xl mx-auto mb-10"
          >
            No signup, no payment required to get started. Upgrade when you're
            ready to unlock the full experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              onClick={scrollToPlans}
              className="font-semibold px-7"
              style={{ background: "oklch(0.62 0.18 32)", color: "white" }}
              data-ocid="pricing.hero.primary_button"
            >
              View Plans
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white px-7"
              asChild
              data-ocid="pricing.hero.secondary_button"
            >
              <Link to="/builder">Start Free →</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="container py-14 space-y-20">
        {/* ── Tier Cards ── */}
        <div id="plans" className="scroll-mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {/* FREE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              data-ocid="pricing.plan.item.1"
            >
              <div className="tier-badge-free-full">
                <Zap className="h-3.5 w-3.5" />
                Start Here
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                First Design Free
              </h3>
              <div className="mb-1">
                <span className="font-display text-4xl font-bold text-foreground">
                  ₹0
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                for your first project
              </p>

              <ul className="flex flex-col gap-3 mb-7 flex-1">
                {FREE_FEATURES.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
                    <span className="text-foreground">{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full"
                asChild
                data-ocid="pricing.free.primary_button"
              >
                <Link to="/builder">
                  {hasUsedFreeProject
                    ? "✓ You have your free design"
                    : "Start Your Free Design →"}
                </Link>
              </Button>
            </motion.div>

            {/* PREMIUM — elevated center */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative flex flex-col rounded-2xl border-2 border-primary ring-4 ring-primary/10 bg-card p-7 md:-mt-3 md:-mb-3 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl shadow-lg"
              data-ocid="pricing.plan.item.2"
            >
              {/* Floating badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="px-4 py-1.5 rounded-full text-xs font-bold shadow-md bg-primary text-primary-foreground">
                  Most Popular
                </span>
              </div>

              <div className="tier-badge-premium-full">
                <Diamond className="h-3.5 w-3.5" />
                Premium 💎
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                Premium
              </h3>
              <div className="mb-1">
                <span className="font-display text-4xl font-bold text-foreground">
                  ₹499–₹999
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">per project</p>

              <ul className="flex flex-col gap-3 mb-7 flex-1">
                {PREMIUM_FEATURES.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                    <span className="text-foreground">{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full font-semibold bg-primary text-primary-foreground hover:opacity-90"
                onClick={() => setUpgradeModal("premium")}
                data-ocid="pricing.premium.primary_button"
              >
                Upgrade to Premium
              </Button>
            </motion.div>

            {/* ULTRA PREMIUM */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative flex flex-col rounded-2xl border-2 bg-card p-7 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
              style={{ borderColor: "oklch(0.72 0.18 32 / 0.6)" }}
              data-ocid="pricing.plan.item.3"
            >
              {/* Gold badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span
                  className="px-4 py-1.5 rounded-full text-xs font-bold shadow-md text-white"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.75 0.15 50), oklch(0.62 0.18 32))",
                  }}
                >
                  Ultimate Experience 👑
                </span>
              </div>

              <div className="tier-badge-ultra-full">
                <Crown className="h-3.5 w-3.5" />
                Ultra Premium 👑
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                Ultra Premium
              </h3>
              <div className="mb-1">
                <span className="font-display text-3xl font-bold text-foreground">
                  ₹1999–₹4999
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">per project</p>

              <ul className="flex flex-col gap-3 mb-7 flex-1">
                {ULTRA_FEATURES.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm">
                    <Star
                      className="h-4 w-4 shrink-0 mt-0.5"
                      style={{ color: "oklch(0.72 0.18 32)" }}
                    />
                    <span className="text-foreground">{feat}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.75 0.15 50), oklch(0.62 0.18 32))",
                }}
                onClick={() => setUpgradeModal("ultraPremium")}
                data-ocid="pricing.ultra.primary_button"
              >
                Upgrade to Ultra Premium
              </Button>
            </motion.div>
          </div>
        </div>

        {/* ── Feature Comparison Table ── */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Full Feature Comparison
            </h2>
            <p className="text-muted-foreground text-sm">
              See exactly what each plan includes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-border overflow-hidden bg-card shadow-sm"
            data-ocid="pricing.comparison.table"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-4 px-5 font-semibold text-foreground w-2/5">
                      Feature
                    </th>
                    <th className="text-center py-4 px-3 font-semibold text-muted-foreground w-[20%]">
                      Free
                    </th>
                    <th className="text-center py-4 px-3 font-semibold text-primary w-[20%]">
                      Premium 💎
                    </th>
                    <th
                      className="text-center py-4 px-3 font-semibold w-[20%]"
                      style={{ color: "oklch(0.62 0.18 32)" }}
                    >
                      Ultra 👑
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-muted/10"}`}
                      data-ocid={`pricing.comparison.row.${i + 1}`}
                    >
                      <td className="py-3 px-5 text-foreground font-medium">
                        {row.feature}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <CellValue value={row.free} tier="free" />
                      </td>
                      <td className="py-3 px-3 text-center">
                        <CellValue value={row.premium} tier="premium" />
                      </td>
                      <td className="py-3 px-3 text-center">
                        <CellValue value={row.ultra} tier="ultra" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2.5 mb-8 justify-center"
          >
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA Strip ── */}
      <section
        className="py-14"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 265) 0%, oklch(0.18 0.06 265) 100%)",
        }}
        data-ocid="pricing.cta.section"
      >
        <div className="container max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Lock
              className="h-4 w-4"
              style={{ color: "oklch(0.72 0.18 32)" }}
            />
            <span className="text-white/60 text-sm font-medium">
              Secure · No credit card for free tier
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="font-display text-2xl md:text-3xl font-bold text-white mb-4"
          >
            Ready to bring your dream home to life?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-white/60 text-sm mb-8"
          >
            Start with your first design at no cost. Upgrade anytime to unlock
            the full experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              className="font-semibold px-8 text-white"
              style={{ background: "oklch(0.62 0.18 32)" }}
              asChild
              data-ocid="pricing.cta.start_button"
            >
              <Link to="/builder">Start Free</Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8"
              onClick={scrollToPlans}
              data-ocid="pricing.cta.compare_button"
            >
              Compare Plans ↑
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Upgrade Modal ── */}
      {upgradeModal && (
        <UpgradeModal
          isOpen={upgradeModal !== null}
          onClose={() => setUpgradeModal(null)}
          targetTier={upgradeModal}
        />
      )}
    </div>
  );
}
