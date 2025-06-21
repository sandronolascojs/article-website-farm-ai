import { z } from 'zod';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export const paginationMetaSchema = z.object({
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  itemsPerPage: z.number(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().default(DEFAULT_PAGE),
  limit: z.coerce.number().default(DEFAULT_LIMIT),
});

export type Pagination = z.infer<typeof paginationSchema>;
export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
