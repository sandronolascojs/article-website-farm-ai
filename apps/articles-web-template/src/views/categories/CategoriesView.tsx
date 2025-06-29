'use client';

import { useCategories } from '@/hooks/http/categories/useCategories';
import { CategoryCard } from '@/components/CategoryCard';
import { defaultSearchParamsConfig } from '@/lib/defaultSearchParamsCache';
import { useQueryStates } from 'nuqs';
import { Pagination } from '@/components/Pagination';
import type { Category } from '@auto-articles/types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, type PaginationMeta } from '@auto-articles/utils';
import { AdComponent } from '@/components/AdComponent';
import { AD_SLOTS } from '@/constants/ads.constants';
import React from 'react';

interface CategoriesViewProps {
  siteId: string;
}

export const CategoriesView = ({ siteId }: CategoriesViewProps) => {
  const [params, setQuery] = useQueryStates(defaultSearchParamsConfig);
  const { data, isLoading, isError } = useCategories(siteId, params);
  const categories: Category[] = data?.items || [];
  const meta: PaginationMeta = data?.meta || {
    totalPages: 1,
    totalItems: 0,
    currentPage: DEFAULT_PAGE,
    itemsPerPage: DEFAULT_PAGE_SIZE,
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="min-h-screen">
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
              Categories
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Browse all categories
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {categories.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">
                No articles found.
              </div>
            ) : (
              categories.map((category, idx) => (
                <React.Fragment key={category.categoryId + '-' + idx}>
                  <CategoryCard category={category} />
                  {idx === 3 && (
                    <div className="col-span-full flex justify-center my-6">
                      <AdComponent
                        adSlot={AD_SLOTS.CATEGORIES_LIST_INLINE_1}
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
