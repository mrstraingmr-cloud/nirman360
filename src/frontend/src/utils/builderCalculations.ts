import type {
  BudgetRange,
  BuilderInput,
  BuilderResult,
  BuildingStage,
  ClimateZone,
  CostBreakdownDetail,
  FoundationType,
  MaterialItem,
  StageDetail,
} from "../types/builder";

// ─── Static Lookup Tables ─────────────────────────────────────────────────────

export const BUDGET_RANGES: Record<
  BudgetRange,
  { label: string; costPerSqFt: { min: number; max: number } }
> = {
  low: { label: "Economy", costPerSqFt: { min: 1200, max: 1800 } },
  medium: { label: "Standard", costPerSqFt: { min: 1800, max: 2800 } },
  high: { label: "Premium", costPerSqFt: { min: 2800, max: 4500 } },
  luxury: { label: "Luxury", costPerSqFt: { min: 4500, max: 8000 } },
};

export const CLIMATE_ZONES: Record<
  ClimateZone,
  { label: string; description: string }
> = {
  hot_dry: {
    label: "Hot & Dry",
    description: "Rajasthan, Gujarat – thick walls, shaded courtyards",
  },
  hot_humid: {
    label: "Hot & Humid",
    description: "Kerala, coastal areas – raised floor, cross-ventilation",
  },
  cold: {
    label: "Cold",
    description: "Himachal, J&K – sloped roofs, insulated walls",
  },
  composite: {
    label: "Composite",
    description: "Delhi, UP – balanced design for seasonal variation",
  },
  temperate: {
    label: "Temperate",
    description: "Pune, Bangalore – mild climate, open design",
  },
};

export const BUILDING_TYPE_LABELS: Record<string, string> = {
  house: "Residential House",
  apartment: "Apartment / Flat",
  commercial: "Commercial Building",
  villa: "Villa",
  dairyFarm: "Dairy Farm",
  warehouse: "Warehouse",
};

// ─── Pure Utility Functions ───────────────────────────────────────────────────

/** Format a number as Indian Rupee string in lakh notation, e.g. "₹45,00,000" */
export function formatCurrency(amount: number): string {
  const rounded = Math.round(amount);
  // Use Indian locale grouping
  return `₹${rounded.toLocaleString("en-IN")}`;
}

// ─── Calculation Functions ────────────────────────────────────────────────────

export function determineFoundationType(input: BuilderInput): FoundationType {
  if (input.floors >= 4) return "pile";
  if (input.climateZone === "hot_humid") return "raft";
  if (input.floors >= 2) return "strip";
  return "isolated";
}

export function calculateAreas(input: BuilderInput): {
  totalArea: number;
  builtUpArea: number;
  floorArea: number;
} {
  const totalArea = input.plotLength * input.plotWidth; // sq m
  const builtUpArea = totalArea * 0.6;
  const floorArea = builtUpArea * input.floors;
  return { totalArea, builtUpArea, floorArea };
}

// Material cost rate tables keyed by budget
const COST_PER_UNIT: Record<
  BudgetRange,
  {
    cement: number;
    steel: number;
    brick: number;
    sand: number;
    aggregate: number;
  }
> = {
  low: { cement: 350, steel: 55000, brick: 6, sand: 45, aggregate: 35 },
  medium: { cement: 400, steel: 60000, brick: 8, sand: 55, aggregate: 42 },
  high: { cement: 420, steel: 65000, brick: 10, sand: 65, aggregate: 50 },
  luxury: { cement: 450, steel: 72000, brick: 12, sand: 75, aggregate: 58 },
};

const GRADE_LABELS: Record<
  BudgetRange,
  { cement: string; steel: string; brick: string }
> = {
  low: { cement: "PPC 43", steel: "Fe415", brick: "Class B" },
  medium: { cement: "PPC 53", steel: "Fe500", brick: "Class A" },
  high: { cement: "OPC 53", steel: "Fe500D", brick: "Class AA" },
  luxury: { cement: "OPC 53 Premium", steel: "Fe550D", brick: "AAC Block" },
};

