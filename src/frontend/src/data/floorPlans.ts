// Floor plan room data for the SVG FloorPlanViewer
// SVG viewport: 600×430

export interface Room {
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

export interface FloorPlanData {
  label: string; // e.g. "Plot: 34×46 ft"
  ground: Room[];
  first?: Room[];
}

// ── Design 7 — Modern Flat-Roof Villa (34×46 ft) ──────────────────────────
// Scale: 34ft wide → ~580px, 46ft deep → ~430px → 1ft ≈ 17px W / 9.35px H
const d7Ground: Room[] = [
  {
    x: 10,
    y: 10,
    w: 200,
    h: 140,
    name: "Parking",
    dims: "14×20 ft",
    type: "utility",
  },
  {
    x: 210,
    y: 10,
    w: 120,
    h: 140,
    name: "Guest Room",
    dims: "10×12 ft",
    type: "bedroom",
  },
  {
    x: 330,
    y: 10,
    w: 260,
    h: 140,
    name: "Family Lounge",
    dims: "14×16 ft",
    type: "living",
  },
  {
    x: 10,
    y: 150,
    w: 580,
    h: 50,
    name: "Veranda",
    dims: "6×34 ft",
    type: "outdoor",
  },
  {
    x: 10,
    y: 200,
    w: 200,
    h: 110,
    name: "Kitchen",
    dims: "10×12 ft",
    type: "kitchen",
  },
  {
    x: 210,
    y: 200,
    w: 75,
    h: 110,
    name: "Store",
    dims: "6×8 ft",
    type: "utility",
  },
  {
    x: 285,
    y: 200,
    w: 75,
    h: 110,
    name: "Toilet",
    dims: "5×6 ft",
    type: "bathroom",
  },
  {
    x: 360,
    y: 200,
    w: 75,
    h: 110,
    name: "Toilet",
    dims: "5×6 ft",
    type: "bathroom",
  },
  {
    x: 435,
    y: 200,
    w: 155,
    h: 110,
    name: "Wardrobe/Hall",
    dims: "8×10 ft",
    type: "utility",
  },
  {
    x: 10,
    y: 310,
    w: 580,
    h: 110,
    name: "Backyard",
    dims: "10×14 ft",
    type: "outdoor",
  },
];

const d7First: Room[] = [
  {
    x: 10,
    y: 10,
    w: 230,
    h: 155,
    name: "Master Bedroom",
    dims: "12×14 ft",
    type: "bedroom",
  },
  {
    x: 240,
    y: 10,
    w: 190,
    h: 155,
    name: "Bedroom 2",
    dims: "10×12 ft",
    type: "bedroom",
  },
  {
    x: 430,
    y: 10,
    w: 160,
    h: 155,
    name: "Bedroom 3",
    dims: "10×12 ft",
    type: "bedroom",
  },
  {
    x: 10,
    y: 165,
    w: 265,
    h: 155,
    name: "Living Room",
    dims: "14×16 ft",
    type: "living",
  },
  {
    x: 275,
    y: 165,
    w: 105,
    h: 75,
    name: "Toilet",
    dims: "5×7 ft",
    type: "bathroom",
  },
  {
    x: 275,
    y: 240,
    w: 105,
    h: 80,
    name: "Toilet",
    dims: "5×7 ft",
    type: "bathroom",
  },
  {
    x: 380,
    y: 165,
    w: 210,
    h: 155,
    name: "Balcony",
    dims: "6×14 ft",
    type: "outdoor",
  },
  {
    x: 10,
    y: 320,
    w: 580,
    h: 100,
    name: "Slab / Roof Terrace",
    dims: "1526 sq.ft",
    type: "outdoor",
  },
];

// ── Design 8 — Heritage Bungalow (40×50 ft, single floor) ────────────────
// Scale: 40ft → 580px (14.5px/ft), 50ft → 430px (8.6px/ft)
const d8Ground: Room[] = [
  {
    x: 10,
    y: 10,
    w: 580,
    h: 65,
    name: "Front Veranda",
    dims: "6×40 ft",
    type: "outdoor",
  },
  {
    x: 10,
    y: 75,
    w: 195,
    h: 150,
    name: "Master Bedroom",
    dims: "12×14 ft",
    type: "bedroom",
  },
  {
    x: 205,
    y: 75,
    w: 185,
    h: 150,
    name: "Sitting Room",
    dims: "14×18 ft",
    type: "living",
  },
  {
    x: 390,
    y: 75,
    w: 200,
    h: 150,
    name: "Bedroom 1",
    dims: "10×12 ft",
    type: "bedroom",
  },
  {
    x: 10,
    y: 225,
    w: 195,
    h: 100,
    name: "Bathroom",
    dims: "5×8 ft",
    type: "bathroom",
  },
  {
    x: 205,
    y: 225,
    w: 185,
    h: 100,
    name: "Dining Room",
    dims: "10×12 ft",
    type: "living",
  },
  {
    x: 390,
    y: 225,
    w: 200,
    h: 100,
    name: "Bedroom 2",
    dims: "10×12 ft",
    type: "bedroom",
  },
  {
    x: 10,
    y: 325,
    w: 195,
    h: 95,
    name: "WC",
    dims: "4×6 ft",
    type: "bathroom",
  },
  {
    x: 205,
    y: 325,
    w: 185,
    h: 95,
    name: "Kitchen",
    dims: "10×10 ft",
    type: "kitchen",
  },
  {
    x: 390,
    y: 325,
    w: 200,
    h: 95,
    name: "Store",
    dims: "6×8 ft",
    type: "utility",
  },
];

// ── Design 9 — Urban Duplex 3-BHK (22×48 ft) ─────────────────────────────
// Scale: 22ft → 580px (26.36px/ft), 48ft → 420px (8.75px/ft)
const d9Ground: Room[] = [
  {
    x: 10,
    y: 10,
    w: 265,
    h: 155,
    name: "Living Room",
    dims: "14×18 ft",
    type: "living",
  },
  {
    x: 275,
    y: 10,
    w: 315,
    h: 155,
    name: "Parking",
    dims: "10×20 ft",
    type: "utility",
  },
  {
    x: 10,
    y: 165,
    w: 265,
    h: 130,
    name: "Kitchen",
    dims: "10×12 ft",
    type: "kitchen",
  },
  {
    x: 275,
    y: 165,
    w: 315,
    h: 130,
    name: "Dining",
    dims: "10×12 ft",
    type: "living",
  },
  {
    x: 10,
    y: 295,
    w: 265,
    h: 120,
    name: "Bedroom",
    dims: "10×12 ft",
    type: "bedroom",
  },
  {
    x: 275,
    y: 295,
    w: 165,
    h: 120,
    name: "WC",
    dims: "5×6 ft",
    type: "bathroom",
  },
  {
    x: 440,
    y: 295,
    w: 150,
    h: 120,
    name: "Staircase",
    dims: "4×8 ft",
    type: "staircase",
  },
];

const d9First: Room[] = [
  {
    x: 10,
    y: 10,
    w: 315,
    h: 165,
    name: "Master Bedroom",
    dims: "12×14 ft",
    type: "bedroom",
  },
  {
    x: 325,
    y: 10,
    w: 265,
    h: 165,
    name: "Bedroom 2",
    dims: "10×12 ft",
    type: "bedroom",
  },
  {
    x: 10,
    y: 175,
    w: 315,
    h: 120,
    name: "Living / Study",
    dims: "14×12 ft",
    type: "living",
  },
  {
    x: 325,
    y: 175,
    w: 155,
    h: 120,
    name: "WC",
    dims: "5×6 ft",
    type: "bathroom",
  },
  {
    x: 480,
    y: 175,
    w: 110,
    h: 120,
    name: "Staircase",
    dims: "4×8 ft",
    type: "staircase",
  },
  {
    x: 10,
    y: 295,
    w: 265,
    h: 125,
    name: "Balcony",
    dims: "6×10 ft",
    type: "outdoor",
  },
  {
    x: 275,
    y: 295,
    w: 315,
    h: 125,
    name: "Attached Bath",
    dims: "5×8 ft",
    type: "bathroom",
  },
];

// ── Design 10 — Skyline Modern House (30×51 ft) ───────────────────────────
// Scale: 30ft → 580px (19.33px/ft), 51ft → 430px (8.43px/ft)
const d10Ground: Room[] = [
  {
    x: 10,
    y: 10,
    w: 155,
    h: 90,
    name: "Porch",
    dims: "8×10 ft",
    type: "outdoor",
  },
  {
    x: 165,
    y: 10,
    w: 225,
    h: 90,
    name: "Master Bedroom",
    dims: "12×14 ft",
    type: "bedroom",
  },
  {
    x: 390,
    y: 10,
    w: 200,
    h: 90,
    name: "Bedroom",
    dims: "10×12 ft",
    type: "bedroom",
  },
  {
    x: 10,
    y: 100,
    w: 310,
    h: 145,
    name: "Living Room",
    dims: "16×18 ft",
    type: "living",
  },
  {
    x: 320,
    y: 100,
    w: 270,
    h: 145,
    name: "Dining",
    dims: "12×12 ft",
    type: "living",
  },
  {
    x: 10,
    y: 245,
    w: 225,
    h: 100,
    name: "Kitchen",
    dims: "12×14 ft",
    type: "kitchen",
  },
  {
    x: 235,
    y: 245,
    w: 175,
    h: 100,
    name: "WC",
    dims: "5×7 ft",
    type: "bathroom",
  },
  {
    x: 410,
    y: 245,
    w: 180,
    h: 100,
    name: "WC",
    dims: "5×7 ft",
    type: "bathroom",
  },
  {
    x: 10,
    y: 345,
    w: 580,
    h: 75,
    name: "Open Utility / Back Space",
    dims: "",
    type: "utility",
  },
];

const d10First: Room[] = [
  {
    x: 10,
    y: 10,
    w: 270,
    h: 160,
    name: "Master Suite",
    dims: "14×16 ft",
    type: "bedroom",
  },
  {
    x: 280,
    y: 10,
    w: 155,
    h: 160,
    name: "Walk-in + Bath",
    dims: "8×10 ft",
    type: "bathroom",
  },
  {
    x: 435,
    y: 10,
    w: 155,
    h: 160,
    name: "Bedroom 3",
    dims: "10×12 ft",
    type: "bedroom",
  },
  {
    x: 10,
    y: 170,
    w: 270,
    h: 145,
    name: "Family Lounge",
    dims: "14×16 ft",
    type: "living",
  },
  {
    x: 280,
    y: 170,
    w: 310,
    h: 145,
    name: "Bedroom 4",
    dims: "10×12 ft",
    type: "bedroom",
  },
  {
    x: 10,
    y: 315,
    w: 155,
    h: 105,
    name: "WC",
    dims: "5×7 ft",
    type: "bathroom",
  },
  {
    x: 165,
    y: 315,
    w: 155,
    h: 105,
    name: "WC",
    dims: "5×7 ft",
    type: "bathroom",
  },
  {
    x: 320,
    y: 315,
    w: 155,
    h: 105,
    name: "Staircase",
    dims: "6×8 ft",
    type: "staircase",
  },
  {
    x: 475,
    y: 315,
    w: 115,
    h: 105,
    name: "Balcony",
    dims: "8×16 ft",
    type: "outdoor",
  },
];

// ── Registry ────────────────────────────────────────────────────────────────

export const FLOOR_PLANS: Record<string, FloorPlanData> = {
  "7": {
    label: "Plot: 34×46 ft | Modern Flat-Roof Villa",
    ground: d7Ground,
    first: d7First,
  },
  "8": {
    label: "Plot: 40×50 ft | Heritage Bungalow",
    ground: d8Ground,
  },
  "9": {
    label: "Plot: 22×48 ft | Urban Duplex",
    ground: d9Ground,
    first: d9First,
  },
  "10": {
    label: "Plot: 30×51 ft | Skyline Modern House",
    ground: d10Ground,
    first: d10First,
  },
};
