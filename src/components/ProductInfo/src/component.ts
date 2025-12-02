
// Types for the ProductInfo component
interface ProductInfoProps {
    productImage?: string;
    productName?: string;
    price?: string;
    originalPrice?: string;
    discountText?: string;
    rating?: number | string;
    description?: string;
    inStock?: boolean;
    backgroundColor?: string;
    borderRadius?: Array<string>;
    padding?: Array<string>;
    margin?: Array<string>;
    shadowColor?: string;
    textColor?: string;
    primaryColor?: string;
    buttonText?: string;
    properties?: any;
    id?: string;
    grid?: any;
    meta?: any;
    [key: string]: any;
}

// ============================================================================
// CONFIGURATION & METADATA
// ============================================================================

// Default props for the ProductInfo component
export const defaultProps: Partial<ProductInfoProps> = {
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    productName: "Premium Wireless Headphones",
    price: "$199.99",
    originalPrice: "$249.99",
    rating: 4.5,
    description: "Experience crystal-clear audio with premium wireless headphones featuring 30-hour battery life.",
    inStock: true,
    backgroundColor: "#ffffff",
    borderRadius: ["16px", "16px", "16px", "16px"],
    padding: ["20px", "20px", "20px", "20px"],
    margin: ["10px", "10px", "10px", "10px"],
    shadowColor: "rgba(0,0,0,0.1)",
    textColor: "#333333",
    primaryColor: "#007bff",
    buttonText: "Add to Cart"
};

// Theme mapping configuration
export const ThemeMapping = {
    textColor: "text",
    primaryColor: "primary",
    backgroundColor: "background"
};

// Component configuration
export const Configuration = {
    grid: {
        desktop: { width: 24, height: 40 },
        mobile: { width: 24, height: 40 }
    },
    resizable: {
        width: true,
        height: true
    }
};

// Function to generate EditProperties using injected ElementTypes
export function getEditProperties(ElementTypes: any) {
    return [
        {
            type: ElementTypes.GROUP("content"),
            width: 24,
            elements: [
                {
                    label: "Product Image",
                    name: "productImage",
                    type: ElementTypes.TEXT("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"),
                    width: 24,
                    showFx: true
                },
                {
                    label: "Product Name",
                    name: "productName",
                    type: ElementTypes.TEXT("Premium Wireless Headphones"),
                    width: 24,
                    showFx: true
                },
                {
                    label: "Description",
                    name: "description",
                    type: ElementTypes.TEXTAREA("Experience crystal-clear audio with premium wireless headphones featuring 30-hour battery life."),
                    width: 24,
                    showFx: true
                }
            ]
        },
        {
            type: ElementTypes.GROUP("pricing"),
            width: 24,
            elements: [
                {
                    label: "Current Price",
                    name: "price",
                    type: ElementTypes.TEXT("$199.99"),
                    width: 12,
                    showFx: true
                },
                {
                    label: "Original Price",
                    name: "originalPrice",
                    type: ElementTypes.TEXT("$249.99"),
                    width: 12,
                    showFx: true
                },
                {
                    label: "Rating",
                    name: "rating",
                    type: ElementTypes.TEXT("4.5"),
                    width: 8,
                    showFx: true
                },
                {
                    label: "In Stock",
                    name: "inStock",
                    type: ElementTypes.TOGGLE(true),
                    width: 8,
                    showFx: true
                },
                {
                    label: "Button Text",
                    name: "buttonText",
                    type: ElementTypes.TEXT("Add to Cart"),
                    width: 8,
                    showFx: true
                }
            ]
        },
        {
            type: ElementTypes.GROUP("style"),
            width: 24,
            collaseOpen: true,
            elements: [
                {
                    label: "Background Color",
                    name: "backgroundColor",
                    type: ElementTypes.COLOR("#ffffff"),
                    width: 8,
                    showFx: true
                },
                {
                    label: "Text Color",
                    name: "textColor",
                    type: ElementTypes.COLOR("#333333"),
                    width: 8,
                    showFx: true
                },
                {
                    label: "Primary Color",
                    name: "primaryColor",
                    type: ElementTypes.COLOR("#007bff"),
                    width: 8,
                    showFx: true
                },
                {
                    label: "Shadow Color",
                    name: "shadowColor",
                    type: ElementTypes.COLOR("rgba(0,0,0,0.1)"),
                    width: 12,
                    showFx: true
                },
                {
                    label: "Padding",
                    name: "padding",
                    type: ElementTypes.SPACING(["20px", "20px", "20px", "20px"]),
                    width: 8
                },
                {
                    label: "Margin",
                    name: "margin",
                    type: ElementTypes.SPACING(["10px", "10px", "10px", "10px"]),
                    width: 8
                },
                {
                    label: "Border Radius",
                    name: "borderRadius",
                    type: ElementTypes.BORDERRADIUS(["16px", "16px", "16px", "16px"]),
                    width: 8
                }
            ]
        }
    ];
}

// Export manifest factory function
export function getManifest(ElementTypes: any) {
    return {
        name: "ProductInfo",
        EditProperties: getEditProperties(ElementTypes),
        Configuration,
        ThemeMapping,
        defaultProps
    };
}

// ============================================================================
// COMPONENT FACTORY
// ============================================================================

