import { initServer } from '@ts-rest/fastify';
import { contract } from '@auto-articles/ts-rest';
import { ArticlesService } from '@/services/articles.service';
import { logger } from '@/utils/logger.instance';
import { env } from '@/config/env.config';

const server = initServer();

export const articlesRouter = server.router(contract.articlesContract, {
  getArticle: async ({ params }) => {
    const { websiteId, articleSlug } = params;

    const articlesService = new ArticlesService(logger);
    const article = await articlesService.getArticleBySlug({ websiteId, slug: articleSlug });
    return {
      status: 200,
      body: {
        articleSlug: article.articleSlug,
        title: article.title,
        summary: article.summary,
        htmlContent: article.content,
        keywords: article.keywords,
        category: {
          name: article.category,
          slug: article.categorySlug,
        },
        imageUrl: article.imageUrl
          ? `${env.SUPABASE_BUCKET_IMAGES_URL}/${article.imageUrl}`
          : undefined,
        websiteId,
        author: 'James Adams',
        authorAvatar: 'https://github.com/sandronolascojs.png',
        publishedAt: article.publishedAt?.toISOString() ?? new Date().toISOString(),
      },
    };
  },
  getArticlesByWebsiteId: async ({ params, query }) => {
    const { websiteId } = params;
    const { page, limit } = query;

    const articlesService = new ArticlesService(logger);
    const articles = await articlesService.getArticlesByWebsiteId({
      websiteId,
      pagination: { page, limit },
    });

    return {
      status: 200,
      body: {
        items: articles.items.map((article) => ({
          articleSlug: article.slug,
          title: article.title,
          summary: article.summary,
          keywords: article.keywords,
          websiteId,
          category: {
            name: article.category,
            slug: article.categorySlug,
          },
          imageUrl: article.imageUrl
            ? `${env.SUPABASE_BUCKET_IMAGES_URL}/${article.imageUrl}`
            : undefined,
          htmlContent: article.content,
          author: 'James Adams',
          authorAvatar: 'https://github.com/sandronolascojs.png',
          publishedAt: article.publishedAt?.toISOString() ?? new Date().toISOString(),
        })),
        meta: {
          totalItems: articles.total,
          totalPages: Math.ceil(articles.total / limit),
          currentPage: page,
          itemsPerPage: limit,
        },
      },
    };
  },
  getArticlesFromCategory: async ({ params, query }) => {
    const { websiteId, categorySlug } = params;
    const { page, limit } = query;

    const articlesService = new ArticlesService(logger);
    const articles = await articlesService.getArticlesByCategory({
      category: categorySlug,
      pagination: { page, limit },
    });
    return {
      status: 200,
      body: {
        items: articles.items.map((article) => ({
          articleSlug: article.slug,
          title: article.title,
          summary: article.summary,
          keywords: article.keywords,
          websiteId,
          category: {
            name: article.category,
            slug: article.categorySlug,
          },
          imageUrl: article.imageUrl
            ? `${env.SUPABASE_BUCKET_IMAGES_URL}/${article.imageUrl}`
            : undefined,
          htmlContent: article.content,
          author: 'James Adams',
          authorAvatar: 'https://github.com/sandronolascojs.png',
          publishedAt: article.publishedAt?.toISOString() ?? new Date().toISOString(),
        })),
        meta: {
          totalItems: articles.total,
          totalPages: Math.ceil(articles.total / limit),
          currentPage: page,
          itemsPerPage: limit,
        },
      },
    };
  },
});
