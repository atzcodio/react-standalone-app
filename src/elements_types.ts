import { Margin } from "@mui/icons-material";

const Generic = {
  TEXT: (defaultValue = "") => ({ type: "text", sub_type: "text", defaultValue }),
  TEXTAREA: (defaultValue = "") => ({ type: "textarea", defaultValue }),
  EMAIL: (defaultValue = "") => ({ type: "email", sub_type: "email", defaultValue }),
  TEL: (defaultValue = "") => ({ type: "tel", sub_type: "tel", defaultValue }),
  DATE: (defaultValue = new Date()) => ({ type: "date", sub_type: "date", defaultValue }),
  NUMBER: (defaultValue = 0) => ({ type: "number", sub_type: "number", defaultValue }),
  TOGGLE: (defaultValue = false) => ({ type: "toggle", sub_type: "toggle", defaultValue }),
  LOCATION: (defaultValue: [number, number] = [0, 0]) => ({ type: "location", sub_type: "location", defaultValue }),
  CODEEDITOR: (defaultValue= "") => ({type: "codeEditor",sub_type: "codeEditor",defaultValue}),
  
  SELECT: (options: string[] | Array<{value: string, label: string, icon?: any}>, defaultValue: string = "") => ({
    type: "select",
    options,
    defaultValue: defaultValue || (Array.isArray(options) && options.length > 0 
      ? (typeof options[0] === 'string' ? options[0] : (options[0] as {value: string, label: string, icon?: any}).value)
      : ""),
  }),
  TEXTALIGNMENT: (defaultValue:string="") => ({
    type: "textAlignment",
    defaultValue: defaultValue, // Default to first option if none provided
  }),
  CHECKBOX: (defaultValue = false) => ({ type: "checkbox", sub_type: "checkbox", defaultValue }),
  RADIO: (options:string[], defaultValue:string="") => ({
    type: "radio",
    sub_type: "radio",
    options,
    defaultValue: defaultValue || options[0], // Default to first option if none provided
  }),
  COLOR: (defaultValue = "#000000") => ({ type: "color", sub_type: "color", defaultValue:defaultValue }),
  TEXTCODEEDITOR: (defaultValue: string[] |Array<Record<string, any>> = []) => ({ type: "textCodeEditor", sub_type: "textCodeEditor", lang: "json", defaultValue }),
  LANGUAGEEDITOR: (lang: string,defaultValue: string[] | Array<Record<string, any>> = []) => ({ type: "textCodeEditor", sub_type: "textCodeEditor", lang, defaultValue }),
  MARKCODEEDITOR: (defaultValue: any="", suggestionArray: string [] = []) => ({ type: "markCodeEditor", sub_type: "markCodeEditor", lang: "markdown", defaultValue, suggestionArray }),
  DROPDOWN: (defaultValue = "px") => ({ type: "select", options: ["px", "em", "rem", "%"], defaultValue }),
  EVENTS: (events:string[]) => ({ type: "event_list", events: events }),
  EVENTBUTTON: (event_name:string,defaultValue: any) => ({type: "eventButton",event_name,defaultValue }),
  IMAGEPICKER: (defaultValue = "") => ({ type: "imagePicker", defaultValue }),
  DERIVED: (structure:any) => ({ type: "derived", structure }),
  JSON: (defaultValue:object|any) => ({
    type:"json",
    sub_type: "json",
    defaultValue
  }),
  BORDERRADIUS: (defaultValue=['0','0','0','0']) =>  ({type:"borderRadius",defaultValue}),
  SPACING : (defaultValue=['0','0','0','0']) =>  ({type:"spacing",defaultValue}),
  REPEATBLOCK: (fields: Record<string, any>, defaultValue:Array<Record<string, any>>,options:Record<string,boolean|string>) =>  ({type:"repeatBlock",fields,defaultValue,options}),
  ICONPICKER: (defaultValue: {type:string, name:string}) => ({type:"iconPicker", defaultValue}),
  GROUP: (label:any) => ({ type: "group", label }),
  CHANGETHEME: (defaultValue = "light") => ({ type: "changeTheme", sub_type: "theme", defaultValue })
};
export const ExtendedGeneric = {
  VALUE_AND_UNIT: {
    value: { 
      type: Generic.NUMBER, 
      value: 0, // Default value for padding
    },
    unit: { 
      type: Generic.DROPDOWN, 
      value: 'px', // Default unit
    },
  }
};


