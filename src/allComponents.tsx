import Table from "./components/Table";
import ProductInfo from "./components/ProductInfo";
import Button from "./components/Button";
import { BaseConfiguration } from "./baseComponent";
/* COMPONENTS REGISTRATION STEPS */

/* 
  1- Create components in src/components
  2- import and assign it cmpMap in allComponents.tsx file
  3- Give  reference in components.ref.ts to enable it to show in listing of components in left side

*/
/* AFTER DEFINING HERE  ADD IN components.ref.ts file */



type ComponentType = React.ComponentType<Component>;

interface EditProperty {
  type: string | number | boolean | null | undefined | object;
  defaultValue: string | number | boolean | null | undefined | object;
  // Add other necessary fields based on ElementTypes
}

interface EditProperties {
  [key: string]: EditProperty; // Allow indexing by string key
}

interface ComponentWithPropsList {
  PropsList?: string[];
  Configuration?: {}
  defaultProps?: {}
  EditProperties?: EditProperties
}

interface Props {
  [key: string]: ComponentWithPropsList;
}

const cmpMap = {
  Table,
  ProductInfo,
  Button
}

export const All: Props = cmpMap;
export const ComponentMap: { [key: string]: React.ComponentType<any> } = cmpMap
export function getPropsList(componentName: keyof Props): string[] | undefined {
  const component = All[componentName];
  return component?.PropsList;
}

export function getComponentDefaultProps(cmpType: keyof Props): any {
  const component = All[cmpType];
  console.log("component?.defaultProps", component)
  return component?.defaultProps;
}

export function getDefaultConfiguration(cmpType: keyof Props): any {
  const component = All[cmpType];
  console.log("component allComp", component?.Configuration)
  return component?.Configuration || BaseConfiguration;
}