export function createComponent(api: any) {
    const { React } = api;

    function ProductInfoComponent(props: ProductInfoProps) {
        // ✅ Call platform hooks inside component body
        const { useComponentContext } = api;
        const context = useComponentContext?.(); // safe optional chaining

        // Merge default props with actual props
        const eProps = { ...defaultProps, ...props.properties };
        const {
            productImage = "",
            productName = "",
            price = "$0",
            originalPrice = "$0",
            rating = 0,
            description = "",
            inStock = true,
            backgroundColor = "#fff",
            borderRadius = ["0", "0", "0", "0"],
            padding = ["0", "0", "0", "0"],
            margin = ["0", "0", "0", "0"],
            shadowColor = "rgba(0,0,0,0.1)",
            textColor = "#000",
            primaryColor = "#007bff",
            buttonText = "Add to Cart"
        } = eProps as Required<ProductInfoProps>;

        // Ensure rating is numeric
        const numericRating = typeof rating === "string" ? parseFloat(rating) : rating;
        const safeRating = isNaN(numericRating) ? 0 : numericRating;

        // Calculate discount safely
        const calculateDiscount = () => {
            const parsePrice = (p: string) => parseFloat(p.replace(/[$,]/g, "")) || 0;
            const original = parsePrice(originalPrice);
            const current = parsePrice(price);
            const discount = original > 0 ? Math.round(((original - current) / original) * 100) : 0;
            return discount > 0 ? `${discount}% OFF` : null;
        };

        // Render star rating
        const renderStars = (rating: number) => {
            const stars: React.ReactNode[] = [];
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;

            for (let i = 0; i < fullStars; i++) {
                stars.push(
                    React.createElement('span', { key: i, style: { color: "#ffd700", fontSize: "16px" } }, '★')
                );
            }
            if (hasHalfStar) {
                stars.push(
                    React.createElement('span', { key: 'half', style: { color: "#ffd700", fontSize: "16px" } }, '☆')
                );
            }
            const emptyStars = 5 - Math.ceil(rating);
            for (let i = 0; i < emptyStars; i++) {
                stars.push(
                    React.createElement('span', { key: `empty-${i}`, style: { color: "#ddd", fontSize: "16px" } }, '★')
                );
            }
            return stars;
        };

        // Container styles
        const containerStyle: React.CSSProperties = {
            backgroundColor,
            borderRadius: `${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}`,
            padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
            margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
            boxShadow: `0 8px 24px ${shadowColor}`,
            color: textColor,
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
            maxWidth: "400px",
            overflow: "hidden",
            transition: "all 0.3s ease",
            cursor: "pointer"
        };

        // Build component content
        const content = React.createElement('div', {
            style: containerStyle,
            onMouseEnter: (e: any) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = `0 16px 40px ${shadowColor}`;
            },
            onMouseLeave: (e: any) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 8px 24px ${shadowColor}`;
            }
        },
            // Image
            React.createElement('div', { style: { position: "relative", marginBottom: "16px" } },
                productImage && React.createElement('img', {
                    src: productImage,
                    alt: productName,
                    style: { width: "100%", height: "240px", objectFit: "cover", borderRadius: "12px" },
                    onError: (e: any) => e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjhGOUZBIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiNEQ0RDREMiLz4KPC9zdmc+"
                }),
                calculateDiscount() && React.createElement('div', {
                    style: {
                        position: "absolute", top: "12px", right: "12px",
                        fontSize: "12px", fontWeight: "bold", color: "#fff",
                        backgroundColor: "#e74c3c", padding: "4px 8px",
                        borderRadius: "6px", boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                    }
                }, calculateDiscount())
            ),
            // Name and description
            React.createElement('h2', { style: { fontSize: "22px", fontWeight: "bold", margin: "0 0 12px 0", color: textColor } }, productName),
            React.createElement('p', { style: { fontSize: "14px", marginBottom: "16px", color: "#666", opacity: 0.9 } }, description),
            // Rating
            React.createElement('div', { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" } },
                React.createElement('div', { style: { display: "flex" } }, ...renderStars(safeRating)),
                React.createElement('span', { style: { fontSize: "14px", fontWeight: "600", color: textColor } }, safeRating)
            ),
            // Pricing
            React.createElement('div', { style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" } },
                React.createElement('span', { style: { fontSize: "28px", fontWeight: "bold", color: primaryColor } }, price),
                originalPrice !== price && React.createElement('span', { style: { fontSize: "16px", color: "#999", textDecoration: "line-through" } }, originalPrice)
            ),
            // Button
            React.createElement('button', {
                style: {
                    width: "100%", padding: "14px 20px", fontSize: "16px", fontWeight: "600",
                    color: "#fff", backgroundColor: inStock ? primaryColor : "#ccc",
                    border: "none", borderRadius: "10px", cursor: inStock ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease", boxShadow: inStock ? `0 4px 12px ${primaryColor}40` : "none"
                },
                onMouseEnter: (e: any) => inStock && (e.currentTarget.style.backgroundColor = "#0056b3", e.currentTarget.style.transform = "scale(1.02)"),
                onMouseLeave: (e: any) => inStock && (e.currentTarget.style.backgroundColor = primaryColor, e.currentTarget.style.transform = "scale(1)"),
                disabled: !inStock
            }, inStock ? buttonText : "Out of Stock")
        );

        return React.createElement("div", null, content);
    }

    const manifest = getManifest(api.ElementTypes);

    return { component: ProductInfoComponent, manifest };
}

