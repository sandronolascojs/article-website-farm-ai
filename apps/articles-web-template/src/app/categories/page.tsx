import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import { prefetchCategories } from '@/hooks/http/categories/useCategories';
import { queryClient } from '@/lib/queryClient';
import { Metadata } from 'next';
import { CategoriesView } from '@/views/categories/CategoriesView';
import { defaultSearchParamsCache } from '@/lib/defaultSearchParamsCache';
import { env } from '../../../env.mjs';

const SITE_ID = env.NEXT_PUBLIC_SITE_ID;
const SITE_NAME = env.NEXT_PUBLIC_SITE_NAME;
const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: `Categories | ${SITE_NAME}`,
  description: `Browse all categories from ${SITE_NAME}.`,
  openGraph: {
    title: `Categories | ${SITE_NAME}`,
    description: `Browse all categories from ${SITE_NAME}.`,
    url: `${SITE_URL}/categories`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Categories | ${SITE_NAME}`,
    description: `Browse all categories from ${SITE_NAME}.`,
  },
  alternates: { canonical: `${SITE_URL}/categories` },
};

interface CategoriesPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const queryParams = defaultSearchParamsCache.parse(searchParams);
  const tsrQueryClient = tsr.initQueryClient(queryClient);
  await prefetchCategories(tsrQueryClient, SITE_ID, queryParams);

  return (
    <main className="min-h-screen w-full bg-white">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoriesView siteId={SITE_ID} />
      </HydrationBoundary>
    </main>
  );
}
