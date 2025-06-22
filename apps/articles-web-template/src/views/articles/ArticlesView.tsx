'use client';
import React, { useEffect, useState } from 'react';
import { useArticles } from '@/hooks/http/articles/useArticles';
import { ArticleCard } from '@/components/ArticleCard';
import { Pagination } from '@/components/Pagination';
import type { Article } from '@auto-articles/types';
import { useQueryStates } from 'nuqs';
import { parseAsInteger, parseAsString, parseAsStringLiteral } from 'nuqs/server';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/queryParams.constants';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

interface ArticlesViewProps {
  siteId: string;
}

type OrderBy = 'newest' | 'oldest';
const orderByOptions: OrderBy[] = ['newest', 'oldest'];

interface ArticlesFiltersProps {
  search: string;
  orderBy: OrderBy;
  onSearchChange: (value: string) => void;
  onOrderByChange: (value: OrderBy) => void;
  onClear: () => void;
}

const ArticlesFilters = ({
  search,
  orderBy,
  onSearchChange,
  onOrderByChange,
  onClear,
}: ArticlesFiltersProps) => {
  const [inputValue, setInputValue] = useState(search);

  const debouncedSearch = useDebouncedCallback<(value: string) => void, [string]>((value) => {
    onSearchChange(value);
  }, 600);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  return (
    <div className="flex flex-col md:flex-row md:items-end md:gap-4 gap-2 mb-8 justify-between w-full">
      <div className="flex flex-col w-full md:w-1/2 gap-1">
        <Label htmlFor="articles-search-input" className="mb-1">
          Search
        </Label>
        <Input
          id="articles-search-input"
          className="w-full"
          placeholder="Search articles..."
          value={inputValue}
          onChange={handleInputChange}
          type="search"
          inputMode="search"
          aria-label="Search articles"
          autoComplete="off"
          role="searchbox"
        />
      </div>
      <div className="flex flex-row w-full md:w-auto gap-2 items-end mt-2 md:mt-0 justify-end">
        <div className="flex flex-col gap-1">
          <Label htmlFor="articles-orderby-select" className="mb-1">
            Order by
          </Label>
          <Select
            value={orderBy}
            onValueChange={(value: string) => onOrderByChange(value as OrderBy)}
          >
            <SelectTrigger
              id="articles-orderby-select"
              aria-label="Order articles by"
              className="w-40"
            >
              <SelectValue placeholder="Order by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={onClear} aria-label="Clear filters" className="h-10">
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export const ArticlesView = ({ siteId }: ArticlesViewProps) => {
  const [{ page, limit, search, orderBy }, setQuery] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
    search: parseAsString.withDefault(''),
    orderBy: parseAsStringLiteral(orderByOptions).withDefault('newest'),
  });

  const { data, isLoading, error } = useArticles(siteId, {
    page,
    limit,
    search,
    orderBy,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading articles</div>;

  const articles: Article[] = data?.items || [];
  const meta = data?.meta || { totalPages: 1 };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              All Articles
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Browse our full collection of articles
            </p>
          </div>
          <ArticlesFilters
            search={search}
            orderBy={orderBy}
            onSearchChange={(value) => setQuery({ search: value, page: 1 })}
            onOrderByChange={(value) => setQuery({ orderBy: value, page: 1 })}
            onClear={() => setQuery({ search: '', orderBy: 'newest', page: 1 })}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {articles.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground">
                No articles found.
              </div>
            ) : (
              articles.map((article: Article) => (
                <ArticleCard key={article.articleSlug} article={article} />
              ))
            )}
          </div>
        </div>
      </section>
      <Pagination totalPages={meta.totalPages} />
    </div>
  );
};
