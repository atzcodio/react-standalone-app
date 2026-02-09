

interface StepsProps  {
  steps: Array<{ label: string; content: string }>;
  currentStep: number;
  selectedStepColor: string; // Color for the selected step
  selectedStepBgColor: string; // Color for the selected step
  normalStepColor: string; // Color for normal steps
  arrowColor: string; // Color for the arrows
  backgroundColor: string; // Main background color
  orientation: 'horizontal' | 'vertical'; // Orientation of the steps
  padding?: Array <string>;
  margin?: Array <string>;
  borderRadius?: Array <string>;
}

const Configuration = {
  grid: {
    desktop: {
      width: 8, // Override width for desktop
      height: 15, // Keep height the same or adjust as needed
    },
    mobile: {
      width: 20, // Keep the same or adjust for mobile
      height: 15, // Keep the same or adjust as needed
    },
  },
  resizable: {
    width: true,
    height: true
  }
}

const dsteps = [
    {
        "label": "Step 1",
        "content": "<p>This is the content for step 1.</p>"
    },
    {
        "label": "Step 2",
        "content": "<p>This is the content for step 2.</p>"
    },
    {
        "label": "Step 3",
        "content": "<p>This is the content for step 3.</p>"
    }
]
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
        width: 24
      },
      {
        label: "steps",
        name: "steps",
        type: ElementTypes.TEXTCODEEDITOR(dsteps),
        width: 24,
        showFx: true,
        fx: `${JSON.stringify(dsteps)}`
      },
      {
        label: "currentStep",
        name: "currentStep",
        type: ElementTypes.NUMBER(0),
        width: 24
      },
    ]
  },
  {
    type: ElementTypes.GROUP("style"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "selectedStepColor",
        name: "selectedStepColor",
        type: ElementTypes.COLOR("#007bff"),
        showLabel: true,
        width: 24,
        themePropertyName:THEME.textColor,
      },
      {
        label: "selectedStepBgColor",
        name: "selectedStepBgColor",
        type: ElementTypes.COLOR("#bae0ff"),
        showLabel: true,
        width: 24,
        themePropertyName:THEME.backgroundColor,
      },
      {
        label: "Theme Name",
        name: "theme",
        type: ElementTypes.SELECT(['basic', 'vivid', 'retro','cosmic','vibrant'],'cosmic'),
        showLabel: true,
        width: 24
      },
      {
        label: "normalStepColor",
        name: "normalStepColor",
        type: ElementTypes.COLOR("#333"),
        showLabel: true,
        width: 24
      },
      {
        label: "arrowColor",
        name: "arrowColor",
        type: ElementTypes.COLOR("#007bff"),
        showLabel: true,
        width: 24
      },
      {
        label: "backgroundColor",
        name: "backgroundColor",
        type: ElementTypes.COLOR("#f9f9f9"),
        showLabel: true,
        width: 24
      },
      {
        label: "orientation",
        name: "orientation",
        type: ElementTypes.SELECT(['horizontal', 'vertical'],'horizontal'),
        width: 24
      },
      {
        label: "Border Radius",
        name: "borderRadius",
        type: ElementTypes.BORDERRADIUS(["8px", "8px", "8px", "8px"]),
        showLabel: true,
        width: 24
      },
      {
        label: "Padding",
        name: "padding",
        type: ElementTypes.SPACING(['20px', '20px', '20px', '20px']),
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

    ]
  },
];

const getThemeMapping = (THEME: any) =>  {
  return {
  };
}

export const getStepManifest = (api: any) => {
  const { ElementTypes, THEME, getDefaultProps } = api;
  const EditProperties = getEditProperties(ElementTypes,  THEME);
  return {
      name: "Steps",
      EditProperties: EditProperties,
      Configuration: Configuration,
      ThemeMapping: getThemeMapping(THEME),
      defaultProps: getDefaultProps(EditProperties),
  };
};


