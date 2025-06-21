import { DB } from '@auto-articles/db';
import { DatabaseService } from '@auto-articles/shared';
import { DatabaseName } from '@auto-articles/types';
import type { Logger } from '@auto-articles/utils';

export class WebsitesRepository {
  private readonly db: DB;

  constructor(private readonly logger: Logger) {
    this.logger = logger;

    const dbService = DatabaseService.getInstance(logger);
    if (!dbService.getRegisteredServices().has(WebsitesRepository.name)) {
      dbService.registerService({
        serviceName: WebsitesRepository.name,
        databaseName: DatabaseName.HEALTH_FOOD_BLOG,
      });
    }

    this.db = dbService.getConnection(WebsitesRepository.name);
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
