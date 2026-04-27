import { useCallback, useState } from "react";
import type { UserTier } from "../types/index";

const STORAGE_KEY = "nirman360_user_tier";
const VALID_TIERS: UserTier[] = ["free", "premium", "ultraPremium"];

function readTierFromStorage(): UserTier {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_TIERS.includes(stored as UserTier)) {
      return stored as UserTier;
    }
  } catch {
    // localStorage unavailable
  }
  return "free";
}

/**
 * Reads and writes the user's tier from localStorage.
 * Falls back to 'free' if not set or invalid.
 * Enables the free-first project experience without requiring auth.
 */
export function useLocalTier() {
  const [localTier, setLocalTierState] =
    useState<UserTier>(readTierFromStorage);

  const setLocalTier = useCallback((tier: UserTier) => {
    try {
      localStorage.setItem(STORAGE_KEY, tier);
    } catch {
      // localStorage unavailable
    }
    setLocalTierState(tier);
  }, []);

  return { localTier, setLocalTier };
}
