import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  Crown,
  Gift,
  Home,
  MapPin,
  Ruler,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { DesignCategory } from "../backend";
import { CategoryCard } from "../components/CategoryCard";
import { DesignCard } from "../components/DesignCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  useDesigns,
  useRemoveSavedDesign,
  useSaveDesign,
} from "../hooks/useDesigns";
import { useUIStore } from "../store/uiStore";
import { CATEGORY_META } from "../types";

const STATS = [
  { value: "500+", label: "Designs Available", icon: Home },
  { value: "15+", label: "Categories", icon: Building2 },
  { value: "10,000+", label: "Happy Clients", icon: Users },
  { value: "₹800–3500", label: "Per Sq.ft", icon: Ruler },
];

const PLACEHOLDER_DESIGNS = [
  {
    id: "p1",
    title: "The Sterling Villa",
    location: "Mumbai, India",
    status: "Under Construction",
    budget: "₹4.5Cr+",
    style: "Modern Contemporary",
    tag: "Eco-Friendly",
    img: "/assets/generated/hero-villa-main.dim_1200x700.jpg",
    bhk: "4BHK",
    area: "3,200 sq.ft",
  },
  {
    id: "p2",
    title: "Skyview Towers",
    location: "Bengaluru",
    status: "Under Construction",
    budget: "₹4.5Cr+",
    style: "Modern Contemporary",
    tag: "Eco-Friendly",
    img: "/assets/generated/apartments-building.dim_600x400.jpg",
    bhk: "3BHK",
    area: "2,100 sq.ft",
  },
  {
    id: "p3",
    title: "Green Leaf Residences",
    location: "Delhi",
    status: "Eco-Friendly",
    budget: "₹4.5Cr+",
    style: "Modern Contemporary",
    tag: "Eco-Friendly",
    img: "/assets/generated/house-villa.dim_600x400.jpg",
    bhk: "3BHK",
    area: "2,400 sq.ft",
  },
  {
    id: "p4",
    title: "The Suryakiran 2BHK",
    location: "Pune, India",
    status: "Ready to Build",
    budget: "₹58L",
    style: "Vastu Compliant",
    tag: "Budget Friendly",
    img: "/assets/generated/house-2bhk.dim_600x400.jpg",
    bhk: "2BHK",
    area: "1,050 sq.ft",
  },
  {
    id: "p5",
    title: "Bengaluru Business Hub",
    location: "Bengaluru",
    status: "Eco-Friendly",
    budget: "₹4.5Cr+",
    style: "Commercial Modern",
    tag: "Eco-Friendly",
    img: "/assets/generated/small-business.dim_600x400.jpg",
    bhk: "Office",
    area: "4,500 sq.ft",
  },
  {
    id: "p6",
    title: "Harvest Dairy Complex",
    location: "Anand, Gujarat",
    status: "Ready to Build",
    budget: "₹1.2Cr",
    style: "Agricultural Modern",
    tag: "Functional",
    img: "/assets/generated/dairy-farm.dim_600x400.jpg",
    bhk: "Farm",
    area: "8,000 sq.ft",
  },
];

