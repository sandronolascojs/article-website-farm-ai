import { HeroSection } from '@/components/HeroSection';
import { ArticleCard } from '@/components/ArticleCard';
import { CategoriesSection } from '@/components/CategoriesSection';
import { fetchAllArticles, fetchCategories } from '@/lib/api';
import { Metadata } from 'next';
import { env } from '../../env.mjs';

const SITE_ID = env.NEXT_PUBLIC_SITE_ID;
const SITE_NAME = env.NEXT_PUBLIC_SITE_NAME;
const SITE_BANNER = env.NEXT_PUBLIC_SITE_BANNER;
const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: SITE_NAME,
  description: `Read the latest articles from ${SITE_NAME}.`,
  openGraph: {
    title: SITE_NAME,
    description: `Read the latest articles from ${SITE_NAME}.`,
    url: SITE_URL,
    images: [SITE_BANNER],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: `Read the latest articles from ${SITE_NAME}.`,
    images: [SITE_BANNER],
  },
  alternates: { canonical: SITE_URL },
};

export default async function HomePage() {
  const articles = await fetchAllArticles(SITE_ID);
  const categories = await fetchCategories(SITE_ID);
  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1, 5);

  return (
    <main className="min-h-screen w-full">
      {featuredArticle && <HeroSection featuredArticle={featuredArticle} />}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="w-full px-4 sm:px-8 md:px-12">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 sm:mb-4">
              Latest Articles
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Stay up to date with our newest content
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {recentArticles.map((article) => (
              <ArticleCard key={article.articleSlug} article={article} />
            ))}
          </div>
        </div>
      </section>
      <CategoriesSection categories={categories} />
    </main>
  );
}
