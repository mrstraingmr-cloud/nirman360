import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, L as Link, u as useDesigns, D as DesignCategory, b as useSaveDesign, d as useRemoveSavedDesign, B as Button, G as Gift, e as Building2, f as LoadingSpinner, S as Star, C as Crown } from "./index-V48KFtBG.js";
import { B as Badge } from "./badge-5Q9nPy-w.js";
import { A as ArrowRight } from "./arrow-right-CF0Kyedz.js";
import { u as useUIStore, D as DesignCard, C as CATEGORY_META } from "./uiStore-DkGVN4Cg.js";
import { m as motion } from "./proxy-orZgcBWg.js";
import { Z as Zap } from "./zap-DIJUy3b1.js";
import { C as ChevronRight } from "./chevron-right-CCbKXjRX.js";
import { C as CircleCheck } from "./circle-check-Bevt8mPp.js";
import { M as MapPin } from "./map-pin-DUowKGy8.js";
import { H as House } from "./house-DWcUGNp_.js";
import { U as Users } from "./users-DLX_mwAc.js";
import { S as Sparkles } from "./sparkles-jjQpwM-T.js";
import { B as BookOpen } from "./book-open-xZHPNvz8.js";
import "./PriceDisplay-CLS_qx8W.js";
import "./lock-0Drxw9ty.js";
import "./vanilla-wjP-HMWV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$1);
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
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
];
const Ruler = createLucideIcon("ruler", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CategoryCard({ category, index = 0 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/browse/$category",
      params: { category: category.id },
      "data-ocid": `category.item.${index + 1}`,
      className: "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-smooth hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-video", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: category.image,
              alt: category.label,
              className: "h-full w-full object-cover transition-smooth group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full", children: category.count }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: category.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ArrowRight,
              {
                className: cn(
                  "h-4 w-4 text-muted-foreground transition-smooth",
                  "group-hover:text-primary group-hover:translate-x-1"
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: category.description })
        ] })
      ]
    }
  );
}
const STATS = [
  { value: "500+", label: "Designs Available", icon: House },
  { value: "15+", label: "Categories", icon: Building2 },
  { value: "10,000+", label: "Happy Clients", icon: Users },
  { value: "₹800–3500", label: "Per Sq.ft", icon: Ruler }
];
const PLACEHOLDER_DESIGNS = [
  {
    id: "p1",
    title: "The Sterling Villa",
    location: "Mumbai, India",
    status: "Under Construction",
    budget: "₹4.5Cr+",
    style: "Modern Contemporary",
    tag: "Eco-Friendly",
    img: "/assets/generated/hero-villa-main.dim_1200x700.jpg",
    bhk: "4BHK",
    area: "3,200 sq.ft"
  },
  {
    id: "p2",
    title: "Skyview Towers",
    location: "Bengaluru",
    status: "Under Construction",
    budget: "₹4.5Cr+",
    style: "Modern Contemporary",
    tag: "Eco-Friendly",
    img: "/assets/generated/apartments-building.dim_600x400.jpg",
    bhk: "3BHK",
    area: "2,100 sq.ft"
  },
  {
    id: "p3",
    title: "Green Leaf Residences",
    location: "Delhi",
    status: "Eco-Friendly",
    budget: "₹4.5Cr+",
    style: "Modern Contemporary",
    tag: "Eco-Friendly",
    img: "/assets/generated/house-villa.dim_600x400.jpg",
    bhk: "3BHK",
    area: "2,400 sq.ft"
  },
  {
    id: "p4",
    title: "The Suryakiran 2BHK",
    location: "Pune, India",
    status: "Ready to Build",
    budget: "₹58L",
    style: "Vastu Compliant",
    tag: "Budget Friendly",
    img: "/assets/generated/house-2bhk.dim_600x400.jpg",
    bhk: "2BHK",
    area: "1,050 sq.ft"
  },
  {
    id: "p5",
    title: "Bengaluru Business Hub",
    location: "Bengaluru",
    status: "Eco-Friendly",
    budget: "₹4.5Cr+",
    style: "Commercial Modern",
    tag: "Eco-Friendly",
    img: "/assets/generated/small-business.dim_600x400.jpg",
    bhk: "Office",
    area: "4,500 sq.ft"
  },
  {
    id: "p6",
    title: "Harvest Dairy Complex",
    location: "Anand, Gujarat",
    status: "Ready to Build",
    budget: "₹1.2Cr",
    style: "Agricultural Modern",
    tag: "Functional",
    img: "/assets/generated/dairy-farm.dim_600x400.jpg",
    bhk: "Farm",
    area: "8,000 sq.ft"
  }
];
const TIER_PLANS = [
  {
    name: "Free",
    price: "First Design Free",
    priceNote: "No signup required",
    description: "Start building — zero cost, zero friction",
    icon: Gift,
    cardClass: "border-border bg-card",
    headerStyle: {
      background: "oklch(0.96 0.01 265)",
      borderBottom: "1px solid oklch(0.9 0.02 265)"
    },
    titleStyle: { color: "oklch(0.25 0.07 265)" },
    priceStyle: { color: "oklch(0.35 0.12 265)" },
    features: [
      "1 complete 3D design for free",
      "Basic floor plan & cost estimate",
      "Browse all design categories",
      "Social sharing",
      "No account needed"
    ],
    cta: "Start Free Design",
    ctaStyle: {
      background: "oklch(0.28 0.09 265)",
      color: "oklch(0.99 0 0)"
    },
    href: "/builder"
  },
  {
    name: "Premium 💎",
    price: "₹499–₹999",
    priceNote: "per project",
    description: "For serious homebuilders",
    icon: Star,
    cardClass: "border-primary shadow-xl scale-[1.02]",
    headerStyle: {
      background: "oklch(0.28 0.09 265)"
    },
    titleStyle: { color: "oklch(0.99 0 0)" },
    priceStyle: { color: "oklch(0.75 0.2 32)" },
    featured: true,
    features: [
      "Full 2D + 3D design package",
      "Step-by-step construction guide",
      "Downloadable PDFs (floor plan, BOQ)",
      "Material estimation with quantities",
      "Advanced cost calculator",
      "Ad-free, priority support"
    ],
    cta: "Upgrade to Premium",
    ctaStyle: {
      background: "oklch(0.62 0.18 32)",
      color: "oklch(0.99 0 0)"
    },
    href: "/pricing"
  },
  {
    name: "Ultra Premium 👑",
    price: "₹1,999–₹4,999",
    priceNote: "per project",
    description: "Luxury & professionals",
    icon: Crown,
    cardClass: "border-accent",
    headerStyle: {
      background: "linear-gradient(135deg, oklch(0.55 0.15 55) 0%, oklch(0.65 0.18 45) 100%)"
    },
    titleStyle: { color: "oklch(0.15 0.02 55)" },
    priceStyle: { color: "oklch(0.15 0.02 55)" },
    features: [
      "Full 3D construction animation",
      "AI custom design engine",
      "AR/VR walkthrough",
      "Ultra-realistic rendering (day/night)",
      "Detailed BOQ & stage-wise tracking",
      "Real-time custom editing + CAD export"
    ],
    cta: "Book Consultation",
    ctaStyle: {
      background: "oklch(0.15 0.02 55)",
      color: "oklch(0.99 0 0)"
    },
    href: "/pricing"
  }
];
const WHY_NIRMAN = [
  {
    icon: "🆓",
    title: "Start Free",
    desc: "Your first complete 3D design is free — no signup, no credit card. Just enter your requirements and get a professional design instantly.",
    highlight: "No account needed"
  },
  {
    icon: "📐",
    title: "Premium Quality",
    desc: "Get detailed floor plans, accurate material lists, region-based cost breakdowns, and downloadable PDFs — everything you need to build.",
    highlight: "From ₹499/project"
  },
  {
    icon: "🏆",
    title: "Expert Grade",
    desc: "Animated 3D construction sequences, AI-powered design engine, AR/VR walkthroughs, and professional CAD exports for serious builders.",
    highlight: "From ₹1,999/project"
  }
];
function HomePage() {
  const { data: designs, isLoading } = useDesigns({
    category: DesignCategory.residential
  });
  const { savedDesignIds, optimisticSave, optimisticRemove } = useUIStore();
  const saveMutation = useSaveDesign();
  const removeMutation = useRemoveSavedDesign();
  const featuredDesigns = (designs == null ? void 0 : designs.slice(0, 6)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.hero.section",
        className: "relative overflow-hidden",
        style: {
          background: "linear-gradient(135deg, oklch(0.22 0.06 265) 0%, oklch(0.32 0.1 265) 50%, oklch(0.28 0.08 250) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-[0.06]",
              style: {
                backgroundImage: "linear-gradient(oklch(0.8 0.05 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.8 0.05 265) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container relative z-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex flex-col gap-6",
                initial: { opacity: 0, x: -30 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.55 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      className: "text-xs px-3 py-1 gap-1.5",
                      style: {
                        background: "oklch(0.62 0.18 32 / 0.25)",
                        color: "oklch(0.9 0.12 32)",
                        border: "1px solid oklch(0.62 0.18 32 / 0.4)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3" }),
                        "India's #1 Construction Design Platform"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "h1",
                    {
                      className: "font-display text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight",
                      style: { color: "oklch(0.97 0.01 265)" },
                      children: [
                        "Build Your",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              background: "linear-gradient(90deg, oklch(0.75 0.2 32), oklch(0.85 0.15 55))",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text"
                            },
                            children: "Dream Home"
                          }
                        ),
                        " ",
                        "with Expert 3D Designs"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-lg leading-relaxed max-w-xl",
                      style: { color: "oklch(0.75 0.04 265)" },
                      children: "Explore 500+ professional designs, get instant cost estimates, and download complete floor plans — from 1BHK starter homes to luxury villas."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        asChild: true,
                        size: "lg",
                        className: "gap-2 font-semibold",
                        "data-ocid": "home.start_designing.primary_button",
                        style: {
                          background: "oklch(0.62 0.18 32)",
                          color: "oklch(0.99 0 0)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/builder", children: [
                          "Start Designing Free ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        asChild: true,
                        size: "lg",
                        variant: "outline",
                        className: "gap-2 font-semibold",
                        "data-ocid": "home.browse_designs.secondary_button",
                        style: {
                          borderColor: "oklch(0.75 0.04 265 / 0.5)",
                          color: "oklch(0.9 0.02 265)",
                          background: "transparent"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/browse", children: [
                          "Browse Designs ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                        ] })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 pt-2 text-sm", children: [
                    "First design is free",
                    "No signup required",
                    "Instant 3D preview"
                  ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "flex items-center gap-1.5",
                      style: { color: "oklch(0.7 0.04 265)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            className: "h-4 w-4",
                            style: { color: "oklch(0.75 0.2 32)" }
                          }
                        ),
                        item
                      ]
                    },
                    item
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "relative rounded-2xl overflow-hidden shadow-2xl",
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.55, delay: 0.15 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/assets/generated/hero-villa-main.dim_1200x700.jpg",
                      alt: "Modern luxury Indian villa — Nirman360",
                      className: "w-full h-[360px] lg:h-[420px] object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "absolute bottom-4 left-4 rounded-xl p-3 shadow-xl backdrop-blur-md border",
                      style: {
                        background: "oklch(0.15 0.01 265 / 0.9)",
                        borderColor: "oklch(0.4 0.05 265 / 0.6)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            MapPin,
                            {
                              className: "h-4 w-4",
                              style: { color: "oklch(0.75 0.2 32)" }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "font-semibold",
                              style: { color: "oklch(0.95 0.01 265)" },
                              children: "The Sterling Villa"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.6 0.03 265)" }, children: "— Mumbai, India" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center gap-3 mt-1 text-xs",
                            style: { color: "oklch(0.6 0.03 265)" },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "3BHK • 2,400 sq.ft" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "font-semibold",
                                  style: { color: "oklch(0.75 0.2 32)" },
                                  children: "₹1.8Cr – ₹2.4Cr"
                                }
                              )
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5",
                      style: {
                        background: "oklch(0.62 0.18 32 / 0.9)",
                        color: "oklch(0.99 0 0)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-3 w-3" }),
                        "First Design Free"
                      ]
                    }
                  ) })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.free_banner.section",
        className: "relative overflow-hidden py-8 px-4",
        style: {
          background: "linear-gradient(90deg, oklch(0.62 0.18 32) 0%, oklch(0.68 0.16 45) 60%, oklch(0.72 0.14 55) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-[0.08]",
              style: {
                backgroundImage: "radial-gradient(circle, oklch(0.99 0 0) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container relative z-10 flex flex-col md:flex-row items-center justify-between gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex flex-col gap-2 text-center md:text-left",
                initial: { opacity: 0, x: -20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.5 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center md:justify-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🏠" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: "font-display text-xl lg:text-2xl font-bold",
                        style: { color: "oklch(0.99 0 0)" },
                        children: "Your First Design is Completely Free — No Signup Required"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm lg:text-base",
                      style: { color: "oklch(0.99 0 0 / 0.85)" },
                      children: "Start building your dream home today. No credit card, no account needed."
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex flex-col sm:flex-row gap-3 shrink-0",
                initial: { opacity: 0, x: 20 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.5, delay: 0.1 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      "data-ocid": "home.free_banner.start_button",
                      className: "font-semibold shadow-lg hover:scale-105 transition-transform",
                      style: {
                        background: "oklch(0.22 0.07 265)",
                        color: "oklch(0.99 0 0)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/builder", children: "Start Free Design" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      variant: "outline",
                      "data-ocid": "home.free_banner.plans_button",
                      className: "font-semibold hover:scale-105 transition-transform",
                      style: {
                        borderColor: "oklch(0.99 0 0 / 0.7)",
                        color: "oklch(0.99 0 0)",
                        background: "transparent"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: "See Plans" })
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-8 border-b border-primary/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container grid grid-cols-2 lg:grid-cols-4 gap-6", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex flex-col items-center text-center gap-1",
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.08 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "h-5 w-5 text-primary-foreground/70 mb-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl lg:text-3xl font-bold text-primary-foreground", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary-foreground/70", children: stat.label })
        ]
      },
      stat.label
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "home.why.section", className: "py-16 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent mb-1 uppercase tracking-wider", children: "Why choose us" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Why Nirman360?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "From free first design to expert-grade construction packages — built for every builder" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto", children: WHY_NIRMAN.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative p-6 rounded-2xl border bg-card hover:shadow-xl transition-smooth group overflow-hidden",
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.12 },
          whileHover: { y: -4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-0 right-0 w-24 h-24 rounded-bl-[48px] opacity-5",
                style: { background: "oklch(0.28 0.09 265)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: item.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-smooth", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4", children: item.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full",
                style: {
                  background: i === 0 ? "oklch(0.62 0.18 32 / 0.12)" : "oklch(0.28 0.09 265 / 0.1)",
                  color: i === 0 ? "oklch(0.48 0.16 32)" : "oklch(0.35 0.1 265)"
                },
                children: item.highlight
              }
            )
          ]
        },
        item.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "home.featured.section", className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex items-end justify-between mb-8 gap-4",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent mb-1 uppercase tracking-wider", children: "Handpicked for you" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Featured Designs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loved by homebuilders across India" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                className: "shrink-0 gap-1.5",
                "data-ocid": "home.view_all.button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/browse", children: [
                  "View All ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                ] })
              }
            )
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: featuredDesigns.length > 0 ? featuredDesigns.map((design, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DesignCard,
            {
              design,
              isSaved: savedDesignIds.has(design.id),
              onSave: (id) => {
                optimisticSave(id);
                saveMutation.mutate(id);
              },
              onRemove: (id) => {
                optimisticRemove(id);
                removeMutation.mutate(id);
              },
              index: i
            }
          )
        },
        design.id.toString()
      )) : PLACEHOLDER_DESIGNS.map((ex, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderCard, { example: ex, index: i })
        },
        ex.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        "data-ocid": "home.categories.section",
        className: "py-16 bg-background",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "mb-8",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent mb-1 uppercase tracking-wider", children: "Explore categories" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Browse by Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Find designs tailored to your specific building type and needs" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4", children: CATEGORY_META.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.08 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryCard, { category: cat, index: i })
            },
            cat.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "home.features.section", className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent mb-1 uppercase tracking-wider", children: "Platform features" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Everything You Need to Build" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "From concept to completion — your end-to-end construction companion" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
        {
          icon: "🏗️",
          title: "3D Design Previews",
          desc: "Photo-realistic visualizations before construction begins"
        },
        {
          icon: "📐",
          title: "Detailed Floor Plans",
          desc: "Accurate CAD-quality plans for every room and space"
        },
        {
          icon: "💰",
          title: "Cost Estimation",
          desc: "Region-specific material and labour cost breakdowns"
        },
        {
          icon: "📋",
          title: "Construction Guide",
          desc: "Step-by-step builder roadmap from foundation to finish"
        }
      ].map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "p-6 rounded-xl border bg-card hover:shadow-lg transition-smooth group",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          whileHover: { y: -4 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-3", children: feat.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth", children: feat.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: feat.desc })
          ]
        },
        feat.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "home.pricing.section", className: "py-16 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent mb-1 uppercase tracking-wider", children: "Simple pricing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Choose Your Plan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Start completely free — upgrade when you're ready for more" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto", children: TIER_PLANS.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "relative",
          children: [
            plan.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 left-1/2 -translate-x-1/2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
              " Most Popular"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: `h-full flex flex-col overflow-hidden border-2 ${plan.cardClass} transition-smooth hover:shadow-xl`,
                "data-ocid": `pricing.tier.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "p-5 flex items-start gap-3",
                      style: plan.headerStyle,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          plan.icon,
                          {
                            className: "h-6 w-6 shrink-0 mt-0.5",
                            style: plan.titleStyle
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h3",
                            {
                              className: "font-display font-bold text-lg leading-snug",
                              style: plan.titleStyle,
                              children: plan.name
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs mt-0.5 opacity-75",
                              style: plan.titleStyle,
                              children: plan.description
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "font-display font-bold text-base leading-tight",
                              style: plan.priceStyle,
                              children: plan.price
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "text-xs opacity-70 mt-0.5",
                              style: plan.titleStyle,
                              children: plan.priceNote
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col flex-1 p-5 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2.5 flex-1", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: f })
                    ] }, f)) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        asChild: true,
                        className: "w-full mt-2 font-semibold",
                        size: "sm",
                        "data-ocid": `pricing.cta.${i + 1}`,
                        style: plan.ctaStyle,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: plan.href, children: plan.cta })
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        },
        plan.name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "text-center mt-8",
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { delay: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "ghost",
              className: "gap-2 text-muted-foreground hover:text-foreground",
              "data-ocid": "home.view_all_plans.button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pricing", children: [
                "View Full Pricing Details ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
              ] })
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "home.process.section", className: "py-16 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-12",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-accent mb-1 uppercase tracking-wider", children: "Simple process" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-3", children: "Start Building in 3 Steps" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto", children: [
        {
          step: "01",
          icon: BookOpen,
          title: "Browse Designs",
          desc: "Filter by category, BHK type, size, and budget to find your ideal design."
        },
        {
          step: "02",
          icon: ChartColumn,
          title: "Estimate Costs",
          desc: "Get region-specific material and labour cost breakdowns instantly."
        },
        {
          step: "03",
          icon: Building2,
          title: "Build with Confidence",
          desc: "Download floor plans, construction guides, and start your project."
        }
      ].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col items-center text-center gap-4 relative",
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.12 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "h-7 w-7 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 -right-2 text-xs font-bold text-accent bg-accent/10 border border-accent/30 rounded-full h-6 w-6 flex items-center justify-center", children: step.step })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.desc })
          ]
        },
        step.step
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "home.cta.section",
        className: "py-20 relative overflow-hidden",
        style: {
          background: "linear-gradient(135deg, oklch(0.22 0.06 265) 0%, oklch(0.3 0.1 265) 60%, oklch(0.26 0.08 250) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 opacity-[0.05]",
              style: {
                backgroundImage: "linear-gradient(oklch(0.8 0.05 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.8 0.05 265) 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex flex-col items-center gap-6 max-w-2xl mx-auto text-center",
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-sm font-medium px-3 py-1 rounded-full",
                    style: {
                      background: "oklch(0.62 0.18 32 / 0.2)",
                      color: "oklch(0.85 0.12 32)",
                      border: "1px solid oklch(0.62 0.18 32 / 0.4)"
                    },
                    children: "🏠 First design is completely free"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display text-3xl lg:text-4xl font-bold",
                    style: { color: "oklch(0.97 0.01 265)" },
                    children: "Ready to Build Your Dream?"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg leading-relaxed",
                    style: { color: "oklch(0.72 0.04 265)" },
                    children: "Get your custom 3D design, precise cost estimate, and complete construction plan — start free, upgrade anytime."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      className: "gap-2 font-semibold shadow-lg",
                      "data-ocid": "home.cta.builder_button",
                      style: {
                        background: "oklch(0.62 0.18 32)",
                        color: "oklch(0.99 0 0)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/builder", children: [
                        "Start Free Design ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      asChild: true,
                      size: "lg",
                      variant: "outline",
                      className: "gap-2 font-semibold",
                      "data-ocid": "home.cta.browse_button",
                      style: {
                        borderColor: "oklch(0.75 0.04 265 / 0.4)",
                        color: "oklch(0.88 0.02 265)",
                        background: "transparent"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", children: "Browse Designs" })
                    }
                  )
                ] })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
function PlaceholderCard({
  example: ex,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `design.item.${index + 1}`,
      className: "group flex flex-col overflow-hidden rounded-xl border bg-card transition-smooth hover:shadow-xl hover:-translate-y-1",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-[4/3]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: ex.img,
              alt: ex.title,
              className: "h-full w-full object-cover transition-smooth group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 rounded-full bg-green-600/90 text-white px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm", children: ex.tag }) }),
          index === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm",
              style: {
                background: "oklch(0.62 0.18 32 / 0.9)",
                color: "oklch(0.99 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-3 w-3" }),
                "Try Free"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ex.location })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground leading-snug", children: ex.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            ex.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs border-t border-border pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: ex.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Budget" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-accent", children: ex.budget })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: ex.bhk })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Design Style" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: ex.style })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "sm",
                variant: "default",
                className: "flex-1",
                "data-ocid": `design.link.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", children: "View Details" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "sm",
                variant: "outline",
                className: "flex-1",
                "data-ocid": `design.walkthrough.${index + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/builder", children: "Explore 3D" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  HomePage as default
};
