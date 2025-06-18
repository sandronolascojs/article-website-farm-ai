import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { generateIdField } from "./id";
import { articles } from "./article";
import { relations } from "drizzle-orm";

export const categories = pgTable('categories', {
  categoryId: generateIdField({ name: 'category_id' }),
  name: text('name').notNull(),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  articles: many(articles),
}));