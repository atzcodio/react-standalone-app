import { runtimeDeps,BaseProps } from "./runtime";

// ----------------------
// Types
// ----------------------
interface ButtonProps extends BaseProps {
  type?: string;
  text?: string;
  background_color?: string;
  padding?: string;
  margin?: Array<string>;
  border_radius?: Array<string>;
  color?: string;
  char_limit?: number;
  border?: string;
  fontSize?: string;
  fontFamily?: string;
  lineHeight?: string;
  textAlign?: string;
  display?: string;
  text_align?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
  event?: any;
  icon?: string;
  fontWeight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  loading?: boolean | number;
  theme?: "basic" | "vivid" | "dark" | "light";
  [key: string]: any;
}

// ----------------------
// Default Props
// ----------------------
export const defaultProps: Partial<ButtonProps> = {
  text: "Click",
  background_color: "#1890ff",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "400",
  fontFamily: "inherit",
  padding: "8px 16px",
  margin: ["0px", "0px", "0px", "0px"],
  border_radius: ["4px", "4px", "4px", "4px"],
  border: "none",
  text_align: "center",
  loading: false,
  theme: "basic",
  type: "button",
};

// ----------------------
// Theme Mapping
// ----------------------
export const ThemeMapping = {
  background_color: "primary",
  color: "text",
  border: "border",
};

// ----------------------
// Configuration
// ----------------------
export const Configuration = {
  grid: {
    desktop: { width: 4, height: 4 },
    mobile: { width: 6, height: 4 },
  },
  resizable: { width: true, height: true },
};

// ----------------------
// Edit Properties
// ----------------------
export const getEditProperties = (ElementTypes: any) => [
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
    ],
  },
  {
    type: ElementTypes.GROUP("text"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Text",
        name: "text",
        type: ElementTypes.TEXT("Click"),
        showLabel: true,
        width: 24,
        showFx: true,
        onlyFx: true,
      },
      {
        label: "Text Align",
        name: "text_align",
        type: ElementTypes.TEXTALIGNMENT("center"),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Text Color",
        name: "color",
        type: ElementTypes.COLOR("#ffffff"),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Font Size",
        name: "fontSize",
        type: ElementTypes.TEXT("12px"),
        showLabel: true,
        width: 24,
        showFx: true,
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
        type: ElementTypes.CHANGETHEME("dark"),
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
        type: ElementTypes.COLOR("#ff0000"),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Border",
        name: "border",
        type: ElementTypes.TEXT("1px solid #e1e1e1"),
        width: 24,
      },
      {
        label: "Border Radius",
        name: "border_radius",
        type: ElementTypes.BORDERRADIUS(["5px", "5px", "5px", "5px"]),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Margin",
        name: "margin",
        type: ElementTypes.SPACING(["0px", "0px", "0px", "0px"]),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Padding",
        name: "padding",
        type: ElementTypes.SPACING(["0px", "0px", "0px", "0px"]),
        showLabel: true,
        width: 24,
      },
    ],
  },
  {
    type: ElementTypes.GROUP("layout"),
    width: 24,
    elements: [
      {
        label: "Type",
        name: "type",
        type: ElementTypes.TEXT(),
        showLabel: true,
        width: 24,
      },
      {
        label: "ID",
        name: "id",
        type: ElementTypes.TEXT(),
        showLabel: true,
        width: 24,
      },
      {
        label: "Char Limit",
        name: "char_limit",
        type: ElementTypes.NUMBER(),
        showLabel: true,
        width: 24,
      },
      {
        label: "Loading",
        name: "loading",
        type: ElementTypes.NUMBER(0),
        showLabel: true,
        width: 24,
      },
    ],
  },
  {
    type: ElementTypes.GROUP("events"),
    width: 24,
    elements: [
      {
        label: "Event",
        name: "event",
        type: ElementTypes.EVENTBUTTON("click", {}),
        showLabel: true,
        width: 24,
      },
    ],
  },
];

// ----------------------
// Manifest
// ----------------------
export function getButtonManifest(ElementTypes: any) {
  return {
    name: "Button",
    EditProperties: getEditProperties(ElementTypes),
    Configuration,
    ThemeMapping,
    defaultProps,
  };
}

// ----------------------
// Factory
// ----------------------

export function createComponent(api: any) {
  const { ElementTypes } = api;

  
  const platformDeps = api.getPlatformHooks();
  const deps = {
    ...runtimeDeps,      // internal deps
    ...platformDeps,     // platform injected deps
  };

  const { useExecuteFlow } = deps;

  const ButtonComponent = (props: ButtonProps) => {
    const executeFlow = useExecuteFlow();

    if (!props) {
      return null;
    }

    const {
      id,
      _mode,
      grid,
      properties,
      meta,
      updateProperties,
      onFxChange,
      ...rest
    } = props;
    const eProps = { ...defaultProps, ...properties } as Required<ButtonProps>;

    const {
      loading: rawLoading,
      theme,
      text,
      background_color,
      padding,
      border,
      border_radius,
      color,
      margin,
      text_align,
      fontSize,
      fontWeight,
    } = eProps;

    const loading =
      typeof rawLoading === "string" ? Number(rawLoading) : rawLoading;

    const executeLogic = (event: any) => {
      console.log("Button Clicked for custom flow event", event);
      if (
        _mode === "preview" &&
        executeFlow &&
        properties.event &&
        properties.event.nodes
      ) {
        executeFlow(properties.event.nodes, properties.event.nodes[0].id);
      }
    };

    // Ensure array props are arrays
    const safeMargin = Array.isArray(margin)
      ? margin
      : ["0px", "0px", "0px", "0px"];
    const safePadding = Array.isArray(padding)
      ? padding
      : ["0px", "0px", "0px", "0px"];
    const safeBorderRadius = Array.isArray(border_radius)
      ? border_radius
      : ["0px", "0px", "0px", "0px"];

    const content = (
      <button
        onClick={executeLogic}
        style={{
          backgroundColor: `var(--background-color, ${background_color})`,
          border: border,
          borderRadius: `${safeBorderRadius[0]} ${safeBorderRadius[1]} ${safeBorderRadius[2]} ${safeBorderRadius[3]}`,
          margin: `${safeMargin[0]} ${safeMargin[1]} ${safeMargin[2]} ${safeMargin[3]}`,
          padding: `${safePadding[0]} ${safePadding[1]} ${safePadding[2]} ${safePadding[3]}`,
          color: `var(--text-color, ${color})`,
          textAlign: text_align,
          width: "100%",
          height: "100%",
          fontSize: fontSize,
          fontWeight: fontWeight as any,
        }}
      >
        {text}
      </button>
    );

    return content;
  };

  return {
    component: ButtonComponent,
    manifest: getButtonManifest(ElementTypes),
  };
}

export default {
  createComponent,
  getButtonManifest,
};
