import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_API_BASE: z.string().url(),
    NEXT_PUBLIC_SITE_ID: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_AD_CLIENT: z.string(),
    NEXT_PUBLIC_SITE_NAME: z.string(),
    NEXT_PUBLIC_SITE_BANNER: z.string(),
    NEXT_PUBLIC_API_BASE: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
    NEXT_PUBLIC_SITE_ID: process.env.NEXT_PUBLIC_SITE_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_AD_CLIENT: process.env.NEXT_PUBLIC_AD_CLIENT,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_BANNER: process.env.NEXT_PUBLIC_SITE_BANNER,
  },
});
