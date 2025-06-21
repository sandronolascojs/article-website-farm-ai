import { fetchAllArticles, fetchCategories } from '@/lib/api';

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export async function GET() {
  const articles = await fetchAllArticles(SITE_ID);
  const categories = await fetchCategories(SITE_ID);

  const urls = [
    SITE_URL,
    ...categories.map((category) => `${SITE_URL}/${encodeURIComponent(category.slug)}`),
    ...articles.map(
      (article) =>
        `${SITE_URL}/${encodeURIComponent(article.category.slug)}/${article.articleSlug}`,
    ),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `<url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
