import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import { prefetchArticlesFromCategory } from '@/hooks/http/articles/useArticlesFromCategory';
import { Metadata } from 'next';
import { queryClient } from '@/lib/queryClient';
import { CategoryArticlesView } from '@/views/categories/CategoryArticlesView';
import { defaultSearchParamsCache } from '@/lib/defaultSearchParamsCache';

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'My Articles';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const title = `Category: ${categorySlug} | ${SITE_NAME}`;
  const url = `${SITE_URL}/categories/${encodeURIComponent(categorySlug)}`;
  return {
    title,
    description: `Browse all articles in the ${categorySlug} category from ${SITE_NAME}.`,
    openGraph: {
      title,
      description: `Browse all articles in the ${categorySlug} category from ${SITE_NAME}.`,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Browse all articles in the ${categorySlug} category from ${SITE_NAME}.`,
    },
    alternates: { canonical: url },
  };
}

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { categorySlug } = await params;
  const queryParams = defaultSearchParamsCache.parse(searchParams);
  const tsrQueryClient = tsr.initQueryClient(queryClient);

  await prefetchArticlesFromCategory(tsrQueryClient, SITE_ID, categorySlug, queryParams);

  return (
    <main className="min-h-screen w-full bg-white">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryArticlesView siteId={SITE_ID} categorySlug={categorySlug} />
      </HydrationBoundary>
    </main>
  );
}
