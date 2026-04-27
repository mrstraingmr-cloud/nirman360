import { c as createLucideIcon, j as jsxRuntimeExports, $ as useFreeTierStatus, a as cn, G as Gift, T as TierBadge, B as Button, L as Link, o as React } from "./index-V48KFtBG.js";
import { B as Badge } from "./badge-5Q9nPy-w.js";
import { P as PriceDisplay } from "./PriceDisplay-CLS_qx8W.js";
import { L as Lock } from "./lock-0Drxw9ty.js";
import { M as MapPin } from "./map-pin-DUowKGy8.js";
import { c as createStore } from "./vanilla-wjP-HMWV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]
];
const BookmarkCheck = createLucideIcon("bookmark-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }],
  ["line", { x1: "12", x2: "12", y1: "7", y2: "13", key: "1cppfj" }],
  ["line", { x1: "15", x2: "9", y1: "10", y2: "10", key: "1gty7f" }]
];
const BookmarkPlus = createLucideIcon("bookmark-plus", __iconNode);
const CATEGORY_META = [
  {
    id: "residential",
    label: "Residential Houses",
    description: "1BHK, 2BHK, 3BHK & Villas for every family",
    image: "/assets/generated/house-2bhk.dim_600x400.jpg",
    count: "120+ Designs"
  },
  {
    id: "apartments",
    label: "Apartments & Buildings",
    description: "Multi-unit residential and commercial complexes",
    image: "/assets/generated/apartments-building.dim_600x400.jpg",
    count: "45+ Designs"
  },
  {
    id: "dairyFarms",
    label: "Dairy Farms",
    description: "Agricultural and farm structures built for efficiency",
    image: "/assets/generated/dairy-farm.dim_600x400.jpg",
    count: "30+ Designs"
  },
  {
    id: "smallBusiness",
    label: "Small Business",
    description: "Shops, offices, and warehouses for entrepreneurs",
    image: "/assets/generated/small-business.dim_600x400.jpg",
    count: "55+ Designs"
  },
  {
    id: "custom",
    label: "Custom Projects",
    description: "Bespoke designs tailored to your unique vision",
    image: "/assets/generated/custom-project.dim_600x400.jpg",
    count: "Unlimited"
  }
];
const TIER_LABELS = {
  free: "Free",
  premium: "Premium",
  ultraPremium: "Ultra Premium"
};
const CATEGORY_LABELS = {
  residential: "Residential",
  apartments: "Apartments",
  dairyFarms: "Dairy Farms",
  smallBusiness: "Small Business",
  custom: "Custom"
};
function ModernFlatRoofPreview({ className = "" }) {
  const roofXs = [
    80,
    42,
    104,
    130,
    166,
    192,
    214,
    240,
    272,
    300,
    330,
    355,
    8,
    68,
    128,
    188,
    248,
    308
  ];
  const roofX2s = [22, 50, 80, 116, 140, 164, 202, 228, 256, 284, 318, 344];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 400 280",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      role: "img",
      "aria-labelledby": "mfr-title",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { id: "mfr-title", children: "Modern Flat-Roof Villa exterior preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "mfr-sky", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#b8d4f0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#dceeff" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "mfr-ground", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#6faa55" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#4c8a3a" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "mfr-glass", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#a3d8f4", stopOpacity: "0.9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#5bb8e8", stopOpacity: "0.7" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "400", height: "280", fill: "url(#mfr-sky)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "230", width: "400", height: "50", fill: "url(#mfr-ground)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "20", y: "228", width: "70", height: "52", fill: "#c8c2b8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "55",
            y1: "228",
            x2: "55",
            y2: "280",
            stroke: "#a8a298",
            strokeWidth: "1",
            strokeDasharray: "4,4"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "20", y: "140", width: "360", height: "90", fill: "#2d2d2d", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "20", y: "157", width: "360", height: "3", fill: "#444" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "20", y: "175", width: "360", height: "3", fill: "#444" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "90",
            y: "147",
            width: "80",
            height: "76",
            fill: "url(#mfr-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "180",
            y: "147",
            width: "50",
            height: "76",
            fill: "url(#mfr-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "240",
            y: "147",
            width: "80",
            height: "76",
            fill: "url(#mfr-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "25", y: "148", width: "58", height: "75", fill: "#3a3a3a", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "54", y1: "148", x2: "54", y2: "223", stroke: "#555", strokeWidth: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "25", y1: "172", x2: "83", y2: "172", stroke: "#555", strokeWidth: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "25", y1: "196", x2: "83", y2: "196", stroke: "#555", strokeWidth: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "60", y: "60", width: "300", height: "80", fill: "#2d2d2d", rx: "1" }),
        roofXs.map((rx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: rx,
            y: 64,
            width: "14",
            height: "5",
            fill: "#8B6340",
            rx: "1"
          },
          `fin-${rx}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "70",
            y: "92",
            width: "80",
            height: "40",
            fill: "url(#mfr-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "165",
            y: "92",
            width: "60",
            height: "40",
            fill: "url(#mfr-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "240",
            y: "92",
            width: "80",
            height: "40",
            fill: "url(#mfr-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "55", y: "50", width: "310", height: "12", fill: "#383838", rx: "1" }),
        roofX2s.map((rx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: rx,
            y: 42,
            width: "40",
            height: "8",
            fill: "#4a7c3f",
            rx: "2"
          },
          `planter-${rx}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "100", cy: "40", rx: "10", ry: "8", fill: "#5a9c4f" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "175", cy: "37", rx: "8", ry: "10", fill: "#5a9c4f" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "265", cy: "39", rx: "12", ry: "9", fill: "#5a9c4f" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "330", y: "60", width: "8", height: "140", fill: "#8B6340", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "345", y: "60", width: "5", height: "140", fill: "#7a5530", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "355", y: "60", width: "5", height: "140", fill: "#8B6340", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "330", y: "155", width: "50", height: "75", fill: "#1a1a1a", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "334", y: "159", width: "20", height: "67", fill: "#0d0d0d", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "356", y: "159", width: "20", height: "67", fill: "#0d0d0d", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "320", y: "135", width: "65", height: "8", fill: "#222", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "10", y: "195", width: "8", height: "35", fill: "#7c5c3a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "14", cy: "190", rx: "16", ry: "20", fill: "#3d8a2e" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "375", y: "185", width: "8", height: "45", fill: "#7c5c3a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "379", cy: "178", rx: "14", ry: "18", fill: "#3d8a2e" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "255", width: "400", height: "25", fill: "rgba(0,0,0,0.35)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "200",
            y: "271",
            textAnchor: "middle",
            fontSize: "11",
            fill: "#fff",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Modern Flat-Roof Villa · 3BHK · 1700 sq.ft"
          }
        )
      ]
    }
  );
}
function HeritageBungalowPreview({ className = "" }) {
  const tileCols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const columns = [75, 148, 221, 294];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 400 280",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      role: "img",
      "aria-labelledby": "hb-title",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { id: "hb-title", children: "Heritage Bungalow exterior preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "hb-sky", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#fde8c4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#fbebd8" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "hb-roof", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#c0472a" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#a03820" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "hb-wall", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#f0e6d2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8d8bc" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "400", height: "280", fill: "url(#hb-sky)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "230", width: "400", height: "50", fill: "#8aad6a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "160,280 240,280 220,228 180,228", fill: "#d4c9b0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "30",
            y: "140",
            width: "340",
            height: "90",
            fill: "url(#hb-wall)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "30",
            y1: "165",
            x2: "370",
            y2: "165",
            stroke: "#d8c8a8",
            strokeWidth: "0.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "30",
            y1: "190",
            x2: "370",
            y2: "190",
            stroke: "#d8c8a8",
            strokeWidth: "0.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "30",
            y1: "215",
            x2: "370",
            y2: "215",
            stroke: "#d8c8a8",
            strokeWidth: "0.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "15,140 200,55 385,140", fill: "url(#hb-roof)" }),
        tileCols.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 22 + i * 24,
            y: 136,
            width: "20",
            height: "5",
            fill: "#a03820",
            rx: "1"
          },
          `tile-${i}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polygon",
          {
            points: "15,142 200,57 385,142 370,142 200,63 30,142",
            fill: "#8c3018",
            opacity: "0.4"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "30", y: "195", width: "340", height: "35", fill: "#e8d8bc" }),
        columns.map((cx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: cx, y: 140, width: "16", height: "90", fill: "#d8c8a8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: cx - 4,
              y: 140,
              width: "24",
              height: "6",
              fill: "#c8b898",
              rx: "1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: cx - 4,
              y: 224,
              width: "24",
              height: "6",
              fill: "#c8b898",
              rx: "1"
            }
          )
        ] }, `col-${cx}`)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "50",
            y: "150",
            width: "60",
            height: "50",
            fill: "#d4eeee",
            stroke: "#a89060",
            strokeWidth: "2",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "80",
            y1: "150",
            x2: "80",
            y2: "200",
            stroke: "#a89060",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "50",
            y1: "175",
            x2: "110",
            y2: "175",
            stroke: "#a89060",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "170",
            y: "150",
            width: "60",
            height: "50",
            fill: "#d4eeee",
            stroke: "#a89060",
            strokeWidth: "2",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "200",
            y1: "150",
            x2: "200",
            y2: "200",
            stroke: "#a89060",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "170",
            y1: "175",
            x2: "230",
            y2: "175",
            stroke: "#a89060",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "290",
            y: "150",
            width: "60",
            height: "50",
            fill: "#d4eeee",
            stroke: "#a89060",
            strokeWidth: "2",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "320",
            y1: "150",
            x2: "320",
            y2: "200",
            stroke: "#a89060",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "290",
            y1: "175",
            x2: "350",
            y2: "175",
            stroke: "#a89060",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "178", y: "180", width: "44", height: "50", fill: "#7c4e2a", rx: "2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M178,195 Q200,180 222,195", fill: "#6a3e20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "216", cy: "205", r: "3", fill: "#d4a020" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "4", y: "185", width: "7", height: "45", fill: "#8c6840" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "8", cy: "178", rx: "18", ry: "22", fill: "#2d7a20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "388", y: "180", width: "7", height: "50", fill: "#8c6840" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "392", cy: "172", rx: "16", ry: "20", fill: "#2d7a20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "255", width: "400", height: "25", fill: "rgba(100,50,10,0.45)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "200",
            y: "271",
            textAnchor: "middle",
            fontSize: "11",
            fill: "#fff",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Heritage Bungalow · 3BHK · 2000 sq.ft"
          }
        )
      ]
    }
  );
}
function UrbanDuplexPreview({ className = "" }) {
  const stars = [
    [40, 30],
    [80, 15],
    [130, 40],
    [200, 20],
    [280, 35],
    [340, 12],
    [370, 45],
    [30, 60],
    [160, 10]
  ];
  const fins = [115, 130, 145, 250, 265, 280];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 400 280",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      role: "img",
      "aria-labelledby": "ud-title",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { id: "ud-title", children: "Urban Duplex 3-BHK exterior preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ud-sky", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#1a2035" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#2d3b5a" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ud-glass", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#4db0d8", stopOpacity: "0.85" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#2890b8", stopOpacity: "0.7" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "400", height: "280", fill: "url(#ud-sky)" }),
        stars.map(([sx, sy]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: sx,
            cy: sy,
            r: "1.2",
            fill: "#fff",
            opacity: "0.6"
          },
          `star-${sx}-${sy}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "235", width: "400", height: "45", fill: "#181c28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "234", width: "400", height: "3", fill: "#e8a020", opacity: "0.6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "0",
            y: "110",
            width: "80",
            height: "125",
            fill: "#2a2f3e",
            opacity: "0.6"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "320",
            y: "100",
            width: "80",
            height: "135",
            fill: "#2a2f3e",
            opacity: "0.6"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "110", y: "160", width: "180", height: "75", fill: "#1e2230", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "110", y: "193", width: "180", height: "8", fill: "#e8e8e8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "110", y: "80", width: "180", height: "80", fill: "#252a38", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "110", y: "105", width: "180", height: "8", fill: "#e8e8e8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "105", y: "65", width: "190", height: "15", fill: "#1a1f2c", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "140",
            y: "58",
            width: "120",
            height: "10",
            fill: "url(#ud-glass)",
            rx: "2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "140", y: "58", width: "120", height: "2", fill: "#fff", opacity: "0.4" }),
        fins.map((fx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: fx,
            y: 80,
            width: "6",
            height: "155",
            fill: "#8B6340",
            rx: "1",
            opacity: "0.85"
          },
          `fin-${fx}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "160",
            y: "165",
            width: "70",
            height: "55",
            fill: "url(#ud-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "195",
            y1: "165",
            x2: "195",
            y2: "220",
            stroke: "#1a6a88",
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "155",
            y: "85",
            width: "90",
            height: "55",
            fill: "url(#ud-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "200",
            y1: "85",
            x2: "200",
            y2: "140",
            stroke: "#1a6a88",
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "155",
            y: "85",
            width: "90",
            height: "55",
            fill: "none",
            stroke: "#111",
            strokeWidth: "2",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "155",
            y: "75",
            width: "90",
            height: "8",
            fill: "rgba(100,200,240,0.25)",
            stroke: "rgba(100,200,240,0.5)",
            strokeWidth: "1",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "185", y: "195", width: "30", height: "40", fill: "#111", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "180", y: "192", width: "40", height: "3", fill: "#e8a020", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "110",
            y: "157",
            width: "180",
            height: "3",
            fill: "#e8c060",
            opacity: "0.7",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "110",
            y: "77",
            width: "180",
            height: "3",
            fill: "#e8c060",
            opacity: "0.7",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "200", cy: "240", rx: "60", ry: "8", fill: "#e8a020", opacity: "0.15" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "255", width: "400", height: "25", fill: "rgba(0,0,0,0.55)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "200",
            y: "271",
            textAnchor: "middle",
            fontSize: "11",
            fill: "#fff",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Urban Duplex · 3BHK · 1056 sq.ft · Ultra Premium"
          }
        )
      ]
    }
  );
}
function SkylineModernPreview({ className = "" }) {
  const stoneCourses = [165, 175, 185, 195, 205, 215, 225];
  const stoneJoints = [55, 110, 165, 220, 275, 330];
  const pergolaSlats = [130, 155, 180, 205, 230, 255];
  const entryFins = [155, 168, 225, 238];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 400 280",
      xmlns: "http://www.w3.org/2000/svg",
      className,
      role: "img",
      "aria-labelledby": "sm-title",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { id: "sm-title", children: "Skyline Modern House exterior preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "sm-sky", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#c8dff0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e8f4ff" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "sm-stone", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#4a4a4a" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#3a3a3a" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "sm-glass", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#a0cce0", stopOpacity: "0.85" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#70a8c8", stopOpacity: "0.7" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "sm-upper", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#f0ece4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e4e0d8" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "400", height: "280", fill: "url(#sm-sky)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "80", cy: "30", rx: "40", ry: "14", fill: "white", opacity: "0.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "110", cy: "24", rx: "28", ry: "12", fill: "white", opacity: "0.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "300", cy: "40", rx: "35", ry: "12", fill: "white", opacity: "0.65" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "230", width: "400", height: "50", fill: "#7aa85a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "150,280 250,280 235,228 165,228", fill: "#c8c0b0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "15",
            y: "155",
            width: "370",
            height: "75",
            fill: "url(#sm-stone)",
            rx: "1"
          }
        ),
        stoneCourses.map((sy) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "15",
            x2: "385",
            y1: sy,
            y2: sy,
            stroke: "#555",
            strokeWidth: "0.5"
          },
          `course-${sy}`
        )),
        stoneJoints.map((sx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: sx,
            x2: sx,
            y1: "155",
            y2: "230",
            stroke: "#555",
            strokeWidth: "0.5"
          },
          `joint-${sx}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "40",
            y: "160",
            width: "70",
            height: "55",
            fill: "url(#sm-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "165",
            y: "160",
            width: "110",
            height: "55",
            fill: "url(#sm-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "295",
            y: "160",
            width: "70",
            height: "55",
            fill: "url(#sm-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "40", y: "215", width: "70", height: "2", fill: "#f0c060", opacity: "0.8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "165",
            y: "215",
            width: "110",
            height: "2",
            fill: "#f0c060",
            opacity: "0.8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "295",
            y: "215",
            width: "70",
            height: "2",
            fill: "#f0c060",
            opacity: "0.8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "15",
            y: "75",
            width: "370",
            height: "80",
            fill: "url(#sm-upper)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "30", y: "82", width: "80", height: "60", fill: "url(#sm-glass)", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "70", y1: "82", x2: "70", y2: "142", stroke: "#6090a8", strokeWidth: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "165",
            y: "82",
            width: "80",
            height: "60",
            fill: "url(#sm-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "300",
            y: "82",
            width: "70",
            height: "60",
            fill: "url(#sm-glass)",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "30",
            y: "73",
            width: "80",
            height: "6",
            fill: "rgba(130,190,220,0.35)",
            stroke: "rgba(100,160,200,0.6)",
            strokeWidth: "1",
            rx: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "10", y: "60", width: "380", height: "15", fill: "#484848", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "120", y: "50", width: "160", height: "10", fill: "#5a4520", rx: "1" }),
        pergolaSlats.map((px) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: px,
            y: 40,
            width: "5",
            height: "22",
            fill: "#6a5025",
            rx: "1"
          },
          `slat-${px}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "145", cy: "38", rx: "12", ry: "8", fill: "#3d7a2a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "200", cy: "36", rx: "14", ry: "9", fill: "#4a9030" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "255", cy: "38", rx: "11", ry: "8", fill: "#3d7a2a" }),
        entryFins.map((fx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: fx,
            y: 135,
            width: "7",
            height: "95",
            fill: "#8B6340",
            rx: "1"
          },
          `efin-${fx}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "172", y: "160", width: "56", height: "70", fill: "#1a1a1a", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "174", y: "162", width: "24", height: "66", fill: "#111", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "201", y: "162", width: "24", height: "66", fill: "#111", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "218", cy: "198", r: "3", fill: "#c8a030" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "145", y: "150", width: "110", height: "8", fill: "#3a3a3a", rx: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "190", width: "8", height: "40", fill: "#8c6840" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "6", cy: "183", rx: "18", ry: "22", fill: "#3a8a28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "386", y: "185", width: "8", height: "45", fill: "#8c6840" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "390", cy: "177", rx: "16", ry: "20", fill: "#3a8a28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "255", width: "400", height: "25", fill: "rgba(0,0,0,0.38)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "200",
            y: "271",
            textAnchor: "middle",
            fontSize: "11",
            fill: "#fff",
            fontFamily: "sans-serif",
            fontWeight: "600",
            children: "Skyline Modern House · 4BHK · 1530 sq.ft"
          }
        )
      ]
    }
  );
}
const DESIGN_PREVIEWS = {
  "7": ModernFlatRoofPreview,
  "8": HeritageBungalowPreview,
  "9": UrbanDuplexPreview,
  "10": SkylineModernPreview
};
function hasSvgPreview(id) {
  return id >= BigInt(7) && id <= BigInt(10);
}
function DesignCard({
  design,
  isSaved = false,
  onSave,
  onRemove,
  index = 0
}) {
  const categoryLabel = CATEGORY_LABELS[design.category] ?? design.category;
  const { hasUsedFreeProject } = useFreeTierStatus();
  const isFreeAvailable = !hasUsedFreeProject;
  const isPremiumGated = design.tier === "premium" || design.tier === "ultraPremium";
  const showLock = isPremiumGated && !isFreeAvailable;
  const showTryFree = isPremiumGated && isFreeAvailable;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `design.item.${index + 1}`,
      className: "group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-smooth hover:shadow-xl hover:-translate-y-1",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-[4/3]", children: [
          hasSvgPreview(design.id) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full", children: (() => {
            const SvgComp = DESIGN_PREVIEWS[design.id.toString()];
            return SvgComp ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              SvgComp,
              {
                className: cn(
                  "h-full w-full transition-smooth group-hover:scale-105",
                  showLock && "opacity-75"
                )
              }
            ) : null;
          })() }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: design.previewImageUrl || "/assets/generated/house-2bhk.dim_600x400.jpg",
              alt: design.title,
              className: cn(
                "h-full w-full object-cover transition-smooth group-hover:scale-105",
                showLock && "opacity-75"
              ),
              onError: (e) => {
                e.target.src = "/assets/generated/house-2bhk.dim_600x400.jpg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 flex gap-1.5", children: showTryFree ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm",
              style: {
                background: "oklch(0.62 0.18 32 / 0.92)",
                color: "oklch(0.99 0 0)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-3 w-3" }),
                "Try Free"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(TierBadge, { tier: design.tier }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `design.save_button.${index + 1}`,
              onClick: (e) => {
                e.preventDefault();
                if (isSaved) {
                  onRemove == null ? void 0 : onRemove(design.id);
                } else {
                  onSave == null ? void 0 : onSave(design.id);
                }
              },
              "aria-label": isSaved ? "Remove from saved" : "Save design",
              className: cn(
                "absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full transition-smooth",
                isSaved ? "bg-accent text-accent-foreground shadow-md" : "bg-card/80 text-foreground hover:bg-accent hover:text-accent-foreground backdrop-blur-sm"
              ),
              children: isSaved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "h-4 w-4" })
            }
          ),
          showLock && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "absolute inset-0 flex flex-col items-center justify-center gap-2 backdrop-blur-[2px]",
              style: { background: "oklch(0.15 0.04 265 / 0.55)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-10 w-10 items-center justify-center rounded-full",
                    style: { background: "oklch(0.28 0.09 265 / 0.9)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Lock,
                      {
                        className: "h-5 w-5",
                        style: { color: "oklch(0.75 0.2 32)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-semibold px-3 py-1 rounded-full",
                    style: {
                      background: "oklch(0.28 0.09 265 / 0.9)",
                      color: "oklch(0.9 0.02 265)"
                    },
                    children: "Premium Required"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs bg-card/90 backdrop-blur-sm",
              children: categoryLabel
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-4 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground line-clamp-2 leading-snug", children: design.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
            design.bhk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              Number(design.bhk),
              "BHK"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              Number(design.areaSqft).toLocaleString("en-IN"),
              " sq.ft"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-auto pt-1", children: design.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground",
              children: tag
            },
            tag
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PriceDisplay,
              {
                min: design.estimatedCostMin,
                max: design.estimatedCostMax,
                className: "text-sm font-semibold text-foreground"
              }
            ),
            showLock ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "sm",
                variant: "outline",
                className: "border-primary text-primary",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", "data-ocid": `design.upgrade.${index + 1}`, children: "Upgrade" })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "default", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/design/$id",
                params: { id: design.id.toString() },
                "data-ocid": `design.link.${index + 1}`,
                children: showTryFree ? "Try Free" : "View Details"
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const useUIStore = create((set) => ({
  filters: {
    category: void 0,
    tier: void 0,
    searchQuery: ""
  },
  savedDesignIds: /* @__PURE__ */ new Set(),
  mobileMenuOpen: false,
  setCategory: (cat) => set((state) => ({ filters: { ...state.filters, category: cat } })),
  setTier: (tier) => set((state) => ({ filters: { ...state.filters, tier } })),
  setSearchQuery: (q) => set((state) => ({ filters: { ...state.filters, searchQuery: q } })),
  resetFilters: () => set({ filters: { category: void 0, tier: void 0, searchQuery: "" } }),
  optimisticSave: (id) => set((state) => {
    const next = new Set(state.savedDesignIds);
    next.add(id);
    return { savedDesignIds: next };
  }),
  optimisticRemove: (id) => set((state) => {
    const next = new Set(state.savedDesignIds);
    next.delete(id);
    return { savedDesignIds: next };
  }),
  setSavedDesignIds: (ids) => set({ savedDesignIds: new Set(ids) }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open })
}));
export {
  BookmarkCheck as B,
  CATEGORY_META as C,
  DesignCard as D,
  TIER_LABELS as T,
  CATEGORY_LABELS as a,
  DESIGN_PREVIEWS as b,
  BookmarkPlus as c,
  hasSvgPreview as h,
  useUIStore as u
};
