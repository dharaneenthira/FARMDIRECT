import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, User, Package, PlusCircle, ShoppingBag, 
  TrendingUp, BarChart3, Users, DollarSign, MessageSquare, 
  Bell, Settings, LogOut, ShieldCheck, Heart, CreditCard, FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ role = 'farmer' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const farmerLinks = [
    { name: 'Dashboard', path: '/farmer-dashboard', icon: LayoutDashboard },
    { name: 'My Products', path: '/marketplace', icon: Package },
    { name: 'Add Product', path: '/add-product', icon: PlusCircle },
    { name: 'Orders', path: '/orders', icon: ShoppingBag },
    { name: 'AI Price Predictor', path: '/ai-price-prediction', icon: TrendingUp },
    { name: 'Demand Forecast', path: '/demand-forecast', icon: BarChart3 },
    { name: 'Buyer Matching', path: '/smart-buyer-matching', icon: Users },
    { name: 'Earnings', path: '/farmer-dashboard#earnings', icon: DollarSign },
    { name: 'Messages', path: '/chat', icon: MessageSquare },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Profile', path: '/farmer-profile', icon: User },
    { name: 'Settings', path: '/farmer-profile#settings', icon: Settings },
  ];

  const buyerLinks = [
    { name: 'Dashboard', path: '/buyer-dashboard', icon: LayoutDashboard },
    { name: 'Marketplace', path: '/marketplace', icon: Package },
    { name: 'Orders', path: '/orders', icon: ShoppingBag },
    { name: 'Wishlist', path: '/wishlist', icon: Heart },
    { name: 'Cart', path: '/cart', icon: ShoppingBag },
    { name: 'Messages', path: '/chat', icon: MessageSquare },
    { name: 'Payments', path: '/checkout', icon: CreditCard },
    { name: 'Profile', path: '/buyer-dashboard#profile', icon: User },
    { name: 'Settings', path: '/buyer-dashboard#settings', icon: Settings },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
    { name: 'Users', path: '/admin-dashboard#users', icon: Users },
    { name: 'Farmers', path: '/admin-dashboard#farmers', icon: Users },
    { name: 'Buyers', path: '/admin-dashboard#buyers', icon: Users },
    { name: 'Products', path: '/marketplace', icon: Package },
    { name: 'Orders', path: '/orders', icon: ShoppingBag },
    { name: 'Payments', path: '/checkout', icon: CreditCard },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Reports', path: '/analytics#reports', icon: FileText },
    { name: 'Settings', path: '/admin-dashboard#settings', icon: Settings },
  ];

  const links = role === 'farmer' ? farmerLinks : role === 'buyer' ? buyerLinks : adminLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col justify-between border-r border-slate-800 shrink-0">
      <div className="space-y-6">
        <div className="px-3 py-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
            {role.toUpperCase()[0]}
          </div>
          <div className="truncate">
            <span className="text-xs font-bold text-white capitalize block truncate">{user?.name || `${role} Account`}</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Active Session
            </span>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-800 space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
