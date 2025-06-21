import { Logger, type Pagination } from '@auto-articles/utils';
import { ArticlesRepository } from '../repositories/articles.repository';
import { WebsitesService } from './websites.service';
import { contract } from '@auto-articles/ts-rest';
import { NotFoundError } from '@/utils/errors/NotFoundError';
import type { ArticlesQuery } from '@/types/queryTypes/articlesQuery';

export class ArticlesService {
  private readonly articlesRepository: ArticlesRepository;
  private readonly websitesService: WebsitesService;

  constructor(private readonly logger: Logger) {
    this.articlesRepository = new ArticlesRepository(logger);
    this.websitesService = new WebsitesService(logger);
  }

  async getArticleBySlug({ websiteId, slug }: { websiteId: string; slug: string }) {
    const website = await this.websitesService.getWebsiteByWebsiteId({ websiteId });
    if (!website) {
      throw new NotFoundError({
        message: 'Website not found',
        path: contract.articlesContract.getArticle.path,
      });
    }

    const article = await this.articlesRepository.getArticleBySlug({ websiteId, slug });
    if (!article) {
      throw new NotFoundError({
        message: 'Article not found',
        path: contract.articlesContract.getArticle.path,
      });
    }

    return article;
  }

  async getArticlesByWebsiteId({ websiteId, query }: { websiteId: string; query: ArticlesQuery }) {
    const website = await this.websitesService.getWebsiteByWebsiteId({ websiteId });
    if (!website) {
      throw new NotFoundError({
        message: 'Website not found',
        path: contract.articlesContract.getArticlesByWebsiteId.path,
      });
    }

    return await this.articlesRepository.getArticlesByWebsiteId({ websiteId, query });
  }

  async getArticlesByCategory({
    category,
    pagination,
  }: {
    category: string;
    pagination: Pagination;
  }) {
    return await this.articlesRepository.getArticlesByCategory({ category, pagination });
  }
}
