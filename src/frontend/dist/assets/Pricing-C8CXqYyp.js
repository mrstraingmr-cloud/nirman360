import { c as createLucideIcon, $ as useFreeTierStatus, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, C as Crown, S as Star, X, ab as ChevronDown } from "./index-V48KFtBG.js";
import { U as UpgradeModal } from "./UpgradeModal-3hs19KMP.js";
import { m as motion } from "./proxy-orZgcBWg.js";
import { Z as Zap } from "./zap-DIJUy3b1.js";
import { C as Check } from "./check-BM8icY0u.js";
import { L as Lock } from "./lock-0Drxw9ty.js";
import "./badge-5Q9nPy-w.js";
import "./index-CMimAW43.js";
import "./book-open-xZHPNvz8.js";
import "./sparkles-jjQpwM-T.js";
import "./message-square-C_KYXpPD.js";
import "./circle-check-Bevt8mPp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
      key: "1f1r0c"
    }
  ]
];
const Diamond = createLucideIcon("diamond", __iconNode);
const FREE_FEATURES = [
  "Basic 3D model view",
  "Construction stage overview (3 stages)",
  "Approximate cost estimate",
  "Browse design catalog",
  "Community access"
];
const PREMIUM_FEATURES = [
  "Full 2D floor plan viewer",
  "Complete 3D building model",
  "Step-by-step construction guide (5 stages)",
  "Material estimation calculator",
  "Standard interior templates",
  "Floor switching & 3D rotation",
  "PDF plan download",
  "Priority email support"
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
  "AI design assistant chat"
];
const COMPARISON_ROWS = [
  { feature: "2D Floor Plan", free: false, premium: true, ultra: true },
  {
    feature: "3D Model",
    free: "Basic",
    premium: "Full",
    ultra: "Ultra-Realistic"
  },
  {
    feature: "Construction Stages",
    free: "3 stages",
    premium: "5 stages",
    ultra: "8 stages (animated)"
  },
  {
    feature: "Material List",
    free: false,
    premium: "Approx",
    ultra: "Exact BOQ"
  },
  {
    feature: "Cost Estimate",
    free: "Basic",
    premium: "Detailed",
    ultra: "Stage-wise BOQ"
  },
  {
    feature: "Construction Animation",
    free: false,
    premium: false,
    ultra: true
  },
  { feature: "AI Design Engine", free: false, premium: false, ultra: true },
  { feature: "AR/VR Walkthrough", free: false, premium: false, ultra: true },
  { feature: "Custom Editing", free: false, premium: false, ultra: true },
  {
    feature: "Location Optimization",
    free: false,
    premium: false,
    ultra: true
  },
  { feature: "Expert Mode", free: false, premium: false, ultra: true },
  { feature: "PDF Download", free: false, premium: true, ultra: true },
  { feature: "HD Export", free: false, premium: false, ultra: true },
  { feature: "AI Assistant", free: false, premium: false, ultra: true },
  {
    feature: "Support",
    free: "Community",
    premium: "Priority Email",
    ultra: "Dedicated"
  }
];
const FAQS = [
  {
    q: "What's included in the free design?",
    a: "Your first design is completely free — no signup and no payment required. You get a basic 3D model view, a 3-stage construction overview, and an approximate cost estimate. Browse all designs and start building right away."
  },
  {
    q: "How long is each plan valid?",
    a: "Plans are per project with no expiry. Once you purchase Premium or Ultra Premium for a project, you have permanent access to that project's features — including all downloads and renders."
  },
  {
    q: "Can I upgrade mid-project?",
    a: "Yes! Upgrade anytime and your existing project instantly unlocks all features at the new tier. No data is lost and no restart is required."
  },
  {
    q: "What happens after my first free design?",
    a: "Your data is always saved. After your first free design, you'll be prompted to upgrade to continue exploring. All your inputs and configurations remain intact."
  },
  {
    q: "How do I download my floor plans?",
    a: "PDF download is available on Premium and above. Once upgraded, a Download PDF button appears in the Builder panel for your project."
  },
  {
    q: "Is AR/VR supported on all devices?",
    a: "AR/VR walkthrough works on mobile devices with a gyroscope and on desktop with VR headsets. Smartphone AR mode uses your device camera for real-world overlay."
  },
  {
    q: "Can I export to CAD?",
    a: "Ultra Premium exports HD PNG renders (2048px) and a professional client presentation mode. Full CAD (.dwg) export is planned for a future update."
  }
];
function CellValue({
  value,
  tier
}) {
  if (value === true) {
    const color = tier === "ultra" ? "text-amber-500" : tier === "premium" ? "text-primary" : "text-muted-foreground";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: `h-5 w-5 mx-auto ${color}` });
  }
  if (value === false) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mx-auto text-muted-foreground/40" });
  }
  const textColor = tier === "ultra" ? "text-amber-600 font-semibold" : tier === "premium" ? "text-primary font-medium" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${textColor}`, children: value });
}
function FAQItem({ q, a, index }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.06 },
      className: "border border-border rounded-xl overflow-hidden bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-smooth",
            "data-ocid": `pricing.faq.item.${index + 1}`,
            "aria-expanded": open,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm", children: q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: `h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "px-5 pb-5 bg-card",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: a })
          }
        )
      ]
    }
  );
}
function PricingPage() {
  const { hasUsedFreeProject } = useFreeTierStatus();
  const [upgradeModal, setUpgradeModal] = reactExports.useState(null);
  function scrollToPlans() {
    var _a;
    (_a = document.getElementById("plans")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden py-20 md:py-28",
        style: {
          background: "linear-gradient(135deg, oklch(0.22 0.08 265) 0%, oklch(0.18 0.06 265) 60%, oklch(0.15 0.04 265) 100%)"
        },
        "data-ocid": "pricing.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute inset-0 opacity-[0.07]",
              style: {
                backgroundImage: "linear-gradient(oklch(0.8 0.05 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.8 0.05 265) 1px, transparent 1px)",
                backgroundSize: "48px 48px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-10",
              style: { background: "oklch(0.62 0.18 32)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full opacity-8",
              style: { background: "oklch(0.55 0.15 265)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container relative max-w-3xl text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-white/80 text-xs font-semibold mb-6 bg-white/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Zap,
                    {
                      className: "h-3.5 w-3.5",
                      style: { color: "oklch(0.72 0.18 32)" }
                    }
                  ),
                  "No account required · Start immediately"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.07 },
                className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight",
                children: [
                  "Design Your Dream Home —",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.78 0.18 32)" }, children: "First Design Free" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute -bottom-1.5 left-0 right-0 h-1 rounded-full",
                        style: { background: "oklch(0.72 0.18 32)" }
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.14 },
                className: "text-white/70 text-lg max-w-xl mx-auto mb-10",
                children: "No signup, no payment required to get started. Upgrade when you're ready to unlock the full experience."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2 },
                className: "flex flex-col sm:flex-row gap-3 justify-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: scrollToPlans,
                      className: "font-semibold px-7",
                      style: { background: "oklch(0.62 0.18 32)", color: "white" },
                      "data-ocid": "pricing.hero.primary_button",
                      children: "View Plans"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "border-white/30 text-white hover:bg-white/10 hover:text-white px-7",
                      asChild: true,
                      "data-ocid": "pricing.hero.secondary_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/builder", children: "Start Free →" })
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-14 space-y-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "plans", className: "scroll-mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0 },
            className: "relative flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl",
            "data-ocid": "pricing.plan.item.1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tier-badge-free-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5" }),
                "Start Here"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-1", children: "First Design Free" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-bold text-foreground", children: "₹0" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "for your first project" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-3 mb-7 flex-1", children: FREE_FEATURES.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: feat })
              ] }, feat)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "w-full",
                  asChild: true,
                  "data-ocid": "pricing.free.primary_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/builder", children: hasUsedFreeProject ? "✓ You have your free design" : "Start Your Free Design →" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.1 },
            className: "relative flex flex-col rounded-2xl border-2 border-primary ring-4 ring-primary/10 bg-card p-7 md:-mt-3 md:-mb-3 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl shadow-lg",
            "data-ocid": "pricing.plan.item.2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-1.5 rounded-full text-xs font-bold shadow-md bg-primary text-primary-foreground", children: "Most Popular" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tier-badge-premium-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Diamond, { className: "h-3.5 w-3.5" }),
                "Premium 💎"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-1", children: "Premium" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-bold text-foreground", children: "₹499–₹999" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "per project" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-3 mb-7 flex-1", children: PREMIUM_FEATURES.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 shrink-0 mt-0.5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: feat })
              ] }, feat)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full font-semibold bg-primary text-primary-foreground hover:opacity-90",
                  onClick: () => setUpgradeModal("premium"),
                  "data-ocid": "pricing.premium.primary_button",
                  children: "Upgrade to Premium"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.2 },
            className: "relative flex flex-col rounded-2xl border-2 bg-card p-7 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl",
            style: { borderColor: "oklch(0.72 0.18 32 / 0.6)" },
            "data-ocid": "pricing.plan.item.3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-4 py-1.5 rounded-full text-xs font-bold shadow-md text-white",
                  style: {
                    background: "linear-gradient(90deg, oklch(0.75 0.15 50), oklch(0.62 0.18 32))"
                  },
                  children: "Ultimate Experience 👑"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tier-badge-ultra-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3.5 w-3.5" }),
                "Ultra Premium 👑"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-bold text-foreground mb-1", children: "Ultra Premium" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl font-bold text-foreground", children: "₹1999–₹4999" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "per project" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-3 mb-7 flex-1", children: ULTRA_FEATURES.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: "h-4 w-4 shrink-0 mt-0.5",
                    style: { color: "oklch(0.72 0.18 32)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: feat })
              ] }, feat)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full font-semibold text-white",
                  style: {
                    background: "linear-gradient(90deg, oklch(0.75 0.15 50), oklch(0.62 0.18 32))"
                  },
                  onClick: () => setUpgradeModal("ultraPremium"),
                  "data-ocid": "pricing.ultra.primary_button",
                  children: "Upgrade to Ultra Premium"
                }
              )
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold text-foreground mb-2", children: "Full Feature Comparison" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "See exactly what each plan includes" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.08 },
            className: "rounded-2xl border border-border overflow-hidden bg-card shadow-sm",
            "data-ocid": "pricing.comparison.table",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[560px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-4 px-5 font-semibold text-foreground w-2/5", children: "Feature" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-4 px-3 font-semibold text-muted-foreground w-[20%]", children: "Free" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center py-4 px-3 font-semibold text-primary w-[20%]", children: "Premium 💎" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "text-center py-4 px-3 font-semibold w-[20%]",
                    style: { color: "oklch(0.62 0.18 32)" },
                    children: "Ultra 👑"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: COMPARISON_ROWS.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: `border-b border-border last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-muted/10"}`,
                  "data-ocid": `pricing.comparison.row.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5 text-foreground font-medium", children: row.feature }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CellValue, { value: row.free, tier: "free" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CellValue, { value: row.premium, tier: "premium" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CellValue, { value: row.ultra, tier: "ultra" }) })
                  ]
                },
                row.feature
              )) })
            ] }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "flex items-center gap-2.5 mb-8 justify-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "h-5 w-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Frequently Asked Questions" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FAQItem, { q: faq.q, a: faq.a, index: i }, faq.q)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14",
        style: {
          background: "linear-gradient(135deg, oklch(0.22 0.08 265) 0%, oklch(0.18 0.06 265) 100%)"
        },
        "data-ocid": "pricing.cta.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "flex items-center justify-center gap-2 mb-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Lock,
                  {
                    className: "h-4 w-4",
                    style: { color: "oklch(0.72 0.18 32)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-sm font-medium", children: "Secure · No credit card for free tier" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.06 },
              className: "font-display text-2xl md:text-3xl font-bold text-white mb-4",
              children: "Ready to bring your dream home to life?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.12 },
              className: "text-white/60 text-sm mb-8",
              children: "Start with your first design at no cost. Upgrade anytime to unlock the full experience."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.18 },
              className: "flex flex-col sm:flex-row gap-3 justify-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "font-semibold px-8 text-white",
                    style: { background: "oklch(0.62 0.18 32)" },
                    asChild: true,
                    "data-ocid": "pricing.cta.start_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/builder", children: "Start Free" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "border-white/30 text-white hover:bg-white/10 hover:text-white px-8",
                    onClick: scrollToPlans,
                    "data-ocid": "pricing.cta.compare_button",
                    children: "Compare Plans ↑"
                  }
                )
              ]
            }
          )
        ] })
      }
    ),
    upgradeModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UpgradeModal,
      {
        isOpen: upgradeModal !== null,
        onClose: () => setUpgradeModal(null),
        targetTier: upgradeModal
      }
    )
  ] });
}
export {
  PricingPage as default
};
