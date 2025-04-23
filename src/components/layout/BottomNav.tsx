
import { useLocation, Link } from 'react-router-dom';
import { Home, Calendar, Book, Video, Phone } from 'lucide-react';

export const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Agenda', path: '/agenda' },
    { icon: Book, label: 'Devocional', path: '/devocional' },
    { icon: Video, label: 'Mídia', path: '/midia' },
    { icon: Phone, label: 'Contato', path: '/contato' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white h-16 flex items-center justify-around z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-1/5 h-full ${
              active ? 'bg-blue-600' : ''
            }`}
          >
            <item.icon size={20} className="text-white" />
            <span className={`text-xs mt-1 ${active ? 'font-medium' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
