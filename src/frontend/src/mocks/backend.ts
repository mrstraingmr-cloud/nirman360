import type { backendInterface } from "../backend";
import {
  DesignCategory,
  DesignTier,
  InquiryStatus,
  MaterialGrade,
  Region,
  Variant_ok_notAuthenticated_notFound,
  Variant_ok_notAuthenticated_notFound_limitReached,
  Variant_ok_notAuthorized_notFound,
} from "../backend";

// ── 5-Stage Construction Steps ──────────────────────────────────────────────

const constructionStages = [
  {
    step: BigInt(1),
    stageName: "Base & Foundation",
    stageType: "FOUNDATION",
    stageImageUrl: "/assets/generated/stage-1-foundation.dim_800x500.jpg",
    description:
      "The foundation is the most critical stage of any structure. We begin with a detailed soil test and topographic survey to determine bearing capacity. Excavation follows to the required depth, after which PCC (Plain Cement Concrete) is laid as a leveling course. Footing reinforcement with TMT steel bars is then placed and concrete is poured. Column stubs are cast with precise alignment using surveying instruments. Once the footings cure for 28 days, plinth beams are constructed to tie the foundation together, ensuring even load distribution across the entire base.",
    activities:
      "Soil testing & survey,Excavation to required depth,PCC leveling course,Footing reinforcement (TMT steel),Concrete pouring & curing,Column stub casting,Plinth beam construction",
    durationDays: BigInt(21),
  },
  {
    step: BigInt(2),
    stageName: "Raw Structure",
    stageType: "STRUCTURE",
    stageImageUrl: "/assets/generated/stage-2-structure.dim_800x500.jpg",
    description:
      "The structural framework defines the skeleton of the building. Columns are cast floor by floor using formwork, with M20 or M25 grade concrete depending on structural load. Beams are formed at each slab level, tying all columns into a rigid frame. The slab formwork (centering) is erected and reinforcement mesh is laid before concrete is poured. Each slab requires 28 days of curing with continuous water sprinkling. Brick masonry walls begin once the slab is cured, with AAC blocks or red bricks laid in cement mortar. Lintels are cast above all door and window openings for structural continuity.",
    activities:
      "Column formwork & casting,Beam reinforcement & pouring,Slab centering & shuttering,RCC slab pouring & curing,AAC block/brick masonry walls,Lintel casting above openings,Floor-to-floor repetition",
    durationDays: BigInt(45),
  },
  {
    step: BigInt(3),
    stageName: "Electrical & Plumbing",
    stageType: "MEP",
    stageImageUrl: "/assets/generated/stage-3-mep.dim_800x500.jpg",
    description:
      "MEP (Mechanical, Electrical & Plumbing) work is embedded into the structure before walls are plastered. Electrical conduits (CPVC or PVC pipes) are chased into walls and slabs before concrete is poured at slab level. All wiring runs are completed with ISI-marked copper cables through concealed conduits. Plumbing lines for water supply (CPVC) and drainage (SWR pipes) are laid with precise slopes. Bathroom drain traps, soil pipes, and water supply risers are installed and pressure-tested before walls are closed. Earthing pits are dug and connected to the electrical system per IS 3043 norms.",
    activities:
      "Electrical conduit chasing in walls,Concealed wiring with ISI cables,CPVC water supply lines,SWR drainage pipe network,Bathroom & kitchen rough-in,Pressure testing all pipes,Earthing & lightning protection",
    durationDays: BigInt(18),
  },
  {
    step: BigInt(4),
    stageName: "Enclosure & Finishing",
    stageType: "ENCLOSURE",
    stageImageUrl: "/assets/generated/stage-4-enclosure.dim_800x500.jpg",
    description:
      "Enclosure work seals and weatherproofs the structure. Plastering is done in two coats — a rough backing coat followed by a smooth finish coat — on all internal and external wall surfaces. External walls receive a waterproof cement plaster. Windows and door frames (aluminum or UPVC) are fixed with precise leveling and packed with cement mortar. The roof receives a sloped brick bat coba (BBC) waterproofing layer topped with a china mosaic or IPS (Indian Patent Stone) finish. Exterior texture paint or tile cladding is applied as the outermost weather protection layer. Sunshades and chajjas over windows are cast.",
    activities:
      "Internal & external plastering,Door & window frame fixing,Roof waterproofing (BBC/IPS),Exterior texture/tile cladding,Sunshades & chajja casting,Compound wall & gate",
    durationDays: BigInt(25),
  },
  {
    step: BigInt(5),
    stageName: "Interior & Fit-Out",
    stageType: "INTERIOR",
    stageImageUrl: "/assets/generated/stage-5-interior.dim_800x500.jpg",
    description:
      "The fit-out stage transforms the raw structure into a liveable home. Flooring tiles (vitrified or ceramic) are laid on a mortar bed with precise leveling. Kitchen countertops in granite or quartz are fabricated and installed with modular cabinets. Bathroom wall tiles, sanitary ware (WC, wash basin, shower panels), and CP fittings are installed. False ceilings in gypsum board or POP are fixed in living areas and bedrooms with provision for light fittings. Electrical switchboards, MCB panels, and modular switches are fitted and commissioned. Interior doors with solid core shutters and door hardware are hung and aligned. A final coat of premium emulsion paint on all interior surfaces completes the project.",
    activities:
      "Vitrified & ceramic tile flooring,Modular kitchen installation,Bathroom tiles & sanitary ware,False ceiling (gypsum/POP),Electrical panels & switches,Interior door hanging & hardware,Premium interior emulsion paint",
    durationDays: BigInt(30),
  },
];

