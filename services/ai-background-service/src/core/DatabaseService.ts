import { logger } from '@/utils/logger.instance';
import { dbManager } from '@auto-articles/db';
import { 
  DatabaseName, 
  DatabaseServiceRegistration, 
  DatabaseConnectionStatus,
  DatabaseConnectionError 
} from '@auto-articles/types';
import type { Logger } from '@auto-articles/utils';

export class DatabaseService {
  private static instance: DatabaseService;
  private serviceConnections: Map<string, DatabaseName>;
  private connectionStatus: Map<DatabaseName, DatabaseConnectionStatus>;
  private connectionErrors: DatabaseConnectionError[];
  private logger: Logger;

  private constructor() {
    this.serviceConnections = new Map();
    this.connectionStatus = new Map();
    this.connectionErrors = [];
    this.logger = logger
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Register a service with its preferred database
   */
  public registerService(registration: DatabaseServiceRegistration): void {
    this.serviceConnections.set(registration.serviceName, registration.databaseName);
    this.logger.info(`Service "${registration.serviceName}" registered with database "${registration.databaseName}"`);
  }

  /**
   * Get database connection for a specific service
   */
  public getConnection(serviceName: string) {
    const databaseName = this.serviceConnections.get(serviceName);
    
    if (!databaseName) {
      throw new Error(`Service "${serviceName}" is not registered with any database`);
    }

    try {
      this.updateConnectionStatus(databaseName, DatabaseConnectionStatus.CONNECTING);
      const connection = dbManager.getConnection(databaseName);
      this.updateConnectionStatus(databaseName, DatabaseConnectionStatus.CONNECTED);
      return connection;
    } catch (error) {
      this.handleConnectionError(databaseName, error as Error);
      throw new Error(`Failed to get database connection for service "${serviceName}": ${(error as Error).message}`);
    }
  }

  /**
   * Get all registered services and their databases
   */
  public getRegisteredServices(): Map<string, DatabaseName> {
    return new Map(this.serviceConnections);
  }

  /**
   * Get connection status for a specific database
   */
  public getConnectionStatus(databaseName: DatabaseName): DatabaseConnectionStatus {
    return this.connectionStatus.get(databaseName) || DatabaseConnectionStatus.DISCONNECTED;
  }

  /**
   * Get all connection errors
   */
  public getConnectionErrors(): DatabaseConnectionError[] {
    return [...this.connectionErrors];
  }

  private updateConnectionStatus(databaseName: DatabaseName, status: DatabaseConnectionStatus): void {
    this.connectionStatus.set(databaseName, status);
  }

  private handleConnectionError(databaseName: DatabaseName, error: Error): void {
    this.updateConnectionStatus(databaseName, DatabaseConnectionStatus.ERROR);
    this.connectionErrors.push({
      databaseName,
      error,
      timestamp: new Date(),
    });
  }
} 