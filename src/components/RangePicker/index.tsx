

interface RangePickerProps extends BaseProps {
  title?: string;
  min?: number;
  max?: number;
  value?: number;
  background_color?: string;
  border_radius?: string;
  height?: string;
  width?: string;
  margin?: string;
  color?: string;
  slider_color?: string;
  track_color?: string;
  theme?: string;
}

// Theme mapping configuration for RangePicker component
const getThemeMapping = (THEME: any) => {
  return {
    background_color: THEME.surfaceColor,
    color: THEME.textColor,
    slider_color: THEME.primaryColor,
    track_color: THEME.borderColor,
  };
};

const Configuration = {
  grid: {
    desktop: {
      width: 4, // Override width for desktop
      height: 6, // Keep height the same or adjust as needed
    },
    mobile: {
      width: 10, // Keep the same or adjust for mobile
      height: 5, // Keep the same or adjust as needed
    },
  },
  resizable: {
    width: true,
    height: true,
  },
};

const getEditProperties = (ElementTypes: any, THEME: any) => [
  {
    type: ElementTypes.GROUP("basic"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Name",
        name: "_name",
        type: ElementTypes.TEXT(""),
        showLabel: true,
        width: 24,
      },
      {
        label: "title",
        name: "title",
        type: ElementTypes.TEXT("Select Range"),
        width: 24,
      },
      {
        label: "Value",
        name: "value",
        type: ElementTypes.NUMBER(0),
        width: 24,
        showFx: true,
        onlyFx: true,
        fx: "10"
      },
      {
        label: "Min",
        name: "min",
        type: ElementTypes.NUMBER(0),
        width: 24,
        showFx: true,
      },
      {
        label: "Max",
        name: "max",
        type: ElementTypes.NUMBER(100),
        width: 24,
        showFx: true,
      },
    ],
  },
  {
    type: ElementTypes.GROUP("theme"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Theme",
        name: "theme",
        type: ElementTypes.CHANGETHEME("default"),
        showLabel: true,
        width: 24,
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
        name: "background_color",
        type: ElementTypes.COLOR("#ffffff"),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Text Color",
        name: "color",
        type: ElementTypes.COLOR("#374151"),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Slider Color",
        name: "slider_color",
        type: ElementTypes.COLOR("#3b82f6"),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Track Color",
        name: "track_color",
        type: ElementTypes.COLOR("#e5e7eb"),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Height",
        name: "height",
        type: ElementTypes.TEXT("auto"),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Width",
        name: "width",
        type: ElementTypes.TEXT("100%"),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Border Radius",
        name: "border_radius",
        type: ElementTypes.BORDERRADIUS(["8px", "8px", "8px", "8px"]),
        showLabel: true,
        width: 24,
      },
    ],
  },
];

export const getRangePickerManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    const EditProperties = getEditProperties(ElementTypes,  THEME);
    
    return {
        name: "RangePicker",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
};

