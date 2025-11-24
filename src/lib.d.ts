declare interface Properties {
  title?: string;
  type?: string;
  style?: string;
  placeholder?: string;
  label?: string;
  label_font_size?: number
  label_font_size_meter?: string
}

declare interface formulaMeta {
  [key: string]: {
    isFx: boolean;
    fx: string;
    deps: string[];
    evaluatedAt?: number;
  }
}

declare interface Component {
  type: string;
  id: string;
  properties: Properties;
  position?: { x: number; y: number }; // Position of the component
  size?: { width: number | string; height: number|string }; // Size of the component
  editedOnDRS?: boolean; // Whether the component is edited on DRS or not
  meta?: formulaMeta; // Formula metadata for component properties
}


declare interface PropertyElementProps {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
}

/* ALL ELEMENTS FOR PROPERTY RENDERING */

// declare const Generic: {
//   TEXT: { type: string; sub_type: string };
//   TEXTAREA: { type: string };
//   EMAIL: { type: string; sub_type: string };
//   TEL: { type: string; sub_type: string };
//   DATE: { type: string; sub_type: string };
//   NUMBER: { type: string; sub_type: string };
//   SELECT: (options: string[]) => { type: string; options: string[] };
//   CHECKBOX: { type: string; sub_type: string };
//   RADIO: (options: string[]) => { type: string; sub_type: string; options: string[] };
//   COLOR: { type: string; sub_type: string };
//   DROPDOWN: { type: string; options: string[] };
//   DERIVED: (structure: any) => { type: string; structure: any };
// };

// declare const ElementTypes: {
//   TEXT: typeof Generic.TEXT;
//   TEXTAREA: typeof Generic.TEXTAREA;
//   EMAIL: typeof Generic.EMAIL;
//   TELEPHONE: typeof Generic.TEL;
//   DATE: typeof Generic.DATE;
//   NUMBER: typeof Generic.NUMBER;
//   SELECT: ReturnType<typeof Generic.SELECT>;
//   CHECKBOX: typeof Generic.CHECKBOX;
//   RADIO: ReturnType<typeof Generic.RADIO>;

//   PADDING: {
//     type: 'derived'; // Indicating this is a derived type
//     structure: {
//       value: { 
//         type: typeof Generic.NUMBER; 
//         value: number; // Default value for padding
//       };
//       unit: { 
//         type: typeof Generic.DROPDOWN; 
//         value: string; // Default unit
//       };
//     };
//   };

//   MARGIN: {
//     type: 'derived'; // Indicating this is a derived type
//     structure: {
//       value: { 
//         type: typeof Generic.NUMBER; 
//         value: number; // Default value for margin
//       };
//       unit: { 
//         type: typeof Generic.DROPDOWN; 
//         value: string; // Default unit
//       };
//     };
//   };

//   COLOR: typeof Generic.COLOR;
// };