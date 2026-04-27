import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, k as useAuth, l as useProfile, g as useSavedDesigns, U as useMyInquiries, d as useRemoveSavedDesign, V as useUpdateProfile, J as useNavigate, f as LoadingSpinner, W as User, B as Button, T as TierBadge, L as Link, C as Crown, Y as Mail, Z as Phone, _ as InquiryStatus } from "./index-V48KFtBG.js";
import { L as Label, I as Input } from "./label-DNIdGCOI.js";
import { P as Primitive } from "./index-CF2_vi6k.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-DploLmsm.js";
import { u as ue } from "./index-CMimAW43.js";
import { u as useUIStore, D as DesignCard } from "./uiStore-DkGVN4Cg.js";
import { E as EmptyState } from "./EmptyState-CX0BFXhP.js";
import { m as motion } from "./proxy-orZgcBWg.js";
import { C as Calendar } from "./calendar-Cr3UPfCr.js";
import { M as MessageSquare } from "./message-square-C_KYXpPD.js";
import { S as Settings } from "./settings-CwPhK111.js";
import { S as Sparkles } from "./sparkles-jjQpwM-T.js";
import { C as CircleCheck } from "./circle-check-Bevt8mPp.js";
import { Z as Zap } from "./zap-DIJUy3b1.js";
import "./badge-5Q9nPy-w.js";
import "./PriceDisplay-CLS_qx8W.js";
import "./lock-0Drxw9ty.js";
import "./map-pin-DUowKGy8.js";
import "./vanilla-wjP-HMWV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m14.5 7.5-5 5", key: "3lb6iw" }],
  ["path", { d: "m9.5 7.5 5 5", key: "ko136h" }]
];
const BookmarkX = createLucideIcon("bookmark-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
const FREE_SAVE_LIMIT = 5;
const STATUS_META = {
  [InquiryStatus.pending]: {
    label: "Pending",
    color: "bg-accent/10 text-accent border-accent/20",
    dot: "bg-accent"
  },
  [InquiryStatus.reviewed]: {
    label: "Reviewed",
    color: "bg-primary/10 text-primary border-primary/20",
    dot: "bg-primary"
  },
  [InquiryStatus.responded]: {
    label: "Responded",
    color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    dot: "bg-emerald-500"
  }
};
const TIER_NEXT_BENEFITS = {
  free: {
    next: "Premium",
    benefits: [
      "Full CAD floor plans & PDF downloads",
      "Advanced cost calculator",
      "Unlimited design saves",
      "Ad-free experience"
    ],
    cta: "Upgrade to Premium",
    ctaHref: "/pricing"
  },
  premium: {
    next: "Ultra Premium",
    benefits: [
      "Custom 3D design requests",
      "1-on-1 architect consultation",
      "High-quality renders",
      "Dedicated project manager"
    ],
    cta: "Contact for Ultra Premium",
    ctaHref: "/contact",
    isContact: true
  },
  ultraPremium: {
    next: "",
    benefits: [
      "Custom 3D designs",
      "Architect consultations",
      "Premium renders",
      "Dedicated manager"
    ],
    cta: "Manage Subscription",
    ctaHref: "/contact"
  }
};
function DashboardPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: savedDesigns, isLoading: savesLoading } = useSavedDesigns();
  const { data: inquiries, isLoading: inqLoading } = useMyInquiries();
  const { optimisticRemove } = useUIStore();
  const removeMutation = useRemoveSavedDesign();
  const updateProfile = useUpdateProfile();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = reactExports.useState((profile == null ? void 0 : profile.displayName) ?? "");
  const [email, setEmail] = reactExports.useState((profile == null ? void 0 : profile.email) ?? "");
  const [nameInit, setNameInit] = reactExports.useState(false);
  if (profile && !nameInit) {
    setDisplayName(profile.displayName || "");
    setEmail(profile.email || "");
    setNameInit(true);
  }
  if (isInitializing || profileLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { className: "py-24" });
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          className: "flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-10 w-10 text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Login to access your dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Your saved designs, custom build inquiries, and account settings are all here." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: login,
              "data-ocid": "dashboard.login.primary_button",
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
                " Sign In with Internet Identity"
              ]
            }
          )
        }
      )
    ] });
  }
  const tier = (profile == null ? void 0 : profile.tier) ?? "free";
  const savesCount = (savedDesigns == null ? void 0 : savedDesigns.length) ?? 0;
  const nextTierInfo = TIER_NEXT_BENEFITS[tier] ?? TIER_NEXT_BENEFITS.free;
  const memberYear = profile ? new Date(Number(profile.createdAt / 1000000n)).getFullYear() : (/* @__PURE__ */ new Date()).getFullYear();
  const handleSaveProfile = () => {
    updateProfile.mutate(
      { displayName, email },
      {
        onSuccess: () => ue.success("Profile updated successfully"),
        onError: () => ue.error("Failed to update profile")
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "My Dashboard" }),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
          "Welcome back,",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: profile.displayName || "User" })
        ] }),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
          "Member since ",
          memberYear
        ] })
      ] }),
      profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TierBadge, { tier: profile.tier, size: "md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            size: "sm",
            "data-ocid": "dashboard.upgrade.button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pricing", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 mr-1.5 text-accent" }),
              " Upgrade"
            ] })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-8 space-y-8", children: [
      profile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
        { label: "Saved Designs", value: savesCount, icon: BookmarkX },
        {
          label: "Inquiries Sent",
          value: (inquiries == null ? void 0 : inquiries.length) ?? 0,
          icon: MessageSquare
        },
        {
          label: "Current Tier",
          value: tier === "ultraPremium" ? "Ultra" : tier === "premium" ? "Premium" : "Free",
          icon: Crown
        },
        { label: "Member Since", value: memberYear, icon: Calendar }
      ].map(({ label, value, icon: Icon }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.07 },
          className: "p-4 rounded-xl border border-border bg-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-foreground font-display", children: value })
          ]
        },
        label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "saved", "data-ocid": "dashboard.tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full sm:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "saved",
              "data-ocid": "dashboard.saved.tab",
              className: "gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkX, { className: "h-4 w-4" }),
                "Saved ",
                savedDesigns && `(${savedDesigns.length})`
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "inquiries",
              "data-ocid": "dashboard.inquiries.tab",
              className: "gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
                "Inquiries ",
                inquiries && `(${inquiries.length})`
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: "settings",
              "data-ocid": "dashboard.settings.tab",
              className: "gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
                "Settings"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "saved", className: "mt-6 space-y-5", children: [
          tier === "free" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Design saves used" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-sm font-semibold text-foreground",
                  "data-ocid": "dashboard.saves.progress",
                  children: [
                    savesCount,
                    "/",
                    FREE_SAVE_LIMIT
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Progress,
              {
                value: savesCount / FREE_SAVE_LIMIT * 100,
                className: "h-2"
              }
            ),
            savesCount >= FREE_SAVE_LIMIT && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent mt-2 font-medium", children: [
              "Save limit reached.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/pricing",
                  className: "underline hover:no-underline",
                  children: "Upgrade to Premium"
                }
              ),
              " ",
              "for unlimited saves."
            ] })
          ] }),
          savesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : !savedDesigns || savedDesigns.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkX, { className: "h-8 w-8" }),
              title: "No saved designs yet",
              description: "Browse our catalog and save designs you love",
              actionLabel: "Browse Designs",
              onAction: () => {
                navigate({ to: "/browse" });
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: savedDesigns.map((design, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            DesignCard,
            {
              design,
              isSaved: true,
              onRemove: (id) => {
                optimisticRemove(id);
                removeMutation.mutate(id);
              },
              index: i
            },
            design.id.toString()
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "inquiries", className: "mt-6", children: inqLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, {}) : !inquiries || inquiries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-8 w-8" }),
            title: "No inquiries submitted yet",
            description: "Submit a custom build inquiry and track its status here",
            actionLabel: "Start a Custom Project",
            onAction: () => {
              navigate({ to: "/contact" });
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: inquiries.map((inq, i) => {
          const statusConf = STATUS_META[inq.status] ?? {
            label: inq.status,
            color: "bg-secondary text-secondary-foreground border-border",
            dot: "bg-muted-foreground"
          };
          const submittedDate = new Date(
            Number(inq.createdAt / 1000000n)
          ).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          });
          const budgetLabel = inq.budgetMin > 0n ? `₹${(Number(inq.budgetMin) / 1e5).toFixed(0)}L – ₹${(Number(inq.budgetMax) / 1e5).toFixed(0)}L` : "Budget TBD";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.06 },
              "data-ocid": `dashboard.inquiry.item.${i + 1}`,
              className: "p-5 rounded-xl border border-border bg-card transition-smooth hover:border-primary/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: inq.projectType }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: submittedDate })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConf.color}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: `h-1.5 w-1.5 rounded-full ${statusConf.dot}`
                          }
                        ),
                        statusConf.label
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-4", children: inq.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border pt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
                    inq.email
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
                    inq.phone
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5 ml-auto font-medium text-foreground", children: budgetLabel })
                ] })
              ]
            },
            inq.id.toString()
          );
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "settings", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Profile Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "displayName", children: "Display Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "displayName",
                    value: displayName,
                    onChange: (e) => setDisplayName(e.target.value),
                    placeholder: "Your name",
                    "data-ocid": "dashboard.settings.name.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "email",
                    type: "email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    placeholder: "you@example.com",
                    "data-ocid": "dashboard.settings.email.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: handleSaveProfile,
                  disabled: updateProfile.isPending,
                  className: "w-full sm:w-auto",
                  "data-ocid": "dashboard.settings.save.submit_button",
                  children: updateProfile.isPending ? "Saving…" : "Save Changes"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TierUpgradeCard, { tier, nextTierInfo })
        ] }) })
      ] })
    ] })
  ] });
}
function TierUpgradeCard({ tier, nextTierInfo }) {
  const isUltra = tier === "ultraPremium";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl border p-6 space-y-4 ${isUltra ? "border-accent/30 bg-accent/5" : "border-primary/30 bg-primary/5"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Your Plan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TierBadge, { tier, size: "md" })
        ] }),
        isUltra ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-accent shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "You're on our highest tier — full access to every feature." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
              "Unlock with",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: nextTierInfo.next }),
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: nextTierInfo.benefits.map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: benefit })
            ] }, benefit)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 pt-2", children: [
            nextTierInfo.isContact ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                className: "w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground gap-2",
                "data-ocid": "dashboard.tier.upgrade.primary_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: nextTierInfo.ctaHref, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                  " ",
                  nextTierInfo.cta
                ] })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "w-full gap-2",
                "data-ocid": "dashboard.tier.upgrade.primary_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: nextTierInfo.ctaHref, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4" }),
                  " ",
                  nextTierInfo.cta
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "ghost",
                size: "sm",
                className: "text-muted-foreground gap-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pricing", children: [
                  "Compare all plans ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
                ] })
              }
            )
          ] })
        ] }),
        isUltra && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            variant: "outline",
            className: "w-full",
            "data-ocid": "dashboard.tier.manage.button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: nextTierInfo.ctaHref, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 mr-2" }),
              " ",
              nextTierInfo.cta
            ] })
          }
        )
      ]
    }
  );
}
export {
  DashboardPage as default
};
