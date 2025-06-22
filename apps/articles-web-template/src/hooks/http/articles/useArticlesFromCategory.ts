import type { CategoryArticlesViewSearchParams } from '@/lib/searchParamsCacheTypes/categoryArticlesViewCache';
import { tsr } from '../../../lib/tsrClient';

export const ARTICLES_FROM_CATEGORY_QUERY_KEY = (websiteId: string, categorySlug: string) => [
  'articles-from-category',
  websiteId,
  categorySlug,
];

export const useArticlesFromCategory = (
  websiteId: string,
  categorySlug: string,
  query: CategoryArticlesViewSearchParams,
) => {
  const { data, isLoading, isError, error } = tsr.articlesContract.getArticlesFromCategory.useQuery(
    {
      queryKey: ARTICLES_FROM_CATEGORY_QUERY_KEY(websiteId, categorySlug),
      queryData: {
        params: { websiteId, categorySlug },
        query,
      },
    },
  );

  return { data: data?.body, isLoading, isError, error };
};

export const prefetchArticlesFromCategory = async (
  tsrQueryClient: ReturnType<typeof tsr.initQueryClient>,
  websiteId: string,
  categorySlug: string,
  query?: CategoryArticlesViewSearchParams,
) => {
  await tsrQueryClient.articlesContract.getArticlesFromCategory.prefetchQuery({
    queryKey: ARTICLES_FROM_CATEGORY_QUERY_KEY(websiteId, categorySlug),
    queryData: {
      params: { websiteId, categorySlug },
      query,
    },
  });
};
