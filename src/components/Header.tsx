import { Search, Plus, Bell, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
              <span className="text-background text-xl">G</span>
            </div>
            <span className="text-xl font-semibold hidden sm:inline">GitPlus</span>
          </Link>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories..."
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Plus className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <Link to="/profile">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-medium">
                DU
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
