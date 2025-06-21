import type { Article } from '@auto-articles/types';
import { ArrowRight } from 'lucide-react';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  return (
    <article className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300">
      <div className="aspect-video overflow-hidden rounded-t-xl">
        <img
          src={article.imageUrl || '/placeholder.svg'}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
            {article.category.name}
          </span>
          <time className="text-sm text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </time>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={article.authorAvatar || '/placeholder.svg'}
              alt={article.author}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-700">{article.author}</span>
          </div>
          <button className="flex items-center space-x-1 text-gray-900 hover:text-blue-600 transition-colors font-medium">
            <span>Read more</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
