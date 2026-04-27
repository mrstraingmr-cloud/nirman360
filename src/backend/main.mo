import Types "types/designs-users-tiers";
import Lib "lib/designs-users-tiers";
import DesignsMixin "mixins/designs-users-tiers-api";

import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";


actor {
  // ── Stable State ─────────────────────────────────────────────────────────────

  let designs = List.empty<Types.Design>();
  let users = Map.empty<Principal, Types.UserProfile>();
  let inquiries = List.empty<Types.Inquiry>();
  var nextDesignId : Nat = 1;
  let adminPrincipal : Principal = Principal.fromText("2vxsx-fae");

  // ── Seed sample designs on first load ────────────────────────────────────────

  Lib.seedDesigns(designs);

  // ── Mixins ────────────────────────────────────────────────────────────────────

  include DesignsMixin(designs, users, inquiries, nextDesignId, 1, adminPrincipal);
};
