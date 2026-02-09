
/// <reference types="react" />
// React import will be bundled by Rollup, do not import explicitly for full bundle

interface SwitcherProps {
  label: string;
  value: boolean;
  labelColor: string;
  margin?: string;
  padding?: string;
  direction?: 'left' | 'right';
  position?: 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  borderRadius?: string;
}

const Configuration = {
  grid: {
    desktop: {
      width: 6,
      height: 6,
    },
    mobile: {
      width: 12,
      height: 6,
    },
  },
  resizable: {
    width: true,
    height: true,
  },
  // ...existing code...
};

const getEditProperties = (ElementTypes: any, THEME: any) => [
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
        type: ElementTypes.TEXT("Enable Feature"),
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
      {
        label: "Size",
        name: "size",
        type: ElementTypes.SELECT(["small", "medium", "large"], "medium"),
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
        label: "Status",
        name: "value",
        type: ElementTypes.TOGGLE(true),
        showLabel: true,
        width: 24,
        showFx: true,
      },
    ],
  },
  {
    type: ElementTypes.GROUP("style"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Theme",
        name: "theme",
        type: ElementTypes.CHANGETHEME("dark"),
        showLabel: true,
        width: 24,
      },
      {
        label: "Label Color",
        name: "labelColor",
        type: ElementTypes.COLOR("#000000"),
        showLabel: true,
        width: 24,
      },
      {
        label: "Active Color",
        name: "activeColor",
        type: ElementTypes.COLOR("#22c55e"),
        showLabel: true,
        width: 24,
      },
      {
        label: "Inactive Color",
        name: "inactiveColor",
        type: ElementTypes.COLOR("#e5e7eb"),
        showLabel: true,
        width: 24,
      },
      {
        label: "Border Radius",
        name: "borderRadius",
        type: ElementTypes.TEXT("9999px"),
        showLabel: true,
        width: 24,
      },
      {
        label: "Margin",
        name: "margin",
        type: ElementTypes.SPACING(["2px", "2px", "2px", "2px"]),
        showLabel: true,
        width: 24,
      },
      {
        label: "Padding",
        name: "padding",
        type: ElementTypes.SPACING(["2px", "2px", "2px", "2px"]),
        showLabel: true,
        width: 24,
      },
      // Removed labelTextDirection for user simplicity
      {
        label: "Direction",
        name: "direction",
        type: ElementTypes.SELECT(["left", "right"], "left"),
        showLabel: true,
        width: 24,
      },
      {
        label: "Position",
        name: "position",
        type: ElementTypes.SELECT([
          "left-right",
          "right-left",
          "top-bottom",
          "bottom-top"
        ], "left-right"),
        showLabel: true,
        width: 24,
      },
    ],
  },
];

const getThemeMapping = (THEME: any) => ({
  activeColor: THEME.primaryColor,
  inactiveColor: THEME.secondaryColor,
  borderRadius: THEME.borderRadius,
  labelColor: THEME.textColor,
});

export const getSwicherManifest = (api: any) => {
  const { ElementTypes, THEME, getDefaultProps } = api;
  const EditProperties = getEditProperties(ElementTypes, THEME);
  return {
    name: "Rating",
    EditProperties: EditProperties,
    Configuration: Configuration,
    ThemeMapping: getThemeMapping(THEME),
    defaultProps: getDefaultProps(EditProperties),
  };
};

