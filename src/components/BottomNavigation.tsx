import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, List } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav flex justify-around items-center h-16">
      <Link to="/" className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <Home size={24} />
        <span className="text-xs">Dashboard</span>
      </Link>
      <Link to="/add" className={`bottom-nav-item ${location.pathname === '/add' ? 'active' : ''}`}>
        <PlusCircle size={24} />
        <span className="text-xs">Add</span>
      </Link>
      <Link to="/transactions" className={`bottom-nav-item ${location.pathname === '/transactions' ? 'active' : ''}`}>
        <List size={24} />
        <span className="text-xs">Transactions</span>
      </Link>
    </nav>
  );
};

export default BottomNavigation;