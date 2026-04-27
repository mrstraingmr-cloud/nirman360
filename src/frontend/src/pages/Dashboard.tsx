import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookmarkX,
  Calendar,
  CheckCircle2,
  Crown,
  ExternalLink,
  Mail,
  MessageSquare,
  Phone,
  Settings,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { InquiryStatus } from "../backend";
import { DesignCard } from "../components/DesignCard";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { TierBadge } from "../components/TierBadge";
import { useAuth } from "../hooks/useAuth";
import {
  useMyInquiries,
  useProfile,
  useRemoveSavedDesign,
  useSavedDesigns,
  useUpdateProfile,
} from "../hooks/useDesigns";
import { useUIStore } from "../store/uiStore";

const FREE_SAVE_LIMIT = 5;

const STATUS_META: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  [InquiryStatus.pending]: {
    label: "Pending",
    color: "bg-accent/10 text-accent border-accent/20",
    dot: "bg-accent",
  },
  [InquiryStatus.reviewed]: {
    label: "Reviewed",
    color: "bg-primary/10 text-primary border-primary/20",
    dot: "bg-primary",
  },
  [InquiryStatus.responded]: {
    label: "Responded",
    color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
};

const TIER_NEXT_BENEFITS: Record<
  string,
  {
    next: string;
    benefits: string[];
    cta: string;
    ctaHref: string;
    isContact?: boolean;
  }
> = {
  free: {
    next: "Premium",
    benefits: [
      "Full CAD floor plans & PDF downloads",
      "Advanced cost calculator",
      "Unlimited design saves",
      "Ad-free experience",
    ],
    cta: "Upgrade to Premium",
    ctaHref: "/pricing",
  },
  premium: {
    next: "Ultra Premium",
    benefits: [
      "Custom 3D design requests",
      "1-on-1 architect consultation",
      "High-quality renders",
      "Dedicated project manager",
    ],
    cta: "Contact for Ultra Premium",
    ctaHref: "/contact",
    isContact: true,
  },
  ultraPremium: {
    next: "",
    benefits: [
      "Custom 3D designs",
      "Architect consultations",
      "Premium renders",
      "Dedicated manager",
    ],
    cta: "Manage Subscription",
    ctaHref: "/contact",
  },
};

