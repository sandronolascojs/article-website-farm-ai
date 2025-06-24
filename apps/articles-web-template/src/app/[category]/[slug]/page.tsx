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
import { format } from 'date-fns';
import { AdComponent } from '@/components/AdComponent';
import { AD_SLOTS } from '@/constants/ads.constants';

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

  const content = article.content || '';
  const paragraphs = content.split(/\n{2,}/).filter((p) => p.trim().length > 0);
  const totalParagraphs = Math.max(paragraphs.length, 1);
  const oneThird = Math.floor(totalParagraphs / 3);
  const twoThirds = Math.floor((2 * totalParagraphs) / 3);

  return (
    <main id="article-main" className="flex flex-row justify-center py-10 px-2 min-h-screen w-full">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hidden xl:flex flex-col items-center mr-8">
        <div className="sticky top-24" style={{ width: 160, height: 600 }}>
          <AdComponent adSlot={AD_SLOTS.ARTICLE_LEFT} style={{ width: 160, height: 600 }} />
        </div>
      </div>

      <article className="w-full max-w-4xl bg-card rounded-2xl shadow-xs overflow-hidden mx-auto">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 sm:h-64 md:h-80 object-cover object-center"
          />
        )}
        <div className="p-4 sm:p-8 pb-8 sm:pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
              <Badge variant="secondary">
                {typeof article.category === 'object'
                  ? article.category?.name
                  : article.category || ''}
              </Badge>
              <span className="hidden sm:inline">•</span>
              <span>{article.author}</span>
              <span className="hidden sm:inline">•</span>
              <span>
                {article.publishedAt ? format(new Date(article.publishedAt), 'MMM d, yyyy') : ''}
              </span>
            </div>
          </div>
          {/* Markdown content with inline ads */}
          <div>
            {paragraphs.slice(0, oneThird).join('\n\n') && (
              <MarkdownRenderer content={paragraphs.slice(0, oneThird).join('\n\n')} />
            )}
            {paragraphs.length > oneThird && (
              <div className="flex justify-center my-6">
                <AdComponent
                  adSlot={AD_SLOTS.ARTICLE_INLINE_1}
                  style={{ width: 468, height: 60 }}
                />
              </div>
            )}
            {paragraphs.slice(oneThird, twoThirds).join('\n\n') && (
              <MarkdownRenderer content={paragraphs.slice(oneThird, twoThirds).join('\n\n')} />
            )}
            {paragraphs.length > twoThirds && (
              <div className="flex justify-center my-6">
                <AdComponent
                  adSlot={AD_SLOTS.ARTICLE_INLINE_2}
                  style={{ width: 468, height: 60 }}
                />
              </div>
            )}
            {paragraphs.slice(twoThirds).join('\n\n') && (
              <MarkdownRenderer content={paragraphs.slice(twoThirds).join('\n\n')} />
            )}
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Keywords</span>
            </div>
            <div className="flex flex-wrap gap-2 bg-muted/40 border border-muted rounded-lg p-3">
              {article.keywords.map((keyword) => (
                <Badge key={keyword}>{keyword}</Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-center my-4">
            <AdComponent adSlot={AD_SLOTS.ARTICLE_BOTTOM} style={{ width: 728, height: 90 }} />
          </div>
        </div>
      </article>

      <div className="hidden xl:flex flex-col items-center ml-8">
        <div className="sticky top-24" style={{ width: 160, height: 600 }}>
          <AdComponent adSlot={AD_SLOTS.ARTICLE_RIGHT} style={{ width: 160, height: 600 }} />
        </div>
      </div>
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
    <main className="min-h-screen w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ArticleDetails article={article.body} category={category} slug={slug} />
      </HydrationBoundary>
    </main>
  );
}
