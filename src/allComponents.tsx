// Import Button DI module
import * as ButtonModule from "./components/Button/src/index";
import { BaseConfiguration } from "./baseComponent";
import { platformApi } from "./utils/platformApi";

// Import ProductInfo DI module
import * as ProductInfoModule from "./components/ProductInfo/src/index";

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
  Configuration?: {};
  defaultProps?: {};
  EditProperties?: EditProperties;
}

interface Props {
  [key: string]: ComponentWithPropsList;
}

/**
 * Helper function to initialize a component with Dependency Injection pattern
 * @param module - The component module with createComponent function
 * @param componentName - Name of the component for logging
 * @returns The initialized component or null if initialization fails
 */
function initializeDIComponent(
  module: any,
  componentName: string
): React.ComponentType<any> | null {
  try {
    if (module?.createComponent) {
      const { component } = module.createComponent(platformApi);
      console.log(`✓ Initialized ${componentName} component with DI pattern`);
      return component;
    }
    console.warn(`⚠ ${componentName} module does not have createComponent function`);
    return null;
  } catch (error) {
    console.error(`Failed to initialize ${componentName} with DI:`, error);
    return null;
  }
}

// Initialize all DI components
const ProductInfoComponent = initializeDIComponent(ProductInfoModule, 'ProductInfo');
const ButtonComponentDI = initializeDIComponent(ButtonModule, 'Button');

// Component map
const cmpMap: { [key: string]: React.ComponentType<any> } = {};

// Add components to map if successfully initialized
if (ButtonComponentDI) {
  cmpMap.Button = ButtonComponentDI;
}

if (ProductInfoComponent) {
  cmpMap.ProductInfo = ProductInfoComponent;
}

export const All: any = cmpMap;
export const ComponentMap: { [key: string]: React.ComponentType<any> } = cmpMap;

export function getPropsList(componentName: keyof Props): string[] | undefined {
  const component = All[componentName];
  return component?.PropsList;
}

export function getComponentDefaultProps(cmpType: keyof Props): any {
  const component = All[cmpType];
  console.log("component?.defaultProps", component);
  return component?.defaultProps;
}

export function getDefaultConfiguration(cmpType: keyof Props): any {
  const component = All[cmpType];
  console.log("component allComp", component?.Configuration);
  return component?.Configuration || BaseConfiguration;
}

console.log('📦 Available components:', Object.keys(ComponentMap));