interface IconProps {
  name: 'AiOutlineHome' | 'AiOutlineSetting'; // Restricting to specific icon names
  size?: number; // Size of the icon
  color?: string; // Color of the icon
  icon: { type: string, name: string };
  textAlign: 'left' | 'center' | 'right';
}

const Configuration = {
  grid: {
    desktop: {
      width: 2, // Override width for desktop
      height: 4,// Keep height the same or adjust as needed
    },
    mobile: {
      width: 4, // Keep the same or adjust for mobile
      height: 4, // Keep the same or adjust as needed
    },
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
        name: "Icon",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
};
const getEditProperties = (ElementTypes:any, THEME: any) => [
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
        label: "Name",
        name: "name",
        type: ElementTypes.TEXT("AiOutlineHome"),
        width: 24
      },
      {
        label: "Icon",
        name: "icon",
        type: ElementTypes.ICONPICKER({ "type": "react-ai", name: "AiOutlineHome" }),
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
        label: "Size",
        name: "size",
        type: ElementTypes.NUMBER(24),
        showLabel: true,
        width: 24
      },
      {
        label: "Color",
        name: "color",
        type: ElementTypes.COLOR("#000000"),
        showLabel: true,
        width: 24
      },
      {
        label: "Text Align",
        name: "textAlign",
        type: ElementTypes.TEXTALIGNMENT('center'),
        showLabel: true,
        width: 24
      },
    ]
  },
];

export function createComponent(api: any) {

  const { ElementTypes,THEME,BaseComponent, getDefaultProps, AiIcons,AntIcons,SimpleLineIcons} = api;  
  const defaultProps: Partial<IconProps> = getDefaultProps(getEditProperties(ElementTypes, THEME));

  const Icon: React.FC<IconProps & BaseProps>  = (props) => {
    const {id, grid,  properties, meta, updateProperties, onFxChange, ...rest } = props;
    const {  name, textAlign, icon, size = 24, color = '#000' } = {...defaultProps, ...properties } as Required<IconProps>;

    // Dynamically resolve the icon based on the name prop

    const getIconComponent = (iconName: string) => {
        const IconComponent = AiIcons[iconName as keyof typeof AiIcons]; // Type assertion
        return IconComponent ? <IconComponent size={30} style={{ minWidth: size, minHeight: size, color }} /> : <span />; // Return an empty span if the icon is not found
      };
    
    const getAntIconComponent = (iconName: string) => {
      const IconComponent = AntIcons[iconName as keyof typeof AntIcons] as React.ComponentType<any>;
      // Check if IconComponent is valid and return it with a custom style, else return a fallback span


      console.log("antd icon", size)
      if (IconComponent) {
        return <IconComponent style={{ fontSize: size + "px" }}/>
      } else {
        return <span />;
      }
    };
    const getSimpleLineIconComponent = (iconName: string) => {
      const IconComponent = SimpleLineIcons[iconName as keyof typeof SimpleLineIcons];
      // Check if IconComponent is valid and return it with a custom style, else return a fallback span
      if (IconComponent) {
        return <IconComponent size={size} style={{ color }}/>
      } else {
        return <span />;
      }
    };

    let IconComponent = null;
    if(icon.type == "react-ai") {
      IconComponent = getIconComponent(icon.name);
    }
    else if(icon.type =="antd") {
      IconComponent = getAntIconComponent(icon.name);
    }
    else if (icon.type == "simpleLineIcons") {
      IconComponent = getSimpleLineIconComponent(icon.name);
    }
    //const iconMap: { [key: string]: React.ElementType } = AiIcons;

  
    if (!IconComponent) {
      console.warn(`Icon "${name}" not found.`);
      return null;
    }

    const baseCmpProps = {
      id,
      properties,
      meta,
      EditProperties: getEditProperties(ElementTypes, THEME),
      updateProperties,
      grid
    };

    return (
      <BaseComponent {...baseCmpProps} style={{padding:'4px', textAlign: textAlign }}>
        <span style={{ display: 'inline-block', color }}>
          {IconComponent}
        </span>
      </BaseComponent>
    );
  };

  return {
    component: Icon,
    manifest:getFavoriteManifest(api),
  }
}

export default {
  createComponent,
}
