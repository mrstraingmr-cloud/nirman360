# Nirman360 Design System

## Tone & Differentiation
Professional minimalism with industrial warmth. Construction-grade precision meets contemporary refinement. Blueprint-inspired color language conveys architectural authority without coldness. Layered elevation system creates visual hierarchy through strategic depth, not decoration.

## Color Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| Primary | `0.55 0.15 265` (Blueprint Blue) | `0.68 0.16 265` | Navigation, primary CTAs, design highlights |
| Accent | `0.62 0.18 32` (Burnt Orange) | `0.72 0.18 32` | Material highlights, secondary actions, construction warmth |
| Secondary | `0.92 0.04 270` (Cool Grey) | `0.22 0.02 270` | Backgrounds for secondary content, softer UI surfaces |
| Foreground | `0.18 0.02 270` | `0.95 0.01 270` | Body text, primary hierarchy |
| Muted | `0.92 0.04 270` | `0.22 0.02 270` | Disabled states, metadata, tertiary text |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Errors, warnings, dangerous actions |

## Typography
- **Display**: DM Sans (geometric, bold construction-forward)
- **Body**: General Sans (clean, legible at small sizes, India-optimized)
- **Mono**: Geist Mono (specs, costs, technical details)
- **Scale**: 12px (caption) → 14px (body) → 16px (label) → 20px (heading-3) → 28px (heading-1)

