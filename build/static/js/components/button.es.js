import F from "react";
var b = { exports: {} }, p = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var A = F, B = Symbol.for("react.element"), N = Symbol.for("react.fragment"), S = Object.prototype.hasOwnProperty, U = A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, G = { key: !0, ref: !0, __self: !0, __source: !0 };
function f(e, t, i) {
  var o, r = {}, l = null, n = null;
  i !== void 0 && (l = "" + i), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (n = t.ref);
  for (o in t) S.call(t, o) && !G.hasOwnProperty(o) && (r[o] = t[o]);
  if (e && e.defaultProps) for (o in t = e.defaultProps, t) r[o] === void 0 && (r[o] = t[o]);
  return { $$typeof: B, type: e, key: l, ref: n, props: r, _owner: U.current };
}
p.Fragment = N;
p.jsx = f;
p.jsxs = f;
b.exports = p;
var I = b.exports;
const E = {
  // All deps optional – components may override or platform may inject
  // Import what local depencies you need here
  loadIcon: null
}, g = {
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
}, M = {
  background_color: "primary",
  color: "text",
  border: "border"
}, T = {
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
    Configuration: T,
    ThemeMapping: M,
    defaultProps: g
  };
}
function K(e) {
  const { ElementTypes: t } = e, i = e.getPlatformHooks(), o = {
    ...E,
    // internal deps
    ...i
    // platform injected deps
  }, { useExecuteFlow: r } = o;
  return {
    component: (n) => {
      const h = r();
      if (!n)
        return null;
      const {
        id: j,
        _mode: m,
        grid: z,
        properties: a,
        meta: W,
        updateProperties: H,
        onFxChange: q,
        ...J
      } = n, _ = { ...g, ...a }, {
        text: y,
        background_color: L,
        padding: x,
        border: O,
        border_radius: c,
        color: R,
        margin: w,
        text_align: C,
        fontSize: k,
        fontWeight: v
      } = _, P = ($) => {
        console.log("Button Clicked for custom flow event", $), m === "preview" && h && a.event && a.event.nodes && h(a.event.nodes, a.event.nodes[0].id);
      }, d = Array.isArray(w) ? w : ["0px", "0px", "0px", "0px"], s = Array.isArray(x) ? x : ["0px", "0px", "0px", "0px"], u = Array.isArray(c) ? c : ["0px", "0px", "0px", "0px"];
      return /* @__PURE__ */ I.jsx(
        "button",
        {
          onClick: P,
          style: {
            backgroundColor: `var(--background-color, ${L})`,
            border: O,
            borderRadius: `${u[0]} ${u[1]} ${u[2]} ${u[3]}`,
            margin: `${d[0]} ${d[1]} ${d[2]} ${d[3]}`,
            padding: `${s[0]} ${s[1]} ${s[2]} ${s[3]}`,
            color: `var(--text-color, ${R})`,
            textAlign: C,
            width: "100%",
            height: "100%",
            fontSize: k,
            fontWeight: v
          },
          children: y
        }
      );
    },
    manifest: X(t)
  };
}
export {
  T as Configuration,
  M as ThemeMapping,
  K as createComponent,
  g as defaultProps
};
