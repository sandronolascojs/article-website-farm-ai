import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { CookieConsent } from '@/components/CookieConsent';
import Script from 'next/script';
import '../styles/globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { QueryProvider } from '@/components/QueryProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-gray-100 text-gray-900 min-h-screen')}>
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
