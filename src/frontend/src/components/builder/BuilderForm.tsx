import { useState } from "react";
import type {
  BudgetRange,
  BuilderFormStep,
  BuilderInput,
  BuildingStyle,
  BuildingType,
  ClimateZone,
  SpecialRequirement,
} from "../../types/builder";
import {
  BUDGET_RANGES,
  BUILDING_TYPE_LABELS,
  CLIMATE_ZONES,
} from "../../utils/builderCalculations";

interface BuilderFormProps {
  onGenerate: (input: BuilderInput) => void;
  isGenerating: boolean;
}

const STEPS: BuilderFormStep[] = [
  "plot",
  "location",
  "building",
  "budget",
  "style",
  "requirements",
];

const STEP_META: Record<
  BuilderFormStep,
  { title: string; icon: string; label: string }
> = {
  plot: { title: "Plot Details", icon: "📐", label: "Plot" },
  location: { title: "Location & Climate", icon: "📍", label: "Location" },
  building: { title: "Building Type & Size", icon: "🏢", label: "Building" },
  budget: { title: "Budget Range", icon: "💰", label: "Budget" },
  style: { title: "Architectural Style", icon: "🎨", label: "Style" },
  requirements: { title: "Special Requirements", icon: "⭐", label: "Extras" },
  review: { title: "Review", icon: "✅", label: "Review" },
};

const BUILDING_TYPES: { value: BuildingType; icon: string }[] = [
  { value: "house", icon: "🏠" },
  { value: "apartment", icon: "🏢" },
  { value: "commercial", icon: "🏪" },
  { value: "villa", icon: "🏡" },
  { value: "dairyFarm", icon: "🐄" },
  { value: "warehouse", icon: "🏭" },
];

const BUILDING_STYLES: {
  value: BuildingStyle;
  icon: string;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    value: "modern",
    icon: "🔲",
    label: "Modern",
    description: "Clean lines, flat roofs, glass elements",
    color: "bg-blue-500",
  },
  {
    value: "traditional",
    icon: "🏛️",
    label: "Traditional",
    description: "Sloped roofs, ornate details, warm tones",
    color: "bg-amber-700",
  },
  {
    value: "minimal",
    icon: "⬜",
    label: "Minimal",
    description: "Less is more, open spaces, neutral palette",
    color: "bg-foreground/20",
  },
  {
    value: "luxury",
    icon: "💎",
    label: "Luxury",
    description: "Bold elements, premium materials, statement design",
    color: "bg-yellow-500",
  },
];

const BUDGET_STYLE: Record<
  BudgetRange,
  { ring: string; bg: string; badge: string }
