import { articles, articlesRelations } from './article';
import { authors, authorsRelations } from './author';
import { categories, categoriesRelations } from './categories';
import { websites, websitesRelations } from './websites';

export const schema = {
  articles,
  articlesRelations,
  categories,
  categoriesRelations,
  websites,
  websitesRelations,
  authors,
  authorsRelations,
};

export * from './article';
export * from './categories';
export * from './websites';
export * from './author';
