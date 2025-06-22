import { tsr } from '../../../lib/tsrClient';
import type { ClientInferResponseBody } from '@ts-rest/core';
import type { contract } from '@auto-articles/ts-rest';
import type { DefaultSearchParams } from '@auto-articles/utils';

export const CATEGORIES_QUERY_KEY = (websiteId: string) => ['categories', websiteId];

export type UseCategoriesResponse = ClientInferResponseBody<
  typeof contract.categoriesContract.getCategories,
  200
>;

export const useCategories = (websiteId: string, queryParams: DefaultSearchParams) => {
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
  query: DefaultSearchParams,
) => {
  await tsrQueryClient.categoriesContract.getCategories.prefetchQuery({
    queryKey: CATEGORIES_QUERY_KEY(websiteId),
    queryData: {
      params: { websiteId },
      query,
    },
  });
};
