import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import { prefetchCategories } from '@/hooks/http/categories/useCategories';
import { queryClient } from '@/lib/queryClient';
import { Metadata } from 'next';
import { CategoriesView } from '@/views/categories/CategoriesView';

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'My Articles';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

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

export default async function CategoriesPage() {
  const tsrQueryClient = tsr.initQueryClient(queryClient);
  await prefetchCategories(tsrQueryClient, SITE_ID);
  return (
    <main className="min-h-screen w-full bg-white">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoriesView siteId={SITE_ID} />
      </HydrationBoundary>
    </main>
  );
}
