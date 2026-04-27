import { c as createLucideIcon, r as reactExports, u as useDesigns, g as useSavedDesigns, b as useSaveDesign, d as useRemoveSavedDesign, j as jsxRuntimeExports, a as cn, B as Button, X } from "./index-V48KFtBG.js";
import { B as Badge } from "./badge-5Q9nPy-w.js";
import { L as Label, I as Input } from "./label-DNIdGCOI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DuT0em1b.js";
import { S as Skeleton } from "./skeleton-qj2TMXnh.js";
import { u as useUIStore, a as CATEGORY_LABELS, T as TIER_LABELS, D as DesignCard } from "./uiStore-DkGVN4Cg.js";
import { E as EmptyState } from "./EmptyState-CX0BFXhP.js";
import { S as Search } from "./search-DQYJQhhL.js";
import { A as AnimatePresence } from "./index-B2YvVA8b.js";
import { m as motion } from "./proxy-orZgcBWg.js";
import "./index-CF2_vi6k.js";
import "./index-D2OthdYx.js";
import "./check-BM8icY0u.js";
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
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const BUDGET_MIN_LAC = 10;
const BUDGET_MAX_LAC = 500;
const AREA_MIN = 500;
const AREA_MAX = 1e4;
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2 border-t border-border mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-md" })
      ] })
    ] })
  ] });
}
function BrowsePage() {
  const [searchRaw, setSearchRaw] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("newest");
  const [selectedCategory, setSelectedCategory] = reactExports.useState(
    ""
  );
  const [selectedTier, setSelectedTier] = reactExports.useState("");
  const [budgetMax, setBudgetMax] = reactExports.useState(BUDGET_MAX_LAC);
  const [areaMax, setAreaMax] = reactExports.useState(AREA_MAX);
  const [showMobileFilters, setShowMobileFilters] = reactExports.useState(false);
  const debounceRef = reactExports.useRef(null);
  const handleSearchChange = reactExports.useCallback((val) => {
    setSearchRaw(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(val), 300);
  }, []);
  const { data: designs = [], isLoading } = useDesigns({
    category: selectedCategory || void 0,
    tier: selectedTier || void 0
  });
  const { data: savedDesigns = [] } = useSavedDesigns();
  const { savedDesignIds, optimisticSave, optimisticRemove } = useUIStore();
  const saveMutation = useSaveDesign();
  const removeMutation = useRemoveSavedDesign();
  const savedIds = reactExports.useMemo(
    () => /* @__PURE__ */ new Set([
      ...Array.from(savedDesignIds),
      ...savedDesigns.map((d) => d.id)
    ]),
    [savedDesignIds, savedDesigns]
  );
  const filtered = reactExports.useMemo(() => {
    let result = [...designs];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) => d.title.toLowerCase().includes(q) || d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    const budgetMaxBigint = BigInt(budgetMax) * BigInt(1e5);
    result = result.filter((d) => d.estimatedCostMin <= budgetMaxBigint);
    result = result.filter((d) => Number(d.areaSqft) <= areaMax);
    if (sort === "price-asc")
      result.sort((a, b) => Number(a.estimatedCostMin - b.estimatedCostMin));
    else if (sort === "price-desc")
      result.sort((a, b) => Number(b.estimatedCostMin - a.estimatedCostMin));
    else if (sort === "area-asc")
      result.sort((a, b) => Number(a.areaSqft - b.areaSqft));
    else result.sort((a, b) => Number(b.createdAt - a.createdAt));
    return result;
  }, [designs, search, sort, budgetMax, areaMax]);
  const hasActiveFilters = !!selectedCategory || !!selectedTier || budgetMax < BUDGET_MAX_LAC || areaMax < AREA_MAX;
  function clearFilters() {
    setSelectedCategory("");
    setSelectedTier("");
    setBudgetMax(BUDGET_MAX_LAC);
    setAreaMax(AREA_MAX);
  }
  function formatBudget(lac) {
    if (lac >= 100) {
      const cr = lac / 100;
      return `₹${Number.isInteger(cr) ? cr : cr.toFixed(1)}Cr`;
    }
    return `₹${lac}L`;
  }
  const FilterPanel = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block", children: "Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: Object.entries(CATEGORY_LABELS).map(([id, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `browse.category_filter.${id}`,
          onClick: () => setSelectedCategory(
            selectedCategory === id ? "" : id
          ),
          className: cn(
            "px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth",
            selectedCategory === id ? "bg-accent text-accent-foreground border-accent" : "bg-background text-foreground border-border hover:border-accent hover:text-accent"
          ),
          children: label
        },
        id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block", children: "Access Tier" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: Object.entries(TIER_LABELS).map(([id, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `browse.tier_filter.${id}`,
          onClick: () => setSelectedTier(selectedTier === id ? "" : id),
          className: cn(
            "px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth",
            selectedTier === id ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary hover:text-primary"
          ),
          children: label
        },
        id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Max Budget" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: formatBudget(budgetMax) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: BUDGET_MIN_LAC,
          max: BUDGET_MAX_LAC,
          step: 10,
          value: budgetMax,
          "data-ocid": "browse.budget_slider",
          onChange: (e) => setBudgetMax(Number(e.target.value)),
          className: "w-full accent-accent cursor-pointer h-1.5"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹10L" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "₹5Cr" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Max Area" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
          areaMax.toLocaleString("en-IN"),
          " sq.ft"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: AREA_MIN,
          max: AREA_MAX,
          step: 500,
          value: areaMax,
          "data-ocid": "browse.area_slider",
          onChange: (e) => setAreaMax(Number(e.target.value)),
          className: "w-full accent-accent cursor-pointer h-1.5"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "500 sq.ft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "10,000 sq.ft" })
      ] })
    ] }),
    hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        "data-ocid": "browse.clear_filters_button",
        onClick: clearFilters,
        className: "w-full gap-2 border-destructive text-destructive hover:bg-destructive/10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          "Clear All Filters"
        ]
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground", children: "Browse Designs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: isLoading ? "Loading designs…" : `${filtered.length} design${filtered.length !== 1 ? "s" : ""} found` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full md:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 md:w-72", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "search",
                placeholder: "Search by title or tag…",
                value: searchRaw,
                onChange: (e) => handleSearchChange(e.target.value),
                "data-ocid": "browse.search_input",
                className: "pl-10 bg-background"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: sort,
              onValueChange: (v) => setSort(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    "data-ocid": "browse.sort_select",
                    className: "w-44 shrink-0 bg-background",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort by" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: "Newest First" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-asc", children: "Price: Low to High" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "price-desc", children: "Price: High to Low" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "area-asc", children: "Area: Small to Large" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "md:hidden shrink-0",
              "data-ocid": "browse.filter_toggle_button",
              onClick: () => setShowMobileFilters((p) => !p),
              "aria-label": "Toggle filters",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-4", children: [
        selectedCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 pr-1", children: [
          CATEGORY_LABELS[selectedCategory],
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedCategory(""),
              className: "ml-1 hover:text-destructive transition-smooth",
              "aria-label": "Remove category filter",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }),
        selectedTier && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 pr-1", children: [
          TIER_LABELS[selectedTier],
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedTier(""),
              className: "ml-1 hover:text-destructive transition-smooth",
              "aria-label": "Remove tier filter",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }),
        budgetMax < BUDGET_MAX_LAC && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 pr-1", children: [
          "Budget ≤ ",
          formatBudget(budgetMax),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setBudgetMax(BUDGET_MAX_LAC),
              className: "ml-1 hover:text-destructive transition-smooth",
              "aria-label": "Remove budget filter",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }),
        areaMax < AREA_MAX && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 pr-1", children: [
          "Area ≤ ",
          areaMax.toLocaleString("en-IN"),
          " sq.ft",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setAreaMax(AREA_MAX),
              className: "ml-1 hover:text-destructive transition-smooth",
              "aria-label": "Remove area filter",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showMobileFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        className: "md:hidden overflow-hidden bg-card border-b border-border shadow-md",
        "data-ocid": "browse.mobile_filters_panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" }),
              "Filters"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowMobileFilters(false),
                "data-ocid": "browse.close_filters_button",
                className: "rounded-full p-1.5 hover:bg-muted transition-smooth",
                "aria-label": "Close filters",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          FilterPanel
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "aside",
        {
          className: "hidden md:block w-64 shrink-0",
          "data-ocid": "browse.filters_panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 bg-card rounded-xl border border-border p-5 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Filters" })
            ] }),
            FilterPanel
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 min-w-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6",
          "data-ocid": "browse.loading_state",
          children: Array.from({ length: 6 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
            /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)
          ))
        }
      ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-8 w-8" }),
          title: "No designs found",
          description: "Try adjusting your filters or search terms to find what you're looking for.",
          actionLabel: "Clear Filters",
          onAction: clearFilters
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6",
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
                  isSaved: savedIds.has(design.id),
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
      ) })
    ] }) })
  ] });
}
export {
  BrowsePage as default
};