const TIER_PLANS = [
  {
    name: "Free",
    price: "First Design Free",
    priceNote: "No signup required",
    description: "Start building — zero cost, zero friction",
    icon: Gift,
    cardClass: "border-border bg-card",
    headerStyle: {
      background: "oklch(0.96 0.01 265)",
      borderBottom: "1px solid oklch(0.9 0.02 265)",
    },
    titleStyle: { color: "oklch(0.25 0.07 265)" },
    priceStyle: { color: "oklch(0.35 0.12 265)" },
    features: [
      "1 complete 3D design for free",
      "Basic floor plan & cost estimate",
      "Browse all design categories",
      "Social sharing",
      "No account needed",
    ],
    cta: "Start Free Design",
    ctaStyle: {
      background: "oklch(0.28 0.09 265)",
      color: "oklch(0.99 0 0)",
    },
    href: "/builder",
  },
  {
    name: "Premium 💎",
    price: "₹499–₹999",
    priceNote: "per project",
    description: "For serious homebuilders",
    icon: Star,
    cardClass: "border-primary shadow-xl scale-[1.02]",
    headerStyle: {
      background: "oklch(0.28 0.09 265)",
    },
    titleStyle: { color: "oklch(0.99 0 0)" },
    priceStyle: { color: "oklch(0.75 0.2 32)" },
    featured: true,
    features: [
      "Full 2D + 3D design package",
      "Step-by-step construction guide",
      "Downloadable PDFs (floor plan, BOQ)",
      "Material estimation with quantities",
      "Advanced cost calculator",
      "Ad-free, priority support",
    ],
    cta: "Upgrade to Premium",
    ctaStyle: {
      background: "oklch(0.62 0.18 32)",
      color: "oklch(0.99 0 0)",
    },
    href: "/pricing",
  },
  {
    name: "Ultra Premium 👑",
    price: "₹1,999–₹4,999",
    priceNote: "per project",
    description: "Luxury & professionals",
    icon: Crown,
    cardClass: "border-accent",
    headerStyle: {
      background:
        "linear-gradient(135deg, oklch(0.55 0.15 55) 0%, oklch(0.65 0.18 45) 100%)",
    },
    titleStyle: { color: "oklch(0.15 0.02 55)" },
    priceStyle: { color: "oklch(0.15 0.02 55)" },
    features: [
      "Full 3D construction animation",
      "AI custom design engine",
      "AR/VR walkthrough",
      "Ultra-realistic rendering (day/night)",
      "Detailed BOQ & stage-wise tracking",
      "Real-time custom editing + CAD export",
    ],
    cta: "Book Consultation",
    ctaStyle: {
      background: "oklch(0.15 0.02 55)",
      color: "oklch(0.99 0 0)",
    },
    href: "/pricing",
  },
];

const WHY_NIRMAN = [
  {
    icon: "🆓",
    title: "Start Free",
    desc: "Your first complete 3D design is free — no signup, no credit card. Just enter your requirements and get a professional design instantly.",
    highlight: "No account needed",
  },
  {
    icon: "📐",
    title: "Premium Quality",
    desc: "Get detailed floor plans, accurate material lists, region-based cost breakdowns, and downloadable PDFs — everything you need to build.",
    highlight: "From ₹499/project",
  },
  {
    icon: "🏆",
    title: "Expert Grade",
    desc: "Animated 3D construction sequences, AI-powered design engine, AR/VR walkthroughs, and professional CAD exports for serious builders.",
    highlight: "From ₹1,999/project",
  },
];

