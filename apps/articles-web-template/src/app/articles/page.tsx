import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import { prefetchArticles } from '@/hooks/http/articles/useArticles';
import { ArticlesView } from '@/views/articles/ArticlesView';
import { Metadata } from 'next';
import { queryClient } from '@/lib/queryClient';
import { articlesViewSearchParamsCache } from '@/lib/searchParamsCacheTypes/articlesViewCache';
import { env } from '../../../env.mjs';

const SITE_ID = env.NEXT_PUBLIC_SITE_ID;
const SITE_NAME = env.NEXT_PUBLIC_SITE_NAME;
const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: `Articles | ${SITE_NAME}`,
  description: `Browse all articles from ${SITE_NAME}.`,
  openGraph: {
    title: `Articles | ${SITE_NAME}`,
    description: `Browse all articles from ${SITE_NAME}.`,
    url: `${SITE_URL}/articles`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Articles | ${SITE_NAME}`,
    description: `Browse all articles from ${SITE_NAME}.`,
  },
  alternates: { canonical: `${SITE_URL}/articles` },
};

interface ArticlesPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = articlesViewSearchParamsCache.parse(searchParams);
  const tsrQueryClient = tsr.initQueryClient(queryClient);
  await prefetchArticles(tsrQueryClient, SITE_ID, params);
  return (
    <main className="min-h-screen w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ArticlesView siteId={SITE_ID} />
      </HydrationBoundary>
    </main>
  );
}
