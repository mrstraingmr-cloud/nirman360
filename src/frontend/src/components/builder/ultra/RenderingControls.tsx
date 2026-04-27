import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Layers, Moon, Sun } from "lucide-react";

export interface RenderSettings {
  dayNight: "day" | "night";
  material: "concrete" | "brick" | "glass" | "wood";
  intensity: number;
  shadows: boolean;
}

interface MaterialPreset {
  id: RenderSettings["material"];
  label: string;
  swatch: string;
  swatchAlt: string;
  description: string;
}

const MATERIALS: MaterialPreset[] = [
  {
    id: "concrete",
    label: "Concrete",
    swatch: "#9ca3af",
    swatchAlt: "#d1d5db",
    description: "Gray tones, rough texture",
  },
  {
    id: "brick",
    label: "Brick",
    swatch: "#c2612a",
    swatchAlt: "#e07a4f",
    description: "Terra cotta, warm tones",
  },
  {
    id: "glass",
    label: "Glass",
    swatch: "#7dd3fc",
    swatchAlt: "#bfdbfe",
    description: "Translucent blue tones",
  },
  {
    id: "wood",
    label: "Wood",
    swatch: "#92400e",
    swatchAlt: "#d97706",
    description: "Warm brown grain",
  },
];

interface Props {
  onChange: (settings: RenderSettings) => void;
  currentSettings: RenderSettings;
}

export function RenderingControls({ onChange, currentSettings }: Props) {
  function update(patch: Partial<RenderSettings>) {
    onChange({ ...currentSettings, ...patch });
  }

  const activeMaterial =
    MATERIALS.find((m) => m.id === currentSettings.material) ?? MATERIALS[0];

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-card rounded-xl border border-border"
      data-ocid="rendering_controls.panel"
    >
      <div className="flex items-center gap-2">
        <Layers className="w-4 h-4 text-accent" />
        <h3 className="font-display text-base font-semibold text-foreground">
          Rendering Controls
        </h3>
      </div>

      {/* Day / Night */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentSettings.dayNight === "day" ? (
            <Sun className="w-4 h-4 text-accent" />
          ) : (
            <Moon className="w-4 h-4 text-primary" />
          )}
          <span className="text-sm text-foreground">
            {currentSettings.dayNight === "day" ? "Day Mode" : "Night Mode"}
          </span>
        </div>
        <Switch
          checked={currentSettings.dayNight === "night"}
          onCheckedChange={(v) => update({ dayNight: v ? "night" : "day" })}
          data-ocid="rendering_controls.day_night_switch"
        />
      </div>

      <Separator />

      {/* Material presets */}
      <div>
        <Label className="label-builder">Material Preset</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {MATERIALS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => update({ material: m.id })}
              data-ocid={`rendering_controls.material.${m.id}`}
              className={`flex items-center gap-2 p-2.5 rounded-lg border-2 text-left transition-all duration-200 hover:border-accent/60 ${
                currentSettings.material === m.id
                  ? "border-accent bg-accent/5"
                  : "border-border bg-muted/20"
              }`}
            >
              <div className="flex flex-col flex-shrink-0">
                <div
                  className="w-6 h-3 rounded-t-sm"
                  style={{ backgroundColor: m.swatch }}
                />
                <div
                  className="w-6 h-3 rounded-b-sm"
                  style={{ backgroundColor: m.swatchAlt }}
                />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">{m.label}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {m.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Texture intensity */}
      <div>
        <Label htmlFor="intensity-slider" className="label-builder">
          Texture Intensity: {currentSettings.intensity}%
        </Label>
        <input
          id="intensity-slider"
          type="range"
          min={0}
          max={100}
          value={currentSettings.intensity}
          onChange={(e) => update({ intensity: Number(e.target.value) })}
          className="w-full"
          data-ocid="rendering_controls.intensity_slider"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Shadows toggle */}
      <div className="flex items-center justify-between">
        <Label className="label-builder mb-0">Realistic Shadows</Label>
        <Switch
          checked={currentSettings.shadows}
          onCheckedChange={(v) => update({ shadows: v })}
          data-ocid="rendering_controls.shadows_switch"
        />
      </div>

      <Separator />

      {/* Preview swatches */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">
          Current: {activeMaterial.label} · {currentSettings.intensity}%
          intensity · {currentSettings.dayNight}
        </p>
        <div className="flex gap-1 h-5 rounded-md overflow-hidden border border-border">
          {[
            activeMaterial.swatch,
            activeMaterial.swatchAlt,
            "#ffffff",
            "#e5e7eb",
          ].map((c) => (
            <div
              key={c}
              className="flex-1"
              style={{
                backgroundColor: c,
                opacity: (currentSettings.intensity / 100) * 0.7 + 0.3,
                filter:
                  currentSettings.dayNight === "night"
                    ? "brightness(0.5)"
                    : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
