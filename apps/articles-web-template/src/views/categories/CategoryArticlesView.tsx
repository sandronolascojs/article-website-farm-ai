'use client';

import { useArticlesFromCategory } from '@/hooks/http/articles/useArticlesFromCategory';
import { ArticleCard } from '@/components/ArticleCard';
import { useQueryStates } from 'nuqs';
import { defaultSearchParamsConfig } from '@/lib/defaultSearchParamsCache';
import { Pagination } from '@/components/Pagination';
import type { Article } from '@auto-articles/types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, type PaginationMeta } from '@auto-articles/utils';
import { AdComponent } from '@/components/AdComponent';
import { AD_SLOTS } from '@/constants/ads.constants';
import React from 'react';

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-muted-foreground mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load articles</p>
        </div>
      </div>
    );
  }

  const titleFromSlug = categorySlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
  return (
    <div className="min-h-screen">
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
              {titleFromSlug}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Browse all articles in this category
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {articles.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">
                No articles found.
              </div>
            ) : (
              articles.map((article, idx) => (
                <React.Fragment key={article.articleSlug + '-' + idx}>
                  <ArticleCard article={article} />
                  {idx === 3 && (
                    <div className="col-span-full flex justify-center my-6">
                      <AdComponent
                        adSlot={AD_SLOTS.CATEGORY_ARTICLES_INLINE_1}
                        style={{ width: 728, height: 90 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <Pagination
            currentPage={params.page}
            totalPages={meta.totalPages}
            onPageChange={(page) => setQuery({ page })}
          />
        </div>
      </section>
    </div>
  );
};
