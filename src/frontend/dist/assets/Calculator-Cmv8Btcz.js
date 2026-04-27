import { c as createLucideIcon, o as React, r as reactExports, j as jsxRuntimeExports, p as useId, q as useControllableState, s as Root2, t as useComposedRefs, A as Anchor, P as Primitive, v as composeEventHandlers, w as Presence, x as Portal$1, y as Arrow, z as createPopperScope, E as DismissableLayer, F as Content, H as createContextScope, I as createSlottable, a as cn, R as Region, M as MaterialGrade, n as useCalculateCost, J as useNavigate, K as Calculator, B as Button, e as Building2, N as TrendingUp } from "./index-V48KFtBG.js";
import { B as Badge } from "./badge-5Q9nPy-w.js";
import { L as Label, I as Input } from "./label-DNIdGCOI.js";
import { R as Root, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DuT0em1b.js";
import { u as ue } from "./index-CMimAW43.js";
import { f as formatIndianPrice } from "./PriceDisplay-CLS_qx8W.js";
import { M as MapPin } from "./map-pin-DUowKGy8.js";
import { C as ChevronRight } from "./chevron-right-CCbKXjRX.js";
import { S as Sparkles } from "./sparkles-jjQpwM-T.js";
import { C as Copy, P as PieChart, a as Pie, S as Share2 } from "./PieChart-3CFV4Fue.js";
import { S as Search } from "./search-DQYJQhhL.js";
import { u as useChartWidth, a as useChartHeight, b as useOffset, i as isNumber, c as useArbitraryXAxis, d as useYAxisWithFiniteDomainOrRandom, e as isFunction, w as warn, g as getCoordinatesOfGrid, f as getTicksOfAxis, h as filterProps, R as ResponsiveContainer, T as Tooltip$2, B as Bar, C as Cell, L as Legend } from "./generateCategoricalChart-BjwTRGzh.js";
import { g as getTicks, C as CartesianAxis, B as BarChart, X as XAxis, Y as YAxis } from "./BarChart-DFr7bJxD.js";
import { H as House } from "./house-DWcUGNp_.js";
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
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode);
var _excluded = ["x1", "y1", "x2", "y2", "key"], _excluded2 = ["offset"];
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
var Background = function Background2(props) {
  var fill = props.fill;
  if (!fill || fill === "none") {
    return null;
  }
  var fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, ry = props.ry;
  return /* @__PURE__ */ React.createElement("rect", {
    x,
    y,
    ry,
    width,
    height,
    stroke: "none",
    fill,
    fillOpacity,
    className: "recharts-cartesian-grid-bg"
  });
};
function renderLineItem(option, props) {
  var lineItem;
  if (/* @__PURE__ */ React.isValidElement(option)) {
    lineItem = /* @__PURE__ */ React.cloneElement(option, props);
  } else if (isFunction(option)) {
    lineItem = option(props);
  } else {
    var x1 = props.x1, y1 = props.y1, x2 = props.x2, y2 = props.y2, key = props.key, others = _objectWithoutProperties(props, _excluded);
    var _filterProps = filterProps(others, false);
    _filterProps.offset;
    var restOfFilteredProps = _objectWithoutProperties(_filterProps, _excluded2);
    lineItem = /* @__PURE__ */ React.createElement("line", _extends({}, restOfFilteredProps, {
      x1,
      y1,
      x2,
      y2,
      fill: "none",
      key
    }));
  }
  return lineItem;
}
function HorizontalGridLines(props) {
  var x = props.x, width = props.width, _props$horizontal = props.horizontal, horizontal = _props$horizontal === void 0 ? true : _props$horizontal, horizontalPoints = props.horizontalPoints;
  if (!horizontal || !horizontalPoints || !horizontalPoints.length) {
    return null;
  }
  var items = horizontalPoints.map(function(entry, i) {
    var lineItemProps = _objectSpread(_objectSpread({}, props), {}, {
      x1: x,
      y1: entry,
      x2: x + width,
      y2: entry,
      key: "line-".concat(i),
      index: i
    });
    return renderLineItem(horizontal, lineItemProps);
  });
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, items);
}
function VerticalGridLines(props) {
  var y = props.y, height = props.height, _props$vertical = props.vertical, vertical = _props$vertical === void 0 ? true : _props$vertical, verticalPoints = props.verticalPoints;
  if (!vertical || !verticalPoints || !verticalPoints.length) {
    return null;
  }
  var items = verticalPoints.map(function(entry, i) {
    var lineItemProps = _objectSpread(_objectSpread({}, props), {}, {
      x1: entry,
      y1: y,
      x2: entry,
      y2: y + height,
      key: "line-".concat(i),
      index: i
    });
    return renderLineItem(vertical, lineItemProps);
  });
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, items);
}
function HorizontalStripes(props) {
  var horizontalFill = props.horizontalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, horizontalPoints = props.horizontalPoints, _props$horizontal2 = props.horizontal, horizontal = _props$horizontal2 === void 0 ? true : _props$horizontal2;
  if (!horizontal || !horizontalFill || !horizontalFill.length) {
    return null;
  }
  var roundedSortedHorizontalPoints = horizontalPoints.map(function(e) {
    return Math.round(e + y - y);
  }).sort(function(a, b) {
    return a - b;
  });
  if (y !== roundedSortedHorizontalPoints[0]) {
    roundedSortedHorizontalPoints.unshift(0);
  }
  var items = roundedSortedHorizontalPoints.map(function(entry, i) {
    var lastStripe = !roundedSortedHorizontalPoints[i + 1];
    var lineHeight = lastStripe ? y + height - entry : roundedSortedHorizontalPoints[i + 1] - entry;
    if (lineHeight <= 0) {
      return null;
    }
    var colorIndex = i % horizontalFill.length;
    return /* @__PURE__ */ React.createElement("rect", {
      key: "react-".concat(i),
      y: entry,
      x,
      height: lineHeight,
      width,
      stroke: "none",
      fill: horizontalFill[colorIndex],
      fillOpacity,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, items);
}
function VerticalStripes(props) {
  var _props$vertical2 = props.vertical, vertical = _props$vertical2 === void 0 ? true : _props$vertical2, verticalFill = props.verticalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, verticalPoints = props.verticalPoints;
  if (!vertical || !verticalFill || !verticalFill.length) {
    return null;
  }
  var roundedSortedVerticalPoints = verticalPoints.map(function(e) {
    return Math.round(e + x - x);
  }).sort(function(a, b) {
    return a - b;
  });
  if (x !== roundedSortedVerticalPoints[0]) {
    roundedSortedVerticalPoints.unshift(0);
  }
  var items = roundedSortedVerticalPoints.map(function(entry, i) {
    var lastStripe = !roundedSortedVerticalPoints[i + 1];
    var lineWidth = lastStripe ? x + width - entry : roundedSortedVerticalPoints[i + 1] - entry;
    if (lineWidth <= 0) {
      return null;
    }
    var colorIndex = i % verticalFill.length;
    return /* @__PURE__ */ React.createElement("rect", {
      key: "react-".concat(i),
      x: entry,
      y,
      width: lineWidth,
      height,
      stroke: "none",
      fill: verticalFill[colorIndex],
      fillOpacity,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, items);
}
var defaultVerticalCoordinatesGenerator = function defaultVerticalCoordinatesGenerator2(_ref, syncWithTicks) {
  var xAxis = _ref.xAxis, width = _ref.width, height = _ref.height, offset = _ref.offset;
  return getCoordinatesOfGrid(getTicks(_objectSpread(_objectSpread(_objectSpread({}, CartesianAxis.defaultProps), xAxis), {}, {
    ticks: getTicksOfAxis(xAxis, true),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = function defaultHorizontalCoordinatesGenerator2(_ref2, syncWithTicks) {
  var yAxis = _ref2.yAxis, width = _ref2.width, height = _ref2.height, offset = _ref2.offset;
  return getCoordinatesOfGrid(getTicks(_objectSpread(_objectSpread(_objectSpread({}, CartesianAxis.defaultProps), yAxis), {}, {
    ticks: getTicksOfAxis(yAxis, true),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultProps = {
  horizontal: true,
  vertical: true,
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: []
};
function CartesianGrid(props) {
  var _props$stroke, _props$fill, _props$horizontal3, _props$horizontalFill, _props$vertical3, _props$verticalFill;
  var chartWidth = useChartWidth();
  var chartHeight = useChartHeight();
  var offset = useOffset();
  var propsIncludingDefaults = _objectSpread(_objectSpread({}, props), {}, {
    stroke: (_props$stroke = props.stroke) !== null && _props$stroke !== void 0 ? _props$stroke : defaultProps.stroke,
    fill: (_props$fill = props.fill) !== null && _props$fill !== void 0 ? _props$fill : defaultProps.fill,
    horizontal: (_props$horizontal3 = props.horizontal) !== null && _props$horizontal3 !== void 0 ? _props$horizontal3 : defaultProps.horizontal,
    horizontalFill: (_props$horizontalFill = props.horizontalFill) !== null && _props$horizontalFill !== void 0 ? _props$horizontalFill : defaultProps.horizontalFill,
    vertical: (_props$vertical3 = props.vertical) !== null && _props$vertical3 !== void 0 ? _props$vertical3 : defaultProps.vertical,
    verticalFill: (_props$verticalFill = props.verticalFill) !== null && _props$verticalFill !== void 0 ? _props$verticalFill : defaultProps.verticalFill,
    x: isNumber(props.x) ? props.x : offset.left,
    y: isNumber(props.y) ? props.y : offset.top,
    width: isNumber(props.width) ? props.width : offset.width,
    height: isNumber(props.height) ? props.height : offset.height
  });
  var x = propsIncludingDefaults.x, y = propsIncludingDefaults.y, width = propsIncludingDefaults.width, height = propsIncludingDefaults.height, syncWithTicks = propsIncludingDefaults.syncWithTicks, horizontalValues = propsIncludingDefaults.horizontalValues, verticalValues = propsIncludingDefaults.verticalValues;
  var xAxis = useArbitraryXAxis();
  var yAxis = useYAxisWithFiniteDomainOrRandom();
  if (!isNumber(width) || width <= 0 || !isNumber(height) || height <= 0 || !isNumber(x) || x !== +x || !isNumber(y) || y !== +y) {
    return null;
  }
  var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
  var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
  var horizontalPoints = propsIncludingDefaults.horizontalPoints, verticalPoints = propsIncludingDefaults.verticalPoints;
  if ((!horizontalPoints || !horizontalPoints.length) && isFunction(horizontalCoordinatesGenerator)) {
    var isHorizontalValues = horizontalValues && horizontalValues.length;
    var generatorResult = horizontalCoordinatesGenerator({
      yAxis: yAxis ? _objectSpread(_objectSpread({}, yAxis), {}, {
        ticks: isHorizontalValues ? horizontalValues : yAxis.ticks
      }) : void 0,
      width: chartWidth,
      height: chartHeight,
      offset
    }, isHorizontalValues ? true : syncWithTicks);
    warn(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(_typeof(generatorResult), "]"));
    if (Array.isArray(generatorResult)) {
      horizontalPoints = generatorResult;
    }
  }
  if ((!verticalPoints || !verticalPoints.length) && isFunction(verticalCoordinatesGenerator)) {
    var isVerticalValues = verticalValues && verticalValues.length;
    var _generatorResult = verticalCoordinatesGenerator({
      xAxis: xAxis ? _objectSpread(_objectSpread({}, xAxis), {}, {
        ticks: isVerticalValues ? verticalValues : xAxis.ticks
      }) : void 0,
      width: chartWidth,
      height: chartHeight,
      offset
    }, isVerticalValues ? true : syncWithTicks);
    warn(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(_typeof(_generatorResult), "]"));
    if (Array.isArray(_generatorResult)) {
      verticalPoints = _generatorResult;
    }
  }
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ React.createElement(Background, {
    fill: propsIncludingDefaults.fill,
    fillOpacity: propsIncludingDefaults.fillOpacity,
    x: propsIncludingDefaults.x,
    y: propsIncludingDefaults.y,
    width: propsIncludingDefaults.width,
    height: propsIncludingDefaults.height,
    ry: propsIncludingDefaults.ry
  }), /* @__PURE__ */ React.createElement(HorizontalGridLines, _extends({}, propsIncludingDefaults, {
    offset,
    horizontalPoints,
    xAxis,
    yAxis
  })), /* @__PURE__ */ React.createElement(VerticalGridLines, _extends({}, propsIncludingDefaults, {
    offset,
    verticalPoints,
    xAxis,
    yAxis
  })), /* @__PURE__ */ React.createElement(HorizontalStripes, _extends({}, propsIncludingDefaults, {
    horizontalPoints
  })), /* @__PURE__ */ React.createElement(VerticalStripes, _extends({}, propsIncludingDefaults, {
    verticalPoints
  })));
}
CartesianGrid.displayName = "CartesianGrid";
var [createTooltipContext] = createContextScope("Tooltip", [
  createPopperScope
]);
var usePopperScope = createPopperScope();
var PROVIDER_NAME = "TooltipProvider";
var DEFAULT_DELAY_DURATION = 700;
var TOOLTIP_OPEN = "tooltip.open";
var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
var TooltipProvider$1 = (props) => {
  const {
    __scopeTooltip,
    delayDuration = DEFAULT_DELAY_DURATION,
    skipDelayDuration = 300,
    disableHoverableContent = false,
    children
  } = props;
  const isOpenDelayedRef = reactExports.useRef(true);
  const isPointerInTransitRef = reactExports.useRef(false);
  const skipDelayTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const skipDelayTimer = skipDelayTimerRef.current;
    return () => window.clearTimeout(skipDelayTimer);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TooltipProviderContextProvider,
    {
      scope: __scopeTooltip,
      isOpenDelayedRef,
      delayDuration,
      onOpen: reactExports.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        isOpenDelayedRef.current = false;
      }, []),
      onClose: reactExports.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = window.setTimeout(
          () => isOpenDelayedRef.current = true,
          skipDelayDuration
        );
      }, [skipDelayDuration]),
      isPointerInTransitRef,
      onPointerInTransitChange: reactExports.useCallback((inTransit) => {
        isPointerInTransitRef.current = inTransit;
      }, []),
      disableHoverableContent,
      children
    }
  );
};
TooltipProvider$1.displayName = PROVIDER_NAME;
var TOOLTIP_NAME = "Tooltip";
var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
var Tooltip$1 = (props) => {
  const {
    __scopeTooltip,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    disableHoverableContent: disableHoverableContentProp,
    delayDuration: delayDurationProp
  } = props;
  const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
  const popperScope = usePopperScope(__scopeTooltip);
  const [trigger, setTrigger] = reactExports.useState(null);
  const contentId = useId();
  const openTimerRef = reactExports.useRef(0);
  const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
  const delayDuration = delayDurationProp ?? providerContext.delayDuration;
  const wasOpenDelayedRef = reactExports.useRef(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: (open2) => {
      if (open2) {
        providerContext.onOpen();
        document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
      } else {
        providerContext.onClose();
      }
      onOpenChange == null ? void 0 : onOpenChange(open2);
    },
    caller: TOOLTIP_NAME
  });
  const stateAttribute = reactExports.useMemo(() => {
    return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
  }, [open]);
  const handleOpen = reactExports.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    wasOpenDelayedRef.current = false;
    setOpen(true);
  }, [setOpen]);
  const handleClose = reactExports.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    setOpen(false);
  }, [setOpen]);
  const handleDelayedOpen = reactExports.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      wasOpenDelayedRef.current = true;
      setOpen(true);
      openTimerRef.current = 0;
    }, delayDuration);
  }, [delayDuration, setOpen]);
  reactExports.useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = 0;
      }
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    TooltipContextProvider,
    {
      scope: __scopeTooltip,
      contentId,
      open,
      stateAttribute,
      trigger,
      onTriggerChange: setTrigger,
      onTriggerEnter: reactExports.useCallback(() => {
        if (providerContext.isOpenDelayedRef.current) handleDelayedOpen();
        else handleOpen();
      }, [providerContext.isOpenDelayedRef, handleDelayedOpen, handleOpen]),
      onTriggerLeave: reactExports.useCallback(() => {
        if (disableHoverableContent) {
          handleClose();
        } else {
          window.clearTimeout(openTimerRef.current);
          openTimerRef.current = 0;
        }
      }, [handleClose, disableHoverableContent]),
      onOpen: handleOpen,
      onClose: handleClose,
      disableHoverableContent,
      children
    }
  ) });
};
Tooltip$1.displayName = TOOLTIP_NAME;
var TRIGGER_NAME = "TooltipTrigger";
var TooltipTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTooltip, ...triggerProps } = props;
    const context = useTooltipContext(TRIGGER_NAME, __scopeTooltip);
    const providerContext = useTooltipProviderContext(TRIGGER_NAME, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onTriggerChange);
    const isPointerDownRef = reactExports.useRef(false);
    const hasPointerMoveOpenedRef = reactExports.useRef(false);
    const handlePointerUp = reactExports.useCallback(() => isPointerDownRef.current = false, []);
    reactExports.useEffect(() => {
      return () => document.removeEventListener("pointerup", handlePointerUp);
    }, [handlePointerUp]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        "aria-describedby": context.open ? context.contentId : void 0,
        "data-state": context.stateAttribute,
        ...triggerProps,
        ref: composedRefs,
        onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
          if (event.pointerType === "touch") return;
          if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
            context.onTriggerEnter();
            hasPointerMoveOpenedRef.current = true;
          }
        }),
        onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
          context.onTriggerLeave();
          hasPointerMoveOpenedRef.current = false;
        }),
        onPointerDown: composeEventHandlers(props.onPointerDown, () => {
          if (context.open) {
            context.onClose();
          }
          isPointerDownRef.current = true;
          document.addEventListener("pointerup", handlePointerUp, { once: true });
        }),
        onFocus: composeEventHandlers(props.onFocus, () => {
          if (!isPointerDownRef.current) context.onOpen();
        }),
        onBlur: composeEventHandlers(props.onBlur, context.onClose),
        onClick: composeEventHandlers(props.onClick, context.onClose)
      }
    ) });
  }
);
TooltipTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "TooltipPortal";
var [PortalProvider, usePortalContext] = createTooltipContext(PORTAL_NAME, {
  forceMount: void 0
});
var TooltipPortal = (props) => {
  const { __scopeTooltip, forceMount, children, container } = props;
  const context = useTooltipContext(PORTAL_NAME, __scopeTooltip);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeTooltip, forceMount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children }) }) });
};
TooltipPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "TooltipContent";
var TooltipContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeTooltip);
    const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
    const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.disableHoverableContent ? /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContentImpl, { side, ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContentHoverable, { side, ...contentProps, ref: forwardedRef }) });
  }
);
var TooltipContentHoverable = reactExports.forwardRef((props, forwardedRef) => {
  const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip);
  const providerContext = useTooltipProviderContext(CONTENT_NAME, props.__scopeTooltip);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const [pointerGraceArea, setPointerGraceArea] = reactExports.useState(null);
  const { trigger, onClose } = context;
  const content = ref.current;
  const { onPointerInTransitChange } = providerContext;
  const handleRemoveGraceArea = reactExports.useCallback(() => {
    setPointerGraceArea(null);
    onPointerInTransitChange(false);
  }, [onPointerInTransitChange]);
  const handleCreateGraceArea = reactExports.useCallback(
    (event, hoverTarget) => {
      const currentTarget = event.currentTarget;
      const exitPoint = { x: event.clientX, y: event.clientY };
      const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
      const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
      const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
      const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
      setPointerGraceArea(graceArea);
      onPointerInTransitChange(true);
    },
    [onPointerInTransitChange]
  );
  reactExports.useEffect(() => {
    return () => handleRemoveGraceArea();
  }, [handleRemoveGraceArea]);
  reactExports.useEffect(() => {
    if (trigger && content) {
      const handleTriggerLeave = (event) => handleCreateGraceArea(event, content);
      const handleContentLeave = (event) => handleCreateGraceArea(event, trigger);
      trigger.addEventListener("pointerleave", handleTriggerLeave);
      content.addEventListener("pointerleave", handleContentLeave);
      return () => {
        trigger.removeEventListener("pointerleave", handleTriggerLeave);
        content.removeEventListener("pointerleave", handleContentLeave);
      };
    }
  }, [trigger, content, handleCreateGraceArea, handleRemoveGraceArea]);
  reactExports.useEffect(() => {
    if (pointerGraceArea) {
      const handleTrackPointerGrace = (event) => {
        const target = event.target;
        const pointerPosition = { x: event.clientX, y: event.clientY };
        const hasEnteredTarget = (trigger == null ? void 0 : trigger.contains(target)) || (content == null ? void 0 : content.contains(target));
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea);
        if (hasEnteredTarget) {
          handleRemoveGraceArea();
        } else if (isPointerOutsideGraceArea) {
          handleRemoveGraceArea();
          onClose();
        }
      };
      document.addEventListener("pointermove", handleTrackPointerGrace);
      return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
    }
  }, [trigger, content, pointerGraceArea, onClose, handleRemoveGraceArea]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContentImpl, { ...props, ref: composedRefs });
});
var [VisuallyHiddenContentContextProvider, useVisuallyHiddenContentContext] = createTooltipContext(TOOLTIP_NAME, { isInside: false });
var Slottable = createSlottable("TooltipContent");
var TooltipContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTooltip,
      children,
      "aria-label": ariaLabel,
      onEscapeKeyDown,
      onPointerDownOutside,
      ...contentProps
    } = props;
    const context = useTooltipContext(CONTENT_NAME, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const { onClose } = context;
    reactExports.useEffect(() => {
      document.addEventListener(TOOLTIP_OPEN, onClose);
      return () => document.removeEventListener(TOOLTIP_OPEN, onClose);
    }, [onClose]);
    reactExports.useEffect(() => {
      if (context.trigger) {
        const handleScroll = (event) => {
          const target = event.target;
          if (target == null ? void 0 : target.contains(context.trigger)) onClose();
        };
        window.addEventListener("scroll", handleScroll, { capture: true });
        return () => window.removeEventListener("scroll", handleScroll, { capture: true });
      }
    }, [context.trigger, onClose]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DismissableLayer,
      {
        asChild: true,
        disableOutsidePointerEvents: false,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside: (event) => event.preventDefault(),
        onDismiss: onClose,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            "data-state": context.stateAttribute,
            ...popperScope,
            ...contentProps,
            ref: forwardedRef,
            style: {
              ...contentProps.style,
              // re-namespace exposed content custom properties
              ...{
                "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
              }
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(VisuallyHiddenContentContextProvider, { scope: __scopeTooltip, isInside: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { id: context.contentId, role: "tooltip", children: ariaLabel || children }) })
            ]
          }
        )
      }
    );
  }
);
TooltipContent$1.displayName = CONTENT_NAME;
var ARROW_NAME = "TooltipArrow";
var TooltipArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTooltip, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeTooltip);
    const visuallyHiddenContentContext = useVisuallyHiddenContentContext(
      ARROW_NAME,
      __scopeTooltip
    );
    return visuallyHiddenContentContext.isInside ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
