import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const DatabaseContext = createContext();

export const useDatabaseContext = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabaseContext must be used within a DatabaseProvider');
  }
  return context;
};

export const DatabaseProvider = ({ children }) => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const savedConnections = localStorage.getItem('dbConnections');
    if (savedConnections) {
      try {
        setConnections(JSON.parse(savedConnections));
      } catch (error) {
        console.error('Error loading database connections:', error);
        setConnections([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dbConnections', JSON.stringify(connections));
  }, [connections]);

  const createConnection = (connectionData) => {
    const newConnection = {
      id: Date.now().toString(),
      name: connectionData.name,
      dbType: connectionData.dbType,
      // ...rest of your logic...
    };
    setConnections([...connections, newConnection]);
    toast.success('Database connection created!');
  };

  return (
    <DatabaseContext.Provider value={{ connections, createConnection }}>
      {children}
    </DatabaseContext.Provider>
  );
};
