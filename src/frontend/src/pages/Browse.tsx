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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import type { DesignCategory, DesignTier } from "../backend.d.ts";
import { DesignCard } from "../components/DesignCard";
import { EmptyState } from "../components/EmptyState";
import {
  useDesigns,
  useRemoveSavedDesign,
  useSaveDesign,
  useSavedDesigns,
} from "../hooks/useDesigns";
import { useUIStore } from "../store/uiStore";
import { CATEGORY_LABELS, TIER_LABELS } from "../types";

type SortOption = "newest" | "price-asc" | "price-desc" | "area-asc";

const BUDGET_MIN_LAC = 10;
const BUDGET_MAX_LAC = 500;
const AREA_MIN = 500;
const AREA_MAX = 10000;

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <div className="flex justify-between pt-2 border-t border-border mt-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  const [searchRaw, setSearchRaw] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [selectedCategory, setSelectedCategory] = useState<DesignCategory | "">(
    "",
  );
  const [selectedTier, setSelectedTier] = useState<DesignTier | "">("");
  const [budgetMax, setBudgetMax] = useState(BUDGET_MAX_LAC);
  const [areaMax, setAreaMax] = useState(AREA_MAX);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = useCallback((val: string) => {
    setSearchRaw(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(val), 300);
  }, []);

  const { data: designs = [], isLoading } = useDesigns({
    category: selectedCategory || undefined,
    tier: selectedTier || undefined,
  });

  const { data: savedDesigns = [] } = useSavedDesigns();
  const { savedDesignIds, optimisticSave, optimisticRemove } = useUIStore();
  const saveMutation = useSaveDesign();
  const removeMutation = useRemoveSavedDesign();

  const savedIds = useMemo(
    () =>
      new Set([
        ...Array.from(savedDesignIds),
        ...savedDesigns.map((d) => d.id),
      ]),
    [savedDesignIds, savedDesigns],
  );

  const filtered = useMemo(() => {
    let result = [...designs];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    const budgetMaxBigint = BigInt(budgetMax) * BigInt(100000);
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

  const hasActiveFilters =
    !!selectedCategory ||
    !!selectedTier ||
    budgetMax < BUDGET_MAX_LAC ||
    areaMax < AREA_MAX;

  function clearFilters() {
    setSelectedCategory("");
    setSelectedTier("");
    setBudgetMax(BUDGET_MAX_LAC);
    setAreaMax(AREA_MAX);
  }

  function formatBudget(lac: number) {
    if (lac >= 100) {
      const cr = lac / 100;
      return `₹${Number.isInteger(cr) ? cr : cr.toFixed(1)}Cr`;
    }
    return `₹${lac}L`;
  }

  const FilterPanel = (
    <div className="space-y-6">
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Category
        </Label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CATEGORY_LABELS).map(([id, label]) => (
            <button
              key={id}
              type="button"
              data-ocid={`browse.category_filter.${id}`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === id ? "" : (id as DesignCategory),
                )
              }
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth",
                selectedCategory === id
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-background text-foreground border-border hover:border-accent hover:text-accent",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Access Tier
        </Label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(TIER_LABELS).map(([id, label]) => (
            <button
              key={id}
              type="button"
              data-ocid={`browse.tier_filter.${id}`}
              onClick={() =>
                setSelectedTier(selectedTier === id ? "" : (id as DesignTier))
              }
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth",
                selectedTier === id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary hover:text-primary",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Max Budget
          </Label>
          <span className="text-sm font-semibold text-foreground">
            {formatBudget(budgetMax)}
          </span>
        </div>
        <input
          type="range"
          min={BUDGET_MIN_LAC}
          max={BUDGET_MAX_LAC}
          step={10}
          value={budgetMax}
          data-ocid="browse.budget_slider"
          onChange={(e) => setBudgetMax(Number(e.target.value))}
          className="w-full accent-accent cursor-pointer h-1.5"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
          <span>₹10L</span>
          <span>₹5Cr</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Max Area
          </Label>
          <span className="text-sm font-semibold text-foreground">
            {areaMax.toLocaleString("en-IN")} sq.ft
          </span>
        </div>
        <input
          type="range"
          min={AREA_MIN}
          max={AREA_MAX}
          step={500}
          value={areaMax}
          data-ocid="browse.area_slider"
          onChange={(e) => setAreaMax(Number(e.target.value))}
          className="w-full accent-accent cursor-pointer h-1.5"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
          <span>500 sq.ft</span>
          <span>10,000 sq.ft</span>
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          data-ocid="browse.clear_filters_button"
          onClick={clearFilters}
          className="w-full gap-2 border-destructive text-destructive hover:bg-destructive/10"
        >
          <X className="h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Browse Designs
              </h1>
              <p className="text-muted-foreground mt-1">
                {isLoading
                  ? "Loading designs…"
                  : `${filtered.length} design${filtered.length !== 1 ? "s" : ""} found`}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search by title or tag…"
                  value={searchRaw}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  data-ocid="browse.search_input"
                  className="pl-10 bg-background"
                />
              </div>
              <Select
                value={sort}
                onValueChange={(v) => setSort(v as SortOption)}
              >
                <SelectTrigger
                  data-ocid="browse.sort_select"
                  className="w-44 shrink-0 bg-background"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="area-asc">Area: Small to Large</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden shrink-0"
                data-ocid="browse.filter_toggle_button"
                onClick={() => setShowMobileFilters((p) => !p)}
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  {CATEGORY_LABELS[selectedCategory]}
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("")}
                    className="ml-1 hover:text-destructive transition-smooth"
                    aria-label="Remove category filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedTier && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  {TIER_LABELS[selectedTier]}
                  <button
                    type="button"
                    onClick={() => setSelectedTier("")}
                    className="ml-1 hover:text-destructive transition-smooth"
                    aria-label="Remove tier filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {budgetMax < BUDGET_MAX_LAC && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  Budget ≤ {formatBudget(budgetMax)}
                  <button
                    type="button"
                    onClick={() => setBudgetMax(BUDGET_MAX_LAC)}
                    className="ml-1 hover:text-destructive transition-smooth"
                    aria-label="Remove budget filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {areaMax < AREA_MAX && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  Area ≤ {areaMax.toLocaleString("en-IN")} sq.ft
                  <button
                    type="button"
                    onClick={() => setAreaMax(AREA_MAX)}
                    className="ml-1 hover:text-destructive transition-smooth"
                    aria-label="Remove area filter"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Panel */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-card border-b border-border shadow-md"
            data-ocid="browse.mobile_filters_panel"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  data-ocid="browse.close_filters_button"
                  className="rounded-full p-1.5 hover:bg-muted transition-smooth"
                  aria-label="Close filters"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {FilterPanel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside
            className="hidden md:block w-64 shrink-0"
            data-ocid="browse.filters_panel"
          >
            <div className="sticky top-24 bg-card rounded-xl border border-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">
                  Filters
                </h2>
              </div>
              {FilterPanel}
            </div>
          </aside>

          {/* Design Grid */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                data-ocid="browse.loading_state"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<Search className="h-8 w-8" />}
                title="No designs found"
                description="Try adjusting your filters or search terms to find what you're looking for."
                actionLabel="Clear Filters"
                onAction={clearFilters}
              />
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06 } },
                  hidden: {},
                }}
              >
                {filtered.map((design, index) => (
                  <motion.div
                    key={design.id.toString()}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <DesignCard
                      design={design}
                      index={index}
                      isSaved={savedIds.has(design.id)}
                      onSave={(id) => {
                        optimisticSave(id);
                        saveMutation.mutate(id);
                      }}
                      onRemove={(id) => {
                        optimisticRemove(id);
                        removeMutation.mutate(id);
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
