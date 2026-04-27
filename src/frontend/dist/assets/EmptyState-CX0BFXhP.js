import { j as jsxRuntimeExports, B as Button, a as cn } from "./index-V48KFtBG.js";
function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "empty_state",
      className: cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-8 text-center",
        className
      ),
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: description })
        ] }),
        actionLabel && onAction && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onAction, className: "mt-2", children: actionLabel })
      ]
    }
  );
}
export {
  EmptyState as E
};
