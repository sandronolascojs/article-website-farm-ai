'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Home, List, Layers } from 'lucide-react';
import { env } from '../../env.mjs';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

const SITE_NAME = env.NEXT_PUBLIC_SITE_NAME;

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/articles', label: 'Articles', icon: List },
  { href: '/categories', label: 'Categories', icon: Layers },
];

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-sidebar sticky top-0 z-50 min-h-16 max-h-20 w-full">
      <div className="container mx-auto py-3 px-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-2xl font-bold text-primary whitespace-nowrap tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1"
          aria-label="Go to home page"
        >
          {SITE_NAME}
        </Link>
        <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-4">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild active={isActive}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        aria-label={`Go to ${link.label}`}
                        className="flex items-center gap-2"
                      >
                        <span>{link.label}</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="border-none shadow-none bg-transparent hover:bg-transparent">
                  Privacy
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute right-0 left-auto mt-2 min-w-[200px] rounded-md border border-border bg-popover shadow-lg focus:outline-none z-50">
                  <NavigationMenuLink asChild>
                    <Link href="/privacy" aria-label="Privacy Policy">
                      Privacy Policy
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/cookie-policy" aria-label="Cookie Policy">
                      Cookie Policy
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/terms" aria-label="Terms and Conditions">
                      Terms & Conditions
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <SidebarTrigger aria-label="Open navigation menu" className="md:hidden ml-2" />
      </div>
    </header>
  );
};
