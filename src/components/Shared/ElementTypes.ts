// Element types for property configuration (for EditProperties)
export const ElementTypes = {
    GROUP: (name: string) => ({ type: "group", name }),
    TEXT: (defaultValue?: string) => ({ type: "text", defaultValue }),
    COLOR: (defaultValue: string) => ({ type: "color", defaultValue }),
    SELECT: (options: string[], defaultValue: string) => ({ type: "select", options, defaultValue }),
    NUMBER: (defaultValue?: number) => ({ type: "number", defaultValue }),
    TEXTALIGNMENT: (defaultValue: string) => ({ type: "textAlignment", defaultValue }),
    BORDERRADIUS: (defaultValue: string[]) => ({ type: "borderRadius", defaultValue }),
    SPACING: (defaultValue: string[]) => ({ type: "spacing", defaultValue }),
    CHANGETHEME: (defaultValue: string) => ({ type: "changeTheme", defaultValue }),
    EVENTBUTTON: (eventType: string, config: any) => ({ type: "eventButton", eventType, config })
};
