import { articleSchema } from '@auto-articles/types';
import {
  errorsSchema,
  ORDER_BY_OPTIONS,
  paginationMetaSchema,
  paginationSchema,
} from '@auto-articles/utils';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const contract = initContract();

const articlesQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  orderBy: z.enum(ORDER_BY_OPTIONS).optional(),
});

export const articles = contract.router({
  getArticlesFromCategory: {
    method: 'GET',
    path: '/:websiteId/categories/:categorySlug/articles',
    query: paginationSchema,
    pathParams: z.object({
      websiteId: z.string(),
      categorySlug: z.string(),
    }),
    responses: {
      200: z.object({
        items: z.array(articleSchema),
        meta: paginationMetaSchema,
      }),
      ...errorsSchema,
    },
  },
  getArticlesByWebsiteId: {
    method: 'GET',
    path: '/:websiteId/articles',
    query: articlesQuerySchema,
    pathParams: z.object({
      websiteId: z.string(),
    }),
    responses: {
      200: z.object({
        items: z.array(articleSchema),
        meta: paginationMetaSchema,
      }),
      ...errorsSchema,
    },
  },
  getArticle: {
    method: 'GET',
    path: '/:websiteId/articles/:articleSlug',
    pathParams: z.object({
      websiteId: z.string(),
      articleSlug: z.string(),
    }),
    responses: {
      200: articleSchema,
      ...errorsSchema,
    },
  },
});
