import z from 'zod';

export const articleHealthFoodAgentOutputSchema = z.object({
  title: z.string(),
  content: z.array(z.string()),
  keywords: z.array(z.string()),
  summary: z.string(),
  imagePrompt: z.string(),
  slug: z.string(),
  category: z.string(),
});
