import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { UpgradeModal } from "../UpgradeModal";

type UserTier = "free" | "premium" | "ultraPremium";

interface Template {
  id: string;
  name: string;
  emoji: string;
  badge: string;
  specs: string[];
  svgContent: React.ReactNode;
}

interface InteriorTemplatesProps {
  userTier: UserTier;
  onSelect: (template: string) => void;
}

// Simplified furniture SVGs as inline components
function KitchenSVG() {
  return (
    <svg
      viewBox="0 0 200 140"
      className="w-full h-full"
      aria-label="Modern Kitchen layout"
    >
      <title>Modern Kitchen Layout</title>
      <rect width="200" height="140" fill="#fffbeb" />
      {/* L-shaped counter top */}
      <rect
        x="10"
        y="10"
        width="180"
        height="30"
        rx="3"
        fill="#d97706"
        opacity="0.7"
      />
      <rect
        x="10"
        y="10"
        width="30"
        height="100"
        rx="3"
        fill="#d97706"
        opacity="0.7"
      />
      {/* Island */}
      <rect
        x="70"
        y="60"
        width="90"
        height="40"
        rx="4"
        fill="#f59e0b"
        opacity="0.6"
      />
      <text
        x="115"
        y="84"
        textAnchor="middle"
        fontSize="9"
        fill="#92400e"
        fontWeight="600"
      >
        Island
      </text>
      {/* Stools */}
      {[75, 100, 125, 150].map((x) => (
        <circle
          key={x}
          cx={x}
          cy="115"
          r="8"
          fill="#fde68a"
          stroke="#d97706"
          strokeWidth="1.5"
        />
      ))}
      {/* Sink */}
      <rect
        x="80"
        y="13"
        width="40"
        height="22"
        rx="3"
        fill="#bfdbfe"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <text x="100" y="27" textAnchor="middle" fontSize="7" fill="#1e40af">
        Sink
      </text>
      {/* Labels */}
      <text x="100" y="27" textAnchor="middle" fontSize="7" fill="#1e40af" />
      <text
        x="100"
        y="55"
        textAnchor="middle"
        fontSize="7.5"
        fill="#92400e"
        fontStyle="italic"
      >
        L-Shape Counter
      </text>
      <text x="115" y="130" textAnchor="middle" fontSize="7" fill="#b45309">
        Dining Area
      </text>
    </svg>
  );
}

function BedroomSVG() {
  return (
    <svg
      viewBox="0 0 200 140"
      className="w-full h-full"
      aria-label="Luxury Bedroom layout"
    >
      <title>Luxury Bedroom Layout</title>
      <rect width="200" height="140" fill="#f5f3ff" />
      {/* King bed */}
      <rect
        x="50"
        y="30"
        width="100"
        height="70"
        rx="5"
        fill="#c4b5fd"
        stroke="#7c3aed"
        strokeWidth="1.5"
      />
      <rect
        x="50"
        y="30"
        width="100"
        height="20"
        rx="4"
        fill="#8b5cf6"
        opacity="0.8"
      />
      <text
        x="100"
        y="73"
        textAnchor="middle"
        fontSize="9"
        fill="#4c1d95"
        fontWeight="600"
      >
        King Bed
      </text>
      {/* Nightstands */}
      <rect
        x="18"
        y="45"
        width="28"
        height="28"
        rx="3"
        fill="#ddd6fe"
        stroke="#7c3aed"
        strokeWidth="1"
      />
      <rect
        x="154"
        y="45"
        width="28"
        height="28"
        rx="3"
        fill="#ddd6fe"
        stroke="#7c3aed"
        strokeWidth="1"
      />
      {/* Wardrobe */}
      <rect
        x="10"
        y="10"
        width="30"
        height="120"
        rx="3"
        fill="#ede9fe"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      <line
        x1="25"
        y1="10"
        x2="25"
        y2="130"
        stroke="#6d28d9"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <text
        x="25"
        y="72"
        textAnchor="middle"
        fontSize="7"
        fill="#4c1d95"
        transform="rotate(-90 25 72)"
      >
        Wardrobe
      </text>
      {/* Dresser */}
      <rect
        x="162"
        y="10"
        width="28"
        height="50"
        rx="3"
        fill="#ede9fe"
        stroke="#6d28d9"
        strokeWidth="1"
      />
      <text x="176" y="38" textAnchor="middle" fontSize="7" fill="#4c1d95">
        Dresser
      </text>
      {/* Window seating */}
      <rect
        x="55"
        y="116"
        width="90"
        height="18"
        rx="3"
        fill="#c4b5fd"
        opacity="0.6"
      />
      <text x="100" y="128" textAnchor="middle" fontSize="7" fill="#6d28d9">
        Window Seating
      </text>
    </svg>
  );
}

