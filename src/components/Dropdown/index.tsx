

interface DropdownProps {
  label: string,
  value: string | any,
  placeholder: string,
  options: string | string[] | Array<string | { value: string; label: string }>,
  label_color: string,
  border?:string
  borderRadius: Array<string>,
  margin: Array<string>,
  padding: Array<string>,
  text_align?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent",
  updateProperties: (id: string, property: string, newValue: any) => void;
}
interface DropdownItem {
  label: string;
  value: string | number;
}
/* .............. Types ................. */
const Configuration = {
  grid: {
    desktop: {
      width: 4, // Override width for desktop
      height: 4, // Keep height the same or adjust as needed
    },
    mobile: {
      width: 12, // Keep the same or adjust for mobile
      height: 4, // Keep the same or adjust as needed
    },
  },
  resizable: {
    width: true,
    height: true
  }
}
const getThemeMapping = (THEME: any) => {
  return {

  }
}
export const getDateRangePickerManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    const EditProperties = getEditProperties(ElementTypes,  THEME);
    return {
        name: "Dropdown",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
};
export const getEditProperties = (ElementTypes:any, THEME: any) => [
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
        width: 24
      },
      {
        label: "label",
        name: "label",
        type: ElementTypes.TEXT("Something else"),
        width: 24
      },
      {
        label: "options",
        name: "options",
        type: ElementTypes.TEXT(),
        showLabel: true,
        width: 24,
        showFx: true,
        fx: '["one", "two", "three"]',
        onlyFx: true
      },
      {
        label: "value",
        name: "value",
        type: ElementTypes.TEXT("red"),
        showLabel: true,
        width: 24,
        showFx: true,
        fx: "two",
        onlyFx: true
      },
      {
        label: "placeholder",
        name: "placeholder",
        type: ElementTypes.TEXT("Search"),
        showLabel: true,
        width: 24
      },
    ]
  },
  {
    type: ElementTypes.GROUP("style"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Text Alignment",
        name: "text_alignement",
        type: ElementTypes.TEXTALIGNMENT("center"),
        width: 24,
        showFx: true,
      },
      {
        label: "Label Color",
        name: "label_color",
        type: ElementTypes.COLOR("#000000"),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Border",
        name: "border",
        type: ElementTypes.TEXT("1px solid #e1e1e1"),
        width: 24,
        themePropertyName:THEME.borderColor,
        showFx: true,
      },
      {
        label: "Border Radius",
        name: "borderRadius",
        type: ElementTypes.BORDERRADIUS(["5px", "5px", "5px", "5px"]),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Margin",
        name: "margin",
        type: ElementTypes.SPACING(['2px', '2px', '2px', '2px']),
        showLabel: true,
        width: 24
      },
      {
        label: "Padding",
        name: "padding",
        type: ElementTypes.SPACING(['0px', '0px', '0px', '0px']),
        showLabel: true,
        width: 24
      },

    ]
  },
];

/* .............. Types Ended .............. */
export function createComponent(api: any) {
  const { React, ElementTypes, antd, BaseComponent, getDefaultProps, THEME } = api;
  const EditProperties = getEditProperties(ElementTypes, THEME);
  const {useEffect, useState } = React;
  const { Select } = antd;
  const Dropdown = (props:any) => {
    const {id, grid,  properties, meta, updateProperties } = props;
    const defaultProps: Partial<DropdownProps> = getDefaultProps(EditProperties);


    const {  margin, options, value, placeholder, border, borderRadius } =
      { ...defaultProps, ...properties } as Required<DropdownProps>;

    // Parse options
    let optionsJson: DropdownItem[] = [];
    try {
      if(typeof options == "string") {
        const parsed = JSON.parse(options);
        optionsJson = parsed.map((item: string | number) => ({
          label: String(item),
          value: item,
        }));
      }
      else if(Array.isArray(options)) {
        let parsed: string[] = options as typeof options as string[];
        optionsJson = parsed.map((item:string | number) => ({
          label: String(item),
          value: item,
        }));
      }
    } catch {
      console.warn("Invalid options JSON:", options);
    }

    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
      if(optionsJson.find((opt:any) => opt.value === value)) {
        setSelectedOption(value);
      }
      else {
        setSelectedOption("");
      }
      
    }, [value]);

    const handleSelect = (newValue: string | number) => {
      setSelectedOption(newValue);
      updateProperties(id, "value", newValue);
    };

    const baseCmpProps = {
      id,
      properties,
      meta,
      EditProperties,
      updateProperties,
      grid: properties.grid,
      Configuration,
    };

    return (
      <BaseComponent
        {...baseCmpProps}
        style={{
          height: `calc(100% - (${margin[0]} + ${margin[2]}))`,
          width: `calc(100% - (${margin[1]} + ${margin[3]}))`,
          maxHeight: "100px",
        }}
      >
        <Select
          placeholder={placeholder}
          value={selectedOption} // ✅ Correct value type
          onChange={handleSelect} // ✅ Correct callback
          options={optionsJson}
          style={{
            width: "100%",
            height: "100%",
            border: border,
            borderRadius: borderRadius.join(" "),
            margin: margin.join(" "),
          }}
        />
      </BaseComponent>
    );
  };
  return {
    component: Dropdown,
    manifest: getDateRangePickerManifest(api),
  }
}

export default {
  createComponent
}

