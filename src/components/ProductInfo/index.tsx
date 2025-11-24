import React from "react";
import {
  BaseComponent,
  BaseProps,
  getDefaultProps,
  BaseConfiguration,
  LowCodeComponent
} from "../../baseComponent";
import { ElementTypes } from "../../elements_types";
import { THEME } from "../../props";

interface ProductInfoProps extends BaseProps {
  productImage?: string;
  productName?: string;
  price?: string;
  originalPrice?: string;
  discountText?: string;
  rating?: number;
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
}

const Configuration = {
  ...BaseConfiguration,
  grid: {
    desktop: {
      width: 24, // Override width for desktop
      height: 40, // Keep height the same or adjust as needed
    },
    mobile: {
      width: 24, // Keep the same or adjust for mobile
      height: 40, // Keep the same or adjust as needed
    },
  },
  resizable: {
    width: true,
    height: true,
  },
};

const EditProperties = [
  {
    type: ElementTypes.GROUP("content"),
    width: 24,
    elements: [
      {
        label: "Product Image",
        name: "productImage",
        type: ElementTypes.TEXT(
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
        ),
        width: 24,
        showFx: true,
      },
      {
        label: "Product Name",
        name: "productName",
        type: ElementTypes.TEXT("Premium Wireless Headphones"),
        width: 24,
        showFx: true,
      },
      {
        label: "Description",
        name: "description",
        type: ElementTypes.TEXTAREA(
          "Experience crystal-clear audio with premium wireless headphones featuring 30-hour battery life."
        ),
        width: 24,
        showFx: true,
      },
    ],
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
        showFx: true,
      },
      {
        label: "Original Price",
        name: "originalPrice",
        type: ElementTypes.TEXT("$249.99"),
        width: 12,
        showFx: true,
      },
      {
        label: "Rating",
        name: "rating",
        type: ElementTypes.TEXT("4.5"),
        width: 8,
        showFx: true,
      },
      {
        label: "In Stock",
        name: "inStock",
        type: ElementTypes.TOGGLE(true),
        width: 8,
        showFx: true,
      },
      {
        label: "Button Text",
        name: "buttonText",
        type: ElementTypes.TEXT("Add to Cart"),
        width: 8,
        showFx: true,
      },
    ],
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
        showFx: true,
      },
      {
        label: "Text Color",
        name: "textColor",
        type: ElementTypes.COLOR("#333333"),
        width: 8,
        showFx: true,
      },
      {
        label: "Primary Color",
        name: "primaryColor",
        type: ElementTypes.COLOR("#007bff"),
        width: 8,
        showFx: true,
      },
      {
        label: "Shadow Color",
        name: "shadowColor",
        type: ElementTypes.COLOR("rgba(0,0,0,0.1)"),
        width: 12,
        showFx: true,
      },
      {
        label: "Padding",
        name: "padding",
        type: ElementTypes.SPACING(["20px", "20px", "20px", "20px"]),
        width: 8,
      },
      {
        label: "Margin",
        name: "margin",
        type: ElementTypes.SPACING(["10px", "10px", "10px", "10px"]),
        width: 8,
      },
      {
        label: "Border Radius",
        name: "borderRadius",
        type: ElementTypes.BORDERRADIUS(["16px", "16px", "16px", "16px"]),
        width: 8,
      },
    ],
  },
];

const defaultProps: Partial<ProductInfoProps> = getDefaultProps(EditProperties);

