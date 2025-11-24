import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface AppContextType {
    componentsData: Record<string, any>;
    updateComponentValue: (id: string, value: any) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode; // Define the type for children
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [componentsData, setComponentsData] = useState({});

    const updateComponentValue = (id: string, value: any) => {
        setComponentsData(prev => ({
            ...prev,
            [id]: value,
        }));

        console.log("GG componentsData",componentsData)
    };

    return (
        <AppContext.Provider value={{ componentsData, updateComponentValue }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

// Custom hook to get value from context
export const useGetValueFromContext = (key: string) => {
    const { componentsData } = useAppContext();
    return componentsData[key] !== undefined ? componentsData[key] : undefined;
};
