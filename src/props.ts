export interface ComponentProps {
    title?: string;
    style?: string;
    placeholder?: string;
    label?: string;
    label_font_size?: number
    label_font_size_meter?: string
}

export const THEME={
  backgroundColor:'backgroundColor',
  textColor:'textColor',
  borderColor:'borderColor',
  primaryColor: 'primaryColor',
  secondaryColor: 'secondaryColor',
  accentColor: 'accentColor',
  surfaceColor: 'surfaceColor',
  errorColor: 'errorColor',
  warningColor: 'warningColor',
  successColor: 'successColor',
  infoColor: 'infoColor',
  mutedTextColor: 'mutedTextColor',
  linkColor: 'linkColor',
  hoverColor: 'hoverColor',
  focusColor: 'focusColor',
  shadowColor: 'shadowColor'
}

// Theme property mapping type for components
export interface ComponentThemeMapping {
  [propertyName: string]: keyof typeof THEME | string;
}

export const THEMEMAP={
    none: {},
    basic: {
      [THEME.backgroundColor]: "#007BFF",
      [THEME.textColor]: "#FFFFFF",
      [THEME.borderColor]: "1px solid #007BFF",
      [THEME.primaryColor]: "#007BFF",
      [THEME.secondaryColor]: "#6C757D",
      [THEME.accentColor]: "#17A2B8",
      [THEME.surfaceColor]: "#FFFFFF",
      [THEME.errorColor]: "#DC3545",
      [THEME.warningColor]: "#FFC107",
      [THEME.successColor]: "#28A745",
      [THEME.infoColor]: "#17A2B8",
      [THEME.mutedTextColor]: "#6C757D",
      [THEME.linkColor]: "#007BFF",
      [THEME.hoverColor]: "#0056B3",
      [THEME.focusColor]: "#007BFF",
      [THEME.shadowColor]: "rgba(0, 0, 0, 0.15)"
    },
    vivid: {
      [THEME.backgroundColor]: "#FF7F50",
      [THEME.textColor]: "#2B1D0E",
      [THEME.borderColor]: "1px solid #FF7F50",
      [THEME.primaryColor]: "#FF7F50",
      [THEME.secondaryColor]: "#FF4500",
      [THEME.accentColor]: "#FFD700",
      [THEME.surfaceColor]: "#FFF8DC",
      [THEME.errorColor]: "#FF0000",
      [THEME.warningColor]: "#FFA500",
      [THEME.successColor]: "#32CD32",
      [THEME.infoColor]: "#00CED1",
      [THEME.mutedTextColor]: "#8B4513",
      [THEME.linkColor]: "#FF4500",
      [THEME.hoverColor]: "#FF6347",
      [THEME.focusColor]: "#FF7F50",
      [THEME.shadowColor]: "rgba(255, 127, 80, 0.3)"
    },
    retro: {
      [THEME.backgroundColor]: "#FF66EC",
      [THEME.textColor]: "#1F0030",
      [THEME.borderColor]: "1px solid #FF66EC",
      [THEME.primaryColor]: "#FF66EC",
      [THEME.secondaryColor]: "#9966CC",
      [THEME.accentColor]: "#FFB6C1",
      [THEME.surfaceColor]: "#F8F0FF",
      [THEME.errorColor]: "#FF1493",
      [THEME.warningColor]: "#FFD700",
      [THEME.successColor]: "#98FB98",
      [THEME.infoColor]: "#DA70D6",
      [THEME.mutedTextColor]: "#663399",
      [THEME.linkColor]: "#9966CC",
      [THEME.hoverColor]: "#FF69B4",
      [THEME.focusColor]: "#FF66EC",
      [THEME.shadowColor]: "rgba(255, 102, 236, 0.25)"
    },
    cosmic: {
      [THEME.backgroundColor]: "#FF548C",
      [THEME.textColor]: "#000000",
      [THEME.borderColor]: "1px solid #FF548C",
      [THEME.primaryColor]: "#FF548C",
      [THEME.secondaryColor]: "#4B0082",
      [THEME.accentColor]: "#00FFFF",
      [THEME.surfaceColor]: "#F0F8FF",
      [THEME.errorColor]: "#FF0000",
      [THEME.warningColor]: "#FFD700",
      [THEME.successColor]: "#00FF00",
      [THEME.infoColor]: "#00BFFF",
      [THEME.mutedTextColor]: "#696969",
      [THEME.linkColor]: "#4B0082",
      [THEME.hoverColor]: "#FF6B9D",
      [THEME.focusColor]: "#FF548C",
      [THEME.shadowColor]: "rgba(255, 84, 140, 0.3)"
    },
    vibrant: {
      [THEME.backgroundColor]: "#6CDAFE",
      [THEME.textColor]: "#000000",
      [THEME.borderColor]: "1px solid #6CDAFE",
      [THEME.primaryColor]: "#6CDAFE",
      [THEME.secondaryColor]: "#4169E1",
      [THEME.accentColor]: "#FF1493",
      [THEME.surfaceColor]: "#E6F7FF",
      [THEME.errorColor]: "#FF4500",
      [THEME.warningColor]: "#FFD700",
      [THEME.successColor]: "#00FF7F",
      [THEME.infoColor]: "#00BFFF",
      [THEME.mutedTextColor]: "#2F4F4F",
      [THEME.linkColor]: "#4169E1",
      [THEME.hoverColor]: "#87CEEB",
      [THEME.focusColor]: "#6CDAFE",
      [THEME.shadowColor]: "rgba(108, 218, 254, 0.3)"
    },
    sunset: {
      [THEME.backgroundColor]: "#FFC816",
      [THEME.textColor]: "#4A2800",
      [THEME.borderColor]: "1px solid #FFC816",
      [THEME.primaryColor]: "#FFC816",
      [THEME.secondaryColor]: "#FF8C00",
      [THEME.accentColor]: "#FF4500",
      [THEME.surfaceColor]: "#FFFACD",
      [THEME.errorColor]: "#DC143C",
      [THEME.warningColor]: "#FF6347",
      [THEME.successColor]: "#32CD32",
      [THEME.infoColor]: "#20B2AA",
      [THEME.mutedTextColor]: "#8B4513",
      [THEME.linkColor]: "#FF8C00",
      [THEME.hoverColor]: "#FFD700",
      [THEME.focusColor]: "#FFC816",
      [THEME.shadowColor]: "rgba(255, 200, 22, 0.3)"
    },
    carnival: {
      [THEME.backgroundColor]: "#C4D60E",
      [THEME.textColor]: "#3B3F00",
      [THEME.borderColor]: "1px solid #C4D60E",
      [THEME.primaryColor]: "#C4D60E",
      [THEME.secondaryColor]: "#9ACD32",
      [THEME.accentColor]: "#FF69B4",
      [THEME.surfaceColor]: "#F0FFF0",
      [THEME.errorColor]: "#FF4500",
      [THEME.warningColor]: "#FFD700",
      [THEME.successColor]: "#32CD32",
      [THEME.infoColor]: "#20B2AA",
      [THEME.mutedTextColor]: "#556B2F",
      [THEME.linkColor]: "#9ACD32",
      [THEME.hoverColor]: "#ADFF2F",
      [THEME.focusColor]: "#C4D60E",
      [THEME.shadowColor]: "rgba(196, 214, 14, 0.3)"
    },
    festival: {
      [THEME.backgroundColor]: "#7F7DFB",
      [THEME.textColor]: "#000000",
      [THEME.borderColor]: "1px solid #7F7DFB",
      [THEME.primaryColor]: "#7F7DFB",
      [THEME.secondaryColor]: "#9370DB",
      [THEME.accentColor]: "#FF1493",
      [THEME.surfaceColor]: "#E6E6FA",
      [THEME.errorColor]: "#FF0000",
      [THEME.warningColor]: "#FFD700",
      [THEME.successColor]: "#00FF00",
      [THEME.infoColor]: "#00BFFF",
      [THEME.mutedTextColor]: "#483D8B",
      [THEME.linkColor]: "#9370DB",
      [THEME.hoverColor]: "#9999FF",
      [THEME.focusColor]: "#7F7DFB",
      [THEME.shadowColor]: "rgba(127, 125, 251, 0.3)"
    },
    tropical: {
      [THEME.backgroundColor]: "#EA2157",
      [THEME.textColor]: "#FCE4EC",
      [THEME.borderColor]: "1px solid #EA2157",
      [THEME.primaryColor]: "#EA2157",
      [THEME.secondaryColor]: "#FF1493",
      [THEME.accentColor]: "#00FF7F",
      [THEME.surfaceColor]: "#FFF0F5",
      [THEME.errorColor]: "#DC143C",
      [THEME.warningColor]: "#FF6347",
      [THEME.successColor]: "#00FF7F",
      [THEME.infoColor]: "#00CED1",
      [THEME.mutedTextColor]: "#CD5C5C",
      [THEME.linkColor]: "#FF1493",
      [THEME.hoverColor]: "#FF69B4",
      [THEME.focusColor]: "#EA2157",
      [THEME.shadowColor]: "rgba(234, 33, 87, 0.3)"
    },
    dark: {
      [THEME.backgroundColor]: "#1E1E1E",
      [THEME.textColor]: "#EAEAEA",
      [THEME.borderColor]: "1px solid #404040",
      [THEME.primaryColor]: "#0D7377",
      [THEME.secondaryColor]: "#14A085",
      [THEME.accentColor]: "#32E875",
      [THEME.surfaceColor]: "#2D2D2D",
      [THEME.errorColor]: "#FF6B6B",
      [THEME.warningColor]: "#FFD93D",
      [THEME.successColor]: "#6BCF7F",
      [THEME.infoColor]: "#4ECDC4",
      [THEME.mutedTextColor]: "#B0B0B0",
      [THEME.linkColor]: "#4ECDC4",
      [THEME.hoverColor]: "#404040",
      [THEME.focusColor]: "#32E875",
      [THEME.shadowColor]: "rgba(0, 0, 0, 0.5)"
    },
    light: {
      [THEME.backgroundColor]: "#F9F9F9",
      [THEME.textColor]: "#222222",
      [THEME.borderColor]: "1px solid #E0E0E0",
      [THEME.primaryColor]: "#2196F3",
      [THEME.secondaryColor]: "#757575",
      [THEME.accentColor]: "#FF5722",
      [THEME.surfaceColor]: "#FFFFFF",
      [THEME.errorColor]: "#F44336",
      [THEME.warningColor]: "#FF9800",
      [THEME.successColor]: "#4CAF50",
      [THEME.infoColor]: "#2196F3",
      [THEME.mutedTextColor]: "#757575",
      [THEME.linkColor]: "#1976D2",
      [THEME.hoverColor]: "#F5F5F5",
      [THEME.focusColor]: "#2196F3",
      [THEME.shadowColor]: "rgba(0, 0, 0, 0.1)"
    }
}

