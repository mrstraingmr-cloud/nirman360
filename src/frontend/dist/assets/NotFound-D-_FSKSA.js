import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, L as Link } from "./index-V48KFtBG.js";
import { H as House } from "./house-DWcUGNp_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m13.5 8.5-5 5", key: "1cs55j" }],
  ["path", { d: "m8.5 8.5 5 5", key: "a8mexj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
];
const SearchX = createLucideIcon("search-x", __iconNode);
function NotFoundPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "container py-24 flex flex-col items-center gap-6 text-center",
      "data-ocid": "notfound.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchX, { className: "h-10 w-10 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground mb-2", children: "Page Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "The page you're looking for doesn't exist. It may have been moved or removed." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", "data-ocid": "notfound.home.link", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4 mr-2" }),
            " Go Home"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", "data-ocid": "notfound.browse.link", children: "Browse Designs" }) })
        ] })
      ]
    }
  );
}
export {
  NotFoundPage as default
};
