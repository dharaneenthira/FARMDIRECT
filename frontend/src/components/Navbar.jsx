import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, ShoppingCart, Bell, Search, Globe, User, ChevronDown, Menu, X, PlusCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export const Navbar = () => {
  const { lang, setLang, t } = useLanguage();
  const { user, switchRole, logout } = useAuth();
  const { cartItems } = useCart();
  const { notifications } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Sell Products', path: user?.role === 'farmer' ? '/add-product' : '/add-product' },
    { name: 'Price Predictor', path: '/ai-price-prediction' },
    { name: 'Demand Forecast', path: '/demand-forecast' },
    { name: 'Orders', path: '/orders' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-md text-white border-b border-emerald-900/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 md:gap-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition transform">
              <Sprout className="w-6 h-6 text-emerald-950" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-300 transition">FARMDIRECT</span>
              <span className="block text-[10px] text-emerald-400 font-bold tracking-widest uppercase -mt-1">Agri Marketplace</span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg transition ${
                    isActive
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'text-emerald-100 hover:text-white hover:bg-emerald-900/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-xs relative">
            <input
              type="text"
              placeholder="Search crops, fruits, grains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-emerald-900/80 border border-emerald-750 text-white placeholder-emerald-300/60 text-xs rounded-full pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
            <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
          </form>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-0.5 bg-emerald-900/80 border border-emerald-800 rounded-lg p-0.5 text-xs text-emerald-200">
              <Globe className="w-3.5 h-3.5 ml-1 text-emerald-400" />
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 rounded font-bold text-[11px] transition ${lang === 'en' ? 'bg-emerald-600 text-white' : 'hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ta')}
                className={`px-1.5 py-0.5 rounded font-bold text-[11px] transition ${lang === 'ta' ? 'bg-emerald-600 text-white' : 'hover:text-white'}`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-1.5 py-0.5 rounded font-bold text-[11px] transition ${lang === 'hi' ? 'bg-emerald-600 text-white' : 'hover:text-white'}`}
              >
                हिंदी
              </button>
            </div>

            {/* Notifications Icon */}
            <Link
              to="/notifications"
              className="relative p-2 text-emerald-200 hover:text-white hover:bg-emerald-900/80 rounded-full transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-amber-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-emerald-200 hover:text-white hover:bg-emerald-900/80 rounded-full transition"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-400 text-emerald-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Profile / Dashboard Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-xl border border-emerald-700 text-xs font-semibold transition"
                >
                  <User className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline font-bold truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 py-2 z-50 text-xs space-y-1">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="font-bold text-slate-100">{user.name}</p>
                      <p className="text-[10px] text-emerald-400 capitalize font-medium">{user.role} Account</p>
                    </div>

                    <Link
                      to={user.role === 'farmer' ? '/farmer-dashboard' : user.role === 'buyer' ? '/buyer-dashboard' : '/admin-dashboard'}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-3 py-2 hover:bg-emerald-800 text-emerald-100 hover:text-white transition"
                    >
                      Dashboard
                    </Link>
                    {user.role === 'farmer' && (
                      <Link
                        to="/add-product"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-3 py-2 hover:bg-emerald-800 text-emerald-100 hover:text-white transition"
                      >
                        List New Product
                      </Link>
                    )}
                    <Link
                      to="/orders"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-3 py-2 hover:bg-emerald-800 text-emerald-100 hover:text-white transition"
                    >
                      My Orders
                    </Link>

                    <div className="pt-1 border-t border-slate-800">
                      <div className="px-3 py-1 text-[10px] text-slate-400 font-bold uppercase">Switch Mode</div>
                      <button
                        onClick={() => { switchRole('farmer'); setProfileDropdownOpen(false); navigate('/farmer-dashboard'); }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-800 ${user.role === 'farmer' ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}
                      >
                        🌾 Farmer View
                      </button>
                      <button
                        onClick={() => { switchRole('buyer'); setProfileDropdownOpen(false); navigate('/buyer-dashboard'); }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-800 ${user.role === 'buyer' ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}
                      >
                        🛒 Buyer View
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-800">
                      <button
                        onClick={() => { logout(); setProfileDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 hover:bg-red-950 text-red-400 transition"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs font-bold text-emerald-200 hover:text-white px-3 py-1.5 rounded-lg transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold px-4 py-2 rounded-xl text-xs shadow-md transition"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-emerald-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Nav Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-emerald-950 border-t border-emerald-900 px-4 pt-3 pb-6 space-y-3 text-sm">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search crops, fruits, grains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-emerald-900/90 border border-emerald-800 text-white placeholder-emerald-400 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none"
            />
            <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
          </form>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-emerald-100 hover:text-white font-medium border-b border-emerald-900/50"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

