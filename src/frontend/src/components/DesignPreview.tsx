/**
 * Architectural illustration cards for new Indian residential house designs.
 * Each component renders a clean SVG exterior preview — no external images needed.
 */

interface PreviewProps {
  className?: string;
}

// ── Design 7: Modern Flat-Roof Villa ─────────────────────────────────────────
export function ModernFlatRoofPreview({ className = "" }: PreviewProps) {
  const roofXs = [
    80, 42, 104, 130, 166, 192, 214, 240, 272, 300, 330, 355, 8, 68, 128, 188,
    248, 308,
  ];
  const roofX2s = [22, 50, 80, 116, 140, 164, 202, 228, 256, 284, 318, 344];

  return (
    <svg
      viewBox="0 0 400 280"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-labelledby="mfr-title"
    >
      <title id="mfr-title">Modern Flat-Roof Villa exterior preview</title>
      <defs>
        <linearGradient id="mfr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8d4f0" />
          <stop offset="100%" stopColor="#dceeff" />
        </linearGradient>
        <linearGradient id="mfr-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6faa55" />
          <stop offset="100%" stopColor="#4c8a3a" />
        </linearGradient>
        <linearGradient id="mfr-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a3d8f4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5bb8e8" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#mfr-sky)" />
      <rect x="0" y="230" width="400" height="50" fill="url(#mfr-ground)" />
      <rect x="20" y="228" width="70" height="52" fill="#c8c2b8" />
      <line
        x1="55"
        y1="228"
        x2="55"
        y2="280"
        stroke="#a8a298"
        strokeWidth="1"
        strokeDasharray="4,4"
      />
      {/* Ground floor body */}
      <rect x="20" y="140" width="360" height="90" fill="#2d2d2d" rx="1" />
      <rect x="20" y="157" width="360" height="3" fill="#444" />
      <rect x="20" y="175" width="360" height="3" fill="#444" />
      <rect
        x="90"
        y="147"
        width="80"
        height="76"
        fill="url(#mfr-glass)"
        rx="1"
      />
      <rect
        x="180"
        y="147"
        width="50"
        height="76"
        fill="url(#mfr-glass)"
        rx="1"
      />
      <rect
        x="240"
        y="147"
        width="80"
        height="76"
        fill="url(#mfr-glass)"
        rx="1"
      />
      <rect x="25" y="148" width="58" height="75" fill="#3a3a3a" rx="1" />
      <line x1="54" y1="148" x2="54" y2="223" stroke="#555" strokeWidth="1" />
      <line x1="25" y1="172" x2="83" y2="172" stroke="#555" strokeWidth="1" />
      <line x1="25" y1="196" x2="83" y2="196" stroke="#555" strokeWidth="1" />
      {/* Second floor */}
      <rect x="60" y="60" width="300" height="80" fill="#2d2d2d" rx="1" />
      {roofXs.map((rx) => (
        <rect
          key={`fin-${rx}`}
          x={rx}
          y={64}
          width="14"
          height="5"
          fill="#8B6340"
          rx="1"
        />
      ))}
      <rect
        x="70"
        y="92"
        width="80"
        height="40"
        fill="url(#mfr-glass)"
        rx="1"
      />
      <rect
        x="165"
        y="92"
        width="60"
        height="40"
        fill="url(#mfr-glass)"
        rx="1"
      />
      <rect
        x="240"
        y="92"
        width="80"
        height="40"
        fill="url(#mfr-glass)"
        rx="1"
      />
      {/* Flat roof */}
      <rect x="55" y="50" width="310" height="12" fill="#383838" rx="1" />
      {roofX2s.map((rx) => (
        <rect
          key={`planter-${rx}`}
          x={rx}
          y={42}
          width="40"
          height="8"
          fill="#4a7c3f"
          rx="2"
        />
      ))}
      <ellipse cx="100" cy="40" rx="10" ry="8" fill="#5a9c4f" />
      <ellipse cx="175" cy="37" rx="8" ry="10" fill="#5a9c4f" />
      <ellipse cx="265" cy="39" rx="12" ry="9" fill="#5a9c4f" />
      {/* Wood fins */}
      <rect x="330" y="60" width="8" height="140" fill="#8B6340" rx="1" />
      <rect x="345" y="60" width="5" height="140" fill="#7a5530" rx="1" />
      <rect x="355" y="60" width="5" height="140" fill="#8B6340" rx="1" />
      {/* Entrance */}
      <rect x="330" y="155" width="50" height="75" fill="#1a1a1a" rx="1" />
      <rect x="334" y="159" width="20" height="67" fill="#0d0d0d" rx="1" />
      <rect x="356" y="159" width="20" height="67" fill="#0d0d0d" rx="1" />
      <rect x="320" y="135" width="65" height="8" fill="#222" rx="1" />
      {/* Trees */}
      <rect x="10" y="195" width="8" height="35" fill="#7c5c3a" />
      <ellipse cx="14" cy="190" rx="16" ry="20" fill="#3d8a2e" />
      <rect x="375" y="185" width="8" height="45" fill="#7c5c3a" />
      <ellipse cx="379" cy="178" rx="14" ry="18" fill="#3d8a2e" />
      {/* Label */}
      <rect x="0" y="255" width="400" height="25" fill="rgba(0,0,0,0.35)" />
      <text
        x="200"
        y="271"
        textAnchor="middle"
        fontSize="11"
        fill="#fff"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Modern Flat-Roof Villa · 3BHK · 1700 sq.ft
      </text>
    </svg>
  );
}

