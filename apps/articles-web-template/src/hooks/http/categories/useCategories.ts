import { DEFAULT_PAGINATION_QUERY } from '@/constants/pagination.constants';
import { tsr } from '../../../lib/tsrClient';

export const CATEGORIES_QUERY_KEY = (websiteId: string) => ['categories', websiteId];

export const useCategories = (
  websiteId: string,
  query?: Record<string, string | number | undefined>,
) => {
  return tsr.categoriesContract.getCategories.useQuery({
    queryKey: CATEGORIES_QUERY_KEY(websiteId),
    queryData: {
      params: { websiteId },
      query: query || DEFAULT_PAGINATION_QUERY,
    },
  });
};

export const prefetchCategories = async (
  tsrQueryClient: ReturnType<typeof tsr.initQueryClient>,
  websiteId: string,
  query?: {
    page: number;
    limit: number;
  },
) => {
  await tsrQueryClient.categoriesContract.getCategories.prefetchQuery({
    queryKey: CATEGORIES_QUERY_KEY(websiteId),
    queryData: {
      params: { websiteId },
      query: query || DEFAULT_PAGINATION_QUERY,
    },
  });
};
