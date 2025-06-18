import { DatabaseService } from '@/core/DatabaseService';
import type { HealthFoodArticleGeneratorAgent } from '@auto-articles/ai/src/mastra';
import type { DB } from '@auto-articles/db';
import { articles } from '@auto-articles/db/src/schema/article';
import { categories } from '@auto-articles/db/src/schema/categories';
import { DatabaseName, HealthFoodAppCategory, Language } from '@auto-articles/types';
import type { Logger } from '@auto-articles/utils';

export class GenerateHealthContentService {
  private readonly logger: Logger;
  private readonly agent: HealthFoodArticleGeneratorAgent;
  private readonly db: DB;

  constructor(logger: Logger, agent: HealthFoodArticleGeneratorAgent) {
    this.logger = logger;
    this.agent = agent;

    let connection = DatabaseService.getInstance().getConnection(GenerateHealthContentService.name);
    if (!connection) {
      DatabaseService.getInstance().registerService({
        serviceName: GenerateHealthContentService.name,
        databaseName: DatabaseName.HEALTH_FOOD_BLOG,
      });
      connection = DatabaseService.getInstance().getConnection(GenerateHealthContentService.name);
    }
    this.db = connection;
  }

  async generateHealthArticle(count: number = 1) {
    for (let i = 0; i < count; i++) {
      const existingTitles = await this.db.query.articles
        .findMany({
          columns: {
            title: true,
          },
          where: (fields, { isNull }) => isNull(fields.deletedAt),
        })
        .then((articles) => articles.map((article) => article.title));

      const result = await this.agent.generateArticle({
        existingTitles,
        categories: Object.values(HealthFoodAppCategory),
        language: Language.ENGLISH_US,
      });

      this.logger.info(`Generated title: ${result.title}`);

      let category = await this.db.query.categories.findFirst({
        where: (fields, { eq }) => eq(fields.name, result.category),
      });

      if (!category) {
        const [insertedCategory] = await this.db
          .insert(categories)
          .values({
            name: result.category,
          })
          .returning();
        category = insertedCategory;
        this.logger.info(
          `Category not found, inserting: ${result.category} with id: ${insertedCategory?.categoryId}`,
        );
      }

      await this.db.insert(articles).values({
        title: result.title,
        content: result.content,
        keywords: result.keywords,
        summary: result.summary,
        imageUrl: result.imageUrl,
        slug: result.slug,
        processedAt: new Date(),
        categoryId: category?.categoryId,
      });

      this.logger.info(`Inserted article: ${result.title}`);
    }
  }
}
