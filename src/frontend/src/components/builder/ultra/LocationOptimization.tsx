import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { BuilderInput } from "@/types/builder";
import {
  AlertTriangle,
  CheckCircle,
  Loader2,
  MapPin,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Recommendation {
  label: string;
  text: string;
  status: "required" | "consider" | "good";
}

function getRecommendations(
  climate: string,
  soil: string,
  seismic: string,
  vastu: string[],
): Recommendation[] {
  const recs: Recommendation[] = [];

  if (soil === "black_cotton") {
    recs.push({
      label: "Foundation",
      text: "Raft foundation with depth 1.5m recommended; avoid isolated footings on expansive black cotton soil.",
      status: "required",
    });
  } else if (soil === "sandy") {
    recs.push({
      label: "Foundation",
      text: "Strip or raft foundation with compacted granular fill. Depth ≥ 1.2m to avoid settlement in loose sandy soil.",
      status: "required",
    });
  } else if (soil === "rocky") {
    recs.push({
      label: "Foundation",
      text: "Isolated footings directly on rock surface are ideal. Minimal excavation needed — verify rock quality before founding.",
      status: "good",
    });
  } else {
    recs.push({
      label: "Foundation",
      text: "Strip footings at 1.0–1.2m depth on red laterite / alluvial soil. Consider soil compaction testing at 3m intervals.",
      status: "consider",
    });
  }

  if (climate === "tropical" || climate === "semi_arid") {
    recs.push({
      label: "Roof Type",
      text: "Flat roof with 150mm insulation layer + reflective white coating recommended. Ensures ≥ 4°C indoor temperature reduction.",
      status: "good",
    });
  } else if (climate === "cold") {
    recs.push({
      label: "Roof Type",
      text: "Sloped roof (≥ 30°) essential for snow run-off. Double membrane waterproofing + 200mm mineral wool insulation.",
      status: "required",
    });
  } else {
    recs.push({
      label: "Roof Type",
      text: "Flat RCC roof with 75mm lime concrete topping + brick bat coba for insulation. Parapet ≥ 900mm for safety.",
      status: "consider",
    });
  }

  if (climate === "tropical" || climate === "coastal") {
    recs.push({
      label: "Window Orientation",
      text: "South-facing windows < 30% of wall area. Cross-ventilation via N + S openings; use louvred ventilators at roof level.",
      status: "consider",
    });
  } else if (climate === "cold") {
    recs.push({
      label: "Window Orientation",
      text: "Maximize south-facing glazing for solar gain in winter. Use double-glazed units with low-E coating. Minimize north-facing openings.",
      status: "required",
    });
  } else {
    recs.push({
      label: "Window Orientation",
      text: "Large east-facing windows for morning light. Overhangs ≥ 600mm on south and west to control afternoon heat gain.",
      status: "good",
    });
  }

  if (seismic === "zone4" || seismic === "zone5") {
    recs.push({
      label: "Seismic Resistance",
      text: "IS 1893 compliance mandatory. Use Fe-500 rebar, tie-beams at plinth, lintel, and roof level. Column spacing ≤ 4m in both directions.",
      status: "required",
    });
  } else if (seismic === "zone3") {
    recs.push({
      label: "Seismic Resistance",
      text: "Plinth and roof-level tie-beams recommended. Fe-500 grade steel preferred. Avoid large L/T shaped plan without shear walls.",
      status: "consider",
    });
  } else {
    recs.push({
      label: "Seismic Resistance",
      text: "Standard IS 456 design adequate for Zone II. Minimum 8mm ties @ 150mm c/c in columns.",
      status: "good",
    });
  }

  if (vastu.length > 0) {
    recs.push({
      label: "Vastu Compliance",
      text: `Vastu preferences noted: ${vastu.join(", ")}. Ensure main entrance faces N/NE, master bedroom in SW quadrant, kitchen in SE. Avoid overhead beam in sleeping area.`,
      status: "consider",
    });
  }

  return recs;
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  good: <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />,
  consider: (
    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
  ),
  required: (
    <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
  ),
};

const STATUS_DOT: Record<string, string> = {
  good: "bg-green-500",
  consider: "bg-amber-500",
  required: "bg-destructive",
};

const VASTU_OPTIONS = [
  "Main entrance facing North/East",
  "Kitchen in SE corner",
  "Master bedroom in SW",
  "Water tank in NE",
  "Avoid south-facing plot entry",
];

interface Props {
  currentInput?: BuilderInput;
}

export function LocationOptimization({ currentInput: _currentInput }: Props) {
  const [climate, setClimate] = useState("tropical");
  const [soil, setSoil] = useState("alluvial");
  const [seismic, setSeismic] = useState("zone2");
  const [vastu, setVastu] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Recommendation[] | null>(null);

  function toggleVastu(v: string) {
    setVastu((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    );
  }

  function handleGenerate() {
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(getRecommendations(climate, soil, seismic, vastu));
      setLoading(false);
    }, 1000);
  }

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-card rounded-xl border border-border"
      data-ocid="location_optimization.panel"
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-accent" />
        <h3 className="font-display text-base font-semibold text-foreground">
          Location Optimization
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <Label htmlFor="climate-select" className="label-builder">
            Climate Zone
          </Label>
          <select
            id="climate-select"
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
            className="input-builder text-sm"
            data-ocid="location_optimization.climate_select"
          >
            <option value="tropical">Tropical (Hot + Humid)</option>
            <option value="semi_arid">Semi-arid (Hot + Dry)</option>
            <option value="temperate">Temperate</option>
            <option value="cold">Cold</option>
            <option value="coastal">Coastal</option>
          </select>
        </div>
        <div>
          <Label htmlFor="soil-select" className="label-builder">
            Soil Type
          </Label>
          <select
            id="soil-select"
            value={soil}
            onChange={(e) => setSoil(e.target.value)}
            className="input-builder text-sm"
            data-ocid="location_optimization.soil_select"
          >
            <option value="black_cotton">Black Cotton (Expansive)</option>
            <option value="red_laterite">Red Laterite</option>
            <option value="sandy">Sandy Loam</option>
            <option value="rocky">Rocky</option>
            <option value="alluvial">Alluvial</option>
          </select>
        </div>
        <div>
          <Label htmlFor="seismic-select" className="label-builder">
            Seismic Zone
          </Label>
          <select
            id="seismic-select"
            value={seismic}
            onChange={(e) => setSeismic(e.target.value)}
            className="input-builder text-sm"
            data-ocid="location_optimization.seismic_select"
          >
            <option value="zone2">Zone II (Low)</option>
            <option value="zone3">Zone III (Moderate)</option>
            <option value="zone4">Zone IV (High)</option>
            <option value="zone5">Zone V (Very High)</option>
          </select>
        </div>
      </div>

      <Separator />

      <div>
        <p className="label-builder">Vastu Preferences</p>
        <div className="flex flex-col gap-2 mt-1">
          {VASTU_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={vastu.includes(opt)}
                onChange={() => toggleVastu(opt)}
                data-ocid={`location_optimization.vastu_${opt
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, "_")
                  .slice(0, 24)}`}
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
        data-ocid="location_optimization.generate_button"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analysing...
          </>
        ) : (
          "Generate Recommendations"
        )}
      </Button>

      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.3, 0, 0.4, 1] }}
            className="flex flex-col gap-3"
            data-ocid="location_optimization.results"
          >
            <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
              {Object.entries(STATUS_DOT).map(([status, cls]) => (
                <span
                  key={status}
                  className="flex items-center gap-1 capitalize"
                >
                  <span className={`w-2 h-2 rounded-full ${cls}`} />
                  {status}
                </span>
              ))}
            </div>
            {results.map((r, recIdx) => (
              <motion.div
                key={`${r.label}-${r.status}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: recIdx * 0.08 }}
                className="flex gap-3 p-3 rounded-lg bg-muted/20 border border-border"
                data-ocid={`location_optimization.recommendation.${recIdx + 1}`}
              >
                {STATUS_ICONS[r.status]}
                <div>
                  <p className="text-xs font-semibold text-foreground mb-0.5">
                    {r.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {r.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
