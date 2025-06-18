import { z } from "zod";

export const ArticleHealthFoodOutput = z.object({
  title: z.string(),
  content: z.array(z.string()),
  keywords: z.array(z.string()),
  summary: z.string(),
  imageUrl: z.string().optional(),
  slug: z.string(),
  category: z.string(),
});

