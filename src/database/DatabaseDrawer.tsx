import React, { useState, useEffect } from 'react';
import { 
  Drawer, 
  Button, 
  Form, 
  Input, 
  Select, 
  Space, 
  Popconfirm,
  InputNumber,
  Checkbox,
  Tag,
  Tooltip,
  message,
  Alert,
  Layout,
  Menu,
  theme,
  Typography,
  Card,
  Divider
} from 'antd';
import './DatabaseDrawer.css';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  RestOutlined,
  ExportOutlined,
  ImportOutlined,
  DatabaseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { databaseService, DatabaseConfig } from '../services/databaseService';

const { Option } = Select;
const { Content, Sider } = Layout;

interface Connection {
  id: string; // UID from database
  uid: string; // Keep original UID
  name: string;
  dbType: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  useSSL: boolean;
  timeout?: number;
  createdAt: string;
  updatedAt?: string;
}

interface DatabaseDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const DatabaseDrawer: React.FC<DatabaseDrawerProps> = ({ visible, onClose }) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingConnection, setEditingConnection] = useState<Connection | null>(null);
  const [form] = Form.useForm();
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{[key: string]: {success: boolean, message: string}}>({});
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dbTypes = [
    'MySQL',
    'PostgreSQL', 
    'SQLite',
    'SQL Server',
    'Oracle',
    'MariaDB',
    'MongoDB',
    'Amazon Redshift',
    'Snowflake',
    'Amazon DynamoDB',
    'Google BigQuery',
    'Cassandra',
    'JDBC (Generic)',
    'IBM DB2',
    'ClickHouse'
  ];

  const defaultPorts: {[key: string]: number} = {
    'MySQL': 3306,
    'PostgreSQL': 5432,
    'SQLite': 0,
    'SQL Server': 1433,
    'Oracle': 1521,
    'MariaDB': 3306,
    'MongoDB': 27017,
    'Amazon Redshift': 5439,
    'Snowflake': 443,
    'Amazon DynamoDB': 443,
    'Google BigQuery': 443,
    'Cassandra': 9042,
    'JDBC (Generic)': 0,
    'IBM DB2': 50000,
    'ClickHouse': 9000
  };

  // Load connections from database API
  useEffect(() => {
    const loadConnections = async () => {
      try {
        const result = await databaseService.getConfigs();
        if (result.success && result.configs) {
          // Convert configs to Connection format with required id field
          const formattedConnections: Connection[] = result.configs
            .filter(config => config.uid) // Only include configs with valid UIDs
            .map(config => ({
              id: config.uid!,
              uid: config.uid!,
              name: config.name,
              host: config.host,
              port: config.port,
              database: config.database,
              username: config.username,
              password: config.password,
              useSSL: config.useSSL,
              dbType: config.dbType || 'mysql',
              createdAt: config.createdAt || new Date().toISOString(),
              updatedAt: config.updatedAt,
              timeout: 30000 // Default timeout
            }));
          setConnections(formattedConnections);
        } else {
          console.error('Failed to load connections:', result.error);
          message.error('Failed to load database connections');
        }
      } catch (error) {
        console.error('Error loading database connections:', error);
        message.error('Failed to load database connections');
      }
    };

    if (visible) {
      loadConnections();
    }
  }, [visible]);

  // Save connection using database service
  const saveConnections = async (connectionData: Omit<Connection, 'id' | 'uid' | 'createdAt' | 'updatedAt'>) => {
    try {
      const result = await databaseService.saveConfig({
        name: connectionData.name,
        host: connectionData.host,
        port: connectionData.port,
        database: connectionData.database,
        username: connectionData.username,
        password: connectionData.password,
        useSSL: connectionData.useSSL,
        dbType: connectionData.dbType
      });

      if (result.success) {
        message.success('Database connection saved successfully');
        // Reload connections to get the updated list
        const updatedResult = await databaseService.getConfigs();
        if (updatedResult.success && updatedResult.configs) {
          const formattedConnections: Connection[] = updatedResult.configs
            .filter(config => config.uid)
            .map(config => ({
              id: config.uid!,
              uid: config.uid!,
              name: config.name,
              host: config.host,
              port: config.port,
              database: config.database,
              username: config.username,
              password: config.password,
              useSSL: config.useSSL,
              dbType: config.dbType || 'mysql',
              createdAt: config.createdAt || new Date().toISOString(),
              updatedAt: config.updatedAt,
              timeout: 30000
            }));
          setConnections(formattedConnections);
        }
      } else {
        message.error(result.error || 'Failed to save connection');
      }
    } catch (error) {
      console.error('Error saving connection:', error);
      message.error('Failed to save connection');
    }
  };

  const handleDbTypeChange = (dbType: string) => {
    const port = defaultPorts[dbType];
    if (port) {
      form.setFieldsValue({ port });
    }
  };

  const getRequiredFields = (dbType: string) => {
    const configs: {[key: string]: {needsHost: boolean, needsPort: boolean, needsDatabase: boolean, needsAuth: boolean}} = {
      'MySQL': { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true },
      'PostgreSQL': { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true },
      'SQLite': { needsHost: false, needsPort: false, needsDatabase: true, needsAuth: false },
      'SQL Server': { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true },
      'Oracle': { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true },
      'MariaDB': { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true },
      'MongoDB': { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true },
      'Amazon Redshift': { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true },
      'Snowflake': { needsHost: true, needsPort: false, needsDatabase: true, needsAuth: true },
      'Amazon DynamoDB': { needsHost: false, needsPort: false, needsDatabase: false, needsAuth: true },
      'Google BigQuery': { needsHost: false, needsPort: false, needsDatabase: true, needsAuth: true },
      'Cassandra': { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true },
      'JDBC (Generic)': { needsHost: false, needsPort: false, needsDatabase: false, needsAuth: true },
      'IBM DB2': { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true },
      'ClickHouse': { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true }
    };
    return configs[dbType] || { needsHost: true, needsPort: true, needsDatabase: true, needsAuth: true };
  };

  const getPlaceholders = (dbType: string) => {
    const placeholders: {[key: string]: {host: string, database: string}} = {
      'MySQL': { host: 'localhost', database: 'my_database' },
      'PostgreSQL': { host: 'localhost', database: 'my_database' },
      'SQLite': { host: '', database: './database.sqlite' },
      'SQL Server': { host: 'localhost', database: 'my_database' },
      'Oracle': { host: 'localhost', database: 'XE' },
      'MariaDB': { host: 'localhost', database: 'my_database' },
      'MongoDB': { host: 'localhost', database: 'my_database' },
      'Amazon Redshift': { host: 'cluster.region.redshift.amazonaws.com', database: 'dev' },
      'Snowflake': { host: 'account.snowflakecomputing.com', database: 'SNOWFLAKE_SAMPLE_DATA' },
      'Amazon DynamoDB': { host: '', database: '' },
      'Google BigQuery': { host: '', database: 'my-project-id' },
      'Cassandra': { host: 'localhost', database: 'my_keyspace' },
      'JDBC (Generic)': { host: '', database: '' },
      'IBM DB2': { host: 'localhost', database: 'SAMPLE' },
      'ClickHouse': { host: 'localhost', database: 'default' }
    };
    return placeholders[dbType] || { host: 'localhost', database: 'my_database' };
  };

  const showModal = (connection: Connection | null = null) => {
    setEditingConnection(connection);
    setShowForm(true);
    setSelectedConnection(null); // Clear selected connection when showing form
    
    if (connection) {
      form.setFieldsValue(connection);
    } else {
      form.resetFields();
      form.setFieldsValue({
        dbType: 'MySQL',
        port: 3306,
        timeout: 30,
        useSSL: false
      });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingConnection) {
        // Update existing connection
        const result = await databaseService.updateConfig(editingConnection.uid, {
          name: values.name,
          host: values.host,
          port: values.port,
          database: values.database,
          username: values.username,
          password: values.password,
          useSSL: values.useSSL,
          dbType: values.dbType
        });

        if (result.success) {
          message.success(`Database connection "${values.name}" updated successfully`);
          // Reload connections
          const updatedResult = await databaseService.getConfigs();
          if (updatedResult.success && updatedResult.configs) {
            const formattedConnections: Connection[] = updatedResult.configs
              .filter(config => config.uid)
              .map(config => ({
                id: config.uid!,
                uid: config.uid!,
                name: config.name,
                host: config.host,
                port: config.port,
                database: config.database,
                username: config.username,
                password: config.password,
                useSSL: config.useSSL,
                dbType: config.dbType || 'mysql',
                createdAt: config.createdAt || new Date().toISOString(),
                updatedAt: config.updatedAt,
                timeout: 30000
              }));
            setConnections(formattedConnections);
          }
        } else {
          message.error(result.error || 'Failed to update connection');
          return;
        }
      } else {
        // Create new connection
        await saveConnections(values);
      }
      
      setShowForm(false);
      setEditingConnection(null);
      form.resetFields();
    } catch (error) {
      console.error('Error saving connection:', error);
      message.error('Failed to save connection');
    }
  };

  const handleTest = async (connection: Connection) => {
    setTestingConnection(connection.id);
    
    try {
      console.log('Testing database connection:', connection);
      
      // Use the database service to test connection
      const result = await databaseService.testConnection(connection.uid);
      
      if (result.success) {
        setTestResults(prev => ({
          ...prev,
          [connection.id]: { success: true, message: result.message || 'Connection successful!' }
        }));
        message.success(`Connection test successful for "${connection.name}"`);
      } else {
        setTestResults(prev => ({
          ...prev,
          [connection.id]: { success: false, message: result.error || 'Connection failed' }
        }));
        message.error(`Connection test failed for "${connection.name}": ${result.error}`);
      }
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [connection.id]: { success: false, message: `Error: ${error}` }
      }));
      message.error(`Connection test failed: ${error}`);
    } finally {
      setTestingConnection(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const connection = connections.find(conn => conn.id === id);
      if (!connection) {
        message.error('Connection not found');
        return;
      }

      const result = await databaseService.deleteConfig(connection.uid);
      if (result.success) {
        message.success(`Database connection "${connection.name}" deleted successfully`);
        
        // Reload connections
        const updatedResult = await databaseService.getConfigs();
        if (updatedResult.success && updatedResult.configs) {
          const formattedConnections: Connection[] = updatedResult.configs
            .filter(config => config.uid)
            .map(config => ({
              id: config.uid!,
              uid: config.uid!,
              name: config.name,
              host: config.host,
              port: config.port,
              database: config.database,
              username: config.username,
              password: config.password,
              useSSL: config.useSSL,
              dbType: config.dbType || 'mysql',
              createdAt: config.createdAt || new Date().toISOString(),
              updatedAt: config.updatedAt,
              timeout: 30000
            }));
          setConnections(formattedConnections);
        }

        // Remove test result
        setTestResults(prev => {
          const newResults = { ...prev };
          delete newResults[id];
          return newResults;
        });

        // Clear selection if the deleted connection was selected
        if (selectedConnection?.id === id) {
          setSelectedConnection(null);
        }
      } else {
        message.error(result.error || 'Failed to delete connection');
      }
    } catch (error) {
      console.error('Error deleting connection:', error);
      message.error('Failed to delete connection');
    }
  };

  const getDbTypeColor = (dbType: string) => {
    const colors: {[key: string]: string} = {
      'MySQL': 'blue',
      'PostgreSQL': 'blue',
      'SQLite': 'green',
      'SQL Server': 'orange',
      'Oracle': 'red',
      'MariaDB': 'cyan',
      'MongoDB': 'magenta',
      'Amazon Redshift': 'orange',
      'Snowflake': 'cyan',
      'Amazon DynamoDB': 'orange',
      'Google BigQuery': 'blue',
      'Cassandra': 'purple',
      'JDBC (Generic)': 'default',
      'IBM DB2': 'blue',
      'ClickHouse': 'yellow'
    };
    return colors[dbType] || 'default';
  };

  const getTestStatusIcon = (connectionId: string) => {
    const result = testResults[connectionId];
    if (!result) return null;
    
    return result.success ? (
      <Tooltip title={result.message}>
        <CheckCircleOutlined style={{ color: '#52c41a' }} />
      </Tooltip>
    ) : (
      <Tooltip title={result.message}>
        <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
      </Tooltip>
    );
  };

  const menuItems: MenuProps['items'] = connections.map(connection => ({
    key: connection.id,
    label: (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Space>
          <DatabaseOutlined />
          <span>{connection.name}</span>
          <Tag color={getDbTypeColor(connection.dbType)}>{connection.dbType}</Tag>
        </Space>
        {getTestStatusIcon(connection.id)}
      </div>
    ),
    onClick: () => {
      setSelectedConnection(connection);
      setShowForm(false); // Hide form when selecting a connection
    }
  }));

  return (
    <Drawer
      height="90vh"
      title={
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          <DatabaseOutlined style={{ 
            fontSize: '24px', 
            color: '#1890ff',
            background: 'linear-gradient(135deg, #1890ff, #722ed1)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }} />
          Database Connections
          <Tag 
            color="blue" 
            style={{ 
              marginLeft: '8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '500'
            }}
          >
            {connections.length} {connections.length === 1 ? 'connection' : 'connections'}
          </Tag>
        </div>
      }
      closable={false}
      open={visible}
      placement="bottom"
      extra={
        <Button
          type="text"
          icon={<CloseOutlined style={{ fontSize: "16px" }} />}
          onClick={onClose}
          style={{ 
            marginRight: 8,
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        />
      }
      className="database-drawer"
      styles={{
        body: {
          padding: 0,
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
        }
      }}
    >
      <Layout
        style={{
          background: 'transparent',
          borderRadius: '12px',
          height: '100%',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <Sider 
          style={{ 
            background: '#ffffff',
            borderRight: '1px solid #e8e8e8',
            borderRadius: '12px 0 0 12px',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)'
          }} 
          width="25%"
        >
          <div
            style={{
              width: "100%",
              padding: "16px",
              color: "#1f2937",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px 0 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            <span style={{ 
              fontWeight: '700', 
              color: '#ffffff',
              fontSize: '14px',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
            }}>
              Connections ({connections.length})
            </span>
            <Button
              style={{ 
                backgroundColor: "#ffffff",
                border: 'none',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease'
              }}
              type="primary"
              shape="circle"
              size="small"
              icon={<PlusOutlined style={{ color: '#667eea' }} />}
              onClick={() => showModal()}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
              }}
            />
          </div>
          
          {connections.length > 0 ? (
            <Menu
              mode="inline"
              selectedKeys={selectedConnection && !showForm ? [selectedConnection.id] : []}
              items={menuItems}
              style={{ 
                border: 'none',
                background: '#ffffff',
                height: "calc(100% - 72px)",
                padding: '8px 0'
              }}
              className="database-menu"
            />
          ) : (
            <div style={{ 
              padding: '60px 20px', 
              textAlign: 'center', 
              color: '#9ca3af',
              height: "calc(100% - 72px)",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              background: '#ffffff'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}>
                <DatabaseOutlined style={{ 
                  fontSize: '36px', 
                  color: '#1976d2'
                }} />
              </div>
              <div style={{ 
                fontSize: '16px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '8px'
              }}>
                No connections yet
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: '#9ca3af',
                marginBottom: '24px'
              }}>
                Click the + button to create your first database connection
              </div>
              <Button 
                type="primary" 
                ghost 
                icon={<PlusOutlined />}
                onClick={() => showModal()}
                style={{
                  borderRadius: '8px',
                  fontWeight: '500',
                  height: '40px',
                  alignSelf: 'center',
                  minWidth: '160px'
                }}
              >
                Create Connection
              </Button>
            </div>
          )}
        </Sider>

        <Content style={{ 
          background: '#ffffff', 
          height: '100%',
          display: 'flex',
          borderRadius: '0 12px 12px 0'
        }}>
          {showForm ? (
            <>
              {/* Form Section - Enhanced */}
              <div style={{ 
                width: '45%', 
                borderRight: '1px solid #e8e8e8',
                padding: '20px',
                background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
                overflowY: 'auto'
              }}>
                <Card 
                  title={
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {editingConnection ? (
                        <><EditOutlined style={{ color: '#1890ff' }} /> Edit Connection</>
                      ) : (
                        <><PlusOutlined style={{ color: '#52c41a' }} /> New Connection</>
                      )}
                    </div>
                  }
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e8e8e8'
                  }}
                  bodyStyle={{ padding: '20px' }}
                >
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                    style={{ marginTop: '8px' }}
                  >
                    <Form.Item
                      name="name"
                      label={<span style={{ fontWeight: '500', color: '#374151' }}>Connection Name</span>}
                      rules={[{ required: true, message: 'Please enter connection name' }]}
                    >
                      <Input 
                        placeholder="e.g., Production DB, Dev Database" 
                        style={{
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '14px',
                          border: '1.5px solid #e1e5e9',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#1890ff';
                          e.target.style.boxShadow = '0 0 0 3px rgba(24, 144, 255, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e1e5e9';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="dbType"
                      label={<span style={{ fontWeight: '500', color: '#374151' }}>Database Type</span>}
                      rules={[{ required: true, message: 'Please select database type' }]}
                    >
                      <Select 
                        onChange={handleDbTypeChange}
                        style={{
                          borderRadius: '8px'
                        }}
                        dropdownStyle={{
                          borderRadius: '8px',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {dbTypes.map(type => (
                          <Option key={type} value={type}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <DatabaseOutlined style={{ color: getDbTypeColor(type) === 'blue' ? '#1890ff' : '#52c41a' }} />
                              {type}
                            </div>
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {(() => {
                      const selectedDbType = form.getFieldValue('dbType');
                      const requiredFields = getRequiredFields(selectedDbType);
                      const placeholders = getPlaceholders(selectedDbType);

                      return (
                        <>
                          {selectedDbType === 'JDBC (Generic)' ? (
                            <Form.Item
                              name="host"
                              label="JDBC Connection String"
                              rules={[{ required: true, message: 'Please enter JDBC connection string' }]}
                            >
                              <Input placeholder="jdbc:driver://host:port/database?options" />
                            </Form.Item>
                          ) : (
                            requiredFields.needsHost && (
                              <div style={{ display: 'grid', gridTemplateColumns: requiredFields.needsPort ? '1fr 120px' : '1fr', gap: '16px' }}>
                                <Form.Item
                                  name="host"
                                  label="Host"
                                  rules={[{ required: true, message: 'Please enter host' }]}
                                >
                                  <Input placeholder={placeholders.host} />
                                </Form.Item>

                                {requiredFields.needsPort && (
                                  <Form.Item
                                    name="port"
                                    label="Port"
                                    rules={[{ required: true, message: 'Please enter port' }]}
                                  >
                                    <InputNumber min={1} max={65535} placeholder={defaultPorts[selectedDbType]?.toString() || "0"} style={{ width: '100%' }} />
                                  </Form.Item>
                                )}
                              </div>
                            )
                          )}

                          {requiredFields.needsDatabase && (
                            <Form.Item
                              name="database"
                              label={selectedDbType === 'MongoDB' ? 'Database Name' : selectedDbType === 'Cassandra' ? 'Keyspace' : selectedDbType === 'Google BigQuery' ? 'Project ID' : 'Database Name'}
                              rules={[{ required: true, message: `Please enter ${selectedDbType === 'Cassandra' ? 'keyspace' : 'database'} name` }]}
                            >
                              <Input placeholder={placeholders.database} />
                            </Form.Item>
                          )}

                          {requiredFields.needsAuth && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                              <Form.Item
                                name="username"
                                label={['Amazon DynamoDB', 'Snowflake', 'Google BigQuery'].includes(selectedDbType) ? 'Access Key / Username' : 'Username'}
                                rules={[{ required: true, message: 'Please enter username or access key' }]}
                              >
                                <Input placeholder={selectedDbType === 'Amazon DynamoDB' ? 'AWS Access Key' : selectedDbType === 'Google BigQuery' ? 'Service Account Email' : 'root'} />
                              </Form.Item>

                              <Form.Item
                                name="password"
                                label={['Amazon DynamoDB', 'Google BigQuery'].includes(selectedDbType) ? 'Secret Key / Token' : 'Password'}
                              >
                                <Input.Password placeholder={selectedDbType === 'Amazon DynamoDB' ? 'AWS Secret Key' : selectedDbType === 'Google BigQuery' ? 'Service Account Key' : 'password'} />
                              </Form.Item>
                            </div>
                          )}
                        </>
                      );
                    })()}

                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '16px', alignItems: 'end' }}>
                      <Form.Item
                        name="timeout"
                        label="Timeout (seconds)"
                      >
                        <InputNumber min={5} max={300} placeholder="30" style={{ width: '100%' }} />
                      </Form.Item>

                      <Form.Item
                        name="useSSL"
                        valuePropName="checked"
                      >
                        <Checkbox>Use SSL Connection</Checkbox>
                      </Form.Item>
                    </div>
                    <div style={{ marginTop: '32px' }}>
                        <Form.Item style={{ marginBottom: 0 }}>
                        <Space size="middle">
                            <Button 
                              type="primary" 
                              htmlType="submit"
                              style={{
                                borderRadius: '8px',
                                height: '40px',
                                fontWeight: '500',
                                minWidth: '120px',
                                background: editingConnection ? '#1890ff' : '#52c41a',
                                borderColor: editingConnection ? '#1890ff' : '#52c41a'
                              }}
                            >
                              {editingConnection ? (
                                <><EditOutlined /> Update</>
                              ) : (
                                <><PlusOutlined /> Create</>
                              )} Connection
                            </Button>
                            {editingConnection && (
                              <Button 
                                icon={<RestOutlined />}
                                loading={testingConnection === editingConnection.id}
                                onClick={() => handleTest(editingConnection)}
                                style={{
                                  borderRadius: '8px',
                                  height: '40px',
                                  fontWeight: '500',
                                  minWidth: '100px',
                                  background: 'linear-gradient(135deg, #722ed1, #1890ff)',
                                  color: '#ffffff',
                                  border: 'none',
                                  boxShadow: '0 2px 8px rgba(114, 46, 209, 0.3)'
                                }}
                              >
                                Test
                              </Button>
                            )}
                            <Button 
                              onClick={() => {
                                setShowForm(false);
                                setEditingConnection(null);
                                form.resetFields();
                              }}
                              style={{
                                borderRadius: '8px',
                                height: '40px',
                                fontWeight: '500',
                                minWidth: '80px'
                              }}
                            >
                              Cancel
                            </Button>
                        </Space>
                        </Form.Item>
                    </div>
                  </Form>
                </Card>
              </div>

              {/* Result Section - Enhanced */}
              <div style={{ 
                width: '55%', 
                padding: '20px',
                background: 'linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)'
              }}>
                <Card 
                  title={
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      <RestOutlined style={{ color: '#722ed1' }} />
                      Connection Test Result
                    </div>
                  }
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e8e8e8'
                  }}
                  bodyStyle={{ padding: '24px' }}
                >
                  {editingConnection && testResults[editingConnection.id] ? (
                    <Alert
                      message="Connection Test"
                      description={testResults[editingConnection.id].message}
                      type={testResults[editingConnection.id].success ? 'success' : 'error'}
                      showIcon
                      style={{
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: testResults[editingConnection.id].success 
                          ? '#f6ffed' 
                          : '#fff2f0'
                      }}
                    />
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '200px',
                      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      borderRadius: '12px',
                      border: '2px dashed #cbd5e1',
                      color: '#64748b'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px'
                      }}>
                        <DatabaseOutlined style={{ fontSize: '28px', color: '#6366f1' }} />
                      </div>
                      <Typography.Text style={{ 
                        color: '#64748b',
                        fontSize: '14px',
                        fontWeight: '500',
                        textAlign: 'center'
                      }}>
                        Save and test connection to see results
                      </Typography.Text>
                    </div>
                  )}
                </Card>
              </div>
            </>
          ) : selectedConnection ? (
            <div style={{ 
              width: '100%', 
              padding: '20px',
              background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)'
            }}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Space align="center">
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${getDbTypeColor(selectedConnection.dbType) === 'blue' ? '#1890ff, #722ed1' : '#52c41a, #1890ff'})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}>
                        <DatabaseOutlined style={{ color: '#ffffff', fontSize: '18px' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
                          {selectedConnection.name}
                        </div>
                        <Tag 
                          color={getDbTypeColor(selectedConnection.dbType)}
                          style={{
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '500',
                            marginTop: '4px'
                          }}
                        >
                          {selectedConnection.dbType}
                        </Tag>
                      </div>
                      {getTestStatusIcon(selectedConnection.id)}
                    </Space>
                    <Space size="small">
                      <Tooltip title="Test Connection">
                        <Button
                          type="primary"
                          icon={<RestOutlined />}
                          loading={testingConnection === selectedConnection.id}
                          onClick={() => handleTest(selectedConnection)}
                          style={{
                            borderRadius: '8px',
                            height: '36px',
                            fontWeight: '500',
                            background: 'linear-gradient(135deg, #722ed1, #1890ff)',
                            border: 'none',
                            boxShadow: '0 2px 8px rgba(114, 46, 209, 0.3)'
                          }}
                        >
                          Test
                        </Button>
                      </Tooltip>
                      <Tooltip title="Edit Connection">
                        <Button
                          icon={<EditOutlined />}
                          onClick={() => showModal(selectedConnection)}
                          style={{
                            borderRadius: '8px',
                            height: '36px',
                            fontWeight: '500',
                            border: '1.5px solid #e1e5e9'
                          }}
                        >
                          Edit
                        </Button>
                      </Tooltip>
                      <Popconfirm
                        title="Delete Connection"
                        description="Are you sure you want to delete this connection?"
                        onConfirm={() => {
                          handleDelete(selectedConnection.id);
                          setSelectedConnection(null);
                        }}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{
                          style: { borderRadius: '6px' }
                        }}
                        cancelButtonProps={{
                          style: { borderRadius: '6px' }
                        }}
                      >
                        <Tooltip title="Delete Connection">
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            style={{
                              borderRadius: '8px',
                              height: '36px',
                              fontWeight: '500'
                            }}
                          >
                            Delete
                          </Button>
                        </Tooltip>
                      </Popconfirm>
                    </Space>
                  </div>
                }
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e8e8e8'
                }}
                bodyStyle={{ padding: '24px' }}
              >
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '20px', 
                  marginBottom: '20px' 
                }}>
                  <div style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px' }}>HOST & PORT</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{selectedConnection.host}:{selectedConnection.port}</div>
                  </div>
                  <div style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)',
                    borderRadius: '10px',
                    border: '1px solid #dbeafe'
                  }}>
                    <div style={{ fontSize: '12px', color: '#0369a1', fontWeight: '500', marginBottom: '4px' }}>DATABASE</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{selectedConnection.database}</div>
                  </div>
                  <div style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                    borderRadius: '10px',
                    border: '1px solid #dcfce7'
                  }}>
                    <div style={{ fontSize: '12px', color: '#166534', fontWeight: '500', marginBottom: '4px' }}>USERNAME</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{selectedConnection.username}</div>
                  </div>
                  <div style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
                    borderRadius: '10px',
                    border: '1px solid #fef3c7'
                  }}>
                    <div style={{ fontSize: '12px', color: '#a16207', fontWeight: '500', marginBottom: '4px' }}>SSL</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                      {selectedConnection.useSSL ? (
                        <Tag color="success" style={{ borderRadius: '4px' }}>Enabled</Tag>
                      ) : (
                        <Tag color="default" style={{ borderRadius: '4px' }}>Disabled</Tag>
                      )}
                    </div>
                  </div>
                  <div style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 100%)',
                    borderRadius: '10px',
                    border: '1px solid #f3e8ff'
                  }}>
                    <div style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '500', marginBottom: '4px' }}>TIMEOUT</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{selectedConnection.timeout}s</div>
                  </div>
                  <div style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '4px' }}>CREATED</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                      {selectedConnection.createdAt ? new Date(selectedConnection.createdAt).toLocaleDateString() : 'Unknown'}
                    </div>
                  </div>
                </div>
                {testResults[selectedConnection.id] && (
                  <Alert
                    message="Connection Test Result"
                    description={testResults[selectedConnection.id].message}
                    type={testResults[selectedConnection.id].success ? 'success' : 'error'}
                    showIcon
                    style={{ 
                      marginTop: '20px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: testResults[selectedConnection.id].success 
                        ? '#f6ffed' 
                        : '#fff2f0',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                )}
              </Card>
            </div>
          ) : (
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center',
              padding: '40px',
              background: 'linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                position: 'relative'
              }}>
                <DatabaseOutlined style={{ 
                  fontSize: '48px', 
                  color: '#ffffff',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid #ffffff',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}>
                  <PlusOutlined style={{ fontSize: '14px', color: '#ffffff' }} />
                </div>
              </div>
              
              <Typography.Title 
                level={3} 
                style={{ 
                  color: '#1f2937',
                  marginBottom: '16px',
                  fontWeight: '700',
                  fontSize: '24px'
                }}
              >
                No Database Connections
              </Typography.Title>
              
              <Typography.Paragraph style={{ 
                color: '#6b7280', 
                marginBottom: '32px',
                fontSize: '16px',
                lineHeight: '1.6',
                maxWidth: '400px'
              }}>
                Create your first database connection to get started.<br/>
                Connect to MySQL, PostgreSQL, MongoDB and 12+ other databases.<br/>
                <strong>Connections are reusable across all your flows.</strong>
              </Typography.Paragraph>
              
              <Button 
                type="primary" 
                size="large"
                icon={<PlusOutlined />} 
                onClick={() => showModal()}
                style={{
                  borderRadius: '12px',
                  fontWeight: '600',
                  height: '48px',
                  fontSize: '16px',
                  padding: '0 32px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 126, 234, 0.4)';
                }}
              >
                Create First Connection
              </Button>
              
              <div style={{
                marginTop: '24px',
                fontSize: '13px',
                color: '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <DatabaseOutlined /> Supports 15+ database types
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Drawer>
  );
};

export default DatabaseDrawer;