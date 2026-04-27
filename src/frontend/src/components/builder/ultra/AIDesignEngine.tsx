import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BuilderInput } from "@/types/builder";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface DesignVariation {
  id: string;
  name: string;
  sqft: number;
  style: string;
  floors: number;
  foundation: string;
  costMin: string;
  costMax: string;
  highlights: string[];
}

const VARIATIONS_BY_STYLE: Record<string, DesignVariation[]> = {
  Modern: [
    {
      id: "mod-1",
      name: "Modern Minimalist Villa",
      sqft: 2200,
      style: "Modern",
      floors: 2,
      foundation: "Raft",
      costMin: "₹48L",
      costMax: "₹58L",
      highlights: [
        "Flat roof with terrace garden",
        "Floor-to-ceiling glass windows",
        "Open-plan living + dining",
      ],
    },
    {
      id: "mod-2",
      name: "Contemporary Urban Home",
      sqft: 1800,
      style: "Modern",
      floors: 2,
      foundation: "Strip",
      costMin: "₹38L",
      costMax: "₹46L",
      highlights: [
        "Box-form facade with deep overhangs",
        "Integrated parking on ground floor",
        "Modular kitchen + island",
      ],
    },
    {
      id: "mod-3",
      name: "Premium Glass Residence",
      sqft: 3000,
      style: "Modern",
      floors: 3,
      foundation: "Pile",
      costMin: "₹72L",
      costMax: "₹90L",
      highlights: [
        "Double-height entrance lobby",
        "Sky bridge connecting wings",
        "Rooftop infinity pool zone",
      ],
    },
  ],
  Contemporary: [
    {
      id: "con-1",
      name: "Contemporary Family Home",
      sqft: 2000,
      style: "Contemporary",
      floors: 2,
      foundation: "Strip",
      costMin: "₹42L",
      costMax: "₹52L",
      highlights: [
        "Mixed material facade (brick + plaster)",
        "Large south-facing windows",
        "Family lounge on first floor",
      ],
    },
    {
      id: "con-2",
      name: "Contemporary Courtyard House",
      sqft: 2400,
      style: "Contemporary",
      floors: 2,
      foundation: "Raft",
      costMin: "₹55L",
      costMax: "₹68L",
      highlights: [
        "Central open courtyard for ventilation",
        "Wraparound balcony on first floor",
        "Exposed concrete + wood accents",
      ],
    },
    {
      id: "con-3",
      name: "Split-Level Smart Home",
      sqft: 2600,
      style: "Contemporary",
      floors: 3,
      foundation: "Pile",
      costMin: "₹65L",
      costMax: "₹80L",
      highlights: [
        "Smart home automation ready",
        "Split-level living for privacy",
        "Solar panel-ready roof structure",
      ],
    },
  ],
  Traditional: [
    {
      id: "tra-1",
      name: "Classic Kerala Nalukettu",
      sqft: 2800,
      style: "Traditional",
      floors: 2,
      foundation: "Isolated",
      costMin: "₹60L",
      costMax: "₹75L",
      highlights: [
        "Sloped tiled roof with carved eaves",
        "Wooden columns and lattice screens",
        "Inner courtyard with Tulsi planter",
      ],
    },
    {
      id: "tra-2",
      name: "Rajasthani Haveli-Inspired",
      sqft: 3200,
      style: "Traditional",
      floors: 2,
      foundation: "Strip",
      costMin: "₹70L",
      costMax: "₹88L",
      highlights: [
        "Arched doorways and jaali work",
        "Sandstone-look textured exterior",
        "Rooftop chhatri for ventilation",
      ],
    },
    {
      id: "tra-3",
      name: "South Indian Bungalow",
      sqft: 2200,
      style: "Traditional",
      floors: 1,
      foundation: "Isolated",
      costMin: "₹44L",
      costMax: "₹55L",
      highlights: [
        "Extended verandah with columns",
        "Vastu-compliant room orientation",
        "Red oxide flooring in living areas",
      ],
    },
  ],
  "Indo-Mediterranean": [
    {
      id: "ind-1",
      name: "Mediterranean Luxury Villa",
      sqft: 3500,
      style: "Indo-Mediterranean",
      floors: 2,
      foundation: "Raft",
      costMin: "₹88L",
      costMax: "₹1.1Cr",
      highlights: [
        "Arched windows and terracotta roof tiles",
        "Colonnade porch and garden courtyard",
        "Mosaic tile accents and stone cladding",
      ],
    },
    {
      id: "ind-2",
      name: "Premium Residential Complex",
      sqft: 4200,
      style: "Indo-Mediterranean",
      floors: 3,
      foundation: "Pile",
      costMin: "₹1.1Cr",
      costMax: "₹1.4Cr",
      highlights: [
        "Stucco exterior with warm earth tones",
        "Double-height colonnade entry",
        "Pool terrace + outdoor dining zone",
      ],
    },
    {
      id: "ind-3",
      name: "Coastal Indo-Modern Home",
      sqft: 2800,
      style: "Indo-Mediterranean",
      floors: 2,
      foundation: "Raft",
      costMin: "₹72L",
      costMax: "₹92L",
      highlights: [
        "Sea-facing orientation with wide balcony",
        "Anti-corrosion SS railing and fittings",
        "Natural stone + whitewash exterior",
      ],
    },
  ],
};

interface Props {
  onDesignSelect: (designId: string) => void;
  currentInput?: BuilderInput;
}

type StyleKey =
  | "Modern"
  | "Contemporary"
  | "Traditional"
  | "Indo-Mediterranean";
