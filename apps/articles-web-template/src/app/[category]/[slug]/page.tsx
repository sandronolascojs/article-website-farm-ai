import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import { prefetchArticleBySlug } from '@/hooks/http/articles/useArticleBySlug';
import type { Article } from '@auto-articles/types';
import { queryClient } from '@/lib/queryClient';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';
import { env } from '../../../../env.mjs';

interface ArticlePageProps {
  params: Promise<{ category: string; slug: string }>;
}

const SITE_ID = env.NEXT_PUBLIC_SITE_ID;
const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

function getArticleUrl(category: string, slug: string) {
  return `${SITE_URL}/${encodeURIComponent(category)}/${slug}`;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const tsrQueryClient = tsr.initQueryClient(queryClient);
  await prefetchArticleBySlug(tsrQueryClient, SITE_ID, slug);
  const article = queryClient.getQueryData(['article', SITE_ID, slug]) as
    | { body: Article }
    | undefined;
  if (!article) return { title: 'Article Not Found' };
  const url = getArticleUrl(category, slug);
  return {
    title: article.body.title,
    description: article.body.summary,
    openGraph: {
      title: article.body.title,
      description: article.body.summary,
      url,
      images: article.body.imageUrl ? [article.body.imageUrl] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.body.title,
      description: article.body.summary,
      images: article.body.imageUrl ? [article.body.imageUrl] : [],
    },
    alternates: { canonical: url },
  };
}

function ArticleDetails({
  article,
  category,
  slug,
}: {
  article: Article;
  category: string;
  slug: string;
}) {
  const SITE_ID = env.NEXT_PUBLIC_SITE_ID;
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
    datePublished: article.publishedAt || new Date().toISOString(),
    articleSection:
      typeof article.category === 'object' ? article.category?.name : article.category || '',
  };
  return (
    <main className="flex flex-col items-center py-10 px-2 min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="w-full max-w-4xl bg-white rounded-2xl shadow-xs overflow-hidden mx-auto">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 sm:h-64 md:h-80 object-cover object-center"
          />
        )}
        <div className="p-4 sm:p-8 pb-8 sm:pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
              <span className="inline-block px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 font-medium rounded-full">
                {typeof article.category === 'object'
                  ? article.category?.name
                  : article.category || ''}
              </span>
              <span className="hidden sm:inline">•</span>
              <span>{article.author}</span>
              <span className="hidden sm:inline">•</span>
              <span>
                {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}
              </span>
            </div>
          </div>
          <MarkdownRenderer content={article.content} />
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Keywords</span>
            </div>
            <div className="flex flex-wrap gap-2 bg-muted/40 border border-muted rounded-lg p-3">
              {article.keywords.map((keyword) => (
                <Badge variant="outline" key={keyword} className="text-xs px-2 py-1">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
  const tsrQueryClient = tsr.initQueryClient(queryClient);
  await prefetchArticleBySlug(tsrQueryClient, SITE_ID, slug);
  const article = queryClient.getQueryData(['article', SITE_ID, slug]) as
    | { body: Article }
    | undefined;

  if (!article) return notFound();

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ArticleDetails article={article.body} category={category} slug={slug} />
      </HydrationBoundary>
    </main>
  );
}
