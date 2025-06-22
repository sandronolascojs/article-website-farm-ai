import type { Category } from '@auto-articles/types';
import { BookOpen } from 'lucide-react';

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
            <div
              key={category.categoryId}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 sm:p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <span className="text-lg sm:text-2xl font-bold text-gray-400">
                  {category.totalArticles}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {category.totalArticles} article{category.totalArticles !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