function BathroomSVG() {
  return (
    <svg
      viewBox="0 0 200 140"
      className="w-full h-full"
      aria-label="Minimalist Bathroom layout"
    >
      <title>Minimalist Bathroom Layout</title>
      <rect width="200" height="140" fill="#f0fdfa" />
      {/* Shower cubicle */}
      <rect
        x="120"
        y="10"
        width="70"
        height="70"
        rx="4"
        fill="#99f6e4"
        stroke="#0d9488"
        strokeWidth="1.5"
      />
      <text
        x="155"
        y="48"
        textAnchor="middle"
        fontSize="9"
        fill="#115e59"
        fontWeight="600"
      >
        Shower
      </text>
      <circle cx="155" cy="32" r="8" fill="#5eead4" opacity="0.8" />
      {/* Vanity */}
      <rect
        x="10"
        y="10"
        width="70"
        height="30"
        rx="4"
        fill="#ccfbf1"
        stroke="#0f766e"
        strokeWidth="1.5"
      />
      <text
        x="45"
        y="28"
        textAnchor="middle"
        fontSize="9"
        fill="#134e4a"
        fontWeight="600"
      >
        Vanity
      </text>
      {/* Toilet */}
      <rect
        x="10"
        y="60"
        width="45"
        height="50"
        rx="5"
        fill="#f0fdfa"
        stroke="#0f766e"
        strokeWidth="1.5"
      />
      <ellipse cx="32" cy="85" rx="15" ry="18" fill="#99f6e4" opacity="0.6" />
      <text x="32" y="120" textAnchor="middle" fontSize="8" fill="#134e4a">
        Toilet
      </text>
      {/* Towel rack */}
      <rect
        x="10"
        y="120"
        width="50"
        height="10"
        rx="2"
        fill="#5eead4"
        stroke="#0f766e"
        strokeWidth="1"
      />
      <text x="35" y="129" textAnchor="middle" fontSize="7" fill="#134e4a">
        Towel Rack
      </text>
      {/* Mirror */}
      <rect
        x="10"
        y="42"
        width="70"
        height="15"
        rx="2"
        fill="#e0f2fe"
        stroke="#0284c7"
        strokeWidth="1"
        opacity="0.8"
      />
      <text x="45" y="52" textAnchor="middle" fontSize="7" fill="#0c4a6e">
        Mirror
      </text>
    </svg>
  );
}

const TEMPLATES: Template[] = [
  {
    id: "modern-kitchen",
    name: "Modern Kitchen",
    emoji: "🍳",
    badge: "Most Popular",
    specs: [
      "L-shaped layout with island",
      "Modular cabinets with soft-close",
      "Marble countertop with waterfall edge",
      "Built-in appliances (hob, oven, microwave)",
      "4-seater dining island",
    ],
    svgContent: <KitchenSVG />,
  },
  {
    id: "luxury-bedroom",
    name: "Luxury Bedroom",
    emoji: "🛏️",
    badge: "Premium",
    specs: [
      "King bed — centre placement",
      "Full-height wardrobe on left wall",
      "Dressing table with vanity lighting",
      "Bay window seating with storage",
      "Ambient + task lighting plan",
    ],
    svgContent: <BedroomSVG />,
  },
  {
    id: "minimalist-bathroom",
    name: "Minimalist Bathroom",
    emoji: "🚿",
    badge: "Clean & Efficient",
    specs: [
      "Frameless glass shower cubicle",
      "Floating vanity with under-mount sink",
      "Wall-hung toilet — space saving",
      "Heated towel rack",
      "Large format floor tiles (600×600mm)",
    ],
    svgContent: <BathroomSVG />,
  },
];

export default function InteriorTemplates({
  userTier,
  onSelect,
}: InteriorTemplatesProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const isPremium = userTier === "premium" || userTier === "ultraPremium";

  function handleSelect(id: string) {
    if (!isPremium) {
      setUpgradeOpen(true);
      return;
    }
    setSelected(id);
    onSelect(id);
  }

  return (
    <div className="flex flex-col h-full" data-ocid="interiors.panel">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛋️</span>
          <h2 className="font-display font-semibold text-foreground text-base">
            Interior Templates
          </h2>
        </div>
        <Badge
          variant="outline"
          className="text-xs border-primary/30 text-primary"
        >
          3 Layouts
        </Badge>
      </div>

      {/* Cards grid */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        data-ocid="interiors.list"
      >
        {TEMPLATES.map((t, idx) => {
          const isSelected = selected === t.id;
          return (
            <div
              key={t.id}
              data-ocid={`interiors.item.${idx + 1}`}
              className="rounded-xl border overflow-hidden transition-all duration-200"
              style={{
                borderColor: isSelected ? "#f97316" : "#e2e8f0",
                boxShadow: isSelected ? "0 0 0 2px #f9731640" : "none",
              }}
            >
              {/* SVG preview */}
              <div
                className="relative w-full overflow-hidden border-b border-border"
                style={{ height: 140 }}
              >
                {t.svgContent}
                {!isPremium && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xs font-semibold text-muted-foreground border border-border px-2 py-1 rounded-md bg-card/80">
                      Premium Only
                    </span>
                  </div>
                )}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="px-4 py-3 bg-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{t.emoji}</span>
                    <span className="font-semibold text-sm text-foreground">
                      {t.name}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs border-accent/30 text-accent"
                  >
                    {t.badge}
                  </Badge>
                </div>
                <ul className="space-y-1 mb-3">
                  {t.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-1.5 text-xs text-muted-foreground"
                    >
                      <span className="text-accent mt-0.5">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  className="w-full text-xs font-semibold gap-1.5"
                  style={
                    isSelected
                      ? {
                          background: "#f97316",
                          color: "#fff",
                          borderColor: "#f97316",
                        }
                      : {}
                  }
                  onClick={() => handleSelect(t.id)}
                  data-ocid={`interiors.select_button.${idx + 1}`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Selected
                    </>
                  ) : (
                    "Select Template"
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <UpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        targetTier="premium"
        featureName="Interior Templates"
      />
    </div>
  );
}
