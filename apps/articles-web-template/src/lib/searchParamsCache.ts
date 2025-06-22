import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/queryParams.constants';
import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  limit: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
});
