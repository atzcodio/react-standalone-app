const k = {};
function ze(e) {
  Object.assign(k, e);
}
let be = null;
function ut(e) {
  return be || (be = (async () => {
    const r = (e == null ? void 0 : e()) ?? null, T = typeof window < "u" && !r;
    if (r != null && r.React)
      Object.assign(k, {
        React: r.React,
        useState: r.React.useState,
        useEffect: r.React.useEffect,
        useMemo: r.React.useMemo,
        useRef: r.React.useRef,
        useCallback: r.React.useCallback
      });
    else if (!T) {
      const x = await import("react");
      Object.assign(k, {
        React: x.default || x,
        useState: x.useState,
        useEffect: x.useEffect,
        useMemo: x.useMemo,
        useRef: x.useRef,
        useCallback: x.useCallback
      });
    }
    if (r != null && r.antd)
      Object.assign(k, {
        Drawer: r.antd.Drawer,
        Popover: r.antd.Popover
      });
    else if (!T) {
      const { Drawer: x, Popover: G } = await import("antd");
      Object.assign(k, { Drawer: x, Popover: G });
    }
    if (r != null && r.icons)
      Object.assign(k, {
        ArrowUpOutlined: r.icons.ArrowUpOutlined,
        ArrowDownOutlined: r.icons.ArrowDownOutlined,
        PlusOutlined: r.icons.PlusOutlined
      });
    else if (!T && !k.ArrowUpOutlined) {
      const x = await import("@ant-design/icons");
      Object.assign(k, {
        ArrowUpOutlined: x.ArrowUpOutlined,
        ArrowDownOutlined: x.ArrowDownOutlined,
        PlusOutlined: x.PlusOutlined
      });
    }
    if (r != null && r.AiIcons)
      Object.assign(k, {
        AiOutlineCaretDown: r.AiIcons.AiOutlineCaretDown,
        AiOutlineCaretUp: r.AiIcons.AiOutlineCaretUp,
        AiOutlineCompress: r.AiIcons.AiOutlineCompress
      });
    else if (!T && !k.AiOutlineCaretDown) {
      const x = await import("react-icons/ai");
      Object.assign(k, {
        AiOutlineCaretDown: x.AiOutlineCaretDown,
        AiOutlineCaretUp: x.AiOutlineCaretUp,
        AiOutlineCompress: x.AiOutlineCompress
      });
    }
    if (r != null && r.FaIcons)
      Object.assign(k, {
        FaFilter: r.FaIcons.FaFilter
      });
    else if (!T && !k.FaFilter) {
      const x = await import("react-icons/fa");
      Object.assign(k, {
        FaFilter: x.FaFilter
      });
    }
    if (r != null && r.TableList)
      Object.assign(k, {
        TableList: r.TableList
      });
    else if (!T && !k.TableList) {
      const { FixedSizeList: x } = await import("react-window");
      Object.assign(k, {
        TableList: x
      });
    }
    if (r != null && r.AutoSizer)
      Object.assign(k, {
        AutoSizer: r.AutoSizer
      });
    else if (!T && !k.AutoSizer) {
      const x = await import("react-virtualized-auto-sizer");
      Object.assign(k, {
        AutoSizer: x.default || x
      });
    }
    return k;
  })(), be);
}
const Pe = (e) => ({
  ...e,
  grid: {
    desktop: {
      width: 12,
      // Override width for desktop
      height: 30
      // Keep height the same or adjust as needed
    },
    mobile: {
      width: 24,
      // Keep the same or adjust for mobile
      height: 20
      // Keep the same or adjust as needed
    }
  },
  resizable: {
    width: !0,
    height: !0
  }
}), _e = (e, r) => [
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
    // Grouping for basic properties
    elements: [
      {
        label: "Data",
        name: "data",
        type: e.TEXT(),
        width: 24,
        showFx: !0,
        onlyFx: !0,
        fx: '[{"name":"John Doe","age":28,"email":"john@example.com","id":1},{"name":"Jane Smith","age":34,"email":"jane@example.com","id":2},{"name":"Mike Johnson","age":45,"email":"mike@example.com","id":3}]'
      },
      {
        label: "Default Selected",
        name: "defaultSelected",
        type: e.SELECT(["none", "first", "last", "filter"], "none"),
        width: 12
      },
      {
        label: "Default Filter",
        name: "defaultSelectedFilter",
        type: e.JSON({}),
        width: 12,
        showFx: !0,
        fx: '{"columnName": "value to match"}'
      },
      {
        label: "selection_type",
        name: "selection_type",
        type: e.SELECT(["single", "multiple"], "single"),
        width: 24
      }
    ]
  },
  {
    type: e.GROUP("columns"),
    width: 24,
    collaseOpen: !0,
    elements: [
      {
        label: "primary_key",
        name: "primary_key",
        type: e.SELECT([], ""),
        width: 24
      },
      {
        label: "Column List",
        name: "columns",
        type: e.REPEATBLOCK({
          columnName: e.TEXT(""),
          columnType: e.SELECT(["Text", "Number", "Boolean", "Url", "Email", "Json", "MultiSelect", "SingleSelect"], "Text")
        }, [], {
          add: !1,
          remove: !1,
          height: "250px",
          sortable: !0,
          showOrder: !0
        }),
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
        label: "Header Background",
        name: "header_bg",
        type: e.COLOR("#f7f7f7"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Header Font Color",
        name: "header_font_color",
        type: e.COLOR("#ffffff"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Body Backgorund",
        name: "body_bg",
        type: e.COLOR("#d9e3f0"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Body Font Color",
        name: "body_font_color",
        type: e.COLOR("#555555"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Check Color",
        name: "checkbox_accent_col",
        type: e.COLOR("#b0b0b0"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Check Border Color",
        name: "checkboxBorderColor",
        type: e.COLOR("#b0b0b0"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Selection Background",
        name: "selectionBg",
        type: e.COLOR("#bae0ff"),
        showLabel: !0,
        width: 24,
        showFx: !0
      },
      {
        label: "Border",
        name: "border",
        type: e.TEXT("1px solid #e1e1e1"),
        showLabel: !0,
        width: 24,
        themePropertyName: r.backgroundColor,
        showFx: !0
      },
      {
        label: "Border Radius",
        name: "border_radius",
        type: e.BORDERRADIUS(["5px", "5px", "5px", "5px"]),
        showLabel: !0,
        width: 24
      },
      {
        label: "Margin",
        name: "margin",
        type: e.SPACING(["5px", "5px", "5px", "5px"]),
        showLabel: !0,
        width: 24
      }
    ]
  }
], dt = (e) => ({
  border: e.borderColor
});
function mt(e, r, T, x) {
  const G = _e(e, r);
  return {
    name: "Table",
    EditProperties: G,
    Configuration: Pe(T),
    ThemeMapping: dt(r),
    defaultProps: x(G)
  };
}
const pt = (e) => {
  const { React: r } = e;
  if (!r) return { FilterComponent: () => null, FilterGroup: () => null, RowComponent: () => null };
  const T = r.useState, x = r.useRef, G = r.useEffect, ee = () => k, Se = ({
    columns: f,
    tableData: m,
    originalData: B,
    setTableData: A
  }) => {
    const { Drawer: F, Popover: X, PlusOutlined: te, AiOutlineCaretDown: se, AiOutlineCaretUp: re, AiOutlineCompress: J, FaFilter: le, TableList: L, AutoSizer: ne } = ee(), [P, z] = T(m);
    let j = f[0].columnType;
    const [s, o] = T([
      {
        id: "group1",
        filters: [{ column: j, operator: "", value: "" }],
        logicalOperator: "And",
        subGroups: []
      }
    ]), [a, p] = T([
      {
        id: "group1",
        filters: [{ column: j, operator: "", value: "" }],
        logicalOperator: "And",
        subGroups: []
      }
    ]), u = (v, c) => !c || c.length === 0 ? v : c.reduce((l, $) => O(l, $), v), O = (v, c) => {
      let l = [...v];
      return c.filters.length > 0 && (c.logicalOperator === "And" ? l = l.filter(
        ($) => c.filters.every((g) => C($, g))
      ) : c.logicalOperator === "Or" && (l = l.filter(
        ($) => c.filters.some((g) => C($, g))
      ))), c.subGroups && c.subGroups.length > 0 && (c.logicalOperator === "And" ? l = c.subGroups.reduce(
        ($, g) => O($, g),
        l
      ) : c.logicalOperator === "Or" && (l = c.subGroups.map(
        (g) => O(v, g)
      ).flat())), l;
    }, C = (v, c) => {
      let l = v[c.column];
      if (!c.operator || !c.column) return !0;
      const { column: $, operator: g, value: E } = c;
      switch (g) {
        case "includes":
          return String(l).includes(String(E));
        case "notIncludes":
          return !String(l).includes(String(E));
        case "is":
          return String(l) === String(E);
        case "isNot":
          return String(l) !== String(E);
        case "isEmpty":
          return l == null || l === "";
        case "isNotEmpty":
          return l != null && l !== "";
        case "equalTo":
          return Number(l) === Number(E);
        case "notEqualTo":
          return Number(l) !== Number(E);
        case "lessThan":
          return Number(l) < Number(E);
        case "greaterThan":
          return Number(l) > Number(E);
        case "lessThanEqual":
          return Number(l) <= Number(E);
        case "greaterThanEqual":
          return Number(l) >= Number(E);
        case "between":
          let xe = E.split(",")[0], ce = E.split(",")[1];
          return Number(l) >= Number(xe) && Number(l) <= Number(ce);
        case "true":
          return l === !0;
        case "false":
          return l === !1;
        case "is":
          return new Date(l).getTime() === new Date(E).getTime();
        case "isNot":
          return new Date(l).getTime() !== new Date(E).getTime();
        case "isBefore":
          return new Date(l).getTime() < new Date(E).getTime();
        case "isAfter":
          return new Date(l).getTime() > new Date(E).getTime();
        case "isEmpty":
          return l == null;
        case "isNotEmpty":
          return l != null;
        default:
          return !1;
      }
    }, U = () => {
      console.log("group filter", s);
      let v = u(B, s);
      A(v);
    }, N = () => {
      o([
        {
          id: "group1",
          filters: [{ column: j, operator: "", value: "" }],
          logicalOperator: "And",
          subGroups: []
        }
      ]), A(B);
    };
    return /* @__PURE__ */ e.React.createElement(
      "div",
      {
        className: "border-none p-0 rounded-md w-full bg-white",
        style: { width: "650px" }
      },
      /* @__PURE__ */ e.React.createElement(
        V,
        {
          filterGroups: s,
          setFilterGroups: o,
          firstColumn: j,
          columns: f,
          originalFilterGroup: a
        }
      ),
      /* @__PURE__ */ e.React.createElement("div", { className: "flex justify-end mt-4 gap-2" }, /* @__PURE__ */ e.React.createElement(
        "button",
        {
          onClick: U,
          className: "px-4 py-1 bg-blue-500 text-sm text-white rounded-md hover:bg-blue-600 transition"
        },
        "Apply Filter"
      ), /* @__PURE__ */ e.React.createElement(
        "button",
        {
          onClick: N,
          className: "px-4 py-1 bg-blue-500 text-sm text-white rounded-md hover:bg-red-400 transition"
        },
        "Reset Filter"
      ))
    );
  }, oe = {
    Text: [
      { label: "includes", name: "includes" },
      { label: "does not include", name: "notIncludes" },
      { label: "is", name: "is" },
      { label: "is not", name: "isNot" },
      { label: "is empty", name: "isEmpty" },
      { label: "is not empty", name: "isNotEmpty" }
    ],
    Number: [
      { label: "=", name: "equalTo" },
      { label: "!=", name: "notEqualTo" },
      { label: "<", name: "lessThan" },
      { label: ">", name: "greaterThan" },
      { label: "<=", name: "lessThanEqual" },
      { label: ">=", name: "greaterThanEqual" },
      { label: "between", name: "between" },
      { label: "is empty", name: "isEmpty" },
      { label: "is not empty", name: "isNotEmpty" }
    ],
    Boolean: [
      { label: "is true", name: "true" },
      { label: "is false", name: "false" }
    ],
    date: [
      { label: "is", name: "is" },
      { label: "is not", name: "isNot" },
      { label: "is before", name: "isBefore" },
      { label: "is after", name: "isAfter" },
      { label: "is empty", name: "isEmpty" },
      { label: "is not empty", name: "isNotEmpty" }
    ]
  }, V = function({ filterGroups: f, setFilterGroups: m, firstColumn: B, columns: A, originalFilterGroup: F, parentGroupId: X, parentLogicalOperator: te }) {
    const { Popover: se, PlusOutlined: re } = ee(), J = (s, o, a, p, u) => {
      var U, N, v, c;
      const O = [...F], C = L(O, s);
      if (C) {
        if (u) {
          const l = ((U = C.filters[o].value) == null ? void 0 : U.split(",")) || ["", ""];
          a === "from" ? l[0] = p : a === "to" && (l[1] = p, console.log("between in handle", l)), C.filters[o].value = l.join(",");
        } else
          C.filters[o][a] = p;
        if (a === "column") {
          let l = ((N = A[p]) == null ? void 0 : N.columnType) || "string";
          (l === "Url" || l === "Email" || l === "Url" || l === "Json") && (l = "Text"), C.filters[o].operator = ((c = (v = oe[l]) == null ? void 0 : v[0]) == null ? void 0 : c.name) || "", C.filters[o].value = "";
        }
        m(O);
      }
    }, le = (s, o) => {
      const a = [...F], p = L(a, s);
      p && (p.logicalOperator = o, m(a));
    }, L = (s, o) => {
      for (const a of s) {
        if (a.id === o) return a;
        if (a.subGroups) {
          const p = L(a.subGroups, o);
          if (p) return p;
        }
      }
      return null;
    }, ne = (s) => {
      var p;
      const a = { id: `group${Date.now()}`, filters: [{ column: B, operator: "", value: "" }], logicalOperator: "And", subGroups: [] };
      if (s) {
        const u = [...F], O = L(u, s);
        O && ((p = O.subGroups) == null || p.push(a)), m(u);
      } else
        console.log("filterGroups not parentGroup", [...f, a]), m([...f, a]);
      console.log("filterGroups updated", f);
    }, P = (s) => {
      var o;
      if (X) {
        let a = [...F];
        const p = L(a, X);
        p && (p.subGroups = (o = p.subGroups) == null ? void 0 : o.filter((u) => u.id !== s)), m(a);
      } else
        m(f.filter((a) => a.id !== s));
    }, z = (s) => {
      var u;
      const o = { column: "", operator: "", value: "" }, a = [...F], p = L(a, s);
      p && ((u = p == null ? void 0 : p.filters) == null || u.push(o)), m(a);
    }, j = (s, o) => {
      let a = [...F], p = L(a, s);
      p && p.filters.splice(o, 1), m(a);
    };
    return /* @__PURE__ */ e.React.createElement("div", null, f.map((s) => /* @__PURE__ */ e.React.createElement("div", { key: s.id, className: " mb-4 p-4" }, /* @__PURE__ */ e.React.createElement("div", { className: "flex justify-between mb-2" }, /* @__PURE__ */ e.React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ e.React.createElement("div", { className: "flex items-center gap-0 mt-2 border rounded-sm" }, /* @__PURE__ */ e.React.createElement(
      "button",
      {
        onClick: () => le(s.id, s.logicalOperator === "And" ? "Or" : "And"),
        className: `px-2 text-xs  py-1 ${s.logicalOperator === "And" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`
      },
      "AND"
    ), /* @__PURE__ */ e.React.createElement(
      "button",
      {
        onClick: () => le(s.id, s.logicalOperator === "Or" ? "And" : "Or"),
        className: `px-2 text-xs py-1 ${s.logicalOperator === "Or" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`
      },
      "OR"
    )), /* @__PURE__ */ e.React.createElement(
      se,
      {
        trigger: "click",
        content: /* @__PURE__ */ e.React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ e.React.createElement(
          "button",
          {
            className: "text-left px-4 py-2 hover:bg-gray-100 w-full",
            onClick: () => z(s.id)
          },
          "Add Filter"
        ), /* @__PURE__ */ e.React.createElement(
          "button",
          {
            className: "text-left px-4 py-2 hover:bg-gray-100 w-full",
            onClick: () => ne(s.id)
          },
          "Add Filter Group"
        ))
      },
      /* @__PURE__ */ e.React.createElement("span", { className: "m-4 ml-0 cursor-pointer " }, /* @__PURE__ */ e.React.createElement(re, { className: "mt-2 ml-1 text-gray-400", style: { fontSize: "25px" } }))
    )), /* @__PURE__ */ e.React.createElement("button", { onClick: () => P(s.id), className: "text-gray-600 font-semibold" }, "✕")), s.filters.map((o, a) => {
      var p, u, O, C, U, N, v;
      return /* @__PURE__ */ e.React.createElement("div", { key: a, className: "flex items-center gap-2 mb-2", style: { marginLeft: `${a === 0 ? `${s.logicalOperator === "And" ? "33px" : "23px"}` : 0}` } }, a > 0 && /* @__PURE__ */ e.React.createElement("div", null, /* @__PURE__ */ e.React.createElement("h1", null, s.logicalOperator)), /* @__PURE__ */ e.React.createElement("div", { className: "flex-1 ", style: { maxWidth: "30%" } }, /* @__PURE__ */ e.React.createElement(
        "select",
        {
          style: {
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundColor: "white",
            border: "1px solid #E1E1E1",
            padding: "4px 23px 4px 10px",
            fontSize: "14px",
            color: "#4B5563",
            borderRadius: "4px",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0px center",
            backgroundSize: "27px",
            cursor: "pointer"
          },
          value: o.column,
          onChange: (c) => J(s.id, a, "column", c.target.value),
          className: "border rounded px-3 py-1 w-full text-gray-600"
        },
        /* @__PURE__ */ e.React.createElement("option", { value: "" }, "Select Column"),
        Object.keys(A).map((c) => /* @__PURE__ */ e.React.createElement("option", { key: c, value: A[c].columnName }, A[c].columnName))
      )), /* @__PURE__ */ e.React.createElement("div", { className: "flex-1", style: { maxWidth: "30%" } }, o.column && /* @__PURE__ */ e.React.createElement(
        "select",
        {
          style: {
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundColor: "white",
            border: "1px solid #E1E1E1",
            padding: "4px 23px 4px 10px",
            fontSize: "14px",
            color: "#4B5563",
            borderRadius: "4px",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0px center",
            backgroundSize: "27px",
            cursor: "pointer"
          },
          value: o.operator,
          onChange: (c) => J(s.id, a, "operator", c.target.value),
          className: "border rounded px-3 py-1 w-full text-gray-600"
        },
        (u = oe[(p = A.find((c) => c.columnName === o.column)) == null ? void 0 : p.columnType]) == null ? void 0 : u.map((c) => /* @__PURE__ */ e.React.createElement("option", { key: c.name, value: c.name }, c.label))
      )), /* @__PURE__ */ e.React.createElement("div", { className: "flex-1 shrink-1", style: { maxWidth: "32%" } }, o.column && ((O = A.find((c) => c.columnName === o.column)) == null ? void 0 : O.columnType) !== "Boolean" && (o.operator === "between" ? /* @__PURE__ */ e.React.createElement("div", { className: "flex gap-2 " }, /* @__PURE__ */ e.React.createElement(
        "input",
        {
          style: {
            maxWidth: "50%",
            border: "1px solid #E1E1E1",
            padding: "4px",
            fontSize: "14px",
            color: "#4B5563",
            borderRadius: "4px",
            cursor: "pointer"
          },
          type: "number",
          placeholder: "from",
          value: ((C = o.value) == null ? void 0 : C.split(",")[0]) || "",
          onChange: (c) => J(s.id, a, "from", c.target.value, !0)
        }
      ), /* @__PURE__ */ e.React.createElement(
        "input",
        {
          style: {
            maxWidth: "50%",
            border: "1px solid #E1E1E1",
            padding: "4px",
            fontSize: "14px",
            color: "#4B5563",
            borderRadius: "4px",
            cursor: "pointer"
          },
          type: "number",
          placeholder: "to",
          value: ((U = o.value) == null ? void 0 : U.split(",")[1]) || "",
          onChange: (c) => J(s.id, a, "to", c.target.value, !0),
          className: "border rounded px-3 py-1 w-1/2 text-gray-600"
        }
      )) : /* @__PURE__ */ e.React.createElement(
        "input",
        {
          style: {
            maxWidth: "100%",
            // appearance: "none",
            // WebkitAppearance: "none",
            // MozAppearance: "none",
            // backgroundColor: "white",
            border: "1px solid #E1E1E1",
            padding: "4px",
            fontSize: "14px",
            color: "#4B5563",
            borderRadius: "4px",
            cursor: "pointer"
          },
          type: ((N = A[o.column]) == null ? void 0 : N.columnType) === "Date" ? "date" : "text",
          value: o.value || "",
          onChange: (c) => J(s.id, a, "value", c.target.value),
          placeholder: ((v = A[o.column]) == null ? void 0 : v.columnType) === "Date" ? "MMM D, YYYY" : "Filter Value"
        }
      ))), /* @__PURE__ */ e.React.createElement("button", { onClick: () => j(s.id, a), className: "text-gray-600 ml-auto ", style: { fontSize: "medium" } }, "✕"));
    }), (s == null ? void 0 : s.subGroups.length) > 0 && /* @__PURE__ */ e.React.createElement(
      "div",
      {
        className: "relative w-full  rounded-md border",
        style: { backgroundColor: "#f9f9f9", borderLeft: "4px solid #007bff", overflow: "auto" }
      },
      /* @__PURE__ */ e.React.createElement("div", { className: "absolute left-2 top-1/2 transform -translate-y-1/2 font-bold text-sm" }, s.logicalOperator),
      /* @__PURE__ */ e.React.createElement(
        "div",
        {
          className: "ml-[50px] overflow-auto relative",
          style: { width: "calc(100% - 50px)", maxHeight: "200px" }
        },
        /* @__PURE__ */ e.React.createElement(
          "div",
          {
            className: "overflow-y-auto p-2 bg-white rounded-md shadow-md",
            style: { maxHeight: "200px", paddingBottom: "10px", width: "534px" }
          },
          /* @__PURE__ */ e.React.createElement(
            V,
            {
              filterGroups: s.subGroups,
              setFilterGroups: m,
              firstColumn: B,
              columns: A,
              originalFilterGroup: F,
              parentGroupId: s.id,
              parentLogicalOperator: s.logicalOperator
            }
          )
        )
      )
    ))));
  }, he = r.memo(({
    row: f,
    index: m,
    isSelected: B,
    columns: A,
    columnsState: F,
    selectionType: X,
    handleRowClick: te,
    checkboxBorderColor: se,
    checkboxAccentCol: re,
    selectionBg: J,
    renderCell: le,
    showDrawer: L,
    style: ne
  }) => {
    const { AiOutlineCompress: P, Popover: z } = ee();
    let j = x(!1);
    const s = (o) => /* @__PURE__ */ e.React.createElement("div", { style: { maxWidth: "300px", maxHeight: "200px", overflow: "auto" } }, /* @__PURE__ */ e.React.createElement("pre", null, o), " ");
    return G(() => {
      j.current || (j.current = !0);
    }, [A]), /* @__PURE__ */ e.React.createElement(
      "tr",
      {
        key: f.key || m,
        onClick: (o) => {
          o.target.type !== "checkbox" && te(f, m);
        },
        style: {
          ...ne,
          backgroundColor: B ? J : "transparent",
          cursor: "pointer",
          borderBottom: "1px solid #E1E1E1",
          maxHeight: "50px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }
      },
      X === "multiple" && /* @__PURE__ */ e.React.createElement("td", { style: { padding: "15px", alignItems: "center" } }, /* @__PURE__ */ e.React.createElement("div", null, /* @__PURE__ */ e.React.createElement(
        "input",
        {
          type: "checkbox",
          checked: B,
          onChange: (o) => {
            o.stopPropagation(), te(f, m);
          },
          style: {
            appearance: "none",
            width: "18px",
            height: "18px",
            borderRadius: "6px",
            border: `1px solid ${se}`,
            backgroundColor: B ? re : "transparent",
            transition: "all 0.2s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "static"
          }
        }
      ))),
      /* @__PURE__ */ e.React.createElement("td", { style: { padding: "5px", maxHeight: "50px", minWidth: "110px", maxWidth: "110px", textAlign: "center", alignItems: "center", position: "relative" } }, /* @__PURE__ */ e.React.createElement("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", height: "100%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" } }, /* @__PURE__ */ e.React.createElement(
        "a",
        {
          onClick: (o) => {
            o.stopPropagation(), L(f);
          },
          className: "text-black no-underline transition duration-200 ease-in-out hover:text-blue-600"
        },
        /* @__PURE__ */ e.React.createElement(P, { style: { fontSize: "20px" } })
      ))),
      F.map((o) => {
        const a = A.find((O) => O.columnName === o.accessor);
        if (!a)
          return console.warn(`Column not found for columnName: ${o.accessor}`), null;
        const p = `${f.key}-${o.accessor}`;
        let u = le(f[o.accessor], a.columnType, p);
        return /* @__PURE__ */ e.React.createElement("td", { key: p, className: "w-full", style: { padding: "5px 15px", minWidth: "160px", maxWidth: "160px", maxHeight: "50px", alignItems: "center", position: "relative" } }, a.columnType === "MultiSelect" && Array.isArray(u) ? /* @__PURE__ */ e.React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" } }, u == null ? void 0 : u.slice(0, 2).map((O, C) => /* @__PURE__ */ e.React.createElement("span", { key: C, style: {
          backgroundColor: "#E6F7FF",
          padding: "5px 10px",
          borderRadius: "4px",
          fontSize: "12px",
          color: "#333",
          border: "1px solid rgba(0,0,0,0.1)"
        } }, (O == null ? void 0 : O.title) ?? "N/A")), (u == null ? void 0 : u.length) > 2 && /* @__PURE__ */ e.React.createElement(
          z,
          {
            content: /* @__PURE__ */ e.React.createElement("div", { style: {
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              maxWidth: "200px",
              padding: "8px"
            } }, u == null ? void 0 : u.slice(2).map((O, C) => /* @__PURE__ */ e.React.createElement("span", { key: C, style: {
              backgroundColor: "#FFF7E6",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "12px",
              color: "#333",
              border: "1px solid rgba(0,0,0,0.1)"
            } }, (O == null ? void 0 : O.title) ?? "N/A"))),
            trigger: "hover",
            placement: "right"
          },
          /* @__PURE__ */ e.React.createElement("span", { style: {
            cursor: "pointer",
            color: "#888",
            fontSize: "12px",
            paddingLeft: "5px"
          } }, "+", u.length - 2, " more")
        )) : a.columnType === "Json" || a.columnType === "Text" ? /* @__PURE__ */ e.React.createElement(
          z,
          {
            content: () => s(u),
            trigger: "hover",
            placement: "right"
          },
          /* @__PURE__ */ e.React.createElement("span", { style: { cursor: "pointer", color: "#898585" } }, String(u).length > 15 ? String(u).substring(0, 15) + "..." : String(u))
        ) : u);
      })
    );
  }, (f, m) => !(f.isSelected !== m.isSelected || f.selectionType !== m.selectionType || f.checkboxAccentCol !== m.checkboxAccentCol || f.checkboxBorderColor !== m.checkboxBorderColor || f.selectionBg !== m.selectionBg || JSON.stringify(f.row) !== JSON.stringify(m.row) || JSON.stringify(f.columns) !== JSON.stringify(m.columns) || JSON.stringify(f.columnsState) !== JSON.stringify(m.columnsState) || JSON.stringify(f.style) !== JSON.stringify(m.style)));
  return { FilterComponent: Se, FilterGroup: V, RowComponent: he };
};
function bt(e) {
  const { ElementTypes: r, THEME: T, BaseComponent: x, BaseConfiguration: G, getDefaultProps: ee, useComponentContext: Se } = e;
  ze && ze(e);
  const oe = e.getPlatformHooks(), V = {
    ...oe,
    // platform injected deps
    ...k
  }, { React: he } = V, {
    useEffect: f,
    useState: m,
    useMemo: B,
    useRef: A,
    useCallback: F
  } = he, X = () => ({ ...oe, ...k }), { FilterComponent: te, FilterGroup: se, RowComponent: re } = pt(V), { useExecuteFlow: J, evaluateFormula: le } = V, L = mt(r, T, G, ee), ne = L.defaultProps, P = (o) => {
    const [a, p] = m(!1);
    f(() => {
      ut(() => e).then(() => p(!0));
    }, []);
    const { id: u, grid: O, properties: C, meta: U, updateProperties: N, onFxChange: v, ...c } = o;
    let { selectionBg: l, checkboxBorderColor: $, data: g = [], margin: E, border: xe, header_bg: ce, header_font_color: ye, checkbox_accent_col: we, onRowSelect: H, selected_row: q, selection_type: _, columns: y, primary_key: Re, border_radius: me, defaultSelected: Y, defaultSelectedFilter: Z } = { ...ne, ...C };
    const [S, pe] = m(null), [K, Ee] = m([]), { Drawer: We, Popover: ge, ArrowUpOutlined: Ge, ArrowDownOutlined: Je, AiOutlineCaretDown: Ue, AiOutlineCaretUp: Ie, FaFilter: Ae, TableList: Me, AutoSizer: He } = X() || {}, [qe, Te] = m(!1), [ve, De] = m(null), [w, Oe] = m([]), [gt, ft] = m(null), [Fe, Ke] = m(!0);
    let [I, Le] = m([{ accessor: "", header: "" }]);
    B(() => y, [y]);
    const ke = A(!1), [M, Be] = m(!1), Ce = F((t) => {
      var h;
      if (console.log("🔍 [Table] applyDefaultSelection called:", {
        defaultSelected: Y,
        tableDataLength: t.length,
        currentSelectedRow: !!S,
        defaultSelectionApplied: M,
        tableDataFirstKey: (h = t[0]) == null ? void 0 : h.key
      }), !Y || Y === "none" || t.length === 0) {
        console.log("🔍 [Table] Skipping default selection: no selection type or no data");
        return;
      }
      if (M || S) {
        console.log("🔍 [Table] Skipping default selection: already applied or row selected");
        return;
      }
      let n = null;
      switch (Y) {
        case "first":
          n = t[0], console.log("🎯 [Table] Selecting first row:", n == null ? void 0 : n.key);
          break;
        case "last":
          n = t[t.length - 1], console.log("🎯 [Table] Selecting last row:", n == null ? void 0 : n.key);
          break;
        case "filter":
          Z && typeof Z == "object" ? (n = t.find((b) => Object.entries(Z).every(([R, d]) => b[R] === void 0 ? !1 : typeof d == "string" && typeof b[R] == "string" ? b[R].toLowerCase().includes(d.toLowerCase()) : b[R] === d)) || null, console.log("🎯 [Table] Filter result:", n == null ? void 0 : n.key, "with filter:", Z)) : console.log("🔍 [Table] No valid filter provided for filter selection");
          break;
      }
      n ? (console.log("🎯 [Table] Applying default selection:", n), console.log("🎯 [Table] Before setting - selectedRow:", S, "selected_row prop:", q), pe(n), Be(!0), H == null || H(n), N(u, "selected_row", n), console.log("🎯 [Table] After setting - targetRow:", n)) : console.log("🔍 [Table] No target row found for default selection");
    }, [Y, Z, H, N, u, M]), [ie, $e] = m([]);
    f(() => {
      console.log("🔄 [Table] Default selection properties changed, resetting flag"), Be(!1);
    }, [Y, Z]), f(() => {
      w.length > 0 && !M && !S && (console.log("🔄 [Table] Properties changed, applying default selection"), setTimeout(() => Ce(w), 100));
    }, [Y, Z, w, M, Ce, S]), f(() => {
      if (console.log("🔄 [Table] Columns configuration changed:", {
        columnsLength: y == null ? void 0 : y.length,
        tableDataLength: w.length,
        columnNames: y == null ? void 0 : y.map((t) => t.columnName),
        currentColumnsState: I.map((t) => t.accessor)
      }), y && Array.isArray(y) && y.length > 0 && w.length > 0) {
        const t = y.map((i) => i.columnName), n = Object.keys(w[0] || {}).filter((i) => i !== "key" && i !== Re);
        console.log("🔍 [Table] Available data columns:", n), console.log("🔍 [Table] Ordered column names from config:", t);
        const h = t.filter((i) => n.includes(i)), b = n.filter((i) => !t.includes(i)), R = [...h, ...b];
        console.log("🔍 [Table] Final column order:", R);
        const d = R.map((i, W) => ({
          header: i,
          accessor: i,
          type: w[0]
        }));
        Le(d), console.log("🔄 [Table] Columns FORCE reordered:", {
          configOrder: t,
          finalOrder: d.map((i) => i.header),
          timestamp: Date.now()
        });
      }
    }, [y, w, Re]), f(() => {
      console.log("🔄 [Table] Selected row prop sync - selected_row:", q, "selectedRow:", S, "defaultSelectionApplied:", M), !M && q && JSON.stringify(q) !== JSON.stringify(S) ? (console.log("🔄 [Table] Syncing selected_row prop to internal state:", q), pe(q)) : !q && S && !M ? (console.log("🔄 [Table] Clearing selected row"), pe(null)) : console.log("🔄 [Table] No sync needed - conditions not met");
    }, [q, S, M]);
    const Ve = (t) => {
      De(t), Te(!0);
    }, Xe = () => {
      Te(!1), De(null);
    };
    g = g || [];
    const Ye = (t) => {
      if (typeof t == "number") return "Number";
      if (typeof t == "boolean") return "Boolean";
      if (typeof t == "string") {
        if (t.includes("@") && t.includes(".")) return "Email";
        if (t.startsWith("http://") || t.startsWith("https://")) return "Url";
        const n = Date.parse(t);
        if (!isNaN(n)) return "Date";
        try {
          const h = JSON.parse(t);
          if (Array.isArray(h)) return "MultiSelect";
          if (typeof h == "object" && h !== null) return "Json";
        } catch {
          return "Text";
        }
      }
      return Array.isArray(t) ? "MultiSelect" : typeof t == "object" && t !== null ? "Json" : "Text";
    }, [ue, Ze] = m({
      key: null,
      direction: null
    }), Qe = (t, n) => {
      Ze({ key: t, direction: n });
      const h = [...w].sort((b, R) => {
        const d = b[t] ?? "", i = R[t] ?? "";
        return typeof d == "number" && typeof i == "number" ? n === "asc" ? d - i : i - d : n === "asc" ? String(d).localeCompare(String(i)) : String(i).localeCompare(String(d));
      });
      Oe(h), $e(h);
    }, et = (t, n, h) => /* @__PURE__ */ e.React.createElement("div", { className: "rounded-sm w-full h-full flex flex-col gap-2 " }, /* @__PURE__ */ e.React.createElement(
      "button",
      {
        onClick: () => h(t.accessor, "asc"),
        className: `group w-full flex items-start flex-start p-[5px] rounded-md transition font-sans font-semibold tracking-wide 
                    ${n.key === t.accessor && n.direction === "asc" ? "bg-gray-200 text-black" : ""} 
                    group-bg-gray-200 hover:text-black`
      },
      /* @__PURE__ */ e.React.createElement(Ge, { className: `text-[17px] pr-2 transition  ${n.key === t.accessor && n.direction === "asc" ? "text-black" : "text-gray-400"} group-hover:text-black` }),
      /* @__PURE__ */ e.React.createElement("span", { className: "text-gray-600 group-hover:text-black" }, "Sort Ascending")
    ), /* @__PURE__ */ e.React.createElement(
      "button",
      {
        onClick: () => h(t.accessor, "desc"),
        className: `group w-full flex items-start  p-[5px] flex-start rounded-md transition font-sans font-semibold tracking-wide
                        ${n.key === t.accessor && n.direction === "desc" ? "bg-gray-200 text-black" : ""} 
                        group-bg-gray-200 hover:text-black`
      },
      /* @__PURE__ */ e.React.createElement(
        Je,
        {
          className: `text-[17px] transition pr-2
                            ${n.key === t.accessor && n.direction === "desc" ? "text-black" : "text-gray-400"} 
                            group-hover:text-black`
        }
      ),
      /* @__PURE__ */ e.React.createElement("span", { className: "text-gray-600 group-hover:text-black" }, "Sort Descending")
    )), tt = B(() => a ? (console.log("render 123= header"), /* @__PURE__ */ e.React.createElement("tr", { style: { backgroundColor: ce, color: ye } }, _ === "multiple" && /* @__PURE__ */ e.React.createElement("th", { style: { padding: "15px" } }, _ === "multiple" ? /* @__PURE__ */ e.React.createElement(
      "input",
      {
        type: "checkbox",
        checked: K.length === w.length && w.length > 0,
        onChange: (t) => {
          t.stopPropagation(), t.target.checked ? Ee([...w]) : Ee([]);
        },
        style: {
          appearance: "none",
          width: "18px",
          height: "18px",
          borderRadius: "6px",
          border: `1px solid ${$}`,
          // border: `2px solid ${checkbox_accent_col}`,
          backgroundColor: K.length === w.length && w.length > 0 ? we : "transparent",
          // Gray when checked
          transition: "all 0.2s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          visibility: K.length > 0 ? "visible" : "hidden"
        }
      }
    ) : null), /* @__PURE__ */ e.React.createElement("th", { style: { padding: "5px 15px", minWidth: "110px", maxWidth: "110px", textAlign: "start" } }, /* @__PURE__ */ e.React.createElement("span", { className: "font-sans font-semibold tracking-wide", style: { cursor: "pointer", fontSize: "medium", color: "#555870" } })), I.map((t) => /* @__PURE__ */ e.React.createElement("th", { key: t.accessor, style: { padding: "8px 15px", paddingLeft: "5px", minWidth: "160px", maxWidth: "160px", textAlign: "start" } }, /* @__PURE__ */ e.React.createElement("div", { className: "flex items-center justify-start h-7" }, /* @__PURE__ */ e.React.createElement("div", { className: "group hover:bg-gray-200 group-hover:text-black transition font-sans font-semibold tracking-wide rounded-md cursor-pointer flex items-center gap-2  px-2 h-full ", style: { fontSize: "medium", color: "#555870" } }, t.header, /* @__PURE__ */ e.React.createElement(
      ge,
      {
        content: et(t, ue, Qe),
        trigger: "click",
        placement: "bottom"
      },
      /* @__PURE__ */ e.React.createElement("div", { className: "flex flex-col items-center h-5" }, /* @__PURE__ */ e.React.createElement(Ie, { className: `text-[13px] ${ue.key === t.accessor && ue.direction === "asc" ? "text-black" : "text-gray-400"} group-hover:text-black` }), /* @__PURE__ */ e.React.createElement(Ue, { className: `text-[13px] ${ue.key === t.accessor && ue.direction === "desc" ? "text-black" : "text-gray-400"} group-hover:text-black` }))
    ))))))) : null, [w, K, _, a]), rt = F((t, n) => {
      const h = (b) => b ? new Date(b).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "";
      switch (n) {
        case "Email":
          return /* @__PURE__ */ e.React.createElement("a", { href: `mailto:${t}`, style: { color: "#2563EB" } }, t);
        case "Url":
          return /* @__PURE__ */ e.React.createElement("a", { href: t, target: "_blank", rel: "noopener noreferrer", style: { color: "#2563EB" } }, t);
        case "Number":
        case "Boolean":
          return /* @__PURE__ */ e.React.createElement("span", { style: { color: "#2563EB" } }, t);
        case "Date":
        case "DOB":
          return h(t);
        case "Json":
          try {
            const d = typeof t == "string" ? JSON.parse(t) : t;
            return JSON.stringify(d);
          } catch {
            return t;
          }
        case "Text":
          return t;
        case "MultiSelect":
          const b = ["#FFEFD5", "#FFDAB9", "#E6E6FA", "#D3F8E2", "#F5E6CC", "#D0E2FF", "#FFDFD3"], R = Array.isArray(t) ? t.map((d) => typeof d == "object" ? JSON.stringify(d) ?? "N/A" : d).filter((d) => typeof d == "string" && d.trim() !== "") : [];
          return R.length > 0 ? /* @__PURE__ */ e.React.createElement("div", { style: { display: "flex", flexWrap: "nowrap", gap: "5px", alignItems: "center" } }, R.slice(0, 2).map((d, i) => /* @__PURE__ */ e.React.createElement(
            ge,
            {
              content: /* @__PURE__ */ e.React.createElement("div", { key: i, style: {
                backgroundColor: b[i % b.length],
                padding: "2px 6px",
                borderRadius: "5px",
                fontSize: "12px",
                color: "black",
                fontWeight: "300",
                display: "inline-block"
              } }, d),
              trigger: "hover",
              placement: "top"
            },
            /* @__PURE__ */ e.React.createElement("div", { key: i, style: {
              backgroundColor: b[i % b.length],
              padding: "2px 6px",
              borderRadius: "5px",
              fontSize: "10px",
              color: "black",
              fontWeight: "300",
              display: "inline-block"
            } }, d.substring(0, 10) + "..")
          )), R.length > 1 && /* @__PURE__ */ e.React.createElement(
            ge,
            {
              content: /* @__PURE__ */ e.React.createElement("div", { style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
                gap: "4px",
                maxWidth: "220px",
                background: "white",
                borderRadius: "8px"
              } }, R.slice(2).map((d, i) => /* @__PURE__ */ e.React.createElement("div", { key: i, style: {
                backgroundColor: b[(i + 2) % b.length],
                // Keep color pattern
                padding: "3px 5px",
                borderRadius: "6px",
                fontSize: "14px",
                color: "black",
                fontWeight: "300",
                textAlign: "center"
              } }, d))),
              trigger: "hover",
              placement: "top"
            },
            /* @__PURE__ */ e.React.createElement("div", { style: {
              cursor: "pointer",
              color: "#888",
              fontSize: "12px",
              paddingLeft: "5px"
            } }, "+", R.length - 2)
          )) : "N/A";
        // Default fallback when value is empty or not an array
        default:
          return t;
      }
    }, []), je = F((t, n) => rt(t, n), [y]), lt = F((t, n) => {
      console.log("Row clicked:", t, "Current selectedRow:", S), _ === "single" ? (!S || S.key !== t.key) && (console.log("Updating selected row to:", t), pe(t), H == null || H(t), N(u, "selected_row", t)) : _ === "multiple" && Ee((h) => {
        const b = t.key;
        if (new Set(h.map((d) => d.key)).has(b)) {
          const d = h.filter((i) => i.key !== b);
          return N(u, "selected_rows", d), d;
        } else {
          const d = [...h, t];
          return N(u, "selected_rows", d), d;
        }
      });
    }, [_, u, H, N, S]), nt = ({ index: t, style: n }) => {
      const h = w[t], b = _ === "single" ? (S == null ? void 0 : S.key) === h.key : K.some((R) => R.key === h.key);
      return (
        // <div style={{ ...style, display: 'table-row' }} key={`${row.key || index}-${JSON.stringify(columns)}`}>
        /* @__PURE__ */ e.React.createElement(
          re,
          {
            row: h,
            index: t,
            isSelected: b,
            columns: y,
            columnsState: I,
            selectionType: _,
            handleRowClick: lt,
            checkboxBorderColor: $,
            checkboxAccentCol: we,
            selectionBg: l,
            renderCell: je,
            showDrawer: Ve,
            style: n
          }
        )
      );
    }, at = B(() => a ? !Array.isArray(w) || w.length === 0 ? /* @__PURE__ */ e.React.createElement("tr", { style: { maxHeight: "50px" } }, /* @__PURE__ */ e.React.createElement("td", { colSpan: I.length + (_ ? 1 : 0) }, "No data found")) : (console.log("render 123= renderBody"), /* @__PURE__ */ e.React.createElement(He, null, ({ height: t, width: n }) => /* @__PURE__ */ e.React.createElement(
      Me,
      {
        width: n,
        height: t,
        itemCount: w.length,
        itemSize: 50
      },
      ({ index: h, style: b }) => /* @__PURE__ */ e.React.createElement(nt, { index: h, style: b })
    ))) : null, [w, S, K, _, y, $, we, l, a]), ot = {
      id: u,
      properties: C,
      meta: U,
      EditProperties: z,
      updateProperties: N,
      grid: O,
      Configuration: j
    };
    f(() => {
      var h;
      if (console.log("🔍 [Table] useEffect triggered with data:", {
        hasData: !!g,
        dataLength: (g == null ? void 0 : g.length) || "N/A",
        dataKeys: g && g.length > 0 ? Object.keys(g[0]) : "N/A",
        tableHasRunOnce: ke.current,
        dataStringified: ((h = JSON.stringify(g)) == null ? void 0 : h.substring(0, 100)) + "..."
      }), ke.current && JSON.stringify(g) === JSON.stringify(ie)) {
        console.log("🔍 [Table] Skipping update - data unchanged");
        return;
      }
      ke.current = !0;
      const t = performance.now();
      async function n() {
        console.log("render 123 table");
        const b = g.length > 0 ? Object.keys(g[0]) : [], R = b.find((i) => i.toLowerCase().includes("id")) || b.find((i) => i.toLowerCase().includes("_id")) || b[0];
        if (console.log("Primary Key Determined:", R), z[2].elements[0] = {
          label: "primary_key",
          name: "primary_key",
          type: r.SELECT(b, R),
          width: 24
        }, g && Object.keys(g).length > 0) {
          const i = Object.values(g).map((W) => ({
            ...W,
            key: W[R]
            // Set its value as the key
          }));
          performance.now(), Oe(() => i), $e(() => i), setTimeout(() => {
            S ? console.log("🔍 [Table] Skipping default selection - row already selected") : Ce(i);
          }, 100), N(u, "value", g), N(u, "data", g);
        }
        if (Ke(!1), console.log("evaluatedvalue===", g), g.length > 0) {
          const i = Object.keys(g[0]).filter((D) => D !== "key" && D !== Re);
          console.log("📊 [Table] Data useEffect - Available data columns:", i), console.log("📊 [Table] Data useEffect - Current columns config:", y == null ? void 0 : y.map((D) => D.columnName)), console.log("📊 [Table] Data useEffect - Current columnsState:", I.map((D) => D.accessor));
          let W = i;
          if (y && Array.isArray(y) && y.length > 0) {
            const D = y.map((ae) => ae.columnName).filter((ae) => i.includes(ae)), Q = i.filter(
              (ae) => !y.some((it) => it.columnName === ae)
            );
            W = [...D, ...Q], console.log("📊 [Table] Data useEffect - Ordered columns from config:", W);
          }
          const de = I.map((D) => D.accessor).filter(Boolean), Ne = W, fe = I.length === 0 || I[0].accessor === "";
          if (console.log("📊 [Table] Data useEffect - Update decision:", {
            currentColumnOrder: de,
            expectedOrder: Ne,
            isUninitialized: fe,
            willUpdate: fe,
            skipReason: fe ? "none" : "columns already initialized"
          }), fe) {
            const D = W.map((Q, ae) => ({
              header: Q,
              accessor: Q,
              type: g[0]
            }));
            Le(() => D), console.log("🔄 [Table] Columns INITIALIZED from data:", D.map((Q) => Q.header));
          }
          const ct = W.map((D, Q) => ({
            columnName: D,
            columnType: Ye(g[0][D]) || "Text"
          }));
          N(u, "columns", [...ct]);
        }
        const d = performance.now();
        console.log(`Total useEffect execution time: ${(d - t).toFixed(2)} ms`);
      }
      console.log("table rerender"), n();
    }, [g]), f(() => {
      console.log("render 123 columns");
    }, [y]);
    let st = w && ie && Array.isArray(w) && Array.isArray(ie) && w.length !== ie.length;
    return a ? /* @__PURE__ */ e.React.createElement(
      x,
      {
        ...ot,
        style: {
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }
      },
      /* @__PURE__ */ e.React.createElement(
        "div",
        {
          className: "tableWrap",
          style: {
            flex: "1 1 auto",
            overflowY: "auto",
            overflowX: "auto",
            maxHeight: "100%",
            margin: `${E[0]} ${E[1]} 0 ${E[3]}`,
            // marginBottom: selectedRows.length > 0 ? 0 : margin[2],
            borderRadius: `${me[0]} ${me[1]} 0 0`
            // paddingBottom: '40px', // Add padding equal to the height of the bottom div
          }
        },
        /* @__PURE__ */ e.React.createElement(
          "table",
          {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              height: "100%",
              maxHeight: "100%"
            }
          },
          Fe ? /* @__PURE__ */ e.React.createElement("div", { className: "flex items-center justify-center h-full w-full" }, /* @__PURE__ */ e.React.createElement("img", { style: { height: "15%", width: "15%" }, src: "/images/loading.gif", alt: "loading..." })) : /* @__PURE__ */ e.React.createElement(e.React.Fragment, null, /* @__PURE__ */ e.React.createElement("thead", null, tt), /* @__PURE__ */ e.React.createElement("tbody", null, at))
        )
      ),
      /* @__PURE__ */ e.React.createElement(
        "div",
        {
          className: "relative flex items-center  bg-gray-100  rounded-b-lg",
          style: {
            flex: "0 0 auto",
            margin: `0 ${E[1]} ${E[2]} ${E[3]}`,
            borderRadius: `0 0 ${me[2]} ${me[3]}`,
            width: `calc(100% - (${E[1]} + ${E[3]}))`,
            padding: "10px"
          }
        },
        /* @__PURE__ */ e.React.createElement("span", { className: "absolute left-1/2 transform -translate-x-1/2 text-gray-600" }, K.length > 0 ? `${K.length} out of ${w.length} selected` : `${w.length} Results`),
        !Fe && /* @__PURE__ */ e.React.createElement(
          ge,
          {
            trigger: "click",
            placement: "bottom",
            content: /* @__PURE__ */ e.React.createElement(te, { columns: y, tableData: w, originalData: ie, setTableData: Oe })
          },
          st ? /* @__PURE__ */ e.React.createElement(Ae, { className: "ml-auto text-blue-400 text-sm cursor-pointer hover:text-blue-800" }) : /* @__PURE__ */ e.React.createElement(Ae, { className: "ml-auto text-gray-400 text-sm cursor-pointer hover:text-gray-800" })
        )
      ),
      /* @__PURE__ */ e.React.createElement(We, { title: "User Profile", width: 840, placement: "right", onClose: Xe, open: qe }, ve ? /* @__PURE__ */ e.React.createElement("div", { style: { padding: "8px" } }, I.map(({ header: t, accessor: n }, h) => {
        let b = ve[n];
        const R = (d) => {
          if (typeof d == "object" && d !== null)
            return Object.entries(d).map(([de, Ne]) => `${de}: ${R(Ne)}`).join(", ");
          let i = y.find((de) => de.columnName === n);
          return i || console.warn(`Column not found for columnName: ${n}`), `${h}${i.accessor}`, je(d, i.columnType);
        };
        return /* @__PURE__ */ e.React.createElement("div", { key: n, style: { marginBottom: "0px", padding: "5px" } }, n === "image" ? /* @__PURE__ */ e.React.createElement("div", null, /* @__PURE__ */ e.React.createElement("strong", null, t), /* @__PURE__ */ e.React.createElement("br", null), /* @__PURE__ */ e.React.createElement(
          "img",
          {
            src: b,
            alt: "Profile",
            style: { width: "100px", borderRadius: "8px", marginTop: "5px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }
          }
        )) : /* @__PURE__ */ e.React.createElement("p", { style: { margin: "0" } }, /* @__PURE__ */ e.React.createElement("strong", { style: { display: "block", marginBottom: "5px" } }, t), /* @__PURE__ */ e.React.createElement("p", { style: { color: "#898585" } }, R(b))), /* @__PURE__ */ e.React.createElement("hr", { style: { border: "1px solid #f7f7f7", margin: "8px 0" } }));
      })) : /* @__PURE__ */ e.React.createElement("p", { style: { padding: "16px" } }, "No profile data")),
      /* @__PURE__ */ e.React.createElement("style", null, `


                .tableWrap {
                    height: 100%;
                    border: ${xe};
                    overflow: auto;
                }
                
                tbody{
                max-height:100%
                display: block
                }
        
                thead tr {
                    background-color: ${ce};
                    color: ${ye};
                    
                }
                
            tbody td{
            td {
                height: 8px; 
                overflow: hidden; 
                padding: 0; 
                white-space: nowrap;
                }
            }
        
                thead tr th {
                    padding: 10px;
                    border-bottom: 2px solid #ddd;
                    position: sticky;
                    top: 0;
                }
                
                tbody tr td {
                padding:10px
                }
        
                table {
                    border-collapse: collapse;
                }
        
                th {
                    padding: 16px;
                    border-bottom: 1px solid #e8e8e8;
                    background: ${ce};
                    color: ${ye};
                    box-shadow: 0px 0px 0 2px #e8e8e8;
                }
            `)
    ) : null;
  }, z = _e(r, T), j = Pe(G);
  return P.EditProperties = z, P.PropsList = Object.keys(z), P.properties = ee(z), P.Configuration = j, {
    component: (o) => /* @__PURE__ */ e.React.createElement(
      P,
      {
        ...o,
        EditProperties: L.EditProperties,
        Configuration: L.Configuration
      }
    ),
    manifest: L
  };
}
export {
  bt as createComponent,
  k as runtimeDeps
};