export function createComponent(api: any) {
  const { BaseComponent, ElementTypes, THEME, getDefaultProps, React } = api;
  const { useEffect, useState } = React;
  const EditProperties = getEditProperties(ElementTypes, THEME);

  const defaultProps: Partial<SwitcherProps> = getDefaultProps(EditProperties);

  const Switcher: React.FC<SwitcherProps> = (props:any) => {
    const {
      id,
      _name,
      grid,
      properties,
      meta,
      updateProperties,
      onFxChange,
      ...rest
    } = props;
    const { margin, padding, direction, position, label, labelColor, value, size, disabled, activeColor, inactiveColor, borderRadius } = {
      ...defaultProps,
      ...properties,
    } as SwitcherProps;
    const [isChecked, setIsChecked] = useState(!!value);

    useEffect(() => {
      setIsChecked(!!value);
    }, [value]);

    const handleToggle = () => {
      if (disabled) return;
      if (updateProperties && id) {
        updateProperties(id, 'value', !isChecked);
      }
      setIsChecked((prev: boolean) => !prev);
    };

    // Style logic
    const switcherSize: 'small' | 'medium' | 'large' = size || "medium";
    // Define pixel sizes for each size option
    const sizePx = {
      small: { width: 32, height: 16, knob: 12, knobOffset: 4 },
      medium: { width: 48, height: 24, knob: 20, knobOffset: 4 },
      large: { width: 64, height: 32, knob: 28, knobOffset: 4 },
    };
    const px = sizePx[switcherSize];
    // Theme logic: prefer prop, then THEME mapping, then fallback
    // Use getThemeMapping to get theme-mapped values
    const themeMap = getThemeMapping(THEME) || {};
    const _activeColor = activeColor || themeMap.activeColor || "#22c55e";
    const _inactiveColor = inactiveColor || themeMap.inactiveColor || "#e5e7eb";
    const _borderRadius = borderRadius || themeMap.borderRadius || "9999px";
    const _labelColor = labelColor || themeMap.labelColor || "#000000";
    const _disabled = !!disabled;

    return (
      <BaseComponent {...props}>
        <div
          className="flex items-center"
          style={{
            margin: margin || "2px",
            padding: padding || "2px",
            display: "flex",
            alignItems: position && (position === 'top-bottom' || position === 'bottom-top') ? undefined : "center",
            flexDirection:
              position === 'left-right' ? 'row' :
              position === 'right-left' ? 'row-reverse' :
              position === 'top-bottom' ? 'column' :
              position === 'bottom-top' ? 'column-reverse' : 'row',
          }}
        >
          {(direction === "left" || !direction) ? (
            <>
              <div
                className="relative cursor-pointer select-none"
                onClick={_disabled ? undefined : handleToggle}
                style={{
                  width: px.width,
                  height: px.height,
                  background: isChecked ? _activeColor : _inactiveColor,
                  borderRadius: _borderRadius,
                  opacity: _disabled ? 0.5 : 1,
                  transition: "background 0.2s, opacity 0.2s",
                  position: 'relative',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: isChecked ? (px.width - px.knob - px.knobOffset + 1) : px.knobOffset - 1,
                    transform: 'translateY(-50%)',
                    width: px.knob,
                    height: px.knob,
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    transition: 'left 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Knob */}
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'left', pointerEvents: 'none' }}>
                  <span
                    className={`active ${isChecked ? "block" : "hidden"} text-white`}
                    style={{marginLeft: "4px"}}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.4"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              <label
                style={{
                  color: _labelColor,
                  marginLeft: "5px",
                  padding: padding || "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "50px",
                }}
                className="mr-4"
              >
                {label}
              </label>
            </>
          ) : (
            <>
              <label
                style={{
                  color: _labelColor,
                  marginRight: "5px",
                  padding: padding || "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "50px",
                }}
                className="ml-4"
              >
                {label}
              </label>
              <div
                className="relative cursor-pointer select-none"
                onClick={_disabled ? undefined : handleToggle}
                style={{
                  width: px.width,
                  height: px.height,
                  background: isChecked ? _activeColor : _inactiveColor,
                  borderRadius: _borderRadius,
                  opacity: _disabled ? 0.5 : 1,
                  transition: "background 0.2s, opacity 0.2s",
                  position: 'relative',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: isChecked ? (px.width - px.knob - px.knobOffset + 1) : px.knobOffset - 1,
                    transform: 'translateY(-50%)',
                    width: px.knob,
                    height: px.knob,
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    transition: 'left 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Knob */}
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'left', pointerEvents: 'none' }}>
                  <span
                    className={`active ${isChecked ? "block" : "hidden"} text-white`}
                    style={{marginLeft: "4px"}}
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.4"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </BaseComponent>
    );
  };

  // Return the component and manifest from createComponent
  return {
    component: Switcher,
    manifest: getSwicherManifest(api),
  };
}

export default {
  createComponent,
};
