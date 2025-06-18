import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    HEALTH_FOOD_BLOG_DATABASE_URL: z.string().url(),
    APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    HEALTH_FOOD_BLOG_DATABASE_URL: process.env.HEALTH_FOOD_BLOG_DATABASE_URL,
    APP_ENV: process.env.APP_ENV,
  },
  clientPrefix: '',
});
