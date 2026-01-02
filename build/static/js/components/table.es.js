const O = {};
function mt(e) {
  Object.assign(O, e);
}
let he = null;
function pt(e) {
  return he || (he = (async () => {
    const n = (e == null ? void 0 : e()) ?? null, D = typeof window < "u" && !n;
    if (n != null && n.React)
      Object.assign(O, {
        React: n.React,
        useState: n.React.useState,
        useEffect: n.React.useEffect,
        useMemo: n.React.useMemo,
        useRef: n.React.useRef,
        useCallback: n.React.useCallback
      });
    else if (!D) {
      const h = await import("react");
      Object.assign(O, {
        React: h.default || h,
        useState: h.useState,
        useEffect: h.useEffect,
        useMemo: h.useMemo,
        useRef: h.useRef,
        useCallback: h.useCallback
      });
    }
    if (n != null && n.antd)
      Object.assign(O, {
        Drawer: n.antd.Drawer,
        Popover: n.antd.Popover
      });
    else if (!D) {
      const { Drawer: h, Popover: I } = await import("antd");
      Object.assign(O, { Drawer: h, Popover: I });
    }
    if (n != null && n.icons)
      Object.assign(O, {
        ArrowUpOutlined: n.icons.ArrowUpOutlined,
        ArrowDownOutlined: n.icons.ArrowDownOutlined,
        PlusOutlined: n.icons.PlusOutlined
      });
    else if (!D && !O.ArrowUpOutlined) {
      const h = await import("@ant-design/icons");
      Object.assign(O, {
        ArrowUpOutlined: h.ArrowUpOutlined,
        ArrowDownOutlined: h.ArrowDownOutlined,
        PlusOutlined: h.PlusOutlined
      });
    }
    if (n != null && n.AiIcons)
      Object.assign(O, {
        AiOutlineCaretDown: n.AiIcons.AiOutlineCaretDown,
        AiOutlineCaretUp: n.AiIcons.AiOutlineCaretUp,
        AiOutlineCompress: n.AiIcons.AiOutlineCompress
      });
    else if (!D && !O.AiOutlineCaretDown) {
      const h = await import("react-icons/ai");
      Object.assign(O, {
        AiOutlineCaretDown: h.AiOutlineCaretDown,
        AiOutlineCaretUp: h.AiOutlineCaretUp,
        AiOutlineCompress: h.AiOutlineCompress
      });
    }
    if (n != null && n.FaIcons)
      Object.assign(O, {
        FaFilter: n.FaIcons.FaFilter
      });
    else if (!D && !O.FaFilter) {
      const h = await import("react-icons/fa");
      Object.assign(O, {
        FaFilter: h.FaFilter
      });
    }
    if (n != null && n.TableList)
      Object.assign(O, {
        TableList: n.TableList
      });
    else if (!D && !O.TableList) {
      const { FixedSizeList: h } = await import("react-window");
      Object.assign(O, {
        TableList: h
      });
    }
    if (n != null && n.AutoSizer)
      Object.assign(O, {
        AutoSizer: n.AutoSizer
      });
    else if (!D && !O.AutoSizer) {
      const h = await import("react-virtualized-auto-sizer");
      Object.assign(O, {
        AutoSizer: h.default || h
      });
    }
    return O;
  })(), he);
}
const je = (e) => ({
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
}), ze = (e, n) => [
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
          columnType: e.SELECT(["Text", "Number", "Boolean", "Url", "Email", "Json", "MultiSelect", "SingleSelect", "Image"], "Text")
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
        themePropertyName: n.backgroundColor,
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
], st = (e) => ({
  border: e.borderColor
});
function ct(e, n, D, h) {
  const I = ze(e, n);
  return {
    name: "Table",
    EditProperties: I,
    Configuration: je(D),
    ThemeMapping: st(n),
    defaultProps: h(I)
  };
}
const it = (e) => {
  const { React: n } = e;
  if (!n) return { FilterComponent: () => null, FilterGroup: () => null, RowComponent: () => null };
  const D = n.useState, h = n.useRef, I = n.useEffect, te = () => O, Ne = ({
    columns: f,
    tableData: u,
    originalData: L,
    setTableData: A
  }) => {
    const { Drawer: v, Popover: Y, PlusOutlined: re, AiOutlineCaretDown: se, AiOutlineCaretUp: le, AiOutlineCompress: G, FaFilter: ne, TableList: F, AutoSizer: ae } = te(), [z, $] = D(u);
    let B = f[0].columnType;
    const [s, o] = D([
      {
        id: "group1",
        filters: [{ column: B, operator: "", value: "" }],
        logicalOperator: "And",
        subGroups: []
      }
    ]), [l, m] = D([
      {
        id: "group1",
        filters: [{ column: B, operator: "", value: "" }],
        logicalOperator: "And",
        subGroups: []
      }
    ]), p = (k, c) => !c || c.length === 0 ? k : c.reduce((r, N) => E(r, N), k), E = (k, c) => {
      let r = [...k];
      return c.filters.length > 0 && (c.logicalOperator === "And" ? r = r.filter(
        (N) => c.filters.every((j) => y(N, j))
      ) : c.logicalOperator === "Or" && (r = r.filter(
        (N) => c.filters.some((j) => y(N, j))
      ))), c.subGroups && c.subGroups.length > 0 && (c.logicalOperator === "And" ? r = c.subGroups.reduce(
        (N, j) => E(N, j),
        r
      ) : c.logicalOperator === "Or" && (r = c.subGroups.map(
        (j) => E(k, j)
      ).flat())), r;
    }, y = (k, c) => {
      let r = k[c.column];
      if (!c.operator || !c.column) return !0;
      const { column: N, operator: j, value: C } = c;
      switch (j) {
        case "includes":
          return String(r).includes(String(C));
        case "notIncludes":
          return !String(r).includes(String(C));
        case "is":
          return String(r) === String(C);
        case "isNot":
          return String(r) !== String(C);
        case "isEmpty":
          return r == null || r === "";
        case "isNotEmpty":
          return r != null && r !== "";
        case "equalTo":
          return Number(r) === Number(C);
        case "notEqualTo":
          return Number(r) !== Number(C);
        case "lessThan":
          return Number(r) < Number(C);
        case "greaterThan":
          return Number(r) > Number(C);
        case "lessThanEqual":
          return Number(r) <= Number(C);
        case "greaterThanEqual":
          return Number(r) >= Number(C);
        case "between":
          let ce = C.split(",")[0], ie = C.split(",")[1];
          return Number(r) >= Number(ce) && Number(r) <= Number(ie);
        case "true":
          return r === !0;
        case "false":
          return r === !1;
        case "is":
          return new Date(r).getTime() === new Date(C).getTime();
        case "isNot":
          return new Date(r).getTime() !== new Date(C).getTime();
        case "isBefore":
          return new Date(r).getTime() < new Date(C).getTime();
        case "isAfter":
          return new Date(r).getTime() > new Date(C).getTime();
        case "isEmpty":
          return r == null;
        case "isNotEmpty":
          return r != null;
        default:
          return !1;
      }
    }, M = () => {
      console.log("group filter", s);
      let k = p(L, s);
      A(k);
    }, H = () => {
      o([
        {
          id: "group1",
          filters: [{ column: B, operator: "", value: "" }],
          logicalOperator: "And",
          subGroups: []
        }
      ]), A(L);
    };
    return /* @__PURE__ */ e.React.createElement(
      "div",
      {
        className: "border-none p-0 rounded-md w-full bg-white",
        style: { width: "650px" }
      },
      /* @__PURE__ */ e.React.createElement(
        X,
        {
          filterGroups: s,
          setFilterGroups: o,
          firstColumn: B,
          columns: f,
          originalFilterGroup: l
        }
      ),
      /* @__PURE__ */ e.React.createElement("div", { className: "flex justify-end mt-4 gap-2" }, /* @__PURE__ */ e.React.createElement(
        "button",
        {
          onClick: M,
          className: "px-4 py-1 bg-blue-500 text-sm text-white rounded-md hover:bg-blue-600 transition"
        },
        "Apply Filter"
      ), /* @__PURE__ */ e.React.createElement(
        "button",
        {
          onClick: H,
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
  }, X = function({ filterGroups: f, setFilterGroups: u, firstColumn: L, columns: A, originalFilterGroup: v, parentGroupId: Y, parentLogicalOperator: re }) {
    const { Popover: se, PlusOutlined: le } = te(), G = (s, o, l, m, p) => {
      var M, H, k, c;
      const E = [...v], y = F(E, s);
      if (y) {
        if (p) {
          const r = ((M = y.filters[o].value) == null ? void 0 : M.split(",")) || ["", ""];
          l === "from" ? r[0] = m : l === "to" && (r[1] = m, console.log("between in handle", r)), y.filters[o].value = r.join(",");
        } else
          y.filters[o][l] = m;
        if (l === "column") {
          let r = ((H = A[m]) == null ? void 0 : H.columnType) || "string";
          (r === "Url" || r === "Email" || r === "Url" || r === "Json") && (r = "Text"), y.filters[o].operator = ((c = (k = oe[r]) == null ? void 0 : k[0]) == null ? void 0 : c.name) || "", y.filters[o].value = "";
        }
        u(E);
      }
    }, ne = (s, o) => {
      const l = [...v], m = F(l, s);
      m && (m.logicalOperator = o, u(l));
    }, F = (s, o) => {
      for (const l of s) {
        if (l.id === o) return l;
        if (l.subGroups) {
          const m = F(l.subGroups, o);
          if (m) return m;
        }
      }
      return null;
    }, ae = (s) => {
      var m;
      const l = { id: `group${Date.now()}`, filters: [{ column: L, operator: "", value: "" }], logicalOperator: "And", subGroups: [] };
      if (s) {
        const p = [...v], E = F(p, s);
        E && ((m = E.subGroups) == null || m.push(l)), u(p);
      } else
        console.log("filterGroups not parentGroup", [...f, l]), u([...f, l]);
      console.log("filterGroups updated", f);
    }, z = (s) => {
      var o;
      if (Y) {
        let l = [...v];
        const m = F(l, Y);
        m && (m.subGroups = (o = m.subGroups) == null ? void 0 : o.filter((p) => p.id !== s)), u(l);
      } else
        u(f.filter((l) => l.id !== s));
    }, $ = (s) => {
      var p;
      const o = { column: "", operator: "", value: "" }, l = [...v], m = F(l, s);
      m && ((p = m == null ? void 0 : m.filters) == null || p.push(o)), u(l);
    }, B = (s, o) => {
      let l = [...v], m = F(l, s);
      m && m.filters.splice(o, 1), u(l);
    };
    return /* @__PURE__ */ e.React.createElement("div", null, f.map((s) => /* @__PURE__ */ e.React.createElement("div", { key: s.id, className: " mb-4 p-4" }, /* @__PURE__ */ e.React.createElement("div", { className: "flex justify-between mb-2" }, /* @__PURE__ */ e.React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ e.React.createElement("div", { className: "flex items-center gap-0 mt-2 border rounded-sm" }, /* @__PURE__ */ e.React.createElement(
      "button",
      {
        onClick: () => ne(s.id, s.logicalOperator === "And" ? "Or" : "And"),
        className: `px-2 text-xs  py-1 ${s.logicalOperator === "And" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`
      },
      "AND"
    ), /* @__PURE__ */ e.React.createElement(
      "button",
      {
        onClick: () => ne(s.id, s.logicalOperator === "Or" ? "And" : "Or"),
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
            onClick: () => $(s.id)
          },
          "Add Filter"
        ), /* @__PURE__ */ e.React.createElement(
          "button",
          {
            className: "text-left px-4 py-2 hover:bg-gray-100 w-full",
            onClick: () => ae(s.id)
          },
          "Add Filter Group"
        ))
      },
      /* @__PURE__ */ e.React.createElement("span", { className: "m-4 ml-0 cursor-pointer " }, /* @__PURE__ */ e.React.createElement(le, { className: "mt-2 ml-1 text-gray-400", style: { fontSize: "25px" } }))
    )), /* @__PURE__ */ e.React.createElement("button", { onClick: () => z(s.id), className: "text-gray-600 font-semibold" }, "✕")), s.filters.map((o, l) => {
      var m, p, E, y, M, H, k;
      return /* @__PURE__ */ e.React.createElement("div", { key: l, className: "flex items-center gap-2 mb-2", style: { marginLeft: `${l === 0 ? `${s.logicalOperator === "And" ? "33px" : "23px"}` : 0}` } }, l > 0 && /* @__PURE__ */ e.React.createElement("div", null, /* @__PURE__ */ e.React.createElement("h1", null, s.logicalOperator)), /* @__PURE__ */ e.React.createElement("div", { className: "flex-1 ", style: { maxWidth: "30%" } }, /* @__PURE__ */ e.React.createElement(
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
          onChange: (c) => G(s.id, l, "column", c.target.value),
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
          onChange: (c) => G(s.id, l, "operator", c.target.value),
          className: "border rounded px-3 py-1 w-full text-gray-600"
        },
        (p = oe[(m = A.find((c) => c.columnName === o.column)) == null ? void 0 : m.columnType]) == null ? void 0 : p.map((c) => /* @__PURE__ */ e.React.createElement("option", { key: c.name, value: c.name }, c.label))
      )), /* @__PURE__ */ e.React.createElement("div", { className: "flex-1 shrink-1", style: { maxWidth: "32%" } }, o.column && ((E = A.find((c) => c.columnName === o.column)) == null ? void 0 : E.columnType) !== "Boolean" && (o.operator === "between" ? /* @__PURE__ */ e.React.createElement("div", { className: "flex gap-2 " }, /* @__PURE__ */ e.React.createElement(
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
          value: ((y = o.value) == null ? void 0 : y.split(",")[0]) || "",
          onChange: (c) => G(s.id, l, "from", c.target.value, !0)
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
          value: ((M = o.value) == null ? void 0 : M.split(",")[1]) || "",
          onChange: (c) => G(s.id, l, "to", c.target.value, !0),
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
          type: ((H = A[o.column]) == null ? void 0 : H.columnType) === "Date" ? "date" : "text",
          value: o.value || "",
          onChange: (c) => G(s.id, l, "value", c.target.value),
          placeholder: ((k = A[o.column]) == null ? void 0 : k.columnType) === "Date" ? "MMM D, YYYY" : "Filter Value"
        }
      ))), /* @__PURE__ */ e.React.createElement("button", { onClick: () => B(s.id, l), className: "text-gray-600 ml-auto ", style: { fontSize: "medium" } }, "✕"));
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
            X,
            {
              filterGroups: s.subGroups,
              setFilterGroups: u,
              firstColumn: L,
              columns: A,
              originalFilterGroup: v,
              parentGroupId: s.id,
              parentLogicalOperator: s.logicalOperator
            }
          )
        )
      )
    ))));
  }, xe = n.memo(({
    row: f,
    index: u,
    isSelected: L,
    columns: A,
    columnsState: v,
    selectionType: Y,
    handleRowClick: re,
    checkboxBorderColor: se,
    checkboxAccentCol: le,
    selectionBg: G,
    renderCell: ne,
    showDrawer: F,
    style: ae
  }) => {
    const { AiOutlineCompress: z, Popover: $ } = te();
    let B = h(!1);
    const s = (o) => /* @__PURE__ */ e.React.createElement("div", { style: { maxWidth: "300px", maxHeight: "200px", overflow: "auto" } }, /* @__PURE__ */ e.React.createElement("pre", null, o), " ");
    return I(() => {
      B.current || (B.current = !0);
    }, [A]), /* @__PURE__ */ e.React.createElement(
      "tr",
      {
        key: f.key || u,
        onClick: (o) => {
          o.target.type !== "checkbox" && re(f, u);
        },
        style: {
          ...ae,
          backgroundColor: L ? G : "transparent",
          cursor: "pointer",
          borderBottom: "1px solid #E1E1E1",
          maxHeight: "50px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }
      },
      Y === "multiple" && /* @__PURE__ */ e.React.createElement("td", { style: { padding: "15px", alignItems: "center" } }, /* @__PURE__ */ e.React.createElement("div", null, /* @__PURE__ */ e.React.createElement(
        "input",
        {
          type: "checkbox",
          checked: L,
          onChange: (o) => {
            o.stopPropagation(), re(f, u);
          },
          style: {
            appearance: "none",
            width: "18px",
            height: "18px",
            borderRadius: "6px",
            border: `1px solid ${se}`,
            backgroundColor: L ? le : "transparent",
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
            o.stopPropagation(), F(f);
          },
          className: "text-black no-underline transition duration-200 ease-in-out hover:text-blue-600"
        },
        /* @__PURE__ */ e.React.createElement(z, { style: { fontSize: "20px" } })
      ))),
      v.map((o) => {
        const l = A.find((E) => E.columnName === o.accessor);
        if (!l)
          return console.warn(`Column not found for columnName: ${o.accessor}`), null;
        const m = `${f.key}-${o.accessor}`;
        let p = ne(f[o.accessor], l.columnType, m);
        return /* @__PURE__ */ e.React.createElement("td", { key: m, className: "w-full", style: { padding: "5px 15px", minWidth: "160px", maxWidth: "160px", maxHeight: "50px", alignItems: "center", position: "relative" } }, l.columnType === "MultiSelect" && Array.isArray(p) ? /* @__PURE__ */ e.React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" } }, p == null ? void 0 : p.slice(0, 2).map((E, y) => /* @__PURE__ */ e.React.createElement("span", { key: y, style: {
          backgroundColor: "#E6F7FF",
          padding: "5px 10px",
          borderRadius: "4px",
          fontSize: "12px",
          color: "#333",
          border: "1px solid rgba(0,0,0,0.1)"
        } }, (E == null ? void 0 : E.title) ?? "N/A")), (p == null ? void 0 : p.length) > 2 && /* @__PURE__ */ e.React.createElement(
          $,
          {
            content: /* @__PURE__ */ e.React.createElement("div", { style: {
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              maxWidth: "200px",
              padding: "8px"
            } }, p == null ? void 0 : p.slice(2).map((E, y) => /* @__PURE__ */ e.React.createElement("span", { key: y, style: {
              backgroundColor: "#FFF7E6",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "12px",
              color: "#333",
              border: "1px solid rgba(0,0,0,0.1)"
            } }, (E == null ? void 0 : E.title) ?? "N/A"))),
            trigger: "hover",
            placement: "right"
          },
          /* @__PURE__ */ e.React.createElement("span", { style: {
            cursor: "pointer",
            color: "#888",
            fontSize: "12px",
            paddingLeft: "5px"
          } }, "+", p.length - 2, " more")
        )) : l.columnType === "Json" || l.columnType === "Text" ? /* @__PURE__ */ e.React.createElement(
          $,
          {
            content: () => s(p),
            trigger: "hover",
            placement: "right"
          },
          /* @__PURE__ */ e.React.createElement("span", { style: { cursor: "pointer", color: "#898585" } }, String(p).length > 15 ? String(p).substring(0, 15) + "..." : String(p))
        ) : p);
      })
    );
  }, (f, u) => !(f.isSelected !== u.isSelected || f.selectionType !== u.selectionType || f.checkboxAccentCol !== u.checkboxAccentCol || f.checkboxBorderColor !== u.checkboxBorderColor || f.selectionBg !== u.selectionBg || JSON.stringify(f.row) !== JSON.stringify(u.row) || JSON.stringify(f.columns) !== JSON.stringify(u.columns) || JSON.stringify(f.columnsState) !== JSON.stringify(u.columnsState) || JSON.stringify(f.style) !== JSON.stringify(u.style)));
  return { FilterComponent: Ne, FilterGroup: X, RowComponent: xe };
};
function gt(e) {
  const { ElementTypes: n, THEME: D, BaseComponent: h, BaseConfiguration: I, getDefaultProps: te, useComponentContext: Ne } = e, oe = e.getPlatformHooks(), X = {
    ...oe,
    // platform injected deps
    ...O
  }, { React: xe } = X, {
    useEffect: f,
    useState: u,
    useMemo: L,
    useRef: A,
    useCallback: v
  } = xe, Y = () => ({ ...oe, ...O }), { FilterComponent: re, FilterGroup: se, RowComponent: le } = it(X), { useExecuteFlow: G, evaluateFormula: ne } = X, F = ct(n, D, I, te), ae = F.defaultProps, z = (o) => {
    const { id: l, grid: m, properties: p, meta: E, updateProperties: y, onFxChange: M, ...H } = o;
    let { selectionBg: k, checkboxBorderColor: c, data: r = [], margin: N, border: j, header_bg: C, header_font_color: ce, checkbox_accent_col: ie, onRowSelect: q, selected_row: K, selection_type: W, columns: x, primary_key: ye, border_radius: pe, defaultSelected: Z, defaultSelectedFilter: Q } = { ...ae, ...p };
    const [S, ge] = u(null), [V, we] = u([]), { Drawer: We, Popover: fe, ArrowUpOutlined: Pe, ArrowDownOutlined: _e, AiOutlineCaretDown: Ie, AiOutlineCaretUp: Ge, FaFilter: Se, TableList: Je, AutoSizer: Ue } = Y() || {}, [Me, Ae] = u(!1), [Te, De] = u(null), [w, Re] = u([]), [dt, ut] = u(null), [ve, He] = u(!0);
    let [J, Fe] = u([{ accessor: "", header: "" }]);
    L(() => x, [x]);
    const Ee = A(!1), [U, Le] = u(!1), Oe = v((t) => {
      var b;
      if (console.log("🔍 [Table] applyDefaultSelection called:", {
        defaultSelected: Z,
        tableDataLength: t.length,
        currentSelectedRow: !!S,
        defaultSelectionApplied: U,
        tableDataFirstKey: (b = t[0]) == null ? void 0 : b.key
      }), !Z || Z === "none" || t.length === 0) {
        console.log("🔍 [Table] Skipping default selection: no selection type or no data");
        return;
      }
      if (U || S) {
        console.log("🔍 [Table] Skipping default selection: already applied or row selected");
        return;
      }
      let a = null;
      switch (Z) {
        case "first":
          a = t[0], console.log("🎯 [Table] Selecting first row:", a == null ? void 0 : a.key);
          break;
        case "last":
          a = t[t.length - 1], console.log("🎯 [Table] Selecting last row:", a == null ? void 0 : a.key);
          break;
        case "filter":
          Q && typeof Q == "object" ? (a = t.find((g) => Object.entries(Q).every(([R, d]) => g[R] === void 0 ? !1 : typeof d == "string" && typeof g[R] == "string" ? g[R].toLowerCase().includes(d.toLowerCase()) : g[R] === d)) || null, console.log("🎯 [Table] Filter result:", a == null ? void 0 : a.key, "with filter:", Q)) : console.log("🔍 [Table] No valid filter provided for filter selection");
          break;
      }
      a ? (console.log("🎯 [Table] Applying default selection:", a), console.log("🎯 [Table] Before setting - selectedRow:", S, "selected_row prop:", K), ge(a), Le(!0), q == null || q(a), y(l, "selected_row", a), console.log("🎯 [Table] After setting - targetRow:", a)) : console.log("🔍 [Table] No target row found for default selection");
    }, [Z, Q, q, y, l, U]), [de, Be] = u([]);
    f(() => {
      console.log("🔄 [Table] Default selection properties changed, resetting flag"), Le(!1);
    }, [Z, Q]), f(() => {
      w.length > 0 && !U && !S && (console.log("🔄 [Table] Properties changed, applying default selection"), setTimeout(() => Oe(w), 100));
    }, [Z, Q, w, U, Oe, S]), f(() => {
      if (console.log("🔄 [Table] Columns configuration changed:", {
        columnsLength: x == null ? void 0 : x.length,
        tableDataLength: w.length,
        columnNames: x == null ? void 0 : x.map((t) => t.columnName),
        currentColumnsState: J.map((t) => t.accessor)
      }), x && Array.isArray(x) && x.length > 0 && w.length > 0) {
        const t = x.map((i) => i.columnName), a = Object.keys(w[0] || {}).filter((i) => i !== "key" && i !== ye);
        console.log("🔍 [Table] Available data columns:", a), console.log("🔍 [Table] Ordered column names from config:", t);
        const b = t.filter((i) => a.includes(i)), g = a.filter((i) => !t.includes(i)), R = [...b, ...g];
        console.log("🔍 [Table] Final column order:", R);
        const d = R.map((i, P) => ({
          header: i,
          accessor: i,
          type: w[0]
        }));
        Fe(d), console.log("🔄 [Table] Columns FORCE reordered:", {
          configOrder: t,
          finalOrder: d.map((i) => i.header),
          timestamp: Date.now()
        });
      }
    }, [x, w, ye]), f(() => {
      console.log("🔄 [Table] Selected row prop sync - selected_row:", K, "selectedRow:", S, "defaultSelectionApplied:", U), !U && K && JSON.stringify(K) !== JSON.stringify(S) ? (console.log("🔄 [Table] Syncing selected_row prop to internal state:", K), ge(K)) : !K && S && !U ? (console.log("🔄 [Table] Clearing selected row"), ge(null)) : console.log("🔄 [Table] No sync needed - conditions not met");
    }, [K, S, U]);
    const qe = (t) => {
      De(t), Ae(!0);
    }, Ke = () => {
      Ae(!1), De(null);
    };
    r = r || [];
    const Ve = (t) => {
      if (typeof t == "number") return "Number";
      if (typeof t == "boolean") return "Boolean";
      if (typeof t == "string") {
        if (t.includes("@") && t.includes(".")) return "Email";
        if ((t.startsWith("http://") || t.startsWith("https://")) && (t.endsWith(".jpg") || t.endsWith(".jpeg") || t.endsWith(".png") || t.endsWith(".gif"))) return "Image";
        if (t.startsWith("http://") || t.startsWith("https://")) return "Url";
        const a = Date.parse(t);
        if (!isNaN(a)) return "Date";
        try {
          const b = JSON.parse(t);
          if (Array.isArray(b)) return "MultiSelect";
          if (typeof b == "object" && b !== null) return "Json";
        } catch {
          return "Text";
        }
      }
      return Array.isArray(t) ? "MultiSelect" : typeof t == "object" && t !== null ? "Json" : "Text";
    }, [ue, Xe] = u({
      key: null,
      direction: null
    }), Ye = (t, a) => {
      Xe({ key: t, direction: a });
      const b = [...w].sort((g, R) => {
        const d = g[t] ?? "", i = R[t] ?? "";
        return typeof d == "number" && typeof i == "number" ? a === "asc" ? d - i : i - d : a === "asc" ? String(d).localeCompare(String(i)) : String(i).localeCompare(String(d));
      });
      Re(b), Be(b);
    }, Ze = (t, a, b) => /* @__PURE__ */ e.React.createElement("div", { className: "rounded-sm w-full h-full flex flex-col gap-2 " }, /* @__PURE__ */ e.React.createElement(
      "button",
      {
        onClick: () => b(t.accessor, "asc"),
        className: `group w-full flex items-start flex-start p-[5px] rounded-md transition font-sans font-semibold tracking-wide 
                    ${a.key === t.accessor && a.direction === "asc" ? "bg-gray-200 text-black" : ""} 
                    group-bg-gray-200 hover:text-black`
      },
      /* @__PURE__ */ e.React.createElement(Pe, { className: `text-[17px] pr-2 transition  ${a.key === t.accessor && a.direction === "asc" ? "text-black" : "text-gray-400"} group-hover:text-black` }),
      /* @__PURE__ */ e.React.createElement("span", { className: "text-gray-600 group-hover:text-black" }, "Sort Ascending")
    ), /* @__PURE__ */ e.React.createElement(
      "button",
      {
        onClick: () => b(t.accessor, "desc"),
        className: `group w-full flex items-start  p-[5px] flex-start rounded-md transition font-sans font-semibold tracking-wide
                        ${a.key === t.accessor && a.direction === "desc" ? "bg-gray-200 text-black" : ""} 
                        group-bg-gray-200 hover:text-black`
      },
      /* @__PURE__ */ e.React.createElement(
        _e,
        {
          className: `text-[17px] transition pr-2
                            ${a.key === t.accessor && a.direction === "desc" ? "text-black" : "text-gray-400"} 
                            group-hover:text-black`
        }
      ),
      /* @__PURE__ */ e.React.createElement("span", { className: "text-gray-600 group-hover:text-black" }, "Sort Descending")
    )), Qe = L(() => (console.log("render 123= header"), /* @__PURE__ */ e.React.createElement("tr", { style: { backgroundColor: C, color: ce } }, W === "multiple" && /* @__PURE__ */ e.React.createElement("th", { style: { padding: "15px" } }, W === "multiple" ? /* @__PURE__ */ e.React.createElement(
      "input",
      {
        type: "checkbox",
        checked: V.length === w.length && w.length > 0,
        onChange: (t) => {
          t.stopPropagation(), t.target.checked ? we([...w]) : we([]);
        },
        style: {
          appearance: "none",
          width: "18px",
          height: "18px",
          borderRadius: "6px",
          border: `1px solid ${c}`,
          // border: `2px solid ${checkbox_accent_col}`,
          backgroundColor: V.length === w.length && w.length > 0 ? ie : "transparent",
          // Gray when checked
          transition: "all 0.2s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          visibility: V.length > 0 ? "visible" : "hidden"
        }
      }
    ) : null), /* @__PURE__ */ e.React.createElement("th", { style: { padding: "5px 15px", minWidth: "110px", maxWidth: "110px", textAlign: "start" } }, /* @__PURE__ */ e.React.createElement("span", { className: "font-sans font-semibold tracking-wide", style: { cursor: "pointer", fontSize: "medium", color: "#555870" } })), J.map((t) => /* @__PURE__ */ e.React.createElement("th", { key: t.accessor, style: { padding: "8px 15px", paddingLeft: "5px", minWidth: "160px", maxWidth: "160px", textAlign: "start" } }, /* @__PURE__ */ e.React.createElement("div", { className: "flex items-center justify-start h-7" }, /* @__PURE__ */ e.React.createElement("div", { className: "group hover:bg-gray-200 group-hover:text-black transition font-sans font-semibold tracking-wide rounded-md cursor-pointer flex items-center gap-2  px-2 h-full ", style: { fontSize: "medium", color: "#555870" } }, t.header, /* @__PURE__ */ e.React.createElement(
      fe,
      {
        content: Ze(t, ue, Ye),
        trigger: "click",
        placement: "bottom"
      },
      /* @__PURE__ */ e.React.createElement("div", { className: "flex flex-col items-center h-5" }, /* @__PURE__ */ e.React.createElement(Ge, { className: `text-[13px] ${ue.key === t.accessor && ue.direction === "asc" ? "text-black" : "text-gray-400"} group-hover:text-black` }), /* @__PURE__ */ e.React.createElement(Ie, { className: `text-[13px] ${ue.key === t.accessor && ue.direction === "desc" ? "text-black" : "text-gray-400"} group-hover:text-black` }))
    ))))))), [w, V, W]), et = v((t, a) => {
      const b = (g) => g ? new Date(g).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "";
      switch (a) {
        case "Email":
          return /* @__PURE__ */ e.React.createElement("a", { href: `mailto:${t}`, style: { color: "#2563EB" } }, t);
        case "Url":
          return /* @__PURE__ */ e.React.createElement("a", { href: t, target: "_blank", rel: "noopener noreferrer", style: { color: "#2563EB" } }, t);
        case "Image":
          return /* @__PURE__ */ e.React.createElement("img", { src: t, alt: "Image", style: { width: "60px", height: "60px", borderRadius: "8px" } });
        case "Number":
        case "Boolean":
          return /* @__PURE__ */ e.React.createElement("span", { style: { color: "#2563EB" } }, t);
        case "Date":
        case "DOB":
          return b(t);
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
          const g = ["#FFEFD5", "#FFDAB9", "#E6E6FA", "#D3F8E2", "#F5E6CC", "#D0E2FF", "#FFDFD3"], R = Array.isArray(t) ? t.map((d) => typeof d == "object" ? JSON.stringify(d) ?? "N/A" : d).filter((d) => typeof d == "string" && d.trim() !== "") : [];
          return R.length > 0 ? /* @__PURE__ */ e.React.createElement("div", { style: { display: "flex", flexWrap: "nowrap", gap: "5px", alignItems: "center" } }, R.slice(0, 2).map((d, i) => /* @__PURE__ */ e.React.createElement(
            fe,
            {
              content: /* @__PURE__ */ e.React.createElement("div", { key: i, style: {
                backgroundColor: g[i % g.length],
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
              backgroundColor: g[i % g.length],
              padding: "2px 6px",
              borderRadius: "5px",
              fontSize: "10px",
              color: "black",
              fontWeight: "300",
              display: "inline-block"
            } }, d.substring(0, 10) + "..")
          )), R.length > 1 && /* @__PURE__ */ e.React.createElement(
            fe,
            {
              content: /* @__PURE__ */ e.React.createElement("div", { style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
                gap: "4px",
                maxWidth: "220px",
                background: "white",
                borderRadius: "8px"
              } }, R.slice(2).map((d, i) => /* @__PURE__ */ e.React.createElement("div", { key: i, style: {
                backgroundColor: g[(i + 2) % g.length],
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
    }, []), $e = v((t, a) => et(t, a), [x]), tt = v((t, a) => {
      console.log("Row clicked:", t, "Current selectedRow:", S), W === "single" ? (!S || S.key !== t.key) && (console.log("Updating selected row to:", t), ge(t), q == null || q(t), y(l, "selected_row", t)) : W === "multiple" && we((b) => {
        const g = t.key;
        if (new Set(b.map((d) => d.key)).has(g)) {
          const d = b.filter((i) => i.key !== g);
          return y(l, "selected_rows", d), d;
        } else {
          const d = [...b, t];
          return y(l, "selected_rows", d), d;
        }
      });
    }, [W, l, q, y, S]), rt = ({ index: t, style: a }) => {
      const b = w[t], g = W === "single" ? (S == null ? void 0 : S.key) === b.key : V.some((R) => R.key === b.key);
      return (
        // <div style={{ ...style, display: 'table-row' }} key={`${row.key || index}-${JSON.stringify(columns)}`}>
        /* @__PURE__ */ e.React.createElement(
          le,
          {
            row: b,
            index: t,
            isSelected: g,
            columns: x,
            columnsState: J,
            selectionType: W,
            handleRowClick: tt,
            checkboxBorderColor: c,
            checkboxAccentCol: ie,
            selectionBg: k,
            renderCell: $e,
            showDrawer: qe,
            style: a
          }
        )
      );
    }, lt = L(() => !Array.isArray(w) || w.length === 0 ? /* @__PURE__ */ e.React.createElement("tr", { style: { maxHeight: "50px" } }, /* @__PURE__ */ e.React.createElement("td", { colSpan: J.length + (W ? 1 : 0) }, "No data found")) : (console.log("render 123= renderBody"), /* @__PURE__ */ e.React.createElement(Ue, null, ({ height: t, width: a }) => /* @__PURE__ */ e.React.createElement(
      Je,
      {
        width: a,
        height: t,
        itemCount: w.length,
        itemSize: 50
      },
      ({ index: b, style: g }) => /* @__PURE__ */ e.React.createElement(rt, { index: b, style: g })
    ))), [w, S, V, W, x, c, ie, k]), nt = {
      id: l,
      properties: p,
      meta: E,
      EditProperties: $,
      updateProperties: y,
      grid: m,
      Configuration: B
    };
    f(() => {
      var b;
      if (console.log("🔍 [Table] useEffect triggered with data:", {
        hasData: !!r,
        dataLength: (r == null ? void 0 : r.length) || "N/A",
        dataKeys: r && r.length > 0 ? Object.keys(r[0]) : "N/A",
        tableHasRunOnce: Ee.current,
        dataStringified: ((b = JSON.stringify(r)) == null ? void 0 : b.substring(0, 100)) + "..."
      }), Ee.current && JSON.stringify(r) === JSON.stringify(de)) {
        console.log("🔍 [Table] Skipping update - data unchanged");
        return;
      }
      Ee.current = !0;
      const t = performance.now();
      async function a() {
        console.log("render 123 table");
        const g = r.length > 0 ? Object.keys(r[0]) : [], R = g.find((i) => i.toLowerCase().includes("id")) || g.find((i) => i.toLowerCase().includes("_id")) || g[0];
        if (console.log("Primary Key Determined:", R), $[2].elements[0] = {
          label: "primary_key",
          name: "primary_key",
          type: n.SELECT(g, R),
          width: 24
        }, r && Object.keys(r).length > 0) {
          const i = Object.values(r).map((P) => ({
            ...P,
            key: P[R]
            // Set its value as the key
          }));
          performance.now(), Re(() => i), Be(() => i), setTimeout(() => {
            S ? console.log("🔍 [Table] Skipping default selection - row already selected") : Oe(i);
          }, 100), y(l, "value", r), y(l, "data", r);
        }
        if (He(!1), console.log("evaluatedvalue===", r), r.length > 0) {
          const i = Object.keys(r[0]).filter((T) => T !== "key" && T !== ye);
          console.log("📊 [Table] Data useEffect - Available data columns:", i), console.log("📊 [Table] Data useEffect - Current columns config:", x == null ? void 0 : x.map((T) => T.columnName)), console.log("📊 [Table] Data useEffect - Current columnsState:", J.map((T) => T.accessor));
          let P = i;
          if (x && Array.isArray(x) && x.length > 0) {
            const T = x.map((_) => _.columnName).filter((_) => i.includes(_)), ee = i.filter(
              (_) => !x.some((ke) => ke.columnName === _)
            );
            P = [...T, ...ee], console.log("📊 [Table] Data useEffect - Ordered columns from config:", P);
          }
          const me = J.map((T) => T.accessor).filter(Boolean), Ce = P, be = J.length === 0 || J[0].accessor === "";
          if (console.log("📊 [Table] Data useEffect - Update decision:", {
            currentColumnOrder: me,
            expectedOrder: Ce,
            isUninitialized: be,
            willUpdate: be,
            skipReason: be ? "none" : "columns already initialized"
          }), be) {
            const T = P.map((ee, _) => ({
              header: ee,
              accessor: ee,
              type: r[0]
            }));
            Fe(() => T), console.log("🔄 [Table] Columns INITIALIZED from data:", T.map((ee) => ee.header));
          }
          const ot = P.map((T, ee) => {
            let _ = Array.isArray(x) ? x.find((ke) => ke.columnName === T) : void 0;
            return {
              columnName: T,
              columnType: _ && _.columnType ? _.columnType : Ve(r[0][T]) || "Text"
            };
          });
          y(l, "columns", [...ot]);
        }
        const d = performance.now();
        console.log(`Total useEffect execution time: ${(d - t).toFixed(2)} ms`);
      }
      console.log("table rerender"), a();
    }, [r]), f(() => {
      console.log("render 123 columns");
    }, [x]);
    let at = w && de && Array.isArray(w) && Array.isArray(de) && w.length !== de.length;
    return /* @__PURE__ */ e.React.createElement(
      h,
      {
        ...nt,
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
            margin: `${N[0]} ${N[1]} 0 ${N[3]}`,
            // marginBottom: selectedRows.length > 0 ? 0 : margin[2],
            borderRadius: `${pe[0]} ${pe[1]} 0 0`
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
          ve ? /* @__PURE__ */ e.React.createElement("div", { className: "flex items-center justify-center h-full w-full" }, /* @__PURE__ */ e.React.createElement("img", { style: { height: "15%", width: "15%" }, src: "/images/loading.gif", alt: "loading..." })) : /* @__PURE__ */ e.React.createElement(e.React.Fragment, null, /* @__PURE__ */ e.React.createElement("thead", null, Qe), /* @__PURE__ */ e.React.createElement("tbody", null, lt))
        )
      ),
      /* @__PURE__ */ e.React.createElement(
        "div",
        {
          className: "relative flex items-center  bg-gray-100  rounded-b-lg",
          style: {
            flex: "0 0 auto",
            margin: `0 ${N[1]} ${N[2]} ${N[3]}`,
            borderRadius: `0 0 ${pe[2]} ${pe[3]}`,
            width: `calc(100% - (${N[1]} + ${N[3]}))`,
            padding: "10px"
          }
        },
        /* @__PURE__ */ e.React.createElement("span", { className: "absolute left-1/2 transform -translate-x-1/2 text-gray-600" }, V.length > 0 ? `${V.length} out of ${w.length} selected` : `${w.length} Results`),
        !ve && /* @__PURE__ */ e.React.createElement(
          fe,
          {
            trigger: "click",
            placement: "bottom",
            content: /* @__PURE__ */ e.React.createElement(re, { columns: x, tableData: w, originalData: de, setTableData: Re })
          },
          at ? /* @__PURE__ */ e.React.createElement(Se, { className: "ml-auto text-blue-400 text-sm cursor-pointer hover:text-blue-800" }) : /* @__PURE__ */ e.React.createElement(Se, { className: "ml-auto text-gray-400 text-sm cursor-pointer hover:text-gray-800" })
        )
      ),
      /* @__PURE__ */ e.React.createElement(We, { title: "User Profile", width: 840, placement: "right", onClose: Ke, open: Me }, Te ? /* @__PURE__ */ e.React.createElement("div", { style: { padding: "8px" } }, J.map(({ header: t, accessor: a }, b) => {
        let g = Te[a];
        const R = (d) => {
          if (typeof d == "object" && d !== null)
            return Object.entries(d).map(([me, Ce]) => `${me}: ${R(Ce)}`).join(", ");
          let i = x.find((me) => me.columnName === a);
          return i || console.warn(`Column not found for columnName: ${a}`), `${b}${i.accessor}`, $e(d, i.columnType);
        };
        return /* @__PURE__ */ e.React.createElement("div", { key: a, style: { marginBottom: "0px", padding: "5px" } }, a === "image" ? /* @__PURE__ */ e.React.createElement("div", null, /* @__PURE__ */ e.React.createElement("strong", null, t), /* @__PURE__ */ e.React.createElement("br", null), /* @__PURE__ */ e.React.createElement(
          "img",
          {
            src: g,
            alt: "Profile",
            style: { width: "100px", borderRadius: "8px", marginTop: "5px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }
          }
        )) : /* @__PURE__ */ e.React.createElement("p", { style: { margin: "0" } }, /* @__PURE__ */ e.React.createElement("strong", { style: { display: "block", marginBottom: "5px" } }, t), /* @__PURE__ */ e.React.createElement("p", { style: { color: "#898585" } }, R(g))), /* @__PURE__ */ e.React.createElement("hr", { style: { border: "1px solid #f7f7f7", margin: "8px 0" } }));
      })) : /* @__PURE__ */ e.React.createElement("p", { style: { padding: "16px" } }, "No profile data")),
      /* @__PURE__ */ e.React.createElement("style", null, `


                .tableWrap {
                    height: 100%;
                    border: ${j};
                    overflow: auto;
                }
                
                tbody{
                max-height:100%
                display: block
                }
        
                thead tr {
                    background-color: ${C};
                    color: ${ce};
                    
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
                    background: ${C};
                    color: ${ce};
                    box-shadow: 0px 0px 0 2px #e8e8e8;
                }
            `)
    );
  }, $ = ze(n, D), B = je(I);
  return z.EditProperties = $, z.PropsList = Object.keys($), z.properties = te($), z.Configuration = B, {
    component: (o) => /* @__PURE__ */ e.React.createElement(
      z,
      {
        ...o,
        EditProperties: F.EditProperties,
        Configuration: F.Configuration
      }
    ),
    manifest: F
  };
}
export {
  gt as createComponent,
  pt as loadRuntimeDeps,
  mt as registerRuntimeDeps,
  O as runtimeDeps
};