// ── Design 8: Heritage Bungalow ───────────────────────────────────────────────
export function HeritageBungalowPreview({ className = "" }: PreviewProps) {
  const tileCols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const columns = [75, 148, 221, 294];

  return (
    <svg
      viewBox="0 0 400 280"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-labelledby="hb-title"
    >
      <title id="hb-title">Heritage Bungalow exterior preview</title>
      <defs>
        <linearGradient id="hb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde8c4" />
          <stop offset="100%" stopColor="#fbebd8" />
        </linearGradient>
        <linearGradient id="hb-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c0472a" />
          <stop offset="100%" stopColor="#a03820" />
        </linearGradient>
        <linearGradient id="hb-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0e6d2" />
          <stop offset="100%" stopColor="#e8d8bc" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#hb-sky)" />
      <rect x="0" y="230" width="400" height="50" fill="#8aad6a" />
      <polygon points="160,280 240,280 220,228 180,228" fill="#d4c9b0" />
      <rect
        x="30"
        y="140"
        width="340"
        height="90"
        fill="url(#hb-wall)"
        rx="1"
      />
      <line
        x1="30"
        y1="165"
        x2="370"
        y2="165"
        stroke="#d8c8a8"
        strokeWidth="0.5"
      />
      <line
        x1="30"
        y1="190"
        x2="370"
        y2="190"
        stroke="#d8c8a8"
        strokeWidth="0.5"
      />
      <line
        x1="30"
        y1="215"
        x2="370"
        y2="215"
        stroke="#d8c8a8"
        strokeWidth="0.5"
      />
      {/* Hip roof */}
      <polygon points="15,140 200,55 385,140" fill="url(#hb-roof)" />
      {tileCols.map((i) => (
        <rect
          key={`tile-${i}`}
          x={22 + i * 24}
          y={136}
          width="20"
          height="5"
          fill="#a03820"
          rx="1"
        />
      ))}
      <polygon
        points="15,142 200,57 385,142 370,142 200,63 30,142"
        fill="#8c3018"
        opacity="0.4"
      />
      <rect x="30" y="195" width="340" height="35" fill="#e8d8bc" />
      {/* Columns */}
      {columns.map((cx) => (
        <g key={`col-${cx}`}>
          <rect x={cx} y={140} width="16" height="90" fill="#d8c8a8" />
          <rect
            x={cx - 4}
            y={140}
            width="24"
            height="6"
            fill="#c8b898"
            rx="1"
          />
          <rect
            x={cx - 4}
            y={224}
            width="24"
            height="6"
            fill="#c8b898"
            rx="1"
          />
        </g>
      ))}
      {/* Windows */}
      <rect
        x="50"
        y="150"
        width="60"
        height="50"
        fill="#d4eeee"
        stroke="#a89060"
        strokeWidth="2"
        rx="1"
      />
      <line
        x1="80"
        y1="150"
        x2="80"
        y2="200"
        stroke="#a89060"
        strokeWidth="1.5"
      />
      <line
        x1="50"
        y1="175"
        x2="110"
        y2="175"
        stroke="#a89060"
        strokeWidth="1.5"
      />
      <rect
        x="170"
        y="150"
        width="60"
        height="50"
        fill="#d4eeee"
        stroke="#a89060"
        strokeWidth="2"
        rx="1"
      />
      <line
        x1="200"
        y1="150"
        x2="200"
        y2="200"
        stroke="#a89060"
        strokeWidth="1.5"
      />
      <line
        x1="170"
        y1="175"
        x2="230"
        y2="175"
        stroke="#a89060"
        strokeWidth="1.5"
      />
      <rect
        x="290"
        y="150"
        width="60"
        height="50"
        fill="#d4eeee"
        stroke="#a89060"
        strokeWidth="2"
        rx="1"
      />
      <line
        x1="320"
        y1="150"
        x2="320"
        y2="200"
        stroke="#a89060"
        strokeWidth="1.5"
      />
      <line
        x1="290"
        y1="175"
        x2="350"
        y2="175"
        stroke="#a89060"
        strokeWidth="1.5"
      />
      {/* Front door */}
      <rect x="178" y="180" width="44" height="50" fill="#7c4e2a" rx="2" />
      <path d="M178,195 Q200,180 222,195" fill="#6a3e20" />
      <circle cx="216" cy="205" r="3" fill="#d4a020" />
      {/* Trees */}
      <rect x="4" y="185" width="7" height="45" fill="#8c6840" />
      <ellipse cx="8" cy="178" rx="18" ry="22" fill="#2d7a20" />
      <rect x="388" y="180" width="7" height="50" fill="#8c6840" />
      <ellipse cx="392" cy="172" rx="16" ry="20" fill="#2d7a20" />
      <rect x="0" y="255" width="400" height="25" fill="rgba(100,50,10,0.45)" />
      <text
        x="200"
        y="271"
        textAnchor="middle"
        fontSize="11"
        fill="#fff"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Heritage Bungalow · 3BHK · 2000 sq.ft
      </text>
    </svg>
  );
}

