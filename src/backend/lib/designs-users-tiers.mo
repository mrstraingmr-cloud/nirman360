import Types "../types/designs-users-tiers";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
  // --- Tier limits ---

  public let FREE_SAVE_LIMIT : Nat = 5;
  public let PREMIUM_SAVE_LIMIT : Nat = 10000;
  public let ULTRA_PREMIUM_SAVE_LIMIT : Nat = 10000;

  // --- Admin principals ---

  public let ADMIN_PRINCIPALS : [Text] = [
    "2vxsx-fae",
  ];

  public func isAdmin(caller : Principal) : Bool {
    let callerText = caller.toText();
    var found = false;
    for (p in ADMIN_PRINCIPALS.values()) {
      if (p == callerText) { found := true };
    };
    found;
  };

  // --- Design helpers ---

  public func toSummary(d : Types.Design) : Types.DesignSummary {
    {
      id = d.id;
      title = d.title;
      category = d.category;
      bhk = d.bhk;
      areaSqft = d.areaSqft;
      estimatedCostMin = d.estimatedCostMin;
      estimatedCostMax = d.estimatedCostMax;
      tier = d.tier;
      previewImageUrl = d.previewImageUrl;
      tags = d.tags;
      createdAt = d.createdAt;
    };
  };

  public func matchesFilter(d : Types.Design, filter : Types.DesignFilter) : Bool {
    let catOk = switch (filter.category) {
      case null true;
      case (?c) d.category == c;
    };
    let tierOk = switch (filter.tier) {
      case null true;
      case (?t) d.tier == t;
    };
    catOk and tierOk;
  };

  public func listDesigns(
    designs : List.List<Types.Design>,
    filter : Types.DesignFilter,
  ) : [Types.DesignSummary] {
    let filtered = designs.filter(func(d) { matchesFilter(d, filter) });
    filtered.map<Types.Design, Types.DesignSummary>(func(d) { toSummary(d) }).toArray();
  };

  public func getDesign(
    designs : List.List<Types.Design>,
    id : Nat,
  ) : ?Types.Design {
    designs.find(func(d) { d.id == id });
  };

  // --- Saved designs (user dashboard) ---

  public func saveDesignLimit(tier : Types.UserTier) : Nat {
    switch (tier) {
      case (#free) FREE_SAVE_LIMIT;
      case (#premium) PREMIUM_SAVE_LIMIT;
      case (#ultraPremium) ULTRA_PREMIUM_SAVE_LIMIT;
    };
  };

  public func saveDesign(
    users : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    designId : Nat,
  ) : { #ok; #notFound; #limitReached; #notAuthenticated } {
    if (caller.isAnonymous()) return #notAuthenticated;
    let profile = getOrCreateProfile(users, caller);
    let saved = profile.savedDesignIds;
    // already saved — idempotent
    for (id in saved.values()) {
      if (id == designId) return #ok;
    };
    let limit = saveDesignLimit(profile.tier);
    if (saved.size() >= limit) return #limitReached;
    profile.savedDesignIds := saved.concat([designId]);
    #ok;
  };

  public func getSavedDesigns(
    users : Map.Map<Principal, Types.UserProfile>,
    designs : List.List<Types.Design>,
    caller : Principal,
  ) : [Types.Design] {
    if (caller.isAnonymous()) return [];
    switch (users.get(caller)) {
      case null [];
      case (?profile) {
        let ids = profile.savedDesignIds;
        let result = List.empty<Types.Design>();
        for (id in ids.values()) {
          switch (designs.find(func(d) { d.id == id })) {
            case (?d) result.add(d);
            case null {};
          };
        };
        result.toArray();
      };
    };
  };

  public func removeSavedDesign(
    users : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    designId : Nat,
  ) : { #ok; #notFound; #notAuthenticated } {
    if (caller.isAnonymous()) return #notAuthenticated;
    switch (users.get(caller)) {
      case null #notFound;
      case (?profile) {
        let old = profile.savedDesignIds;
        let filtered = old.filter(func(id : Nat) : Bool { id != designId });
        if (filtered.size() == old.size()) return #notFound;
        profile.savedDesignIds := filtered;
        #ok;
      };
    };
  };

  // --- User profile ---

  public func getOrCreateProfile(
    users : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
  ) : Types.UserProfile {
    switch (users.get(caller)) {
      case (?p) p;
      case null {
        let profile : Types.UserProfile = {
          principal = caller;
          var displayName = "";
          var email = "";
          var tier = #free;
          createdAt = Time.now();
          var savedDesignIds = [];
        };
        users.add(caller, profile);
        profile;
      };
    };
  };

  public func toPublicProfile(p : Types.UserProfile) : Types.UserProfilePublic {
    {
      principal = p.principal;
      displayName = p.displayName;
      email = p.email;
      tier = p.tier;
      createdAt = p.createdAt;
      savedDesignIds = p.savedDesignIds;
    };
  };

  public func updateProfile(
    users : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    input : Types.UpdateProfileInput,
  ) : { #ok : Types.UserProfilePublic; #notAuthenticated } {
    if (caller.isAnonymous()) return #notAuthenticated;
    let profile = getOrCreateProfile(users, caller);
    profile.displayName := input.displayName;
    profile.email := input.email;
    #ok(toPublicProfile(profile));
  };

  public func setUserTier(
    users : Map.Map<Principal, Types.UserProfile>,
    target : Principal,
    tier : Types.UserTier,
  ) : { #ok; #notFound } {
    switch (users.get(target)) {
      case null #notFound;
      case (?profile) {
        profile.tier := tier;
        #ok;
      };
    };
  };

  // --- Inquiries ---

  public func submitInquiry(
    inquiries : List.List<Types.Inquiry>,
    nextId : Nat,
    caller : ?Principal,
    input : Types.SubmitInquiryInput,
  ) : Types.InquiryPublic {
    let inquiry : Types.Inquiry = {
      id = nextId;
      submitterPrincipal = caller;
      name = input.name;
      email = input.email;
      phone = input.phone;
      projectType = input.projectType;
      description = input.description;
      budgetMin = input.budgetMin;
      budgetMax = input.budgetMax;
      createdAt = Time.now();
      var status = #pending;
    };
    inquiries.add(inquiry);
    toPublicInquiry(inquiry);
  };

  public func toPublicInquiry(i : Types.Inquiry) : Types.InquiryPublic {
    {
      id = i.id;
      submitterPrincipal = i.submitterPrincipal;
      name = i.name;
      email = i.email;
      phone = i.phone;
      projectType = i.projectType;
      description = i.description;
      budgetMin = i.budgetMin;
      budgetMax = i.budgetMax;
      createdAt = i.createdAt;
      status = i.status;
    };
  };

  public func getUserInquiries(
    inquiries : List.List<Types.Inquiry>,
    caller : Principal,
  ) : [Types.InquiryPublic] {
    inquiries
      .filter(func(i) {
        switch (i.submitterPrincipal) {
          case (?p) Principal.equal(p, caller);
          case null false;
        };
      })
      .map<Types.Inquiry, Types.InquiryPublic>(func(i) { toPublicInquiry(i) })
      .toArray();
  };

  public func listAllInquiries(
    inquiries : List.List<Types.Inquiry>,
  ) : [Types.InquiryPublic] {
    inquiries.map<Types.Inquiry, Types.InquiryPublic>(func(i) { toPublicInquiry(i) }).toArray();
  };

  public func updateInquiryStatus(
    inquiries : List.List<Types.Inquiry>,
    id : Nat,
    status : Types.InquiryStatus,
  ) : { #ok; #notFound } {
    var found = false;
    inquiries.mapInPlace(func(i) {
      if (i.id == id) {
        found := true;
        i.status := status;
        i;
      } else { i };
    });
    if (found) #ok else #notFound;
  };

  // --- Cost calculator ---
  // Base cost: ₹1200/sqft
  // Region multiplier: urban 1.3x, semi-urban 1.0x, rural 0.8x
  // Material grade multiplier: basic 0.85x, standard 1.0x, premium 1.4x
  // Breakdown: foundation 15%, structure 30%, roofing 12%, flooring 10%, electrical 8%, plumbing 10%, finishing 15%

  public func calculateCost(input : Types.CostCalculatorInput) : Types.CostCalculatorResult {
    let basePerSqft : Float = 1200.0;
    let regionMult : Float = switch (input.region) {
      case (#urban) 1.3;
      case (#semiUrban) 1.0;
      case (#rural) 0.8;
    };
    let gradeMult : Float = switch (input.materialGrade) {
      case (#basic) 0.85;
      case (#standard) 1.0;
      case (#premium) 1.4;
    };
    let effectivePerSqft : Float = basePerSqft * regionMult * gradeMult;
    let area : Float = input.areaSqft.toFloat();
    let total : Float = effectivePerSqft * area;
    let totalNat : Nat = total.toInt().toNat();
    let costPerSqft : Nat = effectivePerSqft.toInt().toNat();

    let foundation : Nat = totalNat * 15 / 100;
    let structure : Nat = totalNat * 30 / 100;
    let roofing : Nat = totalNat * 12 / 100;
    let flooring : Nat = totalNat * 10 / 100;
    let electrical : Nat = totalNat * 8 / 100;
    let plumbing : Nat = totalNat * 10 / 100;
    let finishing : Nat = totalNat * 15 / 100;

    {
      totalCost = totalNat;
      costPerSqft = costPerSqft;
      breakdown = {
        foundation;
        structure;
        roofing;
        flooring;
        electrical;
        plumbing;
        finishing;
      };
    };
  };

  // --- Seed data ---

  public func seedDesigns(designs : List.List<Types.Design>) {
    if (designs.size() > 0) return; // already seeded
    let t : Types.Timestamp = 0;

    // 1. 1BHK Compact Home
    designs.add({
      id = 1;
      title = "1BHK Compact Urban Home";
      category = #residential;
      bhk = ?1;
      areaSqft = 450;
      estimatedCostMin = 3600000;
      estimatedCostMax = 4500000;
      tier = #free;
      description = "A compact 1BHK home perfect for urban plots. Designed for efficiency with a living room, bedroom, kitchen, and bathroom optimized for a 20x25 ft plot.";
      previewImageUrl = "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "Cement (OPC 53 Grade)"; quantity = 120.0; unit = "bags"; costPerUnit = 380 },
        { name = "Steel TMT Bars"; quantity = 1.2; unit = "tonnes"; costPerUnit = 62000 },
        { name = "River Sand"; quantity = 8.0; unit = "brass"; costPerUnit = 5500 },
        { name = "Crushed Stone Aggregate"; quantity = 10.0; unit = "brass"; costPerUnit = 4200 },
        { name = "Red Bricks"; quantity = 4000.0; unit = "nos"; costPerUnit = 8 },
        { name = "Ceramic Floor Tiles"; quantity = 450.0; unit = "sqft"; costPerUnit = 45 },
        { name = "Wall Putty"; quantity = 8.0; unit = "bags"; costPerUnit = 550 },
        { name = "PVC Plumbing Pipes"; quantity = 80.0; unit = "metres"; costPerUnit = 120 },
        { name = "Electrical Wires"; quantity = 200.0; unit = "metres"; costPerUnit = 35 },
      ];
      constructionSteps = [
        { step = 1; description = "Site clearing, layout marking, soil testing, excavation for foundation trenches, PCC bed, column footings, and plinth beam construction with reinforcement. The ground is prepared meticulously to ensure a stable base for the entire structure. Anti-termite treatment is applied before concreting begins."; durationDays = 19; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Excavation, Column footings, Reinforcement bars, Concrete pouring" },
        { step = 2; description = "Brick masonry walls rise from plinth to lintel level, forming the structural skeleton of the home. Columns and tie beams are cast to bind the masonry into a rigid frame. Door and window openings are formed with proper lintels to carry loads across the gaps."; durationDays = 17; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"Wall framing, Column casting, Lintel beams, Roof slab formwork" },
        { step = 3; description = "All rough-in electrical conduits and plumbing pipes are laid within walls and floors before any plastering begins. Wiring runs are chased into masonry and sleeved for future access. Water supply and drainage lines are pressure-tested to confirm leak-free connections."; durationDays = 9; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Conduit laying, Wiring rough-in, Plumbing pipes, Drainage connections" },
        { step = 4; description = "The roof slab is poured, cured for 28 days, and the building is fully enclosed. Internal and external plastering seals all surfaces, and waterproofing is applied in wet areas and on the terrace. Door and window frames are fixed and the facade is rendered to a smooth finish."; durationDays = 44; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Roof slab pour, Curing, Plastering, Waterproofing, Window fixing" },
        { step = 5; description = "Ceramic floor tiles are laid, bathroom and kitchen tiling is completed, and all electrical switches, lights, and sanitary fittings are installed. Walls receive putty and paint in chosen colours, and final carpentry items such as kitchen shelves and wardrobes are fitted. The home is cleaned, snagged, and made ready for occupation."; durationDays = 20; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Flooring, Tiling, Electrical fittings, Sanitary ware, Painting, Carpentry" },
        { step = 6; description = "Site clearing, layout marking, and soil testing"; durationDays = 3; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Excavation for foundation trenches to 4 ft depth"; durationDays = 4; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "PCC (Plain Cement Concrete) bed and footing construction"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Column and plinth beam construction with reinforcement"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Brick masonry for walls up to lintel level"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Lintel beam casting and door/window frame fixing"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Roof slab shuttering and reinforcement"; durationDays = 4; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "Roof slab concrete pouring and curing (28 days)"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Internal and external plastering"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Flooring, tiling, and waterproofing in wet areas"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "Electrical wiring, switches, and fittings"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Plumbing, sanitary fittings, and painting"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["1bhk", "compact", "urban", "affordable", "450sqft"];
      createdAt = t;
    });

    // 2. 2BHK Standard Home
    designs.add({
      id = 2;
      title = "2BHK Standard Family Home";
      category = #residential;
      bhk = ?2;
      areaSqft = 800;
      estimatedCostMin = 6400000;
      estimatedCostMax = 9600000;
      tier = #free;
      description = "A well-planned 2BHK home for a family of four. Features two bedrooms, attached bathrooms, open kitchen with dining, and a spacious living room on a 30x30 ft plot.";
      previewImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "Cement (OPC 53 Grade)"; quantity = 220.0; unit = "bags"; costPerUnit = 380 },
        { name = "Steel TMT Bars"; quantity = 2.5; unit = "tonnes"; costPerUnit = 62000 },
        { name = "River Sand"; quantity = 15.0; unit = "brass"; costPerUnit = 5500 },
        { name = "Crushed Stone Aggregate"; quantity = 18.0; unit = "brass"; costPerUnit = 4200 },
        { name = "AAC Blocks"; quantity = 1800.0; unit = "nos"; costPerUnit = 52 },
        { name = "Vitrified Floor Tiles"; quantity = 800.0; unit = "sqft"; costPerUnit = 65 },
        { name = "Waterproof Wall Putty"; quantity = 15.0; unit = "bags"; costPerUnit = 550 },
        { name = "CPVC Plumbing Pipes"; quantity = 150.0; unit = "metres"; costPerUnit = 180 },
        { name = "Electrical Cables"; quantity = 500.0; unit = "metres"; costPerUnit = 45 },
        { name = "Modular Kitchen Cabinet"; quantity = 1.0; unit = "set"; costPerUnit = 85000 },
      ];
      constructionSteps = [
        { step = 1; description = "Site survey, layout marking, anti-termite treatment, and excavation for combined footings and plinth. PCC bed is laid and isolated footings are cast with reinforcement. Plinth beams bind the footings into a rigid sub-structure before backfilling and compaction."; durationDays = 26; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Excavation, Anti-termite treatment, Footing casting, Plinth beam, Backfill" },
        { step = 2; description = "Ground floor columns are cast and AAC block masonry fills in all wall panels. Lintels and sills are formed at door and window openings, and window frames are embedded in the masonry. The roof slab formwork, reinforcement, and concrete pour complete the structural skeleton of the home."; durationDays = 53; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"Column casting, AAC masonry, Lintel beams, Slab formwork, Roof pour" },
        { step = 3; description = "CPVC hot and cold water supply lines are run within walls and concealed electrical cables are routed through conduits. Drainage and waste pipes are embedded in floors and walls before plastering locks them in place. All lines are pressure-tested and megger-tested to confirm integrity."; durationDays = 14; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"CPVC supply lines, Conduit wiring, Drain pipes, Pressure testing" },
        { step = 4; description = "After the 28-day slab curing period, formwork is struck and internal and external plastering is applied. Slab waterproofing is completed and the building is fully enclosed with doors and windows fixed into position. The external surface is rendered smooth and ready for paint."; durationDays = 42; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Formwork removal, Internal plaster, External render, Waterproofing, Door/window fixing" },
        { step = 5; description = "Vitrified floor tiles are laid throughout and bathroom walls are tiled to full height. Sanitary ware, modular kitchen cabinets, electrical panels, and light fittings are installed. Walls and ceilings receive two coats of premium emulsion paint, and a final clean-up and snag check completes the project."; durationDays = 24; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Vitrified tiling, Kitchen cabinets, Sanitary fittings, Electrical fittings, Painting" },
        { step = 6; description = "Site survey, layout, and soil bearing test"; durationDays = 4; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Excavation and anti-termite treatment"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "Foundation footing and plinth construction"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Plinth beam and column stubs"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Ground floor column casting"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "AAC block masonry for all walls"; durationDays = 12; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Lintels, sills, and window frame installation"; durationDays = 6; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "Roof slab formwork, reinforcement, and pouring"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Curing period and removal of formwork"; durationDays = 28; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Plastering: internal and external surfaces"; durationDays = 14; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "Flooring, bathroom tiling, and waterproofing"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Electrical, plumbing, and final finishing"; durationDays = 14; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["2bhk", "family", "standard", "800sqft", "ground-floor"];
      createdAt = t;
    });

    // 3. 3BHK Premium Home
    designs.add({
      id = 3;
      title = "3BHK Premium Duplex Home";
      category = #residential;
      bhk = ?3;
      areaSqft = 1500;
      estimatedCostMin = 14400000;
      estimatedCostMax = 21000000;
      tier = #premium;
      description = "An elegant G+1 duplex with 3 bedrooms, a master suite with walk-in wardrobe, spacious drawing-dining, home office nook, and a rooftop garden area on a 40x40 ft plot.";
      previewImageUrl = "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "Cement (OPC 53 Grade)"; quantity = 420.0; unit = "bags"; costPerUnit = 380 },
        { name = "Fe 500 Steel TMT Bars"; quantity = 5.0; unit = "tonnes"; costPerUnit = 65000 },
        { name = "M-Sand (Manufactured Sand)"; quantity = 28.0; unit = "brass"; costPerUnit = 4800 },
        { name = "20mm Crushed Aggregate"; quantity = 35.0; unit = "brass"; costPerUnit = 4200 },
        { name = "AAC Blocks (600x200x200)"; quantity = 3500.0; unit = "nos"; costPerUnit = 52 },
        { name = "Italian Marble Flooring"; quantity = 900.0; unit = "sqft"; costPerUnit = 180 },
        { name = "Granite Kitchen Counter"; quantity = 25.0; unit = "sqft"; costPerUnit = 350 },
        { name = "UPVC Windows Double Glass"; quantity = 12.0; unit = "nos"; costPerUnit = 12000 },
        { name = "Concealed Wiring Cables"; quantity = 1200.0; unit = "metres"; costPerUnit = 55 },
        { name = "CPVC Hot-Cold Pipes"; quantity = 250.0; unit = "metres"; costPerUnit = 220 },
        { name = "False Ceiling Gypsum"; quantity = 600.0; unit = "sqft"; costPerUnit = 85 },
      ];
      constructionSteps = [
        { step = 1; description = "Soil investigation, design approval, permit acquisition, and excavation for isolated and combined footings. Foundation construction begins with anti-termite treatment followed by PCC bed, reinforced footings, and plinth beams. The sub-structure is designed to support a G+1 load with adequate safety margins."; durationDays = 28; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Soil investigation, Isolated footings, Anti-termite, Plinth beam, Backfill compaction" },
        { step = 2; description = "Ground floor RCC columns and tie beams are cast and AAC block masonry fills the wall panels. The first floor slab is formed, reinforced, and concreted, triggering a 35-day curing period. First floor columns, beams, and masonry are then constructed, culminating in the roof slab cast and cured to complete the two-storey skeleton."; durationDays = 80; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"RCC columns, AAC masonry, Floor slab, G+1 framing, Roof slab" },
        { step = 3; description = "Concealed electrical conduits and CPVC hot-cold pipes are embedded in walls and slabs across both floors. Drainage and sewage lines are routed to the external chambers and tested for fall and integrity. MEP sub-contractors coordinate to avoid clashes before plastering seals all conduits permanently."; durationDays = 20; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Concealed conduits, CPVC pipes, Drainage routing, MEP coordination" },
        { step = 4; description = "Internal and external plastering seals both floors and the facade is rendered with a textured exterior finish. UPVC double-glazed windows are fixed and waterproofing is applied on the terrace and wet areas. The building envelope is now complete and weather-tight."; durationDays = 30; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Plastering, UPVC windows, Exterior render, Terrace waterproofing, Facade work" },
        { step = 5; description = "Premium Italian marble flooring is laid and granite kitchen countertops are fixed. False ceilings with gypsum boards are installed throughout and concealed electrical fittings, chandelier points, and fan outlets are finished. Painting, carpentry, and final sanitary ware installations complete the luxurious interior."; durationDays = 35; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Marble flooring, Granite counters, False ceiling, Carpentry, Premium painting" },
        { step = 6; description = "Soil investigation, design approval, and permit"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Site clearing, levels, and layout marking"; durationDays = 3; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "Excavation for isolated and combined footings"; durationDays = 6; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Foundation construction with anti-termite treatment"; durationDays = 12; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Ground floor RCC columns and beams"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Ground floor brick masonry and infill"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "First floor slab casting and curing"; durationDays = 35; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "First floor columns, beams, and masonry"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Roof slab casting and curing"; durationDays = 35; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Internal plastering and waterproofing"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "External rendering and facade work"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Premium flooring, carpentry, and electrical"; durationDays = 25; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["3bhk", "duplex", "premium", "G+1", "1500sqft", "luxury"];
      createdAt = t;
    });

    // 4. Villa
    designs.add({
      id = 4;
      title = "Ultra-Modern 4BHK Villa";
      category = #residential;
      bhk = ?4;
      areaSqft = 3000;
      estimatedCostMin = 42000000;
      estimatedCostMax = 70000000;
      tier = #ultraPremium;
      description = "A stunning contemporary G+2 villa with 4 bedrooms, home theatre, gym, infinity pool, landscaped garden, 3-car garage, and panoramic terrace. Built to highest standards.";
      previewImageUrl = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "M30 Ready-Mix Concrete"; quantity = 200.0; unit = "cum"; costPerUnit = 6500 },
        { name = "Fe 550 High-Strength TMT"; quantity = 18.0; unit = "tonnes"; costPerUnit = 68000 },
        { name = "Aerocon Lightweight Blocks"; quantity = 8000.0; unit = "nos"; costPerUnit = 65 },
        { name = "Italian Marble (Statuario)"; quantity = 2000.0; unit = "sqft"; costPerUnit = 450 },
        { name = "Aluminium Composite Panel"; quantity = 500.0; unit = "sqft"; costPerUnit = 280 },
        { name = "Double-Glazed UPVC Windows"; quantity = 28.0; unit = "nos"; costPerUnit = 18000 },
        { name = "Modular Kitchen (Imported)"; quantity = 1.0; unit = "set"; costPerUnit = 450000 },
        { name = "Smart Home Automation"; quantity = 1.0; unit = "set"; costPerUnit = 350000 },
        { name = "Swimming Pool Construction"; quantity = 1.0; unit = "set"; costPerUnit = 800000 },
        { name = "Solar Panel System (10kW)"; quantity = 1.0; unit = "set"; costPerUnit = 550000 },
      ];
      constructionSteps = [
        { step = 1; description = "Architectural design finalisation, 3D rendering, regulatory approval, and deep foundation construction with pile or raft system as per soil report. Site preparation includes soil testing to 3m depth, dewatering, and precise layout for a G+2 footprint. Basement and plinth are constructed with heavy-duty waterproofing to protect below-grade spaces."; durationDays = 77; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Pile foundation, Raft slab, Deep excavation, Waterproofing, Plinth construction" },
        { step = 2; description = "Ground floor RCC frame and AAC masonry is followed by the first and second floor slabs, frames, and infill masonry. Each floor requires 40-day cycles of formwork, steel placement, concrete pour, curing, and formwork removal. The complete three-storey skeletal frame is engineered for seismic resistance using Fe 550 high-strength TMT bars."; durationDays = 65; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"G+2 RCC frame, AAC masonry, Multi-floor slabs, Seismic design, Cantilever sections" },
        { step = 3; description = "Smart home automation wiring (Lutron), HVAC ducting, electrical distribution boards for each floor, and CPVC hot-cold plumbing systems are all installed in rough-in phase. Home theatre pre-wiring, gym power circuits, and pool pump connections are planned and executed by specialist MEP contractors. Full pressure and continuity testing is carried out before enclosure."; durationDays = 20; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Smart wiring, HVAC ducting, Pool MEP, Multi-floor distribution, Pressure testing" },
        { step = 4; description = "The aluminium curtain wall glazing system and ACP facade cladding are installed by specialist subcontractors, giving the villa its contemporary aesthetic. External waterproofing and render are applied, double-glazed UPVC windows are sealed, and the rooftop terrace membrane is laid. The completed envelope is fully weather-sealed and thermally efficient."; durationDays = 20; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Curtain wall glazing, ACP cladding, UPVC windows, Facade waterproofing, Terrace membrane" },
        { step = 5; description = "Statuario marble is laid on all floors and bespoke carpentry is crafted for built-in wardrobes, a wine cellar, and the home theatre. The infinity pool is finished with imported tiles and pool equipment is commissioned. Smart lighting scenes, HVAC zones, EV chargers, and solar-battery integration are configured, and landscaping with water features completes the handover package."; durationDays = 70; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Marble flooring, Bespoke carpentry, Pool finishing, Smart home setup, Landscaping" },
        { step = 6; description = "Architectural design, 3D rendering, and regulatory approval"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Site preparation, soil testing (3m depth), and layout"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "Deep foundation with pile or raft as per soil report"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Basement and plinth construction with waterproofing"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Ground floor RCC frame and masonry"; durationDays = 25; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "First floor slab, frame, and infill"; durationDays = 40; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Second floor and roof slab construction"; durationDays = 40; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "External facade, cladding, and waterproofing"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Premium internal finishing and false ceilings"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Smart electrical, HVAC, and plumbing"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "Swimming pool, landscaping, and driveway"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Final inspections, snagging, and handover"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["4bhk", "villa", "ultra-luxury", "G+2", "3000sqft", "pool", "smart-home"];
      createdAt = t;
    });

    // 5. G+2 Apartment Building
    designs.add({
      id = 5;
      title = "G+2 Apartment Building (6 Units)";
      category = #apartments;
      bhk = null;
      areaSqft = 4500;
      estimatedCostMin = 54000000;
      estimatedCostMax = 72000000;
      tier = #premium;
      description = "A G+2 residential building with 6 flats (2 per floor), staircase, common lobby, covered parking, and rooftop utility area. Ideal for cooperative housing or rental income.";
      previewImageUrl = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "OPC 53 Cement"; quantity = 1200.0; unit = "bags"; costPerUnit = 380 },
        { name = "Fe 500 TMT Steel"; quantity = 14.0; unit = "tonnes"; costPerUnit = 63000 },
        { name = "M-Sand"; quantity = 80.0; unit = "brass"; costPerUnit = 4800 },
        { name = "20mm Aggregate"; quantity = 100.0; unit = "brass"; costPerUnit = 4200 },
        { name = "AAC Blocks"; quantity = 10000.0; unit = "nos"; costPerUnit = 52 },
        { name = "Vitrified Tiles (2x2)"; quantity = 4500.0; unit = "sqft"; costPerUnit = 70 },
        { name = "Waterproofing Chemical"; quantity = 50.0; unit = "kg"; costPerUnit = 350 },
        { name = "Electrical Panels"; quantity = 6.0; unit = "nos"; costPerUnit = 8500 },
        { name = "Overhead Water Tank"; quantity = 2.0; unit = "nos"; costPerUnit = 25000 },
        { name = "Elevator (6-person)"; quantity = 1.0; unit = "nos"; costPerUnit = 1200000 },
      ];
      constructionSteps = [
        { step = 1; description = "Building plan approval, NOC acquisition, site boundary fencing, and raft foundation casting. Excavation is performed for the combined raft that supports the entire G+2 building with heavy-duty waterproofing applied to the base slab. Plinth beams, stump columns, and backfill are completed before the ground floor work commences."; durationDays = 67; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Raft foundation, NOC, Waterproofing, Plinth beams, Stump columns" },
        { step = 2; description = "Ground floor frame of columns, beams, and slab is cast floor by floor up through the second storey. Each floor cycle involves formwork, TMT steel placement, M30 concrete pour, 28-day curing, and formwork removal, interspersed with AAC block masonry. The terrace slab and parapet wall are cast last, completing the six-unit building skeleton."; durationDays = 120; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"RCC frame, Floor-by-floor casting, AAC masonry, Terrace slab, Parapet wall" },
        { step = 3; description = "Electrical services rough-in is done floor by floor with separate distribution boards for each flat. Water supply, drainage, and firefighting plumbing are routed through common shafts and chased into walls. An overhead water tank and pump room are plumbed to serve all six units simultaneously."; durationDays = 30; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Flat-wise wiring, Common shaft plumbing, Firefighting pipes, Water tanks, Distribution boards" },
        { step = 4; description = "External rendering and paint are applied to the full facade and terrace waterproofing membrane is laid. Common area staircase, lobby, and corridor are plastered and finished to a standard suited for a residential building. The building exterior is weather-sealed and all windows and doors are installed into their frames."; durationDays = 35; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"External render, Terrace waterproofing, Common areas plastering, Window/door installation" },
        { step = 5; description = "Each flat is finished individually with vitrified tiles, bathroom tiling, kitchen fitting, and interior painting. The elevator is installed and commissioned in the shaft that was cast during the structural phase. Fire NOC, occupancy certificate application, and final handover documentation complete the project."; durationDays = 70; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Flat-wise tiling, Kitchen fitting, Elevator installation, Fire NOC, OC application" },
        { step = 6; description = "Building plan approval, NOC, and site boundary"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Excavation for combined raft foundation"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "Raft foundation casting with waterproofing"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Plinth beam, stump columns, and backfill"; durationDays = 12; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Ground floor frame: columns, beams, slab"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Ground floor masonry, plastering, and services rough-in"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "First floor frame, masonry, and services"; durationDays = 35; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "Second floor frame, masonry, and services"; durationDays = 35; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Terrace slab, parapet, and waterproofing"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Common area finishing, staircase, and lobby"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "Flat-wise finishing, tiling, and painting"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Elevator installation, fire NOC, and OC application"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["apartment", "G+2", "6-units", "rental", "4500sqft", "elevator"];
      createdAt = t;
    });

    // 6. G+4 Apartment Building
    designs.add({
      id = 6;
      title = "G+4 Multi-Storey Apartment (20 Units)";
      category = #apartments;
      bhk = null;
      areaSqft = 12000;
      estimatedCostMin = 144000000;
      estimatedCostMax = 200000000;
      tier = #ultraPremium;
      description = "A G+4 multi-storey residential building with 20 flats (4 per floor), two elevators, covered basement parking, clubhouse, and terrace garden. Designed for urban density housing.";
      previewImageUrl = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "M25/M30 Ready-Mix Concrete"; quantity = 1800.0; unit = "cum"; costPerUnit = 6200 },
        { name = "Fe 500D TMT Steel"; quantity = 90.0; unit = "tonnes"; costPerUnit = 65000 },
        { name = "AAC Blocks (200mm thick)"; quantity = 45000.0; unit = "nos"; costPerUnit = 55 },
        { name = "Vitrified Tiles Premium"; quantity = 12000.0; unit = "sqft"; costPerUnit = 85 },
        { name = "Aluminium Doors & Windows"; quantity = 200.0; unit = "nos"; costPerUnit = 8500 },
        { name = "Passenger Elevators"; quantity = 2.0; unit = "nos"; costPerUnit = 2200000 },
        { name = "Fire Fighting System"; quantity = 1.0; unit = "set"; costPerUnit = 1500000 },
        { name = "Generator (125kVA)"; quantity = 1.0; unit = "nos"; costPerUnit = 650000 },
        { name = "STP Plant (50 KLD)"; quantity = 1.0; unit = "nos"; costPerUnit = 1200000 },
        { name = "Solar Rooftop (20kW)"; quantity = 1.0; unit = "set"; costPerUnit = 1100000 },
      ];
      constructionSteps = [
        { step = 1; description = "Structural design, all statutory approvals, environmental clearance, and deep excavation with dewatering for the basement podium. Pile foundation and pile cap construction distributes loads from the five-storey building safely into the ground. Basement retaining walls and podium slab are cast with heavy waterproofing to protect the below-grade parking."; durationDays = 135; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Pile foundation, Deep excavation, Basement retaining walls, Podium slab, Waterproofing" },
        { step = 2; description = "Ground through fourth floor RCC frames are cast in sequence, with each floor requiring a full 28-day curing cycle and masonry infill before the next floor begins. High-strength Fe 500D TMT bars and M25/M30 ready-mix concrete ensure structural integrity for 20 flats and two elevator shafts. The terrace slab and parapet wall complete the five-storey skeleton."; durationDays = 190; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"Multi-storey RCC frame, Fe 500D TMT, Elevator shafts, Floor-by-floor masonry, Terrace slab" },
        { step = 3; description = "Full MEP installation across all five floors including riser shafts for water supply, sewage, and firefighting standpipes. Two passenger elevator shafts receive guide rail brackets and pit work. The entire electrical distribution is designed with independent metering for each flat and a centralised DG backup panel."; durationDays = 45; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"MEP risers, Elevator pit work, Firefighting standpipes, DG panel, Flat-wise metering" },
        { step = 4; description = "External facade with aluminium-framed windows and external paint is applied after plastering is complete on all floors. The terrace garden membrane, parapet waterproofing, and rainwater downpipe network are installed to manage monsoon water safely. Common corridors, staircase, and lobby enclosures are finished and ready for flooring."; durationDays = 60; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Aluminium windows, External paint, Terrace membrane, Parapet waterproofing, Common area enclosure" },
        { step = 5; description = "Twenty flats are finished individually with premium vitrified tiles, modular kitchens, and bathroom fittings. The gym, clubhouse, and terrace garden amenities are built out by specialist interior contractors. Both elevators are installed, tested, and certified; the fire safety system is commissioned; and the occupancy certificate is obtained from the municipal authority."; durationDays = 90; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Flat finishing, Elevator commissioning, Amenities fit-out, Fire safety, Occupancy certificate" },
        { step = 6; description = "Structural design, approvals, and environmental clearance"; durationDays = 60; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Site preparation, dewatering, and deep excavation"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "Pile foundation and pile cap construction"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Basement/podium slab and retaining walls"; durationDays = 25; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Ground floor frame, slab, and masonry"; durationDays = 40; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "First to third floor frames (3 months)"; durationDays = 90; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Fourth floor and terrace slab construction"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "External finishing and facade work"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Mechanical, electrical, and plumbing (MEP)"; durationDays = 45; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Flat-wise finishing and common areas"; durationDays = 40; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "Amenities: gym, clubhouse, landscaping"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Statutory inspections and occupancy certificate"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["apartment", "G+4", "20-units", "multi-storey", "12000sqft", "basement-parking"];
      createdAt = t;
    });

    // 7. Small Dairy Farm
    designs.add({
      id = 7;
      title = "Small Dairy Farm (20 Cattle)";
      category = #dairyFarms;
      bhk = null;
      areaSqft = 2000;
      estimatedCostMin = 12000000;
      estimatedCostMax = 18000000;
      tier = #free;
      description = "A functional dairy farm shed for 20 cattle with proper ventilation, milking area, feed storage, water troughs, and a biogas plant for waste management. Suitable for small farmers.";
      previewImageUrl = "https://images.unsplash.com/photo-1500595046743-cd271d694e30?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "Cement"; quantity = 300.0; unit = "bags"; costPerUnit = 380 },
        { name = "TMT Steel"; quantity = 3.0; unit = "tonnes"; costPerUnit = 62000 },
        { name = "Red Bricks"; quantity = 15000.0; unit = "nos"; costPerUnit = 7 },
        { name = "GI Roofing Sheets"; quantity = 2200.0; unit = "sqft"; costPerUnit = 55 },
        { name = "Rubber Mat Flooring"; quantity = 800.0; unit = "sqft"; costPerUnit = 85 },
        { name = "Water Troughs (Stainless)"; quantity = 4.0; unit = "nos"; costPerUnit = 12000 },
        { name = "Feed Storage Bins"; quantity = 2.0; unit = "nos"; costPerUnit = 18000 },
        { name = "Exhaust Fans (36in)"; quantity = 6.0; unit = "nos"; costPerUnit = 4500 },
        { name = "Biogas Plant (2m3)"; quantity = 1.0; unit = "nos"; costPerUnit = 35000 },
        { name = "Concrete Flooring (4in thick)"; quantity = 2000.0; unit = "sqft"; costPerUnit = 75 },
      ];
      constructionSteps = [
        { step = 1; description = "Site selection for drainage and ventilation, soil levelling and compaction, PCC floor base, and RCC column footings for the cattle shed. Anti-termite treatment is applied below the slab before the concrete base is poured. Plinth beams and column stubs anchor the superstructure to the prepared ground."; durationDays = 17; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Site assessment, Soil levelling, PCC base, Column footings, Plinth beam" },
        { step = 2; description = "Brick masonry walls are raised with strategically placed ventilation openings sized for cross-ventilation to maintain cattle health. Steel trusses are fabricated off-site and erected over the walls to carry the long-span GI roofing. Ridge capping and gutter installation complete the structural enclosure of the 2000 sqft shed."; durationDays = 23; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"Brick masonry, Ventilation openings, Steel truss fabrication, Truss erection, GI roofing" },
        { step = 3; description = "Water supply lines are run to troughs positioned at each cattle bay and drainage channels are formed in the concrete floor to carry effluent to the biogas plant inlet. Electrical conduits are laid for lighting, exhaust fans, and milking equipment power points. The biogas plant inlet and outlet piping is plumbed to the manure collection channel."; durationDays = 11; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Water troughs, Drainage channels, Electrical conduits, Biogas piping, Fan wiring" },
        { step = 4; description = "Anti-slip concrete flooring with a 2% slope towards drainage channels is laid and cured to a hard-wearing surface. Rubber mats are installed at each cattle stall to protect hooves and improve comfort. The shed enclosure is complete with doors, ventilation louvers, and a secure perimeter fence."; durationDays = 7; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Anti-slip flooring, Drainage slope, Rubber mats, Shed doors, Perimeter fencing" },
        { step = 5; description = "Water troughs, stainless steel feed storage bins, and exhaust fans are installed and connected. Electrical wiring is finalised with LED lighting sufficient for night milking operations and the biogas plant is set up and commissioned. Final inspection ensures all animal welfare, safety, and operational requirements are met before cattle are introduced."; durationDays = 5; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Troughs installation, Feed bins, Exhaust fans, LED lighting, Biogas commissioning" },
        { step = 6; description = "Site selection for drainage and ventilation assessment"; durationDays = 2; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Soil levelling and compaction for floor base"; durationDays = 3; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "PCC floor base and column footings"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "RCC column stubs and plinth beam"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Brick masonry walls with ventilation openings"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Steel truss fabrication and erection for roof"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "GI roofing sheet fixing with ridge capping"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "Concrete flooring with anti-slip finish"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Water supply, drainage channels, and troughs"; durationDays = 6; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Electrical installation and biogas plant setup"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["dairy-farm", "cattle", "small", "20-head", "biogas", "agricultural"];
      createdAt = t;
    });

    // 8. Large Dairy Farm
    designs.add({
      id = 8;
      title = "Large Dairy Farm (100 Cattle)";
      category = #dairyFarms;
      bhk = null;
      areaSqft = 8000;
      estimatedCostMin = 48000000;
      estimatedCostMax = 72000000;
      tier = #premium;
      description = "A commercial dairy farm for 100 cattle featuring a milking parlour, milk chilling room, veterinary room, feed mixing area, silage pit, and effluent treatment system.";
      previewImageUrl = "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "Portland Cement"; quantity = 1200.0; unit = "bags"; costPerUnit = 380 },
        { name = "Fe 500 TMT Steel"; quantity = 12.0; unit = "tonnes"; costPerUnit = 63000 },
        { name = "Pre-Engineered Steel Structure"; quantity = 1.0; unit = "set"; costPerUnit = 3500000 },
        { name = "GI Profile Roofing"; quantity = 8000.0; unit = "sqft"; costPerUnit = 60 },
        { name = "Concrete Flooring Slabs"; quantity = 8000.0; unit = "sqft"; costPerUnit = 80 },
        { name = "Milking Machine (10-point)"; quantity = 1.0; unit = "set"; costPerUnit = 800000 },
        { name = "Milk Bulk Cooler (1000L)"; quantity = 1.0; unit = "nos"; costPerUnit = 350000 },
        { name = "Water Storage Tank (50KL)"; quantity = 2.0; unit = "nos"; costPerUnit = 45000 },
        { name = "Effluent Treatment Plant"; quantity = 1.0; unit = "set"; costPerUnit = 500000 },
        { name = "CCTV Surveillance System"; quantity = 1.0; unit = "set"; costPerUnit = 85000 },
      ];
      constructionSteps = [
        { step = 1; description = "Project planning, NABARD loan documentation, land levelling, grading, and foundation construction for main shed and all ancillary buildings. Isolated footings and plinth beams are cast to support the pre-engineered steel structure columns. Boundary wall and internal road base are constructed to establish the farm perimeter."; durationDays = 40; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"NABARD documentation, Land grading, Isolated footings, Plinth beams, Boundary wall" },
        { step = 2; description = "Pre-engineered steel structure components fabricated at the factory are transported to site and erected by specialist teams. Primary and secondary framing is bolted together, followed by GI profile roofing, gutters, and a rainwater harvesting system tied to the storage tanks. The 8000 sqft commercial farm shed is structurally complete."; durationDays = 38; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"PEB fabrication, Steel erection, Roofing, Gutters, Rainwater harvesting" },
        { step = 3; description = "Underground drainage channels, water supply mains, and electrical power cables are laid below the concrete floor before the slab is poured. Milking parlour power circuits, chilling room electrical supply, and feed mixing area power points are pre-wired. Effluent treatment plant inlet piping and biogas digester connections are plumbed."; durationDays = 20; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Underground drainage, Water mains, Power cabling, Milking parlour circuits, ETP plumbing" },
        { step = 4; description = "Reinforced concrete flooring with engineered drainage slopes and anti-slip aggregate finish is poured across the entire 8000 sqft floor area. External yard paving and access roads are completed. The building envelope is fully enclosed with insulated panels, doors, and ventilation louvres, creating a biosecure working environment."; durationDays = 20; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Concrete flooring, Drainage slopes, Yard paving, Insulated panels, Biosecure enclosure" },
        { step = 5; description = "The 10-point milking machine and 1000L bulk milk cooler are installed and commissioned in the dedicated milking parlour. Water storage tanks, automated feeding conveyors, CCTV surveillance, and the effluent treatment and biogas digester systems are commissioned and tested. A full operational trial run verifies all systems before herd introduction."; durationDays = 20; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Milking machine, Bulk cooler, Feeding conveyors, CCTV, ETP commissioning" },
        { step = 6; description = "Project planning, layout design, and NABARD loan prep"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Land levelling, grading, and boundary wall"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "Foundation and plinth for main shed and ancillary buildings"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Pre-engineered steel structure fabrication and erection"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Roofing, gutters, and rainwater harvesting system"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Concrete flooring with drainage channels and slopes"; durationDays = 12; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Milking parlour, chilling room, and feed storage"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "Water supply, underground drainage, and silage pit"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Electrical, milking machinery installation"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "ETP, biogas digester, and manure management"; durationDays = 12; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["dairy-farm", "commercial", "100-head", "milking-parlour", "8000sqft"];
      createdAt = t;
    });

    // 9. Retail Shop
    designs.add({
      id = 9;
      title = "Retail Shop with Storage Room";
      category = #smallBusiness;
      bhk = null;
      areaSqft = 400;
      estimatedCostMin = 2800000;
      estimatedCostMax = 4200000;
      tier = #free;
      description = "A purpose-built retail shop with a 300 sqft selling area, 100 sqft back storage, modern glass facade, LED display area, and separate customer restroom. Ideal for a busy market location.";
      previewImageUrl = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "Cement"; quantity = 100.0; unit = "bags"; costPerUnit = 380 },
        { name = "TMT Steel"; quantity = 1.0; unit = "tonnes"; costPerUnit = 62000 },
        { name = "AAC Blocks"; quantity = 1200.0; unit = "nos"; costPerUnit = 52 },
        { name = "Granite Flooring"; quantity = 400.0; unit = "sqft"; costPerUnit = 120 },
        { name = "Structural Glass Facade"; quantity = 80.0; unit = "sqft"; costPerUnit = 450 },
        { name = "LED Lighting Panels"; quantity = 20.0; unit = "nos"; costPerUnit = 1200 },
        { name = "Aluminium Cladding"; quantity = 120.0; unit = "sqft"; costPerUnit = 220 },
        { name = "Security Roller Shutter"; quantity = 1.0; unit = "nos"; costPerUnit = 35000 },
        { name = "Air Conditioning (1.5T)"; quantity = 2.0; unit = "nos"; costPerUnit = 42000 },
        { name = "CCTV System"; quantity = 1.0; unit = "set"; costPerUnit = 25000 },
      ];
      constructionSteps = [
        { step = 1; description = "Shop layout planning, utility connection survey, and strip footing excavation for load-bearing walls. PCC bed is laid in the trench and reinforced strip footings are cast to carry the masonry walls. Plinth and column construction bring the structure to floor level, ready for wall construction."; durationDays = 11; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Strip footing, PCC bed, Column stubs, Plinth construction, Utility survey" },
        { step = 2; description = "AAC block masonry forms the shop walls and lintel beams span the door and window openings. Roof slab formwork is erected, reinforcement is laid, and concrete is poured for a 30-day curing period. Once cured, the slab is waterproofed and the structural shell of the shop is complete."; durationDays = 43; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"AAC masonry, Lintel beams, Roof slab formwork, Concrete pour, Slab waterproofing" },
        { step = 3; description = "Electrical conduits for shop lighting, AC power points, and display lighting circuits are chased into walls before plastering. Water supply and drain pipes for the customer restroom are embedded in the floor slab and walls. All circuits are tested for continuity and earth continuity before plastering covers the conduits."; durationDays = 7; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Shop lighting circuits, AC wiring, Restroom plumbing, Conduit testing" },
        { step = 4; description = "Internal and external plastering is applied and the structural glass facade is installed by specialist glazing contractors. The security roller shutter is fitted in the main entrance opening and aluminium signage cladding is fixed to the facade. The shop exterior now presents the finished commercial appearance."; durationDays = 12; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Glass facade, Roller shutter, Aluminium cladding, Plastering, Signage board" },
        { step = 5; description = "Premium granite flooring is laid and bathroom tiles are installed in the customer restroom. Split air conditioning units, LED display lighting panels, and CCTV cameras are fitted and commissioned. Final painting, touch-ups, and a thorough snag check bring the retail shop to handover condition."; durationDays = 7; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Granite flooring, Bathroom tiling, AC installation, LED lighting, CCTV fitting" },
        { step = 6; description = "Shop layout planning and utility connection planning"; durationDays = 2; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Foundation strip footing for load-bearing walls"; durationDays = 4; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "Plinth and column construction"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "AAC block masonry and lintel beams"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Roof slab construction and curing"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Plastering and waterproofing of slab"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Glass facade, roller shutter, and signage board"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "Premium granite flooring installation"; durationDays = 4; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Electrical, AC ducting, and LED lighting"; durationDays = 4; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Painting, CCTV, and final fitment"; durationDays = 3; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["shop", "retail", "commercial", "400sqft", "glass-facade"];
      createdAt = t;
    });

    // 10. Office Space
    designs.add({
      id = 10;
      title = "Corporate Office Space (G+1)";
      category = #smallBusiness;
      bhk = null;
      areaSqft = 2400;
      estimatedCostMin = 22000000;
      estimatedCostMax = 32000000;
      tier = #premium;
      description = "A modern G+1 corporate office with open-plan work area, 4 enclosed cabins, conference room, pantry, reception lobby, server room, and 2 restrooms per floor. Professional interiors included.";
      previewImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "OPC 53 Cement"; quantity = 600.0; unit = "bags"; costPerUnit = 380 },
        { name = "Fe 500 TMT Steel"; quantity = 7.0; unit = "tonnes"; costPerUnit = 63000 },
        { name = "AAC Blocks"; quantity = 5000.0; unit = "nos"; costPerUnit = 52 },
        { name = "Vitrified Tiles (600x600)"; quantity = 2400.0; unit = "sqft"; costPerUnit = 90 },
        { name = "Double-Glazed UPVC Windows"; quantity = 20.0; unit = "nos"; costPerUnit = 14000 },
        { name = "Gypsum Board Partitions"; quantity = 800.0; unit = "sqft"; costPerUnit = 120 },
        { name = "False Ceiling Grid Tiles"; quantity = 2000.0; unit = "sqft"; costPerUnit = 95 },
        { name = "VRF Air Conditioning"; quantity = 1.0; unit = "set"; costPerUnit = 650000 },
        { name = "Fire Suppression System"; quantity = 1.0; unit = "set"; costPerUnit = 350000 },
        { name = "Structured Network Cabling"; quantity = 1.0; unit = "set"; costPerUnit = 120000 },
        { name = "Modular Workstations"; quantity = 20.0; unit = "nos"; costPerUnit = 18000 },
      ];
      constructionSteps = [
        { step = 1; description = "Space planning, BOQ preparation, all statutory approvals, and foundation and plinth slab construction for the G+1 office. RCC isolated footings and tie beams are designed to support two floors of office live load. The ground slab is cast with a smooth power-float finish suitable for direct tiling."; durationDays = 22; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"BOQ preparation, Approvals, Isolated footings, Tie beams, Ground slab" },
        { step = 2; description = "Ground floor RCC columns, beams, and masonry form the first floor base, followed by the first floor slab cast and cured. First floor columns, beams, and masonry complete the two-storey office frame. The roof slab is then cast and terrace waterproofing is applied to protect the building from water ingress."; durationDays = 60; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"G+1 RCC frame, Floor slabs, Masonry, Roof slab, Terrace waterproofing" },
        { step = 3; description = "VRF HVAC ductwork and refrigerant lines are run throughout both floors by specialist mechanical contractors. Electrical distribution boards, concealed cabling for workstations, structured network cabling, and fire suppression sprinkler heads are rough-in installed. All MEP systems are coordinated through a BIM drawing to avoid ceiling clashes."; durationDays = 20; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"HVAC ductwork, VRF refrigerant lines, Distribution boards, Network cabling, Sprinkler heads" },
        { step = 4; description = "Double-glazed UPVC windows are installed and the external facade receives aluminium composite panel cladding. Internal and external plastering is applied and the building exterior is painted. The fully enclosed, climate-ready building is ready for interior fit-out."; durationDays = 25; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"UPVC windows, ACP cladding, External paint, Internal plastering, Facade completion" },
        { step = 5; description = "Metal grid false ceilings are installed, gypsum board partitions divide the open floor into cabins and conference rooms, and vitrified tiles are laid. Modular workstations, VRF indoor units, IT infrastructure, and fire safety panels are commissioned. Final painting, furniture fitment, snag clearance, and handover inspections complete the project."; durationDays = 35; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"False ceiling, Gypsum partitions, Vitrified flooring, Workstations, IT & fire commissioning" },
        { step = 6; description = "Space planning, BOQ preparation, and approvals"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Foundation and plinth slab for G+1 structure"; durationDays = 12; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "RCC frame and masonry: ground floor"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "First floor slab, frame, and masonry"; durationDays = 25; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Roof slab and terrace waterproofing"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "External facade with UPVC windows and cladding"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "MEP: HVAC, electrical distribution, plumbing"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "Interior: false ceiling, gypsum partitions"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Flooring, painting, and glass works"; durationDays = 12; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "IT infrastructure, security, and fire safety"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "Furniture fitment and snag clearance"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Final inspections and building handover"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["office", "corporate", "G+1", "2400sqft", "modern", "HVAC"];
      createdAt = t;
    });

    // 11. Warehouse
    designs.add({
      id = 11;
      title = "Industrial Warehouse (10,000 sqft)";
      category = #smallBusiness;
      bhk = null;
      areaSqft = 10000;
      estimatedCostMin = 60000000;
      estimatedCostMax = 90000000;
      tier = #premium;
      description = "A large-span industrial warehouse with 30ft clear height, dock levellers, fire suppression, CCTV, LED high-bay lighting, and a 500 sqft admin office. Suitable for logistics and manufacturing.";
      previewImageUrl = "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "Pre-Engineered Steel Structure"; quantity = 1.0; unit = "set"; costPerUnit = 12000000 },
        { name = "Sandwich Panel Roofing"; quantity = 10000.0; unit = "sqft"; costPerUnit = 95 },
        { name = "RCC Floor Slab (6in thick)"; quantity = 10000.0; unit = "sqft"; costPerUnit = 120 },
        { name = "Cement OPC 53"; quantity = 2000.0; unit = "bags"; costPerUnit = 380 },
        { name = "TMT Steel for Foundation"; quantity = 20.0; unit = "tonnes"; costPerUnit = 63000 },
        { name = "Dock Levellers (Hydraulic)"; quantity = 4.0; unit = "nos"; costPerUnit = 180000 },
        { name = "LED High-Bay Lights (200W)"; quantity = 80.0; unit = "nos"; costPerUnit = 3500 },
        { name = "Fire Sprinkler System"; quantity = 1.0; unit = "set"; costPerUnit = 1200000 },
        { name = "CCTV + Access Control"; quantity = 1.0; unit = "set"; costPerUnit = 250000 },
        { name = "EOT Crane (5T)"; quantity = 2.0; unit = "nos"; costPerUnit = 1500000 },
      ];
      constructionSteps = [
        { step = 1; description = "Site survey and soil investigation are followed by grading, levelling, and column anchor bolt casting for the pre-engineered steel structure. PCC base and isolated footings are designed for the column grid of the large-span warehouse. The foundation is cast with high-strength concrete to handle the point loads from the PEB columns."; durationDays = 34; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Site survey, Soil investigation, Grading, PCC footings, Anchor bolt casting" },
        { step = 2; description = "Pre-engineered steel structure components are fabricated at the factory over 30 days and then transported to site for rapid erection. Primary frames, secondary purlins, and wall girts are bolted together by an erection crew and the sandwich panel roofing and wall cladding panels are fixed. The large-span structural shell is complete in under 30 days of on-site work."; durationDays = 55; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"PEB fabrication, Steel erection, Sandwich roofing, Wall cladding, Bay doors" },
        { step = 3; description = "High-bay LED lighting circuits (200W, 80 fixtures), fire sprinkler system mains and heads, compressed air lines, and power distribution for EOT cranes are all rough-in installed. Dock leveller hydraulic and electrical connections are pre-wired. The electrical panel room and DG connection are configured for the warehouse load demand."; durationDays = 18; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"LED high-bay circuits, Fire sprinklers, EOT crane wiring, Dock leveller connections, DG panel" },
        { step = 4; description = "Six-inch thick reinforced concrete floor slab with industrial hardener is poured in bays across the 10,000 sqft floor area and ground to a smooth, flat surface. Dock leveller pits are formed in the slab at the loading bays. The admin office and perimeter paving are completed to fully enclose the warehouse facility."; durationDays = 25; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Industrial floor slab, Hardener finish, Dock leveller pits, Office enclosure, Yard paving" },
        { step = 5; description = "Two 5-tonne EOT cranes are installed on the runway beams and load-tested by the crane manufacturer. Dock levellers, sectional bay doors, CCTV and access control systems, and the fire suppression system are commissioned. The admin office is fitted out with workstations, and a final inspection clears the warehouse for operational use."; durationDays = 17; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"EOT crane installation, Dock levellers, CCTV, Fire suppression, Office fit-out" },
        { step = 6; description = "Site survey, soil report, and structural design"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Grading, levelling, and boundary marking"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "PCC base and column footings (isolated)"; durationDays = 12; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Pre-engineered structure fabrication at factory"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Column anchor bolts and base plate casting"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Steel structure erection and bolting"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Roofing and wall cladding panel installation"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "RCC floor slab with industrial hardener"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Dock levellers, bay doors, and loading area"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Electrical, high-bay lighting, and fire system"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "EOT crane installation and commissioning"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Office fit-out, paving, and final inspections"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["warehouse", "industrial", "10000sqft", "logistics", "crane", "dock"];
      createdAt = t;
    });

    // 12. Custom Project – Eco Home
    designs.add({
      id = 12;
      title = "Eco-Friendly Sustainable Home";
      category = #custom;
      bhk = ?3;
      areaSqft = 1800;
      estimatedCostMin = 18000000;
      estimatedCostMax = 27000000;
      tier = #premium;
      description = "A passive-design eco home using compressed earth blocks, bamboo structural elements, solar power, rainwater harvesting, and organic waste composting. Net-zero energy target.";
      previewImageUrl = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "Compressed Earth Blocks (CEB)"; quantity = 8000.0; unit = "nos"; costPerUnit = 35 },
        { name = "Bamboo Structural Columns"; quantity = 40.0; unit = "nos"; costPerUnit = 2200 },
        { name = "Ferro-Cement Roof Panels"; quantity = 1800.0; unit = "sqft"; costPerUnit = 120 },
        { name = "Solar PV Panels (350W)"; quantity = 20.0; unit = "nos"; costPerUnit = 22000 },
        { name = "Battery Storage (10kWh)"; quantity = 1.0; unit = "set"; costPerUnit = 380000 },
        { name = "Rainwater Harvesting Tank"; quantity = 1.0; unit = "set"; costPerUnit = 65000 },
        { name = "Constructed Wetland (Greywater)"; quantity = 1.0; unit = "set"; costPerUnit = 85000 },
        { name = "Thermal Lime Plaster"; quantity = 3600.0; unit = "sqft"; costPerUnit = 55 },
        { name = "Natural Oxide Floor Polish"; quantity = 1800.0; unit = "sqft"; costPerUnit = 65 },
        { name = "Bio-Composite Doors"; quantity = 10.0; unit = "nos"; costPerUnit = 18000 },
      ];
      constructionSteps = [
        { step = 1; description = "Passive solar orientation study, site ecology assessment, and rubble stone foundation with lime mortar are completed. The rubble stone foundation uses locally sourced laterite or granite rubble set in hydraulic lime mortar, providing a breathable, moisture-managing sub-structure. The footing is wider than conventional concrete to distribute load over the natural ground."; durationDays = 19; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Solar orientation, Site ecology, Rubble stone foundation, Lime mortar, Natural drainage" },
        { step = 2; description = "Compressed Earth Block (CEB) masonry forms all walls using blocks made from on-site soil with 5-8% cement stabilisation. Bamboo columns and beams are treated with borax solution for durability and erected to carry the roof structure. Ferro-cement roof panels are cast in timber moulds and cured to a lightweight, insulating roof shell."; durationDays = 50; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"CEB masonry, Bamboo columns, Bamboo beams, Ferro-cement roof panels, Curing" },
        { step = 3; description = "Copper plumbing pipes carry hot and cold water to bathrooms and kitchen; rainwater harvesting tank connections and constructed wetland greywater inlet plumbing are installed. Solar PV array mounting rails are fixed to the roof and conduits for DC and AC wiring are run. All plumbing and electrical circuits are tested for integrity before plastering begins."; durationDays = 12; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Copper plumbing, Rainwater connections, Solar conduits, DC/AC wiring, Circuit testing" },
        { step = 4; description = "Thermal lime plaster is applied in two coats to all CEB walls, providing a vapour-permeable, insulating finish that regulates indoor humidity. Bio-composite doors and natural timber windows are fitted into the masonry openings. The fully enclosed eco home is weather-tight and thermally comfortable without mechanical cooling."; durationDays = 26; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Lime plaster (2 coats), Bio-composite doors, Natural windows, Weathertight enclosure" },
        { step = 5; description = "Natural oxide floor polish is applied to the earth floors and solar PV panels with battery storage and a smart inverter are commissioned on the roof. Rainwater harvesting tank, constructed wetland for greywater, and the organic composting system are all connected and tested. Landscaping with native plant species and the energy audit complete the net-zero handover."; durationDays = 22; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Oxide flooring, Solar commissioning, Rainwater system, Greywater wetland, Landscaping" },
        { step = 6; description = "Passive solar orientation and site ecology study"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Rubble stone foundation with lime mortar"; durationDays = 12; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "CEB block masonry for all walls"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Bamboo column and beam framework"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Ferro-cement roof panels casting and curing"; durationDays = 20; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Lime plaster rendering (2 coats)"; durationDays = 14; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Natural flooring and oxide polishing"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "Solar PV, battery, and smart inverter installation"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Rainwater harvesting and greywater system"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Landscaping with native plant species"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "Bio-doors, windows, and natural paints"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Energy audit and commissioning"; durationDays = 3; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["eco", "sustainable", "solar", "3bhk", "net-zero", "bamboo", "custom"];
      createdAt = t;
    });

    // 13. Poultry Farm
    designs.add({
      id = 13;
      title = "Poultry Farm Shed (5000 Broilers)";
      category = #dairyFarms;
      bhk = null;
      areaSqft = 5000;
      estimatedCostMin = 20000000;
      estimatedCostMax = 30000000;
      tier = #premium;
      description = "An environmentally controlled poultry broiler shed for 5000 birds with automated feeding, nipple drinkers, tunnel ventilation, litter management, and biosecurity provisions.";
      previewImageUrl = "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "Pre-Engineered Steel Structure"; quantity = 1.0; unit = "set"; costPerUnit = 6000000 },
        { name = "Insulated Sandwich Panels"; quantity = 5000.0; unit = "sqft"; costPerUnit = 110 },
        { name = "Concrete Flooring (4in thick)"; quantity = 5000.0; unit = "sqft"; costPerUnit = 75 },
        { name = "Tunnel Ventilation Fans (48in)"; quantity = 12.0; unit = "nos"; costPerUnit = 18000 },
        { name = "Evaporative Cooling Pads"; quantity = 200.0; unit = "sqft"; costPerUnit = 850 },
        { name = "Nipple Drinking System"; quantity = 1.0; unit = "set"; costPerUnit = 180000 },
        { name = "Chain Feeder System"; quantity = 1.0; unit = "set"; costPerUnit = 250000 },
        { name = "Brooder Gas Heaters"; quantity = 10.0; unit = "nos"; costPerUnit = 12000 },
        { name = "LED Lighting System"; quantity = 1.0; unit = "set"; costPerUnit = 65000 },
        { name = "Generator (25kVA)"; quantity = 1.0; unit = "nos"; costPerUnit = 280000 },
      ];
      constructionSteps = [
        { step = 1; description = "Biosecurity site selection based on prevailing wind direction and proximity to other farms, followed by site clearing, levelling, and foundation for the 5000 sqft shed. Concrete column footings and plinth beams are cast to support the pre-engineered steel structure. Perimeter biosecurity fencing is erected during the foundation phase."; durationDays = 28; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Biosecurity siting, Levelling, Concrete footings, Plinth beams, Biosecurity fencing" },
        { step = 2; description = "The pre-engineered steel structure is fabricated off-site and erected on the anchor bolts cast into the footings. Insulated sandwich wall panels and insulated roofing panels are fixed to the steel frame, providing a thermally stable environment critical for broiler welfare. The fully enclosed, insulated structural shell is completed in under 25 days of on-site work."; durationDays = 25; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"PEB erection, Insulated wall panels, Insulated roofing, Curtain frames, Structural completion" },
        { step = 3; description = "Nipple drinking system water mains and pressure regulators are plumbed throughout the shed length. Electrical supply for the 12 tunnel ventilation fans, evaporative cooling pad pumps, brooder gas heaters, and LED lighting panels is installed and tested. Generator transfer switch and automatic power management circuits are wired to ensure zero downtime for critical systems."; durationDays = 10; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Nipple drinker plumbing, Fan wiring, Heater circuits, LED lighting, Generator transfer switch" },
        { step = 4; description = "Reinforced concrete floor with a 2% slope for easy litter removal and washdown is poured and finished. Evaporative cooling pad frames and tunnel fan openings are sealed into the insulated panels. The fully biosecure, climate-controlled poultry building is weather-tight and ready for equipment installation."; durationDays = 13; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Sloped concrete floor, Fan openings sealed, Cooling pad frames, Biosecure enclosure" },
        { step = 5; description = "Tunnel ventilation fans, evaporative cooling pads, automated chain feeder, nipple drinking lines, and gas brooder heaters are installed and calibrated. LED lighting, CCTV, and the 25kVA generator are commissioned. A full trial run of the environmental control system verifies temperature, humidity, and ventilation targets before the first flock placement."; durationDays = 12; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Fan installation, Feeder system, Nipple drinkers, Brooders, Generator commissioning" },
        { step = 6; description = "Site selection for wind direction and biosecurity"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Site clearing, levelling, and foundation"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "Steel structure erection and roofing"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Insulated wall panels and curtain installation"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Concrete floor with slope for litter management"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Tunnel fans and evaporative cooling pads"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Drinking and feeding system installation"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "Electrical, lighting, and generator"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Biosecurity gate, footbath, and office"; durationDays = 4; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Trial run, commissioning, and disinfection"; durationDays = 3; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["poultry", "broiler", "5000-birds", "controlled-environment", "agricultural"];
      createdAt = t;
    });

    // 14. 2BHK North Indian Style
    designs.add({
      id = 14;
      title = "2BHK North Indian Style Home";
      category = #residential;
      bhk = ?2;
      areaSqft = 900;
      estimatedCostMin = 7200000;
      estimatedCostMax = 10800000;
      tier = #free;
      description = "A traditional North Indian style 2BHK with a covered verandah, Rajasthani jaali work, courtyard pocket, red oxide flooring, and a tulsi courtyard. Combines heritage with modern amenities.";
      previewImageUrl = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "OPC 53 Cement"; quantity = 240.0; unit = "bags"; costPerUnit = 380 },
        { name = "TMT Steel Fe 500"; quantity = 2.8; unit = "tonnes"; costPerUnit = 63000 },
        { name = "Traditional Red Bricks"; quantity = 20000.0; unit = "nos"; costPerUnit = 8 },
        { name = "Red Oxide Floor Compound"; quantity = 900.0; unit = "sqft"; costPerUnit = 35 },
        { name = "Sandstone Jaali Panels"; quantity = 80.0; unit = "sqft"; costPerUnit = 320 },
        { name = "Teak Wood Doors"; quantity = 6.0; unit = "nos"; costPerUnit = 22000 },
        { name = "Lime Plaster (Heritage Mix)"; quantity = 1800.0; unit = "sqft"; costPerUnit = 45 },
        { name = "RCC Slab Waterproofing"; quantity = 900.0; unit = "sqft"; costPerUnit = 55 },
        { name = "Copper Plumbing Pipes"; quantity = 120.0; unit = "metres"; costPerUnit = 350 },
        { name = "Decorative Ceramic Tiles"; quantity = 300.0; unit = "sqft"; costPerUnit = 85 },
      ];
      constructionSteps = [
        { step = 1; description = "Vastu consultation, traditional layout planning, Bhoomi pooja ceremony, and foundation excavation are the ceremonial and technical start of the project. A lime-surkhi mortar foundation — the traditional North Indian technique — is used instead of modern concrete, providing flexibility and breathability suited to the region's clay soils. Red brick masonry rises from the foundation with lime mortar joints."; durationDays = 17; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"Vastu layout, Bhoomi pooja, Lime-surkhi foundation, Red brick plinth, Foundation excavation" },
        { step = 2; description = "Red traditional brick masonry with lime mortar continues from plinth through the full wall height and RCC tie beams are cast at lintel level for structural integrity. The verandah arched openings and Rajasthani sandstone jaali panels are incorporated into the masonry. The RCC slab is poured and cured for 30 days and immediately waterproofed."; durationDays = 57; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"Red brick masonry, Lime mortar, Sandstone jaali, Arched openings, RCC slab" },
        { step = 3; description = "Copper plumbing pipes — traditional in North Indian heritage construction — carry water to bathrooms and kitchen. Electrical conduits are embedded in the masonry walls for concealed wiring throughout the home. All circuits and plumbing lines are tested before lime plastering seals the walls."; durationDays = 8; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Copper plumbing, Concealed conduits, Bathroom plumbing, Circuit testing" },
        { step = 4; description = "Heritage lime plaster is applied in two coats to all internal and external walls, creating a smooth, vapour-permeable finish characteristic of North Indian architecture. Teak wood door and window frames are installed into the masonry openings and the verandah columns and arched openings are rendered to match. The fully enclosed traditional home is weather-tight and beautiful."; durationDays = 22; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Lime plaster (2 coats), Teak doors, Teak windows, Verandah rendering, Traditional enclosure" },
        { step = 5; description = "Red oxide flooring with geometric patterns is laid and decorative ceramic tiles finish the bathrooms and kitchen. Teak wood carpentry for wardrobes and kitchen shelves is crafted and fitted. The courtyard, tulsi platform, and landscaping are completed, and traditional whitewash with natural pigment painting completes the heritage aesthetic."; durationDays = 28; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Red oxide flooring, Ceramic tiling, Teak carpentry, Courtyard, Heritage painting" },
        { step = 6; description = "Vastu consultation and traditional layout planning"; durationDays = 3; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Bhoomi pooja and foundation excavation"; durationDays = 4; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "Traditional lime-surkhi foundation"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Red brick masonry with lime mortar"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "RCC slab casting and waterproofing"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Sandstone jaali panel installation"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Verandah columns and arched openings"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "Lime plaster rendering in two coats"; durationDays = 12; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Red oxide flooring with geometric patterns"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Teak wood doors, windows, and carpentry"; durationDays = 7; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "Courtyard, tulsi platform, and landscaping"; durationDays = 5; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Electrical, plumbing, and heritage painting"; durationDays = 8; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["2bhk", "north-indian", "traditional", "heritage", "vastu", "verandah"];
      createdAt = t;
    });

    // 15. Custom Contemporary Villa
    designs.add({
      id = 15;
      title = "Custom Contemporary Villa with Pool";
      category = #custom;
      bhk = ?5;
      areaSqft = 5000;
      estimatedCostMin = 90000000;
      estimatedCostMax = 150000000;
      tier = #ultraPremium;
      description = "A bespoke 5BHK contemporary villa with a lap pool, double-height living room, wine cellar, home theatre, professional kitchen, solar+battery grid, and a 1000 sqft landscaped terrace. Fully customizable.";
      previewImageUrl = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800";
      floorPlanImageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800";
      materials = [
        { name = "M35 High-Performance Concrete"; quantity = 500.0; unit = "cum"; costPerUnit = 7500 },
        { name = "Fe 550 Seismic Grade TMT"; quantity = 35.0; unit = "tonnes"; costPerUnit = 70000 },
        { name = "Autoclaved Aerated Concrete Blocks"; quantity = 15000.0; unit = "nos"; costPerUnit = 65 },
        { name = "Italian White Marble (Carrara)"; quantity = 3500.0; unit = "sqft"; costPerUnit = 650 },
        { name = "Aluminium Curtain Wall System"; quantity = 800.0; unit = "sqft"; costPerUnit = 1200 },
        { name = "Infinity Edge Pool Construction"; quantity = 1.0; unit = "set"; costPerUnit = 2500000 },
        { name = "Home Automation (Lutron)"; quantity = 1.0; unit = "set"; costPerUnit = 1500000 },
        { name = "VRF HVAC System"; quantity = 1.0; unit = "set"; costPerUnit = 1800000 },
        { name = "Solar + Battery (30kW+50kWh)"; quantity = 1.0; unit = "set"; costPerUnit = 2200000 },
        { name = "Professional Kitchen (Italian)"; quantity = 1.0; unit = "set"; costPerUnit = 1200000 },
        { name = "Home Theatre Setup"; quantity = 1.0; unit = "set"; costPerUnit = 850000 },
        { name = "Landscaping and Water Features"; quantity = 1.0; unit = "set"; costPerUnit = 1500000 },
      ];
      constructionSteps = [
        { step = 1; description = "Bespoke architectural design with VR walkthrough, structural engineering, full soil investigation, permit acquisition, and raft foundation with post-tensioned slab are the first and most critical phases. Deep excavation and dewatering prepare the site for the large raft foundation that supports the entire 5000 sqft G+2 villa plus pool shell. The post-tensioned raft eliminates columns from the basement and allows an open-plan ground floor layout."; durationDays = 115; stageName = ?"Base & Foundation"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"foundation"; activities = ?"VR design, Soil investigation, Permits, Deep excavation, Post-tensioned raft foundation" },
        { step = 2; description = "Ground floor RCC frame with AAC masonry is followed by upper floor cantilevered sections and the pool shell cast simultaneously with the structural slabs. High-performance M35 concrete and Fe 550 seismic-grade TMT bars are used throughout for the multi-storey frame. The curtain wall glazing bays, rooftop terrace slab, and infinity pool structural shell complete the complex skeleton."; durationDays = 80; stageName = ?"Raw Structure"; stageImageUrl = ?"https://images.unsplash.com/photo-1590725140246-20acddc1ec6e?w=800&q=80"; stageType = ?"structure"; activities = ?"Cantilevered framing, Pool shell, Multi-storey RCC, AAC masonry, Terrace slab" },
        { step = 3; description = "Lutron home automation cable network (Cat 6A, control wiring) is installed throughout the villa for lighting, HVAC, AV, and security scenes. VRF HVAC refrigerant lines and diffuser ductwork are run above every ceiling zone. Full EV charger circuits, solar array DC wiring, and battery room power management are designed and installed to IEC standards."; durationDays = 30; stageName = ?"Electrical & Plumbing"; stageImageUrl = ?"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"; stageType = ?"mep"; activities = ?"Lutron automation wiring, VRF HVAC lines, EV charger circuits, Solar DC wiring, Pool MEP" },
        { step = 4; description = "The aluminium curtain wall system is installed by specialist glazing contractors spanning the double-height living room facade. ACP exterior cladding, waterproofing membranes on the infinity pool deck, terrace garden, and all rooftop surfaces are completed. The villa exterior now presents its full contemporary architectural character with weather-sealed glazing and cladding."; durationDays = 25; stageName = ?"Enclosure & Finishing"; stageImageUrl = ?"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"; stageType = ?"enclosure"; activities = ?"Curtain wall glazing, ACP cladding, Pool deck waterproofing, Terrace membrane, Facade completion" },
        { step = 5; description = "Carrara white marble is laid on all floors and bespoke Italian-designed joinery is crafted for the professional kitchen, wine cellar, and wardrobes. The infinity pool is tiled, pool equipment commissioned, and the home theatre with acoustic panels and 4K projection installed. Solar-battery grid, EV chargers, Lutron smart system, VRF zones, and landscaping with water features bring the bespoke villa to its full handover standard."; durationDays = 74; stageName = ?"Interior & Fit-Out"; stageImageUrl = ?"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"; stageType = ?"interior"; activities = ?"Carrara marble, Bespoke joinery, Pool finishing, Home theatre, Smart home & solar commissioning" },
        { step = 6; description = "Bespoke architectural design, renders, and VR walkthrough"; durationDays = 45; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 7; description = "Structural engineering, soil investigation, and permits"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 8; description = "Site preparation, deep excavation, and dewatering"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 9; description = "Raft foundation with post-tensioned slab"; durationDays = 25; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 10; description = "Ground floor RCC frame and AAC masonry"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 11; description = "Upper floors frame, cantilevered sections, and pool shell"; durationDays = 50; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 12; description = "Curtain wall glazing and facade cladding"; durationDays = 25; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 13; description = "MEP: HVAC, home automation, electrical distribution"; durationDays = 30; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 14; description = "Premium marble, wood flooring, and bespoke carpentry"; durationDays = 35; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 15; description = "Pool finishing, water features, and equipment"; durationDays = 15; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 16; description = "Solar+battery, EV chargers, and smart systems"; durationDays = 10; stageName = null; stageImageUrl = null; stageType = null; activities = null },
        { step = 17; description = "Landscaping, final snagging, and handover ceremony"; durationDays = 14; stageName = null; stageImageUrl = null; stageType = null; activities = null },
      ];
      tags = ["5bhk", "custom", "ultra-luxury", "pool", "smart-home", "solar", "5000sqft"];
      createdAt = t;
    });
  };
};
