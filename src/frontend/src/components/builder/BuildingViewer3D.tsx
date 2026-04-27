import type { BuilderResult, BuildingStage } from "@/types/builder";
import { Grid, OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Lock } from "lucide-react";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// ─── Stage ordering helper ────────────────────────────────────────────────────

const STAGE_ORDER: BuildingStage[] = [
  "site_prep",
  "foundation",
  "structure",
  "roofing",
  "electrical_plumbing",
  "finishing",
  "interior",
];

function stageIndex(stage: BuildingStage | null): number {
  if (!stage) return STAGE_ORDER.length; // show all
  return STAGE_ORDER.indexOf(stage);
}

function showFrom(
  stage: BuildingStage,
  activeStage: BuildingStage | null,
): boolean {
  if (activeStage === null) return true;
  return STAGE_ORDER.indexOf(activeStage) >= STAGE_ORDER.indexOf(stage);
}

// ─── Stage config for legend ─────────────────────────────────────────────────

const STAGE_CONFIG: {
  id: BuildingStage;
  label: string;
  color: string;
  dot: string;
  tier: "free" | "premium" | "ultraPremium";
}[] = [
  {
    id: "site_prep",
    label: "Site Prep",
    color: "#6EE7B7",
    dot: "bg-emerald-400",
    tier: "free",
  },
  {
    id: "foundation",
    label: "Foundation",
    color: "#F59E0B",
    dot: "bg-amber-500",
    tier: "free",
  },
  {
    id: "structure",
    label: "Structure",
    color: "#94A3B8",
    dot: "bg-slate-400",
    tier: "free",
  },
  {
    id: "roofing",
    label: "Roofing",
    color: "#A78BFA",
    dot: "bg-violet-400",
    tier: "premium",
  },
  {
    id: "electrical_plumbing",
    label: "Elec/Plumbing",
    color: "#38BDF8",
    dot: "bg-sky-400",
    tier: "premium",
  },
  {
    id: "finishing",
    label: "Finishing",
    color: "#F5F5F5",
    dot: "bg-neutral-300",
    tier: "premium",
  },
  {
    id: "interior",
    label: "Interior",
    color: "#F4A261",
    dot: "bg-orange-400",
    tier: "ultraPremium",
  },
];

// ─── Lights ───────────────────────────────────────────────────────────────────

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#F4A261" />
    </>
  );
}

// ─── Loading Scene ────────────────────────────────────────────────────────────

function LoadingScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.8;
      meshRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#6366F1" wireframe />
      </mesh>
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Generating...
      </Text>
    </group>
  );
}

// ─── Empty Scene ──────────────────────────────────────────────────────────────

function EmptyScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.2 + 1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#1E3A5F" opacity={0.6} transparent />
      </mesh>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.35}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
      >
        Enter details to generate your building
      </Text>
    </group>
  );
}

// ─── Building Model ───────────────────────────────────────────────────────────

interface BuildingModelProps {
  result: BuilderResult;
  activeStage: BuildingStage | null;
  userTier: "free" | "premium" | "ultraPremium";
}

