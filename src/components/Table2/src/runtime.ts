
export type RuntimeEnv = {
    React?: typeof import("react");
    ReactDOM?: typeof import("react-dom");
    antd?: any;
    icons?: Record<string, any>;
    AiIcons?: Record<string, any>;
    FaIcons?: Record<string, any>;
    TableList?: any;
    AutoSizer?: any;
    theme?: any;
    http?: any;
    eventBus?: any;
    // additional platform utilities...
};

let runtimeEnv: RuntimeEnv | null = null;
let cached: RuntimeEnv | null = null;


export interface RuntimeDeps {
    React: typeof import("react");
    useState: typeof import("react").useState;
    useEffect: typeof import("react").useEffect;
    useMemo: typeof import("react").useMemo;
    useRef: typeof import("react").useRef;
    useCallback: typeof import("react").useCallback;
    Drawer: typeof import("antd").Drawer;
    Popover: typeof import("antd").Popover;
    ArrowUpOutlined: any;
    ArrowDownOutlined: any;
    PlusOutlined: any;
    AiOutlineCaretDown: any;
    AiOutlineCaretUp: any;
    AiOutlineCompress: any;
    FaFilter: any; //typeof import("react-icons/fa").FaFilter;
    TableList: any; // typeof import("react-window").FixedSizeList;
    AutoSizer: any; // typeof import("react-virtualized-auto-sizer").default;
    loadIcon?: (name: string) => Promise<any>;
    [key: string]: any;
}

export const runtimeDeps: RuntimeDeps = {} as RuntimeDeps;

export function registerRuntimeDeps(partial: Partial<RuntimeDeps>) {
    Object.assign(runtimeDeps, partial);
}

let loadPromise: Promise<RuntimeDeps> | null = null;

export function loadRuntimeDeps(getHostEnv: () => RuntimeEnv | null) {
    if (loadPromise) return loadPromise;

    loadPromise = (async () => {
        const env = getHostEnv?.() ?? null;
        runtimeEnv = env;

        // Check if we're in a browser environment without module resolution
        const isBrowserWithoutImportMap = typeof window !== 'undefined' && !env;

        // 1. React & Hooks
        if (env?.React) {
            Object.assign(runtimeDeps, {
                React: env.React,
                useState: env.React.useState,
                useEffect: env.React.useEffect,
                useMemo: env.React.useMemo,
                useRef: env.React.useRef,
                useCallback: env.React.useCallback,
            });
        } else if (!isBrowserWithoutImportMap) {
            const React = await import("react");
            Object.assign(runtimeDeps, {
                React: React.default || React,
                useState: React.useState,
                useEffect: React.useEffect,
                useMemo: React.useMemo,
                useRef: React.useRef,
                useCallback: React.useCallback,
            });
        }

        // 2. Antd
        if (env?.antd) {
            Object.assign(runtimeDeps, {
                Drawer: env.antd.Drawer,
                Popover: env.antd.Popover,
            });
        } else if (!isBrowserWithoutImportMap) {
            const { Drawer, Popover } = await import("antd");
            Object.assign(runtimeDeps, { Drawer, Popover });
        }

        // 3. Icons (Ant Design)
        if (env?.icons) {
            Object.assign(runtimeDeps, {
                ArrowUpOutlined: env.icons.ArrowUpOutlined,
                ArrowDownOutlined: env.icons.ArrowDownOutlined,
                PlusOutlined: env.icons.PlusOutlined,
            });
        } else if (!isBrowserWithoutImportMap && !runtimeDeps.ArrowUpOutlined) {
            const icons = await import("@ant-design/icons");
            Object.assign(runtimeDeps, {
                ArrowUpOutlined: icons.ArrowUpOutlined,
                ArrowDownOutlined: icons.ArrowDownOutlined,
                PlusOutlined: icons.PlusOutlined,
            });
        }

        // 4. React Icons (Ai)
        if (env?.AiIcons) {
            Object.assign(runtimeDeps, {
                AiOutlineCaretDown: env.AiIcons.AiOutlineCaretDown,
                AiOutlineCaretUp: env.AiIcons.AiOutlineCaretUp,
                AiOutlineCompress: env.AiIcons.AiOutlineCompress,
            });
        } else if (!isBrowserWithoutImportMap && !runtimeDeps.AiOutlineCaretDown) {
            const Ai = await import("react-icons/ai");
            Object.assign(runtimeDeps, {
                AiOutlineCaretDown: Ai.AiOutlineCaretDown,
                AiOutlineCaretUp: Ai.AiOutlineCaretUp,
                AiOutlineCompress: Ai.AiOutlineCompress,
            });
        }

        // 5. React Icons (Fa)
        if (env?.FaIcons) {
            Object.assign(runtimeDeps, {
                FaFilter: env.FaIcons.FaFilter,
            });
        } else if (!isBrowserWithoutImportMap && !runtimeDeps.FaFilter) {
            const Fa = await import("react-icons/fa");
            Object.assign(runtimeDeps, {
                FaFilter: Fa.FaFilter,
            });
        }

        // 6. React Window
        if (env?.TableList) {
            Object.assign(runtimeDeps, {
                TableList: env.TableList
            });
        } else if (!isBrowserWithoutImportMap && !runtimeDeps.TableList) {
            const { FixedSizeList } = await import("react-window");
            Object.assign(runtimeDeps, {
                TableList: FixedSizeList
            });
        }

        // 7. AutoSizer
        if (env?.AutoSizer) {
            Object.assign(runtimeDeps, {
                AutoSizer: env.AutoSizer
            });
        } else if (!isBrowserWithoutImportMap && !runtimeDeps.AutoSizer) {
            const AutoSizerMod = await import("react-virtualized-auto-sizer");
            Object.assign(runtimeDeps, {
                AutoSizer: AutoSizerMod.default || AutoSizerMod
            });
        }

        return runtimeDeps;
    })();

    return loadPromise;
}