// ── Design 7: Modern Flat-Roof Villa construction stages ─────────────────────
const flatRoofVillaStages = [
  {
    step: BigInt(1),
    stageName: "Base & Foundation",
    stageType: "FOUNDATION",
    stageImageUrl: "/assets/generated/stage-1-foundation.dim_800x500.jpg",
    description:
      "The Modern Flat-Roof Villa sits on a 34×46 ft plot requiring a meticulously designed raft foundation to handle the uniform slab loads typical of flat-roof construction. Soil investigation reveals medium bearing capacity, necessitating a 600mm deep raft with M25 concrete and Fe500 TMT reinforcement at 150mm spacing both ways. Column pedestals are cast monolithically with the raft. Waterproofing membrane is applied beneath the raft slab to prevent moisture ingress from the sub-soil. Anti-termite chemical treatment is done before the PCC layer. The plinth is raised 600mm above natural ground level for flood protection, with gravel-filled drainage channels along the perimeter.",
    activities:
      "Soil bearing capacity test,Raft foundation excavation,PCC 100mm leveling layer,Raft reinforcement (Fe500 two-way mesh),M25 concrete pour & curing,Column pedestal casting,Sub-slab waterproofing membrane,Anti-termite treatment",
    durationDays: BigInt(25),
  },
  {
    step: BigInt(2),
    stageName: "Raw Structure",
    stageType: "STRUCTURE",
    stageImageUrl: "/assets/generated/stage-2-structure.dim_800x500.jpg",
    description:
      "The two-floor structural frame uses a column-beam RCC skeleton with M25 grade concrete. Ground floor columns are 230×450mm, designed to support the floor-to-ceiling glass panels on the facade. The ground floor slab is 150mm thick with a cantilevered porch extending 1.2m. First floor columns continue at 230×300mm with the flat roof slab being 175mm thick to handle rooftop garden load (live load 5 kN/m²). AAC block walls 200mm thick are used for all exterior walls for superior thermal insulation. The parapet wall around the flat roof is 750mm high with an inbuilt RCC railing groove for glass balustrades. All beam-column junctions have a 45° haunch for improved joint stiffness.",
    activities:
      "Column formwork (G+1),Beam casting at each slab level,Ground floor flat slab,First floor flat slab pour,Rooftop parapet wall casting,AAC block exterior walls 200mm,Interior partition walls 100mm,Porch cantilever slab",
    durationDays: BigInt(50),
  },
  {
    step: BigInt(3),
    stageName: "Electrical & Plumbing",
    stageType: "MEP",
    stageImageUrl: "/assets/generated/stage-3-mep.dim_800x500.jpg",
    description:
      "Modern electrical design with a smart home-ready conduit layout. Heavy-duty concealed conduits (25mm CPVC) are laid in slabs for future home automation cabling. The main distribution board (MDB) is 3-phase with MCB and ELCB protection. Separate circuits are provided for AC units (all bedrooms and living room), kitchen appliances, and outdoor lighting. LED strip light channels are cast into the false ceiling perimeter during this stage. Hot-water plumbing lines use 25mm CPVC with thermal lagging for the rooftop solar water heater connection. The drainage stack is a 110mm SWR column running through a concealed shaft. Rainwater drains from the flat roof lead to underground storage for reuse.",
    activities:
      "3-phase MDB installation,Smart home conduit grid in slabs,AC circuit heavy-duty wiring,LED channel casting in ceilings,Solar water heater CPVC lines,Rooftop rainwater drain network,SWR drainage stack in shaft,Kitchen & bathroom rough-in",
    durationDays: BigInt(20),
  },
  {
    step: BigInt(4),
    stageName: "Enclosure & Finishing",
    stageType: "ENCLOSURE",
    stageImageUrl: "/assets/generated/stage-4-enclosure.dim_800x500.jpg",
    description:
      "The dark grey panel facade is achieved with a combination of exterior-grade Alucobond ACM panels in charcoal grey (RAL 7021) over a concealed aluminum sub-frame anchored to the AAC block walls. The large floor-to-ceiling window openings are fitted with thermally broken aluminium frames with 8mm toughened glass and UV-blocking coating. Wooden finish HPL (High Pressure Laminate) accent fins are installed as vertical screens on the east and west elevations using stainless steel standoff brackets. The flat roof receives a 3-layer waterproofing system: SBS bitumen membrane + cement board screed + pavers for the rooftop garden zone. External LED strip lights are installed under the overhangs and along the parapet.",
    activities:
      "ACM panel facade cladding,Aluminium glazing sub-frame,Floor-to-ceiling toughened glass,HPL wooden fin installation,3-layer flat roof waterproofing,Rooftop garden substrate (paver + gravel),External LED lighting,Compound wall & sliding gate",
    durationDays: BigInt(30),
  },
  {
    step: BigInt(5),
    stageName: "Interior & Fit-Out",
    stageType: "INTERIOR",
    stageImageUrl: "/assets/generated/stage-5-interior.dim_800x500.jpg",
    description:
      "Premium interior finishing reflects the villa's modern character. Large format 800×800mm vitrified tiles in light beige lay across living and dining areas with invisible grout joints. Master bedroom has engineered oak wood flooring with an underfloor heating mat. The modular kitchen features handle-less profile cabinets in matte white with a waterfall-edge Calacatta quartz countertop and integrated Bosch appliances. Bathrooms receive floor-to-ceiling 300×600mm tiles, frameless shower enclosures, and wall-hung WCs. A 9ft false ceiling in the living room houses recessed LED spotlights and an architectural cove light. Bedroom wardrobes are fully fitted with internal organizers. All walls finish with two coats of Jotun Sens premium emulsion in carefully selected palettes.",
    activities:
      "800×800mm vitrified tile flooring,Oak engineered wood in bedrooms,Modular kitchen & Bosch appliances,Frameless shower & wall-hung WC,9ft false ceiling with cove lighting,Built-in wardrobes with organizers,Jotun premium interior paint,Smart switches & dimmers",
    durationDays: BigInt(35),
  },
];

