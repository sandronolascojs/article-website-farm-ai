import type { Article } from '@auto-articles/types';
import { Calendar, User } from 'lucide-react';

interface Props {
  featuredArticle: Article;
}

export const HeroSection = ({ featuredArticle }: Props) => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Featured Article
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {featuredArticle.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">{featuredArticle.summary}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{featuredArticle.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(featuredArticle.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Read Article
            </button>
          </div>
          <div className="lg:order-first">
            <img
              src={featuredArticle.imageUrl || '/placeholder.svg'}
              alt={featuredArticle.title}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
