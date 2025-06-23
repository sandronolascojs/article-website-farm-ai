import { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import { prefetchArticlesFromCategory } from '@/hooks/http/articles/useArticlesFromCategory';
import { CategoryArticlesView } from '@/views/categories/CategoryArticlesView';
import { queryClient } from '@/lib/queryClient';
import { defaultSearchParamsCache } from '@/lib/defaultSearchParamsCache';
import { env } from '../../../env.mjs';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Record<string, string | string[] | undefined>;
}

const SITE_ID = env.NEXT_PUBLIC_SITE_ID;
const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const title = `Category: ${category}`;
  const url = `${SITE_URL}/${encodeURIComponent(category)}`;
  return {
    title,
    description: `Read all articles in the ${category} category.`,
    openGraph: {
      title,
      description: `Read all articles in the ${category} category.`,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Read all articles in the ${category} category.`,
    },
    alternates: { canonical: url },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const tsrQueryClient = tsr.initQueryClient(queryClient);
  const queryParams = defaultSearchParamsCache.parse(searchParams);

  await prefetchArticlesFromCategory(tsrQueryClient, SITE_ID, category, queryParams);
  return (
    <main className="min-h-screen w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryArticlesView siteId={SITE_ID} categorySlug={category} />
      </HydrationBoundary>
    </main>
  );
}
