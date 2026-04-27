import { c as createLucideIcon, h as useParams, r as reactExports, u as useDesigns, b as useSaveDesign, d as useRemoveSavedDesign, j as jsxRuntimeExports, L as Link, e as Building2, a as cn } from "./index-V48KFtBG.js";
import { B as Badge } from "./badge-5Q9nPy-w.js";
import { S as Skeleton } from "./skeleton-qj2TMXnh.js";
import { C as CATEGORY_META, u as useUIStore, a as CATEGORY_LABELS, D as DesignCard } from "./uiStore-DkGVN4Cg.js";
import { E as EmptyState } from "./EmptyState-CX0BFXhP.js";
import { C as ChevronRight } from "./chevron-right-CCbKXjRX.js";
import { W as Wrench } from "./wrench-CLpHcfN7.js";
import { H as House } from "./house-DWcUGNp_.js";
import { m as motion } from "./proxy-orZgcBWg.js";
import "./PriceDisplay-CLS_qx8W.js";
import "./lock-0Drxw9ty.js";
import "./map-pin-DUowKGy8.js";
import "./vanilla-wjP-HMWV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7", key: "ztvudi" }],
  ["path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", key: "1b2hhj" }],
  ["path", { d: "M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4", key: "2ebpfo" }],
  ["path", { d: "M2 7h20", key: "1fcdvo" }],
  [
    "path",
    {
      d: "M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7",
      key: "6c3vgh"
    }
  ]
];
const Store = createLucideIcon("store", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20", key: "she1j9" }],
  ["path", { d: "M16 18h-5", key: "bq60fd" }],
  ["path", { d: "M18 5a1 1 0 0 0-1 1v5.573", key: "1kv8ia" }],
  ["path", { d: "M3 4h8.129a1 1 0 0 1 .99.863L13 11.246", key: "1q1ert" }],
  ["path", { d: "M4 11V4", key: "9ft8pt" }],
  ["path", { d: "M7 15h.01", key: "k5ht0j" }],
  ["path", { d: "M8 10.1V4", key: "1jgyzo" }],
  ["circle", { cx: "18", cy: "18", r: "2", key: "1emm8v" }],
  ["circle", { cx: "7", cy: "15", r: "5", key: "ddtuc" }]
];
const Tractor = createLucideIcon("tractor", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11", key: "pb2vm6" }],
  [
    "path",
    {
      d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z",
      key: "doq5xv"
    }
  ],
  ["path", { d: "M6 13h12", key: "yf64js" }],
  ["path", { d: "M6 17h12", key: "1jwigz" }]
];
const Warehouse = createLucideIcon("warehouse", __iconNode);
const CATEGORY_ICONS = {
  residential: House,
  apartments: Building2,
  dairyFarms: Tractor,
  smallBusiness: Store,
  custom: Wrench
};
const BHK_FILTERS = ["1BHK", "2BHK", "3BHK", "Villa"];
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-card overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/3] w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-md" })
      ] })
    ] })
  ] });
}
function CategoryPage() {
  const { category } = useParams({ strict: false });
  const [bhkFilter, setBhkFilter] = reactExports.useState("");
  const catEnum = category;
  const catMeta = CATEGORY_META.find((c) => c.id === catEnum);
  const catLabel = CATEGORY_LABELS[category] ?? category;
  const IconComponent = CATEGORY_ICONS[category] ?? Building2;
  const { data: designs = [], isLoading } = useDesigns({ category: catEnum });
  const { savedDesignIds, optimisticSave, optimisticRemove } = useUIStore();
  const saveMutation = useSaveDesign();
  const removeMutation = useRemoveSavedDesign();
  const filtered = designs.filter((d) => {
    if (!bhkFilter) return true;
    if (bhkFilter === "Villa")
      return d.tags.some((t) => t.toLowerCase().includes("villa"));
    const bhkNum = Number(bhkFilter.replace("BHK", ""));
    return d.bhk ? Number(d.bhk) === bhkNum : false;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card border-b border-border overflow-hidden", children: [
      catMeta && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center opacity-[0.07]",
          style: { backgroundImage: `url(${catMeta.image})` },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "nav",
          {
            className: "flex items-center gap-1.5 text-sm text-muted-foreground mb-6",
            "aria-label": "Breadcrumb",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/",
                  className: "hover:text-foreground transition-smooth",
                  "data-ocid": "category.home_link",
                  children: "Home"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/browse",
                  className: "hover:text-foreground transition-smooth",
                  "data-ocid": "category.browse_link",
                  children: "Browse"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: catLabel })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: [
              catLabel,
              " Designs"
            ] }),
            catMeta && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl", children: catMeta.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                isLoading ? "…" : designs.length,
                " Designs Available"
              ] }),
              catMeta && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs text-accent border-accent/40 bg-accent/5",
                  children: catMeta.count
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }),
    category === "residential" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground mr-1", children: "Filter by:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setBhkFilter(""),
          "data-ocid": "category.bhk_filter.all",
          className: cn(
            "px-3 py-1 rounded-full text-xs font-medium border transition-smooth",
            !bhkFilter ? "bg-accent text-accent-foreground border-accent" : "bg-background text-foreground border-border hover:border-accent hover:text-accent"
          ),
          children: "All Types"
        }
      ),
      BHK_FILTERS.map((bhk) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setBhkFilter(bhkFilter === bhk ? "" : bhk),
          "data-ocid": `category.bhk_filter.${bhk.toLowerCase()}`,
          className: cn(
            "px-3 py-1 rounded-full text-xs font-medium border transition-smooth",
            bhkFilter === bhk ? "bg-accent text-accent-foreground border-accent" : "bg-background text-foreground border-border hover:border-accent hover:text-accent"
          ),
          children: bhk
        },
        bhk
      ))
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      !isLoading && designs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
        "Showing",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: filtered.length }),
        bhkFilter ? ` ${bhkFilter}` : "",
        " design",
        filtered.length !== 1 ? "s" : "",
        " in",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: catLabel })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "category.loading_state",
          children: Array.from({ length: 6 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)
          ))
        }
      ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Warehouse, { className: "h-8 w-8" }),
          title: bhkFilter ? `No ${bhkFilter} designs found` : `No ${catLabel} designs yet`,
          description: bhkFilter ? `Try a different type filter or browse all ${catLabel} designs.` : "We're adding new designs regularly. Check back soon or explore other categories.",
          actionLabel: bhkFilter ? "Show All Types" : "Browse All Designs",
          onAction: () => {
            if (bhkFilter) setBhkFilter("");
          }
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          initial: "hidden",
          animate: "visible",
          variants: {
            visible: { transition: { staggerChildren: 0.06 } },
            hidden: {}
          },
          children: filtered.map((design, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              variants: {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              },
              transition: { duration: 0.35, ease: "easeOut" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                DesignCard,
                {
                  design,
                  index,
                  isSaved: savedDesignIds.has(design.id),
                  onSave: (id) => {
                    optimisticSave(id);
                    saveMutation.mutate(id);
                  },
                  onRemove: (id) => {
                    optimisticRemove(id);
                    removeMutation.mutate(id);
                  }
                }
              )
            },
            design.id.toString()
          ))
        }
      )
    ] })
  ] });
}
export {
  CategoryPage as default
};
