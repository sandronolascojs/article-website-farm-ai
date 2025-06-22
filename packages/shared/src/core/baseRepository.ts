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
    return this.db.transaction(fn);
  }
}