// ── Design 8: Heritage Bungalow construction stages ─────────────────────────
const heritageBungalowStages = [
  {
    step: BigInt(1),
    stageName: "Base & Foundation",
    stageType: "FOUNDATION",
    stageImageUrl: "/assets/generated/stage-1-foundation.dim_800x500.jpg",
    description:
      "The Heritage Bungalow occupies a generous 40×50 ft single-floor footprint with a combined veranda and main structure. Isolated footings with tie beams are used, sized for the single-floor load. Soil investigation confirms medium black cotton soil, requiring lime stabilization of the top 600mm before excavation. Footings are 1200×1200×400mm in M20 concrete. Column stubs are 230×230mm rising to the plinth band. A continuous plinth band of 300mm depth is cast to tie all columns and resist differential settlement. The entire plinth is raised 450mm above natural ground on a compacted red moram fill. The heritage compound requires a front entrance with brick pillars at 4m spacing, foundations for which are cast in this stage.",
    activities:
      "Black cotton soil lime treatment,Isolated footing excavation & casting,Plinth tie beam casting,Column stub (230×230mm),Plinth raising with compacted moram,Boundary wall strip foundation,Front entrance pillar foundation,Anti-termite soil treatment",
    durationDays: BigInt(22),
  },
  {
    step: BigInt(2),
    stageName: "Raw Structure",
    stageType: "STRUCTURE",
    stageImageUrl: "/assets/generated/stage-2-structure.dim_800x500.jpg",
    description:
      "Single floor column-beam RCC frame with M20 concrete and 230×230mm columns. The prominent heritage feature — the front veranda — spans the full 40ft width with 8 decorative turned RCC columns of 200mm round section spaced at 2.4m centers. These columns support a 200mm deep RCC beam with carved bracket details cast in place. The main roof structure uses traditional king-post trusses in teak wood spanning 14ft bays for the hip roof. The veranda roof uses a separate RCC beam-slab. All interior partition walls use 230mm thick hand-made red brick laid in English bond with lime-cement mortar for the authentic heritage look. The hip roof has a double-leaf beam at ridge level for traditional proportions.",
    activities:
      "RCC columns (230×230mm),Decorative veranda round columns,Front veranda beam with brackets,Teak wood roof truss fabrication,Hip roof ridge beam casting,Red brick masonry (English bond),Lintel beams above all openings,Veranda RCC beam-slab",
    durationDays: BigInt(40),
  },
  {
    step: BigInt(3),
    stageName: "Electrical & Plumbing",
    stageType: "MEP",
    stageImageUrl: "/assets/generated/stage-3-mep.dim_800x500.jpg",
    description:
      "Heritage-sensitive MEP installation preserving the architectural character. Concealed electrical conduits run within wall chases rather than exposed surface conduits. The main distribution board is a 2-phase 8-way MCB box located in a ventilated utility room. Period-appropriate switch plate positions are maintained — switches are placed at 1.2m height in traditional style. Plumbing for all three bathrooms is in 25mm CPVC for supply and 110mm SWR for drainage. The kitchen has a granite sink with an under-counter water purifier provision. An overhead storage tank (5000L) feeds all fixtures by gravity. The front garden has a dedicated irrigation line from a borewell connection. All pipes run inside wall chases for concealment.",
    activities:
      "Concealed electrical conduit in wall chases,2-phase MCB distribution board,Traditional switch plate positioning,CPVC plumbing for 3 bathrooms,SWR drainage network,Borewell connection & overhead tank,Garden irrigation line,Kitchen & utility rough-in",
    durationDays: BigInt(16),
  },
  {
    step: BigInt(4),
    stageName: "Enclosure & Finishing",
    stageType: "ENCLOSURE",
    stageImageUrl: "/assets/generated/stage-4-enclosure.dim_800x500.jpg",
    description:
      "The exterior beige plaster finish is applied in two coats over the red brick walls. The first coat is a 12mm thick rough scratch coat with waterproofing admixture (Dr. Fixit or equivalent). The finish coat is 8mm smooth using a putty-grade cement mortar. Exterior paint is applied in warm beige (Dulux Weathershield) in two coats. Terracotta Mangalore clay tiles are laid on the teak wood trusses using a traditional ridge-and-hip pattern with decorative ridge pieces. The veranda columns receive a fine lime-based decorative plaster with carved capital details. Wooden window frames (teak) are fitted with traditional-style iron grille inserts and ventilators. The compound wall is 1.5m high brick with plaster and coping tiles on top.",
    activities:
      "Two-coat cement plaster on brick walls,Waterproof exterior plaster coat,Dulux Weathershield beige paint,Terracotta Mangalore roof tile laying,Heritage ridge & hip tile pieces,Decorative veranda column plaster,Teak window frames & iron grilles,Compound wall plastering & coping",
    durationDays: BigInt(28),
  },
  {
    step: BigInt(5),
    stageName: "Interior & Fit-Out",
    stageType: "INTERIOR",
    stageImageUrl: "/assets/generated/stage-5-interior.dim_800x500.jpg",
    description:
      "Heritage interiors blend traditional material choices with modern comfort. Sitting room and dining floors receive Kota stone laid in a traditional pattern with black border strips. Bedrooms have polished red oxide flooring with embedded white marble inlay details. Kitchen countertop is black granite with a traditional built-in stone sink. All bathroom walls are finished with white glazed tiles up to 1.8m height. Ceiling treatment uses wooden-look textured POP with border moulding in the sitting room and dining. Interior doors are solid teak with traditional carved panel designs. Wall paint is Birla White putty finish with period-appropriate warm ivory emulsion. Traditional brass door hardware and window bolts complete the authentic character.",
    activities:
      "Kota stone flooring in living areas,Red oxide polished floors in bedrooms,Black granite kitchen countertop,White glazed bathroom wall tiles,Wooden-textured POP ceiling with moulding,Solid teak interior doors with carving,Warm ivory emulsion paint,Brass door hardware & window fittings",
    durationDays: BigInt(32),
  },
];

