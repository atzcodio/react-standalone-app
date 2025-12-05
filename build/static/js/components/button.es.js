import B from "react";
var f = { exports: {} }, p = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var N = B, S = Symbol.for("react.element"), U = Symbol.for("react.fragment"), G = Object.prototype.hasOwnProperty, I = N.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, E = { key: !0, ref: !0, __self: !0, __source: !0 };
function g(e, t, i) {
  var o, r = {}, l = null, n = null;
  i !== void 0 && (l = "" + i), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (n = t.ref);
  for (o in t) G.call(t, o) && !E.hasOwnProperty(o) && (r[o] = t[o]);
  if (e && e.defaultProps) for (o in t = e.defaultProps, t) r[o] === void 0 && (r[o] = t[o]);
  return { $$typeof: S, type: e, key: l, ref: n, props: r, _owner: I.current };
}
p.Fragment = U;
p.jsx = g;
p.jsxs = g;
f.exports = p;
var M = f.exports;
const T = {
  // All deps optional – components may override or platform may inject
  // Import what local depencies you need here
  loadIcon: null
}, h = {
  text: "Click",
  background_color: "#1890ff",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "400",
  fontFamily: "inherit",
  padding: "8px 16px",
  margin: ["0px", "0px", "0px", "0px"],
  border_radius: ["4px", "4px", "4px", "4px"],
  border: "none",
  text_align: "center",
  loading: !1,
  theme: "basic",
  type: "button"
}, m = {
  background_color: "primary",
  color: "text",
  border: "border"
}, _ = {
  grid: {
    desktop: { width: 4, height: 4 },
    mobile: { width: 6, height: 4 }
  },
  resizable: { width: !0, height: !0 }
}, D = (e) => [
  {
    type: e.GROUP("basic"),
    width: 24,
    collaseOpen: !0,
    elements: [
      {
        label: "Name",
        name: "_name",
        type: e.TEXT(""),
        showLabel: !0,
        width: 24
      }
    ]
  },
  {
    type: e.GROUP("text"),
    width: 24,
    collaseOpen: !0,
    elements: [
      {
        label: "Text",
        name: "text",
        type: e.TEXT("Click"),
        showLabel: !0,
        width: 24,
        showFx: !0,
        onlyFx: !0
      },
      {
        label: "Text Align",
        name: "text_align",
        type: e.TEXTALIGNMENT("center"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Text Color",
        name: "color",
        type: e.COLOR("#ffffff"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Font Size",
        name: "fontSize",
        type: e.TEXT("12px"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Font Weight",
        name: "fontWeight",
        type: e.SELECT(
          ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
          "500"
        ),
        showLabel: !0,
        width: 24,
        showFx: !0
      }
    ]
  },
  {
    type: e.GROUP("theme"),
    width: 24,
    collaseOpen: !0,
    elements: [
      {
        label: "Theme",
        name: "theme",
        type: e.CHANGETHEME("dark"),
        showLabel: !0,
        width: 24
      }
    ]
  },
  {
    type: e.GROUP("style"),
    width: 24,
    collaseOpen: !0,
    elements: [
      {
        label: "Background Color",
        name: "background_color",
        type: e.COLOR("#ff0000"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Border",
        name: "border",
        type: e.TEXT("1px solid #e1e1e1"),
        width: 24
      },
      {
        label: "Border Radius",
        name: "border_radius",
        type: e.BORDERRADIUS(["5px", "5px", "5px", "5px"]),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Margin",
        name: "margin",
        type: e.SPACING(["0px", "0px", "0px", "0px"]),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Padding",
        name: "padding",
        type: e.SPACING(["0px", "0px", "0px", "0px"]),
        showLabel: !0,
        width: 24
      }
    ]
  },
  {
    type: e.GROUP("layout"),
    width: 24,
    elements: [
      {
        label: "Type",
        name: "type",
        type: e.TEXT(),
        showLabel: !0,
        width: 24
      },
      {
        label: "ID",
        name: "id",
        type: e.TEXT(),
        showLabel: !0,
        width: 24
      },
      {
        label: "Char Limit",
        name: "char_limit",
        type: e.NUMBER(),
        showLabel: !0,
        width: 24
      },
      {
        label: "Loading",
        name: "loading",
        type: e.NUMBER(0),
        showLabel: !0,
        width: 24
      }
    ]
  },
  {
    type: e.GROUP("events"),
    width: 24,
    elements: [
      {
        label: "Event",
        name: "event",
        type: e.EVENTBUTTON("click", {}),
        showLabel: !0,
        width: 24
      }
    ]
  }
];
function X(e) {
  return {
    name: "Button",
    EditProperties: D(e),
    Configuration: _,
    ThemeMapping: m,
    defaultProps: h
  };
}
function j(e) {
  const { ElementTypes: t } = e, i = e.getPlatformHooks(), o = {
    ...T,
    // internal deps
    ...i
    // platform injected deps
  }, { useExecuteFlow: r } = o;
  return {
    component: (n) => {
      const x = r();
      if (!n)
        return null;
      const {
        id: z,
        _mode: y,
        grid: W,
        properties: a,
        meta: H,
        updateProperties: q,
        onFxChange: J,
        ...V
      } = n, L = { ...h, ...a }, {
        text: O,
        background_color: R,
        padding: c,
        border: C,
        border_radius: w,
        color: k,
        margin: b,
        text_align: v,
        fontSize: P,
        fontWeight: $
      } = L, F = (A) => {
        console.log("Button Clicked for custom flow event", A), y === "preview" && x && a.event && a.event.nodes && x(a.event.nodes, a.event.nodes[0].id);
      }, d = Array.isArray(b) ? b : ["0px", "0px", "0px", "0px"], s = Array.isArray(c) ? c : ["0px", "0px", "0px", "0px"], u = Array.isArray(w) ? w : ["0px", "0px", "0px", "0px"];
      return /* @__PURE__ */ M.jsx(
        "button",
        {
          onClick: F,
          style: {
            backgroundColor: `var(--background-color, ${R})`,
            border: C,
            borderRadius: `${u[0]} ${u[1]} ${u[2]} ${u[3]}`,
            margin: `${d[0]} ${d[1]} ${d[2]} ${d[3]}`,
            padding: `${s[0]} ${s[1]} ${s[2]} ${s[3]}`,
            color: `var(--text-color, ${k})`,
            textAlign: v,
            width: "100%",
            height: "100%",
            fontSize: P,
            fontWeight: $
          },
          children: O
        }
      );
    },
    manifest: X(t)
  };
}
const Q = {
  createComponent: j,
  defaultProps: h,
  Configuration: _,
  ThemeMapping: m
};
export {
  _ as Configuration,
  m as ThemeMapping,
  j as createComponent,
  Q as default,
  h as defaultProps,
  X as getButtonManifest,
  D as getEditProperties
};
