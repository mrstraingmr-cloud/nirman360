import { j as jsxRuntimeExports, B as Button, h as useParams, i as useDesign, k as useAuth, b as useSaveDesign, d as useRemoveSavedDesign, l as useProfile, r as reactExports, u as useDesigns, L as Link, T as TierBadge, m as DesignTier, e as Building2, R as Region, M as MaterialGrade, n as useCalculateCost } from "./index-V48KFtBG.js";
import { B as Badge } from "./badge-5Q9nPy-w.js";
import { F as FileText, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./UpgradeModal-3hs19KMP.js";
import { S as Separator, F as FloorPlanViewer } from "./FloorPlanViewer-B6WOFkkL.js";
import { S as Skeleton } from "./skeleton-qj2TMXnh.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DploLmsm.js";
import { u as ue } from "./index-CMimAW43.js";
import { C as ChevronRight } from "./chevron-right-CCbKXjRX.js";
import { L as Lock } from "./lock-0Drxw9ty.js";
import { C as Clock } from "./clock-0ZC4Sf3W.js";
import { C as CircleCheck } from "./circle-check-Bevt8mPp.js";
import { u as useUIStore, a as CATEGORY_LABELS, h as hasSvgPreview, b as DESIGN_PREVIEWS, B as BookmarkCheck, c as BookmarkPlus, D as DesignCard } from "./uiStore-DkGVN4Cg.js";
import { P as PriceDisplay, f as formatIndianPrice } from "./PriceDisplay-CLS_qx8W.js";
import { M as MapPin } from "./map-pin-DUowKGy8.js";
import { S as Share2, C as Copy, P as PieChart, a as Pie } from "./PieChart-3CFV4Fue.js";
import { H as House } from "./house-DWcUGNp_.js";
import { W as Wrench } from "./wrench-CLpHcfN7.js";
import { R as ResponsiveContainer, C as Cell, T as Tooltip, L as Legend } from "./generateCategoricalChart-BjwTRGzh.js";
import "./book-open-xZHPNvz8.js";
import "./sparkles-jjQpwM-T.js";
import "./message-square-C_KYXpPD.js";
import "./index-CF2_vi6k.js";
import "./vanilla-wjP-HMWV.js";
const STAGE_TYPE_CONFIG = {
  FOUNDATION: {
    label: "Foundation",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    iconBg: "bg-amber-500"
  },
  STRUCTURE: {
    label: "Structure",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    iconBg: "bg-blue-600"
  },
  MEP: {
    label: "MEP",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    iconBg: "bg-purple-600"
  },
  ENCLOSURE: {
    label: "Enclosure",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    iconBg: "bg-emerald-600"
  },
  INTERIOR: {
    label: "Interior",
    color: "bg-rose-100 text-rose-800 border-rose-200",
    iconBg: "bg-rose-600"
  }
};
function StageProgressStrip({
  stages,
  isPremium,
  onViewStages
}) {
  const stageSteps = stages.filter((s) => s.stageName).slice(0, 5);
  if (stageSteps.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border bg-card overflow-hidden",
      "data-ocid": "design.overview.stages_strip",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: "Construction Journey" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-accent text-xs gap-1 h-7 hover:bg-accent/10",
              onClick: onViewStages,
              "data-ocid": "design.overview.view_stages_button",
              children: [
                "View Details ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-x-auto", children: stageSteps.map((stage, i) => {
          const isLocked = !isPremium && i > 0;
          const typeConfig = stage.stageType ? STAGE_TYPE_CONFIG[stage.stageType] : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 min-w-[120px] flex flex-col items-center text-center p-3 relative group",
              children: [
                i < stageSteps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[22px] left-[60%] right-0 h-px bg-border z-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${isLocked ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"}`,
                    children: isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }) : Number(stage.step)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-xs font-semibold leading-tight mb-1 ${isLocked ? "text-muted-foreground" : "text-foreground"}`,
                    children: stage.stageName
                  }
                ),
                typeConfig && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${typeConfig.color}`,
                    children: typeConfig.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1 flex items-center gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5" }),
                  Number(stage.durationDays),
                  "d"
                ] })
              ]
            },
            stage.step.toString()
          );
        }) })
      ]
    }
  );
}
function StageCard({ stage, index, isPremium, onUpgrade }) {
  const isLocked = !isPremium && index > 0;
  const typeConfig = stage.stageType ? STAGE_TYPE_CONFIG[stage.stageType] : null;
  const activities = stage.activities ? stage.activities.split(",").map((a) => a.trim()).filter(Boolean) : [];
  const descriptionFull = stage.description ?? "";
  const firstSentence = descriptionFull.split(/\.\s+/)[0] + (descriptionFull.includes(".") ? "." : "");
  const descriptionPreview = isLocked ? firstSentence : descriptionFull;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
      "data-ocid": `design.stages.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isLocked ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"}`,
              children: isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }) : Number(stage.step)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: `font-display font-bold text-base leading-tight ${isLocked ? "text-muted-foreground" : "text-foreground"}`,
                  children: stage.stageName ?? `Stage ${Number(stage.step)}`
                }
              ),
              typeConfig && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs px-2 py-0.5 rounded-full border font-semibold tracking-wide ${typeConfig.color}`,
                  children: stage.stageType
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              Number(stage.durationDays),
              " days"
            ] })
          ] })
        ] }),
        stage.stageImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-[16/7] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: stage.stageImageUrl,
              alt: stage.stageName ?? `Stage ${Number(stage.step)}`,
              className: `w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${isLocked ? "blur-md opacity-50 scale-105" : ""}`,
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ),
          isLocked && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/90 backdrop-blur-sm rounded-xl px-5 py-4 flex flex-col items-center gap-2 shadow-lg border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-6 w-6 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Upgrade to Premium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Unlock full stage visualization" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "bg-accent hover:bg-accent/90 text-accent-foreground mt-1",
                onClick: onUpgrade,
                "data-ocid": `design.stages.upgrade_button.${index + 1}`,
                children: "Upgrade Now"
              }
            )
          ] }) })
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: descriptionPreview }),
            isLocked && descriptionFull.length > firstSentence.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed blur-sm select-none pointer-events-none line-clamp-2 opacity-60", children: descriptionFull.slice(firstSentence.length).trim() }) })
          ] }),
          activities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Key Activities" }),
            isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              activities.slice(0, 2).map((act) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-xs text-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 shrink-0 text-accent" }),
                    act
                  ]
                },
                act
              )),
              activities.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blur-sm opacity-40 pointer-events-none select-none", children: activities.slice(2, 5).map((act) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-xs text-foreground mt-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 shrink-0 text-accent" }),
                    act
                  ]
                },
                act
              )) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-x-4 gap-y-1", children: activities.map((act) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 text-xs text-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 shrink-0 text-accent" }),
                  act
                ]
              },
              act
            )) })
          ] })
        ] })
      ]
    }
  );
}
function ConstructionStages({
  steps,
  isPremium,
  onUpgrade,
  id
}) {
  const stages = steps.filter((s) => s.stageName).slice(0, 5);
  const extraSteps = steps.filter((s) => !s.stageName || Number(s.step) > 5);
  if (stages.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center text-muted-foreground rounded-xl border border-dashed border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-12 w-12 mx-auto mb-3 opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "Construction stages available with Premium" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          onClick: onUpgrade,
          className: "mt-2 bg-accent hover:bg-accent/90 text-accent-foreground",
          "data-ocid": "design.guide.upgrade_button",
          children: "Upgrade Now"
        }
      )
    ] });
  }
  const totalDays = stages.reduce((sum, s) => sum + Number(s.durationDays), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id, className: "space-y-6", "data-ocid": "design.stages.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Step-by-Step Construction Guide" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
          stages.length,
          " stages · ~",
          totalDays,
          " days total construction time"
        ] })
      ] }),
      !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: "border-accent/40 text-accent bg-accent/5 text-xs self-start sm:self-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3 mr-1" }),
            " Upgrade to unlock all stages"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-xl border border-border bg-card p-4",
        "data-ocid": "design.stages.progress",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-0", children: stages.map((stage, i) => {
          const isLocked = !isPremium && i > 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center w-full", children: [
                  i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `flex-1 h-0.5 ${isLocked ? "bg-border" : "bg-accent/40"}`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border-2 transition-all ${isLocked ? "bg-muted border-border text-muted-foreground" : "bg-accent border-accent text-accent-foreground"}`,
                      children: isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }) : Number(stage.step)
                    }
                  ),
                  i < stages.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `flex-1 h-0.5 ${!isPremium && i >= 0 ? "bg-border" : "bg-accent/40"}`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-center px-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-[11px] font-semibold leading-tight ${isLocked ? "text-muted-foreground" : "text-foreground"}`,
                      children: stage.stageName
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                    Number(stage.durationDays),
                    "d"
                  ] })
                ] })
              ]
            },
            stage.step.toString()
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: stages.map((stage, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      StageCard,
      {
        stage,
        index: i,
        isPremium,
        onUpgrade
      },
      stage.step.toString()
    )) }),
    extraSteps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3", children: "Detailed Construction Steps" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: (isPremium ? extraSteps : extraSteps.slice(0, 2)).map(
        (step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex gap-4 p-4 rounded-xl bg-card border border-border",
            "data-ocid": `design.guide.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold", children: Number(step.step) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-relaxed", children: step.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                  Number(step.durationDays),
                  " days"
                ] })
              ] })
            ]
          },
          step.step.toString()
        )
      ) })
    ] })
  ] });
}
const d7Ground = [
  {
    x: 10,
    y: 10,
    w: 200,
    h: 140,
    name: "Parking",
    dims: "14×20 ft",
    type: "utility"
  },
  {
    x: 210,
    y: 10,
    w: 120,
    h: 140,
    name: "Guest Room",
    dims: "10×12 ft",
    type: "bedroom"
  },
  {
    x: 330,
    y: 10,
    w: 260,
    h: 140,
    name: "Family Lounge",
    dims: "14×16 ft",
    type: "living"
  },
  {
    x: 10,
    y: 150,
    w: 580,
    h: 50,
    name: "Veranda",
    dims: "6×34 ft",
    type: "outdoor"
  },
  {
    x: 10,
    y: 200,
    w: 200,
    h: 110,
    name: "Kitchen",
    dims: "10×12 ft",
    type: "kitchen"
  },
  {
    x: 210,
    y: 200,
    w: 75,
    h: 110,
    name: "Store",
    dims: "6×8 ft",
    type: "utility"
  },
  {
    x: 285,
    y: 200,
    w: 75,
    h: 110,
    name: "Toilet",
    dims: "5×6 ft",
    type: "bathroom"
  },
  {
    x: 360,
    y: 200,
    w: 75,
    h: 110,
    name: "Toilet",
    dims: "5×6 ft",
    type: "bathroom"
  },
  {
    x: 435,
    y: 200,
    w: 155,
    h: 110,
    name: "Wardrobe/Hall",
    dims: "8×10 ft",
    type: "utility"
  },
  {
    x: 10,
    y: 310,
    w: 580,
    h: 110,
    name: "Backyard",
    dims: "10×14 ft",
    type: "outdoor"
  }
];
const d7First = [
  {
    x: 10,
    y: 10,
    w: 230,
    h: 155,
    name: "Master Bedroom",
    dims: "12×14 ft",
    type: "bedroom"
  },
  {
    x: 240,
    y: 10,
    w: 190,
    h: 155,
    name: "Bedroom 2",
    dims: "10×12 ft",
    type: "bedroom"
  },
  {
    x: 430,
    y: 10,
    w: 160,
    h: 155,
    name: "Bedroom 3",
    dims: "10×12 ft",
    type: "bedroom"
  },
  {
    x: 10,
    y: 165,
    w: 265,
    h: 155,
    name: "Living Room",
    dims: "14×16 ft",
    type: "living"
  },
  {
    x: 275,
    y: 165,
    w: 105,
    h: 75,
    name: "Toilet",
    dims: "5×7 ft",
    type: "bathroom"
  },
  {
    x: 275,
    y: 240,
    w: 105,
    h: 80,
    name: "Toilet",
    dims: "5×7 ft",
    type: "bathroom"
  },
  {
    x: 380,
    y: 165,
    w: 210,
    h: 155,
    name: "Balcony",
    dims: "6×14 ft",
    type: "outdoor"
  },
  {
    x: 10,
    y: 320,
    w: 580,
    h: 100,
    name: "Slab / Roof Terrace",
    dims: "1526 sq.ft",
    type: "outdoor"
  }
];
const d8Ground = [
  {
    x: 10,
    y: 10,
    w: 580,
    h: 65,
    name: "Front Veranda",
    dims: "6×40 ft",
    type: "outdoor"
  },
  {
    x: 10,
    y: 75,
    w: 195,
    h: 150,
    name: "Master Bedroom",
    dims: "12×14 ft",
    type: "bedroom"
  },
  {
    x: 205,
    y: 75,
    w: 185,
    h: 150,
    name: "Sitting Room",
    dims: "14×18 ft",
    type: "living"
  },
  {
    x: 390,
    y: 75,
    w: 200,
    h: 150,
    name: "Bedroom 1",
    dims: "10×12 ft",
    type: "bedroom"
  },
  {
    x: 10,
    y: 225,
    w: 195,
    h: 100,
    name: "Bathroom",
    dims: "5×8 ft",
    type: "bathroom"
  },
  {
    x: 205,
    y: 225,
    w: 185,
    h: 100,
    name: "Dining Room",
    dims: "10×12 ft",
    type: "living"
  },
  {
    x: 390,
    y: 225,
    w: 200,
    h: 100,
    name: "Bedroom 2",
    dims: "10×12 ft",
    type: "bedroom"
  },
  {
    x: 10,
    y: 325,
    w: 195,
    h: 95,
    name: "WC",
    dims: "4×6 ft",
    type: "bathroom"
  },
  {
    x: 205,
    y: 325,
    w: 185,
    h: 95,
    name: "Kitchen",
    dims: "10×10 ft",
    type: "kitchen"
  },
  {
    x: 390,
    y: 325,
    w: 200,
    h: 95,
    name: "Store",
    dims: "6×8 ft",
    type: "utility"
  }
];
const d9Ground = [
  {
    x: 10,
    y: 10,
    w: 265,
    h: 155,
    name: "Living Room",
    dims: "14×18 ft",
    type: "living"
  },
  {
    x: 275,
    y: 10,
    w: 315,
    h: 155,
    name: "Parking",
    dims: "10×20 ft",
    type: "utility"
  },
  {
    x: 10,
    y: 165,
    w: 265,
    h: 130,
    name: "Kitchen",
    dims: "10×12 ft",
    type: "kitchen"
  },
  {
    x: 275,
    y: 165,
    w: 315,
    h: 130,
    name: "Dining",
    dims: "10×12 ft",
    type: "living"
  },
  {
    x: 10,
    y: 295,
    w: 265,
    h: 120,
    name: "Bedroom",
    dims: "10×12 ft",
    type: "bedroom"
  },
  {
    x: 275,
    y: 295,
    w: 165,
    h: 120,
    name: "WC",
    dims: "5×6 ft",
    type: "bathroom"
  },
  {
    x: 440,
    y: 295,
    w: 150,
    h: 120,
    name: "Staircase",
    dims: "4×8 ft",
    type: "staircase"
  }
];
const d9First = [
  {
    x: 10,
    y: 10,
    w: 315,
    h: 165,
    name: "Master Bedroom",
    dims: "12×14 ft",
    type: "bedroom"
  },
  {
    x: 325,
    y: 10,
    w: 265,
    h: 165,
    name: "Bedroom 2",
    dims: "10×12 ft",
    type: "bedroom"
  },
  {
    x: 10,
    y: 175,
    w: 315,
    h: 120,
    name: "Living / Study",
    dims: "14×12 ft",
    type: "living"
  },
  {
    x: 325,
    y: 175,
    w: 155,
    h: 120,
    name: "WC",
    dims: "5×6 ft",
    type: "bathroom"
  },
  {
    x: 480,
    y: 175,
    w: 110,
    h: 120,
    name: "Staircase",
    dims: "4×8 ft",
    type: "staircase"
  },
  {
    x: 10,
    y: 295,
    w: 265,
    h: 125,
    name: "Balcony",
    dims: "6×10 ft",
    type: "outdoor"
  },
  {
    x: 275,
    y: 295,
    w: 315,
    h: 125,
    name: "Attached Bath",
    dims: "5×8 ft",
    type: "bathroom"
  }
];
const d10Ground = [
  {
    x: 10,
    y: 10,
    w: 155,
    h: 90,
    name: "Porch",
    dims: "8×10 ft",
    type: "outdoor"
  },
  {
    x: 165,
    y: 10,
    w: 225,
    h: 90,
    name: "Master Bedroom",
    dims: "12×14 ft",
    type: "bedroom"
  },
  {
    x: 390,
    y: 10,
    w: 200,
    h: 90,
    name: "Bedroom",
    dims: "10×12 ft",
    type: "bedroom"
  },
  {
    x: 10,
    y: 100,
    w: 310,
    h: 145,
    name: "Living Room",
    dims: "16×18 ft",
    type: "living"
  },
  {
    x: 320,
    y: 100,
    w: 270,
    h: 145,
    name: "Dining",
    dims: "12×12 ft",
    type: "living"
  },
  {
    x: 10,
    y: 245,
    w: 225,
    h: 100,
    name: "Kitchen",
    dims: "12×14 ft",
    type: "kitchen"
  },
  {
    x: 235,
    y: 245,
    w: 175,
    h: 100,
    name: "WC",
    dims: "5×7 ft",
    type: "bathroom"
  },
  {
    x: 410,
    y: 245,
    w: 180,
    h: 100,
    name: "WC",
    dims: "5×7 ft",
    type: "bathroom"
  },
  {
    x: 10,
    y: 345,
    w: 580,
    h: 75,
    name: "Open Utility / Back Space",
    dims: "",
    type: "utility"
  }
];
const d10First = [
  {
    x: 10,
    y: 10,
    w: 270,
    h: 160,
    name: "Master Suite",
    dims: "14×16 ft",
    type: "bedroom"
  },
  {
    x: 280,
    y: 10,
    w: 155,
    h: 160,
    name: "Walk-in + Bath",
    dims: "8×10 ft",
    type: "bathroom"
  },
  {
    x: 435,
    y: 10,
    w: 155,
    h: 160,
    name: "Bedroom 3",
    dims: "10×12 ft",
    type: "bedroom"
  },
  {
    x: 10,
    y: 170,
    w: 270,
    h: 145,
    name: "Family Lounge",
    dims: "14×16 ft",
    type: "living"
  },
  {
    x: 280,
    y: 170,
    w: 310,
    h: 145,
    name: "Bedroom 4",
    dims: "10×12 ft",
    type: "bedroom"
  },
  {
    x: 10,
    y: 315,
    w: 155,
    h: 105,
    name: "WC",
    dims: "5×7 ft",
    type: "bathroom"
  },
  {
    x: 165,
    y: 315,
    w: 155,
    h: 105,
    name: "WC",
    dims: "5×7 ft",
    type: "bathroom"
  },
  {
    x: 320,
    y: 315,
    w: 155,
    h: 105,
    name: "Staircase",
    dims: "6×8 ft",
    type: "staircase"
  },
  {
    x: 475,
    y: 315,
    w: 115,
    h: 105,
    name: "Balcony",
    dims: "8×16 ft",
    type: "outdoor"
  }
];
const FLOOR_PLANS = {
  "7": {
    label: "Plot: 34×46 ft | Modern Flat-Roof Villa",
    ground: d7Ground,
    first: d7First
  },
  "8": {
    label: "Plot: 40×50 ft | Heritage Bungalow",
    ground: d8Ground
  },
  "9": {
    label: "Plot: 22×48 ft | Urban Duplex",
    ground: d9Ground,
    first: d9First
  },
  "10": {
    label: "Plot: 30×51 ft | Skyline Modern House",
    ground: d10Ground,
    first: d10First
  }
};
const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))"
];
const REGION_OPTIONS = [
  { value: Region.urban, label: "Urban (Metro)" },
  { value: Region.semiUrban, label: "Semi-Urban (Tier 2/3)" },
  { value: Region.rural, label: "Rural / Village" }
];
const GRADE_OPTIONS = [
  { value: MaterialGrade.premium, label: "Premium (High-end finishes)" },
  { value: MaterialGrade.standard, label: "Standard (Mid-range)" },
  { value: MaterialGrade.basic, label: "Basic (Budget-friendly)" }
];
function UpgradeModal({ open, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "design.upgrade.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-xl", children: "Unlock Full Access" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This content is available to Premium and Ultra Premium members. Upgrade to get full floor plans, complete material lists, and detailed construction guides." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: [
        {
          name: "Premium",
          price: "₹999/month",
          perks: [
            "Full floor plans & PDFs",
            "Complete material breakdowns",
            "Advanced cost calculator",
            "Ad-free experience"
          ]
        },
        {
          name: "Ultra Premium",
          price: "₹4,999/month",
          perks: [
            "Everything in Premium",
            "Custom 3D design requests",
            "Personal architect consultation",
            "Priority support"
          ]
        }
      ].map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 rounded-lg border border-border bg-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: tier.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-accent", children: tier.price })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: tier.perks.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "text-xs text-muted-foreground flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "✓" }),
                  " ",
                  p
                ]
              },
              p
            )) })
          ]
        },
        tier.name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1",
            onClick: onClose,
            "data-ocid": "design.upgrade.cancel_button",
            children: "Maybe Later"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            className: "flex-1 bg-accent hover:bg-accent/90 text-accent-foreground",
            "data-ocid": "design.upgrade.confirm_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", onClick: onClose, children: "View Pricing" })
          }
        )
      ] })
    ] })
  ] }) });
}
function GatedOverlay({
  onUpgrade,
  label = "Upgrade to view full content"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-8 w-8 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground text-center px-4", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          className: "bg-accent hover:bg-accent/90 text-accent-foreground",
          onClick: onUpgrade,
          "data-ocid": "design.gated.upgrade_button",
          children: "Upgrade Now"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none select-none blur-sm opacity-40 h-48 overflow-hidden" })
  ] });
}
function CostCalculatorSection({ defaultAreaSqft }) {
  const [area, setArea] = reactExports.useState(defaultAreaSqft.toString());
  const [region, setRegion] = reactExports.useState(Region.urban);
  const [grade, setGrade] = reactExports.useState(MaterialGrade.standard);
  const calcMutation = useCalculateCost();
  function runCalc() {
    const sqft = Number.parseInt(area);
    if (!sqft || sqft < 100) {
      ue.error("Please enter a valid area (min 100 sq.ft)");
      return;
    }
    calcMutation.mutate({
      areaSqft: BigInt(sqft),
      region,
      materialGrade: grade
    });
  }
  const result = calcMutation.data;
  const breakdownData = result ? buildBreakdownData(result.breakdown) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 mt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-accent" }),
      "Inline Cost Calculator"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "text-xs text-muted-foreground font-medium",
            htmlFor: "calc-area",
            children: "Built-up Area (sq.ft)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "calc-area",
            type: "number",
            min: 100,
            value: area,
            onChange: (e) => setArea(e.target.value),
            className: "h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            "data-ocid": "design.calculator.area_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "text-xs text-muted-foreground font-medium",
            htmlFor: "calc-region",
            children: "Region"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: "calc-region",
            value: region,
            onChange: (e) => setRegion(e.target.value),
            className: "h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            "data-ocid": "design.calculator.region_select",
            children: REGION_OPTIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r.value, children: r.label }, r.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "text-xs text-muted-foreground font-medium",
            htmlFor: "calc-grade",
            children: "Material Grade"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: "calc-grade",
            value: grade,
            onChange: (e) => setGrade(e.target.value),
            className: "h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            "data-ocid": "design.calculator.grade_select",
            children: GRADE_OPTIONS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g.value, children: g.label }, g.value))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: runCalc,
        disabled: calcMutation.isPending,
        className: "w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground",
        "data-ocid": "design.calculator.submit_button",
        children: calcMutation.isPending ? "Calculating..." : "Calculate Cost"
      }
    ),
    result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mt-5 space-y-4",
        "data-ocid": "design.calculator.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Estimated Cost" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display", children: formatIndianPrice(result.totalCost) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Cost per sq.ft" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-semibold text-foreground", children: [
                "₹",
                Number(result.costPerSqft).toLocaleString("en-IN")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-3", children: "Cost Breakdown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: breakdownData ?? [],
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 50,
                  outerRadius: 90,
                  paddingAngle: 3,
                  dataKey: "value",
                  label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`,
                  labelLine: false,
                  children: (breakdownData ?? []).map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Cell,
                    {
                      fill: CHART_COLORS[index % CHART_COLORS.length]
                    },
                    entry.name
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  formatter: (val) => formatIndianPrice(BigInt(Math.round(val)))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
            ] }) }) })
          ] })
        ]
      }
    )
  ] });
}
function buildBreakdownData(bd) {
  return [
    { name: "Foundation", value: Number(bd.foundation) },
    { name: "Structure", value: Number(bd.structure) },
    { name: "Roofing", value: Number(bd.roofing) },
    { name: "Plumbing", value: Number(bd.plumbing) },
    { name: "Electrical", value: Number(bd.electrical) },
    { name: "Flooring", value: Number(bd.flooring) },
    { name: "Finishing", value: Number(bd.finishing) }
  ].filter((d) => d.value > 0);
}
function DesignDetailPage() {
  const { id } = useParams({ strict: false });
  const designId = BigInt(id);
  const { data: design, isLoading } = useDesign(designId);
  const { savedDesignIds, optimisticSave, optimisticRemove } = useUIStore();
  const { isAuthenticated, login } = useAuth();
  const saveMutation = useSaveDesign();
  const removeMutation = useRemoveSavedDesign();
  const { data: profile } = useProfile();
  const isSaved = savedDesignIds.has(designId);
  const [upgradeOpen, setUpgradeOpen] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const { data: relatedAll } = useDesigns(
    design ? { category: design.category } : {}
  );
  const related = (relatedAll ?? []).filter((d) => d.id !== designId).slice(0, 3);
  const userTier = (profile == null ? void 0 : profile.tier) ?? "free";
  const isPremium = userTier === "premium" || userTier === "ultraPremium";
  const { setSavedDesignIds } = useUIStore();
  reactExports.useEffect(() => {
    if (profile == null ? void 0 : profile.savedDesignIds) {
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
    ue.success("Link copied to clipboard!");
  }
  function goToStagesTab() {
    setActiveTab("guide");
    setTimeout(() => {
      var _a;
      (_a = document.getElementById("construction-stages")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border h-12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-video rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
        ] })
      ] }) })
    ] });
  }
  if (!design) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-4", children: "Design not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", children: "Back to Browse" }) })
    ] });
  }
  const categoryLabel = CATEGORY_LABELS[design.category] ?? design.category;
  const freeMaterials = design.materials.slice(0, 3);
  const hasMoreMaterials = !isPremium && design.materials.length > 3;
  const constructionSteps = design.constructionSteps;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "design.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(UpgradeModal, { open: upgradeOpen, onClose: () => setUpgradeOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-[21/9] min-h-[280px] max-h-[480px] overflow-hidden bg-muted", children: [
      hasSvgPreview(design.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full", children: (() => {
        const SvgComp = DESIGN_PREVIEWS[design.id.toString()];
        return SvgComp ? /* @__PURE__ */ jsxRuntimeExports.jsx(SvgComp, { className: "w-full h-full" }) : null;
      })() }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: design.previewImageUrl || "/assets/generated/house-2bhk.dim_600x400.jpg",
          alt: design.title,
          className: "w-full h-full object-cover",
          onError: (e) => {
            e.target.src = "/assets/generated/house-2bhk.dim_600x400.jpg";
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 p-5 sm:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TierBadge, { tier: design.tier, size: "md" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs", children: categoryLabel })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-4xl font-bold text-white leading-tight", children: design.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 flex-wrap", children: [
            design.bhk && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/90 text-sm font-medium", children: [
              Number(design.bhk),
              " BHK"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/90 text-sm flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              Number(design.areaSqft).toLocaleString("en-IN"),
              " sq.ft"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PriceDisplay,
              {
                min: design.estimatedCostMin,
                max: design.estimatedCostMax,
                className: "text-white font-bold text-sm"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm",
              onClick: handleShare,
              "data-ocid": "design.share.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline ml-1.5", children: "Share" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              onClick: handleSaveToggle,
              className: isSaved ? "bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm border" : "bg-accent hover:bg-accent/90 text-accent-foreground",
              "data-ocid": "design.save_hero.button",
              children: [
                isSaved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline ml-1.5", children: isSaved ? "Saved" : "Save" })
              ]
            }
          )
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        className: "flex items-center gap-1 text-xs text-muted-foreground flex-wrap",
        "aria-label": "Breadcrumb",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "flex items-center gap-1 hover:text-foreground transition-smooth",
              "data-ocid": "design.breadcrumb.home_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-3 w-3" }),
                " Home"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/browse",
              className: "hover:text-foreground transition-smooth",
              "data-ocid": "design.breadcrumb.browse_link",
              children: "Browse"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/browse/$category",
              params: { category: design.category },
              className: "hover:text-foreground transition-smooth",
              "data-ocid": "design.breadcrumb.category_link",
              children: categoryLabel
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: design.title })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Tabs,
            {
              value: activeTab,
              onValueChange: setActiveTab,
              "data-ocid": "design.tabs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-4 w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", "data-ocid": "design.overview.tab", children: "Overview" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "floorplan", "data-ocid": "design.floorplan.tab", children: "Floor Plan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "materials", "data-ocid": "design.materials.tab", children: "Materials" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "guide", "data-ocid": "design.guide.tab", children: "Guide" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "overview", className: "mt-4 space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: design.description }),
                  constructionSteps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StageProgressStrip,
                    {
                      stages: constructionSteps,
                      isPremium,
                      onViewStages: goToStagesTab
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide", children: "Key Specifications" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
                      ...design.bhk ? [
                        {
                          label: "Bedrooms",
                          value: `${Number(design.bhk)} BHK`
                        }
                      ] : [],
                      {
                        label: "Built-up Area",
                        value: `${Number(design.areaSqft).toLocaleString("en-IN")} sq.ft`
                      },
                      { label: "Category", value: categoryLabel },
                      {
                        label: "Tier",
                        value: design.tier === DesignTier.free ? "Free" : design.tier === DesignTier.premium ? "Premium" : "Ultra Premium"
                      }
                    ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "p-3 rounded-lg bg-card border border-border",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mt-0.5", children: value })
                        ]
                      },
                      label
                    )) })
                  ] }),
                  design.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide", children: "Tags" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: design.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: tag }, tag)) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-1.5",
                        onClick: handleShare,
                        "data-ocid": "design.overview.share_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
                          " Copy Link"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-1.5",
                        onClick: handleShare,
                        "data-ocid": "design.overview.share2_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5" }),
                          " Share"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "floorplan", className: "mt-4 space-y-4", children: FLOOR_PLANS[design.id.toString()] ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-xl border border-border overflow-hidden",
                    style: { minHeight: 480 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      FloorPlanViewer,
                      {
                        userTier,
                        floorPlanData: FLOOR_PLANS[design.id.toString()]
                      }
                    )
                  }
                ) : design.floorPlanImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: design.floorPlanImageUrl,
                      alt: "Floor plan",
                      className: "w-full rounded-xl border border-border shadow-sm",
                      onError: (e) => {
                        e.target.src = "/assets/generated/house-2bhk.dim_600x400.jpg";
                      }
                    }
                  ),
                  design.bhk && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-lg bg-card border border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide", children: "Dimensions" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Area" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                          Number(design.areaSqft).toLocaleString(
                            "en-IN"
                          ),
                          " ",
                          "sq.ft"
                        ] })
                      ] }),
                      design.bhk && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Bedrooms" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: Number(design.bhk) })
                      ] })
                    ] })
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: design.floorPlanImageUrl,
                      alt: "Floor plan (blurred)",
                      className: "w-full rounded-xl blur-md opacity-50 pointer-events-none select-none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-10 w-10 text-accent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: "Upgrade to view full floor plan" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        onClick: () => setUpgradeOpen(true),
                        className: "bg-accent hover:bg-accent/90 text-accent-foreground",
                        "data-ocid": "design.floorplan.upgrade_button",
                        children: "Upgrade to Premium"
                      }
                    )
                  ] })
                ] }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center text-muted-foreground rounded-xl border border-dashed border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 mx-auto mb-3 opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "Floor plan not available" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Contact us to request a floor plan for this design." })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "materials", className: "mt-4", children: design.materials.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center text-muted-foreground rounded-xl border border-dashed border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-12 w-12 mx-auto mb-3 opacity-40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-1", children: "Material breakdown available with Premium" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      onClick: () => setUpgradeOpen(true),
                      className: "mt-2 bg-accent hover:bg-accent/90 text-accent-foreground",
                      "data-ocid": "design.materials.upgrade_button",
                      children: "Upgrade Now"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "table",
                    {
                      className: "w-full text-sm",
                      "data-ocid": "design.materials.table",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase", children: "Material" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground text-xs uppercase", children: "Qty" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground text-xs uppercase", children: "Unit" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground text-xs uppercase", children: "₹/Unit" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium text-muted-foreground text-xs uppercase", children: "Total" })
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: (isPremium ? design.materials : freeMaterials).map(
                          (mat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "tr",
                            {
                              className: "bg-card hover:bg-muted/30 transition-smooth",
                              "data-ocid": `design.materials.item.${i + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: mat.name }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground", children: mat.quantity }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground", children: mat.unit }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-muted-foreground", children: [
                                  "₹",
                                  Number(mat.costPerUnit).toLocaleString(
                                    "en-IN"
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-semibold text-foreground", children: [
                                  "₹",
                                  (mat.quantity * Number(mat.costPerUnit)).toLocaleString("en-IN")
                                ] })
                              ]
                            },
                            `${mat.name}-${i}`
                          )
                        ) }),
                        isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-primary/5 border-t border-border", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "td",
                            {
                              colSpan: 4,
                              className: "px-4 py-3 font-bold text-foreground",
                              children: "Total Material Cost"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-bold text-foreground", children: [
                            "₹",
                            design.materials.reduce(
                              (sum, m) => sum + m.quantity * Number(m.costPerUnit),
                              0
                            ).toLocaleString("en-IN")
                          ] })
                        ] }) })
                      ]
                    }
                  ) }),
                  hasMoreMaterials && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GatedOverlay,
                    {
                      onUpgrade: () => setUpgradeOpen(true),
                      label: `${design.materials.length - 3} more items — Upgrade to see full materials list`
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "guide", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ConstructionStages,
                  {
                    steps: constructionSteps,
                    isPremium,
                    onUpgrade: () => setUpgradeOpen(true),
                    id: "construction-stages"
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CostCalculatorSection, { defaultAreaSqft: Number(design.areaSqft) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-xl border border-border bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TierBadge, { tier: design.tier, size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: categoryLabel })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-4", children: design.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm mb-4", children: [
              design.bhk && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Bedrooms" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  Number(design.bhk),
                  " BHK"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Area" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  Number(design.areaSqft).toLocaleString("en-IN"),
                  " sq.ft"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: categoryLabel })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "Materials" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  design.materials.length,
                  " items"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Estimated Cost" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PriceDisplay,
              {
                min: design.estimatedCostMin,
                max: design.estimatedCostMax,
                className: "block text-2xl font-bold text-foreground mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "w-full gap-2",
              onClick: handleSaveToggle,
              variant: isSaved ? "outline" : "default",
              "data-ocid": "design.save.primary_button",
              children: isSaved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-5 w-5" }),
                " Saved to Dashboard"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "h-5 w-5" }),
                " Save Design"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "lg",
              className: "w-full gap-2",
              "data-ocid": "design.calculator.link_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/calculator", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5" }),
                " Open Calculator"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "lg",
              className: "w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground",
              "data-ocid": "design.contact.primary_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Request Custom Version" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Want changes? Our architects handle custom modifications." }),
          constructionSteps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Construction Phases" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: constructionSteps.filter((s) => s.stageName).slice(0, 5).map((stage, i) => {
              const isLocked = !isPremium && i > 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${isLocked ? "bg-muted text-muted-foreground" : "bg-accent text-accent-foreground"}`,
                        children: isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-2.5 w-2.5" }) : i + 1
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-xs flex-1 ${isLocked ? "text-muted-foreground" : "text-foreground"}`,
                        children: stage.stageName
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                      Number(stage.durationDays),
                      "d"
                    ] })
                  ]
                },
                stage.step.toString()
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "w-full mt-3 text-accent hover:bg-accent/10 text-xs gap-1",
                onClick: goToStagesTab,
                "data-ocid": "design.sidebar.view_stages_button",
                children: [
                  "View Full Guide ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border bg-muted/30 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Share this design" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1.5 w-full",
                onClick: handleShare,
                "data-ocid": "design.sidebar.share_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
                  " Copy Link"
                ]
              }
            )
          ] }),
          !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-accent/30 bg-accent/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Unlock Premium Access" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "Get full floor plans, material lists, construction guides, and advanced cost calculator." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground",
                onClick: () => setUpgradeOpen(true),
                "data-ocid": "design.sidebar.upgrade_button",
                children: "View Pricing Plans"
              }
            )
          ] })
        ] })
      ] }),
      related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14", "data-ocid": "design.related.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-bold text-foreground", children: [
            "More ",
            categoryLabel,
            " Designs"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/browse/$category",
              params: { category: design.category },
              "data-ocid": "design.related.browse_link",
              children: "View All"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: related.map((rd, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DesignCard,
          {
            design: rd,
            isSaved: savedDesignIds.has(rd.id),
            onSave: (rid) => {
              if (!isAuthenticated) {
                login();
                return;
              }
              optimisticSave(rid);
              saveMutation.mutate(rid);
            },
            onRemove: (rid) => {
              optimisticRemove(rid);
              removeMutation.mutate(rid);
            },
            index: i
          },
          rd.id.toString()
        )) })
      ] })
    ] })
  ] });
}
export {
  DesignDetailPage as default
};