// ── Design 9: Urban Duplex 3-BHK construction stages ─────────────────────────
const urbanDuplexStages = [
  {
    step: BigInt(1),
    stageName: "Base & Foundation",
    stageType: "FOUNDATION",
    stageImageUrl: "/assets/generated/stage-1-foundation.dim_800x500.jpg",
    description:
      "The Urban Duplex on a compact 22×48 ft plot demands a deep pile foundation to maximize usable area. Four 300mm diameter bored cast-in-situ piles of 7m depth are driven at the four corners with two intermediate piles on the long axis. Pile caps of 1000×1000×500mm in M30 concrete connect the pile heads. A 150mm thick grade slab is cast over a compacted granular fill between pile caps. The compact plot boundary requires careful monitoring to protect the adjacent party walls — vibration limits are strictly maintained. Retaining walls on both side boundaries are 200mm thick M25 reinforced concrete rising 1.2m above the slab. A basement-level parking pit of 2.4m depth accommodates two-wheeler parking, with a side-entry ramp.",
    activities:
      "Bored cast-in-situ pile installation (6 piles),Pile load test,Pile cap casting (M30),Grade slab over granular fill,Boundary retaining wall (M25),Basement parking pit excavation,Side entry parking ramp casting,Anti-termite treatment",
    durationDays: BigInt(28),
  },
  {
    step: BigInt(2),
    stageName: "Raw Structure",
    stageType: "STRUCTURE",
    stageImageUrl: "/assets/generated/stage-2-structure.dim_800x500.jpg",
    description:
      "The duplex structural system uses a flat plate (slab without drop beams) supported on 4 internal columns for maximum ceiling height. Columns are 230×450mm oriented along the short (22ft) direction for lateral stiffness. The ground floor slab is 180mm thick M30 concrete. The first floor slab is 200mm thick to accommodate the skylight opening. The skylight shaft is formed as a 1.5×1.5m RCC box spanning from slab level to a polycarbonate roof panel at +600mm above terrace slab. All exterior walls use 200mm thick AAC blocks for weight reduction and thermal insulation. The street-facing facade has two large window openings per floor, each 1.8m wide, formed with 200mm deep steel lintels. Balcony slab cantilevers 900mm from the first floor slab edge.",
    activities:
      "Flat plate slab (G+1),Column casting 230×450mm,Ground floor slab (180mm M30),First floor slab (200mm M30),Skylight shaft RCC box,AAC block exterior walls,Steel lintel for large window openings,Balcony cantilever slab & parapet",
    durationDays: BigInt(48),
  },
  {
    step: BigInt(3),
    stageName: "Electrical & Plumbing",
    stageType: "MEP",
    stageImageUrl: "/assets/generated/stage-3-mep.dim_800x500.jpg",
    description:
      "Ultra-modern MEP with smart home infrastructure from day one. A 3-phase supply with 8kW solar inverter provision is installed in the main panel at ground floor entry. Smart home conduit network routes from a central hub location to every room for KNX or Modbus-compatible devices. Separate EV charging conduit runs from the panel to the parking area. All plumbing uses CPVC 3034 (green pipe) for hot water and CPVC white for cold water — color coded from source to fixture. The skylight zone has dedicated drainage channels routed to a cistern for reuse. An air handling unit (AHU) provision is made in the false ceiling void of the living room with insulated ductwork stubs in each room. All MEP work is BIM-coordinated to avoid clashes in the compact floor plan.",
    activities:
      "3-phase smart home distribution panel,Solar inverter & EV charger conduit,KNX/Modbus conduit network,Color-coded CPVC hot & cold lines,Skylight drainage to cistern,AHU provision & ductwork stubs,SWR drainage stack,BIM clash detection & resolution",
    durationDays: BigInt(22),
  },
  {
    step: BigInt(4),
    stageName: "Enclosure & Finishing",
    stageType: "ENCLOSURE",
    stageImageUrl: "/assets/generated/stage-4-enclosure.dim_800x500.jpg",
    description:
      "The dark charcoal grey facade is the architectural statement of this duplex. Dark grey engineered stone tiles (600×300mm, natural cleft finish) are dry-clamped onto a hidden aluminium rail system on the AAC block substrate. White horizontal bands between floors use smooth 8mm sand-faced plaster with elastomeric paint. Vertical wooden HPL fins in warm walnut tone are spaced at 600mm centers, mounted on stainless steel brackets. Large aluminium-framed glass panels (8mm double-glazed, low-E coating) are installed in the facade openings. The skylight receives a 6mm toughened + 6mm tempered laminated glass panel in a thermally-broken aluminium frame. Glass railing with 12mm toughened glass panels on stainless steel shoe channels is installed on the balcony.",
    activities:
      "Dark grey stone tile cladding (dry fix),Elastomeric white horizontal bands,HPL walnut fin vertical screen,Double-glazed low-E glass panels,Skylight toughened laminated glass,Balcony glass railing (12mm toughened),Aluminium front door & entrance framing,Compound gate & boundary treatment",
    durationDays: BigInt(32),
  },
  {
    step: BigInt(5),
    stageName: "Interior & Fit-Out",
    stageType: "INTERIOR",
    stageImageUrl: "/assets/generated/stage-5-interior.dim_800x500.jpg",
    description:
      "Ultra-premium interior finish throughout the duplex. Ground floor living and dining areas feature 1200×600mm large format porcelain slabs in light warm grey. The open kitchen has a 3.2m island with Silestone quartz surface, integrated pull-out storage and an induction hob with recirculating chimney. First floor master suite features herringbone pattern engineered oak with under-floor heating. All three bathrooms are spa-inspired with 600×1200mm tiles floor-to-ceiling, rain shower, wall-hung WC, and smart LED mirror. The skylight zone has a double-height feature wall in textured micro-cement. Custom joinery throughout — built-in TV unit, bed headboard panels, and study shelving. Lutron smart dimmer switches control all lighting, with scene presets for day, evening, and movie modes.",
    activities:
      "1200×600mm porcelain slab flooring,Quartz island kitchen with smart appliances,Herringbone oak + underfloor heating,Spa bathrooms (rain shower, smart mirror),Micro-cement double-height feature wall,Custom joinery throughout,Lutron smart dimmer system,Smart door lock & intercom",
    durationDays: BigInt(38),
  },
];

