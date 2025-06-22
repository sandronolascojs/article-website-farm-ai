import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { OrderBy } from '@/constants/queryParams.constants';
import { parseAsInteger, parseAsStringLiteral } from 'nuqs/server';
import { ORDER_BY_OPTIONS } from '@/constants/queryParams.constants';
import { useQueryStates } from 'nuqs';
import { PaginationMeta } from '@auto-articles/utils';

interface CategoryArticlesPaginationProps {
  meta: PaginationMeta;
  orderBy: OrderBy;
}

export const CategoryArticlesPagination = ({ meta, orderBy }: CategoryArticlesPaginationProps) => {
  const [searchParams, setSearchParams] = useQueryStates({
    page: parseAsInteger,
    limit: parseAsInteger,
    orderBy: parseAsStringLiteral(ORDER_BY_OPTIONS),
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage, limit: meta.itemsPerPage, orderBy });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => meta.currentPage > 1 && handlePageChange(meta.currentPage - 1)}
            aria-disabled={meta.currentPage <= 1}
            aria-label="Previous page"
          />
        </PaginationItem>
        {[...Array(meta.totalPages)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={meta.currentPage === i + 1}
              aria-current={meta.currentPage === i + 1 ? 'page' : undefined}
              aria-label={`Go to page ${i + 1}`}
            >
              <button
                type="button"
                onClick={() => handlePageChange(i + 1)}
                className={meta.currentPage === i + 1 ? 'font-bold' : ''}
              >
                {i + 1}
              </button>
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              meta.currentPage < meta.totalPages && handlePageChange(meta.currentPage + 1)
            }
            aria-disabled={meta.currentPage >= meta.totalPages}
            aria-label="Next page"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
