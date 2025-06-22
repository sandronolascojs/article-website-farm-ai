import { tsr } from '../../../lib/tsrClient';
import type { ArticlesViewSearchParams } from '@/lib/searchParamsCacheTypes/articlesViewCache';

export const ARTICLES_QUERY_KEY = (websiteId: string, queryParams: ArticlesViewSearchParams) => [
  'articles',
  websiteId,
  queryParams.page,
  queryParams.limit,
  queryParams.search,
  queryParams.orderBy,
];

export const useArticles = (websiteId: string, queryParams: ArticlesViewSearchParams) => {
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
  queryParams: ArticlesViewSearchParams,
) => {
  await tsrQueryClient.articlesContract.getArticlesByWebsiteId.prefetchQuery({
    queryKey: ARTICLES_QUERY_KEY(websiteId, queryParams),
    queryData: {
      params: { websiteId },
      query: queryParams,
    },
  });
};
