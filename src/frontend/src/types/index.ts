export type {
  Design,
  DesignSummary,
  UserProfilePublic,
  CostCalculatorInput,
  CostCalculatorResult,
  CostBreakdown,
  InquiryPublic,
  InquiryStatus,
  SubmitInquiryInput,
  UpdateProfileInput,
  Material,
  MaterialGrade,
  Region,
  DesignFilter,
  Variant_ok_notAuthenticated_notFound,
  Variant_ok_notAuthenticated_notFound_limitReached,
} from "../backend";

// Extended ConstructionStep with 3D stage visualization fields
export interface ConstructionStep {
  step: bigint;
  description: string;
  durationDays: bigint;
  stageName?: string;
  stageImageUrl?: string;
  stageType?: string;
  activities?: string;
}

export type { DesignCategory, DesignTier } from "../backend";

export type UserTier = "free" | "premium" | "ultraPremium";

export interface CategoryMeta {
  id: string;
  label: string;
  description: string;
  image: string;
  count: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  {
    id: "residential",
    label: "Residential Houses",
    description: "1BHK, 2BHK, 3BHK & Villas for every family",
    image: "/assets/generated/house-2bhk.dim_600x400.jpg",
    count: "120+ Designs",
  },
  {
    id: "apartments",
    label: "Apartments & Buildings",
    description: "Multi-unit residential and commercial complexes",
    image: "/assets/generated/apartments-building.dim_600x400.jpg",
    count: "45+ Designs",
  },
  {
    id: "dairyFarms",
    label: "Dairy Farms",
    description: "Agricultural and farm structures built for efficiency",
    image: "/assets/generated/dairy-farm.dim_600x400.jpg",
    count: "30+ Designs",
  },
  {
    id: "smallBusiness",
    label: "Small Business",
    description: "Shops, offices, and warehouses for entrepreneurs",
    image: "/assets/generated/small-business.dim_600x400.jpg",
    count: "55+ Designs",
  },
  {
    id: "custom",
    label: "Custom Projects",
    description: "Bespoke designs tailored to your unique vision",
    image: "/assets/generated/custom-project.dim_600x400.jpg",
    count: "Unlimited",
  },
];

export const TIER_LABELS: Record<string, string> = {
  free: "Free",
  premium: "Premium",
  ultraPremium: "Ultra Premium",
};

export const CATEGORY_LABELS: Record<string, string> = {
  residential: "Residential",
  apartments: "Apartments",
  dairyFarms: "Dairy Farms",
  smallBusiness: "Small Business",
  custom: "Custom",
};
