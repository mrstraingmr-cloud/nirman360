// ─── Domain Enums / Unions ────────────────────────────────────────────────────

export type BuildingType =
  | "house"
  | "apartment"
  | "commercial"
  | "villa"
  | "dairyFarm"
  | "warehouse";

export type BuildingStyle = "modern" | "traditional" | "minimal" | "luxury";

export type BudgetRange = "low" | "medium" | "high" | "luxury";

export type FoundationType = "isolated" | "raft" | "pile" | "strip";

export type ClimateZone =
  | "hot_dry"
  | "hot_humid"
  | "cold"
  | "composite"
  | "temperate";

export type SpecialRequirement =
  | "parking"
  | "garden"
  | "vastu"
  | "basement"
  | "terrace"
  | "swimming_pool"
  | "solar";

export type BuildingStage =
  | "site_prep"
  | "foundation"
  | "structure"
  | "roofing"
  | "electrical_plumbing"
  | "finishing"
  | "interior";

export type BuilderFormStep =
  | "plot"
  | "location"
  | "building"
  | "budget"
  | "style"
  | "requirements"
  | "review";

// ─── Core Interfaces ──────────────────────────────────────────────────────────

export interface BuilderInput {
  /** Plot length in metres */
  plotLength: number;
  /** Plot width in metres */
  plotWidth: number;
  location: string;
  climateZone: ClimateZone;
  buildingType: BuildingType;
  /** 1–10 */
  floors: number;
  budgetRange: BudgetRange;
  style: BuildingStyle;
  specialRequirements: SpecialRequirement[];
}

export interface MaterialItem {
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  grade: string;
  brand: string;
  category:
    | "cement"
    | "steel"
    | "brick"
    | "sand"
    | "aggregate"
    | "wood"
    | "glass"
    | "paint"
    | "tile"
    | "electrical"
    | "plumbing"
    | "finishing";
}

export interface StageDetail {
  stage: BuildingStage;
  title: string;
  description: string;
  durationDays: number;
  manpower: number;
  activities: string[];
  materials: MaterialItem[];
  /** Hex colour used for 3-D stage rendering */
  color: string;
  /** Minimum tier required to access this stage */
  tier: "free" | "premium" | "ultraPremium";
}

export interface CostBreakdownDetail {
  materialCost: number;
  laborCost: number;
  finishingCost: number;
  totalCost: number;
  costPerSqFt: number;
  byCategory: Record<string, number>;
}

export interface BuilderResult {
  input: BuilderInput;
  stages: StageDetail[];
  materials: MaterialItem[];
  cost: CostBreakdownDetail;
  totalArea: number;
  builtUpArea: number;
  foundationType: FoundationType;
  recommendedStyle: string;
  climateAdaptations: string[];
  vastuCompliance: boolean;
}
