import { articles, categories, DB } from '@auto-articles/db';
import { DatabaseService } from '@auto-articles/shared';
import { DatabaseName } from '@auto-articles/types';
import { Logger, type Pagination } from '@auto-articles/utils';
import { and, count, desc, eq, isNotNull, isNull, sql } from 'drizzle-orm';

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

  async getCategoryBySlug({ slug, websiteId }: { slug: string; websiteId: string }) {
    const [result] = await this.db
      .select({
        categoryId: categories.categoryId,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        websiteId: categories.websiteId,
        deletedAt: categories.deletedAt,
        createdAt: categories.createdAt,
        updatedAt: categories.updatedAt,
        articlesCount: count(articles.articleId).as('articlesCount'),
      })
      .from(categories)
      .leftJoin(
        articles,
        and(
          eq(articles.categoryId, categories.categoryId),
          isNull(articles.deletedAt),
          isNotNull(articles.publishedAt),
        ),
      )
      .where(and(eq(categories.slug, slug), eq(categories.websiteId, websiteId)))
      .groupBy(
        categories.categoryId,
        categories.name,
        categories.slug,
        categories.description,
        categories.websiteId,
        categories.deletedAt,
        categories.createdAt,
        categories.updatedAt,
      )
      .limit(1);

    return result;
  }

  async getCategoriesByWebsiteId({
    websiteId,
    pagination,
  }: {
    websiteId: string;
    pagination: Pagination;
  }) {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    const countResult = await this.db
      .select({
        total: sql<number>`count(${categories.categoryId})`,
      })
      .from(categories)
      .where(eq(categories.websiteId, websiteId));

    const total = countResult[0]?.total ?? 0;

    const result = await this.db
      .select({
        categoryId: categories.categoryId,
        name: categories.name,
        slug: categories.slug,
        articlesCount: count(articles.articleId).as('articlesCount'),
      })
      .from(categories)
      .leftJoin(
        articles,
        and(
          eq(articles.categoryId, categories.categoryId),
          isNull(articles.deletedAt),
          isNotNull(articles.publishedAt),
        ),
      )
      .where(and(eq(categories.websiteId, websiteId), isNull(categories.deletedAt)))
      .groupBy(categories.categoryId)
      .orderBy(desc(categories.name))
      .limit(limit)
      .offset(offset);

    return { items: result, total };
  }
}
