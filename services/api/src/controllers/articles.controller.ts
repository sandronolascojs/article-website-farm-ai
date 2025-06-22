import { initServer } from '@ts-rest/fastify';
import { contract } from '@auto-articles/ts-rest';
import { ArticlesService } from '@/services/articles.service';
import { logger } from '@/utils/logger.instance';

const server = initServer();

export const articlesRouter = server.router(contract.articlesContract, {
  getArticle: async ({ params }) => {
    const { websiteId, articleSlug } = params;

    const articlesService = new ArticlesService(logger);
    const article = await articlesService.getArticleBySlug({ websiteId, slug: articleSlug });
    return {
      status: 200,
      body: article,
    };
  },
  getArticlesByWebsiteId: async ({ params, query }) => {
    const { websiteId } = params;
    const { page, limit, search, orderBy } = query;

    console.log('query', query);

    const articlesService = new ArticlesService(logger);
    const { items, meta } = await articlesService.getArticlesByWebsiteId({
      websiteId,
      query: { page, limit, search, orderBy },
    });
    return {
      status: 200,
      body: {
        items,
        meta,
      },
    };
  },
  getArticlesFromCategory: async ({ params, query }) => {
    const { categorySlug } = params;
    const { page, limit } = query;

    const articlesService = new ArticlesService(logger);
    const { items, meta } = await articlesService.getArticlesByCategory({
      category: categorySlug,
      pagination: { page, limit },
    });
    return {
      status: 200,
      body: {
        items,
        meta,
      },
    };
  },
});