export function createComponent(api: any) {
  const { ElementTypes, THEME, BaseComponent, getDefaultProps, React } = api;
  const { useEffect, useState } = React;

  const EditProperties = getEditProperties(ElementTypes,  THEME);

  const defaultProps: Partial<StepsProps> = getDefaultProps(EditProperties);

  const Steps: React.FC<StepsProps & BaseProps> = (props) => {
    console.log("props steps",props)
    const { id,_name, grid,properties, meta, updateProperties, onFxChange, ...rest } = props;
    let { steps = [],margin,padding ,borderRadius , currentStep = 0, selectedStepColor,selectedStepBgColor, normalStepColor, arrowColor, backgroundColor, orientation } = {...defaultProps,...properties } as Required<StepsProps>;
    const [currentStepIndex, setCurrentStepIndex] = useState(currentStep);

    if (typeof steps === "string") {
      steps = JSON.parse(steps);
    }

    const handleStepClick = (index: number) => {
      setCurrentStepIndex(index);
      updateProperties(id,"currentStep", index);
      updateProperties(id,"currentStepData", steps[index]);
    };

    useEffect(() => {
      // updateProperties(id,"currentStep", currentStep);
      // updateProperties(id,"steps", steps);
    })
    // Define styles as objects
    const styles = {
      stepControl: {
        display: orientation === 'horizontal' ? 'flex' : 'block',
        alignItems: 'center',
        justifyContent: orientation === 'horizontal' ? 'space-between' : 'flex-start',
        height: '100%',
        width: '100%',
        padding: `${padding?.[0] ?? '0px'} ${padding?.[1] ?? '0px'} ${padding?.[2] ?? '0px'} ${padding?.[3] ?? '0px'}`, 
        margin: `${margin?.[0] ?? '0px'} ${margin?.[1] ?? '0px'} ${margin?.[2] ?? '0px'} ${margin?.[3] ?? '0px'}` , 
        borderRadius: `${borderRadius?.[0] ?? '0px'} ${borderRadius?.[1] ?? '0px'} ${borderRadius?.[2] ?? '0px'} ${borderRadius?.[3] ?? '0px'}` ,
        backgroundColor: backgroundColor,
        // borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      } as React.CSSProperties,
      step: (isActive: boolean) => ({
        padding: '15px',
        borderRadius: '5px',
        textAlign: 'center',
        transition: 'border-color 0.3s, background-color 0.3s',
        borderColor: isActive ? selectedStepColor : '#ccc',
        // backgroundColor: isActive ? "var(--background-color, " + selectedStepBgColor + ")" : '#fff',
        backgroundColor: isActive ? `var(--background-color, ${selectedStepBgColor})` : '#fff',
        border:"var(--border-color, " + selectedStepBgColor + ")",
        cursor: 'pointer',
        // color: isActive ?"var(--text-color, " + selectedStepColor + ")"  : normalStepColor,
        color: isActive ? `var(--text-color, ${selectedStepColor})` : normalStepColor,
        marginBottom: orientation === 'vertical' ? '10px' : '0',
        marginRight: orientation === 'horizontal' ? '10px' : '0',
      } as React.CSSProperties),
      stepTitle: {
        margin: '0 0 10px',
        fontSize: '1em',
      } as React.CSSProperties,
      stepContent: {
        fontSize: '0.9em',
        color: "var(--text-color, "+   + ")",
        // color: '#555',
      } as React.CSSProperties,
      arrow: {
        width: '30px',
        height: '30px',
        display: orientation === 'horizontal' ? 'flex' : 'none', // Only show arrows in horizontal orientation
        alignItems: 'center',
        justifyContent: 'center',
        color: arrowColor,
        margin: '0 10px',
      } as React.CSSProperties,
    };

  console.log("color===",selectedStepColor,selectedStepBgColor)
    const baseCmpProps = {
        id,
        properties,
        meta,
        EditProperties,
        updateProperties,
        grid
    };

    useEffect(()=>{
      console.log("selectedStepColor===",selectedStepColor)
    },[selectedStepColor])

    useEffect(()=>{
      console.log("selectedStepColor===",selectedStepBgColor)
    },[selectedStepBgColor])

    return (
      <BaseComponent {...baseCmpProps} style={{padding:'4px',height:`calc(100% - (${margin?.[0] ?? '0px'} + ${margin?.[2] ?? '0px'}))` , width:`calc(100% - (${margin?.[1] ?? '0px'} + ${margin?.[3] ?? '0px'}))`}}>
        <div style={styles.stepControl}>
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div
                style={styles.step(currentStepIndex === index)}
                onClick={() => handleStepClick(index)}
              >
                <h3 style={styles.stepTitle}>{step.label}</h3>
                {currentStepIndex === index && <div style={styles.stepContent} dangerouslySetInnerHTML={{ __html: step.content }} />}
              </div>
              {index < steps.length - 1 && orientation === 'horizontal' && (
                <div style={styles.arrow}>
                  <span style={{ fontSize: '24px' }}>&#8594;</span> {/* Right arrow */}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </BaseComponent>
    );
  };
  return {
    component: Steps,
    manifest: getStepManifest(api)
  };
}

export default {
  createComponent
}