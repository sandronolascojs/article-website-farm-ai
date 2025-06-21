import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';
import { ArticlesQueryParams } from '@/hooks/http/articles/useArticles';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/pagination.constants';

const orderByOptions = ['newest', 'oldest'] as const;

export const articlesViewSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  limit: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  search: parseAsString.withDefault(''),
  orderBy: parseAsStringLiteral(orderByOptions).withDefault('newest'),
});

export type ArticlesViewSearchParams = ArticlesQueryParams;
