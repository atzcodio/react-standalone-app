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

  // Load connections from localStorage on mount
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

  // Save connections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dbConnections', JSON.stringify(connections));
  }, [connections]);

  // Create a new database connection
  const createConnection = (connectionData) => {
    const newConnection = {
      id: Date.now().toString(),
      name: connectionData.name,
      dbType: connectionData.dbType,
      host: connectionData.host,
      port: connectionData.port,
      database: connectionData.database,
      username: connectionData.username,
      password: connectionData.password, // In production, this should be encrypted
      useSSL: connectionData.useSSL || false,
      timeout: connectionData.timeout || 30,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setConnections(prev => [...prev, newConnection]);
    toast.success(`Database connection "${connectionData.name}" created successfully`);
    return newConnection;
  };

  // Update an existing database connection
  const updateConnection = (id, connectionData) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === id 
          ? { ...conn, ...connectionData, updatedAt: new Date().toISOString() }
          : conn
      )
    );
    toast.success(`Database connection "${connectionData.name}" updated successfully`);
  };

  // Delete a database connection
  const deleteConnection = (id) => {
    const connection = connections.find(conn => conn.id === id);
    setConnections(prev => prev.filter(conn => conn.id !== id));
    toast.success(`Database connection "${connection?.name}" deleted successfully`);
  };

  // Get connection by ID
  const getConnection = (id) => {
    return connections.find(conn => conn.id === id);
  };

  // Get connection by name
  const getConnectionByName = (name) => {
    return connections.find(conn => conn.name === name);
  };

  // Test database connection
  const testConnection = async (connectionData) => {
    try {
      // Simulate connection test
      // In a real implementation, you would make an actual database connection
      console.log('Testing database connection:', connectionData);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success/failure based on host
      if (connectionData.host === 'invalid-host') {
        throw new Error('Connection failed: Host not reachable');
      }
      
      toast.success('Database connection test successful');
      return { success: true, message: 'Connection successful' };
    } catch (error) {
      toast.error(`Connection test failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  };

  // Export connections (for backup)
  const exportConnections = () => {
    const dataStr = JSON.stringify(connections, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'database-connections.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import connections (from backup)
  const importConnections = (connectionsData) => {
    try {
      const imported = JSON.parse(connectionsData);
      if (Array.isArray(imported)) {
        setConnections(prev => [...prev, ...imported]);
        toast.success(`${imported.length} database connections imported successfully`);
      } else {
        throw new Error('Invalid format');
      }
    } catch (error) {
      toast.error('Failed to import connections: Invalid format');
    }
  };

  const value = {
    connections,
    createConnection,
    updateConnection,
    deleteConnection,
    getConnection,
    getConnectionByName,
    testConnection,
    exportConnections,
    importConnections
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export default DatabaseContext;