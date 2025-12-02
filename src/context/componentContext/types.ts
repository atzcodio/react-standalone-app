import { DragEndEvent } from "@dnd-kit/core";

export interface Component {
    id: string;
    type: string;
    properties: any;
    position?: { x: number; y: number };
    size?: { width: number | string; height: number | string };
    grid: {
        desktop: {
            [y: string]: number;
            width: number;
            height: number;
        };
        mobile: {
            width: number;
            height: number;
            x?: number;
            y?: number;
        };
    };
    output?: string;
    _name: string;
    parentId?: string;
    onFxChange?: (
        componentId: string,
        propertyName: string,
        fxState: any
    ) => void;
    meta?: {};
}

export interface Screen {
    id: string;
    type: string;
    title?: string;
    body: Component[];
    properties?: Record<string, any>;
    propsList?: string[];
    editProperties?: Record<string, any>;
}

export interface Query {
    name: string;
    id: string;
    type: string;
    value: any;
    [key: string]: any;
}

export interface suggestionData {
    suggestions: string[];
    suggestionKeyDataTypes: Record<string, string>;
}

export interface Listener {
    filters: string[];
    callback: (id: string, field: string, value: any) => void;
}

export interface SidebarNavProps {
    screenId: string;
    position: string;
    heightOrWidth: string;
}

export interface PopupNavProps {
    screenId: string;
    height: string;
    width: string;
}

export interface HeaderNavProps {
    screenId: string;
    headerheight: string;
    position: string;
}

export interface Context {
    interfaceView: string;
    setInterfaceView: (newView: string) => void;
    screens: Screen[];
    queries: Query[];
    propertySidebar: Boolean;
    leftSidebar: boolean;
    togglePropertySidebar: () => void;
    toggleLeftSidebar: () => void;
    setQueries: (queries: Query[]) => void;
    selectedScreenIndex: number;
    setSelectedScreenIndex: (index: number) => void;
    onDragEnd: (event: DragEndEvent) => void;
    selectedComponent?: Component;
    setSelectedComponent: (selected: Component | undefined) => void;
    selectComponent: (selected: Component | undefined) => void;
    addComponent: (component: Component) => void;
    deleteComponent: () => void;
    duplicateComponent: () => void;
    updateProperties: (id: string, field: string, value: any) => void;
    updateMetaProperties: (id: string, field: string, fxState: any) => void;
    onFxChange: (componentId: string, propertyName: string, fxState: any) => void;
    updateGroupProperties: (id: string, fields: Record<string, any>) => void;
    updateScreenProperties: (id: string, field: string, value: any) => void;
    onPropertyUpdate: (name: string, field: string, value: any) => void;
    addScreen: (screenType: string) => void;
    updateComponentByName: (name: string, field: string, value: any) => void;
    selectScreen: (index: number) => void;
    deleteScreen: (index: number) => void;
    updateComponent: (component: Component) => void;
    evaluateFormula: (
        formula: string,
        taskData?: Record<string, any>,
        options?: Record<string, any>
    ) => string;
    triggerFormulaRecalculation: (
        type: 'component' | 'data',
        name: string,
        field?: string,
        options?: { oldName?: string; newName?: string }
    ) => void;
    initScreens: (screens: Screen[]) => void;
    getComponentSuggestions: () => suggestionData;
    getRepeatItemSuggestions: (childId: string) => suggestionData;
    getFromLocalStorage: () => Screen[];
    getQueriesFromLocalStorage: () => Query[];
    saveQueriesToLocalStorage: (queries: Query[]) => void;
    listener: (
        filters: string[],
        callback: (id: string, field: string, value: any) => void
    ) => void;
    getUsedComponents: (formula: string) => string[];
    setSidebar: (id: string) => void;
    setPopup: (id: string) => void;
    setHeader: (id: string) => void;
    selectedSidebarId: string;
    selectedPopupId: string;
    selectedHeaderId: string;
    onScreenChange: () => void;
    initandOpenSidebar: (
        screenId: string,
        position: string,
        heightOrWidth: string
    ) => void;
    sidebarNavState: SidebarNavProps;
    setSidebarNavState: (sidebarNav: SidebarNavProps) => void;
    initandOpenPopup: (screenId: string, height: string, width: string) => void;
    popupNavState: PopupNavProps;
    setPopupNavState: (sidebarNav: PopupNavProps) => void;
    initandOpenHeader: (
        screenId: string,
        headerheight: string,
        position: string
    ) => void;
    headerNavState: HeaderNavProps;
    setHeaderNavState: (sidebarNav: HeaderNavProps) => void;
}
