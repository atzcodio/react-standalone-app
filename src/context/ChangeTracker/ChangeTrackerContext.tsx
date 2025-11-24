import React, { createContext, useContext, useState } from 'react';
import { useAppContext } from '../AppProvider/AppProvider'; 

interface ChangeNotification {
    id: string; // Unique identifier for the control
    data: any; // Data associated with the change
}

interface ChangeTrackerContextType {
    notifyChange: (notification: ChangeNotification) => void;
    subscribe: (callback: (notification: ChangeNotification) => void) => void;
}

const ChangeTrackerContext = createContext<ChangeTrackerContextType | undefined>(undefined);

export const ChangeTrackerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [subscribers, setSubscribers] = useState<Array<(notification: ChangeNotification) => void>>([]);
    const { componentsData, updateComponentValue } = useAppContext();

    const notifyChange = (notification: ChangeNotification) => {
        console.log("in change tracker",notification);
        subscribers.forEach(callback => callback(notification));
        //updateComponentValue(notification.id,notification.data);
    };

    const subscribe = (callback: (notification: ChangeNotification) => void) => {
        setSubscribers(prev => [...prev, callback]);
    };

    return (
        <ChangeTrackerContext.Provider value={{ notifyChange, subscribe }}>
            {children}
        </ChangeTrackerContext.Provider>
    );
};

export const useChangeTracker = () => {
    const context = useContext(ChangeTrackerContext);
    if (!context) {
        throw new Error('useChangeTracker must be used within a ChangeTrackerProvider');
    }
    return context;
};
