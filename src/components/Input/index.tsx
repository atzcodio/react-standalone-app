
// Import FxStates types for formula management
interface FxState {
  fx: string;
  isFx: boolean;
  deps: string[];
  evaluatedAt?: number;
}

interface InputProps {
  // You can add more specific props here if needed
  // data?: string; // Accept an initial formula as a prop
  placeholder?: string;
  value?: string;
  type?: string;
  label?: string;
  border_color?: string;
  background_color?: string;
  color?: string;
  label_color: string;
  label_text_align?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
  text_align?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
  border: string;
  border_radius: string;
  prop1: string;
  prop2: string;
  updateProperties: (id: string, property: string, newValue: any) => void; // Add updateProperties here
}

/* .............. Types ................. */
const Configuration = {
  grid: {
    desktop: {
      width: 6, // Override width for desktop
      height: 7, // Keep height the same or adjust as needed
    },
    mobile: {
      width: 12, // Keep the same or adjust for mobile
      height: 4, // Keep the same or adjust as needed
    },
  },
  resizable: {
    width: true,
    height: false,
  },
};

export const getThemeMapping = (THEME: any) => {
  return {

  }
}
const InputTypes = ["text", "number"];
export const getInputManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    const EditProperties = getEditProperties(ElementTypes,  THEME);
    return {
        name: "Input",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
};

const getEditProperties = (ElementTypes:any, THEME: any) =>[
  {
    type: ElementTypes.GROUP("basic"), // Grouping for basic properties
    elements: [
      {
        label: "Name",
        name: "_name",
        type: ElementTypes.TEXT(""),
        width: 24,
      },
      {
        label: "Placeholder",
        name: "placeholder",
        type: ElementTypes.TEXT("Something else"),
        width: 24,
      },
      {
        label: "Label",
        name: "label",
        type: ElementTypes.TEXT(""),
        width: 24,
        showFx: true,
      }
    ],
  },
  {
    type: ElementTypes.GROUP("data"), // Grouping for basic properties
    elements: [
      {
        label: "value",
        name: "value",
        type: ElementTypes.TEXT("Your Text"),
        width: 24,
        showFx: true,
        fx: "{{4 * 2}}",
        onlyFx: true
      },
    ],
  },
  {
    type: ElementTypes.GROUP("style"), // Grouping for style-related properties
    elements: [
      {
        label: "Background Color",
        name: "background_color",
        type: ElementTypes.COLOR("#ffffff"),
        width: 24,
        showFx: true,
      },
      {
        label: "Label Text Alignment",
        name: "label_text_align",
        type: ElementTypes.TEXTALIGNMENT("left"),
        width: 24,
        showFx: true,
      },
      {
        label: "Label Color",
        name: "label_color",
        type: ElementTypes.COLOR("#333"),
        width: 24,
        showFx: true,
      },
      {
        label: "Text Alignment",
        name: "text_align",
        type: ElementTypes.TEXTALIGNMENT("left"),
        width: 24,
        showFx: true,
      },
    ],
  },
  {
    type: ElementTypes.GROUP("advanced"), // Grouping for advanced properties
    elements: [
      {
        label: "Color",
        name: "color",
        type: ElementTypes.COLOR("#000000"),
        width: 24,
        showFx: true,
      },
      {
        label: "Type",
        name: "type",
        type: ElementTypes.SELECT(InputTypes, "text"),
        width: 24,
        showFx: true,
      },
      {
        label: "Border",
        name: "border",
        type: ElementTypes.TEXT("1px solid #e1e1e1"),
        width: 24,
        themePropertyName: THEME.borderColor,
        showFx: true,
      },
      {
        label: "Theme Name",
        name: "theme",
        type: ElementTypes.SELECT(
          ["basic", "vivid", "retro", "cosmic", "vibrant"],
          "basic"
        ),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Border Radius",
        name: "border_radius",
        type: ElementTypes.TEXT("5px"),
        width: 24,
        showFx: true,
      },
    ],
  },
];

export function createComponent(api: any) {

  const { ElementTypes, THEME, BaseComponent, getDefaultProps,React } = api;
  const EditProperties = getEditProperties(ElementTypes, THEME);

  const defaultProps: Partial<InputProps> = getDefaultProps(EditProperties);
  const Input: React.FC<InputProps> = (props:any) => {
    const {id, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;
    const {
      placeholder,
      value = "",
      background_color,
      color,
      type,
      border,
      border_radius,
      label,
      label_color,
      label_text_align = "center",
      text_align = "center",
    } = {...defaultProps, ...properties } as Required<InputProps>;

    console.log("value in input component", value);
    
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handle change called");
        const newValue = event.target.value;
        // Simply update the property directly - no complexity needed
        updateProperties(id, "value", newValue);
      },
      [id, updateProperties]
    );

    const baseCmpProps = {
      id,
      properties,
      meta,
      EditProperties,
      updateProperties,
      grid,
      Configuration,
    };

    return (
      <BaseComponent {...baseCmpProps} style={{ padding: "4px" }}>
        <div className="relative flex flex-col w-full">
          {label && (
            <label
              className="text-white mb-1"
              style={{
                textAlign: label_text_align,
                color: label_color,
                fontSize: "1.25em",
                fontWeight: "600",
              }}
            >
              {label}
            </label>
          )}
          <input
            placeholder={placeholder}
            value={value}
            type={type}
            className="px-2 pt-2 pb-3 w-full outline-none"
            style={{
              textAlign: text_align,
              border: "var(--border-color, " + border + ")",
              backgroundColor: background_color,
              color: "var(--text-color, " + color + ")",
              borderRadius: border_radius,
            }}
            onChange={handleChange}
          />
        </div>
      </BaseComponent>
    );
  };
  return {
    component: Input,
    manifest: getInputManifest(api)
  }
}

export default {
  createComponent
}