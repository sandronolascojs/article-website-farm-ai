import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { env } from './src/config/env.config';
import { Pool, PoolConfig } from 'pg';
import { schema } from './src/schema';
import { DatabaseName } from '@auto-articles/types';

interface DatabaseConfig {
  connectionString: string;
  name: string;
  poolConfig?: Partial<PoolConfig>;
}

class DatabaseManager {
  private static instance: DatabaseManager;
  private connections: Map<string, NodePgDatabase<typeof schema>>;
  private pools: Map<string, Pool>;

  private constructor() {
    this.connections = new Map();
    this.pools = new Map();
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public async initialize(configs: DatabaseConfig[]): Promise<void> {
    for (const config of configs) {
      const pool = new Pool({
        connectionString: config.connectionString,
        ...config.poolConfig,
      });

      // Test the connection
      try {
        await pool.query('SELECT 1');
        console.log(`✅ Connected to database: ${config.name}`);
      } catch (error) {
        console.error(`❌ Failed to connect to database: ${config.name}`, error);
        throw error;
      }

      const db = drizzle(pool, { schema });
      this.connections.set(config.name, db as NodePgDatabase<typeof schema>);
      this.pools.set(config.name, pool);
    }
  }

  public getConnection(name: string): NodePgDatabase<typeof schema> {
    const connection = this.connections.get(name);
    if (!connection) {
      throw new Error(`Database connection "${name}" not found`);
    }
    return connection;
  }

  public async closeAll(): Promise<void> {
    for (const [name, pool] of this.pools.entries()) {
      try {
        await pool.end();
        console.log(`Closed connection to database: ${name}`);
      } catch (error) {
        console.error(`Error closing connection to database: ${name}`, error);
      }
    }
    this.connections.clear();
    this.pools.clear();
  }
}

// Initialize database connections
const dbManager = DatabaseManager.getInstance();

export const defaultConfigs: DatabaseConfig[] = [
  {
    name: DatabaseName.HEALTH_FOOD_BLOG,
    connectionString: env.HEALTH_FOOD_BLOG_DATABASE_URL,
    poolConfig: {
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },
  },
  // Add more database configurations here as needed
  // Example:
  // {
  //   name: 'secondary',
  //   connectionString: env.SECONDARY_DATABASE_URL,
  //   poolConfig: {
  //     max: 10,
  //     idleTimeoutMillis: 30000,
  //   },
  // },
];
export { dbManager };
export type DB = NodePgDatabase<typeof schema>;

export * from './src/schema';