// ── Design 10: Skyline Modern House construction stages ─────────────────────
const skylineHouseStages = [
  {
    step: BigInt(1),
    stageName: "Base & Foundation",
    stageType: "FOUNDATION",
    stageImageUrl: "/assets/generated/stage-1-foundation.dim_800x500.jpg",
    description:
      "The Skyline Modern House on a 30×51 ft plot uses a grid foundation system with a central shear wall to resist the lateral loads from the 2-floor structure and rooftop pergola (which acts as a roof-level moment frame). Soil report indicates medium stiff clay at 1.5m depth, allowing 1000×1000×450mm isolated footings for peripheral columns and a 1200×1200×500mm footing under the central shear wall. All footings use M25 concrete with Fe500 steel. The plinth is 550mm above NGL on a compacted laterite stone fill. A surface drain channel collects all surface runoff to a sump pit for garden irrigation reuse. Anti-termite chemical treatment covers the entire plinth area and all penetrations.",
    activities:
      "Medium stiff clay soil investigation,Isolated footings (M25, Fe500),Central shear wall foundation,Plinth height 550mm NGL,Laterite stone compacted fill,Surface drain channel to sump,Anti-termite treatment,Plinth beam casting",
    durationDays: BigInt(24),
  },
  {
    step: BigInt(2),
    stageName: "Raw Structure",
    stageType: "STRUCTURE",
    stageImageUrl: "/assets/generated/stage-2-structure.dim_800x500.jpg",
    description:
      "A 2-floor column-beam frame with a flat roof in M25 concrete is supported on 10 columns (5 per transverse row at 6m span). Columns are 250×450mm oriented for maximum moment resistance. Ground floor slab is 150mm, first floor slab is 175mm. The shear wall runs continuously from foundation to roof at the staircase core (1.8×0.2m section). The rooftop pergola is a structural steel frame (100×100mm SHS sections) anchored into the roof slab through 200mm deep embedded plates. This pergola spans 5m and carries climbing plant load of 1.5 kN/m². The double-height entrance void (covering main entry porch) is formed with two transfer beams of 400×600mm section supporting the first floor slab above. Three facade columns are cased in dark stone cladding from ground to roofline.",
    activities:
      "Column frame (M25, 250×450mm),Ground & first floor flat slabs,Central shear wall (G+1),Rooftop steel pergola frame,Transfer beams for entry void,Facade casing columns,AAC block walls (interior/exterior),Parapet wall around roof terrace",
    durationDays: BigInt(52),
  },
  {
    step: BigInt(3),
    stageName: "Electrical & Plumbing",
    stageType: "MEP",
    stageImageUrl: "/assets/generated/stage-3-mep.dim_800x500.jpg",
    description:
      "Contemporary MEP for a 4-BHK household with premium amenities. A 3-phase supply with 10kW capacity feeds 12-way MCB distribution boards on both floors. The rooftop solar preparation includes 40mm conduit from the main panel to the roof level. All AC circuits (8 units) run as dedicated circuits from the board. Recessed LED downlight provision is made in all rooms with a minimum of one DALI dimmer circuit. Plumbing uses Astral CPVC throughout with a booster pump for high-rise supply. Each bathroom has separate hot and cold branches from a dedicated storage water heater (25L), reducing wait time for hot water. An overhead 7500L HDPE tank on a 3m high RCC staging serves all floors. Rainwater from the terrace is harvested to a 3000L underground sump for garden use.",
    activities:
      "3-phase 10kW distribution system,Rooftop solar preparation conduit,8 dedicated AC circuits,DALI dimmer circuit in all rooms,Astral CPVC plumbing network,Per-bathroom booster system,7500L HDPE overhead tank,Rooftop rainwater harvest sump",
    durationDays: BigInt(20),
  },
  {
    step: BigInt(4),
    stageName: "Enclosure & Finishing",
    stageType: "ENCLOSURE",
    stageImageUrl: "/assets/generated/stage-4-enclosure.dim_800x500.jpg",
    description:
      "The signature dark marble-effect cladding on the ground floor is achieved using 600×400mm Nero Assoluto-finish granite tiles dry-clamped on an aluminium carrier frame. The upper floor exterior is smooth sand-faced plaster with textured stone grey elastomeric paint (2-coat). Vertical HPL wooden fins in dark teak tone are installed at the entrance porch and along the first floor balcony edge at 500mm spacing. The balcony glass railing uses 12mm toughened glass with a chrome top rail. Double-glazed aluminium-framed windows with argon gas fill and low-E coating are installed on all external openings. The flat roof receives a 4-layer waterproofing system (SBS membrane + screed + protection board + porcelain pavers) for the accessible roof terrace. The steel pergola is powder-coated in matte anthracite grey with built-in LED strip lights for evening ambiance.",
    activities:
      "Granite dark stone lower floor cladding,Stone grey elastomeric upper floor paint,HPL teak wooden fin screens,Glass railing balcony (12mm toughened),Double-glazed aluminium windows,4-layer roof terrace waterproofing,Porcelain paver roof terrace,Steel pergola powder coat & LED strips",
    durationDays: BigInt(30),
  },
  {
    step: BigInt(5),
    stageName: "Interior & Fit-Out",
    stageType: "INTERIOR",
    stageImageUrl: "/assets/generated/stage-5-interior.dim_800x500.jpg",
    description:
      "Luxurious 4-BHK interior with consistent contemporary language. Ground floor public areas (living, dining, entrance) feature 1200×600mm marble-finish vitrified tiles in warm white with thin dark grout. Master bedroom on ground floor has Moroccan-pattern carpet tile over a concrete screed. The open-plan kitchen island is finished in Calcatta Gold quartz with handle-less push-to-open cabinets and a full-height pantry unit. First floor family lounge is an entertainment space with acoustic fabric wall panels, motorised roller blinds and a 4m TV feature wall. All 4 bathrooms are hotel-grade — frameless glass showers, wall-hung WCs, sensor taps, and smart LED mirrors. A double-height entrance foyer with a floating timber staircase, glass balustrade and pendant chandelier is the centrepiece of the design. Recessed LED lighting with Lutron smart control creates the perfect ambiance in every space.",
    activities:
      "Marble-finish vitrified tile flooring,Carpet tile master bedroom,Calacatta Gold island kitchen,Acoustic panels & motorised blinds in lounge,Hotel-grade bathrooms (sensor taps, smart mirror),Floating timber staircase & glass balustrade,Chandelier & feature lighting,Lutron smart lighting control",
    durationDays: BigInt(40),
  },
];

