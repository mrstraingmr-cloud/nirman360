import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import {
  Building2,
  ChevronRight,
  Home,
  Store,
  Tractor,
  Warehouse,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { DesignCategory } from "../backend.d.ts";
import { DesignCard } from "../components/DesignCard";
import { EmptyState } from "../components/EmptyState";
import {
  useDesigns,
  useRemoveSavedDesign,
  useSaveDesign,
} from "../hooks/useDesigns";
import { useUIStore } from "../store/uiStore";
import { CATEGORY_LABELS, CATEGORY_META } from "../types";

const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  residential: Home,
  apartments: Building2,
  dairyFarms: Tractor,
  smallBusiness: Store,
  custom: Wrench,
};

const BHK_FILTERS = ["1BHK", "2BHK", "3BHK", "Villa"];

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
        <div className="flex justify-between pt-2 border-t border-border">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  const { category } = useParams({ strict: false }) as { category: string };
  const [bhkFilter, setBhkFilter] = useState<string>("");

  const catEnum = category as DesignCategory;
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

  return (
    <div className="min-h-screen bg-background">
      {/* Category Hero */}
      <div className="relative bg-card border-b border-border overflow-hidden">
        {catMeta && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
            style={{ backgroundImage: `url(${catMeta.image})` }}
            aria-hidden="true"
          />
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-foreground transition-smooth"
              data-ocid="category.home_link"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link
              to="/browse"
              className="hover:text-foreground transition-smooth"
              data-ocid="category.browse_link"
            >
              Browse
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-foreground font-medium">{catLabel}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <IconComponent className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                {catLabel} Designs
              </h1>
              {catMeta && (
                <p className="text-muted-foreground max-w-xl">
                  {catMeta.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-3">
                <Badge variant="secondary" className="text-xs">
                  {isLoading ? "…" : designs.length} Designs Available
                </Badge>
                {catMeta && (
                  <Badge
                    variant="outline"
                    className="text-xs text-accent border-accent/40 bg-accent/5"
                  >
                    {catMeta.count}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-filters for residential */}
      {category === "residential" && (
        <div className="bg-muted/40 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-muted-foreground mr-1">
                Filter by:
              </span>
              <button
                type="button"
                onClick={() => setBhkFilter("")}
                data-ocid="category.bhk_filter.all"
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border transition-smooth",
                  !bhkFilter
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-background text-foreground border-border hover:border-accent hover:text-accent",
                )}
              >
                All Types
              </button>
              {BHK_FILTERS.map((bhk) => (
                <button
                  key={bhk}
                  type="button"
                  onClick={() => setBhkFilter(bhkFilter === bhk ? "" : bhk)}
                  data-ocid={`category.bhk_filter.${bhk.toLowerCase()}`}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border transition-smooth",
                    bhkFilter === bhk
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-background text-foreground border-border hover:border-accent hover:text-accent",
                  )}
                >
                  {bhk}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results count */}
        {!isLoading && designs.length > 0 && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filtered.length}
            </span>
            {bhkFilter ? ` ${bhkFilter}` : ""} design
            {filtered.length !== 1 ? "s" : ""} in{" "}
            <span className="font-medium text-foreground">{catLabel}</span>
          </p>
        )}

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="category.loading_state"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholder
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Warehouse className="h-8 w-8" />}
            title={
              bhkFilter
                ? `No ${bhkFilter} designs found`
                : `No ${catLabel} designs yet`
            }
            description={
              bhkFilter
                ? `Try a different type filter or browse all ${catLabel} designs.`
                : "We're adding new designs regularly. Check back soon or explore other categories."
            }
            actionLabel={bhkFilter ? "Show All Types" : "Browse All Designs"}
            onAction={() => {
              if (bhkFilter) setBhkFilter("");
            }}
          />
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                  isSaved={savedDesignIds.has(design.id)}
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
      </div>
    </div>
  );
}