function BuildingModel({ result, activeStage, userTier }: BuildingModelProps) {
  const { input, foundationType } = result;
  const plotLength = input.plotLength || 10;
  const plotWidth = input.plotWidth || 8;
  const floors = input.floors || 1;
  const style = input.style || "modern";
  const floorHeight = 3.2;
  const totalHeight = floorHeight * floors;
  const activeIdx = stageIndex(activeStage);

  // Foundation color by type
  const foundationColor = useMemo(() => {
    if (foundationType === "pile") return "#696969";
    if (foundationType === "raft") return "#A0522D";
    return "#8B4513";
  }, [foundationType]);

  // Wall color by style
  const wallColor = useMemo(() => {
    const map: Record<string, string> = {
      modern: "#F5F5F5",
      luxury: "#E8E8E8",
      traditional: "#D2B48C",
      minimal: "#FFFFFF",
    };
    return map[style] ?? "#F5F5F5";
  }, [style]);

  // Corner column positions
  const columnPositions = useMemo(() => {
    const ox = (plotLength * 0.85) / 2;
    const oz = (plotWidth * 0.85) / 2;
    const positions: [number, number, number][] = [
      [ox, totalHeight / 2, oz],
      [-ox, totalHeight / 2, oz],
      [ox, totalHeight / 2, -oz],
      [-ox, totalHeight / 2, -oz],
    ];
    // Add intermediate columns for >2 floors
    if (floors > 2) {
      positions.push([0, totalHeight / 2, oz]);
      positions.push([0, totalHeight / 2, -oz]);
    }
    if (floors > 4) {
      positions.push([ox, totalHeight / 2, 0]);
      positions.push([-ox, totalHeight / 2, 0]);
      positions.push([0, totalHeight / 2, 0]);
    }
    return positions;
  }, [plotLength, plotWidth, floors, totalHeight]);

  // Floor slab positions
  const floorSlabPositions = useMemo(() => {
    return Array.from({ length: floors }, (_, i) => ({
      y: (i + 1) * 3.2 - 0.075,
      floor: i + 1,
    }));
  }, [floors]);

  const showSitePrepElements = activeIdx >= 0;
  const showFoundation = showFrom("foundation", activeStage);
  const showStructure = showFrom("structure", activeStage);
  const showRoofing = showFrom("roofing", activeStage);
  const showElecPlumbing =
    activeStage === "electrical_plumbing" ||
    activeIdx > STAGE_ORDER.indexOf("electrical_plumbing");
  const showFinishing = showFrom("finishing", activeStage);
  const showInterior =
    showFrom("interior", activeStage) && userTier === "ultraPremium";
  const highlightElecPlumbing = activeStage === "electrical_plumbing";

  return (
    <group>
      {/* Ground Plane */}
      {showSitePrepElements && (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
          position={[0, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#3A5F3A" />
        </mesh>
      )}

      {/* Foundation Slab */}
      {showFoundation && (
        <>
          <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[plotLength * 0.95, 0.3, plotWidth * 0.95]} />
            <meshStandardMaterial color={foundationColor} />
          </mesh>
          {/* Pile foundations */}
          {foundationType === "pile" &&
            columnPositions.slice(0, 4).map(([x, , z], _i, _arr) => (
              <mesh
                key={`pile-${x.toFixed(2)}-${z.toFixed(2)}`}
                position={[x, -1, z]}
              >
                <cylinderGeometry args={[0.15, 0.2, 2.2, 12]} />
                <meshStandardMaterial color="#4A4A4A" />
              </mesh>
            ))}
          <Text
            position={[0, 0.8, plotWidth * 0.5 + 0.5]}
            fontSize={0.3}
            color="#F59E0B"
            anchorX="center"
            anchorY="middle"
          >
            Foundation
          </Text>
        </>
      )}

      {/* Columns */}
      {showStructure &&
        columnPositions.map(([x, , z]) => (
          <mesh
            key={`col-${x.toFixed(2)}-${z.toFixed(2)}`}
            position={[x, totalHeight / 2, z]}
            castShadow
          >
            <cylinderGeometry args={[0.2, 0.2, totalHeight, 16]} />
            <meshStandardMaterial color="#808080" />
          </mesh>
        ))}

      {/* Floor Slabs */}
      {showStructure &&
        floorSlabPositions.map(({ y, floor }) => (
          <mesh
            key={`slab-${floor}`}
            position={[0, y, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[plotLength * 0.9, 0.15, plotWidth * 0.9]} />
            <meshStandardMaterial color="#C0C0C0" />
          </mesh>
        ))}

      {/* Structure label */}
      {showStructure && (
        <Text
          position={[0, totalHeight + 0.5, 0]}
          fontSize={0.3}
          color="#94A3B8"
          anchorX="center"
          anchorY="middle"
        >
          {floors}F Structure
        </Text>
      )}

      {/* Roof */}
      {showRoofing && (
        <>
          {style === "traditional" ? (
            // Gable roof using a prism-like box with skew
            <mesh position={[0, totalHeight + 0.8, 0]} castShadow>
              <coneGeometry
                args={[Math.max(plotLength, plotWidth) * 0.65, 1.6, 4]}
              />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
          ) : (
            // Flat roof with overhang
            <mesh position={[0, totalHeight + 0.1, 0]} castShadow receiveShadow>
              <boxGeometry args={[plotLength * 1.05, 0.2, plotWidth * 1.05]} />
              <meshStandardMaterial color="#8B8B8B" />
            </mesh>
          )}
          <Text
            position={[0, totalHeight + 1.5, 0]}
            fontSize={0.3}
            color="#A78BFA"
            anchorX="center"
            anchorY="middle"
          >
            Roof
          </Text>
        </>
      )}

      {/* Electrical / Plumbing conduits */}
      {showElecPlumbing && (
        <>
          {/* Electrical conduits - yellow */}
          {columnPositions.slice(0, 2).map(([x, , z]) => (
            <mesh
              key={`elec-${x.toFixed(2)}-${z.toFixed(2)}`}
              position={[x + 0.3, totalHeight / 2, z + 0.3]}
            >
              <cylinderGeometry args={[0.04, 0.04, totalHeight * 0.9, 8]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive={highlightElecPlumbing ? "#FFD700" : "#000000"}
                emissiveIntensity={highlightElecPlumbing ? 0.4 : 0}
              />
            </mesh>
          ))}
          {/* Plumbing pipes - blue */}
          {columnPositions.slice(2, 4).map(([x, , z]) => (
            <mesh
              key={`plumb-${x.toFixed(2)}-${z.toFixed(2)}`}
              position={[x - 0.3, totalHeight / 2, z - 0.3]}
            >
              <cylinderGeometry args={[0.06, 0.06, totalHeight * 0.85, 8]} />
              <meshStandardMaterial
                color="#38BDF8"
                emissive={highlightElecPlumbing ? "#38BDF8" : "#000000"}
                emissiveIntensity={highlightElecPlumbing ? 0.4 : 0}
              />
            </mesh>
          ))}
        </>
      )}

      {/* Exterior Walls */}
      {showFinishing &&
        floorSlabPositions.map(({ floor }) => {
          const baseY = (floor - 1) * floorHeight + floorHeight / 2;
          const wallH = floorHeight - 0.15;
          const halfL = (plotLength * 0.9) / 2;
          const halfW = (plotWidth * 0.9) / 2;
          return (
            <group key={`walls-${floor}`}>
              {/* Front wall */}
              <mesh position={[0, baseY, halfW]} castShadow>
                <boxGeometry args={[plotLength * 0.9, wallH, 0.2]} />
                <meshStandardMaterial color={wallColor} />
              </mesh>
              {/* Back wall */}
              <mesh position={[0, baseY, -halfW]} castShadow>
                <boxGeometry args={[plotLength * 0.9, wallH, 0.2]} />
                <meshStandardMaterial color={wallColor} />
              </mesh>
              {/* Left wall */}
              <mesh position={[-halfL, baseY, 0]} castShadow>
                <boxGeometry args={[0.2, wallH, plotWidth * 0.9]} />
                <meshStandardMaterial color={wallColor} />
              </mesh>
              {/* Right wall */}
              <mesh position={[halfL, baseY, 0]} castShadow>
                <boxGeometry args={[0.2, wallH, plotWidth * 0.9]} />
                <meshStandardMaterial color={wallColor} />
              </mesh>
            </group>
          );
        })}

      {/* Interior Elements (Ultra Premium) */}
      {showInterior && (
        <group position={[0, floorHeight / 2, 0]}>
          {/* Kitchen counter */}
          <mesh
            position={[plotLength * 0.3, 0.45, plotWidth * 0.35]}
            castShadow
          >
            <boxGeometry args={[plotLength * 0.25, 0.9, plotWidth * 0.1]} />
            <meshStandardMaterial color="#F4A261" />
          </mesh>
          {/* Bed - master bedroom */}
          <mesh
            position={[-plotLength * 0.28, 0.3, -plotWidth * 0.28]}
            castShadow
          >
            <boxGeometry args={[plotLength * 0.18, 0.6, plotWidth * 0.2]} />
            <meshStandardMaterial color="#74C0FC" />
          </mesh>
          {/* Bathroom fixture */}
          <mesh
            position={[plotLength * 0.3, 0.2, -plotWidth * 0.35]}
            castShadow
          >
            <boxGeometry args={[plotLength * 0.08, 0.4, plotWidth * 0.1]} />
            <meshStandardMaterial color="#74C7CE" />
          </mesh>
          {/* Living area sofa */}
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[plotLength * 0.2, 0.5, plotWidth * 0.1]} />
            <meshStandardMaterial color="#A78BFA" />
          </mesh>
        </group>
      )}
    </group>
  );
}

// ─── Stage Legend ─────────────────────────────────────────────────────────────

interface StageLegendProps {
  activeStage: BuildingStage | null;
  userTier: "free" | "premium" | "ultraPremium";
  onStageClick: (stage: BuildingStage) => void;
}

function StageLegend({
  activeStage,
  userTier,
  onStageClick,
}: StageLegendProps) {
  const tierLevel =
    userTier === "ultraPremium" ? 2 : userTier === "premium" ? 1 : 0;
  const tierMap: Record<"free" | "premium" | "ultraPremium", number> = {
    free: 0,
    premium: 1,
    ultraPremium: 2,
  };

  return (
    <div className="flex flex-wrap gap-2 px-3 py-2 bg-card/80 backdrop-blur border-t border-border">
      {STAGE_CONFIG.map((stage) => {
        const isActive = activeStage === stage.id;
        const isLocked = tierLevel < tierMap[stage.tier];

        return (
          <button
            type="button"
            key={stage.id}
            data-ocid={`building_viewer.stage_${stage.id}.tab`}
            onClick={() => !isLocked && onStageClick(stage.id)}
            disabled={isLocked}
            className={[
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-smooth",
              isActive
                ? "border-accent text-accent bg-accent/10"
                : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
              isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            ].join(" ")}
          >
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "scale-125" : ""}`}
              style={{ backgroundColor: stage.color }}
            />
            {stage.label}
            {isLocked && <Lock className="w-2.5 h-2.5" />}
          </button>
        );
      })}
      {activeStage !== null && (
        <button
          type="button"
          data-ocid="building_viewer.show_all.button"
          onClick={() => onStageClick(activeStage)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-primary/50 text-primary hover:bg-primary/10 transition-smooth"
        >
          Show All
        </button>
      )}
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface BuildingViewer3DProps {
  result: BuilderResult | null;
  activeStage: BuildingStage | null;
  userTier: "free" | "premium" | "ultraPremium";
  isGenerating: boolean;
  onStageChange?: (stage: BuildingStage | null) => void;
}

export default function BuildingViewer3D({
  result,
  activeStage,
  userTier,
  isGenerating,
  onStageChange,
}: BuildingViewer3DProps) {
  const handleStageClick = (stage: BuildingStage) => {
    if (onStageChange) {
      onStageChange(activeStage === stage ? null : stage);
    }
  };

  return (
    <div
      className="relative flex flex-col w-full h-full"
      data-ocid="building_viewer.panel"
    >
      {/* 3D Canvas */}
      <div
        className="flex-1 relative overflow-hidden"
        data-ocid="building_viewer.canvas_target"
      >
        <Canvas
          shadows
          camera={{ position: [15, 12, 15], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
          gl={{ antialias: true }}
          scene={{ background: new THREE.Color("#0d1324") }}
        >
          <Lights />

          <Grid
            position={[0, 0.01, 0]}
            args={[30, 30]}
            cellSize={1}
            cellThickness={0.4}
            cellColor="#2a3a5e"
            sectionSize={5}
            sectionThickness={0.8}
            sectionColor="#3a4a6e"
            fadeDistance={40}
            fadeStrength={1}
            infiniteGrid={false}
          />

          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={false}
            enableDamping
            dampingFactor={0.05}
          />

          {isGenerating && <LoadingScene />}
          {!isGenerating && result && (
            <BuildingModel
              result={result}
              activeStage={activeStage}
              userTier={userTier}
            />
          )}
          {!isGenerating && !result && <EmptyScene />}
        </Canvas>

        {/* Overlay badge showing active stage */}
        {activeStage && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <span className="stage-badge text-xs">
              {STAGE_CONFIG.find((s) => s.id === activeStage)?.label ??
                activeStage}
            </span>
          </div>
        )}

        {/* Tier overlay for locked content */}
        {userTier === "free" && result && (
          <div
            className="absolute bottom-12 right-3 pointer-events-none"
            data-ocid="building_viewer.tier_lock.toast"
          >
            <div className="bg-card/90 backdrop-blur border border-accent/30 rounded-lg px-3 py-2 text-xs text-muted-foreground max-w-[160px] text-center">
              <Lock className="w-3.5 h-3.5 text-accent mx-auto mb-1" />
              Upgrade to Premium for full visualization
            </div>
          </div>
        )}

        {/* Controls hint */}
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <span className="text-xs text-muted-foreground/60 bg-card/60 backdrop-blur px-2 py-1 rounded">
            Drag to rotate · Scroll to zoom
          </span>
        </div>
      </div>

      {/* Stage Legend */}
      <StageLegend
        activeStage={activeStage}
        userTier={userTier}
        onStageClick={handleStageClick}
      />
    </div>
  );
}
