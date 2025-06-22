import { index, pgTable, text } from 'drizzle-orm/pg-core';
import { websites } from './websites';
import { generateIdField } from './id';
import { relations } from 'drizzle-orm';
import { articles } from './article';

export const authors = pgTable(
  'authors',
  {
    authorId: generateIdField({ name: 'author_id' }),
    name: text('name').notNull(),
    websiteId: text('website_id').references(() => websites.websiteId),
  },
  (columns) => [index('idx_author_website_id').on(columns.websiteId)],
);

export const authorsRelations = relations(authors, ({ one, many }) => ({
  website: one(websites, {
    fields: [authors.websiteId],
    references: [websites.websiteId],
  }),
  articles: many(articles),
}));
