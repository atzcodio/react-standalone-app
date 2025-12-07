import A from "react";
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
var B = A, E = Symbol.for("react.element"), N = Symbol.for("react.fragment"), S = Object.prototype.hasOwnProperty, M = B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, T = { key: !0, ref: !0, __self: !0, __source: !0 };
function g(e, t, s) {
  var o, r = {}, n = null, u = null;
  s !== void 0 && (n = "" + s), t.key !== void 0 && (n = "" + t.key), t.ref !== void 0 && (u = t.ref);
  for (o in t) S.call(t, o) && !T.hasOwnProperty(o) && (r[o] = t[o]);
  if (e && e.defaultProps) for (o in t = e.defaultProps, t) r[o] === void 0 && (r[o] = t[o]);
  return { $$typeof: E, type: e, key: n, ref: u, props: r, _owner: M.current };
}
p.Fragment = N;
p.jsx = g;
p.jsxs = g;
f.exports = p;
var U = f.exports;
const m = {
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
}, G = (e) => ({
  background_color: "primary",
  color: "text",
  border: "border"
}), I = {
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
function X(e, t) {
  return {
    name: "Button",
    EditProperties: D(e),
    Configuration: I,
    getThemeMapping: G(),
    defaultProps: m
  };
}
function K(e) {
  const { ElementTypes: t, THEME: s } = e, r = {
    ...e.getPlatformHooks()
    // platform injected deps
  }, { useExecuteFlow: n } = r;
  return {
    component: (h) => {
      const x = n();
      if (!h)
        return null;
      const {
        id: j,
        _mode: _,
        grid: H,
        properties: a,
        meta: z,
        updateProperties: W,
        onFxChange: q,
        ...J
      } = h, y = { ...m, ...a }, {
        text: L,
        background_color: O,
        padding: c,
        border: R,
        border_radius: w,
        color: C,
        margin: b,
        text_align: k,
        fontSize: v,
        fontWeight: P
      } = y, $ = (F) => {
        console.log("Button Clicked for custom flow event", F), _ === "preview" && x && a.event && a.event.nodes && x(a.event.nodes, a.event.nodes[0].id);
      }, i = Array.isArray(b) ? b : ["0px", "0px", "0px", "0px"], l = Array.isArray(c) ? c : ["0px", "0px", "0px", "0px"], d = Array.isArray(w) ? w : ["0px", "0px", "0px", "0px"];
      return /* @__PURE__ */ U.jsx(
        "button",
        {
          onClick: $,
          style: {
            backgroundColor: `var(--background-color, ${O})`,
            border: R,
            borderRadius: `${d[0]} ${d[1]} ${d[2]} ${d[3]}`,
            margin: `${i[0]} ${i[1]} ${i[2]} ${i[3]}`,
            padding: `${l[0]} ${l[1]} ${l[2]} ${l[3]}`,
            color: `var(--text-color, ${C})`,
            textAlign: k,
            width: "100%",
            height: "100%",
            fontSize: v,
            fontWeight: P
          },
          children: L
        }
      );
    },
    manifest: X(t)
  };
}
export {
  K as createComponent
};
