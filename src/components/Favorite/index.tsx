interface FavProps {
  formula?: string; // Accept an initial formula as a prop 
  value?: boolean,
  fontSize?: number; // Optional font size
  color?: string; // Optional text color
  fontWeight?: "normal" | "bold" | "bolder" | "lighter"; // Optional font weight
  backgroundColor?: string; // Optional background color,
  aligment:
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
  background_color?: string;
  is_hidden: boolean;
}

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
        label: "text",
        name: "text",
        type: ElementTypes.TEXT('Sample text content'),
        showLabel: true,
        width: 24
      },
      {
        label: "Hidden",
        name: "is_hidden",
        type: ElementTypes.TOGGLE(false),
        showLabel: true,
        width: 24,
        showFx: true
      },

    ]
  },
  {
    type: ElementTypes.GROUP("data"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Status",
        name: "value",
        type: ElementTypes.TOGGLE(true),
        width: 24,
        showFx: true,
      },
    ]
  },
  {
    type: ElementTypes.GROUP("style"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "color",
        name: "color",
        type: ElementTypes.COLOR("#f5222d"),
        showLabel: true,
        width: 24
      },
      {
        label: "aligment",
        name: "aligment",
        type: ElementTypes.TEXTALIGNMENT('center'),
        showLabel: true,
        width: 24
      },
      {
        label: "fontSize",
        name: "fontSize",
        type: ElementTypes.TEXT('30px'),
        showLabel: true,
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
        label: "Padding",
        name: "padding",
        type: ElementTypes.SPACING(['4px', '4px', '4px', '4px']),
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
    ]
  },
];

export const Configuration = {
  grid: {
    desktop: {
      width: 2,
      height: 4
    },
    mobile: {
      width: 3,
      height: 4
    }
  },
  resizable: {
    width: true,
    height: true
  }
};

export const getThemeMapping = (THEME: any) => {
  return {
  }
}
export const getFavoriteManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    const EditProperties = getEditProperties(ElementTypes,  THEME);
    return {
        name: "Favorite",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
};

export function createComponent(api: any) {

  const { ElementTypes, THEME, BaseComponent, getDefaultProps, React, AiIcons} = api;  
  const { useState, useEffect } = React;
  const { AiFillHeart, AiOutlineHeart } = AiIcons;

  const EditProperties = getEditProperties(ElementTypes, THEME);
  
  const defaultProps: Partial<FavProps> = getDefaultProps(EditProperties);
  const Favorite = (props:any) => {
    const { id, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;
    const { fontSize, aligment,is_hidden, padding, margin, borderRadius, color, value, formula = "", fontWeight = 'normal', backgroundColor = 'transparent' } = {...defaultProps, ...properties } as Required<FavProps>;

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
    setIsFavorite(value === true);
    }, [value]);

    let flexAlignment = "center";
    switch (aligment) {
      case "start":
        flexAlignment = "flex-start";
        break;
      case "end":
        flexAlignment = "flex-end";
        break;
      case "left":
        flexAlignment = "flex-start";
        break;
      case "right":
        flexAlignment = "flex-end";
        break;
      case "center":
        flexAlignment = "center";
        break;
      case "justify":
        flexAlignment = "space-between";
        break;
      case "match-parent":
        flexAlignment = "stretch";
        break;
      default:
        flexAlignment = "center";
        break;
    }

    const baseCmpProps = {
      id,
      properties,
      meta,
      EditProperties,
      updateProperties,
      grid
    };
    if(is_hidden) return null;
    return (
      <BaseComponent {...baseCmpProps} style={{ height: `calc(100% - (${margin[0]} + ${margin[2]}))`, width: `calc(100% - (${margin[1]} + ${margin[3]})) ` }}>
        <span style={{
          color: color, textAlign: aligment, fontWeight, fontSize: fontSize, padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
          width: '100%',
          display: "flex",
          justifyContent: flexAlignment,
          alignItems: "center",
          height: "100%"
        }}
        >
          {isFavorite ? <AiFillHeart onClick={() => setIsFavorite(false)} style={{ cursor: 'pointer' }} /> : <AiOutlineHeart onClick={() => setIsFavorite(true)} style={{ cursor: 'pointer' }} />}
        </span>
      </BaseComponent>
    );
  };

  return {
    component: Favorite,
    manifest:getFavoriteManifest(api),
  }
}

export default {
  createComponent
}
