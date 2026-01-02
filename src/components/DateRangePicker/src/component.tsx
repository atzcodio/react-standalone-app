interface DateRangePickerProps {
    title?: string;
    startDate?: string;
    endDate?: string;
    background_color?: string;
    border?: string
    border_radius: Array<string>;
    color?: string;
    height?: string;
    width?: string;
    padding: Array<string>;
    margin: Array<string>;
}

const Configuration = {
    grid: {
        desktop: {
            width: 7, // Override width for desktop
            height: 9, // Keep height the same or adjust as needed
        },
        mobile: {
            width: 16, // Keep the same or adjust for mobile
            height: 10, // Keep the same or adjust as needed
        },
    },
    resizable: {
        width: true,
        height: true
    }
}

const getEditProperties = (ElementTypes: any) => [
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
                width: 24
            },
            {
                label: "title",
                name: "title",
                type: ElementTypes.TEXT("Select Date Range"),
                width: 24
            },
            {
                label: "Id",
                name: "id",
                type: ElementTypes.TEXT(),
                width: 24
            },
        ]
    },
    {
        type: ElementTypes.GROUP("data"),
        width: 24,
        collaseOpen: true,
        elements: [{
            label: "Start Date",
            name: "startDate",
            type: ElementTypes.TEXT(""),
            width: 24,
            showFx: true,
            fx: "2023-01-01",
            onlyFx: true
        },
        {
            label: "End Date",
            name: "endDate",
            type: ElementTypes.TEXT(""),
            width: 24,
            showFx: true,
            fx: "2023-03-01",
            onlyFx: true
        }]
    },
    {
        type: ElementTypes.GROUP("style"),
        width: 24,
        collaseOpen: true,
        elements: [
            {
                label: "Background Color",
                name: "background_color",
                type: ElementTypes.COLOR("#FFFFFF"),
                showLabel: true,
                width: 24
            },
            {
                label: "Color",
                name: "color",
                type: ElementTypes.COLOR("#000000"),
                showLabel: true,
                width: 24
            },
            {
                label: "Border",
                name: "border",
                type: ElementTypes.TEXT("1px solid #e1e1e1"),
                width: 24
            },
            {
                label: "Border Radius",
                name: "border_radius",
                type: ElementTypes.BORDERRADIUS(["5px", "5px", "5px", "5px"]),
                showLabel: true,
                width: 24
            },
            {
                label: "Margin",
                name: "margin",
                type: ElementTypes.SPACING(['0px', '0px', '0px', '0px']),
                showLabel: true,
                width: 24
            },
            {
                label: "Padding",
                name: "padding",
                type: ElementTypes.SPACING(['0.5em', '0.5em', '0.5em', '0.5em']),
                showLabel: true,
                width: 24
            },
        ]
    },
];


const getThemeMapping = (THEME: any) => {
    return {

    }
}

export const getDateRangePickerManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    const EditProperties = getEditProperties(ElementTypes);
    return {
        name: "DateRangePicker",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
};


export const createComponent = (api: any) => {
    const { ElementTypes, THEME, BaseComponent, getDefaultProps } = api;
    const platformDeps = api.getPlatformHooks();

    const deps: {
        React: typeof React;
    } & typeof platformDeps = {
        ...platformDeps, // platform injected dep
    };

    const { React } = deps;
    const { useState } = api.React;
    const { DateRange } = api.MuiMaterialIcons;

    const getDeps = () => ({ ...platformDeps });
    const EditProperties = getEditProperties(ElementTypes);
    const defaultProps = getDefaultProps(EditProperties);

    const DateRangePicker = (props: any) => {
        const { id, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;
        const { title, padding, startDate, endDate, background_color, border, border_radius, color, margin } = { ...defaultProps, ...properties } as Required<DateRangePickerProps>;

        const [start, setStart] = useState(startDate || '');
        const [end, setEnd] = useState(endDate || '');

        const baseCmpProps = {
            id,
            properties,
            meta,
            EditProperties,
            updateProperties,
            grid
        };

        return (
            <BaseComponent {...baseCmpProps} style={{
                width: `calc(100% - (${margin[1]} + ${margin[3]}))`,
                height: `calc(100% - (${margin[0]} + ${margin[2]}))`,
                maxWidth: "800px",
                maxHeight: '110px',
                padding: "4px",
            }}>
                <div style={{
                    // padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
                    padding: "0.5em",
                    height: '100%',
                    backgroundColor: background_color,
                    borderRadius: `${border_radius[0]} ${border_radius[1]} ${border_radius[2]} ${border_radius[3]}`,
                    // padding: "0.5em",
                    // margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}>
                    {title && (
                        <span style={{ fontSize: "1.25em", fontWeight: "600", color: "#333", marginBottom: "0.5em", textAlign: "center", }}>
                            <label htmlFor={id}>{title}</label>
                        </span>
                    )}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px', }}>
                        <input
                            type="date"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            style={{
                                width: "95%", height: "3em", fontSize: "1em", color, backgroundColor: "#fff", border: border,
                                margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
                                padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
                                borderRadius: `${border_radius[0]} ${border_radius[1]} ${border_radius[2]} ${border_radius[3]}`,
                                boxSizing: "border-box", transition: "border-color 0.3s ease, box-shadow 0.3s ease"
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = "#6c63ff")
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = "#ccc")
                            }
                        />
                        <input
                            type="date"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            style={{
                                width: "90%", height: "3em", fontSize: "1em", color, backgroundColor: "#fff", border: border,
                                margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`,
                                padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
                                borderRadius: `${border_radius[0]} ${border_radius[1]} ${border_radius[2]} ${border_radius[3]}`,
                                boxSizing: "border-box", transition: "border-color 0.3s ease, box-shadow 0.3s ease"
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = "#6c63ff")
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = "#ccc")
                            }
                        />
                    </div>
                </div>
            </BaseComponent>
        );
    };
    return {
        component: DateRangePicker,
        manifest: getDateRangePickerManifest(api),
    };
}

export default {
    createComponent
}