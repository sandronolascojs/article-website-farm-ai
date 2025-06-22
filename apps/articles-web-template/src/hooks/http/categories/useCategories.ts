import { DEFAULT_PAGINATION_QUERY } from '@/constants/queryParams.constants';
import { tsr } from '../../../lib/tsrClient';
import type { ClientInferResponseBody } from '@ts-rest/core';
import type { contract } from '@auto-articles/ts-rest';

export const CATEGORIES_QUERY_KEY = (websiteId: string) => ['categories', websiteId];

export type UseCategoriesResponse = ClientInferResponseBody<
  typeof contract.categoriesContract.getCategories,
  200
>;

export const useCategories = (websiteId: string, queryParams: typeof DEFAULT_PAGINATION_QUERY) => {
  const query = tsr.categoriesContract.getCategories.useQuery({
    queryKey: CATEGORIES_QUERY_KEY(websiteId),
    queryData: {
      params: { websiteId },
      query: queryParams,
    },
  });
  return {
    data: query.data?.body,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    error: query.error,
  };
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
