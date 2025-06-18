import { articles, articlesRelations } from './article';
import { categories, categoriesRelations } from './categories';

export const schema = {
  articles,
  articlesRelations,
  categories,
  categoriesRelations,
};

export * from './article'
export * from './categories'