const s = {
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
}, P = (e) => ({
  background_color: "primary",
  color: "text",
  border: "border"
}), k = {
  grid: {
    desktop: { width: 4, height: 4 },
    mobile: { width: 6, height: 4 }
  },
  resizable: { width: !0, height: !0 }
}, F = (e) => [
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
function $(e, n) {
  return {
    name: "Button",
    EditProperties: F(e),
    Configuration: k,
    getThemeMapping: P(),
    defaultProps: s
  };
}
function X(e) {
  const { ElementTypes: n, THEME: A, React: B } = e, u = {
    ...e.getPlatformHooks()
    // platform injected deps
  }, { useExecuteFlow: c } = u;
  return {
    component: (i) => {
      const l = c();
      if (!i)
        return null;
      const {
        id: v,
        _mode: x,
        grid: G,
        properties: t,
        meta: N,
        updateProperties: U,
        onFxChange: T,
        ...E
      } = i, w = { ...s, ...t }, {
        text: b,
        background_color: g,
        padding: d,
        border: f,
        border_radius: h,
        color: m,
        margin: p,
        text_align: L,
        fontSize: C,
        fontWeight: R
      } = w, y = (O) => {
        console.log("Button Clicked for custom flow event", O), x === "preview" && l && t.event && t.event.nodes && l(t.event.nodes, t.event.nodes[0].id);
      }, o = Array.isArray(p) ? p : ["0px", "0px", "0px", "0px"], r = Array.isArray(d) ? d : ["0px", "0px", "0px", "0px"], a = Array.isArray(h) ? h : ["0px", "0px", "0px", "0px"];
      return /* @__PURE__ */ e.React.createElement(
        "button",
        {
          onClick: y,
          style: {
            backgroundColor: `var(--background-color, ${g})`,
            border: f,
            borderRadius: `${a[0]} ${a[1]} ${a[2]} ${a[3]}`,
            margin: `${o[0]} ${o[1]} ${o[2]} ${o[3]}`,
            padding: `${r[0]} ${r[1]} ${r[2]} ${r[3]}`,
            color: `var(--text-color, ${m})`,
            textAlign: L,
            width: "100%",
            height: "100%",
            fontSize: C,
            fontWeight: R
          }
        },
        b
      );
    },
    manifest: $(n)
  };
}
export {
  X as createComponent
};
