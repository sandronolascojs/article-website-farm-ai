import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useArticles } from '@/hooks/http/articles/useArticles';

interface Article {
  articleSlug: string;
  title: string;
  imageUrl?: string;
}

interface SearchBarProps {
  siteId: string;
  search: string;
  setSearch: (v: string) => void;
  searchFocused: boolean;
  setSearchFocused: (v: boolean) => void;
  onResultClick?: () => void;
}

export const SearchBar = ({
  siteId,
  search,
  setSearch,
  searchFocused,
  setSearchFocused,
  onResultClick,
}: SearchBarProps) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [listHovered, setListHovered] = useState(false);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [search]);

  const { data, error, isLoading } = useArticles(siteId, { search: debouncedSearch, limit: 5 });
  const articles: Article[] = data?.items || [];

  // Hide the list only if neither the input nor the list is focused/hovered
  const showList = search && (searchFocused || listHovered) && articles.length > 0;

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setTimeout(() => setSearchFocused(false), 100)}
        className="pl-10 pr-4 py-2 w-full"
        aria-label="Search articles"
        autoComplete="off"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      {showList && (
        <ul
          ref={resultsRef}
          className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
          onMouseEnter={() => setListHovered(true)}
          onMouseLeave={() => setListHovered(false)}
        >
          {articles.map((article) => (
            <li key={article.articleSlug}>
              <Link
                href={`/articles/${article.articleSlug}`}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-gray-900"
                onClick={() => {
                  setSearch('');
                  if (onResultClick) onResultClick();
                }}
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-8 h-8 object-cover rounded"
                  />
                )}
                <span className="truncate">{article.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
