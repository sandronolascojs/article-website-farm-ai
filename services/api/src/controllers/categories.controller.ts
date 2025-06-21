import { initServer } from '@ts-rest/fastify';
import { contract } from '@auto-articles/ts-rest';
import { CategoriesService } from '@/services/categories.service';
import { logger } from '@/utils/logger.instance';

const server = initServer();

export const categoriesRouter = server.router(contract.categoriesContract, {
  getCategories: async ({ params, query }) => {
    const { websiteId } = params;
    const { page, limit } = query;

    const categoriesService = new CategoriesService(logger);
    const categories = await categoriesService.getCategoriesByWebsiteId({
      websiteId,
      pagination: { page, limit },
    });
    return {
      status: 200,
      body: {
        items: categories.items.map((category) => ({
          categoryId: category.categoryId,
          name: category.name,
          slug: category.slug,
          totalArticles: category.articlesCount,
        })),
        meta: {
          totalItems: categories.total,
          totalPages: Math.ceil(categories.total / limit),
          currentPage: page,
          itemsPerPage: limit,
        },
      },
    };
  },
  getCategoryBySlug: async ({ params }) => {
    const { websiteId, slug } = params;

    const categoriesService = new CategoriesService(logger);
    const category = await categoriesService.getCategoryBySlug({ slug, websiteId });
    return {
      status: 200,
      body: {
        categoryId: category.categoryId,
        name: category.name,
        slug: category.slug,
        totalArticles: category.articlesCount,
      },
    };
  },
});
