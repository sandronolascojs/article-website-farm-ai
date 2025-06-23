import type { Category } from '@auto-articles/types';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from './ui/card';
import { Layers } from 'lucide-react';

interface Props {
  category: Category;
}

export const CategoryCard = ({ category }: Props) => {
  const categoryUrl = `/categories/${encodeURIComponent(category.slug)}`;

  return (
    <Link href={categoryUrl} className="block group" prefetch={false}>
      <Card className="border-border w-full max-w-xs p-0">
        <div className="relative w-full h-40 overflow-hidden rounded-t-xl">
          <img
            src={category.imageUrl || '/file.svg'}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 bg-muted rounded-full p-2 shadow-md flex items-center justify-center">
            <Layers className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <CardContent className="flex flex-col justify-center flex-1 px-5 pb-4 gap-1">
          <CardTitle className="text-lg font-extrabold text-primary group-hover:text-primary-foreground transition-colors line-clamp-2">
            {category.name}
          </CardTitle>
          <span className="text-muted-foreground text-base font-medium">
            {category.totalArticles} article{category.totalArticles !== 1 ? 's' : ''}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};
