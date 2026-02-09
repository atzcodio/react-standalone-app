// Platform API interface that defines all external dependencies
export interface PlatformAPI {
    React: {
        createElement: typeof import("react").createElement;
        useState: typeof import("react").useState;
        useEffect: typeof import("react").useEffect;
        useMemo: typeof import("react").useMemo;
        useRef: typeof import("react").useRef;
        useCallback: typeof import("react").useCallback;
        CSSProperties: React.CSSProperties;
        [key: string]: any;
    };
    ReactRouter?: {
        useNavigate: () => any;
        useLocation: () => any;
    };
    UI: {
        [key: string]: any;
    };
    BaseComponent?: any;
    ElementTypes: {
        GROUP: (name: string) => any;
        TEXT: (defaultValue?: string) => any;
        TEXTAREA: (defaultValue?: string) => any;
        COLOR: (defaultValue: string) => any;
        SELECT: (options: string[], defaultValue: string) => any;
        NUMBER: (defaultValue?: number) => any;
        TOGGLE: (defaultValue: boolean) => any;
        TEXTALIGNMENT: (defaultValue: string) => any;
        BORDERRADIUS: (defaultValue: string[]) => any;
        SPACING: (defaultValue: string[]) => any;
        CHANGETHEME: (defaultValue: string) => any;
        EVENTBUTTON: (eventType: string, config: any) => any;
    };
    executeFlow?: (nodes: any, startNodeId: string, options: any) => void;
    useComponentContext?: () => any;
    theme?: {
        primaryColor: string;
        textColor: string;
        borderColor: string;
    };
}