// ── Sample Design Summaries ───────────────────────────────────────────────────

const sampleDesignSummaries = [
  {
    id: BigInt(1),
    bhk: BigInt(3),
    title: "The Sterling Villa",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    tags: ["Eco-Friendly", "Modern Contemporary"],
    tier: DesignTier.free,
    estimatedCostMin: BigInt(4500000),
    estimatedCostMax: BigInt(6000000),
    areaSqft: BigInt(2200),
    category: DesignCategory.residential,
    previewImageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  },
  {
    id: BigInt(2),
    bhk: BigInt(2),
    title: "Green Leaf Residences",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    tags: ["Eco-Friendly", "Sustainable"],
    tier: DesignTier.premium,
    estimatedCostMin: BigInt(3500000),
    estimatedCostMax: BigInt(4500000),
    areaSqft: BigInt(1800),
    category: DesignCategory.residential,
    previewImageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80",
  },
  {
    id: BigInt(3),
    bhk: undefined,
    title: "Skyview Towers",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    tags: ["Modern", "Urban"],
    tier: DesignTier.ultraPremium,
    estimatedCostMin: BigInt(15000000),
    estimatedCostMax: BigInt(25000000),
    areaSqft: BigInt(8500),
    category: DesignCategory.apartments,
    previewImageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  },
  {
    id: BigInt(4),
    bhk: BigInt(2),
    title: "Sunrise Cottage",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    tags: ["Affordable", "Compact"],
    tier: DesignTier.free,
    estimatedCostMin: BigInt(1800000),
    estimatedCostMax: BigInt(2500000),
    areaSqft: BigInt(1000),
    category: DesignCategory.residential,
    previewImageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
  },
  {
    id: BigInt(5),
    bhk: undefined,
    title: "Modern Dairy Farm Complex",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    tags: ["Agricultural", "Functional"],
    tier: DesignTier.premium,
    estimatedCostMin: BigInt(2000000),
    estimatedCostMax: BigInt(3500000),
    areaSqft: BigInt(3000),
    category: DesignCategory.dairyFarms,
    previewImageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80",
  },
  {
    id: BigInt(6),
    bhk: undefined,
    title: "Corner Shop Plus",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    tags: ["Commercial", "Retail"],
    tier: DesignTier.free,
    estimatedCostMin: BigInt(1200000),
    estimatedCostMax: BigInt(2000000),
    areaSqft: BigInt(800),
    category: DesignCategory.smallBusiness,
    previewImageUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80",
  },
  // ── New Designs 7–10 ──
  {
    id: BigInt(7),
    bhk: BigInt(3),
    title: "Modern Flat-Roof Villa",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    tags: ["modern", "flat-roof", "2-floor", "glass-facade", "rooftop-garden"],
    tier: DesignTier.premium,
    estimatedCostMin: BigInt(4500000),
    estimatedCostMax: BigInt(6500000),
    areaSqft: BigInt(1700),
    category: DesignCategory.residential,
    previewImageUrl: "",
  },
  {
    id: BigInt(8),
    bhk: BigInt(3),
    title: "Heritage Bungalow",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    tags: ["bungalow", "terracotta-roof", "heritage", "single-floor", "columns"],
    tier: DesignTier.free,
    estimatedCostMin: BigInt(3200000),
    estimatedCostMax: BigInt(4200000),
    areaSqft: BigInt(2000),
    category: DesignCategory.residential,
    previewImageUrl: "",
  },
  {
    id: BigInt(9),
    bhk: BigInt(3),
    title: "Urban Duplex 3-BHK",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    tags: ["duplex", "ultra-modern", "3bhk", "dark-facade", "skylight", "compact-plot"],
    tier: DesignTier.ultraPremium,
    estimatedCostMin: BigInt(5500000),
    estimatedCostMax: BigInt(8000000),
    areaSqft: BigInt(1056),
    category: DesignCategory.residential,
    previewImageUrl: "",
  },
  {
    id: BigInt(10),
    bhk: BigInt(4),
    title: "Skyline Modern House",
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    tags: ["contemporary", "2-floor", "dark-marble-facade", "rooftop-pergola", "4bhk"],
    tier: DesignTier.premium,
    estimatedCostMin: BigInt(5200000),
    estimatedCostMax: BigInt(7200000),
    areaSqft: BigInt(1530),
    category: DesignCategory.residential,
    previewImageUrl: "",
  },
];

// ── Detailed Design objects ───────────────────────────────────────────────────

const sampleDesign = {
  id: BigInt(1),
  bhk: BigInt(3),
  title: "The Sterling Villa",
  createdAt: BigInt(Date.now()) * BigInt(1000000),
  tags: ["Eco-Friendly", "Modern Contemporary"],
  tier: DesignTier.free,
  description:
    "A beautifully designed 3BHK villa with modern amenities, open floor plan, and eco-friendly construction. Perfect for families seeking luxury living in a sustainable home.",
  materials: [
    { name: "Cement (OPC 53 Grade)", unit: "bags", quantity: 500, costPerUnit: BigInt(350) },
    { name: "Steel Bars (TMT Fe500)", unit: "tonnes", quantity: 8, costPerUnit: BigInt(65000) },
    { name: "Bricks (Red Clay)", unit: "pieces", quantity: 25000, costPerUnit: BigInt(8) },
    { name: "Sand (River)", unit: "CFT", quantity: 1200, costPerUnit: BigInt(55) },
    { name: "Aggregate (20mm)", unit: "CFT", quantity: 800, costPerUnit: BigInt(40) },
    { name: "Tiles (Vitrified 600x600)", unit: "sq.ft", quantity: 2200, costPerUnit: BigInt(75) },
    { name: "Paint (Interior Emulsion)", unit: "litres", quantity: 350, costPerUnit: BigInt(250) },
  ],
  estimatedCostMin: BigInt(4500000),
  estimatedCostMax: BigInt(6000000),
  areaSqft: BigInt(2200),
  category: DesignCategory.residential,
  constructionSteps: constructionStages,
  floorPlanImageUrl:
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
  previewImageUrl:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
};

