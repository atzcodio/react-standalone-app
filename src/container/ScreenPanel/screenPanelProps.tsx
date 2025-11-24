
import { ElementTypes } from '../../elements_types';
import { BaseProps, getDefaultProps } from '../../baseComponent';


// Types for the component's props
export interface ScreenPanelProps {
  id: string;
  title?: string;
  backgroundColor?: string;
  margin: Array<string>;
  padding: Array<string>;
  height?: string;
  width?: string;
  borderRadius: Array<string>;
  fontFamily?: string;
  screenUrl?: string;
  position?: string;
  heightOrWidth?: string;
  type: string;
  header:string;
  headerheight?: string;
  // position?:'left'| 'right'| 'top'| 'bottom';
}

export const EditProperties = [
  {
    type: ElementTypes.GROUP("basic"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Title",
        name: "title",
        type: ElementTypes.TEXT('Screen Panel'),
        showLabel: true,
        width: 24
      },
      {
        label: "screenUrl",
        name: "screenUrl",
        type: ElementTypes.TEXT('url'),
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
        label: "Background Color",
        name: "backgroundColor",
        type: ElementTypes.COLOR("#ffffff"),
        showLabel: true,
        width: 24
      },
      {
        label: "Position",
        name: "position",
        type: ElementTypes.SELECT(["left", "right", "top", "bottom"], 'left'),
        showLabel: true,
        width: 24
      },
      {
        label: "heightOrWidth",
        name: "heightOrWidth",
        type: ElementTypes.TEXT('400px'),
        showLabel: true,
        width: 24
      },
      {
        label: "Height",
        name: "height",
        type: ElementTypes.TEXT('500px'),
        showLabel: true,
        width: 24
      },
      {
        label: "headerheight",
        name: "headerheight",
        type: ElementTypes.TEXT('60px'),
        showLabel: true,
        width: 24
      },
      {
        label: "Width",
        name: "width",
        type: ElementTypes.TEXT('500px'),
        showLabel: true,
        width: 24
      },
      {
        label: "borderRadius",
        name: "borderRadius",
        type: ElementTypes.BORDERRADIUS(['5px', '5px', '5px', '5px']),
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

export const defaultProps: Partial<ScreenPanelProps> = getDefaultProps(EditProperties);
