import type { Category } from '@auto-articles/types';
import { CategoryCard } from './CategoryCard';
import { AdComponent } from './AdComponent';
import { AD_SLOTS } from '@/constants/ads.constants';
import React from 'react';

interface Props {
  categories: Category[];
}

export const CategoriesSection = ({ categories }: Props) => {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-background">
      <div className="w-full px-4 sm:px-8 md:px-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
            Explore Categories
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Discover articles across different topics
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {categories.map((category, idx) => (
            <React.Fragment key={category.categoryId + '-' + idx}>
              <CategoryCard category={category} />
              {idx === 3 && (
                <div className="col-span-full flex justify-center my-6">
                  <AdComponent
                    adSlot={AD_SLOTS.CATEGORIES_SECTION_INLINE_1}
                    style={{ width: 728, height: 90 }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