const ProductInfo:LowCodeComponent<ProductInfoProps> = (props) => {
  const { id, grid, properties, meta, updateProperties, onFxChange, ...rest } =
    props;
  const {
    productImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    productName = "Premium Wireless Headphones",
    price = "$199.99",
    originalPrice = "$249.99",
    rating = 4.5,
    description = "Experience crystal-clear audio with premium wireless headphones featuring 30-hour battery life.",
    inStock = true,
    backgroundColor = "#ffffff",
    borderRadius = ["16px", "16px", "16px", "16px"],
    padding = ["20px", "20px", "20px", "20px"],
    margin = ["10px", "10px", "10px", "10px"],
    shadowColor = "rgba(0,0,0,0.1)",
    textColor = "#333333",
    primaryColor = "#007bff",
    buttonText = "Add to Cart",
  } = { ...defaultProps, ...properties } as Required<ProductInfoProps>;

  const baseCmpProps = {
    id,
    grid,
    properties,
    meta,
    EditProperties,
    updateProperties,
  };

  // Convert rating to number if it's a string
  const numericRating =
    typeof rating === "string" ? parseFloat(rating) : rating;

  // Generate star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} style={{ color: "#ffd700", fontSize: "16px" }}>
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" style={{ color: "#ffd700", fontSize: "16px" }}>
          ☆
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: "#ddd", fontSize: "16px" }}>
          ★
        </span>
      );
    }

    return stars;
  };

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
    cursor: "pointer",
  };

  const imageContainerStyle: React.CSSProperties = {
    position: "relative",
    marginBottom: "16px",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    borderRadius: "12px",
  };

  const discountBadgeStyle: React.CSSProperties = {
    position: "absolute",
    top: "12px",
    right: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#e74c3c",
    padding: "4px 8px",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "22px",
    fontWeight: "bold",
    margin: "0 0 12px 0",
    color: textColor,
    lineHeight: "1.3",
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: "14px",
    lineHeight: "1.5",
    marginBottom: "16px",
    color: "#666",
    opacity: 0.9,
  };

  const ratingStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  };

  const pricingStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  };

  const currentPriceStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "bold",
    color: primaryColor,
  };

  const originalPriceStyle: React.CSSProperties = {
    fontSize: "16px",
    color: "#999",
    textDecoration: "line-through",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 20px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: inStock ? primaryColor : "#ccc",
    border: "none",
    borderRadius: "10px",
    cursor: inStock ? "pointer" : "not-allowed",
    transition: "all 0.2s ease",
    boxShadow: inStock ? `0 4px 12px ${primaryColor}40` : "none",
  };

  const calculateDiscount = () => {
    if (!originalPrice || originalPrice === price) return null;
    const original = parseFloat(originalPrice.replace(/[$,]/g, ""));
    const current = parseFloat(price.replace(/[$,]/g, ""));
    const discount = Math.round(((original - current) / original) * 100);
    return discount > 0 ? `${discount}% OFF` : null;
  };

  return (
    <BaseComponent {...baseCmpProps}>
      <div
        style={containerStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = `0 16px 40px ${shadowColor}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = `0 8px 24px ${shadowColor}`;
        }}
      >
        <div style={imageContainerStyle}>
          {productImage && (
            <img
              src={productImage}
              alt={productName}
              style={imageStyle}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDQwMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjhGOUZBIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjEyMCIgcj0iNDAiIGZpbGw9IiNEQ0JGTkMiLz4KPHN2Zz4K";
              }}
            />
          )}
          {calculateDiscount() && (
            <div style={discountBadgeStyle}>{calculateDiscount()}</div>
          )}
        </div>

        <h2 style={titleStyle}>{productName}</h2>

        <p style={descriptionStyle}>{description}</p>

        <div style={ratingStyle}>
          <div style={{ display: "flex" }}>{renderStars(numericRating)}</div>
          <span
            style={{ fontSize: "14px", fontWeight: "600", color: textColor }}
          >
            {numericRating}
          </span>
        </div>

        <div style={pricingStyle}>
          <span style={currentPriceStyle}>{price}</span>
          {originalPrice && originalPrice !== price && (
            <span style={originalPriceStyle}>{originalPrice}</span>
          )}
        </div>

        <button
          style={buttonStyle}
          onMouseEnter={(e) => {
            if (inStock) {
              e.currentTarget.style.backgroundColor = "#0056b3";
              e.currentTarget.style.transform = "scale(1.02)";
            }
          }}
          onMouseLeave={(e) => {
            if (inStock) {
              e.currentTarget.style.backgroundColor = primaryColor;
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
          disabled={!inStock}
        >
          {inStock ? buttonText : "Out of Stock"}
        </button>
      </div>
    </BaseComponent>
  );
};

ProductInfo.defaultProps = defaultProps;
ProductInfo.EditProperties = EditProperties;
ProductInfo.Configuration = Configuration;
export default ProductInfo;
