import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

interface DesktopNavProps {
  navLinks: NavLink[];
}

export const DesktopNav = ({ navLinks }: DesktopNavProps) => (
  <nav className="hidden md:flex gap-6">
    {navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
      >
        {link.label}
      </Link>
    ))}
  </nav>
);
