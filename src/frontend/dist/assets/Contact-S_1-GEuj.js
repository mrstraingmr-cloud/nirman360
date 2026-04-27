import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, k as useAuth, l as useProfile, a0 as useSubmitInquiry, r as reactExports, e as Building2, B as Button, L as Link, S as Star, Y as Mail, Z as Phone } from "./index-V48KFtBG.js";
import { B as Badge } from "./badge-5Q9nPy-w.js";
import { L as Label, I as Input } from "./label-DNIdGCOI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DuT0em1b.js";
import { C as CircleCheck } from "./circle-check-Bevt8mPp.js";
import { C as ChevronRight } from "./chevron-right-CCbKXjRX.js";
import { C as Calendar } from "./calendar-Cr3UPfCr.js";
import { C as Clock } from "./clock-0ZC4Sf3W.js";
import { S as Shield } from "./shield-XDwhVAaG.js";
import { U as Users } from "./users-DLX_mwAc.js";
import "./index-CF2_vi6k.js";
import "./index-D2OthdYx.js";
import "./check-BM8icY0u.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode);
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const PROJECT_TYPES = [
  { value: "Residential House", label: "Residential House (1BHK / 2BHK)" },
  { value: "Residential House 3BHK+", label: "Residential House (3BHK+)" },
  { value: "Villa / Farmhouse", label: "Villa / Farmhouse" },
  { value: "Apartment / Building", label: "Apartment / Building" },
  { value: "Dairy Farm / Agricultural", label: "Dairy Farm / Agricultural" },
  {
    value: "Small Business",
    label: "Small Business (Shop / Office / Warehouse)"
  },
  { value: "Custom / Unique", label: "Custom / Unique Project" }
];
const SERVICES = [
  "3D Architectural Design & Rendering",
  "Floor Plan & Elevation Drawings",
  "Structural Engineering Consultation",
  "Material Cost Estimation",
  "Interior Design Planning",
  "Construction Progress Monitoring"
];
const TRUST_INDICATORS = [
  { icon: Shield, label: "Licensed Architects", value: "RERA Certified" },
  { icon: Award, label: "Years of Experience", value: "10+ Years" },
  { icon: Building2, label: "Projects Completed", value: "500+ Projects" },
  { icon: Users, label: "Happy Clients", value: "1,200+ Families" }
];
const initialForm = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  description: "",
  budgetMin: "",
  budgetMax: ""
};
function validateForm(form) {
  const errors = {};
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
function ContactPage() {
  const { isAuthenticated, login } = useAuth();
  const { data: profile } = useProfile();
  const submitMutation = useSubmitInquiry();
  const [form, setForm] = reactExports.useState(initialForm);
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const [submitted, setSubmitted] = reactExports.useState(false);
  const isUltraPremium = (profile == null ? void 0 : profile.tier) === "ultraPremium";
  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (touched[field]) {
      const newErrors = validateForm({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] ?? "" }));
    }
  };
  const handleBlur = (field) => {
    setTouched((p) => ({ ...p, [field]: true }));
    const fieldErrors = validateForm(form);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] ?? "" }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      login();
      return;
    }
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true])
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
          Math.max(0, Number.parseInt(form.budgetMin || "0", 10)) * 1e5
        ),
        budgetMax: BigInt(
          Math.max(0, Number.parseInt(form.budgetMax || "0", 10)) * 1e5
        )
      },
      { onSuccess: () => setSubmitted(true) }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "gap-1.5 text-accent border-accent/30 bg-accent/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
            "Custom Build Inquiry"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight", children: [
        "Build Your ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Dream Project" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-lg max-w-xl", children: [
        "Tell us about your project and we'll get back to you within",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "24 hours" }),
        ". Our licensed architects are ready to bring your vision to life."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl py-10", children: submitted ? (
      /* ── Success State ── */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "contact.success_state",
          className: "flex flex-col items-center gap-6 py-24 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 animate-in zoom-in duration-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-green-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-2 border-green-500/30 animate-ping" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Inquiry Submitted!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground max-w-sm text-base", children: [
                "We've received your project inquiry. Our team will contact you at ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: form.email }),
                " ",
                "within 24 hours."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => {
                    setSubmitted(false);
                    setForm(initialForm);
                    setErrors({});
                    setTouched({});
                  },
                  "data-ocid": "contact.submit_another.button",
                  children: "Submit Another Inquiry"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "contact.browse_designs.button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/browse", children: [
                "Browse Designs ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
              ] }) })
            ] })
          ]
        }
      )
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_380px] gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-6", children: [
        isAuthenticated && isUltraPremium && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "contact.ultra_premium.panel",
            className: "rounded-xl border border-accent/30 bg-accent/5 p-5 flex gap-4 items-start",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 text-accent fill-accent/30" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-0.5", children: "Ultra Premium Member" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "As an Ultra Premium member, you can book a direct consultation with our senior architects instead of a generic inquiry." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    size: "sm",
                    className: "gap-2 bg-accent hover:bg-accent/90 text-accent-foreground",
                    "data-ocid": "contact.book_consultation.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
                      "Book a Consultation"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: "Personal Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "c-name", children: [
                "Full Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "c-name",
                  value: form.name,
                  onChange: (e) => handleChange("name", e.target.value),
                  onBlur: () => handleBlur("name"),
                  placeholder: "Ramesh Kumar",
                  "aria-describedby": errors.name ? "c-name-error" : void 0,
                  className: errors.name && touched.name ? "border-destructive focus-visible:ring-destructive" : "",
                  "data-ocid": "contact.name.input"
                }
              ),
              errors.name && touched.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: "c-name-error",
                  className: "text-xs text-destructive",
                  "data-ocid": "contact.name.field_error",
                  children: errors.name
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "c-email", children: [
                "Email Address ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "c-email",
                  type: "email",
                  value: form.email,
                  onChange: (e) => handleChange("email", e.target.value),
                  onBlur: () => handleBlur("email"),
                  placeholder: "ramesh@example.com",
                  "aria-describedby": errors.email ? "c-email-error" : void 0,
                  className: errors.email && touched.email ? "border-destructive focus-visible:ring-destructive" : "",
                  "data-ocid": "contact.email.input"
                }
              ),
              errors.email && touched.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  id: "c-email-error",
                  className: "text-xs text-destructive",
                  "data-ocid": "contact.email.field_error",
                  children: errors.email
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "c-phone", children: [
              "Phone Number ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "c-phone",
                type: "tel",
                value: form.phone,
                onChange: (e) => handleChange("phone", e.target.value),
                onBlur: () => handleBlur("phone"),
                placeholder: "98765 43210",
                "aria-describedby": "c-phone-hint c-phone-error",
                className: errors.phone && touched.phone ? "border-destructive focus-visible:ring-destructive" : "",
                "data-ocid": "contact.phone.input"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                id: "c-phone-hint",
                className: "text-xs text-muted-foreground",
                children: "Indian mobile number (10 digits, e.g. 98765 43210)"
              }
            ),
            errors.phone && touched.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                id: "c-phone-error",
                className: "text-xs text-destructive",
                "data-ocid": "contact.phone.field_error",
                children: errors.phone
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: "Project Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Project Type ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.projectType,
                onValueChange: (v) => handleChange("projectType", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: errors.projectType && touched.projectType ? "border-destructive" : "",
                      "data-ocid": "contact.project_type.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select project type" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PROJECT_TYPES.map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: pt.value, children: pt.label }, pt.value)) })
                ]
              }
            ),
            errors.projectType && touched.projectType && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "contact.project_type.field_error",
                children: errors.projectType
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "c-desc", children: [
                "Project Description",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `text-xs ${form.description.trim().length >= 50 ? "text-green-600" : "text-muted-foreground"}`,
                  children: [
                    form.description.trim().length,
                    "/50 min chars"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "c-desc",
                rows: 5,
                value: form.description,
                onChange: (e) => handleChange("description", e.target.value),
                onBlur: () => handleBlur("description"),
                placeholder: "Describe your dream project — plot size, number of floors, special requirements, preferred style, timeline, etc.",
                "aria-describedby": errors.description ? "c-desc-error" : void 0,
                className: errors.description && touched.description ? "border-destructive focus-visible:ring-destructive" : "",
                "data-ocid": "contact.description.textarea"
              }
            ),
            errors.description && touched.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                id: "c-desc-error",
                className: "text-xs text-destructive",
                "data-ocid": "contact.description.field_error",
                children: errors.description
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Estimated Budget (in Lakhs ₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: "1",
                    value: form.budgetMin,
                    onChange: (e) => handleChange("budgetMin", e.target.value),
                    onBlur: () => handleBlur("budgetMin"),
                    placeholder: "Min (e.g. 30)",
                    "data-ocid": "contact.budget_min.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Minimum budget" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "number",
                    min: "1",
                    value: form.budgetMax,
                    onChange: (e) => handleChange("budgetMax", e.target.value),
                    onBlur: () => handleBlur("budgetMax"),
                    placeholder: "Max (e.g. 60)",
                    className: errors.budgetMax && touched.budgetMax ? "border-destructive focus-visible:ring-destructive" : "",
                    "data-ocid": "contact.budget_max.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Maximum budget" })
              ] })
            ] }),
            errors.budgetMax && touched.budgetMax && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "contact.budget.field_error",
                children: errors.budgetMax
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            size: "lg",
            className: "w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth font-semibold text-base h-12",
            disabled: submitMutation.isPending,
            "data-ocid": "contact.submit.submit_button",
            children: [
              submitMutation.isPending ? "Submitting…" : isAuthenticated ? "Submit Project Inquiry" : "Sign In & Submit Inquiry",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            ]
          }
        ),
        submitMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-sm text-destructive bg-destructive/10 rounded-lg p-3 border border-destructive/20",
            "data-ocid": "contact.error_state",
            children: "Failed to submit. Please check your connection and try again."
          }
        ),
        !isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "You'll be asked to sign in with Internet Identity before submitting." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex flex-col gap-5 lg:sticky lg:top-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Contact Us Directly" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "mailto:contact@nirman360.com",
              className: "flex items-center gap-3 group transition-smooth",
              "data-ocid": "contact.email.link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground group-hover:text-primary transition-smooth", children: "contact@nirman360.com" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "tel:+919876543210",
              className: "flex items-center gap-3 group transition-smooth",
              "data-ocid": "contact.phone.link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground group-hover:text-primary transition-smooth", children: "+91 98765 43210" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Office Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Mon–Sat, 9:00 AM – 7:00 PM IST" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Our Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2", children: SERVICES.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-4 w-4 text-accent mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: service })
          ] }, service)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/40 p-5 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Why Trust Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: TRUST_INDICATORS.map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col gap-1 rounded-lg bg-card border border-border p-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-accent mb-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm leading-tight", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
              ]
            },
            label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-accent/20 bg-accent/5 p-4 flex gap-3 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-accent mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "24-hour response guarantee." }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "We respond to all inquiries within one business day. Complex projects may require an initial call to understand your vision." })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ContactPage as default
};
