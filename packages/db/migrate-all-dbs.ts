import { execSync } from 'child_process';
import { env } from './src/config/env.config';

const dbUrls: string[] = [
  env.HEALTH_FOOD_BLOG_DATABASE_URL,
]

dbUrls.forEach((url, idx) => {
  console.log(`\nMigrating database #${idx + 1}: ${url}`);
  execSync(
    `DATABASE_URL="${url}" npx drizzle-kit push --config=drizzle.config.ts`,
    { stdio: 'inherit' }
  );
}); 