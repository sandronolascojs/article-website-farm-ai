'use client';

import { useArticlesFromCategory } from '@/hooks/http/articles/useArticlesFromCategory';
import { ArticleCard } from '@/components/ArticleCard';
import { useQueryStates } from 'nuqs';
import { defaultSearchParamsConfig } from '@/lib/defaultSearchParamsCache';
import { Pagination } from '@/components/Pagination';
import type { Article } from '@auto-articles/types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, type PaginationMeta } from '@auto-articles/utils';

interface CategoryArticlesViewProps {
  siteId: string;
  categorySlug: string;
}

export const CategoryArticlesView = ({ siteId, categorySlug }: CategoryArticlesViewProps) => {
  const [params, setQuery] = useQueryStates(defaultSearchParamsConfig);
  const { data, isLoading, isError } = useArticlesFromCategory(siteId, categorySlug, params);
  const articles: Article[] = data?.items || [];
  const meta: PaginationMeta = data?.meta || {
    totalPages: 1,
    totalItems: 0,
    currentPage: DEFAULT_PAGE,
    itemsPerPage: DEFAULT_PAGE_SIZE,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load articles</p>
        </div>
      </div>
    );
  }

  const titleFromSlug = categorySlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return (
    <div className="min-h-screen bg-white">
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              {titleFromSlug}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Browse all articles in this category
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {articles.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">
                No articles found.
              </div>
            ) : (
              articles.map((article) => <ArticleCard key={article.articleSlug} article={article} />)
            )}
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <Pagination
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
            onPageChange={(page) => setQuery({ page })}
          />
        </div>
      </section>
    </div>
  );
};
