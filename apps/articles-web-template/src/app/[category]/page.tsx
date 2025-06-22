import { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import { prefetchArticlesFromCategory } from '@/hooks/http/articles/useArticlesFromCategory';
import { categoryArticlesViewSearchParamsCache } from '@/lib/searchParamsCacheTypes/categoryArticlesViewCache';
import { CategoryArticlesView } from '@/views/categories/CategoryArticlesView';
import { queryClient } from '@/lib/queryClient';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Record<string, string | string[] | undefined>;
}

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

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
  const { page, limit, orderBy } = categoryArticlesViewSearchParamsCache.parse(searchParams);
  await prefetchArticlesFromCategory(tsrQueryClient, SITE_ID, category, {
    page,
    limit,
    orderBy,
  });
  return (
    <main className="min-h-screen w-full bg-white">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryArticlesView
          siteId={SITE_ID}
          categorySlug={category}
          page={page}
          limit={limit}
          orderBy={orderBy}
        />
      </HydrationBoundary>
    </main>
  );
}
