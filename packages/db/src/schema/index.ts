import { articles, articlesRelations } from './article';
import { categories, categoriesRelations } from './categories';
import { websites, websitesRelations } from './websites';

export const schema = {
  articles,
  articlesRelations,
  categories,
  categoriesRelations,
  websites,
  websitesRelations,
};

export * from './article';
export * from './categories';
export * from './websites';
