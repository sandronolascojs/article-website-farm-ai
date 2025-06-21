import { dbManager, defaultConfigs } from './index';
import { websites } from './src/schema/websites';
import { eq } from 'drizzle-orm';
import { WebsiteId } from '@auto-articles/types';

const websitesSeed: Array<{
  websiteId: string;
  name: string;
  url: string;
  description?: string;
  banner?: string;
  logo?: string;
  favicon?: string;
  language?: string;
}> = [
  {
    websiteId: WebsiteId.HEALTH_FOOD_BLOG,
    name: 'Health Food Blog',
    url: 'https://healthfood.example.com',
    description: 'A blog about healthy food',
    banner: '',
    logo: '',
    favicon: '',
    language: 'en-US',
  },
];

async function seedWebsites() {
  await dbManager.initialize(defaultConfigs);

  for (const config of defaultConfigs) {
    console.log(`\nSeeding websites in database: ${config.name}`);
    const db = dbManager.getConnection(config.name);

    for (const website of websitesSeed) {
      const existing = await db
        .select()
        .from(websites)
        .where(eq(websites.websiteId, website.websiteId))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(websites).values(website);
        console.log(`Inserted website: ${website.name}`);
      } else {
        console.log(`Website already exists: ${website.name}`);
      }
    }
  }

  await dbManager.closeAll();
  console.log('✅ Seed finished');
}

seedWebsites().catch((err) => {
  console.error('❌ Seed failed', err);
  process.exit(1);
});
