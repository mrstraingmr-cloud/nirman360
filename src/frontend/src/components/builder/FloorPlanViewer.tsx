import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { useRef, useState } from "react";
import type { FloorPlanData } from "../../data/floorPlans";
import { UpgradeModal } from "../UpgradeModal";

type UserTier = "free" | "premium" | "ultraPremium";

interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  dims: string;
  type:
    | "living"
    | "bedroom"
    | "kitchen"
    | "bathroom"
    | "utility"
    | "outdoor"
    | "staircase";
}

interface FloorPlanViewerProps {
  userTier: UserTier;
  floorPlanData?: FloorPlanData;
}

const ROOM_COLORS: Record<
  Room["type"],
  { fill: string; stroke: string; label: string }
> = {
  living: { fill: "#e0f2fe", stroke: "#0369a1", label: "#0369a1" },
  bedroom: { fill: "#ede9fe", stroke: "#7c3aed", label: "#6d28d9" },
  kitchen: { fill: "#fef3c7", stroke: "#d97706", label: "#b45309" },
  bathroom: { fill: "#ccfbf1", stroke: "#0f766e", label: "#0f766e" },
  utility: { fill: "#f1f5f9", stroke: "#64748b", label: "#475569" },
  outdoor: { fill: "#dcfce7", stroke: "#16a34a", label: "#15803d" },
  staircase: { fill: "#fce7f3", stroke: "#db2777", label: "#be185d" },
};

// Default ground floor rooms (SVG viewport 600×400)
const GROUND_ROOMS: Room[] = [
  {
    x: 10,
    y: 10,
    w: 110,
    h: 90,
    name: "Car Park",
    dims: "10×9 ft",
    type: "utility",
  },
  {
    x: 120,
    y: 10,
    w: 170,
    h: 90,
    name: "Garden",
    dims: "Open Area",
    type: "outdoor",
  },
  {
    x: 290,
    y: 10,
    w: 300,
    h: 90,
    name: "Garden",
    dims: "30×9 ft",
    type: "outdoor",
  },
  {
    x: 10,
    y: 100,
    w: 580,
    h: 130,
    name: "Living Room",
    dims: "14×16 ft",
    type: "living",
  },
  {
    x: 10,
    y: 230,
    w: 280,
    h: 90,
    name: "Dining",
    dims: "10×12 ft",
    type: "living",
  },
  {
    x: 290,
    y: 230,
    w: 300,
    h: 90,
    name: "Bedroom 1",
    dims: "12×14 ft",
    type: "bedroom",
  },
  {
    x: 10,
    y: 320,
    w: 160,
    h: 70,
    name: "Kitchen",
    dims: "8×10 ft",
    type: "kitchen",
  },
  {
    x: 170,
    y: 320,
    w: 80,
    h: 70,
    name: "Toilet",
    dims: "4×6 ft",
    type: "bathroom",
  },
  {
    x: 250,
    y: 320,
    w: 120,
    h: 70,
    name: "Staircase",
    dims: "6×8 ft",
    type: "staircase",
  },
  {
    x: 370,
    y: 320,
    w: 220,
    h: 70,
    name: "Store",
    dims: "8×7 ft",
    type: "utility",
  },
  {
    x: 10,
    y: 390,
    w: 580,
    h: 30,
    name: "Back Utility / Open Space",
    dims: "",
    type: "utility",
  },
];

// Default first floor rooms
const FIRST_ROOMS: Room[] = [
  {
    x: 10,
    y: 10,
    w: 580,
    h: 60,
    name: "Glass Balcony",
    dims: "30×6 ft",
    type: "outdoor",
  },
  {
    x: 10,
    y: 70,
    w: 580,
    h: 130,
    name: "Bedroom 2",
    dims: "14×16 ft",
    type: "bedroom",
  },
  {
    x: 10,
    y: 200,
    w: 580,
    h: 110,
    name: "Bedroom 3",
    dims: "12×14 ft",
    type: "bedroom",
  },
  {
    x: 10,
    y: 310,
    w: 280,
    h: 80,
    name: "Family Lounge",
    dims: "Open Plan",
    type: "living",
  },
  {
    x: 290,
    y: 310,
    w: 130,
    h: 80,
    name: "Toilet",
    dims: "5×8 ft",
    type: "bathroom",
  },
  {
    x: 420,
    y: 310,
    w: 170,
    h: 80,
    name: "Open Terrace",
    dims: "16×8 ft",
    type: "outdoor",
  },
];

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

