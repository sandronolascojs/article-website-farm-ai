import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900">TechBlog</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Technology
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Design
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Business
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Lifestyle
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="hidden md:inline-flex bg-white text-gray-900">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
