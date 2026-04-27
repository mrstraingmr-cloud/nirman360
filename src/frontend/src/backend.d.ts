import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface DesignFilter {
    tier?: DesignTier;
    category?: DesignCategory;
}
export interface CostCalculatorInput {
    region: Region;
    materialGrade: MaterialGrade;
    areaSqft: bigint;
}
export interface UserProfilePublic {
    principal: Principal;
    displayName: string;
    createdAt: Timestamp;
    tier: UserTier;
    email: string;
    savedDesignIds: Array<bigint>;
}
export interface Material {
    costPerUnit: bigint;
    name: string;
    unit: string;
    quantity: number;
}
export interface Design {
    id: bigint;
    bhk?: bigint;
    floorPlanImageUrl: string;
    title: string;
    createdAt: Timestamp;
    tags: Array<string>;
    tier: DesignTier;
    description: string;
    materials: Array<Material>;
    estimatedCostMax: bigint;
    estimatedCostMin: bigint;
    areaSqft: bigint;
    category: DesignCategory;
    constructionSteps: Array<ConstructionStep>;
    previewImageUrl: string;
}
export interface UpdateProfileInput {
    displayName: string;
    email: string;
}
export interface SubmitInquiryInput {
    projectType: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    budgetMax: bigint;
    budgetMin: bigint;
}
export interface DesignSummary {
    id: bigint;
    bhk?: bigint;
    title: string;
    createdAt: Timestamp;
    tags: Array<string>;
    tier: DesignTier;
    estimatedCostMax: bigint;
    estimatedCostMin: bigint;
    areaSqft: bigint;
    category: DesignCategory;
    previewImageUrl: string;
}
export interface CostCalculatorResult {
    costPerSqft: bigint;
    breakdown: CostBreakdown;
    totalCost: bigint;
}
export interface CostBreakdown {
    roofing: bigint;
    foundation: bigint;
    structure: bigint;
    plumbing: bigint;
    electrical: bigint;
    finishing: bigint;
    flooring: bigint;
}
export interface ConstructionStep {
    durationDays: bigint;
    step: bigint;
    activities?: string;
    description: string;
    stageImageUrl?: string;
    stageName?: string;
    stageType?: string;
}
export interface InquiryPublic {
    id: bigint;
    status: InquiryStatus;
    projectType: string;
    submitterPrincipal?: Principal;
    name: string;
    createdAt: Timestamp;
    description: string;
    email: string;
    phone: string;
    budgetMax: bigint;
    budgetMin: bigint;
}
export enum DesignCategory {
    custom = "custom",
    residential = "residential",
    apartments = "apartments",
    smallBusiness = "smallBusiness",
    dairyFarms = "dairyFarms"
}
export enum DesignTier {
    ultraPremium = "ultraPremium",
    premium = "premium",
    free = "free"
}
export enum InquiryStatus {
    responded = "responded",
    pending = "pending",
    reviewed = "reviewed"
}
export enum MaterialGrade {
    premium = "premium",
    basic = "basic",
    standard = "standard"
}
export enum Region {
    semiUrban = "semiUrban",
    urban = "urban",
    rural = "rural"
}
export enum Variant_ok_notAuthenticated_notFound {
    ok = "ok",
    notAuthenticated = "notAuthenticated",
    notFound = "notFound"
}
export enum Variant_ok_notAuthenticated_notFound_limitReached {
    ok = "ok",
    notAuthenticated = "notAuthenticated",
    notFound = "notFound",
    limitReached = "limitReached"
}
export enum Variant_ok_notAuthorized_notFound {
    ok = "ok",
    notAuthorized = "notAuthorized",
    notFound = "notFound"
}
export interface backendInterface {
    adminListAllInquiries(): Promise<Array<InquiryPublic>>;
    adminSetUserTier(target: Principal, tier: UserTier): Promise<Variant_ok_notAuthorized_notFound>;
    adminUpdateInquiryStatus(id: bigint, status: InquiryStatus): Promise<Variant_ok_notAuthorized_notFound>;
    calculateCost(input: CostCalculatorInput): Promise<CostCalculatorResult>;
    getDesign(id: bigint): Promise<Design | null>;
    getMyInquiries(): Promise<Array<InquiryPublic>>;
    getMyProfile(): Promise<UserProfilePublic | null>;
    getSavedDesigns(): Promise<Array<Design>>;
    listDesigns(filter: DesignFilter): Promise<Array<DesignSummary>>;
    removeSavedDesign(designId: bigint): Promise<Variant_ok_notAuthenticated_notFound>;
    saveDesign(designId: bigint): Promise<Variant_ok_notAuthenticated_notFound_limitReached>;
    submitInquiry(input: SubmitInquiryInput): Promise<InquiryPublic>;
    updateMyProfile(input: UpdateProfileInput): Promise<{
        __kind__: "ok";
        ok: UserProfilePublic;
    } | {
        __kind__: "notAuthenticated";
        notAuthenticated: null;
    }>;
}
