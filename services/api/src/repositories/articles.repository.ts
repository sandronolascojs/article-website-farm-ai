import { articles, categories, DB } from '@auto-articles/db';
import { Logger, type Pagination } from '@auto-articles/utils';
import { DatabaseName } from '@auto-articles/types';
import { DatabaseService } from '@auto-articles/shared';
import { and, asc, desc, eq, ilike, isNotNull, isNull, or, sql } from 'drizzle-orm';
import type { ArticlesQuery } from '@/types/queryTypes/articlesQuery';

export class ArticlesRepository {
  private readonly db: DB;

  constructor(private readonly logger: Logger) {
    this.logger = logger;

    const dbService = DatabaseService.getInstance(logger);
    if (!dbService.getRegisteredServices().has(ArticlesRepository.name)) {
      dbService.registerService({
        serviceName: ArticlesRepository.name,
        databaseName: DatabaseName.HEALTH_FOOD_BLOG,
      });
    }

    this.db = dbService.getConnection(ArticlesRepository.name);
  }

  async getArticleBySlug({ websiteId, slug }: { websiteId: string; slug: string }) {
    const [result] = await this.db
      .select({
        articleSlug: articles.slug,
        title: articles.title,
        summary: articles.summary,
        content: articles.content,
        keywords: articles.keywords,
        category: sql<string>`${categories.name}`,
        categorySlug: sql<string>`${categories.slug}`,
        imageUrl: articles.imageUrl,
        publishedAt: articles.publishedAt,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
      })
      .from(articles)
      .innerJoin(categories, eq(articles.categoryId, categories.categoryId))
      .where(
        and(
          eq(articles.slug, slug),
          eq(articles.websiteId, websiteId),
          isNull(articles.deletedAt),
          isNotNull(articles.publishedAt),
        ),
      );

    if (!result) {
      return null;
    }

    return result;
  }

  async getArticlesByWebsiteId({ websiteId, query }: { websiteId: string; query: ArticlesQuery }) {
    const { page, limit, search, orderBy } = query;
    const offset = (page - 1) * limit;

    const countResult = await this.db
      .select({
        total: sql<number>`cast(count(${articles.articleId}) as int)`,
      })
      .from(articles)
      .where(
        and(
          eq(articles.websiteId, websiteId),
          isNull(articles.deletedAt),
          isNotNull(articles.publishedAt),
          search
            ? or(
                ilike(articles.title, `%${search}%`),
                ilike(articles.summary, `%${search}%`),
                ilike(sql`array_to_string(${articles.content}, ' ')`, `%${search}%`),
                ilike(sql`array_to_string(${articles.keywords}, ' ')`, `%${search}%`),
              )
            : undefined,
        ),
      );
    const total = countResult[0]?.total ?? 0;

    const items = await this.db
      .select({
        articleId: articles.articleId,
        slug: articles.slug,
        title: articles.title,
        summary: articles.summary,
        content: articles.content,
        keywords: articles.keywords,
        imageUrl: articles.imageUrl,
        publishedAt: articles.publishedAt,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        category: sql<string>`${categories.name}`,
        categorySlug: sql<string>`${categories.slug}`,
      })
      .from(articles)
      .innerJoin(categories, eq(articles.categoryId, categories.categoryId))
      .where(
        and(
          eq(articles.websiteId, websiteId),
          isNull(articles.deletedAt),
          isNotNull(articles.publishedAt),
        ),
      )
      .orderBy(orderBy === 'newest' ? desc(articles.publishedAt) : asc(articles.publishedAt))
      .limit(limit)
      .offset(offset);

    return { items, total };
  }

  async getArticlesByCategory({
    category,
    pagination,
  }: {
    category: string;
    pagination: Pagination;
  }) {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    const countResult = await this.db
      .select({
        total: sql<number>`cast(count(${articles.articleId}) as int)`,
      })
      .from(articles)
      .innerJoin(categories, eq(articles.categoryId, categories.categoryId))
      .where(
        and(
          eq(categories.slug, category),
          isNull(articles.deletedAt),
          isNotNull(articles.publishedAt),
        ),
      );
    const total = countResult[0]?.total ?? 0;

    const items = await this.db
      .select({
        articleId: articles.articleId,
        slug: articles.slug,
        title: articles.title,
        summary: articles.summary,
        content: articles.content,
        keywords: articles.keywords,
        imageUrl: articles.imageUrl,
        publishedAt: articles.publishedAt,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        category: sql<string>`${categories.name}`,
        categorySlug: sql<string>`${categories.slug}`,
      })
      .from(articles)
      .innerJoin(categories, eq(articles.categoryId, categories.categoryId))
      .where(
        and(
          eq(categories.slug, category),
          isNull(articles.deletedAt),
          isNotNull(articles.publishedAt),
        ),
      )
      .orderBy(desc(articles.createdAt))
      .limit(limit)
      .offset(offset);

    return { items, total };
  }
}
