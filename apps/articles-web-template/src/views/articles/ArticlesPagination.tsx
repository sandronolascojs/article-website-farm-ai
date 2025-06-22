import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import React, { useMemo } from 'react';

interface ArticlesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPaginationRange(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  const visiblePages = 5;
  const pages: (number | 'ellipsis')[] = [];

  if (totalPages <= visiblePages + 2) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  const showLeftEllipsis = currentPage > 3;
  const showRightEllipsis = currentPage < totalPages - 2;

  pages.push(1);

  if (showLeftEllipsis) {
    pages.push('ellipsis');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (showRightEllipsis) {
    pages.push('ellipsis');
  }

  pages.push(totalPages);

  return pages;
}

export const ArticlesPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ArticlesPaginationProps) => {
  const pages = useMemo(
    () => getPaginationRange(currentPage, totalPages),
    [currentPage, totalPages],
  );
  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            aria-disabled={currentPage <= 1}
          />
        </PaginationItem>
        {pages.map((page, idx) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => page !== currentPage && onPageChange(Number(page))}
                aria-current={page === currentPage ? 'page' : undefined}
                href="#"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