export default function DashboardPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: savedDesigns, isLoading: savesLoading } = useSavedDesigns();
  const { data: inquiries, isLoading: inqLoading } = useMyInquiries();
  const { optimisticRemove } = useUIStore();
  const removeMutation = useRemoveSavedDesign();
  const updateProfile = useUpdateProfile();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(profile?.displayName ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [nameInit, setNameInit] = useState(false);

  // Initialize form from profile once loaded
  if (profile && !nameInit) {
    setDisplayName(profile.displayName || "");
    setEmail(profile.email || "");
    setNameInit(true);
  }

  if (isInitializing || profileLoading)
    return <LoadingSpinner className="py-24" />;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20"
        >
          <User className="h-10 w-10 text-primary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Login to access your dashboard
          </h2>
          <p className="text-muted-foreground max-w-sm">
            Your saved designs, custom build inquiries, and account settings are
            all here.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            size="lg"
            onClick={login}
            data-ocid="dashboard.login.primary_button"
            className="gap-2"
          >
            <User className="h-4 w-4" /> Sign In with Internet Identity
          </Button>
        </motion.div>
      </div>
    );
  }

  const tier = (profile?.tier ?? "free") as string;
  const savesCount = savedDesigns?.length ?? 0;
  const nextTierInfo = TIER_NEXT_BENEFITS[tier] ?? TIER_NEXT_BENEFITS.free;
  const memberYear = profile
    ? new Date(Number(profile.createdAt / 1_000_000n)).getFullYear()
    : new Date().getFullYear();

  const handleSaveProfile = () => {
    updateProfile.mutate(
      { displayName, email },
      {
        onSuccess: () => toast.success("Profile updated successfully"),
        onError: () => toast.error("Failed to update profile"),
      },
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border py-8">
        <div className="container flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              My Dashboard
            </h1>
            {profile && (
              <p className="text-muted-foreground mt-1">
                Welcome back,{" "}
                <span className="text-foreground font-semibold">
                  {profile.displayName || "User"}
                </span>
              </p>
            )}
            {profile && (
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Member since {memberYear}
              </div>
            )}
          </div>
          {profile && (
            <div className="flex items-center gap-3">
              <TierBadge tier={profile.tier} size="md" />
              <Button
                asChild
                variant="outline"
                size="sm"
                data-ocid="dashboard.upgrade.button"
              >
                <Link to="/pricing">
                  <Crown className="h-4 w-4 mr-1.5 text-accent" /> Upgrade
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Stats row */}
        {profile && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Saved Designs", value: savesCount, icon: BookmarkX },
              {
                label: "Inquiries Sent",
                value: inquiries?.length ?? 0,
                icon: MessageSquare,
              },
              {
                label: "Current Tier",
                value:
                  tier === "ultraPremium"
                    ? "Ultra"
                    : tier === "premium"
                      ? "Premium"
                      : "Free",
                icon: Crown,
              },
              { label: "Member Since", value: memberYear, icon: Calendar },
            ].map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <div className="text-2xl font-bold text-foreground font-display">
                  {value}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Main tabs */}
        <Tabs defaultValue="saved" data-ocid="dashboard.tabs">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger
              value="saved"
              data-ocid="dashboard.saved.tab"
              className="gap-1.5"
            >
              <BookmarkX className="h-4 w-4" />
              Saved {savedDesigns && `(${savedDesigns.length})`}
            </TabsTrigger>
            <TabsTrigger
              value="inquiries"
              data-ocid="dashboard.inquiries.tab"
              className="gap-1.5"
            >
              <MessageSquare className="h-4 w-4" />
              Inquiries {inquiries && `(${inquiries.length})`}
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              data-ocid="dashboard.settings.tab"
              className="gap-1.5"
            >
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Saved Designs */}
          <TabsContent value="saved" className="mt-6 space-y-5">
            {tier === "free" && (
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Design saves used
                  </span>
                  <span
                    className="text-sm font-semibold text-foreground"
                    data-ocid="dashboard.saves.progress"
                  >
                    {savesCount}/{FREE_SAVE_LIMIT}
                  </span>
                </div>
                <Progress
                  value={(savesCount / FREE_SAVE_LIMIT) * 100}
                  className="h-2"
                />
                {savesCount >= FREE_SAVE_LIMIT && (
                  <p className="text-xs text-accent mt-2 font-medium">
                    Save limit reached.{" "}
                    <Link
                      to="/pricing"
                      className="underline hover:no-underline"
                    >
                      Upgrade to Premium
                    </Link>{" "}
                    for unlimited saves.
                  </p>
                )}
              </div>
            )}

            {savesLoading ? (
              <LoadingSpinner />
            ) : !savedDesigns || savedDesigns.length === 0 ? (
              <EmptyState
                icon={<BookmarkX className="h-8 w-8" />}
                title="No saved designs yet"
                description="Browse our catalog and save designs you love"
                actionLabel="Browse Designs"
                onAction={() => {
                  navigate({ to: "/browse" });
                }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDesigns.map((design, i) => (
                  <DesignCard
                    key={design.id.toString()}
                    design={design}
                    isSaved
                    onRemove={(id) => {
                      optimisticRemove(id);
                      removeMutation.mutate(id);
                    }}
                    index={i}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* My Inquiries */}
          <TabsContent value="inquiries" className="mt-6">
            {inqLoading ? (
              <LoadingSpinner />
            ) : !inquiries || inquiries.length === 0 ? (
              <EmptyState
                icon={<Mail className="h-8 w-8" />}
                title="No inquiries submitted yet"
                description="Submit a custom build inquiry and track its status here"
                actionLabel="Start a Custom Project"
                onAction={() => {
                  navigate({ to: "/contact" });
                }}
              />
            ) : (
              <div className="flex flex-col gap-4">
                {inquiries.map((inq, i) => {
                  const statusConf = STATUS_META[inq.status] ?? {
                    label: inq.status,
                    color:
                      "bg-secondary text-secondary-foreground border-border",
                    dot: "bg-muted-foreground",
                  };
                  const submittedDate = new Date(
                    Number(inq.createdAt / 1_000_000n),
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  const budgetLabel =
                    inq.budgetMin > 0n
                      ? `₹${(Number(inq.budgetMin) / 100000).toFixed(0)}L – ₹${(Number(inq.budgetMax) / 100000).toFixed(0)}L`
                      : "Budget TBD";
                  return (
                    <motion.div
                      key={inq.id.toString()}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      data-ocid={`dashboard.inquiry.item.${i + 1}`}
                      className="p-5 rounded-xl border border-border bg-card transition-smooth hover:border-primary/30"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {inq.projectType}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {submittedDate}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConf.color}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusConf.dot}`}
                          />
                          {statusConf.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {inq.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                        <span className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          {inq.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {inq.phone}
                        </span>
                        <span className="flex items-center gap-1.5 ml-auto font-medium text-foreground">
                          {budgetLabel}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile form */}
              <div className="rounded-xl border border-border bg-card p-6 space-y-5">
                <h2 className="font-display font-semibold text-lg text-foreground">
                  Profile Details
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your name"
                      data-ocid="dashboard.settings.name.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      data-ocid="dashboard.settings.email.input"
                    />
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={updateProfile.isPending}
                    className="w-full sm:w-auto"
                    data-ocid="dashboard.settings.save.submit_button"
                  >
                    {updateProfile.isPending ? "Saving…" : "Save Changes"}
                  </Button>
                </div>
              </div>

              {/* Tier status & upgrade */}
              <TierUpgradeCard tier={tier} nextTierInfo={nextTierInfo} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface TierUpgradeCardProps {
  tier: string;
  nextTierInfo: {
    next: string;
    benefits: string[];
    cta: string;
    ctaHref: string;
    isContact?: boolean;
  };
}

function TierUpgradeCard({ tier, nextTierInfo }: TierUpgradeCardProps) {
  const isUltra = tier === "ultraPremium";

  return (
    <div
      className={`rounded-xl border p-6 space-y-4 ${isUltra ? "border-accent/30 bg-accent/5" : "border-primary/30 bg-primary/5"}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-lg text-foreground">
          Your Plan
        </h2>
        <TierBadge tier={tier} size="md" />
      </div>

      {isUltra ? (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
          <Sparkles className="h-5 w-5 text-accent shrink-0" />
          <p className="text-sm text-foreground font-medium">
            You're on our highest tier — full access to every feature.
          </p>
        </div>
      ) : (
        <>
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Unlock with{" "}
              <span className="font-semibold text-foreground">
                {nextTierInfo.next}
              </span>
              :
            </p>
            <ul className="space-y-2">
              {nextTierInfo.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            {nextTierInfo.isContact ? (
              <Button
                asChild
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground gap-2"
                data-ocid="dashboard.tier.upgrade.primary_button"
              >
                <Link to={nextTierInfo.ctaHref}>
                  <Sparkles className="h-4 w-4" /> {nextTierInfo.cta}
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="w-full gap-2"
                data-ocid="dashboard.tier.upgrade.primary_button"
              >
                <Link to={nextTierInfo.ctaHref}>
                  <Crown className="h-4 w-4" /> {nextTierInfo.cta}
                </Link>
              </Button>
            )}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground gap-1"
            >
              <Link to="/pricing">
                Compare all plans <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </>
      )}

      {isUltra && (
        <Button
          asChild
          variant="outline"
          className="w-full"
          data-ocid="dashboard.tier.manage.button"
        >
          <Link to={nextTierInfo.ctaHref}>
            <Zap className="h-4 w-4 mr-2" /> {nextTierInfo.cta}
          </Link>
        </Button>
      )}
    </div>
  );
}
