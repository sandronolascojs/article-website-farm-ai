'use client';
import { Button } from '@/components/ui/button';
import { useQueryState, parseAsInteger } from 'nuqs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DEFAULT_PAGE } from '@/constants/pagination.constants';
import React from 'react';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(DEFAULT_PAGE));
  const currentPage = page ?? DEFAULT_PAGE;

  const visiblePages = React.useMemo(() => {
    const maxVisible = 5;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisible && currentPage > 3 && currentPage < totalPages - 2) {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
    if (totalPages > maxVisible && currentPage <= 3) {
      startPage = 1;
      endPage = maxVisible;
    }
    if (totalPages > maxVisible && currentPage >= totalPages - 2) {
      startPage = totalPages - maxVisible + 1;
      endPage = totalPages;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const handlePageChange = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages) return;
    setPage(targetPage);
  };

  return (
    <nav className="w-full flex flex-col gap-2" aria-label="Pagination">
      <div className="w-full flex justify-center">
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {visiblePages.map((pageNum) => (
            <Button
              key={pageNum}
              variant={pageNum === currentPage ? 'default' : 'outline'}
              size="icon"
              onClick={() => handlePageChange(pageNum)}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-center md:justify-end items-center">
        <span className="text-gray-500 text-sm md:text-base select-none">
          Page {currentPage} of {totalPages} pages
        </span>
      </div>
    </nav>
  );
};
