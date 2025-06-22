import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { generateIdField } from './id';
import { articles } from './article';
import { relations } from 'drizzle-orm';
import { websites } from './websites';

export const categories = pgTable(
  'categories',
  {
    categoryId: generateIdField({ name: 'category_id' }),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    description: text('description'),
    websiteId: text('website_id')
      .notNull()
      .references(() => websites.websiteId),
    deletedAt: timestamp('deleted_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (columns) => [
    index('idx_category_website_id').on(columns.websiteId),
    index('idx_category_slug').on(columns.slug),
    index('idx_category_name').on(columns.name),
  ],
);

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  articles: many(articles),
  website: one(websites, {
    fields: [categories.websiteId],
    references: [websites.websiteId],
  }),
}));
