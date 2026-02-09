interface DatePickerProps {
  title?: string;
  placeholder?: string;
  date_format?: string;
  background_color?: string;
  border?: string;
  border_radius: Array<string>;
  height?: string;
  width?: string;
  padding: Array<string>;
  margin: Array<string>;
  color?: string;
  value: string;
}

const Configuration = {
  grid: {
    desktop: {
      width: 5, // Override width for desktop
      height: 8, // Keep height the same or adjust as needed
    },
    mobile: {
      width: 8, // Keep the same or adjust for mobile
      height: 5, // Keep the same or adjust as needed
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

export const getDatePickerManifest = (api: any) => {
  const { ElementTypes, THEME, getDefaultProps } = api;
  const EditProperties = getEditProperties(ElementTypes);
  return {
    name: "DatePicker",
    EditProperties: EditProperties,
    Configuration: Configuration,
    ThemeMapping: getThemeMapping(THEME),
    defaultProps: getDefaultProps(EditProperties),
  };
};

const getEditProperties = (ElementTypes: any) => [
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
        type: ElementTypes.TEXT("Select Date"),
        width: 24,
      },
      {
        label: "placeholder",
        name: "placeholder",
        type: ElementTypes.TEXT("YYYY-MM-DD"),
        width: 24,
      },
      {
        label: "date_format",
        name: "date_format",
        type: ElementTypes.TEXT("YYYY-MM-DD"),
        width: 24,
      },
    ],
  },
  {
    type: ElementTypes.GROUP("Data"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Value",
        name: "value",
        type: ElementTypes.DATE(),
        showLabel: true,
        width: 24,
        showFx: true,
        fx: "2023-10-01",
      },
    ],
  },
  {
    type: ElementTypes.GROUP("style"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "backgroundColor",
        name: "background_color",
        type: ElementTypes.COLOR("white"),
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
      {
        label: "color",
        name: "color",
        type: ElementTypes.COLOR("#000000"),
        showLabel: true,
        width: 24,
      },
      {
        label: "height",
        name: "height",
        type: ElementTypes.TEXT("75px"),
        showLabel: true,
        width: 24,
      },
      {
        label: "width",
        name: "width",
        type: ElementTypes.TEXT("200px"),
        showLabel: true,
        width: 24,
      },
      {
        label: "Border",
        name: "border",
        type: ElementTypes.TEXT("1px solid #e1e1e1"),
        width: 24,
      },
      {
        label: "Padding",
        name: "padding",
        type: ElementTypes.SPACING(["8px", "8px", "8px", "8px"]),
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
    ],
  },
];

export const createComponent = (api: any) => {
  const { ElementTypes, THEME, BaseComponent, getDefaultProps } = api;
  const platformDeps = api.getPlatformHooks();

  const deps: {
    React: typeof React;
  } & typeof platformDeps = {
    ...platformDeps, // platform injected dep
  };

  const { React } = deps;

  const getDeps = () => ({ ...platformDeps });
  const EditProperties = getEditProperties(ElementTypes);
  const defaultProps = getDefaultProps(EditProperties);

  const DatePicker = (props: any) => {
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
      title,
      value,
      placeholder,
      background_color,
      border,
      border_radius,
      color,
      height,
      width,
      margin,
      padding,
    } = { ...defaultProps, ...properties } as Required<DatePickerProps>;

    // Handle value change
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      console.log("DatePicker value changed:", {
        id,
        newValue,
        oldValue: value,
      });
      if (updateProperties) {
        updateProperties(id, "value", newValue);
      }
    };

    const baseCmpProps = {
      id,
      properties,
      meta,
      EditProperties,
      updateProperties,
      grid,
    };

    return (
      <BaseComponent
        {...baseCmpProps}
        style={{
          height: `calc(100% - (${margin[0]} + ${margin[2]}))`,
          width: `calc(100% - (${margin[1]} + ${margin[3]}))`,
          maxHeight: "110px",
          // backgroundColor: background_color,
          padding: "4px",
        }}
      >
        <div
          style={{
            // borderRadius: `${border_radius[0]} ${border_radius[1]} ${border_radius[2]} ${border_radius[3]}`,
            boxSizing: "border-box",
            // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "5px", // Space between label and input
          }}
        >
          {title && (
            <span
              style={{
                fontSize: "1.25em", // Adjust font size to fit
                fontWeight: "600",
                color: "#333",
                lineHeight: "1.2", // Ensure proper spacing for text
                textAlign: "left", // Align text for better readability
              }}
            >
              <label htmlFor={id}>{title}</label>
            </span>
          )}
          <input
            type="date"
            placeholder={placeholder}
            value={value}
            onChange={handleDateChange}
            style={{
              backgroundColor: background_color,
              borderRadius: `${border_radius[0]} ${border_radius[1]} ${border_radius[2]} ${border_radius[3]}`,
              color,
              height: "3em",
              width: "100%",
              border: border,
              boxSizing: "border-box", // Ensure padding or borders don’t overflow
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
              margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6c63ff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>
      </BaseComponent>
    );
  };

  return {
    component: DatePicker,
    manifest: getDatePickerManifest(api),
  };
};

export default {
  createComponent,
};