TooltipArrow.displayName = ARROW_NAME;
function getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y);
  const bottom = Math.abs(rect.bottom - point.y);
  const right = Math.abs(rect.right - point.x);
  const left = Math.abs(rect.left - point.x);
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return "left";
    case right:
      return "right";
    case top:
      return "top";
    case bottom:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const paddedExitPoints = [];
  switch (exitSide) {
    case "top":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y + padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      );
      break;
    case "bottom":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y - padding }
      );
      break;
    case "left":
      paddedExitPoints.push(
        { x: exitPoint.x + padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      );
      break;
    case "right":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x - padding, y: exitPoint.y + padding }
      );
      break;
  }
  return paddedExitPoints;
}
function getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect;
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom }
  ];
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ii = polygon[i];
    const jj = polygon[j];
    const xi = ii.x;
    const yi = ii.y;
    const xj = jj.x;
    const yj = jj.y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function getHull(points) {
  const newPoints = points.slice();
  newPoints.sort((a, b) => {
    if (a.x < b.x) return -1;
    else if (a.x > b.x) return 1;
    else if (a.y < b.y) return -1;
    else if (a.y > b.y) return 1;
    else return 0;
  });
  return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
  if (points.length <= 1) return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
      else break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
      else break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) {
    return upperHull;
  } else {
    return upperHull.concat(lowerHull);
  }
}
var Provider = TooltipProvider$1;
var Root3 = Tooltip$1;
var Trigger = TooltipTrigger$1;
var Portal = TooltipPortal;
var Content2 = TooltipContent$1;
var Arrow2 = TooltipArrow;
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root3, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content2,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow2, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const CHART_COLORS = [
  "oklch(0.55 0.15 265)",
  "oklch(0.62 0.18 32)",
  "oklch(0.65 0.15 125)",
  "oklch(0.68 0.12 15)",
  "oklch(0.6 0.14 190)",
  "oklch(0.58 0.12 285)",
  "oklch(0.55 0.12 45)"
];
const BREAKDOWN_LABELS = {
  foundation: "Foundation",
  structure: "Structure",
  roofing: "Roofing",
  flooring: "Flooring",
  plumbing: "Plumbing",
  electrical: "Electrical",
  finishing: "Finishing"
};
const BREAKDOWN_ORDER = [
  "foundation",
  "structure",
  "roofing",
  "flooring",
  "electrical",
  "plumbing",
  "finishing"
];
const REGION_INFO = {
  [Region.urban]: {
    label: "Urban (Metro cities)",
    labor: "₹450–650/sqft",
    multiplier: "1.3×",
    icon: "🏙️"
  },
  [Region.semiUrban]: {
    label: "Semi-Urban (Tier 2 cities)",
    labor: "₹320–420/sqft",
    multiplier: "1.1×",
    icon: "🏘️"
  },
  [Region.rural]: {
    label: "Rural (Village / Town)",
    labor: "₹220–320/sqft",
    multiplier: "1.0×",
    icon: "🏡"
  }
};
const GRADE_INFO = {
  [MaterialGrade.basic]: {
    label: "Basic",
    badge: "Economy",
    desc: "Suitable for no-frills construction",
    features: [
      "AAC/solid clay bricks",
      "OPC 43 grade cement",
      "Standard sanitary ware",
      "Basic tiles (₹30–60/sqft)"
    ]
  },
  [MaterialGrade.standard]: {
    label: "Standard",
    badge: "Mid-Range",
    desc: "Best value for most home buyers",
    features: [
      "Premium AAC blocks",
      "OPC 53 grade cement",
      "Mid-range sanitary ware",
      "Vitrified tiles (₹60–120/sqft)"
    ]
  },
  [MaterialGrade.premium]: {
    label: "Premium",
    badge: "High-End",
    desc: "Luxury finishes & imported materials",
    features: [
      "Aerocon/Siporex blocks",
      "Ultra-tech PPC cement",
      "Designer sanitary ware",
      "Italian marble / hardwood flooring"
    ]
  }
};
const PRESETS = [
  {
    label: "1BHK Starter",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-4 w-4" }),
    area: "500",
    region: Region.rural,
    grade: MaterialGrade.basic,
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    label: "2BHK Standard",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
    area: "850",
    region: Region.semiUrban,
    grade: MaterialGrade.standard,
    color: "bg-accent/10 text-accent border-accent/20"
  },
  {
    label: "3BHK Premium",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
    area: "1200",
    region: Region.urban,
    grade: MaterialGrade.premium,
    color: "bg-primary/10 text-primary border-primary/20"
  },
  {
    label: "Villa",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
    area: "2500",
    region: Region.urban,
    grade: MaterialGrade.premium,
    color: "bg-accent/10 text-accent border-accent/20"
  }
];
function CalculatorPage() {
  var _a, _b, _c;
  const [areaSqft, setAreaSqft] = reactExports.useState("1000");
  const [region, setRegion] = reactExports.useState(Region.urban);
  const [grade, setGrade] = reactExports.useState(MaterialGrade.standard);
  const calculateMutation = useCalculateCost();
  const navigate = useNavigate();
  const handleCalculate = () => {
    const area = Number.parseInt(areaSqft, 10);
    if (!area || area < 100 || area > 5e4) return;
    calculateMutation.mutate({
      areaSqft: BigInt(area),
      region,
      materialGrade: grade
    });
  };
  const applyPreset = (preset) => {
    setAreaSqft(preset.area);
    setRegion(preset.region);
    setGrade(preset.grade);
  };
  const result = calculateMutation.data;
  const chartData = result ? BREAKDOWN_ORDER.filter((k) => k in result.breakdown).map((key, i) => ({
    name: BREAKDOWN_LABELS[key] ?? key,
    value: Number(
      result.breakdown[key] ?? 0
    ),
    color: CHART_COLORS[i % CHART_COLORS.length]
  })) : [];
  const handleShare = () => {
    var _a2, _b2;
    if (!result) return;
    const regionLabel = ((_a2 = REGION_INFO[region]) == null ? void 0 : _a2.label) ?? region;
    const gradeLabel = ((_b2 = GRADE_INFO[grade]) == null ? void 0 : _b2.label) ?? grade;
    const breakdownLines = BREAKDOWN_ORDER.filter(
      (k) => k in result.breakdown
    ).map(
      (k) => `  ${BREAKDOWN_LABELS[k] ?? k}: ${formatIndianPrice(result.breakdown[k] ?? 0n)}`
    );
    const lines = [
      "📐 Nirman360 Construction Estimate",
      `Area: ${areaSqft} sq.ft | ${regionLabel} | ${gradeLabel} grade`,
      `Total Cost: ${formatIndianPrice(result.totalCost)}`,
      `Cost/sq.ft: ₹${Number(result.costPerSqft).toLocaleString("en-IN")}`,
      "",
      "Breakdown:",
      ...breakdownLines,
      "",
      "Estimate by nirman360.com"
    ].join("\n");
    void navigator.clipboard.writeText(lines);
    ue.success("Estimate copied to clipboard!", { duration: 3e3 });
  };
  const handleFindDesigns = () => {
    void navigate({
      to: "/browse",
      search: {
        budget: result ? String(result.totalCost) : void 0
      }
    });
  };
  const areaNum = Number.parseInt(areaSqft, 10);
  const areaValid = areaNum >= 100 && areaNum <= 5e4;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container py-10 md:py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-foreground leading-tight", children: "Construction Cost Calculator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground text-base md:text-lg max-w-xl", children: "Get accurate estimates for your dream project — region-adjusted, grade-specific, and broken down category by category." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Quick Presets" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: PRESETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => applyPreset(p),
            "data-ocid": `calculator.preset.${p.label.toLowerCase().replace(/\s+/g, "_")}`,
            className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-smooth hover:scale-105 ${p.color}`,
            children: [
              p.icon,
              p.label
            ]
          },
          p.label
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground text-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
            "Project Details"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "area-input", children: "Built-up Area (sq.ft)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "area-input",
                type: "number",
                min: "100",
                max: "50000",
                value: areaSqft,
                onChange: (e) => setAreaSqft(e.target.value),
                placeholder: "e.g. 1200",
                "data-ocid": "calculator.area.input",
                className: "text-base"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3 w-3" }),
                " Min 100 · Max 50,000 sq.ft"
              ] }),
              !areaValid && areaSqft !== "" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                " Out of range"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Region" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "calculator.region.info_tooltip",
                    className: "text-muted-foreground hover:text-foreground transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3.5 w-3.5" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TooltipContent, { side: "right", className: "max-w-xs p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: "Why do costs vary by region?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Urban metro cities have higher labor demand, transport costs, and premium material availability. Rural areas benefit from lower labor rates and reduced logistics overheads." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-1", children: Object.entries(REGION_INFO).map(([, info]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex justify-between text-xs gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          info.icon,
                          " ",
                          info.label.split("(")[0]
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                          info.multiplier,
                          " base"
                        ] })
                      ]
                    },
                    info.label
                  )) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: region,
                onValueChange: (v) => setRegion(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "calculator.region.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(REGION_INFO).map(([val, info]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: val, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      info.icon,
                      " ",
                      info.label
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      "Est. labor: ",
                      info.labor
                    ] })
                  ] }) }, val)) })
                ]
              }
            ),
            region && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              (_a = REGION_INFO[region]) == null ? void 0 : _a.icon,
              " Estimated labor cost:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: (_b = REGION_INFO[region]) == null ? void 0 : _b.labor }),
              " ",
              "· Cost multiplier:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: (_c = REGION_INFO[region]) == null ? void 0 : _c.multiplier })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Material Grade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: grade,
                onValueChange: (v) => setGrade(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "calculator.grade.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(GRADE_INFO).map(([val, info]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: val, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: info.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: info.badge })
                  ] }) }, val)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              onClick: handleCalculate,
              disabled: calculateMutation.isPending || !areaValid,
              "data-ocid": "calculator.calculate.submit_button",
              className: "w-full gap-2 mt-1 bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth",
              children: calculateMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Calculating..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-4 w-4" }),
                "Calculate Cost",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
              ] })
            }
          ),
          calculateMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-sm text-destructive bg-destructive/10 rounded-lg p-3 flex items-center gap-2",
              "data-ocid": "calculator.error_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 flex-shrink-0" }),
                "Failed to calculate. Please try again."
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl border border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground text-sm mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-accent" }),
            "Material Grade Guide"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: Object.entries(GRADE_INFO).map(([val, info]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `p-3 rounded-xl border transition-smooth cursor-pointer text-left w-full ${grade === val ? "border-accent bg-accent/5" : "border-border bg-card hover:border-primary/40"}`,
              onClick: () => setGrade(val),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: grade === val ? "default" : "secondary",
                    className: "text-xs mb-2",
                    children: info.badge
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: info.desc }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-0.5", children: info.features.slice(0, 2).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "text-[10px] text-muted-foreground leading-tight",
                    children: [
                      "• ",
                      f
                    ]
                  },
                  f
                )) })
              ]
            },
            val
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-6 rounded-2xl border border-border bg-card shadow-sm",
            "data-ocid": "calculator.result.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-4", children: "Estimated Project Cost" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-primary/5 border border-primary/15", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "Total Estimate" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-primary leading-tight", children: formatIndianPrice(result.totalCost) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
                    Number(result.totalCost).toLocaleString("en-IN"),
                    " ₹"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-accent/5 border border-accent/15", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "Cost per sq.ft" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-accent leading-tight", children: [
                    "₹",
                    Number(result.costPerSqft).toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "per sq.ft" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: handleShare,
                    className: "flex-1 gap-2",
                    "data-ocid": "calculator.share.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
                      "Share Estimate"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: handleFindDesigns,
                    className: "flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground",
                    "data-ocid": "calculator.find_designs.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" }),
                      "Find Matching Designs"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4 text-sm", children: "Cost Breakdown — Bar Chart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            BarChart,
            {
              data: chartData,
              margin: { top: 4, right: 4, left: 0, bottom: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    stroke: "oklch(0.9 0.01 270)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 10 } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tickFormatter: (v) => `₹${(v / 1e5).toFixed(0)}L`,
                    tick: { fontSize: 10 },
                    width: 40
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip$2,
                  {
                    formatter: (value) => [
                      formatIndianPrice(BigInt(Math.round(value))),
                      "Cost"
                    ],
                    contentStyle: { fontSize: 12 }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [4, 4, 0, 0], children: chartData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Cell,
                  {
                    fill: CHART_COLORS[index % CHART_COLORS.length]
                  },
                  `bar-${entry.name}`
                )) })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-4 text-sm", children: "Cost Distribution — Pie Chart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Pie,
              {
                data: chartData,
                cx: "50%",
                cy: "50%",
                innerRadius: 55,
                outerRadius: 85,
                paddingAngle: 2,
                dataKey: "value",
                children: chartData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Cell,
                  {
                    fill: CHART_COLORS[index % CHART_COLORS.length]
                  },
                  `pie-${entry.name}`
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip$2,
              {
                formatter: (value) => [
                  formatIndianPrice(BigInt(Math.round(value))),
                  "Cost"
                ],
                contentStyle: { fontSize: 12 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Legend,
              {
                iconType: "circle",
                iconSize: 8,
                wrapperStyle: { fontSize: 11 }
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3 text-sm", children: "Detailed Category Breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: BREAKDOWN_ORDER.filter((k) => k in result.breakdown).map(
            (key, i) => {
              const val = result.breakdown[key] ?? 0n;
              const pct = result.totalCost > 0n ? Math.round(
                Number(val) / Number(result.totalCost) * 100
              ) : 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center gap-3 py-2.5 ${i < BREAKDOWN_ORDER.length - 1 ? "border-b border-border" : ""}`,
                  "data-ocid": `calculator.breakdown.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                        style: {
                          background: CHART_COLORS[i % CHART_COLORS.length]
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground flex-1", children: BREAKDOWN_LABELS[key] ?? key }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full rounded-full transition-all duration-700",
                          style: {
                            width: `${pct}%`,
                            background: CHART_COLORS[i % CHART_COLORS.length]
                          }
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-8 text-right", children: [
                        pct,
                        "%"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground w-20 text-right", children: formatIndianPrice(val) })
                    ] })
                  ]
                },
                key
              );
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-4 rounded-xl border border-border bg-muted/40 flex gap-2.5",
            "data-ocid": "calculator.disclaimer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Disclaimer:" }),
                " ",
                "Estimates are indicative. Actual costs may vary based on site conditions, contractor rates, and material availability. Consult a licensed civil engineer before making financial decisions."
              ] })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center gap-5 py-24 rounded-2xl border border-dashed border-border bg-card/50",
          "data-ocid": "calculator.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 w-20 items-center justify-center rounded-2xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-10 w-10 text-muted-foreground/40" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base", children: "Your estimate will appear here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                "Fill in the project details and click",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Calculate Cost" }),
                " to see a full breakdown with charts."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4 text-muted-foreground/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Shareable results • Regional accuracy • 7 cost categories" })
            ] })
          ]
        }
      ) })
    ] }) })
  ] }) });
}
export {
  CalculatorPage as default
};