> = {
  low: {
    ring: "border-muted-foreground/40",
    bg: "bg-muted/60",
    badge: "bg-muted text-muted-foreground",
  },
  medium: {
    ring: "border-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
  },
  high: {
    ring: "border-accent",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    badge:
      "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200",
  },
  luxury: {
    ring: "border-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    badge:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  },
};

const SPECIAL_REQUIREMENTS: {
  value: SpecialRequirement;
  icon: string;
  label: string;
}[] = [
  { value: "parking", icon: "🚗", label: "Parking" },
  { value: "garden", icon: "🌳", label: "Garden" },
  { value: "vastu", icon: "🧿", label: "Vastu" },
  { value: "basement", icon: "🏗️", label: "Basement" },
  { value: "terrace", icon: "☀️", label: "Terrace" },
  { value: "swimming_pool", icon: "🏊", label: "Swimming Pool" },
  { value: "solar", icon: "⚡", label: "Solar" },
];

const DEFAULT_FORM: Partial<BuilderInput> = {
  plotLength: 12,
  plotWidth: 10,
  floors: 1,
  specialRequirements: [],
};

export default function BuilderForm({
  onGenerate,
  isGenerating,
}: BuilderFormProps) {
  const [currentStep, setCurrentStep] = useState<BuilderFormStep>("plot");
  const [formData, setFormData] = useState<Partial<BuilderInput>>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const stepIndex = STEPS.indexOf(currentStep);

  function validateStep(step: BuilderFormStep): Record<string, string> {
    const errs: Record<string, string> = {};
    if (step === "plot") {
      const l = formData.plotLength ?? 0;
      const w = formData.plotWidth ?? 0;
      if (!l || l < 5 || l > 200)
        errs.plotLength = "Length must be between 5 and 200 m";
      if (!w || w < 5 || w > 200)
        errs.plotWidth = "Width must be between 5 and 200 m";
    }
    if (step === "location") {
      if (!formData.location?.trim())
        errs.location = "City / State is required";
      if (!formData.climateZone)
        errs.climateZone = "Please select a climate zone";
    }
    if (step === "building") {
      if (!formData.buildingType)
        errs.buildingType = "Please select a building type";
      const f = formData.floors ?? 0;
      if (!f || f < 1 || f > 10)
        errs.floors = "Floors must be between 1 and 10";
    }
    if (step === "budget") {
      if (!formData.budgetRange)
        errs.budgetRange = "Please select a budget range";
    }
    if (step === "style") {
      if (!formData.style) errs.style = "Please select a style";
    }
    return errs;
  }

  function goNext() {
    const errs = validateStep(currentStep);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    if (currentStep === "requirements") {
      const input: BuilderInput = {
        plotLength: formData.plotLength ?? 12,
        plotWidth: formData.plotWidth ?? 10,
        location: formData.location ?? "",
        climateZone: formData.climateZone ?? "composite",
        buildingType: formData.buildingType ?? "house",
        floors: formData.floors ?? 1,
        budgetRange: formData.budgetRange ?? "medium",
        style: formData.style ?? "modern",
        specialRequirements: formData.specialRequirements ?? [],
      };
      onGenerate(input);
      return;
    }
    setCurrentStep(STEPS[stepIndex + 1]);
  }

  function goBack() {
    if (stepIndex > 0) {
      setErrors({});
      setCurrentStep(STEPS[stepIndex - 1]);
    }
  }

  function update<K extends keyof BuilderInput>(
    key: K,
    value: BuilderInput[K],
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  const plotArea = (formData.plotLength ?? 0) * (formData.plotWidth ?? 0);
  const plotAreaSqFt = (plotArea * 10.764).toFixed(0);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8" data-ocid="builder.progress_bar">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((step, idx) => {
            const meta = STEP_META[step];
            const isCompleted = idx < stepIndex;
            const isActive = idx === stepIndex;
            return (
              <div
                key={step}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div className="flex items-center w-full">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 flex-shrink-0 mx-auto
                      ${isCompleted ? "bg-accent text-accent-foreground" : ""}
                      ${isActive ? "bg-accent text-accent-foreground ring-4 ring-accent/30" : ""}
                      ${!isCompleted && !isActive ? "bg-muted text-muted-foreground" : ""}
                    `}
                    data-ocid={`builder.step_dot.${idx + 1}`}
                  >
                    {isCompleted ? "✓" : idx + 1}
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-1 rounded transition-all duration-300 ${idx < stepIndex ? "bg-accent" : "bg-muted"}`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${isActive ? "text-accent" : "text-muted-foreground"}`}
                >
                  {meta.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form card */}
      <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
        {/* Step header */}
        <div className="bg-primary px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">{STEP_META[currentStep].icon}</span>
          <div>
            <p className="text-xs text-primary-foreground/70 font-medium uppercase tracking-wider">
              Step {stepIndex + 1} of {STEPS.length}
            </p>
            <h2 className="text-lg font-bold text-primary-foreground">
              {STEP_META[currentStep].title}
            </h2>
          </div>
        </div>

        {/* Step content */}
        <div className="p-6 animate-fadeIn">
          {/* STEP 1: Plot */}
          {currentStep === "plot" && (
            <div className="space-y-5" data-ocid="builder.plot_step">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="plot-length"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Plot Length (meters)
                  </label>
                  <input
                    id="plot-length"
                    type="number"
                    min={5}
                    max={200}
                    value={formData.plotLength ?? ""}
                    onChange={(e) =>
                      update("plotLength", Number(e.target.value))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition"
                    placeholder="e.g. 12"
                    data-ocid="builder.plot_length.input"
                  />
                  {errors.plotLength && (
                    <p
                      className="mt-1 text-xs text-destructive"
                      data-ocid="builder.plot_length.field_error"
                    >
                      {errors.plotLength}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="plot-width"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Plot Width (meters)
                  </label>
                  <input
                    id="plot-width"
                    type="number"
                    min={5}
                    max={200}
                    value={formData.plotWidth ?? ""}
                    onChange={(e) =>
                      update("plotWidth", Number(e.target.value))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition"
                    placeholder="e.g. 10"
                    data-ocid="builder.plot_width.input"
                  />
                  {errors.plotWidth && (
                    <p
                      className="mt-1 text-xs text-destructive"
                      data-ocid="builder.plot_width.field_error"
                    >
                      {errors.plotWidth}
                    </p>
                  )}
                </div>
              </div>
              {plotArea > 0 && (
                <div className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 flex items-center gap-3">
                  <span className="text-xl">📏</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Area: {plotArea} sq.m
                    </p>
                    <p className="text-xs text-muted-foreground">
                      = {plotAreaSqFt} sq.ft
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Location */}
          {currentStep === "location" && (
            <div className="space-y-5" data-ocid="builder.location_step">
              <div>
                <label
                  htmlFor="location-city"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  City / State
                </label>
                <input
                  id="location-city"
                  type="text"
                  value={formData.location ?? ""}
                  onChange={(e) => update("location", e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition"
                  placeholder="e.g. Mumbai, Maharashtra"
                  data-ocid="builder.location.input"
                />
                {errors.location && (
                  <p
                    className="mt-1 text-xs text-destructive"
                    data-ocid="builder.location.field_error"
                  >
                    {errors.location}
                  </p>
                )}
              </div>
              <div>
                <p className="block text-sm font-medium text-foreground mb-2">
                  Climate Zone
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {(
                    Object.entries(CLIMATE_ZONES) as [
                      ClimateZone,
                      { label: string; description: string },
                    ][]
                  ).map(([zone, info]) => (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => update("climateZone", zone)}
                      className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-all duration-200 cursor-pointer
                          ${
                            formData.climateZone === zone
                              ? "border-accent bg-orange-50 dark:bg-orange-950/20"
                              : "border-border bg-background hover:border-accent/50"
                          }`}
                      data-ocid={`builder.climate_zone.${zone}`}
                    >
                      <span className="font-semibold text-sm text-foreground">
                        {info.label}
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {info.description}
                      </p>
                    </button>
                  ))}
                </div>
                {errors.climateZone && (
                  <p
                    className="mt-1 text-xs text-destructive"
                    data-ocid="builder.climate_zone.field_error"
                  >
                    {errors.climateZone}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Building */}
          {currentStep === "building" && (
            <div className="space-y-6" data-ocid="builder.building_step">
              <div>
                <p className="block text-sm font-medium text-foreground mb-2">
                  Building Type
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {BUILDING_TYPES.map(({ value, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => update("buildingType", value)}
                      className={`rounded-xl border-2 px-3 py-4 flex flex-col items-center gap-2 transition-all duration-200 cursor-pointer
                        ${
                          formData.buildingType === value
                            ? "border-accent bg-orange-50 dark:bg-orange-950/20"
                            : "border-border bg-background hover:border-accent/50"
                        }`}
                      data-ocid={`builder.building_type.${value}`}
                    >
                      <span className="text-2xl">{icon}</span>
                      <span className="text-xs font-medium text-center text-foreground leading-tight">
                        {BUILDING_TYPE_LABELS[value]}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.buildingType && (
                  <p
                    className="mt-1 text-xs text-destructive"
                    data-ocid="builder.building_type.field_error"
                  >
                    {errors.buildingType}
                  </p>
                )}
              </div>
              <div>
                <p className="block text-sm font-medium text-foreground mb-2">
                  Number of Floors
                </p>
                <div
                  className="flex items-center gap-4"
                  data-ocid="builder.floors_stepper"
                >
                  <button
                    type="button"
                    onClick={() =>
                      update("floors", Math.max(1, (formData.floors ?? 1) - 1))
                    }
                    className="w-10 h-10 rounded-full border-2 border-border bg-background text-foreground text-lg font-bold flex items-center justify-center hover:border-accent hover:text-accent transition"
                    aria-label="Decrease floors"
                    data-ocid="builder.floors.decrease_button"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-foreground w-10 text-center tabular-nums">
                    {formData.floors ?? 1}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      update("floors", Math.min(10, (formData.floors ?? 1) + 1))
                    }
                    className="w-10 h-10 rounded-full border-2 border-border bg-background text-foreground text-lg font-bold flex items-center justify-center hover:border-accent hover:text-accent transition"
                    aria-label="Increase floors"
                    data-ocid="builder.floors.increase_button"
                  >
                    +
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {formData.floors === 1 ? "floor" : "floors"} (max 10)
                  </span>
                </div>
                {errors.floors && (
                  <p
                    className="mt-1 text-xs text-destructive"
                    data-ocid="builder.floors.field_error"
                  >
                    {errors.floors}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Budget */}
          {currentStep === "budget" && (
            <div className="space-y-3" data-ocid="builder.budget_step">
              <p className="block text-sm font-medium text-foreground mb-2">
                Select Budget Range
              </p>
              {(
                Object.entries(BUDGET_RANGES) as [
                  BudgetRange,
                  { label: string; costPerSqFt: { min: number; max: number } },
                ][]
              ).map(([key, info]) => {
                const style = BUDGET_STYLE[key];
                const isSelected = formData.budgetRange === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => update("budgetRange", key)}
                    className={`w-full text-left rounded-xl border-2 px-5 py-4 transition-all duration-200 cursor-pointer
                        ${isSelected ? `${style.ring} ${style.bg}` : "border-border bg-background hover:border-accent/50"}`}
                    data-ocid={`builder.budget.${key}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-base text-foreground">
                        {info.label}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.badge}`}
                      >
                        ₹{info.costPerSqFt.min}–{info.costPerSqFt.max}/sq.ft
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {key === "low" &&
                        "Basic construction with standard materials and finishes."}
                      {key === "medium" &&
                        "Mid-range quality with good brands and solid finishes."}
                      {key === "high" &&
                        "Premium materials, superior finishes, and modern fittings."}
                      {key === "luxury" &&
                        "Top-tier design, imported materials, and bespoke interiors."}
                    </p>
                  </button>
                );
              })}
              {errors.budgetRange && (
                <p
                  className="mt-1 text-xs text-destructive"
                  data-ocid="builder.budget.field_error"
                >
                  {errors.budgetRange}
                </p>
              )}
            </div>
          )}

          {/* STEP 5: Style */}
          {currentStep === "style" && (
            <div className="space-y-3" data-ocid="builder.style_step">
              <p className="block text-sm font-medium text-foreground mb-2">
                Pick Your Architectural Style
              </p>
              <div className="grid grid-cols-2 gap-3">
                {BUILDING_STYLES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => update("style", s.value)}
                    className={`rounded-xl border-2 p-4 text-left transition-all duration-200 cursor-pointer
                      ${
                        formData.style === s.value
                          ? "border-accent bg-orange-50 dark:bg-orange-950/20"
                          : "border-border bg-background hover:border-accent/50"
                      }`}
                    data-ocid={`builder.style.${s.value}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-md ${s.color} mb-2 flex items-center justify-center text-lg`}
                    >
                      {s.icon}
                    </div>
                    <p className="font-semibold text-sm text-foreground">
                      {s.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {s.description}
                    </p>
                  </button>
                ))}
              </div>
              {errors.style && (
                <p
                  className="mt-1 text-xs text-destructive"
                  data-ocid="builder.style.field_error"
                >
                  {errors.style}
                </p>
              )}
            </div>
          )}

          {/* STEP 6: Requirements */}
          {currentStep === "requirements" && (
            <div className="space-y-4" data-ocid="builder.requirements_step">
              <div>
                <p className="block text-sm font-medium text-foreground mb-1">
                  Special Requirements
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Select any extras you need — all are optional.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SPECIAL_REQUIREMENTS.map((req) => {
                    const selected = (
                      formData.specialRequirements ?? []
                    ).includes(req.value);
                    return (
                      <button
                        key={req.value}
                        type="button"
                        onClick={() => {
                          const current = formData.specialRequirements ?? [];
                          const updated = selected
                            ? current.filter((r) => r !== req.value)
                            : [...current, req.value];
                          update("specialRequirements", updated);
                        }}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 cursor-pointer
                          ${
                            selected
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-border bg-background text-foreground hover:border-accent/50"
                          }`}
                        data-ocid={`builder.requirement.${req.value}`}
                      >
                        <span>{req.icon}</span>
                        {req.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary card */}
              <div className="rounded-xl border border-border bg-muted/40 p-4 mt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Your Design Summary
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <SummaryRow
                    label="Plot"
                    value={`${formData.plotLength}×${formData.plotWidth} m`}
                  />
                  <SummaryRow
                    label="Location"
                    value={formData.location ?? "—"}
                  />
                  <SummaryRow
                    label="Building"
                    value={
                      BUILDING_TYPE_LABELS[formData.buildingType ?? "house"]
                    }
                  />
                  <SummaryRow
                    label="Floors"
                    value={`${formData.floors ?? 1}`}
                  />
                  <SummaryRow
                    label="Budget"
                    value={
                      BUDGET_RANGES[formData.budgetRange ?? "medium"].label
                    }
                  />
                  <SummaryRow
                    label="Style"
                    value={
                      formData.style
                        ? formData.style.charAt(0).toUpperCase() +
                          formData.style.slice(1)
                        : "—"
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={stepIndex === 0}
            className="px-5 py-2.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground hover:bg-muted transition disabled:opacity-40 disabled:cursor-not-allowed"
            data-ocid="builder.back_button"
          >
            ← Back
          </button>

          {currentStep !== "requirements" ? (
            <button
              type="button"
              onClick={goNext}
              className="px-6 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 active:scale-95 transition-all"
              data-ocid="builder.next_button"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              disabled={isGenerating}
              className="px-6 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              data-ocid="builder.generate_button"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  Generating…
                </>
              ) : (
                "🏗️ Generate My 3D Design"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground truncate">{value}</span>
    </div>
  );
}
