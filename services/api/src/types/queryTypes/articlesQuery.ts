import { Pagination } from '@auto-articles/utils';

export interface ArticlesQuery extends Pagination {
  search?: string;
  orderBy?: 'newest' | 'oldest';
}