const design7 = {
  id: BigInt(7),
  bhk: BigInt(3),
  title: "Modern Flat-Roof Villa",
  createdAt: BigInt(Date.now()) * BigInt(1000000),
  tags: ["modern", "flat-roof", "2-floor", "glass-facade", "rooftop-garden"],
  tier: DesignTier.premium,
  description:
    "Modern 2-floor residential villa with flat roof design, dark grey panel facade, floor-to-ceiling glass windows, wooden accent fins, and rooftop garden. Plot 34×46 ft with 3 BHK + study across two floors. The charcoal ACM panel cladding with warm walnut HPL fins creates a striking street presence. A cantilevered porch shelters the double-height entrance, and the rooftop garden terrace offers a private outdoor retreat. Perfect for urban plots requiring maximum space utilization with premium aesthetics.",
  materials: [
    { name: "Cement (OPC 53 Grade)", unit: "bags", quantity: 420, costPerUnit: BigInt(360) },
    { name: "Steel Bars (TMT Fe500)", unit: "tonnes", quantity: 7, costPerUnit: BigInt(68000) },
    { name: "AAC Blocks (200mm)", unit: "sq.ft", quantity: 3200, costPerUnit: BigInt(85) },
    { name: "ACM Charcoal Facade Panels", unit: "sq.ft", quantity: 800, costPerUnit: BigInt(320) },
    { name: "HPL Wooden Fins", unit: "running ft", quantity: 240, costPerUnit: BigInt(450) },
    { name: "Double Glazed Glass (8mm)", unit: "sq.ft", quantity: 650, costPerUnit: BigInt(220) },
    { name: "Large Format Vitrified Tiles (800×800)", unit: "sq.ft", quantity: 1700, costPerUnit: BigInt(120) },
    { name: "Engineered Oak Flooring", unit: "sq.ft", quantity: 340, costPerUnit: BigInt(280) },
    { name: "SBS Waterproofing Membrane", unit: "sq.ft", quantity: 1700, costPerUnit: BigInt(65) },
    { name: "Jotun Premium Interior Emulsion", unit: "litres", quantity: 280, costPerUnit: BigInt(380) },
  ],
  estimatedCostMin: BigInt(4500000),
  estimatedCostMax: BigInt(6500000),
  areaSqft: BigInt(1700),
  category: DesignCategory.residential,
  constructionSteps: flatRoofVillaStages,
  floorPlanImageUrl: "",
  previewImageUrl: "",
};

const design8 = {
  id: BigInt(8),
  bhk: BigInt(3),
  title: "Heritage Bungalow",
  createdAt: BigInt(Date.now()) * BigInt(1000000),
  tags: ["bungalow", "terracotta-roof", "heritage", "single-floor", "columns"],
  tier: DesignTier.free,
  description:
    "Classic 3-BHK single-floor bungalow with terracotta hip roof, prominent front columns and veranda. Beige plastered exterior with red Mangalore clay tiles. 40×50 ft plot. Traditional Indian bungalow style combining heritage charm with modern amenities — a timeless design that celebrates India's colonial architectural legacy while offering all contemporary comforts inside. The full-width veranda with 8 turned RCC columns is the centrepiece of the street elevation.",
  materials: [
    { name: "Cement (OPC 43 Grade)", unit: "bags", quantity: 380, costPerUnit: BigInt(330) },
    { name: "Steel Bars (TMT Fe415)", unit: "tonnes", quantity: 5.5, costPerUnit: BigInt(62000) },
    { name: "Red Clay Bricks (Hand-made)", unit: "pieces", quantity: 30000, costPerUnit: BigInt(10) },
    { name: "Mangalore Terracotta Roof Tiles", unit: "pieces", quantity: 4500, costPerUnit: BigInt(38) },
    { name: "Teak Wood (Roof Trusses)", unit: "CFT", quantity: 280, costPerUnit: BigInt(1800) },
    { name: "Kota Stone Flooring", unit: "sq.ft", quantity: 1800, costPerUnit: BigInt(55) },
    { name: "Teak Interior Doors (Carved)", unit: "nos", quantity: 8, costPerUnit: BigInt(18000) },
    { name: "Lime Plaster (Exterior)", unit: "bags", quantity: 200, costPerUnit: BigInt(420) },
    { name: "Brass Door & Window Hardware", unit: "sets", quantity: 12, costPerUnit: BigInt(3500) },
    { name: "Dulux Weathershield Paint (Beige)", unit: "litres", quantity: 200, costPerUnit: BigInt(310) },
  ],
  estimatedCostMin: BigInt(3200000),
  estimatedCostMax: BigInt(4200000),
  areaSqft: BigInt(2000),
  category: DesignCategory.residential,
  constructionSteps: heritageBungalowStages,
  floorPlanImageUrl: "",
  previewImageUrl: "",
};

const design9 = {
  id: BigInt(9),
  bhk: BigInt(3),
  title: "Urban Duplex 3-BHK",
  createdAt: BigInt(Date.now()) * BigInt(1000000),
  tags: ["duplex", "ultra-modern", "3bhk", "dark-facade", "skylight", "compact-plot"],
  tier: DesignTier.ultraPremium,
  description:
    "Ultra-modern duplex on a compact 22×48 ft plot. Dark charcoal grey facade with white horizontal accent bands, vertical wooden fins, skylight, and floor-to-ceiling glass with black frames. Glass railings on the balcony complete the contemporary look. 3 BHK across two floors with premium finishes throughout — engineered oak floors, Silestone quartz kitchen, spa bathrooms, and a Lutron smart lighting system. An EV charging provision and rooftop solar readiness make this a future-ready urban home.",
  materials: [
    { name: "Cement (OPC 53 Grade)", unit: "bags", quantity: 310, costPerUnit: BigInt(360) },
    { name: "Steel Bars (TMT Fe500D)", unit: "tonnes", quantity: 6, costPerUnit: BigInt(70000) },
    { name: "AAC Blocks (200mm)", unit: "sq.ft", quantity: 2000, costPerUnit: BigInt(90) },
    { name: "Dark Grey Engineered Stone Tiles (600×300)", unit: "sq.ft", quantity: 600, costPerUnit: BigInt(380) },
    { name: "HPL Walnut Fins", unit: "running ft", quantity: 160, costPerUnit: BigInt(480) },
    { name: "Double Glazed Low-E Glass", unit: "sq.ft", quantity: 520, costPerUnit: BigInt(260) },
    { name: "Toughened Glass Railing (12mm)", unit: "sq.ft", quantity: 120, costPerUnit: BigInt(320) },
    { name: "Porcelain Slab Flooring (1200×600)", unit: "sq.ft", quantity: 1056, costPerUnit: BigInt(160) },
    { name: "Silestone Quartz Countertop", unit: "sq.ft", quantity: 65, costPerUnit: BigInt(450) },
    { name: "Lutron Smart Dimmer System", unit: "points", quantity: 24, costPerUnit: BigInt(4500) },
  ],
  estimatedCostMin: BigInt(5500000),
  estimatedCostMax: BigInt(8000000),
  areaSqft: BigInt(1056),
  category: DesignCategory.residential,
  constructionSteps: urbanDuplexStages,
  floorPlanImageUrl: "",
  previewImageUrl: "",
};