const BRAND_LABELS: Record<BudgetRange, { cement: string; steel: string }> = {
  low: { cement: "Ambuja / Wonder", steel: "TATA Tiscon" },
  medium: { cement: "Ultratech", steel: "SAIL / JSW" },
  high: { cement: "Ultratech Premium", steel: "TATA Tiscon 500D" },
  luxury: { cement: "Ultratech Superflow", steel: "Vizag TMT Fe550D" },
};

/** Convert sq m to sq ft */
const SQ_M_TO_SQ_FT = 10.764;

export function generateMaterials(input: BuilderInput): MaterialItem[] {
  const { floorArea } = calculateAreas(input);
  const floorAreaSqFt = floorArea * SQ_M_TO_SQ_FT;
  const br = input.budgetRange;
  const rates = COST_PER_UNIT[br];
  const grades = GRADE_LABELS[br];
  const brands = BRAND_LABELS[br];

  const wallArea = floorAreaSqFt * 0.45; // approx wall fraction

  return [
    {
      name: "Cement Bags (50 kg)",
      quantity: Math.round(floorAreaSqFt * 0.4),
      unit: "bags",
      costPerUnit: rates.cement,
      grade: grades.cement,
      brand: brands.cement,
      category: "cement",
    },
    {
      name: "TMT Steel Bars",
      quantity: Number.parseFloat(((floorAreaSqFt * 4) / 1000).toFixed(2)),
      unit: "MT",
      costPerUnit: rates.steel,
      grade: grades.steel,
      brand: brands.steel,
      category: "steel",
    },
    {
      name: "Bricks / Blocks",
      quantity: Math.round(wallArea * 8),
      unit: "units",
      costPerUnit: rates.brick,
      grade: grades.brick,
      brand: br === "luxury" ? "Siporex / Ultratech" : "Local Kiln",
      category: "brick",
    },
    {
      name: "River Sand",
      quantity: Math.round(floorAreaSqFt * 0.25),
      unit: "CFT",
      costPerUnit: rates.sand,
      grade: "Zone II",
      brand: "Local Approved",
      category: "sand",
    },
    {
      name: "Coarse Aggregates (20mm)",
      quantity: Math.round(floorAreaSqFt * 0.35),
      unit: "CFT",
      costPerUnit: rates.aggregate,
      grade: "20mm Crushed",
      brand: "Local Quarry",
      category: "aggregate",
    },
    {
      name: "Vitrified Floor Tiles",
      quantity: Math.round(floorAreaSqFt),
      unit: "sqft",
      costPerUnit:
        br === "low" ? 35 : br === "medium" ? 65 : br === "high" ? 120 : 220,
      grade: br === "luxury" ? "Italian Marble / Premium" : "Double Charge",
      brand: br === "luxury" ? "Kajaria / RAK" : "Somany / Orient",
      category: "tile",
    },
    {
      name: "Exterior Paint",
      quantity: Math.round(wallArea * 0.05),
      unit: "liters",
      costPerUnit:
        br === "low" ? 120 : br === "medium" ? 180 : br === "high" ? 280 : 450,
      grade: br === "luxury" ? "Texture / Weather Shield" : "Exterior Emulsion",
      brand:
        br === "luxury" ? "Asian Paints Apex Ultima" : "Asian Paints / Berger",
      category: "paint",
    },
    {
      name: "Electrical Wiring & Conduit",
      quantity: Math.round(floorAreaSqFt * 0.12),
      unit: "meter",
      costPerUnit:
        br === "low" ? 25 : br === "medium" ? 40 : br === "high" ? 60 : 100,
      grade: br === "luxury" ? "FRLS 4 sq mm" : "FRLS 2.5 sq mm",
      brand: br === "luxury" ? "Polycab / Havells" : "Havells / Finolex",
      category: "electrical",
    },
    {
      name: "CPVC / UPVC Plumbing Pipes",
      quantity: Math.round(floorAreaSqFt * 0.08),
      unit: "meter",
      costPerUnit:
        br === "low" ? 80 : br === "medium" ? 120 : br === "high" ? 180 : 260,
      grade: br === "luxury" ? "CPVC SCH 40" : "CPVC SCH 80",
      brand: "Astral / Supreme",
      category: "plumbing",
    },
  ];
}

