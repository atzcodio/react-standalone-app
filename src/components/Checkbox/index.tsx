/// <reference types="react" />
// React import will be bundled by Rollup, do not import explicitly for full bundle

interface CheckboxProps {
    label: string;
    options: Array<string | { key: string; value: string | number }>;
    value: Array<string | number>;
    placeholder: string;
    labelColor: string;
    textColor: string;
    textAlign:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
    updateProperties: (id: string, property: string, newValue: any) => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    checkColor?: string;
    textLeftSpacing?: string;
    checkBorderRadius?: string[];
    labelPosition?: 'top' | 'left' | 'right';
    helperText?: string;
    border?: string;
    borderRadius?: string[];
    margin?: string[];
    padding?: string[];
}

interface CheckboxItem {
    label: string;
    value: string | number;
}

const getThemeMapping = (THEME: any) => {
    return {

    }
};
export const Configuration = {
    grid: {
        desktop: { width: 6, height: 15 },
        mobile: { width: 12, height: 15 },
    },
    resizable: { width: true, height: true }
};

export const getEditProperties = (ElementTypes: any) => [
    {
        type: ElementTypes.GROUP("basic"),
        width: 24,
        collaseOpen: true,
        elements: [
            {
                label: "Name",
                name: "_name",
                type: ElementTypes.TEXT(""),
                showLabel: true,
                width: 24,
            },
            {
                label: "Label",
                name: "label",
                type: ElementTypes.TEXT("Something else"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Value",
                name: "value",
                type: ElementTypes.TEXT("red"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Placeholder",
                name: "placeholder",
                type: ElementTypes.TEXT("Select an option"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Helper Text",
                name: "helperText",
                type: ElementTypes.TEXT(""),
                showLabel: true,
                width: 24,
            },
        ],
    },
    {
        type: ElementTypes.GROUP("options"),
        width: 24,
        collaseOpen: true,
        elements: [
            {
                label: "Options",
                name: "options",
                type: ElementTypes.MARKCODEEDITOR(),
                showLabel: true,
                showFx: true,
                onlyFx: true,
                width: 24,
                fx: `["first", "second", "third"]`,
            },
            {
                label: "Value",
                name: "value",
                type: ElementTypes.MARKCODEEDITOR(),
                showLabel: true,
                showFx: true,
                onlyFx: true,
                width: 24,
                fx: `["second"]`,
            },
        ],
    },
    {
        type: ElementTypes.GROUP("appearance"),
        width: 24,
        collaseOpen: true,
        elements: [
            {
                label: "Label Color",
                name: "labelColor",
                type: ElementTypes.COLOR("#000000"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Checkbox Color",
                name: "checkColor",
                type: ElementTypes.COLOR("#1890ff"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Checkbox Border Radius",
                name: "checkBorderRadius",
                type: ElementTypes.BORDERRADIUS(['4px', '4px', '4px', '4px']),
                showLabel: true,
                width: 24,
            },
            {
                label: "Text Color",
                name: "textColor",
                type: ElementTypes.COLOR("#1890ff"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Text Left Spacing",
                name: "textLeftSpacing",
                type: ElementTypes.TEXT("8px"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Text Align",
                name: "textAlign",
                type: ElementTypes.TEXTALIGNMENT("center"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Size",
                name: "size",
                type: ElementTypes.SELECT(["small", "medium", "large"], "medium"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Label Position",
                name: "labelPosition",
                type: ElementTypes.SELECT(["top", "left", "right"], "top"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Disabled",
                name: "disabled",
                type: ElementTypes.TOGGLE(false),
                showLabel: true,
                width: 24,
            },
        ],
    },
    {
        type: ElementTypes.GROUP("style"),
        width: 24,
        collaseOpen: true,
        elements: [
            {
                label: "Border",
                name: "border",
                type: ElementTypes.TEXT("1px solid #e5e7eb"),
                showLabel: true,
                width: 24,
            },
            {
                label: "Border Radius",
                name: "borderRadius",
                type: ElementTypes.BORDERRADIUS(['8px', '8px', '8px', '8px']),
                showLabel: true,
                width: 24,
            },
            {
                label: "Margin",
                name: "margin",
                type: ElementTypes.SPACING(['0px', '0px', '0px', '0px']),
                showLabel: true,
                width: 24,
            },
            {
                label: "Padding",
                name: "padding",
                type: ElementTypes.SPACING(['8px', '8px', '8px', '8px']),
                showLabel: true,
                width: 24,
            },
        ],
    },
];

/* .............. Types Ended .............. */

export const getCheckboxManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    return {
        name: "Checkbox",
        EditProperties: getEditProperties(ElementTypes),
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(getEditProperties(ElementTypes)),
    };
};

export function createComponent(api: any) {
    const { ElementTypes, THEME, BaseComponent, getDefaultProps } = api;
    const platformDeps = api.getPlatformHooks();

    const deps: {
        React: typeof React;
    } & typeof platformDeps = {
        ...platformDeps, // platform injected dep
    };

    const { React } = deps;

    const getDeps = () => ({ ...platformDeps });
    const defaultProps = getDefaultProps(getEditProperties(ElementTypes));
    const Checkbox = (props: any) => {
        const {
            id,
            grid,
            properties,
            meta,
            updateProperties,
            onFxChange,
            ...rest
        } = props;

        const {
            labelColor,
            disabled = false,
            size = 'medium',
            checkColor = '#1890ff',
            checkBorderRadius = ['4px', '4px', '4px', '4px'],
            labelPosition = 'top',
            helperText = '',
            textColor,
            textLeftSpacing,
            border = '1px solid #e5e7eb',
            borderRadius = ['8px', '8px', '8px', '8px'],
            margin = ['0px', '0px', '0px', '0px'],
            padding = ['18px', '18px', '18px', '18px'],
            textAlign = 'center',
        } = { ...defaultProps, ...properties } as Required<CheckboxProps>;

        let { options, value } = { ...defaultProps, ...properties } as Required<CheckboxProps>;

        console.log("checkbox options and value", options, value);

        function createKeyValuePair(arr: any[]) {
            if (!arr) return [];
            if (!Array.isArray(arr)) return [arr];
            return arr.map((item: any) => {
                if (typeof item === 'object') {
                    return item;
                }
                return { value: item, label: item };
            });
        }

        options = createKeyValuePair(options);
        value = createKeyValuePair(value);

        const handleSelect = (item: CheckboxItem) => {
            let data = [];
            if (value.some((selected: any) => selected.value === item.value)) {
                // If already selected, remove it
                data = value.filter((selected: any) => selected.value !== item.value);
            } else {
                // If not selected, add it
                data = [...value, item];
            }
            updateProperties(id, "value", data);
        };

        const baseCmpProps = {
            id,
            grid,
            properties,
            meta,
            updateProperties,
            onFxChange,
            ...rest,
        }

        const sizeMap = {
            small: {box: 16, font: 13, gap: 8 },
            medium: { box: 20, font: 15, gap: 10 },
            large: { box: 26, font: 18, gap: 14 },
        };

        const s = sizeMap[size] || sizeMap.medium;

        // Label placement
        const labelBlock = (
            <span
                style={{
                    color: labelColor,
                    fontWeight: 500,
                    fontSize: s.font + 2,
                    marginBottom: labelPosition === 'top' ? 8 : 0,
                    marginRight: labelPosition === 'left' ? 10 : 0,
                    marginLeft: labelPosition === 'right' ? 10 : 0,
                    textAlign: textAlign,
                }}
            >
                {props.label}
            </span>
        );

        return (
            <BaseComponent {...baseCmpProps}>
                <div
                    style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: 8,
                        padding: 18,
                        background: disabled ? '#f5f5f5' : '#fff',
                        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
                        minWidth: 220,
                        maxWidth: 400,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection:
                                labelPosition === 'top'
                                    ? 'column'
                                    : labelPosition === 'left'
                                        ? 'row'
                                        : 'row-reverse',
                            alignItems: labelPosition === 'top' ? 'flex-start' : 'center',
                            marginBottom: 10,
                        }}
                    >
                        {labelBlock}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: s.gap }}>
                        {options && options.map((item: any) => (
                            <label
                                key={item.value}
                                htmlFor={item.value.toString()}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: disabled ? 'not-allowed' : 'pointer',
                                    opacity: disabled ? 0.6 : 1,
                                    fontSize: s.font,
                                    userSelect: 'none',
                                    padding: '2px 0',
                                    color: textColor
                                }}
                            >
                                <input
                                    type="checkbox"
                                    id={item.value.toString()}
                                    value={item.value}
                                    checked={value.some((selected: any) => selected.value === item.value)}
                                    onChange={() => handleSelect(item)}
                                    disabled={disabled}
                                    style={{
                                        width: s.box,
                                        height: s.box,
                                        accentColor: checkColor,
                                        marginRight: 8,
                                        border: '1px solid #bdbdbd',
                                        transition: 'box-shadow 0.2s',
                                        boxShadow: disabled ? 'none' : '0 0 0 2px #e0e7ff',
                                        borderRadius: Array.isArray(checkBorderRadius) ? checkBorderRadius.join(' ') : (checkBorderRadius || (Array.isArray(borderRadius) ? borderRadius.join(' ') : borderRadius || '4px')),

                                    }}
                                />
                                {item.label}
                            </label>
                        ))}
                    </div>
                    {helperText && (
                        <div
                            style={{
                                color: '#6b7280',
                                fontSize: s.font - 2,
                                marginTop: 10,
                                marginLeft: 2,
                            }}
                        >
                            {helperText}
                        </div>
                    )}
                </div>
            </BaseComponent>
        );
    };

    return {
        component: Checkbox,
        manifest: getCheckboxManifest(api),
    };
}

export default {
    createComponent,
};
