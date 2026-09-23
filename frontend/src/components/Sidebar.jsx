import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, User, Package, PlusCircle, ShoppingBag, 
  TrendingUp, BarChart3, Users, DollarSign, MessageSquare, 
  Bell, Settings, LogOut, ShieldCheck, Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ role = 'farmer' }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const farmerLinks = [
    { name: 'Dashboard', path: '/farmer-dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/farmer-profile', icon: User },
    { name: 'My Products', path: '/marketplace', icon: Package },
    { name: 'Add Product', path: '/add-product', icon: PlusCircle },
    { name: 'Orders', path: '/orders', icon: ShoppingBag },
    { name: 'AI Price Prediction', path: '/ai-price-prediction', icon: TrendingUp },
    { name: 'Demand Forecast', path: '/demand-forecast', icon: BarChart3 },
    { name: 'Buyer Matches', path: '/smart-buyer-matching', icon: Users },
    { name: 'Earnings', path: '/farmer-dashboard#earnings', icon: DollarSign },
    { name: 'Messages', path: '/chat', icon: MessageSquare },
    { name: 'Notifications', path: '/notifications', icon: Bell },
  ];

  const buyerLinks = [
    { name: 'Dashboard', path: '/buyer-dashboard', icon: LayoutDashboard },
    { name: 'Marketplace', path: '/marketplace', icon: Package },
    { name: 'Smart Matches', path: '/smart-buyer-matching', icon: Users },
    { name: 'Cart & Checkout', path: '/cart', icon: ShoppingBag },
    { name: 'My Orders', path: '/orders', icon: ShoppingBag },
    { name: 'Wishlist', path: '/wishlist', icon: Heart },
    { name: 'Messages', path: '/chat', icon: MessageSquare },
    { name: 'Notifications', path: '/notifications', icon: Bell },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Users & Farmers', path: '/admin-dashboard#users', icon: Users },
    { name: 'Products & Orders', path: '/orders', icon: Package },
    { name: 'Notifications', path: '/notifications', icon: Bell },
  ];

  const links = role === 'farmer' ? farmerLinks : role === 'buyer' ? buyerLinks : adminLinks;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col justify-between border-r border-slate-800 shrink-0">
      <div className="space-y-6">
        <div className="px-3 py-2 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
            {role.toUpperCase()[0]}
          </div>
          <div>
            <span className="text-xs font-bold text-white capitalize block">{role} Portal</span>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified Active
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
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Session</span>
        </button>
      </div>
    </aside>
  );
};
