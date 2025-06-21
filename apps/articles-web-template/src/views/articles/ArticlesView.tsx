'use client';
import { useArticles } from '@/hooks/http/articles/useArticles';
import { ArticleCard } from '@/components/ArticleCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Pagination } from '@/components/Pagination';
import type { Article } from '@auto-articles/types';
import { parseAsInteger, useQueryState } from 'nuqs';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/pagination.constants';

interface ArticlesViewProps {
  siteId: string;
}

export const ArticlesView = ({ siteId }: ArticlesViewProps) => {
  const [page] = useQueryState('page', parseAsInteger.withDefault(DEFAULT_PAGE));
  const [limit] = useQueryState('limit', parseAsInteger.withDefault(DEFAULT_PAGE_SIZE));

  const { data, isLoading, error } = useArticles(siteId, { page, limit });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles</div>;

  const articles: Article[] = data?.items || [];
  const meta = data?.meta || { totalPages: 1 };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Articles</h2>
            <p className="text-xl text-gray-600">Browse our full collection of articles</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">
                No articles found.
              </div>
            ) : (
              articles.map((article: Article) => (
                <ArticleCard key={article.articleSlug} article={article} />
              ))
            )}
          </div>
          <div className="mt-12 flex justify-center">
            <Pagination totalPages={meta.totalPages} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
