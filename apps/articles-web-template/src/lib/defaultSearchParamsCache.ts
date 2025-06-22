import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@auto-articles/utils';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';

export const defaultSearchParamsConfig = {
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  limit: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
};

export const defaultSearchParamsCache = createSearchParamsCache(defaultSearchParamsConfig);
