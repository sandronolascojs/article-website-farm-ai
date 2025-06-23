import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { CookieConsent } from '@/components/CookieConsent';
import Script from 'next/script';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { QueryProvider } from '@/components/QueryProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { THEME_STORAGE_KEY } from '@/constants/localStorage.constants';
import { loadTheme } from '@/styles/loadTheme';
import { env } from '../../env.mjs';
import { ThemeAvailable } from '@auto-articles/types';

const inter = Inter({ subsets: ['latin'] });
const theme = env.NEXT_PUBLIC_THEME as ThemeAvailable;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await loadTheme(theme);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey={THEME_STORAGE_KEY}
        >
          <NuqsAdapter>
            <QueryProvider>
              <SidebarProvider>
                <div className="md:hidden">
                  <AppSidebar />
                </div>
                <div className="flex flex-col min-h-screen w-full">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </SidebarProvider>
            </QueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
        <CookieConsent />
        <Script id="adsense-loader" strategy="afterInteractive">
          {`
            window.addEventListener('consentChanged', function() {
              if (!document.querySelector("#ads-client")) {
                const s = document.createElement("script");
                s.id = "ads-client";
                s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_AD_CLIENT}";
                s.crossOrigin = "anonymous";
                document.head.appendChild(s);
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
