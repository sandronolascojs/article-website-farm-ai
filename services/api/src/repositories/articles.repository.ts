import { and, asc, desc, eq, ilike, isNotNull, isNull, or, sql } from 'drizzle-orm';
import { articles, authors, categories } from '@auto-articles/db';
import { Logger, type Pagination } from '@auto-articles/utils';
import { DatabaseName } from '@auto-articles/types';
import { BaseRepository } from '@auto-articles/shared';
import type { ArticlesQuery } from '@/types/queryTypes/articlesQuery';

export class ArticlesRepository extends BaseRepository {
  constructor(logger: Logger) {
    super(logger, ArticlesRepository.name, DatabaseName.HEALTH_FOOD_BLOG);
  }

  async getArticleBySlug({ websiteId, slug }: { websiteId: string; slug: string }) {
    const [result] = await this.db
      .select({
        articleId: articles.articleId,
        slug: articles.slug,
        title: articles.title,
        summary: articles.summary,
        content: articles.content,
        keywords: articles.keywords,
        imageKey: articles.imageKey,
        publishedAt: articles.publishedAt,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        websiteId: articles.websiteId,
        category: sql<string>`${categories.name}`,
        categorySlug: sql<string>`${categories.slug}`,
        authorId: articles.authorId,
        authorName: sql<string>`${authors.name}`,
      })
      .from(articles)
      .innerJoin(categories, eq(articles.categoryId, categories.categoryId))
      .innerJoin(authors, eq(articles.authorId, authors.authorId))
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
                ilike(articles.content, `%${search}%`),
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
        imageKey: articles.imageKey,
        publishedAt: articles.publishedAt,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        websiteId: articles.websiteId,
        category: sql<string>`${categories.name}`,
        categorySlug: sql<string>`${categories.slug}`,
        authorId: articles.authorId,
        authorName: sql<string>`${authors.name}`,
      })
      .from(articles)
      .innerJoin(categories, eq(articles.categoryId, categories.categoryId))
      .innerJoin(authors, eq(articles.authorId, authors.authorId))
      .where(
        and(
          eq(articles.websiteId, websiteId),
          isNull(articles.deletedAt),
          isNotNull(articles.publishedAt),
          search
            ? or(
                ilike(articles.title, `%${search}%`),
                ilike(articles.summary, `%${search}%`),
                ilike(articles.content, `%${search}%`),
                ilike(sql`array_to_string(${articles.keywords}, ' ')`, `%${search}%`),
              )
            : undefined,
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
        imageKey: articles.imageKey,
        publishedAt: articles.publishedAt,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        websiteId: articles.websiteId,
        category: sql<string>`${categories.name}`,
        categorySlug: sql<string>`${categories.slug}`,
        authorId: articles.authorId,
        authorName: sql<string>`${authors.name}`,
      })
      .from(articles)
      .innerJoin(categories, eq(articles.categoryId, categories.categoryId))
      .innerJoin(authors, eq(articles.authorId, authors.authorId))
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
