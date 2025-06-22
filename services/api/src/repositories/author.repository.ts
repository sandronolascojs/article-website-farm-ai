import { authors } from '@auto-articles/db';
import { BaseRepository } from '@auto-articles/shared';
import { DatabaseName } from '@auto-articles/types';
import { eq } from 'drizzle-orm';
import type { Logger } from '@auto-articles/utils';

export class AuthorRepository extends BaseRepository {
  constructor(logger: Logger) {
    super(logger, AuthorRepository.name, DatabaseName.HEALTH_FOOD_BLOG);
  }

  async getAuthorByName({ name }: { name: string }) {
    return await this.db.select().from(authors).where(eq(authors.name, name)).limit(1);
  }

  async getAuthorsByWebsiteId({ websiteId }: { websiteId: string }) {
    return await this.db.select().from(authors).where(eq(authors.websiteId, websiteId));
  }
}
