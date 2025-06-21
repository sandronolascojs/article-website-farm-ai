import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { tsr } from '@/lib/tsrClient';
import { prefetchCategories, useCategories } from '@/hooks/http/categories/useCategories';

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';

function CategoriesList() {
  const { data } = useCategories(SITE_ID);
  const categories = data?.body?.items || [];
  return (
    <main className="flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${encodeURIComponent(category.slug)}`}
            className="no-underline"
          >
            <Badge className="text-lg px-4 py-2 cursor-pointer hover:bg-primary/80">
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default async function CategoriesPage() {
  const queryClient = new QueryClient();
  const tsrQueryClient = tsr.initQueryClient(queryClient);
  await prefetchCategories(tsrQueryClient, SITE_ID);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesList />
    </HydrationBoundary>
  );
}
