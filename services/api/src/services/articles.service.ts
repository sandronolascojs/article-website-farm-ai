import { Logger, type Pagination } from '@auto-articles/utils';
import { ArticlesRepository } from '../repositories/articles.repository';
import { WebsitesService } from './websites.service';
import { contract } from '@auto-articles/ts-rest';
import { NotFoundError } from '@/utils/errors/NotFoundError';
import type { ArticlesQuery } from '@/types/queryTypes/articlesQuery';
import { env } from '@/config/env.config';

export class ArticlesService {
  private readonly articlesRepository: ArticlesRepository;
  private readonly websitesService: WebsitesService;

  constructor(private readonly logger: Logger) {
    this.articlesRepository = new ArticlesRepository(logger);
    this.websitesService = new WebsitesService(logger);
  }

  async getArticleBySlug({ websiteId, slug }: { websiteId: string; slug: string }) {
    const website = await this.websitesService.getWebsiteByWebsiteId({
      websiteId,
    });
    if (!website) {
      throw new NotFoundError({
        message: 'Website not found',
        path: contract.articlesContract.getArticle.path,
      });
    }

    const article = await this.articlesRepository.getArticleBySlug({
      websiteId,
      slug,
    });
    if (!article) {
      throw new NotFoundError({
        message: 'Article not found',
        path: contract.articlesContract.getArticle.path,
      });
    }

    return {
      articleSlug: article.slug,
      title: article.title,
      summary: article.summary,
      content: article.content,
      keywords: article.keywords,
      category: {
        name: article.category,
        slug: article.categorySlug,
      },
      imageUrl: article.imageKey
        ? `${env.SUPABASE_BUCKET_IMAGES_URL}/${article.imageKey}`
        : undefined,
      websiteId: article.websiteId,
      author: article.authorName,
      publishedAt: article.publishedAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  async getArticlesByWebsiteId({ websiteId, query }: { websiteId: string; query: ArticlesQuery }) {
    const website = await this.websitesService.getWebsiteByWebsiteId({
      websiteId,
    });
    if (!website) {
      throw new NotFoundError({
        message: 'Website not found',
        path: contract.articlesContract.getArticlesByWebsiteId.path,
      });
    }

    const articles = await this.articlesRepository.getArticlesByWebsiteId({
      websiteId,
      query,
    });

    return {
      items: articles.items.map((article) => ({
        articleSlug: article.slug,
        title: article.title,
        summary: article.summary,
        content: article.content,
        keywords: article.keywords,
        category: {
          name: article.category,
          slug: article.categorySlug,
        },
        imageUrl: article.imageKey
          ? `${env.SUPABASE_BUCKET_IMAGES_URL}/${article.imageKey}`
          : undefined,
        websiteId: article.websiteId,
        author: article.authorName,
        publishedAt: article.publishedAt?.toISOString() ?? new Date().toISOString(),
      })),
      meta: {
        totalItems: articles.total,
        totalPages: Math.ceil(articles.total / query.limit),
        currentPage: query.page,
        itemsPerPage: query.limit,
      },
    };
  }

  async getArticlesByCategory({
    category,
    pagination,
  }: {
    category: string;
    pagination: Pagination;
  }) {
    const articles = await this.articlesRepository.getArticlesByCategory({
      category,
      pagination,
    });

    return {
      items: articles.items.map((article) => ({
        articleSlug: article.slug,
        title: article.title,
        summary: article.summary,
        content: article.content,
        keywords: article.keywords,
        category: {
          name: article.category,
          slug: article.categorySlug,
        },
        imageUrl: article.imageKey
          ? `${env.SUPABASE_BUCKET_IMAGES_URL}/${article.imageKey}`
          : undefined,
        websiteId: article.websiteId,
        author: article.authorName,
        publishedAt: article.publishedAt?.toISOString() ?? new Date().toISOString(),
        createdAt: article.createdAt?.toISOString() ?? new Date().toISOString(),
        updatedAt: article.updatedAt?.toISOString() ?? new Date().toISOString(),
      })),
      meta: {
        totalItems: articles.total,
        totalPages: Math.ceil(articles.total / pagination.limit),
        currentPage: pagination.page,
        itemsPerPage: pagination.limit,
      },
    };
  }
}
