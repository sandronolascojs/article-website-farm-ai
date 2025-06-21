import { tsr } from '../../../lib/tsrClient';

export const CATEGORY_QUERY_KEY = (websiteId: string, slug: string) => [
  'category',
  websiteId,
  slug,
];

export const useCategoryBySlug = (websiteId: string, slug: string) => {
  return tsr.categoriesContract.getCategoryBySlug.useQuery({
    queryKey: CATEGORY_QUERY_KEY(websiteId, slug),
    queryData: {
      params: { websiteId, slug },
    },
  });
};

export const prefetchCategoryBySlug = async (
  tsrQueryClient: ReturnType<typeof tsr.initQueryClient>,
  websiteId: string,
  slug: string,
) => {
  await tsrQueryClient.categoriesContract.getCategoryBySlug.prefetchQuery({
    queryKey: CATEGORY_QUERY_KEY(websiteId, slug),
    queryData: {
      params: { websiteId, slug },
    },
  });
};
