import { categorySchema } from '@auto-articles/types';
import { errorsSchema, paginationMetaSchema, paginationSchema } from '@auto-articles/utils';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const contract = initContract();

export const categories = contract.router({
  getCategories: {
    method: 'GET',
    path: '/:websiteId/categories',
    query: paginationSchema,
    pathParams: z.object({
      websiteId: z.string(),
    }),
    responses: {
      200: z.object({
        items: z.array(categorySchema),
        meta: paginationMetaSchema,
      }),
      ...errorsSchema,
    },
  },
  getCategoryBySlug: {
    method: 'GET',
    path: '/:websiteId/categories/:slug',
    pathParams: z.object({
      websiteId: z.string(),
      slug: z.string(),
    }),
    responses: {
      200: categorySchema,
      ...errorsSchema,
    },
  },
});