// Stage configuration
interface StageConfig {
  stage: BuildingStage;
  title: string;
  description: string;
  baseManpower: number;
  baseDays: number;
  activities: string[];
  color: string;
  tier: "free" | "premium" | "ultraPremium";
}

const STAGE_CONFIGS: StageConfig[] = [
  {
    stage: "site_prep",
    title: "Site Preparation",
    description:
      "Initial ground work including clearing vegetation, setting out boundaries, and mobilising equipment. Soil tests are conducted to verify bearing capacity before any digging begins.",
    baseManpower: 4,
    baseDays: 5,
    activities: [
      "Site clearing & vegetation removal",
      "Boundary surveying & setting out",
      "Soil testing & bore logs",
      "Levelling & grading",
      "Temporary site office setup",
    ],
    color: "#8B6914",
    tier: "free",
  },
  {
    stage: "foundation",
    title: "Foundation & Basement",
    description:
      "Excavation followed by sub-structure work. Foundation type is chosen based on soil bearing capacity and number of floors. Anti-termite treatment and waterproofing are applied.",
    baseManpower: 8,
    baseDays: 14,
    activities: [
      "Excavation to required depth",
      "Soil preparation & compaction",
      "Anti-termite treatment",
      "Foundation casting (PCC + RCC)",
      "Basement waterproofing",
    ],
    color: "#6B4F2A",
    tier: "free",
  },
  {
    stage: "structure",
    title: "RCC Structure",
    description:
      "The skeletal reinforced concrete framework including columns, beams, and slabs floor by floor. This is the most critical stage for structural integrity and earthquake resistance.",
    baseManpower: 12,
    baseDays: 25,
    activities: [
      "Column reinforcement & casting",
      "Beam shuttering & casting",
      "Slab casting per floor",
      "Staircase structure",
      "Curing & de-shuttering",
    ],
    color: "#7A7A7A",
    tier: "free",
  },
  {
    stage: "roofing",
    title: "Roof & Terrace",
    description:
      "Roof structure, waterproofing membrane, parapet walls, and terrace finishing. Proper slope and drainage provisions are critical to prevent water ingress.",
    baseManpower: 6,
    baseDays: 10,
    activities: [
      "Roof RCC slab / truss structure",
      "Waterproofing membrane application",
      "Parapet walls & coping",
      "Terrace tile / gravel bedding",
      "Roof drainage & outlets",
    ],
    color: "#C2612A",
    tier: "premium",
  },
  {
    stage: "electrical_plumbing",
    title: "Electrical & Plumbing",
    description:
      "Concealed conduit laying, wiring, distribution boards, plumbing riser mains, drainage lines, and sanitary ware rough-in before walls are plastered.",
    baseManpower: 8,
    baseDays: 18,
    activities: [
      "Conduit & wiring layout",
      "DB board installation",
      "Water supply & CPVC piping",
      "Drainage & sewage lines",
      "Bathroom rough-in & traps",
    ],
    color: "#D4A800",
    tier: "premium",
  },
  {
    stage: "finishing",
    title: "Finishing & Cladding",
    description:
      "External and internal plastering, tile/marble laying, window frames, doors, exterior cladding, and external paint. This stage transforms the raw structure into a livable space.",
    baseManpower: 14,
    baseDays: 30,
    activities: [
      "Internal & external plastering",
      "Flooring – tiles / marble / wood",
      "Door & window frame installation",
      "External cladding & texture",
      "Exterior painting & finishing",
    ],
    color: "#4A8F5C",
    tier: "premium",
  },
  {
    stage: "interior",
    title: "Interior & Fit-Out",
    description:
      "Complete interior design and fit-out: modular kitchen, wardrobes, false ceiling, lighting fixtures, sanitary ware, painting, and final furniture placement per room.",
    baseManpower: 10,
    baseDays: 25,
    activities: [
      "Modular kitchen & wardrobes",
      "False ceiling & cornice work",
      "Interior painting & wallpaper",
      "Lighting & electrical fixtures",
      "Bathroom & sanitary fit-out",
      "Furniture placement & décor",
    ],
    color: "#2F6EB5",
    tier: "ultraPremium",
  },
];

