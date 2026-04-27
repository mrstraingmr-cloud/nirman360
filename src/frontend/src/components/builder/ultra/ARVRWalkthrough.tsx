import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Moon, Smartphone, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Room {
  id: string;
  label: string;
  area: string;
  features: string[];
  svgColor: string;
}

const ROOMS: Room[] = [
  {
    id: "living",
    label: "Living Room",
    area: "18 × 14 ft",
    features: [
      "3m ceiling height",
      "Polished marble flooring",
      "Recessed LED lighting",
      "South-facing French doors",
    ],
    svgColor: "#4A8F5C",
  },
  {
    id: "bedroom1",
    label: "Bedroom 1",
    area: "14 × 12 ft",
    features: [
      "2.8m ceiling height",
      "Laminate wood flooring",
      "Warm pendant lighting",
      "Built-in wardrobe wall",
    ],
    svgColor: "#2F6EB5",
  },
  {
    id: "bedroom2",
    label: "Bedroom 2",
    area: "12 × 11 ft",
    features: [
      "2.8m ceiling height",
      "Ceramic tile flooring",
      "Diffused cove lighting",
      "Corner study nook",
    ],
    svgColor: "#6B4F2A",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    area: "10 × 8 ft",
    features: [
      "3m ceiling height",
      "Anti-skid ceramic tiles",
      "Under-cabinet LED strips",
      "Modular chimney + hob",
    ],
    svgColor: "#D4A800",
  },
  {
    id: "bathroom",
    label: "Bathroom",
    area: "8 × 6 ft",
    features: [
      "2.4m ceiling height",
      "Non-slip porcelain tiles",
      "Warm accent lighting",
      "Rain shower + vanity",
    ],
    svgColor: "#4A90A4",
  },
  {
    id: "terrace",
    label: "Terrace",
    area: "20 × 10 ft",
    features: [
      "Open sky exposure",
      "Anti-skid outdoor tiles",
      "String light provision",
      "Glass parapet railing",
    ],
    svgColor: "#C2612A",
  },
];

function RoomSVG({ room, nightMode }: { room: Room; nightMode: boolean }) {
  const bg = nightMode ? "#1a1a2e" : "#f8f8f2";
  const wallColor = nightMode ? "#2d2d4a" : "#e8e0d0";
  const floorColor = `${room.svgColor}${nightMode ? "55" : "33"}`;
  const furnitureColor = `${room.svgColor}${nightMode ? "99" : "77"}`;
  const textColor = nightMode ? "#aaaacc" : "#555566";

  return (
    <svg
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="320" height="200" fill={bg} />
      <polygon
        points="30,120 160,60 290,120 160,180"
        fill={floorColor}
        stroke={wallColor}
        strokeWidth="1.5"
      />
      <polygon
        points="30,120 30,80 160,20 160,60"
        fill={wallColor}
        opacity="0.8"
      />
      <polygon
        points="290,120 290,80 160,20 160,60"
        fill={wallColor}
        opacity="0.6"
      />
      {room.id === "living" && (
        <>
          <polygon
            points="80,140 120,120 140,130 100,150"
            fill={furnitureColor}
          />
          <rect
            x="195"
            y="100"
            width="30"
            height="20"
            fill={furnitureColor}
            rx="2"
            transform="rotate(-30 210 110)"
          />
        </>
      )}
      {room.id === "kitchen" && (
        <>
          <polygon
            points="65,135 105,115 115,120 75,140"
            fill={furnitureColor}
          />
          <polygon
            points="200,115 240,95 250,100 210,120"
            fill={furnitureColor}
          />
        </>
      )}
      {(room.id === "bedroom1" || room.id === "bedroom2") && (
        <polygon
          points="120,150 180,120 200,130 140,160"
          fill={furnitureColor}
        />
      )}
      {room.id === "terrace" && (
        <>
          <polygon
            points="70,145 110,125 120,130 80,150"
            fill={furnitureColor}
            opacity="0.6"
          />
          <line
            x1="30"
            y1="120"
            x2="290"
            y2="120"
            stroke={room.svgColor}
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity="0.4"
          />
        </>
      )}
      <text
        x="160"
        y="195"
        textAnchor="middle"
        fill={textColor}
        fontSize="11"
        fontFamily="sans-serif"
      >
        {room.label}
      </text>
    </svg>
  );
}

