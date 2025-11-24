import React from "react";
import { ElementTypes } from "../elements_types";
import { useComponentContext } from "../context/componentContext";
import { useFormulaResolver } from "../hooks/useFormulaResolver";
import ErrorBoundary from "../components/ErrorBoundary";

// Import FxStates types for formula management
interface FxState {
  fx: string;
  isFx: boolean;
  deps: string[];
  evaluatedAt?: number;
}

export interface BaseProps {
  grid: {
    desktop: {
      x?: number;
      y?: number;
      width: number;
      height: number;
    };
    mobile: {
      x?: number;
      y?: number;
      width: number;
      height: number;
    };
  };
  title?: string;
  style?: React.CSSProperties;
  type?: string;
  id: string;
  _name?: string;
  _mode?: "edit" | "preview";
  Configuration?: {
    grid: {
      desktop: { width: number; height: number };
      mobile: { width: number; height: number };
    };
    resizable: { width: boolean; height: boolean };
  };
  updateProperties: (id: string, field: string, value: any) => void;
  meta?: Record<string, FxState>; // Component's formula metadata
  properties: Record<string, any>;
  onFxChange?: (componentId: string, propertyName: string, fxState: FxState) => void; // Updates formulaMeta

}

interface BaseComponentProps extends BaseProps {
  children?: React.ReactNode;
  EditProperties: any;
}

export const BaseConfiguration = {
  grid: {
    desktop: { width: 3, height: 6 },
    mobile: { width: 2, height: 4 },
  },
  resizable: { width: true, height: true },
};

const BaseEditProperties = {
  title: ElementTypes.TEXT(""),
  _name: ElementTypes.TEXT(""),
};

export function getDefaultProps<T extends Record<string, any> = Record<string, any>>(
  editProperties: Record<string, any> | Array<any>
): Required<T> {
  const defaults: Record<string, any> = {};

  if (Array.isArray(editProperties)) {
    for (const group of editProperties) {
      if (!group?.elements) continue;

      for (const element of group.elements) {
        const { name, type } = element;
        if (type && "defaultValue" in type) {
          // Clone complex values to prevent accidental shared references
          const defVal = Array.isArray(type.defaultValue)
            ? [...type.defaultValue]
            : typeof type.defaultValue === "object" && type.defaultValue !== null
            ? { ...type.defaultValue }
            : type.defaultValue;

          defaults[name] = defVal;
        }
      }
    }
  } else {
    for (const key in editProperties) {
      const property = editProperties[key];
      if (property && "defaultValue" in property) {
        const defVal = Array.isArray(property.defaultValue)
          ? [...property.defaultValue]
          : typeof property.defaultValue === "object" && property.defaultValue !== null
          ? { ...property.defaultValue }
          : property.defaultValue;

        defaults[key] = defVal;
      }
    }
  }

  // Return with Required<T> type to indicate all keys are defined
  return defaults as Required<T>;
}


export const BaseComponent: React.FC<BaseComponentProps> & {
  PropsList?: string[];
  EditProperties?: {};
  properties?: {};
  Configuration?: {};
} = React.memo(({
  title,
  style,
  children,
  properties = {},
  meta = {},
  id,
  updateProperties,
  onFxChange,
  _mode,
  ...rest
}) => {
  const context = useComponentContext();

  // 🔥 Resolve formula-based properties
  const resolvedProps = useFormulaResolver(properties, meta, context);

  // Remove the console.log to prevent excessive logging
  // console.log("BaseComponent resolvedProps:", resolvedProps);

  // 🧩 Build final props with stable memoization
  const finalProps = React.useMemo(
    () => ({
      ...rest,
      id,
      _mode,
      updateProperties,
      onFxChange,
      // ✅ Keep `properties` as the live object (merged with resolved formulas)
      properties: {
        ...properties,
        ...resolvedProps,
      },
    }),
    [
      JSON.stringify(rest), // Stringify for stable comparison
      id, 
      _mode, 
      updateProperties, 
      onFxChange, 
      JSON.stringify(properties), // Stringify for stable comparison
      JSON.stringify(resolvedProps) // Stringify for stable comparison
    ]
  );

  // ✅ Clone the child and inject all relevant props
  const clonedChild = React.useMemo(() => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, finalProps);
    } else if (React.Children.count(children) > 1) {
      return React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, finalProps) : child
      );
    }
    return children;
  }, [children, finalProps]);

  return (
    <ErrorBoundary 
      componentName={`BaseComponent-${id}`}
      showDetails={_mode === "edit"} // Show error details only in edit mode
    >
      <div className="base-component text-xs" style={style}>
        {clonedChild}
      </div>
    </ErrorBoundary>
  );
});

export interface ComponentStaticProps<T = any> {
  PropsList?: string[];
  EditProperties?: any;
  Configuration?: any;
  defaultProps?: Partial<T>;
  ThemeMapping?: Record<string, any>;
}

export type LowCodeComponent<T extends BaseProps = BaseProps> = React.FC<T> & ComponentStaticProps<T>;

BaseComponent.PropsList = ["title", "style"];
BaseComponent.EditProperties = BaseEditProperties;
BaseComponent.properties = getDefaultProps(BaseEditProperties);
BaseComponent.Configuration = BaseConfiguration;
