import { Card } from '@/components/ui/card';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import { prefetchArticleBySlug, useArticleBySlug } from '@/hooks/http/articles/useArticleBySlug';

interface ArticlePageProps {
  params: { category: string; slug: string };
}

function getArticleUrl(category: string, slug: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  return `${base}/${encodeURIComponent(category)}/${slug}`;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
  const queryClient = new QueryClient();
  const tsrQueryClient = tsr.initQueryClient(queryClient);
  await prefetchArticleBySlug(tsrQueryClient, SITE_ID, params.slug);
  const data = queryClient.getQueryData(['article', SITE_ID, params.slug]);
  const article = data?.body;
  if (!article) return { title: 'Article Not Found' };
  const url = getArticleUrl(params.category, params.slug);
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      url,
      images: article.imageUrl ? [article.imageUrl] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
      images: article.imageUrl ? [article.imageUrl] : [],
    },
    alternates: { canonical: url },
  };
}

function ArticleDetails({ category, slug }: { category: string; slug: string }) {
  const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
  const { data } = useArticleBySlug(SITE_ID, slug);
  const article = data?.body;
  if (!article) return notFound();
  const url = getArticleUrl(category, slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    image: article.imageUrl ? [article.imageUrl] : undefined,
    author: {
      '@type': 'Person',
      name: SITE_ID,
    },
    mainEntityOfPage: url,
    url,
    datePublished: new Date().toISOString(),
    articleSection: article.category,
  };
  return (
    <main className="flex flex-col items-center py-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Card className="w-full max-w-3xl p-6">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
        <p className="text-muted-foreground mb-4">{article.summary}</p>
        <div className="flex flex-col gap-8">
          {article.htmlContent.map((html: string, idx: number) => (
            <section
              key={idx}
              className="prose prose-neutral max-w-none bg-muted/40 rounded-lg p-4 shadow-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </div>
        <div className="mt-6 text-xs text-muted-foreground">Category: {article.category.name}</div>
      </Card>
    </main>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
  const queryClient = new QueryClient();
  const tsrQueryClient = tsr.initQueryClient(queryClient);
  await prefetchArticleBySlug(tsrQueryClient, SITE_ID, params.slug);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticleDetails category={params.category} slug={params.slug} />
    </HydrationBoundary>
  );
}