export default function FloorPlanViewer({
  userTier,
  floorPlanData,
}: FloorPlanViewerProps) {
  const [floor, setFloor] = useState<"ground" | "first">("ground");
  const [zoom, setZoom] = useState(1);
  const [tooltip, setTooltip] = useState<{
    room: Room;
    x: number;
    y: number;
  } | null>(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const isPremium = userTier === "premium" || userTier === "ultraPremium";

  // Use provided floor plan data or fall back to defaults
  const groundRooms: Room[] = floorPlanData
    ? (floorPlanData.ground as Room[])
    : GROUND_ROOMS;
  const firstRooms: Room[] = floorPlanData?.first
    ? (floorPlanData.first as Room[])
    : FIRST_ROOMS;
  const hasFirstFloor = floorPlanData ? !!floorPlanData.first : true;

  const rooms = floor === "ground" ? groundRooms : firstRooms;

  const VW = 600;
  const VH = 430;
  const scaledW = VW / zoom;
  const scaledH = VH / zoom;
  const viewBox = `0 0 ${scaledW} ${scaledH}`;

  const plotLabel =
    floorPlanData?.label ?? "Plot: 30×50 ft | Modern Minimal Flat Roof";

  function handleRoomClick() {
    if (!isPremium) setUpgradeOpen(true);
  }

  function handleRoomHover(e: React.MouseEvent<SVGRectElement>, room: Room) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltip({
      room,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div className="flex flex-col h-full" data-ocid="floorplan.panel">
      {/* Header controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-lg">📐</span>
          <h2 className="font-display font-semibold text-foreground text-base">
            2D Floor Plans
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {/* Floor switcher */}
          <div className="flex rounded-lg overflow-hidden border border-border text-xs font-medium">
            <button
              type="button"
              onClick={() => setFloor("ground")}
              data-ocid="floorplan.ground_floor.tab"
              className="px-3 py-1.5 transition-colors"
              style={
                floor === "ground"
                  ? { background: "#1e3a5f", color: "#fff" }
                  : { background: "transparent", color: "#64748b" }
              }
            >
              Ground Floor
            </button>
            {hasFirstFloor && (
              <button
                type="button"
                onClick={() => setFloor("first")}
                data-ocid="floorplan.first_floor.tab"
                className="px-3 py-1.5 border-l border-border transition-colors"
                style={
                  floor === "first"
                    ? { background: "#1e3a5f", color: "#fff" }
                    : { background: "transparent", color: "#64748b" }
                }
              >
                First Floor
              </button>
            )}
          </div>
          {/* Zoom controls */}
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-7 w-7"
            aria-label="Zoom in"
            data-ocid="floorplan.zoom_in.button"
            onClick={() => setZoom((z) => clamp(z + 0.2, 0.6, 2.4))}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-7 w-7"
            aria-label="Zoom out"
            data-ocid="floorplan.zoom_out.button"
            onClick={() => setZoom((z) => clamp(z - 0.2, 0.6, 2.4))}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-7 w-7"
            aria-label="Reset zoom"
            data-ocid="floorplan.zoom_reset.button"
            onClick={() => setZoom(1)}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* SVG canvas */}
      <div className="relative flex-1 overflow-hidden bg-muted/20 p-3">
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="w-full h-full"
          style={{
            maxHeight: "360px",
            cursor: isPremium ? "default" : "pointer",
          }}
          onClick={handleRoomClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleRoomClick();
          }}
          onMouseLeave={() => setTooltip(null)}
          role="img"
          aria-label={`${floor === "ground" ? "Ground" : "First"} floor plan — ${plotLabel}`}
          data-ocid="floorplan.svg_canvas"
        >
          {/* Background grid */}
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width={VW} height={VH} fill="url(#grid)" />

          {/* Rooms */}
          {rooms.map((room) => {
            const c = ROOM_COLORS[room.type];
            const midX = room.x + room.w / 2;
            const midY = room.y + room.h / 2;
            const fontSize = room.w < 100 || room.h < 40 ? 7 : 9;
            const roomKey = `${floor}-${room.name}-${room.x}-${room.y}`;
            const roomIdx = rooms.indexOf(room) + 1;
            return (
              <g
                key={roomKey}
                data-ocid={`floorplan.room.${roomIdx}`}
                style={{ cursor: isPremium ? "crosshair" : "pointer" }}
              >
                <rect
                  x={room.x}
                  y={room.y}
                  width={room.w}
                  height={room.h}
                  fill={c.fill}
                  stroke={c.stroke}
                  strokeWidth="1.5"
                  rx="2"
                  onMouseMove={(e) => handleRoomHover(e, room)}
                  onMouseLeave={() => setTooltip(null)}
                />
                <text
                  x={midX}
                  y={midY - (room.dims ? 5 : 0)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={fontSize}
                  fontWeight="600"
                  fill={c.label}
                  style={{ userSelect: "none", pointerEvents: "none" }}
                >
                  {room.name}
                </text>
                {room.dims && room.h > 35 && (
                  <text
                    x={midX}
                    y={midY + fontSize + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={fontSize - 1}
                    fill={c.label}
                    opacity={0.75}
                    style={{ userSelect: "none", pointerEvents: "none" }}
                  >
                    {room.dims}
                  </text>
                )}
              </g>
            );
          })}

          {/* Plot label */}
          <text
            x={VW / 2}
            y={VH - 5}
            textAnchor="middle"
            fontSize="8"
            fill="#94a3b8"
            fontStyle="italic"
          >
            {plotLabel}
          </text>
        </svg>

        {/* Hover tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-20 px-2.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium shadow-lg"
            style={{ left: tooltip.x + 12, top: tooltip.y - 8, maxWidth: 180 }}
          >
            <span className="font-semibold">{tooltip.room.name}</span>
            {tooltip.room.dims && (
              <span className="ml-2 opacity-70">{tooltip.room.dims}</span>
            )}
          </div>
        )}

        {/* Free tier overlay */}
        {!isPremium && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-md gap-3">
            <div className="text-center px-6">
              <div className="text-3xl mb-2">📐</div>
              <p className="font-semibold text-foreground text-sm mb-1">
                2D Floor Plans
              </p>
              <p className="text-muted-foreground text-xs mb-4">
                Interactive floor plans with room dimensions and layout details.
              </p>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:opacity-90 gap-1.5 text-xs"
                onClick={() => setUpgradeOpen(true)}
                data-ocid="floorplan.upgrade_button"
              >
                Unlock with Premium
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      {isPremium && (
        <div className="px-4 py-2 border-t border-border bg-muted/10 flex flex-wrap gap-x-4 gap-y-1">
          {Object.entries(ROOM_COLORS).map(([type, c]) => (
            <div
              key={type}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <span
                className="inline-block w-3 h-3 rounded-sm border"
                style={{ background: c.fill, borderColor: c.stroke }}
              />
              <span className="capitalize">{type}</span>
            </div>
          ))}
        </div>
      )}

      <UpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        targetTier="premium"
        featureName="2D Floor Plans"
      />
    </div>
  );
}
