import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary' : 'text-gray-600';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-screen-xl mx-auto flex justify-around items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center ${isActive('/')}`}
        >
          <Icons.LayoutDashboard size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/leaderboard" 
          className={`flex flex-col items-center ${isActive('/leaderboard')}`}
        >
          <Icons.Trophy size={24} />
          <span className="text-xs mt-1">Leaderboard</span>
        </Link>
        
        <Link 
          to="/waitlist" 
          className={`flex flex-col items-center ${isActive('/waitlist')}`}
        >
          <Icons.ClipboardList size={24} />
          <span className="text-xs mt-1">Waitlist</span>
        </Link>
      </div>
    </nav>
  );
}