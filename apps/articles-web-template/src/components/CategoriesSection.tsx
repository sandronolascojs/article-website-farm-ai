import type { Category } from '@auto-articles/types';
import { BookOpen } from 'lucide-react';

interface Props {
  categories: Category[];
}

export const CategoriesSection = ({ categories }: Props) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
          <p className="text-xl text-gray-600">Discover articles across different topics</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.categoryId}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-gray-400">{category.totalArticles}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600">
                {category.totalArticles} article{category.totalArticles !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
