import { env } from '../../env.mjs';

const SITE_ID = env.NEXT_PUBLIC_SITE_ID;

export const THEME_STORAGE_KEY = `@${SITE_ID}-theme`;
