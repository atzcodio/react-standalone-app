import { BaseComponent, BaseConfiguration, BaseProps, getDefaultProps, LowCodeComponent } from '../../baseComponent'
import React, { Children, useEffect } from 'react';
import { ElementTypes } from '../../elements_types';
import executeFlow from '../../FlowExecution'
import { useComponentContext } from "./../../context/componentContext";
import { Button as AntButton } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { THEME, THEMEMAP, ComponentThemeMapping } from '../../props';

interface ButtonProps extends BaseProps {
  // You can add more specific props here if needed
  type?: string;
  text?: string;
  background_color?: string;
  padding: string;
  margin: Array<string>;
  // border_radius?:string;
  border_radius: Array<string>;
  color?: string;
  char_limit?: number
  border?: string
  fontSize?: string
  fontFamily?: string
  lineHeight?: string
  textAlign?: string
  display?: string
  text_align: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent"
  event: any;
  icon: string;
  fontWeight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"; // Optional font weight
  loading?: boolean | number
  theme:"basic" | "vivid"  | "dark" | "light";
  // border_radius :Array<string>;
}

/* .............. Types ................. */

// Theme mapping configuration for Button component
const ThemeMapping: ComponentThemeMapping = {
  background_color: THEME.primaryColor,
  color: THEME.textColor,
  border: THEME.borderColor
};

const Configuration = {
  ...BaseConfiguration,
  grid: {
    desktop: {
      width: 4, // Override width for desktop
      height: 4 // Keep height the same or adjust as needed
    },
    mobile: {
      width: 6, // Keep the same or adjust for mobile
      height: 4, // Keep the same or adjust as needed
    },
  },
  resizable: {
    width: true,
    height: true
  }
}
const textAlignOptions = ["start", "end", "left", "right", "center", "justify", "match-parent"];

const EditProperties = [
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
        fx: `{{"Click"}}`
      },
      {
        label: "Text Align",
        name: "text_align",
        type: ElementTypes.TEXTALIGNMENT("center"),
        showLabel: true,
        width: 24,
        showFx: true
      },
      {
        label: "Text Color",
        name: "color",
        type: ElementTypes.COLOR("#ffffff"),
        showLabel: true,
        width: 24,
        showFx: true
      },
      {
        label: "Font Size",
        name: "fontSize",
        type: ElementTypes.TEXT("12px"),
        showLabel: true,
        width: 24,
        showFx: true
      },
      {
        label: "Font Weight",
        name: "fontWeight",
        type: ElementTypes.SELECT(['100', '200', '300', '400', '500', '600', '700', '800', '900'], '500'),
        showLabel: true,
        width: 24,
        showFx: true
      },
    ]
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
        width: 24
      }
    ]
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
        width: 24
      },
      {
        label: "Border Radius",
        name: "border_radius",
        type: ElementTypes.BORDERRADIUS(['5px', '5px', '5px', '5px']),
        showLabel: true,
        width: 24,
        showFx: true,
      },
      {
        label: "Margin",
        name: "margin",
        type: ElementTypes.SPACING(['0px', '0px', '0px', '0px']),
        showLabel: true,
        width: 24,
        showFx: true,
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

  {
    type: ElementTypes.GROUP("layout"),
    width: 24,
    elements: [
      {
        label: "Type",
        name: "type",
        type: ElementTypes.TEXT(),
        showLabel: true,
        width: 24
      },
      {
        label: "ID",
        name: "id",
        type: ElementTypes.TEXT(),
        showLabel: true,
        width: 24
      },
      {
        label: "Char Limit",
        name: "char_limit",
        type: ElementTypes.NUMBER(),
        showLabel: true,
        width: 24
      },
      {
        label: "Loading",
        name: "loading",
        type: ElementTypes.NUMBER(),
        showLabel: true,
        width: 24
      }
    ]
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
        width: 24
      }
    ]
  }
];


console.log("EditProperties", EditProperties);
/* .............. Types Ended .............. */
const defaultProps: Partial<ButtonProps> = getDefaultProps(EditProperties);

const Button: LowCodeComponent<ButtonProps> = (props: ButtonProps) => {
  // Destructuring Props
  const navigate = useNavigate();
  const {id, _mode, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;
  let {loading = false,theme, text, background_color, padding, border, border_radius, color, margin, text_align = "center", fontSize, fontWeight } = { ...defaultProps, ...properties } as Required<ButtonProps>;
  const { setSidebar, setPopup,setHeader, selectedSidebarId, selectedPopupId,selectedHeaderId, screens, evaluateFormula, updateComponentByName, setSelectedScreenIndex, selectedScreenIndex, initandOpenSidebar, initandOpenPopup,initandOpenHeader } = useComponentContext();

  if (typeof loading == "string") {
    loading = Number(loading)
  }
  const executeLogic = (event: any) => {
    console.log("Button Clicked for custom flow event", event);
    if (_mode == "preview") {
      let options = {
        setSidebar,
        setPopup,
        setHeader,
        screens,
        selectedSidebarId,
        selectedPopupId,
        selectedHeaderId,
        setSelectedScreenIndex,
        selectedScreenIndex,
        initandOpenSidebar,
        initandOpenPopup,
        initandOpenHeader,
        navigate
      }
      executeFlow(properties.event.nodes, properties.event.nodes[0].id, options);
    }
  }
  console.log("Button ID:", id, properties.event);

  const baseCmpProps = {
    id,
    properties,
    meta,
    EditProperties,
    updateProperties,
    grid,
  };
  return (
    <BaseComponent {...baseCmpProps} style={{ height: `calc(100% - (${margin[0]} + ${margin[2]}))`, width: `calc(100% - (${margin[1]} + ${margin[3]}))`, padding: '0.5px' }} >
      <AntButton loading={!!loading} onClick={executeLogic} style={{
        // backgroundColor: background_color, 
        backgroundColor: "var(--background-color, " + background_color + ")",
        // backgroundColor: "var(--background-color, " + computedBgColor + ")",
        // backgroundColor: `var(--background-color, ${background_color})`,
        border: border,
        borderRadius: `${border_radius[0]} ${border_radius[1]} ${border_radius[2]} ${border_radius[3]}`,
        margin:`${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
        padding:`${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
        color: "var(--text-color, " + color + ")",
        textAlign:text_align,
        width:'100%',height:'100%',
        fontSize:fontSize,
        fontWeight:fontWeight
      }}>{text}</AntButton>
    </BaseComponent>
  );
};

Button.EditProperties = EditProperties;
Button.Configuration = Configuration;
Button.defaultProps = defaultProps;
Button.ThemeMapping = ThemeMapping;

export default Button;