import { tsr } from '../../../lib/tsrClient';

export interface ArticlesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: 'newest' | 'oldest';
}

export const ARTICLES_QUERY_KEY = (websiteId: string, queryParams: ArticlesQueryParams) => [
  'articles',
  websiteId,
  queryParams.page,
  queryParams.limit,
  queryParams.search,
  queryParams.orderBy,
];

export const useArticles = (websiteId: string, queryParams: ArticlesQueryParams) => {
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
  queryParams: ArticlesQueryParams,
) => {
  await tsrQueryClient.articlesContract.getArticlesByWebsiteId.prefetchQuery({
    queryKey: ARTICLES_QUERY_KEY(websiteId, queryParams),
    queryData: {
      params: { websiteId },
      query: queryParams,
    },
  });
};
