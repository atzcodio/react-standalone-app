interface CheckboxListProps {
  label: string;
  options: Array<string>;
  singleSelect: boolean; // True for single checkbox, False for multiple checkboxes
  value?: string[]; // default selected values (for multiple checkboxes)
  event: any;
  background_color?: string;
  padding: Array<string>;
  margin: Array<string>;
  border_radius: Array<string>;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  loading?: boolean;
}

/* .............. Types ................. */
const Configuration = {
  grid: {
    desktop: {
      width: 5, // Override width for desktop
      height: 10, // Keep height the same or adjust as needed
    },
    mobile: {
      width: 10, // Keep the same or adjust for mobile
      height: 10, // Keep the same or adjust as needed
    },
  },
  resizable: {
    width: true,
    height: true,
  },
};

const getThemeMapping = (THEME: any) => {
  return {};
};

const getEditProperties = (ElementTypes: any) => [
  {
    type: ElementTypes.GROUP("basic"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Label",
        name: "label",
        type: ElementTypes.TEXT(""),
        showLabel: true,
        width: 24,
      },
    ],
  },
  {
    type: ElementTypes.GROUP("data"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Options",
        name: "options",
        type: ElementTypes.TEXT(""),
        showLabel: true,
        width: 24,
        showFx: true,
        onlyFx: true,
        fx: `["Option 1", "Option 2", "Option 3"]`,
      },
      {
        label: "Checked Values",
        name: "value",
        type: ElementTypes.TEXT(""),
        showLabel: true,
        width: 24,
        showFx: true,
        onlyFx: true,
        fx: `["Option 2"]`,
      },
      {
        label: "Single or Multiple Select",
        name: "singleSelect",
        type: ElementTypes.TOGGLE(true),
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
      },
      {
        label: "Padding",
        name: "padding",
        type: ElementTypes.SPACING(["0px", "0px", "0px", "0px"]),
        showLabel: true,
        width: 24,
      },
      {
        label: "Margin",
        name: "margin",
        type: ElementTypes.SPACING(["0px", "0px", "0px", "0px"]),
        showLabel: true,
        width: 24,
      },
      {
        label: "Border Radius",
        name: "border_radius",
        type: ElementTypes.BORDERRADIUS(["5px", "5px", "5px", "5px"]),
        showLabel: true,
        width: 24,
      },
    ],
  },

  {
    type: ElementTypes.GROUP("text"),
    width: 24,
    elements: [
      {
        label: "Text Color",
        name: "color",
        type: ElementTypes.COLOR("#000000"),
        showLabel: true,
        width: 24,
      },
      {
        label: "Font Size",
        name: "fontSize",
        type: ElementTypes.TEXT("12px"),
        showLabel: true,
        width: 24,
      },
      {
        label: "Font Weight",
        name: "fontWeight",
        type: ElementTypes.SELECT(
          ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
          "500"
        ),
        showLabel: true,
        width: 24,
      },
    ],
  },
];

export const getCheckboxManifest = (api: any) => {
  const { ElementTypes, THEME, getDefaultProps } = api;
  return {
    name: "CheckboxList",
    EditProperties: getEditProperties(ElementTypes),
    Configuration: Configuration,
    ThemeMapping: getThemeMapping(THEME),
    defaultProps: getDefaultProps(getEditProperties(ElementTypes)),
  };
};

/* .............. Types Ended .............. */

export function createComponent(api: any) {
  const { ElementTypes, THEME, BaseComponent, getDefaultProps } = api;
  const platformDeps = api.getPlatformHooks();

  const deps: {
    React: typeof React;
  } & typeof platformDeps = {
    ...platformDeps, // platform injected dep
  };

  const { React } = api;
  const { useEffect, useState } = React;
  const { Checkbox } = api.antd;

  const getDeps = () => ({ ...platformDeps });
  const defaultProps = getDefaultProps(getEditProperties(ElementTypes));

  const CheckboxList = (props: any) => {
    const {
      id,
      grid,
      properties,
      meta,
      updateProperties,
      onFxChange,
      ...rest
    } = props;
    const {
      label,
      options,
      singleSelect,
      value = [],
      event,
      background_color,
      padding,
      margin,
      border_radius,
      color,
      fontSize,
      fontWeight,
      loading,
    } = { ...defaultProps, ...properties } as Required<CheckboxListProps>;

    const [selectedValues, setSelectedValues] = useState([]);
    const [optionsList, setOptionsList] = useState([]);

    const baseCmpProps = {
      id,
      EditProperties: getEditProperties(ElementTypes),
      properties,
      meta,
      updateProperties,
      grid,
      Configuration,
    };

    useEffect(() => {
      if (Array.isArray(options)) {
        setOptionsList(options || []);
      }

      if (Array.isArray(value)) {
        setSelectedValues(value || []);
      }
    }, [options, value]);

    const handleChange = (newSelectedValues: string[]) => {
      setSelectedValues(newSelectedValues);
    };

    const executeLogic = () => {
      console.log("Checkboxes selected:", selectedValues);
      // Handle event logic here if needed, e.g., custom flow on change
    };

    return (
      <BaseComponent
        {...baseCmpProps}
        style={{
          height: `calc(100% - (${margin[0]} + ${margin[2]}))`,
          width: `calc(100% - (${margin[1]} + ${margin[3]}))`,
        }}
      >
        <div
          style={{
            backgroundColor: background_color,
            borderRadius: `${border_radius[0]} ${border_radius[1]} ${border_radius[2]} ${border_radius[3]}`,
            margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
            padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
            color: color,
            fontSize: fontSize,
            fontWeight: fontWeight,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Label */}
          <label>{label}</label>

          {/* Checkboxes */}
          <Checkbox.Group
            value={selectedValues}
            onChange={handleChange}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {optionsList.map((option: string, index: number) => (
              <Checkbox
                key={index}
                value={option}
                //disabled={singleSelect && selectedValues.length >= 1 && !selectedValues.includes(option)}
              >
                {option}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      </BaseComponent>
    );
  };

  return {
    component: CheckboxList,
    manifest: getCheckboxManifest(api),
  };
}

export default {
  createComponent,
};
