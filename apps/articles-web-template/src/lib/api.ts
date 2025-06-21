import { type Article, type Category } from '@auto-articles/types';
import { ClientInferResponseBody } from '@ts-rest/core';
import { type contract } from '@auto-articles/ts-rest';

type ArticlesResponse = ClientInferResponseBody<
  typeof contract.articlesContract.getArticlesByWebsiteId,
  200
>;

export async function fetchAllArticles(siteId: string): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/${siteId}/articles`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ArticlesResponse;
    return data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
}

type ArticleResponse = ClientInferResponseBody<typeof contract.articlesContract.getArticle, 200>;
export async function fetchArticle(siteId: string, slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/${siteId}/articles/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as ArticleResponse;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

type CategoriesResponse = ClientInferResponseBody<
  typeof contract.categoriesContract.getCategories,
  200
>;

export async function fetchCategories(siteId: string): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/${siteId}/categories`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as CategoriesResponse;
    return data.items;
  } catch (error) {
    console.error(error);
    return [];
  }
}

type PaginatedArticlesResponse = ClientInferResponseBody<
  typeof contract.articlesContract.getArticlesByWebsiteId,
  200
>;

export async function fetchPaginatedArticles(
  siteId: string,
  page: number = 1,
  pageSize: number = 12,
): Promise<PaginatedArticlesResponse> {
  try {
    const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/${siteId}/articles?${params.toString()}`,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    if (!res.ok)
      return {
        items: [],
        meta: { currentPage: page, itemsPerPage: pageSize, totalPages: 1, totalItems: 0 },
      };
    const data = (await res.json()) as PaginatedArticlesResponse;
    return data;
  } catch (error) {
    console.error(error);
    return {
      items: [],
      meta: { currentPage: page, itemsPerPage: pageSize, totalPages: 1, totalItems: 0 },
    };
  }
}
