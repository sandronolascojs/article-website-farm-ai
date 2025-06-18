/**
 * Enum for database names used across the application
 */
export enum DatabaseName {
  HEALTH_FOOD_BLOG = 'health-food-blog',
  KETO_DIET = 'health-food-blog-content-analyzer',
}

/**
 * Type for database configuration
 */
export interface DatabaseConfig {
  name: DatabaseName;
  connectionString: string;
  poolConfig?: {
    max?: number;
    min?: number;
    idleTimeoutMillis?: number;
    connectionTimeoutMillis?: number;
  };
}

/**
 * Type for database service registration
 */
export interface DatabaseServiceRegistration {
  serviceName: string;
  databaseName: DatabaseName;
}

/**
 * Type for database connection status
 */
export enum DatabaseConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  ERROR = 'error',
}

/**
 * Type for database connection error
 */
export interface DatabaseConnectionError {
  databaseName: DatabaseName;
  error: Error;
  timestamp: Date;
}
