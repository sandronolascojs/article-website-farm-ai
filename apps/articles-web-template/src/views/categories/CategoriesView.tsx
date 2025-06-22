'use client';

import { useCategories } from '@/hooks/http/categories/useCategories';
import { CategoryCard } from '@/components/CategoryCard';
import { defaultSearchParamsConfig } from '@/lib/defaultSearchParamsCache';
import { useQueryStates } from 'nuqs';

interface CategoriesViewProps {
  siteId: string;
}

export const CategoriesView = ({ siteId }: CategoriesViewProps) => {
  const [params] = useQueryStates(defaultSearchParamsConfig);
  const { data, isLoading, isError } = useCategories(siteId, params);
  const categories = data?.items || [];
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <main className="flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <CategoryCard key={category.categoryId} category={category} />
        ))}
      </div>
    </main>
  );
};
