import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useProfile, useSubmitInquiry } from "../hooks/useDesigns";

const PROJECT_TYPES = [
  { value: "Residential House", label: "Residential House (1BHK / 2BHK)" },
  { value: "Residential House 3BHK+", label: "Residential House (3BHK+)" },
  { value: "Villa / Farmhouse", label: "Villa / Farmhouse" },
  { value: "Apartment / Building", label: "Apartment / Building" },
  { value: "Dairy Farm / Agricultural", label: "Dairy Farm / Agricultural" },
  {
    value: "Small Business",
    label: "Small Business (Shop / Office / Warehouse)",
  },
  { value: "Custom / Unique", label: "Custom / Unique Project" },
];

const SERVICES = [
  "3D Architectural Design & Rendering",
  "Floor Plan & Elevation Drawings",
  "Structural Engineering Consultation",
  "Material Cost Estimation",
  "Interior Design Planning",
  "Construction Progress Monitoring",
];

const TRUST_INDICATORS = [
  { icon: Shield, label: "Licensed Architects", value: "RERA Certified" },
  { icon: Award, label: "Years of Experience", value: "10+ Years" },
  { icon: Building2, label: "Projects Completed", value: "500+ Projects" },
  { icon: Users, label: "Happy Clients", value: "1,200+ Families" },
];

type FormErrors = Record<string, string>;

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  budgetMin: string;
  budgetMax: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  description: "",
  budgetMin: "",
  budgetMax: "",
};

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Full name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(form.phone.replace(/[\s\-+()]/g, ""))) {
    errors.phone = "Enter a valid 10-digit Indian mobile number";
  }
  if (!form.projectType) errors.projectType = "Please select a project type";
  if (!form.description.trim()) {
    errors.description = "Project description is required";
  } else if (form.description.trim().length < 50) {
    errors.description = `Description too short (${form.description.trim().length}/50 chars)`;
  }
  const minNum = Number(form.budgetMin);
  const maxNum = Number(form.budgetMax);
  if (form.budgetMin && form.budgetMax && minNum >= maxNum) {
    errors.budgetMax = "Maximum budget must be greater than minimum";
  }
  return errors;
}

