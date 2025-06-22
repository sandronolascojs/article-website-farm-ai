import { z } from 'zod';

export const categorySchema = z.object({
  categoryId: z.string(),
  name: z.string(),
  slug: z.string(),
  totalArticles: z.number(),
  imageUrl: z.string().optional(),
});

export type Category = z.infer<typeof categorySchema>;