interface Props {
  userTier: string;
}

export function ARVRWalkthrough({ userTier: _userTier }: Props) {
  const [activeRoom, setActiveRoom] = useState(0);
  const [vrMode, setVrMode] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const room = ROOMS[activeRoom];

  function changeRoom(idx: number) {
    setDirection(idx > activeRoom ? 1 : -1);
    setActiveRoom(idx);
  }

  return (
    <div
      className={`flex flex-col rounded-xl border border-border overflow-hidden transition-all duration-500 ${vrMode ? "bg-black" : "bg-card"}`}
      data-ocid="arvr_walkthrough.panel"
    >
      {/* Header controls */}
      <div
        className={`flex items-center justify-between gap-2 p-3 border-b flex-wrap ${vrMode ? "border-muted/30" : "border-border"}`}
      >
        <div className="flex items-center gap-2">
          <Eye
            className={`w-4 h-4 ${vrMode ? "text-accent" : "text-primary"}`}
          />
          <span
            className={`text-sm font-semibold ${vrMode ? "text-white" : "text-foreground"}`}
          >
            {vrMode ? "🥽 VR Mode Active" : "Room Walkthrough"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setNightMode((v) => !v)}
            className={`p-1.5 rounded-md transition-smooth ${nightMode ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            aria-label={
              nightMode ? "Switch to day view" : "Switch to night view"
            }
            data-ocid="arvr_walkthrough.day_night_toggle"
          >
            {nightMode ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>
          <Button
            type="button"
            size="sm"
            variant={vrMode ? "destructive" : "default"}
            onClick={() => setVrMode((v) => !v)}
            className="text-xs"
            data-ocid="arvr_walkthrough.vr_toggle"
          >
            {vrMode ? "Exit VR Mode" : "🥽 Enter VR Mode"}
          </Button>
        </div>
      </div>

      {/* Room navigation pills */}
      <div
        className={`flex gap-1.5 p-3 overflow-x-auto ${vrMode ? "bg-muted/5" : "bg-muted/20"}`}
      >
        {ROOMS.map((r, i) => (
          <button
            key={r.id}
            type="button"
            onClick={() => changeRoom(i)}
            data-ocid={`arvr_walkthrough.room.${i + 1}`}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              i === activeRoom
                ? "bg-accent text-accent-foreground shadow-sm"
                : vrMode
                  ? "bg-muted/20 text-muted-foreground hover:bg-muted/40"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Room view */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeRoom}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.35, ease: [0.3, 0, 0.4, 1] }}
          className={`p-4 flex flex-col gap-4 ${vrMode ? "bg-black" : ""}`}
        >
          {/* SVG viewport — single or split */}
          <div
            className={`flex gap-2 rounded-lg overflow-hidden ${vrMode ? "border border-muted/30" : "border border-border"}`}
            style={{
              filter: nightMode ? "brightness(0.7) hue-rotate(200deg)" : "none",
              transition: "filter 0.5s",
            }}
          >
            <div
              className={`flex-1 aspect-video ${vrMode ? "bg-black" : "bg-muted/10"}`}
            >
              <RoomSVG room={room} nightMode={nightMode} />
            </div>
            {vrMode && (
              <div className="flex-1 aspect-video border-l border-muted/30 bg-black">
                <RoomSVG room={room} nightMode={true} />
              </div>
            )}
          </div>

          {vrMode && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs py-1">
              <Smartphone className="w-4 h-4" />
              Tilt your device to look around
            </div>
          )}

          <div className="flex items-start justify-between gap-2">
            <div>
              <p
                className={`font-display font-semibold text-sm ${vrMode ? "text-foreground" : "text-foreground"}`}
              >
                {room.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {room.area}
              </p>
            </div>
            <Badge variant="outline" className="text-xs flex-shrink-0">
              {nightMode ? "🌙 Night" : "☀️ Day"}
            </Badge>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {room.features.map((f) => (
              <li
                key={f.slice(0, 32)}
                className="flex items-start gap-1.5 text-xs text-foreground"
              >
                <span className="text-accent mt-0.5 flex-shrink-0">✦</span> {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
