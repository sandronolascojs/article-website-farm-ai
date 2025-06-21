import { DatabaseService } from '@auto-articles/shared';
import { articles, DB } from '@auto-articles/db';
import { Logger } from '@auto-articles/utils';
import { DatabaseName } from '@auto-articles/types';

export class ArticlesRepository {
  private readonly db: DB;

  constructor(private readonly logger: Logger) {
    const dbService = DatabaseService.getInstance(logger);
    if (!dbService.getRegisteredServices().has(ArticlesRepository.name)) {
      dbService.registerService({
        serviceName: ArticlesRepository.name,
        databaseName: DatabaseName.HEALTH_FOOD_BLOG,
      });
    }

    this.db = dbService.getConnection(ArticlesRepository.name);
  }

  async createArticle(article: typeof articles.$inferInsert) {
    return await this.db.insert(articles).values(article).returning();
  }

  async getAllExistingArticleTitles({ websiteId }: { websiteId: string }) {
    return await this.db.query.articles.findMany({
      columns: {
        title: true,
      },
      where(fields, { eq, and, isNull }) {
        return and(eq(fields.websiteId, websiteId), isNull(fields.deletedAt));
      },
    });
  }
}
