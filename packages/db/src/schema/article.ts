import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { generateIdField } from './id';
import { categories } from './categories';
import { relations } from 'drizzle-orm';
import { websites } from './websites';
import { authors } from './author';

export const articles = pgTable(
  'articles',
  {
    articleId: generateIdField({ name: 'article_id' }),
    title: text('title').notNull(),
    content: text('content').notNull(),
    summary: text('summary').notNull(),
    keywords: text('keywords').array().notNull(),
    slug: text('slug').notNull(),
    imageKey: text('image_key'),
    authorId: text('author_id')
      .notNull()
      .references(() => authors.authorId),
    categoryId: text('category_id')
      .notNull()
      .references(() => categories.categoryId),
    websiteId: text('website_id')
      .notNull()
      .references(() => websites.websiteId),
    processedAt: timestamp('processed_at'),
    deletedAt: timestamp('deleted_at'),
    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (columns) => [
    index('idx_article_website_id').on(columns.websiteId),
    index('idx_article_slug').on(columns.slug),
  ],
);

export const articlesRelations = relations(articles, ({ one }) => ({
  category: one(categories, {
    fields: [articles.categoryId],
    references: [categories.categoryId],
  }),
  website: one(websites, {
    fields: [articles.websiteId],
    references: [websites.websiteId],
  }),
  author: one(authors, {
    fields: [articles.authorId],
    references: [authors.authorId],
  }),
}));
