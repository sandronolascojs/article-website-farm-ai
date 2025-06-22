import type { Article } from '@auto-articles/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import Avvvatars from 'avvvatars-react';
import { Badge } from './ui/badge';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  const articleUrl = `/${encodeURIComponent(article.category.slug)}/${article.articleSlug}`;

  return (
    <Link href={articleUrl} className="block group" prefetch={false}>
      <article className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300 group-hover:shadow-lg h-[420px] sm:h-[500px] flex flex-col">
        <div className="aspect-[16/9] overflow-hidden rounded-t-xl">
          <img
            src={article.imageUrl || '/placeholder.svg'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 sm:p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <Badge>{article.category.name}</Badge>
            <time className="text-xs sm:text-sm text-gray-500" dateTime={article.publishedAt}>
              {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
            </time>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-2 sm:mb-4 line-clamp-3">
            {article.summary}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-2">
              <Avvvatars value={article.author} style="shape" />
              <span className="text-xs sm:text-sm text-gray-700">{article.author}</span>
            </div>
            <span className="flex items-center space-x-1 text-gray-900 group-hover:text-blue-600 transition-colors font-medium text-xs sm:text-base">
              <span>Read more</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
