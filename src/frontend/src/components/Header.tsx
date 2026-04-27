import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  Calculator,
  ChevronDown,
  Crown,
  Gift,
  HardHat,
  LayoutGrid,
  LogIn,
  LogOut,
  Menu,
  Phone,
  Star,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useDesigns";
import { useFreeTierStatus } from "../hooks/useTierAccess";
import { TierBadge } from "./TierBadge";

const NAV_LINKS = [
  { to: "/browse", label: "Browse Designs", icon: LayoutGrid },
  { to: "/calculator", label: "Cost Calculator", icon: Calculator },
  { to: "/pricing", label: "Pricing", icon: Star },
  { to: "/contact", label: "Contact", icon: Phone },
];

export function Header() {
  const { isAuthenticated, login, logout, isLoggingIn } = useAuth();
  const { data: profile } = useProfile();
  const { hasUsedFreeProject } = useFreeTierStatus();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          data-ocid="nav.logo.link"
          className="flex items-center gap-2 shrink-0 hover:opacity-90 transition-smooth"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            Nirman<span className="text-primary">360</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              data-ocid={`nav.${label.toLowerCase().replace(/ /g, "_")}.link`}
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              activeProps={{ className: "text-primary bg-primary/5" }}
            >
              {label}
            </Link>
          ))}
          {/* Design Builder — accent link */}
          <Link
            to="/builder"
            data-ocid="nav.design_builder.link"
            className="ml-1 flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ color: "#f97316" }}
            activeProps={{ className: "opacity-80" }}
            aria-label="Design Builder — 3D Building Design System"
          >
            <HardHat className="h-4 w-4" />
            Design Builder
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold leading-none bg-orange-500 text-white">
              NEW
            </span>
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated && profile ? (
            /* ── Logged-in: user dropdown with tier badge ── */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  data-ocid="nav.profile.open_modal_button"
                  className="gap-2"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {profile.displayName?.charAt(0)?.toUpperCase() ?? "U"}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate text-sm">
                    {profile.displayName || "Account"}
                  </span>
                  <TierBadge
                    tier={profile.tier}
                    size="sm"
                    className="hidden sm:inline-flex"
                  />
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link
                    to="/dashboard"
                    data-ocid="nav.dashboard.link"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    My Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/pricing"
                    data-ocid="nav.upgrade.link"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Crown className="h-4 w-4 text-accent" />
                    Upgrade Plan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  data-ocid="nav.logout.button"
                  className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* ── Logged-out: contextual CTA based on free project status ── */
            <div className="flex items-center gap-2">
              {!hasUsedFreeProject ? (
                /* Free project still available → orange CTA to builder */
                <Button
                  asChild
                  size="sm"
                  data-ocid="nav.try_free.button"
                  className="gap-1.5 font-semibold hidden sm:flex"
                  style={{
                    background: "oklch(0.62 0.18 32)",
                    color: "oklch(0.99 0 0)",
                  }}
                >
                  <Link to="/builder">
                    <Gift className="h-3.5 w-3.5" />
                    Try Free Design
                  </Link>
                </Button>
              ) : (
                /* Free project used → nudge upgrade */
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  data-ocid="nav.upgrade_premium.button"
                  className="gap-1.5 font-semibold hidden sm:flex border-primary text-primary hover:bg-primary/5"
                >
                  <Link to="/pricing">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Upgrade to Premium
                  </Link>
                </Button>
              )}
              <Button
                size="sm"
                onClick={login}
                disabled={isLoggingIn}
                data-ocid="nav.login.button"
                className="gap-1.5"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isLoggingIn ? "Signing in..." : "Sign In"}
                </span>
              </Button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            data-ocid="nav.mobile_menu.toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          data-ocid="nav.mobile_menu"
          className="md:hidden border-t border-border bg-card animate-slide-up"
        >
          <nav className="container py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                activeProps={{ className: "text-primary bg-primary/5" }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            {/* Design Builder mobile link */}
            <Link
              to="/builder"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.mobile.design_builder.link"
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-smooth"
              style={{ color: "#f97316" }}
              aria-label="Design Builder — 3D Building Design System"
            >
              <HardHat className="h-4 w-4" />
              Design Builder
              <span className="ml-auto inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold leading-none bg-orange-500 text-white">
                NEW
              </span>
            </Link>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <User className="h-4 w-4" />
                My Dashboard
              </Link>
            ) : (
              /* Mobile: contextual free/upgrade CTA */
              <div className="px-3 py-2 mt-1 border-t border-border pt-3">
                {!hasUsedFreeProject ? (
                  <Button
                    asChild
                    size="sm"
                    className="w-full gap-2 font-semibold"
                    data-ocid="nav.mobile.try_free.button"
                    style={{
                      background: "oklch(0.62 0.18 32)",
                      color: "oklch(0.99 0 0)",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link to="/builder">
                      <Gift className="h-4 w-4" />
                      Try Free Design — No Signup
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full gap-2 font-semibold border-primary text-primary"
                    data-ocid="nav.mobile.upgrade.button"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Link to="/pricing">
                      <TrendingUp className="h-4 w-4" />
                      Upgrade to Premium
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
