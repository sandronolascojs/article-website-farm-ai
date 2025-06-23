import type { Article } from '@auto-articles/types';
import { format } from 'date-fns';
import { Calendar, NewspaperIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Props {
  featuredArticle: Article;
}

export const HeroSection = ({ featuredArticle }: Props) => {
  const articleUrl = `/${encodeURIComponent(featuredArticle.category.slug)}/${featuredArticle.articleSlug}`;
  return (
    <section className="bg-gradient-to-r from-background to-muted py-10 sm:py-12 md:py-16">
      <div className="w-full px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6">
            <Badge>Featured Article</Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              {featuredArticle.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {featuredArticle.summary}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-4 w-4" />
                <span>{featuredArticle.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(featuredArticle.publishedAt), 'MMMM d, yyyy')}</span>
              </div>
            </div>
            <Button variant="default" asChild>
              <Link
                href={articleUrl}
                prefetch={false}
                aria-label={`Read article: ${featuredArticle.title}`}
              >
                <NewspaperIcon className="h-4 w-4" />
                Read Article
              </Link>
            </Button>
          </div>
          <div className="lg:order-first mt-6 lg:mt-0">
            <img
              src={featuredArticle.imageUrl || '/placeholder.svg'}
              alt={featuredArticle.title}
              className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
