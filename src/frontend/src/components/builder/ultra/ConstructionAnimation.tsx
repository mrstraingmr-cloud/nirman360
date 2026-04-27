import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, Clock, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Stage {
  number: number;
  title: string;
  description: string;
  details: string[];
  duration: string;
  color: string;
}

const STAGES: Stage[] = [
  {
    number: 1,
    title: "Site Preparation",
    description:
      "Clearing, surveying and levelling the plot before any construction begins.",
    details: [
      "Vegetation clearing, boundary marking and soil testing",
      "Levelling and grading with heavy machinery",
      "Temporary site office and utility connections set up",
    ],
    duration: "1–2 weeks",
    color: "#8B6914",
  },
  {
    number: 2,
    title: "Foundation",
    description:
      "Excavation and sub-structure work including anti-termite treatment and waterproofing.",
    details: [
      "Excavation to design depth, PCC layer and footing casting",
      "Reinforcement steel placement and concrete pouring",
      "Waterproofing membrane and anti-termite treatment applied",
    ],
    duration: "2–3 weeks",
    color: "#6B4F2A",
  },
  {
    number: 3,
    title: "RCC Structure",
    description:
      "Columns, beams, and slabs forming the skeletal reinforced concrete framework.",
    details: [
      "Column reinforcement, shuttering, and concrete casting",
      "Beam and slab formation for each floor",
      "Staircase structure, curing, and de-shuttering",
    ],
    duration: "4–6 weeks",
    color: "#7A7A7A",
  },
  {
    number: 4,
    title: "Wall Construction",
    description:
      "Masonry walls rise with precise openings for doors, windows, and lintel beams.",
    details: [
      "AAC block / brick wall construction with mortar",
      "Door and window frame openings with lintel beams",
      "Internal partition walls and staircase infill",
    ],
    duration: "3–4 weeks",
    color: "#C2612A",
  },
  {
    number: 5,
    title: "Internal Systems",
    description:
      "Concealed plumbing, electrical conduit, and drainage before plastering.",
    details: [
      "CPVC plumbing pipes (blue/red coded) run inside walls",
      "Electrical conduit, wiring, and distribution board layout",
      "Drainage lines, sewage connections, and bathroom rough-in",
    ],
    duration: "2–3 weeks",
    color: "#D4A800",
  },
  {
    number: 6,
    title: "Plaster & Flooring",
    description:
      "Smooth plastering followed by tile installation and floor levelling.",
    details: [
      "Internal and external wall plastering in two coats",
      "Floor levelling compound and tile bedding mortar",
      "Ceramic / vitrified tile installation and grouting",
    ],
    duration: "3–4 weeks",
    color: "#4A8F5C",
  },
  {
    number: 7,
    title: "Interior Design",
    description:
      "Modular kitchen, wardrobes, false ceilings, and lighting installation.",
    details: [
      "Modular kitchen units, wardrobes, and built-in furniture",
      "False ceiling, cornice work, and interior painting",
      "Lighting fixtures, sanitary ware, and final fit-out",
    ],
    duration: "3–5 weeks",
    color: "#2F6EB5",
  },
  {
    number: 8,
    title: "Exterior Finish",
    description:
      "Paint, cladding, glass balconies, and exterior lighting complete the build.",
    details: [
      "Exterior texture paint and weather-shield coating",
      "Glass balcony railings, door and window installation",
      "Exterior lighting, landscaping, and final walkthrough",
    ],
    duration: "2–3 weeks",
    color: "#ff6b35",
  },
];

interface Props {
  activeStageIndex: number;
  onStageChange: (index: number) => void;
  autoPlay?: boolean;
}

export function ConstructionAnimation({
  activeStageIndex,
  onStageChange,
  autoPlay = false,
}: Props) {
  const [auto, setAuto] = useState(autoPlay);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (auto) {
      timerRef.current = setInterval(() => {
        onStageChange((activeStageIndex + 1) % STAGES.length);
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [auto, activeStageIndex, onStageChange]);

  const active = STAGES[activeStageIndex];

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-card rounded-xl border border-border"
      data-ocid="construction_animation.panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-foreground">
          Construction Sequence
        </h3>
        <div className="flex items-center gap-2">
          {auto ? (
            <Play className="w-3 h-3 text-accent" />
          ) : (
            <Pause className="w-3 h-3 text-muted-foreground" />
          )}
          <span className="text-xs text-muted-foreground">Auto-advance</span>
          <Switch
            checked={auto}
            onCheckedChange={setAuto}
            data-ocid="construction_animation.auto_toggle"
          />
        </div>
      </div>

      {/* Stage pills */}
      <div className="flex gap-1.5 flex-wrap">
        {STAGES.map((s, i) => (
          <button
            key={s.number}
            type="button"
            onClick={() => onStageChange(i)}
            data-ocid={`construction_animation.stage.${i + 1}`}
            className={`w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              i === activeStageIndex
                ? "text-accent-foreground scale-110 shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
            style={i === activeStageIndex ? { backgroundColor: s.color } : {}}
          >
            {s.number}
          </button>
        ))}
      </div>

      {/* Active stage detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStageIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.3, 0, 0.4, 1] }}
          className="rounded-lg border-2 p-4 bg-muted/20 flex flex-col gap-3"
          style={{ borderColor: active.color }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.35, ease: "backOut" }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: active.color }}
              >
                {active.number}
              </motion.div>
              <span className="font-display font-semibold text-foreground">
                {active.title}
              </span>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-muted-foreground"
            >
              <Clock className="w-3 h-3" />
              {active.duration}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {active.description}
          </p>

          {/* Progress bar */}
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, ease: [0.3, 0, 0.4, 1] }}
              className="h-full rounded-full"
              style={{ backgroundColor: active.color }}
            />
          </div>

          <ul className="flex flex-col gap-1.5">
            {active.details.map((d, detailIdx) => (
              <motion.li
                key={d.slice(0, 32)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: detailIdx * 0.08, duration: 0.25 }}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: active.color }}
                />
                {d}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => onStageChange(Math.max(0, activeStageIndex - 1))}
          disabled={activeStageIndex === 0}
          data-ocid="construction_animation.prev_button"
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-muted transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <span className="text-xs text-muted-foreground">
          {activeStageIndex + 1} / {STAGES.length}
        </span>
        <button
          type="button"
          onClick={() =>
            onStageChange(Math.min(STAGES.length - 1, activeStageIndex + 1))
          }
          disabled={activeStageIndex === STAGES.length - 1}
          data-ocid="construction_animation.next_button"
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium bg-accent text-accent-foreground hover:opacity-90 transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
