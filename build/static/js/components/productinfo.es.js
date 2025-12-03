const R = {
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    productName: "Premium Wireless Headphones",
    price: "$199.99",
    originalPrice: "$249.99",
    rating: 4.5,
    description: "Experience crystal-clear audio with premium wireless headphones featuring 30-hour battery life.",
    inStock: !0,
    backgroundColor: "#ffffff",
    borderRadius: ["16px", "16px", "16px", "16px"],
    padding: ["20px", "20px", "20px", "20px"],
    margin: ["10px", "10px", "10px", "10px"],
    shadowColor: "rgba(0,0,0,0.1)",
    textColor: "#333333",
    primaryColor: "#007bff",
    buttonText: "Add to Cart"
}, A = {
    textColor: "text",
    primaryColor: "primary",
    backgroundColor: "background"
}, D = {
    grid: {
        desktop: { width: 24, height: 40 },
        mobile: { width: 24, height: 40 }
    },
    resizable: {
        width: !0,
        height: !0
    }
};
function N(e) {
    return [
        {
            type: e.GROUP("content"),
            width: 24,
            elements: [
                {
                    label: "Product Image",
                    name: "productImage",
                    type: e.TEXT("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"),
                    width: 24,
                    showFx: !0
                },
                {
                    label: "Product Name",
                    name: "productName",
                    type: e.TEXT("Premium Wireless Headphones"),
                    width: 24,
                    showFx: !0
                },
                {
                    label: "Description",
                    name: "description",
                    type: e.TEXTAREA("Experience crystal-clear audio with premium wireless headphones featuring 30-hour battery life."),
                    width: 24,
                    showFx: !0
                }
            ]
        },
        {
            type: e.GROUP("pricing"),
            width: 24,
            elements: [
                {
                    label: "Current Price",
                    name: "price",
                    type: e.TEXT("$199.99"),
                    width: 12,
                    showFx: !0
                },
                {
                    label: "Original Price",
                    name: "originalPrice",
                    type: e.TEXT("$249.99"),
                    width: 12,
                    showFx: !0
                },
                {
                    label: "Rating",
                    name: "rating",
                    type: e.TEXT("4.5"),
                    width: 8,
                    showFx: !0
                },
                {
                    label: "In Stock",
                    name: "inStock",
                    type: e.TOGGLE(!0),
                    width: 8,
                    showFx: !0
                },
                {
                    label: "Button Text",
                    name: "buttonText",
                    type: e.TEXT("Add to Cart"),
                    width: 8,
                    showFx: !0
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
                    name: "backgroundColor",
                    type: e.COLOR("#ffffff"),
                    width: 8,
                    showFx: !0
                },
                {
                    label: "Text Color",
                    name: "textColor",
                    type: e.COLOR("#333333"),
                    width: 8,
                    showFx: !0
                },
                {
                    label: "Primary Color",
                    name: "primaryColor",
                    type: e.COLOR("#007bff"),
                    width: 8,
                    showFx: !0
                },
                {
                    label: "Shadow Color",
                    name: "shadowColor",
                    type: e.COLOR("rgba(0,0,0,0.1)"),
                    width: 12,
                    showFx: !0
                },
                {
                    label: "Padding",
                    name: "padding",
                    type: e.SPACING(["20px", "20px", "20px", "20px"]),
                    width: 8
                },
                {
                    label: "Margin",
                    name: "margin",
                    type: e.SPACING(["10px", "10px", "10px", "10px"]),
                    width: 8
                },
                {
                    label: "Border Radius",
                    name: "borderRadius",
                    type: e.BORDERRADIUS(["16px", "16px", "16px", "16px"]),
                    width: 8
                }
            ]
        }
    ];
}
function T(e) {
    return {
        name: "ProductInfo",
        EditProperties: N(e),
        Configuration: D,
        ThemeMapping: A,
        defaultProps: R
    };
}
function W(e) {
    const { React: o } = e;
    function P(E) {
        const { useComponentContext: d } = e;
        d == null || d();
        const k = { ...R, ...E.properties }, {
            productImage: w = "",
            productName: y = "",
            price: u = "$0",
            originalPrice: x = "$0",
            rating: h = 0,
            description: M = "",
            inStock: a = !0,
            backgroundColor: O = "#fff",
            borderRadius: i = ["0", "0", "0", "0"],
            padding: l = ["0", "0", "0", "0"],
            margin: s = ["0", "0", "0", "0"],
            shadowColor: g = "rgba(0,0,0,0.1)",
            textColor: m = "#000",
            primaryColor: c = "#007bff",
            buttonText: F = "Add to Cart"
        } = k, C = typeof h == "string" ? parseFloat(h) : h, I = isNaN(C) ? 0 : C, S = () => {
            const t = (b) => parseFloat(b.replace(/[$,]/g, "")) || 0, r = t(x), f = t(u), p = r > 0 ? Math.round((r - f) / r * 100) : 0;
            return p > 0 ? `${p}% OFF` : null;
        }, v = (t) => {
            const r = [], f = Math.floor(t), p = t % 1 !== 0;
            for (let n = 0; n < f; n++)
                r.push(
                    o.createElement("span", { key: n, style: { color: "#ffd700", fontSize: "16px" } }, "★")
                );
            p && r.push(
                o.createElement("span", { key: "half", style: { color: "#ffd700", fontSize: "16px" } }, "☆")
            );
            const b = 5 - Math.ceil(t);
            for (let n = 0; n < b; n++)
                r.push(
                    o.createElement("span", { key: `empty-${n}`, style: { color: "#ddd", fontSize: "16px" } }, "★")
                );
            return r;
        }, G = {
            backgroundColor: O,
            borderRadius: `${i[0]} ${i[1]} ${i[2]} ${i[3]}`,
            padding: `${l[0]} ${l[1]} ${l[2]} ${l[3]}`,
            margin: `${s[0]} ${s[1]} ${s[2]} ${s[3]}`,
            boxShadow: `0 8px 24px ${g}`,
            color: m,
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            maxWidth: "400px",
            overflow: "hidden",
            transition: "all 0.3s ease",
            cursor: "pointer"
        }, z = o.createElement(
            "div",
            {
                style: G,
                onMouseEnter: (t) => {
                    t.currentTarget.style.transform = "translateY(-6px)", t.currentTarget.style.boxShadow = `0 16px 40px ${g}`;
                },
                onMouseLeave: (t) => {
                    t.currentTarget.style.transform = "translateY(0)", t.currentTarget.style.boxShadow = `0 8px 24px ${g}`;
                }
            },
            // Image
            o.createElement(
                "div",
                { style: { position: "relative", marginBottom: "16px" } },
                w && o.createElement("img", {
                    src: w,
                    alt: y,
                    style: { width: "100%", height: "240px", objectFit: "cover", borderRadius: "12px" },
                    onError: (t) => t.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjhGOUZBIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiNEQ0RDREMiLz4KPC9zdmc+"
                }),
                S() && o.createElement("div", {
                    style: {
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#fff",
                        backgroundColor: "#e74c3c",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                    }
                }, S())
            ),
            // Name and description
            o.createElement("h2", { style: { fontSize: "22px", fontWeight: "bold", margin: "0 0 12px 0", color: m } }, y),
            o.createElement("p", { style: { fontSize: "14px", marginBottom: "16px", color: "#666", opacity: 0.9 } }, M),
            // Rating
            o.createElement(
                "div",
                { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" } },
                o.createElement("div", { style: { display: "flex" } }, ...v(I)),
                o.createElement("span", { style: { fontSize: "14px", fontWeight: "600", color: m } }, I)
            ),
            // Pricing
            o.createElement(
                "div",
                { style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" } },
                o.createElement("span", { style: { fontSize: "28px", fontWeight: "bold", color: c } }, u),
                x !== u && o.createElement("span", { style: { fontSize: "16px", color: "#999", textDecoration: "line-through" } }, x)
            ),
            // Button
            o.createElement("button", {
                style: {
                    width: "100%",
                    padding: "14px 20px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#fff",
                    backgroundColor: a ? c : "#ccc",
                    border: "none",
                    borderRadius: "10px",
                    cursor: a ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease",
                    boxShadow: a ? `0 4px 12px ${c}40` : "none"
                },
                onMouseEnter: (t) => a && (t.currentTarget.style.backgroundColor = "#0056b3", t.currentTarget.style.transform = "scale(1.02)"),
                onMouseLeave: (t) => a && (t.currentTarget.style.backgroundColor = c, t.currentTarget.style.transform = "scale(1)"),
                disabled: !a
            }, a ? F : "Out of Stock")
        );
        return o.createElement("div", null, z);
    }
    const $ = T(e.ElementTypes);
    return { component: P, manifest: $ };
}
export {
    D as Configuration,
    A as ThemeMapping,
    W as createComponent,
    R as defaultProps
};
