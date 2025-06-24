import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Home, List, Layers } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/articles', label: 'Articles', icon: List },
  { href: '/categories', label: 'Categories', icon: Layers },
];

const privacyLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookie-policy', label: 'Cookie Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
];

export const AppSidebar = () => {
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'TechBlog';

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-xl font-bold">{SITE_NAME}</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild>
                    <Link href={link.href} className="flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Privacy</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {privacyLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild>
                    <Link href={link.href} className="flex items-center gap-2">
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </span>
      </SidebarFooter>
    </Sidebar>
  );
};
