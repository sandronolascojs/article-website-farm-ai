import { BaseRepository } from '@auto-articles/shared';
import { DatabaseName } from '@auto-articles/types';
import { Logger } from '@auto-articles/utils';

export class AuthorRepository extends BaseRepository {
  constructor(logger: Logger) {
    super(logger, AuthorRepository.name, DatabaseName.HEALTH_FOOD_BLOG);
  }

  async getAuthorByWebsiteId({ websiteId }: { websiteId: string }) {
    return await this.db.query.authors.findMany({
      where(fields, { eq }) {
        return eq(fields.websiteId, websiteId);
      },
    });
  }
}
