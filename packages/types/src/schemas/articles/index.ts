import { z } from 'zod';

export const articleSchema = z.object({
  articleSlug: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  keywords: z.array(z.string()),
  category: z.object({
    name: z.string(),
    slug: z.string(),
  }),
  imageUrl: z.string().optional(),
  websiteId: z.string(),
  author: z.string(),
  publishedAt: z.string(),
});

export type Article = z.infer<typeof articleSchema>;
