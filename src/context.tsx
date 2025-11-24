import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  screens: any[];
  queries: any[];
  selectedScreen: any;
  setSelectedScreen: (screen: any) => void;
  previewData: any;
  setPreviewData: (data: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode; initialData?: any }> = ({ 
  children, 
  initialData 
}) => {
  const [screens] = useState(initialData?.screens || []);
  const [queries] = useState(initialData?.queries || []);
  const [selectedScreen, setSelectedScreen] = useState(initialData?.selectedScreen || null);
  const [previewData, setPreviewData] = useState(initialData || {});

  return (
    <AppContext.Provider value={{
      screens,
      queries,
      selectedScreen,
      setSelectedScreen,
      previewData,
      setPreviewData
    }}>
      {children}
    </AppContext.Provider>
  );
};