const STYLE_OPTIONS: StyleKey[] = [
  "Modern",
  "Contemporary",
  "Traditional",
  "Indo-Mediterranean",
];
const SPECIAL_OPTIONS = ["Vastu", "Parking", "Garden", "Basement", "Terrace"];

export function AIDesignEngine({ onDesignSelect, currentInput }: Props) {
  const [plotSize, setPlotSize] = useState("30×50");
  const [location, setLocation] = useState(currentInput?.location ?? "");
  const [buildingType, setBuildingType] = useState("House");
  const [floors, setFloors] = useState(2);
  const [budget, setBudget] = useState(50);
  const [style, setStyle] = useState<StyleKey>("Modern");
  const [specials, setSpecials] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DesignVariation[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function toggleSpecial(v: string) {
    setSpecials((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  }

  function handleGenerate() {
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(VARIATIONS_BY_STYLE[style]);
      setLoading(false);
    }, 1500);
  }

  function handleSelect(id: string) {
    setSelectedId(id);
    onDesignSelect(id);
  }

  return (
    <div
      className="flex flex-col gap-5 p-4 bg-card rounded-xl border border-border"
      data-ocid="ai_design_engine.panel"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-accent" />
        <h3 className="font-display text-base font-semibold text-foreground">
          AI Design Generator
        </h3>
        <Badge className="tier-badge-ultra ml-auto text-xs">
          Ultra Premium
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ai-plot-size" className="label-builder">
            Plot Size
          </Label>
          <select
            id="ai-plot-size"
            value={plotSize}
            onChange={(e) => setPlotSize(e.target.value)}
            className="input-builder"
            data-ocid="ai_design_engine.plot_size_select"
          >
            {["20×30", "25×40", "30×50", "40×60", "50×60"].map((v) => (
              <option key={v} value={v}>
                {v} ft
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="ai-location" className="label-builder">
            Location (City)
          </Label>
          <Input
            id="ai-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Mumbai, Bengaluru"
            className="input-builder"
            data-ocid="ai_design_engine.location_input"
          />
        </div>

        <div>
          <Label htmlFor="ai-building-type" className="label-builder">
            Building Type
          </Label>
          <select
            id="ai-building-type"
            value={buildingType}
            onChange={(e) => setBuildingType(e.target.value)}
            className="input-builder"
            data-ocid="ai_design_engine.building_type_select"
          >
            {["House", "Apartment", "Villa", "Commercial"].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="ai-floors" className="label-builder">
            Floors: {floors}
          </Label>
          <input
            id="ai-floors"
            type="range"
            min={1}
            max={5}
            value={floors}
            onChange={(e) => setFloors(Number(e.target.value))}
            className="w-full"
            data-ocid="ai_design_engine.floors_slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
            <span>1</span>
            <span>5</span>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="ai-budget" className="label-builder">
          Budget: ₹{budget}L – ₹{budget + 40}L
        </Label>
        <input
          id="ai-budget"
          type="range"
          min={10}
          max={200}
          step={5}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full"
          data-ocid="ai_design_engine.budget_slider"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
          <span>₹10L</span>
          <span>₹2Cr</span>
        </div>
      </div>

      <div>
        <p className="label-builder">Style</p>
        <div className="flex flex-wrap gap-3 mt-1">
          {STYLE_OPTIONS.map((s) => (
            <label key={s} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="ai-style"
                value={s}
                checked={style === s}
                onChange={() => setStyle(s)}
                data-ocid={`ai_design_engine.style_radio.${s.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
              />
              <span
                className={`text-sm ${style === s ? "text-accent font-medium" : "text-foreground"}`}
              >
                {s}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="label-builder">Special Requirements</p>
        <div className="flex flex-wrap gap-3 mt-1">
          {SPECIAL_OPTIONS.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={specials.includes(opt)}
                onChange={() => toggleSpecial(opt)}
                data-ocid={`ai_design_engine.special_${opt.toLowerCase()}`}
              />
              <span className="text-sm text-foreground">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className="button-builder button-accent-builder w-full"
        data-ocid="ai_design_engine.generate_button"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating
            Designs...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" /> Generate Designs
          </>
        )}
      </Button>

      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.3, 0, 0.4, 1] }}
            className="flex flex-col gap-3"
            data-ocid="ai_design_engine.results"
          >
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              3 Design Variations
            </p>
            {results.map((d, idx) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-lg border-2 p-4 transition-all duration-300 cursor-pointer ${
                  selectedId === d.id
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/40 bg-muted/10"
                }`}
                onClick={() => handleSelect(d.id)}
                data-ocid={`ai_design_engine.design_card.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <p className="font-display font-semibold text-foreground text-sm">
                      {d.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {d.sqft} sqft · {d.style} · {d.floors}F · {d.foundation}{" "}
                      foundation
                    </p>
                    <p className="text-xs font-mono text-accent mt-0.5">
                      {d.costMin} – {d.costMax}
                    </p>
                  </div>
                  {selectedId === d.id && (
                    <Badge className="bg-accent text-accent-foreground text-xs flex-shrink-0">
                      Selected
                    </Badge>
                  )}
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                  {d.highlights.map((h) => (
                    <li
                      key={h.slice(0, 32)}
                      className="flex items-start gap-1.5 text-xs text-foreground"
                    >
                      <span className="text-accent mt-0.5">✦</span> {h}
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(d.id);
                  }}
                  data-ocid={`ai_design_engine.select_button.${idx + 1}`}
                >
                  {selectedId === d.id ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1 text-accent" />{" "}
                      Selected
                    </>
                  ) : (
                    "Select This Design"
                  )}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
