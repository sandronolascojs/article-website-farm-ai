'use client';

import { useArticlesFromCategory } from '@/hooks/http/articles/useArticlesFromCategory';
import { CategoryArticlesPagination } from './CategoryArticlesPagination';
import type { OrderBy } from '@/constants/queryParams.constants';
import { ArticleCard } from '@/components/ArticleCard';

interface CategoryArticlesViewProps {
  siteId: string;
  categorySlug: string;
  page: number;
  limit: number;
  orderBy: OrderBy;
}

export const CategoryArticlesView = ({
  siteId,
  categorySlug,
  page,
  limit,
  orderBy,
}: CategoryArticlesViewProps) => {
  const { data, isLoading, isError, error } = useArticlesFromCategory(
    siteId,
    categorySlug,
    { page, limit, orderBy }
  );
  const articles = data?.items || [];
  const totalPages = data?.meta?.totalPages || 0;

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
          <p className="text-gray-600">{error?.message}</p>
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
      {totalPages > 1 && (
        <CategoryArticlesPagination
          meta={
            data?.meta || {
              totalItems: 0,
              totalPages: 0,
              currentPage: 0,
              itemsPerPage: 0,
            }
          }
          orderBy={orderBy}
        />
      )}
    </div>
  );
};