export function generateStages(input: BuilderInput): StageDetail[] {
  const { builtUpArea } = calculateAreas(input);
  const areaSqFt = builtUpArea * SQ_M_TO_SQ_FT;
  const scaleFactor = Math.max(1, areaSqFt / 1000);

  return STAGE_CONFIGS.map((cfg) => ({
    stage: cfg.stage,
    title: cfg.title,
    description: cfg.description,
    durationDays: Math.round(
      cfg.baseDays * scaleFactor * (1 + (input.floors - 1) * 0.3),
    ),
    manpower: Math.round(cfg.baseManpower * Math.sqrt(scaleFactor)),
    activities: cfg.activities,
    materials: [],
    color: cfg.color,
    tier: cfg.tier,
  }));
}

export function calculateCost(
  input: BuilderInput,
  materials: MaterialItem[],
): CostBreakdownDetail {
  const { builtUpArea } = calculateAreas(input);
  const builtUpSqFt = builtUpArea * SQ_M_TO_SQ_FT;

  const byCategory: Record<string, number> = {};
  let materialCost = 0;

  for (const m of materials) {
    const lineCost = m.quantity * m.costPerUnit;
    materialCost += lineCost;
    byCategory[m.category] = (byCategory[m.category] ?? 0) + lineCost;
  }

  const laborCost = materialCost * 0.35;

  const finishingMultiplier: Record<BudgetRange, number> = {
    low: 0.1,
    medium: 0.2,
    high: 0.3,
    luxury: 0.5,
  };
  const finishingCost = materialCost * finishingMultiplier[input.budgetRange];

  const totalCost = materialCost + laborCost + finishingCost;
  const costPerSqFt = builtUpSqFt > 0 ? totalCost / builtUpSqFt : 0;

  return {
    materialCost,
    laborCost,
    finishingCost,
    totalCost,
    costPerSqFt,
    byCategory,
  };
}

// ─── Climate Adaptation Messages ──────────────────────────────────────────────
const CLIMATE_ADAPTATIONS: Record<ClimateZone, string[]> = {
  hot_dry: [
    "Thick masonry walls (300mm+) for thermal mass",
    "Shaded courtyards and jali screens for passive cooling",
    "Light-coloured exterior finish to reflect heat",
    "Deep overhangs and chajjas over windows",
  ],
  hot_humid: [
    "Raised plinth (450mm+) for flood protection",
    "Full-length cross-ventilation in all rooms",
    "Anti-corrosion coatings on steel reinforcement",
    "Raft foundation to distribute load on soft soil",
  ],
  cold: [
    "Sloped roof (≥30°) for snow shedding",
    "Double-glazed windows and insulated walls",
    "Protected north-facing external walls",
    "Waterproofing layer under all floor slabs",
  ],
  composite: [
    "Balconies and verandahs for transitional shading",
    "Insulated roof slab to reduce summer heat gain",
    "Deciduous trees on south and west for seasonal shade",
    "Good window-to-wall ratio for natural light & air",
  ],
  temperate: [
    "Large windows on south and east for winter sun",
    "Natural ventilation corridor through the building",
    "Minimal insulation needed – focus on aesthetics",
    "Terrace garden possible – mild climate year-round",
  ],
};

// ─── Orchestrator ─────────────────────────────────────────────────────────────

export function generateBuildingResult(input: BuilderInput): BuilderResult {
  const { totalArea, builtUpArea } = calculateAreas(input);
  const foundationType = determineFoundationType(input);
  const materials = generateMaterials(input);
  const stages = generateStages(input);
  const cost = calculateCost(input, materials);
  const climateAdaptations = CLIMATE_ADAPTATIONS[input.climateZone];
  const vastuCompliance = input.specialRequirements.includes("vastu");

  const styleMap: Record<string, string> = {
    modern: "Flat roof, clean lines, large glass windows",
    traditional: "Sloped roof, carved details, warm textures",
    minimal: "Monochrome palette, uncluttered facades",
    luxury: "Double-height entry, premium cladding, statement lighting",
  };

  return {
    input,
    stages,
    materials,
    cost,
    totalArea,
    builtUpArea,
    foundationType,
    recommendedStyle: styleMap[input.style] ?? input.style,
    climateAdaptations,
    vastuCompliance,
  };
}
