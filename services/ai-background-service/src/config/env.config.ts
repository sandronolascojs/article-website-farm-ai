import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string({ required_error: 'OPENAI_API_KEY is required' }),
    PORT: z.coerce.number().default(8000),
    APP_ENV: z.enum(['development', 'production']).default('development'),
    HEALTH_FOOD_BLOG_DATABASE_URL: z.string({ required_error: 'HEALTH_FOOD_BLOG_DATABASE_URL is required' }),
  },
  runtimeEnvStrict: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PORT: process.env.PORT,
    APP_ENV: process.env.APP_ENV,
    HEALTH_FOOD_BLOG_DATABASE_URL: process.env.HEALTH_FOOD_BLOG_DATABASE_URL,
  },
});