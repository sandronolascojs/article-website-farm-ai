import { tsr } from '../../../lib/tsrClient';

export const ARTICLES_FROM_CATEGORY_QUERY_KEY = (websiteId: string, categorySlug: string) => [
  'articles-from-category',
  websiteId,
  categorySlug,
];

export const useArticlesFromCategory = (
  websiteId: string,
  categorySlug: string,
  query?: Record<string, string | number | undefined>,
) => {
  return tsr.articlesContract.getArticlesFromCategory.useQuery({
    queryKey: ARTICLES_FROM_CATEGORY_QUERY_KEY(websiteId, categorySlug),
    queryData: {
      params: { websiteId, categorySlug },
      query: query || {},
    },
  });
};

export const prefetchArticlesFromCategory = async (
  tsrQueryClient: ReturnType<typeof tsr.initQueryClient>,
  websiteId: string,
  categorySlug: string,
  query?: Record<string, string | number | undefined>,
) => {
  await tsrQueryClient.articlesContract.getArticlesFromCategory.prefetchQuery({
    queryKey: ARTICLES_FROM_CATEGORY_QUERY_KEY(websiteId, categorySlug),
    queryData: {
      params: { websiteId, categorySlug },
      query: query || {},
    },
  });
};
