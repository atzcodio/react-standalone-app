

interface IconTextProps {
  icon: { type: string, name: string };
  text: string;
  size?: number; // Size of the icon
  iconColor?: string; // Color of the icon
  textColor?: string; // Color of the text
  textAlign: 'left' | 'center' | 'right';
  backgroundColor?: string; // Background color of the component
  gap?: number; // Gap between icon and text
  iconPosition: any;
  margin: Array<string>;
}

const Configuration = {
  grid: {
    desktop: {
      width: 6,
      height: 6,
    },
    mobile: {
      width: 5,
      height: 10,
    },
  },
  resizable: {
    width: true,
    height: true,
  },
};


export const getThemeMapping = (THEME: any) => {
  return {
  }
}

export const getFavoriteManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    const EditProperties = getEditProperties(ElementTypes,  THEME);
    return {
        name: "IconText",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
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
      }
    ]
  },
  {
    type: ElementTypes.GROUP("Icon"),
    width: 24,
    collaseOpen: true,
    elements: [{
        label: "Icon",
        name: "icon",
        type: ElementTypes.ICONPICKER({ type: 'react-ai', name: 'AiFillGithub' }),
        showLabel: true,
        width: 24
      },
      {
        label: "Size",
        name: "size",
        type: ElementTypes.NUMBER(24),
        showLabel: true,
        width: 24,
        showFx: true
      },{
        label: "Icon Color",
        name: "iconColor",
        type: ElementTypes.COLOR('#000000'),
        showLabel: true,
        width: 24,
        showFx: true
      },
      {
        label: "Icon Position",
        name: "iconPosition",
        type: ElementTypes.SELECT(["LEFT", "RIGHT"], "LEFT"),
        showLabel: true,
        width: 24,
        showFx: true
      },]
  },
  {
    type: ElementTypes.GROUP("Text"),
    width: 24,
    collaseOpen: true,
    elements: [{
        label: "Text",
        name: "text",
        type: ElementTypes.TEXT('Hello Programmer!'),
        showLabel: true,
        width: 24,
        showFx: true
      }, {
        label: "Text Color",
        name: "textColor",
        type: ElementTypes.COLOR('#000000'),
        showLabel: true,
        width: 24,
        showFx: true
      },{
        label: "Text Align",
        name: "textAlign",
        type: ElementTypes.TEXTALIGNMENT('left'),
        showLabel: true,
        width: 24,
        showFx: true
      }]
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
        showLabel: true,
        width: 24,
        showFx: true
      },
      {
        label: "Gap",
        name: "gap",
        type: ElementTypes.NUMBER(8),
        showLabel: true,
        width: 24,
        showFx: true
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


export function createComponent(api: any) {
  const { ElementTypes,THEME,BaseComponent, getDefaultProps, AiIcons} = api;
  const EditProperties = getEditProperties(ElementTypes, THEME);
  const defaultProps: Partial<IconTextProps> = getDefaultProps(EditProperties);

  const IconText: React.FC<IconTextProps & BaseProps> = (props) => {
    const { id, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;
    const {  icon, text, textAlign, size = 24, iconColor = '#000', textColor = '#000', margin, backgroundColor = '#ffffff', gap = 8, iconPosition = 'left' } = {...defaultProps, ...properties } as Required<IconTextProps>;

    // Dynamically resolve the icon based on the name prop
    const iconMap: { [key: string]: React.ElementType } = AiIcons;
    const IconComponent = iconMap[icon.name];

    if (!IconComponent) {
      console.warn(`Icon "${icon.name}" not found.`);
      return null;
    }

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
      <BaseComponent {...baseCmpProps} style={{ textAlign, backgroundColor, padding: '10px', borderRadius: '4px', display: 'flex', height: `calc(100% - (${margin[0]} + ${margin[2]}))`, width: `calc(100% - (${margin[1]} + ${margin[3]}))` }}>
        <div style={{ display: "flex", alignItems: 'center', justifyContent: textAlign, height: '100%', width: '100%', margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}` }}>
          {iconPosition === 'LEFT' && <IconComponent style={{ width: size, height: size, color: iconColor, marginRight: gap }} />}
          <span style={{ color: textColor }}>{text}</span>
          {iconPosition === 'RIGHT' && <IconComponent style={{ width: size, height: size, color: iconColor, marginLeft: gap }} />}
        </div>
      </BaseComponent>
    );
  };
  return {
    component: IconText,
    manifest:getFavoriteManifest(api),
  }
}


export default {
  createComponent
}