export function createComponent(api: any) {
  const { ElementTypes,BaseComponent, THEME, getDefaultProps, React } = api;
  const ComponentThemeMapping = getThemeMapping(THEME);
  const EditProperties = getEditProperties(ElementTypes, THEME);

  const defaultProps: Partial<RangePickerProps> = getDefaultProps(EditProperties);

  const RangePicker: React.FC<RangePickerProps> = (props) => {
    const {
      id,
      _name,
      grid,
      properties,
      meta,
      updateProperties,
      onFxChange,
      ...rest
    } = props;
    const {
      title,
      value,
      min,
      max,
      background_color,
      border_radius,
      color,
      margin,
      width,
      height,
      slider_color,
      track_color,
      theme,
    } = { ...defaultProps, ...properties } as Required<RangePickerProps>;

    const baseCmpProps = {
      id,
      properties,
      meta,
      EditProperties,
      updateProperties,
      grid,
    };

    // Calculate percentage for styling
    const percentage = ((value - min) / (max - min)) * 100;
    
    // Use customizable colors with CSS variable fallbacks for theming
    const sliderColor = slider_color || "var(--primary-color, #3b82f6)";
    const trackColorValue = track_color || "var(--border-color, #e5e7eb)";
    const backgroundColor = background_color || "var(--background-color, #ffffff)";
    const textColor = color || "var(--text-color, #1f2937)";

    // Enhanced container styles with sleek design and theme support
    const containerStyle: React.CSSProperties = {
      width: width || "100%",
      height: height || "auto",
      padding: "20px",
      backgroundColor: backgroundColor,
      borderRadius: border_radius,
      background: `linear-gradient(135deg, ${backgroundColor}, ${backgroundColor}95)`,
      boxShadow: "var(--shadow-lg, 0 4px 20px rgba(0, 0, 0, 0.08)), var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1))",
      border: "var(--border-width, 1px) solid var(--border-color, rgba(255, 255, 255, 0.2))",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
    };

    // Enhanced label styles with sleek typography and theme support
    const labelStyle: React.CSSProperties = {
      display: "block",
      fontSize: "15px",
      fontWeight: "600",
      color: textColor,
      marginBottom: "16px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
      letterSpacing: "-0.01em",
      lineHeight: "1.4",
    };

    // Enhanced range input styles with sleek design
    const rangeStyle: React.CSSProperties = {
      width: "100%",
      height: "6px",
      borderRadius: "3px",
      background: `linear-gradient(to right, 
        ${sliderColor} 0%, 
        ${sliderColor} ${percentage}%, 
        ${trackColorValue}40 ${percentage}%, 
        ${trackColorValue}40 100%
      )`,
      outline: "none",
      opacity: "0.9",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      WebkitAppearance: "none",
      appearance: "none",
      boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.1)`,
    };

    // Value display styles
    const valueDisplayStyle: React.CSSProperties = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "8px",
      fontSize: "12px",
      color: "#6b7280",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    };

    const currentValueStyle: React.CSSProperties = {
      fontSize: "14px",
      fontWeight: "700",
      color: "var(--background-color, #ffffff)",
      background: `linear-gradient(135deg, ${sliderColor}, ${sliderColor}dd)`,
      padding: "6px 12px",
      borderRadius: "20px",
      border: "none",
      boxShadow: `0 2px 8px ${sliderColor}40, 0 1px 2px rgba(0, 0, 0, 0.1)`,
      backdropFilter: "blur(10px)",
      minWidth: "40px",
      textAlign: "center",
    };

    // Custom CSS for sleek webkit and moz styling
    const customStyles = `
      .range-picker-${id} {
        -webkit-appearance: none;
        appearance: none;
      }
      
      .range-picker-${id}::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${sliderColor}, ${sliderColor}dd);
        border: 3px solid #ffffff;
        box-shadow: 
          0 4px 12px rgba(0, 0, 0, 0.15),
          0 2px 4px rgba(0, 0, 0, 0.1),
          inset 0 1px 1px rgba(255, 255, 255, 0.2);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }
      
      .range-picker-${id}::-webkit-slider-thumb:hover {
        background: linear-gradient(135deg, ${sliderColor}ee, ${sliderColor}cc);
        transform: scale(1.15);
        box-shadow: 
          0 6px 20px ${sliderColor}40,
          0 4px 8px rgba(0, 0, 0, 0.15),
          inset 0 1px 1px rgba(255, 255, 255, 0.3);
      }
      
      .range-picker-${id}::-webkit-slider-thumb:active {
        transform: scale(1.05);
      }
      
      .range-picker-${id}::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${sliderColor}, ${sliderColor}dd);
        border: 3px solid #ffffff;
        box-shadow: 
          0 4px 12px rgba(0, 0, 0, 0.15),
          0 2px 4px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .range-picker-${id}::-moz-range-thumb:hover {
        background: linear-gradient(135deg, ${sliderColor}ee, ${sliderColor}cc);
        transform: scale(1.15);
        box-shadow: 
          0 6px 20px ${sliderColor}40,
          0 4px 8px rgba(0, 0, 0, 0.15);
      }
      
      .range-picker-${id}:hover {
        opacity: 1;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
      }
      
      .range-picker-${id}:focus {
        outline: none;
        box-shadow: 
          inset 0 1px 3px rgba(0, 0, 0, 0.12),
          0 0 0 3px ${sliderColor}30;
      }
      
      .range-container-${id} {
        position: relative;
      }
      
      .range-container-${id}::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        background: linear-gradient(135deg, 
          ${sliderColor}20 0%, 
          transparent 50%, 
          ${sliderColor}10 100%);
        border-radius: inherit;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .range-container-${id}:hover::before {
        opacity: 1;
      }
    `;

    return (
      <BaseComponent {...baseCmpProps} style={{ width: "100%", height: "100%" }}>
        <style>{customStyles}</style>
        <div style={containerStyle}>
          {title && (
            <label htmlFor={`range-${id}`} style={labelStyle}>
              {title}
            </label>
          )}
          
          <div className={`range-container-${id}`} style={{ position: "relative" }}>
            <input
              id={`range-${id}`}
              type="range"
              min={min}
              max={max}
              value={value}
              className={`range-picker-${id}`}
              style={rangeStyle}
              onChange={(e) => {
                if (updateProperties) {
                  updateProperties(id, "value", parseInt(e.target.value));
                }
              }}
            />
          </div>
          
          <div style={valueDisplayStyle}>
            <span>{min}</span>
            <span style={currentValueStyle}>{value}</span>
            <span>{max}</span>
          </div>
        </div>
      </BaseComponent>
    );
  };

  return {
    component: RangePicker,
    manifest: getRangePickerManifest(api),
  }
}

export default {
  createComponent,
};

