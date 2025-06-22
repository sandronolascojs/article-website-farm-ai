import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import type { OrderBy } from '@auto-articles/utils';
import { useEffect, useState } from 'react';

interface ArticlesFiltersProps {
  search: string;
  orderBy: OrderBy;
  onSearchChange: (value: string) => void;
  onOrderByChange: (value: OrderBy) => void;
  onClear: () => void;
}

export const ArticlesFilters = ({
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
