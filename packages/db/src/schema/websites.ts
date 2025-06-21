import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { generateIdField } from './id';
import { relations } from 'drizzle-orm';
import { categories } from './categories';
import { articles } from './article';

export const websites = pgTable('websites', {
  websiteId: generateIdField({ name: 'website_id' }),
  name: text('name').notNull(),
  url: text('url').notNull(),
  description: text('description'),
  banner: text('banner'),
  logo: text('logo'),
  favicon: text('favicon'),
  language: text('language').notNull().default('en-US'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const websitesRelations = relations(websites, ({ many }) => ({
  categories: many(categories),
  articles: many(articles),
}));
