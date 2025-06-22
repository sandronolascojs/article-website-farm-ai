import type { Logger } from '@auto-articles/utils';
import type { DatabaseName } from '@auto-articles/types';
import { DatabaseService } from '../services/DatabaseService';
import type { DB } from '@auto-articles/db';

export abstract class BaseRepository {
  protected readonly db: DB;

  constructor(
    protected readonly logger: Logger,
    serviceName: string,
    databaseName: DatabaseName,
  ) {
    const dbService = DatabaseService.getInstance(logger);
    if (!dbService.getRegisteredServices().has(serviceName)) {
      dbService.registerService({ serviceName, databaseName });
    }
    this.db = dbService.getConnection(serviceName);
  }

  async withTransaction<T>(fn: (trx: DB) => Promise<T>): Promise<T> {
    try {
      this.logger.debug('Starting database transaction');
      const result = await this.db.transaction(fn);
      this.logger.debug('Database transaction completed successfully');
      return result;
    } catch (error) {
      this.logger.error('Database transaction failed', { error });
      throw error;
    }
  }
}