// ── Design 9: Urban Duplex ────────────────────────────────────────────────────
export function UrbanDuplexPreview({ className = "" }: PreviewProps) {
  const stars: [number, number][] = [
    [40, 30],
    [80, 15],
    [130, 40],
    [200, 20],
    [280, 35],
    [340, 12],
    [370, 45],
    [30, 60],
    [160, 10],
  ];
  const fins = [115, 130, 145, 250, 265, 280];

  return (
    <svg
      viewBox="0 0 400 280"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-labelledby="ud-title"
    >
      <title id="ud-title">Urban Duplex 3-BHK exterior preview</title>
      <defs>
        <linearGradient id="ud-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2035" />
          <stop offset="100%" stopColor="#2d3b5a" />
        </linearGradient>
        <linearGradient id="ud-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4db0d8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2890b8" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#ud-sky)" />
      {stars.map(([sx, sy]) => (
        <circle
          key={`star-${sx}-${sy}`}
          cx={sx}
          cy={sy}
          r="1.2"
          fill="#fff"
          opacity="0.6"
        />
      ))}
      <rect x="0" y="235" width="400" height="45" fill="#181c28" />
      <rect x="0" y="234" width="400" height="3" fill="#e8a020" opacity="0.6" />
      <rect
        x="0"
        y="110"
        width="80"
        height="125"
        fill="#2a2f3e"
        opacity="0.6"
      />
      <rect
        x="320"
        y="100"
        width="80"
        height="135"
        fill="#2a2f3e"
        opacity="0.6"
      />
      {/* Ground floor */}
      <rect x="110" y="160" width="180" height="75" fill="#1e2230" rx="1" />
      <rect x="110" y="193" width="180" height="8" fill="#e8e8e8" />
      {/* First floor */}
      <rect x="110" y="80" width="180" height="80" fill="#252a38" rx="1" />
      <rect x="110" y="105" width="180" height="8" fill="#e8e8e8" />
      {/* Parapet + skylight */}
      <rect x="105" y="65" width="190" height="15" fill="#1a1f2c" rx="1" />
      <rect
        x="140"
        y="58"
        width="120"
        height="10"
        fill="url(#ud-glass)"
        rx="2"
      />
      <rect x="140" y="58" width="120" height="2" fill="#fff" opacity="0.4" />
      {/* Wooden fins */}
      {fins.map((fx) => (
        <rect
          key={`fin-${fx}`}
          x={fx}
          y={80}
          width="6"
          height="155"
          fill="#8B6340"
          rx="1"
          opacity="0.85"
        />
      ))}
      {/* Windows */}
      <rect
        x="160"
        y="165"
        width="70"
        height="55"
        fill="url(#ud-glass)"
        rx="1"
      />
      <line
        x1="195"
        y1="165"
        x2="195"
        y2="220"
        stroke="#1a6a88"
        strokeWidth="1"
      />
      <rect
        x="155"
        y="85"
        width="90"
        height="55"
        fill="url(#ud-glass)"
        rx="1"
      />
      <line
        x1="200"
        y1="85"
        x2="200"
        y2="140"
        stroke="#1a6a88"
        strokeWidth="1"
      />
      <rect
        x="155"
        y="85"
        width="90"
        height="55"
        fill="none"
        stroke="#111"
        strokeWidth="2"
        rx="1"
      />
      <rect
        x="155"
        y="75"
        width="90"
        height="8"
        fill="rgba(100,200,240,0.25)"
        stroke="rgba(100,200,240,0.5)"
        strokeWidth="1"
        rx="1"
      />
      {/* Entrance */}
      <rect x="185" y="195" width="30" height="40" fill="#111" rx="1" />
      <rect x="180" y="192" width="40" height="3" fill="#e8a020" rx="1" />
      <rect
        x="110"
        y="157"
        width="180"
        height="3"
        fill="#e8c060"
        opacity="0.7"
        rx="1"
      />
      <rect
        x="110"
        y="77"
        width="180"
        height="3"
        fill="#e8c060"
        opacity="0.7"
        rx="1"
      />
      <ellipse cx="200" cy="240" rx="60" ry="8" fill="#e8a020" opacity="0.15" />
      <rect x="0" y="255" width="400" height="25" fill="rgba(0,0,0,0.55)" />
      <text
        x="200"
        y="271"
        textAnchor="middle"
        fontSize="11"
        fill="#fff"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Urban Duplex · 3BHK · 1056 sq.ft · Ultra Premium
      </text>
    </svg>
  );
}

