import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, RotateCcw, Sliders } from "lucide-react";
import { useEffect, useState } from "react";

export interface EditingState {
  wallThickness: number;
  floorHeight: number;
  windowHeight: number;
  balconyDepth: number;
  exteriorColor: string;
  interiorColor: string;
  roofColor: string;
  accentColor: string;
  flooring: string;
  exteriorFinish: string;
}

const DEFAULTS: EditingState = {
  wallThickness: 23,
  floorHeight: 300,
  windowHeight: 120,
  balconyDepth: 150,
  exteriorColor: "#f5f5f5",
  interiorColor: "#ffffff",
  roofColor: "#444444",
  accentColor: "#ff6b35",
  flooring: "Ceramic Tile",
  exteriorFinish: "Smooth Plaster",
};

interface SliderDef {
  key: keyof EditingState;
  label: string;
  min: number;
  max: number;
  unit: string;
  id: string;
}
interface ColorDef {
  key: keyof EditingState;
  label: string;
  id: string;
}

const SLIDERS: SliderDef[] = [
  {
    key: "wallThickness",
    label: "Wall Thickness",
    min: 10,
    max: 30,
    unit: "cm",
    id: "wall-thickness",
  },
  {
    key: "floorHeight",
    label: "Floor Height",
    min: 280,
    max: 400,
    unit: "cm",
    id: "floor-height",
  },
  {
    key: "windowHeight",
    label: "Window Height",
    min: 80,
    max: 150,
    unit: "cm",
    id: "window-height",
  },
  {
    key: "balconyDepth",
    label: "Balcony Depth",
    min: 100,
    max: 200,
    unit: "cm",
    id: "balcony-depth",
  },
];

const COLORS: ColorDef[] = [
  { key: "exteriorColor", label: "Exterior Wall", id: "exterior-color" },
  { key: "interiorColor", label: "Interior Wall", id: "interior-color" },
  { key: "roofColor", label: "Roof", id: "roof-color" },
  { key: "accentColor", label: "Accent", id: "accent-color" },
];

interface Props {
  onUpdate: (edits: EditingState) => void;
}

export function CustomEditingPanel({ onUpdate }: Props) {
  const [state, setState] = useState<EditingState>(DEFAULTS);
  const [applied, setApplied] = useState(false);

  function update(patch: Partial<EditingState>) {
    setState((prev) => ({ ...prev, ...patch }));
  }

  function handleApply() {
    onUpdate(state);
    setApplied(true);
  }

  useEffect(() => {
    if (!applied) return;
    const t = setTimeout(() => setApplied(false), 2000);
    return () => clearTimeout(t);
  }, [applied]);

  function handleReset() {
    setState(DEFAULTS);
    onUpdate(DEFAULTS);
  }

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-card rounded-xl border border-border"
      data-ocid="custom_editing.panel"
    >
      <div className="flex items-center gap-2">
        <Sliders className="w-4 h-4 text-accent" />
        <h3 className="font-display text-base font-semibold text-foreground">
          Custom Editing
        </h3>
      </div>

      {/* Dimension sliders */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Dimensions
        </p>
        {SLIDERS.map((s) => (
          <div key={s.key}>
            <div className="flex justify-between items-center mb-1">
              <Label
                htmlFor={`slider-${s.id}`}
                className="text-xs text-foreground"
              >
                {s.label}
              </Label>
              <span className="text-xs font-mono text-accent">
                {state[s.key] as number} {s.unit}
              </span>
            </div>
            <input
              id={`slider-${s.id}`}
              type="range"
              min={s.min}
              max={s.max}
              value={state[s.key] as number}
              onChange={(e) => update({ [s.key]: Number(e.target.value) })}
              className="w-full"
              data-ocid={`custom_editing.${s.key}_slider`}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>
                {s.min}
                {s.unit}
              </span>
              <span>
                {s.max}
                {s.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Color pickers */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Colors
        </p>
        <div className="grid grid-cols-2 gap-3">
          {COLORS.map((c) => (
            <div key={c.key} className="flex items-center gap-2">
              <input
                id={`color-${c.id}`}
                type="color"
                value={state[c.key] as string}
                onChange={(e) => update({ [c.key]: e.target.value })}
                className="w-8 h-8 rounded-md cursor-pointer border border-border bg-transparent p-0"
                data-ocid={`custom_editing.${c.key}_picker`}
              />
              <div>
                <label
                  htmlFor={`color-${c.id}`}
                  className="text-xs font-medium text-foreground cursor-pointer"
                >
                  {c.label}
                </label>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {state[c.key] as string}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Material dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="flooring-select" className="label-builder">
            Flooring
          </Label>
          <select
            id="flooring-select"
            value={state.flooring}
            onChange={(e) => update({ flooring: e.target.value })}
            className="input-builder text-sm"
            data-ocid="custom_editing.flooring_select"
          >
            {["Ceramic Tile", "Marble", "Hardwood", "Polished Concrete"].map(
              (v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ),
            )}
          </select>
        </div>
        <div>
          <Label htmlFor="exterior-finish-select" className="label-builder">
            Exterior Finish
          </Label>
          <select
            id="exterior-finish-select"
            value={state.exteriorFinish}
            onChange={(e) => update({ exteriorFinish: e.target.value })}
            className="input-builder text-sm"
            data-ocid="custom_editing.exterior_finish_select"
          >
            {["Smooth Plaster", "Exposed Brick", "Stone Cladding", "EIFS"].map(
              (v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleApply}
          data-ocid="custom_editing.apply_button"
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            applied
              ? "bg-green-500/20 text-green-600 border border-green-500/30"
              : "bg-accent text-accent-foreground hover:opacity-90"
          }`}
        >
          {applied ? (
            <>
              <Check className="w-4 h-4" /> Applied!
            </>
          ) : (
            "Apply Changes"
          )}
        </button>
        <button
          type="button"
          onClick={handleReset}
          data-ocid="custom_editing.reset_button"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>
    </div>
  );
}
