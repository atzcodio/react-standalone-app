

interface LinkProps  {
  label: string;
  url: string;
  background_color?: string;
  color?: string;
  margin: Array<string>;
  padding: Array<string>;
  border_radius: Array<string>;
  text_align: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
  font_size?: string;
  font_family?: string;
  line_height?: string;
  display?: string;
  event?: any;
  underLine: any;
}

/* .............. Types ................. */
const Configuration = {
  grid: {
    desktop: {
      width: 4,
      height: 4,
    },
    mobile: {
      width: 6,
      height: 4,
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
        width: 24
      },
      {
        label: "label",
        name: "label",
        type: ElementTypes.TEXT("Click Here"),
        showLabel: true,
        width: 24
      },
      {
        label: "url",
        name: "url",
        type: ElementTypes.TEXT("https://example.com"),
        showLabel: true,
        width: 24
      },
      {
        label: "underLine",
        name: "underLine",
        type: ElementTypes.SELECT(["Always", "Never", "OnHover"], "OnHover"),
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
        label: "background_color",
        name: "background_color",
        type: ElementTypes.COLOR("#ffffff"),
        showLabel: true,
        width: 24
      },
      {
        label: "color",
        name: "color",
        type: ElementTypes.COLOR("#0958D9"),
        showLabel: true,
        width: 24
      },
      {
        label: "text_align",
        name: "text_align",
        type: ElementTypes.TEXTALIGNMENT("center"),
        showLabel: true,
        width: 24
      },
      {
        label: "font_size",
        name: "font_size",
        type: ElementTypes.TEXT("16px"),
        showLabel: true,
        width: 24
      },
      {
        label: "font_family",
        name: "font_family",
        type: ElementTypes.TEXT("Arial, sans-serif"),
        showLabel: true,
        width: 24
      },
      {
        label: "line_height",
        name: "line_height",
        type: ElementTypes.TEXT("1.5"),
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
      {
        label: "Margin",
        name: "margin",
        type: ElementTypes.SPACING(['0px', '0px', '0px', '0px']),
        showLabel: true,
        width: 24
      },
    ]
  },
];

export const getThemeMapping = (THEME: any) => {
  return {

  }
}
export const getLinkManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    const EditProperties = getEditProperties(ElementTypes,  THEME);
    
    return {
        name: "Link",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
};

export function createComponent(api: any) {
  const { getDefaultProps, ElementTypes,BaseComponent, React, THEME } = api;
  const EditProperties = getEditProperties(ElementTypes,  THEME);
  const defaultProps: Partial<LinkProps> = getDefaultProps(EditProperties);

  const Link: React.FC<LinkProps> = (props:any) => {
    const { id, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;
    const {
    
      label,
      url,
      background_color,
      color,
      margin,
      padding,
      // border_radius,
      text_align = "center",
      font_size,
      font_family,
      line_height,
      underLine
    } = {...defaultProps, ...properties } as Required<LinkProps>;

    const baseCmpProps = {
      id,
      properties,
      meta,
      EditProperties,
      updateProperties,
      Configuration,
      grid: Configuration.grid,
    };

    return (
      <BaseComponent {...baseCmpProps} style={{
        padding:'4px',
        height: `calc(100% - (${margin[0]} + ${margin[2]}))`,
        width: `calc(100% - (${margin[1]} + ${margin[3]}))`,
      }}
      >
        <div className='flex justify-center items-center' style={{ height: '100%', width: '100%', backgroundColor: background_color, padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`, margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}` }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className='flex justify-center items-center'
            style={{
              // width:'100%',
              // height:'100%',
              justifyContent: 'center', // Center horizontally
              // alignItems: 'center', // Center vertically
              textDecoration: underLine === "Always" ? 'underline' : 'none',
              color: color,
              padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
              //   borderRadius: `${border_radius[0]} ${border_radius[1]} ${border_radius[2]} ${border_radius[3]}`,
              // textAlign: text_align,
              fontSize: font_size,
              fontFamily: font_family,
              lineHeight: line_height,

              //   textDecoration: "none",
            }}
            onMouseOver={e => underLine === "OnHover" && (e.currentTarget.style.textDecoration = 'underline')} onMouseOut={e => underLine === "OnHover" && (e.currentTarget.style.textDecoration = 'none')}>

            {label}
          </a>
        </div>
      </BaseComponent>
    );
  };
  return {
    component: Link,
    manifest: getLinkManifest(api),
  }
}

export default {
  createComponent,
}

