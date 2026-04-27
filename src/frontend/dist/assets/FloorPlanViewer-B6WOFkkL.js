import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, B as Button } from "./index-V48KFtBG.js";
import { P as Primitive } from "./index-CF2_vi6k.js";
import { U as UpgradeModal } from "./UpgradeModal-3hs19KMP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomOut = createLucideIcon("zoom-out", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const ROOM_COLORS = {
  living: { fill: "#e0f2fe", stroke: "#0369a1", label: "#0369a1" },
  bedroom: { fill: "#ede9fe", stroke: "#7c3aed", label: "#6d28d9" },
  kitchen: { fill: "#fef3c7", stroke: "#d97706", label: "#b45309" },
  bathroom: { fill: "#ccfbf1", stroke: "#0f766e", label: "#0f766e" },
  utility: { fill: "#f1f5f9", stroke: "#64748b", label: "#475569" },
  outdoor: { fill: "#dcfce7", stroke: "#16a34a", label: "#15803d" },
  staircase: { fill: "#fce7f3", stroke: "#db2777", label: "#be185d" }
};
const GROUND_ROOMS = [
  {
    x: 10,
    y: 10,
    w: 110,
    h: 90,
    name: "Car Park",
    dims: "10×9 ft",
    type: "utility"
  },
  {
    x: 120,
    y: 10,
    w: 170,
    h: 90,
    name: "Garden",
    dims: "Open Area",
    type: "outdoor"
  },
  {
    x: 290,
    y: 10,
    w: 300,
    h: 90,
    name: "Garden",
    dims: "30×9 ft",
    type: "outdoor"
  },
  {
    x: 10,
    y: 100,
    w: 580,
    h: 130,
    name: "Living Room",
    dims: "14×16 ft",
    type: "living"
  },
  {
    x: 10,
    y: 230,
    w: 280,
    h: 90,
    name: "Dining",
    dims: "10×12 ft",
    type: "living"
  },
  {
    x: 290,
    y: 230,
    w: 300,
    h: 90,
    name: "Bedroom 1",
    dims: "12×14 ft",
    type: "bedroom"
  },
  {
    x: 10,
    y: 320,
    w: 160,
    h: 70,
    name: "Kitchen",
    dims: "8×10 ft",
    type: "kitchen"
  },
  {
    x: 170,
    y: 320,
    w: 80,
    h: 70,
    name: "Toilet",
    dims: "4×6 ft",
    type: "bathroom"
  },
  {
    x: 250,
    y: 320,
    w: 120,
    h: 70,
    name: "Staircase",
    dims: "6×8 ft",
    type: "staircase"
  },
  {
    x: 370,
    y: 320,
    w: 220,
    h: 70,
    name: "Store",
    dims: "8×7 ft",
    type: "utility"
  },
  {
    x: 10,
    y: 390,
    w: 580,
    h: 30,
    name: "Back Utility / Open Space",
    dims: "",
    type: "utility"
  }
];
const FIRST_ROOMS = [
  {
    x: 10,
    y: 10,
    w: 580,
    h: 60,
    name: "Glass Balcony",
    dims: "30×6 ft",
    type: "outdoor"
  },
  {
    x: 10,
    y: 70,
    w: 580,
    h: 130,
    name: "Bedroom 2",
    dims: "14×16 ft",
    type: "bedroom"
  },
  {
    x: 10,
    y: 200,
    w: 580,
    h: 110,
    name: "Bedroom 3",
    dims: "12×14 ft",
    type: "bedroom"
  },
  {
    x: 10,
    y: 310,
    w: 280,
    h: 80,
    name: "Family Lounge",
    dims: "Open Plan",
    type: "living"
  },
  {
    x: 290,
    y: 310,
    w: 130,
    h: 80,
    name: "Toilet",
    dims: "5×8 ft",
    type: "bathroom"
  },
  {
    x: 420,
    y: 310,
    w: 170,
    h: 80,
    name: "Open Terrace",
    dims: "16×8 ft",
    type: "outdoor"
  }
];
function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}
function FloorPlanViewer({
  userTier,
  floorPlanData
}) {
  const [floor, setFloor] = reactExports.useState("ground");
  const [zoom, setZoom] = reactExports.useState(1);
  const [tooltip, setTooltip] = reactExports.useState(null);
  const [upgradeOpen, setUpgradeOpen] = reactExports.useState(false);
  const svgRef = reactExports.useRef(null);
  const isPremium = userTier === "premium" || userTier === "ultraPremium";
  const groundRooms = floorPlanData ? floorPlanData.ground : GROUND_ROOMS;
  const firstRooms = (floorPlanData == null ? void 0 : floorPlanData.first) ? floorPlanData.first : FIRST_ROOMS;
  const hasFirstFloor = floorPlanData ? !!floorPlanData.first : true;
  const rooms = floor === "ground" ? groundRooms : firstRooms;
  const VW = 600;
  const VH = 430;
  const scaledW = VW / zoom;
  const scaledH = VH / zoom;
  const viewBox = `0 0 ${scaledW} ${scaledH}`;
  const plotLabel = (floorPlanData == null ? void 0 : floorPlanData.label) ?? "Plot: 30×50 ft | Modern Minimal Flat Roof";
  function handleRoomClick() {
    if (!isPremium) setUpgradeOpen(true);
  }
  function handleRoomHover(e, room) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltip({
      room,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "floorplan.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "📐" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "2D Floor Plans" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-lg overflow-hidden border border-border text-xs font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFloor("ground"),
              "data-ocid": "floorplan.ground_floor.tab",
              className: "px-3 py-1.5 transition-colors",
              style: floor === "ground" ? { background: "#1e3a5f", color: "#fff" } : { background: "transparent", color: "#64748b" },
              children: "Ground Floor"
            }
          ),
          hasFirstFloor && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setFloor("first"),
              "data-ocid": "floorplan.first_floor.tab",
              className: "px-3 py-1.5 border-l border-border transition-colors",
              style: floor === "first" ? { background: "#1e3a5f", color: "#fff" } : { background: "transparent", color: "#64748b" },
              children: "First Floor"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "icon",
            variant: "outline",
            className: "h-7 w-7",
            "aria-label": "Zoom in",
            "data-ocid": "floorplan.zoom_in.button",
            onClick: () => setZoom((z) => clamp(z + 0.2, 0.6, 2.4)),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "icon",
            variant: "outline",
            className: "h-7 w-7",
            "aria-label": "Zoom out",
            "data-ocid": "floorplan.zoom_out.button",
            onClick: () => setZoom((z) => clamp(z - 0.2, 0.6, 2.4)),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "icon",
            variant: "outline",
            className: "h-7 w-7",
            "aria-label": "Reset zoom",
            "data-ocid": "floorplan.zoom_reset.button",
            onClick: () => setZoom(1),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 overflow-hidden bg-muted/20 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          ref: svgRef,
          viewBox,
          className: "w-full h-full",
          style: {
            maxHeight: "360px",
            cursor: isPremium ? "default" : "pointer"
          },
          onClick: handleRoomClick,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") handleRoomClick();
          },
          onMouseLeave: () => setTooltip(null),
          role: "img",
          "aria-label": `${floor === "ground" ? "Ground" : "First"} floor plan — ${plotLabel}`,
          "data-ocid": "floorplan.svg_canvas",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "pattern",
              {
                id: "grid",
                width: "20",
                height: "20",
                patternUnits: "userSpaceOnUse",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M 20 0 L 0 0 0 20",
                    fill: "none",
                    stroke: "#e2e8f0",
                    strokeWidth: "0.5"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: VW, height: VH, fill: "url(#grid)" }),
            rooms.map((room) => {
              const c = ROOM_COLORS[room.type];
              const midX = room.x + room.w / 2;
              const midY = room.y + room.h / 2;
              const fontSize = room.w < 100 || room.h < 40 ? 7 : 9;
              const roomKey = `${floor}-${room.name}-${room.x}-${room.y}`;
              const roomIdx = rooms.indexOf(room) + 1;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "g",
                {
                  "data-ocid": `floorplan.room.${roomIdx}`,
                  style: { cursor: isPremium ? "crosshair" : "pointer" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: room.x,
                        y: room.y,
                        width: room.w,
                        height: room.h,
                        fill: c.fill,
                        stroke: c.stroke,
                        strokeWidth: "1.5",
                        rx: "2",
                        onMouseMove: (e) => handleRoomHover(e, room),
                        onMouseLeave: () => setTooltip(null)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: midX,
                        y: midY - (room.dims ? 5 : 0),
                        textAnchor: "middle",
                        dominantBaseline: "middle",
                        fontSize,
                        fontWeight: "600",
                        fill: c.label,
                        style: { userSelect: "none", pointerEvents: "none" },
                        children: room.name
                      }
                    ),
                    room.dims && room.h > 35 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        x: midX,
                        y: midY + fontSize + 1,
                        textAnchor: "middle",
                        dominantBaseline: "middle",
                        fontSize: fontSize - 1,
                        fill: c.label,
                        opacity: 0.75,
                        style: { userSelect: "none", pointerEvents: "none" },
                        children: room.dims
                      }
                    )
                  ]
                },
                roomKey
              );
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: VW / 2,
                y: VH - 5,
                textAnchor: "middle",
                fontSize: "8",
                fill: "#94a3b8",
                fontStyle: "italic",
                children: plotLabel
              }
            )
          ]
        }
      ),
      tooltip && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "pointer-events-none absolute z-20 px-2.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium shadow-lg",
          style: { left: tooltip.x + 12, top: tooltip.y - 8, maxWidth: 180 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: tooltip.room.name }),
            tooltip.room.dims && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 opacity-70", children: tooltip.room.dims })
          ]
        }
      ),
      !isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm rounded-md gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: "📐" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mb-1", children: "2D Floor Plans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mb-4", children: "Interactive floor plans with room dimensions and layout details." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "bg-primary text-primary-foreground hover:opacity-90 gap-1.5 text-xs",
            onClick: () => setUpgradeOpen(true),
            "data-ocid": "floorplan.upgrade_button",
            children: "Unlock with Premium"
          }
        )
      ] }) })
    ] }),
    isPremium && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 border-t border-border bg-muted/10 flex flex-wrap gap-x-4 gap-y-1", children: Object.entries(ROOM_COLORS).map(([type, c]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-1.5 text-xs text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-block w-3 h-3 rounded-sm border",
              style: { background: c.fill, borderColor: c.stroke }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: type })
        ]
      },
      type
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UpgradeModal,
      {
        isOpen: upgradeOpen,
        onClose: () => setUpgradeOpen(false),
        targetTier: "premium",
        featureName: "2D Floor Plans"
      }
    )
  ] });
}
export {
  FloorPlanViewer as F,
  RotateCcw as R,
  Separator as S
};
