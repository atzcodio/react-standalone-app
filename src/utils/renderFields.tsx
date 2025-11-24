import { All, getPropsList } from '../allComponents';
import ScreenAsComponent from './../container/ScreenPanel/ScreenAsComponent'

interface ComponentWithPropsList {
  PropsList?: string[];
  Configuration?:{}
  defaultProps?: {}
  EditProperties?: EditProperties
}

export interface Screen {
  id: string;
  type: string;
  body: Component[];
  defaultProps?: Record<string, any>;
  properties?: Record<string, any>;
  PropsList?: string[];
  EditProperties?: Record<string, any>;
}

interface EditProperty {
  type: string | number | boolean | null | undefined | object;
  defaultValue: string | number | boolean | null | undefined | object;
  // Add other necessary fields based on ElementTypes
}

interface EditProperties {
  [key: string]: EditProperty; // Allow indexing by string key
}

export function renderProptiyFields(component: Component) {
  if (!!component) {
    var p = All;
    console.log(All, p);
    const cmpd = All[component.type];
    return cmpd.PropsList as string[];
  }
  return [];
}

export function renderDefaultProps(component: Component) {
  if (!!component) {
    var p = All;
    console.log(All, p);
    const cmpd = All[component.type];
    return cmpd.defaultProps || {} as {};
  }
  return [];
}


export function renderEditProperties(component: Component) {
  if (!!component) {
    var p = All;
    console.log(All, p);
    const cmpd = All[component.type];
    return cmpd.EditProperties || {} as {};
  }
  return [];
}

export function renderScreenProptiyFields(screen: Screen) {
  if (!!screen) {
    return ScreenAsComponent.PropsList as string[];
  }
  return [];
}

export function renderScreenDefaultProps(screen: Screen) {
  if (!!screen) {
    return ScreenAsComponent.defaultProps || {} as {};
  }
  return [];
}


export function renderScreenEditProperties(screen : Screen) {
  if (!!screen) {
    return ScreenAsComponent.EditProperties || {} as {};
  }
  return [];
}