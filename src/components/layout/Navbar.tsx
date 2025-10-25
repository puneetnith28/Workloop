
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Settings, 
  Menu, 
  X,
  MoonStar,
  Sun,
  LogOut
} from 'lucide-react';
import useAuth from '@/hooks/use-auth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Files", path: "/files", icon: FileText },
  { label: "Feedback", path: "/feedback", icon: MessageSquare },
  { label: "Settings", path: "/settings", icon: Settings },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const isLoggedIn = isAuthenticated;

  // Check if we're on landing page
  const isLandingPage = location.pathname === '/';
  // Show auth UI on protected pages (demo flow) so PY/profile and nav items
  const protectedPrefixes = ['/dashboard', '/files', '/feedback', '/settings'];
  const showAuthUI = isAuthenticated || protectedPrefixes.some((p) => location.pathname.startsWith(p));

  useEffect(() => {
    // Check local storage for dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    // In a real app, handle logout logic here
    console.log('Logging out...');
    logout();
    navigate('/');
  };

  // Show different nav items depending on whether the user is logged in and on landing page
  const renderNavItems = () => {
    if (isLandingPage) {
      return (
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/features" 
            className={`text-navy-light hover:text-navy transition-colors ${
              location.pathname === '/features' ? 'font-medium text-navy' : ''
            }`}>
            Features
          </Link>
          <Link 
            to="/how-it-works" 
            className={`text-navy-light hover:text-navy transition-colors ${
              location.pathname === '/how-it-works' ? 'font-medium text-navy' : ''
            }`}>
            How It Works
          </Link>
          <Link 
            to="/pricing" 
            className={`text-navy-light hover:text-navy transition-colors ${
              location.pathname === '/pricing' ? 'font-medium text-navy' : ''
            }`}>
            Pricing
          </Link>
        </div>
      );
    }

  // If not logged in and not on dashboard demo, don't show authenticated nav items
  if (!showAuthUI) return null;

    // Authenticated nav items
    return (
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
              location.pathname === item.path
                ? "bg-accent text-foreground font-medium"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    );
  };

  // Render auth buttons based on login status and current page
  const renderAuthButtons = () => {
    if (isLandingPage) {
      return (
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/login?tab=register">
            <Button className="bg-workloop-purple hover:bg-workloop-dark-purple">Sign Up</Button>
          </Link>
        </div>
      );
    }
    
    return showAuthUI ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <div className="h-8 w-8 rounded-full bg-workloop-purple flex items-center justify-center text-white font-medium">
              PY
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Puneet Yadav</p>
              <p className="text-xs leading-none text-muted-foreground">
                alex@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <div className="flex items-center gap-3">
        <Link to="/login">
          <Button variant="outline">Log In</Button>
        </Link>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="workloop-container flex justify-between items-center h-14">
        <div className="flex items-center gap-8">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-workloop-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <span className="font-bold text-lg">WorkLoop</span>
          </Link>

          {/* Desktop Menu */}
          {renderNavItems()}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={18} /> : <MoonStar size={18} />}
          </Button>

          {renderAuthButtons()}

          <div className="block md:hidden">
            <Button
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background animate-fade-in border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLandingPage ? (
              <>
                <Link
                  to="#features"
                  className="block px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="#how-it-works"
                  className="block px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  to="#pricing"
                  className="block px-3 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
              </>
            ) : (
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md flex items-center gap-2 ${
                    location.pathname === item.path
                      ? "bg-accent text-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
