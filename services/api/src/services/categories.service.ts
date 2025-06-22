import { Logger, type Pagination } from '@auto-articles/utils';
import { CategoriesRepository } from '../repositories/categories.repository';
import { WebsitesService } from './websites.service';
import { NotFoundError } from '@/utils/errors/NotFoundError';
import { contract } from '@auto-articles/ts-rest';
import { env } from '@/config/env.config';

export class CategoriesService {
  private readonly categoriesRepository: CategoriesRepository;
  private readonly websitesService: WebsitesService;

  constructor(private readonly logger: Logger) {
    this.categoriesRepository = new CategoriesRepository(logger);
    this.websitesService = new WebsitesService(logger);
  }

  async getCategoryBySlug({ slug, websiteId }: { slug: string; websiteId: string }) {
    const website = await this.websitesService.getWebsiteByWebsiteId({ websiteId });
    if (!website) {
      throw new NotFoundError({
        message: 'Website not found',
        path: contract.categoriesContract.getCategoryBySlug.path,
      });
    }

    const category = await this.categoriesRepository.getCategoryBySlug({ slug, websiteId });
    if (!category) {
      throw new NotFoundError({
        message: 'Category not found',
        path: contract.categoriesContract.getCategoryBySlug.path,
      });
    }

    return {
      categoryId: category.categoryId,
      name: category.name,
      slug: category.slug,
      totalArticles: category.articlesCount,
      imageUrl: category.imageKey
        ? `${env.SUPABASE_BUCKET_IMAGES_URL}/${category.imageKey}`
        : undefined,
    };
  }

  async getCategoriesByWebsiteId({
    websiteId,
    pagination,
  }: {
    websiteId: string;
    pagination: Pagination;
  }) {
    const website = await this.websitesService.getWebsiteByWebsiteId({ websiteId });
    if (!website) {
      throw new NotFoundError({
        message: 'Website not found',
        path: contract.categoriesContract.getCategories.path,
      });
    }

    const categories = await this.categoriesRepository.getCategoriesByWebsiteId({
      websiteId,
      pagination,
    });
    return {
      items: categories.items.map((category) => ({
        ...category,
        imageUrl: category.imageKey
          ? `${env.SUPABASE_BUCKET_IMAGES_URL}/${category.imageKey}`
          : undefined,
      })),
      total: categories.total,
    };
  }
}