export const ElementTypes = {
  TEXT: Generic.TEXT,
  TEXTAREA: Generic.TEXTAREA,
  EMAIL: Generic.EMAIL,
  TELEPHONE: Generic.TEL,
  DATE: Generic.DATE,
  NUMBER: Generic.NUMBER,
  SELECT: Generic.SELECT, // Example options
  CHECKBOX: Generic.CHECKBOX,
  RADIO: Generic.RADIO, // Example options
  COLOR: Generic.COLOR,
  TEXTCODEEDITOR: Generic.TEXTCODEEDITOR,
  LANGUAGEEDITOR: Generic.LANGUAGEEDITOR,
  MARKCODEEDITOR: Generic.MARKCODEEDITOR,
  TEXTALIGNMENT: Generic.TEXTALIGNMENT,
  IMAGEPICKER: Generic.IMAGEPICKER,
  JSON: Generic.JSON,
  EVENTBUTTON: Generic.EVENTBUTTON,
  TOGGLE:Generic.TOGGLE,
  LOCATION: Generic.LOCATION,
  CODEEDITOR: Generic.CODEEDITOR,
  BORDERRADIUS:Generic.BORDERRADIUS,
  SPACING: Generic.SPACING,
  REPEATBLOCK: Generic.REPEATBLOCK,
  ICONPICKER: Generic.ICONPICKER,
  GROUP:Generic.GROUP,
  CHANGETHEME:Generic.CHANGETHEME,

  // PADDING: {
  //   left: Generic.VALUE_AND_UNIT,
  //   right: Generic.VALUE_AND_UNIT,
  //   top: Generic.VALUE_AND_UNIT,
  //   bottom: Generic.VALUE_AND_UNIT,
  // },
  // MARGIN: {
  //   left: Generic.VALUE_AND_UNIT,
  //   right: Generic.VALUE_AND_UNIT,
  //   top: Generic.VALUE_AND_UNIT,
  //   bottom: Generic.VALUE_AND_UNIT,
  // },
};



// elementTypes.ts
// const Generic = {
//   TEXT: { type: "text", sub_type: "text" },
//   TEXTAREA: { type: "textarea" },
//   EMAIL: { type: "email", sub_type: "email" },
//   TEL: { type: "tel", sub_type: "tel" },
//   DATE: { type: "date", sub_type: "date" },
//   NUMBER: { type: "number", sub_type: "number" },
//   SELECT: (options: string[]) => ({ type: "select", options }),
//   CHECKBOX: { type: "checkbox", sub_type: "checkbox" },
//   RADIO: (options: string[]) => ({ type: "radio", sub_type: "radio", options }),
//   COLOR: { type: "color", sub_type: "color" },
//   DROPDOWN: { type: "select", options: ["px", "em", "rem", "%"] },
//   DERIVED: (structure: any) => ({ type: "derived", structure }),
// };

// const ExtendedGeneric = {
//   VALUE_AND_UNIT: {
//     value: { 
//       type: Generic.NUMBER.type, 
//       value: 0, // Default value for padding
//     },
//     unit: { 
//       type: Generic.DROPDOWN.type, 
//       value: 'px', // Default unit
//     },
//   }
// };

// export const ElementTypes = {
//   TEXT: Generic.TEXT,
//   TEXTAREA: Generic.TEXTAREA,
//   EMAIL: Generic.EMAIL,
//   TELEPHONE: Generic.TEL,
//   DATE: Generic.DATE,
//   NUMBER: Generic.NUMBER,
//   SELECT: Generic.SELECT(["Option 1", "Option 2", "Option 3"]), // Example options
//   CHECKBOX: Generic.CHECKBOX,
//   RADIO: Generic.RADIO(["Radio 1", "Radio 2"]), // Example options
//   PADDING: {
//     left: ExtendedGeneric.VALUE_AND_UNIT,
//     right: ExtendedGeneric.VALUE_AND_UNIT,
//     top: ExtendedGeneric.VALUE_AND_UNIT,
//     bottom: ExtendedGeneric.VALUE_AND_UNIT
//   },
//   // PADDING: {
//   //   type: 'derived',
//   //   structure: {
//   //     left: ExtendedGeneric.VALUE_AND_UNIT,
//   //     right: ExtendedGeneric.VALUE_AND_UNIT,
//   //     top: ExtendedGeneric.VALUE_AND_UNIT,
//   //     bottom: ExtendedGeneric.VALUE_AND_UNIT
//   //   }
//   // },
//   MARGIN: {
//     left: ExtendedGeneric.VALUE_AND_UNIT,
//     right: ExtendedGeneric.VALUE_AND_UNIT,
//     top: ExtendedGeneric.VALUE_AND_UNIT,
//     bottom: ExtendedGeneric.VALUE_AND_UNIT
//   },
//   COLOR: Generic.COLOR,
// };



