'use client';

import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useCategories } from '@/hooks/http/categories/useCategories';
import { DEFAULT_PAGINATION_QUERY } from '@/constants/queryParams.constants';

interface CategoriesViewProps {
  siteId: string;
}

export const CategoriesView = ({ siteId }: CategoriesViewProps) => {
  const { data, isLoading, isError } = useCategories(siteId, DEFAULT_PAGINATION_QUERY);
  const categories = data?.items || [];
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

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
};
