import Types "../types/designs-users-tiers";
import Lib "../lib/designs-users-tiers";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

mixin (
  designs : List.List<Types.Design>,
  users : Map.Map<Principal, Types.UserProfile>,
  inquiries : List.List<Types.Inquiry>,
  nextDesignId : Nat,
  initNextInquiryId : Nat,
  adminPrincipal : Principal,
) {
  var nextInquiryId : Nat = initNextInquiryId;

  // ── Design Catalog ──────────────────────────────────────────────────────────

  public query func listDesigns(filter : Types.DesignFilter) : async [Types.DesignSummary] {
    Lib.listDesigns(designs, filter);
  };

  public query func getDesign(id : Nat) : async ?Types.Design {
    Lib.getDesign(designs, id);
  };

  // ── Saved Designs (auth required) ───────────────────────────────────────────

  public shared ({ caller }) func saveDesign(designId : Nat) : async {
    #ok;
    #notFound;
    #limitReached;
    #notAuthenticated;
  } {
    // verify design exists
    switch (Lib.getDesign(designs, designId)) {
      case null return #notFound;
      case (?_) {};
    };
    Lib.saveDesign(users, caller, designId);
  };

  public shared query ({ caller }) func getSavedDesigns() : async [Types.Design] {
    Lib.getSavedDesigns(users, designs, caller);
  };

  public shared ({ caller }) func removeSavedDesign(designId : Nat) : async {
    #ok;
    #notFound;
    #notAuthenticated;
  } {
    Lib.removeSavedDesign(users, caller, designId);
  };

  // ── User Profile ─────────────────────────────────────────────────────────────

  public shared query ({ caller }) func getMyProfile() : async ?Types.UserProfilePublic {
    if (caller.isAnonymous()) return null;
    switch (users.get(caller)) {
      case null null;
      case (?profile) ?Lib.toPublicProfile(profile);
    };
  };

  public shared ({ caller }) func updateMyProfile(input : Types.UpdateProfileInput) : async {
    #ok : Types.UserProfilePublic;
    #notAuthenticated;
  } {
    Lib.updateProfile(users, caller, input);
  };

  public shared ({ caller }) func adminSetUserTier(target : Principal, tier : Types.UserTier) : async {
    #ok;
    #notFound;
    #notAuthorized;
  } {
    if (not Lib.isAdmin(caller)) return #notAuthorized;
    Lib.setUserTier(users, target, tier);
  };

  // ── Custom Build Inquiries ───────────────────────────────────────────────────

  public shared ({ caller }) func submitInquiry(input : Types.SubmitInquiryInput) : async Types.InquiryPublic {
    let submitter : ?Principal = if (caller.isAnonymous()) null else ?caller;
    let id = nextInquiryId;
    nextInquiryId += 1;
    Lib.submitInquiry(inquiries, id, submitter, input);
  };

  public shared query ({ caller }) func getMyInquiries() : async [Types.InquiryPublic] {
    if (caller.isAnonymous()) return [];
    Lib.getUserInquiries(inquiries, caller);
  };

  public shared query ({ caller }) func adminListAllInquiries() : async [Types.InquiryPublic] {
    if (not Lib.isAdmin(caller)) return [];
    Lib.listAllInquiries(inquiries);
  };

  public shared ({ caller }) func adminUpdateInquiryStatus(id : Nat, status : Types.InquiryStatus) : async {
    #ok;
    #notFound;
    #notAuthorized;
  } {
    if (not Lib.isAdmin(caller)) return #notAuthorized;
    Lib.updateInquiryStatus(inquiries, id, status);
  };

  // ── Cost Calculator ──────────────────────────────────────────────────────────

  public query func calculateCost(input : Types.CostCalculatorInput) : async Types.CostCalculatorResult {
    Lib.calculateCost(input);
  };
};
