import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BookOpen,
  Box,
  CheckCircle2,
  Cpu,
  Download,
  FileText,
  Glasses,
  Layers,
  MessageSquare,
  Sliders,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useLocalTier } from "../hooks/useLocalTier";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTier: "premium" | "ultraPremium";
  featureName?: string;
}

const PREMIUM_FEATURES = [
  { icon: FileText, text: "Full 2D floor plans + 3D models" },
  { icon: BookOpen, text: "Step-by-step construction guide" },
  { icon: Box, text: "Material estimation & cost breakdown" },
  { icon: Download, text: "Downloadable PDF plans & elevations" },
];

const ULTRA_FEATURES = [
  { icon: Sparkles, text: "Full 3D construction animation" },
  { icon: Cpu, text: "AI custom design engine" },
  { icon: Glasses, text: "AR/VR walkthrough experience" },
  { icon: Layers, text: "Detailed BOQ & stage-wise cost tracking" },
  { icon: Sliders, text: "Real-time 3D custom editing" },
  { icon: MessageSquare, text: "Built-in AI assistant" },
];

export function UpgradeModal({
  isOpen,
  onClose,
  targetTier,
  featureName,
}: UpgradeModalProps) {
  const { setLocalTier } = useLocalTier();

  const isPremium = targetTier === "premium";
  const tierLabel = isPremium ? "Premium" : "Ultra Premium";
  const price = isPremium ? "₹499–₹999" : "₹1,999–₹4,999";
  const features = isPremium ? PREMIUM_FEATURES : ULTRA_FEATURES;

  function handleUpgrade() {
    setLocalTier(targetTier);
    toast.success(`Upgrade successful! ${tierLabel} features now unlocked.`, {
      duration: 5000,
      icon: "🎉",
    });
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden"
        data-ocid="upgrade.dialog"
      >
        {/* Header band */}
        <div
          className={
            isPremium
              ? "bg-primary px-6 pt-6 pb-4"
              : "bg-gradient-to-br from-amber-500 via-orange-500 to-accent px-6 pt-6 pb-4"
          }
        >
          <div className="flex items-center gap-2 mb-1">
            <Badge
              className={
                isPremium
                  ? "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                  : "bg-black/20 text-white border-white/30"
              }
            >
              {isPremium ? "💎 Premium" : "👑 Ultra Premium"}
            </Badge>
            <span
              className={`text-sm font-mono font-semibold ${isPremium ? "text-primary-foreground/80" : "text-white/80"}`}
            >
              {price} / project
            </span>
          </div>
          <DialogHeader>
            <DialogTitle
              className={`text-xl font-display font-bold ${isPremium ? "text-primary-foreground" : "text-white"}`}
            >
              {featureName
                ? `Unlock "${featureName}"`
                : `Upgrade to ${tierLabel}`}
            </DialogTitle>
            <DialogDescription
              className={`text-sm ${isPremium ? "text-primary-foreground/70" : "text-white/70"}`}
            >
              {isPremium
                ? "Complete building clarity + practical execution tools."
                : "Real-life simulation + customization + expert-level control."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Feature list */}
        <div className="px-6 py-4 space-y-2">
          {features.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <CheckCircle2
                className={`w-4 h-4 flex-shrink-0 ${isPremium ? "text-primary" : "text-accent"}`}
              />
              <Icon className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
              <span className="text-sm text-foreground">{text}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={onClose}
            data-ocid="upgrade.cancel_button"
          >
            Maybe Later
          </Button>
          <Button
            className={`flex-1 font-semibold ${
              isPremium
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-accent text-accent-foreground hover:opacity-90"
            }`}
            onClick={handleUpgrade}
            data-ocid="upgrade.confirm_button"
          >
            Upgrade to {tierLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
