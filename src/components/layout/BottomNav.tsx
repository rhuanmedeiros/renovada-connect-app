
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 flex items-center justify-around z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-1/5 h-full ${
              active ? 'text-church-600' : 'text-gray-500'
            }`}
          >
            <item.icon size={20} className={active ? 'text-church-600' : 'text-gray-500'} />
            <span className={`text-xs mt-1 ${active ? 'font-medium' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