export default function HomePage() {
  const { data: designs, isLoading } = useDesigns({
    category: DesignCategory.residential,
  });
  const { savedDesignIds, optimisticSave, optimisticRemove } = useUIStore();
  const saveMutation = useSaveDesign();
  const removeMutation = useRemoveSavedDesign();
  const featuredDesigns = designs?.slice(0, 6) ?? [];

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section
        data-ocid="home.hero.section"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 265) 0%, oklch(0.32 0.1 265) 50%, oklch(0.28 0.08 250) 100%)",
        }}
      >
        {/* Blueprint grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.8 0.05 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.8 0.05 265) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container relative z-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-2">
              <Badge
                className="text-xs px-3 py-1 gap-1.5"
                style={{
                  background: "oklch(0.62 0.18 32 / 0.25)",
                  color: "oklch(0.9 0.12 32)",
                  border: "1px solid oklch(0.62 0.18 32 / 0.4)",
                }}
              >
                <Zap className="h-3 w-3" />
                India's #1 Construction Design Platform
              </Badge>
            </div>
            <h1
              className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              style={{ color: "oklch(0.97 0.01 265)" }}
            >
              Build Your{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.75 0.2 32), oklch(0.85 0.15 55))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dream Home
              </span>{" "}
              with Expert 3D Designs
            </h1>
            <p
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: "oklch(0.75 0.04 265)" }}
            >
              Explore 500+ professional designs, get instant cost estimates, and
              download complete floor plans — from 1BHK starter homes to luxury
              villas.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="gap-2 font-semibold"
                data-ocid="home.start_designing.primary_button"
                style={{
                  background: "oklch(0.62 0.18 32)",
                  color: "oklch(0.99 0 0)",
                }}
              >
                <Link to="/builder">
                  Start Designing Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 font-semibold"
                data-ocid="home.browse_designs.secondary_button"
                style={{
                  borderColor: "oklch(0.75 0.04 265 / 0.5)",
                  color: "oklch(0.9 0.02 265)",
                  background: "transparent",
                }}
              >
                <Link to="/browse">
                  Browse Designs <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 pt-2 text-sm">
              {[
                "First design is free",
                "No signup required",
                "Instant 3D preview",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5"
                  style={{ color: "oklch(0.7 0.04 265)" }}
                >
                  <CheckCircle2
                    className="h-4 w-4"
                    style={{ color: "oklch(0.75 0.2 32)" }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: hero image */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <img
              src="/assets/generated/hero-villa-main.dim_1200x700.jpg"
              alt="Modern luxury Indian villa — Nirman360"
              className="w-full h-[360px] lg:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Overlay info card */}
            <div
              className="absolute bottom-4 left-4 rounded-xl p-3 shadow-xl backdrop-blur-md border"
              style={{
                background: "oklch(0.15 0.01 265 / 0.9)",
                borderColor: "oklch(0.4 0.05 265 / 0.6)",
              }}
            >
              <div className="flex items-center gap-2 text-sm">
                <MapPin
                  className="h-4 w-4"
                  style={{ color: "oklch(0.75 0.2 32)" }}
                />
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.95 0.01 265)" }}
                >
                  The Sterling Villa
                </span>
                <span style={{ color: "oklch(0.6 0.03 265)" }}>
                  — Mumbai, India
                </span>
              </div>
              <div
                className="flex items-center gap-3 mt-1 text-xs"
                style={{ color: "oklch(0.6 0.03 265)" }}
              >
                <span>3BHK • 2,400 sq.ft</span>
                <span
                  className="font-semibold"
                  style={{ color: "oklch(0.75 0.2 32)" }}
                >
                  ₹1.8Cr – ₹2.4Cr
                </span>
              </div>
            </div>
            {/* "First Design Free" pill */}
            <div className="absolute top-4 right-4">
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5"
                style={{
                  background: "oklch(0.62 0.18 32 / 0.9)",
                  color: "oklch(0.99 0 0)",
                }}
              >
                <Gift className="h-3 w-3" />
                First Design Free
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── First Design Free Banner ── */}
      <section
        data-ocid="home.free_banner.section"
        className="relative overflow-hidden py-8 px-4"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.62 0.18 32) 0%, oklch(0.68 0.16 45) 60%, oklch(0.72 0.14 55) 100%)",
        }}
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.99 0 0) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            className="flex flex-col gap-2 text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-2xl">🏠</span>
              <h2
                className="font-display text-xl lg:text-2xl font-bold"
                style={{ color: "oklch(0.99 0 0)" }}
              >
                Your First Design is Completely Free — No Signup Required
              </h2>
            </div>
            <p
              className="text-sm lg:text-base"
              style={{ color: "oklch(0.99 0 0 / 0.85)" }}
            >
              Start building your dream home today. No credit card, no account
              needed.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 shrink-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button
              asChild
              size="lg"
              data-ocid="home.free_banner.start_button"
              className="font-semibold shadow-lg hover:scale-105 transition-transform"
              style={{
                background: "oklch(0.22 0.07 265)",
                color: "oklch(0.99 0 0)",
              }}
            >
              <Link to="/builder">Start Free Design</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              data-ocid="home.free_banner.plans_button"
              className="font-semibold hover:scale-105 transition-transform"
              style={{
                borderColor: "oklch(0.99 0 0 / 0.7)",
                color: "oklch(0.99 0 0)",
                background: "transparent",
              }}
            >
              <Link to="/pricing">See Plans</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-primary py-8 border-b border-primary/80">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center gap-1"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <stat.icon className="h-5 w-5 text-primary-foreground/70 mb-1" />
              <span className="font-display text-2xl lg:text-3xl font-bold text-primary-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-primary-foreground/70">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Why Nirman360 ── */}
      <section data-ocid="home.why.section" className="py-16 bg-background">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-accent mb-1 uppercase tracking-wider">
              Why choose us
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Why Nirman360?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From free first design to expert-grade construction packages —
              built for every builder
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {WHY_NIRMAN.map((item, i) => (
              <motion.div
                key={item.title}
                className="relative p-6 rounded-2xl border bg-card hover:shadow-xl transition-smooth group overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-[48px] opacity-5"
                  style={{ background: "oklch(0.28 0.09 265)" }}
                />
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-smooth">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.desc}
                </p>
                <span
                  className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background:
                      i === 0
                        ? "oklch(0.62 0.18 32 / 0.12)"
                        : "oklch(0.28 0.09 265 / 0.1)",
                    color:
                      i === 0 ? "oklch(0.48 0.16 32)" : "oklch(0.35 0.1 265)",
                  }}
                >
                  {item.highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Designs ── */}
      <section data-ocid="home.featured.section" className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            className="flex items-end justify-between mb-8 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-sm font-medium text-accent mb-1 uppercase tracking-wider">
                Handpicked for you
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Featured Designs
              </h2>
              <p className="text-muted-foreground">
                Loved by homebuilders across India
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="shrink-0 gap-1.5"
              data-ocid="home.view_all.button"
            >
              <Link to="/browse">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDesigns.length > 0
                ? featuredDesigns.map((design, i) => (
                    <motion.div
                      key={design.id.toString()}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <DesignCard
                        design={design}
                        isSaved={savedDesignIds.has(design.id)}
                        onSave={(id) => {
                          optimisticSave(id);
                          saveMutation.mutate(id);
                        }}
                        onRemove={(id) => {
                          optimisticRemove(id);
                          removeMutation.mutate(id);
                        }}
                        index={i}
                      />
                    </motion.div>
                  ))
                : PLACEHOLDER_DESIGNS.map((ex, i) => (
                    <motion.div
                      key={ex.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <PlaceholderCard example={ex} index={i} />
                    </motion.div>
                  ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Categories ── */}
      <section
        data-ocid="home.categories.section"
        className="py-16 bg-background"
      >
        <div className="container">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-accent mb-1 uppercase tracking-wider">
              Explore categories
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find designs tailored to your specific building type and needs
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CATEGORY_META.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <CategoryCard category={cat} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Features ── */}
      <section data-ocid="home.features.section" className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-accent mb-1 uppercase tracking-wider">
              Platform features
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Everything You Need to Build
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From concept to completion — your end-to-end construction
              companion
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🏗️",
                title: "3D Design Previews",
                desc: "Photo-realistic visualizations before construction begins",
              },
              {
                icon: "📐",
                title: "Detailed Floor Plans",
                desc: "Accurate CAD-quality plans for every room and space",
              },
              {
                icon: "💰",
                title: "Cost Estimation",
                desc: "Region-specific material and labour cost breakdowns",
              },
              {
                icon: "📋",
                title: "Construction Guide",
                desc: "Step-by-step builder roadmap from foundation to finish",
              },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                className="p-6 rounded-xl border bg-card hover:shadow-lg transition-smooth group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="text-3xl mb-3">{feat.icon}</div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Teaser ── */}
      <section data-ocid="home.pricing.section" className="py-16 bg-background">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-accent mb-1 uppercase tracking-wider">
              Simple pricing
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Choose Your Plan
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start completely free — upgrade when you're ready for more
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TIER_PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Most Popular
                    </span>
                  </div>
                )}
                <Card
                  className={`h-full flex flex-col overflow-hidden border-2 ${plan.cardClass} transition-smooth hover:shadow-xl`}
                  data-ocid={`pricing.tier.${i + 1}`}
                >
                  <div
                    className="p-5 flex items-start gap-3"
                    style={plan.headerStyle}
                  >
                    <plan.icon
                      className="h-6 w-6 shrink-0 mt-0.5"
                      style={plan.titleStyle}
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-display font-bold text-lg leading-snug"
                        style={plan.titleStyle}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className="text-xs mt-0.5 opacity-75"
                        style={plan.titleStyle}
                      >
                        {plan.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div
                        className="font-display font-bold text-base leading-tight"
                        style={plan.priceStyle}
                      >
                        {plan.price}
                      </div>
                      <div
                        className="text-xs opacity-70 mt-0.5"
                        style={plan.titleStyle}
                      >
                        {plan.priceNote}
                      </div>
                    </div>
                  </div>
                  <CardContent className="flex flex-col flex-1 p-5 gap-4">
                    <ul className="flex flex-col gap-2.5 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="w-full mt-2 font-semibold"
                      size="sm"
                      data-ocid={`pricing.cta.${i + 1}`}
                      style={plan.ctaStyle}
                    >
                      <Link to={plan.href as "/"}>{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              asChild
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-foreground"
              data-ocid="home.view_all_plans.button"
            >
              <Link to="/pricing">
                View Full Pricing Details <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── How it works / process steps ── */}
      <section data-ocid="home.process.section" className="py-16 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-accent mb-1 uppercase tracking-wider">
              Simple process
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Start Building in 3 Steps
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: BookOpen,
                title: "Browse Designs",
                desc: "Filter by category, BHK type, size, and budget to find your ideal design.",
              },
              {
                step: "02",
                icon: BarChart3,
                title: "Estimate Costs",
                desc: "Get region-specific material and labour cost breakdowns instantly.",
              },
              {
                step: "03",
                icon: Building2,
                title: "Build with Confidence",
                desc: "Download floor plans, construction guides, and start your project.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                className="flex flex-col items-center text-center gap-4 relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-accent bg-accent/10 border border-accent/30 rounded-full h-6 w-6 flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        data-ocid="home.cta.section"
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 265) 0%, oklch(0.3 0.1 265) 60%, oklch(0.26 0.08 250) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.8 0.05 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.8 0.05 265) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            className="flex flex-col items-center gap-6 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="text-sm font-medium px-3 py-1 rounded-full"
              style={{
                background: "oklch(0.62 0.18 32 / 0.2)",
                color: "oklch(0.85 0.12 32)",
                border: "1px solid oklch(0.62 0.18 32 / 0.4)",
              }}
            >
              🏠 First design is completely free
            </div>
            <h2
              className="font-display text-3xl lg:text-4xl font-bold"
              style={{ color: "oklch(0.97 0.01 265)" }}
            >
              Ready to Build Your Dream?
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "oklch(0.72 0.04 265)" }}
            >
              Get your custom 3D design, precise cost estimate, and complete
              construction plan — start free, upgrade anytime.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="gap-2 font-semibold shadow-lg"
                data-ocid="home.cta.builder_button"
                style={{
                  background: "oklch(0.62 0.18 32)",
                  color: "oklch(0.99 0 0)",
                }}
              >
                <Link to="/builder">
                  Start Free Design <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 font-semibold"
                data-ocid="home.cta.browse_button"
                style={{
                  borderColor: "oklch(0.75 0.04 265 / 0.4)",
                  color: "oklch(0.88 0.02 265)",
                  background: "transparent",
                }}
              >
                <Link to="/browse">Browse Designs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ── Static placeholder card matching design preview style ──

