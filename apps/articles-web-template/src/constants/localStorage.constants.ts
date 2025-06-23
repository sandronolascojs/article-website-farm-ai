import { env } from '../../env.mjs';

const APP_NAME = env.NEXT_PUBLIC_SITE_NAME;

export const THEME_STORAGE_KEY = `@${APP_NAME}-theme`;
