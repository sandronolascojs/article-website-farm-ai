import type { Category } from '@auto-articles/types';
import { CategoryCard } from './CategoryCard';

interface Props {
  categories: Category[];
}

export const CategoriesSection = ({ categories }: Props) => {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gray-50">
      <div className="w-full px-4 sm:px-8 md:px-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Explore Categories
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Discover articles across different topics
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.categoryId} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
