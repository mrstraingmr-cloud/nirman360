import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { type ReactNode, useState } from "react";
import { TIER_ORDER } from "../hooks/useTierAccess";
import { TIER_LABELS } from "../types/index";
import type { UserTier } from "../types/index";
import { UpgradeModal } from "./UpgradeModal";

interface TierAccessGateProps {
  requiredTier: UserTier;
  userTier: UserTier;
  featureName: string;
  children: ReactNode;
  fallback?: ReactNode;
  /** 'block' shows a lock CTA; 'overlay' shows blurred content with lock overlay */
  variant?: "block" | "overlay";
}

function UpgradeCTA({
  requiredTier,
  featureName,
}: {
  requiredTier: UserTier;
  featureName: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const isUltra = requiredTier === "ultraPremium";

  return (
    <>
      <div
        className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-dashed border-border bg-muted/30 text-center"
        data-ocid="tier_gate.block"
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isUltra ? "bg-accent/10" : "bg-primary/10"
          }`}
        >
          <Lock
            className={`w-5 h-5 ${isUltra ? "text-accent" : "text-primary"}`}
          />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {featureName} requires {TIER_LABELS[requiredTier]}
          </p>
          <p className="text-xs text-muted-foreground">
            Upgrade your plan to unlock this feature.
          </p>
        </div>
        <Button
          size="sm"
          className={`mt-1 ${
            isUltra
              ? "bg-accent text-accent-foreground hover:opacity-90"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
          onClick={() => setModalOpen(true)}
          data-ocid="tier_gate.open_modal_button"
        >
          Upgrade to {TIER_LABELS[requiredTier]}
        </Button>
      </div>

      <UpgradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetTier={requiredTier === "free" ? "premium" : requiredTier}
        featureName={featureName}
      />
    </>
  );
}

function OverlayGate({
  requiredTier,
  featureName,
  children,
}: {
  requiredTier: UserTier;
  featureName: string;
  children: ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const isUltra = requiredTier === "ultraPremium";

  return (
    <>
      <div
        className="relative overflow-hidden rounded-lg"
        data-ocid="tier_gate.overlay"
      >
        {/* Blurred preview */}
        <div className="pointer-events-none select-none blur-sm opacity-50">
          {children}
        </div>

        {/* Lock overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/60 backdrop-blur-[2px] rounded-lg">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
              isUltra
                ? "bg-accent/20 border border-accent/30"
                : "bg-primary/20 border border-primary/30"
            }`}
          >
            <Lock
              className={`w-6 h-6 ${isUltra ? "text-accent" : "text-primary"}`}
            />
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-semibold text-foreground">
              {TIER_LABELS[requiredTier]} feature
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {featureName}
            </p>
          </div>
          <Button
            size="sm"
            className={`${
              isUltra
                ? "bg-accent text-accent-foreground hover:opacity-90"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
            onClick={() => setModalOpen(true)}
            data-ocid="tier_gate.open_modal_button"
          >
            Unlock now
          </Button>
        </div>
      </div>

      <UpgradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetTier={requiredTier === "free" ? "premium" : requiredTier}
        featureName={featureName}
      />
    </>
  );
}

/**
 * Gates content behind a tier requirement.
 * - variant="block": renders a lock CTA in place of children (default)
 * - variant="overlay": renders blurred children with a lock overlay
 */
export function TierAccessGate({
  requiredTier,
  userTier,
  featureName,
  children,
  fallback,
  variant = "block",
}: TierAccessGateProps) {
  const hasAccess = TIER_ORDER[userTier] >= TIER_ORDER[requiredTier];

  if (hasAccess) return <>{children}</>;

  if (fallback) return <>{fallback}</>;

  if (variant === "overlay") {
    return (
      <OverlayGate requiredTier={requiredTier} featureName={featureName}>
        {children}
      </OverlayGate>
    );
  }

  return <UpgradeCTA requiredTier={requiredTier} featureName={featureName} />;
}
