import { and, count, desc, eq, isNotNull, isNull, sql } from 'drizzle-orm';
import { articles, categories } from '@auto-articles/db';
import { BaseRepository } from '@auto-articles/shared';
import { DatabaseName } from '@auto-articles/types';
import { Logger, type Pagination } from '@auto-articles/utils';

export class CategoriesRepository extends BaseRepository {
  constructor(logger: Logger) {
    super(logger, CategoriesRepository.name, DatabaseName.HEALTH_FOOD_BLOG);
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
        imageKey: sql<string | null>`(
          SELECT a.image_key FROM articles as a
          WHERE a.category_id = ${categories.categoryId}
            AND a.deleted_at IS NULL
            AND a.published_at IS NOT NULL
          ORDER BY a.published_at ASC
          LIMIT 1
        )`,
      })
      .from(categories)
      .innerJoin(
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
      .having(sql`count(${articles.articleId}) > 0`)
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
        total: sql<number>`count(distinct ${categories.categoryId})`,
      })
      .from(categories)
      .innerJoin(
        articles,
        and(
          eq(articles.categoryId, categories.categoryId),
          isNull(articles.deletedAt),
          isNotNull(articles.publishedAt),
        ),
      )
      .where(and(eq(categories.websiteId, websiteId), isNull(categories.deletedAt)));

    const total = countResult[0]?.total ?? 0;

    const result = await this.db
      .select({
        categoryId: categories.categoryId,
        name: categories.name,
        slug: categories.slug,
        articlesCount: count(articles.articleId).as('articlesCount'),
        imageKey: sql<string | null>`(
          SELECT a.image_key FROM articles as a
          WHERE a.category_id = ${categories.categoryId}
            AND a.deleted_at IS NULL
            AND a.published_at IS NOT NULL
          ORDER BY a.published_at ASC
          LIMIT 1
        )`,
      })
      .from(categories)
      .innerJoin(
        articles,
        and(
          eq(articles.categoryId, categories.categoryId),
          isNull(articles.deletedAt),
          isNotNull(articles.publishedAt),
        ),
      )
      .where(and(eq(categories.websiteId, websiteId), isNull(categories.deletedAt)))
      .groupBy(categories.categoryId)
      .having(sql`count(${articles.articleId}) > 0`)
      .orderBy(desc(categories.name))
      .limit(limit)
      .offset(offset);

    return { items: result, total };
  }
}