// Utility function to get theme-mapped properties for a component using custom mapping
export const getThemePropertiesForComponent = (componentThemeMapping: ComponentThemeMapping, themeName: string) => {
  const theme = THEMEMAP[themeName as keyof typeof THEMEMAP] as Record<string, any>;
  
  if (!theme || !componentThemeMapping) {
    return {};
  }

  const mappedProperties: Record<string, any> = {};
  
  Object.entries(componentThemeMapping).forEach(([propertyName, themeKey]) => {
    if (theme && themeKey in theme) {
      mappedProperties[propertyName] = theme[themeKey];
    }
  });

  return mappedProperties;
};

// Utility function to apply theme to component properties using custom mapping
export const applyThemeToProperties = (
  componentThemeMapping: ComponentThemeMapping,
  themeName: string, 
  currentProperties: Record<string, any>
) => {
  const themeProperties = getThemePropertiesForComponent(componentThemeMapping, themeName);
  return {
    ...currentProperties,
    ...themeProperties
  };
};

// Helper function to check if a property is theme-mappable using custom mapping
export const isThemeMappableProperty = (componentThemeMapping: ComponentThemeMapping, propertyName: string) => {
  return componentThemeMapping && propertyName in componentThemeMapping;
};

export const SCREENTYPES = [

];