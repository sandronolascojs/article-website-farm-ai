import { Logger, type Pagination } from '@auto-articles/utils';
import { ArticlesRepository } from '../repositories/articles.repository';
import { WebsitesService } from './websites.service';
import { contract } from '@auto-articles/ts-rest';
import { NotFoundError } from '@/utils/errors/NotFoundError';

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

  async getArticlesByWebsiteId({
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
        path: contract.articlesContract.getArticlesByWebsiteId.path,
      });
    }

    return await this.articlesRepository.getArticlesByWebsiteId({ websiteId, pagination });
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
