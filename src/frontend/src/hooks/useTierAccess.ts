import { useCallback, useState } from "react";
import type { UserTier } from "../types/index";

const FREE_PROJECT_KEY = "nirman360_first_project_used";

export const TIER_ORDER: Record<UserTier, number> = {
  free: 0,
  premium: 1,
  ultraPremium: 2,
};

/**
 * Tracks whether the user has consumed their free first project.
 * Uses localStorage key 'nirman360_first_project_used'.
 */
export function useFreeTierStatus() {
  const [hasUsedFreeProject, setHasUsedFreeProject] = useState<boolean>(() => {
    try {
      return localStorage.getItem(FREE_PROJECT_KEY) === "true";
    } catch {
      return false;
    }
  });

  const markFreeProjectUsed = useCallback(() => {
    try {
      localStorage.setItem(FREE_PROJECT_KEY, "true");
    } catch {
      // localStorage unavailable
    }
    setHasUsedFreeProject(true);
  }, []);

  return { hasUsedFreeProject, markFreeProjectUsed };
}

/**
 * Returns true if userTier is >= requiredTier in the tier hierarchy.
 */
export function useTierAllows() {
  return useCallback((userTier: UserTier, requiredTier: UserTier): boolean => {
    return TIER_ORDER[userTier] >= TIER_ORDER[requiredTier];
  }, []);
}

/**
 * Returns true if the user can access a feature, accounting for the free
 * first-project allowance.
 *
 * Access is granted when:
 *   - userTier >= requiredTier, OR
 *   - requiredTier === 'free' AND isFreeProjectAvailable === true
 */
export function useCanAccessFeature() {
  return useCallback(
    (
      userTier: UserTier,
      requiredTier: UserTier,
      isFreeProjectAvailable: boolean,
    ): boolean => {
      if (TIER_ORDER[userTier] >= TIER_ORDER[requiredTier]) return true;
      if (requiredTier === "free" && isFreeProjectAvailable) return true;
      return false;
    },
    [],
  );
}