interface PlaceholderExample {
  id: string;
  title: string;
  location: string;
  status: string;
  budget: string;
  style: string;
  tag: string;
  img: string;
  bhk: string;
  area: string;
}

function PlaceholderCard({
  example: ex,
  index,
}: { example: PlaceholderExample; index: number }) {
  return (
    <div
      data-ocid={`design.item.${index + 1}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-smooth hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={ex.img}
          alt={ex.title}
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Tag badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-600/90 text-white px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
            {ex.tag}
          </span>
        </div>
        {/* Free trial pill — shown on first card */}
        {index === 0 && (
          <div className="absolute top-3 right-3">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm"
              style={{
                background: "oklch(0.62 0.18 32 / 0.9)",
                color: "oklch(0.99 0 0)",
              }}
            >
              <Gift className="h-3 w-3" />
              Try Free
            </span>
          </div>
        )}
        {/* Location */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white/90">
          <MapPin className="h-3 w-3" />
          <span>{ex.location}</span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-semibold text-foreground leading-snug">
          {ex.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {ex.location}
        </div>
        {/* Meta row */}
        <div className="grid grid-cols-2 gap-2 text-xs border-t border-border pt-3">
          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="font-medium text-foreground truncate">{ex.status}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Budget</p>
            <p className="font-semibold text-accent">{ex.budget}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Type</p>
            <p className="font-medium text-foreground">{ex.bhk}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Design Style</p>
            <p className="font-medium text-foreground truncate">{ex.style}</p>
          </div>
        </div>
        {/* CTA row */}
        <div className="flex gap-2 pt-1">
          <Button
            asChild
            size="sm"
            variant="default"
            className="flex-1"
            data-ocid={`design.link.${index + 1}`}
          >
            <Link to="/browse">View Details</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1"
            data-ocid={`design.walkthrough.${index + 1}`}
          >
            <Link to="/builder">Explore 3D</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
