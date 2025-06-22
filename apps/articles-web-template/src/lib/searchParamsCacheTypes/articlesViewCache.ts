import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  ORDER_BY_OPTIONS,
  type OrderBy,
} from '@auto-articles/utils';
import type { inferParserType } from 'nuqs/server';

export const articlesViewSearchParamsConfig = {
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  limit: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  search: parseAsString.withDefault(''),
  orderBy: parseAsStringLiteral(ORDER_BY_OPTIONS).withDefault('newest'),
};

export const articlesViewSearchParamsCache = createSearchParamsCache(
  articlesViewSearchParamsConfig,
);

export type RawArticlesViewSearchParams = inferParserType<typeof articlesViewSearchParamsConfig>;

export type ArticlesViewSearchParams = Omit<RawArticlesViewSearchParams, 'orderBy'> & {
  orderBy: OrderBy;
};
