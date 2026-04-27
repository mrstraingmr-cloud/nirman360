import type { BuilderInput, BuilderResult } from "@/types/builder";
import {
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Droplets,
  Shield,
  Square,
  Wind,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "col-spacing",
    title: "Column Spacing & Grid",
    description:
      "For a 30×50 ft plot, maintain 4m × 4m column grid (9 columns per floor). Column size: 230×300mm at ground, 230×230mm at upper floors. Beam depth: D = L/12 = 330mm for 4m span.",
    category: "Structural Load Analysis",
  },
  {
    id: "beam-depth",
    title: "Beam Sizing",
    description:
      "Primary beams: 230×400mm (span ≤ 5m). Secondary beams: 230×300mm. Cantilever beams for balcony (≤ 1.5m): 230×300mm with top rebar continuous into main beam.",
    category: "Structural Load Analysis",
  },
  {
    id: "seismic-tie",
    title: "Seismic Tie-Beams",
    description:
      "Provide plinth tie-beams (200×300mm) connecting all footings. Use Fe-500D rebar grade throughout. Lap length = 50d; stagger splices in columns at mid-height.",
    category: "Seismic Safety",
  },
  {
    id: "seismic-ductile",
    title: "Ductile Detailing",
    description:
      "Column ties: 8mm @ 100mm c/c in confinement zones (L/6 from joint). Beam stirrups: 8mm @ 150mm mid-span, 100mm near supports. Use closed stirrups with 135° hooks.",
    category: "Seismic Safety",
  },
  {
    id: "wind-roof",
    title: "Roof Anchor Details",
    description:
      "Anchor flat roof slab to parapet with 200mm R.C.C. parapet and 10mm dia. anchor rods @ 600mm c/c. For G+2 and above: design roof beams for 1.2 kN/m² wind uplift.",
    category: "Wind Load Resistance",
  },
  {
    id: "wind-parapet",
    title: "Parapet Height & Coping",
    description:
      "Parapet height minimum 900mm (IS 875). Top coping with 1:3 cement-sand mortar, trowel finish, slight outward slope for drainage. Expansion joint every 6m in parapet.",
    category: "Wind Load Resistance",
  },
  {
    id: "drain-foundation",
    title: "Foundation Waterproofing",
    description:
      "Apply bituminous tanking coat (2 layers) to external foundation walls. Provide weep holes (50mm dia.) @ 1.5m c/c at plinth level. French drain with perforated pipe around perimeter.",
    category: "Drainage & Waterproofing",
  },
  {
    id: "drain-terrace",
    title: "Terrace Waterproofing System",
    description:
      "4-layer system: (1) Structural slab, (2) Screed 1:4 with slope 1:80, (3) APP membrane 4mm self-adhesive, (4) 50mm brick bat coba + cement finish. Overflow pipe at 50mm above finish.",
    category: "Drainage & Waterproofing",
  },
  {
    id: "elec-circuits",
    title: "Circuit Count & Load",
    description:
      "Recommended 8 circuits for 1500 sqft: Lighting ×3 (5A each), Power sockets ×3 (15A), Kitchen ×1 (20A), AC ×1 (20A). Total connected load: ~12 kW. Sanctioned load: 8 kW.",
    category: "Electrical Safety",
  },
  {
    id: "elec-protection",
    title: "ELCB / RCCB & MCBs",
    description:
      "Install 1× 63A RCCB (30mA) at main incomer. Individual MCBs per circuit: 6A for lighting, 16A for power, 20A for AC and kitchen. Earth conductor: 4 sq mm copper to all metal frames.",
    category: "Electrical Safety",
  },
];

const CATEGORIES = [...new Set(RECOMMENDATIONS.map((r) => r.category))];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Structural Load Analysis": <Shield className="w-4 h-4 text-primary" />,
  "Seismic Safety": <Shield className="w-4 h-4 text-destructive" />,
  "Wind Load Resistance": <Wind className="w-4 h-4 text-primary" />,
  "Drainage & Waterproofing": <Droplets className="w-4 h-4 text-blue-500" />,
  "Electrical Safety": <Zap className="w-4 h-4 text-accent" />,
};

interface Props {
  result?: BuilderResult;
  input?: BuilderInput;
}

export function ExpertMode({ result: _result, input: _input }: Props) {
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set([CATEGORIES[0]]),
  );

  function toggleApply(id: string) {
    setApplied((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleCategory(cat: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const total = RECOMMENDATIONS.length;
  const done = applied.size;
  const pct = Math.round((done / total) * 100);

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-card rounded-xl border border-border"
      data-ocid="expert_mode.panel"
    >
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-accent" />
        <h3 className="font-display text-base font-semibold text-foreground">
          Expert Mode
        </h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {done}/{total} applied
        </span>
      </div>

      {/* Summary bar */}
      <div data-ocid="expert_mode.progress">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Recommendations applied</span>
          <span className="font-mono text-accent">{pct}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: [0.3, 0, 0.4, 1] }}
          />
        </div>
      </div>

      {/* Accordions */}
      <div className="flex flex-col gap-2">
        {CATEGORIES.map((cat) => {
          const items = RECOMMENDATIONS.filter((r) => r.category === cat);
          const open = openCategories.has(cat);
          const catDone = items.filter((r) => applied.has(r.id)).length;
          const catKey = cat
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "_")
            .slice(0, 24);

          return (
            <div
              key={cat}
              className="rounded-lg border border-border overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-muted/20 hover:bg-muted/40 transition-smooth text-left"
                data-ocid={`expert_mode.accordion_${catKey}`}
              >
                <div className="flex items-center gap-2">
                  {CATEGORY_ICONS[cat]}
                  <span className="text-sm font-medium text-foreground">
                    {cat}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {catDone}/{items.length}
                  </span>
                  {open ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.3, 0, 0.4, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="divide-y divide-border">
                      {items.map((rec, idx) => {
                        const isApplied = applied.has(rec.id);
                        return (
                          <div
                            key={rec.id}
                            className={`p-3 flex gap-3 transition-all duration-200 ${isApplied ? "bg-green-500/5" : "bg-card"}`}
                            data-ocid={`expert_mode.recommendation.${idx + 1}`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleApply(rec.id)}
                              className="flex-shrink-0 mt-0.5 text-muted-foreground hover:text-foreground transition-smooth"
                              aria-label={
                                isApplied
                                  ? "Unapply recommendation"
                                  : "Apply recommendation"
                              }
                              data-ocid={`expert_mode.apply_checkbox.${rec.id}`}
                            >
                              {isApplied ? (
                                <CheckSquare className="w-4 h-4 text-green-500" />
                              ) : (
                                <Square className="w-4 h-4" />
                              )}
                            </button>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <p
                                  className={`text-sm font-medium ${isApplied ? "text-green-600" : "text-foreground"}`}
                                >
                                  {rec.title}
                                </p>
                                {isApplied && (
                                  <span className="text-[10px] text-green-600 font-medium">
                                    ✓ Applied
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                                {rec.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
