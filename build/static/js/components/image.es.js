const h = "https://images.unsplash.com/photo-1713996240147-7a2f77d2871b?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", $ = (e) => ({
  border: e.borderColor
}), R = (e) => [
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
    type: e.GROUP("data"),
    width: 24,
    collaseOpen: !0,
    elements: [
      {
        label: "Url",
        name: "url",
        type: e.TEXT(h),
        width: 24,
        showFx: !0,
        fx: h
      }
    ]
  },
  {
    type: e.GROUP("style"),
    width: 24,
    collaseOpen: !0,
    elements: [
      {
        label: "style",
        name: "style",
        type: e.TEXT(),
        showLabel: !0,
        width: 24
      },
      {
        label: "Border",
        name: "border",
        type: e.TEXT("1px solid #e1e1e1"),
        width: 24,
        themePropertyName: "borderColor",
        showFx: !0
      },
      {
        label: "Border Radius",
        name: "borderRadius",
        type: e.BORDERRADIUS(["0px", "0px", "0px", "0px"]),
        showLabel: !0,
        width: 24
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
        width: 24,
        showFx: !0
      }
    ]
  }
], y = (e) => ({
  ...e,
  grid: {
    desktop: {
      width: 7,
      height: 30
    },
    mobile: {
      width: 15,
      height: 30
    }
  },
  resizable: {
    width: !0,
    height: !0
  }
});
function M(e, i, n, s) {
  const t = R(e);
  return {
    name: "Image",
    EditProperties: t,
    Configuration: y(n),
    ThemeMapping: $(i),
    defaultProps: s(t)
  };
}
function O(e) {
  const { ElementTypes: i, THEME: n, BaseComponent: s, BaseConfiguration: t, getDefaultProps: u } = e, d = M(i, n, t, u);
  return {
    component: (g) => {
      const { id: p, grid: c, properties: l, meta: m, updateProperties: b, onFxChange: D, ...G } = g, w = { ...l }, { url: x, padding: r, style: f, margin: o, border: P, borderRadius: a } = w, C = {
        id: p,
        properties: l,
        meta: m,
        EditProperties: d.EditProperties,
        updateProperties: b,
        Configuration: d.Configuration,
        grid: c
      };
      return /* @__PURE__ */ e.React.createElement(s, { ...C, id: p }, /* @__PURE__ */ e.React.createElement("div", { className: `w-full text-center p-0.5 text-white image-box ${f}`, style: { width: "100%", height: "100%" } }, /* @__PURE__ */ e.React.createElement(
        "img",
        {
          src: x,
          style: {
            width: "100%",
            height: "100%",
            border: `var(--border-color, ${P})`,
            borderRadius: `${a[0]} ${a[1]} ${a[2]} ${a[3]}`,
            padding: `${r[0]} ${r[1]} ${r[2]} ${r[3]}`,
            margin: `${o[0]} ${o[1]} ${o[2]} ${o[3]}`
          }
        }
      )));
    },
    manifest: d
  };
}
export {
  O as createComponent
};
