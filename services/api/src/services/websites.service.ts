import { Logger } from '@auto-articles/utils';
import { WebsitesRepository } from '../repositories/websites.repository';

export class WebsitesService {
  private readonly websitesRepository: WebsitesRepository;

  constructor(private readonly logger: Logger) {
    this.websitesRepository = new WebsitesRepository(logger);
  }

  async getWebsiteByUrl({ url }: { url: string }) {
    return await this.websitesRepository.getWebsiteByUrl({ url });
  }

  async getWebsiteByWebsiteId({ websiteId }: { websiteId: string }) {
    return await this.websitesRepository.getWebsiteByWebsiteId({ websiteId });
  }
}
