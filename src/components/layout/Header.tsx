
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Header = () => {
  const location = useLocation();
  const { isAdminAuthenticated, setShowAdminAuth, logout } = useAdmin();
  const [title, setTitle] = useState('Renovada');
  const [isScrolled, setIsScrolled] = useState(false);

  // Admin mode double-tap detection
  const [taps, setTaps] = useState(0);
  const [lastTap, setLastTap] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set the appropriate title based on the current route
    const path = location.pathname;
    
    if (path === '/') {
      setTitle('Renovada');
    } else if (path === '/admin') {
      setTitle('Área Administrativa');
    } else {
      // Convert path to title case, e.g., "/devocional" -> "Devocional"
      const pathParts = path.split('/').filter(Boolean);
      if (pathParts.length > 0) {
        const formattedTitle = pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1);
        setTitle(formattedTitle);
      }
    }
  }, [location]);

  const handleLogoPress = () => {
    const now = Date.now();
    if (now - lastTap < 300 && taps === 1) { // Double tap within 300ms
      setTaps(0);
      setShowAdminAuth(true);
    } else {
      setTaps(1);
      setLastTap(now);
      setTimeout(() => setTaps(0), 300);
    }
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-30 w-full transition-all duration-300 bg-blue-500/95 text-white",
        isScrolled ? "backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={handleLogoPress}
        >
          <div 
            className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold"
          >
            R
          </div>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        
        {isAdminAuthenticated && (
          <div className="flex items-center gap-2">
            {location.pathname !== '/admin' && (
              <Button variant="ghost" size="sm" asChild className="text-white hover:bg-blue-600/20">
                <Link to="/admin">
                  <Settings size={18} className="mr-1" />
                  Admin
                </Link>
              </Button>
            )}
            {location.pathname === '/admin' && (
              <Button variant="outline" size="sm" onClick={logout} className="text-white border-white/30 hover:bg-white/10">
                Sair
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
