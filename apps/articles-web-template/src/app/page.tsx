import { HeroSection } from '@/components/HeroSection';
import { ArticleCard } from '@/components/ArticleCard';
import { CategoriesSection } from '@/components/CategoriesSection';
import { Footer } from '@/components/Footer';
import { fetchAllArticles, fetchCategories } from '@/lib/api';
import { Metadata } from 'next';
import { Header } from '@/components/Header';

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || 'default';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'My Articles';
const SITE_BANNER = process.env.NEXT_PUBLIC_SITE_BANNER || '/banner.jpg';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

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
    <div className="min-h-screen bg-white">
      <Header />
      {featuredArticle && <HeroSection featuredArticle={featuredArticle} />}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-600">Stay up to date with our newest content</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentArticles.map((article) => (
              <ArticleCard key={article.articleSlug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <CategoriesSection categories={categories} />
      <Footer />
    </div>
  );
}
