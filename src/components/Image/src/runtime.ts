export const runtimeDeps = {
  // All deps optional – components may override or platform may inject
  // Import what local depencies you need here
  loadIcon: null as null | ((name: string) => Promise<any>)
};

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
  type?: string;
  id: string;
  _name?: string;
  _mode?: "edit" | "preview";
  updateProperties: (id: string, field: string, value: any) => void;
  meta?: Record<string, FxState>; // Component's formula metadata
  properties: Record<string, any>;
  onFxChange?: (componentId: string, propertyName: string, fxState: FxState) => void; // Updates formulaMeta
}