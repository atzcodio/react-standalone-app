
// No static import of ElementTypes or THEME; use runtime injection
interface ImageProps {
    url?: string;
    border?: string;
    borderRadius?: string[];
    margin?: string[];
    fxSrc?: string;
    padding?: string[];
    style?: string;
}

const src = "https://images.unsplash.com/photo-1713996240147-7a2f77d2871b?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Theme mapping
export const getThemeMapping = (THEME: any) => ({
    border: THEME.borderColor,
});

// Edit properties factory
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
        ],
    },
    {
        type: ElementTypes.GROUP("data"),
        width: 24,
        collaseOpen: true,
        elements: [
            {
                label: "Url",
                name: "url",
                type: ElementTypes.TEXT(src),
                width: 24,
                showFx: true,
                fx: src,
            },
        ],
    },
    {
        type: ElementTypes.GROUP("style"),
        width: 24,
        collaseOpen: true,
        elements: [
            {
                label: "style",
                name: "style",
                type: ElementTypes.TEXT(),
                showLabel: true,
                width: 24,
            },
            {
                label: "Border",
                name: "border",
                type: ElementTypes.TEXT("1px solid #e1e1e1"),
                width: 24,
                themePropertyName: 'borderColor',
                showFx: true,
            },
            {
                label: "Border Radius",
                name: "borderRadius",
                type: ElementTypes.BORDERRADIUS(["0px", "0px", "0px", "0px"]),
                showLabel: true,
                width: 24,
            },
            {
                label: "Margin",
                name: "margin",
                type: ElementTypes.SPACING(["0px", "0px", "0px", "0px"]),
                showLabel: true,
                width: 24,
                showFx: true,
            },
            {
                label: "Padding",
                name: "padding",
                type: ElementTypes.SPACING(["0px", "0px", "0px", "0px"]),
                showLabel: true,
                width: 24,
                showFx: true,
            },
        ],
    },
];

// Configuration
export const getConfiguration = (BaseConfiguration: any) => ({
    ...BaseConfiguration,
    grid: {
        desktop: {
            width: 7,
            height: 30,
        },
        mobile: {
            width: 15,
            height: 30,
        },
    },
    resizable: {
        width: true,
        height: true,
    },
});

// Manifest
export function getManifest(ElementTypes: any, THEME: any, BaseConfiguration: any, getDefaultProps: any) {
    const EditProperties = getEditProperties(ElementTypes);
    return {
        name: "Image",
        EditProperties: EditProperties,
        Configuration: getConfiguration(BaseConfiguration),
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties)
    };
}

// Factory
export function createComponent(api: any) {
    const { ElementTypes, THEME, BaseComponent, BaseConfiguration, getDefaultProps } = api;
    const manifest = getManifest(ElementTypes, THEME, BaseConfiguration, getDefaultProps);

    const ImageComponent = (props: any) => {
        const { id, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;
        const eProps = { ...properties } as Required<ImageProps>;
        const { url, padding, style, margin, border, borderRadius } = eProps;
        const baseCmpProps = {
            id,
            properties,
            meta,
            EditProperties: manifest.EditProperties,
            updateProperties,
            Configuration: manifest.Configuration,
            grid,
        };
        return (
            <BaseComponent {...baseCmpProps} id={id}>
                <div className={`w-full text-center p-0.5 text-white image-box ${style}`} style={{ width: '100%', height: '100%' }}>
                    <img
                        src={url}
                        style={{
                            width: '100%',
                            height: '100%',
                            border: `var(--border-color, ${border})`,
                            borderRadius: `${borderRadius[0]} ${borderRadius[1]} ${borderRadius[2]} ${borderRadius[3]}`,
                            padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
                            margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
                        }}
                    />
                </div>
            </BaseComponent>
        );
    };

    return {
        component: ImageComponent,
        manifest: manifest,
    };
}

export default {
    createComponent,
};