export default function ContactPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: profile } = useProfile();
  const submitMutation = useSubmitInquiry();

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  // @ts-ignore – tier is present on profile from backend
  const isUltraPremium = profile?.tier === "ultraPremium";

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (touched[field]) {
      const newErrors = validateForm({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] ?? "" }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((p) => ({ ...p, [field]: true }));
    const fieldErrors = validateForm(form);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] ?? "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      login();
      return;
    }
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true]),
    );
    setTouched(allTouched);
    const formErrors = validateForm(form);
    setErrors(formErrors);
    if (Object.values(formErrors).some(Boolean)) return;

    submitMutation.mutate(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        projectType: form.projectType,
        description: form.description,
        budgetMin: BigInt(
          Math.max(0, Number.parseInt(form.budgetMin || "0", 10)) * 100000,
        ),
        budgetMax: BigInt(
          Math.max(0, Number.parseInt(form.budgetMax || "0", 10)) * 100000,
        ),
      },
      { onSuccess: () => setSubmitted(true) },
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-card border-b border-border">
        <div className="container max-w-6xl py-12">
          <div className="flex items-center gap-2 mb-3">
            <Badge
              variant="secondary"
              className="gap-1.5 text-accent border-accent/30 bg-accent/10"
            >
              <Building2 className="h-3 w-3" />
              Custom Build Inquiry
            </Badge>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
            Build Your <span className="text-gradient">Dream Project</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Tell us about your project and we'll get back to you within{" "}
            <strong className="text-foreground">24 hours</strong>. Our licensed
            architects are ready to bring your vision to life.
          </p>
        </div>
      </div>

      <div className="container max-w-6xl py-10">
        {submitted ? (
          /* ── Success State ── */
          <div
            data-ocid="contact.success_state"
            className="flex flex-col items-center gap-6 py-24 text-center"
          >
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 animate-in zoom-in duration-500">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
              <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-ping" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Inquiry Submitted!
              </h2>
              <p className="text-muted-foreground max-w-sm text-base">
                We've received your project inquiry. Our team will contact you
                at <strong className="text-foreground">{form.email}</strong>{" "}
                within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setForm(initialForm);
                  setErrors({});
                  setTouched({});
                }}
                data-ocid="contact.submit_another.button"
              >
                Submit Another Inquiry
              </Button>
              <Button asChild data-ocid="contact.browse_designs.button">
                <Link to="/browse">
                  Browse Designs <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* ── Left: Form ── */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Ultra Premium Consultation Banner */}
              {isAuthenticated && isUltraPremium && (
                <div
                  data-ocid="contact.ultra_premium.panel"
                  className="rounded-xl border border-accent/30 bg-accent/5 p-5 flex gap-4 items-start"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15">
                    <Star className="h-5 w-5 text-accent fill-accent/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground mb-0.5">
                      Ultra Premium Member
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      As an Ultra Premium member, you can book a direct
                      consultation with our senior architects instead of a
                      generic inquiry.
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                      data-ocid="contact.book_consultation.button"
                    >
                      <Calendar className="h-4 w-4" />
                      Book a Consultation
                    </Button>
                  </div>
                </div>
              )}

              {/* Personal Information */}
              <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-5">
                <h2 className="font-display font-semibold text-foreground text-lg">
                  Personal Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="c-name">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="c-name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      placeholder="Ramesh Kumar"
                      aria-describedby={
                        errors.name ? "c-name-error" : undefined
                      }
                      className={
                        errors.name && touched.name
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }
                      data-ocid="contact.name.input"
                    />
                    {errors.name && touched.name && (
                      <p
                        id="c-name-error"
                        className="text-xs text-destructive"
                        data-ocid="contact.name.field_error"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="c-email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="c-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      placeholder="ramesh@example.com"
                      aria-describedby={
                        errors.email ? "c-email-error" : undefined
                      }
                      className={
                        errors.email && touched.email
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }
                      data-ocid="contact.email.input"
                    />
                    {errors.email && touched.email && (
                      <p
                        id="c-email-error"
                        className="text-xs text-destructive"
                        data-ocid="contact.email.field_error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="c-phone">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="c-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      placeholder="98765 43210"
                      aria-describedby="c-phone-hint c-phone-error"
                      className={
                        errors.phone && touched.phone
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }
                      data-ocid="contact.phone.input"
                    />
                  </div>
                  <p
                    id="c-phone-hint"
                    className="text-xs text-muted-foreground"
                  >
                    Indian mobile number (10 digits, e.g. 98765 43210)
                  </p>
                  {errors.phone && touched.phone && (
                    <p
                      id="c-phone-error"
                      className="text-xs text-destructive"
                      data-ocid="contact.phone.field_error"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-5">
                <h2 className="font-display font-semibold text-foreground text-lg">
                  Project Details
                </h2>
                <div className="flex flex-col gap-1.5">
                  <Label>
                    Project Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.projectType}
                    onValueChange={(v) => handleChange("projectType", v)}
                  >
                    <SelectTrigger
                      className={
                        errors.projectType && touched.projectType
                          ? "border-destructive"
                          : ""
                      }
                      data-ocid="contact.project_type.select"
                    >
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map((pt) => (
                        <SelectItem key={pt.value} value={pt.value}>
                          {pt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.projectType && touched.projectType && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="contact.project_type.field_error"
                    >
                      {errors.projectType}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="c-desc">
                      Project Description{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <span
                      className={`text-xs ${
                        form.description.trim().length >= 50
                          ? "text-green-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      {form.description.trim().length}/50 min chars
                    </span>
                  </div>
                  <Textarea
                    id="c-desc"
                    rows={5}
                    value={form.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    onBlur={() => handleBlur("description")}
                    placeholder="Describe your dream project — plot size, number of floors, special requirements, preferred style, timeline, etc."
                    aria-describedby={
                      errors.description ? "c-desc-error" : undefined
                    }
                    className={
                      errors.description && touched.description
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                    data-ocid="contact.description.textarea"
                  />
                  {errors.description && touched.description && (
                    <p
                      id="c-desc-error"
                      className="text-xs text-destructive"
                      data-ocid="contact.description.field_error"
                    >
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Estimated Budget (in Lakhs ₹)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <Input
                        type="number"
                        min="1"
                        value={form.budgetMin}
                        onChange={(e) =>
                          handleChange("budgetMin", e.target.value)
                        }
                        onBlur={() => handleBlur("budgetMin")}
                        placeholder="Min (e.g. 30)"
                        data-ocid="contact.budget_min.input"
                      />
                      <span className="text-xs text-muted-foreground">
                        Minimum budget
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Input
                        type="number"
                        min="1"
                        value={form.budgetMax}
                        onChange={(e) =>
                          handleChange("budgetMax", e.target.value)
                        }
                        onBlur={() => handleBlur("budgetMax")}
                        placeholder="Max (e.g. 60)"
                        className={
                          errors.budgetMax && touched.budgetMax
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                        data-ocid="contact.budget_max.input"
                      />
                      <span className="text-xs text-muted-foreground">
                        Maximum budget
                      </span>
                    </div>
                  </div>
                  {errors.budgetMax && touched.budgetMax && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="contact.budget.field_error"
                    >
                      {errors.budgetMax}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth font-semibold text-base h-12"
                disabled={submitMutation.isPending}
                data-ocid="contact.submit.submit_button"
              >
                {submitMutation.isPending
                  ? "Submitting…"
                  : isAuthenticated
                    ? "Submit Project Inquiry"
                    : "Sign In & Submit Inquiry"}
                <ChevronRight className="h-4 w-4" />
              </Button>

              {submitMutation.isError && (
                <div
                  className="text-sm text-destructive bg-destructive/10 rounded-lg p-3 border border-destructive/20"
                  data-ocid="contact.error_state"
                >
                  Failed to submit. Please check your connection and try again.
                </div>
              )}

              {!isAuthenticated && (
                <p className="text-xs text-muted-foreground text-center">
                  You'll be asked to sign in with Internet Identity before
                  submitting.
                </p>
              )}
            </form>

            {/* ── Right: Info Panel ── */}
            <aside className="flex flex-col gap-5 lg:sticky lg:top-6">
              {/* Contact Details */}
              <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4">
                <h3 className="font-display font-semibold text-foreground">
                  Contact Us Directly
                </h3>
                <a
                  href="mailto:contact@nirman360.com"
                  className="flex items-center gap-3 group transition-smooth"
                  data-ocid="contact.email.link"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-smooth">
                      contact@nirman360.com
                    </p>
                  </div>
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 group transition-smooth"
                  data-ocid="contact.phone.link"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-smooth">
                      +91 98765 43210
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Office Hours
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      Mon–Sat, 9:00 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
                <h3 className="font-display font-semibold text-foreground">
                  Our Services
                </h3>
                <ul className="flex flex-col gap-2">
                  {SERVICES.map((service) => (
                    <li key={service} className="flex items-start gap-2">
                      <BadgeCheck className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Indicators */}
              <div className="rounded-xl border border-border bg-muted/40 p-5 flex flex-col gap-3">
                <h3 className="font-display font-semibold text-foreground">
                  Why Trust Us
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {TRUST_INDICATORS.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 rounded-lg bg-card border border-border p-3"
                    >
                      <Icon className="h-4 w-4 text-accent mb-0.5" />
                      <p className="font-display font-bold text-foreground text-sm leading-tight">
                        {value}
                      </p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time Notice */}
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 flex gap-3 items-start">
                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <p className="text-sm text-foreground">
                  <strong>24-hour response guarantee.</strong>{" "}
                  <span className="text-muted-foreground">
                    We respond to all inquiries within one business day. Complex
                    projects may require an initial call to understand your
                    vision.
                  </span>
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
