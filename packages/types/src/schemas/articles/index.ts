import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string(),
  htmlContent: z.array(z.string()),
  summary: z.string(),
  keywords: z.array(z.string()),
  imageUrl: z.string().optional(),
  articleSlug: z.string(),
  category: z.object({
    name: z.string(),
    slug: z.string(),
  }),
  websiteId: z.string(),
  author: z.string(),
  authorAvatar: z.string().optional(),
  publishedAt: z.string(),
});

export type Article = z.infer<typeof articleSchema>;
