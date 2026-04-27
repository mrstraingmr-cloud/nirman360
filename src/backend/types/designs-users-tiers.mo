import Common "common";

module {
  public type DesignCategory = Common.DesignCategory;
  public type DesignTier = Common.DesignTier;
  public type UserTier = Common.UserTier;
  public type Region = Common.Region;
  public type MaterialGrade = Common.MaterialGrade;
  public type InquiryStatus = Common.InquiryStatus;
  public type Timestamp = Common.Timestamp;

  // --- Design Catalog ---

  public type Material = {
    name : Text;
    quantity : Float;
    unit : Text;
    costPerUnit : Nat;
  };

  public type ConstructionStep = {
    step : Nat;
    description : Text;
    durationDays : Nat;
    stageName : ?Text;
    stageImageUrl : ?Text;
    stageType : ?Text;
    activities : ?Text;
  };

  public type Design = {
    id : Nat;
    title : Text;
    category : DesignCategory;
    bhk : ?Nat;
    areaSqft : Nat;
    estimatedCostMin : Nat;
    estimatedCostMax : Nat;
    tier : DesignTier;
    description : Text;
    previewImageUrl : Text;
    floorPlanImageUrl : Text;
    materials : [Material];
    constructionSteps : [ConstructionStep];
    tags : [Text];
    createdAt : Timestamp;
  };

  public type DesignSummary = {
    id : Nat;
    title : Text;
    category : DesignCategory;
    bhk : ?Nat;
    areaSqft : Nat;
    estimatedCostMin : Nat;
    estimatedCostMax : Nat;
    tier : DesignTier;
    previewImageUrl : Text;
    tags : [Text];
    createdAt : Timestamp;
  };

  public type DesignFilter = {
    category : ?DesignCategory;
    tier : ?DesignTier;
  };

  // --- User Profile ---

  public type UserProfile = {
    principal : Principal;
    var displayName : Text;
    var email : Text;
    var tier : UserTier;
    createdAt : Timestamp;
    var savedDesignIds : [Nat];
  };

  public type UserProfilePublic = {
    principal : Principal;
    displayName : Text;
    email : Text;
    tier : UserTier;
    createdAt : Timestamp;
    savedDesignIds : [Nat];
  };

  public type UpdateProfileInput = {
    displayName : Text;
    email : Text;
  };

  // --- Custom Build Inquiries ---

  public type Inquiry = {
    id : Nat;
    submitterPrincipal : ?Principal;
    name : Text;
    email : Text;
    phone : Text;
    projectType : Text;
    description : Text;
    budgetMin : Nat;
    budgetMax : Nat;
    createdAt : Timestamp;
    var status : InquiryStatus;
  };

  public type InquiryPublic = {
    id : Nat;
    submitterPrincipal : ?Principal;
    name : Text;
    email : Text;
    phone : Text;
    projectType : Text;
    description : Text;
    budgetMin : Nat;
    budgetMax : Nat;
    createdAt : Timestamp;
    status : InquiryStatus;
  };

  public type SubmitInquiryInput = {
    name : Text;
    email : Text;
    phone : Text;
    projectType : Text;
    description : Text;
    budgetMin : Nat;
    budgetMax : Nat;
  };

  // --- Cost Calculator ---

  public type CostCalculatorInput = {
    areaSqft : Nat;
    region : Region;
    materialGrade : MaterialGrade;
  };

  public type CostBreakdown = {
    foundation : Nat;
    structure : Nat;
    roofing : Nat;
    flooring : Nat;
    electrical : Nat;
    plumbing : Nat;
    finishing : Nat;
  };

  public type CostCalculatorResult = {
    totalCost : Nat;
    costPerSqft : Nat;
    breakdown : CostBreakdown;
  };
};
