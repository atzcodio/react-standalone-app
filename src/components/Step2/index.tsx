interface Step2Props {
  steps: Array<{
    id: string;
    title: string;
    subtitle?: string;
    amount?: string;
    date?: string;
    status: 'completed' | 'pending' | 'warning' | 'info';
    icon?: { type: string; name: string } | string;
  }>;
  showConnector: boolean;
  variant: 'default' | 'compact';
  backgroundColor: string;
  borderColor: string;
  padding: string;
  margin: Array<string>;
  border_radius: Array<string>;
}

const defaultSteps = [
  {
    id: '1',
    title: 'Your wish list has been submitted',
    subtitle: '',
    amount: '',
    date: 'DUE ON MAR 1, 2024',
    status: 'info' as const,
    icon: { type: "react-ai", name: "AiFillGift" }
  },
  {
    id: '2',
    title: 'You saved $50 in order to get it',
    subtitle: 'Savings milestone reached',
    amount: '$50',
    date: 'DUE ON MAR 1, 2024',
    status: 'completed' as const,
    icon: { type: "react-ai", name: "AiFillCheckCircle" }
  },
  {
    id: '3',
    title: 'You spent $50 in order to have it',
    subtitle: 'Purchase completed',
    amount: '-$50',
    date: 'DUE ON MAR 1, 2024',
    status: 'warning' as const,
    icon: { type: "react-ai", name: "AiFillWarning" }
  }
];

const Configuration = {
  grid: {
    desktop: {
      width: 4,
      height: 20,
    },
    mobile: {
      width: 15,
      height: 25,
    },
  },
  resizable: {
    width: true,
    height: true
  }
};

export const getThemeMapping = (THEME: any) => {
  return {

  }
}
export const getEditProperties = (ElementTypes:any, THEME: any) => [
  {
    type: ElementTypes.GROUP("Data"),
    name: "data",
    elements: [
      {
        type: ElementTypes.REPEATBLOCK(
            
          {
            id: ElementTypes.TEXT(""),
            title: ElementTypes.TEXT("Step Title"),
            subtitle: ElementTypes.TEXT(""),
            amount: ElementTypes.TEXT(""),
            date: ElementTypes.TEXT(""),
            status: ElementTypes.SELECT(["completed", "pending", "warning", "info"]),
            icon: ElementTypes.ICONPICKER({ type: "react-ai", name: "AiFillCheckCircle" })
          },
          defaultSteps,
         {add:true,remove:true}
        ),
        name: "steps",
        label: "Timeline Steps",
        showLabel: true,
        width: 24,
        showFx: true,
        fx: `${JSON.stringify(defaultSteps)}`
      },
      {
        type: ElementTypes.TOGGLE(true),
        name: "showConnector",
        label: "Show Connector Lines"
      },
      {
        type: ElementTypes.SELECT(["default", "compact"]),
        name: "variant",
        label: "Variant"
      }
    ]
  },
  {
    type: ElementTypes.GROUP("Styling"),
    name: "styling",
    elements: [
      {
        type: ElementTypes.COLOR("#ffffff"),
        name: "backgroundColor",
        label: "Background Color"
      },
      {
        type: ElementTypes.COLOR("#000000"),
        name: "borderColor",
        label: "Border Color"
      },
      {
        type: ElementTypes.TEXT(""),
        name: "padding",
        label: "Padding"
      },
      {
        type: ElementTypes.SPACING(["0px", "0px", "0px", "0px"]),
        name: "margin",
        label: "Margin"
      },
      {
        type: ElementTypes.BORDERRADIUS(["0px", "0px", "0px", "0px"]),
        name: "borderRadius",
        label: "Border Radius"
      }
    ]
  }
];


export const getStep2Manifest = (api: any) => {
  const { ElementTypes, THEME, getDefaultProps } = api;
  const EditProperties = getEditProperties(ElementTypes,  THEME);
  return {
      name: "Step2",
      EditProperties: EditProperties,
      Configuration: Configuration,
      ThemeMapping: getThemeMapping(THEME),
      defaultProps: getDefaultProps(EditProperties),
  };
};

