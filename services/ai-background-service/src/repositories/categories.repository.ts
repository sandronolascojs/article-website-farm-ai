import { DatabaseService } from '@auto-articles/shared';

import { categories, DB } from '@auto-articles/db';
import { Logger } from '@auto-articles/utils';
import { DatabaseName } from '@auto-articles/types';

export class CategoriesRepository {
  private readonly db: DB;

  constructor(private readonly logger: Logger) {
    this.logger = logger;

    const dbService = DatabaseService.getInstance(logger);
    if (!dbService.getRegisteredServices().has(CategoriesRepository.name)) {
      dbService.registerService({
        serviceName: CategoriesRepository.name,
        databaseName: DatabaseName.HEALTH_FOOD_BLOG,
      });
    }

    this.db = dbService.getConnection(CategoriesRepository.name);
  }

  async getCategoriesByWebsiteId({ websiteId }: { websiteId: string }) {
    return await this.db.query.categories.findMany({
      where(fields, { eq }) {
        return eq(fields.websiteId, websiteId);
      },
    });
  }

  async createCategory(category: typeof categories.$inferInsert) {
    return await this.db.insert(categories).values(category).returning();
  }

  async getCategoryByNameAndWebsiteId({ name, websiteId }: { name: string; websiteId: string }) {
    return await this.db.query.categories.findFirst({
      where(fields, { eq, and }) {
        return and(eq(fields.name, name), eq(fields.websiteId, websiteId));
      },
    });
  }
}
