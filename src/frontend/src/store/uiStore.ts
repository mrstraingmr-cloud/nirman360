import { create } from "zustand";
import type { DesignCategory, DesignTier } from "../backend";

interface FilterState {
  category: DesignCategory | undefined;
  tier: DesignTier | undefined;
  searchQuery: string;
}

interface UIStore {
  filters: FilterState;
  savedDesignIds: Set<bigint>;
  mobileMenuOpen: boolean;

  setCategory: (cat: DesignCategory | undefined) => void;
  setTier: (tier: DesignTier | undefined) => void;
  setSearchQuery: (q: string) => void;
  resetFilters: () => void;
  optimisticSave: (id: bigint) => void;
  optimisticRemove: (id: bigint) => void;
  setSavedDesignIds: (ids: bigint[]) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  filters: {
    category: undefined,
    tier: undefined,
    searchQuery: "",
  },
  savedDesignIds: new Set(),
  mobileMenuOpen: false,

  setCategory: (cat) =>
    set((state) => ({ filters: { ...state.filters, category: cat } })),
  setTier: (tier) =>
    set((state) => ({ filters: { ...state.filters, tier: tier } })),
  setSearchQuery: (q) =>
    set((state) => ({ filters: { ...state.filters, searchQuery: q } })),
  resetFilters: () =>
    set({ filters: { category: undefined, tier: undefined, searchQuery: "" } }),
  optimisticSave: (id) =>
    set((state) => {
      const next = new Set(state.savedDesignIds);
      next.add(id);
      return { savedDesignIds: next };
    }),
  optimisticRemove: (id) =>
    set((state) => {
      const next = new Set(state.savedDesignIds);
      next.delete(id);
      return { savedDesignIds: next };
    }),
  setSavedDesignIds: (ids) => set({ savedDesignIds: new Set(ids) }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
