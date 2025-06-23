# Articles Web Template

This app is a **Next.js-based template for building multi-site web article platforms**. It enables rapid creation and deployment of content-driven websites, leveraging AI to generate SEO-optimized articles and images. The platform is ideal for scalable, automated, and monetizable content sites.

See the [root README](../../README.md) for a high-level overview of the monorepo and its architecture.

---

## Features

- Multi-site support
- AI-powered article and image generation
- SEO best practices (Open Graph, Twitter cards, schema.org)
- Modern, responsive UI (Tailwind CSS, Radix UI)
- RESTful API integration
- Ad integration and cookie consent
- TypeScript, modular code, and SOLID principles

---

## Main Pages & Components

- **Home:** Featured and recent articles, top categories
- **Articles Listing:** Search, filter, and paginate all articles
- **Categories Listing:** Browse and filter categories
- **Article Detail:** SEO-optimized, markdown-rendered article pages
- **Category Articles:** View articles by category
- **UI Components:** Header, Footer, Sidebar, HeroSection, ArticleCard, CategoryCard, Pagination, CookieConsent, and more

---

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
2. **Set environment variables:**
   - Copy and configure `.env` or use `env.mjs` for required keys
3. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Customization & Theming

- Change site name, theme, and branding via environment variables
- Multiple color themes available (default, green, blue, violet, red, yellow)
- All text and UI are fully customizable

---

## Deployment

- Deploy on [Vercel](https://vercel.com/) or any platform supporting Next.js 15
- For production, ensure all environment variables are set and background jobs are running

---

## License

This app is licensed for commercial use. See the root README for more details.
