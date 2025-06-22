export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_PAGINATION_QUERY = {
  page: DEFAULT_PAGE,
  limit: DEFAULT_PAGE_SIZE,
};

export const ORDER_BY_OPTIONS = ['newest', 'oldest'] as const;
export type OrderBy = (typeof ORDER_BY_OPTIONS)[number];
