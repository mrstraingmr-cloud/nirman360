import { j as jsxRuntimeExports } from "./index-V48KFtBG.js";
function formatIndianPrice(n) {
  const num = Number(n);
  if (num >= 1e7) {
    return `₹${(num / 1e7).toFixed(1)}Cr`;
  }
  if (num >= 1e5) {
    return `₹${(num / 1e5).toFixed(1)}L`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}
function PriceDisplay({ min, max, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className, children: [
    formatIndianPrice(min),
    " – ",
    formatIndianPrice(max)
  ] });
}
export {
  PriceDisplay as P,
  formatIndianPrice as f
};
