import { DEFAULT_PAGINATION_QUERY } from '@/constants/pagination.constants';
import { tsr } from '../../../lib/tsrClient';

export const ARTICLES_QUERY_KEY = (
  websiteId: string,
  queryParams: typeof DEFAULT_PAGINATION_QUERY,
) => ['articles', websiteId, queryParams.page, queryParams.limit];

export const useArticles = (websiteId: string, queryParams: typeof DEFAULT_PAGINATION_QUERY) => {
  const query = tsr.articlesContract.getArticlesByWebsiteId.useQuery({
    queryKey: ARTICLES_QUERY_KEY(websiteId, queryParams),
    queryData: {
      params: { websiteId },
      query: queryParams,
    },
  });

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    data: query.data?.body,
    error: query.error,
  };
};

export const prefetchArticles = async (
  tsrQueryClient: ReturnType<typeof tsr.initQueryClient>,
  websiteId: string,
  queryParams: typeof DEFAULT_PAGINATION_QUERY,
) => {
  await tsrQueryClient.articlesContract.getArticlesByWebsiteId.prefetchQuery({
    queryKey: ARTICLES_QUERY_KEY(websiteId, queryParams),
    queryData: {
      params: { websiteId },
      query: queryParams,
    },
  });
};