export function createComponent(api: any) {
  const {BaseComponent, BaseConfiguration,BaseProps,ElementTypes, THEME, getDefaultProps,LucideReact,AiIcons } = api;
  const { Clock, CheckCircle, AlertCircle, Gift } = LucideReact;
  const EditProperties = getEditProperties(ElementTypes,THEME );

  const defaultProps = getDefaultProps(EditProperties);

  const Steps2: React.FC<Step2Props & BaseProps> = (props) => {
      const { id,_name, grid,properties, meta, updateProperties, onFxChange, ...rest } = props;
        let { 
          steps = [],
          showConnector,
          borderColor, 
          margin,
          padding,
          border_radius,
          backgroundColor 
        } = {...defaultProps,...properties } as Required<Step2Props>;

    const baseCmpProps = {
      EditProperties,
      properties,
      id,
      updateProperties,
      grid
    };

    const getIconComponent = (iconData: any, status: string) => {
      const baseClasses = "w-5 h-5";
      const iconColor = getIconColor(status);
      
      // Handle icon picker format with react-icons/ai
      if (iconData && typeof iconData === 'object' && iconData.type && iconData.name) {
        if (iconData.type === 'react-ai') {
          // Dynamically resolve the icon based on the name prop
          const iconMap: { [key: string]: React.ElementType } = AiIcons;
          const IconComponent = iconMap[iconData.name];
          
          if (IconComponent) {
            return <IconComponent style={{ width: '20px', height: '20px', color: iconColor }} />;
          }
        }
      }
      
      // Fallback for old string format or specific hardcoded icons
      const iconType = typeof iconData === 'string' ? iconData : 'check';
      
      switch (iconType) {
        case 'check':
          return <CheckCircle className={`${baseClasses} text-green-500`} />;
        case 'clock':
          return <Clock className={`${baseClasses} text-blue-500`} />;
        case 'alert':
        case 'alert-triangle':
          return <AlertCircle className={`${baseClasses} text-orange-500`} />;
        case 'gift':
          return <Gift className={`${baseClasses} text-blue-500`} />;
        default:
          return <CheckCircle className={`${baseClasses} text-green-500`} />;
      }
    };

    const getIconColor = (status: string) => {
      switch (status) {
        case 'completed':
          return '#10b981'; // green-500
        case 'pending':
          return '#6b7280'; // gray-500
        case 'warning':
          return '#f59e0b'; // amber-500
        case 'info':
          return '#3b82f6'; // blue-500
        default:
          return '#10b981'; // green-500
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed':
          return 'bg-green-100 border-green-200';
        case 'pending':
          return 'bg-gray-100 border-gray-200';
        case 'warning':
          return 'bg-orange-100 border-orange-200';
        case 'info':
          return 'bg-blue-100 border-blue-200';
        default:
          return 'bg-gray-100 border-gray-200';
      }
    };

    const getTitleColor = (status: string) => {
      switch (status) {
        case 'completed':
          return 'text-green-800';
        case 'pending':
          return 'text-gray-700';
        case 'warning':
          return 'text-orange-800';
        case 'info':
          return 'text-blue-800';
        default:
          return 'text-gray-700';
      }
    };

    return (
      <BaseComponent {...baseCmpProps} style={{
        padding,
        width: `calc(100% - (${margin[1]} + ${margin[3]}))`,
        height: `calc(100% - (${margin[0]} + ${margin[2]}))`,
        backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: `${border_radius?.[0]} ${border_radius?.[1]} ${border_radius?.[2]} ${border_radius?.[3]}`
      }}>
        <div className="w-full h-full overflow-auto">
          <div className="space-y-4 p-2">
            {steps.map((step:any, index:number) => (
              <div key={step.id} className="relative flex items-start">
                {/* Connector Line */}
                {showConnector && index < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200"></div>
                )}
                
                {/* Icon Container */}
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-full border-2 
                  ${getStatusColor(step.status)}
                  flex items-center justify-center mr-4
                `}>
                  {getIconComponent(step.icon || 'check', step.status)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`
                        text-sm font-medium leading-5
                        ${getTitleColor(step.status)}
                      `}>
                        {step.title}
                      </h3>
                      {step.subtitle && (
                        <p className="text-xs text-gray-600 mt-1">
                          {step.subtitle}
                        </p>
                      )}
                      {step.date && (
                        <p className="text-xs text-gray-500 mt-1 font-medium">
                          {step.date}
                        </p>
                      )}
                    </div>
                    
                    {step.amount && (
                      <div className="text-right ml-4">
                        <span className="text-sm font-semibold text-gray-900">
                          {step.amount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BaseComponent>
    );
  };
  return {
    component: Steps2,
    manifest: getStep2Manifest(api)
  }
}

export default {
  createComponent,
}