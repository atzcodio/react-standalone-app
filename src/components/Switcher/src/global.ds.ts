import 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements extends React.JSX.IntrinsicElements { }
    }
}

interface FxState {
  fx: string;
  isFx: boolean;
  deps: string[];
  evaluatedAt?: number;
}

declare interface BaseProps {
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