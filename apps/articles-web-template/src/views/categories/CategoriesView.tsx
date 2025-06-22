'use client';

import { useCategories } from '@/hooks/http/categories/useCategories';
import { DEFAULT_PAGINATION_QUERY } from '@/constants/queryParams.constants';
import { CategoryCard } from '@/components/CategoryCard';

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
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <CategoryCard key={category.categoryId} category={category} />
        ))}
      </div>
    </main>
  );
};