// ── Design 10: Skyline Modern House ──────────────────────────────────────────
export function SkylineModernPreview({ className = "" }: PreviewProps) {
  const stoneCourses = [165, 175, 185, 195, 205, 215, 225];
  const stoneJoints = [55, 110, 165, 220, 275, 330];
  const pergolaSlats = [130, 155, 180, 205, 230, 255];
  const entryFins = [155, 168, 225, 238];

  return (
    <svg
      viewBox="0 0 400 280"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-labelledby="sm-title"
    >
      <title id="sm-title">Skyline Modern House exterior preview</title>
      <defs>
        <linearGradient id="sm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8dff0" />
          <stop offset="100%" stopColor="#e8f4ff" />
        </linearGradient>
        <linearGradient id="sm-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#3a3a3a" />
        </linearGradient>
        <linearGradient id="sm-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a0cce0" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#70a8c8" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="sm-upper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0ece4" />
          <stop offset="100%" stopColor="#e4e0d8" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" fill="url(#sm-sky)" />
      <ellipse cx="80" cy="30" rx="40" ry="14" fill="white" opacity="0.7" />
      <ellipse cx="110" cy="24" rx="28" ry="12" fill="white" opacity="0.7" />
      <ellipse cx="300" cy="40" rx="35" ry="12" fill="white" opacity="0.65" />
      <rect x="0" y="230" width="400" height="50" fill="#7aa85a" />
      <polygon points="150,280 250,280 235,228 165,228" fill="#c8c0b0" />
      {/* Ground floor — stone cladding */}
      <rect
        x="15"
        y="155"
        width="370"
        height="75"
        fill="url(#sm-stone)"
        rx="1"
      />
      {stoneCourses.map((sy) => (
        <line
          key={`course-${sy}`}
          x1="15"
          x2="385"
          y1={sy}
          y2={sy}
          stroke="#555"
          strokeWidth="0.5"
        />
      ))}
      {stoneJoints.map((sx) => (
        <line
          key={`joint-${sx}`}
          x1={sx}
          x2={sx}
          y1="155"
          y2="230"
          stroke="#555"
          strokeWidth="0.5"
        />
      ))}
      <rect
        x="40"
        y="160"
        width="70"
        height="55"
        fill="url(#sm-glass)"
        rx="1"
      />
      <rect
        x="165"
        y="160"
        width="110"
        height="55"
        fill="url(#sm-glass)"
        rx="1"
      />
      <rect
        x="295"
        y="160"
        width="70"
        height="55"
        fill="url(#sm-glass)"
        rx="1"
      />
      <rect x="40" y="215" width="70" height="2" fill="#f0c060" opacity="0.8" />
      <rect
        x="165"
        y="215"
        width="110"
        height="2"
        fill="#f0c060"
        opacity="0.8"
      />
      <rect
        x="295"
        y="215"
        width="70"
        height="2"
        fill="#f0c060"
        opacity="0.8"
      />
      {/* Second floor */}
      <rect
        x="15"
        y="75"
        width="370"
        height="80"
        fill="url(#sm-upper)"
        rx="1"
      />
      <rect x="30" y="82" width="80" height="60" fill="url(#sm-glass)" rx="1" />
      <line x1="70" y1="82" x2="70" y2="142" stroke="#6090a8" strokeWidth="1" />
      <rect
        x="165"
        y="82"
        width="80"
        height="60"
        fill="url(#sm-glass)"
        rx="1"
      />
      <rect
        x="300"
        y="82"
        width="70"
        height="60"
        fill="url(#sm-glass)"
        rx="1"
      />
      <rect
        x="30"
        y="73"
        width="80"
        height="6"
        fill="rgba(130,190,220,0.35)"
        stroke="rgba(100,160,200,0.6)"
        strokeWidth="1"
        rx="1"
      />
      {/* Flat roof + pergola */}
      <rect x="10" y="60" width="380" height="15" fill="#484848" rx="1" />
      <rect x="120" y="50" width="160" height="10" fill="#5a4520" rx="1" />
      {pergolaSlats.map((px) => (
        <rect
          key={`slat-${px}`}
          x={px}
          y={40}
          width="5"
          height="22"
          fill="#6a5025"
          rx="1"
        />
      ))}
      <ellipse cx="145" cy="38" rx="12" ry="8" fill="#3d7a2a" />
      <ellipse cx="200" cy="36" rx="14" ry="9" fill="#4a9030" />
      <ellipse cx="255" cy="38" rx="11" ry="8" fill="#3d7a2a" />
      {/* Entry fins */}
      {entryFins.map((fx) => (
        <rect
          key={`efin-${fx}`}
          x={fx}
          y={135}
          width="7"
          height="95"
          fill="#8B6340"
          rx="1"
        />
      ))}
      {/* Front door */}
      <rect x="172" y="160" width="56" height="70" fill="#1a1a1a" rx="1" />
      <rect x="174" y="162" width="24" height="66" fill="#111" rx="1" />
      <rect x="201" y="162" width="24" height="66" fill="#111" rx="1" />
      <circle cx="218" cy="198" r="3" fill="#c8a030" />
      <rect x="145" y="150" width="110" height="8" fill="#3a3a3a" rx="1" />
      {/* Trees */}
      <rect x="2" y="190" width="8" height="40" fill="#8c6840" />
      <ellipse cx="6" cy="183" rx="18" ry="22" fill="#3a8a28" />
      <rect x="386" y="185" width="8" height="45" fill="#8c6840" />
      <ellipse cx="390" cy="177" rx="16" ry="20" fill="#3a8a28" />
      <rect x="0" y="255" width="400" height="25" fill="rgba(0,0,0,0.38)" />
      <text
        x="200"
        y="271"
        textAnchor="middle"
        fontSize="11"
        fill="#fff"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        Skyline Modern House · 4BHK · 1530 sq.ft
      </text>
    </svg>
  );
}

// ── Registry ─────────────────────────────────────────────────────────────────

import type { ComponentType } from "react";

export const DESIGN_PREVIEWS: Record<string, ComponentType<PreviewProps>> = {
  "7": ModernFlatRoofPreview,
  "8": HeritageBungalowPreview,
  "9": UrbanDuplexPreview,
  "10": SkylineModernPreview,
};

/** Returns true if a design ID has a custom SVG preview component */
export function hasSvgPreview(id: bigint): boolean {
  return id >= BigInt(7) && id <= BigInt(10);
}
