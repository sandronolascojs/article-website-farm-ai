import Link from 'next/link';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'SiteName';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-8 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Newsletter Section */}
          <div className="md:col-span-1">
            <h4 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Newsletter</h4>
            <p className="text-gray-400 mb-2 sm:mb-4 text-sm sm:text-base">
              Stay updated with our latest articles
            </p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              />
              <button className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none transition-colors text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 sm:mb-4 text-base sm:text-lg">Links</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
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
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
