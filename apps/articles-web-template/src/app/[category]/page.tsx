import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import {
  prefetchArticlesFromCategory,
  useArticlesFromCategory,
} from '@/hooks/http/articles/useArticlesFromCategory';

interface CategoryPageProps {
  params: { category: string };
}

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const title = `Category: ${params.category}`;
  const url = `${SITE_URL}/${encodeURIComponent(params.category)}`;
  return {
    title,
    description: `Read all articles in the ${params.category} category.`,
    openGraph: {
      title,
      description: `Read all articles in the ${params.category} category.`,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Read all articles in the ${params.category} category.`,
    },
    alternates: { canonical: url },
  };
}

function CategoryArticlesList({ category }: { category: string }) {
  const { data } = useArticlesFromCategory(SITE_ID, category);
  const articles = data?.body?.items || [];
  const url = `${SITE_URL}/${encodeURIComponent(category)}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Category: ${category}`,
    url,
    hasPart: articles.map((article) => ({
      '@type': 'Article',
      headline: article.title,
      url: `${url}/${article.articleSlug}`,
    })),
  };
  return (
    <main className="flex flex-col items-center gap-8 py-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold text-center mb-4">Category: {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {articles.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground">
            No articles found in this category.
          </div>
        ) : (
          articles.map((article) => (
            <Link
              key={article.articleSlug}
              href={`/${encodeURIComponent(article.category.slug)}/${article.articleSlug}`}
            >
              <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div>
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-40 object-cover rounded-t"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                    <p className="text-muted-foreground mb-2">{article.summary}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const queryClient = new QueryClient();
  const tsrQueryClient = tsr.initQueryClient(queryClient);
  await prefetchArticlesFromCategory(tsrQueryClient, SITE_ID, params.category);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryArticlesList category={params.category} />
    </HydrationBoundary>
  );
}
