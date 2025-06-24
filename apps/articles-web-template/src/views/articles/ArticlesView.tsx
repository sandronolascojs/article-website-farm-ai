'use client';
import { useArticles } from '@/hooks/http/articles/useArticles';
import { ArticleCard } from '@/components/ArticleCard';
import type { Article } from '@auto-articles/types';
import { useQueryStates } from 'nuqs';
import { articlesViewSearchParamsConfig } from '@/lib/searchParamsCacheTypes/articlesViewCache';
import { Pagination } from '@/components/Pagination';
import { ArticlesFilters } from './ArticlesFilters';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, type PaginationMeta } from '@auto-articles/utils';
import { AdComponent } from '@/components/AdComponent';
import { AD_SLOTS } from '@/constants/ads.constants';
import React from 'react';

interface ArticlesViewProps {
  siteId: string;
}

export const ArticlesView = ({ siteId }: ArticlesViewProps) => {
  const [params, setQuery] = useQueryStates(articlesViewSearchParamsConfig);
  const { data, isLoading, error } = useArticles(siteId, params);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles</div>;

  const articles: Article[] = data?.items || [];
  const meta: PaginationMeta = data?.meta || {
    totalPages: 1,
    totalItems: 0,
    currentPage: DEFAULT_PAGE,
    itemsPerPage: DEFAULT_PAGE_SIZE,
  };

  return (
    <div className="min-h-screen">
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
              All Articles
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Browse our full collection of articles
            </p>
          </div>
          <ArticlesFilters
            search={params.search}
            orderBy={params.orderBy}
            onSearchChange={(value) => setQuery({ search: value, page: 1 })}
            onOrderByChange={(value) => setQuery({ orderBy: value, page: 1 })}
            onClear={() => setQuery({ search: '', orderBy: 'newest', page: 1 })}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {articles.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">
                No articles found.
              </div>
            ) : (
              <>
                {articles.slice(0, 4).map((article, idx) => (
                  <ArticleCard key={article.articleSlug + '-' + idx} article={article} />
                ))}
                {articles.length > 4 && (
                  <div className="col-span-full flex justify-center my-6" key="ad-inline-1">
                    <AdComponent
                      adSlot={AD_SLOTS.ARTICLE_INLINE_1}
                      style={{ width: 728, height: 90 }}
                    />
                  </div>
                )}
                {articles.slice(4).map((article, idx) => (
                  <ArticleCard key={article.articleSlug + '-after-' + idx} article={article} />
                ))}
              </>
            )}
          </div>
        </div>
      </section>
      <section className="py-4">
        <div className="container mx-auto px-2 sm:px-4 flex justify-center">
          <AdComponent
            adSlot={AD_SLOTS.ARTICLES_LIST_BOTTOM}
            style={{ maxWidth: '100%', width: 728, height: 90 }}
          />
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
