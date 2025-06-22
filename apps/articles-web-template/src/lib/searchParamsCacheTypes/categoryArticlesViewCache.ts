import { createSearchParamsCache, parseAsInteger, parseAsStringLiteral } from 'nuqs/server';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  ORDER_BY_OPTIONS,
} from '@/constants/queryParams.constants';

export const categoryArticlesViewSearchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  limit: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  orderBy: parseAsStringLiteral(ORDER_BY_OPTIONS).withDefault('newest'),
});

export type CategoryArticlesViewSearchParams = Awaited<
  ReturnType<typeof categoryArticlesViewSearchParamsCache.parse>
>;
