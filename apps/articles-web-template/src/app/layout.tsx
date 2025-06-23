import { cn } from '@/lib/utils';
import { CookieConsent } from '@/components/CookieConsent';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { QueryProvider } from '@/components/QueryProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { THEME_STORAGE_KEY } from '@/constants/localStorage.constants';
import { env } from '../../env.mjs';
import { Inter } from 'next/font/google';
import { SystemDarkModeListener } from '@/components/SystemDarkModeListener';
import '@/styles/globals.default.css';
import '@/styles/globals.green.css';
import '@/styles/globals.blue.css';
import '@/styles/globals.violet.css';
import '@/styles/globals.red.css';
import '@/styles/globals.yellow.css';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        <meta name="google-adsense-account" content={env.NEXT_PUBLIC_ADSENSE_CLIENT} />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={cn(inter.className, 'min-h-screen antialiased')}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme={env.NEXT_PUBLIC_THEME}
          enableSystem
          disableTransitionOnChange
          storageKey={THEME_STORAGE_KEY}
          themes={['default', 'green', 'blue', 'violet', 'red', 'yellow']}
        >
          <SystemDarkModeListener />
          <NuqsAdapter>
            <QueryProvider>
              <SidebarProvider>
                <div className="md:hidden">
                  <AppSidebar />
                </div>
                <div className={cn('flex flex-col min-h-screen w-full')}>
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </SidebarProvider>
            </QueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
