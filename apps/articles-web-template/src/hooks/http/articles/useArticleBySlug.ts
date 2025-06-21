import { tsr } from '../../../lib/tsrClient';

export const ARTICLE_QUERY_KEY = (websiteId: string, articleSlug: string) => [
  'article',
  websiteId,
  articleSlug,
];

export const useArticleBySlug = (websiteId: string, articleSlug: string) => {
  return tsr.articlesContract.getArticle.useQuery({
    queryKey: ARTICLE_QUERY_KEY(websiteId, articleSlug),
    queryData: {
      params: { websiteId, articleSlug },
    },
  });
};

export const prefetchArticleBySlug = async (
  tsrQueryClient: ReturnType<typeof tsr.initQueryClient>,
  websiteId: string,
  articleSlug: string,
) => {
  await tsrQueryClient.articlesContract.getArticle.prefetchQuery({
    queryKey: ARTICLE_QUERY_KEY(websiteId, articleSlug),
    queryData: {
      params: { websiteId, articleSlug },
    },
  });
};
