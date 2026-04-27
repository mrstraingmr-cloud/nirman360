import { Link } from "@tanstack/react-router";
import { Building2, Mail, Phone } from "lucide-react";

const footerLinks = {
  platform: [
    { to: "/browse", label: "Browse Designs" },
    { to: "/browse/residential", label: "Residential" },
    { to: "/browse/apartments", label: "Apartments" },
    { to: "/browse/dairyFarms", label: "Dairy Farms" },
    { to: "/browse/smallBusiness", label: "Small Business" },
  ],
  tools: [
    { to: "/calculator", label: "Cost Calculator" },
    { to: "/pricing", label: "Pricing Plans" },
    { to: "/contact", label: "Custom Design" },
  ],
  account: [
    { to: "/dashboard", label: "My Dashboard" },
    { to: "/contact", label: "Contact Us" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "nirman360",
  );

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-smooth"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Nirman<span className="text-primary">360</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            India's premier construction and architectural design platform.
            Explore 3D designs, estimate costs, and build your dream.
          </p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <a
              href="mailto:hello@nirman360.in"
              className="flex items-center gap-2 hover:text-foreground transition-smooth"
            >
              <Mail className="h-4 w-4" />
              hello@nirman360.in
            </a>
            <a
              href="tel:+911800000000"
              className="flex items-center gap-2 hover:text-foreground transition-smooth"
            >
              <Phone className="h-4 w-4" />
              1800-000-0000
            </a>
          </div>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Platform
          </h4>
          <ul className="flex flex-col gap-2">
            {footerLinks.platform.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Tools</h4>
          <ul className="flex flex-col gap-2">
            {footerLinks.tools.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Account
          </h4>
          <ul className="flex flex-col gap-2">
            {footerLinks.account.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>© {year} Nirman360. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
