import { BaseRepository } from '@auto-articles/shared';
import { DatabaseName } from '@auto-articles/types';
import type { Logger } from '@auto-articles/utils';

export class WebsitesRepository extends BaseRepository {
  constructor(logger: Logger) {
    super(logger, WebsitesRepository.name, DatabaseName.HEALTH_FOOD_BLOG);
  }

  async getWebsiteByWebsiteId({ websiteId }: { websiteId: string }) {
    return await this.db.query.websites.findFirst({
      where(fields, { eq }) {
        return eq(fields.websiteId, websiteId);
      },
    });
  }

  async getWebsiteByUrl({ url }: { url: string }) {
    return await this.db.query.websites.findFirst({
      where(fields, { eq }) {
        return eq(fields.url, url.toLowerCase());
      },
    });
  }
}
