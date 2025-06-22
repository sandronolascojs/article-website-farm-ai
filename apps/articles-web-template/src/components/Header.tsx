'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Home, List, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { env } from '../../env.mjs';

const SITE_NAME = env.NEXT_PUBLIC_SITE_NAME;

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/articles', label: 'Articles', icon: List },
  { href: '/categories', label: 'Categories', icon: Layers },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="border-b border-primary/10 bg-white sticky top-0 z-50 min-h-16 max-h-20 w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-2xl font-bold text-primary whitespace-nowrap tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1"
          aria-label="Go to home page"
        >
          {SITE_NAME}
        </Link>
        <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Go to ${link.label}`}
                className={cn(
                  'border border-transparent rounded-md px-3 py-2 flex items-center gap-2',
                  isActive && 'border-primary/10 text-primary',
                )}
              >
                <link.icon className="h-5 w-5" aria-hidden />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <SidebarTrigger aria-label="Open navigation menu" className="md:hidden ml-2" />
      </div>
    </header>
  );
};
