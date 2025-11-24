// Database API service for managing database connections
export interface DatabaseConfig {
  uid?: string;
  name: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  useSSL: boolean;
  dbType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DatabaseConfigResponse {
  success: boolean;
  configs?: DatabaseConfig[];
  config?: DatabaseConfig;
  uid?: string;
  id?: number;
  error?: string;
  message?: string;
}

class DatabaseService {
  private baseUrl = 'http://localhost:3200/api/database';

  // Save a new database configuration
  async saveConfig(config: Omit<DatabaseConfig, 'uid'>): Promise<DatabaseConfigResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config)
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to save database configuration:', error);
      return {
        success: false,
        error: 'Failed to save database configuration'
      };
    }
  }

  // Get all database configurations
  async getConfigs(): Promise<DatabaseConfigResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/config`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to fetch database configurations:', error);
      return {
        success: false,
        error: 'Failed to fetch database configurations'
      };
    }
  }

  // Get a specific database configuration by UID
  async getConfigByUid(uid: string): Promise<DatabaseConfigResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/config/${uid}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to fetch database configuration:', error);
      return {
        success: false,
        error: 'Failed to fetch database configuration'
      };
    }
  }

  // Update a database configuration
  async updateConfig(uid: string, config: Omit<DatabaseConfig, 'uid'>): Promise<DatabaseConfigResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/config/${uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config)
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to update database configuration:', error);
      return {
        success: false,
        error: 'Failed to update database configuration'
      };
    }
  }

  // Delete a database configuration
  async deleteConfig(uid: string): Promise<DatabaseConfigResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/config/${uid}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to delete database configuration:', error);
      return {
        success: false,
        error: 'Failed to delete database configuration'
      };
    }
  }

  // Execute query using UID (existing functionality updated)
  async executeQuery(uid: string, query: string, queryType: string, queryParams?: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/execute-query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          query,
          queryType,
          queryParams
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to execute query:', error);
      return {
        success: false,
        error: 'Failed to execute query'
      };
    }
  }

  // Test connection using UID
  async testConnection(uid: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/test-connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to test connection:', error);
      return {
        success: false,
        error: 'Failed to test connection'
      };
    }
  }
}

// Create and export a singleton instance
export const databaseService = new DatabaseService();
export default databaseService;