import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import { prefetchArticles } from '@/hooks/http/articles/useArticles';
import { ArticlesView } from '@/views/articles/ArticlesView';
import { searchParamsCache } from '@/lib/searchParamsCache';
import { Metadata } from 'next';
import { queryClient } from '@/lib/queryClient';

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'My Articles';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

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
  const { page, limit } = searchParamsCache.parse(searchParams);
  const tsrQueryClient = tsr.initQueryClient(queryClient);

  await prefetchArticles(tsrQueryClient, SITE_ID, { page, limit });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlesView siteId={SITE_ID} />
    </HydrationBoundary>
  );
}
