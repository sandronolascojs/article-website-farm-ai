import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'SiteName';

export const Footer = () => {
  return (
    <footer className="bg-sidebar text-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-8 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Newsletter Section */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Newsletter</h4>
            <p className="text-muted-foreground mb-2 sm:mb-4 text-sm sm:text-base">
              Stay updated with our latest articles
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Enter your email" />
              <Button variant="outline">Subscribe</Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Links</h4>
            <ul className="space-y-1 sm:space-y-2 text-muted-foreground text-sm sm:text-base">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-primary transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Legal</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-muted-foreground text-xs sm:text-sm">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
