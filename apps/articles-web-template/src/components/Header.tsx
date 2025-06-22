'use client';

import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SearchBar } from '@/components/SearchBar';
import { useState } from 'react';
import { Home, List, Layers } from 'lucide-react';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'SiteName';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/articles', label: 'Articles', icon: List },
  { href: '/categories', label: 'Categories', icon: Layers },
];

export const Header = () => {
  const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || '1';
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="border-b bg-white sticky top-0 z-50 min-h-16 max-h-20 w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="text-2xl font-bold text-gray-900 whitespace-nowrap">
              {SITE_NAME}
            </Link>
            <nav className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2 md:gap-4 w-1/2 md:w-auto justify-end">
            <div className="relative w-full max-w-xs hidden md:block">
              <SearchBar
                siteId={SITE_ID}
                search={search}
                setSearch={setSearch}
                searchFocused={searchFocused}
                setSearchFocused={setSearchFocused}
              />
            </div>
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