## Shape Language
- **Radius**: 6px (primary), 4px (secondary), 2px (tertiary), 0 (accent highlights)
- **Spacing**: 8px base unit, 1.5rem gap on card grids
- **Borders**: 1px on inputs/cards, subtle cool-grey (#e5e7eb equivalent in OKLCH)

## Structural Zones

| Zone | Treatment | Depth |
|------|-----------|-------|
| Header | `bg-card` with `border-b`, elevated on scroll | Flat +1 |
| Hero | `bg-background` with gradient text accents | None |
| Card Grid | `bg-background`, cards on `bg-card` with `shadow-lg` | Elevated +2 |
| Footer | `bg-secondary/40` with `border-t`, slightly elevated | Flat +1 |
| Sidebar | `bg-sidebar` with primary text, minimal ornamentation | Flat |

## Component Patterns
- **Cards**: Rounded corners (6px), 1px border, shadow-lg on hover → shadow-xl, scale-105
- **Buttons**: Primary (bg-primary, text-primary-foreground), Secondary (bg-secondary, text-secondary-foreground), Ghost (border, hover:bg-muted)
- **Inputs**: bg-input, 1px border-border, focus:ring-2 ring-primary
- **Grid**: `grid-auto-fit` with 280px min-width, 1.5rem gap
- **Labels**: DM Sans 500, 12px, uppercase spacing for section headers

## Motion & Interaction
- **Transitions**: All 0.3s cubic-bezier(0.4, 0, 0.2, 1) (smooth easing)
- **Card Hover**: shadow-lg → shadow-xl, scale-105, border shifts to accent
- **Button Hover**: opacity shift or color saturation increase
- **Load Animation**: fade-in (0.4s), staggered slide-up for grid items
- **Dark Mode**: Smooth theme transition via CSS variable swap

## Responsive Breakpoints
- **Mobile First**: Base styles for <640px
- **Tablet**: `md:` (≥768px) — expand grids to 2–3 columns
- **Desktop**: `lg:` (≥1024px) — full-width layouts, 4+ columns
- **Hero**: Full viewport height on mobile, 60vh on desktop

## Differentiation & Signature Detail
Blueprint-inspired accent line on hero section (thin 2px border with primary color gradient). Floating construction icon badges in corner of design cards. Micro-animation: cards scale slightly on focus, not bounce. Cost labels rendered in mono font for precision perception.

## /builder Page — 3D Design System
Canvas-first layout (60–70% viewport) with collapsible dual-sidebar control panels. Form steps on left (plot size, type, floors, budget), material/cost breakdown on right. Progress tracker badges above canvas show active construction phase. Form validation inline; cost values in mono font for precision. Tier gating via semi-transparent overlay ("Upgrade to unlock full materials"), not hard blocks. Mobile: full-width canvas with slide-out panels via hamburger toggle.

| Zone | Treatment | Depth |
|------|-----------|-------|
| Canvas | `bg-background`, `canvas-container`, rounded-lg overflow-hidden | Primary surface |
| Left Sidebar | `panel-sidebar`, `form-step` with `form-step-active` accent border | Elevated +1 |
| Right Sidebar | `panel-sidebar`, `material-item` cards, `cost-value` in mono | Elevated +1 |
| Progress Tracker | `progress-dot` badges (active = accent glow), horizontal scroll on mobile | Flat |
| Tier Gating | Semi-transparent overlay (20% opacity) with centered "Upgrade" CTA | Float above canvas |

| Utility | Purpose | Example |
|---------|---------|---------|
| `.transition-canvas` | Smooth 600ms camera transitions | "Moving between construction stages" |
| `.panel-sidebar` | Consistent sidebar styling | Left/right control panels |
| `.material-item` | Interactive material card with hover lift | "Material breakdown list" |
| `.cost-value` | Mono-font cost labels | "₹ 50,000" |
| `.tier-badge-*` | Free/Premium/Ultra badges | "Free", "Premium unlock" |
| `.stage-badge` | Active construction phase indicator | "Stage 3: Electrical" |

## /pricing Page — Tier Comparison
Three-tier card layout (Free, Premium ₹499–999, Ultra Premium ₹1999–4999) with navy primary and orange accent visual language. Premium card center-focused, Ultra Premium top-positioned with crown badge. Feature comparison table (15+ rows) with checkmarks for included, lock icons for tier-gated. FAQ accordion below. Hover animations: scale-105 + shadow-xl on premium/ultra cards.

| Tier | Color | Badge | CTA | Position |
|------|-------|-------|-----|----------|
| Free | Muted grey | None | Ghost button | Left |
| Premium | Navy primary | Diamond ◇ | Primary button | Center (elevated) |
| Ultra Premium | Orange accent + gradient | Crown 👑 | Accent button | Right (highest) |

## Component Patterns — Tier Extensions
- **Tier Cards**: `.tier-card` with `.tier-card-premium` or `.tier-card-ultra` variants, scale-105 on hover
- **Tier Badges**: `.tier-badge-premium-full`, `.tier-badge-ultra-full`, `.tier-badge-free-full` with icons
- **Lock Icons**: `.lock-icon` base, `.lock-icon-premium`, `.lock-icon-ultra` for feature rows
- **Upgrade Overlay**: `.upgrade-overlay` + `.upgrade-cta` for semi-transparent feature locks
- **Pricing Table**: `.pricing-table` with `.pricing-cell-included` (accent text) and `.pricing-cell-locked` (muted)
- **FAQ Accordion**: `.faq-item` with `.faq-trigger` and `.faq-content`
- **CTA Buttons**: `.cta-free`, `.cta-premium`, `.cta-ultra` with tier-specific colors

## Motion & Interaction — Tier Animations
- **Card Hover**: All cards scale-105, shadow-lg → shadow-xl, 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Premium Card**: Subtle tier-highlight pulse (3s) on page load, opacity pulse 1 → 0.8
- **Ultra Card**: Subtle bounce-subtle (2s) on load, -2px translateY at peak
- **Tier Badges**: Smooth fade-in on hover (0.2s), slight color saturation increase
- **Lock Icons**: Scale 1 → 1.1 on feature row hover
- **Upgrade Modals**: Fade-in 0.4s on trigger, semi-transparent backdrop with blur

## Responsive Breakpoints — Tier Layout
- **Mobile**: Vertical tier card stack, full-width pricing table (horizontal scroll on wide rows)
- **Tablet**: Two-column card layout (Free+Premium top, Ultra below)
- **Desktop**: Horizontal three-card layout with Premium center-elevated
- **FAQ**: Single column mobile, collapsible accordion smooth open/close

## Differentiation & Signature Detail
Tier-specific visual language: Premium uses navy with subtle indigo accents (professional trust); Ultra uses orange gradient with gold highlights (luxury aspiration). Lock icons on tier-gated features are visual gates, not hard blocks — encourages exploration and upgrade intent. Pricing badges float above cards (-top-3) for prominence. CTA buttons inherit tier colors: Free (muted), Premium (navy), Ultra (orange accent). Feature rows have left-align icon bullets (color-coded by tier) for scanability.