const design10 = {
  id: BigInt(10),
  bhk: BigInt(4),
  title: "Skyline Modern House",
  createdAt: BigInt(Date.now()) * BigInt(1000000),
  tags: ["contemporary", "2-floor", "dark-marble-facade", "rooftop-pergola", "4bhk"],
  tier: DesignTier.premium,
  description:
    "Contemporary 4-BHK 2-floor house on 30×51 ft plot. Dark marble/grey stone cladding facade with vertical wooden fins, glass railing balcony, and rooftop pergola with climbing greenery. Recessed LED lighting throughout. Premium materials and finishes — Calacatta Gold quartz kitchen, floating timber staircase, acoustic family lounge and hotel-grade bathrooms. The rooftop terrace with the powder-coated steel pergola is the ideal outdoor living zone, framing views of the skyline above.",
  materials: [
    { name: "Cement (OPC 53 Grade)", unit: "bags", quantity: 390, costPerUnit: BigInt(360) },
    { name: "Steel Bars (TMT Fe500)", unit: "tonnes", quantity: 7.5, costPerUnit: BigInt(68000) },
    { name: "AAC Blocks (200mm)", unit: "sq.ft", quantity: 2800, costPerUnit: BigInt(88) },
    { name: "Nero Assoluto Granite Cladding", unit: "sq.ft", quantity: 720, costPerUnit: BigInt(420) },
    { name: "HPL Dark Teak Fins", unit: "running ft", quantity: 180, costPerUnit: BigInt(460) },
    { name: "Double Glazed Aluminium Windows", unit: "sq.ft", quantity: 580, costPerUnit: BigInt(240) },
    { name: "Marble-Finish Vitrified (1200×600)", unit: "sq.ft", quantity: 1530, costPerUnit: BigInt(140) },
    { name: "Calacatta Gold Quartz", unit: "sq.ft", quantity: 80, costPerUnit: BigInt(500) },
    { name: "Steel Pergola Structure (SHS 100×100)", unit: "kg", quantity: 850, costPerUnit: BigInt(180) },
    { name: "Floating Teak Staircase", unit: "nos", quantity: 1, costPerUnit: BigInt(180000) },
  ],
  estimatedCostMin: BigInt(5200000),
  estimatedCostMax: BigInt(7200000),
  areaSqft: BigInt(1530),
  category: DesignCategory.residential,
  constructionSteps: skylineHouseStages,
  floorPlanImageUrl: "",
  previewImageUrl: "",
};

const allDesigns = [sampleDesign, design7, design8, design9, design10];

export const mockBackend: backendInterface = {
  adminListAllInquiries: async () => [],

  adminSetUserTier: async () => Variant_ok_notAuthorized_notFound.ok,

  adminUpdateInquiryStatus: async () => Variant_ok_notAuthorized_notFound.ok,

  calculateCost: async (input) => {
    const sqft = Number(input.areaSqft);
    const baseRate =
      input.region === Region.urban
        ? 2500
        : input.region === Region.semiUrban
        ? 1800
        : 1200;
    const gradeMultiplier =
      input.materialGrade === MaterialGrade.premium
        ? 1.5
        : input.materialGrade === MaterialGrade.standard
        ? 1.2
        : 1.0;
    const costPerSqft = Math.round(baseRate * gradeMultiplier);
    const totalCost = sqft * costPerSqft;
    return {
      costPerSqft: BigInt(costPerSqft),
      totalCost: BigInt(totalCost),
      breakdown: {
        foundation: BigInt(Math.round(totalCost * 0.15)),
        structure: BigInt(Math.round(totalCost * 0.25)),
        roofing: BigInt(Math.round(totalCost * 0.1)),
        plumbing: BigInt(Math.round(totalCost * 0.1)),
        electrical: BigInt(Math.round(totalCost * 0.1)),
        flooring: BigInt(Math.round(totalCost * 0.15)),
        finishing: BigInt(Math.round(totalCost * 0.15)),
      },
    };
  },

  getDesign: async (id) => {
    const found = allDesigns.find((d) => d.id === id);
    return found ?? null;
  },

  getMyInquiries: async () => [],

  getMyProfile: async () => null,

  getSavedDesigns: async () => [],

  listDesigns: async () => sampleDesignSummaries,

  removeSavedDesign: async () => Variant_ok_notAuthenticated_notFound.ok,

  saveDesign: async () => Variant_ok_notAuthenticated_notFound_limitReached.ok,

  submitInquiry: async (input) => ({
    id: BigInt(100),
    status: InquiryStatus.pending,
    projectType: input.projectType,
    submitterPrincipal: undefined,
    name: input.name,
    createdAt: BigInt(Date.now()) * BigInt(1000000),
    description: input.description,
    email: input.email,
    phone: input.phone,
    budgetMin: input.budgetMin,
    budgetMax: input.budgetMax,
  }),

  updateMyProfile: async () => ({
    __kind__: "notAuthenticated",
    notAuthenticated: null,
  }),
};
