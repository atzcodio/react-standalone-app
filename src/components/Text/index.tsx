
interface TextProps {
  formula?: string; // Accept an initial formula as a prop 
  value?: string,
  text: string; // The text content to display
  fontSize?: string; // Optional font size
  textColor?: string; // Optional text color
  fontWeight?: "normal" | "bold" | "bolder" | "lighter"; // Optional font weight
  backgroundColor?: string; // Optional background color,
  textAlignment:
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify"
  | "match-parent";
  data: string;
  margin: string;
  padding: string;
  borderRadius: string;
  lineHeight: string;
}

const Configuration = {
  grid: {
    desktop: {
      width: 6, // Override width for desktop
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
export const getThemeMapping = (THEME: any) => {
  return {

  }
}
export const getTextManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    const EditProperties = getEditProperties(ElementTypes,  THEME);
    return {
        name: "Text",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
};

const getEditProperties = (ElementTypes:any, THEME: any) => [
  {
    type: ElementTypes.GROUP("basic"),  // Grouping for basic properties
    elements: [
      {
        label: "Name",
        name: "_name",
        type: ElementTypes.TEXT(""),
        width: 24
      }
    ]
  },
  {
    type: ElementTypes.GROUP("data"),  // Grouping for basic properties
    elements: [
      {
        label: "Text",
        name: "text",
        type: ElementTypes.TEXT(),
        width: 24,
        showFx: true,
        onlyFx: true,
        fx: "{{'Hello World'}}"
      },
    ]
  },
  {
    type: ElementTypes.GROUP("style"),  // Grouping for style-related properties
    elements: [
      {
        label: "Background Color",
        name: "backgroundColor",
        type: ElementTypes.COLOR("#f9f9f9"),
        width: 24
      },
      {
        label: "Text Color",
        name: "textColor",
        type: ElementTypes.COLOR("#333"),
        width: 24
      },
      {
        label: "fontSize",
        name: "fontSize",
        type: ElementTypes.TEXT('16px'),
        width: 24
      },
      {
        label: "lineHeight",
        name: "lineHeight",
        type: ElementTypes.TEXT('1.2'),
        width: 24
      },
      {
        label: "fontWeight",
        name: "fontWeight",
        type: ElementTypes.SELECT(['normal', 'bold', 'bolder', 'lighter'], 'normal'),
        width: 24
      },
      {
        label: "Text Alignment",
        name: "textAlignment",
        type: ElementTypes.TEXTALIGNMENT('center'),
        width: 24
      },
      {
        label: "Border Radius",
        name: "borderRadius",
        type: ElementTypes.BORDERRADIUS(["4px", "4px", "4px", "4px"]),
        showLabel: true,
        width: 24
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
        type: ElementTypes.SPACING(['4px', '4px', '4px', '4px']),
        showLabel: true,
        width: 24
      },
    ]
  },
];

export function createComponent(api: any) {
  const { getDefaultProps, ElementTypes,BaseComponent, react } = api;
  const EditProperties = getEditProperties(ElementTypes,  api.THEME);

  const defaultProps: Partial<TextProps> = getDefaultProps(EditProperties);
  const Text: React.FC<TextProps & BaseProps> = (props) => {
    const { id,_name, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;
    const {text, fontSize, lineHeight, textAlignment,textColor, padding, margin, borderRadius, fontWeight = 'normal', backgroundColor = 'transparent' } = {...defaultProps, ...properties } as Required<TextProps>;
    const baseCmpProps = {
      id,
      properties,
      meta,
      EditProperties,
      updateProperties,
      grid
    };
    
    return (
      <BaseComponent {...baseCmpProps} style={{ textAlign: textAlignment, height: `calc(100% - (${margin[0]} + ${margin[2]}))`, width: `calc(100% - (${margin[1]} + ${margin[3]})) `, maxHeight: '70px' }}>
        <span style={{
          color: textColor, fontWeight, fontSize, padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
          borderRadius: `${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}`,
          width: '100%',
          backgroundColor: backgroundColor,
          lineHeight: lineHeight
        }}>{text}</span>
      </BaseComponent>
    );
  };
  return {
    component: Text,
    manifest: getTextManifest(api),
  }
}

export default {
  createComponent,
}