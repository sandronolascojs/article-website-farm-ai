import type { Article } from '@auto-articles/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import Avvvatars from 'avvvatars-react';
import { Badge } from './ui/badge';

interface Props {
  article: Article;
}

const AuthorAvatar = ({ author }: { author: string }) => {
  return (
    <div className="flex items-center space-x-2 flex-nowrap max-w-[140px]">
      <div className="!rounded-none overflow-visible">
        <Avvvatars value={author} style="shape" size={24} />
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground truncate whitespace-nowrap block">
        {author}
      </span>
    </div>
  );
};

export const ArticleCard = ({ article }: Props) => {
  const articleUrl = `/${encodeURIComponent(article.category.slug)}/${article.articleSlug}`;

  return (
    <Link href={articleUrl} className="block group" prefetch={false}>
      <article className="bg-card rounded-md border border-border transition-shadow duration-300 flex flex-col">
        <div className="aspect-[16/9] overflow-hidden rounded-t-xl">
          <img
            src={article.imageUrl || '/placeholder.svg'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 sm:p-6 flex flex-col flex-1 gap-3">
          <div className="flex items-center justify-between">
            <Badge>{article.category.name}</Badge>
            <time
              className="text-xs sm:text-sm text-muted-foreground"
              dateTime={article.publishedAt}
            >
              {format(new Date(article.publishedAt), 'MMMM d, yyyy')}
            </time>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <h3 className="text-lg sm:text-xl font-bold text-primary line-clamp-2">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base line-clamp-3">
              {article.summary}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <AuthorAvatar author={article.author} />
            <span className="flex items-center space-x-1 text-primary group-hover:text-primary-foreground transition-colors font-medium text-xs sm:text-base">
              <span>Read more</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
